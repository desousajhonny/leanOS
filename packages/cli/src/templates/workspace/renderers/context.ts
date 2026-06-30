import { getActiveSubareaKeys, getActiveWorkflowKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";
import { folderReadme } from "../content/shared.js";
import { areaPath, createWorkspacePaths, departmentPath, relativePath, runtimePath } from "../paths.js";

export function contextFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const paths = createWorkspacePaths(answers);
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);
  const contextRoot = runtimePath("context", paths);

  return [
    { path: ".leanos/context/README.md", content: folderReadme("Context", "Current workspace state that helps LeanOS Chief start quickly.", "Use at the beginning of every LeanOS session.", "current-focus.md", ["workspace-summary.md", "active-workflow.md", "current-focus.md", "next-actions.md", "decision-index.md"], [`${relativePath(contextRoot, runtimePath("index", paths))}/`, `${relativePath(contextRoot, departmentPath("strategy", paths))}/`, `${relativePath(contextRoot, departmentPath("operations", paths))}/`, `${relativePath(contextRoot, departmentPath("growth", paths))}/`], "Context files are lightweight pointers, not full manuals. Business workflows live inside the product OS.") },
    { path: ".leanos/context/workspace-summary.md", content: workspaceSummary(answers, activeAreas, activeRoots) },
    { path: ".leanos/context/active-workflow.md", content: activeWorkflowContext(activeWorkflows) },
    { path: ".leanos/context/current-focus.md", content: getCurrentFocus(answers, activeAreas) },
    { path: ".leanos/context/next-actions.md", content: getNextActions(answers, activeAreas) },
    { path: ".leanos/context/decision-index.md", content: decisionIndex(activeAreas, paths) }
  ];
}

function activeWorkflowContext(activeWorkflows: string[]): string {
  if (activeWorkflows.length === 0) {
    return `# Active Workflow

No complete local workflow is active yet.

The currently active areas do not satisfy any full department workflow requirements.

Use active area READMEs and routing protocols until the user activates more areas.
`;
  }

  return `# Active Workflow

Current compatible local workflows:

${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}

Use only workflows listed here as active. Other workflow files may exist inside root departments, but they can require areas that are not active yet.
`;
}

function workspaceSummary(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# Workspace Summary

- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}
- Active departments: ${activeRoots.map((department) => department.key).join(", ")}
- Active areas: ${activeAreas.map((area) => area.key).join(", ")}
- Business OS root: ${createWorkspacePaths(answers).businessOsRoot}
- Workspace mode: ${answers.workspaceMode}
- Workspace mode note: ${workspaceModeNote(answers)}
- Detected project: ${detectedProjectSummary(answers)}
- GitHub management: ${answers.prepareGithubManagement ? "prepared; waiting for token/configuration" : "not requested yet"}
`;
}

export function getCurrentFocus(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): string {
  const paths = createWorkspacePaths(answers);
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return `# Current Focus

${workspaceModeNote(answers)}

Operate only through active workspace areas:

${activeAreas.map((area) => `- ${area.key}: \`${areaPath(area, paths)}/${area.lead ? "AGENT.md" : "README.md"}\`${area.lead ? ` (map: \`${areaPath(area, paths)}/README.md\`)` : ""}`).join("\n")}

${activeWorkflows.length > 0 ? `Compatible local workflows:\n\n${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}` : "No complete local workflow is active yet."}

${activeKeys.has("strategy.product") ? "Rotas de product strategy estão disponíveis." : "Rotas de product strategy não estão ativas. Peça confirmação antes de ativar Strategy Product ou criar assets específicos de produto."}
`;
}

export function getNextActions(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): string {
  const paths = createWorkspacePaths(answers);
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const productOpsActive = activeKeys.has("operations.product-ops");
  const engineeringActive = activeKeys.has("operations.engineering");
  const strategyAgent = `${departmentPath("strategy", paths)}/AGENT.md`;
  const operationsAgent = `${departmentPath("operations", paths)}/AGENT.md`;
  const productOpsAgent = `${departmentPath("operations", paths)}/product-ops/AGENT.md`;
  const whereWeAre = runtimePath("agent/protocols/where-we-are.md", paths);

  return `# Next Actions

## 1. Start Or Continue Strategy

Route:

\`AGENT.md\` -> \`${strategyAgent}\`

Use this when the founder is starting, restarting, defining ICP, clarifying the MVP Validation Scope, evaluating an idea or shaping the first MVP validation path.

## 2. Check Status Or Readiness

Route:

\`${whereWeAre}\`

Use this before recommending implementation, branch, PR, launch or GitHub sync.

## 3. Delivery Planning

${productOpsActive ? `Product Ops is active. Route MVP backlog planning, delivery-item-to-epic and epic-to-features work through \`${operationsAgent}\` -> \`${productOpsAgent}\`.` : "Product Ops is not active. If the founder wants MVP backlog planning, local Epics or Features, ask to activate `operations.product-ops` before creating delivery assets."}

## 4. Implementation Readiness

${engineeringActive ? `Engineering está ativa. Roteie implementação, branch, PR e review por \`${operationsAgent}\` depois que a prontidão de Product Ops estiver clara.` : "Engineering não está ativa. Não implemente código de produto até o escopo de delivery e a ativação de Engineering estarem prontos."}

## GitHub

${answers.prepareGithubManagement ? "GitHub management foi preparado. Adicione um token local em `.env.local` apenas ao configurar GitHub Projects ou executar um fluxo futuro de sync de Epics/Features." : "GitHub management ainda não foi solicitado. Peça confirmação antes de criar `.env.local` ou configurar sync com GitHub Projects."}

## Future App Bootstrap

Não crie \`src/\`, \`app/\`, \`pages/\`, \`package.json\` ou \`vercel.json\` durante o setup inicial do LeanOS. Use um futuro workflow de bootstrap de produto depois que Strategy e MVP estiverem claros.
`;
}

function decisionIndex(activeAreas: AreaDefinition[], paths = createWorkspacePaths({ productName: "leanos" } as WorkspaceAnswers)): string {
  const contextRoot = runtimePath("context", paths);
  const rows = activeAreas.flatMap((area) => area.sourceOfTruth
    .filter((file) => file.includes("decision") || file.includes("log"))
    .map((file) => `| ${area.name} | \`${relativePath(contextRoot, `${areaPath(area, paths)}/${file}`)}\` |`));

  return `# Decision Index

| Area | Decision Log |
| --- | --- |
${rows.length > 0 ? rows.join("\n") : "| TBD | TBD |"}
`;
}

function workspaceModeNote(answers: WorkspaceAnswers): string {
  return answers.workspaceMode === "existing-product-repo"
    ? "LeanOS is installed as an operating layer over an existing product repository. Preserve product code and existing repository files unless the user explicitly confirms a change."
    : "LeanOS está preparando Strategy e Operations antes do bootstrap de app/código. Não crie código-fonte de produto durante o setup inicial.";
}

function detectedProjectSummary(answers: WorkspaceAnswers): string {
  const project = answers.detectedProject;

  if (!project) {
    return "not inspected";
  }

  const signals = [
    project.hasGit ? ".git" : "",
    project.hasPackageJson ? "package.json" : "",
    project.hasSourceDir ? "src/app/pages" : "",
    project.hasGithubDir ? ".github" : "",
    project.hasVercelConfig ? "Vercel config" : "",
    project.gitRemoteOrigin ? `origin ${project.gitRemoteOrigin}` : ""
  ].filter(Boolean);

  return signals.length > 0 ? signals.join(", ") : "no existing project signals";
}
