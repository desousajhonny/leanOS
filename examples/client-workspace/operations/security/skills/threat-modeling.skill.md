# Threat Modeling

## Purpose

Identify assets, actors, trust boundaries, likely abuse cases and mitigations.

## Use When

- a feature touches data/auth/API/admin surfaces
- risk is unclear
- MVP scope needs security baseline

## Required Context

- Security baseline
- Feature or system scope
- Data flows
- Auth and access expectations

## Inputs

- Assets
- Actors
- Trust boundaries
- Sensitive data
- Endpoints/jobs
- Known assumptions

## Process

1. List protected assets
2. Identify actors and attackers
3. Map trust boundaries
4. List likely abuse cases
5. Define mitigations and open risks

## Checks

- Auth and authorization boundaries are explicit
- Sensitive data flows are visible
- Open risks have stop conditions

## Output

- Threat model summary
- Risk list
- Mitigations
- Open questions

## Files to Update

- Update `../knowledge/threat-model.md` after explicit confirmation.

## Red Lines

- Do not assume client-side checks protect server resources.
- Do not mark risk resolved without mitigation or owner.
