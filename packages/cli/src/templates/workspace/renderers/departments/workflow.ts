import type { AreaDefinition, DepartmentWorkflowDefinition, RootDepartmentDefinition } from "../../types.js";
import { toTitle } from "../../content/shared.js";
import { conditionalAreasSection, continuationBridgeSection, listSection, orderedSection, ownerSection } from "./sections.js";

export function departmentWorkflowFile(department: RootDepartmentDefinition, activeAreas: AreaDefinition[], workflow: DepartmentWorkflowDefinition): string {
  const activeSlugs = new Set(activeAreas.map((area) => area.slug));
  const missingAreas = workflow.requiredAreas.filter((area) => !activeSlugs.has(area));

  return `# ${toTitle(workflow.slug)} Workflow

## Purpose

${workflow.purpose}

${workflow.founderTriggers ? listSection("Founder Triggers", workflow.founderTriggers.map((trigger) => `"${trigger}"`)) : ""}${workflow.progressionStage ? `## Progression Stage\n\n${workflow.progressionStage}\n\n` : ""}${workflow.entryGate ? listSection("Entry Gate", workflow.entryGate) : ""}${workflow.activeRequirements ? listSection("Active Requirements", workflow.activeRequirements) : ""}${workflow.activationRequirements ? listSection("Activation Requirements", workflow.activationRequirements) : ""}${workflow.owner ? ownerSection(workflow.owner) : ""}## Required Areas

${workflow.requiredAreas.map((area) => `- ${area}`).join("\n")}

${workflow.conditionalAreas ? conditionalAreasSection(workflow.conditionalAreas) : ""}${missingAreas.length > 0 ? `## Availability\n\nThis workflow references areas that are not currently active: ${missingAreas.join(", ")}.\n\nDo not load missing area paths. Ask whether to activate or create the missing area before executing this workflow.\n` : "## Availability\n\nAll required areas are active in this department.\n"}

${workflow.loadFirst ? listSection("Load First", workflow.loadFirst.map((path) => `\`${path}\``)) : ""}${workflow.navigationRoute ? orderedSection("Navigation Route", workflow.navigationRoute.map((path) => `\`${path}\``)) : ""}${workflow.phases ? listSection("Phases", workflow.phases) : ""}${workflow.skillsUsed ? listSection("Skills Used", workflow.skillsUsed.map((skill) => `\`${skill}\``)) : ""}${workflow.playbooksUsed ? listSection("Playbooks Used", workflow.playbooksUsed.map((playbook) => `\`${playbook}\``)) : ""}## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

${workflow.confirmationGates ? listSection("Confirmation Gates", workflow.confirmationGates) : ""}${workflow.allowedUpdates ? listSection("Allowed Updates", workflow.allowedUpdates.map((path) => `\`${path}\``)) : ""}${workflow.forbiddenUpdates ? listSection("Forbidden Updates", workflow.forbiddenUpdates.map((path) => `\`${path}\``)) : ""}${workflow.externalCapabilities ? listSection("External Capabilities", workflow.externalCapabilities) : ""}${workflow.stopConditions ? listSection("Stop Conditions", workflow.stopConditions) : ""}${workflow.expectedOutput ? listSection("Expected Output", workflow.expectedOutput) : ""}${workflow.continuationBridge ? continuationBridgeSection(workflow) : ""}

## Navigation

Use ${department.name} area READMEs for each step to preserve area-first ownership.
`;
}
