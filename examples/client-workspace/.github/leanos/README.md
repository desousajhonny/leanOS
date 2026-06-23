# GitHub LeanOS

## Purpose

GitHub support files for LeanOS workflow conventions.

## When to Use

Use when configuring labels, GitHub Projects sync, branch rules, PR validation guidance, security automation or deploy readiness.

## Source of Truth

`project-sync.yaml`

## Files

- `github-settings.example.json`
- `work-mapping.md`
- `project-sync.yaml`
- `sync-state.yaml`
- `labels.yaml`
- `branch-rules.md`
- `pr-validation-rules.md`
- `security-automation.md`

## Related Folders

- `../ISSUE_TEMPLATE/`
- `../../operations/devops/`
- `../../operations/engineering/`
- `../../operations/security/`

## Navigation

Use this README to choose the next specific file. Do not load unrelated files.

## Agent Notes

Route GitHub setup through `../../operations/devops/AGENT.md` before configuring project sync.

Route GitHub branch, PR and validation work through `../../operations/engineering/AGENT.md` before changing GitHub workflow files.

Route security automation readiness through `../../operations/security/AGENT.md` before adding scanner workflows or security gates.

Vercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create `vercel.json` only when a real app/framework needs overrides.
