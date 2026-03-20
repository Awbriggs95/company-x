# Skill — Tech Architect

> Owner: intake-agent | Also loaded by: root CLAUDE.md at session start
> Version: 2.0.0
> Loaded by the root CLAUDE.md at session start before any agent is active,
> or by the Intake Agent when a capability gap is detected during brief creation.
> When loaded from root CLAUDE.md, the skill runs in the context of the
> framework router — not the Intake Agent. Behaviour is identical regardless
> of who loads it.
> Walks through every section of shared/stack.md and ensures every
> decision is in a known, explicit state before work begins.
>
> No entry in stack.md is ever left blank or in a default state.
> Every decision is one of: ✅ Decided, ❓ Undecided (explicit), or
> 🚫 Not Applicable. Silence is never a valid stack state.
>
> Never surface technical jargon to the operator. Ask product questions,
> derive technical answers internally, present conclusions in plain language.

---

## Core Principle

The operator knows what they want to build. They do not need to know
what FastAPI, Supabase, or Zustand are to make the right decisions.
Your job is to translate their product intent into stack choices,
present the conclusions in plain language, and get confirmation.

Every decision in stack.md must be explicitly stated after this skill
runs. A blank or missing entry is indistinguishable from a bug —
it must never happen.

**When an agent cannot identify the appropriate technology for a
decision during their work:** Stop immediately. Do not guess.
Surface the gap to the operator with full context before continuing.
See the Agent Gap Escalation section at the bottom of this file.

---

## Entry Points

This skill has three entry points. The correct one is determined
by context before the skill loads.

| Entry Point | When to use |
|---|---|
| Full Mode | Fresh project — stack.md is in default state |
| Import Mode | Existing project — stack decisions already exist in the codebase |
| Targeted Mode | Specific capability gap found during brief creation |

---

## Entry Point — Full Mode

Triggered when: `briefs/` does not exist, or stack.md is in its
default state with no decisions recorded.

Open with:

```
Before we start I need to understand what you're building —
it'll only take a few minutes and means agents will have
everything they need without stopping to ask technical
questions later.

First — do you already have a tech stack in mind, or would
you like me to recommend one based on what you're building?
```

Wait for response:
- Operator has a stack in mind → Entry Point B (Direct)
- Operator wants a recommendation → Entry Point A (Guided)

After the initial question is answered, route to the appropriate sub-path:
- Operator has a stack in mind → **Entry Point A — Direct** (below)
- Operator wants a recommendation → **Entry Point B — Guided** (Section-by-Section Flow)

---

## Full Mode — Entry Point A (Direct)

The operator already knows their stack. Move quickly — ask for declarations
section by section without walking through the reasoning behind each choice.

Open with:
```
Great — walk me through what you have in mind. I'll go section by section
so we don't miss anything.

Starting with Mobile — what's your frontend framework?
```

Work through each section in the order defined in `shared/stack.md`.
For each entry:
- Accept the operator's declaration and mark ✅ Decided
- If the operator says "not sure" or "undecided" — mark ❓ Undecided explicitly
- If the section doesn't apply — confirm once and mark 🚫 Not Applicable

Do not explain options or offer recommendations unless the operator asks.
The operator is declaring — your job is to record accurately and catch anything
they haven't addressed.

When all sections are complete, present a summary for confirmation:
```
Here's what I've recorded:

[Section]
  [Decision]: [Choice]   ✅
  [Decision]: Not determined   ❓
  ...

Does this look right? Confirm and I'll write it to stack.md.
```

On confirmation — write to stack.md and exit Full Mode.

---

## Full Mode — Entry Point B (Guided)



Triggered when: the operator indicates they are bringing this
framework into an existing codebase, or stack.md exists but
contains decisions that were made outside this framework.

Open with:

```
It looks like this project already has a tech stack in place.
Let me read what's there and map it across — I'll flag anything
that needs confirming or filling in.
```

**Step 1 — Read the codebase**
Look for technology signals in this order:
- `package.json` / `requirements.txt` / `Pipfile` — dependencies
- Config files — `next.config.js`, `vite.config.ts`, `app.json`, etc.
- Existing `stack.md` or `TECH.md` if present
- Framework-specific folder structures (`pages/`, `app/`, `src/`)

**Step 2 — Map findings to stack.md sections**
For each section in stack.md, determine:
- ✅ Decided — technology clearly identifiable from the codebase
- ❓ Undecided — section is relevant but no clear technology found
- 🚫 Not Applicable — section is not relevant to this project

