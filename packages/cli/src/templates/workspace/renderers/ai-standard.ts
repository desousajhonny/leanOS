import { rootDepartments } from "../definitions/departments.js";
import { getAllAreas, getArea } from "../selectors.js";
import type { FileEntry } from "../types.js";
import { rootAgent } from "./agent.js";
import { playbookFile, roleFile, skillFile } from "./departments.js";
import { creationInstructions, folderReadme, standardTemplate, toTitle } from "../content/shared.js";

type TemplateGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

export function aiStandardFiles(): FileEntry[] {
  const templateGroups = [
    {
      key: "agents",
      title: "Agent Templates",
      purpose: "Templates for root, department and area AGENT.md files.",
      use: "Use when creating an operating owner or routing layer.",
      files: ["agent-template.md", "root-agent-template.md", "department-agent-template.md", "area-agent-template.md"]
    },
    {
      key: "structure",
      title: "Structure Templates",
      purpose: "Templates for folders, READMEs, departments, areas and YAML structure.",
      use: "Use when creating or documenting workspace structure.",
      files: ["root-readme-template.md", "folder-readme-template.md", "area-readme-template.md", "department-template.md", "department-template.yaml", "area-template.md", "area-template.yaml"]
    },
    {
      key: "execution",
      title: "Execution Templates",
      purpose: "Templates for area-level roles, skills, playbooks and workflows.",
      use: "Use when creating operational execution assets inside an area or department workflow folder.",
      files: ["role-template.md", "role-template.yaml", "skill-template.md", "skill-template.yaml", "playbook-template.md", "playbook-template.yaml", "workflow-template.md"]
    },
    {
      key: "commands",
      title: "Command Templates",
      purpose: "Templates for portable LeanOS chat command files.",
      use: "Use when creating a stable slash-command behavior in .leanos/commands/.",
      files: ["command-template.md"]
    },
    {
      key: "github",
      title: "GitHub Templates",
      purpose: "Templates for GitHub issues, epics, sub-issues, branch naming, PRs and readiness matrices.",
      use: "Use when shaping GitHub-ready work items or repository collaboration artifacts.",
      files: ["github-issue-template.md", "github-epic-template.md", "github-subissue-template.md", "issue-readiness-matrix-template.md", "branch-name-template.md", "pull-request-template.md"]
    },
    {
      key: "review",
      title: "Review Templates",
      purpose: "Templates for reviewing code, implementation and delivery quality.",
      use: "Use when creating or applying review outputs.",
      files: ["code-review-template.md"]
    }
  ];
  const checklists = ["agent", "area", "command", "department", "playbook", "readme", "role", "skill", "workflow"];
  const instructions = ["create-agent", "create-area", "create-command", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];

  return [
    { path: "ai-standard/README.md", content: aiStandardReadme() },
    { path: "ai-standard/foundation/README.md", content: folderReadme("Foundation", "Core LeanOS foundation for asset taxonomy, navigation, naming, creation and quality.", "Start here when deciding what kind of asset exists, where it belongs or how to judge quality.", "asset-taxonomy.md", ["asset-taxonomy.md", "navigation-chain.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-documentation-rules.md"], ["../templates/", "../checklists/", "../instructions/", "../examples/"], "Load only the foundation file needed for the active decision. Do not load all foundation files by default.") },
    { path: "ai-standard/foundation/navigation-chain.md", content: "# Navigation Chain\n\nLeanOS uses owner-first navigation:\n\n`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output`\n\nUse the chain to choose the next owner, one level at a time.\n\n1. Root chooses the owning department.\n2. Department chooses a workflow or active area.\n3. Area chooses the specialist role when it has `AGENT.md`; otherwise use its `README.md` as the local map.\n4. Role points to the required skills and playbooks.\n5. Skills and playbooks shape the work.\n6. Output updates only the smallest relevant knowledge, decision or project file.\n\nDo not skip levels because a later file looks relevant.\nDo not load the whole workspace when a smaller route exists.\n" },
    { path: "ai-standard/foundation/asset-taxonomy.md", content: assetTaxonomy() },
    { path: "ai-standard/foundation/creation-rules.md", content: creationRules() },
    { path: "ai-standard/foundation/quality-criteria.md", content: qualityCriteria() },
    { path: "ai-standard/foundation/naming-conventions.md", content: "# Naming Conventions\n\n- Use lowercase kebab-case for folders and file basenames.\n- Use direct, singular asset names: `<direct-name>.role.md`, `<direct-name>.skill.md`, `<direct-name>.playbook.md`, `<direct-name>.workflow.md`.\n- Roles end with `.role.md`.\n- Skills end with `.skill.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n- Prefer domain capability names such as `accessibility.skill.md` or `design-system.skill.md` over generic action names such as `define-accessibility.skill.md`.\n- Use action verbs only when the asset is truly procedural, such as `create-branch.skill.md`.\n- Knowledge files do not use asset suffixes; use names such as `knowledge/design-system.md`.\n" },
    { path: "ai-standard/foundation/folder-documentation-rules.md", content: folderDocumentationRules() },
    { path: "ai-standard/templates/README.md", content: templatesReadme(templateGroups) },
    ...templateGroups.map((group) => ({ path: `ai-standard/templates/${group.key}/README.md`, content: templateGroupReadme(group) })),
    ...templateGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/templates/${group.key}/${file}`, content: templateContent(file) }))),
    { path: "ai-standard/checklists/README.md", content: checklistsReadme(checklists) },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklistContent(name) })),
    { path: "ai-standard/instructions/README.md", content: folderReadme("Instructions", "Instructions for creating LeanOS assets.", "Use when a command asks to create or update framework assets.", "create-role-instructions.md", instructions.map((name) => `${name}-instructions.md`), ["../templates/", "../checklists/"], "Follow instructions, then validate with the matching checklist.") },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructions(toTitle(name.replace("create-", ""))) })),
    { path: "ai-standard/examples/README.md", content: folderReadme("Examples", "Examples of LeanOS assets.", "Use as references only; prefer active area context.", "example-role-senior-developer.md", ["example-agent.md", "example-folder-readme.md", "example-role-senior-developer.md", "example-skill-check-coherence.md", "example-playbook-issue-to-pr.md"], ["../templates/", "../checklists/"], "Examples are illustrative and should not override active workspace context.") },
    { path: "ai-standard/examples/example-agent.md", content: rootAgent(getAllAreas(), rootDepartments) },
    { path: "ai-standard/examples/example-folder-readme.md", content: folderReadme("Example Folder", "Example purpose.", "Use when relevant.", "README.md", ["README.md"], ["../"], "Example notes.") },
    { path: "ai-standard/examples/example-role-senior-developer.md", content: roleFile(getArea("operations.engineering"), getArea("operations.engineering").roles[0]) },
    { path: "ai-standard/examples/example-skill-check-coherence.md", content: skillFile(getArea("strategy.product"), getArea("strategy.product").skills.find((skill) => skill.slug === "check-coherence") ?? getArea("strategy.product").skills[0]) },
    { path: "ai-standard/examples/example-playbook-issue-to-pr.md", content: playbookFile(getArea("operations.engineering"), getArea("operations.engineering").playbooks[0]) }
  ];
}

function templateContent(fileName: string): string {
  const templates: Record<string, string> = {
    "agent-template.md": agentTemplate(),
    "root-agent-template.md": rootAgentTemplate(),
    "department-agent-template.md": departmentAgentTemplate(),
    "area-agent-template.md": areaAgentTemplate(),
    "area-readme-template.md": areaReadmeTemplate(),
    "github-epic-template.md": githubEpicTemplate(),
    "github-subissue-template.md": githubSubissueTemplate(),
    "issue-readiness-matrix-template.md": issueReadinessMatrixTemplate(),
    "branch-name-template.md": branchNameTemplate(),
    "pull-request-template.md": pullRequestTemplate(),
    "code-review-template.md": codeReviewTemplate()
  };

  return templates[fileName] ?? standardTemplate(fileName);
}

function templatesReadme(groups: TemplateGroup[]): string {
  return `# Templates

## Purpose

Reusable starting structures for LeanOS framework assets and GitHub collaboration artifacts.

## When to Use

Use after selecting the asset type with \`../foundation/asset-taxonomy.md\` and before drafting a new file.

Templates are starting structures. They are not active workspace context and should not override the owning AGENT, role, skill, playbook, workflow or command.

## Categories

${groups.map((group) => `### \`${group.key}/\`\n\n${group.purpose}\n\nUse when: ${group.use}\n\nFiles:\n${group.files.map((file) => `- \`${group.key}/${file}\``).join("\n")}`).join("\n\n")}

## How to Use

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Load the matching creation instruction from \`../instructions/\`.
3. Open only the smallest matching template category.
4. Copy the matching template shape.
5. Adapt it to the active department or area.
6. Validate with the matching checklist in \`../checklists/\`.

## Red Lines

- Do not load every template by default.
- Do not use a GitHub template for a LeanOS framework asset.
- Do not use an execution template for folder documentation.
- Do not use examples as templates when a real template exists.
`;
}

function templateGroupReadme(group: TemplateGroup): string {
  return `# ${group.title}

## Purpose

${group.purpose}

## When to Use

${group.use}

## Files

${group.files.map((file) => `- \`${file}\``).join("\n")}

