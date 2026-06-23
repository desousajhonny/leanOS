# Infrastructure Hardening

## Purpose

Define minimal infrastructure guardrails for hosting, APIs, service accounts, CORS and runtime exposure.

## What to Document

- Hosting provider assumptions.
- Network/public exposure.
- CORS policy.
- Service accounts.
- Rate limits on sensitive endpoints.
- CI/CD and deploy permissions.

## Required Checks

- Open CORS has justification.
- Login and sensitive APIs have rate limit or abuse control.
- Service accounts are least privilege.
- CI/CD deploy permissions are reviewed.
- Production deploy has rollback path.

## Red Lines

- No open CORS without justification.
- No rate-limit gap on login or sensitive APIs.
- No over-permissive service account.
- No deploy automation without human-reviewed gates.
- No public admin endpoint.

## Related Playbooks

- `../playbooks/pre-deploy-security-review.playbook.md`
- `../playbooks/vulnerability-response.playbook.md`

## References

- CIS Controls
- OWASP API Security Top 10
