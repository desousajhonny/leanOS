# Inventário De Skills Do Framework

Este inventário resume as skills que o LeanOS conhece hoje no catálogo do gerador.

Fonte canônica: `packages/cli/src/templates/workspace/definitions/departments.ts`.

Regra de manutenção: sempre que uma skill for criada, removida, renomeada ou mudar de área, atualize este inventário no mesmo conjunto de alterações.

## Como Ler

- `Strategy` é gerado no workspace inicial.
- `Operations` e `Growth` fazem parte do catálogo disponível para ativação progressiva.
- Uma skill normalmente é ativada por uma role da área, por um playbook da área ou por um workflow que roteia para aquela área.
- Caminho padrão quando a área está ativa: `<departamento>/<area>/skills/<skill>/SKILL.md`.

## Strategy

### Business

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/business/AGENT.md` -> role `business-strategist` -> playbook `business-foundation`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `define-business-identity` | Definir identidade do negócio, missão, princípios e contexto base. | Role `business-strategist`; playbook `business-foundation`; pedidos sobre negócio, missão, visão ou princípios. |
| `clarify-operating-model` | Definir como founder, humanos e agentes de IA colaboram no negócio. | Role `business-strategist`; playbook `business-foundation`; pedidos sobre modelo operacional, ownership ou colaboração humano/IA. |

### Product

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/product/AGENT.md` -> roles `product-strategist` ou `product-manager` -> playbook `idea-calibration`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `map-business-baseline` | Mapear contexto inicial, estágio do negócio, lacunas da Strategy Baseline e próxima pergunta segura. | Primeiro passo do playbook `idea-calibration`; role `product-strategist`; início do LeanOS ou qualquer ideia nova. |
| `define-product` | Esclarecer produto, problema, usuário alvo e status do produto. | Roles `product-strategist` e `product-manager`; playbook `idea-calibration`. |
| `define-icp` | Definir o primeiro segmento de cliente com dores, gatilhos e exclusões. | Role `product-strategist`; playbook `idea-calibration`; pedidos sobre ICP, usuário alvo ou validação. |
| `define-value-proposition` | Articular promessa, resultado, prova e diferenciação. | Role `product-strategist`; playbook `idea-calibration`; pedidos sobre proposta de valor ou posicionamento. |
| `define-business-model` | Rascunhar receita, canais, custos e modelo de entrega. | Role `product-strategist`; playbook `idea-calibration`; pedidos sobre pricing, receita ou modelo de negócio. |
| `define-mvp-validation-scope` | Definir o menor caminho de validação do MVP e gerar um Roadmap Candidate inicial. | Playbook `mvp-validation-scope`; handoff vindo de `idea-calibration` ou `idea-to-roadmap`; roles `product-strategist` e `product-manager`. |
| `evaluate-idea` | Avaliar uma nova ideia contra valor do usuário, evidência, fit com MVP e impacto no roadmap. | Playbook `idea-calibration`; roles `product-strategist` e `product-manager`; pedidos de nova ideia ou mudança de direção. |
| `check-coherence` | Checar coerência entre ICP, problema, proposta de valor, escopo de MVP, roadmap e issue. | Roles `product-strategist` e `product-manager`; playbook `idea-calibration`; revisões de coerência antes de avançar. |

### Roadmap

Ativação padrão: `AGENT.md` -> `strategy/AGENT.md` -> `strategy/roadmap/AGENT.md` -> role `roadmap-planner` -> playbook `roadmap-cycle-planning`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `create-roadmap` | Sequenciar trabalho por resultado de negócio, valor, escopo de MVP e restrições. | Role `roadmap-planner`; playbook `roadmap-cycle-planning`; pedidos para criar ou revisar roadmap. |
| `prioritize-backlog` | Priorizar candidatos por valor, risco, evidência, esforço e fit com ciclo atual. | Workflow `idea-to-roadmap`; role `roadmap-planner`; pedidos de backlog ou priorização. |

## Operations

