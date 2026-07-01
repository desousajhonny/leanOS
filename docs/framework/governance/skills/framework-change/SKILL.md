---
name: framework-change
description: Use quando uma mudança no LeanOS precisa ser avaliada por impacto de framework antes de commit, PR ou auditoria sob demanda.
---

# Framework Change

## Visão Geral

Skill de uso interno do framework para avaliar mudanças no LeanOS com evidência, status explícito e próximos passos.

## Use Quando

- Mudança toca scaffold, CLI, source of truth, generated assets, GitHub, release, journeys ou validações.
- O mantenedor pede análise geral de uma mudança do framework.
- O checklist antes de commit/PR precisa consolidar riscos.

## Contexto Obrigatório

- Doutrina e regras de decisão do LeanOS.
- Diff ou descrição da mudança.
- Arquivos afetados.
- Testes ou validações disponíveis.

## Entradas

- Mudança avaliada.
- Motivação.
- Impactos esperados.
- Evidências disponíveis.

## Processo

### Etapa 1: Classificar impacto

Classifique impacto em doctrine, Nav Chain, founder experience, asset quality, handoff, GitHub, release, CLI ou docs.

### Etapa 2: Verificar evidência

Liste Evidências concretas: arquivos, validações, testes, decisões e source of truth lidos.

### Etapa 3: Avaliar risco

Marque lacunas que podem quebrar progressão, fonte da verdade, ativação, readiness ou clareza do founder.

### Etapa 4: Decidir

Retorne status `pass, risk ou blocked`.

## Perguntas De Auditoria

- Qual comportamento do framework muda na prática?
- Qual princípio do LeanOS pode ser afetado?
- A mudança melhora a próxima decisão do founder ou só adiciona estrutura?
- Há impacto em progressive mode, all-at-once e projeto existente?
- Existe validação automatizada para o que é mecânico?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Doutrina | Alinhada e evidenciada | Ambígua | Contraditória |
| Progressão | Mantém gates | Gate pouco claro | Pula gate |
| Founder | Reduz confusão | Aumenta detalhe | Exige organograma |
| Assets | Inventariados e testados | Inventário pendente | Invisíveis/duplicados |
| Source of truth | Preservado | Ambíguo | Redefinido por lugar errado |

## Sinais De Alerta

- Mudança sem owner claro.
- Root `AGENT.md` crescendo com listas longas.
- GitHub usado como prova primária.
- Falta de teste para contrato mecânico.
- Nova estrutura que o founder precisa entender manualmente.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "É só uma melhoria interna" | Interno no framework vira comportamento gerado. |
| "O modelo vai lembrar" | Comportamento durável precisa arquivo/validação. |
| "O founder pediu" | Pedido ainda passa por doutrina e gates. |
| "Depois testamos" | Se é contrato mecânico, teste antes de concluir. |

## Exemplo De Saída

```text
Framework change assessment:
- Status: risk
- Severity: high
- Evidências: AGENT.md, decision-rules.md, validation/framework-governance.mjs
- Impactos: Nav Chain e founder experience
- Riscos: root pode virar inventário se novos intents forem adicionados inline
- Ações recomendadas: mover intents para intent-map.yaml e adicionar validação
```

## Verificações e Critérios de Aceite

- A avaliação não depende de memória do modelo.
- Toda conclusão cita Evidências.
- Status é `pass, risk ou blocked`.
- Riscos têm ação recomendada.

## Saída

```text
Framework change assessment:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Evidências:
- Impactos:
- Riscos:
- Ações recomendadas:
```

## Arquivos para Atualizar

- `docs/framework/source-of-truth/decision-log.md`
- `MODEL_MEMORY.md`
- Inventários e validações aplicáveis.

## Linhas Vermelhas

- Não aprove mudança sem ler source of truth quando ela altera comportamento.
- Não trate documentação como validação quando o critério for mecânico.
- Não esconda risco para manter a mudança andando.
