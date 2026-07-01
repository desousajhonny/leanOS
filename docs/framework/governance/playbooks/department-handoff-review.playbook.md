---
name: department-handoff-review
description: Use quando uma mudança altera handoffs entre Strategy, Operations, Growth ou áreas como Product Ops, Design, Engineering, Security, DevOps, Marketing, CX e Finance.
---

# Department Handoff Review

## Propósito

Avaliar se a comunicação entre áreas do LeanOS tem owner, evidência, source of truth, baixa carga cognitiva e saída consumível pela próxima área.

## Use Quando

- Checklist Antes De Commit/PR para mudanças em workflows, readiness, implementation packets, PR validation, launch ou learning loop.
- Auditoria Sob Demanda sobre comunicação entre times/áreas.
- Mudanças que conectam Strategy -> Product Ops -> Design/Security/Engineering/DevOps -> Growth.
- Mudanças que adicionam área especialista, enabling capability, platform capability ou novo handoff no fluxo de valor.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança altera:

- workflow entre departamentos;
- readiness de Product Ops, Design, Security, DevOps, Finance ou Engineering;
- implementation packet;
- PR validation;
- ready-for-launch;
- launch-learning-loop;
- source of truth consumido por outra área.
- ownership ou comunicação entre stream-aligned, enabling/specialist ou platform capabilities.

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

### Etapa 2: Verificar tipo de interação

Classifique a interação usando Team Topologies:

- stream-aligned: dono direto de resultado do founder;
- enabling/specialist: reduz risco ou aumenta qualidade com output consumível;
- platform: reduz fricção operacional sem assumir produto/negócio.

Se a interação não melhora fluxo de valor, ownership ou risco, trate como handoff desnecessário.

### Etapa 3: Verificar artefato consumível

O handoff deve conter decisão, contexto, evidência, critérios, arquivos relevantes, riscos e condição de bloqueio.

### Etapa 4: Verificar readiness

Confirme que Engineering não recebeu ideia bruta, Epic cru ou issue sem readiness. Se Design, Security, Finance ou DevOps forem aplicáveis, seus gates devem aparecer.

### Etapa 5: Verificar validação reversa

PR Validation, Ready for Launch ou Learning Loop devem conseguir comparar implementação/decisão contra o handoff original.

### Etapa 6: Emitir decisão

Produza `pass / risk / blocked`.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Ownership | Produtor, consumidor e validador claros | Um papel implícito | Sem produtor / consumidor / validador |
| Tipo de interação | Stream/enabling/platform com gatilho e saída claros | Tipo útil, mas gatilho fraco | Handoff existe por organograma, não por necessidade |
| Source of truth | Área consome fonte correta | Fonte existe, mas não referenciada | Área redefine fonte alheia |
| Artefato | Handoff tem decisão, contexto e critérios | Handoff incompleto | Handoff é resumo solto de chat |
| Readiness | Gates aplicáveis aparecem | Gate aplicável pouco claro | Engineering não recebeu ideia bruta |
| Validação posterior | PR/launch/learning compara contra handoff | Validação manual apenas | Não há como checar cumprimento |
| Confirmação | Mudança crítica pede confirmação | Confirmação ambígua | Ação remota/source update sem confirmação |
| Carga cognitiva | Reduz perguntas e adivinhação para founder/agente | Acrescenta cerimônia leve | Founder precisa entender organograma para seguir |

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
- "Mais um especialista deixa mais seguro": especialista sem gatilho e saída clara aumenta gargalo e carga cognitiva.
- "A plataforma pode resolver isso": platform não assume decisões de produto, pricing, UX ou estratégia.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Engineering consegue descobrir" | Engineering implementa Feature pronta, não reconstrói Product Ops/Design. |
| "A área consumidora pode ajustar a fonte" | Consumidor não redefine source of truth de outra área. |
| "Está no chat" | Chat não é artefato de handoff durável. |
| "Não precisa validador" | Sem validador, o handoff não fecha loop. |
| "Esse handoff imita uma empresa real" | LeanOS segue fluxo de valor, não organograma. |
| "Centralizar em Product Ops simplifica" | Product Ops coordena delivery, mas não substitui o owner da decisão. |

## Resultado Obrigatório

```text
Department handoff review:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Produtor:
- Consumidor:
- Validador:
- Source of truth:
- Tipo de interação:
- Carga cognitiva:
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
