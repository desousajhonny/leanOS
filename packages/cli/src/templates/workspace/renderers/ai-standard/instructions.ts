import type { FileEntry } from "../../types.js";
import { toTitle } from "../../content/shared.js";

const instructions = ["create-agent", "create-area", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];

export function instructionFiles(): FileEntry[] {
  return [
    { path: "ai-standard/instructions/README.md", content: instructionsReadme(instructions) },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructionContent(name) }))
  ];
}

function instructionsReadme(instructions: string[]): string {
  return `# Instructions

## Propósito

Procedimentos passo a passo para criar assets LeanOS.

## Use Quando

Use quando o usuário pedir para criar ou atualizar assets do framework, como agentes, departamentos, áreas, roles, skills, playbooks, workflows ou READMEs.

## Arquivos

${instructions.map((name) => `- \`${name}-instructions.md\``).join("\n")}

## Pastas Relacionadas

- \`../foundation/\`
- \`../templates/\`
- \`../checklists/\`

## Navegação

1. Confirme o tipo de asset em \`../foundation/asset-taxonomy.md\`.
2. Leia \`../foundation/creation-rules.md\`.
3. Abra o arquivo de instrução correspondente.
4. Use o template correspondente.
5. Valide com o checklist correspondente.

## Notas para Agentes

Não use uma instrução única para todos os tipos de asset. Cada instrução protege um caminho de criação diferente.
`;
}

