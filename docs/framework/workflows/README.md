# Inventário De Workflows Do Framework

Este inventário resume os workflows que o LeanOS conhece hoje no catálogo do gerador.

Fonte canônica: `packages/cli/src/templates/workspace/definitions/departments.ts`.

Regra de manutenção: sempre que um workflow for criado, removido, renomeado, mudar de departamento ou mudar seus gates principais, atualize este inventário no mesmo conjunto de alterações.

## Como Ler

- Workflows coordenam progressão, gates, handoffs e áreas.
- Eles são acionados por intenção em linguagem natural interpretada pelo `AGENT.md` raiz e pelos `AGENT.md` de departamento/área.
- Um workflow não deve tratar área `available` como carregável. Se uma área necessária estiver inativa, a rota deve parar com `activation_required`.
- Caminho padrão quando o departamento está ativo: `<departamento>/workflows/<workflow>.workflow.md`.

## Resumo

| Workflow | Departamento | Serve Para | Áreas Necessárias | Áreas Condicionais | Ativado Por |
| --- | --- | --- | --- | --- | --- |
| `business-intake` | `strategy` | Orientar o ponto de partida do founder, mapear estágio do negócio, formar Strategy Baseline mínima e decidir próxima rota segura. | `business`, `product`, `roadmap` | Nenhuma | "quero começar", "como começar", "iniciar LeanOS", "vamos começar". |
| `new-idea-intake` | `strategy` | Capturar e qualificar uma nova ideia, decidindo se refina Strategy, atualiza MVP Validation Scope ou vira candidata de roadmap. | `product`, `roadmap` | Nenhuma | "tenho uma ideia", "quero avaliar uma feature nova", "isso faz sentido para o produto?", "pensei em uma melhoria". |
| `idea-to-roadmap` | `strategy` | Promover ideia qualificada ou MVP Validation Scope para Roadmap Candidate ou backlog sem criar delivery scope ou GitHub execution. | `product`, `roadmap` | `operations.product-ops`, `growth.customer-experience` | "vamos colocar essa ideia no roadmap", "salve isso no backlog", "isso entra no backlog?", "vamos priorizar". |
| `define-mvp` | `operations` | Estruturar o primeiro escopo de MVP a partir de Strategy usando o MVP Decision Gate antes de Epics, Features, GitHub, branch ou código. | `product-ops` | `strategy/product`, `strategy/roadmap`, `operations/design`, `operations/security`, `operations/engineering`, `operations/devops` | "defina o MVP", "qual a primeira versão?", "o que entra no MVP?", "vamos definir a primeira entrega". |
| `roadmap-item-to-epic` | `operations` | Transformar item confirmado de roadmap/backlog em Epic local com outcome, escopo, não objetivos, riscos e readiness notes. | `product-ops` | `operations/design`, `operations/security`, `operations/devops`, `operations/engineering` | "vamos transformar esse item do roadmap em epic", "crie um epic", "isso entra no MVP?", "qual milestone recebe esse item?". |
| `epic-to-features` | `operations` | Quebrar Epic local em Features implementáveis com tasks internas e critérios de Delivery Readiness Matrix antes de Engineering. | `product-ops`, `engineering` | `design`, `security`, `devops` | "quebre esse epic em features", "prepara esse epic para desenvolvimento", "transforma esse epic em trabalho executável". |
| `feature-to-delivery-cycle` | `operations` | Coordenar Product Ops, Engineering e áreas condicionais da interpretação da Feature até branch, implementação, revisão e PR. | `product-ops`, `engineering` | `design`, `security`, `devops` | "implemente a feature", "podemos iniciar o desenvolvimento?", "essa feature já pode ir para código?". |
| `post-merge-continuation` | `operations` | Continuar o delivery depois de merge sem perder contexto de produto, engenharia, release ou aprendizado. | `product-ops`, `engineering` | `devops`, `security`, `growth/customer-experience`, `strategy/roadmap` | "o PR foi mergeado", "terminamos essa feature", "o que fazemos depois do merge?", "vamos para a próxima". |
| `launch-learning-loop` | `growth` | Coordenar marketing, customer experience e finance depois de lançamento. | `marketing`, `customer-experience` | `growth/finance`, `strategy/product`, `operations/product-ops` | "vamos lançar", "como aprendemos com os usuários?", "o que fazer depois do lançamento?", "vamos analisar feedback". |

## Observações Operacionais

- `business-intake` usa `idea-calibration` para calibrar a ideia e, após confirmação, pode oferecer `mvp-validation-scope`.
- `new-idea-intake` é Strategy-first e não deve criar delivery work.
- `idea-to-roadmap` ainda trabalha em Strategy; Product Ops só entra quando o trabalho vira escopo de entrega.
- `define-mvp`, `roadmap-item-to-epic` e `epic-to-features` são a ponte principal de Strategy para delivery.
- `feature-to-delivery-cycle` só deve começar quando a Feature tiver readiness suficiente ou quando um spike técnico for explicitamente aprovado.
- `launch-learning-loop` pertence a Growth e deve transformar sinais de mercado/cliente em aprendizado antes de criar novo trabalho de produto.
