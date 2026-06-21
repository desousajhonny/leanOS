import type { AreaDefinition, FileEntry, RootDepartmentDefinition } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function rootAgent(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  const routingLines = activeAreas.map((area) => `If the user asks about ${area.requestTypes}:\n\nGo to:\n\n\`${area.path}/README.md\``);

  return `# LeanOS Agent

You are the LeanOS Chief Agent for this workspace.

Your job is to help the user operate a product company with strategic coherence before and during implementation.

## Start Here

Read these files first:

- \`leanos.yaml\`
- \`.leanos/context/workspace-summary.md\`
- \`.leanos/context/current-focus.md\`
- \`.leanos/context/next-actions.md\`
- \`.leanos/index/routing-map.yaml\`

## Command Handling

LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.

When the user invokes \`/start-leanos\`, load \`.leanos/commands/start-leanos.md\` and follow it.

When the user invokes legacy \`/leanos-init\`, treat it as \`/start-leanos\`.

For any LeanOS slash command, normalize the command to kebab-case and load \`.leanos/commands/<command>.md\` before acting.

If the command file is missing, do not invent the command. Explain what is missing and route through the active context instead.

## Navigation Chain

\`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Do not jump directly to implementation.
Do not load every file.
Load the smallest relevant department, area, role, skill and playbook.

## Workspace Mutation Rules

Source-of-truth files describe what the company knows: strategy, product context, validation learning, operating state and decisions.

Operating assets describe how LeanOS works: roles, skills, playbooks, workflows, commands, AI Standard and GitHub/VS Code support.

During \`/start-leanos\`, use propose-first mode. Propose source-of-truth updates first and write only after explicit user confirmation.

Do not enrich roles, skills, playbooks, workflows, commands or \`ai-standard/\` with company/product context during init.

Customize operating assets only when the user explicitly asks to change LeanOS itself, usually through \`/create role\`, \`/create skill\` or \`/create playbook\`.

## LeanOS Runtime

\`.leanos/\` contains runtime files for commands, context, indexes, workflows and VS Code integration.

\`ai-standard/\` contains reusable templates, instructions and quality criteria.

## Active Root Departments

${activeRoots.map((department) => `- ${department.name}: \`${department.key}/README.md\``).join("\n")}

## Active Areas

${activeAreas.map((area) => `- ${area.name}: \`${area.path}/README.md\``).join("\n")}

## Routing

${routingLines.join("\n\n")}
`;
}

export function leanosRuntimeFiles(): FileEntry[] {
  return [
    { path: ".leanos/README.md", content: folderReadme("LeanOS Runtime", "Runtime files for LeanOS Chief.", "Use for commands, context, indexes, global workflows and VS Code integration.", "context/current-focus.md", ["agent/", "commands/", "context/", "workflows/", "index/", "vscode/"], ["../AGENT.md", "../ai-standard/", "../strategy/", "../operations/", "../growth/"], "This folder is runtime support. Operational roles, skills and playbooks live in workspace departments and areas.") },
    { path: ".leanos/agent/README.md", content: folderReadme("Agent", "Chief Agent operating guidance.", "Use when defining how LeanOS Chief loads context, activates routes and formats output.", "chief-agent.md", ["chief-agent.md", "operating-rules.md", "context-loading.md", "role-activation.md", "output-standards.md"], ["../../ai-standard/", "../commands/", "../context/"], "Keep this folder concise. Route product work to root departments and areas.") },
    { path: ".leanos/agent/chief-agent.md", content: "# Chief Agent\n\nLeanOS Chief is the bootloader and dispatcher for the workspace.\n\nIt should load AGENT.md, leanos.yaml, context files and the routing map before acting.\n" },
    { path: ".leanos/agent/operating-rules.md", content: "# Operating Rules\n\n- Start from `../../AGENT.md`.\n- LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.\n- For `/start-leanos`, load `../commands/start-leanos.md` before acting.\n- For any LeanOS slash command, load `../commands/<command>.md`; if it is missing, do not invent it.\n- Load only relevant context.\n- Route through departments and areas.\n- Do not implement before loading the matching command, area, role, skill and playbook.\n- During `/start-leanos`, propose source-of-truth updates first and write only after explicit user confirmation.\n- Treat `/leanos-init` as a legacy alias for `/start-leanos`.\n- Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init.\n- Use operating assets to work; customize them only when the user explicitly asks to change LeanOS itself.\n" },
    { path: ".leanos/agent/context-loading.md", content: "# Context Loading\n\nLeanOS uses lazy context loading.\n\nLoad `../context/` first, then use `../index/` to choose the smallest relevant path.\n" },
    { path: ".leanos/agent/role-activation.md", content: "# Role Activation\n\nRoles live inside active workspace areas.\n\nDo not activate a role from an inactive or missing area without asking the user.\n" },
    { path: ".leanos/agent/output-standards.md", content: "# Output Standards\n\nEvery output should include:\n\n- What was loaded\n- Decision or result\n- Files to update, if any\n- Next recommended command or route\n" }
  ];
}
