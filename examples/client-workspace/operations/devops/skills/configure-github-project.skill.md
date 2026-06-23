# Configure GitHub Project

## Purpose

Guide GitHub repository, Project fields, labels and token source setup without storing secrets.

## Use When

- GitHub Project sync is requested
- repository/project mapping is unclear
- labels or milestones need setup
- a roadmap sync needs readiness checks

## Required Context

- GitHub LeanOS settings
- Project sync file
- Repository owner/name
- Token source
- Roadmap sync intent

## Inputs

- Owner or organization
- Repository
- Project URL or number
- Project fields
- Milestone approach
- Token source

## Process

1. Read `.github/leanos/github-settings.example.json`
2. Read `.github/leanos/project-sync.yaml`
3. Check `.github/leanos/labels.yaml`
4. Identify missing owner/repository/project fields
5. Confirm token source without storing secrets
6. Prepare dry-run sync readiness

## Checks

- No token stored in workspace
- Dry-run required before write
- Project fields are mapped
- Duplicate sync risk is visible

## Output

- GitHub readiness summary
- Missing configuration
- Proposed project-sync update
- Dry-run readiness
- Next action

## Files to Update

- Update `../knowledge/github-management.md` after confirmation.
- Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
