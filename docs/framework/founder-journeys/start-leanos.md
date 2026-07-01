# Jornada: Iniciar O LeanOS

Esta jornada desenha como o LeanOS deve lidar com um founder dizendo:

```text
"Vamos começar."
```

O propósito não é construir imediatamente um MVP completo, roadmap ou plano de delivery. O propósito é mapear o estágio atual do negócio, calibrar a ideia inicial, construir a Strategy Baseline mínima e identificar a próxima rota segura.

## Visão Humana

- **Trigger:** founder quer começar, recomeçar ou entender por onde iniciar.
- **Objetivo:** transformar o contexto inicial em uma lacuna clara de Strategy Baseline, incluindo Business Foundation mínima, e uma próxima pergunta guiada.
- **Começa em:** `AGENT.md` raiz.
- **Passa por:** `strategy/AGENT.md`, `strategy/product/AGENT.md`, Product Strategist, `business-baseline`, `strategy/business/playbooks/business-foundation.playbook.md` quando faltar contexto de negócio, e playbook de Idea Calibration.
- **Termina com:** atualizações confirmadas de knowledge em Strategy ou uma próxima rota stage-aware como `mvp-validation-scope.playbook.md`, `roadmap-cycle-planning.playbook.md` ou `activation_required: operations.product-ops`.
- **Não faz:** criar itens de roadmap, definir escopo de delivery do MVP, criar Epics/Features, ativar Operations/Growth ou iniciar implementação.

## Diagrama Do Fluxo

```mermaid
flowchart TD
  A["Founder: vamos começar"]
  B["Root AGENT.md"]
  C["Ler leanos.yaml + indexes ativos"]
  D["Strategy AGENT"]
  E["Strategy Product AGENT"]
  F["Product Strategist"]
  G["skill business-baseline"]
  H{"Business Foundation bloqueia baseline?"}
  N["Business Foundation com opções"]
  I["playbook Idea Calibration"]
  J{"Strategy Baseline pronta?"}
  O["Fazer uma pergunta guiada"]
  K["Propor atualizações em Strategy"]
  L["Handoff stage-aware: MVP Validation Scope / Roadmap / Product Ops"]
  M["Parar sem escrever"]

  A --> B --> C --> D --> E --> F --> G --> H
  H -->|Sim| N --> I
  H -->|Não| I
  I --> J
  J -->|Não| O --> K
  J -->|Sim| L
  K -->|Founder recusa| M
```

## Fluxo Em Linguagem Simples

O modelo começa no `AGENT.md` raiz porque o founder fala em linguagem natural. O roteamento raiz lê `leanos.yaml`, fase atual e indexes ativos antes de entrar em Strategy. Depois entra em Strategy Product porque calibrar uma ideia é trabalho de área e playbook, não workflow.

Strategy Product usa `business-baseline/SKILL.md` para mapear o estágio atual, as lacunas de baseline e a próxima pergunta guiada. Se missão, princípios, modelo de receita, canal, modelo de entrega, limite de promessa ou colaboração founder/IA estiverem indefinidos e bloquearem a baseline, Product chama `strategy/business/playbooks/business-foundation.playbook.md`.

Business Foundation não abre entrevista livre. O modelo oferece opções simples, uma pergunta por vez, e registra as respostas como `business_foundation_status: draft` e `confidence: founder-assumption` até existir evidência.

Depois disso, `idea-calibration.playbook.md` conduz a conversa até a Strategy Baseline ficar aceitável. A jornada termina quando o founder confirma atualizações em Strategy ou escolhe uma próxima rota segura.

## Trigger Do Founder

Frases reais que podem iniciar esta jornada:

- "Vamos começar."
- "Quero começar agora."
- "Como eu inicio o LeanOS?"
- "Por onde começamos?"
- "Quero configurar o LeanOS."

## Contrato De Rota

A rota obrigatória é:

```text
Root AGENT.md
-> leanos.yaml
-> active .leanos/index/*
-> strategy/AGENT.md
-> strategy/product/AGENT.md
-> strategy/product/roles/product-strategist.role.md
-> strategy/product/skills/business-baseline/SKILL.md
-> strategy/business/playbooks/business-foundation.playbook.md quando Business Foundation bloquear a baseline
-> strategy/product/playbooks/idea-calibration.playbook.md
-> strategy/product/playbooks/mvp-validation-scope.playbook.md quando o founder quiser analisar o MVP de validação
-> operations.product-ops quando o estágio for mvp_building ou mvp_live_learning e a ideia afetar entrega
-> strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md quando o estágio for product_operating/growth_scaling ou houver múltiplas prioridades
```

## Regras De Parada

- Não faça uma pergunta genérica como "me conte mais" quando uma lacuna específica de baseline está visível.
- Não faça entrevista aberta para missão, princípios, modelo de negócio ou operação; use perguntas guiadas com opções.
- Não registre Business Foundation inicial como validada; use status de rascunho/hipótese do founder.
- Não crie itens de roadmap antes que a Strategy Baseline esteja minimamente coerente.
- Não defina escopo de delivery do MVP antes de Product Ops estar ativo.
- Não crie Epics, Features, branches, PRs ou código fonte.
- Não ative Operations ou Growth a partir desta jornada sem um gate posterior confirmado.

## Checklist De Conclusão

- [x] O `AGENT.md` raiz roteia intenção de início para Strategy.
- [x] Product tem uma skill `business-baseline`.
- [x] Business Foundation usa perguntas guiadas e atualiza profile, missão, visão, princípios, operating model e Business Model Canvas.
- [x] O playbook `idea-calibration` usa estágio do negócio, gate, requisitos ativos e limites de ativação.
- [x] A jornada para antes de roadmap, escopo de delivery do MVP, Epic, Feature e trabalho de implementação.
