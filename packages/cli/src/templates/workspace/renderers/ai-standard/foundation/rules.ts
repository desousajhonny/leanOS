export function aiStandardReadme(): string {
  return `# AI Standard

## Propósito

Source of truth do LeanOS para criar, revisar e rotear assets AI-native do framework.

## Use Quando

Use esta pasta antes de criar ou alterar agentes, departamentos, áreas, roles, skills, playbooks, workflows, comandos, templates, checklists ou instruções.

## Rota Rápida

Use esta rota para a maior parte do trabalho de criação de assets:

1. Decida o tipo de asset com \`foundation/asset-taxonomy.md\`.
2. Confirme posicionamento e limites com \`foundation/creation-rules.md\`.
3. Confirme a nomenclatura com \`foundation/naming-conventions.md\`.
4. Use \`foundation/guided-conversation.md\` quando o asset pedir que o founder decida, classifique, priorize ou confirme.
5. Carregue o arquivo correspondente em \`instructions/\`.
6. Use o ponto de partida correspondente em \`templates/\`.
7. Valide o resultado com o arquivo correspondente em \`checklists/\`.
8. Abra \`examples/\` apenas se uma referência melhorar a qualidade.

## Mapa de Decisão

| Necessidade | Rota | Por quê |
| --- | --- | --- |
| Decidir qual é o tipo de asset | \`foundation/asset-taxonomy.md\` | Define AGENT, README, YAML, role, skill, playbook, knowledge, workflow e command. |
| Decidir como um modelo deve navegar pelo workspace | \`foundation/navigation-chain.md\` | Define navegação por owner primeiro e evita pular rotas. |
| Decidir o próximo estágio de progressão do founder | \`foundation/founder-progression-model.md\` | Define progressão Strategy-first, gates, activation_required e comportamento de roteamento do Chief. |
| Verificar se um movimento de progressão do founder é permitido | \`foundation/progression-gates.md\` | Define contexto obrigatório, próximos estágios permitidos e próximos estágios bloqueados. |
| Desenhar perguntas ou decisões amigáveis ao founder | \`foundation/guided-conversation.md\` | Define opções numeradas, pausas de decisão e prompts de confirmação. |
| Decidir se um novo arquivo deve existir | \`foundation/creation-rules.md\` | Evita proliferação de assets e ownership duplicado. |
| Nomear um arquivo ou pasta | \`foundation/naming-conventions.md\` | Mantém nomes previsíveis e legíveis por máquina. |
| Julgar qualidade quando nenhum checklist específico é suficiente | \`foundation/quality-criteria.md\` | Fornece critérios universais de qualidade e rejeição. |
| Criar um README de pasta | \`foundation/folder-documentation-rules.md\` e \`instructions/create-readme-instructions.md\` | Mantém READMEs como mapas, não executores. |
| Criar um asset | \`instructions/\` e depois \`templates/\` | Fornece o procedimento e a estrutura inicial. |
| Revisar um asset antes de aceitá-lo | \`checklists/\` | Aplica o gate de qualidade certo para o tipo de asset. |
| Ver como algo bom se parece | \`examples/\` | Fornece apenas formato de referência, não contexto ativo. |

## Rotas

### \`foundation/\`

Regras conceituais centrais. Use quando decidir o que pertence a cada lugar, como assets se relacionam, como a navegação funciona ou se um asset proposto é válido.

### \`templates/\`

Estruturas iniciais reutilizáveis. Use depois de escolher o tipo de asset e antes de rascunhar o arquivo.

### \`checklists/\`

Gates de qualidade. Use antes de aceitar um asset recém-criado ou modificado.

### \`instructions/\`

Procedimentos de criação. Use quando o usuário pedir para criar ou atualizar um asset LeanOS.

### \`examples/\`

Exemplos ilustrativos. Use apenas como referência; o contexto ativo do workspace prevalece.

## Fluxo de Criação

Para qualquer novo asset LeanOS:

1. Carregue apenas este README e os menores arquivos correspondentes.
2. Declare o tipo de asset selecionado e o owner.
3. Declare o path de destino.
4. Use a instrução e o template correspondentes.
5. Valide com o checklist correspondente.
6. Peça confirmação antes de escrever arquivos do framework.

## Não Carregar por Padrão

- Não carregue todos os arquivos de foundation.
- Não carregue todas as categorias de template.
- Não carregue todos os checklists.
- Não carregue exemplos a menos que uma referência seja necessária.
- Não deixe exemplos sobrescreverem o contexto ativo do workspace.

## Arquivos

- \`foundation/\`
- \`templates/\`
- \`checklists/\`
- \`instructions/\`
- \`examples/\`

## Pastas Relacionadas

- \`../AGENT.md\`

## Notas para Agentes

Não carregue todo \`.leanos/standard/\` por padrão. Escolha o menor arquivo de foundation, instrução, template e checklist necessário para o pedido ativo.

Se a próxima rota não estiver clara, comece por \`foundation/asset-taxonomy.md\`.
`;
}

