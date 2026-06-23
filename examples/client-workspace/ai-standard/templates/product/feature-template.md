# [FEATURE: <epic title>] <feature title>

## Metadata

~~~yaml
feature_key: <stable-kebab-key>
parent_epic_key: <epic-key>
status: candidate | shaped | ready-to-develop | in-progress | done | synced
owner: Product Ops
execution_owner: Engineering
github_issue:
  synced: false
  url:
~~~

## Parent Epic

- Epic:
- Epic outcome:
- Milestone:
- Delivery scope:

## User Story

As a <user>, I want <capability> so that <outcome>.

## Purpose

Why this feature exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Acceptance Criteria

- TBD

## Tasks

Use tasks as the internal implementation checklist. Keep them small enough to guide Engineering.

~~~text
Create database model
Create UI
Add validation
Add tests
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | required only for UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | required only for data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | required only for deploy, env, CI/CD, observability, config or GitHub sync impact |

## Design Criteria

If not applicable, say why.

- Flow:
- Screens or states:
- Component/design-system notes:
- Accessibility:

## Engineering Criteria

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Security Criteria

If not applicable, say why.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

## Definition of Ready

- [ ] Parent epic is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition of Done

- [ ] Acceptance criteria satisfied
- [ ] Tasks completed or explicitly descoped
- [ ] Tests or validation evidence recorded
- [ ] Design review completed or explicitly not applicable
- [ ] Security review completed or explicitly not applicable
- [ ] DevOps/release notes completed or explicitly not applicable
- [ ] Parent epic updated with result
