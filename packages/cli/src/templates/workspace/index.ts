import { getActiveRootDepartments, getInitialActiveAreas } from "./selectors.js";
import type { FileEntry, WorkspaceAnswers } from "./types.js";
import { aiStandardFiles } from "./renderers/ai-standard.js";
import { leanosRuntimeFiles, rootAgent } from "./renderers/agent.js";
import { contextFiles } from "./renderers/context.js";
import { rootDepartmentFiles } from "./renderers/departments.js";
import { githubFiles } from "./renderers/github.js";
import { indexFiles } from "./renderers/indexes.js";
import { createLeanOsYaml } from "./renderers/leanos-yaml.js";
import { workspaceReadme } from "./renderers/root-readme.js";
import { traceFiles } from "./renderers/traces.js";
import { vscodeIntegrationFiles } from "./renderers/vscode.js";
import { createWorkspacePaths, materializeWorkspaceFiles } from "./paths.js";

export { getAllSubareas } from "./selectors.js";

export function createWorkspaceFiles(answers: WorkspaceAnswers): FileEntry[] {
  const activeAreas = getInitialActiveAreas(answers);
  const activeRoots = getActiveRootDepartments(activeAreas);
  const paths = createWorkspacePaths(answers);

  const logicalFiles = [
    { path: "AGENT.md", content: rootAgent(activeAreas, activeRoots, answers) },
    { path: "README.md", content: workspaceReadme(answers, activeAreas, activeRoots) },
    { path: "leanos.yaml", content: createLeanOsYaml(answers, activeAreas, activeRoots) },
    { path: `${paths.businessOsRoot}/README.md`, content: businessOsReadme(answers) },
    ...leanosRuntimeFiles(answers),
    ...aiStandardFiles(),
    ...traceFiles(),
    ...indexFiles(activeAreas, activeRoots, answers),
    ...rootDepartmentFiles(answers, activeAreas, activeRoots),
    ...contextFiles(answers, activeAreas, activeRoots),
    ...githubFiles(answers, activeAreas),
    ...vscodeIntegrationFiles(answers)
  ];

  return materializeWorkspaceFiles(logicalFiles, paths);
}

function businessOsReadme(answers: WorkspaceAnswers): string {
  return `# ${answers.productName} OS

Sistema operacional de negócio do produto ${answers.productName}.

## Estrutura

- \`strategy/\`: estratégia, baseline de produto, roadmap e decisões de direção.
- \`operations/\`: Product Ops, delivery, design, engineering, security e DevOps quando ativos.
- \`growth/\`: lançamento, aquisição, feedback, pricing e aprendizado de mercado quando ativos.

## Como Usar

Comece pela raiz do workspace em \`../AGENT.md\`. O Chief Agent usa \`../leanos.yaml\`, \`../.leanos/runtime/context/\` e \`../.leanos/runtime/index/\` para escolher a rota correta.
`;
}