export function creationRules(): string {
  return `# Regras de Criação

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

1. \`asset-taxonomy.md\` para confirmar o tipo de asset.
2. \`navigation-chain.md\` para confirmar onde o asset pertence.
3. \`naming-conventions.md\` para nomear o arquivo corretamente.
4. A instrução correspondente em \`../instructions/\`.
5. O template correspondente em \`../templates/\`.
6. O checklist correspondente em \`../checklists/\`.

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

- Root \`AGENT.md\` lives at workspace root.
- Department \`AGENT.md\`, \`README.md\`, \`department.yaml\` and \`workflows/\` live at department root.
- Area \`AGENT.md\`, \`README.md\`, \`area.yaml\`, \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\` live inside the area.
- Roles, skills e playbooks não vivem diretamente abaixo de departamentos raiz.
- Business workflows live in departments or areas, not in \`.leanos/\`.
- Framework standards, templates, checklists, instructions and examples live in \`.leanos/standard/\`.

## Regras de Responsabilidade

- \`AGENT.md\` routes and sets operating boundaries.
- \`README.md\` maps a folder.
- \`department.yaml\` and \`area.yaml\` provide machine-readable structure.
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
- Não atualize \`.leanos/standard/\`, roles, skills, playbooks ou workflows durante a inicialização.
- Não crie um asset amplo quando um asset estreito seria mais claro.
- Não crie arquivos apenas para o workspace parecer completo.

## Exemplo de Design

Se Design precisar de uma capacidade reutilizável para avaliar PRs:

- Tipo de asset: skill.
- Owner: \`operations/design/skills/\`.
- Arquivo: \`design-review/SKILL.md\`.
- Uso por role: Product Designer, Accessibility Specialist ou UX Writer podem carregar quando for relevante.
- Não crie \`design-review.playbook.md\` a menos que exista uma sequência de execução repetível além da própria skill.
`;
}

export function qualityCriteria(): string {
  return `# Critérios de Qualidade

Use estes critérios para julgar se um asset LeanOS é bom o bastante para manter.

## Propósito

Critérios de qualidade evitam assets vagos, lógica duplicada e rotas confusas.

Elas respondem:

- Este asset está claro?
- Ele pertence ao nível certo?
- Ele carrega apenas o contexto necessário?
- Ele preserva a Navigation Chain?
- Ele ajuda modelos futuros a agir melhor?

## Critérios Universais

Todo asset LeanOS deve ter:

- Propósito claro.
- Owner explícito.
- Local correto.
- Carregamento mínimo de contexto.
- Entradas claras.
- Saídas claras.
- Limites e linhas vermelhas quando relevante.
- Referências a assets relacionados apenas quando úteis.
- Nenhuma responsabilidade duplicada.
- Nenhum fato inventado de produto ou empresa.

## Qualidade de Roteamento

Um bom asset:

- Mantém o roteamento raiz no nível de departamento.
- Permite que AGENTs de departamento escolham workflows ou áreas.
- Permite que AGENTs de área escolham roles.
- Permite que roles carreguem skills e playbooks.
- Não pula níveis porque um arquivo posterior parece relevante.
- Não pede que um modelo carregue o workspace inteiro.

## Qualidade de Conteúdo

Um bom asset:

- Usa linguagem direta.
- Diz quando usar.
- Diz quando não usar.
- Nomeia os arquivos que pode atualizar.
- Separa fatos de suposições.
- Uses \`not applicable\` explicitly when a dimension does not apply.
- Pede confirmação antes de alterar arquivos duráveis.

## Sinais Específicos por Asset

| Asset | Sinal de Qualidade |
| --- | --- |
| \`AGENT.md\` | Roteia para o próximo owner sem se tornar um inventário gigante. |
| \`README.md\` | Explica propósito, arquivos e navegação da pasta sem se tornar executor. |
| \`role\` | Define um chapéu operacional claro e aponta para skills/playbooks relevantes. |
| \`skill\` | Descreve uma capacidade reutilizável, verificações e saídas. |
| \`playbook\` | Fornece uma sequência ordenada de execução com entradas e saídas. |
| \`knowledge\` | Armazena contexto confirmado sem instruções de processo. |
| \`workflow\` | Coordena trabalho multiárea ou multiestágio. |
| \`command\` | Carrega contexto mínimo e define atualizações permitidas/proibidas. |

## Critérios de Rejeição

Rejeite ou revise um asset quando:

- Ele duplica outro asset.
- Ele mistura responsabilidades de role, skill, playbook e knowledge.
- Ele não tem owner claro.
- Ele aponta para paths que não existem.
- Ele recomenda áreas inativas sem aviso.
- Ele armazena segredos ou valores de tokens.
- Ele toma decisões de implementação sem carregar role, skill e playbook obrigatórios.
- Ele atualiza source of truth ou arquivos do framework sem confirmação.

## Checagem Final

Antes de aceitar um asset, responda:

1. Que tipo de asset é este?
2. Quem é o owner?
3. Qual pergunta ele responde?
4. O que deve carregá-lo?
5. O que ele nunca deve fazer?
6. Qual checklist o valida?
`;
}

