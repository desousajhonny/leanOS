---
name: mvp-validation-scope
description: Use quando escopo de validação do mvp é necessário para o pedido ativo
---

# Escopo de Validação do MVP

## Propósito

Transformar uma Strategy Baseline confirmada no menor escopo de validação do MVP antes do planejamento de delivery de Product Ops.

## Use Quando

- Use quando esta sequência de execução corresponder ao pedido ativo.

## Antes de Agir

- `../AGENT.md`
- `../area.yaml`

## Entradas

- ../knowledge/brief.md
- ../knowledge/problem.md
- ../knowledge/icp.md
- ../knowledge/value-proposition.md
- ../../business/knowledge/business-model-canvas.md
- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Processo

1. Carregue a Strategy Baseline confirmada a partir do knowledge de Product.
2. Use `skills/mvp-validation-scope/SKILL.md` para identificar a primeira tese de negócio a validar.
3. Escolha o menor artefato de validação: slice de produto, landing page, workflow manual/concierge, protótipo ou automação simples.
4. Separe Dentro do Escopo, Fora do Escopo, Partes Manuais / Concierge e Partes Productizadas.
5. Defina Sinais de Sucesso e Sinais de Pivot.
6. Rascunhe a Sequência de Validação do MVP sem criar roadmap, Epics, Features, issues do GitHub ou trabalho de implementação.
7. Use `skills/coherence/SKILL.md` antes de propor atualizações de arquivo.
8. Peça ao founder para confirmar o escopo de validação do MVP antes de escrever.
9. Depois da confirmação, ofereça o handoff para Product Ops quando o founder quiser escopo de delivery ou planejamento de Epic.

## Conversa Guiada

Use `../../../ai-standard/foundation/guided-conversation.md`.

- Comece reafirmando a Strategy Baseline confirmada.
- Peça apenas restrições ausentes ou escolhas de validação.
- Quando o founder quiser velocidade, prefira o menor artefato capaz de ensinar algo real ao negócio.
- Deixe o handoff explícito: Strategy valida o que deve ser tentado; Product Ops transforma escopo confirmado em trabalho de delivery.

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.

## Condições de Parada

- Pare e peça confirmação antes de alterar arquivos sensíveis de segurança.

## Critérios de Aceite e Saídas

- Escopo de Validação do MVP
- Tese de negócio
- MVP slice
- Sinais de sucesso
- Sinais de pivot
- Sequência de Validação do MVP
- Recomendação de handoff para Product Ops

## Arquivos para Atualizar

- ../knowledge/mvp-validation-scope.md
- ../knowledge/validation-notes.md

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

Comece em `../AGENT.md`, escolha um papel em `../roles/`, carregue as skills necessárias em `../skills/` e então use este playbook.
