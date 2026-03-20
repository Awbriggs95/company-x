# Brief Writing — Bug Fix

> This file defines the type-specific fields appended to the base brief
> template for Bug Fix requests. Read `shared/brief-template.md` first
> for the universal base fields that precede these.
>
> TASK ID prefix: BUG

---

## When to Use This Template

Use this template when the request corrects behaviour that is broken,
incorrect, or different from what was intended. The key test: is there
an expected behaviour that is currently not happening?

If the answer is no — reconsider the type. It may be a New Feature
(the behaviour never existed) or a Refactor (the code works but is messy).

---

## Severity Levels

Assign severity before writing any other field — it sets the priority
of the brief and influences how urgently agents should treat it.

| Severity | Definition | Suggested Priority |
|---|---|---|
| **Critical** | App crashes, data loss, security vulnerability, or core feature completely broken for all users | Critical |
| **High** | Major feature broken with no workaround available | High |
| **Medium** | Feature broken but a workaround exists, or affects a subset of users | Medium |
| **Low** | Minor visual issue, edge case, or cosmetic defect with no functional impact | Low |

**Rule:** When in doubt, assign one severity level higher than you think.
It is easier to downgrade than to have an agent deprioritise a real issue.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### Severity

```markdown
## Severity
[Critical | High | Medium | Low]

**Rationale:** [One sentence explaining why this severity was assigned]
```

---

### Steps to Reproduce

The exact sequence of actions that reliably triggers the bug.
If the bug is intermittent, note that explicitly.

```markdown
## Steps to Reproduce

1. [First action]
2. [Second action]
3. [Continue until bug occurs]

**Reproducibility:** [Always | Intermittent — approximately X% of the time | Unable to reproduce consistently]
```

**Writing rules:**
- Steps must be specific enough that the QA agent can follow them exactly
- Start from a known state — e.g. "Starting from the login screen..."
- Include any preconditions — e.g. "User must be logged in", "Requires iOS 17"
- If intermittent, include any patterns noticed — e.g. "more frequent on Android"
- If unable to reproduce reliably, still document the steps that sometimes trigger it

---

### Expected vs Actual Behaviour

A clear, side-by-side statement of what should happen versus what does happen.

```markdown
## Expected Behaviour
[What should happen when the steps above are followed]

## Actual Behaviour
[What actually happens instead]
```

**Writing rules:**
- Be specific — "the app crashes" is less useful than "the app closes
  immediately and returns to the home screen with no error message"
- Describe observable behaviour only — not suspected causes
- If there is an error message, quote it exactly
- One expected behaviour and one actual behaviour per brief —
  if multiple things are broken, create multiple briefs

---

### Environment

The specific conditions under which the bug was observed.

```markdown
## Environment

| Field | Value |
|---|---|
| Platform | [iOS | Android | Both] |
| OS version | [e.g. iOS 17.4, Android 14] |
| App version | [e.g. 1.2.3 or "latest build"] |
| Device | [e.g. iPhone 15 Pro, Pixel 7 — if known] |
| Network | [e.g. WiFi, 4G, offline — if relevant] |
| User state | [e.g. logged in, logged out, new user, returning user] |
```

**Writing rules:**
- Fill in every field you know — mark unknown fields as "Unknown"
- If the bug only occurs on one platform, note whether it has been
  tested on the other platform and confirm it does not occur there
- Network and device fields are only mandatory if they appear relevant
  to the bug — use judgment

---

### Suspected Cause

Any hypothesis about what is causing the bug. Not required to be correct —
this is a starting point for the agent, not a diagnosis.

```markdown
## Suspected Cause
[Your hypothesis, or "Unknown — no suspected cause identified"]
```

**Writing rules:**
- Be honest about confidence level — "possibly related to..." is fine
- Reference specific files, functions, or recent changes if known
- If a recent code change likely introduced the bug, reference the
  TASK ID of that brief here
- Never leave this blank — if you have no hypothesis, write
  "Unknown — no suspected cause identified" explicitly

---

### Screenshot or Recording Reference

Any visual evidence of the bug that will help agents understand and reproduce it.

```markdown
## Screenshot or Recording Reference

| Type | Reference |
|---|---|
| Screenshot | [filename, path, or URL — or "None provided"] |
| Screen recording | [filename, path, or URL — or "None provided"] |
| Error log | [filename, path, or URL — or "None provided"] |

**Notes:** [Any context about the attached evidence]
```

**Writing rules:**
- Always populate this field — even if empty, write "None provided"
- If a screenshot exists, it must be attached or linked — do not
  describe a screenshot without providing it
- Error logs are particularly valuable for crashes — include them
  whenever available
- If evidence was provided by a user report, note that

---

## Complete Bug Fix Brief Example

```markdown
# BUG-2026-03-14-002: App Crashes on Google Sign-In (Android)

## Meta
- **ID:** BUG-2026-03-14-002
- **Type:** Bug Fix
- **Status:** Active
- **Priority:** High
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** fix/BUG-2026-03-14-002-google-signin-android-crash

## Intent
The app crashes immediately after the Google OAuth consent screen
on Android devices. Users cannot sign in on Android at all.

## Scope
- Identify and fix the crash on Android during Google OAuth flow
- Verify fix works across Android OS versions 12 and above

## Out of Scope
- iOS OAuth flow (working correctly)
- Any changes to the OAuth UI or flow design

## Affected Teams
- [x] Engineering — Frontend
- [x] Engineering — Backend
- [x] QA
- [ ] DevOps
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

## Dependencies
- FEAT-2026-03-14-001 (Google OAuth Login) — this bug is in that feature

## Open Questions
- None

## Notes
**Assumptions made during intake:**
- Assumed High severity — core feature broken on Android with no workaround

---

## Severity
High

**Rationale:** Google sign-in is completely non-functional on Android,
affecting all Android users with no available workaround.

## Steps to Reproduce

1. Open the app on an Android device
2. Navigate to the login screen
3. Tap "Sign in with Google"
4. Complete the Google OAuth consent screen
5. App crashes immediately upon returning from consent screen

**Reproducibility:** Always — reproduced on Pixel 7 (Android 14)
and Samsung Galaxy S23 (Android 13)

## Expected Behaviour
After completing Google OAuth consent, the user is navigated
to the home screen with their name and profile photo displayed.

## Actual Behaviour
The app closes immediately upon returning from the OAuth consent
screen. No error message is shown. The user is returned to their
device home screen.

## Environment

| Field | Value |
|---|---|
| Platform | Android only |
| OS version | Android 13 and Android 14 (both confirmed) |
| App version | Latest build |
| Device | Pixel 7, Samsung Galaxy S23 |
| Network | WiFi |
| User state | Logged out — attempting first sign-in |

## Suspected Cause
Possibly missing or misconfigured google-services.json — the
brief for FEAT-2026-03-14-001 noted this was required for Android
but it is unclear if it was correctly set up during implementation.

## Screenshot or Recording Reference

| Type | Reference |
|---|---|
| Screenshot | None provided |
| Screen recording | None provided |
| Error log | crash-log-android-2026-03-14.txt |

**Notes:** Error log captured from Android Studio during reproduction.

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
