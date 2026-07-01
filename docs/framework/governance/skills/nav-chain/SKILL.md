---
name: nav-chain
description: Use quando roteamento, ativação, root AGENT, intent-map, routing-map ou leanos.yaml precisam ser auditados no LeanOS.
---

# Nav Chain

## Visão Geral

Skill de uso interno do framework para auditar se o root classifica intenção, checa ativação e roteia sem pular departamentos ou carregar assets profundos.

## Use Quando

- Mudança toca root `AGENT.md`, `intent-map.yaml`, `routing-map.yaml`, `leanos.yaml` ou activation gates.
- O mantenedor pede auditoria da Navigation Chain.
- Uma rota parece estar pulando área ou skill.

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

### Etapa 4: Registrar Evidências

Liste paths, chaves YAML e trechos que provam a rota.

### Etapa 5: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- A intenção durável está em `intent-map.yaml`?
- O root consultou `leanos.yaml` antes de carregar algo?
- A rota usa `routing-map.yaml`?
- A área está `active` ou só `available`?
- O root evitou carregar skill/playbook profundo?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Intent map | Intenção durável validada | Intenção implícita | Lista longa no root |
| Activation | Active confirmado | Estado ambíguo | Available/inactive carregado |
| Routing | Root -> departamento -> área | Rota pouco explícita | Root pula owner |
| Deep asset | Área escolhe | Hint profundo ambíguo | Root escolhe skill/playbook |
| Confirmação | Activation pede confirmação | Copy fraca | Cria área sem confirmar |

## Sinais De Alerta

- Root mencionando muitas intenções naturais.
- Rota para skill específica sem passar pelo departamento.
- Área disponível tratada como existente.
- `activation_required` ausente em rota que precisa de área inativa.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "É mais eficiente ir direto para a skill" | Eficiência não justifica quebrar ownership. |
| "A área existe no catálogo" | Catálogo não é estado ativo. |
| "O hint do intent-map autoriza carregar a skill" | Hint orienta coerência, não permissão de carga. |
| "O founder não quer confirmação" | Ativação exige confirmação explícita. |

## Exemplo De Saída

```text
Nav Chain audit:
- Status: risk
- Severity: high
- Intenção: "quero revisar segurança"
- Owner esperado: operations.security
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
