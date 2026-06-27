import type { FileEntry } from "../../types.js";
import { toTitle } from "../../content/shared.js";

const checklists = ["agent", "area", "department", "playbook", "readme", "role", "skill", "workflow"];

export function checklistFiles(): FileEntry[] {
  return [
    { path: "ai-standard/checklists/README.md", content: checklistsReadme(checklists) },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklistContent(name) }))
  ];
}

function checklistsReadme(checklists: string[]): string {
  return `# Checklists

## Purpose

Quality gates for LeanOS assets.

## When to Use

Use before accepting a newly created or modified asset.

## Files

${checklists.map((name) => `- \`${name}-quality-checklist.md\``).join("\n")}

## Related Folders

- \`../foundation/\`
- \`../templates/\`
- \`../instructions/\`

## Navigation

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Use the matching checklist only.
3. If no checklist matches, use \`../foundation/quality-criteria.md\` and ask before creating a new checklist.

## Agent Notes

Do not treat all checklists as interchangeable. Each checklist protects a different asset type.
`;
}

function qualityChecklistContent(name: string): string {
  const checklists: Record<string, string> = {
    agent: `# Agent Quality Checklist

Use this checklist before accepting an \`AGENT.md\`.

## Scope

- [ ] The agent owns routing for exactly one level: root, department or area.
- [ ] The agent states its operating scope.
- [ ] The agent does not try to be a full inventory of every child file.

## Routing

- [ ] Root agents route only to departments.
- [ ] Department agents route to workflows or active areas.
- [ ] Area agents route to specialist roles before skills or playbooks.
- [ ] The agent does not skip levels in the Navigation Chain.

## Context Loading

- [ ] The agent tells models which minimal files to load first.
- [ ] The agent avoids asking models to load the whole workspace.
- [ ] Missing paths are handled as gaps, not invented.

## Red Lines

- [ ] The agent protects secrets.
- [ ] The agent asks before modifying durable files.
- [ ] The agent does not enrich framework assets with product context during init.

## Output

- [ ] The agent defines the expected response header or output shape when relevant.
- [ ] The agent makes the next route clear.
`,
    readme: `# README Quality Checklist

Use this checklist before accepting a folder \`README.md\`.

## Folder Map

- [ ] The README explains the folder purpose.
- [ ] The README says when to use the folder.
- [ ] The README lists important files and subfolders.
- [ ] The README points to the operating owner when one exists.

## Navigation

- [ ] If the folder has \`AGENT.md\`, the README tells agents to start there for operational work.
- [ ] The README identifies related folders.
- [ ] The README avoids routing directly to child roles when an area agent should route first.

## Boundaries

- [ ] The README is a map, not the operator.
- [ ] The README does not duplicate the full content of child files.
- [ ] The README does not hide process rules that belong in a playbook.
- [ ] The README does not store product facts that belong in knowledge files.
`,
    department: `# Department Quality Checklist

Use this checklist before accepting a root department.

## Structure

- [ ] The department has \`AGENT.md\`.
- [ ] The department has \`README.md\`.
- [ ] The department has \`department.yaml\`.
- [ ] The department has \`workflows/\` when cross-area flows exist.
- [ ] Active areas are listed and routed clearly.

## Ownership

- [ ] The department owns broad operating direction.
- [ ] The department does not contain \`roles/\`, \`skills/\` or \`playbooks/\` directly.
- [ ] Area-level execution assets live inside areas.
- [ ] Department workflows coordinate across areas or stages.

## Routing

- [ ] The department AGENT routes to workflows or areas.
- [ ] The README acts as a map.
- [ ] The YAML is machine-readable and does not store narrative product context.
`,
    area: `# Area Quality Checklist

Use this checklist before accepting an area.

## Structure

- [ ] The area has \`README.md\`.
- [ ] The area has \`area.yaml\`.
- [ ] The area has \`roles/\`, \`skills/\` and \`playbooks/\` when operational work exists.
- [ ] The area has \`knowledge/\` when it owns reusable context.
- [ ] The area has \`AGENT.md\` when specialist routing is needed.

## Ownership

- [ ] The area has a clear responsibility inside its department.
- [ ] Roles, skills and playbooks belong to this area.
- [ ] Knowledge files store confirmed reusable context.

## Routing

- [ ] Area AGENT, when present, chooses the specialist role.
- [ ] Roles point to skills and playbooks.
- [ ] The area does not require inactive or missing paths.
`,
    role: `# Role Quality Checklist

Use this checklist before accepting a \`.role.md\` file.

## Metadata

- [ ] The role has YAML frontmatter with \`name\` and \`description\`.
- [ ] The \`description\` starts with "Use when" and describes triggering conditions.

## Responsibility

- [ ] The role defines a clear operating persona.
- [ ] The role answers "with which hat should the agent act?"
- [ ] The role does not duplicate a skill or playbook.

## Context

- [ ] The role lists the context it should read before acting.
- [ ] The role points to relevant knowledge files when needed.
- [ ] The role does not ask for unrelated workspace context.

## Execution Assets

- [ ] The role points to relevant skills.
- [ ] The role points to relevant playbooks.
- [ ] The role does not reference missing files.

## Acceptance Criteria

- [ ] The role states the expected output or confirmation state under \`## Acceptance Criteria\`.
- [ ] The role states when to ask for clarification or confirmation.
`,
    skill: `# Skill Quality Checklist

Use this checklist before accepting a skill folder with \`SKILL.md\`.

## Capability

- [ ] The skill defines one reusable capability.
- [ ] The skill answers "which capability should be applied?"
- [ ] The skill is reusable by one or more roles or playbooks.
- [ ] The skill does not become a full process sequence.
- [ ] The skill lives at \`skills/<skill-name>/SKILL.md\`.
- [ ] The skill has YAML frontmatter with \`name\` and \`description\`.
- [ ] The \`description\` starts with "Use when" and describes triggering conditions.

## Operating Detail

- [ ] The skill states when to use it.
- [ ] The skill states required context.
- [ ] The skill states inputs.
- [ ] The skill uses \`### Step N\` headings inside \`## Process\`.
- [ ] The skill states checks under \`## Checks & Acceptance Criteria\`.
- [ ] The skill states outputs.
- [ ] The skill states red lines.

## Boundaries

- [ ] The skill does not invent product facts.
- [ ] The skill does not update files without confirmation when durable context changes.
- [ ] The skill does not duplicate another skill.
`,
    playbook: `# Playbook Quality Checklist

Use this checklist before accepting a \`.playbook.md\` file.

## Metadata

- [ ] The playbook has YAML frontmatter with \`name\` and \`description\`.
- [ ] The \`description\` starts with "Use when" and describes triggering conditions.

## Sequence

- [ ] The playbook defines an ordered execution sequence.
- [ ] The playbook answers "in which order should the work happen?"
- [ ] The playbook uses skills rather than duplicating all skill content.
- [ ] The playbook has clear start and end conditions.

## Inputs and Outputs

- [ ] Inputs are listed.
- [ ] Process steps are listed.
- [ ] Stop conditions are listed under \`## Stop Conditions\`.
- [ ] Acceptance criteria and outputs are listed under \`## Acceptance Criteria & Outputs\`.
- [ ] Files to update are listed under \`## Files to Update\`.
- [ ] Red lines are listed under \`## Red Lines\`.

## Guided Conversation

- [ ] If the playbook asks the founder to choose, classify, prioritize or confirm, it references \`../foundation/guided-conversation.md\`.
- [ ] Guided questions use numbered options when the decision has predictable paths.
- [ ] The founder can answer with a number or free-form text.
- [ ] Technical paths appear after the founder understands the decision.

## Scope

- [ ] The playbook belongs to the correct area.
- [ ] The playbook does not duplicate a department workflow.
- [ ] The playbook does not reference inactive or missing paths.
`,
    workflow: `# Workflow Quality Checklist

Use this checklist before accepting a \`.workflow.md\` file.

## Ownership

- [ ] The workflow belongs to a department or a truly area-owned flow.
- [ ] The workflow coordinates multiple areas, roles or stages.
- [ ] The workflow does not live in \`.leanos/workflows/\`.

## Flow

- [ ] The workflow defines trigger, required context and end state.
- [ ] The workflow identifies participating areas or roles.
- [ ] The workflow defines handoffs between owners.
- [ ] Conditional participants are marked as conditional.
- [ ] Missing active areas are handled as gaps.

## Output

- [ ] The workflow states expected outputs.
- [ ] The workflow identifies follow-up routes.
- [ ] The workflow does not duplicate area playbooks.
`,
  };

  return checklists[name] ?? `# ${toTitle(name)} Quality Checklist

- [ ] Purpose is clear.
- [ ] Owner is clear.
- [ ] Navigation is explicit.
- [ ] Output expectations are clear.
- [ ] No inactive or missing paths are required.
`;
}