function creationInstructionContent(name: string): string {
  const instructions: Record<string, string> = {
    "create-agent": `# Instruções para Criar Agente

Use quando criar ou alterar um \`AGENT.md\`.

## Antes de Criar

1. Carregue \`../foundation/asset-taxonomy.md\`.
2. Carregue \`../foundation/navigation-chain.md\`.
3. Confirme se o agente é de nível raiz, departamento ou área.
4. Verifique se um mapa em README é suficiente em vez de um AGENT.

## Escolha o Template

- Root agent: \`../templates/agents/root-agent-template.md\`
- Department agent: \`../templates/agents/department-agent-template.md\`
- Area agent: \`../templates/agents/area-agent-template.md\`

## Processo

1. Defina o nível exato que este agente possui.
2. Defina para onde ele roteia em seguida.
3. Defina linhas vermelhas para este nível.
4. Mantenha o inventário curto; delegue detalhes para README, workflows, roles, skills e playbooks.
5. Peça confirmação antes de escrever.

## Valide

Use \`../checklists/agent-quality-checklist.md\`.

## Linhas Vermelhas

- Não faça o AGENT raiz rotear diretamente para roles ou skills de área.
- Não liste todos os workflows, roles, skills ou playbooks filhos.
- Não duplique instruções de comando.
`,
    "create-readme": `# Instruções para Criar README

Use quando criar ou alterar um \`README.md\` de pasta.

## Antes de Criar

1. Carregue \`../foundation/folder-documentation-rules.md\`.
2. Confirme o propósito da pasta.
3. Confirme se um \`AGENT.md\` possui o roteamento operacional desta pasta.

## Escolha o Template

- Folder README: \`../templates/structure/folder-readme-template.md\`
- Area README: \`../templates/structure/area-readme-template.md\`
- Root README: \`../templates/structure/root-readme-template.md\`

## Processo

1. Explique o propósito.
2. Explique quando usar a pasta.
3. Liste arquivos e subpastas importantes.
4. Aponte o owner operacional quando existir.
5. Adicione notas de navegação.
6. Mantenha como mapa, não como executor.

## Valide

Use \`../checklists/readme-quality-checklist.md\`.

## Linhas Vermelhas

- Não duplique o conteúdo de arquivos filhos.
- Não esconda processo dentro do README.
- Não armazene fatos de produto que pertencem a arquivos de knowledge.
`,
    "create-department": `# Instruções para Criar Departamento

Use quando criar um novo departamento raiz.

## Antes de Criar

1. Carregue \`../foundation/asset-taxonomy.md\`.
2. Carregue \`../foundation/navigation-chain.md\`.
3. Confirme se o escopo é amplo o bastante para ser um departamento raiz.
4. Verifique se um departamento ou área existente deveria possuir o trabalho.

## Escolha os Templates

- Department AGENT: \`../templates/agents/department-agent-template.md\`
- Department README: \`../templates/structure/department-template.md\`
- Department YAML: \`../templates/structure/department-template.yaml\`

## Processo

1. Defina o escopo do departamento.
2. Defina as áreas ativas.
3. Defina workflows locais do departamento quando existir trabalho entre áreas.
4. Crie \`AGENT.md\`, \`README.md\`, \`department.yaml\` e \`workflows/\` quando necessário.
5. Não crie roles, skills ou playbooks na raiz do departamento.

## Valide

Use \`../checklists/department-quality-checklist.md\`.

## Linhas Vermelhas

- Não crie um departamento para uma única capacidade.
- Não coloque assets de execução de área na raiz do departamento.
- Não duplique ownership de departamento existente.
`,
    "create-area": `# Instruções para Criar Área

Use quando criar uma área dentro de um departamento raiz.

## Antes de Criar

1. Confirme o departamento owner.
2. Carregue \`../foundation/navigation-chain.md\`.
3. Confirme se a área tem uma responsabilidade operacional estável.
4. Verifique se uma área existente já possui o trabalho.

## Escolha os Templates

- Area README: \`../templates/structure/area-readme-template.md\`
- Area YAML: \`../templates/structure/area-template.yaml\`
- Area AGENT, when needed: \`../templates/agents/area-agent-template.md\`

## Processo

1. Defina o propósito da área.
2. Defina se ela precisa de \`AGENT.md\`.
3. Defina arquivos de knowledge, roles, skills e playbooks.
4. Crie \`README.md\` e \`area.yaml\`.
5. Crie \`roles/\`, \`skills/\`, \`playbooks/\` e \`knowledge/\` apenas quando forem necessários.

## Valide

Use \`../checklists/area-quality-checklist.md\`.

## Linhas Vermelhas

- Não crie uma área sem owner ou caso de uso claro.
- Não crie pastas de execução vazias apenas por decoração.
- Não contorne o ownership do departamento.
`,
    "create-role": `# Instruções para Criar Role

Use quando criar um arquivo \`.role.md\` dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Carregue o \`AGENT.md\` da área quando existir.
3. Carregue o \`README.md\` e o \`area.yaml\` da área.
4. Confirme se uma persona operacional distinta é necessária.

## Escolha o Template

- Role: \`../templates/execution/role-template.md\`
- Role YAML: \`../templates/execution/role-template.yaml\`

## Processo

1. Defina qual chapéu operacional o agente deve vestir.
2. Adicione frontmatter YAML com \`name\` e uma \`description\` apenas de gatilho que começa com "Use quando".
3. Defina quando usar a role.
4. Defina o contexto obrigatório.
5. Aponte para skills e playbooks existentes.
6. Crie skills ou playbooks ausentes apenas depois de confirmação separada.

## Valide

Use \`../checklists/role-quality-checklist.md\`.

## Linhas Vermelhas

- Não crie uma role para uma tarefa única.
- Não faça a role executar a skill ou o playbook por conta própria.
- Não aponte para arquivos ausentes sem marcar a lacuna.
`,
    "create-skill": `# Instruções para Criar Skill

Use quando criar uma pasta de skill dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Confirme qual role ou playbook usará a skill.
3. Verifique se uma skill existente já cobre a capacidade.
4. Crie \`skills/<skill-name>/SKILL.md\`.

## Escolha o Template

- Skill: \`../templates/execution/skill-template.md\`
- Skill YAML: \`../templates/execution/skill-template.yaml\`

## Processo

1. Defina uma capacidade reutilizável.
2. Adicione frontmatter YAML com \`name\` e uma \`description\` apenas de gatilho que começa com "Use quando".
3. Defina quando usar.
4. Defina contexto obrigatório e entradas.
5. Use headings \`### Etapa N\` dentro de \`## Processo\`.
6. Defina verificações, critérios de aceite e saídas.
7. Defina linhas vermelhas.
8. Evite transformar a skill em um processo ordenado completo.

## Qualidade Semântica

O LeanOS deve ser genérico no contexto de produto, mas específico na governança do trabalho.

Descriptions não podem ser circulares, repetir o nome da skill ou dizer apenas que a skill "é necessária". A \`description\` e \`## Use Quando\` precisam conter 2 ou mais sinais concretos de ativação, como artefato ausente, risco, decisão pendente, contexto técnico, handoff ou sintoma operacional.

Exemplo ruim: \`description: Use quando data-change-review é necessário para o pedido ativo\`

Exemplo bom: \`description: Use quando uma Feature altera schema, contrato de API ou dados persistidos; migração, rollback ou privacidade precisam ser avaliados antes do PR\`

## Valide

Use \`../checklists/skill-quality-checklist.md\`.

## Linhas Vermelhas

- Não duplique outra skill.
- Não crie uma skill para uma resposta única.
- Não coloque fatos duráveis de produto dentro de uma skill.
`,
    "create-playbook": `# Instruções para Criar Playbook

Use quando criar um arquivo \`.playbook.md\` dentro de uma área.

## Antes de Criar

1. Confirme a área ativa.
2. Confirme se o playbook é execução tática dentro de uma área.
3. Verifique se um workflow de departamento deveria possuir o fluxo mais amplo.
4. Identifique as skills que o playbook deve usar.
5. Carregue \`../foundation/guided-conversation.md\` quando o playbook pedir que o founder escolha, classifique, priorize ou confirme.

## Escolha o Template

- Playbook: \`../templates/execution/playbook-template.md\`
- Playbook YAML: \`../templates/execution/playbook-template.yaml\`

## Processo

1. Defina gatilho e objetivo.
2. Adicione frontmatter YAML com \`name\` e uma \`description\` apenas de gatilho que começa com "Use quando".
3. Defina entradas.
4. Defina o processo ordenado.
5. Referencie skills em vez de duplicá-las.
6. Adicione \`Conversa Guiada\` quando entrada ou confirmação do founder fizer parte do playbook.
7. Defina condições de parada.
8. Defina critérios de aceite e saídas.
9. Defina arquivos para atualizar.

## Qualidade Semântica

O LeanOS deve ser genérico no contexto de produto, mas específico na governança do trabalho.

Descriptions não podem ser circulares, repetir o nome do playbook ou dizer apenas que o playbook "é necessário". A \`description\` e \`## Use Quando\` precisam conter 2 ou mais sinais concretos de ativação, como artefato pronto, etapa de delivery, lacuna bloqueante, decisão do founder, handoff entre áreas ou risco operacional.

Exemplo ruim: \`description: Use quando release operations é necessário para o pedido ativo\`

Exemplo bom: \`description: Use quando uma release precisa consolidar escopo, validação, rollback e observabilidade; tag ou GitHub Release só podem ser preparados depois do gate de release aprovado\`

## Valide

Use \`../checklists/playbook-quality-checklist.md\`.

## Linhas Vermelhas

- Não duplique um workflow.
- Não esconda lacunas de role ou skill ausente.
- Não atualize arquivos duráveis sem confirmação.
`,
    "create-workflow": `# Instruções para Criar Workflow

Use quando criar um arquivo \`.workflow.md\`.

## Antes de Criar

1. Confirme se o workflow pertence a um departamento ou área.
2. Confirme se o fluxo atravessa múltiplas áreas, roles ou estágios.
3. Verifique se um playbook existente é suficiente.

## Escolha o Template

- Workflow: \`../templates/execution/workflow-template.md\`

## Processo

1. Defina o gatilho.
2. Defina áreas ou roles participantes.
3. Defina o contexto obrigatório.
4. Defina estágios ordenados e handoffs.
5. Marque participantes condicionais como condicionais.
6. Defina saídas e rotas de continuidade.

## Valide

Use \`../checklists/workflow-quality-checklist.md\`.

## Linhas Vermelhas

- Não coloque workflows de negócio em \`.leanos/workflows/\`.
- Não duplique playbooks de área.
- Não exija áreas inativas sem aviso.
`,
  };

  return instructions[name] ?? `# Instruções para ${toTitle(name.replace("create-", ""))}

1. Carregue \`../foundation/asset-taxonomy.md\`.
2. Escolha o departamento e a área ativos.
3. Use o template correspondente.
4. Valide com o checklist correspondente.
5. Peça confirmação antes de escrever.
`;
}
