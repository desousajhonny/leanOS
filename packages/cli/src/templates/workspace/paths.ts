import { posix } from "node:path";
import type { AreaDefinition, FileEntry, RootDepartment, WorkspaceAnswers } from "./types.js";

export type WorkspacePaths = {
  businessOsRoot: string;
  runtimeRoot: ".leanos/runtime";
  standardRoot: ".leanos/standard";
};

const rootDepartments = new Set(["strategy", "operations", "growth"]);
const runtimeFolders = new Set(["agent", "context", "index", "scratch", "traces"]);

export function createWorkspacePaths(answers: WorkspaceAnswers): WorkspacePaths {
  return {
    businessOsRoot: `${slugifyPathSegment(answers.productName)}-os`,
    runtimeRoot: ".leanos/runtime",
    standardRoot: ".leanos/standard"
  };
}

export function slugifyPathSegment(value: string): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "leanos";
}

export function materializeWorkspaceFiles(files: FileEntry[], paths: WorkspacePaths): FileEntry[] {
  return files.map((file) => ({
    path: materializeWorkspacePath(file.path, paths),
    content: file.content
  }));
}

export function materializeWorkspacePath(path: string, paths: WorkspacePaths): string {
  const [first, second] = path.split("/");

  if (rootDepartments.has(first)) {
    return `${paths.businessOsRoot}/${path}`;
  }

  if (first === "ai-standard") {
    return `${paths.standardRoot}${path.slice("ai-standard".length)}`;
  }

  if (first === ".leanos" && runtimeFolders.has(second)) {
    return `${paths.runtimeRoot}/${path.split("/").slice(1).join("/")}`;
  }

  return path;
}

export function departmentPath(department: RootDepartment, paths: WorkspacePaths): string {
  return `${paths.businessOsRoot}/${department}`;
}

export function areaPath(area: AreaDefinition, paths: WorkspacePaths): string {
  return `${paths.businessOsRoot}/${area.path}`;
}

export function standardPath(path = "", paths: WorkspacePaths): string {
  return joinPath(paths.standardRoot, path);
}

export function runtimePath(path = "", paths: WorkspacePaths): string {
  return joinPath(paths.runtimeRoot, path);
}

export function relativePath(fromDirectory: string, targetPath: string): string {
  const relative = posix.relative(fromDirectory, targetPath);
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function joinPath(root: string, path: string): string {
  return path ? `${root}/${path.replace(/^\/+/, "")}` : root;
}
