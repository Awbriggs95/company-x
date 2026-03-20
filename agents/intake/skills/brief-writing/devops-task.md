# Brief Writing — Infrastructure / DevOps Task

> This file defines the type-specific fields appended to the base brief
> template for Infrastructure / DevOps Task requests. Read
> `shared/brief-template.md` first for the universal base fields
> that precede these.
>
> TASK ID prefix: INFRA

---

## When to Use This Template

Use this template when the request involves deployment, CI/CD pipelines,
cloud infrastructure, developer tooling, or anything that is invisible
to end users but essential to how the system runs or is delivered.
The key test: is this work about how the product is built, deployed,
or operated rather than what it does?

If the answer is no — reconsider the type. It may be a Config Change
(a value is changing, not infrastructure) or a New Feature (user-facing
functionality is being added).

**Important:** Infrastructure changes carry the highest blast radius of
any task type. A mistake here can take down the entire product or
expose it to security vulnerabilities. Agents must treat INFRA briefs
with maximum caution and never apply changes to production infrastructure
without explicit operator confirmation.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### Infrastructure Affected

A clear inventory of every service, resource, or system this task
touches or depends on.

```markdown
## Infrastructure Affected

**Cloud provider:** [AWS / GCP / Azure / Supabase / Firebase / Not yet decided]

**Resources affected:**

| Resource | Type | Environment | Action |
|---|---|---|---|
| [Resource name] | [e.g. Storage bucket, CI pipeline, Server] | [Dev/Staging/Prod/All] | [Create / Modify / Delete / Configure] |

**Systems affected:**
- [Any non-cloud systems, tools, or services involved]

**Not affected — confirm explicitly:**
- [Any adjacent infrastructure that must not be touched]
```

**Writing rules:**
- List every resource — do not group or summarise
- The Action column must use one of: Create, Modify, Delete, Configure
- Deletions must be flagged explicitly — deleted infrastructure is
  often unrecoverable
- "Not affected" section is mandatory — it tells agents where the
  boundary is and prevents unintended changes to adjacent systems

---

### Security Implications

An assessment of the security impact of this infrastructure change.

```markdown
## Security Implications

**Does this change affect access control or permissions?** [Yes / No]
[If yes — describe what access is being granted, modified, or revoked]

**Does this change expose any new network surface?** [Yes / No]
[If yes — describe what is being exposed and to whom]

**Does this change involve secrets or credentials?** [Yes / No]
[If yes — describe how they will be handled securely]

**Does this change affect data storage or transmission?** [Yes / No]
[If yes — describe any encryption or data handling implications]

**Overall security risk:** [Low / Medium / High]
[One sentence rationale]
```

**Writing rules:**
- Every field must be answered — "N/A" is not acceptable without justification
- High security risk tasks must be reviewed by the operator before
  the Senior DevOps agent begins work
- Never store credentials, keys, or secrets in the brief — reference
  secure storage only
- If the security implications are unclear, mark as a Open Question
  and resolve before proceeding

---

### Cost Implications

An assessment of the financial impact of provisioning or modifying
cloud resources.

```markdown
## Cost Implications

**Are new billable resources being created?** [Yes / No]

**Estimated cost impact:**

| Resource | Estimated Monthly Cost | Basis for Estimate |
|---|---|---|
| [Resource name] | [$ amount or "Unknown — research required"] | [How the estimate was derived] |

**Total estimated monthly impact:** [$ amount or "Unknown — research required"]

**Cost approval required?** [Yes — operator must approve before proceeding | No]

**Notes:**
[Any cost optimisation considerations or alternatives considered]
```

**Writing rules:**
- If cost is unknown, write "Unknown — research required" and flag it
  as an Open Question — never provision resources without understanding cost
- If the monthly impact exceeds a meaningful threshold, mark
  "Cost approval required — Yes" and wait for operator sign-off
- Free tier resources must still be listed — note that they are free
  and any conditions that could make them billable in future
- Always note if a resource has usage-based pricing that could scale
  unexpectedly with traffic

---

### Rollback Plan

The exact steps to revert this infrastructure change if something
goes wrong. Infrastructure rollbacks are often more complex than
code rollbacks — plan carefully.

```markdown
## Rollback Plan

**Is this change reversible?** [Yes / No / Partially]
[If no or partially — explain what cannot be undone and why]

**Rollback steps:**
1. [First step to revert the change]
2. [Second step]
3. [Verification step — how to confirm rollback was successful]

**Data implications of rollback:**
[Will rolling back cause any data loss or corruption?]

**Rollback owner:** Operator
**Estimated rollback time:** [e.g. < 15 minutes]
**Rollback complexity:** [Simple | Medium | Complex]
```

