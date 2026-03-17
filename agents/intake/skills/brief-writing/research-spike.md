# Brief Writing — Research Spike

> This file defines the type-specific fields appended to the base brief
> template for Research Spike requests. Read `shared/brief-template.md`
> first for the universal base fields that precede these.
>
> TASK ID prefix: SPIKE

---

## When to Use This Template

Use this template when the request is a time-boxed investigation to
answer a specific question or evaluate options before a decision can
be made. The key test: is the primary output a decision or recommendation
rather than working software?

If the answer is no — reconsider the type. It may be a New Feature
(something is being built) or a Refactor (existing code is being improved).

**Important:** A spike produces a recommendation, not production code.
Agents must not build the full solution during a spike — they investigate,
evaluate, and recommend. Building happens in a subsequent brief once the
decision is made and operator-approved.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### Question to Answer

The single, specific question this spike must answer. Everything else
in the brief serves this question.

```markdown
## Question to Answer

[One clear, specific question]

**Why this question matters:**
[The context that makes this question worth investigating now]

**What happens if we don't answer it:**
[The risk or blocker that exists without this answer]
```

**Writing rules:**
- One question per spike — if you have two questions, create two spikes
- The question must be answerable — "what is the best technology ever"
  is not a valid spike question; "which state management library best
  fits our Expo stack and team constraints" is
- Phrase it as a question, not a task — "evaluate options for X" is
  a task; "which option for X best meets our requirements" is a question
- The question must have a definitive answer — if it cannot be answered
  definitively, it needs scoping before a spike is created

---

### Success Criteria

The specific conditions that define a complete and useful spike output.
This tells agents when to stop researching and start writing up.

```markdown
## Success Criteria

The spike is complete when ALL of the following are true:

- [ ] [Specific criterion 1 — e.g. "At least 3 options have been evaluated"]
- [ ] [Specific criterion 2 — e.g. "Each option has been assessed against our constraints"]
- [ ] [Specific criterion 3 — e.g. "A clear recommendation has been made with rationale"]
- [ ] The output format specified below has been produced
- [ ] The decision this spike unblocks can now be made with confidence
```

**Writing rules:**
- Criteria must be verifiable — the QA agent must be able to confirm
  each one is met by reading the spike output
- Always include "a clear recommendation has been made" — a spike that
  concludes "it depends" without a recommendation has not succeeded
- Always include "the decision this spike unblocks can now be made" —
  this keeps the spike focused on its purpose
- Do not set criteria that require building production code —
  prototypes and proofs of concept are acceptable; full implementations are not

---

### Time Box

The maximum time the spike should run before producing output.
A spike that runs indefinitely is not a spike — it is a project.

```markdown
## Time Box

**Maximum duration:** [e.g. 2 hours / half day / 1 day / 2 days]

**If the time box is reached before success criteria are met:**
Produce the best available recommendation with current findings.
Clearly note what remains uncertain and what additional investigation
would resolve it. Do not exceed the time box — surface the partial
findings and let the operator decide whether to extend.
```

**Time box guidance by spike type:**

| Spike Type | Suggested Time Box |
|---|---|
| Library or tool evaluation | 2–4 hours |
| Architecture approach evaluation | Half day |
| Third-party API evaluation | 2–4 hours |
| Performance investigation | Half day |
| Security approach evaluation | Half day to 1 day |
| Complex architecture decision | 1–2 days |

**Writing rules:**
- Never set a time box longer than 2 days — if more time is needed,
  the question is too broad and should be split
- The time box is a hard ceiling, not a target — agents should aim
  to answer the question as efficiently as possible
- If the operator has an urgency constraint, set the time box accordingly
  and note any quality tradeoffs

---

### Options to Evaluate

The known candidates or approaches the spike should consider.
This prevents agents from researching options that have already
been ruled out and focuses investigation on realistic choices.

```markdown
## Options to Evaluate

| Option | Description | Known Pros | Known Cons |
|---|---|---|---|
| [Option 1] | [Brief description] | [Any known advantages] | [Any known disadvantages] |
| [Option 2] | [Brief description] | [Any known advantages] | [Any known disadvantages] |
| [Option 3] | [Brief description] | [Any known advantages] | [Any known disadvantages] |

**Evaluation criteria:**
These are the dimensions each option must be assessed against:

| Criterion | Weight | Notes |
|---|---|---|
| [Criterion 1 — e.g. Expo compatibility] | [High / Medium / Low] | [Any specific requirements] |
| [Criterion 2 — e.g. Bundle size impact] | [High / Medium / Low] | [Any specific requirements] |
| [Criterion 3 — e.g. Community support] | [High / Medium / Low] | [Any specific requirements] |

**Can the agent consider options not listed above?** [Yes / No]
[If yes — note any constraints on what qualifies as a valid option]
```

**Writing rules:**
- List every option you are already aware of — even ones you suspect
  are wrong, so agents do not waste time rediscovering them
- Known pros and cons can be blank if unknown — the agent will populate
  them during the spike
- Evaluation criteria must reflect your actual constraints — not
  generic best practices. Reference stack.md where relevant.
- Weight the criteria honestly — everything being "High" gives agents
  no way to make tradeoffs

---

### Output Format

The specific format the spike output must take. This determines how
the recommendation gets communicated and how easy it is to act on.

