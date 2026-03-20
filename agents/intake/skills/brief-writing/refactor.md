# Brief Writing — Refactor

> This file defines the type-specific fields appended to the base brief
> template for Refactor requests. Read `shared/brief-template.md` first
> for the universal base fields that precede these.
>
> TASK ID prefix: RFCT

---

## When to Use This Template

Use this template when the request improves the internal structure,
quality, or maintainability of existing code without changing its
external behaviour. The key test: will a user notice any difference
after this work is done?

If the answer is yes — reconsider the type. It may be a New Feature
or Bug Fix, not a Refactor.

**Important:** Refactors carry more risk than they appear to.
Agents must treat refactor briefs with extra caution — the scope
boundaries and "what must not change" fields are not suggestions,
they are hard constraints.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### Current State

A clear description of what exists today and why it is a problem
worth solving. This justifies the refactor and gives agents
enough context to understand what they are working with.

```markdown
## Current State

**What exists today:**
[Description of the current code structure, pattern, or approach]

**Why it is a problem:**
[The specific pain this causes — hard to read, hard to test,
causes bugs, slows down development, violates conventions, etc.]

**Location:**
[Specific files, folders, or modules affected]
```

**Writing rules:**
- Be specific about location — vague descriptions like "the auth code
  is messy" give agents nothing to work with
- Focus on the structural problem, not symptoms — "this function does
  five unrelated things" is more useful than "this is confusing"
- Do not describe the solution here — that belongs in Target State

---

### Target State

A description of what the code should look like after the refactor
is complete. Gives agents a clear goal without prescribing implementation.

```markdown
## Target State

**What good looks like after this work:**
[Description of the desired structure, pattern, or approach]

**Key improvements:**
- [Improvement 1]
- [Improvement 2]
- [Improvement 3]
```

**Writing rules:**
- Describe structure and intent, not specific implementation details
- If a specific pattern is required (e.g. "extract into a custom hook"),
  state it — but only if it is a hard requirement, not a preference
- The target state must be achievable without changing external behaviour —
  if it requires behaviour changes, split into a Refactor + New Feature brief

---

### Scope Boundaries

An explicit statement of what is inside and outside the scope of this
refactor. This is the most important field in a refactor brief —
scope creep in refactors is the leading cause of unintended breakage.

```markdown
## Scope Boundaries

**In scope — agents may touch these:**
- [File, folder, module, or pattern 1]
- [File, folder, module, or pattern 2]

**Out of scope — agents must not touch these:**
- [File, folder, module, or pattern 1]
- [File, folder, module, or pattern 2]
```

**Writing rules:**
- Be exhaustive on the out-of-scope list — anything not explicitly
  excluded may be considered fair game by an agent
- If a file is adjacent to the refactor but should not be touched,
  name it explicitly in out of scope
- If the scope is genuinely uncertain, that is a signal to run a
  Research Spike brief first before attempting the refactor

---

### What Must Not Change

An explicit list of behaviours, interfaces, and contracts that must
remain identical after the refactor. This is the agent's safety net —
if any of these change, the refactor has introduced a regression.

```markdown
## What Must Not Change

**External behaviour:**
- [User-facing behaviour 1 that must remain identical]
- [User-facing behaviour 2 that must remain identical]

**Internal contracts:**
- [API endpoint, function signature, or data shape that must not change]
- [Any other interface consumed by code outside the refactor scope]

**Tests:**
- All existing tests must pass without modification after the refactor
- [Any additional test-specific constraints]
```

**Writing rules:**
- Think in terms of contracts — what does other code depend on?
  Function signatures, return types, API shapes, event names
- If a behaviour is not listed here, an agent may assume it is
  acceptable for it to change — be thorough
- "All existing tests must pass" is a baseline, not a complete list —
  add specific behaviours that tests may not cover

---

### Risk Assessment

An honest assessment of what could go wrong during this refactor
and how to mitigate it.

```markdown
## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [Risk 1] | [Low/Med/High] | [Low/Med/High] | [How to reduce or catch it] |
| [Risk 2] | [Low/Med/High] | [Low/Med/High] | [How to reduce or catch it] |

**Overall risk level:** [Low | Medium | High]

**Recommended approach:**
[Any specific sequencing, checkpoints, or precautions agents should take]
```

**Common refactor risks to consider:**
- Breaking an interface consumed by code outside the refactor scope
- Changing behaviour that is untested and therefore invisible
- Introducing performance regressions
- Merge conflicts if other agents are working in adjacent files
- Missing an instance of the pattern being replaced

**Writing rules:**
- Every refactor must have at least one risk listed — "None" is not
  an acceptable answer. If no risks come to mind, look harder.
