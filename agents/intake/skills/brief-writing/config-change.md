# Brief Writing — Config / Environment Change

> This file defines the type-specific fields appended to the base brief
> template for Config / Environment Change requests. Read
> `shared/brief-template.md` first for the universal base fields
> that precede these.
>
> TASK ID prefix: CFG

---

## When to Use This Template

Use this template when the request changes a configuration value,
environment variable, feature flag, or setting without modifying
application logic. The key test: is the change purely to a value
or setting rather than to code?

If the answer is no — reconsider the type. It may be a New Feature
(new behaviour being added) or a Refactor (code structure changing).

**Important:** Config changes that touch production environments or
sensitive values carry real risk despite appearing simple. Agents
must treat these briefs carefully and never apply production changes
without explicit operator confirmation.

---

## Type-Specific Fields

Append the following fields to the base brief, in this order:

---

### Environment Targets

Which environments this change applies to and in what order.

```markdown
## Environment Targets

| Environment | Apply? | Order |
|---|---|---|
| Development | [Yes / No] | [1st / 2nd / 3rd / N/A] |
| Staging | [Yes / No] | [1st / 2nd / 3rd / N/A] |
| Production | [Yes / No] | [1st / 2nd / 3rd / N/A] |

**Deployment sequence notes:**
[Any specific sequencing requirements or dependencies between environments]
```

**Writing rules:**
- Always apply to development and staging before production — no exceptions
- If production is in scope, note it explicitly and ensure the operator
  is aware — production config changes must always be operator-confirmed
- If the change applies to all environments simultaneously, state why —
  this should be rare and justified

---

### Current Config

The exact current state of the configuration being changed.

```markdown
## Current Config

| Field | Current Value |
|---|---|
| Config key / variable name | [exact name] |
| Current value | [exact value or "See secure notes — sensitive"] |
| Location | [.env file, app.json, config service, etc.] |
| Set by | [hardcoded / environment variable / config service] |
```

**Writing rules:**
- Never write sensitive values (API keys, secrets, passwords) in plain
  text in a brief — write "See secure notes — sensitive" and store
  the value securely outside of Git
- If the current value is unknown, write "Unknown — must be confirmed
  before proceeding" and mark as an Open Question
- Location must be specific enough for an agent to find it without searching

---

### Proposed Config

The exact new state of the configuration after the change.

```markdown
## Proposed Config

| Field | Proposed Value |
|---|---|
| Config key / variable name | [exact name — must match current] |
| Proposed value | [exact value or "See secure notes — sensitive"] |
| Location | [same as current, or new location if moving] |
| Set by | [same as current, or new method if changing] |

**Reason for change:**
[Why this specific value is being set — what it achieves or fixes]
```

**Writing rules:**
- The config key name must match exactly — a typo here causes silent failures
- If the value is being moved to a different location (e.g. from hardcoded
  to environment variable), note both the old and new location explicitly
- The reason for change must be specific — "update the value" is not sufficient

---

### Security Implications

An assessment of whether this config change involves sensitive data
or has security implications.

```markdown
## Security Implications

**Is this value sensitive?** [Yes / No]

**Sensitive value handling:**
[If yes — how the value will be stored and transmitted securely.
If no — confirm why the value is not considered sensitive.]

**Access implications:**
[Does this change affect who or what can access a system, API, or resource?]

**Audit trail:**
[Does this change need to be logged or recorded outside of Git?]
```

**Sensitive values include:**
- API keys and tokens
- Database credentials
- Encryption keys or secrets
- OAuth client IDs and secrets
- Any value that grants access to a system or resource

**Writing rules:**
- If the value is sensitive, it must never appear in the brief, in Git,
  or in any agent report — reference a secure storage location instead
- If access implications exist, flag them to the operator before proceeding
- When in doubt, treat a value as sensitive — it is easier to relax
  security than to recover from a leaked credential

---

### Rollback Plan

