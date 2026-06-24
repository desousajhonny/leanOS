# Where We Are Protocol

## Purpose

Help LeanOS Chief answer status, resume and readiness questions without relying on memory or inventing progress.

Use this protocol to diagnose the current product moment, explain what exists, identify what is missing and recommend the safest next LeanOS route.

## Trigger Phrases

Use this protocol when the founder asks things like:

- "Onde paramos?"
- "O que temos ate agora?"
- "O que falta para o MVP?"
- "Qual o proximo passo?"
- "Ja podemos desenvolver?"
- "Vamos desenvolver o produto."
- "Estamos prontos para implementar?"
- "O que falta para lancar?"
- "What do we have so far?"
- "Can we start building?"

## Red Lines

- Do not answer from chat memory alone.
- Do not recommend implementation before checking product, roadmap and delivery readiness.
- Do not invent completed work from empty or placeholder files.
- Do not treat a roadmap item as delivery scope unless delivery scope is explicitly defined.
- Do not treat delivery scope as GitHub-ready until epic/issue readiness is checked.
- Do not write files during this protocol unless the founder explicitly asks to update something after the diagnosis.

## Reading Order

Load only the smallest relevant files. Start here:

1. `../../context/workspace-summary.md`
2. `../../context/current-focus.md`
3. `../../context/next-actions.md`
4. `../../index/workflows.yaml`
5. `../../../leanos.yaml`

Then inspect sources based on the question:

### Strategy Baseline

- `../../../strategy/product/knowledge/brief.md`
- `../../../strategy/product/knowledge/problem.md`
- `../../../strategy/product/knowledge/icp.md`
- `../../../strategy/roadmap/knowledge/backlog.md`
- `../../../strategy/roadmap/knowledge/roadmap.md`

### Delivery Readiness

- `../../../operations/product-ops/knowledge/delivery-scope.md`
- `../../../operations/product-ops/knowledge/issue-readiness.md`
- `../../../operations/product-ops/knowledge/ready-to-develop.md`
- `../../../operations/product-ops/mvp/prd.md`
- `../../../operations/product-ops/mvp/acceptance-criteria.md`
- `../../../operations/product-ops/mvp/release-checklist.md`

### GitHub / Execution Readiness

- `../../../.github/leanos/project-sync.yaml`
- `../../../.github/leanos/sync-state.yaml`
- `../../../.leanos/index/workflows.yaml`

Do not read all of these if the answer is already clear from earlier files.

## Diagnosis Levels

Classify the current moment as one of:

- Strategy missing
- Product strategy started
- Roadmap missing
- Roadmap ready
- Local Epic missing
- Local Epic ready
- GitHub planning missing
- Epics or features missing
- Ready for implementation
- In implementation
- Ready for PR/review
- Ready for launch
- Learning/growth loop

## Development Gate

Before answering that the product, roadmap item, epic or issue is ready to develop, compare the current workspace against `../../../operations/product-ops/knowledge/ready-to-develop.md`.

Do not recommend implementation until the diagnosis confirms:

- product strategy has enough ICP, problem and value context;
- roadmap or backlog item exists for the work;
- delivery scope exists when the work belongs to MVP, release, experiment, beta or internal delivery;
- PRD or acceptance criteria exist when product behavior is affected;
- local Epic/Feature exists, GitHub issue exists, or the founder explicitly asks for a bootstrap flow instead of issue-based work;
- Design is checked when UX, UI, copy, accessibility, screens, states or user flows are affected;
- Security is checked when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved;
- DevOps is checked when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are involved.

If these are missing, explain the gap and recommend the next LeanOS route instead of coding.

## Recommended Routes By Gap

- Strategy missing -> `/start-leanos`
- Product strategy weak -> Strategy Product through `strategy/AGENT.md`
- Roadmap missing -> `idea-to-roadmap` or Strategy Roadmap through `strategy/AGENT.md`
- Local epic missing -> `roadmap-item-to-epic`
- Features missing -> `epic-to-features` when available
- Implementation ready -> `feature-to-delivery-cycle`
- PR/review needed -> Engineering PR validation route
- Launch/readiness needed -> Growth or DevOps based on the gap

## Founder Response Format

Respond in plain language first:

```text
Onde estamos:
<current product moment>

O que ja temos:
- <confirmed thing>
- <confirmed thing>

O que falta:
- <missing prerequisite>
- <missing prerequisite>

Risco de pular etapa:
<short explanation>

Proximo passo recomendado:
<route or workflow>

Quer seguir por esse caminho?
```

Only after that, list technical files inspected or suggested updates.

## If The Founder Asked To Develop Too Early

Be clear but helpful:

```text
Ainda nao recomendo comecar pelo codigo.

O motivo e que <missing readiness item>.
Se formos direto para implementacao agora, o risco e <risk>.

O proximo passo seguro e <recommended route>.
Quer que eu conduza esse passo agora?
```
