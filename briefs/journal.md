# Company-X Project Journal

> Append-only log of completed work. One entry per closed brief.
> Written by the Orchestrator at brief close. Never edited retroactively.

## SPIKE-2026-03-20-002 — 3D Rendering Library Selection (2026-03-20)
Evaluated four browser-based 3D rendering libraries (Three.js, React Three Fiber, Babylon.js, Spline) for use in an interactive 3D easter egg modal on the web calculator. React Three Fiber was selected as the best fit for the React/Next.js stack, with `@react-three/drei`'s `useAnimations` hook handling glTF animation looping cleanly. Spline was disqualified due to incompatibility with external glTF assets. Asset sourcing decision made: a stylised stand-in character (not Snoop Dogg's likeness) will be used to avoid IP/licensing risk.
- Key decision: React Three Fiber (@react-three/fiber + @react-three/drei) — added to shared/stack.md Web section as ✅ Decided
- Files changed: briefs/active/SPIKE-2026-03-20-002/reports/senior-frontend-spike-output.md (research output)
- Handled by: Engineering — Frontend

## FEAT-2026-03-20-001 — Time Calculator Screen (2026-03-20)
Replaced the non-functional Δt button on the web calculator with a dedicated time calculator screen. Users can now toggle between arithmetic and time modes, enter start/end times in 12-hour AM/PM format using dropdowns, and see the difference displayed as `Xh Ym`. All 8 acceptance criteria passed QA with no bugs found.
- Key decision: Hour/minute select inputs used instead of free-text — eliminates invalid input structurally, no runtime validation needed
- Files changed: `web/src/store/calculatorStore.ts`, `web/src/components/Calculator/ButtonGrid.tsx`, `web/src/components/Calculator/index.tsx`, `web/src/components/TimeCalculator/index.tsx` (new)
- Handled by: Engineering — Frontend, QA
