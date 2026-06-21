import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";

export function workspaceReadme(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# ${answers.productName}

LeanOS workspace for ${answers.companyName}.

This workspace separates LeanOS runtime files from the client's operating structure.

${workspaceModeIntro(answers)}

## Start

For any AI model:

\`\`\`text
/start-leanos
\`\`\`

Then start from:

\`AGENT.md\`

## Main Structure

- \`.github/\` VS Code and GitHub integration files.
- \`.leanos/\` LeanOS runtime, commands, context, indexes and global workflows.
- \`ai-standard/\` templates, checklists and instructions for creating LeanOS assets.
${activeRoots.map((department) => `- \`${department.key}/\` ${department.name} department.`).join("\n")}

## Product Snapshot

- Workspace mode: ${answers.workspaceMode}
- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}
- GitHub management: ${answers.prepareGithubManagement ? "prepared; add a local token only when configuring GitHub sync" : "not requested yet"}

## Active Areas

${activeAreas.map((area) => `- \`${area.path}/\` ${area.purpose}`).join("\n")}

## Next Step

Open Copilot Chat, select \`LeanOS Chief\`, and run:

\`\`\`text
/start-leanos
\`\`\`
`;
}

function workspaceModeIntro(answers: WorkspaceAnswers): string {
  if (answers.workspaceMode === "existing-product-repo") {
    return "LeanOS is installed as an operating layer over an existing product repository. It should preserve product code, package files, deployment config and existing repository files unless the user explicitly confirms a change.";
  }

  return "LeanOS is preparing strategy and operations before app/code bootstrap. Initial setup does not create `src/`, `app/`, `pages/`, `package.json` or `vercel.json`.";
}
