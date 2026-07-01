# Jornada: Idea Calibration

Esta jornada desenha como o LeanOS deve lidar com pedidos como:

```text
"Vamos começar."
"Tenho uma ideia."
"Quero avaliar essa ideia para meu produto."
"Isso faz sentido para o produto?"
```

O propósito é calibrar a ideia contra o estágio real do negócio antes de qualquer MVP, roadmap, Epic, Feature ou implementação.

## Visão Humana

- **Trigger:** founder quer começar, aprofundar uma ideia ou avaliar uma mudança.
- **Objetivo:** entender contexto, estágio, fundação de negócio, usuário, dor, valor, riscos e próximo caminho seguro.
- **Começa em:** `AGENT.md` raiz.
- **Passa por:** `strategy/AGENT.md`, `strategy/product/AGENT.md`, Product Strategist ou Product Manager, `business-baseline`, `strategy/business/playbooks/business-foundation.playbook.md` quando necessário, e `idea-calibration.playbook.md`.
- **Termina com:** ideia calibrada, pergunta guiada, proposta de update em Strategy ou recomendação de próxima rota.
- **Não faz:** criar roadmap diretamente, definir delivery scope, criar Epic/Feature, ativar Engineering ou implementar.

## Diagrama Do Fluxo

```mermaid
flowchart TD
  A["Founder: começo / nova ideia / avaliar ideia"]
  B["Root AGENT.md"]
  C["Ler leanos.yaml + contexto ativo"]
  D["Strategy AGENT.md"]
  E["Strategy Product AGENT.md"]
  F["Product Strategist ou Product Manager"]
  G["skill business-baseline"]
  H{"Business Foundation incompleta?"}
  W["business-foundation.playbook.md com perguntas guiadas"]
  I["playbook idea-calibration"]
  X{"Estágio do negócio?"}
  J["seed / strategy_forming: formar baseline"]
  K["mvp_shaping: comparar com MVP Validation Scope"]
  L["mvp_building: proteger foco de entrega"]
  M["mvp_live_learning: comparar com sinais reais"]
  N["product_operating / growth_scaling: avaliar fit, clientes, roadmap, risco e timing"]
  O["Propor decisão e próxima rota"]
  P{"Founder confirma?"}
  Q["Atualizar knowledge permitido"]
  R["Handoff por estágio"]
  T["seed / strategy_forming / mvp_shaping: mvp-validation-scope"]
  U["mvp_building / mvp_live_learning: Product Ops"]
  V["product_operating / growth_scaling: roadmap-cycle-planning"]
  S["Parar sem escrever"]

  A --> B --> C --> D --> E --> F --> G --> H
  H -->|Sim| W --> I
  H -->|Não| I
  I --> X
  X --> J --> O
  X --> K --> O
  X --> L --> O
  X --> M --> O
  X --> N --> O
  O --> P
  P -->|Sim| Q --> R
  R --> T
  R --> U
  R --> V
  P -->|Não| S
```

## Fluxo Em Linguagem Simples

O Chief começa lendo o estado real do workspace. Ele não pergunta ao founder qual estágio escolher; ele infere a partir de `leanos.yaml`, arquivos ativos de Strategy e conversa.

Depois entra em Strategy Product e usa `business-baseline` como primeira skill. Essa skill identifica o estágio do negócio, o que já se sabe, as lacunas da Strategy Baseline e a menor pergunta útil.

Quando a lacuna for de negócio, não de produto, Product não tenta resolver sozinho. Ele chama `strategy/business/playbooks/business-foundation.playbook.md` para preencher missão, visão, princípios, modelo operacional e Business Model Canvas com perguntas guiadas. O founder responde por opções, e o modelo registra tudo como hipótese inicial até haver evidência.

O playbook `idea-calibration` conduz a conversa. Em um negócio no estágio `seed`, ele ajuda a descobrir usuário, dor e promessa. Em um produto já operando, ele avalia se a ideia combina com clientes, roadmap, riscos e timing. O mesmo playbook funciona para os dois casos porque o estágio muda o caminho interno.

## Contrato De Rota

```text
Root AGENT.md
-> leanos.yaml
-> active .leanos/index/*
-> strategy/AGENT.md
-> strategy/product/AGENT.md
-> strategy/product/roles/product-strategist.role.md ou product-manager.role.md
-> strategy/product/skills/business-baseline/SKILL.md
-> strategy/business/playbooks/business-foundation.playbook.md quando missão, princípios, receita, canal, entrega ou operação bloquearem a baseline
-> strategy/product/playbooks/idea-calibration.playbook.md
```

## Próximas Rotas Possíveis

- `strategy/product/playbooks/mvp-validation-scope.playbook.md`: quando o negócio está em `seed`, `strategy_forming` ou `mvp_shaping` e a ideia já está calibrada para analisar o menor MVP de validação.
- `activation_required: operations.product-ops`: quando o negócio está em `mvp_building` ou `mvp_live_learning` e a ideia afeta o MVP atual, MVP backlog ou escopo de delivery.
- `strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md`: quando o negócio está em `product_operating` ou `growth_scaling`, ou quando o founder pede explicitamente ciclo, backlog ou priorização entre múltiplas frentes.
- Parar sem escrever: quando a ideia ainda está vaga, foi descartada ou o founder não confirmou updates.

## Regras De Parada

- Não faça pergunta genérica quando uma lacuna específica está visível.
- Não aceite entrevista aberta como padrão quando a lacuna tiver opções previsíveis.
- Não trate Business Foundation como validada; use `business_foundation_status: draft` e `confidence: founder-assumption`.
- Não trate toda ideia nova como MVP em negócios que já estão construindo, validando, operando ou escalando.
- Não escreva knowledge sem confirmação.
- Não crie roadmap, Epic, Feature ou código a partir da calibragem.
- Não abra Product Ops, Engineering, Design, Security, DevOps ou Growth sem gate e confirmação.

## Checklist De Conclusão

- [x] O `AGENT.md` raiz roteia começo e ideias para Strategy.
- [x] Strategy Product tem `business-baseline`.
- [x] Strategy Product chama Business Foundation quando lacunas de negócio bloqueiam Product Core.
- [x] Strategy Product tem `idea-calibration.playbook.md`.
- [x] A jornada usa estágio do negócio antes de avaliar a ideia.
- [x] A jornada termina com decisão, pergunta guiada ou próxima rota confirmável.
