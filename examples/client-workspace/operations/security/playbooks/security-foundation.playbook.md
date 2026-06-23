# Security Foundation

## Purpose

Create or refresh the Security Starter Baseline for an MVP product.

## When to Use

- initial security setup
- new MVP scope
- before implementation starts on sensitive surfaces

## Before Acting

- `../AGENT.md`
- `../knowledge/security-baseline.md`
- `../knowledge/threat-model.md`
- `../knowledge/access-control.md`
- `../knowledge/data-protection.md`

## Inputs

- Product/MVP scope
- Data involved
- Auth model
- API/database surfaces
- Deployment target

## Steps

1. Load Security Lead and Security Reviewer
2. Review the security baseline red lines
3. Identify whether access control, data protection, database, secrets or infra knowledge needs update
4. Apply threat-modeling and access-control-review skills
5. Produce baseline gaps and required next actions

## Security Gate

- Block implementation when auth, data ownership or sensitive data handling is unknown.
- Block deploy planning when database exposure, backups or rollback are unknown.

## Output

- Security baseline summary
- Known gaps
- Required reviews
- Next safe action

## Files to Update

- Update `../knowledge/security-baseline.md`, `../knowledge/threat-model.md`, `../knowledge/access-control.md` or `../knowledge/data-protection.md` after explicit confirmation.

## Stop Conditions

- The request needs enterprise/compliance advice beyond MVP scope.
- The founder cannot confirm data/auth/ownership context.
- The model would need to invent product security facts.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
