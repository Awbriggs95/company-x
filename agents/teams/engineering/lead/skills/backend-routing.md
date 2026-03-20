# Skill — Backend Routing

> Owner: engineering-lead | Version: 1.0.0
> Defines how the Engineering Lead assigns and scopes backend work
> to the Senior Backend agent.

---

## When This Skill Applies

Use this skill when a brief has Engineering — Backend checked in
its Affected Teams field, or when any of the following are in scope:

- API endpoint creation or modification
- Database schema changes
- Business logic and data processing
- Authentication and authorisation
- Third-party service integrations (server-side)
- Data validation and error handling

---

## What Backend Work Looks Like

Before scoping backend work, identify which category it falls into:

| Category | Examples | Typical complexity |
|---|---|---|
| New endpoint | POST /auth/google, GET /users/:id | Medium |
| Schema change | New table, new column, index | Medium–High |
| Business logic | Calculation, transformation, rule | Medium |
| Auth work | OAuth integration, session management | High |
| Third-party integration | Payment provider, email service | High |
| Data migration | Updating existing records | High — handle with care |
| Endpoint modification | Add field to response, change validation | Low–Medium |

Use this to set realistic expectations in the assignment brief.

---

## Scoping Backend Work

When assigning backend work to the Senior Backend agent, extract
the following from the brief and include it in the assignment:

### From a New Feature brief (FEAT)
```
API changes required:     [from API Changes Required]
Database changes:         [from Database Changes Required]
Auth requirements:        [from brief — any auth/permission notes]
Acceptance criteria:      [backend-relevant items only]
```

### From a Bug Fix brief (BUG)
```
Suspected cause:          [from Suspected Cause]
Steps to reproduce:       [from Steps to Reproduce]
Expected behaviour:       [from Expected Behaviour]
Actual behaviour:         [from Actual Behaviour]
Acceptance criteria:      [backend-relevant items only]
```

### From a Refactor brief (RFCT)
```
Files in scope:           [from Scope Boundaries — In scope]
Files out of scope:       [from Scope Boundaries — Out of scope]
What must not change:     [from What Must Not Change — internal contracts]
Definition of done:       [from Definition of Done]
```

---

## Backend-Specific Assignment Rules

### Schema changes first
If the brief involves both schema changes and API changes, the
Senior Backend agent must complete and confirm the schema migration
before building the API layer on top of it.

State this sequencing explicitly in the assignment:
```
Sequencing: Complete schema changes first and confirm before
building API endpoints. Do not build API against an unconfirmed schema.
```

### Data migrations
If existing data needs to be migrated as part of a schema change,
flag this to the Senior Backend agent explicitly:
```
⚠️  This change involves a data migration. Confirm migration
strategy before executing. Irreversible migrations require
operator approval — escalate before running.
```

### Stack decisions pending
Before assigning any backend work, check `shared/stack.md` for
❓ Undecided items in the backend section. If the work depends on a
❓ Undecided decision (e.g. framework, database, cloud provider) —
do not assign the work. Surface to the Orchestrator immediately:

```
To: Orchestrator
Cannot assign backend work for [TASK-ID].
❓ Undecided stack decision blocks this work: [decision name]

The operator should either:
a) Decide now — update stack.md via admin agent, then instruct me to proceed
b) Research first — create a SPIKE brief via Intake to evaluate options

Holding assignment until resolved.
```

Do not create the SPIKE brief yourself and do not assume the operator
needs one — they may already know the answer. Surface the block and
wait for instruction.

### New libraries
If the Senior Backend agent proposes using a library not in
`shared/stack.md` — this must be escalated to the Orchestrator
before the library is used. Do not allow the Senior to proceed
with an unapproved dependency.

---

## Backend Completion Criteria

Before accepting the Senior Backend agent's work as complete,
verify all of the following:

- [ ] All acceptance criteria relevant to backend are met
- [ ] API endpoints return correct responses for happy path and error cases
- [ ] Schema changes have been applied and tested
- [ ] No breaking changes to existing endpoints (unless explicitly in scope)
- [ ] Code passes Flake8 and Black per shared/conventions.md
- [ ] Environment variables documented in .env.example
- [ ] Branch is pushed and PR is open against the correct base branch
