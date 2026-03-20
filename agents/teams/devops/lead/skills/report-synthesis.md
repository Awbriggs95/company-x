# Skill — Report Synthesis

> Owner: devops-lead | Version: 1.0.0
> Defines how the DevOps Lead synthesises Senior DevOps reports
> into a team report for the Orchestrator.

---

## Before Writing the Report

Read the Senior DevOps report at:
```
briefs/active/[TASK-ID]/reports/senior-devops.md
```

Also confirm the preparation report was filed (if production was in scope):
```
briefs/active/[TASK-ID]/reports/devops-preparation.md
```

Check the following before synthesising:

- [ ] Senior DevOps report is filed and complete
- [ ] Preparation report exists if production deployment was in scope
- [ ] All environments in the routing plan have a confirmed status
- [ ] Rollback status is documented
- [ ] Cost impact is addressed
- [ ] No unresolved escalations remain
- [ ] If production was deployed — operator confirmation is on record

If any check fails — resolve the issue before writing the report.

---

## Report Format

Save to:
```
briefs/active/[TASK-ID]/reports/devops-lead.md
```

```markdown
# DevOps Lead Report — [TASK-ID]
**Date:** [YYYY-MM-DD]
**Brief:** [Short title]
**Status:** [Complete | Awaiting operator confirmation | Blocked]

---

## Summary
[2-3 sentences. What was done, what environment was affected,
current state. Plain language.]

---

## Environments Affected

| Environment | Action | Status |
|---|---|---|
| Development | [Deployed / Updated / Not affected] | [Confirmed working / N/A] |
| Staging | [Deployed / Updated / Not affected] | [Confirmed working / N/A] |
| Production | [Deployed / Pending confirmation / Not affected] | [Live / Awaiting sign-off / N/A] |

---

## What Was Deployed / Changed
[Specific description of what changed in each environment.
Reference branch, build number, or config key as applicable.]

---

## Verification
[How the Senior DevOps agent confirmed the deployment worked.
What was tested post-deployment.]

---

## Rollback Status
**Rollback available:** [Yes / No]
**Rollback method:** [One sentence — how to roll back if needed]
**Rollback tested:** [Yes / No / Not applicable]

---

## Cost Impact
**New recurring costs introduced:** [Yes — $X/month | No]
**Notes:** [Any cost observations]

---

## Production Deployment Gate
**Operator confirmation received:** [Yes — [date/time] | No — pending]
**Production deployment status:** [Complete | Awaiting confirmation | Not in scope]

---

## Operator Action Required
[Yes — production deployment awaiting your confirmation | No]
```

---

## Synthesis Rules

- Never mark production deployment as Complete without operator
  confirmation on record — if confirmation is pending, Status
  must be "Awaiting operator confirmation"
- Always include rollback status — the operator needs to know
  whether they can undo this if something goes wrong
- Cost impact must always be addressed — even if zero
- If production deployment is in scope, "Operator Action Required"
  must be Yes until confirmed
