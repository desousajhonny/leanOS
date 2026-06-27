export function productEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Metadata

~~~yaml
epic_key: <stable-kebab-key>
source_roadmap_item: <roadmap item or backlog reference>
delivery_scope:
  scope_type: MVP | Release | Experiment | Beta | Internal
  milestone:
  release_goal:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
owner: Product Ops
decision_owner: Product Owner
supporting_roles:
  - Roadmap Planner
  - Product Strategist
  - Senior Developer when technical feasibility matters
  - Product Designer when UX is affected
  - Security Reviewer when data/auth/privacy/security is affected
  - DevOps Engineer when delivery, deploy or GitHub sync is affected
github_issue:
  url:
~~~

## Outcome

What user, business or validation outcome this epic should create.

## Why Now

Why this epic belongs in the current delivery scope instead of backlog or later roadmap.

## Starting Point

Use these inputs before shaping the epic:

- Product brief:
- ICP / user segment:
- Problem:
- Roadmap item:
- Delivery scope:
- PRD or MVP scope:
- Existing evidence:
- Known constraints:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Epic Decision Criteria

- User value:
- Business value:
- Strategic fit:
- Evidence level:
- Opportunity cost:
- Milestone fit:
- Risk level:

## Success Metrics

- Primary success metric:
- Supporting metric:
- Qualitative signal:
- Learning signal:

## Epic Done When

The Epic is done when all confirmed Features are delivered or explicitly descoped, the outcome can be measured, and the parent delivery scope is updated.

## Approval Gate

- Product Owner approval:
- Roadmap / Strategy approval:
- Engineering feasibility checked:
- Design checked or not applicable:
- Security checked or not applicable:
- DevOps checked or not applicable:
- Founder confirmation:

## Epic Readiness Matrix

Use this to decide which specialists must participate before breaking the epic into features.

| Dimension | Required? | Why / Not Applicable | Required Output |
| --- | --- | --- | --- |
| Product Ops | yes | Epic ownership and delivery scope | outcome, scope, non-goals, feature candidates |
| Roadmap / Strategy | yes | Roadmap and milestone alignment | roadmap linkage and priority rationale |
| Engineering | conditional | Technical feasibility, dependencies or unknown complexity | feasibility notes and implementation boundary |
| Design | conditional | User-facing flow, screen, state, copy or accessibility impact | UX notes and design questions |
| Security | conditional | Data, auth, permissions, privacy, abuse, API or compliance risk | security criteria and risks |
| DevOps | conditional | GitHub sync, CI/CD, environment, release, observability or config impact | operational criteria |

## Expected Features

List candidate features. Do not fully detail them here; each feature gets its own feature file.

| Feature | User Outcome | Required Dimensions | Notes |
| --- | --- | --- | --- |
| <feature title> | <outcome> | Product Ops, Engineering, Design/Security/DevOps if applicable | <notes> |

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Risks

- Product risk:
- Technical risk:
- Design risk:
- Security risk:
- Delivery risk:

## Open Questions

- TBD

## Next Step

After this epic is confirmed, run \`epic-to-features\` to create feature files with internal tasks and Delivery Readiness Matrix criteria.
`;
}

export function productFeatureTemplate(): string {
  return `# [FEATURE: <epic title>] <feature title>

## Metadata

~~~yaml
feature_key: <stable-kebab-key>
parent_epic_key: <epic-key>
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
owner: Product Ops
execution_owner: Engineering
github_issue:
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
`;
}
