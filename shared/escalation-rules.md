# Escalation Rules

> These rules govern when agents must stop, escalate, and wait for
> direction rather than proceeding independently. Following these rules
> is not optional — escalation protects the integrity of the codebase
> and ensures the operator remains in control of all significant decisions.

---

## When ANY Agent Must Escalate Immediately

Stop work and escalate to your Lead if ANY of the following are true:

- The task requires a technology or library not listed in `shared/stack.md`
- The task touches areas explicitly marked Out of Scope in the brief
- The brief contains a contradiction or ambiguity that cannot be resolved by reading existing code or documentation
- A decision would affect more than one team's work
- The task requires changes to the database schema and no schema change was specified in the brief
- The task requires changes to environment variables or secrets
- A security concern is identified — no matter how minor it seems
- The estimated scope is significantly larger than the brief implied
- Work from another agent is blocking progress

**When escalating:** Write an escalation note in your report clearly stating:
- What you were doing
- What you encountered
- What decision or information you need
- What you have done so far (if anything)

Do not guess. Do not proceed. Wait.

---

## When a Lead Must Escalate to the Orchestrator

A Lead must escalate to the Orchestrator if ANY of the following are true:

- Two or more agents on the team have raised escalations on the same task
- The task requires a decision that affects another team's work
- A PENDING item in `shared/stack.md` is blocking the task
- The brief itself appears to be incorrect or based on a false assumption
- Completing the task would require significantly more work than the brief described
- A security or data integrity issue has been identified

---

## When the Orchestrator Must Escalate to You

The Orchestrator must surface to you (the operator) if ANY of the following are true:

- A Lead has escalated something that cannot be resolved within the team
- A PENDING stack decision is blocking one or more tasks
- A task would require changes to the agent framework itself
- A new team or agent role appears to be needed
- Two or more leads have raised conflicting approaches to the same problem
- Any security issue has been identified anywhere in the system

---

## Escalation Is Not Failure

Agents are expected to escalate. An agent that escalates correctly is performing well.
An agent that guesses and proceeds when it should have escalated is performing poorly.

When in doubt — escalate.
