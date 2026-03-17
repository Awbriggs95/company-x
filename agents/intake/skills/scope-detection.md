# Scope Detection

> This is your first action on every request — before asking any questions,
> before writing any brief. Classify the request accurately. Everything
> downstream depends on getting this right.

---

## Step 1 — Read the Full Request

Read the operator's entire message before making any classification decision.
Do not classify from the first sentence alone. Context in later sentences
frequently changes the correct classification.

---

## Step 2 — Classify the Request

Match the request against the six types below. Use signal words and definitions
to identify the correct type.

---

### Type 1: New Feature
**Definition:** Adding functionality that does not currently exist in the product.

**Signal words and phrases:**
- "I want users to be able to..."
- "Add a..."
- "Build a..."
- "Create a..."
- "New screen / page / flow / section"
- "Integrate with..."
- "I'd like the app to..."

**Key test:** Would a user notice this as something new they can now do?
If yes → New Feature.

**TASK ID prefix:** `FEAT`

---

### Type 2: Bug Fix
**Definition:** Correcting behaviour that is broken, incorrect, or different from what was intended.

**Signal words and phrases:**
- "It's not working..."
- "This is broken..."
- "Users are seeing an error..."
- "This crashes when..."
- "It should do X but it does Y..."
- "Fix..."
- "Something is wrong with..."

**Key test:** Is there an expected behaviour that is currently not happening?
If yes → Bug Fix.

**TASK ID prefix:** `BUG`

---

### Type 3: Refactor
**Definition:** Improving the internal structure, quality, or maintainability of existing code
without changing its external behaviour.

**Signal words and phrases:**
- "Clean up..."
- "Reorganise..."
- "This is messy..."
- "Simplify..."
- "The code is getting hard to read..."
- "Extract this into..."
- "Separate concerns..."
- "Technical debt..."

**Key test:** Will a user notice any difference after this work?
If no → Refactor.

**TASK ID prefix:** `RFCT`

---

### Type 4: Config / Environment Change
**Definition:** Changing configuration, environment variables, feature flags,
or settings without modifying application logic.

**Signal words and phrases:**
- "Update the config..."
- "Change the environment variable..."
- "Switch from X to Y setting..."
- "Enable / disable the feature flag..."
- "Update the API key..."
- "Change the timeout / limit / threshold..."

**Key test:** Is the change purely to a value, setting, or configuration
rather than to code logic?
If yes → Config Change.

**TASK ID prefix:** `CFG`

---

### Type 5: Infrastructure / DevOps Task
**Definition:** Work on deployment, CI/CD pipelines, cloud infrastructure,
monitoring, scaling, or developer tooling.

**Signal words and phrases:**
- "Set up the pipeline..."
- "Deploy..."
- "Configure the server..."
- "Set up monitoring..."
- "Add alerts..."
- "Automate the build..."
- "Set up the cloud..."
- "Infrastructure..."
- "DevOps..."

**Key test:** Is this work invisible to end users but essential to how
the system runs or is delivered?
If yes → Infrastructure / DevOps Task.

**TASK ID prefix:** `INFRA`

---

### Type 6: Research Spike
**Definition:** Time-boxed investigation to answer a specific question or
evaluate options before a decision can be made. Produces a recommendation,
not working code.

**Signal words and phrases:**
- "Which should we use..."
- "What's the best way to..."
- "Evaluate..."
- "Compare..."
- "I'm not sure how to approach..."
- "Research..."
- "What are our options for..."
- "Should we use X or Y..."

**Key test:** Is the primary output a decision or recommendation
rather than working software?
If yes → Research Spike.

**TASK ID prefix:** `SPIKE`

---

## Step 3 — Handle Multi-Type Requests

If the request clearly contains work that maps to two or more types:

1. **Identify the split point** — find the natural boundary between the two types
2. **Notify the operator immediately:**

```
I can see this request covers two separate types of work:
1. [Type A] — [brief description of that part]
2. [Type B] — [brief description of that part]

I will create two separate briefs to keep each focused and trackable.
Let me start with [Type A]. I'll move to [Type B] immediately after.
```

3. **Complete the first brief fully** — all questions, validation, and operator confirmation
4. **Then begin the second brief** — repeat the full process

**Never combine two types into one brief.** One brief, one type, always.

---

## Step 4 — Handle Ambiguous Requests

If you cannot confidently classify the request after reading it:

1. State the two most likely types
2. Ask one targeted question to resolve it:

```
I want to make sure I classify this correctly before we start.
This could be either a [Type A] or a [Type B].

Quick question: is the current behaviour broken / incorrect,
or does this new behaviour not exist yet?
```

Never guess the type and proceed. An incorrect classification produces
the wrong brief template and wastes everyone's time.

---

## Step 5 — Record the Classification

Once classified, record the following internally before moving to question-asking:

```
Request type:     [Type]
TASK ID prefix:   [PREFIX]
Brief template:   agents/intake/skills/brief-writing/[template-file].md
Classification confidence: [High | Medium — resolved by question]
Multi-type split: [Yes — N briefs | No]
```

This record informs every subsequent step. Do not proceed to question-asking
until classification is confirmed.
