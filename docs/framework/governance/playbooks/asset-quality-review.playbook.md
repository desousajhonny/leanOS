---
name: asset-quality-review
description: Use quando uma mudança cria, altera, remove ou renomeia skill, playbook, workflow, role, knowledge ou template operacional do LeanOS.
---

# Asset Quality Review

## Propósito

Avaliar se assets do framework são claros, acionáveis, verificáveis e alinhados ao template definido, sem duplicar ownership nem virar documentação decorativa.

## Use Quando

- Checklist Antes De Commit/PR para alterações em skills, playbooks, workflows, roles, knowledge e templates.
- Auditoria Sob Demanda como "essa skill está ruim?" ou "esse playbook está bom?".
- Revisões de inventário e qualidade do catálogo.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança:

- cria, altera, move, remove ou renomeia skill;
- cria, altera, move, remove ou renomeia playbook;
- cria, altera, move, remove ou renomeia workflow;
- cria, altera, move, remove ou renomeia role;
- altera knowledge durável ou template operacional;
- muda o owner, trigger, output ou arquivos permitidos de qualquer asset.

## Antes de Agir

Leia os inventários macro em `docs/framework/skills/`, `docs/framework/playbooks/` e `docs/framework/workflows/`.

## Entradas

- Asset avaliado.
- Owner esperado.
- Trigger de ativação.
- Inputs e outputs.
- Validações existentes.

## Processo

### Etapa 1: Verificar estrutura

Confirme frontmatter, nome, descrição, propósito, contexto obrigatório, entradas, processo, checks, saída, arquivos para atualizar e linhas vermelhas.

### Etapa 2: Verificar utilidade operacional

O asset deve responder:

- quando usar;
- quem é dono;
- qual entrada mínima precisa;
- qual output verificável entrega;
- quando bloquear;
- quais arquivos pode alterar.

### Etapa 3: Verificar duplicação

Cheque se outro asset já possui a mesma responsabilidade. Se sim, proponha merge, rename ou remoção.

### Etapa 4: Verificar contrato de validação

Critérios mecânicos devem ter validação automatizada. Critérios de julgamento devem ter playbook/skill claros.

### Etapa 5: Emitir decisão

Produza `pass / risk / blocked`.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Nome | Nome por capacidade/tema, estável e sem ação genérica | Nome aceitável, mas pouco específico | Nome genérico, imperativo ou duplicado |
| Trigger | Use quando é concreto | Trigger amplo demais | Trigger ausente ou sempre aplicável |
| Owner | Área/role dona clara | Owner implícito | Sem owner ou owner errado |
| Input | Entrada mínima definida | Entrada incompleta | Agent precisa adivinhar contexto |
| Output | Output verificável e decisório | Output útil, mas sem status | Output genérico sem decisão |
| Red lines | Bloqueios claros | Bloqueios incompletos | Permite ação perigosa |
| Inventário | Inventário atualizado | Inventário pendente | Asset invisível no mapa |
| Validação | Critério mecânico testado | Teste pendente | Sem validação para contrato mecânico |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: asset sem owner, trigger, output verificável ou com responsabilidade perigosa.
- `high`: asset útil, mas ambíguo o suficiente para causar roteamento errado.
- `medium`: falta inventário, exemplo ou critério de aceite.
- `low`: ajuste editorial.

## Cenários De Pressão

- "É só uma skill pequena": skill pequena ainda precisa trigger, output e red lines.
- "O nome está claro para mim": future agents precisam descobrir por nome e descrição.
- "O playbook explica a intenção": playbook precisa processo e stop conditions.
- "O inventário atualizo depois": asset sem inventário vira capacidade invisível.
- "Dá para validar manualmente": critério mecânico deve ter teste.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Essa skill faz várias coisas relacionadas" | Se há múltiplas decisões, separe ou deixe ownership explícito. |
| "O output pode ser livre" | Output livre dificulta PR validation, handoff e auditoria. |
| "O nome com verbo ajuda" | Skills internas devem usar nome por capacidade/tema quando forem capacidades duráveis. |
| "Não precisa de red line" | Red line é o que impede o modelo de avançar sob pressão. |

## Resultado Obrigatório

```text
Asset quality review:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Asset:
- Owner:
- Trigger:
- Output verificável:
- Inventário atualizado:
- Validação:
- Correções:
```

## Condições de Parada

- `blocked`: asset sem owner, sem trigger, sem saída verificável, duplicado ou contraditório.
- `risk`: asset útil, mas falta inventário, validação, linha vermelha ou critério de aceite.
- `pass`: asset tem contrato operacional claro e inventário atualizado.

## Critérios de Aceite e Saídas

Inclua:

- asset avaliado;
- owner;
- trigger;
- lacunas;
- decisão `pass / risk / blocked`;
- arquivos de inventário/validação impactados.

## Arquivos para Atualizar

- `docs/framework/skills/README.md`
- `docs/framework/playbooks/README.md`
- `docs/framework/workflows/README.md`
- `packages/cli/src/templates/workspace/definitions/**`
- `packages/cli/scripts/validation/**`

## Linhas Vermelhas

- Não aprove skill genérica sem output verificável.
- Não aprove playbook que só descreve intenção sem processo.
- Não aprove asset que muda ownership de source of truth sem decision log.
- Não aprove alteração de asset gerado sem atualizar inventário.
