# Mapa De Jornadas Do Founder

Use este mapa para acompanhar quais jornadas do founder foram desenhadas com `journey-template.md`.

| Status | Etapa | Momento | Arquivo Da Jornada | Workflow / Entrada | Intenção Do Founder |
| --- | --- | --- | --- | --- | --- |
| [x] | 0 | Setup inicial | `start-leanos.md` | Root `AGENT.md` -> `strategy/AGENT.md` -> `strategy/product/playbooks/idea-calibration.playbook.md` | "vamos começar", "configurar o LeanOS", "iniciar o projeto" |
| [x] | 1 | MVP Backlog operacional | `mvp-backlog-planning.md` | Root `AGENT.md` -> `activation_required: operations.product-ops` -> `operations/product-ops/playbooks/mvp-backlog-planning.playbook.md` | "Pode seguir com esse MVP", "transforme isso em backlog do MVP", "o que entra no MVP operacional?" |
| [x] | 2 | Calibração de ideias | `idea-calibration.md` | `strategy/product/playbooks/idea-calibration.playbook.md` | "Tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?" |
| [x] | 3 | Item aprovado para Epic local | `delivery-item-to-epic.md` | `operations/product-ops/playbooks/delivery-item-to-epic.playbook.md` | "Isso entra na próxima entrega?", "isso entra no MVP?", "crie um Epic para esse item" |
| [x] | 4 | Feature Shaping | `epic-to-features.md` | `operations/product-ops/playbooks/epic-to-features.playbook.md` | "Quebre o epic #123 em features" |
| [x] | 5 | GitHub tracking opcional | `github-sync.md` | Root `AGENT.md` -> DevOps/Product Ops readiness + `.github/leanos/capability-contract.md` | "Sincronize Epics/Features com GitHub", "configura GitHub para o LeanOS" |
| [x] | 6 | Implementação | `feature-to-delivery-cycle.md` | `operations/workflows/feature-to-delivery-cycle.workflow.md` | "Implemente a feature", "implemente a issue #554", "vamos começar essa feature" |
| [x] | 7 | Review e PR | `review-pr.md` | `operations/engineering/playbooks/pr-validation.playbook.md` | "Revise o PR", "está pronto para merge?" |
| [x] | 8 | Pós-merge | `post-merge-continuation.md` | `operations/workflows/post-merge-continuation.workflow.md` | "Mergeado, vamos para a próxima issue", "o que atualizamos depois do merge?" |
| [x] | 9 | Ready for launch | `ready-for-launch.md` | `operations/workflows/ready-for-launch.workflow.md` | "Está pronto para lançar?", "podemos abrir para usuários reais?", "o que falta para lançar?" |
| [ ] | 10 | Lançamento e aprendizado | `launch-learning-loop.md` | `growth/workflows/launch-learning-loop.workflow.md` | "Lançamos, o que aprendemos?", "como melhorar aquisição/conversão?" |

## Regra

Uma jornada está completa apenas quando:

- a jornada voltada ao founder é compreensível sem ler os internos do scaffold;
- cada passo de rota tem evidência em arquivos de AGENT, README, YAML, index, role, skill, playbook ou workflow;
- o checklist de validação da jornada passa;
- a tabela do roadmap é atualizada para `[x]`.
