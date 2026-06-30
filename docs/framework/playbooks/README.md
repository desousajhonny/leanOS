# Inventário De Playbooks Do Framework

Este inventário resume os playbooks que o LeanOS conhece hoje no catálogo do gerador.

Fonte canônica: `packages/cli/src/templates/workspace/definitions/departments.ts`.

Regra de manutenção: sempre que um playbook for criado, removido, renomeado ou mudar de área, atualize este inventário no mesmo conjunto de alterações.

## Como Ler

- Workflows coordenam progressão, gates e handoffs.
- Playbooks executam um procedimento prático dentro de uma área.
- Skills são capacidades reutilizáveis chamadas por roles e playbooks.
- Caminho padrão quando a área está ativa: `<departamento>/<area>/playbooks/<playbook>.playbook.md`.

## Strategy

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `business-foundation` | `strategy.business` | Transformar contexto bruto em identidade, princípios e modelo operacional usáveis. | Role `business-strategist`; pedidos de fundação de negócio. |
| `idea-calibration` | `strategy.product` | Calibrar qualquer ideia do founder contra o estágio atual do negócio, consolidar o núcleo de produto e avaliar fit sem pular para roadmap, MVP scope ou delivery. | Roles `product-strategist` e `product-manager`; pedidos como "vamos começar", "tenho uma ideia" ou "vamos avaliar essa ideia". |
| `mvp-validation-scope` | `strategy.product` | Transformar Strategy Baseline confirmada no menor escopo e sequência de validação de MVP antes de Product Ops. | Roles `product-strategist` e `product-manager`; handoff vindo de `idea-calibration`; handoff direto para Product Ops quando o founder quiser delivery. |
| `roadmap-cycle-planning` | `strategy.roadmap` | Planejar ciclo de roadmap quando o produto está em `product_operating`, `growth_scaling` ou há pedido explícito de priorização entre múltiplas frentes. | Role `roadmap-planner`; pedidos de roadmap, backlog, ciclo ou priorização em produto operando. |

## Operations

### Product Ops

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `mvp-backlog-planning` | `operations.product-ops` | Transformar um MVP Validation Scope aprovado pelo founder em itens de MVP backlog antes de qualquer Epic ou Feature. | Role `product-owner`; handoff vindo de Strategy Product; ativa quando Product Ops está ativo. |
| `delivery-item-to-epic` | `operations.product-ops` | Transformar item aprovado de MVP backlog, roadmap, backlog ou delivery scope em Epic local antes de Feature, GitHub ou código. | Role `product-owner`; skills `define-delivery-scope` e `shape-epic`. |
| `delivery-scope-planning` | `operations.product-ops` | Decidir se um item de MVP backlog, roadmap, backlog ou delivery candidate vira escopo confirmado sem criar issue ou código. | Role `product-owner`; usado por Product Ops quando escopo precisa ser isolado antes do Epic. |
| `epic-to-features` | `operations.product-ops` | Quebrar Epic local em Feature drafts com tasks internas e DRM antes de Engineering. | Role `product-owner`; skills `shape-epic` e `write-feature-criteria`. |
| `delivery-readiness` | `operations.product-ops` | Confirmar se uma issue ou slice de MVP tem clareza para entrar em Engineering. | Role `delivery-architect`; workflows de delivery quando readiness está em dúvida. |

### Design

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `design-foundation` | `operations.design` | Criar fundação de design do MVP antes da implementação. | Role `product-designer`; item de MVP backlog ou gates de Feature com UI. |
| `component-readiness` | `operations.design` | Preparar decisão de componente ou spec quando uma Feature precisa de clareza de UI. | Role `product-designer`; playbook `epic-to-features` ou workflow `feature-to-delivery-cycle`. |
| `user-research` | `operations.design` | Esclarecer evidência de usuário antes de decisões de UX. | Role `ux-researcher`; rotas de Design com evidência insuficiente. |
| `mvp-ux-flow` | `operations.design` | Criar fluxo usável para o primeiro ciclo de validação. | Roles `ux-researcher` e `product-designer`; item de MVP backlog ou Feature com impacto de UX. |
| `accessibility-review` | `operations.design` | Revisar fundação ou fluxo de UX por acessibilidade. | Role `accessibility-specialist`; gates de Design/Feature. |
| `ux-writing` | `operations.design` | Definir linguagem de interface para fluxos de MVP. | Role `ux-writer`; Features com copy de interface. |

