# GitHub LeanOS

## Purpose

GitHub support files for LeanOS workflow conventions.

## When to Use

Use when configuring labels, GitHub Projects sync, branch rules, PR validation guidance or deploy readiness.

## Source of Truth

`project-sync.yaml`

## Files

- `github-settings.example.json`
- `project-sync.yaml`
- `sync-state.yaml`
- `labels.yaml`
- `branch-rules.md`
- `pr-validation-rules.md`

## Related Folders

- `../ISSUE_TEMPLATE/`
- `../../operations/devops/`
- `../../operations/engineering/`

## Navigation

Use this README to choose the next specific file. Do not load unrelated files.

## Agent Notes

Route GitHub setup through `../../operations/devops/README.md` before configuring project sync.

Route GitHub and PR validation work through `../../operations/engineering/README.md` before changing GitHub workflow files.

Vercel readiness is guidance-only in this scaffold. Vercel can detect frameworks automatically after product code exists; create `vercel.json` only when a real app/framework needs overrides.