## Related Folders

- \`../\`
- \`../../instructions/\`
- \`../../checklists/\`
- \`../../foundation/\`

## Navigation

Use this folder only after \`../../foundation/asset-taxonomy.md\` confirms the needed asset type.

## Agent Notes

Load only the matching template file. Do not load unrelated template categories.
`;
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

## Output

- [ ] The role states the kind of output it should produce.
- [ ] The role states when to ask for clarification or confirmation.
`,
    skill: `# Skill Quality Checklist

Use this checklist before accepting a \`.skill.md\` file.

## Capability

- [ ] The skill defines one reusable capability.
- [ ] The skill answers "which capability should be applied?"
- [ ] The skill is reusable by one or more roles or playbooks.
- [ ] The skill does not become a full process sequence.

## Operating Detail

- [ ] The skill states when to use it.
- [ ] The skill states required context.
- [ ] The skill states inputs.
- [ ] The skill states checks.
- [ ] The skill states outputs.
- [ ] The skill states red lines.

## Boundaries

- [ ] The skill does not invent product facts.
- [ ] The skill does not update files without confirmation when durable context changes.
- [ ] The skill does not duplicate another skill.
`,
    playbook: `# Playbook Quality Checklist

Use this checklist before accepting a \`.playbook.md\` file.

## Sequence

- [ ] The playbook defines an ordered execution sequence.
- [ ] The playbook answers "in which order should the work happen?"
- [ ] The playbook uses skills rather than duplicating all skill content.
- [ ] The playbook has clear start and end conditions.

## Inputs and Outputs

- [ ] Inputs are listed.
- [ ] Process steps are listed.
- [ ] Outputs are listed.
- [ ] Files to update are listed when applicable.
- [ ] Confirmation is required before durable file updates.

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
    command: `# Command Quality Checklist

