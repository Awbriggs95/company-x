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

Read all Senior reports for this brief. They are located at:

```
briefs/active/[TASK-ID]/reports/senior-frontend.md
briefs/active/[TASK-ID]/reports/senior-backend.md
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

## Synthesis Rules

### Compress, don't copy
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
