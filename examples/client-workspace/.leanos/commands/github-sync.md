# /github-sync

## Purpose

Prepare a safe dry-run sync from local LeanOS Epics and Features to GitHub.

Use this command when the founder asks to sync local LeanOS Epics and Features to GitHub issues or GitHub Projects.

This command prepares a sync plan and dry-run payload. It does not authorize the model to call GitHub APIs directly.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/product-ops/AGENT.md`
- `../../operations/product-ops/knowledge/work-taxonomy.md`
- `../../operations/product-ops/knowledge/ready-to-develop.md`
- `../../operations/product-ops/epics/README.md`
- `../../.github/leanos/work-mapping.md`
- `../../.github/leanos/project-sync.yaml`
- `../../.github/leanos/sync-state.yaml`
- `../../.github/leanos/labels.yaml`
- `../../.github/ISSUE_TEMPLATE/epic.yml`
- `../../.github/ISSUE_TEMPLATE/feature.yml`

## Area Routing

- Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/knowledge/work-taxonomy.md` and `../../operations/product-ops/epics/README.md` before reading local Epics and Features.
- Load `../../operations/devops/AGENT.md`, `../../operations/devops/roles/github-devops.role.md`, `../../operations/devops/skills/configure-github-project.skill.md` and `../../operations/devops/playbooks/configure-github-project.playbook.md` before preparing GitHub sync.

## Preflight

Before proposing any sync:

1. Confirm GitHub configuration exists in `../../.github/leanos/project-sync.yaml`.
2. Confirm the token source is an environment or secure prompt source; never ask the founder to paste tokens into tracked files.
3. Confirm labels `leanos`, `epic` and `feature` exist or will be created by a future script.
4. Read `../../.github/leanos/work-mapping.md` before mapping local files to remote issues.
5. If configuration is missing, stop and recommend GitHub setup through DevOps before sync.

## Process

1. Read `../../operations/product-ops/epics/`.
2. Identify local Epic folders and Feature files.
3. Ignore raw ideas, backlog notes, unsplit Epics and anything that does not follow Product Ops Epic/Feature structure.
4. Compare local Epics and Features with `../../.github/leanos/sync-state.yaml`.
5. Classify each item as `create`, `update`, `already_synced`, `conflict` or `skip`.
6. Map local Epics to GitHub issues with labels `leanos` and `epic`.
7. Map local Features to GitHub issues with labels `leanos` and `feature`.
8. Keep Feature Tasks as checklists inside the Feature issue by default.
9. Create separate Task issues only when a task needs separate ownership, review, deployment, security or external tracking.
10. Prepare a dry-run summary and draft payload.
11. Ask for explicit founder confirmation before any future GitHub API write.

## Allowed Updates

Only after a future tool/script reports successful remote writes, and only after confirmation, update:

- `../../.github/leanos/sync-state.yaml`

`sync-state.yaml` may store GitHub issue numbers, IDs, project item IDs, timestamps and conflict state. It must never store tokens, secrets or credentials.

## Forbidden Updates

During `/github-sync`, do not:

- call GitHub API directly from model reasoning;
- write tokens, secrets or credentials to any tracked file;
- create GitHub issues for raw ideas, backlog notes or unsplit Epics;
- create one GitHub issue per Task by default;
- treat `synced` as product readiness;
- start implementation from sync alone;
- overwrite local or remote state when there is a conflict.

## Output

Return:

- GitHub configuration status
- Token-source status without exposing token values
- Local Epics found
- Local Features found
- Items to create
- Items to update
- Items already synced
- Conflicts
- Skipped items and reasons
- Dry-run payload summary
- Files that would be updated after successful sync
- Confirmation question before any remote write

## Remote Write Rule

Do not call GitHub API directly from the model. Generate the dry-run payload and ask for explicit confirmation. A future CLI/script capability performs the actual GitHub write and returns results for `sync-state.yaml`.

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- operations.product-ops
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
