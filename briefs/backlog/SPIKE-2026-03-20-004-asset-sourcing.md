# SPIKE-2026-03-20-004: glTF Dancing Character Asset Sourcing

## Meta
- **ID:** SPIKE-2026-03-20-004
- **Type:** Research Spike
- **Status:** Backlog
- **Priority:** Medium — unblocks the 3D scene work in FEAT-2026-03-20-003; low-priority feature but asset must be found before engineering can finalise the scene
- **Date Created:** 2026-03-20
- **Requested By:** Operator
- **Branch:** spike/SPIKE-2026-03-20-004-asset-sourcing
- **File Lock:** _(populated by Orchestrator at routing time)_

---

## Intent
FEAT-2026-03-20-003 requires a glTF/GLB file containing a stylised humanoid character with a looping hip-hop dance animation. No asset has been sourced yet. This spike identifies the most cost-effective way to obtain a suitable asset — free preferred, lowest cost otherwise.

---

## Scope
- Evaluate free and low-cost sources for a stylised glTF/GLB dancing character with a hip-hop animation
- Assess compatibility of each source's output format with React Three Fiber
- Produce a clear recommendation with steps to obtain the asset
- Identify any conversion steps needed (e.g. FBX → glTF)

---

## Out of Scope
- Paid assets costing more than a one-time nominal fee (operator preference: free or cheapest)
- Creating a custom model from scratch
- Audio assets
- Any implementation work — sourcing recommendation only

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
- "Free or cheapest" means the operator will accept a one-time low-cost purchase if nothing free meets requirements, but free is strongly preferred
- The character must be stylised (not photorealistic) — a clearly fictional humanoid
- The dance animation must be hip-hop style and suitable for looping (no abrupt start/end)
- Asset will be committed to `web/public/assets/dancer.glb` — licensing must permit inclusion in a web application repo

---

## Question to Answer
What is the most cost-effective way to obtain a glTF/GLB stylised humanoid character with a looping hip-hop dance animation that is compatible with React Three Fiber and legally usable in this web application?

**Why this question matters:**
FEAT-2026-03-20-003 cannot be finalised until this asset exists in the repo. The engineering team is blocked on the 3D scene work specifically.

**What happens if we don't answer it:**
Engineering builds the modal shell and integration layer against a placeholder, but the feature cannot ship until the real asset is in place.

---

## Success Criteria

The spike is complete when ALL of the following are true:

- [ ] At least 3 sourcing options have been evaluated
- [ ] Each option assessed for cost, output format, animation suitability, and licensing
- [ ] A clear recommended source is identified with step-by-step instructions to obtain the asset
- [ ] Any required format conversion steps (e.g. FBX → glTF) are documented
- [ ] Licensing terms confirmed as compatible with inclusion in a web app repo
- [ ] The decision this spike unblocks can now be acted on with confidence

---

## Time Box

**Maximum duration:** 2–4 hours

**If the time box is reached before success criteria are met:**
Produce the best available recommendation with current findings. Note what remains uncertain. Do not exceed the time box.

---

## Options to Evaluate

| Option | Description | Known Pros | Known Cons |
|---|---|---|---|
| Mixamo (Adobe) | Free library of 3D characters + animations; FBX output | Free with Adobe account; large dance animation library including hip-hop | Outputs FBX — requires conversion to glTF; characters are humanoid but may not read as "stylised" |
| Ready Player Me | Free glTF avatar platform; animations via Mixamo or their library | Outputs glTF directly; stylised cartoon aesthetic | Avatar customisation workflow; animation pairing may need manual steps |
| AI 3D generation (Meshy.ai, Tripo3D, etc.) | Text-to-3D tools; some free tiers | Can generate stylised characters from a description; some output glTF | Quality varies; animation generation is limited or separate step; may not produce looping dance |
| Sketchfab free/CC assets | Marketplace with free and Creative Commons-licensed 3D models | Browse ready-made dancing characters; some are glTF native | Quality and licensing vary per asset; must verify each asset's licence carefully |

**Evaluation criteria:**

| Criterion | Weight | Notes |
|---|---|---|
| Cost | High | Free strongly preferred; nominal one-time fee acceptable |
| Output format (glTF/GLB compatibility) | High | Must produce or be convertible to glTF/GLB for use with React Three Fiber |
| Dance animation availability | High | Must include or support a hip-hop style looping animation |
| Licensing | High | Must permit use in a web application; repo inclusion must be allowed |
| Visual suitability | Medium | Stylised humanoid — clearly fictional, not photorealistic |
| Effort to obtain final asset | Medium | Conversion steps acceptable; fully manual modelling is not |

**Can the agent consider options not listed above?** Yes
Any option must produce a glTF/GLB file (or a format convertible to glTF) and be legally usable in a commercial or personal web application.

---

## Output Format

**Primary output:** Recommendation document with step-by-step acquisition instructions

**Output location:** `briefs/active/SPIKE-2026-03-20-004/reports/senior-frontend-spike-output.md`

**Required sections in output:**
1. Recommendation — the chosen source and why
2. Rationale — how it was chosen over alternatives
3. Options evaluated — comparison table with assessment per criterion
4. Step-by-step instructions — exactly how to obtain the asset and get it to `web/public/assets/dancer.glb`
5. Risks and open questions — any remaining uncertainty
6. Suggested next action — confirm asset is in repo, then FEAT-2026-03-20-003 can be fully routed

---

## Decision This Unblocks

**Decision to be made:** Which source to use to obtain the glTF/GLB dancing character asset for FEAT-2026-03-20-003.

**Stack entry this resolves:** None — not a stack decision. Resolves the Open Question in FEAT-2026-03-20-003.

**Who makes the decision:** Operator

**Briefs unblocked after decision:**
- FEAT-2026-03-20-003 — 3D scene work can be finalised once the asset is in the repo

**Impact of delaying this spike:**
FEAT-2026-03-20-003 remains partially blocked. Engineering can build the modal shell but cannot complete the 3D scene.

---

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

---

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