### Product Ops

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/product-ops/AGENT.md` -> roles `product-owner` ou `delivery-architect`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `define-delivery-scope` | Decidir se item de roadmap vira escopo concreto de entrega com `scope_type`, milestone e release goal. | Workflow `roadmap-item-to-epic`; role `product-owner`; playbook `delivery-scope-planning`. |
| `define-mvp` | Aplicar o gate de decisão do MVP e transformar Strategy em menor escopo coerente de primeira entrega. | Workflow `define-mvp`; role `product-owner`; playbook `mvp-delivery`; rotas vindas de Strategy quando Product Ops estiver ativo. |
| `write-acceptance-criteria` | Definir critérios de aceite para trabalho de MVP. | Role `product-owner`; playbooks de Product Ops quando critérios forem necessários. |
| `check-delivery-coherence` | Checar se escopo de entrega combina com Strategy, roadmap e critérios de aceite. | Roles `product-owner` e `delivery-architect`; playbooks `delivery-scope-planning`, `mvp-delivery` ou `delivery-readiness`. |
| `shape-epic` | Transformar item de roadmap em Epic local com fronteiras, outcome, escopo e não objetivos. | Workflows `roadmap-item-to-epic` e `epic-to-features`; role `product-owner`; playbook `epic-to-features`. |
| `write-feature-criteria` | Aplicar a Delivery Readiness Matrix e escrever Features com critérios e tasks internas. | Workflow `epic-to-features`; role `product-owner`; playbook `epic-to-features`. |
| `define-delivery-boundaries` | Definir limites técnicos e operacionais mínimos para implementação segura sem arquitetura prematura. | Role `delivery-architect`; playbook `delivery-readiness`; pedidos sobre boundaries de entrega. |

### Design

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/design/AGENT.md` -> roles `ux-researcher`, `product-designer`, `accessibility-specialist` ou `ux-writer`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `user-research` | Extrair evidências, suposições e perguntas de UX a partir do contexto de produto. | Role `ux-researcher`; playbook `user-research`; rotas de design quando evidência de usuário for necessária. |
| `user-flow-mapping` | Mapear os passos do usuário até o resultado do MVP. | Roles `ux-researcher`, `product-designer` e `ux-writer`; playbooks `design-foundation` e `mvp-ux-flow`. |
| `design-system` | Definir tokens, regras visuais, componentes esperados e princípios de interação do MVP. | Role `product-designer`; playbooks `design-foundation` e `component-readiness`. |
| `component-analysis` | Decidir se uma Feature reutiliza componente, adapta componente ou precisa de spec de componente. | Role `product-designer`; playbook `component-readiness`; gates de Feature com UI. |
| `screen-specification` | Definir tela, estado, interação e notas de handoff para Engineering. | Role `product-designer`; playbook `mvp-ux-flow`; Features com tela concreta. |
| `microcopy` | Escrever labels, helper texts, estados vazios, erros e mensagens de sucesso. | Role `ux-writer`; playbook `ux-writing`; Features com texto de interface. |
| `accessibility` | Definir baseline de acessibilidade, teclado, foco, contraste, forms e screen reader. | Role `accessibility-specialist`; playbooks de Design; workflows `define-mvp`, `roadmap-item-to-epic`, `epic-to-features` e `feature-to-delivery-cycle` quando aplicável. |
| `design-review` | Avaliar impacto de UX/design em issues, PRs, telas, fluxos ou decisões. | Roles `product-designer`, `accessibility-specialist` e `ux-writer`; playbook `accessibility-review`; revisões de Design. |

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
| `configure-environments` | Definir fronteiras de local, preview/staging e produção sem inventar infraestrutura. | Role `devops-engineer`; playbook `configure-environments`; preparação de delivery/deploy. |
| `setup-ci` | Definir automação de build, teste e validação antes de PRs serem merge-ready. | Role `devops-engineer`; playbook `setup-ci-cd`; readiness de entrega. |
| `plan-deployment` | Planejar release e rollback sem criar estado em provider automaticamente. | Roles `devops-engineer` e `release-manager`; playbook `plan-deployment`; pré-release. |
| `define-observability` | Definir logs, erros, métricas, alertas e checks pós-deploy. | Roles `devops-engineer` e `release-manager`; playbook `define-observability`; operação/release. |
| `prepare-release` | Resumir escopo, readiness, riscos, rollback e follow-up de release. | Roles `devops-engineer` e `release-manager`; playbook `release-operations`; pós-merge/release. |

### Security

