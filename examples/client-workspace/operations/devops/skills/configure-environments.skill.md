# Configure Environments

## Purpose

Define local, preview/staging and production boundaries without inventing infrastructure.

## Use When

- environment variables are needed
- preview or production behavior is unclear
- secrets or integrations need boundaries

## Required Context

- Product stage
- Runtime needs
- Deployment target
- Secrets/integrations
- Access expectations

## Inputs

- Environment names
- Runtime variables
- Secret sources
- Access levels
- Preview/production expectations

## Process

1. Separate local, preview/staging and production
2. Classify config vs secret values
3. Identify access owners
4. List missing environment decisions
5. Document open questions

## Checks

- Secrets are not written into markdown
- Production access is explicit
- Preview and production are not confused

## Output

- Environment map
- Config needs
- Secret handling guidance
- Access risks
- Open questions

## Files to Update

- Update `../knowledge/environments.md` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
