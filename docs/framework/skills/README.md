# Inventário De Skills Do Framework

Este inventário resume as skills que o LeanOS conhece hoje no catálogo do gerador.

Fonte canônica: `packages/cli/src/templates/workspace/definitions/departments.ts`.

Regra de manutenção: sempre que uma skill for criada, removida, renomeada ou mudar de área, atualize este inventário no mesmo conjunto de alterações.

## Como Ler

- `Strategy` é gerado no workspace inicial.
- `Operations` e `Growth` fazem parte do catálogo disponível para ativação progressiva.
- Uma skill normalmente é ativada por uma role da área, por um playbook da área ou por um workflow que roteia para aquela área.
- Caminho padrão quando a área está ativa: `<departamento>/<area>/skills/<skill>/SKILL.md`.

## Framework Governance

Estas skills são de uso interno do framework e não são geradas no workspace do founder. Fonte: `docs/framework/governance/skills/`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `framework-change` | Avaliar impacto geral de uma mudança no LeanOS antes de commit/PR ou auditoria sob demanda. | Playbook `framework-change-review`; pedidos como "avalie essa mudança no framework". |
| `doctrine-alignment` | Checar aderência à doutrina, princípios, modelo operacional e decision log. | Playbook `doctrine-alignment-review`; mudanças estruturais ou decisões duráveis. |
| `nav-chain` | Auditar root -> intent-map -> leanos.yaml -> routing-map -> departamento/área. | Playbook `nav-chain-audit`; mudanças de roteamento, ativação ou `AGENT.md`. |
| `framework-asset` | Revisar qualidade, ownership, trigger, output e inventário de skills, playbooks, workflows, roles e knowledge. | Playbook `asset-quality-review`; revisões de assets do framework. |
| `department-handoff` | Avaliar se uma área entrega evidência, decisão e source of truth consumível pela próxima. | Playbook `department-handoff-review`; mudanças entre áreas e workflows. |
| `founder-experience` | Revisar clareza, carga cognitiva, perguntas, confirmações e ergonomia para o founder. | Playbook `founder-experience-review`; wizard, journeys e respostas do Chief. |

## Strategy

### Business

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/business/AGENT.md` -> role `business-strategist` -> playbook `business-foundation`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `business-identity` | Definir identidade do negócio, missão, visão, princípios e limites de promessa com perguntas guiadas. | Role `business-strategist`; playbook `business-foundation`; pedidos sobre negócio, missão, visão ou princípios. |
| `operating-model` | Definir como founder, humanos e agentes de IA colaboram no negócio com opções de operação seguras. | Role `business-strategist`; playbook `business-foundation`; pedidos sobre modelo operacional, ownership ou colaboração humano/IA. |
| `business-model` | Definir receita, canais, custos, modelo de entrega e hipóteses financeiras no nível do negócio, sem inventar validação. | Role `business-strategist`; pedidos sobre pricing, receita, canais, custos ou modelo de negócio; rota chamada por Product quando isso bloquear uma decisão. |

### Product

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/product/AGENT.md` -> roles `product-strategist` ou `product-manager` -> playbook `idea-calibration`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `business-baseline` | Mapear contexto inicial, estágio do negócio, lacunas da Strategy Baseline e próxima pergunta segura; roteia lacunas de negócio para Business Foundation. | Primeiro passo do playbook `idea-calibration`; role `product-strategist`; início do LeanOS ou qualquer ideia nova. |
| `product-core` | Consolidar produto, usuário primário, problema central, alternativa, promessa, diferenciação e hipótese mais arriscada. | Roles `product-strategist` e `product-manager`; playbook `idea-calibration`; pedidos de descoberta, maturação ou clareza da ideia. |
| `mvp-validation-scope` | Definir o menor caminho e sequência de validação do MVP sem criar Roadmap, Epic, Feature ou escopo de implementação. | Playbook `mvp-validation-scope`; handoff vindo de `idea-calibration`; roles `product-strategist` e `product-manager`. |
| `coherence` | Checar ICP, problema, promessa, alternativa, MVP Validation Scope, roadmap, Feature e evidência com matriz explícita, sem aprovar implementação. | Roles `product-strategist` e `product-manager`; playbook `idea-calibration`; revisões de coerência antes de avançar. |

