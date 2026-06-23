# GitHub Work Mapping

## Purpose

Define how LeanOS local product work maps to GitHub tracking.

This file is a sync contract. It does not make GitHub the source of truth, and it does not authorize remote writes by itself.

## Source Of Truth

LeanOS local files are the primary operational source:

- Product hierarchy: `../../operations/product-ops/knowledge/work-taxonomy.md`
- Local Epics and Features: `../../operations/product-ops/epics/`
- Epic template: `../../ai-standard/templates/product/epic-template.md`
- Feature template: `../../ai-standard/templates/product/feature-template.md`

GitHub is an optional remote tracking layer.

## Default Mapping

| Local LeanOS item | GitHub item | Required labels | Notes |
| --- | --- | --- | --- |
| Epic folder README | Issue | `leanos`, `epic` | One GitHub issue per local Epic. |
| Feature markdown file | Issue | `leanos`, `feature` | One GitHub issue per local Feature. |
| Feature Tasks | Checklist inside Feature issue | none by default | Tasks stay inside the Feature issue unless separate tracking is justified. |
| Exceptional Task | Issue | `leanos`, `task` | Use only for separate ownership, review, deployment, security or external dependency. |

## Title Conventions

Epic issue:

~~~text
[EPIC] Customer Management
~~~

Feature issue:

~~~text
[FEATURE: Customer Management] Create customer profile
~~~

Exceptional task issue:

~~~text
[TASK: Create customer profile] Add database migration
~~~

## Sync Metadata

Store remote IDs, issue numbers, project item IDs and conflict state in:

`sync-state.yaml`

Do not store tokens, secrets or personal credentials in sync state.

## Sync Location Decision

Do not create or depend on `operations/product-ops/epics/synced/` in the initial scaffold.

Keep local Epics and Features in `operations/product-ops/epics/` and use `sync-state.yaml` as the index for remote status.

Reason: synced work is still product context. Moving it to an archive folder can hide useful context from future planning and implementation flows.

## Required Sync Behavior

Use `/github-sync` as the chat intent for this flow.

Before creating or updating GitHub:

1. Read Product Ops work taxonomy.
2. Read the local Epic folder.
3. Read each Feature file being synced.
4. Compare local state with `sync-state.yaml`.
5. Prepare a dry-run summary.
6. Ask the founder for confirmation.
7. Only then call a future CLI/script capability for the remote write.

## Conflict Rule

If local and GitHub disagree, do not overwrite either side automatically.

Explain:

- what differs;
- which side is newer or more complete, if knowable;
- what would be changed;
- what the founder must confirm.

## Do Not Do

- Do not create GitHub issues for raw ideas, backlog notes or unsplit Epics.
- Do not create one GitHub issue per Task by default.
- Do not treat `synced` as product readiness.
- Do not start implementation from GitHub sync alone; the Feature must pass `ready-to-develop.md`.
- Do not call GitHub API directly from model reasoning.
