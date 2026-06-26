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
| `delivery-item-to-epic` | `operations` | Transformar item aprovado de MVP backlog, roadmap, backlog ou delivery scope em Epic local com outcome, escopo, não objetivos, riscos e readiness notes. | `product-ops` | `operations/design`, `operations/security`, `operations/devops`, `operations/engineering` | "vamos transformar esse item do MVP em Epic", "crie um Epic", "isso entra no MVP?", "qual milestone recebe esse item?". |
| `epic-to-features` | `operations` | Quebrar Epic local em Features implementáveis com tasks internas e critérios de Delivery Readiness Matrix antes de Engineering. | `product-ops`, `engineering` | `design`, `security`, `devops` | "quebre esse epic em features", "prepara esse epic para desenvolvimento", "transforma esse epic em trabalho executável". |
| `feature-to-delivery-cycle` | `operations` | Coordenar Product Ops, Engineering e áreas condicionais da interpretação da Feature até branch, implementação, revisão e PR. | `product-ops`, `engineering` | `design`, `security`, `devops` | "implemente a feature", "podemos iniciar o desenvolvimento?", "essa feature já pode ir para código?". |
| `post-merge-continuation` | `operations` | Continuar o delivery depois de merge sem perder contexto de produto, engenharia, release ou aprendizado. | `product-ops`, `engineering` | `devops`, `security`, `growth/customer-experience`, `strategy/roadmap` | "o PR foi mergeado", "terminamos essa feature", "o que fazemos depois do merge?", "vamos para a próxima". |
| `launch-learning-loop` | `growth` | Coordenar marketing, customer experience e finance depois de lançamento. | `marketing`, `customer-experience` | `growth/finance`, `strategy/product`, `operations/product-ops` | "vamos lançar", "como aprendemos com os usuários?", "o que fazer depois do lançamento?", "vamos analisar feedback". |

## Observações Operacionais

- Calibrar uma ideia não é workflow. A entrada padrão para "vamos começar", "tenho uma ideia" ou "vamos avaliar essa ideia" é `strategy/product/playbooks/idea-calibration.playbook.md`.
- `idea-calibration` usa `map-business-baseline` para ler `leanos.yaml`, estágio do negócio e knowledge ativa, depois usa `define-product-core` quando houver sinal suficiente para consolidar produto, usuário, problema e promessa.
- Strategy não possui workflow ativo no scaffold inicial; decisões de ideia, MVP Validation Scope e roadmap são conduzidas por playbooks de área.
- `mvp-validation-scope` não cria Roadmap ou backlog. Ele cria uma sequência de validação e pode fazer handoff direto para Product Ops quando o founder quiser delivery.
- `roadmap-cycle-planning` é playbook de Strategy/Roadmap para `product_operating`, `growth_scaling` ou pedidos explícitos de ciclo/priorização entre múltiplas frentes.
- `mvp-backlog-planning` é playbook de Product Ops, não workflow. Ele recebe um MVP Validation Scope aprovado e registra os itens em `operations/product-ops/mvp/backlog.md`.
- `delivery-item-to-epic` e `epic-to-features` são a ponte principal para delivery quando Product Ops está ativo.
- `feature-to-delivery-cycle` só deve começar quando a Feature tiver readiness suficiente ou quando um spike técnico for explicitamente aprovado.
- `launch-learning-loop` pertence a Growth e deve transformar sinais de mercado/cliente em aprendizado antes de criar novo trabalho de produto.
