import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";

export function workspaceReadme(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# ${answers.productName}

LeanOS workspace for ${answers.companyName}.

This workspace separates LeanOS runtime files from the client's operating structure.

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

- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}

## Active Areas

${activeAreas.map((area) => `- \`${area.path}/\` ${area.purpose}`).join("\n")}

## Next Step

Open Copilot Chat, select \`LeanOS Chief\`, and run:

\`\`\`text
/start-leanos
\`\`\`
`;
}
