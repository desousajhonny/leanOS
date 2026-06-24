# Roadmap To Github Project Workflow

## Purpose

Prepare roadmap, milestones and epics for GitHub Project sync.

## Founder Triggers

- "sincronize o roadmap com github"
- "vamos mandar o roadmap para o github projects"
- "crie os milestones no github"
- "prepare os epics no github"
- "github sync do roadmap"

## Owner

- Department: `strategy`
- Primary area: `roadmap`
- Supporting areas: `product`
- Conditional areas: `operations.product-ops`, `operations.devops`

## Required Areas

- roadmap
- product

## Conditional Areas

- `operations/product-ops`: Enter when roadmap items need local Epics/Features before sync or when delivery scope is unclear.
- `operations/devops`: Enter when GitHub settings, token, repository, project fields, labels or sync state must be checked.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `strategy/AGENT.md`
- `strategy/workflows/roadmap-to-github-project.workflow.md`
- `strategy/roadmap/AGENT.md`
- `strategy/roadmap/knowledge/roadmap.md`
- `strategy/roadmap/knowledge/milestones.md`
- `strategy/roadmap/knowledge/current-cycle.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `.github/leanos/project-sync.yaml`
- `.github/leanos/sync-state.yaml`
- `.github/leanos/work-mapping.md`

## Navigation Route

1. `AGENT.md`
2. `strategy/AGENT.md`
3. `strategy/workflows/roadmap-to-github-project.workflow.md`
4. `strategy/roadmap/AGENT.md`
5. `strategy/roadmap/roles/roadmap-planner.role.md`
6. `strategy/roadmap/skills/prepare-roadmap-sync.skill.md`
7. `strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md`
8. `operations/product-ops/AGENT.md when local Epic/Feature shape is required`
9. `operations/devops/AGENT.md when GitHub configuration must be checked`
10. `.leanos/commands/github-sync.md when the founder confirms sync execution`

## Sequence

1. Read roadmap and current cycle before preparing any GitHub payload.
2. Confirm product outcomes and priority order from Strategy Product.
3. Separate roadmap/backlog items from delivery-ready Epics.
4. Ask Product Ops to shape local Epics/Features when a roadmap item is too broad for GitHub sync.
5. Ask DevOps to validate GitHub project settings when token, repository, project fields, labels or sync state are missing or unclear.
6. Prepare a dry-run summary with milestones, Epic candidates and mapping changes.
7. Show the payload in founder-friendly language before any external write.
8. Ask for explicit confirmation before routing to the sync command or any API-capable script.

## Confirmation Gates

- Ask before changing roadmap or milestone files.
- Ask before changing `.github/leanos/project-sync.yaml` or `.github/leanos/work-mapping.md`.
- Ask before creating or updating local Epics.
- Ask before running any GitHub sync, API-capable script or remote write.
- Ask before marking sync state as completed.

## Allowed Updates

- `strategy/roadmap/knowledge/roadmap.md after founder confirmation`
- `strategy/roadmap/knowledge/milestones.md after founder confirmation`
- `strategy/roadmap/knowledge/current-cycle.md after founder confirmation`
- `.github/leanos/project-sync.yaml after DevOps/founder confirmation`
- `.github/leanos/work-mapping.md after founder confirmation`
- `.github/leanos/sync-state.yaml only after a confirmed tool reports successful sync`

## Forbidden Updates

- `.env.local`
- `tokens`
- `source code`
- `branches`
- `pull requests`
- `GitHub remote state without explicit founder confirmation and API-capable command execution`

## External Capabilities

- GitHub sync requires an explicit API-capable command or script.
- The model prepares dry-run, payload and confirmation; it does not call GitHub APIs directly.
- If token, repository or project configuration is missing, route to Operations DevOps before execution.

## Stop Conditions

- GitHub management is not configured and the founder wants remote sync.
- Token source is unclear or would require storing secrets in workspace files.
- Roadmap items are too broad and need local Epic/Feature shaping first.
- The dry-run suggests duplicate or conflicting GitHub items.
- The founder does not confirm the payload or remote write.

## Expected Output

- Readiness status for GitHub sync.
- Dry-run list of milestones, Epic candidates and mapping changes.
- Missing configuration or duplicate/conflict warnings.
- Founder-friendly confirmation question before remote sync.
- Next route to Product Ops, DevOps or the GitHub sync command.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
O roadmap esta pronto para um dry-run de GitHub sync.
Quer que eu confira configuracao, payload e possiveis duplicidades antes de qualquer escrita remota?
```

Later-session triggers:

- "rode o github sync"
- "sincronize agora"
- "vamos atualizar o github project"
- "crie milestones no github"
- "envie esses epics para o github"

Next route:

`.leanos/commands/github-sync.md or operations/devops/AGENT.md when configuration is missing`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Strategy area READMEs for each step to preserve area-first ownership.
