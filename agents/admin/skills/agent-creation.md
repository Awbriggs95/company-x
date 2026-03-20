# Skill — Agent Creation

> Owner: admin-agent | Version: 1.0.0
> Guides the operator through creating a new agent of any type and
> integrating it fully into the Company-X framework.
> Always load agent-hooks.md after this skill completes —
> creation and propagation are two separate steps.

---

## When This Skill Loads

Load this skill when the operator selects `create` from the
admin agent's agents view, or types `create agent` at any point
while the admin agent is active.

---

## Step 1 — Identify the Creation Path

Ask the operator these key questions upfront before anything else.
Present all three at once — do not ask them one at a time.

```
To create the right agent I need to understand a few things:

1. What type of agent is this?
   a) Junior variant of an existing senior
      (e.g. Junior Frontend, Junior Backend)
   b) New senior or lead within an existing team
      (e.g. a second Senior Frontend, a Principal Engineer)
   c) Entirely new team type
      (e.g. a Design team, a Data team, a Security team)

2. What is the agent's name and role in one sentence?

3. Which team does it belong to, or what team will it create?
```

Wait for all three answers before proceeding.
Use the answers to classify the path and derive follow-up questions.

---

## Path A — Junior Variant of an Existing Senior

### When to use
The operator has named a discipline that matches an existing
senior agent (Frontend, Backend, QA, DevOps).

### Key questions (upfront)
These are asked after the initial three questions above confirm Path A:

```
A few more things before I build this:

1. Which senior agent is this junior based on?
   (The senior's CLAUDE.md will be used as the reference template)

2. What work is this junior scoped to?
   (e.g. "simple UI components only", "single-file bug fixes only")

3. Are there specific skills from the senior that should be
   excluded or restricted for this junior?
```

### What to derive from answers
- Identity: Junior [Discipline] — constrained version of Senior [Discipline]
- Lane: narrower than senior — reference routing-rules-junior.md for constraints
- Skills: subset of senior's skills — exclude any requiring architectural judgment
- Escalation: lower threshold than senior — juniors escalate more, that is expected
- Reports to: same lead as the equivalent senior
- Permissions: read same as senior, write narrowed to scoped files only

### Follow-up triggers
If the operator's scope answer is vague (e.g. "simple tasks") — ask:
```
Can you give me an example of the most complex task this junior
should handle independently without escalating?
```

Use the answer to define the escalation boundary precisely.

---

## Path B — New Senior or Lead Within an Existing Team

### When to use
The operator wants to add a new role within a team that already exists —
a second senior specialist, a principal, a tech lead, etc.

### Key questions (upfront)

```
A few more things before I build this:

1. Which existing team does this agent join?
   (Engineering / QA / DevOps / other)

2. What does this agent own that no existing agent currently owns?
   (What gap does this fill?)

3. Does this agent coordinate others (lead behaviour) or
   execute work directly (senior behaviour)?

4. Which existing agent is the closest reference for this role?
```

### What to derive from answers
- Identity: defined by the gap they fill, not by the team name alone
- Lane: must not overlap with existing agents on the same team —
  define explicitly what this agent does AND what it defers to others
- Skills: derive from the gap described — create new skill files if needed
- Reports to: if senior → existing team lead. If lead → orchestrator.
- Shared behaviours: load lead-base.md or senior-base.md as appropriate

### Follow-up triggers
If the lane overlaps with an existing agent — surface it:
```
This role overlaps with [existing agent] in [area].
How should they divide that work? Should one defer to the other,
or do they collaborate on it?
```

Resolve the overlap before proceeding. Undefined overlaps cause
agents to conflict in practice.

---

## Path C — Entirely New Team Type

### When to use
The operator wants to add a discipline that has no existing team —
Design, Data, Security, Product, etc.

### Key questions (upfront)

```
Creating a new team involves more decisions than adding to an
existing one. Let me ask the key questions first:

1. What is the team's discipline in one word?
   (e.g. Design, Data, Security, Product)

2. What kinds of work does this team own?
   (Describe in plain language — what requests would go to this team?)

3. Where does this team sit in the workflow?
   - Before engineering (e.g. design, research)
   - Alongside engineering (e.g. security, data)
   - After engineering (e.g. QA already exists — similar pattern)
   - Independent of engineering (e.g. product strategy)

4. Does this team need a lead agent, or just a senior agent to start?

5. What is the most important skill this team needs?
   (This will become the first skill file — others can be added later)
```

### What to derive from answers

**Team structure:**
- Lead agent: if answer to Q4 is yes → create lead CLAUDE.md with
  routing, escalation, and report-synthesis skills
- Senior agent: always create at least one → define their execution lane

**Workflow integration:**
Use the answer to Q3 to determine where the team slots into the
orchestrator's routing patterns:

| Position | Integration point |
|---|---|
| Before engineering | Orchestrator routes to this team first, then engineering |
| Alongside engineering | Orchestrator can route in parallel with engineering |
| After engineering | Orchestrator routes after engineering lead report is filed |
| Independent | Orchestrator routes independently, not in the main sequence |

**Skills to create:**
- For the lead: routing.md, escalation-handling.md, report-synthesis.md
  (same pattern as all existing leads)
- For the senior: at minimum one domain skill based on Q5 answer
- Additional skills can be added later via the same creation flow

### Follow-up triggers

If workflow position is ambiguous — ask:
```
Does this team's work need to be complete before engineering
can start, or can engineering work in parallel with them?
```

If the team has dependencies on other teams — ask:
```
Does [new team] need output from any existing team before
they can begin, or are they self-contained?
```

Document all dependencies in the agent's CLAUDE.md and
flag them to agent-hooks.md for propagation into the
orchestrator's routing patterns.

---

## Step 2 — Build the Agent Definition

Once all questions are answered, compile the agent definition
internally before showing anything to the operator.

The definition must capture:

```
Agent definition:
  Name:           [agent name]
  Path:           [file path for CLAUDE.md]
  Type:           [Path A / B / C]
  Team:           [team name]
  Reports to:     [lead name or orchestrator]
  Lane:           [what it does / what it defers]
  Skills:         [list of skills with paths]
  New skills:     [skills that need to be created]
  Shared base:    [senior-base.md or lead-base.md]
  Permissions:    [read / write / deny summary]
  Status:         [✅ Active on creation or 🔒 locked]
```

Do not show this to the operator — it is internal scaffolding
used to generate the diff in the next step.

---

## Step 3 — Hand Off to agent-hooks.md

Once the agent definition is complete, load
`agents/admin/skills/agent-hooks.md` and pass it the
agent definition.

agent-hooks.md is responsible for:
- Generating the full diff of all files to be created and updated
- Presenting the diff to the operator for confirmation
- Writing all files after confirmation is received

Do not write any files directly from this skill.
All file writing happens through agent-hooks.md.

Notify the operator before handing off:
```
Agent definition complete. Building the full change list now —
I'll show you everything before anything is written.
```

---

## What This Skill Never Does

- Never writes files directly — that is agent-hooks.md's responsibility
- Never creates an agent without completing all path-specific questions
- Never leaves a lane overlap unresolved before proceeding
- Never skips the follow-up trigger checks
- Never creates a new team without at least one senior agent and
  one domain skill file
