# Skill — Expo EAS Build and Deployment

> Owner: senior-devops | Version: 1.0.0
> Standards for building and distributing the Company-X mobile app
> using Expo EAS.

---

## EAS Configuration

EAS profiles are defined in `eas.json` at the project root:

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true },
      "android": { "buildType": "apk" }
    },
    "staging": {
      "distribution": "internal",
      "ios": { "buildType": "archive" },
      "android": { "buildType": "apk" },
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "distribution": "store",
      "ios": { "buildType": "archive" },
      "android": { "buildType": "app-bundle" },
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "[from secrets]",
        "ascAppId": "[App Store Connect App ID]"
      },
      "android": {
        "serviceAccountKeyPath": "[from secrets]",
        "track": "internal"
      }
    }
  }
}
```

---

## Build Commands

```bash
# Development build (simulator)
eas build --profile development --platform all --non-interactive

# Staging build
eas build --profile staging --platform all --non-interactive

# Production build
eas build --profile production --platform all --non-interactive

# Submit to stores (after production build)
eas submit --platform all --non-interactive
```

Always use `--non-interactive` in CI/CD pipelines — interactive
prompts will hang the pipeline.

---

## Deployment Flow

### Staging deployment (no operator confirmation required)
```
1. QA confirms brief passes testing
2. Senior DevOps triggers staging build via EAS
3. EAS builds iOS and Android
4. Distribute to internal testers via TestFlight / Google Play Internal
5. Confirm both builds are accessible and running
6. File preparation report
```

### Production deployment (operator confirmation required)
```
1. Staging deployment confirmed working
2. Senior DevOps prepares production deployment summary
3. Files preparation report — Status: Awaiting operator confirmation
4. DevOps Lead reviews, confirms rollback gate is met
5. DevOps Lead surfaces confirmation request directly to operator
6. Operator confirms
7. DevOps Lead instructs Senior DevOps to proceed
8. Senior DevOps triggers production build via EAS
9. Submits to App Store and Google Play
10. Confirms builds are live
11. Files completion report
```

Never skip step 6 — production deployment without operator
confirmation is a hard violation.

---

## Preparation Report Format

Before any production deployment, file a preparation report:

```markdown
## Production Deployment Preparation — [TASK-ID]
**Date:** [YYYY-MM-DD]
**Build profile:** production
**Platforms:** iOS + Android

### What will be deployed
[Plain language description of what this deployment includes]

### App versions
- iOS: [version number] ([build number])
- Android: [version number] ([version code])

### Environments already confirmed working
- [ ] Development — confirmed
- [ ] Staging — confirmed ([date])

### Store submission targets
- iOS: App Store — [Internal / TestFlight / Public release]
- Android: Google Play — [Internal / Alpha / Beta / Production]

### Rollback plan
[Steps to revert if deployment causes issues]

### Rollback tested
[Yes — tested on staging [date] | No — waiver required from operator before proceeding]

### Estimated deployment time
[How long the full build and submission process takes]

**Status: Awaiting operator confirmation before proceeding.**
```

---

## Post-Deployment Verification

After every deployment — staging or production:

```bash
# Verify build is available
eas build:list --limit 5

# Check build status
eas build:view [build-id]
```

Manually test the deployed build on a real device or simulator
before filing the completion report. Do not rely on build success
alone — verify the app actually runs.

---

## Common EAS Issues

| Issue | Cause | Resolution |
|---|---|---|
| iOS build fails — provisioning | Missing or expired provisioning profile | Run `eas credentials` to refresh |
| Android build fails — keystore | Missing keystore | Run `eas credentials --platform android` |
| Submit fails — App Store | Invalid binary or metadata | Check App Store Connect for specific rejection reason |
| OTA update not appearing | Wrong release channel | Verify `updates.channel` in app.config.ts matches profile |
