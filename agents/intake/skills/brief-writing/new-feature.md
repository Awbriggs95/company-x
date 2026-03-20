# Brief Writing — New Feature

> This file defines the type-specific fields appended to the base brief
> template for New Feature requests. Read `shared/brief-template.md` first
> for the universal base fields that precede these.
>
> TASK ID prefix: FEAT

---

## When to Use This Template

Use this template when the request introduces functionality that does
not currently exist in the product. The key test: would a user notice
something new they can now do?

If the answer is no — reconsider the type. It may be a Refactor or Config Change.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### User Story

A single sentence capturing who wants this, what they want to do,
and why it matters to them.

```markdown
## User Story
As a [type of user], I want to [do something], so that [benefit or outcome].
```

**Writing rules:**
- One user story per brief — if you need more than one, the feature likely needs splitting
- The "so that" clause is mandatory — it captures the reason, not just the action
- Use plain language — avoid technical terms in the user story
- The user is always a person, never a system

**Good example:**
```
As a new user, I want to sign in with my Google account,
so that I don't have to create and remember a new password.
```

**Bad example:**
```
As a user, I want OAuth2 integration implemented via
expo-auth-session so that authentication works.
```

---

### Acceptance Criteria

The specific, testable conditions that must all be true for this
feature to be considered complete.

```markdown
## Acceptance Criteria
[Plain checklist or Gherkin format — see guidance below]
```

#### Format Selection

**Use plain checklist** for straightforward features where conditions
are clear and independent:

```markdown
- [ ] User can tap "Sign in with Google" on the login screen
- [ ] Tapping the button opens the Google OAuth consent screen
- [ ] After successful auth, user is taken to the home screen
- [ ] User's name and profile photo are populated from Google
- [ ] If auth fails, an error message is shown and user stays on login screen
- [ ] Works on both iOS and Android
```

**Use Gherkin (Given / When / Then)** for features involving multiple
states, conditional flows, or complex user journeys:

```markdown
Scenario: Successful Google sign-in
  Given I am on the login screen
  When I tap "Sign in with Google"
  And I complete the Google OAuth consent
  Then I am taken to the home screen
  And my name and profile photo are displayed

Scenario: Failed Google sign-in
  Given I am on the login screen
  When I tap "Sign in with Google"
  And I cancel or fail the OAuth consent
  Then I remain on the login screen
  And I see an error message explaining what happened
```

**Decision rule:**
- Single happy path + simple error state → plain checklist
- Multiple scenarios, conditional flows, or role-based behaviour → Gherkin

#### Writing rules for acceptance criteria
- Every criterion must be independently testable by the QA agent
- Avoid vague language: "works correctly", "looks good", "is fast" — never acceptable
- Cover the happy path, at least one error state, and any edge cases in scope
- Do not include implementation details — what, not how

---

### UI/UX Notes

Screens, flows, interactions, and visual behaviour relevant to this feature.

```markdown
## UI/UX Notes

**Screens affected:**
- [Screen name] — [what changes or is added]

**New screens:**
- [Screen name] — [purpose and key elements]

**User flow:**
[Step by step description of the interaction from the user's perspective]

**Visual notes:**
[Any specific visual behaviour, animations, states, or constraints]

**Edge case UI states:**
- [Empty state, loading state, error state — as applicable]
```

**Writing rules:**
- If designs or mockups exist, reference them by filename or URL
- If no designs exist, describe intent clearly enough for the Senior Frontend
  agent to make reasonable decisions — note assumptions made
