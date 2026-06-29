import type { FileEntry } from "../../types.js";
import { toTitle } from "../../content/shared.js";

const checklists = ["agent", "area", "department", "playbook", "readme", "role", "skill", "workflow"];

export function checklistFiles(): FileEntry[] {
  return [
    { path: "ai-standard/checklists/README.md", content: checklistsReadme(checklists) },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklistContent(name) }))
  ];
}

function checklistsReadme(checklists: string[]): string {
  return `# Checklists

## Propósito

Gates de qualidade para assets LeanOS.

## Use Quando

Use antes de aceitar um asset recém-criado ou modificado.

## Arquivos

${checklists.map((name) => `- \`${name}-quality-checklist.md\``).join("\n")}

## Pastas Relacionadas

- \`../foundation/\`
- \`../templates/\`
- \`../instructions/\`

## Navegação

1. Confirme o tipo de asset em \`../foundation/asset-taxonomy.md\`.
2. Use apenas o checklist correspondente.
3. Se nenhum checklist corresponder, use \`../foundation/quality-criteria.md\` e peça confirmação antes de criar um novo checklist.

## Notas para Agentes

Não trate todos os checklists como intercambiáveis. Cada checklist protege um tipo de asset diferente.
`;
}

function qualityChecklistContent(name: string): string {
  const checklists: Record<string, string> = {
    agent: `# Checklist de Qualidade do Agente

Use este checklist antes de aceitar um \`AGENT.md\`.

## Escopo

- [ ] O agente possui roteamento para exatamente um nível: raiz, departamento ou área.
- [ ] O agente declara seu escopo operacional.
- [ ] O agente não tenta ser um inventário completo de todos os arquivos filhos.

## Roteamento

- [ ] Agentes raiz roteiam apenas para departamentos.
- [ ] Agentes de departamento roteiam para workflows ou áreas ativas.
- [ ] Agentes de área roteiam para roles especialistas antes de skills ou playbooks.
- [ ] O agente não pula níveis na Navigation Chain.

## Carregamento de Contexto

- [ ] O agente informa aos modelos quais arquivos mínimos carregar primeiro.
- [ ] O agente evita pedir que modelos carreguem o workspace inteiro.
- [ ] Caminhos ausentes são tratados como lacunas, não inventados.

## Linhas Vermelhas

- [ ] O agente protege segredos.
- [ ] O agente pede confirmação antes de modificar arquivos duráveis.
- [ ] O agente não enriquece assets do framework com contexto de produto durante a inicialização.

## Saída

- [ ] O agente define o cabeçalho de resposta ou formato de saída esperado quando relevante.
- [ ] O agente deixa clara a próxima rota.
`,
    readme: `# Checklist de Qualidade do README

Use este checklist antes de aceitar um \`README.md\` de pasta.

## Mapa da Pasta

- [ ] O README explica o propósito da pasta.
- [ ] O README diz quando usar a pasta.
- [ ] O README lista arquivos e subpastas importantes.
- [ ] O README aponta para o owner operacional quando existir.

## Navegação

- [ ] Se a pasta tiver \`AGENT.md\`, o README orienta agentes a começar por ele para trabalho operacional.
- [ ] O README identifica pastas relacionadas.
- [ ] O README evita rotear diretamente para roles filhas quando um agente de área deve rotear primeiro.

## Limites

- [ ] O README é um mapa, não o operador.
- [ ] O README não duplica o conteúdo completo dos arquivos filhos.
- [ ] O README não esconde regras de processo que pertencem a um playbook.
- [ ] O README não armazena fatos de produto que pertencem a arquivos de knowledge.
`,
    department: `# Checklist de Qualidade do Departamento

Use este checklist antes de aceitar um departamento raiz.

## Estrutura

- [ ] O departamento tem \`AGENT.md\`.
- [ ] O departamento tem \`README.md\`.
- [ ] O departamento tem \`department.yaml\`.
- [ ] O departamento tem \`workflows/\` quando existem fluxos entre áreas.
- [ ] Áreas ativas estão listadas e roteadas com clareza.

## Ownership

- [ ] O departamento possui a direção operacional ampla.
- [ ] O departamento não contém \`roles/\`, \`skills/\` ou \`playbooks/\` diretamente.
- [ ] Assets de execução de nível de área vivem dentro das áreas.
- [ ] Workflows de departamento coordenam entre áreas ou estágios.

## Roteamento

- [ ] O AGENT do departamento roteia para workflows ou áreas.
- [ ] O README atua como mapa.
- [ ] O YAML é legível por máquina e não armazena contexto narrativo de produto.
`,
    area: `# Checklist de Qualidade da Área

Use este checklist antes de aceitar uma área.

## Estrutura

- [ ] A área tem \`README.md\`.
- [ ] A área tem \`area.yaml\`.
- [ ] A área tem \`roles/\`, \`skills/\` e \`playbooks/\` quando existe trabalho operacional.
- [ ] A área tem \`knowledge/\` quando possui contexto reutilizável.
- [ ] A área tem \`AGENT.md\` quando roteamento especialista é necessário.

## Ownership

- [ ] A área tem responsabilidade clara dentro do departamento.
- [ ] Roles, skills e playbooks pertencem a esta área.
- [ ] Arquivos de knowledge armazenam contexto reutilizável confirmado.

## Roteamento

- [ ] O AGENT da área, quando existir, escolhe a role especialista.
- [ ] Roles apontam para skills e playbooks.
- [ ] A área não exige caminhos inativos ou ausentes.
`,
    role: `# Checklist de Qualidade da Role

Use este checklist antes de aceitar um arquivo \`.role.md\`.

## Metadados

- [ ] A role tem frontmatter YAML com \`name\` e \`description\`.
- [ ] A \`description\` começa com "Use quando" e descreve condições de gatilho.

## Responsabilidade

- [ ] A role define uma persona operacional clara.
- [ ] A role responde "com qual chapéu o agente deve atuar?"
- [ ] A role não duplica uma skill ou playbook.

## Contexto

- [ ] A role lista o contexto que deve ler antes de agir.
- [ ] A role aponta para arquivos de knowledge relevantes quando necessário.
- [ ] A role não pede contexto de workspace não relacionado.

## Assets de Execução

- [ ] A role aponta para skills relevantes.
- [ ] A role aponta para playbooks relevantes.
- [ ] A role não referencia arquivos ausentes.

## Critérios de Aceite

- [ ] A role declara a saída esperada ou estado de confirmação em \`## Critérios de Aceite\`.
- [ ] A role declara quando pedir esclarecimento ou confirmação.
`,
    skill: `# Checklist de Qualidade da Skill

Use este checklist antes de aceitar uma pasta de skill com \`SKILL.md\`.

## Capacidade

- [ ] A skill define uma capacidade reutilizável.
- [ ] A skill responde "qual capacidade deve ser aplicada?"
- [ ] A skill é reutilizável por uma ou mais roles ou playbooks.
- [ ] A skill não se torna uma sequência completa de processo.
- [ ] A skill vive em \`skills/<skill-name>/SKILL.md\`.
- [ ] A skill tem frontmatter YAML com \`name\` e \`description\`.
- [ ] A \`description\` começa com "Use quando" e descreve condições de gatilho.

## Detalhe Operacional

- [ ] A skill declara quando usar.
- [ ] A skill declara contexto obrigatório.
- [ ] A skill declara entradas.
- [ ] A skill usa headings \`### Etapa N\` dentro de \`## Processo\`.
- [ ] A skill declara verificações em \`## Verificações e Critérios de Aceite\`.
- [ ] A skill declara saídas.
- [ ] A skill declara linhas vermelhas.

## Limites

- [ ] A skill não inventa fatos de produto.
- [ ] A skill não atualiza arquivos sem confirmação quando contexto durável muda.
- [ ] A skill não duplica outra skill.
`,
    playbook: `# Checklist de Qualidade do Playbook

Use este checklist antes de aceitar um arquivo \`.playbook.md\`.

## Metadados

- [ ] O playbook tem frontmatter YAML com \`name\` e \`description\`.
- [ ] A \`description\` começa com "Use quando" e descreve condições de gatilho.

## Sequência

- [ ] O playbook define uma sequência ordenada de execução.
- [ ] O playbook responde "em qual ordem o trabalho deve acontecer?"
- [ ] O playbook usa skills em vez de duplicar todo o conteúdo delas.
- [ ] O playbook tem condições claras de início e fim.

## Entradas e Saídas

- [ ] Entradas estão listadas.
- [ ] Etapas de processo estão listadas.
- [ ] Condições de parada estão listadas em \`## Condições de Parada\`.
- [ ] Critérios de aceite e saídas estão listados em \`## Critérios de Aceite e Saídas\`.
- [ ] Arquivos para atualizar estão listados em \`## Arquivos para Atualizar\`.
- [ ] Linhas vermelhas estão listadas em \`## Linhas Vermelhas\`.

## Conversa Guiada

- [ ] Se o playbook pedir que o founder escolha, classifique, priorize ou confirme, ele referencia \`../foundation/guided-conversation.md\`.
- [ ] Perguntas guiadas usam opções numeradas quando a decisão tem caminhos previsíveis.
- [ ] O founder pode responder com um número ou texto livre.
- [ ] Caminhos técnicos aparecem depois que o founder entende a decisão.

## Escopo

- [ ] O playbook pertence à área correta.
- [ ] O playbook não duplica um workflow de departamento.
- [ ] O playbook não referencia caminhos inativos ou ausentes.
`,
    workflow: `# Checklist de Qualidade do Workflow

Use este checklist antes de aceitar um arquivo \`.workflow.md\`.

## Ownership

- [ ] O workflow pertence a um departamento ou a um fluxo realmente owned por uma área.
- [ ] O workflow coordena múltiplas áreas, roles ou estágios.
- [ ] O workflow não vive em \`.leanos/workflows/\`.

## Fluxo

- [ ] O workflow define gatilho, contexto obrigatório e estado final.
- [ ] O workflow identifica áreas ou roles participantes.
- [ ] O workflow define handoffs entre owners.
- [ ] Participantes condicionais são marcados como condicionais.
- [ ] Áreas ativas ausentes são tratadas como lacunas.

## Saída

- [ ] O workflow declara as saídas esperadas.
- [ ] O workflow identifica rotas de continuidade.
- [ ] O workflow não duplica playbooks de área.
`,
  };

  return checklists[name] ?? `# Checklist de Qualidade de ${toTitle(name)}

- [ ] O propósito está claro.
- [ ] O owner está claro.
- [ ] A navegação está explícita.
- [ ] Expectativas de saída estão claras.
- [ ] Nenhum caminho inativo ou ausente é exigido.
`;
}
