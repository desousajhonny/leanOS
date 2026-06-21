import { commandDefinitions } from "./definitions/commands.js";
import { rootDepartments } from "./definitions/departments.js";
import { workflowDefinitions } from "./definitions/workflows.js";
import type { AreaDefinition, CommandDefinition, RootDepartmentDefinition, Subarea, WorkspaceAnswers } from "./types.js";

export function getAllSubareas(): Subarea[] {
  return rootDepartments.flatMap((department) => department.areas.map((area) => area.key));
}

export function getActiveAreas(answers: WorkspaceAnswers): AreaDefinition[] {
  const selectedSubareas = new Set(answers.subareas);
  return getAllAreas().filter((area) => selectedSubareas.has(area.key));
}

export function getAllAreas(): AreaDefinition[] {
  return rootDepartments.flatMap((department) => department.areas);
}

export function getActiveRootDepartments(activeAreas: AreaDefinition[]): RootDepartmentDefinition[] {
  const activeRootKeys = new Set(activeAreas.map((area) => area.root));
  return rootDepartments.filter((department) => activeRootKeys.has(department.key));
}

export function getActiveSubareaKeys(activeAreas: AreaDefinition[]): Set<Subarea> {
  return new Set(activeAreas.map((area) => area.key));
}

export function getActiveWorkflowKeys(activeAreas: AreaDefinition[]): string[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  return workflowDefinitions
    .filter((workflow) => workflow.requiredSubareas.every((area) => activeKeys.has(area)))
    .map((workflow) => workflow.slug);
}

export function getAvailableCommands(activeAreas: AreaDefinition[]): CommandDefinition[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  return commandDefinitions.filter((command) => !command.area || activeKeys.has(command.area));
}

export function getArea(key: Subarea): AreaDefinition {
  const area = getAllAreas().find((candidate) => candidate.key === key);

  if (!area) {
    throw new Error(`Unknown area: ${key}`);
  }

  return area;
}