### Engineering

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `engineering-delivery` | `operations.engineering` | Orquestrar caminho interno de Engineering: branch, implementação, testes, PR e validação. | Role `senior-developer`; workflow `feature-to-delivery-cycle`. |
| `branch-for-feature` | `operations.engineering` | Criar plano de branch seguro antes da implementação. | Role `senior-developer`; workflow `feature-to-delivery-cycle`. |
| `component-implementation` | `operations.engineering` | Implementar componente reutilizável a partir de spec aprovada por Design. | Role `senior-developer`; workflow `feature-to-delivery-cycle`. |
| `prepare-pr` | `operations.engineering` | Preparar PR revisável a partir de uma Feature confirmada. | Role `senior-developer`; workflow `feature-to-delivery-cycle`. |
| `test-planning` | `operations.engineering` | Planejar validação de implementação sem soltar instruções procedurais em arquivos avulsos. | Roles `senior-developer` e `test-engineer`; trabalho de implementação ou revisão. |
| `pr-validation` | `operations.engineering` | Validar implementação antes de merge. | Roles `senior-developer`, `test-engineer` e `pr-reviewer`; workflow `feature-to-delivery-cycle`. |

### DevOps

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `setup-ci-cd` | `operations.devops` | Planejar automação de build, teste e release. | Role `devops-engineer`; readiness de CI/CD. |
| `plan-deployment` | `operations.devops` | Planejar deploy seguro. | Roles `devops-engineer` e `release-manager`; release/deploy. |
| `configure-github-project` | `operations.devops` | Preparar settings de GitHub para sync de Epics/Features sem chamar API diretamente. | Roles `devops-engineer` e `github-devops`; fluxo de sync GitHub. |
| `configure-environments` | `operations.devops` | Planejar ambientes e configuração sem inventar infraestrutura. | Role `devops-engineer`; preparação de entrega. |
| `define-observability` | `operations.devops` | Definir visibilidade de runtime para logs, métricas, alertas e traces. | Roles `devops-engineer` e `release-manager`; pós-deploy/release. |
| `release-operations` | `operations.devops` | Preparar caminho operacional de release. | Roles `devops-engineer` e `release-manager`; workflow `post-merge-continuation` quando release for necessário. |

### Security

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `security-foundation` | `operations.security` | Criar ou atualizar baseline inicial de Security para MVP. | Role `security-reviewer`; MVP com risco de segurança. |
| `pre-mvp-security-checklist` | `operations.security` | Rodar checklist leve antes de implementação de MVP ou quebra de issues. | Roles `security-reviewer` e `data-protection-reviewer`; gates antes de delivery. |
| `security-automation-readiness` | `operations.security` | Decidir checks automatizados necessários, habilitados, adiados ou não aplicáveis. | Roles `security-reviewer` e `cloud-security-reviewer`; readiness de Security/DevOps. |
| `pre-deploy-security-review` | `operations.security` | Ser gate de segurança antes de produção ou preview sensível. | Roles de Security; pré-deploy. |
| `ai-app-security-review` | `operations.security` | Revisar produto AI, agente, RAG ou automação por risco de runtime antes de implementação, PR, launch ou operação contínua. | Role `ai-security-engineer`; skill `ai-runtime-security-review`; workflow `security-hardening-cycle`; Features AI e gates de launch. |
| `api-security-review` | `operations.security` | Revisar endpoint ou mudança de API antes de implementação, PR ou deploy. | Role `application-security-engineer`; Features com API. |
| `database-security-review` | `operations.security` | Revisar mudanças de banco por privacidade, isolamento, backup, query e permissões. | Role `data-protection-reviewer`; Features com persistência. |
| `secrets-rotation` | `operations.security` | Guiar rotação segura de secrets após leak, suspeita ou mudança de credencial. | Role `cloud-security-reviewer`; incidentes/secrets. |
| `vulnerability-response` | `operations.security` | Responder a dependências vulneráveis, caminhos inseguros ou weaknesses descobertas. | Role `application-security-engineer`; vulnerabilidades. |
| `incident-response` | `operations.security` | Rodar resposta leve para leaks, abuso, outages ou regressões de segurança. | Role `cloud-security-reviewer`; incidentes. |
| `ai-generated-code-security-review` | `operations.security` | Revisar mudanças geradas por IA para falhas comuns de segurança. | Roles `security-reviewer` e `application-security-engineer`; PRs/código gerado por IA. |

## Growth

| Playbook | Área | Serve Para | Pode Ser Ativado Por |
| --- | --- | --- | --- |
| `customer-learning-loop` | `growth.customer-experience` | Transformar sinais de cliente em próximas ações sem overbuild de processo. | Role `cx-lead`; workflow `launch-learning-loop`. |
| `mvp-launch` | `growth.marketing` | Lançar MVP dentro de um ciclo focado de aprendizado. | Role `growth-lead`; workflow `launch-learning-loop`. |
| `finance-review` | `growth.finance` | Revisar premissas de negócio e risco financeiro. | Role `finance-operator`; rotas com pricing, budget, receita ou unit economics. |
