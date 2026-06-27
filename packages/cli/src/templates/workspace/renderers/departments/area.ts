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
    { path: `${area.path}/roles/README.md`, content: folderReadme(`${area.name} Roles`, `Roles owned by the ${area.name} area.`, area.lead ? "Use after the area AGENT selects a role." : "Use after the area README selects a role.", area.lead ? "../AGENT.md" : "../README.md", area.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Load one role, then follow its skills and playbooks.") },
    ...area.roles.map((role) => ({ path: `${area.path}/roles/${role.slug}.role.md`, content: roleFile(area, role) })),
    { path: `${area.path}/skills/README.md`, content: folderReadme(`${area.name} Skills`, `Skills owned by the ${area.name} area.`, "Use when a selected role points to a skill.", area.lead ? "../AGENT.md" : "../README.md", area.skills.map((skill) => `${skill.slug}/SKILL.md`), ["../roles/", "../playbooks/"], "Load only skills needed for the active task.") },
    ...area.skills.map((skill) => ({ path: `${area.path}/skills/${skill.slug}/SKILL.md`, content: skillFile(area, skill) })),
    { path: `${area.path}/playbooks/README.md`, content: folderReadme(`${area.name} Playbooks`, `Execution sequences owned by the ${area.name} area.`, "Use when a selected role points to a playbook.", area.lead ? "../AGENT.md" : "../README.md", area.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks for sequencing, not for duplicating skill details.") },
    ...area.playbooks.map((playbook) => ({ path: `${area.path}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(area, playbook) })),
    ...area.files.map((file) => ({ path: `${area.path}/${file.path}`, content: file.content(answers) }))
  ];
}

function areaReadme(area: AreaDefinition): string {
  return `# ${area.name}

## Purpose

${area.purpose}

## When to Use

${area.whenToUse.map((item) => `- ${item}`).join("\n")}

## Source of Truth

${area.sourceOfTruth.length > 0 ? area.sourceOfTruth.map((file) => `- \`${file}\``).join("\n") : "- No loose source-of-truth files yet. Use playbooks for operational procedures and update persistent notes only when the workspace creates them."}

${area.operatingRules?.length ? `## Operating Rules\n\n${area.operatingRules.map((item) => `- ${item}`).join("\n")}\n` : ""}
${area.redLines?.length ? `## Red Lines\n\n${area.redLines.map((item) => `- ${item}`).join("\n")}\n` : ""}

## Navigation

${area.lead ? "1. For operational work, start with `AGENT.md`.\n2. Use this README as the directory map.\n3. After the area AGENT selects a role, load only required skills and playbooks.\n4. Produce the requested output and update source-of-truth files when needed." : "1. Choose the relevant role from `roles/`.\n2. Load only the required skills from `skills/`.\n3. Use the matching playbook from `playbooks/`.\n4. Produce the requested output and update source-of-truth files when needed."}

## File Responsibilities

- \`README.md\`: area map and explanation.
- \`AGENT.md\`: area operating lead when present.
- \`area.yaml\`: machine-readable structure for this area.
- \`roles/\`: operating personas for this area.
- \`skills/\`: focused capabilities used by roles.
- \`playbooks/\`: tactical execution sequences.

## Common Paths

${area.commonPaths.map((item) => `- ${item}`).join("\n")}
`;
}

function areaAgent(area: AreaDefinition): string {
  if (!area.lead) return "";

  return `# ${area.name} Agent

You are the ${area.lead.title} for this workspace.

This \`AGENT.md\` is the operating owner for the ${area.name} area.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Operating Scope

${area.lead.purpose}

${area.operatingRules?.length ? `## Operating Rules\n\n${area.operatingRules.map((item) => `- ${item}`).join("\n")}\n` : ""}
${area.redLines?.length ? `## Red Lines\n\n${area.redLines.map((item) => `- ${item}`).join("\n")}\n` : ""}

## Role Routing

Choose the smallest specialist role for the request:

${area.roles.map((role) => `- ${role.title}: \`roles/${role.slug}.role.md\` - use when ${role.useWhen.join("; ")}.`).join("\n")}

## Routing Rules

1. Start from this area AGENT for operational work inside ${area.name}.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. If the request needs a missing specialist, skill or playbook, explain the gap and ask before creating it.
5. Keep reusable area knowledge in \`knowledge/\`.

## Navigation

\`${area.path}/AGENT.md -> Role -> Skills -> Playbook -> Output\`
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