export function folderDocumentationRules(): string {
  return `# Regras de Documentação de Pasta

Use these rules when creating or reviewing folder documentation, especially \`README.md\` files.

## Propósito

Documentação de pasta ajuda humanos e modelos a entender onde estão, o que pertence ali e para onde ir em seguida.

It answers:

- Para que serve esta pasta?
- Quando um agente deve entrar nela?
- Quais arquivos são importantes?
- Quais arquivos são source of truth, assets operacionais ou exemplos?
- Para onde o agente deve rotear em seguida?

## Responsabilidade do README

Um README de pasta é um mapa, não o operador.

Ele deve:

- Explicar o propósito da pasta.
- Explicar quando usar a pasta.
- Listar arquivos e subpastas importantes.
- Apontar para o owner operacional quando existir.
- Identificar pastas relacionadas.
- Fornecer notas de navegação.

Ele não deve:

- Replace \`AGENT.md\` routing.
- Substituir instruções de role.
- Substituir capacidades de skill.
- Substituir sequência de playbook.
- Armazenar fatos de produto que pertencem a arquivos de knowledge.
- Virar um documento genérico para tudo.

## Seções Obrigatórias

Use these sections for important folders:

- \`# <Folder Name>\`
- \`## Propósito\`
- \`## Use Quando\`
- \`## Source of Truth\` when the folder owns knowledge or durable context.
- \`## Arquivos\`
- \`## Pastas Relacionadas\`
- \`## Navegação\`
- \`## Notas para Agentes\`

If a section does not apply, omit it or state \`Not applicable\` when the absence matters.

## Regras de Navegação

- If the folder has \`AGENT.md\`, tell agents to start there for operational work.
- If the folder has \`department.yaml\` or \`area.yaml\`, mention that it provides machine-readable structure.
- If the folder has \`roles/\`, \`skills/\` or \`playbooks/\`, explain that the area owner selects them.
- Se a pasta contiver exemplos, diga que exemplos são apenas referências.
- Se a pasta contiver templates, diga que templates são estruturas iniciais, não contexto ativo do workspace.

## Exemplos por Tipo de Pasta

### Pasta de Departamento

Exemplo: \`operations/README.md\`

- Explica o que Operations possui.
- Aponta para \`operations/AGENT.md\`.
- Lista áreas ativas.
- Aponta para \`workflows/\` para trabalho entre áreas.
- Não lista toda role, skill ou playbook de cada área.

### Pasta de Área

Exemplo: \`operations/design/README.md\`

- Explica o que Design possui.
- Aponta para \`operations/design/AGENT.md\`.
- Lists \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\`.
- Explica caminhos comuns em alto nível.
- Não executa o processo de Design por conta própria.

### Pasta de Knowledge

Exemplo: \`operations/design/knowledge/README.md\`

- Explica quais fatos duráveis de Design vivem ali.
- Lista arquivos de knowledge.
- Diz que atualizações exigem confirmação.
- Não define skills nem sequência de playbook.

### Pasta de AI Standard

Exemplo: \`.leanos/standard/README.md\`

- Roteia para foundation, templates, checklists, instruções e exemplos.
- Explica quando usar cada rota.
- Orienta modelos a não carregar tudo por padrão.

## Linhas Vermelhas

- Não transforme READMEs de pasta em inventários enormes.
- Não duplique todo o conteúdo de arquivos filhos.
- Não documente paths que não existem.
- Não aponte diretamente para uma role quando um AGENT de área deve rotear primeiro.
- Não esconda regras de processo dentro de um README quando um playbook deve possuí-las.
`;
}

