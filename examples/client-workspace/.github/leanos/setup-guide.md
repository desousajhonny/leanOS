# GitHub Setup Guide

## Purpose

Guide the founder through GitHub setup before GitHub Epics/Features sync creates a dry-run payload.

This guide is for setup and readiness only. It does not authorize remote writes by itself.

## What LeanOS Needs

To sync local Epics and Features to GitHub, LeanOS needs:

- GitHub owner or organization;
- repository name;
- GitHub Project type and URL or number;
- expected Project fields;
- labels for LeanOS work;
- token source or GitHub CLI auth;
- sync state file with no secrets.

## Owner And Repository

Ask the founder which GitHub repository should receive LeanOS work.

Examples:

```text
owner: acme-labs
repository: customer-portal
```

How to find it:

- In a GitHub URL like `https://github.com/acme-labs/customer-portal`, owner is `acme-labs` and repository is `customer-portal`.
- In an existing local repo, `git remote -v` can reveal the GitHub URL.
- If no repo exists yet, stop sync and ask the founder whether GitHub should be configured now or later.

## GitHub Project

Ask whether the Project belongs to a user or organization.

Examples:

```text
organization project: https://github.com/orgs/acme-labs/projects/12
user project: https://github.com/users/jhonny/projects/3
```

Record:

- `project.type`: `organization` or `user`;
- `project.number`: the number at the end of the Project URL;
- `project.url`: the full Project URL.

## Project Fields

Start with these expected fields:

- Status
- Priority
- Size
- Area
- Roadmap Item
- Epic

If the founder uses different field names, record the mapping in `project-sync.yaml`.

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

## Token Source

Do not ask the founder to paste a token into chat or markdown.

Accepted token sources:

- `LEANOS_GITHUB_TOKEN`
- `GITHUB_TOKEN`
- `GH_TOKEN`
- GitHub CLI authenticated with `gh auth login`
- secure prompt or system keychain in a future capability

Use the smallest scope that can access the selected repository and Project. GitHub Projects can require Project permissions in addition to issue permissions.

## Optional GitHub CLI Check

When a local tool-capable agent can run commands and the founder allows it:

```bash
gh auth status
gh repo view OWNER/REPOSITORY
```

Do not require terminal usage when chat guidance is enough.

## Setup Output

After setup, propose updates to:

- `operations/devops/knowledge/github-management.md`
- `.github/leanos/project-sync.yaml`
- `.github/leanos/labels.yaml`

Ask for confirmation before writing.

## Ready For Dry-Run

GitHub is ready for an Epics/Features sync dry-run when:

- owner and repository are known;
- Project URL or number is known;
- Project fields are mapped;
- labels are declared;
- token source is known without exposing token value;
- `sync-state.yaml` exists and contains no secrets;
- local Epics/Features exist or the founder confirms there is nothing to sync yet.

## Stop Conditions

- Token value is pasted into chat.
- Token would be written to a tracked file.
- Project owner/repository is unknown.
- Project fields are missing and the founder has not approved defaults.
- Local and remote work conflict and the founder has not chosen which side wins.
