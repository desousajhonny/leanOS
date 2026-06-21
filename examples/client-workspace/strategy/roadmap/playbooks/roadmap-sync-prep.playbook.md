# Roadmap Sync Prep

## Purpose

Prepare roadmap items for GitHub Project sync without calling the API directly.

## Inputs

- Roadmap
- Milestones
- Current cycle
- Backlog
- MVP scope
- GitHub project sync settings

## Process

1. Read roadmap and milestones
2. Identify candidate epics
3. Check MVP and validation linkage
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

- Update `../roadmap.md`, `../milestones.md` or `../current-cycle.md` only after explicit confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only through DevOps/GitHub setup guidance.

## Navigation

Start from `../README.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
