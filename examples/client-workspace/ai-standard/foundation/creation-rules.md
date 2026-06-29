# Regras de Criação

Use estas regras antes de criar ou alterar qualquer asset do framework LeanOS.

## Propósito

Regras de criação protegem o workspace contra proliferação de assets, responsabilidades duplicadas e arquivos que quebram rotas.

Elas respondem:

- Este asset deve existir?
- Onde ele deve viver?
- Qual asset existente deveria possuir esta responsabilidade?
- O que deve ser carregado antes de criá-lo?
- O que não deve ser criado?

## Carregue Primeiro

Antes de criar um asset, carregue:

1. `asset-taxonomy.md` para confirmar o tipo de asset.
2. `navigation-chain.md` para confirmar onde o asset pertence.
3. `naming-conventions.md` para nomear o arquivo corretamente.
4. A instrução correspondente em `../instructions/`.
5. O template correspondente em `../templates/`.
6. O checklist correspondente em `../checklists/`.

## Decisão de Criação

Crie um novo asset apenas quando todos os pontos forem verdadeiros:

- O pedido não pode ser tratado por um asset existente.
- O novo asset tem owner claro na Navigation Chain.
- O novo asset tem propósito reutilizável estável.
- O asset reduzirá ambiguidade para modelos futuros.
- O usuário confirma a criação ou atualização.

Não crie um asset quando:

- Uma nota no README é suficiente.
- Uma role pode referenciar uma skill existente.
- Uma skill pode ser reutilizada em vez de criar uma nova.
- Um playbook duplicaria um workflow existente.
- O asset seria apenas uma resposta única ao usuário atual.
- O asset contornaria o ownership de departamento ou área.

## Regras de Posicionamento

- Root `AGENT.md` lives at workspace root.
- Department `AGENT.md`, `README.md`, `department.yaml` and `workflows/` live at department root.
- Area `AGENT.md`, `README.md`, `area.yaml`, `knowledge/`, `roles/`, `skills/` and `playbooks/` live inside the area.
- Roles, skills e playbooks não vivem diretamente abaixo de departamentos raiz.
- Business workflows live in departments or areas, not in `.leanos/`.
- Framework standards, templates, checklists, instructions and examples live in `ai-standard/`.

## Regras de Responsabilidade

- `AGENT.md` routes and sets operating boundaries.
- `README.md` maps a folder.
- `department.yaml` and `area.yaml` provide machine-readable structure.
- Arquivos de role definem quem atua.
- Arquivos de skill definem capacidades reutilizáveis.
- Arquivos de playbook definem sequência de execução.
- Arquivos de knowledge armazenam fatos e decisões confirmadas.
- Arquivos de workflow coordenam trabalho de múltiplas etapas entre owners.

## Regra de Confirmação

Antes de escrever ou alterar assets do framework:

1. Declare o tipo de asset.
2. Declare o path owner.
3. Declare por que um asset existente não é suficiente.
4. Declare qual template e checklist serão usados.
5. Peça confirmação explícita.

## Linhas Vermelhas

- Não invente roles, skills, playbooks, workflows ou templates ausentes.
- Não crie assets fora do departamento ou área owner.
- Não coloque fatos de produto ou empresa dentro de assets operacionais do framework.
- Não atualize `ai-standard/`, roles, skills, playbooks ou workflows durante a inicialização.
- Não crie um asset amplo quando um asset estreito seria mais claro.
- Não crie arquivos apenas para o workspace parecer completo.

## Exemplo de Design

Se Design precisar de uma capacidade reutilizável para avaliar PRs:

- Tipo de asset: skill.
- Owner: `operations/design/skills/`.
- Arquivo: `design-review/SKILL.md`.
- Uso por role: Product Designer, Accessibility Specialist ou UX Writer podem carregar quando for relevante.
- Não crie `design-review.playbook.md` a menos que exista uma sequência de execução repetível além da própria skill.
