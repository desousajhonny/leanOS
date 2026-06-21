import { commandDefinitions } from "../definitions/commands.js";
import { getAllAreas, getArea, getAvailableCommands } from "../selectors.js";
import type { AreaDefinition, CommandDefinition, FileEntry, Subarea } from "../types.js";
import { folderReadme, formatCommandInvocation } from "../content/shared.js";

export function commandFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = activeAreas.map((area) => area.key);
  const availableCommands = getAvailableCommands(activeAreas);

  return [
    { path: ".leanos/commands/README.md", content: folderReadme("Commands", "Slash command instructions for LeanOS agent chats.", "Use when the user invokes or describes a LeanOS command.", "../index/routing-map.yaml", commandDefinitions.map((command) => `${command.slug}.md`), ["../context/", "../index/", "../../ai-standard/"], `Available now: ${availableCommands.map((command) => formatCommandInvocation(command.slug)).join(", ")}. Commands tied to inactive areas include a warning and require explicit activation before use.`) },
    ...commandDefinitions.map((command) => ({
      path: `.leanos/commands/${command.slug}.md`,
      content: command.slug === "start-leanos" ? startCommand(activeAreas) : command.assetCreation ? assetCreationCommand(command, activeAreas) : routingCommand(command, activeKeys)
    }))
  ];
}

function startCommand(activeAreas: AreaDefinition[]): string {
  const strategyFiles = getInitStrategySourceFiles(activeAreas);

  return `# /start-leanos

## Purpose

Initialize LeanOS safely by loading the workspace map, summarizing active context and proposing Strategy-first source-of-truth updates.

## Load First

Read:

- \`../../AGENT.md\`
- \`../../leanos.yaml\`
- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../context/active-workflow.md\`
- \`../index/routing-map.yaml\`

## What To Do

1. Summarize the active departments, active areas, compatible workflows and recommended next action.
2. Identify Strategy source-of-truth files that could receive the user's company/product context.
3. Propose a concise update plan before editing any file.
4. Ask for explicit confirmation before writing changes.
5. If the user does not confirm, return the update plan and next recommended command only.

## Allowed Updates

Only after explicit confirmation, \`/start-leanos\` may update:

- \`../context/workspace-summary.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
${strategyFiles.map((file) => `- \`../../${file}\``).join("\n")}

Strategy Roadmap files may be reviewed as next-step targets, but do not invent roadmap content before strategy is coherent.

## Forbidden Updates

During \`/start-leanos\`, do not modify:

- \`roles/\`
- \`skills/\`
- \`playbooks/\`
- \`workflows/\`
- \`../../ai-standard/\`
- \`../commands/\`
- \`../../.github/\`
- product code or files outside the LeanOS workspace
- Operations or Growth area files unless the user explicitly asks after init

Roles, skills, playbooks and workflows are operating assets. Use them to work; do not enrich them with company/product context during init.

## Confirmation Rule

Use propose-first mode.

Never write files during init until the user explicitly confirms the proposed source-of-truth updates.

If confirmation is ambiguous, do not write. Ask a focused follow-up question.

## Output

Return:

- Loaded context
- Active departments and areas
- Compatible workflows
- Proposed Strategy source-of-truth updates
- Files that would change after confirmation
- Next recommended command

## Active Areas

${activeAreas.map((area) => `- ${area.key}`).join("\n")}
`;
}

function getInitStrategySourceFiles(activeAreas: AreaDefinition[]): string[] {
  const activeKeys = new Set(activeAreas.map((area) => area.key));
  const files: string[] = [];

  if (activeKeys.has("strategy.company")) {
    files.push(
      "strategy/company/profile.md",
      "strategy/company/mission.md",
      "strategy/company/vision.md",
      "strategy/company/principles.md",
      "strategy/company/operating-model.md"
    );
  }

  if (activeKeys.has("strategy.product")) {
    files.push(
      "strategy/product/brief.md",
      "strategy/product/problem.md",
      "strategy/product/icp.md",
      "strategy/product/jobs-to-be-done.md",
      "strategy/product/value-proposition.md",
      "strategy/product/positioning.md",
      "strategy/product/business-model-canvas.md"
    );
  }

  if (activeKeys.has("strategy.validation")) {
    files.push(
      "strategy/validation/assumptions.md",
      "strategy/validation/riskiest-assumptions.md",
      "strategy/validation/experiments.md",
      "strategy/validation/success-metrics.md",
      "strategy/validation/learning-log.md"
    );
  }

  if (activeKeys.has("strategy.roadmap")) {
    files.push(
      "strategy/roadmap/roadmap.md",
      "strategy/roadmap/milestones.md",
      "strategy/roadmap/current-cycle.md",
      "strategy/roadmap/backlog.md"
    );
  }

  return files;
}

function routingCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const areaAvailable = !command.area || activeSubareas.includes(command.area);
  const areaGuidance = command.area
    ? areaAvailable
      ? `Route through \`../../${getArea(command.area).path}/README.md\`.`
      : `This command normally uses \`${command.area}\`, which is not active in this workspace. Do not load missing paths. Ask whether to activate or create that area before executing.`
    : "Use AGENT.md and the routing map to choose the smallest active area context.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

Read:

- \`../../AGENT.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/routing-map.yaml\`

## Process

1. ${areaGuidance}
2. Load the department AGENT.md or README first.
3. Activate the role named by the area README.
4. Load only the required skills and playbook.
5. Produce the requested output.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function assetCreationCommand(command: CommandDefinition, activeAreas: AreaDefinition[]): string {
  const activeKeys = new Set(activeAreas.map((area) => area.key));

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

First consult:

- \`../../ai-standard/README.md\`
- \`../../ai-standard/navigation-chain.md\`
- \`../../ai-standard/creation-rules.md\`
- \`../../ai-standard/templates/\`
- \`../../ai-standard/checklists/\`
- \`../../ai-standard/instructions/\`

## Area-First Rule

Create role, skill and playbook assets inside the correct active area:

${getAllAreas().map((area) => `- ${area.name} assets: \`../../${area.path}/\`${activeKeys.has(area.key) ? "" : " (not active; ask before activating or creating it)"}`).join("\n")}

## Expected Output

- Selected department and area
- Assets to create
- Templates used
- Checklists used
- Files created or updated

## Active Areas

${activeAreas.map((area) => `- ${area.key}`).join("\n")}
`;
}
