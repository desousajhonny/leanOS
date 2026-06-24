# /github-sync

## Purpose

Prepare a safe dry-run sync from local LeanOS Epics and Features to GitHub.

Use this command when the founder asks to sync local LeanOS Epics and Features to GitHub issues or GitHub Projects.

This command always starts with GitHub readiness. It prepares setup guidance, a sync plan and a dry-run payload. It does not authorize the model to call GitHub APIs directly.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/product-ops/AGENT.md`
- `../../operations/product-ops/knowledge/work-taxonomy.md`
- `../../operations/product-ops/knowledge/ready-to-develop.md`
- `../../operations/product-ops/epics/README.md`
- `../../operations/devops/AGENT.md`
- `../../operations/devops/knowledge/github-management.md`
- `../../operations/devops/roles/github-devops.role.md`
- `../../operations/devops/skills/configure-github-project.skill.md`
- `../../operations/devops/playbooks/configure-github-project.playbook.md`
- `../../.github/leanos/work-mapping.md`
- `../../.github/leanos/project-sync.yaml`
- `../../.github/leanos/sync-state.yaml`
- `../../.github/leanos/labels.yaml`
- `../../.github/ISSUE_TEMPLATE/epic.yml`
- `../../.github/ISSUE_TEMPLATE/feature.yml`

## Area Routing

- Load `../../operations/product-ops/AGENT.md`, `../../operations/product-ops/knowledge/work-taxonomy.md` and `../../operations/product-ops/epics/README.md` before reading local Epics and Features.
- Load `../../operations/devops/AGENT.md`, `../../operations/devops/roles/github-devops.role.md`, `../../operations/devops/skills/configure-github-project.skill.md` and `../../operations/devops/playbooks/configure-github-project.playbook.md` before preparing GitHub sync.

## Process

1. Run the GitHub readiness check.
2. If readiness is incomplete, stop sync and guide setup through DevOps.
3. If readiness passes, prepare a dry-run sync from local Epics and Features.
4. Ask for explicit founder confirmation before any remote write.
5. Hand the approved payload to a future CLI/script/capability.
6. Update sync state only after the capability reports successful remote writes.

## Phase 1: GitHub Readiness Check

Start here before reading Epics for sync.

Check:

1. `../../.github/leanos/project-sync.yaml` exists.
2. `project-sync.yaml` has owner, repository, project type and project URL or number filled in.
3. `../../.github/leanos/sync-state.yaml` exists.
4. `../../.github/leanos/work-mapping.md` exists and explains Epic -> Feature -> Task mapping.
5. `../../.github/leanos/labels.yaml` declares labels `leanos`, `epic` and `feature`.
6. GitHub issue templates exist:
   - `../../.github/ISSUE_TEMPLATE/epic.yml`
   - `../../.github/ISSUE_TEMPLATE/feature.yml`
7. AI Standard GitHub templates exist:
   - `../../ai-standard/templates/github/github-epic-template.md`
   - `../../ai-standard/templates/github/github-feature-template.md`
8. Token source is configured as one of:
   - `LEANOS_GITHUB_TOKEN`
   - `GITHUB_TOKEN`
   - `GH_TOKEN`
   - authenticated GitHub CLI
9. If `../../.env.local` exists, check only whether the expected variable names are present. Never print token values.
10. If a local tool-capable agent is available and the founder allows local checks, `gh auth status` may be used to validate GitHub CLI auth. Do not require terminal usage from the founder when chat guidance is enough.
11. For existing product repositories, confirm a Git remote is configured or ask the founder which GitHub repository should receive the sync.

## Phase 2: Setup Fallback

If readiness is incomplete, do not prepare a sync payload yet.

Instead:

1. Explain what is missing in founder-friendly language.
2. Route through DevOps:
   - `../../operations/devops/AGENT.md`
   - `../../operations/devops/roles/github-devops.role.md`
   - `../../operations/devops/skills/configure-github-project.skill.md`
   - `../../operations/devops/playbooks/configure-github-project.playbook.md`
3. Ask guided questions for missing owner, repository, project URL/number, project type, labels, fields and token source.
4. Propose updates before writing to:
   - `../../operations/devops/knowledge/github-management.md`
   - `../../.github/leanos/project-sync.yaml`
   - `../../.github/leanos/labels.yaml`
5. Never ask the founder to paste a token into chat or into a tracked file.
6. Tell the founder to store real tokens only in local environment variables, secure prompts, keychain, GitHub CLI auth or untracked local env files.
7. Stop after setup guidance unless the founder confirms the readiness updates and asks to continue to dry-run sync.

## Phase 3: Dry-Run Sync Process

Only run this phase after readiness passes.

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

## Phase 4: Confirmation Rule

Before any remote write, ask the founder to confirm:

- target owner and repository;
- GitHub Project URL or number;
- Epics to create or update;
- Features to create or update;
- milestones to create or update;
- labels and Project fields to apply;
- conflicts and skipped items;
- files that would be updated after successful sync.

If the founder does not confirm, stop after reporting the dry-run.

## Phase 5: Capability Handoff

The model must not perform the GitHub write itself.

After confirmation, hand the approved payload to a future CLI/script/capability that can:

- create or update milestones;
- create or update labels;
- create or update Epic issues;
- create or update Feature issues;
- add issues to GitHub Project;
- fill Project fields;
- return GitHub IDs, issue numbers, Project item IDs, timestamps and conflicts.

Only after that external capability reports success should LeanOS propose updating `../../.github/leanos/sync-state.yaml`.

## Allowed Updates

Only after explicit founder confirmation, update setup files:

- `../../operations/devops/knowledge/github-management.md`
- `../../.github/leanos/project-sync.yaml`
- `../../.github/leanos/labels.yaml`

Only after a future tool/script reports successful remote writes, and only after confirmation, update:

- `../../.github/leanos/sync-state.yaml`

`sync-state.yaml` may store GitHub issue numbers, IDs, project item IDs, timestamps and conflict state. It must never store tokens, secrets or credentials.

## Forbidden Updates

During `/github-sync`, do not:

- call GitHub API directly from model reasoning;
- assume GitHub is ready before Phase 1 passes;
- write tokens, secrets or credentials to any tracked file;
- ask the founder to paste a token into chat;
- create GitHub issues for raw ideas, backlog notes or unsplit Epics;
- create one GitHub issue per Task by default;
- treat `synced` as product readiness;
- start implementation from sync alone;
- overwrite local or remote state when there is a conflict.

## Output

Return:

- GitHub configuration status
- Token-source status without exposing token values
- GitHub CLI/auth status when checked
- Missing setup steps
- Founder-friendly setup guidance when readiness is incomplete
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
