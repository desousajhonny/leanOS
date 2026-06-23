# Access Control

## Purpose

Define authentication, authorization, ownership and admin access expectations.

## What to Document

- Roles and permissions.
- Tenant/user ownership rules.
- Admin access rules.
- Protected server-side checks.
- Audit expectations.

## Required Checks

- Every private endpoint has server-side auth and authorization.
- Every user-owned or tenant-owned object validates ownership server-side.
- Admin access has RBAC, MFA when available and audit trail.
- Client-provided identity fields are ignored for authorization decisions.

## Red Lines

- Never trust userId, tenantId, role or isAdmin from the client.
- No private endpoint without server-side authorization.
- No admin route without explicit RBAC and audit trail.
- No broad service account for user-level actions.

## Related Playbooks

- `../playbooks/pre-mvp-security-checklist.playbook.md`
- `../playbooks/pre-deploy-security-review.playbook.md`

## References

- OWASP Top 10 - Broken Access Control
- OWASP ASVS
