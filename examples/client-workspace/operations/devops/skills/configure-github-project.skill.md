# Configure GitHub Project

## Purpose

Guide GitHub repository, Project fields, labels and token source setup without storing secrets.

## Use When

- GitHub Project sync is requested
- repository/project mapping is unclear
- labels or milestones need setup
- a roadmap sync needs readiness checks

## Required Context

- DevOps AGENT
- GitHub setup guide
- GitHub capability contract
- GitHub management knowledge
- Project sync file
- Labels file
- Sync state file
- Repository owner/name
- Token source
- Roadmap or Epic/Feature sync intent

## Inputs

- Owner or organization
- Repository
- Project type
- Project URL or number
- Project fields
- Labels
- Milestone approach
- Token source
- Optional GitHub CLI auth status

## Process

1. Load `.github/leanos/setup-guide.md` before asking setup questions
2. Load `.github/leanos/capability-contract.md` before describing remote execution
3. Check `project-sync.yaml` for TODO owner/repository/project values
4. Check `labels.yaml` for minimum labels
5. Check `sync-state.yaml` exists and contains no secrets
6. Separate setup local, token readiness, Project readiness, labels/milestones readiness and dry-run readiness
7. Confirm token source without asking for token values
8. Prepare a readiness summary and proposed updates before writing

## Checks

- No token stored in workspace
- Founder never pastes token into chat
- Owner and repository are known
- Project type and URL or number are known
- Project fields are mapped
- Labels and milestones are declared or planned
- Dry-run required before write
- Duplicate sync risk is visible

## Output

- GitHub readiness summary
- Missing configuration
- Founder-friendly setup guidance
- Proposed project-sync update
- Token-source guidance
- Dry-run readiness
- Next action for /github-sync

## Files to Update

- Update `../knowledge/github-management.md` after confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.
- Update `../../../.github/leanos/labels.yaml` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
