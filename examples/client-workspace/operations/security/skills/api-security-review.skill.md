# API Security Review

## Purpose

Review APIs for auth, authorization, rate limits, validation, CORS and abuse resistance.

## Use When

- new or changed API endpoint
- login or sensitive API path
- public API surface
- CORS change

## Required Context

- Security baseline
- Threat model
- Access control
- API route/code or issue criteria

## Inputs

- Endpoint
- Auth model
- Inputs
- Data returned
- Rate-limit expectations
- CORS policy

## Process

1. Check auth and authorization
2. Check input validation
3. Check rate limits on sensitive paths
4. Check CORS justification
5. Check error/log leakage

## Checks

- No open CORS without justification
- No missing auth on private API
- No sensitive data in errors/logs
- Rate limit exists for login/sensitive APIs

## Output

- API security findings
- Blockers
- Required fixes
- Not-applicable notes

## Files to Update

- Update `../knowledge/threat-model.md` or `../knowledge/access-control.md` when new API risk is discovered.

## Red Lines

- Do not approve missing authorization.
- Do not approve open CORS without justification.
- Do not approve no rate limit on login or sensitive APIs.
