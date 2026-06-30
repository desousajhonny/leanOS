import { stringifyYaml } from "../../../../utils/yaml.js";
import type { AreaDefinition, FileEntry, WorkspaceAnswers } from "../../types.js";
import { folderReadme } from "../../content/shared.js";
import { playbookFile } from "./playbook.js";
import { roleFile } from "./role.js";
import { skillFile } from "./skill.js";

export function areaFiles(area: AreaDefinition, answers: WorkspaceAnswers): FileEntry[] {
  return [
    ...(area.lead ? [{ path: `${area.path}/AGENT.md`, content: areaAgent(area) }] : []),
    { path: `${area.path}/README.md`, content: areaReadme(area) },
    { path: `${area.path}/area.yaml`, content: areaYaml(area) },
    { path: `${area.path}/roles/README.md`, content: folderReadme(`Papéis de ${area.name}`, `Papéis pertencentes à área ${area.name}.`, area.lead ? "Use depois que o AGENT da área selecionar um papel." : "Use depois que o README da área selecionar um papel.", area.lead ? "../AGENT.md" : "../README.md", area.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Carregue um papel e siga suas skills e playbooks.") },
    ...area.roles.map((role) => ({ path: `${area.path}/roles/${role.slug}.role.md`, content: roleFile(area, role) })),
    { path: `${area.path}/skills/README.md`, content: folderReadme(`Skills de ${area.name}`, `Skills pertencentes à área ${area.name}.`, "Use quando um papel selecionado apontar para uma skill.", area.lead ? "../AGENT.md" : "../README.md", area.skills.map((skill) => `${skill.slug}/SKILL.md`), ["../roles/", "../playbooks/"], "Carregue apenas as skills necessárias para a tarefa ativa.") },
    ...area.skills.map((skill) => ({ path: `${area.path}/skills/${skill.slug}/SKILL.md`, content: skillFile(area, skill) })),
    { path: `${area.path}/playbooks/README.md`, content: folderReadme(`Playbooks de ${area.name}`, `Sequências de execução pertencentes à área ${area.name}.`, "Use quando um papel selecionado apontar para um playbook.", area.lead ? "../AGENT.md" : "../README.md", area.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks para sequenciar execução, não para duplicar detalhes das skills.") },
    ...area.playbooks.map((playbook) => ({ path: `${area.path}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(area, playbook) })),
    ...area.files.map((file) => ({ path: `${area.path}/${file.path}`, content: file.content(answers) }))
  ];
}

function areaReadme(area: AreaDefinition): string {
  return `# ${area.name}

## Propósito

${area.purpose}

## Use Quando

${area.whenToUse.map((item) => `- ${item}`).join("\n")}

## Source of Truth

${area.sourceOfTruth.length > 0 ? area.sourceOfTruth.map((file) => `- \`${file}\``).join("\n") : "- No loose source-of-truth files yet. Use playbooks for operational procedures and update persistent notes only when the workspace creates them."}

${area.operatingRules?.length ? `## Regras Operacionais\n\n${area.operatingRules.map((item) => `- ${item}`).join("\n")}\n` : ""}
${area.redLines?.length ? `## Linhas Vermelhas\n\n${area.redLines.map((item) => `- ${item}`).join("\n")}\n` : ""}

## Navegação

${area.lead ? "1. Para trabalho operacional, comece em `AGENT.md`.\n2. Use este README como mapa do diretório.\n3. Depois que o AGENT da área escolher um papel, carregue apenas as skills e playbooks necessários.\n4. Produza a saída solicitada e atualize arquivos de fonte da verdade quando necessário." : "1. Escolha o papel relevante em `roles/`.\n2. Carregue apenas as skills necessárias em `skills/`.\n3. Use o playbook correspondente em `playbooks/`.\n4. Produza a saída solicitada e atualize arquivos de fonte da verdade quando necessário."}

## Responsabilidades dos Arquivos

- \`README.md\`: mapa e explicação da área.
- \`AGENT.md\`: lead operacional da área quando presente.
- \`area.yaml\`: estrutura legível por máquina para esta área.
- \`roles/\`: personas operacionais desta área.
- \`skills/\`: capacidades focadas usadas pelos papéis.
- \`playbooks/\`: sequências táticas de execução.

## Caminhos Comuns

${area.commonPaths.map((item) => `- ${item}`).join("\n")}
`;
}

function areaAgent(area: AreaDefinition): string {
  if (!area.lead) return "";

  return `# Agente de ${area.name}

Você é ${area.lead.title} deste workspace.

Este \`AGENT.md\` é o dono operacional da área ${area.name}.

Use \`README.md\` como mapa do diretório. Use \`area.yaml\` quando a estrutura legível por máquina importar.

## Escopo Operacional

${area.lead.purpose}

${area.operatingRules?.length ? `## Regras Operacionais\n\n${area.operatingRules.map((item) => `- ${item}`).join("\n")}\n` : ""}
${area.redLines?.length ? `## Linhas Vermelhas\n\n${area.redLines.map((item) => `- ${item}`).join("\n")}\n` : ""}

## Roteamento de Papéis

Escolha o menor papel especialista para o pedido:

${area.roles.map((role) => `- ${role.title}: \`roles/${role.slug}.role.md\` - use quando ${role.useWhen.join("; ")}.`).join("\n")}

## Caminhos Comuns

${area.commonPaths.map((item) => `- ${item}`).join("\n")}

## Regras de Roteamento

1. Comece por este AGENT da área para trabalho operacional dentro de ${area.name}.
2. Carregue um papel especialista antes de carregar skills ou playbooks.
3. Carregue apenas skills e playbooks exigidos pelo papel selecionado.
4. Se o pedido precisar de especialista, skill ou playbook ausente, explique a lacuna e peça confirmação antes de criar.
5. Mantenha knowledge reutilizável da área em \`knowledge/\`.

## Navegação

\`${area.path}/AGENT.md -> Papel -> Skills -> Playbook -> Saída\`
`;
}

function areaYaml(area: AreaDefinition): string {
  return stringifyYaml({
    area: {
      key: area.key,
      department: area.root,
      path: area.path,
      agent: area.lead ? "AGENT.md" : null,
      readme: "README.md",
      roles: area.roles.map((role) => role.slug),
      skills: area.skills.map((skill) => skill.slug),
      playbooks: area.playbooks.map((playbook) => playbook.slug),
      source_of_truth: area.sourceOfTruth
    }
  });
}
