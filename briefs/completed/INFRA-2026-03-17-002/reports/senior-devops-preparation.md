# Senior DevOps Preparation Report — INFRA-2026-03-17-002
**Date:** 2026-03-17
**Brief:** Vercel Deployment — Web Calculator
**Status:** Awaiting operator confirmation

---

## What Was Done

Created the GitHub Actions CI pipeline and root `.gitignore`. All infrastructure-as-code work that can be committed to the repository is complete. The Vercel project connection and GitHub secrets require operator action in external systems (Vercel dashboard and GitHub settings) — these cannot be scripted without credentials and are documented below.

---

## Files Changed

| File | Change type | Description |
|---|---|---|
| `.github/workflows/ci.yml` | Created | CI pipeline — lint + build gate on every PR to main, scoped to `web/` |
| `.gitignore` | Created | Root-level exclusions for env files and misc |
| `briefs/active/INFRA-2026-03-17-002/INFRA-2026-03-17-002-vercel-deployment.md` | Created | Brief moved from backlog to active |

---

## Decisions Made

| Decision | Rationale |
|---|---|
| CI runs `npm run lint` then `npm run build` | `next build` catches TypeScript errors — no separate `type-check` script exists in `package.json`; no test script exists yet |
| No `vercel.json` added | Vercel auto-detects Next.js when Root Directory is set to `web` in project settings — no config file needed |
| CI workflow scoped to `web/` via `defaults.run.working-directory` | Next.js app lives in `web/` subdirectory; all npm commands must run from there |

---

## Deviations from Brief

None.

---

## Escalations During This Task

None.

---

## Blockers Remaining

None from the code side. Two steps require operator action before production deployment can proceed:

1. **PR to main** — The calculator code and CI workflow are on session branch `claude/simple-web-calculator-qpXeU`. A pull request to `main` must be created and merged. Once the CI workflow is on `main`, it will gate all future PRs automatically.

2. **Vercel setup** — Requires manual steps in external systems (see Operator Action Required below).

---

## Branch and Commits

**Branch:** claude/simple-web-calculator-qpXeU
**Commits:**
- `6185dc4` — INFRA-2026-03-17-002: Add CI workflow and root .gitignore

---

## Operator Action Required

The following steps must be completed by the operator. They require access to external systems that the DevOps agent cannot access.

### Step 1 — Merge to main

Create a pull request on GitHub from `claude/simple-web-calculator-qpXeU` to `main` and merge it. This brings all calculator code and the CI workflow onto `main`, enabling Vercel to deploy the correct code.

### Step 2 — Create Vercel account (if not already done)

Go to [vercel.com](https://vercel.com) and sign up with your GitHub account. The Hobby (free) plan is sufficient.

### Step 3 — Import the repository into Vercel

1. In the Vercel dashboard, click **Add New → Project**
2. Select the `company-x` GitHub repository
3. Under **Root Directory**, set it to `web`
4. Leave all other settings as defaults — Vercel auto-detects Next.js
5. Click **Deploy**

Vercel will deploy the app and provide a `*.vercel.app` URL. Auto-deployments on merge to `main` are enabled by default.

### Step 4 — Add Vercel credentials to GitHub secrets

After the Vercel project is created, retrieve the following values:

| Secret | Where to find it |
|---|---|
| `VERCEL_TOKEN` | Vercel dashboard → Settings → Tokens → Create token |
| `VERCEL_ORG_ID` | Vercel dashboard → Settings → General → Team ID (or your personal account ID) |
| `VERCEL_PROJECT_ID` | Vercel project → Settings → General → Project ID |

Add each as a GitHub repository secret:
GitHub repo → Settings → Secrets and variables → Actions → New repository secret

These secrets are required if a GitHub Actions deployment step is added in future. For now, Vercel's native GitHub integration handles deployments automatically — these are stored for future use.

### Step 5 — Verify deployment

After the Vercel project is connected and `main` is merged, Vercel will automatically deploy. Confirm:
- The app is accessible at the `*.vercel.app` URL
- The calculator renders and functions correctly at the root route (`/`)

---

## Deployment Summary

| Environment | Action | Status | Verified |
|---|---|---|---|
| Development | N/A | N/A | N/A |
| Staging | N/A — not configured | N/A | N/A |
| Production | Create Vercel project + deploy | Awaiting operator action | No |

## Secrets Changed

None committed. Secrets to be added by operator to GitHub repository settings:
- `VERCEL_TOKEN` (pending operator action)
- `VERCEL_ORG_ID` (pending operator action)
- `VERCEL_PROJECT_ID` (pending operator action)

## Cost Impact

No new costs. Vercel Hobby plan is free.

## Rollback Available

Yes — delete Vercel project via dashboard. Full rollback in < 10 minutes.