Ativação padrão: `AGENT.md` -> `operations/AGENT.md` -> `operations/security/AGENT.md` -> roles `security-reviewer`, `application-security-engineer`, `cloud-security-reviewer` ou `data-protection-reviewer`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `threat-modeling` | Identificar ativos, atores, trust boundaries, abusos prováveis e mitigações. | Role `security-reviewer`; playbook `security-foundation`; Features com risco de abuso ou dados. |
| `access-control-review` | Revisar autenticação, autorização, ownership e acesso admin. | Roles `security-reviewer` e `data-protection-reviewer`; playbooks de Security quando auth/permissão existir. |
| `api-security-review` | Revisar APIs por auth, autorização, rate limit, validação, CORS e abuso. | Role `application-security-engineer`; playbook `api-security-review`; Features/API/PRs com endpoints. |
| `database-security-review` | Revisar privacidade, isolamento, queries, backup e permissões de banco. | Role `data-protection-reviewer`; playbook `database-security-review`; Features com dados persistentes. |
| `secrets-management` | Revisar armazenamento de secrets, tokens, rotação e resposta a vazamento. | Roles `application-security-engineer` e `cloud-security-reviewer`; playbook `secrets-rotation`; DevOps/Security. |
| `secure-code-review` | Revisar falhas comuns de segurança e escolhas inseguras de implementação. | Roles `security-reviewer`, `application-security-engineer` e `data-protection-reviewer`; playbooks de review e pré-deploy. |
| `dependency-supply-chain-review` | Revisar dependências por pacotes inexistentes, versões vulneráveis e supply chain. | Role `application-security-engineer`; playbook `vulnerability-response`; PRs com dependências. |
| `infra-hardening-review` | Revisar exposição de infra, CORS, rate limits, service accounts e permissões de deploy. | Role `cloud-security-reviewer`; playbook `pre-deploy-security-review`; deploy/release. |
| `incident-response` | Guiar resposta leve a vazamentos, vulnerabilidades, abuso, outages e regressões de produção. | Role `cloud-security-reviewer`; playbook `incident-response`; incidentes e pós-release. |
| `security-automation-readiness` | Decidir quais scanners/checks entram sem criar automação frágil cedo demais. | Roles `security-reviewer` e `cloud-security-reviewer`; playbook `security-automation-readiness`; readiness de segurança. |
| `ai-generated-code-security` | Revisar riscos criados por agentes de IA, diffs gerados e permissões amplas. | Roles `security-reviewer` e `application-security-engineer`; playbook `ai-generated-code-security-review`; PRs ou código gerado por IA. |

## Growth

### Customer Experience

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/customer-experience/AGENT.md` -> role `cx-lead` -> playbook `customer-learning-loop`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `map-customer-feedback` | Agrupar feedback em sinais de produto, suporte e growth. | Workflow `launch-learning-loop`; role `cx-lead`; playbook `customer-learning-loop`. |
| `synthesize-support-patterns` | Transformar notas de suporte em aprendizado e ações. | Role `cx-lead`; playbook `customer-learning-loop`; pedidos sobre padrões de suporte ou feedback. |

### Marketing

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/marketing/AGENT.md` -> role `growth-lead` -> playbook `mvp-launch`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `define-positioning` | Definir categoria, audiência, promessa e diferenciação. | Workflow `launch-learning-loop`; role `growth-lead`; playbook `mvp-launch`. |
| `create-landing-page-copy` | Criar copy para landing page inicial de validação ou lançamento. | Role `growth-lead`; playbook `mvp-launch`; pedidos de landing page, validação ou lançamento. |
| `create-launch-plan` | Planejar ações, canais e ciclos de aprendizado de lançamento. | Workflow `launch-learning-loop`; role `growth-lead`; playbook `mvp-launch`. |

### Finance

Ativação padrão: `AGENT.md` -> `growth/AGENT.md` -> `growth/finance/AGENT.md` -> role `finance-operator` -> playbook `finance-review`.

| Skill | Serve Para | Pode Ser Ativada Por |
| --- | --- | --- |
| `model-unit-economics` | Esclarecer hipóteses de aquisição, entrega, margem e custos. | Role `finance-operator`; playbook `finance-review`; rotas de Growth/Finance com custo, margem ou spend. |
| `review-pricing` | Avaliar hipóteses de pricing contra valor do cliente e custos. | Role `finance-operator`; playbook `finance-review`; rotas de pricing, packaging ou receita. |
