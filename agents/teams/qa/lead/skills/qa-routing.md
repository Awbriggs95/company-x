# Skill — QA Routing

> Owner: qa-lead | Version: 1.0.0
> Defines how the QA Lead assigns and scopes testing work to the
> Senior QA agent.

---

## Scoping QA Work

When assigning a brief to Senior QA, provide a focused assignment
that extracts the testing-relevant information:

```
To: Senior QA
Brief: [TASK-ID] — [short title]
Full brief: [path to brief file]
Engineering report: briefs/active/[TASK-ID]/reports/engineering-lead.md
Branch under test: [branch name from brief]
Platform scope: [iOS / Android / Both]

Your scope:
- [Testing type 1 — e.g. Functional testing of OAuth flow]
- [Testing type 2 — e.g. Regression on login screen]

Acceptance criteria to verify:
- [criterion 1]
- [criterion 2]

Priority: [level]
```

Always reference the Engineering Lead report — it contains handoff
notes that Senior QA needs before beginning test planning.

---

## Testing Type Selection

Based on the brief type, indicate which testing types Senior QA
should prioritise:

| Brief type | Priority testing types |
|---|---|
| New Feature (FEAT) | Functional, Edge case, Platform, Security (if auth/data) |
| Bug Fix (BUG) | Functional (verify fix), Regression (verify no new breaks) |
| Refactor (RFCT) | Regression (behaviour unchanged), Edge case |
| Config Change (CFG) | Functional (verify config applied), Security (if credentials) |
| DevOps Task (INFRA) | Functional (verify deployment), Performance (if infra change) |
| Research Spike (SPIKE) | Not applicable — the Engineering Lead validates SPIKE output against success criteria. QA is not assigned to SPIKE briefs. |

---

## QA Completion Criteria

Before accepting Senior QA's work as complete:

- [ ] Test plan has been written and filed
- [ ] All acceptance criteria have a pass/fail result
- [ ] All bugs found are documented with reproduction steps
- [ ] Platform scope has been fully covered
- [ ] Senior QA report is filed at correct location
