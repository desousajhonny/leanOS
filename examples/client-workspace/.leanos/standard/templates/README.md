# Templates

## Propósito

Estruturas iniciais reutilizáveis para assets do framework LeanOS e artefatos de colaboração no GitHub.

## Use Quando

Use depois de selecionar o tipo de asset com `../foundation/asset-taxonomy.md` e antes de rascunhar um novo arquivo.

Templates são estruturas iniciais. Eles não são contexto ativo do workspace e não devem sobrescrever o AGENT, role, skill, playbook ou workflow owner.

## Categorias

### `agents/`

Templates para arquivos AGENT.md de raiz, departamento e área.

Use quando: Use quando criar um owner operacional ou uma camada de roteamento.

Arquivos:
- `agents/agent-template.md`
- `agents/root-agent-template.md`
- `agents/department-agent-template.md`
- `agents/area-agent-template.md`

### `structure/`

Templates para pastas, READMEs, departamentos, áreas e estrutura YAML.

Use quando: Use quando criar ou documentar a estrutura do workspace.

Arquivos:
- `structure/root-readme-template.md`
- `structure/folder-readme-template.md`
- `structure/area-readme-template.md`
- `structure/department-template.md`
- `structure/department-template.yaml`
- `structure/area-template.md`
- `structure/area-template.yaml`

### `execution/`

Templates para roles, skills, playbooks e workflows de nível de área.

Use quando: Use quando criar assets de execução operacional dentro de uma área ou pasta de workflow de departamento.

Arquivos:
- `execution/role-template.md`
- `execution/role-template.yaml`
- `execution/skill-template.md`
- `execution/skill-template.yaml`
- `execution/playbook-template.md`
- `execution/playbook-template.yaml`
- `execution/workflow-template.md`

### `github/`

Templates para issues, epics, features, nomes de branch, PRs e matrizes de prontidão no GitHub.

Use quando: Use quando estruturar itens prontos para GitHub ou artefatos de colaboração do repositório.

Arquivos:
- `github/github-issue-template.md`
- `github/github-epic-template.md`
- `github/github-feature-template.md`
- `github/delivery-readiness-matrix-template.md`
- `github/branch-name-template.md`
- `github/pull-request-template.md`

### `product/`

Templates para README de produto e trabalho local de produto no LeanOS antes de sincronização opcional com GitHub.

Use quando: Use quando estruturar README de produto, epics e features locais a partir do contexto de Strategy/Product.

Arquivos:
- `product/product-readme-template.md`
- `product/epic-template.md`
- `product/feature-template.md`
- `product/implementation-packet-template.md`

### `design/`

Templates para especificações de Design que entregam estrutura voltada ao usuário para Engineering.

Use quando: Use quando Design precisar documentar um contrato de tela ou componente antes da implementação.

Arquivos:
- `design/product-ui-spec-template.md`
- `design/component-spec-template.md`
- `design/screen-spec-template.md`

### `review/`

Templates para revisar código, implementação e qualidade de delivery.

Use quando: Use quando criar ou aplicar saídas de review.

Arquivos:
- `review/code-review-template.md`

## Como Usar

1. Confirme o tipo de asset em `../foundation/asset-taxonomy.md`.
2. Carregue a instrução de criação correspondente em `../instructions/`.
3. Abra apenas a menor categoria de template correspondente.
4. Copie a estrutura do template correspondente.
5. Adapte ao departamento ou área ativa.
6. Valide com o checklist correspondente em `../checklists/`.

## Linhas Vermelhas

- Não carregue todos os templates por padrão.
- Não use um template de GitHub para um asset do framework LeanOS.
- Não use um template de execução para documentação de pasta.
- Não use exemplos como templates quando existir um template real.
