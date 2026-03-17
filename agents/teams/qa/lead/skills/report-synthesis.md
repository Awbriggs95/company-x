# Skill — Report Synthesis

> Owner: qa-lead | Version: 1.0.0
> Defines how the QA Lead synthesises Senior QA reports into a
> team report for the Orchestrator.

---

## Before Writing the Report

Read the Senior QA report at:
```
briefs/active/[TASK-ID]/reports/senior-qa.md
```

Check the following before synthesising:
- [ ] Senior QA report is filed and complete
- [ ] Every acceptance criterion has a result
- [ ] All bugs are documented with reproduction steps
- [ ] No unresolved escalations remain

---

## Report Format

Save to:
```
briefs/active/[TASK-ID]/reports/qa-lead.md
```

```markdown
# QA Lead Report — [TASK-ID]
**Date:** [YYYY-MM-DD]
**Brief:** [Short title]
**Status:** [Pass | Fail | Partial — detail below]

---

## Summary
[2-3 sentences. Overall testing outcome. Is this brief ready
to move forward or does it need engineering attention?]

---

## Acceptance Criteria Results

| Criterion | Result | Notes |
|---|---|---|
| [Criterion from brief] | [Pass / Fail / Partial] | [Any relevant detail] |

**Overall result:** [All pass | N failed — see Bugs Found]

---

## Bugs Found

[If none: "No bugs found."]

| ID | Severity | Description | Steps to Reproduce | Platform |
|---|---|---|---|---|
| BUG-[seq] | [Critical/High/Medium/Low] | [One line] | [Brief steps] | [iOS/Android/Both] |

**Operator action required:** [Yes — N bugs flagged for your review | No]

---

## Testing Coverage

| Testing Type | Performed | Notes |
|---|---|---|
| Functional | [Yes / No] | |
| Regression | [Yes / No] | |
| Edge case | [Yes / No] | |
| Performance | [Yes / No] | |
| Security | [Yes / No] | |

---

## Platform Coverage

| Platform | Tested | Result |
|---|---|---|
| iOS | [Yes / No] | [Pass / Fail / N/A] |
| Android | [Yes / No] | [Pass / Fail / N/A] |

---

## Ready to Proceed
**Ready for DevOps / next step:** [Yes | No — reason]
**Operator decision required:** [Yes — bugs flagged | No]
```

---

## Synthesis Rules

- Never pass a brief with failed acceptance criteria without flagging
  it explicitly — Status must be Fail or Partial, not Pass
- Every bug found must appear in the Bugs Found table with
  enough detail for the operator to make a prioritisation decision
- Never raise BUG briefs yourself — document bugs in the report
  and let the operator decide whether to create briefs for them
- The "Operator decision required" field must be Yes whenever
  any bugs are found — no exceptions
- **Critical bugs are never held inside the report cycle.** If Senior QA
  finds a Critical bug, load `escalation-handling.md` and follow the
  Critical Bug fast-path immediately — before writing or completing
  this report. The operator alert goes first. The report follows after.
