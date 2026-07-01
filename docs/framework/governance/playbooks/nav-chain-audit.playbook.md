---
name: nav-chain-audit
description: Use quando uma mudança toca Navigation Chain LeanOS, root AGENT, intent-map, routing-map, leanos.yaml, ativação de áreas ou roteamento natural.
---

# Nav Chain Audit

## Propósito

Auditar se a Navigation Chain LeanOS continua funcionando sem atalhos e preserva a topologia de fluxo de valor: root classifica intenção, checa ativação e roteia para o departamento ativo correto sem carregar skills profundas diretamente.

## Use Quando

- Checklist Antes De Commit/PR para mudanças em roteamento, `AGENT.md`, `intent-map.yaml`, `routing-map.yaml`, `leanos.yaml` ou ativação.
- Auditoria Sob Demanda quando alguém perguntar se o Nav Chain está sendo seguido.
- Mudanças em journeys que alteram dono, área ou gate.
- Mudanças que podem transformar fluxo de valor em organograma, atalho ou silo.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança tocar:

- root `AGENT.md` gerado ou root `AGENT.md` do framework;
- `intent-map.yaml`;
- `routing-map.yaml`;
- `leanos.yaml`;
- activation states;
- natural language routing;
- department/area AGENT;
- gates `activation_required`, `missing` ou `pending_activation`.

## Antes de Agir

Leia `AGENT.md`, `docs/framework/source-of-truth/decision-rules.md` e os templates gerados de root/runtime quando aplicável.

## Entradas

- Intenção natural ou rota avaliada.
- Estado esperado em `leanos.yaml`.
- Mapa esperado em `intent-map.yaml`.
- Departamento/área dona.
- Arquivos gerados ou diff.

## Processo

### Etapa 1: Validar classificação da intenção

Confirme se a intenção natural está em `intent-map.yaml` quando for durável e se não foi adicionada como lista longa no root `AGENT.md`.

### Etapa 2: Validar gate de ativação

Confirme se `leanos.yaml` separa `active`, `available`, `inactive`, `pending_activation` e `missing`. Se a área necessária não estiver ativa, a resposta deve ser `activation_required`.

### Etapa 3: Validar rota

Confirme se `.leanos/runtime/index/routing-map.yaml` leva ao departamento dono ativo e se o root não carrega skills profundas, playbooks ou knowledge de área diretamente.

### Etapa 4: Validar ownership local

Confirme se o departamento ou área escolhe role, skill, playbook, workflow e knowledge. O root não carrega skills profundas nem decide handoffs internos.

### Etapa 5: Validar fluxo de valor

Confirme se a rota representa o menor caminho owner-first para a próxima decisão do founder.

A Nav Chain deve reduzir carga cognitiva e evitar:

- root como gerente universal;
- Product Ops como gargalo para decisões que pertencem a Strategy, Design, Finance, Security, DevOps ou Growth;
- especialista acionado sem gatilho;
- plataforma assumindo decisão de produto;
- área consumidora redefinindo source of truth alheio.

### Etapa 6: Emitir decisão

Produza `pass / risk / blocked`.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Entrada natural | Intenção durável está no intent map | Intenção reconhecida apenas por texto solto | Root contém inventário longo de intenções |
| Ativação | `leanos.yaml` é consultado antes da rota | Estado ambíguo ou sem teste | Área inactive/available é carregada |
| Rota | Segue root -> departamento -> área -> role/skill/playbook | Rota correta, mas pouco documentada | Root pula departamento/área |
| Ownership | Departamento/área escolhe deep assets | Ownership implícito | Root decide skill/playbook profundo |
| Bloqueio | `activation_required` explica e pede confirmação | Bloqueio sem copy clara | Rota finge que arquivo inativo existe |
| Fluxo de valor | Menor owner necessário reduz carga cognitiva | Rota passa, mas cria handoff extra | Rota cria silo, organograma ou especialista sem gatilho |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: root ignora ativação, carrega deep asset ou dribla `activation_required`.
- `high`: rota funciona, mas owner/gate está ambíguo.
- `medium`: falta validação ou documentação de intenção.
- `low`: ajuste de nomenclatura/copy.

## Cenários De Pressão

- "É só uma intenção nova": intenções duráveis entram no intent map, não no root.
- "O root já sabe a skill certa": root não escolhe deep asset.
- "A área está available": available não é active.
- "Quero evitar pedir confirmação": ativação exige confirmação.
- "A rota funciona no all-at-once": teste também progressive mode.
- "Product Ops pode decidir tudo": Product Ops coordena delivery, mas não redefine owner de Strategy, Design, Finance, Security, DevOps ou Growth.
- "Platform consegue automatizar": platform reduz fricção, mas não assume decisão de produto ou source of truth.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Carregar a skill direto é mais rápido" | Quebra Nav Chain e pode acessar área inativa. |
| "O modelo consegue inferir ativação" | Ativação vem de `leanos.yaml`. |
| "É só para casos comuns" | Casos comuns duráveis pertencem ao intent map validado. |
| "A área existe no catálogo" | Catálogo disponível não é área ativa. |
| "Um especialista sempre ajuda" | Especialista sem gatilho quebra progressão e aumenta handoff. |
| "Rota mais completa é mais segura" | Rota segura é a menor rota owner-first com gates aplicáveis. |

## Resultado Obrigatório

```text
Nav Chain audit:
- Status: pass / risk / blocked
- Severity: blocker / high / medium / low
- Intenção avaliada:
- Estado em leanos.yaml:
- Rota esperada:
- Rota observada:
- Fluxo de valor:
- Evidências:
- Correção necessária:
```

## Condições de Parada

- `blocked`: root pula departamento/área, ignora `leanos.yaml`, referencia área inativa como ativa ou dribla `activation_required`.
- `risk`: rota funciona, mas falta validação, intent-map durável ou documentação.
- `pass`: rota segue root -> departamento -> área -> role/skill/playbook com gate preservado.

## Critérios de Aceite e Saídas

Inclua:

- intenção avaliada;
- owner esperado;
- status de ativação;
- arquivos consultados;
- decisão `pass / risk / blocked`;
- correções recomendadas.

## Arquivos para Atualizar

- `AGENT.md` apenas com regra curta, quando necessário.
- `.leanos/runtime/index/intent-map.yaml` no scaffold gerado.
- `.leanos/runtime/index/routing-map.yaml` no scaffold gerado.
- `leanos.yaml` template ou validações de ativação.
- Validações em `packages/cli/scripts/validation/`.

## Linhas Vermelhas

- Não aprove root `AGENT.md` com inventário longo de intenções.
- Não trate área `available` como carregável.
- Não crie rota que pule `activation_required`.
- Não deixe o root decidir skill profunda quando o departamento deve decidir.
