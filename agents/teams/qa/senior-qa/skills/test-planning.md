# Skill — Test Planning

> Owner: senior-qa | Version: 1.0.0
> Defines how Senior QA writes a test plan before executing any testing.

---

## Why a Test Plan First

Testing without a plan produces inconsistent coverage. A written plan:
- Forces you to read the brief carefully before touching anything
- Ensures every acceptance criterion maps to at least one test case
- Creates a record of what was and was not tested
- Makes it possible to repeat the same tests after a fix

Never begin execution before the test plan is written and saved.

---

## Test Plan Format

Save to:
```
briefs/active/[TASK-ID]/reports/senior-qa-test-plan.md
```

```markdown
# Test Plan — [TASK-ID]
**Date:** [YYYY-MM-DD]
**Brief:** [Short title]
**Branch under test:** [branch name]
**Platform scope:** [iOS / Android / Both]
**Tester:** Senior QA

---

## Testing Scope

**Testing types for this brief:**
- [ ] Functional
- [ ] Regression
- [ ] Edge case
- [ ] Performance
- [ ] Security

**Out of scope for this brief:**
- [Any testing types explicitly not being performed and why]

---

## Test Cases

### Functional Tests
[One test case per acceptance criterion — minimum]

| ID | Acceptance Criterion | Test Steps | Expected Result |
|---|---|---|---|
| TC-001 | [Criterion text] | [Steps] | [Expected outcome] |
| TC-002 | [Criterion text] | [Steps] | [Expected outcome] |

### Regression Tests
[Areas of the app that could be affected by this change
and need verification that they still work correctly]

| ID | Area | What to verify |
|---|---|---|
| RT-001 | [Screen or feature] | [What should still work] |

### Edge Case Tests
[Boundary conditions, unusual inputs, and unexpected user paths]

| ID | Scenario | Test Steps | Expected Result |
|---|---|---|---|
| EC-001 | [Edge case description] | [Steps] | [Expected outcome] |

### Performance Tests
[Only if performance testing is in scope for this brief]

| ID | Scenario | Acceptable threshold | How to measure |
|---|---|---|---|
| PT-001 | [e.g. Screen load time] | [e.g. < 2 seconds] | [Method] |

### Security Tests
[Only if security testing is in scope for this brief]

| ID | Scenario | What to check |
|---|---|---|
| ST-001 | [e.g. Auth token handling] | [What to verify] |

---

## Test Environment

**Devices / simulators:**
- iOS: [device or simulator name and OS version]
- Android: [device or emulator name and OS version]

**Test data required:**
- [Any accounts, data, or setup needed before testing begins]

**Setup steps:**
1. [How to get the branch running locally]
2. [Any environment configuration needed]
```

---

## Test Plan Rules

- Every acceptance criterion must map to at least one test case in TC-xxx
- Regression tests must cover areas adjacent to the change — not just
  the changed feature itself
- Edge cases must include: empty states, maximum length inputs,
  network failure scenarios, and unauthorised access attempts
- Do not write test cases for things that are explicitly out of scope
  in the brief — stay within the brief's boundaries
- Test plan must be saved before any execution begins — no exceptions
