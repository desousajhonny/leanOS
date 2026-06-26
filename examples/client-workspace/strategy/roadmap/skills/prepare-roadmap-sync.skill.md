# Prepare Roadmap Sync

## Purpose

Prepare roadmap epics, milestones and sync payload before GitHub Project updates.

## Use When

- roadmap should be prepared for GitHub
- milestones need project sync readiness
- epics need draft payloads

## Required Context

- ../knowledge/roadmap.md
- ../knowledge/milestones.md
- ../knowledge/current-cycle.md
- ../../product/knowledge/mvp-validation-scope.md
- ../../../.github/leanos/project-sync.yaml

## Inputs

- Roadmap
- Milestones
- Current cycle
- MVP Validation Scope
- GitHub project settings

## Process

1. Check GitHub readiness.
2. Map roadmap items to milestone candidates.
3. Identify epic candidates and request Product Ops activation when local delivery assets are missing.
4. Prepare dry-run sync payload.
5. Ask for confirmation before any remote write.

## Checks

- No GitHub token is stored in workspace files.
- Remote writes require dry-run and confirmation.
- Duplicate epic risk is visible.

## Output

- Sync readiness summary
- Milestone mapping
- Epic draft list
- Missing configuration

## Files to Update

- ../knowledge/roadmap.md
- ../knowledge/milestones.md
- ../knowledge/current-cycle.md
- ../../../.github/leanos/project-sync.yaml

## Red Lines

- Do not call GitHub API directly from the model.
- Do not store tokens.
- Do not create remote items without explicit confirmation.
