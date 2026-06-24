# /create features

## Purpose

Create local LeanOS Features from a confirmed Epic and prepare optional GitHub issue payloads.

Use this command to turn a confirmed local Epic into local LeanOS Features, or to route a roadmap/delivery item into the Epic-first flow before Feature creation.

This command must route through the local Operations workflows before roles, skills or playbooks. GitHub issue payloads are optional and come only after local Epic/Feature structure is clear.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/AGENT.md`
- `../../operations/workflows/roadmap-item-to-epic.workflow.md`
- `../../operations/workflows/epic-to-features.workflow.md`
- `../../operations/product-ops/AGENT.md`
- `../../operations/product-ops/knowledge/work-taxonomy.md`
- `../../operations/product-ops/epics/README.md`
- `../../strategy/roadmap/AGENT.md`
- `../../strategy/roadmap/knowledge/roadmap.md`
- `../../strategy/roadmap/knowledge/backlog.md`
- `../../ai-standard/templates/github/github-epic-template.md`
- `../../ai-standard/templates/github/github-feature-template.md`
- `../../ai-standard/templates/github/delivery-readiness-matrix-template.md`
- `../../.github/ISSUE_TEMPLATE/epic.yml`
- `../../.github/ISSUE_TEMPLATE/feature.yml`

## Navigation Route

1. `../../AGENT.md`
2. `../../operations/AGENT.md`
3. `../../operations/workflows/roadmap-item-to-epic.workflow.md` when starting from roadmap/backlog/delivery scope
4. `../../operations/workflows/epic-to-features.workflow.md` when starting from a confirmed local Epic
5. `../../operations/product-ops/AGENT.md`
6. `../../operations/product-ops/roles/product-owner.role.md`
7. `../../operations/product-ops/skills/shape-epic.skill.md` or `../../operations/product-ops/skills/write-feature-criteria.skill.md`
8. `../../operations/product-ops/playbooks/delivery-scope-planning.playbook.md` or `../../operations/product-ops/playbooks/epic-to-features.playbook.md`
9. Optional GitHub payload only after local Epic/Feature structure is clear and founder confirms

## Area Routing

- Load `../../strategy/product/README.md` for product value, ICP, problem and acceptance quality.
- Route through `../../operations/AGENT.md`, then load `../../operations/workflows/roadmap-item-to-epic.workflow.md` or `../../operations/workflows/epic-to-features.workflow.md` before Product Ops roles, skills or playbooks.
- Load `../../operations/engineering/AGENT.md` and `../../operations/engineering/README.md` when features require implementation criteria.
- Use `../../operations/design/AGENT.md` only when the epic or feature changes user-facing UX, screens, states, copy or interactions; use the README as the area map.
- Use `../../operations/security/AGENT.md` only when the Feature touches data, auth, permissions, privacy, abuse risk, compliance, API security, database security, secrets, infrastructure or AI-generated-code risk.
- Use `../../operations/devops/AGENT.md` only when the Feature touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.

## Process

1. Identify whether the founder is asking for roadmap item to Epic, Epic to Features, or optional GitHub issue payload.
2. If input is a roadmap/backlog/delivery item, load `../../operations/workflows/roadmap-item-to-epic.workflow.md` before Product Ops execution assets.
3. If input is a confirmed local Epic, load `../../operations/workflows/epic-to-features.workflow.md` before Product Ops execution assets.
4. If input is only a loose idea, stop and route to `../../strategy/workflows/new-idea-intake.workflow.md` or `../../strategy/workflows/idea-to-roadmap.workflow.md`.
5. Apply the Delivery Readiness Matrix (DRM) before drafting GitHub-ready work.
6. Use Product Ops criteria for every Epic and Feature.
7. Use Engineering criteria for implementation-ready Features.
8. Add Design criteria only when user-facing UX, UI, flow, accessibility, copy or interaction is affected.
9. Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
10. Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
11. Mark missing role input as an explicit gap; do not invent criteria.
12. Produce local drafts or a GitHub payload first and ask for confirmation before any future GitHub API write.

## Allowed Updates

None by default.

`/create features` may produce local Feature drafts or a future GitHub payload in chat. It must not write local Epic/Feature files or remote GitHub issues unless the founder confirms the proposed output and the next route.

## Forbidden Updates

During `/create features`, do not:

- create GitHub issues directly from model reasoning;
- call GitHub APIs;
- create branches, commits, PRs or code;
- create one issue per Task by default;
- write tokens, secrets or credentials;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`.

## Confirmation Rule

Ask for explicit founder confirmation before writing local files, generating an API-capable payload or asking a future capability/script to create remote GitHub items.

## Expected Output

- Epic draft or selected parent epic
- Proposed features
- Delivery Readiness Matrix (DRM)
- Product Ops criteria
- Design criteria or "not applicable" with reason
- Engineering criteria
- Security criteria or "not applicable" with reason
- DevOps criteria or "not applicable" with reason
- Dependencies and risks
- Source-of-truth files used
- Missing context
- Confirmation question before remote creation

## Remote Write Rule

Do not call GitHub API directly from the model. Generate a draft payload and ask for explicit confirmation. A future CLI/script capability performs the actual API write.

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
