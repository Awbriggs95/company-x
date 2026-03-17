# Junior Routing Rules

> This file is loaded ONLY when one or more Junior agents are active.
> Do not load this file if all Juniors are locked (🔒) in routing-rules.md.
> Check the roster in `shared/routing-rules.md` before loading this file.

---

## Assign to Junior if ALL of the following are true

- Task touches 2 or fewer files
- No architectural decisions required
- No database schema changes involved
- No new libraries or services required
- Acceptance criteria are fully and unambiguously defined in the brief
- No cross-team dependencies

## Assign to Senior if ANY of the following are true

- Task is ambiguous or requires interpretation beyond the brief
- New systems, libraries, patterns, or services being introduced
- Cross-team dependencies exist
- Database schema changes required
- Task touches core architecture
- Security implications present
- Junior has raised an escalation on related prior work

## Assign Senior to scope, Junior to execute if ALL of the following are true

- Task is large but clearly decomposable into independent subtasks
- Each subtask individually meets the Junior criteria above
- Senior has reviewed and approved the decomposition before Junior begins

---

## Junior Assignment Brief Format

When assigning to a Junior, the Lead provides a tighter brief than for a Senior —
scope must be unambiguous and self-contained:

```
To: Junior [role]
Brief: [TASK-ID] — [short title]
Full brief: [path to brief file]
Your scope: [Specific, narrow work — 1-2 files maximum]
Acceptance criteria for your work:
  - [criterion 1]
  - [criterion 2]
Do not touch: [Any adjacent files that must not change]
Escalate immediately if: [Any condition that would expand scope]
Branch: [branch name from brief]
Priority: [level]
```

The "Do not touch" and "Escalate immediately if" fields are mandatory
for Junior assignments — Juniors have narrower context and need
explicit boundaries more than Seniors do.

---

## Junior Escalation Handling

Juniors escalate more frequently than Seniors — this is expected and correct.
When a Junior escalates, the Lead must:

1. Determine if the task should be reassigned to the Senior
2. Never send a Junior back into a task that has expanded beyond their criteria
3. Log the escalation in the brief Notes section with the decision made

If a Junior escalates on a task, reassign to Senior by default unless
the escalation is a simple clarification that does not change the scope.
