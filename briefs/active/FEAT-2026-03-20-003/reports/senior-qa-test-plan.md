# Test Plan — FEAT-2026-03-20-003
**Date:** 2026-03-20
**Brief:** 69+420 Easter Egg — 3D Dance Modal
**Branch under test:** `claude/easter-egg-dance-modal-s8xu3`
**Platform scope:** Web (desktop browser + mobile web browser)
**Tester:** Senior QA

---

## Testing Scope

**Testing types for this brief:**
- [x] Functional — verify all acceptance criteria
- [x] Regression — verify existing calculator behaviour unchanged
- [x] Edge case — alternate inputs, boundary conditions, re-trigger behaviour
- [x] Performance — verify 3D bundle is deferred (not loaded on initial page load)
- [ ] Security — not in scope; no auth, credentials, or sensitive data involved

**Out of scope for this brief:**
- Security testing — no auth, no data storage, no protected resources
- GLB-dependent 3D scene rendering — `dancer.glb` not yet committed to repo; criteria dependent on the live asset are deferred and marked accordingly
- Backend — not in scope per brief

---

## Test Cases

### Functional Tests

| ID | Acceptance Criterion | Test Steps | Expected Result |
|---|---|---|---|
| TC-001 | Calculating 69 + 420 triggers the easter egg modal | Enter `69`, press `+`, enter `420`, press `=` | Full-screen modal overlay appears with dark backdrop and 3D scene area |
| TC-002 | Modal is a fixed full-screen overlay with dark backdrop | Trigger modal (TC-001 steps) | Modal covers entire viewport; background calculator is visible but dimmed behind `bg-black/80` backdrop |
| TC-003 | Close button is present in top-right corner | Trigger modal; inspect top-right corner | ✕ button visible at `top-4 right-4` position, rounded, white/translucent |
| TC-004 | Close button dismisses modal | Trigger modal; click ✕ button | Modal disappears; calculator is visible and interactive behind it |
| TC-005 | Calculator remains functional after modal dismissal | Dismiss modal; perform a new calculation (e.g. `2 + 3 =`) | Calculator responds correctly; result `5` shown |
| TC-006 | GIF placeholder shown when dancer.glb is absent | Trigger modal; observe 3D scene area | Tenor GIF (`https://tenor.com/bQDvb.gif`) rendered in scene area — spinner may briefly appear first |
| TC-007 | Close button meets 44×44px minimum tap target | Inspect component source `EasterEggModal/index.tsx` | Button uses `w-12 h-12` (48×48px Tailwind) — exceeds 44×44px minimum |
| TC-008 | Modal does not appear for other calculations | Perform `420 + 69 =`, `400 + 89 =`, `5 + 5 =` | No modal appears for any of these |

### Regression Tests

| ID | Area | What to verify |
|---|---|---|
| RT-001 | Arithmetic — basic operations | Addition, subtraction, multiplication, division produce correct results |
| RT-002 | Arithmetic — AC button | AC resets display to `0`, clears expression |
| RT-003 | Arithmetic — +/- and % | Sign toggle and percentage function correctly |
| RT-004 | Arithmetic — keyboard input | Digits, `+`, `-`, `*`, `/`, `Enter`, `Escape`, `Backspace` all function as before |
| RT-005 | Arithmetic — error state | Division by zero shows `Error`; next digit resets |
| RT-006 | Time calculator mode | ⏱ Time button still switches to time calculator; Back returns to arithmetic |
| RT-007 | Store state after dismiss | After dismissing modal, `showEasterEgg` is false; store `operator`, `previousValue` are cleared normally |

### Edge Case Tests

| ID | Scenario | Test Steps | Expected Result |
|---|---|---|---|
| EC-001 | Reversed operands: 420 + 69 | Enter `420`, press `+`, enter `69`, press `=` | Result `489` shown; **no modal** |
| EC-002 | Same sum via different operands: 400 + 89 | Enter `400`, press `+`, enter `89`, press `=` | Result `489` shown; **no modal** |
| EC-003 | Keyboard path triggers modal | Type `6`, `9`, press `+`, type `4`, `2`, `0`, press `Enter` | Modal appears — same as button path |
| EC-004 | Re-trigger modal on second 69+420 | Dismiss modal; enter `69`, press `+`, enter `420`, press `=` again | Modal appears again — re-triggerable |
| EC-005 | AC while modal is visible | Trigger modal; press AC button on keyboard (`Escape`) | Modal dismisses (store clears to INITIAL_STATE including `showEasterEgg: false`) |
| EC-006 | Backdrop click does NOT dismiss modal | Trigger modal; click on dark backdrop area (not ✕ button) | Modal remains open — only ✕ button dismisses |
| EC-007 | Chain calculation ending in 69 + 420 | Enter `5`, press `+`, press `=` (= 10), then enter `69`, `+`, `420`, `=` | Modal appears on final step |

### Performance Tests

| ID | Scenario | Acceptable threshold | How to measure |
|---|---|---|---|
| PT-001 | 3D libraries NOT in initial JS bundle | Open Network tab in DevTools; load `http://localhost:3000`; inspect loaded JS chunks | No chunk containing `@react-three` or `three.js` downloaded on initial load |
| PT-002 | 3D libraries load when easter egg fires | After PT-001 baseline established; trigger easter egg; re-inspect Network tab | `@react-three` bundle chunk(s) downloaded only after modal fires |

---

## Test Environment

**Platform:** Web browser — `http://localhost:3000`
**Mobile:** Any mobile browser (or DevTools responsive mode) for close button tap target verification

**Setup steps:**
1. Check out branch `claude/easter-egg-dance-modal-s8xu3`
2. `cd web && npm run dev`
3. Open browser at `http://localhost:3000`
4. For PT-001/PT-002: Open DevTools → Network tab → filter JS

**Test data required:** None — all inputs via UI controls

**Known pre-condition:** `web/public/assets/dancer.glb` is not in repo. The 3D scene will show the Tenor GIF error fallback. GLB-dependent 3D scene rendering is deferred.
