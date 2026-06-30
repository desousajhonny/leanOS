import { rootDepartments } from "./definitions/departments.js";
import type { AreaDefinition, RootDepartmentDefinition, Subarea, WorkspaceAnswers } from "./types.js";

export function getAllSubareas(): Subarea[] {
  return rootDepartments.flatMap((department) => department.areas.map((area) => area.key));
}

export function getActiveAreas(answers: WorkspaceAnswers): AreaDefinition[] {
  const selectedSubareas = new Set(answers.subareas);
  return getAllAreas().filter((area) => selectedSubareas.has(area.key));
}

export function getInitialActiveAreas(_answers: WorkspaceAnswers): AreaDefinition[] {
  if (_answers.initialActivationMode === "all-at-once") {
    const selectedSubareas = new Set(_answers.subareas);
    return getAllAreas().filter((area) => selectedSubareas.has(area.key));
  }

  return getAllAreas().filter((area) => area.root === "strategy");
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
  const activeRootKeys = new Set(activeAreas.map((area) => area.root));

  return rootDepartments
    .filter((department) => activeRootKeys.has(department.key))
    .flatMap((department) => {
      const activeAreaSlugs = new Set(activeAreas.filter((area) => area.root === department.key).map((area) => area.slug));
      return department.workflows
        .filter((workflow) => workflow.requiredAreas.every((area) => activeAreaSlugs.has(area)))
        .map((workflow) => workflow.slug);
    });
}

export function getArea(key: Subarea): AreaDefinition {
  const area = getAllAreas().find((candidate) => candidate.key === key);

  if (!area) {
    throw new Error(`Unknown area: ${key}`);
  }

  return area;
}
