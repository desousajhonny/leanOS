# Feature To Delivery Cycle Workflow

## Purpose

Coordinate Operations areas from Feature interpretation to readiness, component/design checks, branch, implementation, review and PR.

## Required Areas

- product-ops
- engineering

## Availability

All required areas are active in this department.


## Sequence

1. Accept only a local Feature or GitHub Feature issue as input; do not start from a loose idea, roadmap item or unsplit Epic
2. Load Product Ops first to identify the Feature, parent Epic, delivery scope and readiness state
3. Run `operations/product-ops/knowledge/ready-to-develop.md` before branch, code or PR work
4. If the Feature affects UI, screens, flows, copy, accessibility or reusable components, route Design before Engineering
5. Ask Design to confirm whether the Feature can reuse an existing component, adapt an existing component or needs a new component contract
6. If a new component spec is needed and no approved spec exists, route to `operations/design/playbooks/component-readiness.playbook.md` before branch or code
7. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved
8. Route DevOps only when environments, CI/CD, deploy, observability, configuration, GitHub sync or release readiness are affected
9. Record why Design, Security or DevOps are not applicable when they do not enter the flow
10. After Product Ops, Design, Security and DevOps readiness are ready or explicitly not applicable, create the issue-linked branch
11. Plan implementation in Engineering; if a component spec was approved, run `operations/engineering/playbooks/component-implementation.playbook.md` before the screen or Feature that depends on it
12. Run tests or explain gaps
13. Run PR validation
14. Prepare PR



## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
