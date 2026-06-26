import { getActiveSubareaKeys, getActiveWorkflowKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function contextFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return [
    { path: ".leanos/context/README.md", content: folderReadme("Context", "Current workspace state that helps LeanOS Chief start quickly.", "Use at the beginning of every LeanOS session.", "current-focus.md", ["workspace-summary.md", "active-workflow.md", "current-focus.md", "next-actions.md", "decision-index.md"], ["../index/", "../../strategy/", "../../operations/", "../../growth/"], "Context files are lightweight pointers, not full manuals. Business workflows live in root departments.") },
    { path: ".leanos/context/workspace-summary.md", content: workspaceSummary(answers, activeAreas, activeRoots) },
    { path: ".leanos/context/active-workflow.md", content: activeWorkflowContext(activeWorkflows) },
    { path: ".leanos/context/current-focus.md", content: getCurrentFocus(answers, activeAreas) },
    { path: ".leanos/context/next-actions.md", content: getNextActions(answers, activeAreas) },
    { path: ".leanos/context/decision-index.md", content: decisionIndex(activeAreas) }
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
- Workspace mode: ${answers.workspaceMode}
- Workspace mode note: ${workspaceModeNote(answers)}
- Detected project: ${detectedProjectSummary(answers)}
- GitHub management: ${answers.prepareGithubManagement ? "prepared; waiting for token/configuration" : "not requested yet"}
`;
}

export function getCurrentFocus(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): string {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return `# Current Focus

${workspaceModeNote(answers)}

Operate only through active workspace areas:

${activeAreas.map((area) => `- ${area.key}: \`${area.path}/${area.lead ? "AGENT.md" : "README.md"}\`${area.lead ? ` (map: \`${area.path}/README.md\`)` : ""}`).join("\n")}

${activeWorkflows.length > 0 ? `Compatible local workflows:\n\n${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}` : "No complete local workflow is active yet."}

${activeKeys.has("strategy.product") ? "Product strategy routes are available." : "Product strategy routes are not active. Ask before activating Strategy Product or creating product-specific assets."}
`;
}

export function getNextActions(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): string {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const productOpsActive = activeKeys.has("operations.product-ops");
  const engineeringActive = activeKeys.has("operations.engineering");

  return `# Next Actions

## 1. Start Or Continue Strategy

Route:

\`AGENT.md\` -> \`strategy/AGENT.md\`

Use this when the founder is starting, restarting, defining ICP, clarifying the MVP Validation Scope, evaluating an idea or shaping the first MVP validation path.

## 2. Check Status Or Readiness

Route:

\`.leanos/agent/protocols/where-we-are.md\`

Use this before recommending implementation, branch, PR, launch or GitHub sync.

## 3. Delivery Planning

${productOpsActive ? "Product Ops is active. Route MVP delivery scope, roadmap-item-to-epic and epic-to-features work through `operations/AGENT.md` -> `operations/product-ops/AGENT.md`." : "Product Ops is not active. If the founder wants MVP delivery scope, local Epics or Features, ask to activate `operations.product-ops` before creating delivery assets."}

## 4. Implementation Readiness

${engineeringActive ? "Engineering is active. Route implementation, branch, PR and review work through `operations/AGENT.md` after Product Ops readiness is clear." : "Engineering is not active. Do not implement product code until delivery scope and Engineering activation are ready."}

## GitHub

${answers.prepareGithubManagement ? "GitHub management was prepared. Add a local token to `.env.local` only when configuring GitHub Projects or running a future Epics/Features sync flow." : "GitHub management was not requested yet. Ask before creating `.env.local` or configuring GitHub Projects sync."}

## Future App Bootstrap

Do not create \`src/\`, \`app/\`, \`pages/\`, \`package.json\` or \`vercel.json\` during initial LeanOS setup. Use a future product bootstrap workflow after strategy and MVP are clear.
`;
}

function decisionIndex(activeAreas: AreaDefinition[]): string {
  const rows = activeAreas.flatMap((area) => area.sourceOfTruth.filter((file) => file.includes("decision") || file.includes("log")).map((file) => `| ${area.name} | \`../../${area.path}/${file}\` |`));

  return `# Decision Index

| Area | Decision Log |
| --- | --- |
${rows.length > 0 ? rows.join("\n") : "| TBD | TBD |"}
`;
}

function workspaceModeNote(answers: WorkspaceAnswers): string {
  return answers.workspaceMode === "existing-product-repo"
    ? "LeanOS is installed as an operating layer over an existing product repository. Preserve product code and existing repository files unless the user explicitly confirms a change."
    : "LeanOS is preparing strategy and operations before app/code bootstrap. Do not create product source code during initial setup.";
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