Use this checklist before accepting a \`.leanos/commands/<command>.md\` file.

## Intent

- [ ] The command maps to a stable user intent.
- [ ] The command is portable across VS Code, Claude, Codex, terminal agents and chat interfaces.
- [ ] The command does not duplicate natural-language routing unless stable loading rules are needed.

## Loading

- [ ] The command defines \`Load First\` or equivalent context.
- [ ] The command loads only necessary context.
- [ ] The command does not require missing or inactive paths without warning.

## Safety

- [ ] Allowed updates are explicit.
- [ ] Forbidden updates are explicit.
- [ ] Remote writes require confirmation and should be delegated to tool-capable scripts/capabilities.
- [ ] Secrets are never requested into tracked files.

## Output

- [ ] The command defines expected output.
- [ ] The command asks for confirmation before durable changes.
`
  };

  return checklists[name] ?? `# ${toTitle(name)} Quality Checklist

- [ ] Purpose is clear.
- [ ] Owner is clear.
- [ ] Navigation is explicit.
- [ ] Output expectations are clear.
- [ ] No inactive or missing paths are required.
`;
}

function aiStandardReadme(): string {
  return `# AI Standard

## Purpose

LeanOS standards for creating, reviewing and routing AI-native workspace assets.

## When to Use

Use this folder before creating or changing agents, departments, areas, roles, skills, playbooks, workflows, commands, templates, checklists or instructions.

## How to Navigate

Load only the smallest route needed:

1. Use \`foundation/asset-taxonomy.md\` when deciding what type of asset something is.
2. Use \`foundation/navigation-chain.md\` when deciding how an agent should route work.
3. Use \`foundation/creation-rules.md\` before creating or changing framework assets.
4. Use \`foundation/naming-conventions.md\` before naming files or folders.
5. Use \`foundation/quality-criteria.md\` before accepting an asset.
6. Use \`foundation/folder-documentation-rules.md\` when creating or reviewing folder documentation.
7. Use \`instructions/\` for the step-by-step creation process.
8. Use \`templates/\` for the starting structure.
9. Use \`checklists/\` before final output.
10. Use \`examples/\` only as references.

## Routes

### \`foundation/\`

Core conceptual rules. Use when deciding what belongs where, how assets relate, how navigation works or whether a proposed asset is valid.

### \`templates/\`

Reusable starting structures. Use after choosing the asset type and before drafting the file.

### \`checklists/\`

Quality gates. Use before accepting a newly created or modified asset.

### \`instructions/\`

Creation procedures. Use when the user asks to create or update a LeanOS asset.

### \`examples/\`

Illustrative examples. Use only for reference; active workspace context wins.

## Files

- \`foundation/\`
- \`templates/\`
- \`checklists/\`
- \`instructions/\`
- \`examples/\`

## Related Folders

- \`../AGENT.md\`
- \`../.leanos/commands/\`

## Agent Notes

Do not load all of \`ai-standard/\` by default. Choose the smallest foundation file, instruction, template and checklist needed for the active request.
`;
}

