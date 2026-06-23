# Setup CI/CD

## Purpose

Plan build, test and release automation for the workspace.

## Inputs

- Repository structure
- Build command
- Test command
- Deployment target
- Required validation gates
- Skill: setup-ci

## Process

1. Read DevOps AGENT and choose DevOps Engineer
2. Read `knowledge/ci-cd.md` and `.github/leanos/pr-validation-rules.md`
3. Use `skills/setup-ci.skill.md` to identify build, test and validation gates
4. Separate validation workflows from deployment automation
5. Document secrets or environment needs without storing values
6. Define failure handling and ask before changing workflow files

## Output

- CI/CD readiness
- Required checks
- Automation gaps
- Next action

## Files to Update

- Update `../knowledge/ci-cd.md` after confirmation.
- Update `.github/workflows/*` only after explicit user confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
