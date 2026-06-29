# Roadmap

## Propósito

Possui sequência de roadmap, milestones, backlog e priorização de ciclo de planejamento para produtos operando ou escalando.

## Use Quando

- sequenciar trabalho de produto para product_operating ou growth_scaling
- priorizar múltiplos candidatos de backlog
- definir ciclo atual
- planejar milestones

## Source of Truth

- `knowledge/roadmap.md`
- `knowledge/milestones.md`
- `knowledge/current-cycle.md`
- `knowledge/backlog.md`




## Navegação

1. Para trabalho operacional, comece em `AGENT.md`.
2. Use este README como mapa do diretório.
3. Depois que o AGENT da área escolher um papel, carregue apenas as skills e playbooks necessários.
4. Produza a saída solicitada e atualize arquivos de fonte da verdade quando necessário.

## Responsabilidades dos Arquivos

- `README.md`: mapa e explicação da área.
- `AGENT.md`: lead operacional da área quando presente.
- `area.yaml`: estrutura legível por máquina para esta área.
- `roles/`: personas operacionais desta área.
- `skills/`: capacidades focadas usadas pelos papéis.
- `playbooks/`: sequências táticas de execução.

## Caminhos Comuns

- Pedido de roadmap: `AGENT.md` -> role `roles/roadmap-planner.role.md` -> skill `skills/roadmap/SKILL.md` -> playbook `playbooks/roadmap-cycle-planning.playbook.md`.