function creationRules(): string {
  return `# Creation Rules

Use these rules before creating or changing any LeanOS framework asset.

## Purpose

Creation rules protect the workspace from asset sprawl, duplicated responsibilities and route-breaking files.

They answer:

- Should this asset exist?
- Where should it live?
- Which existing asset should own this responsibility?
- What must be loaded before creating it?
- What should not be created?

## Load First

Before creating an asset, load:

1. \`asset-taxonomy.md\` to confirm the asset type.
2. \`navigation-chain.md\` to confirm where the asset belongs.
3. \`naming-conventions.md\` to name the file correctly.
4. The matching instruction in \`../instructions/\`.
5. The matching template in \`../templates/\`.
6. The matching checklist in \`../checklists/\`.

## Creation Decision

Create a new asset only when all are true:

- The request cannot be handled by an existing asset.
- The new asset has a clear owner in the Navigation Chain.
- The new asset has a stable reusable purpose.
- The asset will reduce ambiguity for future models.
- The user confirms the creation or update.

Do not create an asset when:

- A README note is enough.
- A role can reference an existing skill.
- A skill can be reused instead of a new skill.
- A playbook would duplicate an existing workflow.
- The asset is only a one-off answer to the current user.
- The asset would bypass department or area ownership.

## Placement Rules

- Root \`AGENT.md\` lives at workspace root.
- Department \`AGENT.md\`, \`README.md\`, \`department.yaml\` and \`workflows/\` live at department root.
- Area \`AGENT.md\`, \`README.md\`, \`area.yaml\`, \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\` live inside the area.
- Roles, skills and playbooks do not live directly under root departments.
- Business workflows live in departments or areas, not in \`.leanos/\`.
- Runtime command instructions live in \`.leanos/commands/\`.
- Framework standards, templates, checklists, instructions and examples live in \`ai-standard/\`.

## Responsibility Rules

- \`AGENT.md\` routes and sets operating boundaries.
- \`README.md\` maps a folder.
- \`department.yaml\` and \`area.yaml\` provide machine-readable structure.
- Role files define who acts.
- Skill files define reusable capabilities.
- Playbook files define execution sequence.
- Knowledge files store confirmed facts and decisions.
- Workflow files coordinate multi-step work across owners.
- Command files define portable chat command behavior.

## Confirmation Rule

Before writing or changing framework assets:

1. State the asset type.
2. State the owner path.
3. State why an existing asset is not enough.
4. State which template and checklist will be used.
5. Ask for explicit confirmation.

## Red Lines

- Do not invent missing roles, skills, playbooks, workflows, commands or templates.
- Do not create assets outside the owning department or area.
- Do not place product or company facts inside framework operating assets.
- Do not update \`ai-standard/\`, \`.leanos/commands/\`, roles, skills, playbooks or workflows during \`/start-leanos\`.
- Do not create a broad asset when a narrow one would be clearer.
- Do not create files just to make the workspace look complete.

## Design Example

If Design needs a reusable capability for evaluating PRs:

- Asset type: skill.
- Owner: \`operations/design/skills/\`.
- File: \`design-review.skill.md\`.
- Role usage: Product Designer, Accessibility Specialist or UX Writer can load it when relevant.
- Do not create \`design-review.playbook.md\` unless there is a repeatable execution sequence beyond the skill itself.
`;
}

function qualityCriteria(): string {
  return `# Quality Criteria

Use these criteria to judge whether a LeanOS asset is good enough to keep.

## Purpose

Quality criteria prevent vague assets, duplicated logic and confusing routes.

They answer:

- Is this asset clear?
- Is it owned by the right level?
- Does it load only necessary context?
- Does it preserve the Navigation Chain?
- Does it help future models act better?

## Universal Criteria

Every LeanOS asset should have:

- Clear purpose.
- Explicit owner.
- Correct location.
- Minimal context loading.
- Clear inputs.
- Clear outputs.
- Boundaries and red lines when relevant.
- References to related assets only when useful.
- No duplicated responsibility.
- No invented product or company facts.

## Routing Quality

A good asset:

- Keeps root routing at department level.
- Lets department AGENTs choose workflows or areas.
- Lets area AGENTs choose roles.
- Lets roles load skills and playbooks.
- Does not skip levels because a later file looks relevant.
- Does not ask a model to load the whole workspace.

## Content Quality

A good asset:

- Uses direct language.
- Says when to use it.
- Says when not to use it.
- Names the files it may update.
- Separates facts from assumptions.
- Uses \`not applicable\` explicitly when a dimension does not apply.
- Asks for confirmation before mutating durable files.

## Asset-Specific Signals

| Asset | Quality Signal |
| --- | --- |
| \`AGENT.md\` | Routes to the next owner without becoming a giant inventory. |
| \`README.md\` | Explains folder purpose, files and navigation without becoming an executor. |
| \`role\` | Defines a clear operating hat and points to relevant skills/playbooks. |
| \`skill\` | Describes a reusable capability, checks and outputs. |
| \`playbook\` | Provides an ordered execution sequence with inputs and outputs. |
| \`knowledge\` | Stores confirmed context without process instructions. |
| \`workflow\` | Coordinates multi-area or multi-stage work. |
| \`command\` | Loads minimal context and defines allowed/forbidden updates. |

## Rejection Criteria

Reject or revise an asset when:

- It duplicates another asset.
- It mixes role, skill, playbook and knowledge responsibilities.
- It has no clear owner.
- It points to paths that do not exist.
- It recommends inactive areas without warning.
- It stores secrets or token values.
- It makes implementation decisions without loading the required role, skill and playbook.
- It updates source-of-truth or framework files without confirmation.

## Final Check

Before accepting an asset, answer:

1. What type of asset is this?
2. Who owns it?
3. What question does it answer?
4. What should load it?
5. What should it never do?
6. Which checklist validates it?
`;
}

