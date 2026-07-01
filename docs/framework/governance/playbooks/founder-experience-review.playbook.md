---
name: founder-experience-review
description: Use quando uma mudança pode afetar wizard, jornada, resposta do Chief, perguntas, confirmação, linguagem ou carga cognitiva do founder.
---

# Founder Experience Review

## Propósito

Avaliar se a mudança deixa o LeanOS mais claro e acionável para o founder, sem exigir que ele entenda departamentos, organograma ou detalhes internos do framework.

## Use Quando

- Checklist Antes De Commit/PR para wizard, journeys, root response model, activation prompts, README gerado ou UX textual.
- Auditoria Sob Demanda sobre clareza, fricção ou founder-friendliness.
- Mudanças que adicionam perguntas, gates, confirmações ou novos arquivos visíveis ao founder.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança altera:

- wizard CLI;
- primeira resposta do LeanOS Chief;
- founder journey;
- perguntas guiadas;
- mensagens de ativação;
- confirmação antes de escrita/ação remota;
- README ou documentação visível ao founder;
- status/resumo final que o founder usa para decidir.

## Antes de Agir

Considere o founder como leigo em LeanOS e ocupado. A interface principal é linguagem natural.

## Entradas

- Fluxo ou resposta avaliada.
- Momento da jornada.
- Contexto mínimo que o founder já forneceu.
- Arquivos/áreas que aparecerão para ele.

## Processo

### Etapa 1: Avaliar clareza do próximo passo

Verifique se a resposta mostra `O que já temos`, `O que ainda falta`, `Próximo passo recomendado` e uma pergunta quando necessário.

### Etapa 2: Avaliar carga cognitiva

Confirme que a mudança não força o founder a escolher departamentos, áreas, roles, skills ou playbooks manualmente.

Mantenha uma pergunta por vez quando houver lacuna real. Se uma pergunta guiada simples for suficiente, não use campo aberto longo.

### Etapa 3: Avaliar confirmação

Confirmações devem aparecer antes de ativar áreas, alterar source of truth, criar Epic/Feature, escrever código, executar GitHub/API ou atualizar sync remoto.

### Etapa 4: Avaliar progressão

O fluxo reduz confusão quando mostra a próxima decisão útil, evita detalhes internos cedo demais e não completa o workspace antes da necessidade real.

### Etapa 5: Emitir decisão

Produza `pass / risk / blocked`.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Clareza | Founder entende próximo passo | Próximo passo existe, mas pouco claro | Founder precisa interpretar estrutura interna |
| Carga cognitiva | Uma pergunta por vez e guiada | Perguntas demais ou abertas | Parece entrevista longa/formulário corporativo |
| Progressão | Reduz confusão e move para decisão útil | Adiciona processo com benefício parcial | Completa workspace cedo ou força departamentos |
| Confirmação | Pede confirmação antes de ações críticas | Confirmação pouco explícita | Escreve/ativa/remoto sem confirmação |
| Linguagem | Natural, curta e acionável | Técnica demais em alguns pontos | Exige saber roles, skills ou playbooks |
| Transparência | Mostra o que já temos e falta | Falta contexto de por quê | Oculta risco, restrição ou decisão |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: founder é forçado a escolher departamentos ou ação crítica ocorre sem confirmação.
- `high`: fluxo provavelmente causa decisão errada ou abandono.
- `medium`: clareza/copy precisa melhorar antes de release.
- `low`: ajuste fino de texto.

## Cenários De Pressão

- "O founder quer rapidez": rapidez não justifica pular confirmação crítica.
- "Power user quer tudo": opção avançada não muda default progressivo.
- "Pergunta aberta captura mais nuance": use pergunta guiada quando suficiente.
- "Explicar departamentos ajuda": explique resultado operacional, não organograma.
- "Mais detalhes mostram valor": detalhe só se melhora a próxima decisão.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "O founder pode escolher áreas" | O LeanOS deve rotear pela necessidade, não terceirizar organograma. |
| "Mais contexto sempre ajuda" | Contexto que não ajuda a próxima decisão vira ruído. |
| "Dá para perguntar tudo no setup" | Setup curto alimenta Strategy; não substitui calibração. |
| "Confirmação atrasa" | Confirmação protege source of truth, código e ações remotas. |

## Resultado Obrigatório

```text
Founder experience review:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Momento da jornada:
- O que já temos:
- O que ainda falta:
- Atritos:
- Pergunta/copy recomendada:
- Correções:
```

## Condições de Parada

- `blocked`: founder precisa entender estrutura interna para avançar, ou fluxo pede decisões de departamento.
- `risk`: fluxo é útil, mas longo, ambíguo ou com perguntas abertas demais.
- `pass`: fluxo é curto, guiado, claro e progressivo.

## Critérios de Aceite e Saídas

Inclua:

- momento da jornada;
- atritos encontrados;
- perguntas excessivas ou ausentes;
- decisão `pass / risk / blocked`;
- copy recomendada quando necessário.

## Arquivos para Atualizar

- `docs/framework/founder-journeys/**`
- Templates de `AGENT.md`
- Wizard CLI
- README gerado
- Validações de linguagem/fluxo

## Linhas Vermelhas

- Não aprove fluxo que parece formulário corporativo.
- Não aprove pergunta aberta quando uma pergunta guiada simples resolve.
- Não adicione cerimônia que não melhora a próxima decisão.
- Não esconda riscos ou confirmação necessária para parecer mais fluido.
