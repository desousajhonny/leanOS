import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { writeWorkspaceFiles, type WriteWorkspaceResult } from "./file-writer.js";
import { getActiveRootDepartments, getAllAreas, getArea } from "../templates/workspace/selectors.js";
import { contextFiles } from "../templates/workspace/renderers/context.js";
import { rootDepartmentFiles } from "../templates/workspace/renderers/departments.js";
import { indexFiles } from "../templates/workspace/renderers/indexes.js";
import { createLeanOsYaml } from "../templates/workspace/renderers/leanos-yaml.js";
import { workspaceReadme } from "../templates/workspace/renderers/root-readme.js";
import { rootAgent } from "../templates/workspace/renderers/agent.js";
import type { AreaDefinition, FileEntry, RootDepartment, Subarea, WorkspaceAnswers } from "../templates/workspace/types.js";

export type WorkspaceActivationResult = WriteWorkspaceResult & {
  activatedArea: Subarea;
  activatedDepartment: RootDepartment;
  activeAreas: Subarea[];
  activeDepartments: RootDepartment[];
};

type WorkspaceActivationState = {
  activeAreas: Subarea[];
  inactiveAreas: Subarea[];
};

export async function activateWorkspaceArea(rootDir: string, areaKey: Subarea): Promise<WorkspaceActivationResult>;
export async function activateWorkspaceArea(rootDir: string, answers: WorkspaceAnswers, areaKey: Subarea): Promise<WorkspaceActivationResult>;
export async function activateWorkspaceArea(rootDir: string, answersOrAreaKey: WorkspaceAnswers | Subarea, maybeAreaKey?: Subarea): Promise<WorkspaceActivationResult> {
  const yaml = await readLeanOsYaml(rootDir);
  const currentState = readActivationState(yaml);
  const { answers, areaKey } = resolveActivationRequest(yaml, answersOrAreaKey, maybeAreaKey);
  const activeAreaKeys = nextActiveAreaKeys(currentState, areaKey);
  const activatedArea = getArea(areaKey);
  const files = createWorkspaceActivationFiles(answers, activeAreaKeys, activatedArea);
  const writeResult = await writeWorkspaceFiles(rootDir, files, {
    overwriteExisting: true
  });

  return {
    ...writeResult,
    activatedArea: areaKey,
    activatedDepartment: activatedArea.root,
    activeAreas: activeAreaKeys,
    activeDepartments: getActiveRootDepartments(getAreaDefinitions(activeAreaKeys)).map((department) => department.key)
  };
}

export function createWorkspaceActivationFiles(answers: WorkspaceAnswers, activeAreaKeys: Subarea[], activatedArea: AreaDefinition): FileEntry[] {
  const activeAreas = getAreaDefinitions(activeAreaKeys);
  const activeRoots = getActiveRootDepartments(activeAreas);
  const activatedRoot = activatedArea.root;
  const activatedRootPath = `${activatedRoot}/`;
  const activatedAreaPath = `${activatedArea.path}/`;
  const activatedRootFiles = rootDepartmentFiles(answers, activeAreas, activeRoots).filter((file) => {
    if (!file.path.startsWith(activatedRootPath)) {
      return false;
    }

    if (file.path.startsWith(activatedAreaPath)) {
      return true;
    }

    return isDepartmentStateFile(file.path, activatedRoot);
  });

  return [
    { path: "AGENT.md", content: rootAgent(activeAreas, activeRoots) },
    { path: "README.md", content: workspaceReadme(answers, activeAreas, activeRoots) },
    { path: "leanos.yaml", content: createLeanOsYaml(answers, activeAreas, activeRoots) },
    ...indexFiles(activeAreas, activeRoots),
    ...contextFiles(answers, activeAreas, activeRoots),
    ...activatedRootFiles
  ];
}

async function readLeanOsYaml(rootDir: string): Promise<Record<string, unknown>> {
  const yamlPath = join(rootDir, "leanos.yaml");
  return asRecord(parse(await readFile(yamlPath, "utf8")) as unknown, "leanos.yaml");
}

function resolveActivationRequest(yaml: Record<string, unknown>, answersOrAreaKey: WorkspaceAnswers | Subarea, maybeAreaKey?: Subarea): { answers: WorkspaceAnswers; areaKey: Subarea } {
  if (typeof answersOrAreaKey === "string") {
    return {
      answers: workspaceAnswersFromYaml(yaml),
      areaKey: getArea(answersOrAreaKey).key
    };
  }

  if (!maybeAreaKey) {
    throw new Error("Activation area is required.");
  }

  return {
    answers: answersOrAreaKey,
    areaKey: getArea(maybeAreaKey).key
  };
}

