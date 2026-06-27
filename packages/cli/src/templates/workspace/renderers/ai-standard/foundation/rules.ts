export function aiStandardReadme(): string {
  return `# AI Standard

## Purpose

LeanOS source-of-truth for creating, reviewing and routing AI-native framework assets.

## When to Use

Use this folder before creating or changing agents, departments, areas, roles, skills, playbooks, workflows, commands, templates, checklists or instructions.

## Fast Route

Use this route for most asset creation work:

1. Decide the asset type with \`foundation/asset-taxonomy.md\`.
2. Confirm placement and boundaries with \`foundation/creation-rules.md\`.
3. Confirm naming with \`foundation/naming-conventions.md\`.
4. Use \`foundation/guided-conversation.md\` when the asset asks the founder to decide, classify, prioritize or confirm.
5. Load the matching file in \`instructions/\`.
6. Use the matching starter in \`templates/\`.
7. Validate the result with the matching file in \`checklists/\`.
8. Open \`examples/\` only if a reference would improve quality.

## Decision Map

| Need | Go To | Why |
| --- | --- | --- |
| Decide what kind of asset something is | \`foundation/asset-taxonomy.md\` | Defines AGENT, README, YAML, role, skill, playbook, knowledge, workflow and command. |
| Decide how a model should move through the workspace | \`foundation/navigation-chain.md\` | Defines owner-first navigation and prevents route skipping. |
| Decide the next founder progression stage | \`foundation/founder-progression-model.md\` | Defines Strategy-first progression, gates, activation_required and Chief routing behavior. |
| Check if a founder progression move is allowed | \`foundation/progression-gates.md\` | Defines required context, allowed next stages and blocked next stages. |
| Design founder-friendly questions or decisions | \`foundation/guided-conversation.md\` | Defines numbered options, decision pauses and confirmation prompts. |
| Decide whether a new file should exist | \`foundation/creation-rules.md\` | Prevents asset sprawl and duplicated ownership. |
| Name a file or folder | \`foundation/naming-conventions.md\` | Keeps names predictable and machine-readable. |
| Judge quality when no specific checklist is enough | \`foundation/quality-criteria.md\` | Provides universal quality and rejection criteria. |
| Create a folder README | \`foundation/folder-documentation-rules.md\` and \`instructions/create-readme-instructions.md\` | Keeps README files as maps, not executors. |
| Create an asset | \`instructions/\` then \`templates/\` | Gives the procedure and the starting shape. |
| Review an asset before accepting it | \`checklists/\` | Applies the right quality gate for the asset type. |
| See what good looks like | \`examples/\` | Provides reference shape only, not active context. |

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

## Creation Flow

For any new LeanOS asset:

1. Load only this README and the smallest matching files.
2. State the selected asset type and owner.
3. State the target path.
4. Use the matching instruction and template.
5. Validate with the matching checklist.
6. Ask before writing framework files.

## Do Not Load By Default

- Do not load every foundation file.
- Do not load every template category.
- Do not load every checklist.
- Do not load examples unless a reference is needed.
- Do not let examples override active workspace context.

## Files

- \`foundation/\`
- \`templates/\`
- \`checklists/\`
- \`instructions/\`
- \`examples/\`

## Related Folders

- \`../AGENT.md\`

## Agent Notes

Do not load all of \`ai-standard/\` by default. Choose the smallest foundation file, instruction, template and checklist needed for the active request.

If the next route is unclear, start with \`foundation/asset-taxonomy.md\`.
`;
}

export function creationRules(): string {
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

## Confirmation Rule

Before writing or changing framework assets:

1. State the asset type.
2. State the owner path.
3. State why an existing asset is not enough.
4. State which template and checklist will be used.
5. Ask for explicit confirmation.

## Red Lines

- Do not invent missing roles, skills, playbooks, workflows or templates.
- Do not create assets outside the owning department or area.
- Do not place product or company facts inside framework operating assets.
- Do not update \`ai-standard/\`, roles, skills, playbooks or workflows during startup.
- Do not create a broad asset when a narrow one would be clearer.
- Do not create files just to make the workspace look complete.

## Design Example

If Design needs a reusable capability for evaluating PRs:

- Asset type: skill.
- Owner: \`operations/design/skills/\`.
- File: \`design-review/SKILL.md\`.
- Role usage: Product Designer, Accessibility Specialist or UX Writer can load it when relevant.
- Do not create \`design-review.playbook.md\` unless there is a repeatable execution sequence beyond the skill itself.
`;
}