### Roadmap

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/roadmap/AGENT.md` -> role `roadmap-planner` -> playbook `roadmap-cycle-planning`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `roadmap` | Sequenciar trabalho por resultado de negócio, valor, sinais de produto e restrições quando o negócio está em `product_operating`, `growth_scaling` ou precisa ordenar múltiplas prioridades. | Role `roadmap-planner`; playbook `roadmap-cycle-planning`; pedidos para criar ou revisar roadmap. |
| `backlog-prioritization` | Priorizar candidatos por valor, risco, evidência, esforço e fit com ciclo atual. | Role `roadmap-planner`; playbook `roadmap-cycle-planning`; pedidos de backlog ou priorização. |

## Operations

### Product Ops

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/product-ops/AGENT.md` -> roles `product-owner` ou `delivery-architect`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `define-delivery-scope` | Decidir se item de MVP backlog, roadmap, backlog ou delivery candidate vira escopo concreto de entrega com `scope_type`, milestone e release goal. | Role `product-owner`; playbooks `delivery-item-to-epic` e `delivery-scope-planning`. |
| `write-acceptance-criteria` | Definir critérios de aceite para trabalho de MVP. | Role `product-owner`; playbooks de Product Ops quando critérios forem necessários. |
| `check-delivery-coherence` | Checar se escopo de entrega combina com Strategy, MVP backlog, roadmap e critérios de aceite. | Roles `product-owner` e `delivery-architect`; playbooks `mvp-backlog-planning`, `delivery-scope-planning` ou `delivery-readiness`. |
| `shape-epic` | Transformar item aprovado de MVP backlog, roadmap, backlog ou delivery scope em Epic local com fronteiras, outcome, escopo e não objetivos. | Role `product-owner`; playbooks `delivery-item-to-epic` e `epic-to-features`. |
| `write-feature-criteria` | Aplicar a Delivery Readiness Matrix e escrever Feature drafts com critérios e tasks internas. | Role `product-owner`; playbook `epic-to-features`. |
| `define-delivery-boundaries` | Definir limites técnicos e operacionais mínimos para implementação segura sem arquitetura prematura. | Role `delivery-architect`; playbook `delivery-readiness`; pedidos sobre boundaries de entrega. |

### Design

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/design/AGENT.md` -> roles `ux-researcher`, `product-designer`, `accessibility-specialist` ou `ux-writer`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `user-research` | Extrair evidência, suposições, confiança e lacunas de usuário que informam decisões concretas de UX. | Role `ux-researcher`; playbook `user-research`; rotas de design quando evidência de usuário for necessária. |
| `user-flow-mapping` | Mapear passos, edge cases, telas e decisão de fluxo do usuário até o resultado do MVP. | Roles `ux-researcher`, `product-designer` e `ux-writer`; playbooks `design-foundation` e `mvp-ux-flow`. |
| `design-system` | Definir baseline mínima de tokens, hierarquia visual, componentes, interação e acessibilidade do MVP. | Role `product-designer`; playbooks `design-foundation` e `component-readiness`. |
| `component-analysis` | Decidir se uma Feature reutiliza componente, adapta componente ou precisa de spec de componente no implementation packet. | Role `product-designer`; playbook `component-readiness`; gates de Feature com UI. |
| `screen-specification` | Definir tela, estado, interação e notas de handoff em screen spec dentro do implementation packet. | Role `product-designer`; playbooks `screen-readiness` e `mvp-ux-flow`; Features com tela concreta. |
| `microcopy` | Escrever labels, helper texts, estados vazios, erros e sucessos sem esconder restrição, risco, preço ou promessa sem fonte. | Role `ux-writer`; playbook `ux-writing`; Features com texto de interface. |
| `accessibility` | Definir baseline de acessibilidade, teclado, foco, contraste, forms e screen reader. | Role `accessibility-specialist`; playbooks de Design e workflow `feature-to-delivery-cycle` quando aplicável. |
| `design-review` | Avaliar impacto de UX/design com achados por severidade e recomendação de próxima ação. | Roles `product-designer`, `accessibility-specialist` e `ux-writer`; playbook `accessibility-review`; revisões de Design. |

### Engineering

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/engineering/AGENT.md` -> roles `senior-developer`, `test-engineer` ou `pr-reviewer`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `plan-implementation` | Transformar Feature pronta em plano técnico antes de editar código. | Role `senior-developer`; playbooks `engineering-delivery` e `prepare-pr`; workflow `feature-to-delivery-cycle`. |
| `follow-code-standards` | Aplicar padrões de código, modularidade, naming e regras contra hardcoding. | Roles `senior-developer` e `pr-reviewer`; playbooks `engineering-delivery`, `prepare-pr` e `pr-validation`. |
| `implement-component` | Implementar componente reutilizável a partir de spec aprovada por Design. | Role `senior-developer`; playbook `component-implementation`; workflow `feature-to-delivery-cycle` quando Feature depende de componente. |
| `create-branch` | Definir branch segura vinculada à Feature antes de implementação. | Role `senior-developer`; playbook `branch-for-feature`; workflow `feature-to-delivery-cycle`. |
| `write-tests` | Definir ou atualizar testes para comportamento alterado. | Roles `senior-developer` e `test-engineer`; playbooks `test-planning`, `engineering-delivery` e `pr-validation`. |
| `review-data-change` | Revisar mudanças de banco, API, persistência, migração ou dados sensíveis. | Roles `senior-developer` e `pr-reviewer`; playbooks de delivery/revisão quando há mudança de dados. |
| `create-pr` | Preparar resumo de PR vinculado a escopo, testes e critérios de revisão. | Role `senior-developer`; playbook `prepare-pr`; workflow `feature-to-delivery-cycle`. |
| `review-pr` | Revisar PR por correção, escopo e coerência com LeanOS. | Roles `test-engineer` e `pr-reviewer`; playbook `pr-validation`; workflow `feature-to-delivery-cycle`. |

