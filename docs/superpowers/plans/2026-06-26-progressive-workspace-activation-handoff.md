# Progressive Workspace Activation Handoff

## Branch

Continue on `feature/progressive-workspace-activation`.

Do not create a new branch unless the current branch is merged first.

## Current Commit State

Recent commits on this branch:

- `8d664d2 feat: add progressive activation state`
- `2fb5eab feat: generate strategy-only initial workspace`

Working tree was clean when this handoff was written.

## What Is Already Done

- `leanos.yaml` now includes progressive activation state:
  - active departments and areas;
  - inactive departments and areas;
  - available departments and areas;
  - founder-selected departments and areas from the wizard;
  - `missing_asset_behavior: return_activation_required`.
- Initial scaffold generation now creates only Strategy.
- Operations and Growth are not generated during initial setup.
- Commands tied to inactive areas are not generated during initial setup.
- Root `AGENT.md` routes inactive-area requests through `activation_required` instead of pointing to missing folders or command files.
- Strategy workflows were adjusted so they do not reference inactive Operations/Growth paths as loadable assets.
- `examples/client-workspace` was regenerated as the Strategy-only preview.

Verified before commit:

```powershell
packages\cli\node_modules\.bin\tsc.CMD -p packages\cli\tsconfig.json
node packages\cli\scripts\validate-generator.mjs
git diff --check
```

## Next Slice

Implement the practical activation flow: how LeanOS Chief creates the next department or area when the founder reaches the right stage.

The next implementation should answer:

- Where does the activation logic live?
- How does Chief decide that an inactive area should be activated?
- How does Chief create the correct files without generating the full framework?
- How does Chief update `leanos.yaml`, indexes, context files and preview state after activation?
- How does Chief communicate activation naturally, without sounding mechanical?

## Founder Experience Rules

Chief should not say only: `activation_required`.

Chief should explain the next natural operating step:

```text
Esse pedido ja passou do ponto de estrategia. Minha sugestao e abrir Product Ops agora para transformar isso em escopo executavel.
```

Chief should ask for confirmation before creating new departments or areas:

```text
Posso ativar Operations/Product Ops e criar os arquivos minimos para esse proximo passo?
```

Chief should not load or reference files from inactive departments as if they already exist.

Chief should always read `leanos.yaml` first and distinguish:

- `active_*`: exists and can be loaded now;
- `inactive_*`: available later, but not present yet;
- `founder_selected_*`: selected in the wizard, but still gated by business maturity.

## Suggested Activation Conditions

### Operations / Product Ops

Activate when Strategy has enough context and the founder wants to turn strategy into delivery:

- problem, ICP and value proposition are minimally clear;
- a roadmap/backlog item exists or is being promoted;
- founder asks about MVP, scope, Epic, Feature, PRD, criteria, stories or building;
- Chief can explain why Strategy alone is no longer enough.

### Operations / Design

Activate when delivery needs UX or product experience work:

- Product Ops or MVP scope exists;
- founder asks for screens, flows, prototype, design system, copy, accessibility or components;
- a Feature depends on user interaction clarity.

### Operations / Engineering

Activate when implementation becomes concrete:

- Feature is defined enough for planning;
- Product Ops has confirmed scope and criteria;
- founder asks for code, branch, tests, implementation, PR or review.

### Operations / DevOps

Activate when execution needs infrastructure or external tooling:

- GitHub sync, GitHub Projects, CI/CD, deploy, environments, release, observability or repository configuration enters the flow;
- founder confirms an external or remote action.

### Growth

Activate when there is something to launch, test or learn from externally:

- landing page, positioning, acquisition, launch, customer feedback, pricing, onboarding, churn or success learning becomes relevant;
- Strategy or Product Ops has produced a concrete hypothesis, MVP scope or learning objective.

## Recommended Next Implementation Order

1. Define an activation service/helper in the CLI generator layer that can produce files for a requested inactive area.
2. Add a safe activation state update for `leanos.yaml`.
3. Regenerate indexes and context files after activation.
4. Add Chief-facing instructions for activation proposals and confirmation language.
5. Add validator coverage for activating `operations.product-ops` from a Strategy-only workspace.
6. Extend the same pattern to Design, Engineering, DevOps and Growth.

