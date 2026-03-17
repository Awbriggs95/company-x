# Skill — Cloud Infrastructure

> Owner: senior-devops | Version: 1.0.0
> Standards for provisioning and managing cloud infrastructure.
> Check shared/stack.md for the approved cloud provider before
> provisioning anything.

---

## Check Stack First

Cloud provider is marked PENDING in `shared/stack.md`.
Before provisioning any cloud resource:
1. Check `shared/stack.md` — is a provider now approved?
2. If approved — use that provider only
3. If still PENDING — escalate to Lead immediately

The principles below apply regardless of provider chosen.

---

## Infrastructure as Code

All infrastructure must be defined as code — never click-ops.

Use the approved IaC tool for your cloud provider:
- AWS → Terraform or AWS CDK
- GCP → Terraform or Google Cloud Deployment Manager
- Azure → Terraform or Azure Bicep
- Supabase / Firebase → CLI configuration files

Infrastructure code lives in:
```
infra/
├── main.tf (or equivalent)
├── variables.tf
├── outputs.tf
└── environments/
    ├── dev/
    ├── staging/
    └── production/
```

Never manually configure cloud resources without a corresponding
IaC definition. Manual changes drift from the defined state and
cannot be reproduced or audited.

---

## Environment Separation

Maintain strict separation between environments:

| Environment | Purpose | Auto-deploy? | Production data? |
|---|---|---|---|
| Development | Local and PR testing | No | Never |
| Staging | Pre-production validation | On merge to main | Never |
| Production | Live users | Manual only | Yes |

Never use production credentials or data in development or staging.
Never deploy to production automatically — always manual with
operator confirmation.

---

## Resource Naming Convention

```
[company]-[environment]-[resource-type]-[name]

company-x-prod-db-users
company-x-staging-storage-uploads
company-x-dev-api-server
```

Consistent naming makes resources identifiable without opening
the console.

---

## Security Baseline

Every cloud environment must meet these minimums:

- [ ] Principle of least privilege — every service has minimum required permissions
- [ ] No public access to databases — databases never exposed to public internet
- [ ] All data encrypted at rest
- [ ] All traffic encrypted in transit (HTTPS/TLS only)
- [ ] Access logs enabled on all resources
- [ ] No credentials in IaC code — use secret management services
- [ ] MFA required for all human access to production

If any of these cannot be met — escalate to Lead before provisioning.

---

## Cost Management

Before provisioning any resource:
- Estimate monthly cost and document in the brief's cost implications
- Use the smallest resource size that meets requirements — scale up later
- Enable billing alerts at 80% and 100% of expected monthly spend
- Tag all resources with environment and TASK ID for cost attribution

Never provision resources without a cost estimate in the brief.
