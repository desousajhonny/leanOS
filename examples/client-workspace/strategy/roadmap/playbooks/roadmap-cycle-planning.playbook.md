---
name: roadmap-cycle-planning
description: Use quando roadmap cycle planning é necessário para o pedido ativo
---

# Roadmap Cycle Planning

## Propósito

Planeje o próximo ciclo coerente de roadmap a partir de estratégia de produto, restrições operacionais e riscos conhecidos.

## Use Quando

- Use quando esta sequência de execução corresponder ao pedido ativo.

## Antes de Agir

- `../AGENT.md`
- `../area.yaml`

## Entradas

- ../../../leanos.yaml
- ../knowledge/roadmap.md
- ../knowledge/current-cycle.md
- ../knowledge/backlog.md
- ../../product/knowledge/brief.md
- ../../product/knowledge/problem.md
- ../../product/knowledge/value-proposition.md
- ../../product/knowledge/validation-notes.md

## Processo

1. Carregue o AGENT de Roadmap e a role Roadmap Planner.
2. Use apenas quando o produto estiver em `product_operating` ou `growth_scaling`, ou quando o founder pedir explicitamente para sequenciar múltiplas prioridades.
3. Se o negócio estiver em `mvp_building` ou `mvp_live_learning`, roteie a ideia para `activation_required: operations.product-ops` para escopo de MVP, backlog ou planejamento de delivery.
4. Revise estratégia de produto, sinais de cliente e notas de validação.
5. Revise candidatos de backlog.
6. Escolha limites de Now, Next, Later e Not Planned.
7. Defina objetivo do ciclo atual e critérios de sucesso.
8. Proponha atualizações e aguarde confirmação antes de escrever.

## Condições de Parada

- Pare e peça confirmação antes de alterar arquivos sensíveis de segurança.

## Critérios de Aceite e Saídas

- Resumo do ciclo de roadmap
- Proposta de ciclo atual
- Mudanças no backlog
- Follow-up de milestone

## Arquivos para Atualizar

- ../knowledge/roadmap.md
- ../knowledge/current-cycle.md
- ../knowledge/backlog.md

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

Comece em `../AGENT.md`, escolha um papel em `../roles/`, carregue as skills necessárias em `../skills/` e então use este playbook.
