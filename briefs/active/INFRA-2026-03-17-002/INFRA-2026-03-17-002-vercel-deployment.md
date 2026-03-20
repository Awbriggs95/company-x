# INFRA-2026-03-17-002: Vercel Deployment — Web Calculator

## Meta
- **ID:** INFRA-2026-03-17-002
- **Type:** Infrastructure / DevOps Task
- **Status:** Active
- **Priority:** High — the calculator (FEAT-2026-03-17-001) is complete but not yet accessible; deployment unblocks the operator from using the product
- **Date Created:** 2026-03-17
- **Requested By:** Operator
- **Branch:** infra/INFRA-2026-03-17-002-vercel-deployment
- **File Lock:** `.github/workflows/`, `web/` (confirm with DevOps Lead after brief review)

---

## Intent
Deploy the completed web calculator to Vercel so it is accessible in a browser via a public URL. The calculator has been built but is currently only runnable locally. This task makes it live.

---

## Scope
- Merge the calculator code from session branch to `main` via PR
- Create a Vercel project connected to the GitHub repository
- Configure automatic production deployments triggered on merge to `main`
- Verify the Next.js app builds successfully in the Vercel environment
- Confirm the app is accessible and functional at the auto-generated Vercel URL
- Store required Vercel credentials (API token, Org ID, Project ID) as GitHub repository secrets
- Add or update the GitHub Actions workflow to include a deployment step or verify Vercel's native GitHub integration handles deployment on merge

---

## Out of Scope
- Custom domain — deferred; auto-generated Vercel URL in use for now
- Staging or preview environments beyond Vercel's default per-PR previews
- Monitoring and error tracking setup — undecided in stack.md; see Open Questions
- Backend infrastructure — calculator is a frontend-only Next.js app
- App Store or mobile distribution — web only

---

## Affected Teams
- [ ] Engineering — Frontend
- [ ] Engineering — Backend
- [ ] QA
- [x] DevOps
- [ ] PM

---

## Dependencies
- FEAT-2026-03-17-001 — Web Calculator must be merged to `main` before deployment can be verified (currently marked Complete)

---

## Open Questions
- Monitoring and error tracking are both ❓ Undecided in `shared/stack.md`. Per the stack's Decision Resolution Order, these decisions should be made at first production deployment. Should these be resolved as part of this task, or addressed in a separate brief immediately after?

---

## Notes
**Assumptions made during intake:**
- Auto-generated Vercel URL confirmed by operator — no custom domain needed at this stage
- Production-only deployment assumed; no staging environment required — inferred from personal tool context established in FEAT-2026-03-17-001
- Vercel's native GitHub integration will handle auto-deployments on merge to `main`; GitHub Actions used for pre-merge CI (lint, test) per stack.md
- Next.js on Vercel requires no additional build configuration beyond `next build` — Vercel detects Next.js automatically

**Orchestrator note added at routing:**
- Calculator code is currently on session branch `claude/simple-web-calculator-qpXeU` — Engineering Lead confirmed it was merged there due to remote branch constraints. DevOps to handle PR from that branch to `main` as first step before Vercel deployment proceeds.

---

## Infrastructure Affected

**Cloud provider:** Vercel

**Resources affected:**

| Resource | Type | Environment | Action |
|---|---|---|---|
| Vercel project | Hosting project | Production | Create |
| Vercel production deployment | Deployment | Production | Create |
| GitHub → Vercel integration | Repository connection | All | Configure |
| GitHub Actions workflow | CI pipeline | All | Modify |
| GitHub repository secrets | Secret storage | All | Configure |

**Systems affected:**
- GitHub repository (secrets, Actions workflow)
- Vercel dashboard (project creation and settings)

**Not affected — confirm explicitly:**
- Any existing GitHub Actions workflows unrelated to deployment
- `main` branch protection rules — must remain in place; no direct pushes to main
- No backend, database, or mobile infrastructure exists yet — none touched

---

## Security Implications

**Does this change affect access control or permissions?** Yes
Vercel requires a personal access token or team token to connect to GitHub. This token must be stored as a GitHub repository secret — never committed to the repository.

**Does this change expose any new network surface?** Yes
The web calculator will be publicly accessible on the internet at a `*.vercel.app` URL. This is the intended outcome. The app has no authentication, no backend, and no user data — exposure risk is low.

**Does this change involve secrets or credentials?** Yes
Three values must be stored as GitHub repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. None are to be written into any file committed to the repository.

**Does this change affect data storage or transmission?** No
The calculator is a fully static Next.js application with no data storage or transmission.

**Overall security risk:** Low
Static frontend application with no auth, no backend, no user data. Public exposure is intentional and carries no elevated risk beyond standard web presence.

---

## Cost Implications

**Are new billable resources being created?** Yes

**Estimated cost impact:**

| Resource | Estimated Monthly Cost | Basis for Estimate |
|---|---|---|
| Vercel Hobby plan | $0 | Free tier; includes 100GB bandwidth, unlimited deployments, custom domains when needed |

**Total estimated monthly impact:** $0

**Cost approval required?** No — free tier is sufficient for a personal tool

**Notes:**
Vercel's Hobby (free) plan covers everything needed here. The calculator is a static Next.js app with no serverless functions and no expected high traffic. The free tier will not be a constraint at this stage. If a custom domain or team features are added in future, a paid plan would be required — that decision can wait.

---

## Rollback Plan

**Is this change reversible?** Yes

**Rollback steps:**
1. In the Vercel dashboard, delete the project — this removes all deployments and disconnects the GitHub integration
2. Remove `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` from GitHub repository secrets
3. Remove or revert the deployment-related step from the GitHub Actions workflow file
4. Verify no automated deployments are triggered on next commit to `main`

**Data implications of rollback:**
None — the calculator holds no user data. Rolling back simply takes the URL offline.

**Rollback owner:** Operator
**Estimated rollback time:** < 10 minutes
**Rollback complexity:** Simple

---

## Report Index
| Agent | Report | Status |
|---|---|---|
| Senior DevOps | reports/senior-devops-preparation.md | Awaiting operator confirmation |

---

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
