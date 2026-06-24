# GitHub Management

## Purpose

Define the GitHub repository, Project, labels, milestones and sync readiness without storing secrets in the workspace.

## Current State

GitHub setup is not confirmed yet. Use Setup Status and the Readiness Checklist before running `/github-sync` dry-run.

## Setup Status

- GitHub management: not configured
- GitHub owner/repository: TBD
- GitHub Project: TBD
- Token source: TBD
- GitHub CLI status: unknown
- Ready for dry-run sync: no

## Repository

- Owner or organization: TBD
- Repository: TBD
- Remote URL: TBD
- Existing repo or new repo: TBD
- Notes: TBD

## GitHub Project

- Type: user | organization | TBD
- URL: TBD
- Number: TBD
- Purpose: track LeanOS Epics and Features selected for delivery.

## Project Fields

| LeanOS field | GitHub Project field | Status | Notes |
| --- | --- | --- | --- |
| Status | Status | TBD |  |
| Priority | Priority | TBD |  |
| Size | Size | TBD |  |
| Area | Area | TBD |  |
| Roadmap Item | Roadmap Item | TBD |  |
| Epic | Epic | TBD |  |

## Labels

Minimum labels:

- `leanos`
- `epic`
- `feature`

Optional labels:

- `task`
- `mvp`
- `strategy`
- `design`
- `security`
- `devops`

## Milestones

- Source: `../../../strategy/roadmap/knowledge/milestones.md`
- GitHub milestone strategy: TBD
- Duplicate prevention rule: check existing milestones before proposing creation.

## Token Source

- Never store token values in this file.
- Accepted sources: `LEANOS_GITHUB_TOKEN`, `GITHUB_TOKEN`, `GH_TOKEN`, GitHub CLI auth, secure prompt or keychain.
- Recommended rule: use the smallest scope that can access the selected repository and Project.
- Current selected source: TBD

## Setup Questions

Use these questions when configuration is missing:

1. Which GitHub owner or organization should LeanOS use?
2. Which repository should receive Epics and Features?
3. Is the GitHub Project owned by a user or organization?
4. What is the GitHub Project URL or number?
5. Do the default fields match your Project, or should LeanOS map to different field names?
6. Should LeanOS create missing labels/milestones in a future sync capability, or only report them?
7. Which token source will be used locally?

## Readiness Checklist

- [ ] Owner and repository are known.
- [ ] Project type and URL or number are known.
- [ ] Project fields are mapped.
- [ ] Labels are declared.
- [ ] Milestone strategy is clear.
- [ ] Token source is known without exposing token value.
- [ ] `../../../.github/leanos/project-sync.yaml` matches the confirmed setup.
- [ ] `../../../.github/leanos/sync-state.yaml` exists and contains no secrets.
- [ ] `/github-sync` can run dry-run before any remote write.

## Dry Run

Record the latest dry-run summary here only when useful:

- Last dry-run date: TBD
- Epics to create/update: TBD
- Features to create/update: TBD
- Milestones to create/update: TBD
- Conflicts: TBD
- Founder decision: TBD

## Risks

- Token pasted into chat or tracked file.
- Project fields differ from LeanOS defaults.
- Duplicate milestones, Epics or Features.
- Local Epic/Feature differs from existing GitHub issue.
- GitHub appears ready but Product Ops work is not ready for sync.

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
