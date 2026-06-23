# Pre-Deploy Security Review

## Purpose

Act as a security quality gate before production or sensitive preview deployment.

## When to Use

- before production deploy
- before sensitive preview/staging deploy
- after security-sensitive PRs
- when DevOps asks for deploy readiness

## Before Acting

- `../AGENT.md`
- `../knowledge/security-baseline.md`
- `../knowledge/database-security.md`
- `../knowledge/secrets-management.md`
- `../knowledge/infra-hardening.md`
- `../knowledge/security-automation.md`
- `../../devops/AGENT.md`

## Inputs

- Release scope
- PRs included
- Deployment target
- Environment plan
- CI/CD status
- Backup/rollback plan
- Known vulnerabilities

## Steps

1. Load Security Lead and the smallest specialist roles
2. Review database exposure and backup/rollback
3. Review server-side auth and authorization
4. Review secrets/code/log exposure
5. Review query safety
6. Review CORS and rate limits
7. Review vulnerable dependencies
8. Review service account permissions
9. Review security automation readiness status
10. Return gate decision

## Security Gate

- Block deploy for public database.
- Block deploy for missing authorization.
- Block deploy for secrets in code.
- Block deploy for client-side token exposure.
- Block deploy for unsafe query.
- Block deploy for open CORS without justification.
- Block deploy for no rate limit on login or sensitive APIs.
- Block deploy for sensitive data in logs.
- Block deploy for no backup or rollback path.
- Block deploy for critical vulnerable dependency.
- Block deploy for over-permissive service account.
- Block deploy for missing tenant isolation.
- Block production readiness when security automation status is unknown.

## Output

- Deploy security gate decision
- Blocking findings
- Required fixes
- Accepted residual risks
- Security reviewer role used

## Files to Update

- Update `../knowledge/database-security.md`, `../knowledge/secrets-management.md`, `../knowledge/infra-hardening.md` or `../knowledge/incident-response.md` after explicit confirmation.

## Stop Conditions

- Any Security Gate blocker is present.
- Deploy target or environment cannot be identified.
- Backup/rollback path is unknown for production.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
