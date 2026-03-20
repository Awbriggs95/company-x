# Test Plan — FEAT-2026-03-20-001
**Date:** 2026-03-20
**Brief:** Time Calculator Screen
**Branch under test:** `claude/time-calculator-screen-0m6r1`
**Platform scope:** Web only (`http://localhost:3000`)
**Tester:** Senior QA

---

## Testing Scope

**Testing types for this brief:**
- [x] Functional — verify all 8 acceptance criteria
- [x] Regression — verify arithmetic calculator unchanged
- [x] Edge case — boundary time values, mode switching behaviour
- [ ] Performance — not in scope; no data fetching or heavy rendering
- [ ] Security — not in scope; no auth, no data, no user input stored

**Out of scope for this brief:**
- Performance testing — static UI, no API calls
- Security testing — no auth, credentials, or sensitive data involved
- Overnight time ranges — explicitly excluded in brief

---

## Test Cases

### Functional Tests

| ID | Acceptance Criterion | Test Steps | Expected Result |
|---|---|---|---|
| TC-001 | Mode toggle button visible on arithmetic calculator | Load app at `/` | ⏱ Time button visible below the standard calculator buttons |
| TC-002 | Toggle switches view to time calculator screen | Click ⏱ Time | Arithmetic calculator replaced by time calculator screen showing Start/End inputs and Calculate button |
| TC-003 | Time calculator shows start and end time inputs with AM/PM selection | Switch to time mode | Two labelled rows (Start / End) each with hour select, minute select, and AM/PM toggle button |
| TC-004 | Calculate shows result as `Xh Ym` e.g. `7h 00m` | Set Start 8:00 AM, End 3:00 PM, press Calculate | Display shows `7h 00m` |
| TC-005 | Result of 0 hours and 0 minutes shows `0h 00m` | Set Start and End to identical time, press Calculate | Display shows `0h 00m` |
| TC-006 | Invalid/incomplete input shows error state rather than crashing | Attempt to enter invalid values via normal UI interaction | Selects prevent invalid input — no Error state reachable via normal use; app does not crash |
| TC-007 | Back button returns to arithmetic calculator | In time mode, press ← Back | Arithmetic calculator is restored with its prior display state |
| TC-008 | Δt button no longer appears on arithmetic calculator | Load app at `/`, inspect button grid | No Δt button present |

### Regression Tests

| ID | Area | What to verify |
|---|---|---|
| RT-001 | Arithmetic — basic operations | Addition, subtraction, multiplication, division still produce correct results |
| RT-002 | Arithmetic — function buttons | AC resets to 0; +/- toggles sign; % converts to percentage |
| RT-003 | Arithmetic — keyboard input | Digits, operators, Enter, Escape, Backspace all work as before |
| RT-004 | Arithmetic — error state | Division by zero shows `Error`; next digit input resets |
| RT-005 | Mode persistence | Arithmetic state (expression, display) is preserved when switching to time mode and back |

### Edge Case Tests

| ID | Scenario | Test Steps | Expected Result |
|---|---|---|---|
| EC-001 | Identical start and end time | Set Start 12:00 PM, End 12:00 PM, press Calculate | `0h 00m` |
| EC-002 | Maximum time span | Set Start 12:00 AM, End 11:59 PM, press Calculate | `23h 59m` |
| EC-003 | End time earlier than start time | Set Start 3:00 PM, End 8:00 AM, press Calculate | Result is absolute difference `7h 00m` — no error (overnight out of scope, abs() handles reversal) |
| EC-004 | AM/PM toggle cycling | Click AM/PM toggle repeatedly | Toggles correctly between AM and PM each click |
| EC-005 | Result display reset on mode switch | Calculate a result, press Back, press ⏱ Time again | Time calculator resets to default state (8:00 AM / 3:00 PM, no result shown) |
| EC-006 | Minutes with leading zero formatting | Set end to X:05, calculate | Minutes display as `05` not `5` in result |

---

## Test Environment

**Platform:** Web browser — `http://localhost:3000`
**Setup steps:**
1. Check out branch `claude/time-calculator-screen-0m6r1`
2. `cd web && npm run dev`
3. Open browser at `http://localhost:3000`

**Test data required:** None — all inputs via UI controls
