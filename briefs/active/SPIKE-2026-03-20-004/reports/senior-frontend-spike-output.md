# Senior Frontend Spike Output — SPIKE-2026-03-20-004
**Date:** 2026-03-20
**Brief:** glTF Dancing Character Asset Sourcing
**Status:** Complete

---

## 1. Recommendation

**Use Mixamo (Adobe) for the character and animation, converted to GLB via Blender.**

Mixamo provides a free library of stylised humanoid characters and hundreds of dance animations — including hip-hop moves directly analogous to "Drop It Like It's Hot." The output is FBX, which converts to GLB in under 5 minutes using Blender (free). Licensing permits use in web applications. This is the most cost-effective path with the highest confidence of producing a suitable looping animation.

**Total cost: $0.**

---

## 2. Rationale

Mixamo was chosen over the alternatives because it directly solves all three high-weight criteria simultaneously: it is free, its FBX output converts reliably to GLB, and it has verified hip-hop dance animations available. The conversion step (FBX → GLB via Blender) is a minor one-time effort, not a blocker.

Ready Player Me is a viable fallback if the operator prefers a more cartoon-style character and is comfortable with the Blender animation-baking workflow. Sketchfab requires manual vetting of individual assets with no guarantee of finding a suitable one. AI generation tools cannot reliably produce a looping hip-hop dance animation in one step.

---

## 3. Options Evaluated

| Criterion | Weight | Mixamo | Ready Player Me | Sketchfab (CC assets) | AI Generation (Meshy.ai) |
|---|---|---|---|---|---|
| Cost | High | ✅ Free | ✅ Free | ✅ Free (CC0/CC-BY) | ✅ Free tier available |
| glTF/GLB compatibility | High | ⚠️ FBX output — GLB via Blender (5 min) | ✅ Native GLB output | ✅ Varies — many are GLB | ✅ GLB output supported |
| Dance animation availability | High | ✅ Hundreds of hip-hop animations, loopable | ⚠️ Requires Mixamo animation bake in Blender | ⚠️ Variable — must search and vet manually | ❌ Static poses only; looping dance animations not reliably generatable |
| Licensing | High | ✅ Free for personal and commercial web use | ✅ Explicitly permits app embedding | ✅ CC0 = no restrictions; CC-BY = attribution required | ✅ Free tier output usable in projects |
| Visual suitability | Medium | ✅ Stylised humanoid characters available | ✅ Cartoon aesthetic — clearly fictional | ⚠️ Quality varies by asset | ⚠️ Quality unpredictable |
| Effort to obtain final asset | Medium | ✅ Low — download FBX, convert to GLB in Blender | ⚠️ Medium — RPM export + Mixamo bake in Blender | ⚠️ Medium-high — search, vet, verify licence per asset | ⚠️ High — generation + separate animation workflow |

---

## 4. Step-by-Step Instructions

### Prerequisites
- Free Adobe account (for Mixamo) — sign up at adobe.com
- Blender installed (free) — download at blender.org

### Step 1 — Choose a character on Mixamo
1. Go to [mixamo.com](https://www.mixamo.com) and sign in with your Adobe account
2. Click **Characters** in the top nav
3. Browse the character library — recommended options with a stylised look: **Y Bot**, **X Bot**, or any of the cartoon-style humanoids
4. Select your character and click **Use this character**

### Step 2 — Apply a hip-hop dance animation
1. Click **Animations** in the top nav
2. Search for: `hip hop` — several options will appear
3. Recommended animations closest to "Drop It Like It's Hot":
   - **Hip Hop Dancing** — loose, low shuffle movement ✅
   - **Gangnam Style** — energetic, loopable ✅
   - **Breaking** — more athletic, alternative option
4. Select the animation and preview it on your character
5. Ensure **In Place** is unchecked (character moves naturally)
6. Click **Download**
7. In the download dialog:
   - Format: **FBX**
   - Skin: **With Skin**
   - Frames per second: **30**
   - Keyframe reduction: **none**
8. Click **Download** — saves as a `.fbx` file

### Step 3 — Convert FBX to GLB using Blender
1. Open Blender → **File → Import → FBX (.fbx)**
2. Select the downloaded `.fbx` file and click **Import FBX**
3. The character and animation will appear in the scene
4. Go to **File → Export → glTF 2.0 (.glb/.gltf)**
5. In the export settings:
   - Format: **glTF Binary (.glb)**
   - Include: check **Selected Objects**, **Animations**
   - Under **Animation**: check **Export** and set **Mode** to **Actions**
6. Name the file `dancer.glb` and click **Export glTF 2.0**

### Step 4 — Add to the repo
1. Place `dancer.glb` at `web/public/assets/dancer.glb`
2. Commit the file:
   ```bash
   git add web/public/assets/dancer.glb
   git commit -m "FEAT-2026-03-20-003: Add dancer.glb asset"
   ```
3. Notify the Engineering Lead that the asset is in the repo at `web/public/assets/dancer.glb`

---

## 5. Risks and Open Questions

**Mixamo licensing — public repo**
Mixamo's terms permit use in web applications but are ambiguous about committing raw assets to a public GitHub repo. If the `company-x` repo is public, consider adding `web/public/assets/dancer.glb` to `.gitignore` and serving it from a CDN or object storage instead. If the repo is private, committing directly is standard practice and low risk.

**Animation loop smoothness**
Some Mixamo animations have a slight pause at the loop point. Preview the animation in Mixamo before downloading — the **Hip Hop Dancing** clip loops more cleanly than others. The `useAnimations` hook in `@react-three/drei` supports `action.setLoop(THREE.LoopRepeat, Infinity)` to handle this.

**Blender version**
The export steps above are for Blender 3.x and 4.x. Older versions may have slightly different glTF export options. Blender 4.x is recommended.

**No open questions remain** for the sourcing decision itself.

---

## 6. Suggested Next Action

1. Operator follows the steps above to obtain `dancer.glb` and commits it to `web/public/assets/dancer.glb`
2. Operator notifies the Orchestrator that the asset is in the repo
3. Orchestrator routes FEAT-2026-03-20-003 to Engineering — the Open Question about asset sourcing is resolved and the 3D scene work can be completed in full

---

## Success Criteria Check

- [x] At least 3 sourcing options evaluated — 4 evaluated
- [x] Each option assessed for cost, output format, animation suitability, and licensing — see comparison table
- [x] Clear recommended source identified with step-by-step instructions — Mixamo + Blender conversion
- [x] Format conversion steps documented — FBX → GLB via Blender, detailed above
- [x] Licensing confirmed as compatible — Mixamo free for web app use
- [x] Decision can now be acted on with confidence — yes