- High overall risk briefs should include a recommended incremental
  approach — do not attempt high-risk refactors in a single pass

---

### Definition of Done

The specific, testable conditions that confirm the refactor is
complete and has not introduced regressions.

```markdown
## Definition of Done

- [ ] [Structural condition — e.g. "No function exceeds 30 lines"]
- [ ] [Coverage condition — e.g. "All instances of the old pattern replaced"]
- [ ] [Quality condition — e.g. "All files pass ESLint and Prettier"]
- [ ] All existing tests pass without modification
- [ ] No new console errors or warnings introduced
- [ ] Senior agent has reviewed their own diff for unintended changes
```

**Writing rules:**
- Every item must be independently verifiable by the QA agent
- "Code is cleaner" or "code is better" are not valid criteria —
  make it measurable
- Always include the test passage criterion — it is non-negotiable
- Always include the self-review criterion — refactors are the highest
  risk of unintended side effects

---

## Complete Refactor Brief Example

```markdown
# RFCT-2026-03-14-003: Extract Auth Logic into Custom Hook

## Meta
- **ID:** RFCT-2026-03-14-003
- **Type:** Refactor
- **Status:** Backlog
- **Priority:** Medium
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** refactor/RFCT-2026-03-14-003-extract-auth-hook

## Intent
The authentication logic currently lives inline inside LoginScreen.tsx,
making it hard to test, reuse, and maintain as we add more auth methods.
This refactor extracts it into a dedicated custom hook.

## Scope
- Extract auth logic from LoginScreen.tsx into a useAuth custom hook
- Move the hook to src/hooks/useAuth.ts

## Out of Scope
- Changes to the OAuth flow itself
- Any UI changes to the login screen
- Any backend or API changes

## Affected Teams
- [x] Engineering — Frontend
- [ ] Engineering — Backend
- [x] QA
- [ ] DevOps
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

## Dependencies
- FEAT-2026-03-14-001 must be complete before this refactor begins

## Open Questions
- None

## Notes
**Assumptions made during intake:**
- Assumed Medium priority — no urgency, but will unblock future auth work

---

## Current State

**What exists today:**
Auth logic (token handling, error states, session management) is
written inline inside LoginScreen.tsx, which is currently 280 lines.

**Why it is a problem:**
- Cannot be tested in isolation from the UI component
- Cannot be reused if we add a second screen that requires auth
- Makes LoginScreen.tsx hard to read and reason about
- Violates single responsibility principle

**Location:**
- src/screens/LoginScreen.tsx (lines 45–180 approximately)

## Target State

**What good looks like after this work:**
LoginScreen.tsx handles only UI rendering and user interaction.
All auth logic lives in src/hooks/useAuth.ts and is imported
by LoginScreen.tsx. The hook exposes a clean interface that
could be consumed by any future screen that needs auth.

**Key improvements:**
- LoginScreen.tsx reduced to under 100 lines
- useAuth.ts is independently testable
- Auth logic is reusable across screens

## Scope Boundaries

**In scope — agents may touch these:**
- src/screens/LoginScreen.tsx
- src/hooks/useAuth.ts (new file to be created)

**Out of scope — agents must not touch these:**
- Any other screen or component
- src/services/authService.ts
- Any backend or API files
- Any test files (tests must pass without modification)

## What Must Not Change

**External behaviour:**
- Login flow behaves identically from the user's perspective
- Error messages shown to the user remain identical
- Navigation after successful login remains identical

**Internal contracts:**
- The function signatures of anything called from outside LoginScreen.tsx
- Token storage and retrieval behaviour

**Tests:**
- All existing tests must pass without modification after the refactor

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Subtle behaviour change during extraction | Medium | High | QA agent runs full auth flow after refactor |
| Missing an inline auth reference in LoginScreen | Low | Medium | Senior agent searches for all auth-related terms before closing |
| New hook introduces re-render issues | Low | Medium | Test all login screen states after extraction |

**Overall risk level:** Medium

**Recommended approach:**
Extract logic incrementally — move one concern at a time (token handling,
then error states, then session management) rather than all at once.
Run tests after each extraction before proceeding.

## Definition of Done

- [ ] LoginScreen.tsx is under 100 lines
- [ ] All auth logic lives in src/hooks/useAuth.ts
- [ ] No auth logic remains inline in LoginScreen.tsx
- [ ] All existing tests pass without modification
- [ ] useAuth.ts has its own unit tests covering happy path and error states
- [ ] No new console errors or warnings introduced
- [ ] Senior agent has reviewed diff for unintended changes

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
