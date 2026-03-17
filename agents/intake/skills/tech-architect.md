# Skill — Tech Architect

> Owner: intake-agent | Version: 1.0.0
> Loaded by the Intake Agent when stack decisions are missing.
> Translates product-level operator input into technical stack decisions
> and writes them to shared/stack.md before returning control to normal
> intake flow.
>
> This skill has two modes:
> - Full mode: 5 or more ❓ Undecided entries — covers the entire stack
> - Targeted mode: capability gap detected — covers one missing section only
>
> Never surface technical jargon to the operator. Ask product questions,
> derive technical answers internally, present conclusions in plain language.

---

## Core Principle

The operator knows what they want to build. They do not need to know
what FastAPI, Supabase, or Zustand are to make the right decisions.
Your job is to translate their product intent into stack choices,
present the conclusions in plain language, and get confirmation.

Questions go in. Decisions come out. The operator never sees the mapping.

---

## Entry Point — Full Mode

Triggered when: 5 or more ❓ Undecided entries in `shared/stack.md`.

Do not use the standard Intake first message. Use this instead:

```
Company-X Intake Agent ready.

Before we start building, I need to understand a bit about what
you're making — it'll take a few minutes and means agents will
have everything they need to work without stopping to ask you
technical questions later.

First — do you already have a tech stack in mind, or would you
like me to recommend one based on what you're building?
```

Wait for response. Route to Entry Point B (technical) or
Entry Point A (guided) based on the answer.

---

## Entry Point — Targeted Mode

Triggered when: capability gap detected during intake for a specific request.

Do not restart the conversation. Pick up naturally:

```
Before I write this brief I want to flag something.

Your request requires [capability] but our current stack doesn't
have a decision for this yet. We should define it before I draft
the brief — otherwise agents won't have what they need to build it.

Want me to run through the stack decisions for [capability] now?
This will only take a few minutes and I'll pick up your request
right after.
```

If confirmed — run Entry Point A or B scoped to the missing capability only.
If declined — note the gap as an Open Question in the brief and exit.

---

## Entry Point A — Guided (Non-Technical Operator)

The operator does not have a stack in mind. Run the five product
questions in order. Ask one at a time. Wait for each answer before
proceeding. Do not explain why you are asking — keep it conversational.

---

### Question 1 — Framing

```
In one sentence — what does this do and who uses it?
```

This anchors every subsequent question. A personal tool has different
requirements than a product used by thousands. Record the answer and
use it to weight the questions that follow.

**Internal classification from answer:**
- Personal / internal tool → low scale, simple hosting, minimal auth
- Small team product → medium scale, managed services preferred
- Consumer product → higher scale, auth required, reliability critical
- Enterprise / B2B → compliance considerations, auth required, scalability

---

### Question 2 — Memory

```
Does it need to remember anything — user accounts, saved data,
history — or does it start fresh every time someone uses it?
```

**Internal mapping:**

| Answer | Derives |
|---|---|
| No — fresh every time | No database needed, no auth needed, frontend-only viable |
| Yes — per user | Database required, auth required |
| Yes — shared between users | Database required, auth required, real-time consideration |
| Yes — just settings/preferences | Local storage viable, database optional |

---

### Question 3 — Platform

```
Where does it need to work — in a browser, on a phone,
or both?
```

**Internal mapping:**

| Answer | Derives |
|---|---|
| Browser only | Web frontend stack needed, mobile not needed |
| Phone only | Mobile stack (already decided: React Native / Expo) |
| Both | Both stacks needed — web section added to stack.md |

---

### Question 4 — Growth

```
Is this a one-feature tool that stays simple, or do you
expect to keep adding to it over time?
```

**Internal mapping:**

| Answer | Derives |
|---|---|
| One feature, stays simple | Managed services preferred, minimal infrastructure |
| Will grow into a product | Structured stack, scalable services, CI/CD worth setting up early |
| Not sure yet | Default to managed services — easier to migrate up than down |

---

### Question 5 — Cost

```
Do you need this to run for free, or is there a budget
for hosting and services?
```

**Internal mapping:**

| Answer | Derives |
|---|---|
| Must be free | Vercel / Railway free tier, Supabase free tier, no paid services |
| Small budget (< $50/month) | Managed services on starter plans |
| Budget flexible | Best-fit services regardless of cost |

---

### Deriving Stack Recommendations

After all five answers are collected, map them to stack decisions
using the table below. Select the recommendation that best fits
the combination of answers — prioritise simplicity for personal/small
tools, scalability for consumer/enterprise products.

**Web Frontend:**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Browser needed, simple, free or small budget | Next.js + Vercel | Fast to set up, free hosting tier, good default for most web projects |
| Browser needed, will grow, budget flexible | Next.js + Vercel | Industry standard, scales well, large ecosystem |
| Browser needed, one feature, no backend | Vite + React | Lighter than Next.js, no server needed, simpler to deploy |

**Backend:**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| No memory needed | No backend required | All logic runs in the browser — no server to manage |
| Memory needed, simple, free tier | Supabase | Managed database + auth + storage in one, generous free tier |
| Memory needed, will grow, budget flexible | FastAPI + PostgreSQL | More control, better for complex logic, scales well |

