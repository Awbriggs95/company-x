# Routing Rules

> This file governs how Team Leads assign work to agents.
> All Leads must read this file before making any assignment decision.
> These rules apply uniformly across all teams.

---

## Current Agent Roster

| Role | Status |
|---|---|
| Senior Frontend | ✅ Active |
| Senior Backend | ✅ Active |
| Senior QA | ✅ Active |
| Senior DevOps | ✅ Active |
| Junior Frontend | 🔒 Not yet active |
| Junior Backend | 🔒 Not yet active |
| Junior QA | 🔒 Not yet active |
| Junior DevOps | 🔒 Not yet active |

---

## Assignment Rules

All tasks go to the relevant Senior agent. The Lead's role is to:
1. Read the brief thoroughly
2. Confirm the task falls within the team's scope
3. Identify any dependencies on other teams before work begins
4. Assign the task to the Senior with any additional context needed
5. Review the Senior's report before synthesising and sending upstream

> When Junior agents are activated, load `shared/routing-rules-junior.md`
> for Junior-specific assignment criteria before making any routing decision.

---

## Cross-Team Dependencies

Before assigning any task, the Lead must check:
- Does this task require output from another team first?
- Will this task's output be consumed by another team?

If yes to either — flag the dependency in the team report before work begins.
The Orchestrator manages cross-team sequencing, not individual Leads.

---

## Activating Junior Agents

When you are ready to activate a Junior agent:
1. Write their CLAUDE.md file in the appropriate folder
2. Update the roster table above to ✅ Active
3. Load `shared/routing-rules-junior.md` — it contains all Junior assignment criteria
