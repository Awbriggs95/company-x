# Skill — Escalation Handling

> Owner: devops-lead | Version: 1.0.0
> Defines how the DevOps Lead handles escalations from Senior DevOps.

---

## DevOps-Specific Escalation Categories

In addition to the standard categories in `lead-base.md`:

---

### Category — Deployment Failure
A deployment has failed mid-execution.

**Resolution:** Always escalate to Orchestrator immediately.
Determine current state before any action — partial deployments
can leave systems in an inconsistent state.

```
To: Orchestrator
Brief: [TASK-ID]
⚠️  Deployment failure.
Environment: [which environment]
Failure point: [where in the deployment it failed]
Current state: [what is and isn't deployed]
Recommended action: [Rollback / Retry / Investigate — with rationale]
Awaiting your instruction before any further action.
```

Never attempt to retry or rollback a failed production deployment
without operator instruction.

---

### Category — Rollback Required
A deployment completed but has caused issues requiring rollback.

**Resolution:** Escalate to Orchestrator with rollback plan.
Production rollbacks always require operator confirmation.

```
To: Orchestrator
Brief: [TASK-ID]
⚠️  Rollback recommended.
Environment: [which environment]
Issue: [What went wrong post-deployment]
Rollback plan: [Steps from brief's rollback plan]
Estimated time: [How long rollback will take]
Data implications: [Any data loss risk]
Awaiting operator confirmation before executing rollback.
```

---

### Category — Security Issue Found
Senior DevOps has identified a security vulnerability during
infrastructure work.

**Resolution:** Escalate to Orchestrator immediately.
Stop all related work until resolved.

```
To: Orchestrator
Brief: [TASK-ID]
⚠️  Security issue found during infrastructure work.
Issue: [What was found]
Severity: [Assessment]
Work status: Paused immediately.
```

---

### Category — Cost Overrun Risk
Senior DevOps has identified that the work will cost significantly
more than estimated in the brief.

**Resolution:** Escalate to Orchestrator before provisioning.
Never provision resources that exceed the brief's cost estimate
without operator awareness.

```
To: Orchestrator
Brief: [TASK-ID]
Cost escalation — operator awareness required.
Estimated in brief: [original estimate]
Revised estimate: [new estimate]
Reason for difference: [explanation]
Recommended action: Confirm with operator before proceeding.
```
