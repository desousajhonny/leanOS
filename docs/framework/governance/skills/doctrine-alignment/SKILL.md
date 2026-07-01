---
name: doctrine-alignment
description: Use quando uma decisão ou mudança precisa ser checada contra doutrina, princípios, valores, decision log e modelo operacional do LeanOS.
---

# Doctrine Alignment

## Visão Geral

Skill de uso interno do framework para checar alinhamento com Business as a Product, Strategy-first, progressão e regras não negociáveis.

## Use Quando

- Mudança altera comportamento central, layout, progressão, activation gates ou source of truth.
- O mantenedor pergunta se algo segue visão, princípios ou valores.
- Uma decisão nova pode contradizer decisão anterior.

## Contexto Obrigatório

- `leanos-doctrine.md`
- `operating-model.md`
- `decision-rules.md`
- `decision-log.md`

## Entradas

- Decisão ou mudança.
- Princípio possivelmente afetado.
- Evidências de contexto.
- Arquivos alterados.

## Processo

### Etapa 1: Mapear princípios afetados

Identifique Business as a Product, Strategy antes de Delivery, progressão acima de scaffolding, linguagem natural, local source of truth, readiness ou founder clarity.

### Etapa 2: Comparar contra decisões

Procure conflitos com decision log e regras de decisão.

### Etapa 3: Registrar Evidências

Liste trechos, arquivos e contratos que sustentam a análise.

### Etapa 4: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- A mudança trata o negócio como produto ou só o software?
- Strategy continua antes de Delivery?
- A progressão continua menor e guiada?
- A fonte local continua primária?
- Alguma decisão anterior foi contradita sem update no decision log?

## Matriz De Avaliação

| Princípio | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Business as a Product | Conecta negócio, produto e aprendizado | Conexão indireta | Vira template/código |
| Strategy-first | Mantém baseline antes de delivery | Exceção pouco clara | Implementação sem baseline |
| Progressão | Ativa por necessidade | Completa cedo demais | Força áreas/departamentos |
| Source of truth | Local e owner claro | Owner ambíguo | GitHub/chat/memória primário |
| Readiness | Gate verificável | Gate informal | Engineering recebe ideia bruta |

## Sinais De Alerta

- Mais arquivos sem melhorar decisão.
- Área ativada porque "é bom ter".
- Decisão durável fora do decision log.
- MVP tratado como perfeição ou como build apressado sem aprendizado.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "Isso é padrão de mercado" | Só importa se melhora o LeanOS e o founder. |
| "É mais completo" | Progressão vale mais que completude inicial. |
| "A mudança é pequena" | Pequena mudança em gate pode causar grande drift. |
| "Já está no roadmap temporário" | Roadmap temporário não é source of truth. |

## Exemplo De Saída

```text
Doctrine alignment:
- Status: blocked
- Severity: blocker
- Princípios avaliados: Progressão, Strategy-first, Source of truth
- Evidências: leanos-doctrine.md, operating-model.md
- Conflitos: ativa Operations por default no setup recomendado
- Decision log necessário: sim, se a decisão for intencional
```

## Verificações e Critérios de Aceite

- Toda conclusão aponta para Evidências.
- Conflitos viram `risk` ou `blocked`.
- Decisão durável nova exige update do decision log.
- Status final é `pass, risk ou blocked`.

## Saída

```text
Doctrine alignment:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Princípios avaliados:
- Evidências:
- Conflitos:
- Decision log necessário:
```

## Arquivos para Atualizar

- `docs/framework/source-of-truth/leanos-doctrine.md`
- `docs/framework/source-of-truth/operating-model.md`
- `docs/framework/source-of-truth/decision-rules.md`
- `docs/framework/source-of-truth/decision-log.md`

## Linhas Vermelhas

- Não aprove mudança que contradiz princípio não negociável.
- Não substitua source of truth por consenso de conversa.
- Não aceite completude falsa como melhoria.
