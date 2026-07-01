---
name: framework-asset
description: Use quando skill, playbook, workflow, role, knowledge ou template do LeanOS precisa ser revisado por qualidade, ownership e contrato.
---

# Framework Asset

## Visão Geral

Skill de uso interno do framework para revisar assets do LeanOS como capacidades operacionais, não documentação decorativa.

## Use Quando

- Nova skill, playbook, workflow, role ou knowledge.
- Renomeação, remoção ou mudança de owner.
- Perguntas como "essa skill está ruim?".

## Contexto Obrigatório

- Asset avaliado.
- Inventário macro correspondente.
- Owner esperado.
- Templates de asset quando existirem.

## Entradas

- Caminho do asset.
- Trigger esperado.
- Output esperado.
- Evidências de uso.

## Processo

### Etapa 1: Checar estrutura

Valide frontmatter, purpose, use quando, contexto, entradas, processo, critérios, saída, arquivos e linhas vermelhas.

### Etapa 2: Checar contrato

Confirme owner, trigger, input mínimo, output verificável e condições de bloqueio.

### Etapa 3: Checar duplicação

Compare com assets vizinhos para evitar duas fontes de decisão.

### Etapa 4: Registrar Evidências

Liste trechos e arquivos que sustentam a avaliação.

### Etapa 5: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- O asset tem owner claro?
- O nome descreve capacidade/tema durável?
- O trigger é específico o bastante para discovery?
- O output é verificável por outro agente ou playbook?
- O asset duplicou responsabilidade existente?
- O inventário e validação foram atualizados?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Nome | Capacidade/tema claro | Ambíguo | Verbo genérico/duplicado |
| Trigger | Concreto | Amplo demais | Sempre aplicável |
| Processo | Executável | Incompleto | Só intenção |
| Output | Decisão verificável | Saída sem status | Texto genérico |
| Red lines | Bloqueios claros | Bloqueios fracos | Permite ação perigosa |
| Inventário | Atualizado | Pendente | Ausente |

## Sinais De Alerta

- Skill com nome começando por verbo genérico de configuração.
- Playbook sem condições de parada.
- Output sem status.
- Arquivos para atualizar vagos.
- Asset que parece substituir outro sem migração.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "A skill é autoexplicativa" | Future agents precisam trigger, processo e red lines. |
| "O output pode variar" | Pode variar no conteúdo, não na decisão mínima. |
| "É só um README de knowledge" | Knowledge também precisa owner se for fonte durável. |
| "Não precisa inventário agora" | Inventário é o mapa macro do framework. |

## Exemplo De Saída

```text
Framework asset review:
- Status: blocked
- Severity: blocker
- Asset: configure-branch-protection
- Owner: operations.devops
- Evidências: nome imperativo, inventário ausente
- Lacunas: nome não segue capacidade/tema e output não é verificável
- Inventário/validação: pendente
```

## Verificações e Critérios de Aceite

- Asset tem owner claro.
- Asset não duplica source of truth.
- Output é verificável.
- Inventário está atualizado.
- Status final é `pass, risk ou blocked`.

## Saída

```text
Framework asset review:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Asset:
- Owner:
- Evidências:
- Lacunas:
- Inventário/validação:
```

## Arquivos para Atualizar

- `docs/framework/skills/README.md`
- `docs/framework/playbooks/README.md`
- `docs/framework/workflows/README.md`
- Definições do generator.
- Validações aplicáveis.

## Linhas Vermelhas

- Não aprove asset sem trigger claro.
- Não aprove saída genérica sem decisão.
- Não aprove duplicação de ownership.
- Não aprove asset gerado fora dos inventários.
