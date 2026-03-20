# Company-X Project Journal

> Append-only log of completed work. One entry per closed brief.
> Written by the Orchestrator at brief close. Never edited retroactively.

## FEAT-2026-03-20-001 — Time Calculator Screen (2026-03-20)
Replaced the non-functional Δt button on the web calculator with a dedicated time calculator screen. Users can now toggle between arithmetic and time modes, enter start/end times in 12-hour AM/PM format using dropdowns, and see the difference displayed as `Xh Ym`. All 8 acceptance criteria passed QA with no bugs found.
- Key decision: Hour/minute select inputs used instead of free-text — eliminates invalid input structurally, no runtime validation needed
- Files changed: `web/src/store/calculatorStore.ts`, `web/src/components/Calculator/ButtonGrid.tsx`, `web/src/components/Calculator/index.tsx`, `web/src/components/TimeCalculator/index.tsx` (new)
- Handled by: Engineering — Frontend, QA
