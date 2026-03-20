# Escalation Rules

> These rules govern when agents must stop, escalate, and wait for
> direction rather than proceeding independently. Following these rules
> is not optional — escalation protects the integrity of the codebase
> and ensures the operator remains in control of all significant decisions.

---

## Stack Gap Resolution Loop

When a Senior encounters a technology not in `shared/stack.md` mid-task,
they escalate directly to the operator — not through the Lead or Orchestrator.
This keeps the resolution fast and avoids stalling the brief in the
escalation chain for a decision only the operator can make.

```
Senior escalates directly to operator
    → Operator evaluates: can I decide this now, or do I need research?
    → Path A: Decide now
    → Path B: Create a SPIKE brief first
```

**Senior escalation format for stack gaps:**

```
To: Operator
Brief: [TASK-ID]
Escalation type: Stack gap
Missing decision: [capability / technology name]
Context: [One sentence — what I was trying to do when I hit this gap]
Blocked: [What I cannot proceed with until this is resolved]
Continuing: [What I can still work on, or "Nothing — fully blocked"]

Action needed:
Decide which path to take — see Stack Gap Resolution Loop in
shared/escalation-rules.md for both options.
```

---

### Path A — Decide Now

Use when the operator already knows the answer and can commit immediately.

```
Operator opens admin agent
    → Updates shared/stack.md entry to ✅ Decided
    → Notifies the Senior's Lead that the decision is resolved
    → Lead updates the brief's Notes section with the resolved decision
    → Lead instructs Senior to resume
    → Brief status returns to Active
```

---

### Path B — Create a SPIKE Brief First

Use when the decision requires research before the operator can commit.

```
Operator activates Intake agent
    → Submits a SPIKE request scoped to the missing decision
    → Intake writes the SPIKE brief and files it to briefs/backlog/
    → Operator activates Orchestrator and routes the SPIKE
    → Orchestrator sets the relevant stack.md entry to 🔄 In Review
    → Original brief stays Active but Blocked — Senior continues unblocked parts
    → SPIKE completes → Orchestrator surfaces recommendation to operator
    → Operator confirms decision
    → Admin agent updates stack.md entry to ✅ Decided
    → Operator notifies the Senior's Lead that the decision is resolved
    → Lead instructs Senior to resume
    → Brief status returns to Active
```

**While the SPIKE is running:**
The Senior must not guess, proceed, or pick a technology independently.
Continue any unblocked work. Wait on anything touching the undecided decision.

**The original brief is not closed or cancelled while the SPIKE runs.**
It remains in `briefs/active/` with Status: Blocked. The Orchestrator
is aware of both briefs simultaneously.

---

## When ANY Agent Must Escalate Immediately

Stop work and escalate to your Lead if ANY of the following are true:

- The task requires a technology or library not listed in `shared/stack.md`
  → This is a stack gap. Escalate directly to the operator — not through
  your Lead or the Orchestrator. Use the Stack Gap Resolution Loop format
  defined above. Do not proceed or guess — wait for the resolved decision
  to be passed back through your Lead.
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
- A ❓ Undecided item in `shared/stack.md` is blocking the task
- The brief itself appears to be incorrect or based on a false assumption
- Completing the task would require significantly more work than the brief described
- A security or data integrity issue has been identified

---

## When the Orchestrator Must Escalate to You

The Orchestrator must surface to you (the operator) if ANY of the following are true:

- A Lead has escalated something that cannot be resolved within the team
- A ❓ Undecided stack decision is blocking one or more tasks
- A task would require changes to the agent framework itself
- A new team or agent role appears to be needed
- Two or more leads have raised conflicting approaches to the same problem
- Any security issue has been identified anywhere in the system

---

## Escalation Is Not Failure

Agents are expected to escalate. An agent that escalates correctly is performing well.
An agent that guesses and proceeds when it should have escalated is performing poorly.

When in doubt — escalate.
