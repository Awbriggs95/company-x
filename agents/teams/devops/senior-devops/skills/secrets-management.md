# Skill — Secrets and Environment Management

> Owner: senior-devops | Version: 1.0.0
> Standards for managing secrets, credentials, and environment
> configuration across Company-X environments.

---

## Core Rules

- Never commit secrets to Git — ever, in any file, in any branch
- Never log secret values — not in pipelines, not in reports, not anywhere
- Never share secrets over chat, email, or any unencrypted channel
- Never use production secrets in development or staging
- Every secret must be rotatable — if it cannot be rotated, it is a risk

---

## Secret Storage Locations

| Secret type | Where it lives |
|---|---|
| CI/CD pipeline secrets | GitHub repository secrets |
| App runtime secrets | Expo EAS secrets / Cloud secret manager |
| Local development | `.env.local` — gitignored, never committed |
| Infrastructure credentials | Cloud provider secret manager |

Never use `.env` files in production — they can be accidentally
committed or exposed. Use the cloud provider's secret management
service for production runtime secrets.

---

## GitHub Repository Secrets

Configure secrets in GitHub via:
Settings → Secrets and variables → Actions → New repository secret

Required secrets for Company-X pipelines:

| Secret name | Purpose |
|---|---|
| `EXPO_TOKEN` | EAS authentication for builds |
| `APPLE_ID` | App Store Connect authentication |
| `APPLE_APP_SPECIFIC_PASSWORD` | App Store submission |
| `GOOGLE_PLAY_SERVICE_ACCOUNT_KEY` | Google Play submission (JSON) |

Document every secret in `shared/stack.md` under DevOps — name and
purpose only, never the value.

---

## Expo EAS Secrets

For secrets needed at build time or runtime in the Expo app:

```bash
# Set a secret for a specific environment
eas secret:create --scope project --name API_URL --value "https://api.company-x.com" --type string

# List configured secrets
eas secret:list

# Push .env file as EAS secrets
eas secret:push --scope project --env-file .env.production
```

EAS secrets are injected at build time — they are not committed
to the repository.

---

## Environment Files

Each environment has its own env file — none are committed to Git:

```
.env.local          ← Local development — gitignored
.env.development    ← Development environment — gitignored
.env.staging        ← Staging environment — gitignored
.env.production     ← Production environment — gitignored
.env.example        ← Template with all keys, no values — committed
```

`.env.example` is the only env file committed to Git.
It must be kept up to date — every new environment variable
added to any service must appear in `.env.example`.

---

## Secret Rotation

Rotate secrets immediately if ANY of the following occur:

- A secret is accidentally committed to Git
- A secret appears in any log or output
- A team member with access to the secret leaves
- A suspected security breach of any kind

Rotation procedure:
1. Generate new secret value
2. Update in all secret storage locations (GitHub, EAS, cloud)
3. Verify services still work with new secret
4. Invalidate old secret
5. Document rotation in the project journal with date and reason
   (not the secret value)

If a secret is accidentally committed to Git — treat it as
compromised immediately regardless of whether it was accessed.
Push a commit removing it, then rotate. History rewriting is
not sufficient — assume it was scraped.

---

## Secrets Audit

Before completing any infrastructure brief, verify:

- [ ] No secrets present in any committed file
- [ ] All secrets documented in shared/stack.md by name (not value)
- [ ] .env.example updated with any new variables
- [ ] GitHub secrets configured for all pipeline requirements
- [ ] Local development instructions updated if new secrets required
