# Skill — CI/CD Pipelines

> Owner: senior-devops | Version: 1.0.0
> Standards for building and maintaining CI/CD pipelines for
> Company-X using GitHub Actions.

---

## Pipeline Philosophy

Every pipeline should do exactly one thing clearly.
Avoid large monolithic workflows — split by purpose:

```
.github/workflows/
├── ci.yml           ← Runs on every PR — lint, type check, tests
├── build.yml        ← Builds the app via EAS on merge to main
├── deploy.yml       ← Deploys to staging/production (manual trigger)
└── pr-checks.yml    ← Lightweight checks on PR open/update
```

---

## Standard CI Pipeline

Runs on every pull request — must pass before merge:

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage --watchAll=false
```

---

## Pipeline Rules

- Never store secrets in workflow files — use GitHub repository secrets
- Always pin action versions with full SHA or version tag — never @main
- Always use `npm ci` not `npm install` in CI — reproducible installs
- Cache dependencies — `actions/cache` or built-in cache in setup actions
- Fail fast — put quick checks (lint) before slow checks (tests)
- Never run production deployments from an automated trigger —
  production deployments require manual approval

---

## Secret Management in Pipelines

Reference secrets only via `${{ secrets.SECRET_NAME }}`:

```yaml
- name: Deploy to EAS
  env:
    EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
  run: eas build --non-interactive
```

Never echo or log secret values — GitHub will mask them but
the habit of never logging secrets is more important.

Required secrets to configure in GitHub repository settings:
- `EXPO_TOKEN` — EAS authentication
- `APPLE_ID` — App Store Connect
- `APPLE_APP_SPECIFIC_PASSWORD` — App Store submission
- `GOOGLE_PLAY_SERVICE_ACCOUNT_KEY` — Play Store submission

Document every required secret in `shared/stack.md` under DevOps.

---

## Branch Protection Requirements

main branch must have these protections enabled:

```
✅ Require pull request before merging
✅ Require status checks to pass (CI workflow)
✅ Require branches to be up to date before merging
✅ Do not allow bypassing the above settings
```

Verify these are configured before declaring any CI setup complete.
