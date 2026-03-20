# Skill — Escalation Handling

> Owner: engineering-lead | Version: 1.0.0
> Defines how the Engineering Lead handles escalations raised by
> Senior Frontend and Senior Backend agents.

---

## When This Skill Applies

Use this skill whenever a Senior agent raises an escalation.
Read this file completely before responding to any escalation.

---

## Step 1 — Receive and Acknowledge

When a Senior raises an escalation, acknowledge it immediately
before assessing it. Do not leave a Senior waiting without
confirmation their escalation was received:

```
Escalation received for [TASK-ID].
Assessing now — hold work on the blocked part until you hear from me.
Continue any unblocked work in the meantime.
```

---

## Step 2 — Classify the Escalation

Every escalation falls into one of five categories.
Classify before deciding how to respond.

---

### Category 1 — Ambiguity in Brief
The Senior cannot proceed because something in the brief is unclear
or can be interpreted in more than one way.

**Examples:**
- "The brief says update the user profile — does this include the avatar?"
- "Scope says touch LoginScreen.tsx but the fix requires changes in authService.ts too"

**Resolution:** Resolvable by you in most cases. Read the brief carefully,
make a reasonable interpretation, document your decision, and instruct
the Senior to proceed.

Only escalate to the Orchestrator if the ambiguity involves scope
that affects other teams or changes the brief's intent significantly.

```
To: Senior [role]
Escalation resolved — ambiguity clarified.
Decision: [Your interpretation]
Rationale: [Why this is the correct reading]
Proceed with: [Specific instruction]
Note added to brief: Yes
```

---

### Category 2 — Missing Information
The Senior needs information that is not in the brief and cannot
be inferred from existing context.

**Examples:**
- "The brief references a google-services.json file that doesn't exist in the repo"
- "API endpoint /auth/google is referenced but hasn't been built yet"

**Resolution:** Depends on what is missing.

- Missing file or asset → escalate to Orchestrator to source it
- Missing API from another team → check if Backend work is complete;
  if not, this is a sequencing issue — inform Orchestrator
- Missing stack decision → escalate to Orchestrator immediately,
  reference the ❓ Undecided item in shared/stack.md

```
To: Orchestrator
Brief: [TASK-ID]
Escalation: Missing information blocking Senior [role]
Missing: [What is needed]
Impact: [What cannot proceed without it]
Suggested action: [Your recommendation]
```

---

### Category 3 — Technical Infeasibility
The Senior has determined that the approach specified or implied
in the brief cannot be implemented as described.

**Examples:**
- "The brief assumes expo-auth-session supports this flow but it doesn't"
- "The schema change would break existing queries in ways not covered by the brief"

**Resolution:** Always escalate to Orchestrator. This is a brief-level
problem that may require returning to Intake for revision.

Do not let the Senior invent an alternative approach independently —
undocumented deviations from the brief create inconsistencies.

```
To: Orchestrator
Brief: [TASK-ID]
Escalation: Technical infeasibility
Issue: [What the Senior found]
Implication: [What this means for the brief]
Options:
  a) Revise the brief via Intake Agent
  b) [Alternative approach if one exists]
Recommended: [Your recommendation]
Work status: Paused on affected part
```

---

### Category 4 — Security Concern
The Senior has identified a security issue during their work,
regardless of severity.

**Resolution:** Always escalate to Orchestrator immediately.
No security concern is too minor to surface.

```
To: Orchestrator
Brief: [TASK-ID]
⚠️  Security concern identified by Senior [role]
Issue: [What was found]
Severity assessment: [Senior's assessment]
Work status: Paused on affected part pending your instruction
```

Do not attempt to resolve security concerns at Lead level.

---

### Category 5 — Scope Creep Discovered
The Senior has discovered during implementation that completing
the brief correctly requires work beyond what is scoped.

**Examples:**
- "Fixing this bug requires changing the auth flow which is out of scope"
- "The new feature needs a refactor of the state management to work correctly"

**Resolution:** Always escalate to Orchestrator. Never silently
expand scope. The additional work needs its own brief.

```
To: Orchestrator
Brief: [TASK-ID]
Escalation: Scope expansion required
Current scope: [What the brief covers]
Additional work found: [What the Senior discovered is needed]
Recommended action: Create a new brief for the additional work.
Current brief status: [Can complete original scope without expansion | Cannot complete without expansion]
```

---

### Category 6 — SPIKE-Specific Issues

SPIKE briefs have unique failure modes that don't map cleanly to
Categories 1–5. Use this category when the Senior is executing a
Research Spike brief.

**When to use:**
- Time box reached before success criteria are met
- Options to evaluate are insufficient or unavailable
- The question cannot be answered definitively with available information
- A proof of concept is needed but would exceed the time box

**Resolution:** Always escalate to you (the Lead) first. Assess whether
the SPIKE can be completed with a partial recommendation, or whether
it needs to be extended or restructured.

**If a partial recommendation is sufficient:**
```
To: Senior [role]
SPIKE escalation assessed — partial recommendation acceptable.
Document findings to date, state clearly what remains uncertain,
and include a suggested next step in the output.
Proceed to filing the spike output report.
```

**If the SPIKE needs to be extended or restructured:**
Escalate to Orchestrator with a clear statement of what additional
time or scope is needed:

```
To: Orchestrator
Brief: [TASK-ID]
Escalation: SPIKE cannot complete within current constraints
Issue: [What the Senior encountered — time box, insufficient options, etc.]
Current findings: [Summary of what has been discovered so far]
Options:
  a) Extend time box — [additional time needed and why]
  b) Restructure scope — [what would need to change in the brief]
  c) Accept partial recommendation — [what can be concluded now]
Recommended: [Your recommendation]
```

Do not let the Senior exceed the time box silently. A SPIKE that
runs indefinitely has failed — surface it and let the operator decide.

---

## Step 3 — Document Every Escalation

Regardless of outcome, log every escalation in the brief's Notes section:

```markdown
[DATE] — Escalation by Senior [role]
Type: [Category]
Issue: [One sentence summary]
Resolution: [Resolved by Lead / Escalated to Orchestrator]
Decision: [What was decided, if resolved at Lead level]
```

This creates an audit trail and helps identify patterns — if the same
type of escalation recurs across briefs, it signals a gap in the
Intake or brief-writing process.

---

## Response Time Expectations

Escalations pause the Senior's work on the blocked part.
Respond to every escalation within the same working session.
Do not let an escalation sit unacknowledged — it stalls the entire brief.