function folderDocumentationRules(): string {
  return `# Folder Documentation Rules

Use these rules when creating or reviewing folder documentation, especially \`README.md\` files.

## Purpose

Folder documentation helps humans and models understand where they are, what belongs there and where to go next.

It answers:

- What is this folder for?
- When should an agent enter it?
- Which files are important?
- Which files are source of truth, operating assets or examples?
- Where should the agent route next?

## README Responsibility

A folder README is a map, not the operator.

It should:

- Explain the folder purpose.
- Explain when to use the folder.
- List important files and subfolders.
- Point to the operating owner when one exists.
- Identify related folders.
- Provide navigation notes.

It should not:

- Replace \`AGENT.md\` routing.
- Replace role instructions.
- Replace skill capabilities.
- Replace playbook sequence.
- Store product facts that belong in knowledge files.
- Become a catch-all document.

## Required Sections

Use these sections for important folders:

- \`# <Folder Name>\`
- \`## Purpose\`
- \`## When to Use\`
- \`## Source of Truth\` when the folder owns knowledge or durable context.
- \`## Files\`
- \`## Related Folders\`
- \`## Navigation\`
- \`## Agent Notes\`

If a section does not apply, omit it or state \`Not applicable\` when the absence matters.

## Navigation Rules

- If the folder has \`AGENT.md\`, tell agents to start there for operational work.
- If the folder has \`department.yaml\` or \`area.yaml\`, mention that it provides machine-readable structure.
- If the folder has \`roles/\`, \`skills/\` or \`playbooks/\`, explain that the area owner selects them.
- If the folder contains examples, say examples are references only.
- If the folder contains templates, say templates are starting structures, not active workspace context.

## Folder Type Examples

### Department Folder

Example: \`operations/README.md\`

- Explains what Operations owns.
- Points to \`operations/AGENT.md\`.
- Lists active areas.
- Points to \`workflows/\` for cross-area work.
- Does not list every role, skill or playbook from every area.

### Area Folder

Example: \`operations/design/README.md\`

- Explains what Design owns.
- Points to \`operations/design/AGENT.md\`.
- Lists \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\`.
- Explains common paths at a high level.
- Does not execute the Design process itself.

### Knowledge Folder

Example: \`operations/design/knowledge/README.md\`

- Explains which durable Design facts live there.
- Lists knowledge files.
- Says updates require confirmation.
- Does not define skills or playbook sequence.

### AI Standard Folder

Example: \`ai-standard/README.md\`

- Routes to foundation, templates, checklists, instructions and examples.
- Explains when to use each route.
- Tells models not to load everything by default.

## Red Lines

- Do not make folder README files huge inventories.
- Do not duplicate all content from child files.
- Do not document paths that do not exist.
- Do not point directly to a role when an area AGENT should route first.
- Do not hide process rules inside a README when a playbook should own them.
`;
}

