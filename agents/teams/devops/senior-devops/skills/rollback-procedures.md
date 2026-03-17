# Skill — Rollback Procedures

> Owner: senior-devops | Version: 1.0.0
> Standards for executing rollbacks safely across Company-X environments.

---

## Rollback Principles

- Never execute a production rollback without operator confirmation
- Always assess current state before acting — a partial rollback
  can be worse than the original problem
- Document what you do during a rollback — every step, every command
- Verify the rollback worked — confirmation is not optional
- Never delete rollback capability — always maintain the ability
  to revert

---

## Rollback Decision Framework

When a deployment causes issues, assess before acting:

```
1. What is broken?        [Specific feature / Full app / Infrastructure]
2. How many users affected? [All / Some / Internal only]
3. Is the brief's rollback plan executable? [Yes / Partially / No]
4. What is the data risk?  [No data impact / Possible / Definite]
5. How long will rollback take? [Estimate]
```

Report this assessment to DevOps Lead before taking any action.
Do not execute a rollback based on your own judgment — surface
the assessment and wait for instruction.

---

## Mobile App Rollback (Expo EAS)

### OTA update rollback (fastest — seconds)
If the issue was introduced via an OTA update:

```bash
# List recent updates
eas update:list --branch production

# Republish a previous update
eas update --branch production --message "Rollback to [previous update ID]" --republish [update-id]
```

OTA rollback only works for JavaScript changes — not native code changes.

### Store build rollback (slower — hours to days)
If the issue requires rolling back a full native build:

- iOS: Submit the previous build version via App Store Connect
  (requires Apple review — can take 24-48 hours)
- Android: In Google Play Console → Release management →
  Roll back to previous release (near-instant for internal track,
  staged rollout for production)

Always check if the issue can be addressed via OTA before
initiating a store build rollback — it is significantly faster.

---

## Backend Rollback

### Code rollback
```bash
# Identify the previous working commit
git log --oneline -10

# Create a rollback branch from previous commit
git checkout -b rollback/[TASK-ID] [previous-commit-hash]

# Deploy the rollback branch
# [follow standard deployment procedure for your cloud provider]
```

### Database rollback
Database rollbacks are the highest risk operation. Before executing:

1. Confirm a backup exists from before the migration
2. Assess data written since migration — will it be lost?
3. If data loss is possible — escalate to operator before proceeding

```bash
# Run the Down migration from the brief
# [migration tool specific command — depends on approved stack]
```

Never run a database rollback without operator awareness of
the data implications.

---

## Infrastructure Rollback

For IaC-managed infrastructure:

```bash
# Terraform — plan the rollback first
terraform plan -target=[resource]

# Review the plan carefully before applying
terraform apply -target=[resource]
```

For manually created resources (should not exist — but if they do):
Document every manual change as you undo it. Create an IaC
definition after the rollback to prevent recurrence.

---

## Post-Rollback Verification

After every rollback — verify the system is in the expected state:

```markdown
## Rollback Verification Report
**Date:** [YYYY-MM-DD]
**Brief:** [TASK-ID]
**Environment:** [environment]
**Rollback type:** [OTA / Store build / Code / Database / Infrastructure]

### Verification steps performed
1. [What was checked]
2. [What was checked]

### Current state
[Description of system state after rollback]

### Confirmed working
- [ ] [Feature or system that was affected]
- [ ] [Adjacent features that could have been impacted]

### Data impact
[Any data loss or corruption that occurred — or "None"]

### Root cause (if known)
[What caused the issue that required rollback]

### Next steps
[What brief or action is needed to address the root cause]
```

File this report at:
```
briefs/active/[TASK-ID]/reports/rollback-[date].md
```

Notify DevOps Lead immediately when rollback is complete.
