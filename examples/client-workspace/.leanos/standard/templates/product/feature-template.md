# [FEATURE: <epic title>] <feature title>

## Metadados

~~~yaml
feature_key: <stable-kebab-key>
parent_epic_key: <epic-key>
source_roadmap_item: <roadmap item or backlog reference>
milestone:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
priority: low | medium | high | critical
size: XS | S | M | L | XL
effort: 1 | 2 | 3 | 5 | 8 | 13
area: Product Ops | Engineering | Design | Security | DevOps
owner: Product Ops
execution_owner: Engineering
github_issue:
  url:
~~~

## Epic Pai

- Epic:
- Epic outcome:
- Milestone:
- Escopo de delivery:

## User Story

As a <user>, I want <capability> so that <outcome>.

## Propósito

Why this feature exists.

## Escopo

What should be implemented.

## Não Objetivos

What should not be implemented.

## Critérios de Aceite

- TBD

## Tasks

Use tarefas como checklist interno de implementação. Mantenha-as pequenas o suficiente para orientar Engineering.

~~~text
Create database model
Create UI
Adicionar validação
Adicionar testes
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | required only for UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | required only for data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | required only for deploy, env, CI/CD, observability, config or GitHub sync impact |

## Critérios De Design

If not applicable, say why.

- Flow:
- Screens or states:
- Component/design-system notes:
- Accessibility:

## Critérios De Engineering

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Critérios De Security

If not applicable, say why.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

## Definition of Ready

- [ ] Epic pai is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition Of Done

- [ ] Acceptance criteria satisfied
- [ ] Tasks completed or explicitly descoped
- [ ] Tests or validation evidence recorded
- [ ] Design review completed or explicitly not applicable
- [ ] Security review completed or explicitly not applicable
- [ ] DevOps/release notes completed or explicitly not applicable
- [ ] Epic pai updated with result
