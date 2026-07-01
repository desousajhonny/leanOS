---
name: department-handoff-review
description: Use quando uma mudança altera handoffs entre Strategy, Operations, Growth ou áreas como Product Ops, Design, Engineering, Security, DevOps, Marketing, CX e Finance.
---

# Department Handoff Review

## Propósito

Avaliar se a comunicação entre áreas do LeanOS tem owner, evidência, source of truth e saída consumível pela próxima área.

## Use Quando

- Checklist Antes De Commit/PR para mudanças em workflows, readiness, implementation packets, PR validation, launch ou learning loop.
- Auditoria Sob Demanda sobre comunicação entre times/áreas.
- Mudanças que conectam Strategy -> Product Ops -> Design/Security/Engineering/DevOps -> Growth.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança altera:

- workflow entre departamentos;
- readiness de Product Ops, Design, Security, DevOps, Finance ou Engineering;
- implementation packet;
- PR validation;
- ready-for-launch;
- launch-learning-loop;
- source of truth consumido por outra área.

## Antes de Agir

Identifique a área produtora, a área consumidora e o artefato de handoff.

## Entradas

- Handoff avaliado.
- Artefato fonte.
- Área dona de origem.
- Área consumidora.
- Source of truth envolvido.

## Processo

### Etapa 1: Verificar ownership

Confirme se a área produtora tem responsabilidade explícita e se a área consumidora não redefine source of truth alheio.

### Etapa 2: Verificar artefato consumível

O handoff deve conter decisão, contexto, evidência, critérios, arquivos relevantes, riscos e condição de bloqueio.

### Etapa 3: Verificar readiness

Confirme que Engineering não recebeu ideia bruta, Epic cru ou issue sem readiness. Se Design, Security, Finance ou DevOps forem aplicáveis, seus gates devem aparecer.

### Etapa 4: Verificar validação reversa

PR Validation, Ready for Launch ou Learning Loop devem conseguir comparar implementação/decisão contra o handoff original.

### Etapa 5: Emitir decisão

Produza `pass / risk / blocked`.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Ownership | Produtor, consumidor e validador claros | Um papel implícito | Sem produtor / consumidor / validador |
| Source of truth | Área consome fonte correta | Fonte existe, mas não referenciada | Área redefine fonte alheia |
| Artefato | Handoff tem decisão, contexto e critérios | Handoff incompleto | Handoff é resumo solto de chat |
| Readiness | Gates aplicáveis aparecem | Gate aplicável pouco claro | Engineering não recebeu ideia bruta |
| Validação posterior | PR/launch/learning compara contra handoff | Validação manual apenas | Não há como checar cumprimento |
| Confirmação | Mudança crítica pede confirmação | Confirmação ambígua | Ação remota/source update sem confirmação |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: handoff sem owner, sem source of truth ou permitindo implementação de ideia bruta.
- `high`: próxima área consegue agir, mas com risco de interpretação errada.
- `medium`: falta evidência, link ou validação posterior.
- `low`: ajuste de formato/copy.

## Cenários De Pressão

- "A próxima área entende pelo contexto": handoff deve ser consumível sem memória de conversa.
- "O GitHub tem a issue": GitHub não substitui artefato local de readiness.
- "Design/Security não se aplica": registre `not_applicable` com razão.
- "É só uma mudança pequena": se toca cliente, dados, pricing, deploy ou UI, gate pode ser aplicável.
- "PR validation pega depois": PR validation precisa de handoff para comparar.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Engineering consegue descobrir" | Engineering implementa Feature pronta, não reconstrói Product Ops/Design. |
| "A área consumidora pode ajustar a fonte" | Consumidor não redefine source of truth de outra área. |
| "Está no chat" | Chat não é artefato de handoff durável. |
| "Não precisa validador" | Sem validador, o handoff não fecha loop. |

## Resultado Obrigatório

```text
Department handoff review:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Produtor:
- Consumidor:
- Validador:
- Source of truth:
- Evidência de handoff:
- Gate posterior:
- Correções:
```

## Condições de Parada

- `blocked`: handoff sem owner, sem Evidência de handoff, sem source of truth ou com Engineering recebendo ideia bruta.
- `risk`: handoff existe, mas não está conectado à validação posterior.
- `pass`: próxima área consegue agir sem adivinhar contexto.

## Critérios de Aceite e Saídas

Inclua:

- origem e destino;
- artefato de handoff;
- source of truth;
- evidências;
- decisão `pass / risk / blocked`;
- próximo ajuste recomendado.

## Arquivos para Atualizar

- Workflows em `packages/cli/src/templates/workspace/definitions/workflows`.
- Playbooks/skills da área produtora e consumidora.
- Knowledge source of truth da área dona.
- Validações de contrato.

## Linhas Vermelhas

- Não aprove handoff baseado em resumo solto de chat.
- Não permita área consumidora redefinir source of truth de outra área.
- Não permita implementação sem Feature e packet/readiness quando aplicável.
- Não trate sync GitHub como prova de readiness.
