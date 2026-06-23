# Incident Response

## Purpose

Guide lightweight response for leaks, vulnerabilities, abuse, outages and production security regressions.

## Use When

- secret leak
- critical vulnerability
- security incident
- production abuse or suspicious behavior

## Required Context

- Incident response knowledge
- Affected system
- Evidence available
- Severity and blast radius

## Inputs

- Incident type
- Timeline
- Affected data/users
- Current containment
- Owner

## Process

1. Classify severity
2. Contain or pause risky activity
3. Rotate secrets when needed
4. Collect evidence
5. Define fix and verification
6. Record follow-up

## Checks

- Containment is clear
- Secrets are rotated if leaked
- Customer/user impact is considered
- Resolution has verification

## Output

- Incident summary
- Containment action
- Recovery steps
- Follow-up

## Files to Update

- Update `../knowledge/incident-response.md` after explicit confirmation.

## Red Lines

- Do not hide security incidents.
- Do not continue deploy when containment is unclear.
- Do not claim resolution without verification.