function assetTaxonomy(): string {
  return `# Asset Taxonomy

Use this taxonomy before creating, changing or routing LeanOS workspace assets.

## Core Rule

\`\`\`text
Role = who acts.
Skill = capability used.
Playbook = execution sequence.
Knowledge = information/source of truth.
\`\`\`

Do not use one asset type to do another asset type's job.

## Quick Reference

| Asset | What It Is | Question It Answers |
| --- | --- | --- |
| \`AGENT.md\` | Operating owner and router for a workspace level | "Who owns routing at this level?" |
| \`README.md\` | Directory map and human explanation | "What is here and when should I use it?" |
| \`department.yaml\` | Machine-readable department structure | "Which areas and workflows belong to this department?" |
| \`area.yaml\` | Machine-readable area structure | "Which roles, skills, playbooks and knowledge belong to this area?" |
| \`role\` | Persona/responsibility used by the agent | "Which hat should the agent wear?" |
| \`skill\` | Reusable capability used by a role | "Which capability should be applied?" |
| \`playbook\` | Practical execution sequence | "In which order should the work happen?" |
| \`knowledge\` | Context, facts and source of truth | "What do we know about this?" |
| \`workflow\` | Multi-step flow across areas or a department | "How should larger work move across owners?" |
| \`command\` | Portable chat instruction for a known intent | "What should happen when the user invokes this command?" |

## Asset Types

### \`AGENT.md\`

An \`AGENT.md\` is the operating owner for a level of the workspace.

- Lives at the root, department root or selected area root.
- Answers: "Who decides the next route here?"
- Create when a level needs routing rules, red lines or delegation logic.
- Do not create when a README map is enough.
- Agents should load it before entering lower-level roles, skills or playbooks.

Example: \`operations/design/AGENT.md\` acts as the Design area lead. It chooses between Product Designer, UX Researcher, Accessibility Specialist and UX Writer.

### \`README.md\`

A \`README.md\` is the map for a folder.

- Lives in every important folder.
- Answers: "What is this folder for, what files exist here and how do I navigate?"
- Create for folders that humans or models will enter.
- Do not use it as a long operating manual when an \`AGENT.md\`, role, skill or playbook should own that detail.
- Agents should use it to understand local structure.

Example: \`operations/design/README.md\` explains the Design area, its knowledge files, roles, skills and playbooks.

### \`department.yaml\`

\`department.yaml\` is the structured map for a root department.

- Lives at \`strategy/department.yaml\`, \`operations/department.yaml\` or \`growth/department.yaml\`.
- Answers: "Which areas and workflows are active in this department?"
- Create for every root department.
- Do not store narrative product context or company facts in it.
- Agents should use it when they need machine-readable structure.

Example: \`operations/department.yaml\` lists areas such as Core, Design, Engineering, DevOps and Security.

### \`area.yaml\`

\`area.yaml\` is the structured map for an area.

- Lives inside an area, such as \`operations/design/area.yaml\`.
- Answers: "Which roles, skills, playbooks and knowledge files belong here?"
- Create for every active area.
- Do not use it as a replacement for role, skill or playbook instructions.
- Agents should use it to verify available local assets.

Example: \`operations/design/area.yaml\` lists Design roles, skills, playbooks and \`knowledge/\` files.

### Role

A role is an operating persona and responsibility boundary.

- Lives in \`<area>/roles/<direct-name>.role.md\`.
- Answers: "With which hat should the agent act?"
- Create when a recurring responsibility needs a distinct point of view.
- Do not create a role for a one-off task or a simple capability.
- Agents should select one role before loading skills or playbooks.

Example: \`operations/design/roles/product-designer.role.md\` owns product design decisions and points to \`design-system.skill.md\`, \`user-flow-mapping.skill.md\`, \`screen-specification.skill.md\` and \`design-review.skill.md\`.

### Skill

A skill is a reusable capability.

- Lives in \`<area>/skills/<direct-name>.skill.md\`.
- Answers: "Which capability should be applied?"
- Create when the same capability is reused by one or more roles or playbooks.
- Do not make a skill a full process; that belongs in a playbook.
- Agents should load only the skills required by the active role and task.

Example: \`operations/design/skills/accessibility.skill.md\` defines how to apply accessibility checks and WCAG 2.2 AA expectations.

### Playbook

A playbook is a practical execution sequence.

- Lives in \`<area>/playbooks/<direct-name>.playbook.md\`.
- Answers: "In which order should this work happen?"
- Create when a task has repeatable steps, inputs, outputs and file update rules.
- Do not create a playbook for a single check or isolated capability.
- Agents should use it after selecting the role and loading required skills.

Example: \`operations/design/playbooks/design-foundation.playbook.md\` sequences design-system, accessibility and user-flow work before implementation.

### Knowledge

Knowledge files hold context, facts, decisions and source-of-truth notes.

- Lives in \`<area>/knowledge/\` when the area uses reusable knowledge.
- Answers: "What do we know about this?"
- Create when information must persist across tasks.
- Do not put operating instructions, role behavior or process steps here.
- Agents should update knowledge only after explicit user confirmation.

Example: \`operations/design/knowledge/design-system.md\` stores the design-system baseline. It does not decide how to create the design system; the skill and playbook do that.

### Workflow

A workflow is a multi-step flow that moves work across areas or across a department.

- Lives in \`<department>/workflows/\` or, when truly area-owned, \`<area>/workflows/\`.
- Answers: "How should larger work move across owners?"
- Create when the task spans multiple roles, areas or stages.
- Do not place business workflows in \`.leanos/workflows/\`; \`.leanos/\` is runtime support.
- Agents should use workflows to coordinate owners, then enter the relevant area and role.

Example: \`operations/workflows/issue-delivery-cycle.workflow.md\` can coordinate Core, Design, Engineering and Security for issue delivery.

### Command

A command is a portable chat instruction for a known user intent.

- Lives in \`.leanos/commands/<command>.md\`.
- Answers: "What should happen when the user invokes this command?"
- Create when a common chat intent needs stable loading rules.
- Do not create commands for every possible workflow; natural language can route through AGENT.md.
- Agents should load the command file before acting on a matching slash command.

Example: \`.leanos/commands/define-design.md\` tells the agent how to prepare Design foundation safely.

## Design Example

If the founder says, "define the design before implementation":

1. Root \`AGENT.md\` routes to \`operations/AGENT.md\`.
2. Operations routes to \`operations/design/AGENT.md\`.
3. Design area AGENT chooses \`roles/product-designer.role.md\`.
4. The role loads skills:
   - \`skills/design-system.skill.md\`
   - \`skills/accessibility.skill.md\`
   - \`skills/user-flow-mapping.skill.md\`
5. The work follows \`playbooks/design-foundation.playbook.md\`.
6. Confirmed outputs update:
   - \`knowledge/design-system.md\`
   - \`knowledge/accessibility.md\`
   - \`knowledge/user-flows.md\`

This keeps responsibilities separated:

- The role defines the operating perspective.
- The skills define capabilities.
- The playbook defines order.
- The knowledge files store confirmed facts and decisions.
`;
}

function agentTemplate(): string {
  return `# Agent Template

Use the smallest matching agent template.

## Choose One

- Root workspace agent: \`root-agent-template.md\`
- Department agent: \`department-agent-template.md\`
- Area agent: \`area-agent-template.md\`

## Rule

\`AGENT.md\` is the operating owner for its level. It should route work, set red lines and delegate details to the next owner. Do not turn an AGENT.md into a full inventory of every workflow, role, skill or playbook.
`;
}

