# Business

## Propósito

Manter identidade do negócio, princípios, missão, decisões operacionais e modelo de negócio coerentes.

## Use Quando

- define business identity
- clarify mission
- capture principles
- define business model
- record strategic decisions

## Source of Truth

- `knowledge/profile.md`
- `knowledge/mission.md`
- `knowledge/vision.md`
- `knowledge/principles.md`
- `knowledge/operating-model.md`
- `knowledge/business-model-canvas.md`
- `knowledge/decision-log.md`




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

- Business request: `AGENT.md` -> role `roles/business-strategist.role.md` -> skill `skills/business-identity/SKILL.md`, `skills/operating-model/SKILL.md` or `skills/business-model/SKILL.md` -> playbook `playbooks/business-foundation.playbook.md` when foundation work is needed.
