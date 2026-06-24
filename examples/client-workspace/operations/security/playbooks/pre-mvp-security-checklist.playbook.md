# Pre-MVP Security Checklist

## Purpose

Run a lightweight security checklist before MVP implementation or issue breakdown.

## When to Use

- before `/define-mvp` output becomes implementation work
- before creating implementation-ready issues
- when Product Ops asks for security criteria

## Before Acting

- `../AGENT.md`
- `../knowledge/security-baseline.md`
- `../knowledge/threat-model.md`
- `../knowledge/access-control.md`
- `../knowledge/data-protection.md`

## Inputs

- MVP scope
- PRD
- User stories
- Acceptance criteria
- Known sensitive data
- Auth expectations

## Steps

1. Load Security Reviewer
2. Check baseline red lines
3. Review access-control needs
4. Review data-protection needs
5. Review database and API risk if present
6. List security acceptance criteria for Product Ops or Engineering

## Security Gate

- Stop if MVP includes private data but no server-side authorization criteria.
- Stop if sensitive data appears in logs/events/analytics requirements.
- Stop if tenant isolation is required but undefined.

## Output

- Security checklist result
- Security acceptance criteria
- Required Product Ops/Engineering follow-up
- Blocked or safe-to-continue decision

## Files to Update

- Update `../knowledge/security-baseline.md`, `../knowledge/threat-model.md`, `../knowledge/access-control.md`, `../knowledge/data-protection.md` or `../knowledge/database-security.md` after explicit confirmation.

## Stop Conditions

- MVP scope is unclear.
- Auth/data assumptions are missing.
- Required security criteria cannot be derived without founder confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
