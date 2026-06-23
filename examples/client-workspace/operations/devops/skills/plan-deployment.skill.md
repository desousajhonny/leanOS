# Plan Deployment

## Purpose

Plan safe release and rollback flow without creating provider state automatically.

## Use When

- deployment target is being discussed
- release readiness is unclear
- rollback or smoke checks are needed

## Required Context

- Product code/framework
- Environment plan
- CI/CD readiness
- Release scope
- Provider target when known

## Inputs

- Target environment
- Framework/app type
- Build/runtime config
- Release scope
- Rollback expectation

## Process

1. Confirm app/framework exists
2. Check Vercel/framework detection readiness
3. Identify required env vars
4. Define release gates
5. Define rollback and smoke checks

## Checks

- No `.vercel/` creation
- No automatic deploy
- No `vercel.json` unless overrides are required
- Rollback path is explicit

## Output

- Deployment readiness
- Release gates
- Rollback notes
- Smoke checks
- Provider notes

## Files to Update

- Update `../knowledge/deployment-readiness.md` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
