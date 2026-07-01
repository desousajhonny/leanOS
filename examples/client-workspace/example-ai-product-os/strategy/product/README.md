# Product

## Propósito

Dona da estratégia de produto, núcleo do produto, ICP, proposta de valor, escopo de validação do MVP e coerência de posicionamento.

## Use Quando

- iniciar ou calibrar uma ideia do founder
- definir núcleo do produto
- clarificar ICP
- desenhar proposta de valor
- definir escopo de validação do MVP
- checar coerência de produto
- criar ou melhorar o README do produto

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
- Pedido de README do produto: `AGENT.md` -> role Product Narrative Editor `roles/product-narrative-editor.role.md` -> skill `skills/product-readme/SKILL.md` -> propor diff do README antes de atualizar o root `../../../README.md`.
