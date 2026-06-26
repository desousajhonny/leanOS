# Templates

## Purpose

Reusable starting structures for LeanOS framework assets and GitHub collaboration artifacts.

## When to Use

Use after selecting the asset type with `../foundation/asset-taxonomy.md` and before drafting a new file.

Templates are starting structures. They are not active workspace context and should not override the owning AGENT, role, skill, playbook or workflow.

## Categories

### `agents/`

Templates for root, department and area AGENT.md files.

Use when: Use when creating an operating owner or routing layer.

Files:
- `agents/agent-template.md`
- `agents/root-agent-template.md`
- `agents/department-agent-template.md`
- `agents/area-agent-template.md`

### `structure/`

Templates for folders, READMEs, departments, areas and YAML structure.

Use when: Use when creating or documenting workspace structure.

Files:
- `structure/root-readme-template.md`
- `structure/folder-readme-template.md`
- `structure/area-readme-template.md`
- `structure/department-template.md`
- `structure/department-template.yaml`
- `structure/area-template.md`
- `structure/area-template.yaml`

### `execution/`

Templates for area-level roles, skills, playbooks and workflows.

Use when: Use when creating operational execution assets inside an area or department workflow folder.

Files:
- `execution/role-template.md`
- `execution/role-template.yaml`
- `execution/skill-template.md`
- `execution/skill-template.yaml`
- `execution/playbook-template.md`
- `execution/playbook-template.yaml`
- `execution/workflow-template.md`

### `github/`

Templates for GitHub issues, epics, features, branch naming, PRs and readiness matrices.

Use when: Use when shaping GitHub-ready work items or repository collaboration artifacts.

Files:
- `github/github-issue-template.md`
- `github/github-epic-template.md`
- `github/github-feature-template.md`
- `github/delivery-readiness-matrix-template.md`
- `github/branch-name-template.md`
- `github/pull-request-template.md`

### `product/`

Templates for local LeanOS product work before optional GitHub sync.

Use when: Use when shaping local epics and features from delivery scope.

Files:
- `product/epic-template.md`
- `product/feature-template.md`

### `design/`

Templates for Design-owned specifications that hand off user-facing structure to Engineering.

Use when: Use when Design needs to document a component contract before implementation.

Files:
- `design/component-spec-template.md`

### `review/`

Templates for reviewing code, implementation and delivery quality.

Use when: Use when creating or applying review outputs.

Files:
- `review/code-review-template.md`

## How to Use

1. Confirm the asset type in `../foundation/asset-taxonomy.md`.
2. Load the matching creation instruction from `../instructions/`.
3. Open only the smallest matching template category.
4. Copy the matching template shape.
5. Adapt it to the active department or area.
6. Validate with the matching checklist in `../checklists/`.

## Red Lines

- Do not load every template by default.
- Do not use a GitHub template for a LeanOS framework asset.
- Do not use an execution template for folder documentation.
- Do not use examples as templates when a real template exists.
