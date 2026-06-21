import type { AreaDefinition, FileEntry, RootDepartmentDefinition } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function rootAgent(_activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  const routingLines = activeRoots.map((department) => `If the user asks about ${department.requestTypes}:\n\nGo to:\n\n\`${department.key}/AGENT.md\``);

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

LeanOS uses owner-first navigation:

\`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

Use the chain to choose the next owner, one level at a time.

1. Root chooses the owning department.
2. Department chooses a workflow or active area.
3. Area chooses the specialist role when it has \`AGENT.md\`; otherwise use its \`README.md\` as the local map.
4. Role points to the required skills and playbooks.
5. Skills and playbooks shape the work.
6. Output updates only the smallest relevant source-of-truth, knowledge or decision file.

Do not skip levels because a later file looks relevant.
Do not load the whole workspace when a smaller route exists.

## File Responsibilities

- \`AGENT.md\`: operational owner for that level. It decides the next route.
- \`README.md\`: directory map and explanation.
- \`department.yaml\` and \`area.yaml\`: machine-readable structure.
- \`workflows/\`: multi-step flows owned by the department or area that contains them.
- \`roles/\`, \`skills/\` and \`playbooks/\`: area-level execution assets.

## Red Lines

- Enter the owning department or area before acting.
- When an area has its own \`AGENT.md\`, use it as the area operating owner before loading roles, skills or playbooks.
- Do not invent missing workflows, roles, skills, playbooks, commands or templates.
- Do not load the whole workspace when a smaller route exists.
- Do not write secrets to tracked files.
- Ask before modifying source-of-truth files or operating assets.

## Workspace Mutation Rules

Source-of-truth files describe what the company knows: strategy, product context, validation learning, operating state and decisions.

Operating assets describe how LeanOS works: roles, skills, playbooks, workflows, commands, AI Standard and GitHub/VS Code support.

During \`/start-leanos\`, use propose-first mode. Propose source-of-truth updates first and write only after explicit user confirmation.

Do not enrich roles, skills, playbooks, workflows, commands or \`ai-standard/\` with company/product context during init.

Customize operating assets only when the user explicitly asks to change LeanOS itself, usually through \`/create role\`, \`/create skill\` or \`/create playbook\`.

## LeanOS Runtime

\`.leanos/\` contains runtime files for commands, context, indexes and VS Code integration.
\`.leanos/\` does not own business workflows. Operational workflows live in root departments or their areas, such as \`strategy/workflows/\` and \`operations/workflows/\`.

\`ai-standard/\` contains reusable templates, instructions and quality criteria.

## Active Root Departments

${activeRoots.map((department) => `- ${department.name}: \`${department.key}/AGENT.md\` (map: \`${department.key}/README.md\`)`).join("\n")}

## Routing

Use this section only to choose the owning department. The department \`AGENT.md\` chooses the workflow or area.

${routingLines.join("\n\n")}
`;
}

export function leanosRuntimeFiles(): FileEntry[] {
  return [
    { path: ".leanos/README.md", content: folderReadme("LeanOS Runtime", "Runtime files for LeanOS Chief.", "Use for commands, context, indexes and VS Code integration.", "context/current-focus.md", ["agent/", "commands/", "context/", "index/", "vscode/"], ["../AGENT.md", "../ai-standard/", "../strategy/", "../operations/", "../growth/"], "This folder is runtime support. Business workflows live in departments or areas such as `strategy/workflows/` and `operations/workflows/`. Operational roles, skills and playbooks live in workspace areas.") },
    { path: ".leanos/agent/README.md", content: folderReadme("Agent", "Chief Agent operating guidance.", "Use when defining how LeanOS Chief loads context, activates routes and formats output.", "chief-agent.md", ["chief-agent.md", "operating-rules.md", "context-loading.md", "role-activation.md", "output-standards.md"], ["../../ai-standard/", "../commands/", "../context/"], "Keep this folder concise. Route product work to root departments and areas.") },
    { path: ".leanos/agent/chief-agent.md", content: "# Chief Agent\n\nLeanOS Chief is the bootloader and dispatcher for the workspace.\n\nIt should load AGENT.md, leanos.yaml, context files and the routing map before acting.\n" },
    { path: ".leanos/agent/operating-rules.md", content: "# Operating Rules\n\n- Start from `../../AGENT.md`.\n- LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.\n- Natural language founder requests are first-class. Root AGENT.md routes to the correct department; department AGENT.md files route to workflows or areas.\n- `AGENT.md` is the operating owner for its level; `README.md` is the directory map.\n- Area `AGENT.md` files, when present, choose the specialist role before skills and playbooks are loaded.\n- For `/start-leanos`, load `../commands/start-leanos.md` before acting.\n- For any LeanOS slash command, load `../commands/<command>.md`; if it is missing, do not invent it.\n- Load only relevant context.\n- Enter the owning department or area before acting.\n- Do not implement before loading the matching workflow or command, area, role, skill and playbook.\n- Business workflows live in root departments or areas, not in `.leanos/`.\n- During `/start-leanos`, propose source-of-truth updates first and write only after explicit user confirmation.\n- Treat `/leanos-init` as a legacy alias for `/start-leanos`.\n- Do not modify roles, skills, playbooks, workflows, commands, `ai-standard/` or `.github/` during init.\n- Do not write secrets to tracked files.\n- Use operating assets to work; customize them only when the user explicitly asks to change LeanOS itself.\n" },
    { path: ".leanos/agent/context-loading.md", content: "# Context Loading\n\nLeanOS uses lazy context loading.\n\nLoad `../context/` first, then use `../index/` to choose the smallest relevant path.\n" },
    { path: ".leanos/agent/role-activation.md", content: "# Role Activation\n\nRoles live inside active workspace areas.\n\nDo not activate a role from an inactive or missing area without asking the user.\n" },
    { path: ".leanos/agent/output-standards.md", content: "# Output Standards\n\nEvery output should include:\n\n- What was loaded\n- Decision or result\n- Files to update, if any\n- Next recommended command or route\n" }
  ];
}
