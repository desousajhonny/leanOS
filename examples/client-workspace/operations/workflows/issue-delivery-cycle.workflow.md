# Issue Delivery Cycle Workflow

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
6. If a new component contract is needed and the component readiness assets do not exist yet, stop before code and explain the missing Design path or template to the founder
7. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved
8. Route DevOps only when environments, CI/CD, deploy, observability, configuration, GitHub sync or release readiness are affected
9. After Product Ops, Design, Security and DevOps readiness are ready or explicitly not applicable, create the issue-linked branch
10. Plan implementation in Engineering; implement reusable component work before the screen or Feature that depends on it
11. Run tests or explain gaps
12. Run PR validation
13. Prepare PR



## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
