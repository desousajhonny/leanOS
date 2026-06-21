import { workflowDefinitions } from "../definitions/workflows.js";
import { getActiveSubareaKeys, getArea } from "../selectors.js";
import type { AreaDefinition, FileEntry } from "../types.js";
import { folderReadme, toTitle } from "../content/shared.js";

export function globalWorkflowFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);

  return [
    { path: ".leanos/workflows/README.md", content: folderReadme("Global Workflows", "Cross-department LeanOS workflows.", "Use when work spans more than one root department.", "../index/workflows.yaml", workflowDefinitions.map((workflow) => `${workflow.slug}.workflow.md`), ["../../strategy/", "../../operations/", "../../growth/", "../context/"], "Workflows route between departments and areas; if a required area is not active, ask before activating or creating it.") },
    ...workflowDefinitions.map((workflow) => {
      const missingSubareas = workflow.requiredSubareas.filter((area) => !activeKeys.has(area));

      return {
        path: `.leanos/workflows/${workflow.slug}.workflow.md`,
        content: `# ${toTitle(workflow.slug)} Workflow

## Purpose

${workflow.purpose}

## Required Areas

${workflow.requiredSubareas.map((area) => `- ${area}: \`../../${getArea(area).path}/README.md\``).join("\n")}

${missingSubareas.length > 0 ? `## Availability\n\nThis workflow references areas that are not currently active: ${missingSubareas.join(", ")}.\n\nDo not load missing area paths. Ask whether to activate or create the missing area before executing this workflow.\n` : "## Availability\n\nAll required areas are active in this workspace.\n"}

## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Navigation

Use department and area READMEs for each step. Do not bypass area-first ownership.
`
      };
    })
  ];
}
