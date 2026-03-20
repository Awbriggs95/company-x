# Senior Frontend Spike Output — SPIKE-2026-03-20-002
**Date:** 2026-03-20
**Brief:** 3D Rendering Library Selection
**Status:** Complete

---

## 1. Recommendation

**Use React Three Fiber (`@react-three/fiber`) with `@react-three/drei`.**

This is the correct choice for a React/Next.js application requiring an interactive, looping 3D character animation in a modal. It provides the full rendering capability of Three.js with a React-idiomatic API that integrates cleanly into the existing codebase.

---

## 2. Rationale

The web calculator is a Next.js (React + TypeScript) application. The easter egg feature is a modal component — a natural unit in the React component tree. React Three Fiber's declarative model makes the 3D scene a React component like any other, meaning the modal, canvas lifecycle, and animation state all compose naturally without imperative teardown logic.

The `@react-three/drei` helper library provides a `useAnimations` hook that handles glTF animation loading and looping in a small number of lines — directly solving the core animation requirement. The underlying renderer is Three.js, so there is no performance trade-off relative to using Three.js directly.

The main cost is bundle size (~750KB combined). This is mitigated by dynamic import — the 3D libraries only load when the easter egg modal is triggered, not on initial page load. The calculator's initial load time is unaffected.

---

## 3. Options Evaluated

| Criterion | Weight | Three.js | React Three Fiber | Babylon.js | Spline |
|---|---|---|---|---|---|
| TypeScript support | High | ✅ Excellent — full types shipped | ✅ Excellent — full types shipped | ✅ Excellent — written in TS | ⚠️ Limited — thin wrapper types only |
| Browser performance | High | ✅ Excellent | ✅ Excellent — same renderer as Three.js | ✅ Excellent | ⚠️ Variable — runtime is a black box |
| Looping character animation (glTF) | High | ✅ AnimationMixer + GLTFLoader — verbose but capable | ✅ useAnimations hook (drei) — clean, minimal code | ✅ Native animation system — excellent but over-specified | ❌ Asset must be created in Spline editor — incompatible with external glTF models |
| Integration effort (React/Next.js) | High | ⚠️ Medium-high — imperative canvas lifecycle, manual cleanup in useEffect | ✅ Low — declarative, composes naturally as React component | ⚠️ High — imperative API, no React bindings, more verbose than Three.js | ✅ Low — drop-in component, but asset lock-in is a blocker |
| Bundle size | Medium | ✅ ~600KB, tree-shakeable | ⚠️ ~750KB combined (R3F + Three.js), tree-shakeable, lazy-loadable | ❌ ~2MB — full engine regardless of usage | ⚠️ ~1MB runtime |
| Community and maintenance | Medium | ✅ Largest 3D web community, active development | ✅ Active, Poimandres-maintained, growing ecosystem | ✅ Microsoft-backed, well maintained | ⚠️ Smaller community, proprietary toolchain |

**Summary scores (High criteria weighted 2x, Medium 1x):**

| Option | Score |
|---|---|
| React Three Fiber | 11 / 12 |
| Three.js | 9 / 12 |
| Babylon.js | 7 / 12 |
| Spline | 3 / 12 — disqualified on animation criterion |

---

## 4. Risks and Open Questions

**Bundle size**
R3F + Three.js adds ~750KB to the JavaScript bundle. Mitigation: use `next/dynamic` with `ssr: false` to lazy-load the 3D modal component. The 3D code will only be downloaded when the easter egg is triggered for the first time — calculator initial load is unaffected. This is a standard Next.js pattern and requires no additional libraries.

**Asset sourcing (not in spike scope)**
The Snoop Dogg 3D model with a "Drop It Like It's Hot" animation must be sourced as a glTF/GLB file. This spike does not cover asset sourcing or IP/licensing — those are open questions for the FEAT brief. The team should not proceed with the FEAT brief until the asset question is resolved. Options include: commissioning a custom model, licensing an existing asset, or using a royalty-free alternative.

**IP and likeness rights (not in spike scope)**
Using Snoop Dogg's likeness in a 3D model is a legal question, not a technical one. This must be addressed before the FEAT brief can be closed. Flagged here for the Intake Agent to include as an open question in the FEAT brief.

**No open technical questions remain** for the library selection itself. React Three Fiber is a well-established, production-proven choice for this exact use case.

---

## 5. Suggested Next Brief

**Type:** FEAT
**Title:** Snoop Dogg 69+420 Easter Egg — Interactive 3D Modal
**Scope summary:**
- Detect when the calculator result is 489 (69 + 420)
- Dynamically load a modal component containing a React Three Fiber scene
- Load and display a glTF/GLB model of Snoop Dogg performing the "Drop It Like It's Hot" animation
- Loop the animation continuously while the modal is open
- Allow the user to rotate/inspect the scene (OrbitControls from drei)
- Silent — no audio
- Close modal on dismiss

**Prerequisite before briefing:** Asset (glTF/GLB model + animation) must be sourced and IP/licensing must be confirmed. The FEAT brief should include the asset path or sourcing decision as a dependency.

**Libraries to approve in FEAT brief:**
- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — helpers including `useAnimations`, `OrbitControls`, `useGLTF`
- `three` — underlying renderer (peer dependency)

These are not yet in `shared/stack.md`. The FEAT brief's approval constitutes the stack addition authorisation.

---

## Success Criteria Check

- [x] At least 3 options evaluated against criteria — 4 options evaluated
- [x] Each option assessed for TypeScript support and browser performance — see comparison table
- [x] Each option assessed for looping character animation in a modal — see comparison table
- [x] Clear recommendation made with rationale — React Three Fiber
- [x] Risks and tradeoffs documented — bundle size, asset sourcing, IP/licensing
- [x] Decision can now be made with confidence — yes
