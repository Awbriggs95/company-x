# FEAT-2026-03-20-001: Time Calculator Screen

## Meta
- **ID:** FEAT-2026-03-20-001
- **Type:** New Feature
- **Status:** Complete
- **Priority:** Medium
- **Date Created:** 2026-03-20
- **Requested By:** Operator
- **Branch:** claude/time-calculator-screen-0m6r1
- **File Lock:** _(cleared — brief complete)_

---

## Intent
Replace the non-functional Δt button on the arithmetic calculator with a dedicated time calculator screen that computes the difference between two times of day in hours and minutes.

---

## Scope
- ⏱ Time toggle button on the arithmetic calculator switches view to a time calculator screen
- Time calculator screen with start and end time inputs (12-hour AM/PM format)
- Calculate button displays result as `Xh Ym`
- Back button returns to arithmetic calculator
- Removal of Δt button and all timeDiff logic from arithmetic calculator and store

---

## Out of Scope
- Backend or database changes
- Mobile app changes (web only)
- Scientific or multi-step time calculations

---

## Affected Teams
- [x] Engineering — Frontend
- [ ] Engineering — Backend
- [x] QA
- [ ] DevOps
- [ ] PM

---

## Dependencies
- None

---

## Open Questions
- None

---

## Notes
**Assumptions made during intake:**
- Web only — no mobile scope
- No test framework exists in the web project; tests not written for this brief (project-wide gap, separate CFG brief recommended)

---

## User Story
As a calculator user, I want to calculate the difference between two times of day, so that I can quickly find out how many hours and minutes are between them.

---

## Acceptance Criteria
- [x] Mode toggle button (⏱ Time) visible on arithmetic calculator
- [x] Toggle switches view to time calculator screen
- [x] Time calculator shows start and end time inputs with AM/PM selection
- [x] Calculate shows result as `Xh Ym` (e.g. `7h 00m`)
- [x] Result of 0 hours and 0 minutes shows `0h 00m`
- [x] Invalid/incomplete input shows error state rather than crashing
- [x] Back button returns to arithmetic calculator
- [x] Δt button no longer appears on arithmetic calculator

---

## UI/UX Notes

**Screens affected:**
- Calculator — Δt button removed; ⏱ Time toggle button added spanning all 4 columns

**New screens:**
- Time Calculator — start/end time inputs with hour/minute dropdowns and AM/PM toggles; Calculate button; result display; Back button

**User flow:**
1. User opens calculator (arithmetic view by default)
2. User taps/clicks ⏱ Time button
3. Time calculator screen appears with start (8:00 AM) and end (3:00 PM) defaults
4. User adjusts times using dropdowns and AM/PM toggles
5. User presses Calculate — result displays as `Xh Ym`
6. User presses ← Back to return to arithmetic calculator

**Visual notes:**
- Keyboard shortcuts disabled in time mode to prevent conflicts with select inputs

---

## API Changes Required
No API changes required.

---

## Database Changes Required
No database changes required.

---

## Mobile Platform Scope
N/A — web only.

---

## Report Index
| Agent | Report | Status |
|---|---|---|
| Engineering Lead | briefs/active/FEAT-2026-03-20-001/reports/engineering-lead.md | Complete |
| Senior Frontend | briefs/active/FEAT-2026-03-20-001/reports/senior-frontend.md | Complete |
| QA Lead | briefs/active/FEAT-2026-03-20-001/reports/qa-lead.md | Pass |
| Senior QA | briefs/active/FEAT-2026-03-20-001/reports/senior-qa.md | Pass |

---

## Completion Sign-Off
- **Orchestrator approved:** [x]
- **Operator approved:** [x]
- **Moved to completed/:** [x]
