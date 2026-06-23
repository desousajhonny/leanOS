# Access Control Review

## Purpose

Review server-side authentication, authorization, ownership and admin access.

## Use When

- private endpoints are involved
- user-owned or tenant-owned objects are accessed
- admin access or roles change

## Required Context

- Security baseline
- Access-control knowledge
- Relevant endpoint or data model
- User/tenant ownership rules

## Inputs

- Endpoint/action
- Actor
- Object ownership
- Roles/permissions
- Admin path

## Process

1. Identify actor and object
2. Check server-side authentication
3. Check server-side authorization
4. Check ownership/tenant isolation
5. Check admin audit expectations

## Checks

- No trust in client userId/tenantId/role/isAdmin
- Ownership is validated server-side
- Admin access has RBAC and audit trail

## Output

- Access-control decision
- Missing checks
- Required fixes
- Residual risk

## Files to Update

- Update `../knowledge/access-control.md` after explicit confirmation.

## Red Lines

- No private endpoint without server-side authentication and authorization.
- Never trust userId, tenantId, role or isAdmin from the client.
