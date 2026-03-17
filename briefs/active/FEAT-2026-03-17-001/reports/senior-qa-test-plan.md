# Test Plan — FEAT-2026-03-17-001
**Date:** 2026-03-17
**Brief:** Web Calculator
**Branch under test:** `claude/simple-web-calculator-qpXeU`
**Platform scope:** Web browser (desktop + mobile widths)
**Tester:** Senior QA

---

## Testing Scope

**Testing types for this brief:**
- [x] Functional
- [ ] Regression — N/A: brand new app, no existing features to regress against
- [x] Edge case
- [x] Performance — basic page load only (no network calls, client-side only)
- [ ] Security — N/A: no auth, no network calls, no data storage

**Out of scope for this brief:**
- Regression: no prior functionality exists
- Security: no auth, credentials, tokens, or persistent data involved

---

## Test Cases

### Functional Tests

| ID | Acceptance Criterion | Test Steps | Expected Result |
|---|---|---|---|
| TC-001 | Calculator renders at `/` | Navigate to `http://localhost:3000/` | Calculator UI visible, display shows `0` |
| TC-002 | Multi-digit number input | Click `1`, `2`, `3` | Display shows `123` |
| TC-003 | Addition | Click `5`, `+`, `3`, `=` | Display shows `8` |
| TC-004 | Subtraction | Click `9`, `−`, `4`, `=` | Display shows `5` |
| TC-005 | Multiplication | Click `6`, `×`, `7`, `=` | Display shows `42` |
| TC-006 | Division | Click `8`, `÷`, `4`, `=` | Display shows `2` |
| TC-007 | AC clears all input and resets to `0` | Click `5`, `+`, `3`, then `AC` | Display shows `0`, expression line empty |
| TC-008 | +/- toggles sign | Click `5`, then `+/-` | Display shows `-5` |
| TC-009 | % converts to percentage | Click `5`, `0`, then `%` | Display shows `0.5` |
| TC-010 | Decimal input works | Click `3`, `.`, `1`, `4` | Display shows `3.14` |
| TC-011 | Decimal pressed twice has no effect | Click `3`, `.`, `.` | Display shows `3.` (second ignored) |
| TC-012 | Display shows expression and current result | Click `5`, `+` | Expression line shows `5 +`, result line shows `5` |
| TC-013 | Division by zero displays `Error` | Click `5`, `÷`, `0`, `=` | Display shows `Error` |
| TC-014 | Keyboard — digits | Press `7`, `8`, `9` | Display shows `789` |
| TC-015 | Keyboard — operators and Enter | Press `5`, `+`, `3`, Enter | Display shows `8` |
| TC-016 | Keyboard — Escape (AC) | Press `5`, `+`, `3`, Escape | Display shows `0`, expression cleared |
| TC-017 | Keyboard — Backspace | Press `1`, `2`, `3`, Backspace | Display shows `12` |
| TC-018 | Keyboard — `/` routes to division, not browser search | Press `8`, `/`, `4`, Enter | Display shows `2`; browser find bar does not open |
| TC-019 | Responsive layout at mobile widths | Set browser width to 375px | Calculator fits viewport, no horizontal scrollbar |

### Regression Tests

Not applicable — new application, no existing features.

### Edge Case Tests

| ID | Scenario | Test Steps | Expected Result |
|---|---|---|---|
| EC-001 | Error state clears on next digit | Click `5`, `÷`, `0`, `=`, then click `9` | Display shows `9` |
| EC-002 | Operator chaining computes left-to-right | Click `5`, `+`, `3`, `×`, `2`, `=` | Display shows `16` (5+3=8, 8×2=16) |
| EC-003 | Double operator press changes operator | Click `5`, `+`, then `×` | Expression shows `5 ×` |
| EC-004 | Equals pressed when no operator is set | Click `5`, `=` | Display remains `5`, no crash |
| EC-005 | +/- on zero has no effect | Display shows `0`, click `+/-` | Display remains `0` |
| EC-006 | Long number does not overflow display | Click `9` nine times → `999999999` | Number displays cleanly, no layout break |
| EC-007 | Floating point precision (0.1 + 0.2) | Click `0`, `.`, `1`, `+`, `0`, `.`, `2`, `=` | Display shows `0.3`, not `0.30000000000000004` |
| EC-008 | Backspace on single digit | Press `5`, Backspace | Display shows `0` |
| EC-009 | Backspace on Error state | Produce Error, press Backspace | Display shows `0` |
| EC-010 | Decimal input after operator | Click `5`, `+`, `.` | Display shows `0.` (new operand starts) |
| EC-011 | Negative percentage | Click `5`, `+/-`, `%` | Display shows `-0.05` |

### Performance Tests

| ID | Scenario | Acceptable Threshold | How to Measure |
|---|---|---|---|
| PT-001 | Initial page load at `http://localhost:3000/` | < 2 seconds | Browser DevTools → Network tab, DOMContentLoaded time |

---

## Test Environment

**Platform:** Web browser (Chrome, desktop + 375px mobile width simulation)

**Test data required:** None — calculator is stateless

**Setup steps:**
1. Checkout branch `claude/simple-web-calculator-qpXeU`
2. `cd web && npm install`
3. `npm run dev`
4. Open `http://localhost:3000/` in browser
