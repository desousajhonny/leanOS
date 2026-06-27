import type { AreaDefinition, SkillDefinition } from "../../types.js";
import { stringifyYaml } from "../../../../utils/yaml.js";

export function skillFile(area: AreaDefinition, skill: SkillDefinition): string {
  const frontmatter = skillFrontmatter(skill);

  if (skill.useWhen || skill.requiredContext || skill.inputs || skill.process || skill.checks || skill.outputs || skill.filesToUpdate || skill.redLines) {
    return `${frontmatter}

# ${skill.title}

## Overview

${skill.purpose}

## Use When

${(skill.useWhen ?? ["Use when this capability is required for the active request."]).map((item) => `- ${item}`).join("\n")}

## Required Context

${(skill.requiredContext ?? ["Area README", "Active role instructions", "User request"]).map((item) => `- ${item}`).join("\n")}

## Inputs

${(skill.inputs ?? ["Relevant area knowledge", "Active role instructions", "User request"]).map((item) => `- ${item}`).join("\n")}

## Process

${renderSkillProcess(skill.process ?? ["Read the minimum relevant context.", "Apply this skill to the request.", "Prepare a concise output or file update."])}

## Checks & Acceptance Criteria

${(skill.checks ?? ["Check that the output matches the active request.", "Check that no unsupported product facts were invented."]).map((item) => `- ${item}`).join("\n")}

## Output

${(skill.outputs ?? ["Summary", "Decisions", "Suggested file updates"]).map((item) => `- ${item}`).join("\n")}

## Files to Update

${(skill.filesToUpdate ?? ["Update relevant area knowledge only after explicit confirmation."]).map((item) => `- ${item}`).join("\n")}

## Red Lines

${(skill.redLines ?? ["Do not invent product-specific facts.", "Ask before modifying files."]).map((item) => `- ${item}`).join("\n")}
`;
  }

  return `${frontmatter}

# ${skill.title}

## Overview

${skill.purpose}

## Area

\`${area.path}\`

## Inputs

- Area source-of-truth files
- Active role instructions
- User request

## Process

${renderSkillProcess(["Read the minimum relevant source-of-truth files.", "Apply this skill to the user request.", "Prepare a concise output or file update."])}

## Output

- Summary
- Decisions
- Suggested file updates
`;
}

function skillFrontmatter(skill: SkillDefinition): string {
  return `---
${stringifyYaml({
  name: skill.slug,
  description: skillDescription(skill)
}).trimEnd()}
---`;
}

function skillDescription(skill: SkillDefinition): string {
  const triggers = skill.useWhen?.length ? skill.useWhen.join("; ") : `${skill.title.toLowerCase()} is required for the active request`;
  return `Use when ${triggers}`;
}

function renderSkillProcess(steps: string[]): string {
  return steps.map((step, index) => `### Step ${index + 1}\n\n${step}`).join("\n\n");
}