```markdown
## Output Format

**Primary output:** [Choose one]
- [ ] Recommendation document — written summary with rationale and decision
- [ ] Comparison table — structured evaluation of all options against criteria
- [ ] Proof of concept — minimal working code demonstrating the recommended option
- [ ] Combination — [specify which formats and why]

**Output location:** briefs/active/[TASK-ID]/reports/senior-[team]-spike-output.md

**Required sections in output:**
1. Recommendation — the answer to the question, stated clearly upfront
2. Rationale — why this option was chosen over the others
3. Options evaluated — summary of each option assessed
4. Risks and open questions — what is still uncertain
5. Suggested next brief — the TASK ID type and description of what should be created next
```

**Writing rules:**
- Recommendation document is the default — use it unless a proof of
  concept is genuinely necessary to validate the recommendation
- Proof of concept code must be clearly marked as throwaway —
  it must not be used as the basis for production code without a
  proper New Feature brief
- The "suggested next brief" section is mandatory — a spike that does
  not point to the next action has not completed its job
- Output must be written for the operator to read and approve —
  not just for other agents

---

### Decision This Unblocks

An explicit statement of what becomes possible once this spike is
complete and a decision is made. This justifies the spike and ensures
it is genuinely necessary before agents spend time on it.

```markdown
## Decision This Unblocks

**Decision to be made:** [The specific choice that will be made using this spike's output]

**Who makes the decision:** Operator

**Briefs unblocked after decision:**
- [TASK ID type and description of brief that can be created once this spike is done]
- [Any additional briefs]

**Impact of delaying this spike:**
[What is blocked or at risk while this question remains unanswered]
```

**Writing rules:**
- The decision must be made by the operator — agents recommend,
  operators decide
- List every brief that is blocked waiting for this spike — this
  shows the true cost of the investigation and its value
- If no briefs are blocked by this spike, question whether it is
  necessary right now — it may belong in the backlog

---

## Complete Research Spike Brief Example

```markdown
# SPIKE-2026-03-14-006: State Management Library Selection

## Meta
- **ID:** SPIKE-2026-03-14-006
- **Type:** Research Spike
- **Status:** Active
- **Priority:** High
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** spike/SPIKE-2026-03-14-006-state-management

## Intent
State management is currently marked as PENDING in stack.md.
We are about to build features that require shared state across
screens. We need to select our approach before development begins
to avoid having to refactor later.

## Scope
- Evaluate state management options for our Expo React Native stack
- Produce a clear recommendation with rationale

## Out of Scope
- Implementing the chosen solution (separate New Feature brief)
- State management for backend services
- Server-side caching strategies

## Affected Teams
- [ ] Engineering — Frontend
- [ ] Engineering — Backend
- [ ] DevOps
- [ ] QA
- [x] PM

## Dependencies
- None

## Open Questions
- None

## Notes
**Assumptions made during intake:**
- Assumed High priority — blocks multiple upcoming feature briefs

---

## Question to Answer
Which state management approach best fits our Expo React Native
stack, current team size, and anticipated product complexity?

**Why this question matters:**
We are about to build features requiring shared state. Choosing
the wrong approach now means a costly refactor later.

**What happens if we don't answer it:**
All feature briefs involving shared state are blocked until
this decision is made.

## Success Criteria

The spike is complete when ALL of the following are true:

- [ ] At least 3 options have been evaluated against our criteria
- [ ] Each option has been assessed for Expo compatibility
- [ ] A clear recommendation has been made with rationale
- [ ] Risks and tradeoffs of the recommended option are documented
- [ ] The comparison table output has been produced
- [ ] The decision this spike unblocks can now be made with confidence

## Time Box

**Maximum duration:** Half day (4 hours)

**If the time box is reached before success criteria are met:**
Produce the best available recommendation with current findings.
Clearly note what remains uncertain and surface to operator.

## Options to Evaluate

| Option | Description | Known Pros | Known Cons |
|---|---|---|---|
| Zustand | Lightweight global state library | Simple API, small bundle | Less structure for large apps |
| Redux Toolkit | Industry standard state management | Mature, well documented | Verbose, steeper learning curve |
| React Context + useReducer | Built-in React state approach | No dependencies, familiar | Can cause performance issues at scale |
| Jotai | Atomic state management | Flexible, minimal boilerplate | Smaller community than Redux |

**Evaluation criteria:**

| Criterion | Weight | Notes |
|---|---|---|
| Expo / React Native compatibility | High | Must work without ejecting |
| Bundle size impact | High | Mobile performance is critical |
| Learning curve | Medium | Solo operator — simplicity matters |
| Community and maintenance | Medium | Long-term viability required |
| Scalability | Medium | Must support growing product complexity |

**Can the agent consider options not listed above?** Yes
Any option must be compatible with Expo managed workflow without ejecting.

## Output Format

**Primary output:** Combination
- Comparison table — structured evaluation of all options
- Recommendation document — clear decision with rationale

**Output location:**
briefs/active/SPIKE-2026-03-14-006/reports/senior-frontend-spike-output.md

**Required sections in output:**
1. Recommendation — the answer to the question, stated clearly upfront
2. Rationale — why this option was chosen over the others
3. Options evaluated — comparison table with scores per criterion
4. Risks and open questions — what is still uncertain
5. Suggested next brief — FEAT or RFCT brief to implement the decision

## Decision This Unblocks

**Decision to be made:** Which state management library to adopt
as the standard for all Company-X projects.

**Who makes the decision:** Operator

**Briefs unblocked after decision:**
- FEAT brief: Implement chosen state management library as project standard
- All subsequent feature briefs requiring shared state

**Impact of delaying this spike:**
All features requiring shared state across screens are blocked.
Agents will make inconsistent local decisions if no standard exists.

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
