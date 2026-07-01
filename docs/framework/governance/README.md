# Framework Governance

Esta pasta é de uso interno do framework LeanOS. Ela não é gerada no workspace do founder.

Use estes playbooks e skills para avaliar se mudanças no LeanOS continuam alinhadas à doutrina, à Navigation Chain, à experiência do founder e aos contratos entre áreas.

## Modos De Uso

### Checklist Antes De Commit/PR

Use quando uma mudança tocar comportamento do framework, scaffold, `AGENT.md`, Nav Chain, source of truth, skills, playbooks, workflows, GitHub sync, release, wizard ou jornadas do founder.

Saída mínima:

```text
Framework Governance Check:
- Doctrine alignment: pass / risk / blocked
- Nav Chain impact: none / pass / risk / blocked
- Founder experience: pass / risk / blocked
- Asset quality: none / pass / risk / blocked
- Handoff integrity: none / pass / risk / blocked
- Required validations:
- Decision:
```

Use também uma severidade explícita:

- `blocker`: não segue para commit/PR.
- `high`: corrige no mesmo PR antes de considerar pronto.
- `medium`: registra follow-up se não afetar segurança, Nav Chain, source of truth ou founder experience crítica.
- `low`: ajuste editorial ou refinamento sem impacto operacional.

### Auditoria Sob Demanda

Use quando o founder ou mantenedor pedir análise como:

- "avalie o framework";
- "audite o Nav Chain";
- "essa skill está ruim?";
- "a comunicação entre áreas está boa?";
- "isso está alinhado à visão?";
- "o `AGENT.md` raiz está escalável?".

Saída mínima:

```text
O que foi avaliado:
Critérios usados:
Achados:
Riscos:
Recomendações:
Prioridade:
Arquivos impactados:
```

## Playbooks Internos

| Playbook | Use Quando |
| --- | --- |
| `framework-change-review` | Qualquer mudança estrutural ou comportamental no framework antes de commit/PR. |
| `doctrine-alignment-review` | Mudança pode afetar Business as a Product, Strategy-first, progressão, source of truth ou decisões duráveis. |
| `nav-chain-audit` | Mudança toca `AGENT.md`, `intent-map.yaml`, `routing-map.yaml`, `leanos.yaml`, ativação ou roteamento. |
| `asset-quality-review` | Mudança cria, remove, renomeia ou altera skill, playbook, workflow, role ou knowledge. |
| `department-handoff-review` | Mudança altera passagem entre Strategy, Operations, Growth ou áreas internas. |
| `founder-experience-review` | Mudança afeta wizard, jornadas, perguntas, resposta do Chief ou carga cognitiva do founder. |

## Matriz De Uso Por Mudança

| Mudança | Playbooks mínimos |
| --- | --- |
| Scaffold, CLI, wizard ou `lean-os update` | `framework-change-review`, `doctrine-alignment-review`, `founder-experience-review` |
| Root `AGENT.md`, intent map, routing map ou ativação | `framework-change-review`, `nav-chain-audit`, `founder-experience-review` |
| Skill, playbook, workflow, role ou knowledge | `framework-change-review`, `asset-quality-review` |
| Handoff, readiness, implementation packet ou PR validation | `framework-change-review`, `department-handoff-review`, `asset-quality-review` |
| GitHub sync, branch protection, release ou npm publish | `framework-change-review`, `doctrine-alignment-review`, `department-handoff-review` |
| Doutrina, operating model ou decision rules | `framework-change-review`, `doctrine-alignment-review` |

## Skills Internas

| Skill | Use Quando |
| --- | --- |
| `framework-change` | Avaliar impacto geral de uma mudança no framework. |
| `doctrine-alignment` | Checar aderência à doutrina, princípios e decision log. |
| `nav-chain` | Auditar roteamento root -> departamento -> área -> role/skill/playbook. |
| `framework-asset` | Revisar qualidade de skills, playbooks, workflows, roles e knowledge. |
| `department-handoff` | Revisar clareza e integridade de handoffs entre áreas. |
| `founder-experience` | Revisar clareza, simplicidade e ergonomia para o founder. |

## Regras

- Não use esta pasta como source of truth do produto do founder.
- Não copie estes playbooks para workspaces gerados.
- Não substitua validação automatizada por checklist manual quando o critério for mecânico.
- Se a auditoria revelar decisão durável nova, atualize `docs/framework/source-of-truth/decision-log.md`.
- Se a mudança altera assets gerados, atualize também os inventários em `docs/framework/skills/`, `docs/framework/playbooks/` e `docs/framework/workflows/` quando aplicável.
