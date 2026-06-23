# Infra Hardening Review

## Purpose

Review infrastructure exposure, CORS, rate limits, service accounts and deploy permissions.

## Use When

- hosting/deploy settings change
- CORS or rate limit policy changes
- service account changes
- CI/CD permissions change

## Required Context

- Infra hardening knowledge
- DevOps deployment readiness
- Environment plan
- Security baseline

## Inputs

- Deployment target
- Public endpoints
- CORS policy
- Rate limits
- Service accounts
- CI/CD permissions

## Process

1. Check public exposure
2. Check CORS justification
3. Check sensitive API rate limits
4. Check least privilege
5. Check deploy/rollback controls

## Checks

- No public admin path
- No open CORS without reason
- No over-permissive service account
- No deploy without rollback

## Output

- Infrastructure security result
- Deployment blockers
- Required fixes
- Residual risks

## Files to Update

- Update `../knowledge/infra-hardening.md` after explicit confirmation.

## Red Lines

- Do not approve over-permissive service accounts.
- Do not approve production deploy without backup and rollback path.
