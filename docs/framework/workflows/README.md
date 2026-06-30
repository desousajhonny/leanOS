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
| `feature-to-delivery-cycle` | `operations` | Coordenar Product Ops, Engineering e áreas condicionais da interpretação da Feature até branch, implementação, revisão e PR. | `product-ops`, `engineering` | `design`, `security`, `devops` | "implemente a feature", "podemos iniciar o desenvolvimento?", "essa feature já pode ir para código?". |
| `post-merge-continuation` | `operations` | Continuar o delivery depois de merge sem perder contexto de produto, engenharia, release ou aprendizado. | `product-ops`, `engineering` | `devops`, `security`, `growth/customer-experience`, `strategy/roadmap` | "o PR foi mergeado", "terminamos essa feature", "o que fazemos depois do merge?", "vamos para a próxima". |
| `security-hardening-cycle` | `operations` | Auditar e fortalecer riscos de Security em produto, código, dados, APIs, AI app runtime, automações e readiness. | `security` | `product-ops`, `engineering`, `devops`, `growth/customer-experience`, `strategy/product` | "audite segurança", "tem vulnerabilidade?", "dados de cliente", "LGPD", "vazou token", "proteger API". |
| `ready-for-launch` | `operations` | Decidir se uma release, beta ou MVP pode ir para usuários reais antes de Growth, deploy ou learning loop. | `product-ops`, `engineering`, `devops` | `design`, `security`, `growth/marketing`, `growth/customer-experience`, `strategy/product` | "está pronto para lançar?", "podemos lançar?", "vamos abrir beta?", "pode ir para usuários reais?". |
| `launch-learning-loop` | `growth` | Coordenar marketing, customer experience e finance depois de lançamento aprovado ou executado. | `marketing`, `customer-experience` | `growth/finance`, `strategy/product`, `operations/product-ops` | "lançamento aprovado, prepare a execução", "como aprendemos com os usuários?", "o que fazer depois do lançamento?", "vamos analisar feedback". |

## Observações Operacionais

- Calibrar uma ideia não é workflow. A entrada padrão para "vamos começar", "tenho uma ideia" ou "vamos avaliar essa ideia" é `strategy/product/playbooks/idea-calibration.playbook.md`.
- `idea-calibration` usa `map-business-baseline` para ler `leanos.yaml`, estágio do negócio e knowledge ativa, depois usa `define-product-core` quando houver sinal suficiente para consolidar produto, usuário, problema e promessa.
- Strategy não possui workflow ativo no scaffold inicial; decisões de ideia, MVP Validation Scope e roadmap são conduzidas por playbooks de área.
- `mvp-validation-scope` não cria Roadmap ou backlog. Ele cria uma sequência de validação e pode fazer handoff direto para Product Ops quando o founder quiser delivery.
- `roadmap-cycle-planning` é playbook de Strategy/Roadmap para `product_operating`, `growth_scaling` ou pedidos explícitos de ciclo/priorização entre múltiplas frentes.
- `mvp-backlog-planning` é playbook de Product Ops, não workflow. Ele recebe um MVP Validation Scope aprovado e registra os itens em `operations/product-ops/mvp/backlog.md`.
- `delivery-item-to-epic` e `epic-to-features` são playbooks de Product Ops, não workflows. Eles operam dentro da área para criar Epic local e Feature drafts.
- `feature-to-delivery-cycle` só deve começar quando a Feature tiver readiness suficiente ou quando um spike técnico for explicitamente aprovado.
- `security-hardening-cycle` deve ser usado quando o founder pedir auditoria, vulnerabilidade, LGPD, vazamento de token, proteção de API ou revisão de risco AI-native. Ele não corrige código, infra ou secrets automaticamente; produz gate, achados e rota de mitigação.
- `ready-for-launch` pertence a Operations porque é gate de readiness para usuários reais. Ele não executa deploy nem Growth automaticamente.
- `launch-learning-loop` pertence a Growth e deve transformar sinais de mercado/cliente em aprendizado depois que o lançamento foi aprovado/executado, antes de criar novo trabalho de produto.
