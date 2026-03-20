# FEAT-2026-03-20-001: Time Calculator Screen

## Meta
- **ID:** FEAT-2026-03-20-001
- **Type:** New Feature
- **Status:** Backlog
- **Priority:** Low — personal tool, no users blocked
- **Date Created:** 2026-03-20
- **Requested By:** Operator
- **Branch:** feature/FEAT-2026-03-20-001-time-calculator-screen
- **File Lock:** _(populated by Orchestrator at routing time)_

---

## Intent
The current time difference feature (Δt button) requires entering times as raw numbers in HHMM format, which is unintuitive. The operator wants a dedicated time calculator mode with proper start and end time inputs using 12-hour AM/PM format, accessible via a toggle from the existing arithmetic calculator.

---

## Scope
- A mode toggle button on the arithmetic calculator that switches to the time calculator screen
- Time calculator screen with a clearly labelled start time input and end time input
- Each input accepts time in 12-hour format with AM/PM (e.g. 8:00 AM, 3:00 PM)
- A calculate button that computes and displays the difference as hours and minutes (e.g. `7h 00m`)
- A button on the time calculator screen to switch back to the arithmetic calculator
- Remove the existing Δt button from the arithmetic view — it is superseded by this feature

---

## Out of Scope
- Overnight time ranges (e.g. 10:00 PM to 6:00 AM spanning midnight)
- Multiple time range inputs or cumulative totals
- Calculation history or saved results
- Mobile app — web only

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
- 12-hour AM/PM format assumed from operator's examples (8:00 am, 3:00 pm)
- Result format confirmed as hours and minutes (e.g. 7h 00m)
- Overnight ranges excluded — operator did not mention them and the use case (work hours) does not require them
- Δt button removal assumed — new mode toggle replaces that functionality entirely
- No designs provided — Senior Frontend to use judgement on styling consistent with existing calculator

---

## User Story
As a personal user, I want to switch to a time calculator mode and enter a start and end time with AM/PM, so that I can quickly find out how many hours and minutes are between the two times.

---

## Acceptance Criteria
- [ ] A mode toggle button is visible on the arithmetic calculator
- [ ] Pressing the toggle switches the view to the time calculator screen
- [ ] Time calculator displays a start time input and an end time input, each with AM/PM selection
- [ ] Pressing calculate displays the result as `Xh Ym` (e.g. `7h 00m`)
- [ ] Result of 0 hours and 0 minutes displays as `0h 00m`
- [ ] Invalid or incomplete time input displays an error state rather than crashing
- [ ] A button on the time calculator screen switches back to the arithmetic calculator
- [ ] The Δt button no longer appears on the arithmetic calculator view

---

## UI/UX Notes

**Screens affected:**
- Arithmetic calculator — add mode toggle button; remove Δt button

**New screens:**
- Time calculator — start time input, end time input (both 12-hour AM/PM), calculate button, result display, back button

**User flow:**
1. User sees the arithmetic calculator
2. User presses the mode toggle button
3. View flips to the time calculator
4. User enters a start time (e.g. 8:00 AM) and end time (e.g. 3:00 PM)
5. User presses calculate
6. Result displays (e.g. `7h 00m`)
7. User can press back to return to the arithmetic calculator

**Visual notes:**
- No designs provided — Senior Frontend to use judgement, keeping visual style consistent with the existing calculator
- The toggle should feel like a mode switch, not navigation to a new page

**Edge case UI states:**
- Incomplete input (e.g. only start time entered): calculate button disabled or shows error on press
- Invalid time: display shows `Error`

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
| — | — | — |

---

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
