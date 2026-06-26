# Mapa De Jornadas Do Founder

Use este mapa para acompanhar quais jornadas do founder foram desenhadas com `journey-template.md`.

| Status | Etapa | Momento | Arquivo Da Jornada | Workflow / Entrada | Intenção Do Founder |
| --- | --- | --- | --- | --- | --- |
| [x] | 0 | Setup inicial | `start-leanos.md` | Root `AGENT.md` -> `strategy/AGENT.md` -> `strategy/product/playbooks/idea-calibration.playbook.md` | "vamos começar", "configurar o LeanOS", "iniciar o projeto" |
| [x] | 1 | Primeira definição do produto | `define-mvp.md` | Root `AGENT.md` -> `activation_required: operations.product-ops` -> `operations/workflows/define-mvp.workflow.md` | "Defina o MVP", "qual a primeira versão?", "o que entra no MVP?" |
| [x] | 2 | Calibração de ideias | `idea-calibration.md` | `strategy/product/playbooks/idea-calibration.playbook.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" |
| [x] | 3 | Decisão de roadmap | `idea-to-roadmap.md` | `strategy/workflows/idea-to-roadmap.workflow.md` | "Parece interessante, vamos adicionar ao roadmap", "isso entra no backlog do produto?" |
| [x] | 4 | Item de roadmap para Epic local | `roadmap-item-to-epic.md` | `operations/workflows/roadmap-item-to-epic.workflow.md` | "Isso entra na próxima entrega?", "isso entra no MVP?", "crie um epic para esse item" |
| [x] | 5 | Feature Shaping | `epic-to-features.md` | `operations/workflows/epic-to-features.workflow.md` | "Quebre o epic #123 em features" |
| [x] | 6 | GitHub tracking opcional | `github-sync.md` | Root `AGENT.md` -> DevOps/Product Ops readiness + `.github/leanos/capability-contract.md` | "Sincronize Epics/Features com GitHub", "configura GitHub para o LeanOS" |
| [x] | 7 | Implementação | `feature-to-delivery-cycle.md` | `operations/workflows/feature-to-delivery-cycle.workflow.md` | "Implemente a feature", "implemente a issue #554", "vamos começar essa feature" |
| [ ] | 8 | Review e PR | `review-pr.md` | Dentro de `feature-to-delivery-cycle` ou futuro workflow de review | "Revise o PR", "está pronto para merge?" |
| [x] | 9 | Pós-merge | `post-merge-continuation.md` | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a próxima issue", "o que atualizamos depois do merge?" |
| [ ] | 10 | Lançamento e aprendizado | `launch-learning-loop.md` | `growth/workflows/launch-learning-loop.workflow.md` | "Lançamos, o que aprendemos?", "como melhorar aquisição/conversão?" |

## Regra

Uma jornada está completa apenas quando:

- a jornada voltada ao founder é compreensível sem ler os internos do scaffold;
- cada passo de rota tem evidência em arquivos de AGENT, README, YAML, index, role, skill, playbook ou workflow;
- o checklist de validação da jornada passa;
- a tabela do roadmap é atualizada para `[x]`.
