# Brief Base Template

> This file defines the universal fields present in every brief,
> regardless of request type. Type-specific fields are defined in
> the Intake Agent's skill files and appended after these base fields.
>
> This template is for reference. The Intake Agent generates briefs
> programmatically — do not edit briefs by hand unless correcting an error.

---

## Brief Structure

```markdown
# [TASK-ID]: [Short Title]

## Meta
- **ID:** [TYPE-YYYY-MM-DD-SEQ]
- **Type:** [New Feature | Bug Fix | Refactor | Config Change | DevOps Task | Research Spike]
- **Status:** [Backlog | Active | Blocked | Complete]
- **Priority:** [Critical | High | Medium | Low | Backlog]
- **Date Created:** [YYYY-MM-DD]
- **Requested By:** Operator
- **Branch:** [branch-name to be created by assigned agent]
- **File Lock:** [Populated by Orchestrator at routing time — list of files this brief owns while Active]

---

## Intent
> Why are we doing this? What problem does it solve or what opportunity does it capture?
> Written in plain language, not technical terms.

[Intent goes here]

---

## Scope
> What is explicitly included in this task?
> Be specific — vague scope is the leading cause of agent drift.

- [Scope item 1]
- [Scope item 2]

---

## Out of Scope
> What does this task explicitly NOT cover?
> Listing this prevents agents from doing unrequested work.

- [Out of scope item 1]
- [Out of scope item 2]

---

## Affected Teams
> Which teams need to do work for this task?

- [ ] Engineering — Frontend
- [ ] Engineering — Backend
- [ ] QA
- [ ] DevOps
- [ ] PM

---

## Dependencies
> What must be true or complete before this task can begin?
> Reference TASK IDs where applicable.

- [Dependency 1 or "None"]

---

## Open Questions
> Anything unresolved at brief creation time.
> Agents must not proceed past a question that blocks their work —
> escalate instead.

- [Question 1 or "None"]

---

## Notes
> Any additional context, links, references, or decisions already made
> that agents should be aware of.

[Notes or "None"]

---

## [TYPE-SPECIFIC FIELDS]
> Appended here by the Intake Agent based on request type.
> See agents/intake/skills/brief-writing/ for type-specific templates.

---

## Report Index
> Populated automatically as agents complete their work.

| Agent | Report | Status |
|---|---|---|
| — | — | — |

---

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```

---

## TASK ID Format

```
[TYPE]-[YYYY-MM-DD]-[SEQ]

FEAT-2026-03-14-001    New Feature
BUG-2026-03-14-002     Bug Fix
RFCT-2026-03-14-003    Refactor
CFG-2026-03-14-004     Config Change
INFRA-2026-03-14-005   DevOps / Infrastructure
SPIKE-2026-03-14-006   Research Spike
```

Sequence numbers are per day. If two tasks are created on the same day, they are 001 and 002.
The Intake Agent reads the briefs/ folder to determine the next available sequence number.

---

## Brief Lifecycle

```
Created by Intake Agent
    → saved to briefs/backlog/
    → Operator approves
    → moved to briefs/active/
    → Agents work
    → Orchestrator signs off
    → Operator signs off
    → moved to briefs/completed/
```
