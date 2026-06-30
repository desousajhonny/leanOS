import { constants } from "node:fs";
import { access, mkdir, readFile, rename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { parse } from "yaml";
import { writeWorkspaceFiles } from "./file-writer.js";
import { createWorkspaceFiles } from "../templates/workspace-template.js";
import { createWorkspacePaths } from "../templates/workspace/paths.js";
import { getAllSubareas } from "../templates/workspace/selectors.js";
import type { FileEntry, InitialActivationMode, ProductStage, ProductStatus, ProductType, Subarea, WorkspaceAnswers, WorkspaceMode, OperatingMode } from "../templates/workspace/types.js";

export type WorkspaceUpdateResult = {
  movedPaths: string[];
  conflictPaths: string[];
  writtenPaths: string[];
  skippedPaths: string[];
  dryRun: boolean;
};

export type WorkspaceUpdateOptions = {
  dryRun?: boolean;
};

type PathMigration = {
  from: string;
  to: string;
};

export async function updateWorkspaceLayout(rootDir: string, options: WorkspaceUpdateOptions = {}): Promise<WorkspaceUpdateResult> {
  const dryRun = options.dryRun ?? false;
  const answers = await workspaceAnswersFromYamlFile(rootDir);
  const paths = createWorkspacePaths(answers);
  const migrations = legacyPathMigrations(paths.businessOsRoot);
  const movedPaths: string[] = [];
  const conflictPaths: string[] = [];

  for (const migration of migrations) {
    const sourcePath = join(rootDir, migration.from);
    const targetPath = join(rootDir, migration.to);

    if (!(await pathExists(sourcePath))) {
      continue;
    }

    if (await pathExists(targetPath)) {
      conflictPaths.push(`${migration.from} -> ${migration.to}`);
      continue;
    }

    movedPaths.push(`${migration.from} -> ${migration.to}`);

    if (!dryRun) {
      await mkdir(dirname(targetPath), { recursive: true });
      await rename(sourcePath, targetPath);
    }
  }

  const files = createWorkspaceFiles({
    ...answers,
    initialActivationMode: "all-at-once",
    subareas: answers.subareas.length > 0 ? answers.subareas : getAllSubareas()
  });
  const overwriteFiles = files.filter((file) => isFrameworkControlledPath(file, paths.businessOsRoot));
  const missingOnlyFiles = files.filter((file) => !isFrameworkControlledPath(file, paths.businessOsRoot));

  if (dryRun) {
    return {
      movedPaths,
      conflictPaths,
      writtenPaths: overwriteFiles.map((file) => file.path),
      skippedPaths: missingOnlyFiles.map((file) => file.path),
      dryRun
    };
  }

  const overwriteResult = await writeWorkspaceFiles(rootDir, overwriteFiles, {
    overwriteExisting: true
  });
  const missingOnlyResult = await writeWorkspaceFiles(rootDir, missingOnlyFiles, {
    overwriteExisting: false
  });

  return {
    movedPaths,
    conflictPaths,
    writtenPaths: [...overwriteResult.writtenPaths, ...missingOnlyResult.writtenPaths],
    skippedPaths: [...overwriteResult.skippedPaths, ...missingOnlyResult.skippedPaths],
    dryRun
  };
}

function legacyPathMigrations(businessOsRoot: string): PathMigration[] {
  return [
    { from: "strategy", to: `${businessOsRoot}/strategy` },
    { from: "operations", to: `${businessOsRoot}/operations` },
    { from: "growth", to: `${businessOsRoot}/growth` },
    { from: "ai-standard", to: ".leanos/standard" },
    { from: ".leanos/agent", to: ".leanos/runtime/agent" },
    { from: ".leanos/context", to: ".leanos/runtime/context" },
    { from: ".leanos/index", to: ".leanos/runtime/index" },
    { from: ".leanos/traces", to: ".leanos/runtime/traces" },
    { from: ".leanos/vscode", to: ".leanos/runtime/vscode" }
  ];
}

function isFrameworkControlledPath(file: FileEntry, businessOsRoot: string): boolean {
  const path = file.path;

  if (path === "AGENT.md" || path === "README.md" || path === "leanos.yaml") {
    return true;
  }

  if (path.startsWith(".leanos/") || path.startsWith(".github/")) {
    return true;
  }

  if (!path.startsWith(`${businessOsRoot}/`)) {
    return false;
  }

  const pathInBusinessOs = path.slice(businessOsRoot.length + 1);

  return (
    pathInBusinessOs.endsWith("/AGENT.md") ||
    pathInBusinessOs.endsWith("/README.md") ||
    pathInBusinessOs.endsWith("/department.yaml") ||
    pathInBusinessOs.endsWith("/area.yaml") ||
    pathInBusinessOs.includes("/roles/") ||
    pathInBusinessOs.includes("/skills/") ||
    pathInBusinessOs.includes("/playbooks/") ||
    pathInBusinessOs.includes("/workflows/")
  );
}

async function workspaceAnswersFromYamlFile(rootDir: string): Promise<WorkspaceAnswers> {
  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8")) as Record<string, unknown>;
  const workspace = asRecord(yaml.workspace, "workspace", {});
  const activation = asRecord(yaml.activation, "activation", {});
  const company = asRecord(yaml.company, "company", {});
  const product = asRecord(yaml.product, "product", {});
  const github = asRecord(yaml.github, "github", {});
  const activeAreas = arrayOfSubareas(activation.active_areas, "activation.active_areas");
  const selectedAreas = arrayOfSubareas(activation.founder_selected_areas, "activation.founder_selected_areas");

  return {
    workspaceMode: enumValue(workspace.mode, "new-product-workspace", ["new-product-workspace", "existing-product-repo"]) as WorkspaceMode,
    initialActivationMode: enumValue(activation.mode, "progressive", ["progressive", "all-at-once"]) as InitialActivationMode,
    detectedProject: undefined,
    prepareGithubManagement: github.project_management === "prepared" || github.status === "pending_user_token",
    companyName: stringValue(company.name, "Empresa"),
    productName: stringValue(product.name, "Produto LeanOS"),
    productStatus: enumValue(product.status, "new-product", ["new-product", "existing-product", "codebase-without-strategy"]) as ProductStatus,
    productType: enumValue(product.type, "not-sure", ["b2b-saas", "b2c-app", "ai-agent-product", "developer-tool", "marketplace", "internal-tool", "api-product", "not-sure"]) as ProductType,
    description: stringValue(product.description, "Produto em atualização pelo LeanOS."),
    targetUser: stringValue(product.target_user, "Usuário principal a definir"),
    stage: enumValue(company.stage, "idea", ["idea", "researching-problem", "designing-mvp", "building-mvp", "mvp-launched", "existing-product-with-users", "scaling"]) as ProductStage,
    mode: enumValue(company.mode, "solo-founder", ["solo-founder", "founder-plus-ai-agents", "small-team", "existing-startup-team", "internal-innovation-team"]) as OperatingMode,
    subareas: activeAreas.length > 0 ? activeAreas : selectedAreas
  };
}

function arrayOfSubareas(value: unknown, fieldName: string): Subarea[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const validSubareas = new Set(getAllSubareas());
  return value.filter((item): item is Subarea => {
    if (typeof item !== "string") {
      return false;
    }

    if (!validSubareas.has(item as Subarea)) {
      throw new Error(`${fieldName} includes unknown area: ${item}`);
    }

    return true;
  });
}

function asRecord(value: unknown, _fieldName: string, fallback: Record<string, unknown>): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return fallback;
  }

  return value as Record<string, unknown>;
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function enumValue(value: unknown, fallback: string, allowed: string[]): string {
  return typeof value === "string" && allowed.includes(value) ? value : fallback;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
