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
    createdGroups: [
      "AGENT.md",
      "README.md",
      "leanos.yaml",
      "ai-standard/",
      ".leanos/agent",
      ".leanos/workflows",
      ".leanos/commands",
      ".leanos/context",
      ".leanos/index",
      "strategy/",
      "operations/",
      "growth/",
      ".github/",
      ".github/agents",
      ".github/prompts",
      ".leanos/vscode"
    ],
    writtenPaths: writeResult.writtenPaths,
    skippedPaths: writeResult.skippedPaths,
    mode: options.mode ?? (overwriteExisting ? "create" : "missing-only")
  };
}
