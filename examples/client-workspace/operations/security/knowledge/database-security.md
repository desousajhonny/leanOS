# Database Security

## Purpose

Define database access, query safety, isolation, backup and environment separation.

## What to Document

- Database provider and environment separation.
- Access roles and service accounts.
- Query and migration safety.
- Backup and rollback expectations.
- Tenant isolation model.

## Required Checks

- Production database is private.
- SQL/query construction is parameterized or uses safe ORM patterns.
- Service accounts have least privilege.
- Tenant isolation is tested or explicitly reviewed.
- Backup and rollback paths are known before production deploy.

## Red Lines

- No public production database.
- Never build SQL with string concatenation.
- No shared dev/staging/prod database.
- No over-permissive service account.
- No deploy touching data without backup and rollback plan.

## Related Playbooks

- `../playbooks/database-security-review.playbook.md`
- `../playbooks/pre-deploy-security-review.playbook.md`

## References

- OWASP Database Security Cheat Sheet
- CIS Controls