### DevOps

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/devops/AGENT.md` -> roles `devops-engineer`, `github-devops` ou `release-manager`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `configure-github-project` | Orientar configuração de repo, GitHub Project, labels e origem de tokens sem guardar secrets. | Roles `devops-engineer` e `github-devops`; playbook `configure-github-project`; sync de Epics/Features. |
| `repository-profile` | Preparar description, website e topics do repositório GitHub a partir do README product-first, preservando perfil existente com diff antes de escrita. | Role `github-devops`; playbook `github-safety-baseline`; criação/conexão de repositório GitHub. |
| `configure-environments` | Definir fronteiras de local, preview/staging e produção sem inventar infraestrutura. | Role `devops-engineer`; playbook `configure-environments`; preparação de delivery/deploy. |
| `setup-ci` | Definir automação de build, teste e validação antes de PRs serem merge-ready. | Role `devops-engineer`; playbook `setup-ci-cd`; readiness de entrega. |
| `branch-protection` | Definir baseline obrigatório de proteção da branch principal, required checks, reviews e bloqueio de push direto. | Roles `github-devops` e `devops-engineer`; depois que PR Validation rodar ao menos uma vez. |
| `plan-deployment` | Planejar release e rollback sem criar estado em provider automaticamente. | Roles `devops-engineer` e `release-manager`; playbook `plan-deployment`; pré-release. |
| `define-observability` | Definir logs, erros, métricas, alertas e checks pós-deploy. | Roles `devops-engineer` e `release-manager`; playbook `define-observability`; operação/release. |
| `prepare-release` | Resumir escopo, readiness, riscos, rollback e follow-up de release. | Roles `devops-engineer` e `release-manager`; playbook `release-operations`; pós-merge/release. |

### Security

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/security/AGENT.md` -> roles `security-reviewer`, `application-security-engineer`, `ai-security-engineer`, `cloud-security-reviewer` ou `data-protection-reviewer`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `threat-modeling` | Identificar ativos, atores, trust boundaries, abusos prováveis e mitigações. | Role `security-reviewer`; playbook `security-foundation`; Features com risco de abuso ou dados. |
| `access-control-review` | Revisar autenticação, autorização, ownership e acesso admin. | Roles `security-reviewer` e `data-protection-reviewer`; playbooks de Security quando auth/permissão existir. |
| `api-security-review` | Revisar APIs com decisão explícita sobre authn/authz, validação, rate limit, CORS, abuso, vazamento e evidência. | Role `application-security-engineer`; playbook `api-security-review`; Features/API/PRs com endpoints. |
| `database-security-review` | Revisar banco, schema, query, tenant isolation, backup, rollback, privacidade e permissões com decisão explícita. | Role `data-protection-reviewer`; playbook `database-security-review`; Features com dados persistentes. |
| `secrets-management` | Revisar armazenamento de secrets, tokens, rotação e resposta a vazamento. | Roles `application-security-engineer` e `cloud-security-reviewer`; playbook `secrets-rotation`; DevOps/Security. |
| `secure-code-review` | Revisar falhas comuns de segurança e escolhas inseguras de implementação. | Roles `security-reviewer`, `application-security-engineer` e `data-protection-reviewer`; playbooks de review e pré-deploy. |
| `dependency-supply-chain-review` | Revisar dependências por pacotes inexistentes, versões vulneráveis e supply chain. | Role `application-security-engineer`; playbook `vulnerability-response`; PRs com dependências. |
| `infra-hardening-review` | Revisar exposição de infra, CORS, rate limits, service accounts e permissões de deploy. | Role `cloud-security-reviewer`; playbook `pre-deploy-security-review`; deploy/release. |
| `ai-runtime-security-review` | Revisar runtime de produto AI: LLM input/output, permissões de ferramentas, RAG/vector DB, fronteira de dados de cliente, prompt injection e abuso de custo/rate. | Role `ai-security-engineer`; playbook `ai-app-security-review`; workflow `security-hardening-cycle`; gates de Feature/launch com AI. |
| `incident-response` | Guiar severidade, contenção, rotação de secrets, comunicação, verificação, monitoramento e postmortem de incidentes. | Role `cloud-security-reviewer`; playbook `incident-response`; incidentes e pós-release. |
| `security-automation-readiness` | Decidir quais scanners/checks entram sem criar automação frágil cedo demais. | Roles `security-reviewer` e `cloud-security-reviewer`; playbook `security-automation-readiness`; readiness de segurança. |
| `ai-generated-code-security` | Revisar riscos criados por agentes de IA, diffs gerados e permissões amplas. | Roles `security-reviewer` e `application-security-engineer`; playbook `ai-generated-code-security-review`; PRs ou código gerado por IA. |

