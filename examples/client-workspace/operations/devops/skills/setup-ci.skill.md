# Setup CI

## Purpose

Define build, test and validation automation before PRs are considered merge-ready.

## Use When

- CI checks are missing
- PR validation needs automation
- branch protection or required checks need planning

## Required Context

- Repository structure
- Build command
- Test command
- PR validation rules
- Branch rules

## Inputs

- Build command
- Test command
- Lint/static checks
- Required PR checks
- Failure handling

## Process

1. Identify available scripts
2. Define minimum required checks
3. Separate validation from deployment
4. Document failure behavior
5. Ask before changing workflow files

## Checks

- CI does not deploy automatically by default
- Required checks match project maturity
- Failures block unsafe merges

## Output

- CI readiness
- Required checks
- Workflow gaps
- Branch protection notes
- Next action

## Files to Update

- Update `../knowledge/ci-cd.md` after confirmation.
- Update `.github/workflows/*` only after explicit user confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