**Auth:**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| No user accounts | No auth required | Nothing to protect — skip it |
| Accounts needed, using Supabase | Supabase Auth | Built in — no extra setup |
| Accounts needed, custom backend | Auth0 or custom JWT | Depends on complexity and budget |

**Cloud / Hosting:**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Free tier, simple | Vercel (frontend) + Supabase (backend) | Both have generous free tiers, minimal setup |
| Small budget, will grow | Vercel + Railway or Render | Affordable managed hosting, easy to scale |
| Budget flexible, full control | AWS or GCP | Most flexible, higher setup cost |

**State Management (Web):**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Simple, one feature | React useState / useReducer | Built in — no library needed for simple apps |
| Will grow, shared state across screens | Zustand | Lightweight, simple API, good default for most projects |

**CI/CD:**

| Conditions | Recommendation | Plain language rationale |
|---|---|---|
| Simple, personal | None yet — deploy manually | Overkill for early stage |
| Will grow into product | GitHub Actions | Already using GitHub, free tier sufficient |

---

### Presenting Recommendations — Entry Point A

Once all five answers are collected and recommendations are derived,
present them to the operator in plain language. Never use technical
terms without a one-sentence explanation.

```
Based on what you've told me, here's what I'd recommend:

[Category]: [Choice] — [Plain language rationale]
[Category]: [Choice] — [Plain language rationale]
[Category]: [Choice] — [Plain language rationale]

This means [one sentence summary of what the stack means in
practice for the operator — e.g. "everything runs in the browser,
no server to manage, free to host"].

Does this sound right, or is there anything you'd like to change?
```

Only present decisions relevant to the project. Do not list every
possible stack entry — only those the project actually needs.

---

## Entry Point B — Direct (Technical Operator)

The operator has a stack in mind. Present `shared/stack.md` as a
checklist of open decisions. Let them fill it in directly.

```
Here are the decisions we need before we can build.
Tell me your choices and I'll lock them in.

Frontend: [Undecided]
Backend framework: [Undecided]
Database: [Undecided]
Auth: [Undecided]
Hosting: [Undecided]
CI/CD: [Undecided — or skip for now]

You can give me all of these at once or go through them one
by one — whichever is easier.
```

Only list decisions relevant to what the operator is building.
Do not list mobile decisions if they are building a web app only.

Accept answers in any format — a list, a sentence, a named stack
("I want to use the MERN stack", "Just use Supabase for everything").
Parse the answer and map to the correct `stack.md` entries internally.

If the operator names a stack or service you cannot map to a
`stack.md` entry, ask for clarification on that specific item only.

---

## Handling Partial or Contradictory Answers

**Partial answers (operator skips a decision):**
Mark skipped decisions as ❓ Undecided in `stack.md` and note them
in the confirmation. Do not push the operator to decide everything —
deferred decisions are valid.

**Contradictory answers (e.g. "must be free" + "needs to scale to millions"):**
Surface the conflict plainly before presenting recommendations:

```
I want to flag a tension before I recommend anything.

You mentioned [constraint A] but also [constraint B] —
these pull in different directions. To move forward,
which matters more right now?

a) [Constraint A] — I'll optimise for this
b) [Constraint B] — I'll optimise for this
c) Find the best middle ground — I'll explain the tradeoff
```

Wait for the operator's answer before deriving recommendations.

---

## Confirmation and Partial Updates

After presenting recommendations (Entry Point A) or receiving
direct choices (Entry Point B), ask for confirmation:

```
Does this capture everything correctly, or would you like
to adjust anything before I lock it in?
```

If the operator confirms everything → write to `stack.md` and exit.

If the operator changes one item → acknowledge the specific change,
update your internal picture, re-present only the changed item:

```
Got it — [changed decision] updated to [new choice].
[Updated rationale if needed.]

Anything else, or shall I lock this in?
```

Do not re-present the full list after a single change.

---

## Writing to stack.md

Once confirmed, update `shared/stack.md`:

1. Change ❓ Undecided entries to ✅ Decided with the chosen value
2. Add new sections if a new capability was defined (e.g. Web Frontend)
3. Record each decision in the Decisions Log with today's date
4. Leave 🔄 In Review entries untouched — a SPIKE is handling those
5. Leave ❓ Undecided entries for decisions the operator deferred

Confirm to the operator before exiting:

```
Stack locked in. Here's what we decided:

[Decision]: [Choice]
[Decision]: [Choice]

shared/stack.md has been updated. Agents now have what they
need to work without stopping for stack questions.
```

---

## Exiting the Skill

After writing to `stack.md`, return control to the Intake Agent's
normal flow immediately. Do not ask for permission to proceed.

**Full mode exit:** Resume the standard Intake first message,
then proceed with normal intake.

**Targeted mode exit:** Resume the operator's original request
at the point where the gap was detected. The operator does not
need to repeat themselves.

In both cases, the transition should feel seamless — the operator
experiences one continuous conversation, not a mode switch.

---

## What This Skill Never Does

- Never surfaces framework names, service names, or technical terms
  without a plain language explanation
- Never asks the operator to choose between specific technologies
  (e.g. "FastAPI vs Django?") — present conclusions, not options
- Never makes stack decisions without operator confirmation
- Never overwrites ✅ Decided or 🔄 In Review entries in stack.md
- Never runs in a session where the stack is already fully decided
- Never delays returning control to normal intake after stack.md is written
