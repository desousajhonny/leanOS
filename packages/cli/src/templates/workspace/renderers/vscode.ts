import { createWorkspacePaths, departmentPath, runtimePath } from "../paths.js";
import type { FileEntry, WorkspaceAnswers } from "../types.js";

export function vscodeIntegrationFiles(answers: WorkspaceAnswers): FileEntry[] {
  return [
    { path: ".github/agents/leanos-chief.agent.md", content: leanosChiefAgent(answers) },
    { path: ".github/prompts/start-leanos.prompt.md", content: startLeanOsPrompt(answers) },
    { path: ".github/prompts/leanos-init.prompt.md", content: leanosInitPrompt(answers) },
    { path: ".leanos/vscode/README.md", content: vscodeReadme() }
  ];
}

function leanosChiefAgent(answers: WorkspaceAnswers): string {
  const paths = createWorkspacePaths(answers);

  return `---
name: LeanOS Chief
description: Operate LeanOS workspaces through AGENT.md, context, active departments, areas, roles, skills and playbooks.
argument-hint: Diga: quero iniciar o LeanOS
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

\`${paths.runtimeRoot}/\` is runtime: context, indexes and VS Code support.
\`${paths.businessOsRoot}/strategy/\`, \`${paths.businessOsRoot}/operations/\` and \`${paths.businessOsRoot}/growth/\` own business workflows.
\`${paths.standardRoot}/\` is the standard library for creating and validating LeanOS assets.
The client operating workspace lives in \`${paths.businessOsRoot}/\`.

For startup, restart or continuation requests, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [${runtimePath("context/workspace-summary.md", paths)}](../../${runtimePath("context/workspace-summary.md", paths)})
- [${runtimePath("context/current-focus.md", paths)}](../../${runtimePath("context/current-focus.md", paths)})
- [${runtimePath("context/next-actions.md", paths)}](../../${runtimePath("context/next-actions.md", paths)})
- [${runtimePath("index/routing-map.yaml", paths)}](../../${runtimePath("index/routing-map.yaml", paths)})

Founder requests can be natural language. Use root \`AGENT.md\` to route to the correct department. Then use the department \`AGENT.md\` to choose either a coordination workflow or the smallest active area. Startup and idea evaluation usually go to Strategy Product and \`idea-calibration.playbook.md\`.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department AGENT.md/README.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

During startup, restart or continuation, use propose-first mode: propose source-of-truth updates and write only after explicit user confirmation.
Use company/product context to update source-of-truth files, primarily in \`strategy/\`.
Não enriqueça roles, skills, playbooks, workflows, \`${paths.standardRoot}/\` ou \`.github/\` com contexto de empresa/produto durante startup.

Respect active departments and areas in \`leanos.yaml\`.
Não carregue paths de áreas ausentes.
Não invente workflows.
Enter the owning department or area before acting.
When an area has its own \`AGENT.md\`, use it before loading roles, skills or playbooks.
Não implemente código antes de carregar o workflow, departamento, área, role, skill e playbook correspondentes.
For PR validation or review requests, load the relevant validation criteria before judging.
`;
}

function startLeanOsPrompt(answers: WorkspaceAnswers): string {
  const paths = createWorkspacePaths(answers);
  const strategyAgent = `${departmentPath("strategy", paths)}/AGENT.md`;
  const strategyProductAgent = `${paths.businessOsRoot}/strategy/product/AGENT.md`;
  const ideaCalibration = `${paths.businessOsRoot}/strategy/product/playbooks/idea-calibration.playbook.md`;

  return `---
name: start-leanos
description: Start LeanOS Chief for this workspace.
agent: 'LeanOS Chief'
---
# Start LeanOS

Treat this prompt as the safe workspace bootstrap for LeanOS Chief.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [${runtimePath("context/workspace-summary.md", paths)}](../../${runtimePath("context/workspace-summary.md", paths)})
- [${runtimePath("context/current-focus.md", paths)}](../../${runtimePath("context/current-focus.md", paths)})
- [${runtimePath("context/next-actions.md", paths)}](../../${runtimePath("context/next-actions.md", paths)})
- [${runtimePath("index/routing-map.yaml", paths)}](../../${runtimePath("index/routing-map.yaml", paths)})

Then route startup through \`AGENT.md\` -> \`${strategyAgent}\` -> \`${strategyProductAgent}\` -> \`${ideaCalibration}\`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Não modifique roles, skills, playbooks, workflows, \`${paths.standardRoot}/\`, \`.github/\` ou arquivos de Operations/Growth durante startup, a menos que o usuário peça explicitamente depois do startup.
`;
}

function leanosInitPrompt(answers: WorkspaceAnswers): string {
  const paths = createWorkspacePaths(answers);
  const strategyAgent = `${departmentPath("strategy", paths)}/AGENT.md`;
  const strategyProductAgent = `${paths.businessOsRoot}/strategy/product/AGENT.md`;
  const ideaCalibration = `${paths.businessOsRoot}/strategy/product/playbooks/idea-calibration.playbook.md`;

  return `---
name: leanos-init
description: Legacy alias for start-leanos.
agent: 'LeanOS Chief'
---
# Initialize LeanOS

This prompt is a compatibility alias for starting LeanOS in older VS Code setups.

Treat this prompt exactly like a natural-language startup request.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [${runtimePath("context/workspace-summary.md", paths)}](../../${runtimePath("context/workspace-summary.md", paths)})
- [${runtimePath("context/current-focus.md", paths)}](../../${runtimePath("context/current-focus.md", paths)})
- [${runtimePath("context/next-actions.md", paths)}](../../${runtimePath("context/next-actions.md", paths)})
- [${runtimePath("index/routing-map.yaml", paths)}](../../${runtimePath("index/routing-map.yaml", paths)})

Then route startup through \`AGENT.md\` -> \`${strategyAgent}\` -> \`${strategyProductAgent}\` -> \`${ideaCalibration}\`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Não modifique roles, skills, playbooks, workflows, \`${paths.standardRoot}/\`, \`.github/\` ou arquivos de Operations/Growth durante startup, a menos que o usuário peça explicitamente depois do startup.
`;
}

function vscodeReadme(): string {
  return `# VS Code

LeanOS prepares a workspace-level VS Code custom agent for GitHub Copilot Chat.

## Agent

The official workspace agent file is:

\`.github/agents/leanos-chief.agent.md\`

VS Code detects workspace custom agents from \`.github/agents\`.

## Bootstrap

Open Copilot Chat, select \`LeanOS Chief\`, then use linguagem natural:

\`\`\`text
Quero iniciar o LeanOS.
\`\`\`

The primary prompt file is:

\`.github/prompts/start-leanos.prompt.md\`

The legacy alias file is:

\`.github/prompts/leanos-init.prompt.md\`

Não escreva configuração global de usuário para este workspace sem aprovação explícita do usuário.
`;
}
