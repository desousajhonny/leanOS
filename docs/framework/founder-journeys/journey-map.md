# Founder Journey Map

Use this map to track which founder journeys have been designed with `journey-template.md`.

| Status | Etapa | Momento | Journey File | Workflow / Entrada | Intencao do Founder |
| --- | --- | --- | --- | --- | --- |
| [ ] | 0 | Setup inicial | `start-leanos.md` | `.leanos/commands/start-leanos.md` + Strategy Baseline | "vamos comecar", "configurar o LeanOS", "iniciar o projeto" |
| [ ] | 1 | Primeira definicao do produto | `define-mvp.md` | `operations/workflows/define-mvp.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Defina o MVP", "qual a primeira versao?", "o que entra no MVP?" |
| [x] | 2 | Novas ideias e features | `new-idea-intake.md` | `strategy/workflows/new-idea-intake.workflow.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" |
| [ ] | 3 | Decisao de roadmap | `idea-to-roadmap.md` | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" |
| [ ] | 4 | Decisao de MVP | `roadmap-item-to-mvp-scope.md` | `operations/workflows/roadmap-item-to-mvp-scope.workflow.md` ou `operations/product-ops/playbooks/mvp-delivery.playbook.md` | "Isso entra no MVP?", "esse item precisa ir para a primeira versao?" |
| [ ] | 5 | Planning de execucao | `mvp-to-epic.md` | `operations/workflows/mvp-to-epic.workflow.md` ou `strategy/workflows/roadmap-to-github-project.workflow.md` | "Deseja quebrar o MVP em epics?", "crie os epics no GitHub" |
| [ ] | 6 | Issue Shaping | `epic-to-subissues.md` | `operations/workflows/epic-to-subissues.workflow.md` | "Quebre o epic #123 em sub-issues" |
| [ ] | 7 | Implementacao | `issue-delivery-cycle.md` | `operations/workflows/issue-delivery-cycle.workflow.md` | "Implemente a issue #554", "vamos comecar essa feature" |
| [ ] | 8 | Review e PR | `review-pr.md` | Dentro de `issue-delivery-cycle` ou futuro workflow de review | "Revise o PR", "esta pronto para merge?" |
| [ ] | 9 | Pos-merge | `post-merge-continuation.md` | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a proxima issue", "o que atualizamos depois do merge?" |
| [ ] | 10 | Lancamento e aprendizado | `launch-learning-loop.md` | `growth/workflows/launch-learning-loop.workflow.md` | "Lancamos, o que aprendemos?", "como melhorar aquisicao/conversao?" |

## Rule

A journey is complete only when:

- the founder-facing journey is understandable without reading scaffold internals;
- every route step has evidence in AGENT, README, YAML, index, role, skill, playbook or workflow files;
- the journey validation checklist passes;
- the roadmap table is updated to `[x]`.
