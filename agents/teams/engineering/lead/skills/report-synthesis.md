# Skill — Report Synthesis

> Owner: engineering-lead | Version: 1.0.0
> Defines how the Engineering Lead compiles Senior agent reports
> into a single synthesised team report for the Orchestrator.

---

## When This Skill Applies

Use this skill when all Senior agents assigned to a brief have
filed their reports and it is time to synthesise them into a
single Engineering Lead report for the Orchestrator.

---

## Before Writing the Report

Check whether the brief is a SPIKE (Type: Research Spike).
SPIKE briefs follow a different synthesis path — see SPIKE Report
Handling below. All other brief types follow the standard path.

Read all Senior reports for this brief. They are located at:

```
briefs/active/[TASK-ID]/reports/senior-frontend.md
briefs/active/[TASK-ID]/reports/senior-backend.md
briefs/active/[TASK-ID]/reports/senior-[role]-spike-output.md  ← SPIKE only
```

Only read reports that exist — not every brief involves both
Frontend and Backend. Read what is present.

Check for the following before synthesising:

- [ ] All assigned Senior agents have filed reports
- [ ] No unresolved escalations remain
- [ ] All Senior completion criteria have been met
- [ ] No conflicting decisions between Seniors

If any check fails — resolve the issue before writing the report.
Do not synthesise incomplete or conflicting work.

---

## Report Format

Save the report to:
```
briefs/active/[TASK-ID]/reports/engineering-lead.md
```

```markdown
# Engineering Lead Report — [TASK-ID]
**Date:** [YYYY-MM-DD]
**Brief:** [Short title]
**Status:** [Complete | Partially complete — detail below | Blocked]

---

## Summary
[2-3 sentences. What was done, what is the outcome, is it ready
for the next team. Plain language — no technical jargon.]

---

## Work Completed

### Frontend
[One paragraph summary of what the Senior Frontend agent did.
Reference key files changed. Note any decisions made.]

[Or: "Not in scope for this brief."]

### Backend
[One paragraph summary of what the Senior Backend agent did.
Reference key schema or API changes. Note any decisions made.]

[Or: "Not in scope for this brief."]

---

## Decisions Made
[Any technical decisions made during execution that were not
specified in the brief. Include rationale. If none, write "None."]

| Decision | Rationale |
|---|---|
| [Decision 1] | [Why] |

---

## Deviations from Brief
[Anything done differently from what the brief specified.
Include why. If none, write "None."]

---

## Blockers Encountered
[Any issues that slowed or paused work, even if resolved.
Include how they were resolved. If none, write "None."]

---

## Acceptance Criteria Status

| Criterion | Status |
|---|---|
| [Criterion from brief] | [Met / Not met / Not applicable] |

---

## Ready for Next Team
**Next team:** [QA / DevOps / None — engineering is final step]
**Ready:** [Yes | No — reason]
**Handoff notes:** [Anything the next team needs to know before starting]
```

---

## PR Creation

After writing the report, the Engineering Lead creates the Pull Request
for the work completed. This is always done before notifying the Orchestrator.

### PR creation steps

1. Confirm the Senior's branch is pushed:
   ```bash
   git ls-remote --heads origin [branch-name]
   ```

2. Open the PR on GitHub using the CLI:
   ```bash
   gh pr create \
     --title "[TASK-ID]: [Short title from brief]" \
     --body "$(cat <<'EOF'
   ## What was done
   [2-3 sentence summary from engineering lead report]

   ## How to test
   [Pulled from handoff notes in this report]

   ## Brief
   briefs/active/[TASK-ID]/

   ## Screenshots
   [Include for any UI changes. Write "None — no UI changes" otherwise.]
   EOF
   )" \
     --base main \
     --head [branch-name]
   ```

3. Add the PR URL to the Engineering Lead report under a new field:
   ```markdown
   **PR:** [GitHub PR URL]
   ```

4. Notify the Orchestrator as normal — include the PR URL in the notification.

### If the brief involves both Frontend and Backend branches
Each Senior works on their own branch. Create one PR per branch.
List both PR URLs in the report and notification.

### Never
- Never merge the PR — the operator is the reviewer and merger
- Never create the PR before all Senior reports are filed
- Never create the PR if any escalation is unresolved

---

## SPIKE Report Handling

When the brief is a Research Spike, the Senior files a spike output
report rather than a standard work report. The Engineering Lead's
job is to validate that output and produce a Lead summary for the
Orchestrator.

### SPIKE Senior report location
```
briefs/active/[TASK-ID]/reports/senior-[role]-spike-output.md
```

### Before synthesising a SPIKE report, verify:

- [ ] The recommendation is clearly stated upfront
- [ ] All options listed in the brief have been evaluated
- [ ] Each option has been assessed against the brief's evaluation criteria
- [ ] Risks and open questions are documented
- [ ] A suggested next brief is included
- [ ] The time box was not exceeded without a noted reason
- [ ] If the spike targets a stack decision — the recommendation names
  a specific choice, not "it depends"

If any check fails — do not synthesise. Raise the gap with the
Senior and ask them to address it before the report is accepted.

### SPIKE Lead report format

Save to:
```
briefs/active/[TASK-ID]/reports/engineering-lead.md
```

```markdown
# Engineering Lead Report — [TASK-ID] (SPIKE)
**Date:** [YYYY-MM-DD]
**Brief:** [Short title]
**Status:** [Complete | Incomplete — detail below]

---

## Recommendation
[State the Senior's recommendation in one sentence.
This is the answer to the spike's Question to Answer.]

---

## Summary
[2-3 sentences. What was investigated, what was found,
what is recommended and why. Plain language.]

---

## Confidence Level
[High — clear winner with strong evidence |
Medium — recommended option is best available but tradeoffs exist |
Low — insufficient data, partial recommendation only]

**If Medium or Low:** [Note what additional investigation would
raise confidence, and whether it is worth pursuing.]

---

## Stack Entry to Update
[If this spike resolves a stack.md entry — name it exactly.
The Orchestrator needs this to prompt the operator before closing.]

[Or: "None — this spike does not resolve a stack.md entry."]

---

## Suggested Next Brief
[The TASK ID type and description of the brief that should be
created once the operator confirms the decision.]

---

## Blockers or Caveats
[Anything that could affect the recommendation's validity.
If none, write "None."]
```

### After filing the SPIKE Lead report
Notify the Orchestrator as normal. The Orchestrator will surface
the recommendation to the operator and manage the stack.md update
gate before closing the brief.

Do not create a PR for SPIKE briefs — spikes produce recommendation
documents, not merged code. The PR creation step in this skill
applies to non-SPIKE briefs only.

---

## Report Format
Do not copy Senior reports verbatim into the Lead report.
Summarise in your own words. The Orchestrator reads Lead reports —
Senior reports are available if detail is needed.

### Surface decisions prominently
Any decision made during execution that was not in the brief
must appear in the Decisions Made section. The Orchestrator
and operator need visibility on these — they affect future briefs.

### Be precise about acceptance criteria
Every acceptance criterion from the brief that is relevant to
engineering must appear in the table with a clear status.
"Met" means tested and confirmed — not assumed.

### Flag partial completion honestly
If only some of the engineering work is complete, set Status to
"Partially complete" and explain exactly what is done and what
is not. Never mark Status as Complete when work remains.

### Handoff notes are mandatory
The next team (usually QA) needs to know how to verify the work.
Always include at minimum:
- How to run or access the changed functionality
- Any environment setup needed
- Known limitations or edge cases the next team should be aware of
