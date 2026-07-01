import type { WorkspaceAnswers } from "../templates/workspace-template.js";
import { createWorkspaceFiles } from "../templates/workspace-template.js";
import { findExistingFilePaths, writeWorkspaceFiles } from "./file-writer.js";

export type WorkspaceGenerationResult = {
  createdGroups: string[];
  writtenPaths: string[];
  skippedPaths: string[];
  mode: WorkspaceGenerationMode;
};

export type WorkspaceGenerationOptions = {
  overwriteExisting?: boolean;
  mode?: WorkspaceGenerationMode;
};

export type WorkspaceGenerationMode = "create" | "missing-only" | "overwrite";

export async function findWorkspaceConflicts(rootDir: string, answers: WorkspaceAnswers): Promise<string[]> {
  return findExistingFilePaths(rootDir, createWorkspaceFiles(answers));
}

export async function generateWorkspace(rootDir: string, answers: WorkspaceAnswers, options: WorkspaceGenerationOptions = {}): Promise<WorkspaceGenerationResult> {
  const files = createWorkspaceFiles(answers);
  const overwriteExisting = options.overwriteExisting ?? true;
  const writeResult = await writeWorkspaceFiles(rootDir, files, {
    overwriteExisting
  });

  return {
    createdGroups: createdGroupsFromFiles(files.map((file) => file.path)),
    writtenPaths: writeResult.writtenPaths,
    skippedPaths: writeResult.skippedPaths,
    mode: options.mode ?? (overwriteExisting ? "create" : "missing-only")
  };
}

function createdGroupsFromFiles(paths: string[]): string[] {
  return [
      "AGENT.md",
      "README.md",
      "leanos.yaml",
      ".leanos/standard/",
      ".leanos/runtime/agent",
      ".leanos/workflows",
      ".leanos/runtime/context",
      ".leanos/runtime/index",
      "-os/",
      ".github/",
      ".github/leanos"
    ].filter((group) => hasGeneratedGroup(paths, group));
}

function hasGeneratedGroup(paths: string[], group: string): boolean {
  if (group === "-os/") {
    return paths.some((path) => path.includes("-os/"));
  }

  if (group.endsWith("/")) {
    return paths.some((path) => path.startsWith(group));
  }

  return paths.includes(group) || paths.some((path) => path.startsWith(`${group}/`));
}