function readActivationState(yaml: Record<string, unknown>): WorkspaceActivationState {
  const activation = asRecord(yaml.activation, "activation");
  const activeAreas = activation.active_areas;
  const inactiveAreas = activation.inactive_areas;

  if (!Array.isArray(activeAreas) || !Array.isArray(inactiveAreas)) {
    throw new Error("leanos.yaml is missing progressive activation state.");
  }

  return {
    activeAreas: activeAreas.map(assertSubarea),
    inactiveAreas: inactiveAreas.map(assertSubarea)
  };
}

function workspaceAnswersFromYaml(yaml: Record<string, unknown>): WorkspaceAnswers {
  const workspace = asRecord(yaml.workspace, "workspace");
  const activation = asRecord(yaml.activation, "activation");
  const company = asRecord(yaml.company, "company");
  const product = asRecord(yaml.product, "product");
  const github = yaml.github ? asRecord(yaml.github, "github") : {};

  return {
    workspaceMode: requiredString(workspace.mode, "workspace.mode") as WorkspaceAnswers["workspaceMode"],
    detectedProject: detectedProjectFromYaml(workspace.detected_project),
    prepareGithubManagement: github.project_management === "prepared" || github.status === "pending_user_token",
    companyName: requiredString(company.name, "company.name"),
    productName: requiredString(product.name, "product.name"),
    productStatus: requiredString(product.status, "product.status") as WorkspaceAnswers["productStatus"],
    productType: requiredString(product.type, "product.type") as WorkspaceAnswers["productType"],
    description: requiredString(product.description, "product.description"),
    targetUser: requiredString(product.target_user, "product.target_user"),
    stage: requiredString(company.stage, "company.stage") as WorkspaceAnswers["stage"],
    mode: requiredString(company.mode, "company.mode") as WorkspaceAnswers["mode"],
    subareas: arrayOfSubareas(activation.founder_selected_areas, "activation.founder_selected_areas")
  };
}

function detectedProjectFromYaml(value: unknown): WorkspaceAnswers["detectedProject"] {
  if (value === null || value === undefined) {
    return undefined;
  }

  const detectedProject = asRecord(value, "workspace.detected_project");

  return {
    hasGit: Boolean(detectedProject.has_git),
    hasPackageJson: Boolean(detectedProject.has_package_json),
    hasSourceDir: Boolean(detectedProject.has_source_dir),
    hasGithubDir: Boolean(detectedProject.has_github_dir),
    hasVercelConfig: Boolean(detectedProject.has_vercel_config),
    gitRemoteOrigin: typeof detectedProject.git_remote_origin === "string" ? detectedProject.git_remote_origin : undefined
  };
}

function nextActiveAreaKeys(currentState: WorkspaceActivationState, areaKey: Subarea): Subarea[] {
  if (currentState.activeAreas.includes(areaKey)) {
    return orderSubareas(currentState.activeAreas);
  }

  if (!currentState.inactiveAreas.includes(areaKey)) {
    throw new Error(`Cannot activate ${areaKey}: area is not listed as inactive in leanos.yaml.`);
  }

  return orderSubareas([...currentState.activeAreas, areaKey]);
}

function getAreaDefinitions(activeAreaKeys: Subarea[]): AreaDefinition[] {
  const active = new Set(activeAreaKeys);
  return getAllAreas().filter((area) => active.has(area.key));
}

function orderSubareas(subareas: Subarea[]): Subarea[] {
  const active = new Set(subareas);
  return getAllAreas()
    .map((area) => area.key)
    .filter((area) => active.has(area));
}

function assertSubarea(value: unknown): Subarea {
  if (typeof value !== "string") {
    throw new Error("leanos.yaml activation areas must be strings.");
  }

  return getArea(value as Subarea).key;
}

function arrayOfSubareas(value: unknown, fieldName: string): Subarea[] {
  if (!Array.isArray(value)) {
    throw new Error(`leanos.yaml ${fieldName} must be an array.`);
  }

  return value.map(assertSubarea);
}

function asRecord(value: unknown, fieldName: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`leanos.yaml ${fieldName} must be an object.`);
  }

  return value as Record<string, unknown>;
}

function requiredString(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new Error(`leanos.yaml ${fieldName} must be a string.`);
  }

  return value;
}

function isDepartmentStateFile(path: string, department: RootDepartment): boolean {
  return (
    path === `${department}/AGENT.md` ||
    path === `${department}/README.md` ||
    path === `${department}/department.yaml` ||
    path === `${department}/workflows/README.md` ||
    (path.startsWith(`${department}/workflows/`) && path.endsWith(".workflow.md"))
  );
}
