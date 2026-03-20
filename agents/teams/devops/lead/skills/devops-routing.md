# Skill — DevOps Routing

> Owner: devops-lead | Version: 1.0.0
> Defines how the DevOps Lead assigns and scopes infrastructure
> and deployment work to the Senior DevOps agent.

---

## Scoping DevOps Work

When assigning a brief to Senior DevOps, provide a focused assignment:

```
To: Senior DevOps
Brief: [TASK-ID] — [short title]
Full brief: [path to brief file]
QA report: briefs/active/[TASK-ID]/reports/qa-lead.md
Your scope: [Specific infrastructure or deployment work]
Environment targets: [Dev / Staging / Production]
Priority: [level]

⚠️  Production gate: Do not deploy to production until operator
confirmation is received through this Lead. Prepare and report
readiness first.
```

Always include the production gate reminder — every assignment,
every time. Senior DevOps must never assume production is approved.

---

## Work Type Classification

| Work type | Typical scope | Production gate applies? |
|---|---|---|
| CI/CD pipeline change | GitHub Actions, build config | No — infrastructure only |
| Staging deployment | Deploy to staging environment | No |
| Production deployment | Deploy to production via EAS | Yes — always |
| OTA update (Expo Updates) | JavaScript-only over-the-air update | Yes — always. OTA updates bypass the App Store but still affect production users. Never push an OTA update without operator confirmation. |
| Infrastructure provisioning | New cloud resources | Yes if production-facing |
| Secret / config update | Environment variables | Yes if production |
| Rollback | Revert to previous state | Yes if production |
| Monitoring setup | Alerts, dashboards | No |

---

## DevOps Completion Criteria

Before accepting Senior DevOps work as complete:

- [ ] QA Lead report confirms testing passed — **only required if QA was
  in the routing sequence for this brief. INFRA and CFG briefs routed
  directly to DevOps do not require a QA report.**
- [ ] Deployment preparation report is filed
- [ ] All affected environments confirmed working after change
- [ ] Rollback verified as executable if needed
- [ ] Rollback tested field is confirmed Yes — or operator waiver is on record
- [ ] No new security exposures introduced
- [ ] Cost implications confirmed within expected range
- [ ] For production — operator confirmation received before deployment

**Rollback gate:** If the preparation report shows "Rollback tested: No"
and no operator waiver exists, do not request production confirmation.
Surface the gap to the operator first:

```
To: Operator
Brief: [TASK-ID]
Production deployment is ready but rollback has not been tested.

Options:
a) Test rollback on staging before proceeding — recommended
b) Waive rollback testing — I will note this on record and proceed

Awaiting your instruction.
```

Never skip this gate on the grounds of urgency — a rollback that has
never been run is not a rollback plan.
