# Prepare Release

## Purpose

Summarize release scope, readiness, risks, rollback and follow-up.

## Use When

- a release is being prepared
- a PR is ready for merge
- post-merge checks are needed
- release notes are requested

## Required Context

- Linked issues
- PR validation result
- CI/CD readiness
- Deployment readiness
- Observability baseline

## Inputs

- Release scope
- Linked issues
- Tests/CI
- Deployment target
- Risks
- Rollback

## Process

1. Summarize scope
2. Check CI/CD and deployment readiness
3. Check observability/post-deploy checks
4. List risks and rollback
5. Prepare follow-up notes

## Checks

- Release does not hide known risk
- Rollback is explicit
- Post-release checks are visible

## Output

- Release notes
- Readiness summary
- Risks
- Rollback notes
- Post-release checklist

## Files to Update

- Update `../knowledge/release-notes.md` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
