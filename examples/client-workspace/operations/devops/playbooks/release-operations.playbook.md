# Release Operations

## Purpose

Prepare a release-ready operational path.

## Inputs

- Release scope
- CI/CD readiness
- Environment plan
- Deployment plan
- Observability plan
- Skill: prepare-release

## Process

1. Read DevOps AGENT and choose Release Manager
2. Read `knowledge/release-notes.md`, `knowledge/ci-cd.md`, `knowledge/deployment-readiness.md` and `knowledge/observability.md`
3. Use `skills/prepare-release.skill.md` to summarize release scope and linked issues
4. Check CI/CD readiness
5. Confirm environment target
6. Review deployment path and rollback
7. Confirm observability and post-deploy checks
8. Summarize release readiness

## Output

- Release readiness
- Blocking risks
- Rollback notes
- Post-release checks
- Next action

## Files to Update

- Update `../knowledge/release-notes.md` after explicit confirmation.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
