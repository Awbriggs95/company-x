# Company-X Tech Stack

> This file defines the agreed technology decisions for Company-X projects.
> Agents must not introduce new libraries, frameworks, or services without
> an approved brief that explicitly authorises the addition.

---

## Decision States

Every decision in this file has one of four states:

| State | Meaning |
|---|---|
| ✅ Decided | Choice made and locked in — agents use this |
| ❓ Undecided | Relevant but not determined yet — consciously deferred |
| 🚫 Not Applicable | This section or decision does not apply to this project |
| 🔄 In Review | SPIKE brief exists and is active — decision in progress |

**Undecided is not the same as unknown.** An ❓ Undecided entry means the
team has acknowledged this decision exists but has chosen not to make it yet.
Agents must never make Undecided decisions independently — escalate to the
Orchestrator, which will recommend a SPIKE brief to resolve it.

**Not Applicable means the decision was explicitly ruled out.** A 🚫 Not
Applicable entry means the tech-architect skill confirmed with the operator
that this capability is not needed for this project. It is not a gap —
it is a deliberate exclusion.

**In Review means a SPIKE is already running.** Agents must not escalate
on 🔄 In Review items — the decision is being worked. Check
`briefs/active/` for the relevant SPIKE brief and its progress.

---

## Mobile (Frontend)

| Decision | Choice | Status |
|---|---|---|
| Framework | React Native (Expo) | ✅ Decided |
| Language | TypeScript | ✅ Decided |
| Navigation | Expo Router | ✅ Decided |
| State management | React built-in (useState / useReducer) | ✅ Decided |
| Styling | StyleSheet (native) + NativeWind | ✅ Decided |
| Auth | Not applicable — no user accounts | 🚫 Not Applicable |
| Push notifications | Expo Notifications | ✅ Decided |
| OTA updates | Expo Updates | ✅ Decided |

---

## Web (Frontend)

| Decision | Choice | Status |
|---|---|---|
| Framework | Next.js | ✅ Decided |
| Language | TypeScript | ✅ Decided |
| Styling | Tailwind CSS | ✅ Decided |
| State management | Zustand | ✅ Decided |
| Auth | Not determined — deferred (no user accounts yet) | ❓ Undecided |
| Hosting | Vercel | ✅ Decided |

> Web frontend section added when a web capability was first requested.
> All entries Undecided until a web framework SPIKE is completed.

---

## Backend

| Decision | Choice | Status |
|---|---|---|
| Language | Not applicable — frontend-only app | 🚫 Not Applicable |
| Framework | Not applicable — frontend-only app | 🚫 Not Applicable |
| Database | Not applicable — frontend-only app | 🚫 Not Applicable |
| Cloud provider | Not applicable — frontend-only app | 🚫 Not Applicable |
| API style | Not applicable — frontend-only app | 🚫 Not Applicable |
| Auth provider | Not applicable — frontend-only app | 🚫 Not Applicable |
| File storage | Not applicable — frontend-only app | 🚫 Not Applicable |

---

## DevOps & Tooling

| Decision | Choice | Status |
|---|---|---|
| Version control | GitHub | ✅ Decided |
| CI/CD | GitHub Actions | ✅ Decided |
| Monitoring | Sentry | ✅ Decided |
| Error tracking | Sentry | ✅ Decided |
| App distribution | Expo EAS | ✅ Decided |

---

## Agent Framework

| Decision | Choice | Status |
|---|---|---|
| Agent runtime | Claude Code (CLI) | ✅ Decided |
| Agent repo | company-x (GitHub) | ✅ Decided |
| Brief storage | briefs/ folder in Git | ✅ Decided |
| Memory | Briefs + reports + briefs/journal.md | ✅ Decided |

---

## Decisions Log

When any decision moves from ❓ Undecided or 🔄 In Review to ✅ Decided,
record it here before updating the table above.

| Date | Decision | Options Considered | Choice Made | Rationale |
|---|---|---|---|---|
| 2026-03-20 | Mobile state management | None vs library | React built-in (useState/useReducer) | App is a simple calculator with no shared state across screens |
| 2026-03-20 | Mobile auth | N/A | Not applicable | No user accounts required |
| 2026-03-20 | Web framework | Next.js (detected) | Next.js | Already in use — confirmed by operator |
| 2026-03-20 | Web styling | Tailwind CSS (detected) | Tailwind CSS | Already in use — confirmed by operator |
| 2026-03-20 | Web state management | Zustand (detected) | Zustand | Already in use — confirmed by operator |
| 2026-03-20 | Web hosting | Vercel (confirmed) | Vercel | Already deployed — confirmed by operator |
| 2026-03-20 | Backend (all) | N/A | Not applicable | Frontend-only calculator app — no backend needed |
| 2026-03-20 | CI/CD | GitHub Actions | GitHub Actions | Already on GitHub; free tier sufficient |
| 2026-03-20 | Monitoring | Sentry | Sentry | Industry standard; generous free tier |
| 2026-03-20 | Error tracking | Sentry | Sentry | Covers both monitoring and error reporting |

---

## Decision Resolution Order

Undecided decisions have dependencies — resolving them out of order
creates blocking chains. Work through them in this sequence.

| Order | Decision | Why this order | Depends on |
|---|---|---|---|
| 1 | Backend framework | Everything backend depends on this | Nothing |
| 2 | Database | Schema work cannot begin without this | Backend framework |
| 3 | Auth provider | Touches both frontend and backend — unblocks most features | Backend framework, Database |
| 4 | API style | Determines how frontend and backend connect | Backend framework |
| 5 | Cloud provider | Infrastructure work blocked without this | Nothing — run parallel to 1–4 |
| 6 | State management (mobile) | Frontend features requiring shared state are blocked | Nothing — run parallel to 1–5 |
| 7 | Web framework | Required for any web capability | Nothing — run when web work is requested |
| 8 | File storage | Only needed when file upload features are briefed | Cloud provider |
| 9 | CI/CD | DevOps pipeline work blocked without this | Cloud provider |
| 10 | Monitoring / Error tracking | Defer until first production deployment | Cloud provider, CI/CD |

**Recommended parallel tracks:**
- Track A: 1 → 2 → 3, with 4 alongside 2
- Track B: 5 → 9 → 10
- Track C: 6 and 7 independently when needed

---

## Orchestrator Pre-Routing Check

Before routing any brief, the Orchestrator checks whether the brief
touches a domain with ❓ Undecided decisions.

🔄 In Review items do not block routing — a SPIKE is already handling them.
❓ Undecided items block routing. Surface to operator:

```
[TASK-ID] cannot be routed yet.
Blocking undecided decision: [decision name] in shared/stack.md

Recommended action: Create a SPIKE brief to resolve [decision name] first.
Route [TASK-ID] after the spike is complete and stack.md is updated.

Shall I create the SPIKE brief via the Intake Agent?
```

This check runs on every routing action — not just at session start.

---

## Adding New Capabilities

When a request requires a capability not yet in this file
(e.g. a web frontend when only mobile exists), the Intake Agent
surfaces the gap to the operator before writing the brief.

If the operator confirms the gap, the Intake Agent loads
`agents/intake/skills/tech-architect.md` in targeted mode
to define the new capability's stack entries before proceeding.

New capability sections are added to this file by the tech-architect
skill — never by individual agents working on a brief.

---

## Adding New Libraries

Before introducing any library not listed above, an agent must:
1. Flag it in their report as a proposed addition
2. The Lead must escalate to the Orchestrator
3. A Research Spike brief must be created and approved
4. Only after spike completion and your approval can the library be used

No exceptions — this prevents dependency sprawl.
