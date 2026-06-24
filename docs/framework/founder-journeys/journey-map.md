# Founder Journey Map

Use this map to track which founder journeys have been designed with `journey-template.md`.

| Status | Etapa | Momento | Journey File | Workflow / Entrada | Intencao do Founder |
| --- | --- | --- | --- | --- | --- |
| [ ] | 0 | Setup inicial | `start-leanos.md` | `.leanos/commands/start-leanos.md` + Strategy Baseline | "vamos comecar", "configurar o LeanOS", "iniciar o projeto" |
| [ ] | 1 | Primeira definicao do produto | `define-mvp.md` | `operations/workflows/define-mvp.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Defina o MVP", "qual a primeira versao?", "o que entra no MVP?" |
| [x] | 2 | Novas ideias e features | `new-idea-intake.md` | `strategy/workflows/new-idea-intake.workflow.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" |
| [x] | 3 | Decisao de roadmap | `idea-to-roadmap.md` | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" |
| [x] | 4 | Roadmap item para Epic local | `roadmap-item-to-epic.md` | `operations/workflows/roadmap-item-to-epic.workflow.md` | "Isso entra na proxima entrega?", "isso entra no MVP?", "crie um epic para esse item" |
| [x] | 5 | Feature Shaping | `epic-to-features.md` | `operations/workflows/epic-to-features.workflow.md` | "Quebre o epic #123 em features" |
| [x] | 6 | Implementacao | `feature-to-delivery-cycle.md` | `operations/workflows/feature-to-delivery-cycle.workflow.md` | "Implemente a feature", "implemente a issue #554", "vamos comecar essa feature" |
| [ ] | 7 | Review e PR | `review-pr.md` | Dentro de `feature-to-delivery-cycle` ou futuro workflow de review | "Revise o PR", "esta pronto para merge?" |
| [x] | 8 | Pos-merge | `post-merge-continuation.md` | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a proxima issue", "o que atualizamos depois do merge?" |
| [ ] | 9 | Lancamento e aprendizado | `launch-learning-loop.md` | `growth/workflows/launch-learning-loop.workflow.md` | "Lancamos, o que aprendemos?", "como melhorar aquisicao/conversao?" |

## Rule

A journey is complete only when:

- the founder-facing journey is understandable without reading scaffold internals;
- every route step has evidence in AGENT, README, YAML, index, role, skill, playbook or workflow files;
- the journey validation checklist passes;
- the roadmap table is updated to `[x]`.
