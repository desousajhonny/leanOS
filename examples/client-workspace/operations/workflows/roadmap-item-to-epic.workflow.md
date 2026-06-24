# Roadmap Item To Epic Workflow

## Purpose

Turn a confirmed roadmap or backlog item into a local LeanOS Epic with scope_type, milestone, release_goal, outcome, non-goals, risks and readiness notes before features, GitHub sync, branch or code.

## Founder Triggers

- "Isso entra no MVP?"
- "Isso entra na proxima entrega?"
- "Vamos transformar esse item do roadmap em epic?"
- "Crie um epic para esse item"
- "Qual milestone recebe esse item?"
- "Vamos preparar isso para virar features depois?"

## Owner

- Department: `operations`
- Primary area: `operations/product-ops`
- Supporting areas: `strategy/product`, `strategy/roadmap`
- Conditional areas: `operations/design`, `operations/security`, `operations/devops`, `operations/engineering`

## Required Areas

- product-ops

## Conditional Areas

- `operations/design`: UX, UI, copy, accessibility, screen, flow, behavior or component implications can affect the Epic scope.
- `operations/security`: Data, auth, permissions, privacy, abuse, API, database, compliance, infrastructure or AI-generated-code risk affects the Epic.
- `operations/devops`: GitHub Project, milestone sync, environments, deploy, observability, config or release readiness affect the Epic.
- `operations/engineering`: Technical feasibility, architecture boundary, dependency, data model or implementation size can change the Epic shape.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `operations/AGENT.md`
- `operations/workflows/README.md`
- `operations/product-ops/AGENT.md`
- `operations/product-ops/knowledge/work-taxonomy.md`
- `operations/product-ops/knowledge/delivery-scope.md`
- `operations/product-ops/epics/README.md`
- `strategy/product/knowledge/brief.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/backlog.md`
- `ai-standard/templates/product/epic-template.md`

## Navigation Route

1. `AGENT.md`
2. `operations/AGENT.md`
3. `operations/workflows/roadmap-item-to-epic.workflow.md`
4. `operations/product-ops/AGENT.md`
5. `operations/product-ops/roles/product-owner.role.md`
6. `operations/product-ops/skills/define-delivery-scope.skill.md`
7. `operations/product-ops/skills/shape-epic.skill.md`
8. `operations/product-ops/playbooks/delivery-scope-planning.playbook.md`
9. `ai-standard/templates/product/epic-template.md`
10. `Output`

## Sequence

1. Confirm the roadmap or backlog item exists and has enough product context.
2. Declare this route before executing so the founder understands this creates or updates a local LeanOS Epic, not implementation.
3. Load Product Ops through `operations/product-ops/AGENT.md` and choose `roles/product-owner.role.md`.
4. Use `skills/define-delivery-scope.skill.md` to decide `scope_type`, `milestone` and `release_goal` as Epic fields, not as a separate workflow.
5. Use `skills/shape-epic.skill.md` to define the Epic outcome, decision ownership, scope boundary, non-goals, risks and likely feature groups.
6. Use `playbooks/delivery-scope-planning.playbook.md` only as tactical support for delivery-scope fields.
7. Route Design only when UX, UI, copy, accessibility, screen, flow, behavior or component implications can affect the Epic.
8. Route Security only when data, auth, privacy, abuse, API, database, compliance, infrastructure or AI-generated-code risk is involved.
9. Route DevOps only when GitHub Project, milestone sync, environments, deploy, observability, config or release readiness affect the Epic.
10. Route Engineering only when feasibility, architecture boundary, dependency, data model or implementation size can change the Epic shape.
11. Explain the recommendation in founder-friendly language before mentioning file updates.
12. Ask for confirmation before creating or updating the local Epic folder.
13. Stop before Feature files, GitHub issues, branches, code or PR work.

## Confirmation Gates

- Ask before promoting a roadmap/backlog item to a local Epic.
- Ask before writing `scope_type`, `milestone` or `release_goal` into the Epic.
- Ask before creating or updating files under `operations/product-ops/epics/`.
- Ask before moving to `epic-to-features`.

## Allowed Updates

- `operations/product-ops/epics/`
- `operations/product-ops/knowledge/delivery-scope.md`
- `operations/product-ops/knowledge/issue-readiness.md`
- `operations/product-ops/knowledge/delivery-context.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/current-cycle.md`

## Forbidden Updates

- `Feature files inside the Epic folder`
- `operations/engineering/`
- `.github/`
- `.leanos/index/`
- `source code`
- `GitHub remote state`
- `branches`
- `pull requests`

## External Capabilities

- No external capability is required by default.
- Do not call GitHub APIs in this workflow.
- Do not create branches, commits or PRs in this workflow.
- Prepare GitHub sync notes only as optional future context after the local Epic is confirmed.

## Stop Conditions

- The roadmap or backlog item does not exist or cannot be identified.
- The item has no clear product context, user, outcome or value.
- The founder does not confirm Epic creation or update.
- The request shifts into Feature shaping, GitHub sync, branch creation, code or PR work.

## Expected Output

- Founder-friendly recommendation: create local Epic, keep in roadmap/backlog, refine first or reject.
- Local Epic title and stable folder slug.
- `scope_type`, `milestone` and `release_goal` as Epic fields.
- Epic outcome, non-goals, risks and likely feature groups.
- Design, Security, DevOps and Engineering applicability notes.
- Clear next-step bridge to `epic-to-features` when the founder wants to continue.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
O Epic local esta pronto.
Quer que eu quebre esse Epic em Features usando a Delivery Readiness Matrix?
```

Later-session triggers:

- "quebre esse epic em features"
- "crie as features desse epic"
- "vamos fatiar esse epic"
- "prepara as features de implementacao"
- "quebre o epic #123"

Next route:

`epic-to-features`

Rules:

- Do not automatically start feature creation without founder confirmation.
- If the founder says yes, declare the new route and load Product Ops epic-to-features assets before drafting features.
- If the founder says no, explain the local Epic outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `epic-to-features`.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
