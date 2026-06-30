# [EPIC] <epic title>

## Metadados

~~~yaml
epic_key: <stable-kebab-key>
source_roadmap_item: <roadmap item or backlog reference>
delivery_scope:
  scope_type: MVP | Release | Experiment | Beta | Internal
  milestone:
  release_goal:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
priority: low | medium | high | critical
size: XS | S | M | L | XL
effort: 1 | 2 | 3 | 5 | 8 | 13
area: Product Ops
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
- Escopo de delivery:
- PRD or MVP scope:
- Existing evidence:
- Known constraints:

## Escopo

What is included.

## Não Objetivos

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

Liste Features candidatas. Não detalhe tudo aqui; cada Feature recebe seu próprio arquivo de Feature.

| Feature | User Outcome | Required Dimensions | Notes |
| --- | --- | --- | --- |
| <feature title> | <outcome> | Product Ops, Engineering, Design/Security/DevOps if applicable | <notes> |

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Riscos

- Product risk:
- Technical risk:
- Design risk:
- Security risk:
- Delivery risk:

## Perguntas em Aberto

- TBD

## Próximo Passo

After this epic is confirmed, run `epic-to-features` to create feature files with internal tasks and Delivery Readiness Matrix criteria.
