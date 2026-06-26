import type { FileEntry } from "../types.js";

export function vscodeIntegrationFiles(): FileEntry[] {
  return [
    { path: ".github/agents/leanos-chief.agent.md", content: leanosChiefAgent() },
    { path: ".github/prompts/start-leanos.prompt.md", content: startLeanOsPrompt() },
    { path: ".github/prompts/leanos-init.prompt.md", content: leanosInitPrompt() },
    { path: ".leanos/vscode/README.md", content: vscodeReadme() }
  ];
}

function leanosChiefAgent(): string {
  return `---
name: LeanOS Chief
description: Operate LeanOS workspaces through AGENT.md, context, active departments, areas, roles, skills and playbooks.
argument-hint: Diga: quero iniciar o LeanOS
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

\`.leanos/\` is runtime: context, indexes and VS Code support.
\`strategy/\`, \`operations/\` and \`growth/\` own business workflows.
\`ai-standard/\` is the standard library for creating and validating LeanOS assets.
The client operating workspace lives in \`strategy/\`, \`operations/\` and \`growth/\`.

For startup, restart or continuation requests, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Founder requests can be natural language. Use root \`AGENT.md\` to route to the correct department. Then use the department \`AGENT.md\` to choose either a state-changing workflow or the smallest active area. Startup and idea evaluation usually go to Strategy Product and \`idea-calibration.playbook.md\`.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department AGENT.md/README.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

During startup, restart or continuation, use propose-first mode: propose source-of-truth updates and write only after explicit user confirmation.
Use company/product context to update source-of-truth files, primarily in \`strategy/\`.
Do not enrich roles, skills, playbooks, workflows, \`ai-standard/\` or \`.github/\` with company/product context during startup.

Respect active departments and areas in \`leanos.yaml\`.
Do not load missing area paths.
Do not invent workflows.
Enter the owning department or area before acting.
When an area has its own \`AGENT.md\`, use it before loading roles, skills or playbooks.
Do not implement code before loading the matching workflow, department, area, role, skill and playbook.
For PR validation or review requests, load the relevant validation criteria before judging.
`;
}

function startLeanOsPrompt(): string {
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
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then route startup through \`AGENT.md\` -> \`strategy/AGENT.md\` -> \`strategy/product/AGENT.md\` -> \`strategy/product/playbooks/idea-calibration.playbook.md\`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Do not modify roles, skills, playbooks, workflows, \`ai-standard/\`, \`.github/\` or Operations/Growth files during startup unless the user explicitly asks after startup.
`;
}

function leanosInitPrompt(): string {
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
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then route startup through \`AGENT.md\` -> \`strategy/AGENT.md\` -> \`strategy/product/AGENT.md\` -> \`strategy/product/playbooks/idea-calibration.playbook.md\`.

Use propose-first mode:

- Ask the Required Founder Interview questions only when the loaded context does not already answer them.
- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Do not modify roles, skills, playbooks, workflows, \`ai-standard/\`, \`.github/\` or Operations/Growth files during startup unless the user explicitly asks after startup.
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

Do not write global user configuration for this workspace without explicit user approval.
`;
}
