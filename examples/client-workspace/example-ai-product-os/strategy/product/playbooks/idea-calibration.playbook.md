---
name: idea-calibration
description: Use quando o founder traz uma ideia bruta, nova hipótese ou mudança de produto sem contexto suficiente; o estágio do negócio precisa ser lido antes de roadmap, MVP backlog ou implementação; uma ideia precisa ser separada em fatos, suposições, fit estratégico e próxima rota segura
---

# Idea Calibration

## Propósito

Calibrate any founder idea against the current estágio de negócio, from first seed idea to product-operating change, without jumping into roadmap, MVP backlog or implementation.

## Use Quando

- o founder traz uma ideia bruta, nova hipótese ou mudança de produto sem contexto suficiente
- o estágio do negócio precisa ser lido antes de roadmap, MVP backlog ou implementação
- uma ideia precisa ser separada em fatos, suposições, fit estratégico e próxima rota segura

## Antes de Agir

- `../AGENT.md`
- `../area.yaml`

## Entradas

- ../../../leanos.yaml
- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/positioning.md
- ../knowledge/validation-notes.md
- ../../business/knowledge/business-model-canvas.md

## Processo

1. Carregue o AGENT de Product e escolha Product Strategist ou Product Manager.
2. Use `skills/business-baseline/SKILL.md` primeiro para ler `leanos.yaml`, contexto ativo de Strategy, estágio de negócio e lacunas de Strategy Baseline.
3. Se faltarem missão, princípio, modelo de receita, canal, modelo de entrega, limite de promessa ou colaboração founder/IA e isso bloquear a baseline, roteie para `../../business/playbooks/business-foundation.playbook.md` antes de consolidar Product Core.
4. Escolha o caminho de calibração pelo estágio de negócio: `seed` ou `strategy_forming` constrói baseline; `mvp_shaping` compara com Escopo de Validação do MVP; `mvp_building` protege o foco de delivery atual; `mvp_live_learning` verifica sinais de aprendizado; `product_operating` e `growth_scaling` avaliam fit com produto, clientes, roadmap, riscos e timing existentes.
5. Faça apenas as perguntas de discovery necessárias para amadurecer a ideia para o estágio de negócio atual.
6. Use `skills/product-core/SKILL.md` quando houver sinal suficiente para consolidar produto, usuário primário, problema central, promessa, diferenciação e suposição mais arriscada.
7. Avalie fit, suposições, evidência, impacto no MVP e impacto no roadmap dentro deste playbook quando a ideia afetar um MVP, produto, roadmap, sinal de cliente ou cadência operacional existente.
8. Roteie decisões de pricing, receita, canal ou modelo de delivery para `../../business/skills/business-model/SKILL.md` apenas quando bloquearem a decisão de Product.
9. Separe fatos, suposições, perguntas abertas e decisões do founder.
10. Apresente a ideia calibrada com leitura do estágio de negócio atual, Product Core, avaliação de fit e menor próxima rota segura.
11. Peça ao founder para confirmar, corrigir ou continuar calibrando antes de escrever arquivos de knowledge.
12. Depois da confirmação, escolha a ponte pelo estágio de negócio: `seed`, `strategy_forming` ou `mvp_shaping` -> `playbooks/mvp-validation-scope.playbook.md`; `mvp_building` ou `mvp_live_learning` -> `activation_required: operations.product-ops`; `product_operating` ou `growth_scaling` -> `../../roadmap/playbooks/roadmap-cycle-planning.playbook.md`. Use uma nota de validação quando a ideia não estiver pronta. Não crie roadmap, Epics, Features ou escopo de delivery aqui.

## Conversa Guiada

Use `.leanos/standard/foundation/guided-conversation.md`.

- Faça uma pergunta útil por vez, ligada à maior lacuna de Strategy Baseline ou fit do estágio de negócio atual.
- Não aceite entrevista aberta como padrão; ofereça opções numeradas quando o founder precisar decidir.
- Evite fadiga de entrevista; não force toda skill quando a ideia já estiver clara o bastante.
- Não trate toda nova ideia como MVP quando o negócio já está construindo, validando, operando ou escalando.
- Use escolhas numeradas para lacunas previsíveis de usuário, problema, promessa, receita, canal, princípio, limite de promessa e modelo operacional.
- Peça resposta por número; se o founder responder em texto, mapeie para a opção mais próxima e confirme a interpretação.
- Termine com uma pergunta clara de confirmação antes de atualizar arquivos.

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.

## Condições de Parada

- Pare e peça confirmação antes de alterar arquivos sensíveis de segurança.

## Critérios de Aceite e Saídas

- Leitura do estágio de negócio atual
- Resumo da ideia calibrada
- Avaliação de fit
- Proposta de Strategy Baseline ou recomendação de product-fit
- Fatos conhecidos
- Suposições
- Perguntas abertas
- Próxima rota recomendada

## Arquivos para Atualizar

- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../knowledge/positioning.md
- ../knowledge/validation-notes.md

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

Comece em `../AGENT.md`, escolha um papel em `../roles/`, carregue as skills necessárias em `../skills/` e então use este playbook.
