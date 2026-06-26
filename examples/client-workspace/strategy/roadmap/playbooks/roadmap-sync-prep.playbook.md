# Roadmap Sync Prep

## Purpose

Prepare roadmap items for GitHub Project sync without calling the API directly.

## Inputs

- ../knowledge/roadmap.md
- ../knowledge/milestones.md
- ../knowledge/current-cycle.md
- ../knowledge/backlog.md
- ../../product/knowledge/mvp-validation-scope.md
- ../../../.github/leanos/project-sync.yaml

## Process

1. Read roadmap and milestones
2. Identify candidate epics and Product Ops activation needs
3. Check MVP Validation Scope and validation linkage
4. Ask DevOps to confirm GitHub project settings when needed
5. Prepare sync payload
6. Ask for confirmation before any remote write

## Output

- Roadmap sync summary
- Milestone mapping
- Epic draft list
- Missing GitHub configuration
- Confirmation question before API execution

## Files to Update

- Update `../knowledge/roadmap.md`, `../knowledge/milestones.md` or `../knowledge/current-cycle.md` only after explicit confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only through DevOps/GitHub setup guidance.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