The exact steps to revert this change if something goes wrong.

```markdown
## Rollback Plan

**Rollback steps:**
1. [First step to revert the change]
2. [Second step]
3. [Verification step — how to confirm rollback was successful]

**Rollback owner:** Operator
**Estimated rollback time:** [e.g. < 5 minutes]
**Rollback complexity:** [Simple — single value revert | Medium | Complex]
```

**Writing rules:**
- Every config change must have a rollback plan — "revert the value"
  is acceptable only if the previous value is documented in Current Config
- If the previous value is sensitive and not stored in the brief,
  confirm it is stored securely before proceeding — a rollback without
  the original value is not a rollback plan
- Production rollbacks must be executable by the operator without
  agent assistance — keep them simple

---

## Complete Config Change Brief Example

```markdown
# CFG-2026-03-14-004: Update Google OAuth Client ID for Production

## Meta
- **ID:** CFG-2026-03-14-004
- **Type:** Config / Environment Change
- **Status:** Backlog
- **Priority:** High
- **Date Created:** 2026-03-14
- **Requested By:** Operator
- **Branch:** config/CFG-2026-03-14-004-google-oauth-client-id-prod

## Intent
Update the Google OAuth client ID in the production environment
to the verified production credential. The current value is a
development credential that must not be used in production.

## Scope
- Update GOOGLE_OAUTH_CLIENT_ID in the production environment only
- Verify the OAuth flow works correctly after the update

## Out of Scope
- Development and staging environments (already using correct values)
- Any changes to the OAuth implementation code

## Affected Teams
- [ ] Engineering — Frontend
- [ ] Engineering — Backend
- [x] DevOps
- [x] QA
- [ ] PM

## Dependencies
- FEAT-2026-03-14-001 (Google OAuth Login) must be deployed to production first

## Open Questions
- None

## Notes
**Assumptions made during intake:**
- Assumed High priority — production is using a dev credential

---

## Environment Targets

| Environment | Apply? | Order |
|---|---|---|
| Development | No | N/A |
| Staging | No | N/A |
| Production | Yes | 1st |

**Deployment sequence notes:**
Production only — dev and staging already have correct values configured.
Operator must confirm production deployment explicitly before agent proceeds.

## Current Config

| Field | Current Value |
|---|---|
| Config key / variable name | GOOGLE_OAUTH_CLIENT_ID |
| Current value | See secure notes — sensitive |
| Location | .env.production |
| Set by | Environment variable |

## Proposed Config

| Field | Proposed Value |
|---|---|
| Config key / variable name | GOOGLE_OAUTH_CLIENT_ID |
| Proposed value | See secure notes — sensitive |
| Location | .env.production |
| Set by | Environment variable |

**Reason for change:**
Current production value is a development credential. Google restricts
OAuth usage to the registered environment — using a dev credential
in production will cause auth failures for all production users.

## Security Implications

**Is this value sensitive?** Yes

**Sensitive value handling:**
Value stored in secure credential manager. Not to be written in any
brief, report, or Git commit. Agent must retrieve from secure storage
and apply directly — never log the value.

**Access implications:**
This credential controls which OAuth requests Google accepts from
the app. An incorrect value will break sign-in for all users.

**Audit trail:**
Change to be recorded in the deployment log with timestamp and
operator confirmation — not the value itself.

## Rollback Plan

**Rollback steps:**
1. Retrieve previous GOOGLE_OAUTH_CLIENT_ID from secure credential manager
2. Update .env.production to the previous value
3. Redeploy the production environment
4. Verify Google sign-in completes successfully on a test account

**Rollback owner:** Operator
**Estimated rollback time:** < 10 minutes
**Rollback complexity:** Simple — single value revert

## Report Index
| Agent | Report | Status |
|---|---|---|
| — | — | — |

## Completion Sign-Off
- **Orchestrator approved:** [ ]
- **Operator approved:** [ ]
- **Moved to completed/:** [ ]
```
