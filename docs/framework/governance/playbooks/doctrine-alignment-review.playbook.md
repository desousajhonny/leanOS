---
name: doctrine-alignment-review
description: Use quando uma mudança no LeanOS pode afetar doutrina, princípios, visão, modelo operacional, progressão, source of truth ou decisões duráveis.
---

# Doctrine Alignment Review

## Propósito

Checar se uma decisão ou mudança do framework continua alinhada ao Business as a Product, à progressão Strategy-first, à topologia operacional orientada a fluxo de valor e às regras de decisão do LeanOS.

## Use Quando

- Checklist Antes De Commit/PR para mudança estrutural.
- Auditoria Sob Demanda sobre visão, princípios, valores ou coerência estratégica.
- Alterações em source of truth, roadmap, journeys, activation policy, generated layout ou ownership.
- Mudanças que criam, removem ou reposicionam áreas, roles, skills, playbooks, workflows ou handoffs.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança:

- altera a progressão do negócio;
- cria, remove ou muda gate;
- muda ownership de source of truth;
- muda layout gerado ou estrutura do workspace;
- muda topologia de comunicação, fluxo de valor ou carga cognitiva do founder/agente;
- altera regras de GitHub como source/espelho;
- muda comportamento de Strategy, Product Ops, Engineering, Growth ou Security;
- contradiz ou substitui decisão anterior.

## Antes de Agir

Leia a fonte canônica antes de avaliar: `leanos-doctrine.md`, `operating-model.md`, `decision-rules.md` e `decision-log.md`.

## Entradas

- Mudança proposta ou diff.
- Decisão que motivou a mudança.
- Arquivos fonte afetados.
- Critérios de sucesso esperados.

## Processo

### Etapa 1: Mapear princípio afetado

Classifique se a mudança toca Business as a Product, Strategy antes de Delivery, progressão acima de scaffolding, topologia de fluxo de valor, linguagem natural, `AGENT.md` canônico, activation gates, source of truth local, delivery readiness ou founder clarity.

### Etapa 2: Comparar contra decisões existentes

Verifique conflito com decision log. Se houver conflito, a saída deve indicar se a decisão antiga será preservada, substituída ou revisada.

### Etapa 3: Avaliar risco de drift

Procure sinais de drift:

- o framework começa a construir antes de entender hipótese;
- departamentos aparecem cedo demais;
- GitHub vira fonte primária;
- root `AGENT.md` vira inventário;
- readiness vira sugestão em vez de gate;
- founder precisa entender organograma para usar o sistema.
- nova área/role/skill/playbook existe por completude, não por fluxo de valor;
- especialista entra sem gatilho claro ou vira gargalo permanente;
- Product Ops concentra decisões que pertencem a Strategy, Design, Finance, Security, DevOps ou Growth.

### Etapa 4: Emitir decisão

Produza `pass / risk / blocked` com evidências e ajuste necessário.

## Matriz De Avaliação

| Princípio | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Business as a Product | Melhora decisão de negócio/produto | Benefício indireto ou pouco explícito | Trata LeanOS como gerador de código/template |
| Strategy antes de Delivery | Mantém Strategy Baseline antes de delivery | Permite exceção com justificativa fraca | Permite MVP/Epic/Feature/código sem baseline |
| Progressão acima de scaffolding | Ativa só o necessário | Adiciona superfície cedo demais, mas com gate | Reintroduz escolha manual de departamentos |
| Topologia de fluxo de valor | Reduz carga cognitiva, esclarece ownership ou melhora handoff | Adiciona estrutura útil, mas com gatilho fraco | Cria organograma em pasta, silo ou especialista sem gatilho |
| Trabalho local de produto é primário | Preserva arquivos locais como fonte | Github ganha peso ambíguo | GitHub/memória/chat vira fonte primária |
| Delivery exige readiness | Reforça gates e packets | Readiness pouco verificável | Engineering recebe ideia bruta ou Epic cru |
| Clareza para founder | Reduz confusão | Aumenta carga cognitiva sem blocker | Founder precisa entender organograma |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: fere princípio não negociável ou decisão durável sem atualizar source of truth.
- `high`: cria ambiguidade operacional relevante.
- `medium`: precisa de documentação, teste ou copy melhor.
- `low`: ajuste de terminologia sem impacto de comportamento.

## Cenários De Pressão

- "A mudança ajuda power users": verifique se não quebra progressive default.
- "É só um atalho": confirme se não pula Strategy, activation gate ou readiness.
- "GitHub fica mais prático": confirme se não vira source of truth primário.
- "Parece uma empresa real": confirme se a estrutura melhora fluxo de valor, não organograma.
- "Especialista garante qualidade": confirme se há gatilho, output consumível e saída clara do especialista.
- "O modelo entende pelo contexto": se é comportamento durável, precisa estar em source of truth ou validação.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Isso economiza perguntas" | Economizar pergunta não justifica pular confirmação crítica. |
| "Todos os departamentos prontos é mais completo" | O default é progressão, não completude inicial. |
| "A issue do GitHub já prova escopo" | Issue remota não substitui Feature/readiness local. |
| "Mais áreas deixam o LeanOS mais profissional" | Área só entra se reduzir carga cognitiva, risco ou ambiguidade no fluxo de valor. |
| "O especialista revisa tudo por segurança" | Especialista precisa de gatilho claro para não virar gargalo permanente. |
| "É uma exceção pequena" | Exceções estruturais precisam decision log. |

## Resultado Obrigatório

```text
Doctrine alignment:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Princípios avaliados:
- Evidências:
- Conflitos:
- Source of truth update necessário:
- Decision log necessário:
- Decisão:
```

## Condições de Parada

- `blocked`: conflito direto com princípio não negociável.
- `risk`: princípio preservado, mas há ambiguidade, falta de decision log ou validação.
- `pass`: mudança reforça ou preserva a doutrina com evidência suficiente.

## Critérios de Aceite e Saídas

Inclua:

- princípios avaliados;
- evidências;
- decisão `pass / risk / blocked`;
- decisão durável necessária;
- arquivos de source of truth a atualizar.

## Arquivos para Atualizar

- `docs/framework/source-of-truth/leanos-doctrine.md`
- `docs/framework/source-of-truth/operating-model.md`
- `docs/framework/source-of-truth/decision-rules.md`
- `docs/framework/source-of-truth/decision-log.md`
- `MODEL_MEMORY.md`

## Linhas Vermelhas

- Não aprove uma mudança porque "parece útil" se ela contradiz Business as a Product.
- Não use roadmap temporário ou memória como fonte canônica.
- Não substitua decisão durável por comentário solto em código.
