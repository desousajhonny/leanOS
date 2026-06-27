import type { AreaDefinition, PlaybookDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";
import { guidedConversationSection } from "./sections.js";

function playbookDescription(playbook: PlaybookDefinition): string {
  const triggers = playbook.useWhen?.length ? playbook.useWhen.join("; ") : `${playbook.title.toLowerCase()} is required for the active request`;
  return `Use when ${triggers}`;
}

function playbookFrontmatter(playbook: PlaybookDefinition): string {
  return `---
${stringifyYaml({
    name: playbook.slug,
    description: playbookDescription(playbook)
  }).trimEnd()}
---`;
}

export function playbookFile(area: AreaDefinition, playbook: PlaybookDefinition): string {
  const areaOwner = area.lead ? "../AGENT.md" : "../README.md";
  const frontmatter = playbookFrontmatter(playbook);

  const guidedConv = playbook.guidedConversation ? `\n\n${guidedConversationSection(playbook.guidedConversation)}` : "";
  const gatesSec = playbook.gates ? `\n\n## Gates\n\n${playbook.gates.map((item) => `- ${item}`).join("\n")}` : "";

  return `${frontmatter}

# ${playbook.title}

## Purpose

${playbook.purpose}

## When to Use

${(playbook.useWhen ?? ["Use when this execution sequence matches the active request."]).map((item) => `- ${item}`).join("\n")}

## Before Acting

${(playbook.beforeActing ?? [areaOwner, "../area.yaml"]).map((item) => `- \`${item}\``).join("\n")}

## Inputs

${(playbook.inputs ?? ["Area knowledge", "Active role instructions", "User request"]).map((input) => `- ${input}`).join("\n")}

## Process

${playbook.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}${guidedConv}${gatesSec}

## Stop Conditions

${(playbook.stopConditions ?? ["Stop and ask for confirmation before changing security-sensitive files."]).map((item) => `- ${item}`).join("\n")}

## Acceptance Criteria & Outputs

${(playbook.outputs ?? ["Decision or action summary", "Updated knowledge files when requested", "Next recommended LeanOS action"]).map((output) => `- ${output}`).join("\n")}

## Files to Update

${(playbook.filesToUpdate ?? ["Update relevant area knowledge only after explicit confirmation."]).map((file) => `- ${file}`).join("\n")}

## Red Lines

${(playbook.redLines ?? ["Do not duplicate a workflow.", "Do not duplicate skills.", "Do not invent missing context.", "Do not update files without explicit confirmation."]).map((item) => `- ${item}`).join("\n")}

## Navigation

Start from \`${areaOwner}\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
`;
}