function rootAgentTemplate(): string {
  return `# <Workspace> Agent

You are the chief operating agent for this workspace.

Your job is to help the user operate a product company with strategic coherence before and during implementation.

## Start Here

Read these files first:

- \`leanos.yaml\`
- \`.leanos/context/workspace-summary.md\`
- \`.leanos/context/current-focus.md\`
- \`.leanos/context/next-actions.md\`
- \`.leanos/index/routing-map.yaml\`

## Red Lines / Non-Negotiable Rules

- For every LeanOS task, command, workflow, file update, strategy decision, product decision, implementation request or review request, always start with the Response Header.
- Never execute a routed LeanOS task before showing the route.
- Use \`not applicable\` only when a Response Header field truly does not apply.
- Enter the owning department or area before acting.
- When an area has its own \`AGENT.md\`, use it as the area operating owner before loading roles, skills or playbooks.
- Do not invent missing workflows, roles, skills, playbooks, commands or templates.
- Do not load the whole workspace when a smaller route exists.
- Do not write secrets to tracked files.
- Ask before modifying knowledge, decision or framework files.
- During \`/start-leanos\`, do not enrich roles, skills, playbooks, workflows, commands or \`ai-standard/\` with company/product context.
- Do not modify source-of-truth, decision, framework or runtime files until the user explicitly confirms the proposed changes.

## Response Header

For every routed LeanOS task, start with:

Active Department:
Active Area:
Active Role:
Loaded Skills:
Relevant Playbook:
Loaded Context:

## Command Handling

LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.

When the user invokes \`/start-leanos\`, load \`.leanos/commands/start-leanos.md\` and follow it.

When the user invokes legacy \`/leanos-init\`, treat it as \`/start-leanos\`.

For any LeanOS slash command, normalize the command to kebab-case and load \`.leanos/commands/<command>.md\` before acting.

If the command file is missing, do not invent the command. Explain what is missing and route through the active context instead.

## Natural Language Handling

If a natural-language request clearly matches an existing LeanOS command, load the matching command file before acting.

Examples:

- "help me define the ICP" -> \`.leanos/commands/define-icp.md\`
- "define the MVP" -> \`.leanos/commands/define-mvp.md\`
- "review this PR" -> \`.leanos/commands/review-pr.md\`

If no command clearly matches, route through the Navigation Chain.

## Navigation Chain

LeanOS uses owner-first navigation:

\`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

Use the chain to choose the next owner, one level at a time.

1. Root chooses the owning department.
2. Department chooses a workflow or active area.
3. Area chooses the specialist role when it has \`AGENT.md\`; otherwise use its \`README.md\` as the local map.
4. Role points to the required skills and playbooks.
5. Skills and playbooks shape the work.
6. Output updates only the smallest relevant knowledge, decision or project file.

Do not skip levels because a later file looks relevant.
Do not load the whole workspace when a smaller route exists.

## File Responsibilities

- \`AGENT.md\`: operating owner for this level.
- \`README.md\`: directory map and explanation.
- \`department.yaml\` and \`area.yaml\`: machine-readable structure.
- \`workflows/\`: multi-step flows owned by the department or area that contains them.
- \`roles/\`, \`skills/\` and \`playbooks/\`: area-level execution assets.

## Root Routing

Use this section only to choose the owning department. The department \`AGENT.md\` chooses the workflow or area.

- <Department>: \`<department>/AGENT.md\`
  Use for <request types>.
  Map: \`<department>/README.md\`

## LeanOS Runtime

\`.leanos/\` contains runtime files for commands, context, indexes and VS Code integration.
\`.leanos/\` does not own business workflows. Operational workflows live in root departments or their areas.

\`ai-standard/\` contains reusable templates, instructions and quality criteria.

## Asset Creation Routing

If the user asks to create or change a LeanOS role, skill, playbook, workflow, command, template, checklist or standard:

1. Load \`ai-standard/README.md\`.
2. Load the matching creation instruction from \`ai-standard/instructions/\`.
3. Use the matching template from \`ai-standard/templates/\`.
4. Validate with the matching checklist from \`ai-standard/checklists/\`.
5. Ask before writing framework assets.
`;
}

function departmentAgentTemplate(): string {
  return `# <Department> Agent

You are the operating owner for this department.

Use \`README.md\` as the directory map. Use \`department.yaml\` when machine-readable structure matters.

Roles, skills and playbooks do not live at the department root. They live inside active areas.

## Operating Scope

Describe what this department owns.

## Routing Rules

1. If the request spans multiple active areas, open \`workflows/README.md\` and choose the smallest matching workflow.
2. If the request belongs to one area, route to that area \`AGENT.md\` when present; otherwise route to its README.
3. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
4. Do not load roles, skills or playbooks before entering the owning area.

## Active Areas

- <Area>: \`<area>/AGENT.md\` or \`<area>/README.md\` - <purpose>

## Workflow Entry

- Department workflows: \`workflows/README.md\`

Use workflows for cross-area sequencing. Use area playbooks for tactical execution inside one area.
`;
}

function areaAgentTemplate(): string {
  return `# <Area> Agent

You are the <Area Lead> for this workspace.

This \`AGENT.md\` is the operating owner for the area.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Operating Scope

Describe what this area lead owns and how it protects quality.

## Role Routing

Choose the smallest specialist role for the request:

- <Specialist Role>: \`roles/<role>.role.md\` - use when <condition>.

## Routing Rules

1. Start from this area AGENT for operational work inside the area.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. If the request needs a missing specialist, skill or playbook, explain the gap and ask before creating it.
5. Keep reusable area knowledge in \`knowledge/\` when the area uses a knowledge folder.

## Navigation

\`<area>/AGENT.md -> Role -> Skills -> Playbook -> Output\`
`;
}

