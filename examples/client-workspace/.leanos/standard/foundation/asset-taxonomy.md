# Taxonomia de Assets

Use esta taxonomia antes de criar, alterar ou rotear assets do workspace LeanOS.

## Regra Central

```text
Role = quem atua.
Skill = capacidade usada.
Playbook = execução prática de tarefa dentro de uma área.
Knowledge = informação/source of truth.
Workflow = coordenação entre áreas, estágios ou handoffs.
```

Não use um tipo de asset para fazer o trabalho de outro tipo.

## Referência Rápida

| Asset | O Que É | Pergunta Que Responde |
| --- | --- | --- |
| `AGENT.md` | Owner operacional e roteador de um nível do workspace | "Quem possui o roteamento neste nível?" |
| `README.md` | Mapa de diretório e explicação humana | "O que existe aqui e quando devo usar?" |
| `department.yaml` | Estrutura de departamento legível por máquina | "Quais áreas e workflows pertencem a este departamento?" |
| `area.yaml` | Estrutura de área legível por máquina | "Quais roles, skills, playbooks e knowledge pertencem a esta área?" |
| `role` | Persona/responsabilidade usada pelo agente | "Qual chapéu o agente deve vestir?" |
| `skill` | Capacidade reutilizável usada por uma role | "Qual capacidade deve ser aplicada?" |
| `playbook` | Execução prática de tarefa dentro de uma área | "Em qual ordem esta área deve executar a tarefa?" |
| `knowledge` | Contexto, fatos e source of truth | "O que sabemos sobre isso?" |
| `workflow` | Coordenação multiárea, multiestágio ou de handoff | "Como trabalho maior deve se mover entre owners?" |
| `command` | Instrução portátil de chat para uma intenção conhecida | "O que deve acontecer quando o usuário invocar este comando?" |

## Workflow vs Playbook

Use this distinction when deciding where a process belongs:

```text
Workflow = coordena múltiplas áreas, estágios ou handoffs.
Playbook = executa uma tarefa prática dentro de uma área.
```

Um workflow deve explicar quem participa, quais handoffs acontecem e quando o trabalho passa de um owner para outro.
Um playbook deve explicar as etapas concretas que uma área segue depois que o owner, a role e as skills corretas são selecionados.

Se o processo coordena ativamente Product Ops, Design, Engineering ou Security entre owners, provavelmente é um workflow.
Se o processo muda estado dentro de uma única área owner, como Product Ops criando drafts de Epic ou Feature, provavelmente é um playbook.

## Tipos de Asset

### `AGENT.md`

An `AGENT.md` é o owner operacional de um nível do workspace.

- Vive na raiz, raiz de departamento ou raiz de área selecionada.
- Responde: "Quem decide a próxima rota aqui?"
- Crie quando um nível precisar de regras de roteamento, linhas vermelhas ou lógica de delegação.
- Não crie quando um mapa em README for suficiente.
- Agentes devem carregá-lo antes de entrar em roles, skills ou playbooks de níveis inferiores.

Exemplo: `operations/design/AGENT.md` atua como lead da área Design. Ele escolhe entre Product Designer, UX Researcher, Accessibility Specialist e UX Writer.

### `README.md`

A `README.md` é o mapa de uma pasta.

- Vive em toda pasta importante.
- Responde: "Para que serve esta pasta, quais arquivos existem aqui e como navegar?"
- Crie para pastas que humanos ou modelos entrarão.
- Não use como manual operacional longo quando um `AGENT.md`, role, skill ou playbook deveria possuir esse detalhe.
- Agentes devem usá-lo para entender a estrutura local.

Exemplo: `operations/design/README.md` explica a área Design, seus arquivos de knowledge, roles, skills e playbooks.

### `department.yaml`

`department.yaml` é o mapa estruturado de um departamento raiz.

- Vive em `strategy/department.yaml`, `operations/department.yaml` ou `growth/department.yaml`.
- Responde: "Quais áreas e workflows estão ativos neste departamento?"
- Crie para todo departamento raiz.
- Não armazene contexto narrativo de produto ou fatos de empresa nele.
- Agentes devem usá-lo quando precisarem de estrutura legível por máquina.

Exemplo: `operations/department.yaml` lista áreas como Product Ops, Design, Engineering, DevOps e Security.

### `area.yaml`

`area.yaml` é o mapa estruturado de uma área.

- Vive dentro de uma área, como `operations/design/area.yaml`.
- Responde: "Quais roles, skills, playbooks e arquivos de knowledge pertencem aqui?"
- Crie para toda área ativa.
- Não use como substituto para instruções de role, skill ou playbook.
- Agentes devem usá-lo para verificar assets locais disponíveis.

