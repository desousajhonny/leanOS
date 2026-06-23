# Secrets Management

## Purpose

Review secret storage, token handling, rotation and leak response.

## Use When

- tokens or credentials are involved
- CI/CD secrets change
- secret leak is suspected
- integration credentials are added

## Required Context

- Secrets management knowledge
- DevOps environment knowledge
- GitHub settings when applicable

## Inputs

- Secret type
- Storage location
- Access owner
- Rotation trigger
- CI/CD usage

## Process

1. Classify secret
2. Check storage location
3. Check least privilege
4. Define rotation path
5. Define leak response

## Checks

- No secret in tracked file
- No token in chat/logs/screenshots
- Secret source is secure
- Rotation path is clear

## Output

- Secret handling guidance
- Rotation steps
- Access risks
- Files not to update

## Files to Update

- Update `../knowledge/secrets-management.md` after explicit confirmation.

## Red Lines

- No secrets in Git, logs, prompts, screenshots or tracked files.
- Do not ask the user to paste token values into chat or markdown.