**Step 3 — Present findings for confirmation**

```
Here's what I found in the codebase:

Mobile
  Framework:     React Native (Expo)   ✅ — found in package.json
  Navigation:    Expo Router           ✅ — found in app/ structure
  Styling:       NativeWind            ✅ — found in package.json
  State mgmt:    Not found             ❓ — needs a decision
  Auth:          Not found             ❓ — needs a decision

Backend
  Language:      Python                ✅ — found in requirements.txt
  Framework:     FastAPI               ✅ — found in requirements.txt
  Database:      Not found             ❓ — needs a decision

[etc for each section]

Does this look right? Let me know if anything is incorrect
before I lock it in.
```

**Step 4 — Resolve gaps**
For each ❓ Undecided entry found, ask the operator to either:
- Make the decision now — walk through the relevant section questions
- Explicitly defer it — mark as ❓ Undecided with a note explaining why

Do not leave gaps unaddressed. Every gap must result in either
a decision or an explicit deferral.

**Step 5 — Write to stack.md and exit**
Follow the Writing to stack.md rules at the bottom of this file.

---

## Entry Point — Targeted Mode

Triggered when: a capability gap is detected during intake for
a specific brief — the work requires a technology that has no
decision in stack.md.

Do not restart the conversation. Pick up naturally:

```
Before I write this brief I want to flag something.

This request requires [capability] but we don't have a
decision for that in our stack yet. I need to resolve it
before drafting the brief — otherwise agents won't have
what they need to build it.

This will only take a few minutes. Want to work through
it now, or defer and mark it as an open question in the brief?
```

If operator confirms → run the relevant section only from the
Section-by-Section flow below, scoped to the missing capability.
Resume the original brief on exit.

If operator defers → mark the gap as an Open Question in the
brief with a clear note. Flag it so the Orchestrator catches
it at routing time.

---

The operator wants a recommendation. Work through every section of stack.md
using the Section-by-Section Flow below. Do not skip sections — mark them
Not Applicable if they don't apply.

---

## Section-by-Section Flow

Work through stack.md one section at a time in the order below.
For each section, ask the framing question first. Based on the
answer, either work through the decisions or mark the section
as Not Applicable.

Do not present all sections at once — work through them
conversationally, one at a time.

---

### Section 1 — Mobile Frontend

**Framing question:**
```
Does this project need a mobile app — iOS, Android, or both?
```

| Answer | Action |
|---|---|
| Yes | Work through all Mobile decisions below |
| No | Mark entire section 🚫 Not Applicable |
| Not yet | Mark entire section ❓ Undecided — note: deferred |

**Decisions to resolve if section applies:**

| Decision | Question to ask operator | Internal mapping |
|---|---|---|
| Framework | Already decided as React Native (Expo) — confirm only | ✅ React Native (Expo) |
| Language | Already decided as TypeScript — confirm only | ✅ TypeScript |
| Navigation | Already decided as Expo Router — confirm only | ✅ Expo Router |
| Styling | Already decided as NativeWind — confirm only | ✅ NativeWind + StyleSheet |
| Push notifications | Already decided as Expo Notifications — confirm only | ✅ Expo Notifications |
| OTA updates | Already decided as Expo Updates — confirm only | ✅ Expo Updates |
| State management | "Do you have a preference for managing shared data across screens, or shall I recommend based on your project?" | Derive from answer — see recommendation table |
| Auth | "Will users need accounts — sign in, sign out, saved profiles?" | Derive from answer — see recommendation table |

For pre-decided entries — confirm with the operator in a single
grouped question rather than asking about each individually:

```
For mobile, these are already decided:
  Framework: React Native (Expo)
  Language: TypeScript
  Navigation: Expo Router
  Styling: NativeWind

Does that all look right?
```

Then ask only about state management and auth individually.

---

### Section 2 — Web Frontend

**Framing question:**
```
Does this project need a web app — something that runs in a browser?
```

| Answer | Action |
|---|---|
| Yes | Work through all Web decisions below |
| No | Mark entire section 🚫 Not Applicable |
| Not yet | Mark entire section ❓ Undecided — note: deferred |

**Decisions to resolve if section applies:**

| Decision | Question to ask operator | Internal mapping |
|---|---|---|
| Framework | "Do you have a web framework in mind, or shall I recommend one?" | Derive from answer — see recommendation table |
| Language | Always TypeScript unless operator specifies otherwise | ✅ TypeScript |
| Styling | "Any preference for how the web app is styled?" | Derive from answer |
| State management | "Same question as mobile — shared data across pages?" | Derive from answer |
| Auth | "Same auth system as mobile, or separate?" | Derive — shared preferred |

