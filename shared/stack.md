# Company-X Tech Stack

> This file defines the agreed technology decisions for Company-X projects.
> Agents must not introduce new libraries, frameworks, or services without
> an approved brief that explicitly authorises the addition.

---

## Decision States

Every decision in this file has one of three states:

| State | Meaning |
|---|---|
| ✅ Decided | Choice made and locked in — agents use this |
| ❓ Undecided | Not determined yet — consciously deferred |
| 🔄 In Review | SPIKE brief exists and is active — decision in progress |

**Undecided is not the same as unknown.** An ❓ Undecided entry means the
team has acknowledged this decision exists but has chosen not to make it yet.
Agents must never make Undecided decisions independently — escalate to the
Orchestrator, which will recommend a SPIKE brief to resolve it.

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
| State management | Not determined | ❓ Undecided |
| Styling | StyleSheet (native) + NativeWind | ✅ Decided |
| Auth | Not determined | ❓ Undecided |
| Push notifications | Expo Notifications | ✅ Decided |
| OTA updates | Expo Updates | ✅ Decided |

---

## Web (Frontend)

| Decision | Choice | Status |
|---|---|---|
| Framework | React + Vite | ✅ Decided |
| Language | TypeScript | ✅ Decided |
| Styling | CSS Modules | ✅ Decided |
| State management | React useState (local) | ✅ Decided |
| Auth | Not determined | ❓ Undecided |

> Web frontend section updated when the first web feature (calculator) was built.

---

## Backend

| Decision | Choice | Status |
|---|---|---|
| Language | Python | ✅ Decided |
| Framework | Not determined | ❓ Undecided |
| Database | Not determined | ❓ Undecided |
| Cloud provider | Not determined | ❓ Undecided |
| API style | Not determined | ❓ Undecided |
| Auth provider | Not determined | ❓ Undecided |
| File storage | Not determined | ❓ Undecided |

---

## DevOps & Tooling

| Decision | Choice | Status |
|---|---|---|
| Version control | GitHub | ✅ Decided |
| CI/CD | Not determined | ❓ Undecided |
| Monitoring | Not determined | ❓ Undecided |
| Error tracking | Not determined | ❓ Undecided |
| App distribution | Expo EAS | ✅ Decided |

---

## Agent Framework

| Decision | Choice | Status |
|---|---|---|
| Agent runtime | Claude Code (CLI) | ✅ Decided |
| Agent repo | company-x (GitHub) | ✅ Decided |
| Brief storage | briefs/ folder in Git | ✅ Decided |
| Memory | Briefs + reports + journal.md | ✅ Decided |

---

## Decisions Log

When any decision moves from ❓ Undecided or 🔄 In Review to ✅ Decided,
record it here before updating the table above.

| Date | Decision | Options Considered | Choice Made | Rationale |
|---|---|---|---|---|
| 2026-03-17 | Web framework | React + Vite, Next.js, Plain HTML | React + Vite | Lightweight SPA setup; aligns with existing React Native knowledge; fast dev server; TypeScript-first |
| 2026-03-17 | Web styling | CSS Modules, Tailwind, styled-components | CSS Modules | Zero dependencies, scoped styles, no build config overhead |
| 2026-03-17 | Web state management | Redux, Zustand, React useState | React useState (local) | Calculator has no shared/global state requirements |

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
