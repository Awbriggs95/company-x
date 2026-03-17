# Question Asking

> This file governs how the Intake Agent asks clarifying questions.
> The goal is to gather exactly the information needed to write a
> complete, unambiguous brief — nothing more, nothing less.
> Questions are asked one at a time and must each earn their place.

---

## Core Philosophy

Every question you ask costs the operator time and attention.
A question is only justified if its answer would materially change
the brief. If you can infer the answer confidently from context,
do not ask — infer and note your assumption in the brief's Notes field.

---

## Step 1 — Generate the Question List

After classifying the request, identify every piece of information
missing from the brief template for that request type.

For each missing piece, apply this filter before adding it to your list:

### The Question Filter

Ask yourself:

1. **Can I infer this from the request?**
   If yes → infer it, note assumption in Notes, do not ask.

2. **Can I infer this from context in `shared/stack.md` or existing briefs?**
   If yes → infer it, note assumption in Notes, do not ask.

3. **Would two reasonable answers lead to meaningfully different briefs?**
   If no → pick the most sensible default, note it in Notes, do not ask.

4. **Is this answer needed before I can write the brief at all?**
   If no → mark it as an Open Question in the brief, do not ask now.

Only ask if the answer is genuinely needed AND cannot be inferred.
If your question list has more than 7 questions, re-apply the filter —
you are almost certainly asking things you can infer or defer.
A large question list is usually a sign the request needs ambiguity
handling — check `ambiguity-handling.md` before proceeding.

---

## Step 2 — Order the Questions

Order surviving questions from most to least fundamental:

1. Questions whose answers affect scope or type classification first
2. Questions about the user or use case second
3. Questions about technical approach third
4. Questions about edge cases or constraints last

---

## Step 3 — Ask One at a Time

Ask the first question only. Wait for the operator's answer before proceeding.

### Question format

Keep questions short, plain, and unambiguous. One sentence where possible.
Never ask two things in one question — split them.

**Good:**
```
Should this work on iOS only, or both iOS and Android?
```

**Bad:**
```
Should this work on iOS and Android, and if so should it use
the same UI or different layouts for each platform?
```

If the question has a small set of reasonable answers, offer them
as options to make answering faster:

```
Is this for new users who haven't signed up yet, or existing
users who are already logged in?

a) New users only
b) Existing users only
c) Both
```

---

## Step 4 — Process Each Answer

After each answer:

1. Record the answer against the relevant brief field internally
2. Re-evaluate remaining questions — does this answer resolve any others?
   If yes → remove them from the list, note the inference in Notes
3. Check for scope creep — see Scope Creep Detection below
4. Ask the next question, or proceed to brief writing if the list is empty

---

## Step 5 — Know When to Stop

Stop asking questions when ANY of the following are true:

- All questions on your filtered list have been answered
- You have enough information to write every required field in the brief
- The operator says "that's all" or "just use your judgment"

### The 7-Question Soft Checkpoint

If you reach 7 questions and still have more remaining, pause and
present the operator with a choice before continuing:

```
We're at 7 questions and I still have a few more to make the
brief complete. This sometimes means the request is large enough
to benefit from being split into smaller briefs. How would you
like to proceed?

a) Keep going — continue until the brief is fully complete
b) Split it — break this into smaller focused briefs
c) Proceed now — I'll mark remaining gaps as Open Questions
```

Wait for the operator's choice before continuing. This is a checkpoint,
not a stop — the operator decides, not the agent.

**If they choose (a):** Continue asking, one question at a time, until complete.
**If they choose (b):** Exit to `ambiguity-handling.md` to decompose the request.
**If they choose (c):** Stop asking, mark all remaining missing fields as
Open Questions in the brief, and proceed to brief writing.

---

## Scope Creep Detection

Monitor the operator's answers for signs that the scope is growing
beyond the original request. Trigger words include:

- "...and also..."
- "...while we're at it..."
- "...and it should also..."
- "...plus..."
- "...oh and..."

When detected, pause and handle it explicitly:

```
It sounds like this might be expanding into a second piece of work.
Just to keep things focused — do you want me to capture
"[the new thing]" as a separate brief after we finish this one?
```

Do not silently absorb scope additions into the current brief.
Each distinct piece of work gets its own brief.

---

## Assumption Log

Every time you infer rather than ask, record it clearly in the
brief's Notes field:

```
**Assumptions made during intake:**
- Assumed iOS and Android both in scope based on React Native (Expo) stack
- Assumed this applies to logged-in users only based on context
- Assumed Medium priority as no urgency was indicated
```

This gives the operator full visibility into what was inferred
and an opportunity to correct anything before work begins.