**Writing rules:**
- If the change is not fully reversible, the operator must be explicitly
  informed before work begins — this is a hard requirement
- Data loss during rollback must always be flagged — never assume it
  is acceptable
- Complex rollbacks must include enough detail that the operator can
  execute them without agent assistance
- Deletions of existing resources are almost never fully reversible —
  treat them as irreversible unless a backup strategy is confirmed

---

## Complete DevOps Task Brief Example

```markdown
# INFRA-2026-03-14-005: Set Up Expo EAS Build Pipeline

## Meta
- **ID:** INFRA-2026-03-14-005
- **Type:** Infrastructure / DevOps Task
- **Status:** Backlog
- **Priority:** High
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** infra/INFRA-2026-03-14-005-eas-build-pipeline

## Intent
Set up Expo EAS (Expo Application Services) to automate building
and distributing the mobile app for both iOS and Android, replacing
manual local builds.

## Scope
- Configure EAS Build for development, staging, and production profiles
- Set up automated builds triggered on merge to main
- Configure distribution to TestFlight (iOS) and Google Play Internal (Android)

## Out of Scope
- EAS Update (OTA updates) — separate brief
- App Store and Google Play public release — separate brief
- CI/CD for the backend — separate brief

## Affected Teams
- [ ] Engineering — Frontend
- [ ] Engineering — Backend
- [x] DevOps
- [x] QA
- [ ] PM *(no PM agent exists yet — leave unchecked unless a PM agent has been created via admin)*

## Dependencies
- App must be registered in Apple Developer and Google Play Console
  before this task can begin

## Open Questions
- Apple Developer account confirmed active? — operator to verify

## Notes
**Assumptions made during intake:**
- Assumed High priority — manual builds are blocking QA
- Assumed Expo EAS as per stack.md

---

## Infrastructure Affected

**Cloud provider:** Expo EAS (managed service)

**Resources affected:**

| Resource | Type | Environment | Action |
|---|---|---|---|
| EAS Build project | Build service | All | Create |
| EAS development profile | Build profile | Development | Create |
| EAS staging profile | Build profile | Staging | Create |
| EAS production profile | Build profile | Production | Create |
| TestFlight distribution | iOS distribution | Staging + Production | Configure |
| Google Play Internal track | Android distribution | Staging + Production | Configure |

**Systems affected:**
- GitHub Actions (trigger for automated builds)
- Apple Developer Portal (provisioning profiles and certificates)
- Google Play Console (service account for distribution)

**Not affected — confirm explicitly:**
- Backend infrastructure
- Any existing GitHub Actions workflows unrelated to mobile builds
- App Store and Google Play public listings

## Security Implications

**Does this change affect access control or permissions?** Yes
EAS requires a service account with access to Apple Developer and
Google Play Console. These credentials must be stored as GitHub secrets,
not in any file in the repository.

**Does this change expose any new network surface?** No

**Does this change involve secrets or credentials?** Yes
Apple distribution certificate, Google Play service account key,
and EAS access token — all to be stored in GitHub repository secrets.
None to be written in any file committed to the repository.

**Does this change affect data storage or transmission?** No

**Overall security risk:** Medium
Build credentials grant the ability to distribute apps to stores.
Compromise would allow an attacker to distribute a malicious build.

## Cost Implications

**Are new billable resources being created?** Yes

**Estimated cost impact:**

| Resource | Estimated Monthly Cost | Basis for Estimate |
|---|---|---|
| EAS Build (free tier) | $0 | 30 free builds/month on free plan |
| EAS Build (if exceeding free tier) | ~$99/month | EAS Production plan |

**Total estimated monthly impact:** $0 — $99 depending on build volume
**Cost approval required?** No — free tier sufficient for current stage

**Notes:**
Free tier provides 30 builds per month across all platforms. At current
development pace this should be sufficient. Monitor build usage and
flag to operator if approaching the limit.

## Rollback Plan

**Is this change reversible?** Yes

**Rollback steps:**
1. Delete the EAS project from the Expo dashboard
2. Remove eas.json from the repository root
3. Remove EAS-related secrets from GitHub repository settings
4. Remove the GitHub Actions workflow file for EAS builds
5. Verify no automated builds are triggered on next commit

**Data implications of rollback:**
No data loss — EAS build history would be lost but builds themselves
are stored in TestFlight and Google Play Console.

**Rollback owner:** Operator
**Estimated rollback time:** < 20 minutes
**Rollback complexity:** Simple

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
