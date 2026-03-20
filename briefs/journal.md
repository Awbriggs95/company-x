# Company-X Project Journal

> Append-only log of completed work. One entry per closed brief.
> Written by the Orchestrator at brief close. Never edited retroactively.

## INFRA-2026-03-17-002 — Vercel Deployment: Web Calculator (2026-03-20)
Deployed the web calculator to Vercel on the Hobby (free) plan. Senior DevOps created the GitHub Actions CI pipeline (lint + build gate on PRs to main) and documented the external setup steps for the operator. Operator completed Vercel project creation, GitHub integration, and secret configuration.
- Key decision: No `vercel.json` required — Vercel auto-detects Next.js with Root Directory set to `web`
- Files changed: `.github/workflows/ci.yml`, `.gitignore`
- Handled by: DevOps