- Always specify loading, empty, and error states if the screen fetches data
- Never prescribe specific implementation (e.g. don't say "use a FlatList") —
  describe behaviour, not code

---

### API Changes Required

Any new or modified API endpoints needed to support this feature.

```markdown
## API Changes Required

**New endpoints:**
- [METHOD] /path — [purpose]

**Modified endpoints:**
- [METHOD] /path — [what changes and why]

**No API changes required:** [state explicitly if none needed]
```

**Writing rules:**
- If the full API design is unknown at brief time, describe the data needed
  and let the Senior Backend agent propose the endpoint design
- Flag if this endpoint will be consumed by platforms other than mobile
- Note any authentication or authorisation requirements

---

### Database Changes Required

Any new tables, columns, indexes, or schema modifications needed.

```markdown
## Database Changes Required

**New tables:**
- [table_name] — [purpose, key columns]

**Modified tables:**
- [table_name] — [what changes: new column, index, constraint, etc.]

**No database changes required:** [state explicitly if none needed]
```

**Writing rules:**
- If schema design is unknown at brief time, describe the data that needs
  to be stored and let the Senior Backend agent propose the schema
- Always flag if existing data needs migrating — this affects complexity significantly
- Note if any changes affect data that already exists in production

---

### Mobile Platform Scope

Which platforms this feature must work on and any platform-specific notes.

```markdown
## Mobile Platform Scope

**Platforms:** [iOS only | Android only | Both iOS and Android]

**Platform-specific notes:**
- iOS: [any iOS-specific behaviour, constraints, or considerations]
- Android: [any Android-specific behaviour, constraints, or considerations]

**Minimum OS versions:** [if known — otherwise defer to stack.md defaults]
```

**Writing rules:**
- Default to both platforms unless the operator explicitly scopes to one
- Note any native device features used (camera, biometrics, notifications)
  as these have platform-specific implementation requirements
- If behaviour differs between platforms, describe each explicitly

---

## Complete New Feature Brief Example

```markdown
# FEAT-2026-03-14-001: Google OAuth Login

## Meta
- **ID:** FEAT-2026-03-14-001
- **Type:** New Feature
- **Status:** Backlog
- **Priority:** High
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** feature/FEAT-2026-03-14-001-google-oauth-login

## Intent
Allow users to sign in using their existing Google account so they
don't need to create a separate password for the app.

## Scope
- Google OAuth sign-in button on the login screen
- OAuth flow using expo-auth-session
- Profile data (name, photo) pulled from Google on first sign-in
- Works on iOS and Android

## Out of Scope
- Apple sign-in (separate brief)
- Linking Google to an existing email/password account (separate brief)
- Web app authentication (mobile only)

## Affected Teams
- [x] Engineering — Frontend
- [x] Engineering — Backend
- [x] QA
- [ ] DevOps
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

## Dependencies
- None

## Open Questions
- None

## Notes
**Assumptions made during intake:**
- Assumed both iOS and Android in scope based on Expo stack
- Assumed new users only — existing user linking deferred

---

## User Story
As a new user, I want to sign in with my Google account,
so that I don't have to create and remember a new password.

## Acceptance Criteria
- [ ] "Sign in with Google" button visible on login screen
- [ ] Tapping button opens Google OAuth consent screen
- [ ] Successful auth navigates user to home screen
- [ ] User's display name and profile photo populated from Google
- [ ] Failed or cancelled auth shows error message, stays on login screen
- [ ] Works on iOS and Android

## UI/UX Notes
**Screens affected:**
- Login Screen — add "Sign in with Google" button below existing fields

**User flow:**
1. User opens app and sees login screen
2. User taps "Sign in with Google"
3. Google OAuth consent screen opens
4. User approves
5. User lands on home screen with their name and photo visible

**Visual notes:**
- Button should follow Google's branding guidelines (white button, Google logo)
- Loading spinner shown while OAuth is processing

**Edge case UI states:**
- Error state: "Sign in failed. Please try again." with retry option
- Loading state: button disabled and spinner shown during OAuth flow

## API Changes Required
**New endpoints:**
- POST /auth/google — accepts Google OAuth token, returns session token

## Database Changes Required
**Modified tables:**
- users — add google_id (varchar, nullable), avatar_url (varchar, nullable)

## Mobile Platform Scope
**Platforms:** Both iOS and Android
**Platform-specific notes:**
- iOS: requires URL scheme configured in app.json for OAuth redirect
- Android: requires google-services.json in project root
**Minimum OS versions:** Defer to stack.md defaults

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
