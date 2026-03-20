# Senior Frontend Report — FEAT-2026-03-17-001
**Date:** 2026-03-17
**Brief:** Web Calculator
**Status:** Complete

---

## What Was Done
Built a complete Next.js web calculator at the root route (`/`) using TypeScript, Tailwind CSS, and Zustand. The calculator handles all standard arithmetic operations (+, −, ×, ÷), AC, sign toggle, percentage, decimal input, and full keyboard support. Division by zero renders an `Error` state. The layout is responsive and usable at mobile browser widths.

---

## Files Changed

| File | Change type | Description |
|---|---|---|
| `web/package.json` | Created | Next.js 15 project dependencies |
| `web/tsconfig.json` | Created | TypeScript strict mode config |
| `web/next.config.ts` | Created | Next.js config |
| `web/tailwind.config.ts` | Created | Tailwind CSS config scoped to src/ |
| `web/postcss.config.mjs` | Created | PostCSS config for Tailwind |
| `web/.eslintrc.json` | Created | ESLint with next/core-web-vitals |
| `web/src/app/globals.css` | Created | Tailwind base/components/utilities |
| `web/src/app/layout.tsx` | Created | Root layout with dark background |
| `web/src/app/page.tsx` | Created | Root page rendering Calculator |
| `web/src/store/calculatorStore.ts` | Created | Zustand store — full calculator state and logic |
| `web/src/components/Calculator/index.tsx` | Created | Main Calculator component with keyboard event handler |
| `web/src/components/Calculator/Display.tsx` | Created | Two-line display (expression + current value) |
| `web/src/components/Calculator/Button.tsx` | Created | Reusable button with variant styling |
| `web/src/components/Calculator/ButtonGrid.tsx` | Created | 4-column button grid wired to store |

---

## Decisions Made

| Decision | Rationale |
|---|---|
| App placed in `web/` directory | Separates the web app from any future mobile app in the repo; standard monorepo structure |
| Calculator state in Zustand store | Consistent with the approved stack; makes state accessible to future components as the app grows |
| Keyboard handler uses `useCalculatorStore.getState()` for Backspace | Avoids stale closure issue — Backspace needs the live `displayValue` at event time |
| Active operator highlighted in white with orange text | Standard iOS calculator convention; clear visual feedback on pending operation |
| Font scales down for values > 9 characters | Prevents overflow without truncating the number |

---

## Deviations from Brief

None. All acceptance criteria are addressed by the implementation.

---

## Escalations During This Task

None.

---

## Blockers Remaining

None.

---

## Branch and Commits
**Branch:** `feature/FEAT-2026-03-17-001-web-calculator`
**Commits:**
- `8da8007` — FEAT-2026-03-17-001: Scaffold Next.js web app with Tailwind CSS
- `009f617` — FEAT-2026-03-17-001: Add Next.js app layout and root page
- `350135e` — FEAT-2026-03-17-001: Add Zustand calculator store with full arithmetic logic
- `cc12ab9` — FEAT-2026-03-17-001: Add Calculator components (Display, Button, ButtonGrid, keyboard support)

---

## Notes for Lead
- `npm install` must be run inside `web/` before the app can be started or built
- The app is not yet deployed — a DevOps brief will be needed to configure Vercel
- QA should test keyboard input thoroughly, particularly the `/` key (browser default behaviour suppressed via `e.preventDefault()`)
- The `0` button uses `wide: true` (spans 2 columns) with left-aligned text per standard calculator layout
