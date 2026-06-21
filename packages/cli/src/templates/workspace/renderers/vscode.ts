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
description: Operate LeanOS workspaces through AGENT.md, runtime commands, active departments, areas, roles, skills and playbooks.
argument-hint: Start with /start-leanos
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

\`.leanos/\` is runtime: commands, context, indexes, global workflows and VS Code support.
\`ai-standard/\` is the standard library for creating and validating LeanOS assets.
The client operating workspace lives in \`strategy/\`, \`operations/\` and \`growth/\`.

On \`/start-leanos\`, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

For any LeanOS slash command, load \`.leanos/commands/<command>.md\`. Normalize spaces to hyphens when needed.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output\`

During \`/start-leanos\` or legacy \`/leanos-init\`, use propose-first mode: propose source-of-truth updates and write only after explicit user confirmation.
Use company/product context to update source-of-truth files, primarily in \`strategy/\`.
Do not enrich roles, skills, playbooks, workflows, commands, \`ai-standard/\` or \`.github/\` with company/product context during init.

Respect active departments and areas in \`leanos.yaml\`.
Do not load missing area paths.
Do not invent workflows.
Do not implement code before loading the matching command, department, area, role, skill and playbook.
For PR validation or review commands, load the relevant validation criteria before judging.
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

Then summarize the active LeanOS workspace status, active departments, active areas, available workflows and recommended next action.

Use propose-first mode:

- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Do not modify roles, skills, playbooks, workflows, commands, \`ai-standard/\`, \`.github/\` or Operations/Growth files during init unless the user explicitly asks after init.
`;
}

function leanosInitPrompt(): string {
  return `---
name: leanos-init
description: Legacy alias for start-leanos.
agent: 'LeanOS Chief'
---
# Initialize LeanOS

This prompt is a legacy alias. Prefer \`/start-leanos\` for new workspaces.

Treat this prompt exactly like \`/start-leanos\`.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then summarize the active LeanOS workspace status, active departments, active areas, available workflows and recommended next action.

Use propose-first mode:

- Propose Strategy-first source-of-truth updates before editing.
- Write only after explicit user confirmation.
- If confirmation is missing or ambiguous, do not write.
- Do not modify roles, skills, playbooks, workflows, commands, \`ai-standard/\`, \`.github/\` or Operations/Growth files during init unless the user explicitly asks after init.
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
/start-leanos
\`\`\`

Legacy workspaces may still use:

\`\`\`text
/leanos-init
\`\`\`

The primary prompt file is:

\`.github/prompts/start-leanos.prompt.md\`

The legacy alias file is:

\`.github/prompts/leanos-init.prompt.md\`

Do not write global user configuration for this workspace without explicit user approval.
`;
}
