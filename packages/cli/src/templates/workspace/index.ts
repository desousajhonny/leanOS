import { getActiveAreas, getActiveRootDepartments } from "./selectors.js";
import type { FileEntry, WorkspaceAnswers } from "./types.js";
import { aiStandardFiles } from "./renderers/ai-standard.js";
import { leanosRuntimeFiles, rootAgent } from "./renderers/agent.js";
import { commandFiles } from "./renderers/commands.js";
import { contextFiles } from "./renderers/context.js";
import { rootDepartmentFiles } from "./renderers/departments.js";
import { githubFiles } from "./renderers/github.js";
import { indexFiles } from "./renderers/indexes.js";
import { createLeanOsYaml } from "./renderers/leanos-yaml.js";
import { workspaceReadme } from "./renderers/root-readme.js";
import { traceFiles } from "./renderers/traces.js";
import { vscodeIntegrationFiles } from "./renderers/vscode.js";

export { getAllSubareas } from "./selectors.js";

export function createWorkspaceFiles(answers: WorkspaceAnswers): FileEntry[] {
  const activeAreas = getActiveAreas(answers);
  const activeRoots = getActiveRootDepartments(activeAreas);

  return [
    { path: "AGENT.md", content: rootAgent(activeAreas, activeRoots) },
    { path: "README.md", content: workspaceReadme(answers, activeAreas, activeRoots) },
    { path: "leanos.yaml", content: createLeanOsYaml(answers, activeAreas, activeRoots) },
    ...leanosRuntimeFiles(),
    ...aiStandardFiles(),
    ...traceFiles(),
    ...indexFiles(activeAreas, activeRoots),
    ...rootDepartmentFiles(answers, activeAreas, activeRoots),
    ...commandFiles(activeAreas),
    ...contextFiles(answers, activeAreas, activeRoots),
    ...githubFiles(answers, activeAreas),
    ...vscodeIntegrationFiles()
  ];
}
