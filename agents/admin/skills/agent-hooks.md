# Skill — Agent Hooks

> Owner: admin-agent | Version: 1.0.0
> Receives a completed agent definition from agent-creation.md,
> builds a full diff of every file that needs to be created or
> updated, presents it to the operator for confirmation, and
> writes all changes at once after approval.
>
> This skill never runs independently — it is always called from
> agent-creation.md after an agent definition is complete.

---

## Inputs

This skill receives an agent definition from agent-creation.md:

```
Agent definition:
  Name:           [agent name]
  Path:           [file path for CLAUDE.md]
  Type:           [Path A / B / C]
  Team:           [team name]
  Reports to:     [lead name or orchestrator]
  Lane:           [what it does / what it defers]
  Skills:         [list of skills with paths]
  New skills:     [skills that need to be created]
  Shared base:    [senior-base.md or lead-base.md]
  Permissions:    [read / write / deny summary]
  Status:         [✅ Active on creation or 🔒 locked]
```

---

## Step 1 — Determine All Affected Files

Before building the diff, compile the complete list of files
that need to be created or updated.

### Always affected (every new agent)

| File | Change type | What changes |
|---|---|---|
| `agents/[path]/CLAUDE.md` | Create | New agent file |
| Root `CLAUDE.md` | Update | Agent list + routing table |
| `shared/routing-rules.md` | Update | Roster table |
| `agents/admin/CLAUDE.md` | Update | Agents view roster |

### Affected when new skills are created

| File | Change type | What changes |
|---|---|---|
| `agents/[path]/skills/[skill].md` | Create | New skill file |

### Affected for Path A (junior variant)

| File | Change type | What changes |
|---|---|---|
| Relevant lead `CLAUDE.md` | Update | Team roster — junior added as 🔒 or ✅ |
| `shared/routing-rules.md` | Update | Junior entry added to roster |
| `shared/routing-rules-junior.md` | Update | Junior criteria confirmed applicable |

### Affected for Path B (new role in existing team)

| File | Change type | What changes |
|---|---|---|
| Relevant lead `CLAUDE.md` | Update | Team roster — new role added |
| `agents/orchestrator/CLAUDE.md` | Update | If lead role — added to routing patterns |

### Affected for Path C (entirely new team)

| File | Change type | What changes |
|---|---|---|
| Lead `CLAUDE.md` | Create | New team lead file |
| Senior `CLAUDE.md` | Create | New team senior file |
| Lead skills folder | Create | routing.md, escalation-handling.md, report-synthesis.md |
| Senior skills folder | Create | Domain skill files |
| `agents/orchestrator/CLAUDE.md` | Update | New team added to routing patterns |
| `shared/escalation-rules.md` | Update | New team added to escalation chain |
| `shared/routing-rules.md` | Update | New team section added |
| `shared/stack.md` | Update | New capability section added if the team's domain requires technology decisions (e.g. a Design team may need a Design Tools section; a Data team may need a Data Stack section). If no technology decisions are relevant, skip this file. |

---

## Step 2 — Build the Diff

For each file in the affected list, produce the key-decisions
diff format. Do not show full file contents — show only what
is changing.

### Format for new files

```
── NEW FILE ───────────────────────────────
[filepath]

  Identity:     [agent name and one-line role description]
  Lane:         [what it does / what it explicitly does not do]
  Team:         [team name]
  Reports to:   [lead name or orchestrator]
  Skills:       [skill name] — [one line description]
                [skill name] — [one line description]
  Permissions:  read  — [summary]
                write — [summary]
                deny  — [summary]
```

### Format for new skill files

```
── NEW FILE ───────────────────────────────
[filepath]

  Skill:        [skill name]
  Owner:        [agent name]
  Purpose:      [one sentence]
  Key sections: [section name] — [one line description]
                [section name] — [one line description]
```

### Format for updated files

```
── UPDATED FILE ───────────────────────────
[filepath]

  + [agent name]   — [description]
    (added to: agent list display)

  + | [agent name] | [filepath] |
    (added to: routing table)
```

Only show lines being added or changed. Never show
unchanged content — it adds noise and makes confirmation harder.

---

## Step 3 — Present the Full Diff

Present the complete diff to the operator before writing anything.

Open with a summary, then show all changes:

```
Here is everything that will change when [agent name] is created:

Files to create:  [N]
Files to update:  [N]

── NEW FILES ──────────────────────────────

[new file diffs in order]

── UPDATED FILES ──────────────────────────

[updated file diffs in order]

──────────────────────────────────────────
Confirm all changes? (yes / no)

Type 'yes' to write all files at once.
Type 'no' to cancel — nothing will be written.
Type 'edit [file]' to adjust a specific change before confirming.
```

Wait for the operator's response before doing anything.

---

## Step 4 — Handle Operator Response

### If operator types 'yes'
Proceed to Step 5 — write all files.

### If operator types 'no'
Cancel the entire operation. Nothing is written.
Return to the admin agent main menu:

```
Cancelled — no files were written.
Returning to admin menu.
```

### If operator types 'edit [file]'
Show the current planned content for that specific file
and ask what the operator wants to change:

```
Planned changes for [filepath]:

[show the diff for that file]

What would you like to change?
```

Accept the operator's edit, update the internal diff,
re-present the full diff from Step 3, and wait for
confirmation again. Repeat until the operator confirms
or cancels.

Never partially write files — all or nothing only.

---

## Step 5 — Write All Files

Write every file in the affected list in this order:

1. New skill files first — agents depend on them
2. New agent CLAUDE.md files second
3. Updated shared files last — routing-rules.md, escalation-rules.md
4. Updated agent files last — root CLAUDE.md, orchestrator, leads, admin

This order ensures that if something interrupts the write process,
the files that other agents depend on exist before the files that
reference them.

After writing each file, confirm internally that it was written
correctly before proceeding to the next.

---

## Step 6 — Confirm Completion

After all files are written, report to the operator:

```
[agent name] created successfully.

Files created:  [N]
  [filepath]
  [filepath]

Files updated:  [N]
  [filepath] — [what changed]
  [filepath] — [what changed]

[agent name] is now available as '[agent keyword]' in the
agent list. You can activate it from the next session start,
or return to the admin menu.
```

---

## What This Skill Never Does

- Never writes files before the operator confirms the diff
- Never writes files partially — all or nothing
- Never modifies files outside the affected list
- Never overwrites existing agent files without flagging it
  as an update and showing the specific change in the diff
- Never runs independently — always called from agent-creation.md
