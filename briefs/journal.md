# Company-X Project Journal

> Append-only log of completed work. One entry per closed brief.
> Written by the Orchestrator at brief close. Never edited retroactively.

## FEAT-2026-03-20-001 — Time Calculator Screen (2026-03-20)
Replaced the Δt button (HHMM-format time difference) with a dedicated time calculator screen accessible via a ⏱ Time mode toggle on the arithmetic calculator. The new screen uses 12-hour AM/PM dropdowns for start and end time input and displays the difference as `Xh Ym`. A Back button returns to the arithmetic view with prior state preserved. All `timeDiff` operator logic, `parseHHMM`, and `formatTimeDiff` removed from `calculatorStore`. Keyboard shortcuts gated to arithmetic mode to avoid select-input conflicts.
- All 8 acceptance criteria met; 19 test cases passed (8 functional, 5 regression, 6 edge case)
- No bugs found; no DevOps in scope
- Gap flagged: no test framework in web project — CFG brief recommended
- Files changed: `web/src/store/calculatorStore.ts`, `web/src/components/Calculator/ButtonGrid.tsx`, `web/src/components/Calculator/index.tsx`, `web/src/components/TimeCalculator/index.tsx` (new)
- Handled by: Engineering (Senior Frontend), QA (Senior QA)
- PR pending: `claude/time-calculator-screen-0m6r1` → `main` (operator to create manually — `gh` CLI unavailable)

## INFRA-2026-03-17-002 — Vercel Deployment: Web Calculator (2026-03-20)
Deployed the web calculator to Vercel on the Hobby (free) plan. Senior DevOps created the GitHub Actions CI pipeline (lint + build gate on PRs to main) and documented the external setup steps for the operator. Operator completed Vercel project creation, GitHub integration, and secret configuration.
- Key decision: No `vercel.json` required — Vercel auto-detects Next.js with Root Directory set to `web`
- Files changed: `.github/workflows/ci.yml`, `.gitignore`
- Handled by: DevOps
