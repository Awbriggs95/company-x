# FEAT-2026-03-20-003: 69+420 Easter Egg — 3D Dance Modal

## Meta
- **ID:** FEAT-2026-03-20-003
- **Type:** New Feature
- **Status:** Active
- **Priority:** Low — non-critical easter egg; no user workflow is blocked while it remains unbuilt
- **Date Created:** 2026-03-20
- **Requested By:** Operator
- **Branch:** feature/FEAT-2026-03-20-003-easter-egg-dance-modal
- **File Lock:** web/src/components/EasterEggModal/, web/src/components/Calculator/index.tsx, web/src/store/calculatorStore.ts, web/public/assets/dancer.glb

---

## Intent
When a user calculates 69 + 420 (result: 489), a modal appears with an interactive 3D scene of a stylised dancing character performing a "Drop It Like It's Hot"-style move. A small delight feature — rewards users who land on this specific result.

---

## Scope
- Detect when the calculator result is exactly 489 and the expression used is addition of 69 and 420
- Display a modal overlay on top of the web calculator
- Render an interactive 3D scene using React Three Fiber containing a stylised character (not Snoop Dogg's likeness — clearly fictional)
- Character performs a looping "Drop It Like It's Hot"-style dance animation sourced from the glTF/GLB asset
- User can rotate and inspect the scene (OrbitControls)
- Close button in the top-right corner — large tap target for mobile web usability
- Animation loops continuously while the modal is open
- Silent — no audio
- Lazy-load the 3D libraries via `next/dynamic` so initial calculator load time is unaffected

---

## Out of Scope
- Audio or music playback
- Triggering on any result other than 489
- Mobile app (React Native) — web only
- Any backend, API, or database changes
- Sourcing or creating the glTF/GLB asset — this is an external dependency (see Open Questions)

---

## Affected Teams
- [x] Engineering — Frontend
- [ ] Engineering — Backend
- [x] QA
- [ ] DevOps
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

---

## Dependencies
- None

---

## Open Questions

⚠️ **Asset not yet sourced — partial routing blocker.**
The 3D scene requires a glTF/GLB file containing a stylised dancing character with a "Drop It Like It's Hot"-style animation. This asset does not yet exist in the repo. Engineering can build the trigger logic, modal shell, and React Three Fiber integration against a placeholder model, but the scene cannot be finalised until the real asset is provided.

The operator must source or commission the asset externally and commit it to the repo before the 3D scene work can be completed. Recommended path: `web/public/assets/dancer.glb`.

---

## Notes
**Assumptions made during intake:**
- Trigger is specifically 69 + 420 = 489, not any sum equalling 489
- "Stylised stand-in" means a clearly fictional character with a visual aesthetic inspired by Snoop Dogg (e.g. tall, relaxed, long braids) but carrying no real-world likeness claim
- OrbitControls enabled — user can rotate the scene freely
- Close button sized for mobile tap target (minimum 44×44px per standard accessibility guidance)
- 3D libraries loaded lazily — no impact on initial calculator load
- Asset path assumed to be `web/public/assets/dancer.glb` — engineering may adjust if needed

**Decisions from SPIKE-2026-03-20-002:**
- Library: React Three Fiber (`@react-three/fiber` + `@react-three/drei`) — already ✅ Decided in stack.md
- New packages required: `@react-three/fiber`, `@react-three/drei`, `three` — approval constituted by this brief's routing

---

## User Story
As a calculator user, I want a surprising interactive moment when I calculate 69 + 420, so that I'm rewarded with something unexpected and fun.

---

## Acceptance Criteria

Scenario: Easter egg triggered
```
Given I am using the web calculator
When I calculate 69 + 420
Then a modal appears over the calculator
And the modal contains an interactive 3D scene with a dancing character
And the character's animation loops continuously
And I can click and drag to rotate the scene
And no audio plays
```

Scenario: Modal dismissed
```
Given the easter egg modal is open
When I click the close button in the top-right corner
Then the modal closes
And the calculator is visible and functional behind it
```

Scenario: Easter egg not triggered on other results
```
Given I am using the web calculator
When I calculate any result other than 69 + 420 = 489
Then no modal appears
```

Scenario: Mobile close button usability
```
Given I am viewing the web calculator on a mobile browser
When the easter egg modal is open
Then the close button in the top-right is large enough to tap accurately
And the button does not overlap the 3D scene in a way that obstructs viewing
```

Scenario: Calculator performance unaffected
```
Given I have not yet triggered the easter egg
When I load the web calculator
Then the 3D libraries have not been loaded
And calculator performance is unchanged
```

---

## UI/UX Notes

**Screens affected:**
- Calculator — result display triggers modal on specific value; no visible changes otherwise

**New components:**
- `EasterEggModal` — full-screen modal overlay containing the React Three Fiber canvas
- `DanceScene` — R3F scene component: loads glTF asset, plays animation loop, enables OrbitControls

**User flow:**
1. User enters 69 + 420 and presses = (or Enter)
2. Result 489 displays
3. Modal appears immediately over the calculator
4. 3D dancing character is visible, animation playing, scene interactive
5. User rotates scene freely with mouse/touch drag
6. User taps/clicks close button (top-right) to dismiss
7. Calculator returns to normal state

**Visual notes:**
- Modal: dark semi-transparent overlay behind the 3D canvas
- Close button: top-right, minimum 44×44px tap target, clearly visible against the scene (white × on dark background or floating button with contrast)
- 3D scene: no specific visual design prescribed — Senior Frontend to use judgement; character should read as a stylised humanoid dancer
- Placeholder model acceptable during development; scene must be wired for the real asset at `web/public/assets/dancer.glb`

**Edge case UI states:**
- Asset not loaded / loading: show a loading spinner inside the modal until the glTF is ready
- Asset fails to load: show a fallback message ("Something went wrong") — do not crash the calculator

---

## API Changes Required
No API changes required.

---

## Database Changes Required
No database changes required.

---

## Mobile Platform Scope
N/A — web only. Responsive behaviour required: modal and close button must be usable on mobile browser widths.

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
