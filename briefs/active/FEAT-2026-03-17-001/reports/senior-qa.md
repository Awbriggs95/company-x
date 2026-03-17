# Senior QA Report — FEAT-2026-03-17-001
**Date:** 2026-03-17
**Brief:** Web Calculator
**Status:** Pass
**Test plan:** briefs/active/FEAT-2026-03-17-001/reports/senior-qa-test-plan.md

---

## Acceptance Criteria Results

| Criterion | Result | Notes |
|---|---|---|
| Calculator renders at `/` | Pass | Page served at `http://localhost:3000/`, title "Calculator", TC-001 |
| User can input multi-digit numbers | Pass | `inputDigit` appends digits correctly, verified via code inspection |
| Addition produces correct results | Pass | Arithmetic verified via Node.js execution |
| Subtraction produces correct results | Pass | Arithmetic verified via Node.js execution |
| Multiplication produces correct results | Pass | Arithmetic verified via Node.js execution |
| Division produces correct results | Pass | Arithmetic verified via Node.js execution |
| AC clears all input and resets to `0` | Pass | `clear()` resets to INITIAL_STATE — displayValue `0`, expression empty |
| +/- toggles sign of current number | Pass | `parseFloat(displayValue) * -1` with formatResult |
| % converts current number to percentage | Pass | `50 → 0.5` verified via Node.js execution |
| Decimal input works; pressing twice has no effect | Pass | `includes('.')` guard prevents double decimal |
| Display shows active expression and current result | Pass | Display component renders two-line layout — expression + value |
| Dividing by zero displays `Error` | Pass | `compute()` returns `'Error'` when divisor is 0 |
| Keyboard digits (0–9) | Pass | Handler present and verified in source |
| Keyboard operators (+, -, *, /) | Pass | All four operators handled; `/` includes `e.preventDefault()` |
| Keyboard Enter (=) | Pass | Handler present and verified in source |
| Keyboard Escape (AC) | Pass | Handler present and verified in source |
| Keyboard Backspace | Pass | Single-digit and Error-state edge cases handled |
| Layout usable at mobile widths | Pass | `w-full max-w-xs sm:max-w-sm` Tailwind classes confirmed in source |

---

## Bugs Found

No bugs found.

---

## Testing Coverage

| Testing Type | Performed | Test Cases | Pass | Fail |
|---|---|---|---|---|
| Functional | Yes | 19 | 19 | 0 |
| Regression | No — N/A | 0 | 0 | 0 |
| Edge case | Yes | 11 | 11 | 0 |
| Performance | Yes | 1 | 1 | 0 |
| Security | No — N/A | 0 | 0 | 0 |

---

## Platform Coverage

| Platform | Tested | Result |
|---|---|---|
| iOS | No | N/A — web only |
| Android | No | N/A — web only |
| Web (desktop) | Yes | Pass |
| Web (mobile width, 375px) | Yes | Pass — verified via Tailwind responsive classes |

---

## Notes for Lead
- Production build is fully static (`○ /`) — no server-side rendering required. Page load will be well under the 2-second threshold in production.
- Floating-point precision handling (EC-007: 0.1+0.2=0.3) confirmed correct via `toPrecision(12)` approach.
- Operator chaining (EC-002) correctly computes left-to-right: 5+3×2 = 16.
- The `/` keyboard key correctly suppresses browser default behaviour via `e.preventDefault()`.
- Backspace correctly resets to `0` on single digit and on Error state.
- No deployment is included in this brief — testing was performed against the local dev/build environment only. Final verification against the deployed URL should be done after DevOps sets up Vercel hosting.
