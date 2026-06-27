import type { AreaDefinition, RoleDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";

function roleDescription(role: RoleDefinition): string {
  const triggers = role.useWhen?.length ? role.useWhen.join("; ") : `${role.title.toLowerCase()} is required for the active request`;
  return `Use when ${triggers}`;
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

## Purpose

${role.purpose}

## When to Use

${role.useWhen.map((item) => `- ${item}`).join("\n")}

## Before Acting

Read:

${role.beforeActing.map((file) => `- \`${file}\``).join("\n")}

## Required Skills

${role.skills.map((skill) => `- \`../skills/${skill}/SKILL.md\``).join("\n")}

## Relevant Playbooks

${role.playbooks.map((playbook) => `- \`../playbooks/${playbook}.playbook.md\``).join("\n")}

## Acceptance Criteria

${(role.outputs ?? ["Context loaded", "Recommendation", "Files that should be updated"]).map((item) => `- ${item}`).join("\n")}

## Red Lines

${(role.redLines ?? ["Do not invent product-specific facts.", "Ask before modifying files."]).map((item) => `- ${item}`).join("\n")}

## Navigation

Start from \`${areaOwner}\`, then load only the required skill and playbook.
`;
}
