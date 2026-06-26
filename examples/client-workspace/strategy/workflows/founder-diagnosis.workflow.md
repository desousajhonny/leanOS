# Founder Diagnosis Workflow

## Purpose

Diagnose the founder's starting point, build the minimum Strategy Baseline and decide the next safe Strategy route.

## Founder Triggers

- "quero começar"
- "como começar"
- "iniciar LeanOS"
- "vamos começar"
- "por onde começamos?"
- "start leanos"

## Progression Stage

Setup Seed, Strategy Seed, Strategy Baseline or Idea Diagnosis.

## Entry Gate

- The founder is starting, restarting or asking how to begin.
- Only Strategy areas are required; Operations and Growth must remain inactive until a later gate requires them.
- Seed context from `leanos.yaml` is available or the founder provides enough plain-language context to start.

## Active Requirements

- Read `leanos.yaml` and active Strategy context first.
- Use `ai-standard/foundation/founder-progression-model.md` to classify the current stage.
- Use `ai-standard/foundation/progression-gates.md` to check required context, allowed next stages and blocked next stages.
- Use Product Strategist with `diagnose-founder-idea` when the missing baseline decision is product-facing.

## Activation Requirements

- Do not activate Operations, Growth, GitHub or source-code workflows from founder diagnosis.
- Return a later `activation_required` only after Strategy Baseline and roadmap/MVP candidate gates are satisfied.

## Owner

- Department: `strategy`
- Primary area: `product`
- Supporting areas: `business`, `roadmap`

## Required Areas

- business
- product
- roadmap

## Availability

All required areas are active in this department.


## Load First

- `AGENT.md`
- `leanos.yaml`
- `.leanos/context/workspace-summary.md`
- `.leanos/context/current-focus.md`
- `.leanos/context/next-actions.md`
- `ai-standard/foundation/founder-progression-model.md`
- `ai-standard/foundation/progression-gates.md`
- `strategy/AGENT.md`
- `strategy/workflows/README.md`
- `strategy/workflows/founder-diagnosis.workflow.md`
- `strategy/business/knowledge/profile.md`
- `strategy/product/AGENT.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/value-proposition.md`
- `strategy/product/knowledge/business-model-canvas.md`
- `strategy/product/knowledge/mvp-validation-scope.md`
- `strategy/product/knowledge/validation-notes.md`

## Navigation Route

1. `AGENT.md`
2. `strategy/AGENT.md`
3. `strategy/workflows/founder-diagnosis.workflow.md`
4. `strategy/product/AGENT.md`
5. `strategy/product/roles/product-strategist.role.md`
6. `strategy/product/skills/diagnose-founder-idea.skill.md`
7. `strategy/product/playbooks/product-strategy.playbook.md`
8. `strategy/business/AGENT.md only when business identity gaps block product diagnosis`
9. `strategy/roadmap/AGENT.md only after Strategy Baseline is coherent enough for roadmap sequencing`

## Phases

- Phase 1: Identify current progression stage from seed context and active Strategy files.
- Phase 2: Name the smallest Strategy Baseline gap blocking the next decision.
- Phase 3: Ask one founder-friendly guided question tied to that gap.
- Phase 4: Propose Strategy knowledge updates only after enough context exists.
- Phase 5: Recommend `new-idea-intake` or `idea-to-roadmap` only after Strategy Baseline is ready.

## Skills Used

- `strategy/product/skills/diagnose-founder-idea.skill.md`
- `strategy/product/skills/define-product.skill.md`
- `strategy/product/skills/define-mvp-validation-scope.skill.md when the founder is ready for MVP validation scope`

## Playbooks Used

- `strategy/product/playbooks/product-strategy.playbook.md`
- `strategy/business/playbooks/business-foundation.playbook.md when business identity gaps block the baseline`
- `strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md only after the roadmap gate is satisfied`

## Sequence

1. Read seed context and active Strategy context before asking questions.
2. Classify the founder progression stage and explain it in founder language.
3. Identify baseline gaps across user, problem, promise, alternative, riskiest assumption, business model direction, immediate focus and MVP validation target.
4. Ask one guided question tied to the highest-impact gap; do not ask a generic tell-me-more question.
5. When enough context exists, propose updates to Strategy knowledge and wait for confirmation before writing.
6. When Strategy Baseline is coherent, recommend the next route: `new-idea-intake`, `idea-to-roadmap` or MVP Validation Scope work inside Strategy Product.
7. Stop before roadmap, MVP delivery scope, Epics, Features or implementation work.

## Confirmation Gates

- Ask before writing any Strategy knowledge file.
- Ask before moving into `new-idea-intake`.
- Ask before moving into `idea-to-roadmap`.
- Ask before recommending activation for any inactive area.

## Allowed Updates

- `strategy/business/knowledge/profile.md`
- `strategy/business/knowledge/decision-log.md`
- `strategy/product/knowledge/brief.md`
- `strategy/product/knowledge/problem.md`
- `strategy/product/knowledge/icp.md`
- `strategy/product/knowledge/value-proposition.md`
- `strategy/product/knowledge/business-model-canvas.md`
- `strategy/product/knowledge/mvp-validation-scope.md`
- `strategy/product/knowledge/validation-notes.md`

## Forbidden Updates

- `strategy/roadmap/knowledge/roadmap.md until Strategy Baseline is confirmed`
- `Product Ops delivery assets until operations.product-ops is activated`
- `local Epic assets until operations.product-ops is activated`
- `Do not create roadmap, MVP delivery scope, Epics, Features or implementation work`
- `.github/`
- `.leanos/`
- `source code`
- `branches`
- `pull requests`

## External Capabilities

- No external capability is required.
- Do not call GitHub APIs.
- Do not create branches, commits, code or PRs.

## Stop Conditions

- Seed context and founder answer are too vague to identify one useful baseline gap.
- The founder does not confirm Strategy knowledge updates.
- The request shifts into delivery scope, Epic creation, GitHub sync, branch, code or PR work.
- The next step requires an inactive area that has not been confirmed for activation.

## Expected Output

- Current progression stage.
- Known context summary.
- Smallest Strategy Baseline gap.
- One guided question or a proposed Strategy knowledge update.
- Clear next route when the Strategy Baseline gate is ready.

## Continuation Bridge

At the end of this workflow, offer one clear next-step bridge when a safe next flow exists.

Immediate bridge:

```text
A base estrategica minima esta clara o bastante para decidir o proximo passo.
Quer que eu avalie a proxima ideia, monte o MVP Validation Scope ou transforme isso em um MVP Candidate Roadmap?
```

Later-session triggers:

- "vamos continuar do inicio"
- "ja temos a base"
- "qual o proximo passo?"
- "vamos montar o roadmap"
- "vamos definir o MVP de validacao"

Next route:

`new-idea-intake or idea-to-roadmap when Strategy Baseline is ready`

Rules:

- Do not automatically start the next journey without founder confirmation.
- If the founder says yes, declare the new route before loading the next workflow.
- If the founder says no, explain the current outcome and stop without writing anything else.
- If the founder returns in a later session with a matching trigger, restart from Root `AGENT.md` and route normally.


## Navigation

Use Strategy area READMEs for each step to preserve area-first ownership.
