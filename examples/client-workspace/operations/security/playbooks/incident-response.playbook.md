# Incident Response

## Purpose

Run a lightweight incident response path for leaks, abuse, outages or production security regressions.

## When to Use

- active security incident
- suspected leak
- abuse or suspicious behavior
- production security regression

## Before Acting

- `../AGENT.md`
- `../knowledge/incident-response.md`
- `../knowledge/security-baseline.md`
- `../knowledge/secrets-management.md`

## Inputs

- Incident summary
- Affected users/data
- Timeline
- Evidence
- Current containment
- Owner

## Steps

1. Load Security Lead
2. Classify severity
3. Contain or pause risky activity
4. Rotate secrets when needed
5. Preserve useful evidence
6. Define recovery and verification
7. Capture follow-up

## Security Gate

- Do not continue deployment when containment is unclear.
- Rotate exposed secrets.
- Escalate if sensitive customer data exposure is possible.

## Output

- Incident response summary
- Containment steps
- Recovery plan
- Verification plan
- Follow-up

## Files to Update

- Update `../knowledge/incident-response.md` after explicit confirmation.

## Stop Conditions

- The user asks to delete evidence.
- Sensitive data exposure requires legal/compliance advice beyond MVP scope.
- Containment cannot be confirmed.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
