# [EPIC] <epic title>

## Metadata

~~~yaml
epic_key: <stable-kebab-key>
source_roadmap_item: <roadmap item or backlog reference>
delivery_scope:
  scope_type: MVP | Release | Experiment | Beta | Internal
  milestone:
  release_goal:
status: candidate | scoped | ready | in-progress | done | synced
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
  synced: false
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

After this epic is confirmed, run `epic-to-features` to create feature files with internal tasks and Delivery Readiness Matrix criteria.
