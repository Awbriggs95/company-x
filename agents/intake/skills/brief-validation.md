# Brief Validation

> This skill runs automatically after every brief is drafted and before
> it is presented to the operator. It is a quality gate, not a blocker —
> issues are surfaced as warnings alongside the brief, never silently
> ignored and never used to withhold the brief from the operator.
>
> The operator always sees the brief. Validation ensures they see it
> with full awareness of any issues.

---

## When This Skill Runs

Run this validation after:
- Every brief is drafted during standard intake
- Every brief is drafted during ambiguity handling
- A brief is updated in response to operator corrections

Do not run validation on briefs that have already been operator-confirmed
and moved to briefs/active/ or briefs/completed/ — those are final.

---

## Validation Behaviour

**All issues are warnings — nothing blocks the brief from being shown.**

After running all checks, present the brief to the operator with one of
two outcomes:

**No issues found:**
```
Brief looks good — no issues found.

[Brief content]

Does this look right, or would you like to adjust anything?
```

**Issues found:**
```
Brief is ready, but I flagged [N] issue(s) for your attention:

⚠️  [Issue 1 — see Warnings section at bottom of brief]
⚠️  [Issue 2 — see Warnings section at bottom of brief]

[Brief content]

---

## ⚠️ Validation Warnings

### Warning 1 — [Check name]
**Issue:** [What the problem is]
**Location:** [Which field or section]
**Suggested fix:** [What to change to resolve it]

### Warning 2 — [Check name]
**Issue:** [What the problem is]
**Location:** [Which field or section]
**Suggested fix:** [What to change to resolve it]

---

Does this look right, or would you like me to fix any of the warnings
before we proceed?
```

Warnings are appended to the bottom of the brief — they do not
interrupt the brief content itself.

---

## Validation Checks

Run every check below against the drafted brief. Record any failures
as warnings. A check passes silently — only failures are reported.

---

### Check 1 — Scope and Out of Scope Are Both Defined

**Passes if:**
- The Scope section contains at least one item
- The Out of Scope section contains at least one item

**Fails if:**
- Either section is empty, blank, or contains only "N/A" or "None"

**Warning message:**
```
### Warning — Scope Incomplete
**Issue:** [Scope / Out of Scope] section is empty.
**Location:** [Scope / Out of Scope] field
**Suggested fix:** Even a single-item scope or out of scope statement
protects against agent drift. Add at least one item to each section.
```

**Why this matters:**
Agents without scope boundaries will fill the gap with assumptions.
Agents without out of scope boundaries may do unrequested work.

---

### Check 2 — Dependencies Reference Valid TASK IDs

**Passes if:**
- The Dependencies section is explicitly "None"
- Or every dependency references a TASK ID in the correct format:
  `[TYPE]-[YYYY-MM-DD]-[SEQ]` (e.g. FEAT-2026-03-14-001)

**Fails if:**
- A dependency is described in plain text without a TASK ID
- A dependency references a TASK ID that does not exist in briefs/

**Warning message:**
```
### Warning — Dependency Reference Invalid
**Issue:** Dependency "[text]" does not reference a valid TASK ID,
or the referenced TASK ID does not exist in briefs/.
**Location:** Dependencies field
**Suggested fix:** Reference the dependency by its TASK ID, or create
a brief for the dependency before proceeding with this one.
```

**Why this matters:**
Agents cannot locate or verify a dependency without a TASK ID.
Plain text references are ambiguous and untrackable.

---

### Check 3 — Affected Teams Are Correctly Identified

**Passes if:**
- At least one team is checked in the Affected Teams section
- The checked teams are consistent with the work described in the brief

**Fails if:**
- No teams are checked
- The brief describes frontend work but Engineering — Frontend is not checked
- The brief describes backend work but Engineering — Backend is not checked
- The brief describes infrastructure work but DevOps is not checked
- The brief describes testing requirements but QA is not checked

**Warning message:**
```
### Warning — Affected Teams May Be Incomplete
**Issue:** The brief describes [type of work] but [team] is not
marked as affected.
**Location:** Affected Teams field
**Suggested fix:** Review the brief and confirm whether [team]
should be involved. If not, note why in the Notes field.
```