Exemplo: `operations/design/area.yaml` lista roles, skills, playbooks e arquivos de `knowledge/`.

### Role

Uma role é uma persona operacional e limite de responsabilidade.

- Vive em `<area>/roles/<direct-name>.role.md`.
- Responde: "Com qual chapéu o agente deve atuar?"
- Crie quando uma responsabilidade recorrente precisar de um ponto de vista distinto.
- Não crie uma role para uma tarefa única ou uma capacidade simples.
- Agentes devem selecionar uma role antes de carregar skills ou playbooks.

Exemplo: `operations/design/roles/product-designer.role.md` possui decisões de product design e aponta para `design-system/SKILL.md`, `user-flow-mapping/SKILL.md`, `screen-specification/SKILL.md` e `design-review/SKILL.md`.

### Skill

Uma skill é uma capacidade reutilizável.

- Vive em `<area>/skills/<direct-name>/SKILL.md`.
- Responde: "Qual capacidade deve ser aplicada?"
- Crie quando a mesma capacidade for reutilizada por uma ou mais roles ou playbooks.
- Não transforme uma skill em processo completo; isso pertence a um playbook.
- Agentes devem carregar apenas as skills exigidas pela role e tarefa ativas.

Exemplo: `operations/design/skills/accessibility/SKILL.md` define como aplicar verificações de acessibilidade e expectativas WCAG 2.2 AA.

### Playbook

Um playbook é uma sequência prática de execução dentro de uma área.

- Vive em `<area>/playbooks/<direct-name>.playbook.md`.
- Responde: "Em qual ordem esta área deve executar a tarefa?"
- Crie quando uma tarefa tiver etapas repetíveis, entradas, saídas e regras de atualização de arquivo.
- Não crie um playbook para uma única verificação ou capacidade isolada.
- Não use um playbook para coordenar múltiplas áreas ou handoffs entre departamentos.
- Agentes devem usá-lo depois de selecionar a role e carregar as skills obrigatórias.

Exemplo: `operations/design/playbooks/design-foundation.playbook.md` sequencia trabalho de design-system, acessibilidade e user-flow antes da implementação.

### Knowledge

Arquivos de knowledge guardam contexto, fatos, decisões e notas de source of truth.

- Vive em `<area>/knowledge/` quando a área usa knowledge reutilizável.
- Responde: "O que sabemos sobre isso?"
- Crie quando a informação precisa persistir entre tarefas.
- Não coloque instruções operacionais, comportamento de role ou etapas de processo aqui.
- Agentes devem atualizar knowledge apenas depois de confirmação explícita do usuário.

Exemplo: `operations/design/knowledge/design-system.md` armazena a baseline de design-system. Ele não decide como criar o design system; a skill e o playbook fazem isso.

### Workflow

Um workflow coordena múltiplas áreas, estágios ou handoffs.

- Vive em `<department>/workflows/` ou, quando realmente area-owned, `<area>/workflows/`.
- Responde: "Como trabalho maior deve se mover entre owners?"
- Crie quando a tarefa atravessar múltiplas roles, áreas ou estágios.
- Não crie um workflow para execução prática dentro de uma área; use um playbook para isso.
- Não coloque workflows de negócio em `.leanos/workflows/`; `.leanos/` é suporte de runtime.
- Agentes devem usar workflows para coordenar owners e então entrar na área e role relevantes.

Exemplo: `operations/workflows/feature-to-delivery-cycle.workflow.md` pode coordenar Product Ops, Design, Engineering e Security para delivery de feature.

## Exemplo de Design

Se o founder disser, "defina o design antes da implementação":

1. Root `AGENT.md` roteia para `operations/AGENT.md`.
2. Operations roteia para `operations/design/AGENT.md`.
3. O AGENT da área Design escolhe `roles/product-designer.role.md`.
4. A role carrega skills:
   - `skills/design-system/SKILL.md`
   - `skills/accessibility/SKILL.md`
   - `skills/user-flow-mapping/SKILL.md`
5. O trabalho segue `playbooks/design-foundation.playbook.md`.
6. Saídas confirmadas atualizam:
   - `knowledge/design-system.md`
   - `knowledge/accessibility.md`
   - `knowledge/user-flows.md`

Isso mantém responsabilidades separadas:

- A role define a perspectiva operacional.
- As skills definem capacidades.
- O playbook define a ordem.
- Os arquivos de knowledge armazenam fatos e decisões confirmadas.
