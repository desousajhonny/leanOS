# Product

## Propósito

Own product strategy, product core, ICP, value proposition, MVP validation scope and positioning coherence.

## Use Quando

- start or calibrate a founder idea
- define product core
- clarify ICP
- shape value proposition
- define MVP validation scope
- check product coherence

## Source of Truth

- `knowledge/brief.md`
- `knowledge/problem.md`
- `knowledge/icp.md`
- `knowledge/jobs-to-be-done.md`
- `knowledge/value-proposition.md`
- `knowledge/positioning.md`
- `knowledge/mvp-validation-scope.md`
- `knowledge/validation-notes.md`




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

- Idea calibration request: `AGENT.md` -> role `roles/product-strategist.role.md` -> skill `skills/business-baseline/SKILL.md` -> skill `skills/product-core/SKILL.md` when enough signal exists -> playbook `playbooks/idea-calibration.playbook.md`.
- MVP validation request: `AGENT.md` -> role `roles/product-strategist.role.md` -> skill `skills/mvp-validation-scope/SKILL.md` -> playbook `playbooks/mvp-validation-scope.playbook.md`.