**Why this matters:**
Missing a team means their work is not planned for or sequenced.
The Orchestrator routes based on affected teams — omissions cause gaps.

---

### Check 4 — TASK ID Format Is Correct

**Passes if:**
The TASK ID matches the format exactly: `[TYPE]-[YYYY-MM-DD]-[SEQ]`

Where:
- TYPE is one of: FEAT, BUG, RFCT, CFG, INFRA, SPIKE
- YYYY-MM-DD is a valid date
- SEQ is a zero-padded 3-digit sequence number (e.g. 001, 002)
- TYPE matches the brief's declared request type

**Fails if:**
- The format does not match
- The TYPE prefix does not match the request type
- The date is invalid
- The sequence number is not zero-padded

**Warning message:**
```
### Warning — TASK ID Format Incorrect
**Issue:** TASK ID "[id]" does not match the required format
[TYPE]-[YYYY-MM-DD]-[SEQ], or the TYPE prefix does not match
the request type.
**Location:** Meta — ID field
**Suggested fix:** Correct the TASK ID to [suggested correct ID].
```

**Why this matters:**
Incorrect TASK IDs break file naming, branch naming, and cross-brief
references throughout the system.

---

### Check 5 — Priority Has a Rationale

**Passes if:**
The brief's suggested priority is accompanied by a one-sentence
rationale explaining why that priority was assigned.

**Fails if:**
- The priority field contains only the priority level with no rationale
- The rationale is vague (e.g. "seems important", "not urgent")

**Warning message:**
```
### Warning — Priority Rationale Missing or Vague
**Issue:** Priority is set to [level] but the rationale is
missing or does not explain the assignment clearly.
**Location:** Meta — Priority field, or type-specific severity field
**Suggested fix:** Add a one-sentence rationale. Example:
"High — core feature broken with no available workaround."
```

**Why this matters:**
Priority without rationale cannot be challenged or adjusted by the
operator. A clear rationale lets you confirm or override quickly.

---

### Check 6 — Type-Specific Fields Match the Request Type

**Passes if:**
The brief contains all type-specific fields required by the template
for the declared request type, and no type-specific fields from
a different request type are present.

**Reference — required fields per type:**

| Type | Required type-specific fields |
|---|---|
| FEAT | User Story, Acceptance Criteria, UI/UX Notes, API Changes Required, Database Changes Required, Mobile Platform Scope |
| BUG | Severity, Steps to Reproduce, Expected Behaviour, Actual Behaviour, Environment, Suspected Cause, Screenshot or Recording Reference |
| RFCT | Current State, Target State, Scope Boundaries, What Must Not Change, Risk Assessment, Definition of Done |
| CFG | Environment Targets, Current Config, Proposed Config, Security Implications, Rollback Plan |
| INFRA | Infrastructure Affected, Security Implications, Cost Implications, Rollback Plan |
| SPIKE | Question to Answer, Success Criteria, Time Box, Options to Evaluate, Output Format, Decision This Unblocks |

**Fails if:**
- A required field for the declared type is missing or empty
- A field from a different type is present and not relevant

**Warning message:**
```
### Warning — Type-Specific Fields Incomplete
**Issue:** Brief is declared as [TYPE] but the following required
fields are missing or empty: [field 1], [field 2].
**Location:** Type-specific section
**Suggested fix:** Add the missing fields using the template in
agents/intake/skills/brief-writing/[type].md.
```

**Why this matters:**
Missing type-specific fields mean agents lack critical information
for their work. A bug fix without steps to reproduce cannot be fixed.
A spike without a time box will run indefinitely.

---

## Validation Summary Format

After running all six checks, produce an internal summary before
deciding how to present the brief:

```
Validation summary:
- Check 1 (Scope): [Pass / Warn — description]
- Check 2 (Dependencies): [Pass / Warn — description]
- Check 3 (Affected Teams): [Pass / Warn — description]
- Check 4 (TASK ID Format): [Pass / Warn — description]
- Check 5 (Priority Rationale): [Pass / Warn — description]
- Check 6 (Type-Specific Fields): [Pass / Warn — description]

Total warnings: [N]
Presentation mode: [Clean / With warnings]
```

This summary is internal — do not show it to the operator.
Only show warnings in the formatted warning blocks appended to the brief.
