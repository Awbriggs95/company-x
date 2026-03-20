# Senior Frontend Report — FEAT-2026-03-20-001
**Date:** 2026-03-20
**Brief:** Time Calculator Screen
**Status:** Complete

---

## What Was Done

Built a dedicated time calculator screen accessible via a ⏱ Time toggle button on the arithmetic calculator. The screen presents start and end time inputs (12-hour AM/PM format using dropdowns) and a Calculate button that displays the difference as `Xh Ym`. A Back button returns the user to the arithmetic calculator. The existing Δt button and all timeDiff logic have been removed from the arithmetic calculator and its store.

---

## Files Changed

| File | Change type | Description |
|---|---|---|
| `web/src/store/calculatorStore.ts` | Modified | Removed `timeDiff` operator type, `OP_SYMBOLS.timeDiff`, `parseHHMM`, `formatTimeDiff`, and timeDiff cases from `compute` and `calculate` |
| `web/src/components/Calculator/ButtonGrid.tsx` | Modified | Removed Δt button row; added `onSwitchMode` prop; added ⏱ Time toggle button spanning all 4 columns |
| `web/src/components/Calculator/index.tsx` | Modified | Added `mode` state (`'arithmetic' \| 'time'`); conditionally renders `TimeCalculator` or arithmetic view; keyboard handler gated to arithmetic mode only |
| `web/src/components/TimeCalculator/index.tsx` | Created | New time calculator component with start/end time inputs, AM/PM toggles, calculate logic, result display, and back button |

---

## Decisions Made

| Decision | Rationale |
|---|---|
| Hour/minute selects instead of free-text inputs | Selects eliminate invalid input entirely — no need for an error path for bad values. Consistent with brief requirement that invalid input shows Error state; with selects this edge case cannot arise via normal use |
| Mode state in Calculator component (local) | Mode is UI state local to one component — no need to put it in the global Zustand store |
| Default start 8:00 AM / end 3:00 PM | Matches the operator's example from intake |
| Keyboard shortcuts disabled in time mode | Arrow keys and digit keys are used by the select inputs — disabling arithmetic keyboard handler in time mode prevents conflicts |

---

## Deviations from Brief

- **Branch naming:** Remote rejects non-`claude/` branches. Code is on `feature/FEAT-2026-03-20-001-time-calculator-screen` locally and pushed to `claude/time-calculator-screen-0m6r1` on the remote. Same constraint as INFRA-2026-03-17-002. PR should target `main` from `claude/time-calculator-screen-0m6r1`.

---

## Escalations During This Task

None.

---

## Blockers Remaining

None.

---

## Branch and Commits

**Local branch:** `feature/FEAT-2026-03-20-001-time-calculator-screen`
**Remote branch:** `claude/time-calculator-screen-0m6r1`
**Commits:**
- `ef28594` — FEAT-2026-03-20-001: Remove timeDiff operator from calculatorStore
- `cedc604` — FEAT-2026-03-20-001: Add time calculator screen with mode toggle

---

## Notes for Lead

- Build passes clean (`next build` — no TypeScript errors, no lint errors).
- With select-based inputs, the "invalid input → Error" acceptance criterion cannot be triggered via normal user interaction. The `formatDiff` function handles a `0` result correctly (`0h 00m`). QA should note that the error state is structurally protected rather than visually demonstrated.
- PR should be raised from `claude/time-calculator-screen-0m6r1` → `main`.