---

### Section 3 — Backend

**Framing question:**
```
Does this project need a backend — a server that handles data,
logic, or user accounts?
```

| Answer | Action |
|---|---|
| Yes | Work through all Backend decisions below |
| No — frontend only | Mark entire section 🚫 Not Applicable |
| Using a managed service (e.g. Supabase) | Mark framework/database as managed — note the service |
| Not yet | Mark entire section ❓ Undecided — note: deferred |

**Decisions to resolve if section applies:**

| Decision | Question to ask operator | Internal mapping |
|---|---|---|
| Language | Already decided as Python — confirm only | ✅ Python |
| Framework | "Do you have a backend framework in mind, or shall I recommend one?" | Derive from answer |
| Database | "What kind of data does the app store — and roughly how much?" | Derive from answer |
| API style | "Will the mobile/web app talk to the backend via a standard API?" | Derive — REST default |
| Auth provider | "Where do user accounts and sign-in live — in your backend or a separate service?" | Derive from answer |
| File storage | "Does the app need to store files — images, documents, uploads?" | Derive from answer |
| Cloud provider | "Where will the backend be hosted?" | Derive from answer |

---

### Section 4 — DevOps and Tooling

**Framing question:**
```
A few infrastructure questions — these affect how the app
gets built, tested, and deployed automatically.
```

Do not ask a yes/no framing question for this section —
work through each decision individually as they are independent.

| Decision | Question to ask operator | Internal mapping |
|---|---|---|
| Version control | Already decided as GitHub — confirm only | ✅ GitHub |
| App distribution | Already decided as Expo EAS — confirm only | ✅ Expo EAS |
| CI/CD | "Do you want automated testing and deployment pipelines set up from the start?" | Yes → GitHub Actions. No → mark ❓ Undecided |
| Monitoring | "Do you want to track errors and performance in production?" | Derive from answer |
| Error tracking | "Same — automatic error reporting when something breaks in production?" | Derive from answer |

---

### Section 5 — Agent Framework

This section is always fully decided — it reflects the framework
itself. Confirm only, do not ask questions:

```
Agent framework decisions are set by the framework itself:
  Runtime: Claude Code (CLI)
  Repo: [operator's repo name]
  Brief storage: briefs/ folder in Git
  Memory: Briefs + reports + briefs/journal.md

These don't need any input from you.
```

Mark all entries ✅ Decided and move on.

---

## Recommendation Tables

Use these internally to derive recommendations from operator answers.
Never show the table to the operator — present the conclusion only.

### State Management

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Simple, few screens, no shared data | React useState / useReducer | Built in — no extra library needed |
| Growing app, shared data across screens | Zustand | Lightweight, simple, good default |
| Complex app, many data sources | Zustand or TanStack Query | Depends on whether data is local or server-fetched |

### Auth

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| No user accounts needed | No auth required | Nothing to protect — skip it |
| Accounts needed, using Supabase | Supabase Auth | Built in — no extra setup |
| Accounts needed, custom backend | JWT sessions | Standard, flexible, no third-party dependency |
| Accounts needed, want managed solution | Auth0 or Clerk | Handles complexity — costs money at scale |

### Backend Framework

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Simple API, quick to start | FastAPI | Lightweight Python, fast to build, well documented |
| Complex logic, enterprise scale | FastAPI + SQLAlchemy | More structure, better for large teams |
| Want fully managed, no server | Supabase | Database + auth + storage + API in one — no backend code needed |

### Database

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Structured data, relations between records | PostgreSQL | The standard — reliable, scalable, well supported |
| Using Supabase | Supabase (PostgreSQL) | Included — no separate setup |
| Simple key-value or document data | PostgreSQL still fine | Avoid premature complexity |

### Web Framework

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Full web app, SEO matters | Next.js | Industry standard, handles both static and dynamic pages |
| Simple single-page app, no SEO needed | Vite + React | Lighter, faster to set up |
| Already using Expo | React Native Web via Expo | Share code between mobile and web |

### Cloud / Hosting

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Free tier, getting started | Vercel (frontend) + Supabase (backend) | Both free tiers are generous |
| Small budget, will grow | Vercel + Railway | Affordable, easy to scale |
| Need full control | AWS or GCP | Most flexible, more setup required |

### CI/CD

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Early stage, solo project | Defer — deploy manually for now | Overkill until the project stabilises |
| Growing team or product | GitHub Actions | Already on GitHub, free tier sufficient |