export function qualityCriteria(): string {
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

export function folderDocumentationRules(): string {
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

export function assetTaxonomy(): string {
  return `# Asset Taxonomy

Use this taxonomy before creating, changing or routing LeanOS workspace assets.

## Core Rule

\`\`\`text
Role = who acts.
Skill = capability used.
Playbook = practical task execution inside an area.
Knowledge = information/source of truth.
Workflow = coordination across areas, stages or handoffs.
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
| \`playbook\` | Practical task execution inside an area | "In which order should this area execute the task?" |
| \`knowledge\` | Context, facts and source of truth | "What do we know about this?" |
| \`workflow\` | Multi-area, multi-stage or handoff coordination | "How should larger work move across owners?" |
| \`command\` | Portable chat instruction for a known intent | "What should happen when the user invokes this command?" |

## Workflow vs Playbook

Use this distinction when deciding where a process belongs:

\`\`\`text
Workflow = coordinates multiple areas, stages or handoffs.
Playbook = executes a practical task inside one area.
\`\`\`

A workflow should explain who participates, what handoffs happen and when the work moves from one owner to another.
A playbook should explain the concrete steps an area follows after the correct owner, role and skills are selected.

If the process actively coordinates Product Ops, Design, Engineering or Security across owners, it is probably a workflow.
If the process changes state inside one owning area, such as Product Ops creating an Epic or Feature drafts, it is probably a playbook.

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

Example: \`operations/department.yaml\` lists areas such as Product Ops, Design, Engineering, DevOps and Security.

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

Example: \`operations/design/roles/product-designer.role.md\` owns product design decisions and points to \`design-system/SKILL.md\`, \`user-flow-mapping/SKILL.md\`, \`screen-specification/SKILL.md\` and \`design-review/SKILL.md\`.

### Skill

A skill is a reusable capability.

- Lives in \`<area>/skills/<direct-name>/SKILL.md\`.
- Answers: "Which capability should be applied?"
- Create when the same capability is reused by one or more roles or playbooks.
- Do not make a skill a full process; that belongs in a playbook.
- Agents should load only the skills required by the active role and task.

Example: \`operations/design/skills/accessibility/SKILL.md\` defines how to apply accessibility checks and WCAG 2.2 AA expectations.

### Playbook

A playbook is a practical execution sequence inside one area.

- Lives in \`<area>/playbooks/<direct-name>.playbook.md\`.
- Answers: "In which order should this area execute the task?"
- Create when a task has repeatable steps, inputs, outputs and file update rules.
- Do not create a playbook for a single check or isolated capability.
- Do not use a playbook to coordinate multiple areas or cross-department handoffs.
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

A workflow coordinates multiple areas, stages or handoffs.

- Lives in \`<department>/workflows/\` or, when truly area-owned, \`<area>/workflows/\`.
- Answers: "How should larger work move across owners?"
- Create when the task spans multiple roles, areas or stages.
- Do not create a workflow for practical execution inside one area; use a playbook for that.
- Do not place business workflows in \`.leanos/workflows/\`; \`.leanos/\` is runtime support.
- Agents should use workflows to coordinate owners, then enter the relevant area and role.

Example: \`operations/workflows/feature-to-delivery-cycle.workflow.md\` can coordinate Product Ops, Design, Engineering and Security for feature delivery.

## Design Example

If the founder says, "define the design before implementation":

1. Root \`AGENT.md\` routes to \`operations/AGENT.md\`.
2. Operations routes to \`operations/design/AGENT.md\`.
3. Design area AGENT chooses \`roles/product-designer.role.md\`.
4. The role loads skills:
   - \`skills/design-system/SKILL.md\`
   - \`skills/accessibility/SKILL.md\`
   - \`skills/user-flow-mapping/SKILL.md\`
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
