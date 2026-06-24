# /define-mvp

## Purpose

Define MVP scope with the LeanOS MVP decision gate.

Use this command when the founder asks to define the first version of the product, decide what enters the MVP or clarify what must stay out before delivery planning.

This command routes into the local Operations workflow. It does not create Epics, Features, GitHub issues, branches, PRs or code.

## Load First

Read:

- `../../AGENT.md`
- `../../leanos.yaml`
- `../agent/protocols/where-we-are.md`
- `../context/workspace-summary.md`
- `../context/current-focus.md`
- `../context/next-actions.md`
- `../index/routing-map.yaml`

Then load Strategy context:

- `../../strategy/AGENT.md`
- `../../strategy/product/AGENT.md`
- `../../strategy/product/knowledge/brief.md`
- `../../strategy/product/knowledge/problem.md`
- `../../strategy/product/knowledge/icp.md`
- `../../strategy/product/knowledge/value-proposition.md`
- `../../strategy/product/knowledge/business-model-canvas.md`

Roadmap context:

- `../../strategy/roadmap/AGENT.md`
- `../../strategy/roadmap/knowledge/backlog.md`
- `../../strategy/roadmap/knowledge/roadmap.md`
- `../../strategy/roadmap/knowledge/current-cycle.md`

Then load Product Ops:

- `../../operations/AGENT.md`
- `../../operations/workflows/define-mvp.workflow.md`
- `../../operations/product-ops/AGENT.md`
- `../../operations/product-ops/roles/product-owner.role.md`
- `../../operations/product-ops/knowledge/mvp-decision-gate.md`
- `../../operations/product-ops/skills/define-mvp.skill.md`
- `../../operations/product-ops/playbooks/mvp-delivery.playbook.md`
- `../../operations/product-ops/mvp/scope.md`
- `../../operations/product-ops/mvp/prd.md`
- `../../operations/product-ops/mvp/user-stories.md`
- `../../operations/product-ops/mvp/acceptance-criteria.md`
- `../../operations/product-ops/mvp/non-goals.md`

## Navigation Route

1. `../../AGENT.md`
2. `../../operations/AGENT.md`
3. `../../operations/workflows/define-mvp.workflow.md`
4. `../../operations/product-ops/AGENT.md`
5. `../../operations/product-ops/roles/product-owner.role.md`
6. `../../operations/product-ops/knowledge/mvp-decision-gate.md`
7. `../../operations/product-ops/skills/define-mvp.skill.md`
8. `../../operations/product-ops/playbooks/mvp-delivery.playbook.md`
9. Founder output and confirmed MVP file updates

## Process

1. Treat `/define-mvp` as the safe entrypoint for MVP scope definition.
2. Run the `where-we-are` protocol if the current product moment is unclear.
3. Load Strategy Product context before Product Ops decides scope.
4. Use `define-mvp.workflow.md` to preserve department-level ownership.
5. Use `mvp-decision-gate.md` to evaluate Value Risk, Usability Risk, Feasibility Risk and Business Viability Risk.
6. Use guided conversation only for missing information.
7. Separate what enters the MVP now, what stays for later, what needs discovery and what is not a fit now.
8. Explain the decision in founder-friendly language before naming file updates.
9. Propose updates and ask for explicit confirmation before writing.
10. Offer the next safe bridge only after the founder confirms the MVP scope.

## Allowed Updates

Only after explicit founder confirmation:

- `../../operations/product-ops/mvp/scope.md`
- `../../operations/product-ops/mvp/prd.md`
- `../../operations/product-ops/mvp/user-stories.md`
- `../../operations/product-ops/mvp/user-flows.md`
- `../../operations/product-ops/mvp/acceptance-criteria.md`
- `../../operations/product-ops/mvp/non-goals.md`
- `../../operations/product-ops/mvp/release-checklist.md`
- `../../operations/product-ops/knowledge/overview.md`
- `../../operations/product-ops/knowledge/delivery-scope.md`

## Forbidden Updates

During `/define-mvp`, do not:

- create or update local Epics or Features;
- create GitHub issues, GitHub Project items or GitHub payloads;
- create branches, commits, PRs or source code;
- modify Design component specs;
- modify roles, skills, playbooks, workflows, commands or `ai-standard/`;
- mark work as `ready-to-develop` before the Feature-level readiness gate runs later.

## Confirmation Rule

Do not write files until the founder confirms the proposed MVP decision.

Ask in plain language:

```text
Quer que eu transforme essa decisao no escopo inicial do MVP?
```

## Expected Output

Return:

- MVP decision summary
- Included now
- Excluded now
- Needs discovery
- Needs design/security/technical check, if applicable
- Value Risk result
- Usability Risk result
- Feasibility Risk result
- Business Viability Risk result
- Files proposed for update
- Next safe route

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
