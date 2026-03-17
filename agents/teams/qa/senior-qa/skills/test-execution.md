# Skill — Test Execution

> Owner: senior-qa | Version: 1.0.0
> Defines how Senior QA executes tests against a brief.

---

## Before Executing

- [ ] Test plan is written and saved
- [ ] Branch under test is checked out and running
- [ ] Test environment is confirmed ready
- [ ] Test data is in place

Do not begin execution without all four confirmed.

---

## Execution Standards

### Work through the test plan in order
Execute test cases in the order they appear in the plan:
1. Functional tests first — verify the feature works as described
2. Regression tests — verify nothing adjacent is broken
3. Edge case tests — verify boundary conditions
4. Performance tests — verify speed and responsiveness if in scope
5. Security tests — verify no vulnerabilities if in scope

### Record results as you go
Do not execute all tests then try to remember results.
Record pass/fail for each test case immediately after execution:

```
TC-001: Pass
TC-002: Fail — [brief description of what happened]
RT-001: Pass
EC-001: Pass
EC-002: Fail — [brief description]
```

### Never skip a test case
If a test case cannot be executed — document why, do not silently skip.
An untested criterion is not a passed criterion.

---

## Bug Documentation

When a test case fails, document the bug immediately and completely.

Each bug requires:

```markdown
### Bug [SEQ] — [Short title]
**Severity:** [Critical / High / Medium / Low]
**Test case:** [TC/RT/EC/PT/ST ID that found this]
**Platform:** [iOS / Android / Both]

**Steps to reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3 — where bug occurs]

**Expected behaviour:**
[What should have happened]

**Actual behaviour:**
[What actually happened]

**Screenshot / recording:** [filename or "None"]
**Frequency:** [Always / Intermittent]
```

### Severity definitions

| Severity | Definition |
|---|---|
| Critical | App crashes, data loss, or security vulnerability |
| High | Core feature broken, no workaround |
| Medium | Feature broken but workaround exists, or affects subset of users |
| Low | Minor visual issue, cosmetic defect, no functional impact |

When in doubt — assign one level higher. Easier to downgrade than
to miss a real issue.

---

## Platform Testing

For briefs scoped to both iOS and Android, execute every test case
on both platforms — do not assume iOS results apply to Android.

Document platform-specific results explicitly:

```
TC-001: iOS — Pass | Android — Fail
TC-002: iOS — Pass | Android — Pass
```

If a test passes on one platform and fails on the other, it is still
a failed test — document the bug with the failing platform specified.

---

## Performance Testing

For performance test cases, measure objectively — no subjective
assessments like "feels slow":

```
PT-001: Screen load time
Method: Record from tap to fully rendered using device performance tools
iOS result: 1.2 seconds — Pass (threshold: < 2 seconds)
Android result: 2.8 seconds — Fail (threshold: < 2 seconds)
```

Performance thresholds should be defined in the test plan.
If not defined in the brief, use these defaults:

| Metric | Acceptable threshold |
|---|---|
| Screen load time | < 2 seconds |
| API response (felt by user) | < 1 second |
| List scroll (60fps target) | No dropped frames on 50+ items |
| App cold start | < 3 seconds |

---

## Security Testing

For security test cases, check the following as applicable:

| Check | What to verify |
|---|---|
| Auth bypass | Can you access protected resources without a valid token? |
| Token exposure | Are tokens visible in logs, URLs, or error messages? |
| Input validation | Does the app accept and process malicious input? |
| Sensitive data | Is sensitive data stored in plain text anywhere? |
| Session management | Does sign-out invalidate the session server-side? |

Any security finding — regardless of severity — must be escalated
to QA Lead immediately. Do not include security findings only in
the report — escalate first, report second.
