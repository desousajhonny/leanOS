import type { FileEntry } from "../../types.js";
import { toTitle } from "../../content/shared.js";

const instructions = ["create-agent", "create-area", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];

export function instructionFiles(): FileEntry[] {
  return [
    { path: "ai-standard/instructions/README.md", content: instructionsReadme(instructions) },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructionContent(name) }))
  ];
}

function instructionsReadme(instructions: string[]): string {
  return `# Instructions

## Purpose

Step-by-step creation procedures for LeanOS assets.

## When to Use

Use when the user asks to create or update framework assets such as agents, departments, areas, roles, skills, playbooks, workflows or READMEs.

## Files

${instructions.map((name) => `- \`${name}-instructions.md\``).join("\n")}

## Related Folders

- \`../foundation/\`
- \`../templates/\`
- \`../checklists/\`

## Navigation

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Read \`../foundation/creation-rules.md\`.
3. Open the matching instruction file.
4. Use the matching template.
5. Validate with the matching checklist.

## Agent Notes

Do not use one instruction for every asset type. Each instruction protects a different creation path.
`;
}

function creationInstructionContent(name: string): string {
  const instructions: Record<string, string> = {
    "create-agent": `# Create Agent Instructions

Use when creating or changing an \`AGENT.md\`.

## Before Creating

1. Load \`../foundation/asset-taxonomy.md\`.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm whether the agent is root, department or area level.
4. Check whether a README map is enough instead of an AGENT.

## Choose Template

- Root agent: \`../templates/agents/root-agent-template.md\`
- Department agent: \`../templates/agents/department-agent-template.md\`
- Area agent: \`../templates/agents/area-agent-template.md\`

## Process

1. Define the exact level this agent owns.
2. Define what it routes to next.
3. Define red lines for this level.
4. Keep inventory short; delegate detail to README, workflows, roles, skills and playbooks.
5. Ask before writing.

## Validate

Use \`../checklists/agent-quality-checklist.md\`.

## Red Lines

- Do not make root AGENT route directly to area roles or skills.
- Do not list every child workflow, role, skill or playbook.
- Do not duplicate command instructions.
`,
    "create-readme": `# Create README Instructions

Use when creating or changing a folder \`README.md\`.

## Before Creating

1. Load \`../foundation/folder-documentation-rules.md\`.
2. Confirm the folder purpose.
3. Confirm whether an \`AGENT.md\` owns operational routing for this folder.

## Choose Template

- Folder README: \`../templates/structure/folder-readme-template.md\`
- Area README: \`../templates/structure/area-readme-template.md\`
- Root README: \`../templates/structure/root-readme-template.md\`

## Process

1. Explain purpose.
2. Explain when to use the folder.
3. List important files and subfolders.
4. Point to operating owner when present.
5. Add navigation notes.
6. Keep it a map, not an executor.

## Validate

Use \`../checklists/readme-quality-checklist.md\`.

## Red Lines

- Do not duplicate child file contents.
- Do not hide process inside README.
- Do not store product facts that belong in knowledge files.
`,
    "create-department": `# Create Department Instructions

Use when creating a new root department.

## Before Creating

1. Load \`../foundation/asset-taxonomy.md\`.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm that the scope is broad enough to be a root department.
4. Check whether an existing department or area should own the work.

## Choose Templates

- Department AGENT: \`../templates/agents/department-agent-template.md\`
- Department README: \`../templates/structure/department-template.md\`
- Department YAML: \`../templates/structure/department-template.yaml\`

## Process

1. Define department scope.
2. Define active areas.
3. Define department-local workflows when cross-area work exists.
4. Create \`AGENT.md\`, \`README.md\`, \`department.yaml\` and \`workflows/\` when needed.
5. Do not create roles, skills or playbooks at department root.

## Validate

Use \`../checklists/department-quality-checklist.md\`.

## Red Lines

- Do not create a department for one capability.
- Do not place area execution assets at department root.
- Do not duplicate existing department ownership.
`,
    "create-area": `# Create Area Instructions

Use when creating an area inside a root department.

## Before Creating

1. Confirm the owning department.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm the area has a stable operational responsibility.
4. Check whether an existing area already owns the work.

## Choose Templates

- Area README: \`../templates/structure/area-readme-template.md\`
- Area YAML: \`../templates/structure/area-template.yaml\`
- Area AGENT, when needed: \`../templates/agents/area-agent-template.md\`

## Process

1. Define area purpose.
2. Define whether it needs \`AGENT.md\`.
3. Define knowledge files, roles, skills and playbooks.
4. Create \`README.md\` and \`area.yaml\`.
5. Create \`roles/\`, \`skills/\`, \`playbooks/\` and \`knowledge/\` only when they are needed.

## Validate

Use \`../checklists/area-quality-checklist.md\`.

## Red Lines

- Do not create an area with no clear owner or use case.
- Do not create empty execution folders just for decoration.
- Do not bypass department ownership.
`,
    "create-role": `# Create Role Instructions

Use when creating a \`.role.md\` file inside an area.

## Before Creating

1. Confirm the active area.
2. Load the area \`AGENT.md\` when present.
3. Load the area \`README.md\` and \`area.yaml\`.
4. Confirm that a distinct operating persona is needed.

## Choose Template

- Role: \`../templates/execution/role-template.md\`
- Role YAML: \`../templates/execution/role-template.yaml\`

## Process

1. Define what hat the agent should wear.
2. Add YAML frontmatter with \`name\` and a trigger-only \`description\` that starts with "Use when".
3. Define when to use the role.
4. Define required context.
5. Point to existing skills and playbooks.
6. Create missing skills or playbooks only after separate confirmation.

## Validate

Use \`../checklists/role-quality-checklist.md\`.

## Red Lines

- Do not create a role for a one-off task.
- Do not make the role perform the skill or playbook itself.
- Do not point to missing files without marking the gap.
`,
    "create-skill": `# Create Skill Instructions

Use when creating a skill folder inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm which role or playbook will use the skill.
3. Check whether an existing skill already covers the capability.
4. Create \`skills/<skill-name>/SKILL.md\`.

## Choose Template

- Skill: \`../templates/execution/skill-template.md\`
- Skill YAML: \`../templates/execution/skill-template.yaml\`

## Process

1. Define one reusable capability.
2. Add YAML frontmatter with \`name\` and a trigger-only \`description\` that starts with "Use when".
3. Define when to use it.
4. Define required context and inputs.
5. Use \`### Step N\` headings inside \`## Process\`.
6. Define Checks & Acceptance Criteria and outputs.
7. Define red lines.
8. Avoid turning the skill into a full ordered process.

## Validate

Use \`../checklists/skill-quality-checklist.md\`.

## Red Lines

- Do not duplicate another skill.
- Do not create a skill for a one-off answer.
- Do not put durable product facts in a skill.
`,
    "create-playbook": `# Create Playbook Instructions

Use when creating a \`.playbook.md\` file inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm the playbook is tactical execution inside one area.
3. Check whether a department workflow should own the broader flow.
4. Identify skills the playbook should use.
5. Load \`../foundation/guided-conversation.md\` when the playbook asks the founder to choose, classify, prioritize or confirm.

## Choose Template

- Playbook: \`../templates/execution/playbook-template.md\`
- Playbook YAML: \`../templates/execution/playbook-template.yaml\`

## Process

1. Define trigger and goal.
2. Add YAML frontmatter with \`name\` and a trigger-only \`description\` that starts with "Use when".
3. Define inputs.
4. Define ordered process.
5. Reference skills instead of duplicating them.
6. Add \`Guided Conversation\` when founder input or confirmation is part of the playbook.
7. Define Stop Conditions.
8. Define Acceptance Criteria & Outputs.
9. Define Files to Update.

## Validate

Use \`../checklists/playbook-quality-checklist.md\`.

## Red Lines

- Do not duplicate a workflow.
- Do not hide missing role or skill gaps.
- Do not update durable files without confirmation.
`,
    "create-workflow": `# Create Workflow Instructions

Use when creating a \`.workflow.md\` file.

## Before Creating

1. Confirm whether the workflow belongs to a department or area.
2. Confirm that the flow spans multiple areas, roles or stages.
3. Check whether an existing playbook is enough.

## Choose Template

- Workflow: \`../templates/execution/workflow-template.md\`

## Process

1. Define trigger.
2. Define participating areas or roles.
3. Define required context.
4. Define ordered stages and handoffs.
5. Mark conditional participants as conditional.
6. Define outputs and follow-up routes.

## Validate

Use \`../checklists/workflow-quality-checklist.md\`.

## Red Lines

- Do not place business workflows in \`.leanos/workflows/\`.
- Do not duplicate area playbooks.
- Do not require inactive areas without warning.
`,
  };

  return instructions[name] ?? `# ${toTitle(name.replace("create-", ""))} Instructions

1. Load \`../foundation/asset-taxonomy.md\`.
2. Choose the active department and area.
3. Use the matching template.
4. Validate with the matching checklist.
5. Ask before writing.
`;
}
