import { getActiveSubareaKeys, getActiveWorkflowKeys, getAvailableCommands } from "../selectors.js";
import type { AreaDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";
import { folderReadme, formatCommandInvocation, toTitle } from "../content/shared.js";

export function contextFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return [
    { path: ".leanos/context/README.md", content: folderReadme("Context", "Current workspace state that helps LeanOS Chief start quickly.", "Use at the beginning of every LeanOS session.", "current-focus.md", ["workspace-summary.md", "active-workflow.md", "current-focus.md", "next-actions.md", "decision-index.md"], ["../index/", "../workflows/", "../../strategy/", "../../operations/", "../../growth/"], "Context files are lightweight pointers, not full manuals.") },
    { path: ".leanos/context/workspace-summary.md", content: workspaceSummary(answers, activeAreas, activeRoots) },
    { path: ".leanos/context/active-workflow.md", content: activeWorkflowContext(activeWorkflows) },
    { path: ".leanos/context/current-focus.md", content: getCurrentFocus(activeAreas) },
    { path: ".leanos/context/next-actions.md", content: getNextActions(activeAreas) },
    { path: ".leanos/context/decision-index.md", content: decisionIndex(activeAreas) }
  ];
}

function activeWorkflowContext(activeWorkflows: string[]): string {
  if (activeWorkflows.length === 0) {
    return `# Active Workflow

No complete global workflow is active yet.

The currently active areas do not satisfy any full global workflow requirements.

Use active area READMEs and available commands until the user activates more areas.
`;
  }

  return `# Active Workflow

Current compatible global workflows:

${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}

Use only workflows listed here as active. Other workflow files may exist, but they can require areas that are not active yet.
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
`;
}

export function getCurrentFocus(activeAreas: AreaDefinition[]): string {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return `# Current Focus

Operate only through active workspace areas:

${activeAreas.map((area) => `- ${area.key}: \`${area.path}/README.md\``).join("\n")}

${activeWorkflows.length > 0 ? `Compatible global workflows:\n\n${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}` : "No complete global workflow is active yet."}

${activeKeys.has("strategy.product") ? "Product strategy commands are available." : "Product strategy commands are not active. Ask before activating Strategy Product or creating product-specific assets."}
`;
}

export function getNextActions(activeAreas: AreaDefinition[]): string {
  const availableCommands = getAvailableCommands(activeAreas)
    .filter((command) => !command.assetCreation)
    .filter((command) => ["status", "define-icp", "define-mvp", "check-coherence", "workon-issue"].includes(command.slug))
    .slice(0, 4);

  if (availableCommands.length === 0) {
    return `# Next Actions

## 1. Check Status

Command:

\`\`\`text
/status
\`\`\`

No area-specific command is active yet. Use the active area READMEs and ask before activating missing areas.
`;
  }

  return `# Next Actions

${availableCommands.map((command, index) => `## ${index + 1}. ${toTitle(command.slug)}\n\nCommand:\n\n\`\`\`text\n${formatCommandInvocation(command.slug)}\n\`\`\``).join("\n\n")}
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
