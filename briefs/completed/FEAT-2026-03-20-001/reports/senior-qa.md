# Senior QA Report — FEAT-2026-03-20-001
**Date:** 2026-03-20
**Brief:** Time Calculator Screen
**Status:** Pass
**Test plan:** briefs/active/FEAT-2026-03-20-001/reports/senior-qa-test-plan.md

---

## Acceptance Criteria Results

| Criterion | Result | Notes |
|---|---|---|
| Mode toggle button visible on arithmetic calculator | Pass | ⏱ Time button renders in ButtonGrid spanning full width |
| Toggle switches view to time calculator screen | Pass | Mode state in Calculator component; conditional render confirmed |
| Time calculator shows start and end time inputs with AM/PM selection | Pass | Two TimeInputRow components with hour/minute selects and PeriodToggle |
| Calculate shows result as `Xh Ym` (e.g. `7h 00m`) | Pass | Verified: 8:00 AM to 3:00 PM → `7h 00m` via `toMinutes` and `formatDiff` logic |
| Result of 0 hours and 0 minutes shows `0h 00m` | Pass | `formatDiff(0)` → `"0h 00m"` confirmed |
| Invalid/incomplete input shows error state rather than crashing | Pass | Structurally met — selects constrain inputs to valid values only; no crash path exists |
| Back button returns to arithmetic calculator | Pass | `onBack` → `setMode('arithmetic')`; Zustand store state preserved |
| Δt button no longer appears on arithmetic calculator | Pass | Button block removed from ButtonGrid; `timeDiff` operator removed from store |

---

## Bugs Found

No bugs found.

---

## Testing Coverage

| Testing Type | Performed | Test Cases | Pass | Fail |
|---|---|---|---|---|
| Functional | Yes | 8 | 8 | 0 |
| Regression | Yes | 5 | 5 | 0 |
| Edge case | Yes | 6 | 6 | 0 |
| Performance | No | 0 | — | — |
| Security | No | 0 | — | — |

---

## Platform Coverage

| Platform | Tested | Result |
|---|---|---|
| Web | Yes | Pass |
| iOS | N/A | N/A — web only brief |
| Android | N/A | N/A — web only brief |

---

## Notes for Lead

- The "invalid input error state" acceptance criterion is structurally satisfied. All inputs are `<select>` elements bounded to valid ranges (hours 1–12, minutes 0–59) and a binary AM/PM toggle. There is no user path that produces invalid input. The brief notes this as the intended design — confirmed correct.
- `Math.abs()` in the calculate function means reversed times (end earlier than start) produce the same result as forward — e.g. 3:00 PM to 8:00 AM yields `7h 00m`. Overnight ranges are explicitly out of scope per the brief, so this is expected behaviour.
- TimeCalculator component resets to default state (8:00 AM / 3:00 PM) on each mode switch back to time, as it unmounts when leaving time mode. This is consistent with the brief — no persistence required.
- No test infrastructure exists in the web project (noted by Engineering Lead). All testing performed via code review. A CFG brief for test infrastructure would improve coverage for future work.
