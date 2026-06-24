# /workon feature

## Purpose

Plan Feature delivery before implementation.

Use this command to start Feature delivery from a local Feature or mapped GitHub Feature issue.

This command must route through `feature-to-delivery-cycle` before Engineering implementation assets. A GitHub issue number alone is not enough to start coding.

## Load First

Read:

- `../../AGENT.md`
- `../index/routing-map.yaml`
- `../../operations/AGENT.md`
- `../../operations/workflows/feature-to-delivery-cycle.workflow.md`
- `../../operations/product-ops/AGENT.md`
- `../../operations/product-ops/knowledge/work-taxonomy.md`
- `../../operations/product-ops/knowledge/ready-to-develop.md`
- `../../operations/product-ops/epics/README.md`
- `../../operations/engineering/AGENT.md`
- `../../operations/engineering/README.md`
- `../../operations/engineering/roles/senior-developer.role.md`
- `../../operations/engineering/knowledge/implementation-rules.md`
- `../../operations/engineering/knowledge/code-standards.md`
- `../../operations/engineering/knowledge/testing-strategy.md`
- `../../operations/engineering/skills/plan-implementation.skill.md`
- `../../operations/engineering/skills/create-branch.skill.md`
- `../../operations/engineering/skills/follow-code-standards.skill.md`
- `../../operations/engineering/playbooks/prepare-pr.playbook.md`
- `../../ai-standard/templates/github/delivery-readiness-matrix-template.md`
- `../../.github/leanos/branch-rules.md`

If `operations.engineering` is not active, do not load missing paths. Ask whether to activate or create Engineering before planning implementation.

## Navigation Route

1. `../../AGENT.md`
2. `../../operations/AGENT.md`
3. `../../operations/workflows/feature-to-delivery-cycle.workflow.md`
4. `../../operations/product-ops/AGENT.md`
5. `../../operations/product-ops/knowledge/ready-to-develop.md`
6. `../../operations/design/AGENT.md when UI, flow, accessibility, copy or component readiness is needed`
7. `../../operations/security/AGENT.md when security risk is involved`
8. `../../operations/devops/AGENT.md when delivery infrastructure is involved`
9. `../../operations/engineering/AGENT.md`
10. `../../operations/engineering/roles/senior-developer.role.md`
11. `../../operations/engineering/playbooks/engineering-delivery.playbook.md`

## Process

1. Read or request the full local Feature or mapped GitHub Feature issue body.
2. Summarize the Feature in the chat and ask the founder to confirm the interpretation.
3. Load `../../operations/workflows/feature-to-delivery-cycle.workflow.md` before Engineering execution assets.
4. Check Product Ops and Engineering readiness with the Delivery Readiness Matrix (DRM).
5. Check Design only when UX, UI, flow, accessibility, copy or interaction is affected.
6. Check Security only when data, auth, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
7. Check DevOps only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.
8. Stop before code if Feature readiness is missing.
9. Propose the required Feature-linked branch name before code changes.
10. Produce an implementation plan and test plan.
11. Ask for confirmation before modifying product code.

## Allowed Updates

None by default.

`/workon feature` plans implementation. Product code, tests, branch creation and PR work require explicit founder confirmation and should proceed through `feature-to-delivery-cycle` and Engineering assets.

## Forbidden Updates

During `/workon feature`, do not:

- edit source code before readiness and branch confirmation;
- create branches, commits or PRs without explicit confirmation;
- skip Product Ops, Design, Security or DevOps readiness when applicable;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`;
- treat a GitHub issue number as proof that the Feature is ready to develop.

## Confirmation Rule

Ask the founder to confirm the Feature interpretation, readiness summary, branch name and implementation plan before editing code.

## Expected Output

- Feature summary
- Readiness gaps
- Branch name proposal
- Implementation plan
- Test plan
- Likely files to change
- Risks
- Confirmation question before code changes

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