function areaReadmeTemplate(): string {
  return `# <Area>

## Purpose

What this area owns.

## When to Use

- <intent or situation>

## Source of Truth

- \`<file>.md\`

## Navigation

1. If this area has \`AGENT.md\`, start there for operational routing.
2. Use this README as the directory map.
3. After the area owner selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- \`AGENT.md\`: optional area operating owner.
- \`README.md\`: area map and explanation.
- \`area.yaml\`: machine-readable structure for this area.
- \`roles/\`: operating personas for this area.
- \`skills/\`: focused capabilities used by roles.
- \`playbooks/\`: tactical execution sequences.

## Common Paths

- <request>: role \`roles/<role>.role.md\` -> skill \`skills/<skill>.skill.md\` -> playbook \`playbooks/<playbook>.playbook.md\`.
`;
}

function githubEpicTemplate(): string {
  return `# Epic: <title>

## Outcome

What business, user or validation outcome this epic should create.

## Strategic Context

- Product:
- ICP:
- Problem:
- Value proposition:
- Validation assumption:
- Evidence status:

## MVP Linkage

- MVP scope:
- Non-goals:
- Acceptance criteria:
- Roadmap item:
- Milestone:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Product Criteria

- User value:
- Jobs to be done:
- Acceptance criteria:
- Learning or success signal:

## Design Criteria

Use only when the epic affects user experience.

- User flow:
- Screens or states:
- UX constraints:
- Accessibility considerations:
- Design dependency:

If not applicable, write: "Not applicable; no user-facing design change."

## Engineering Criteria

- Technical approach:
- System boundaries:
- Data or API impact:
- Test expectations:
- Operational risks:

## Security Criteria

Use when the epic involves data, auth, permissions, privacy, abuse risk or compliance.

- Data involved:
- Auth or permissions:
- Privacy considerations:
- Abuse cases:
- Compliance constraints:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Dependencies

- Product:
- Design:
- Engineering:
- Security:

## Sub-issue Breakdown

- Status: not_started
- Expected sub-issues:
- Open questions:
`;
}

function githubSubissueTemplate(): string {
  return `# <sub-issue title>

## Parent Epic

- Epic:
- Milestone:
- Roadmap item:

## Purpose

Why this issue exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Product Criteria

- User value:
- Acceptance criteria:
- Success or learning signal:

## Design Criteria

Use only when this sub-issue changes a user-facing flow, screen, state, copy or interaction.

- Flow:
- Screens or states:
- UX constraints:
- Accessibility:
- Design asset or decision needed:

If not applicable, write: "Not applicable; no user-facing design change."

## Engineering Criteria

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Security Criteria

Use when this sub-issue touches data, auth, permissions, privacy, abuse risk or compliance.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied or explicitly not applicable
- [ ] Engineering criteria satisfied
- [ ] Security criteria satisfied or explicitly not applicable
- [ ] Tests or validation plan defined
- [ ] Parent epic updated if needed
`;
}

function issueReadinessMatrixTemplate(): string {
  return `# Issue Readiness Matrix

Use this before creating epics, sub-issues or implementation plans.

| Dimension | Required When | Required Output | Status |
| --- | --- | --- | --- |
| Product | Always | user, problem, outcome, acceptance criteria, learning signal | TBD |
| Design | User-facing flow, screen, state, copy or interaction changes | flow, states, UX constraints, accessibility notes | not_applicable/TBD |
| Engineering | Always for implementation work | technical approach, boundaries, dependencies, test plan | TBD |
| Security | Data, auth, permissions, privacy, abuse or compliance is involved | data classification, permission rules, privacy/security criteria | not_applicable/TBD |

## Readiness Rule

Do not create implementation-ready sub-issues until Product and Engineering are clear.

Design is required only when user experience is affected.

Security is required only when the issue has a security-sensitive surface.
`;
}

function branchNameTemplate(): string {
  return `# Branch Name Template

Use focused branches tied to a GitHub issue.

## Format

\`\`\`text
issue/<issue-number>-<short-kebab-slug>
\`\`\`

## Examples

\`\`\`text
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Rules

- Always include the real issue number.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- Do not implement issue work on the default branch.
- If the branch already exists, ask before continuing.
`;
}

function pullRequestTemplate(): string {
  return `# Pull Request

## Summary

What changed and why.

## Linked Issue

Closes #

## Parent Epic

Epic #

## LeanOS Context

- Department:
- Area:
- Role:
- Skills:
- Playbook:

## Product / MVP Alignment

- Roadmap item:
- MVP scope:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Security Notes

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Automated tests run or updated
- [ ] Manual validation completed or explained

## Risks

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## LeanOS Review Checklist

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Tests run or explained
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] No unrelated scope added
`;
}

function codeReviewTemplate(): string {
  return `# Code Review Template

## Review Context

- PR:
- Linked issue:
- Parent epic:
- MVP scope:
- Acceptance criteria:

## Findings

List findings by severity.

| Severity | File/Area | Finding | Required Change |
| --- | --- | --- | --- |
| blocker/high/medium/low | TBD | TBD | TBD |

## Review Dimensions

- Correctness
- Scope control
- Tests
- Architecture
- Security/privacy when applicable
- Design/UX when applicable
- LeanOS source-of-truth alignment

## Decision

- [ ] Ready to merge
- [ ] Needs changes
- [ ] Blocked by missing context

## Open Questions

TBD
`;
}
