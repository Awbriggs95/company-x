# Skill — Frontend Routing

> Owner: engineering-lead | Version: 1.0.0
> Defines how the Engineering Lead assigns and scopes frontend work
> to the Senior Frontend agent.

---

## When This Skill Applies

Use this skill when a brief has Engineering — Frontend checked in
its Affected Teams field, or when any of the following are in scope:

- React Native screens or components
- Navigation changes (Expo Router)
- UI state management
- User-facing interactions, animations, or transitions
- Integration of backend APIs into the UI layer
- Mobile platform-specific UI behaviour (iOS / Android)

---

## What Frontend Work Looks Like

Before scoping frontend work, identify which category it falls into:

| Category | Examples | Typical complexity |
|---|---|---|
| New screen | Login screen, profile page, onboarding flow | High |
| New component | Button variant, modal, card | Medium |
| Screen modification | Add a field, change layout, update copy | Low–Medium |
| API integration | Connect existing UI to new or changed endpoint | Medium |
| Navigation change | Add route, change tab structure, deep link | Medium |
| Platform-specific fix | iOS-only layout, Android-specific behaviour | Medium–High |

Use this to set realistic expectations in the assignment brief.

---

## Scoping Frontend Work

When assigning frontend work to the Senior Frontend agent, extract
the following from the brief and include it in the assignment:

### From a New Feature brief (FEAT)
```
Screens affected:        [from UI/UX Notes]
New screens required:    [from UI/UX Notes]
User flow:               [from UI/UX Notes]
Visual notes:            [from UI/UX Notes]
Edge case UI states:     [from UI/UX Notes]
API endpoints to consume:[from API Changes Required]
Platform scope:          [from Mobile Platform Scope]
Acceptance criteria:     [frontend-relevant items only]
```

### From a Bug Fix brief (BUG)
```
Screen where bug occurs: [from Steps to Reproduce]
Expected UI behaviour:   [from Expected Behaviour]
Actual UI behaviour:     [from Actual Behaviour]
Platform affected:       [from Environment]
Acceptance criteria:     [frontend-relevant items only]
```

### From a Refactor brief (RFCT)
```
Files in scope:          [from Scope Boundaries — In scope]
Files out of scope:      [from Scope Boundaries — Out of scope]
What must not change:    [from What Must Not Change]
Definition of done:      [from Definition of Done]
```

---

## Frontend-Specific Assignment Rules

### API dependency
If the frontend work requires consuming an API endpoint that does
not yet exist — frontend cannot begin integration until Backend
has completed and confirmed the endpoint is available.

In the assignment brief, state this explicitly:
```
Dependency: Backend API must be complete before integration begins.
You may build the UI shell and mock data in parallel.
Notify me when ready to integrate.
```

### Platform scope
If the brief specifies both iOS and Android, include this in the
assignment:
```
Platform scope: Both iOS and Android.
Test on both platforms before reporting complete.
```

If iOS only or Android only — state it and note the other platform
is explicitly out of scope for this brief.

### Design assets
If UI/UX notes reference design files or mockups, confirm they are
accessible before assigning. If not accessible, escalate to
Orchestrator before work begins — do not let the Senior Frontend
agent proceed without design references for complex UI work.

---

## Frontend Completion Criteria

Before accepting the Senior Frontend agent's work as complete,
verify all of the following:

- [ ] All acceptance criteria relevant to frontend are met
- [ ] UI renders correctly on both platforms (or stated platform only)
- [ ] Loading, empty, and error states are implemented
- [ ] No console errors or warnings introduced
- [ ] Code passes ESLint and Prettier per shared/conventions.md
- [ ] Branch is pushed and PR is open against the correct base branch
