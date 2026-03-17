# Skill — Escalation Handling

> Owner: qa-lead | Version: 1.0.0
> Defines how the QA Lead handles escalations from Senior QA.

---

## QA-Specific Escalation Categories

In addition to the standard escalation categories in `lead-base.md`,
QA escalations commonly fall into these patterns:

---

### Category — Cannot Reproduce
Senior QA cannot reproduce the scenario described in the brief
or acceptance criteria.

**Resolution:** Resolvable at Lead level in most cases.
Check the Engineering Lead handoff notes for setup instructions.
If setup instructions are missing or unclear, escalate to Orchestrator
to request clarification from Engineering Lead.

```
To: Senior QA
Escalation resolved.
Guidance: [Specific setup steps or clarification]
Proceed with: [Instruction]
```

---

### Category — Environment Not Ready
The branch under test is not accessible, the build is broken,
or the test environment is not configured correctly.

**Resolution:** Always escalate to Orchestrator.
QA cannot proceed without a working environment — this is a
blocking issue that Engineering must resolve.

```
To: Orchestrator
Brief: [TASK-ID]
QA blocked — environment not ready.
Issue: [Specific problem]
Impact: QA cannot begin testing until resolved.
Required action: Engineering Lead to confirm environment is ready.
```

---

### Category — Acceptance Criteria Untestable
An acceptance criterion is written in a way that cannot be
objectively tested — vague language, missing preconditions,
or contradictory conditions.

**Resolution:** Escalate to Orchestrator with a recommendation
to return the brief to Intake for revision.

```
To: Orchestrator
Brief: [TASK-ID]
Issue: Acceptance criterion is not testable as written.
Criterion: "[exact criterion text]"
Problem: [Why it cannot be tested objectively]
Recommended action: Return to Intake Agent to rewrite criterion.
```

---

### Category — Security Issue Found
Senior QA has identified a potential security vulnerability
during testing.

**Resolution:** Always escalate to Orchestrator immediately.
Testing stops on the affected area until the issue is resolved.

```
To: Orchestrator
Brief: [TASK-ID]
⚠️  Security issue found during QA testing.
Issue: [What Senior QA found]
Severity: [Senior QA's assessment]
Testing status: Paused on affected area.
```

---

### Category — Critical Bug Found
Senior QA has identified a Critical-severity bug during testing.
Critical means: app crash, data loss, security vulnerability, or
core feature completely broken for all users with no workaround.

**Resolution:** Bypass the standard reporting chain. Surface directly
to the operator via the Orchestrator immediately — do not wait for
the full QA report to be synthesised first.

Notify the Orchestrator with a pre-staged alert:

```
To: Orchestrator
Brief: [TASK-ID]
🔴  CRITICAL BUG — immediate operator attention required.

Summary: [One sentence description]
Severity: Critical
Platform: [iOS / Android / Both]

Steps to reproduce:
1. [Step]
2. [Step]
3. [Where crash or failure occurs]

Expected: [Expected behaviour]
Actual: [Actual behaviour]

QA testing: Paused on this area pending operator instruction.

Recommended action: Operator to confirm BUG brief creation.
Pre-staged brief type: BUG — [suggested short title]
```

The Orchestrator surfaces this to the operator as a priority alert,
not as part of the standard active brief summary. The operator responds
with one of:

- **Confirm** — Orchestrator instructs Intake Agent to create the BUG brief
  using the pre-staged details. No full Intake cycle required.
- **Reject / adjust** — Operator amends severity or scope before brief creation.
- **Hold** — Operator defers; QA Lead documents the decision in the brief Notes.

Do not wait for QA testing to complete before sending this alert.
Critical bugs are always surfaced immediately on discovery.