### Monitoring and Error Tracking

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Early stage | Defer — add before first production release | Not needed in development |
| Ready for production | Sentry | Industry standard, generous free tier |

---

## Handling Partial or Contradictory Answers

**Operator skips a decision:**
Never leave it blank. Ask directly:

```
Do you want to decide [decision] now, or explicitly defer it?
Deferring is fine — I'll mark it clearly so agents know
to escalate if they need it.
```

Mark deferred decisions as ❓ Undecided with a note:
`❓ Undecided — explicitly deferred by operator on [date]`

**Contradictory answers:**
Surface the conflict before presenting recommendations:

```
I want to flag a tension before I recommend anything.

You mentioned [constraint A] but also [constraint B] —
these pull in different directions. Which matters more right now?

a) [Constraint A] — I'll optimise for this
b) [Constraint B] — I'll optimise for this
c) Find the best middle ground — I'll explain the tradeoff
```

Wait for the operator's answer before proceeding.

**Technology the skill cannot map to a stack.md entry:**
Do not guess. Surface it to the operator immediately:

```
I'm not familiar enough with [technology] to recommend
confidently whether it fits here.

To keep moving — do you want to:
a) Mark this as decided with [technology] and we'll validate it
   when agents start working with it
b) Create a SPIKE brief to evaluate [technology] properly first
c) Choose a different approach I can recommend with confidence
```

Wait for the operator's choice. Never proceed with an unknown
technology without explicit operator confirmation.

---

## Agent Gap Escalation

When any agent — not just the Intake Agent — cannot identify
the appropriate technology for a task during their work,
they must follow this escalation path immediately:

**The agent stops work on the blocked part and surfaces this:**

```
⚠️  Stack gap identified — operator input required.

Task:       [TASK-ID] — [short title]
Agent:      [agent name]
Gap:        [What technology decision is missing]
Impact:     [What cannot proceed without this decision]
Continuing: [What can still proceed, or "Nothing — fully blocked"]

Options:
a) Decide now — [plain language description of the decision needed]
b) Create a SPIKE brief to research options first
c) Defer — I'll mark it as an open question and flag it in my report

Awaiting your instruction before continuing.
```

This escalation goes directly to the operator — not through
the lead or orchestrator chain. Stack decisions are operator
decisions, not agent decisions.

After the operator responds:
- If decided → agent records the decision, updates stack.md, continues
- If SPIKE → agent pauses work, Orchestrator creates SPIKE brief
- If deferred → agent notes it as an open question and continues
  where possible, flagging the gap clearly in their report

---

## Writing to stack.md

Once all sections are confirmed, update `shared/stack.md`:

1. Every entry must have one of three states — no exceptions:
   - ✅ Decided — with the chosen value
   - ❓ Undecided — with a note explaining why it was deferred
   - 🚫 Not Applicable — with a note explaining why it doesn't apply

2. Never leave an entry blank or in its default template state

3. Record every decision made in this session in the Decisions Log
   with today's date, the choice made, and a one-line rationale

4. Never overwrite ✅ Decided or 🔄 In Review entries

5. Add new sections if a new capability was defined

Confirm to the operator before exiting:

```
Stack locked in. Here's a summary:

✅ Decided:       [N] entries
❓ Undecided:     [N] entries — explicitly deferred
🚫 Not applicable: [N] entries

[List only the decisions made in this session — not the full stack]

shared/stack.md has been updated. Agents now have a complete
picture of the stack — including what's been deferred and why.
```

---

## Exiting the Skill

After writing to `stack.md`, return control to the caller immediately.
Do not ask for permission to proceed.

**Root CLAUDE.md exit:** Present the agent list.

**Intake Agent exit (Full Mode):** Resume the standard Intake
first message, then proceed with normal intake.

**Intake Agent exit (Targeted Mode):** Resume the operator's
original request at the point where the gap was detected.
The operator does not need to repeat themselves.

The transition must feel seamless — one continuous conversation,
not a mode switch.

---

## What This Skill Never Does

- Never leaves a stack.md entry blank or in its default state
- Never surfaces framework names or technical terms without
  a plain language explanation
- Never asks the operator to choose between specific technologies
  by name — present conclusions, not options
- Never makes stack decisions without operator confirmation
- Never overwrites ✅ Decided or 🔄 In Review entries
- Never guesses at an unknown technology — always escalates to operator
- Never skips a section without explicitly marking it as
  Not Applicable or Undecided with a reason
- Never delays returning control to the caller after stack.md is written
