# API Security Review

## Purpose

Review an API endpoint or API change before implementation, PR or deploy.

## When to Use

- API endpoint changes
- auth-protected route changes
- public API behavior changes
- login or sensitive API work

## Before Acting

- `../AGENT.md`
- `../knowledge/threat-model.md`
- `../knowledge/access-control.md`
- `../knowledge/infra-hardening.md`

## Inputs

- Endpoint
- Auth model
- Inputs/outputs
- Data sensitivity
- Rate limit/CORS expectations

## Steps

1. Load Application Security Engineer
2. Use api-security-review skill
3. Check auth/authorization
4. Check input validation and output leakage
5. Check CORS and rate limits
6. List fixes and not-applicable criteria

## Security Gate

- Block missing server-side authorization.
- Block sensitive API without rate limit.
- Block open CORS without justification.
- Block sensitive data leakage in response/errors/logs.

## Output

- API security result
- Required fixes
- Security criteria for issue/PR
- Safe-to-continue decision

## Files to Update

- Update `../knowledge/access-control.md`, `../knowledge/threat-model.md` or `../knowledge/infra-hardening.md` after explicit confirmation.

## Stop Conditions

- Endpoint ownership model is unknown.
- Auth model is undefined.
- Sensitive response shape is unclear.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