export function assetTaxonomy(): string {
  return `# Taxonomia de Assets

Use esta taxonomia antes de criar, alterar ou rotear assets do workspace LeanOS.

## Regra Central

\`\`\`text
Role = quem atua.
Skill = capacidade usada.
Playbook = execução prática de tarefa dentro de uma área.
Knowledge = informação/source of truth.
Workflow = coordenação entre áreas, estágios ou handoffs.
\`\`\`

Não use um tipo de asset para fazer o trabalho de outro tipo.

## Referência Rápida

| Asset | O Que É | Pergunta Que Responde |
| --- | --- | --- |
| \`AGENT.md\` | Owner operacional e roteador de um nível do workspace | "Quem possui o roteamento neste nível?" |
| \`README.md\` | Mapa de diretório e explicação humana | "O que existe aqui e quando devo usar?" |
| \`department.yaml\` | Estrutura de departamento legível por máquina | "Quais áreas e workflows pertencem a este departamento?" |
| \`area.yaml\` | Estrutura de área legível por máquina | "Quais roles, skills, playbooks e knowledge pertencem a esta área?" |
| \`role\` | Persona/responsabilidade usada pelo agente | "Qual chapéu o agente deve vestir?" |
| \`skill\` | Capacidade reutilizável usada por uma role | "Qual capacidade deve ser aplicada?" |
| \`playbook\` | Execução prática de tarefa dentro de uma área | "Em qual ordem esta área deve executar a tarefa?" |
| \`knowledge\` | Contexto, fatos e source of truth | "O que sabemos sobre isso?" |
| \`workflow\` | Coordenação multiárea, multiestágio ou de handoff | "Como trabalho maior deve se mover entre owners?" |
| \`command\` | Instrução portátil de chat para uma intenção conhecida | "O que deve acontecer quando o usuário invocar este comando?" |

## Workflow vs Playbook

Use this distinction when deciding where a process belongs:

\`\`\`text
Workflow = coordena múltiplas áreas, estágios ou handoffs.
Playbook = executa uma tarefa prática dentro de uma área.
\`\`\`

Um workflow deve explicar quem participa, quais handoffs acontecem e quando o trabalho passa de um owner para outro.
Um playbook deve explicar as etapas concretas que uma área segue depois que o owner, a role e as skills corretas são selecionados.

Se o processo coordena ativamente Product Ops, Design, Engineering ou Security entre owners, provavelmente é um workflow.
Se o processo muda estado dentro de uma única área owner, como Product Ops criando drafts de Epic ou Feature, provavelmente é um playbook.

## Tipos de Asset

### \`AGENT.md\`

An \`AGENT.md\` é o owner operacional de um nível do workspace.

- Vive na raiz, raiz de departamento ou raiz de área selecionada.
- Responde: "Quem decide a próxima rota aqui?"
- Crie quando um nível precisar de regras de roteamento, linhas vermelhas ou lógica de delegação.
- Não crie quando um mapa em README for suficiente.
- Agentes devem carregá-lo antes de entrar em roles, skills ou playbooks de níveis inferiores.

Exemplo: \`operations/design/AGENT.md\` atua como lead da área Design. Ele escolhe entre Product Designer, UX Researcher, Accessibility Specialist e UX Writer.

### \`README.md\`

A \`README.md\` é o mapa de uma pasta.

- Vive em toda pasta importante.
- Responde: "Para que serve esta pasta, quais arquivos existem aqui e como navegar?"
- Crie para pastas que humanos ou modelos entrarão.
- Não use como manual operacional longo quando um \`AGENT.md\`, role, skill ou playbook deveria possuir esse detalhe.
- Agentes devem usá-lo para entender a estrutura local.

Exemplo: \`operations/design/README.md\` explica a área Design, seus arquivos de knowledge, roles, skills e playbooks.

### \`department.yaml\`

\`department.yaml\` é o mapa estruturado de um departamento raiz.

- Vive em \`strategy/department.yaml\`, \`operations/department.yaml\` ou \`growth/department.yaml\`.
- Responde: "Quais áreas e workflows estão ativos neste departamento?"
- Crie para todo departamento raiz.
- Não armazene contexto narrativo de produto ou fatos de empresa nele.
- Agentes devem usá-lo quando precisarem de estrutura legível por máquina.

Exemplo: \`operations/department.yaml\` lista áreas como Product Ops, Design, Engineering, DevOps e Security.

### \`area.yaml\`

\`area.yaml\` é o mapa estruturado de uma área.

- Vive dentro de uma área, como \`operations/design/area.yaml\`.
- Responde: "Quais roles, skills, playbooks e arquivos de knowledge pertencem aqui?"
- Crie para toda área ativa.
- Não use como substituto para instruções de role, skill ou playbook.
- Agentes devem usá-lo para verificar assets locais disponíveis.

Exemplo: \`operations/design/area.yaml\` lista roles, skills, playbooks e arquivos de \`knowledge/\`.

### Role

Uma role é uma persona operacional e limite de responsabilidade.

- Vive em \`<area>/roles/<direct-name>.role.md\`.
- Responde: "Com qual chapéu o agente deve atuar?"
- Crie quando uma responsabilidade recorrente precisar de um ponto de vista distinto.
- Não crie uma role para uma tarefa única ou uma capacidade simples.
- Agentes devem selecionar uma role antes de carregar skills ou playbooks.

Exemplo: \`operations/design/roles/product-designer.role.md\` possui decisões de product design e aponta para \`design-system/SKILL.md\`, \`user-flow-mapping/SKILL.md\`, \`screen-specification/SKILL.md\` e \`design-review/SKILL.md\`.

### Skill

Uma skill é uma capacidade reutilizável.

- Vive em \`<area>/skills/<direct-name>/SKILL.md\`.
- Responde: "Qual capacidade deve ser aplicada?"
- Crie quando a mesma capacidade for reutilizada por uma ou mais roles ou playbooks.
- Não transforme uma skill em processo completo; isso pertence a um playbook.
- Agentes devem carregar apenas as skills exigidas pela role e tarefa ativas.

Exemplo: \`operations/design/skills/accessibility/SKILL.md\` define como aplicar verificações de acessibilidade e expectativas WCAG 2.2 AA.

### Playbook

Um playbook é uma sequência prática de execução dentro de uma área.

- Vive em \`<area>/playbooks/<direct-name>.playbook.md\`.
- Responde: "Em qual ordem esta área deve executar a tarefa?"
- Crie quando uma tarefa tiver etapas repetíveis, entradas, saídas e regras de atualização de arquivo.
- Não crie um playbook para uma única verificação ou capacidade isolada.
- Não use um playbook para coordenar múltiplas áreas ou handoffs entre departamentos.
- Agentes devem usá-lo depois de selecionar a role e carregar as skills obrigatórias.

Exemplo: \`operations/design/playbooks/design-foundation.playbook.md\` sequencia trabalho de design-system, acessibilidade e user-flow antes da implementação.

### Knowledge

Arquivos de knowledge guardam contexto, fatos, decisões e notas de source of truth.

- Vive em \`<area>/knowledge/\` quando a área usa knowledge reutilizável.
- Responde: "O que sabemos sobre isso?"
- Crie quando a informação precisa persistir entre tarefas.
- Não coloque instruções operacionais, comportamento de role ou etapas de processo aqui.
- Agentes devem atualizar knowledge apenas depois de confirmação explícita do usuário.

Exemplo: \`operations/design/knowledge/design-system.md\` armazena a baseline de design-system. Ele não decide como criar o design system; a skill e o playbook fazem isso.

### Workflow

Um workflow coordena múltiplas áreas, estágios ou handoffs.

- Vive em \`<department>/workflows/\` ou, quando realmente area-owned, \`<area>/workflows/\`.
- Responde: "Como trabalho maior deve se mover entre owners?"
- Crie quando a tarefa atravessar múltiplas roles, áreas ou estágios.
- Não crie um workflow para execução prática dentro de uma área; use um playbook para isso.
- Não coloque workflows de negócio em \`.leanos/workflows/\`; \`.leanos/\` é suporte de runtime.
- Agentes devem usar workflows para coordenar owners e então entrar na área e role relevantes.

Exemplo: \`operations/workflows/feature-to-delivery-cycle.workflow.md\` pode coordenar Product Ops, Design, Engineering e Security para delivery de feature.

## Exemplo de Design

Se o founder disser, "defina o design antes da implementação":

1. Root \`AGENT.md\` roteia para \`operations/AGENT.md\`.
2. Operations roteia para \`operations/design/AGENT.md\`.
3. O AGENT da área Design escolhe \`roles/product-designer.role.md\`.
4. A role carrega skills:
   - \`skills/design-system/SKILL.md\`
   - \`skills/accessibility/SKILL.md\`
   - \`skills/user-flow-mapping/SKILL.md\`
5. O trabalho segue \`playbooks/design-foundation.playbook.md\`.
6. Saídas confirmadas atualizam:
   - \`knowledge/design-system.md\`
   - \`knowledge/accessibility.md\`
   - \`knowledge/user-flows.md\`

Isso mantém responsabilidades separadas:

- A role define a perspectiva operacional.
- As skills definem capacidades.
- O playbook define a ordem.
- Os arquivos de knowledge armazenam fatos e decisões confirmadas.
`;
}