## Growth

### Customer Experience

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/customer-experience/AGENT.md` -> role `cx-lead` -> playbook `customer-learning-loop`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `map-customer-feedback` | Sanitizar feedback, classificar força do sinal e rotear aprendizado sem transformar feedback isolado em Feature. | Workflow `launch-learning-loop`; role `cx-lead`; playbook `customer-learning-loop`. |
| `synthesize-support-patterns` | Transformar notas de suporte em aprendizado e ações, usando Pricing Catalog quando plano, cobrança ou entitlement aparecer. | Role `cx-lead`; playbook `customer-learning-loop`; pedidos sobre padrões de suporte, feedback, planos ou billing. |

### Marketing

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/marketing/AGENT.md` -> role `growth-lead` -> playbook `mvp-launch`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `define-positioning` | Definir categoria, ICP, alternativa, promessa, diferenciação, prova disponível e mapa de claims. | Workflow `launch-learning-loop`; role `growth-lead`; playbook `mvp-launch`. |
| `create-landing-page-copy` | Criar copy para landing page inicial de validação ou lançamento, consumindo Pricing Catalog quando houver plano ou preço. | Role `growth-lead`; playbook `mvp-launch`; pedidos de landing page, validação, pricing ou lançamento. |
| `create-launch-plan` | Planejar ações, canais e ciclos de aprendizado de lançamento. | Workflow `launch-learning-loop`; role `growth-lead`; playbook `mvp-launch`. |
| `plan-growth-experiment` | Planejar experimento de Growth com hipótese, Measurement plan, critérios de sucesso/falha e Manual Result Input Template. | Role `growth-lead`; playbook `growth-experiment`; workflow `launch-learning-loop` quando ainda não há resultado. |
| `analyze-growth-result` | Analisar resultado manual ou registrado, calcular métricas simples e produzir Decision output sem inventar telemetria. | Role `growth-lead`; playbook `growth-experiment`; workflow `launch-learning-loop` quando há resultado de experimento ou feedback. |

### Finance

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/finance/AGENT.md` -> role `finance-operator` -> playbook `finance-review`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `model-unit-economics` | Modelar unit economics direcional com fórmulas, premissas, confidence level, Pricing Catalog e Spend Ledger. | Role `finance-operator`; playbook `finance-review`; rotas de Growth/Finance com custo, margem ou spend. |
| `review-pricing` | Avaliar e manter o Pricing Catalog: planos, preços, trials, limites, entitlements, status e Runtime Source. | Role `finance-operator`; playbook `finance-review`; rotas de pricing, packaging, cobrança, subscription, paywall ou receita. |
| `review-spend` | Avaliar gasto recorrente, ferramenta paga, campanha paga, provider novo ou custo variável relevante contra budget, runway e unit economics. | Role `finance-operator`; playbook `spend-approval`; rotas de gastos, ferramentas pagas, mídia paga, providers ou custos variáveis. |
| `runway-check` | Estimar burn mensal, runway e riscos financeiros com premissas explícitas. | Role `finance-operator`; playbook `monthly-finance-check`; pedidos de burn, runway, caixa ou impacto de novo gasto. |
| `budget-planning` | Definir guardrails de budget, limites por categoria, approval thresholds e automações candidatas de alerta/limite. | Role `finance-operator`; playbooks `monthly-finance-check` e `spend-approval`; planejamento de orçamento e limites. |
