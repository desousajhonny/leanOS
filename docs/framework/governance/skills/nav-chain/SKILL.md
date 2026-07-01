---
name: nav-chain
description: Use quando roteamento, ativação, root AGENT, intent-map, routing-map ou leanos.yaml precisam ser auditados no LeanOS.
---

# Nav Chain

## Visão Geral

Skill de uso interno do framework para auditar se o root classifica intenção, checa ativação e roteia sem pular departamentos, carregar assets profundos ou transformar fluxo de valor em organograma.

## Use Quando

- Mudança toca root `AGENT.md`, `intent-map.yaml`, `routing-map.yaml`, `leanos.yaml` ou activation gates.
- O mantenedor pede auditoria da Navigation Chain.
- Uma rota parece estar pulando área ou skill.
- Uma rota aciona especialista, platform ou Product Ops de forma possivelmente desnecessária.

## Contexto Obrigatório

- Root `AGENT.md`.
- `leanos.yaml` esperado.
- `.leanos/runtime/index/intent-map.yaml`.
- `.leanos/runtime/index/routing-map.yaml`.
- Department/area `AGENT.md` envolvido.

## Entradas

- Intenção natural.
- Área dona esperada.
- Estado de ativação.
- Evidências de rota.

## Processo

### Etapa 1: Checar intenção

Verifique se intenção durável está no intent map e não em lista longa no root.

### Etapa 2: Checar ativação

Confirme se área ativa pode ser carregada e se área inactive/available retorna `activation_required`.

### Etapa 3: Checar rota

Verifique se root carrega apenas o departamento dono ativo e se o departamento/área escolhe role, skill e playbook.

### Etapa 4: Checar fluxo de valor

Confirme se a rota é o menor caminho owner-first para a próxima decisão. Especialista precisa de gatilho; platform não assume decisão de produto; Product Ops coordena delivery sem substituir owners de Strategy, Design, Finance, Security, DevOps ou Growth.

### Etapa 5: Registrar Evidências

Liste paths, chaves YAML e trechos que provam a rota.

### Etapa 6: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- A intenção durável está em `intent-map.yaml`?
- O root consultou `leanos.yaml` antes de carregar algo?
- A rota usa `routing-map.yaml`?
- A área está `active` ou só `available`?
- O root evitou carregar skill/playbook profundo?
- A rota reduz carga cognitiva e preserva fluxo de valor?
- Algum especialista foi acionado sem gatilho claro?
- Alguma platform capability assumiu decisão de produto ou source of truth?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Intent map | Intenção durável validada | Intenção implícita | Lista longa no root |
| Activation | Active confirmado | Estado ambíguo | Available/inactive carregado |
| Routing | Root -> departamento -> área | Rota pouco explícita | Root pula owner |
| Deep asset | Área escolhe | Hint profundo ambíguo | Root escolhe skill/playbook |
| Confirmação | Activation pede confirmação | Copy fraca | Cria área sem confirmar |
| Fluxo de valor | Menor owner necessário | Handoff extra | Organograma/silo |

## Sinais De Alerta

- Root mencionando muitas intenções naturais.
- Rota para skill específica sem passar pelo departamento.
- Área disponível tratada como existente.
- `activation_required` ausente em rota que precisa de área inativa.
- Especialista acionado sem gatilho.
- Root ou platform decidindo produto, preço, UX ou estratégia.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "É mais eficiente ir direto para a skill" | Eficiência não justifica quebrar ownership. |
| "A área existe no catálogo" | Catálogo não é estado ativo. |
| "O hint do intent-map autoriza carregar a skill" | Hint orienta coerência, não permissão de carga. |
| "O founder não quer confirmação" | Ativação exige confirmação explícita. |
| "Mais uma área deixa a rota mais segura" | Rota segura é a menor rota owner-first com gates aplicáveis. |
| "Product Ops pode resolver tudo" | Product Ops coordena delivery, mas não substitui o owner da decisão. |

## Exemplo De Saída

```text
Nav Chain audit:
- Status: risk
- Severity: high
- Intenção: "quero revisar segurança"
- Owner esperado: operations.security
- Fluxo de valor: specialist acionado por risco explícito de segurança
- Evidências: intent-map.yaml, leanos.yaml
- Falhas de rota: área está available, mas resposta não retornou activation_required
- Correção recomendada: bloquear e pedir ativação de operations.security
```

## Verificações e Critérios de Aceite

- Root não carrega skills profundas.
- `leanos.yaml` é consultado antes da rota.
- `activation_required` aparece quando necessário.
- Status final é `pass, risk ou blocked`.

## Saída

```text
Nav Chain audit:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Intenção:
- Owner esperado:
- Evidências:
- Fluxo de valor:
- Falhas de rota:
- Correção recomendada:
```

## Arquivos para Atualizar

- Root/generated `AGENT.md`.
- `.leanos/runtime/index/intent-map.yaml`.
- `.leanos/runtime/index/routing-map.yaml`.
- `leanos.yaml`.
- Validações de routing/activation.

## Linhas Vermelhas

- Não aceite rota que pula activation gate.
- Não aceite root virando inventário.
- Não aceite `available` como carregável.
- Não aceite skill profunda escolhida no root.
