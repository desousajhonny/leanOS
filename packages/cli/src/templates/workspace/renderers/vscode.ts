import type { FileEntry } from "../types.js";

export function vscodeIntegrationFiles(): FileEntry[] {
  return [
    { path: ".github/agents/leanos-chief.agent.md", content: leanosChiefAgent() },
    { path: ".github/prompts/leanos-init.prompt.md", content: leanosInitPrompt() },
    { path: ".leanos/vscode/README.md", content: vscodeReadme() }
  ];
}

function leanosChiefAgent(): string {
  return `---
name: LeanOS Chief
description: Operate LeanOS workspaces through AGENT.md, runtime commands, active departments, areas, roles, skills and playbooks.
argument-hint: Start with /init leanos or /leanos-init
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

\`.leanos/\` is runtime: commands, context, indexes, global workflows and VS Code support.
\`ai-standard/\` is the standard library for creating and validating LeanOS assets.
The client operating workspace lives in \`strategy/\`, \`operations/\` and \`growth/\`.

On \`/init leanos\`, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

For any LeanOS slash command, load \`.leanos/commands/<command>.md\`. Normalize spaces to hyphens when needed.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Respect active departments and areas in \`leanos.yaml\`.
Do not load missing area paths.
Do not invent workflows.
Do not implement code before loading the matching command, department, area, role, skill and playbook.
For PR validation or review commands, load the relevant validation criteria before judging.
`;
}

function leanosInitPrompt(): string {
  return `---
name: leanos-init
description: Initialize LeanOS Chief for this workspace.
agent: 'LeanOS Chief'
---
# Initialize LeanOS

Treat this prompt as the safe workspace prompt equivalent of \`/init leanos\`.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then summarize the active LeanOS workspace status, active departments, active areas, available workflows and recommended next action.
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

Open Copilot Chat, select \`LeanOS Chief\`, then start with:

\`\`\`text
/init leanos
\`\`\`

If VS Code routes \`/init\` to its native command, use the safe workspace prompt:

\`\`\`text
/leanos-init
\`\`\`

The prompt file is:

\`.github/prompts/leanos-init.prompt.md\`

Do not write global user configuration for this workspace without explicit user approval.
`;
}
