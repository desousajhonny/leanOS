import type { AreaDefinition, RoleDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";

function roleDescription(role: RoleDefinition): string {
  return `Use quando ${role.useWhen.join("; ")}`;
}

function roleFrontmatter(role: RoleDefinition): string {
  return `---
${stringifyYaml({
    name: role.slug,
    description: roleDescription(role)
  }).trimEnd()}
---`;
}

export function roleFile(area: AreaDefinition, role: RoleDefinition): string {
  const areaOwner = area.lead ? "../AGENT.md" : "../README.md";
  const frontmatter = roleFrontmatter(role);

  return `${frontmatter}

# ${role.title}

## Propósito

${role.purpose}

## Use Quando

${role.useWhen.map((item) => `- ${item}`).join("\n")}

## Antes de Agir

Leia:

${role.beforeActing.map((file) => `- \`${file}\``).join("\n")}

## Skills Obrigatórias

${role.skills.map((skill) => `- \`../skills/${skill}/SKILL.md\``).join("\n")}

## Playbooks Relevantes

${role.playbooks.map((playbook) => `- \`../playbooks/${playbook}.playbook.md\``).join("\n")}

## Critérios de Aceite

${(role.outputs ?? ["Contexto carregado", "Recomendação", "Arquivos que devem ser atualizados"]).map((item) => `- ${item}`).join("\n")}

## Linhas Vermelhas

${(role.redLines ?? ["Não invente fatos específicos do produto.", "Peça confirmação antes de modificar arquivos."]).map((item) => `- ${item}`).join("\n")}

## Navegação

Comece em \`${areaOwner}\` e carregue apenas a skill e o playbook necessários.
`;
}
