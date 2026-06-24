# Epic To Features Workflow

## Purpose

Break a confirmed local LeanOS Epic into implementation-ready Feature files with internal Tasks and Delivery Readiness Matrix criteria before Engineering starts work.

## Founder Triggers

- "quebre esse epic em features"
- "quais features precisamos para esse epic?"
- "prepara esse epic para desenvolvimento"
- "transforma esse epic em trabalho executavel"
- "quebre o epic #123"

## Owner

- Department: `operations`
- Primary area: `product-ops`
- Supporting areas: `engineering`
- Conditional areas: `design`, `security`, `devops`

## Required Areas

- product-ops
- engineering

## Conditional Areas

- `design`: Enter when the Epic or Feature affects UX, UI, flow, copy, accessibility, screens, states, interaction or reusable components.
- `security`: Enter when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.
- `devops`: Enter when environments, CI/CD, deploy, observability, config, GitHub sync or release readiness are affected.

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `operations/AGENT.md`
- `operations/workflows/README.md`
- `operations/workflows/epic-to-features.workflow.md`
- `operations/product-ops/AGENT.md`
- `operations/product-ops/epics/README.md`
- `operations/product-ops/knowledge/work-taxonomy.md`
- `operations/product-ops/knowledge/ready-to-develop.md`
- `ai-standard/templates/product/epic-template.md`
- `ai-standard/templates/product/feature-template.md`

## Navigation Route

1. `AGENT.md`
2. `operations/AGENT.md`
3. `operations/workflows/epic-to-features.workflow.md`
4. `operations/product-ops/AGENT.md`
5. `operations/product-ops/roles/product-owner.role.md`
6. `operations/product-ops/skills/shape-epic.skill.md`
7. `operations/product-ops/skills/write-feature-criteria.skill.md`
8. `operations/product-ops/playbooks/epic-to-features.playbook.md`
9. `operations/product-ops/epics/<epic-slug>/<feature-slug>.md`

## Sequence

1. Confirm the local Epic folder exists under `operations/product-ops/epics/` and has outcome, scope, non-goals, ownership and Epic Readiness Matrix
2. Load Product Ops through `operations/product-ops/AGENT.md` and let the area owner choose Product Owner
3. Load `operations/product-ops/roles/product-owner.role.md` before skills or playbooks
4. Use `shape-epic.skill.md` to verify the Epic is ready for feature breakdown
5. Use `write-feature-criteria.skill.md` and the local Product Feature template to draft Feature files inside the Epic folder
6. Load `operations/product-ops/playbooks/epic-to-features.playbook.md` to execute Feature Shaping
7. Route Design only when UX, UI, flow, copy, accessibility, screens, states or interaction are affected
8. When Design is applicable, identify component reuse, component adaptation or the need for a future component spec task
9. Do not write full component specs in this workflow; add a Design task for component readiness when a spec is needed
10. Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved
11. Route DevOps only when environments, CI/CD, deploy, observability, config, GitHub sync or release readiness are affected
12. Ask Engineering to validate implementation boundaries, dependencies, tests and feature size
13. Ask for confirmation before writing Feature files, syncing GitHub or starting implementation
14. Stop before branch, code, PR or remote write

## Confirmation Gates

- Ask before creating or updating local Feature files.
- Ask before changing the parent Epic README.
- Ask before changing delivery scope, MVP files or roadmap context.
- Ask before any GitHub sync, API call or remote write.
- Ask again before routing to implementation after Feature files are created.

## Allowed Updates

- `operations/product-ops/epics/<epic-slug>/README.md`
- `operations/product-ops/epics/<epic-slug>/<feature-slug>.md`
- `operations/product-ops/knowledge/issue-readiness.md`

## Forbidden Updates

- `src/`
- `app/`
- `pages/`
- `components/`
- `.github/`
- `.leanos/commands/`
- `ai-standard/`
- `roles/`
- `skills/`
- `playbooks/`

## External Capabilities

- GitHub sync is optional and separate; this workflow may prepare a dry-run payload or note, but must not call GitHub APIs without explicit confirmation.
- Do not create branches, commits, PRs or code changes in this workflow.
- Use local Product templates before GitHub templates.

## Stop Conditions

- The parent Epic is missing, ambiguous or not mapped to a local Epic folder.
- The Epic lacks outcome, scope, non-goals, ownership or readiness criteria.
- Product Ops or Engineering criteria cannot be defined.
- Applicable Design, Security or DevOps criteria cannot be determined.
- The founder does not confirm Feature file creation or update.
- The request shifts into branch, code, PR, deployment or GitHub sync execution.

## Expected Output

- Epic readiness summary.
- Feature draft list using the local Product Feature template.
- Internal task checklist per Feature.
- Delivery Readiness Matrix criteria for each Feature.
- Design, Security and DevOps applicability notes with reasons.
- Component reuse, adaptation or component-readiness task decision when UI is affected.
- Engineering boundaries, likely dependencies and test notes.
- Founder-friendly confirmation question before writing local Feature files.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
As features foram definidas.
Quer que eu verifique se alguma delas ja esta pronta para desenvolvimento?
```

Later-session triggers:

- "vamos implementar essa feature"
- "essa feature esta pronta para desenvolver?"
- "podemos iniciar o desenvolvimento?"
- "comece pela feature"
- "implemente a feature"

Next route:

`feature-to-delivery-cycle`

Rules:

- Do not automatically start implementation after feature shaping.
- If the founder says yes, run the ready-to-develop gate before routing to Engineering.
- If readiness is missing, explain the gap in founder-friendly language and recommend the next LeanOS route.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md`, route to Operations, and load `feature-to-delivery-cycle` only after readiness is confirmed.


## Navigation

Use Operations area READMEs for each step to preserve area-first ownership.
