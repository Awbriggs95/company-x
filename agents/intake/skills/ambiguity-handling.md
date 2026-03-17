# Ambiguity Handling

> This skill activates when a request cannot be confidently processed
> by the standard intake flow. It governs how the Intake Agent explores,
> clarifies, and resolves ambiguity before proceeding to classification
> and brief writing.
>
> This skill is designed to be extractable into a standalone Scoping Agent
> in the future. Keep its logic self-contained.

---

## When to Activate This Skill

Activate ambiguity handling mode if ANY of the following are true:

| Trigger | Example |
|---|---|
| Request type cannot be confidently classified | "Sort out the auth stuff" |
| Request is too large and likely needs decomposing | "Build the entire onboarding flow" |
| Request contains conflicting or contradictory goals | "Make it faster but also add more features to the screen" |
| Request references something that doesn't exist yet | "Update the payments module" — no payments module exists |
| Vague improvement language is used | "Improve it", "clean it up", "make it better", "polish this" |
| Request touches multiple unrelated product areas | "Fix the login, update the profile screen, and sort the notifications" |

If none of these triggers are present — proceed directly to `scope-detection.md`.
Do not enter ambiguity mode unnecessarily. It adds steps and the operator's
time is valuable.

---

## Two-Phase Approach

Ambiguity handling runs in two phases:

```
Phase 1 — Conversational Exploration
    Understand what the operator actually wants through natural dialogue

Phase 2 — Structured Confirmation
    Present your understanding back in structured form for operator sign-off

→ Exit to scope-detection.md once confirmed
```

---

## Phase 1 — Conversational Exploration

### Goal
Build a clear enough picture of the request to be able to articulate it
back to the operator in structured form. You are not writing a brief yet —
you are understanding the idea.

### How to open

Be transparent that you are entering a scoping conversation.
Do not just start asking questions without context:

```
Before I start putting together a brief, I want to make sure
I fully understand what you're after. Can I ask you a few
questions to get the full picture?
```

### How to converse

- Ask one question at a time — the same rule as question-asking.md applies here
- Start broad, then narrow — understand the goal before the detail
- Listen for the trigger that caused ambiguity and address it directly
- Never interrogate — keep the tone curious and collaborative
- Reflect back what you hear to confirm understanding:
  ```
  So if I'm understanding correctly, the main thing you want
  is [X], and [Y] is secondary — is that right?
  ```

### Trigger-specific opening questions

Use these as starting points based on what triggered ambiguity mode:

**Vague language ("improve", "clean up", "make it better")**
```
When you say "[vague word]" — what would that look like
if it was done really well? What's the main thing that
feels off right now?
```

**Too large / needs decomposing**
```
This sounds like it covers a lot of ground. What's the
most important part to get right first?
```

**Conflicting goals**
```
I want to make sure I get the priorities right here.
Between [goal A] and [goal B] — if you had to pick
one to nail first, which would it be?
```

**References something that doesn't exist**
```
I don't have a [referenced thing] in my context yet.
Can you tell me a bit about what it is or what you
have in mind for it?
```

**Cannot classify type**
```
Help me understand the end state — after this work
is done, what will be different from today?
```

**Multiple unrelated areas**
```
I can see a few different areas here. Are these all
connected — like one change needs the others — or
are they independent pieces that just came to mind
at the same time?
```

### What to extract during Phase 1

By the end of the conversation you should be able to answer:

- [ ] What is the operator actually trying to achieve?
- [ ] What does success look like?
- [ ] What is the priority if not everything can be done at once?
- [ ] Does this need to be split into multiple briefs?
- [ ] Are there any hard constraints or things that must not change?
- [ ] Is there anything referenced that does not exist yet and needs its own brief first?

Do not exit Phase 1 until you can answer all six confidently.

---

## Phase 2 — Structured Confirmation

### Goal
Present your understanding back to the operator in a clear, structured
summary. Give them a chance to correct anything before you proceed
to brief writing.

### Format

```
Here's what I'm taking away from our conversation:

**What we're doing**
[1-2 sentence plain language summary of the goal]

**Why**
[The problem it solves or opportunity it captures]

**Scope**
- [Key item 1]
- [Key item 2]
- [Key item 3]

**Not doing (yet)**
- [Explicitly excluded item 1]
- [Explicitly excluded item 2]

**Number of briefs**
[Single brief | N briefs — list them]

**Suggested priority**
[Critical | High | Medium | Low | Backlog] — [one sentence rationale]

Does this capture it correctly, or is there anything
you'd like to adjust?
```

### Handling corrections

If the operator corrects something:
- Acknowledge the correction specifically
- Update your internal understanding
- Re-present only the corrected section, not the full summary again:
  ```
  Got it — so [corrected understanding]. Updated.
  Anything else, or shall I proceed?
  ```

---

## Exiting Ambiguity Mode

Exit ambiguity mode and proceed to `scope-detection.md` automatically
when ALL of the following are true:

- [ ] The operator has confirmed the Phase 2 structured summary
- [ ] Every item in the Phase 1 extraction checklist is answered
- [ ] The number of briefs to create is clear
- [ ] No unresolved contradictions remain

When exiting, notify the operator:

```
Great — I have everything I need. Starting the brief now.
```

If multiple briefs are needed, state the order:

```
Great — I have everything I need. I'll create [N] briefs.
Starting with [brief 1 description] first.
```

Then proceed directly to `scope-detection.md` with the clarified request.
Do not ask for permission to proceed — the confirmation in Phase 2 is sufficient.

---

## What Not to Do in Ambiguity Mode

- **Do not write the brief during Phase 1** — explore first, structure second
- **Do not assume the request is clear after one answer** — verify with Phase 2
- **Do not stay in ambiguity mode longer than needed** — exit as soon as criteria are met
- **Do not re-enter ambiguity mode** once you have exited for a given request
- **Do not surface this skill's mechanics to the operator** — they experience
  a natural conversation, not a process with named phases
