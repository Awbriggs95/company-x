# SPIKE-2026-03-20-002: 3D Rendering Library Selection

## Meta
- **ID:** SPIKE-2026-03-20-002
- **Type:** Research Spike
- **Status:** Complete
- **Priority:** High — blocks the 69+420 easter egg feature brief, which cannot be drafted until a 3D rendering approach is decided
- **Date Created:** 2026-03-20
- **Requested By:** Operator
- **Branch:** spike/SPIKE-2026-03-20-002-3d-rendering-library
- **File Lock:** _(cleared — brief complete)_

---

## Intent
The web calculator requires a 3D rendering capability to power an interactive easter egg scene. No 3D rendering library has been selected for the Company-X web stack. This spike evaluates the available options and produces a recommendation so the engineering team has a clear, approved choice before any implementation begins.

---

## Scope
- Evaluate browser-based 3D rendering libraries compatible with our TypeScript web stack
- Assess each option's ability to support looping character animation in an interactive scene
- Produce a clear recommendation with rationale

---

## Out of Scope
- Implementing the 3D scene itself (separate FEAT brief, pending this spike)
- Native mobile 3D rendering (web only)
- Backend or server-side rendering of 3D content

---

## Affected Teams
- [x] Engineering — Frontend
- [ ] Engineering — Backend
- [ ] QA
- [ ] DevOps
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

---

## Dependencies
- None

---

## Open Questions
- None

---

## Notes
**Assumptions made during intake:**
- The feature targets the web calculator (React/TypeScript) — not the mobile app
- "Interactive 3D scene" means the user can rotate/inspect the scene; it does not require physics or gameplay
- The 3D content (Snoop Dogg model + Drop It Like It's Hot animation) will be sourced separately — this spike covers the rendering library only, not asset sourcing or IP licensing

---

## Question to Answer
Which 3D rendering library best fits our TypeScript web stack for displaying a looping, user-interactive 3D character animation in a browser modal?

**Why this question matters:**
The easter egg feature requires rendering a 3D scene in a modal overlay on the web calculator. No 3D rendering capability exists in the current stack. Choosing incorrectly means a costly library swap mid-implementation.

**What happens if we don't answer it:**
The easter egg FEAT brief cannot be drafted with enough precision for the engineering team to build it. The feature is parked until this decision is made.

---

## Success Criteria

The spike is complete when ALL of the following are true:

- [ ] At least 3 options have been evaluated against the criteria below
- [ ] Each option has been assessed for TypeScript support and browser performance
- [ ] Each option has been assessed for suitability with looping character animation in a modal
- [ ] A clear recommendation has been made with rationale
- [ ] Risks and tradeoffs of the recommended option are documented
- [ ] The decision this spike unblocks can now be made with confidence

---

## Time Box

**Maximum duration:** 2–4 hours

**If the time box is reached before success criteria are met:**
Produce the best available recommendation with current findings. Clearly note what remains uncertain and surface to the operator. Do not exceed the time box.

---

## Options to Evaluate

| Option | Description | Known Pros | Known Cons |
|---|---|---|---|
| Three.js | Low-level WebGL library | Most popular, huge community, strong TypeScript support | Verbose API, requires manual setup for complex scenes |
| React Three Fiber | React wrapper around Three.js | Declarative, integrates naturally into React apps | Abstraction overhead, less control |
| Babylon.js | Full-featured 3D engine | Excellent animation system, strong TypeScript support | Larger bundle, more than needed for a single scene |
| Spline | No-code 3D design tool with web embed | Fast to prototype, visual editor | Limited programmatic control, external dependency |

**Evaluation criteria:**

| Criterion | Weight | Notes |
|---|---|---|
| TypeScript support | High | Must work without workarounds in strict TypeScript |
| Browser performance | High | Must run smoothly in a modal without degrading the calculator |
| Looping character animation support | High | Must support glTF/FBX animation playback with looping |
| Integration effort into existing web app | High | Should not require significant restructuring |
| Bundle size | Medium | Web app — keep additions lean |
| Community and long-term maintenance | Medium | Avoid abandoned or niche libraries |

**Can the agent consider options not listed above?** Yes
Any option must have TypeScript support and work in a standard browser environment without native plugins.

---

## Output Format

**Primary output:** Combination
- Comparison table — structured evaluation of all options against criteria
- Recommendation document — clear decision with rationale

**Output location:** `briefs/active/SPIKE-2026-03-20-002/reports/senior-frontend-spike-output.md`

**Required sections in output:**
1. Recommendation — the answer to the question, stated clearly upfront
2. Rationale — why this option was chosen over the others
3. Options evaluated — comparison table with assessment per criterion
4. Risks and open questions — what is still uncertain
5. Suggested next brief — the FEAT brief that should be created once the decision is made

---

## Decision This Unblocks

**Decision to be made:** Which 3D rendering library to adopt for web features requiring 3D scenes.

**Stack entry this resolves:** 3D rendering library (Web section — new entry to be added to shared/stack.md)

**Who makes the decision:** Operator

**Briefs unblocked after decision:**
- FEAT brief: Snoop Dogg 69+420 easter egg — interactive 3D modal on web calculator

**Impact of delaying this spike:**
The easter egg feature brief cannot be written with sufficient precision for engineering to act on. The feature remains parked.

---

## Report Index
| Agent | Report | Status |
|---|---|---|
| Senior Frontend | briefs/active/SPIKE-2026-03-20-002/reports/senior-frontend-spike-output.md | Complete |

---

## Completion Sign-Off
- **Orchestrator approved:** [x]
- **Operator approved:** [x]
- **Moved to completed/:** [x]
