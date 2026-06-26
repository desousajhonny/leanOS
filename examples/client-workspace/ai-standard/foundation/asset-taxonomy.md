# Asset Taxonomy

Use this taxonomy before creating, changing or routing LeanOS workspace assets.

## Core Rule

```text
Role = who acts.
Skill = capability used.
Playbook = practical task execution inside an area.
Knowledge = information/source of truth.
Workflow = coordination across areas, stages or handoffs.
```

Do not use one asset type to do another asset type's job.

## Quick Reference

| Asset | What It Is | Question It Answers |
| --- | --- | --- |
| `AGENT.md` | Operating owner and router for a workspace level | "Who owns routing at this level?" |
| `README.md` | Directory map and human explanation | "What is here and when should I use it?" |
| `department.yaml` | Machine-readable department structure | "Which areas and workflows belong to this department?" |
| `area.yaml` | Machine-readable area structure | "Which roles, skills, playbooks and knowledge belong to this area?" |
| `role` | Persona/responsibility used by the agent | "Which hat should the agent wear?" |
| `skill` | Reusable capability used by a role | "Which capability should be applied?" |
| `playbook` | Practical task execution inside an area | "In which order should this area execute the task?" |
| `knowledge` | Context, facts and source of truth | "What do we know about this?" |
| `workflow` | Multi-area, multi-stage or handoff coordination | "How should larger work move across owners?" |
| `command` | Portable chat instruction for a known intent | "What should happen when the user invokes this command?" |

## Workflow vs Playbook

Use this distinction when deciding where a process belongs:

```text
Workflow = coordinates multiple areas, stages or handoffs.
Playbook = executes a practical task inside one area.
```

A workflow should explain who participates, what handoffs happen and when the work moves from one owner to another.
A playbook should explain the concrete steps an area follows after the correct owner, role and skills are selected.

If the process crosses Product Ops, Design, Engineering or Security, it is probably a workflow.
If the process is branch creation, PR preparation, design foundation or security review inside one area, it is probably a playbook.

## Asset Types

### `AGENT.md`

An `AGENT.md` is the operating owner for a level of the workspace.

- Lives at the root, department root or selected area root.
- Answers: "Who decides the next route here?"
- Create when a level needs routing rules, red lines or delegation logic.
- Do not create when a README map is enough.
- Agents should load it before entering lower-level roles, skills or playbooks.

Example: `operations/design/AGENT.md` acts as the Design area lead. It chooses between Product Designer, UX Researcher, Accessibility Specialist and UX Writer.

### `README.md`

A `README.md` is the map for a folder.

- Lives in every important folder.
- Answers: "What is this folder for, what files exist here and how do I navigate?"
- Create for folders that humans or models will enter.
- Do not use it as a long operating manual when an `AGENT.md`, role, skill or playbook should own that detail.
- Agents should use it to understand local structure.

Example: `operations/design/README.md` explains the Design area, its knowledge files, roles, skills and playbooks.

### `department.yaml`

`department.yaml` is the structured map for a root department.

- Lives at `strategy/department.yaml`, `operations/department.yaml` or `growth/department.yaml`.
- Answers: "Which areas and workflows are active in this department?"
- Create for every root department.
- Do not store narrative product context or company facts in it.
- Agents should use it when they need machine-readable structure.

Example: `operations/department.yaml` lists areas such as Product Ops, Design, Engineering, DevOps and Security.

### `area.yaml`

`area.yaml` is the structured map for an area.

- Lives inside an area, such as `operations/design/area.yaml`.
- Answers: "Which roles, skills, playbooks and knowledge files belong here?"
- Create for every active area.
- Do not use it as a replacement for role, skill or playbook instructions.
- Agents should use it to verify available local assets.

Example: `operations/design/area.yaml` lists Design roles, skills, playbooks and `knowledge/` files.

### Role

A role is an operating persona and responsibility boundary.

- Lives in `<area>/roles/<direct-name>.role.md`.
- Answers: "With which hat should the agent act?"
- Create when a recurring responsibility needs a distinct point of view.
- Do not create a role for a one-off task or a simple capability.
- Agents should select one role before loading skills or playbooks.

Example: `operations/design/roles/product-designer.role.md` owns product design decisions and points to `design-system.skill.md`, `user-flow-mapping.skill.md`, `screen-specification.skill.md` and `design-review.skill.md`.

### Skill

A skill is a reusable capability.

- Lives in `<area>/skills/<direct-name>.skill.md`.
- Answers: "Which capability should be applied?"
- Create when the same capability is reused by one or more roles or playbooks.
- Do not make a skill a full process; that belongs in a playbook.
- Agents should load only the skills required by the active role and task.

Example: `operations/design/skills/accessibility.skill.md` defines how to apply accessibility checks and WCAG 2.2 AA expectations.

### Playbook

A playbook is a practical execution sequence inside one area.

- Lives in `<area>/playbooks/<direct-name>.playbook.md`.
- Answers: "In which order should this area execute the task?"
- Create when a task has repeatable steps, inputs, outputs and file update rules.
- Do not create a playbook for a single check or isolated capability.
- Do not use a playbook to coordinate multiple areas or cross-department handoffs.
- Agents should use it after selecting the role and loading required skills.

Example: `operations/design/playbooks/design-foundation.playbook.md` sequences design-system, accessibility and user-flow work before implementation.

### Knowledge

Knowledge files hold context, facts, decisions and source-of-truth notes.

- Lives in `<area>/knowledge/` when the area uses reusable knowledge.
- Answers: "What do we know about this?"
- Create when information must persist across tasks.
- Do not put operating instructions, role behavior or process steps here.
- Agents should update knowledge only after explicit user confirmation.

Example: `operations/design/knowledge/design-system.md` stores the design-system baseline. It does not decide how to create the design system; the skill and playbook do that.

### Workflow

A workflow coordinates multiple areas, stages or handoffs.

- Lives in `<department>/workflows/` or, when truly area-owned, `<area>/workflows/`.
- Answers: "How should larger work move across owners?"
- Create when the task spans multiple roles, areas or stages.
- Do not create a workflow for practical execution inside one area; use a playbook for that.
- Do not place business workflows in `.leanos/workflows/`; `.leanos/` is runtime support.
- Agents should use workflows to coordinate owners, then enter the relevant area and role.

Example: `operations/workflows/feature-to-delivery-cycle.workflow.md` can coordinate Product Ops, Design, Engineering and Security for feature delivery.

## Design Example

If the founder says, "define the design before implementation":

1. Root `AGENT.md` routes to `operations/AGENT.md`.
2. Operations routes to `operations/design/AGENT.md`.
3. Design area AGENT chooses `roles/product-designer.role.md`.
4. The role loads skills:
   - `skills/design-system.skill.md`
   - `skills/accessibility.skill.md`
   - `skills/user-flow-mapping.skill.md`
5. The work follows `playbooks/design-foundation.playbook.md`.
6. Confirmed outputs update:
   - `knowledge/design-system.md`
   - `knowledge/accessibility.md`
   - `knowledge/user-flows.md`

This keeps responsibilities separated:

- The role defines the operating perspective.
- The skills define capabilities.
- The playbook defines order.
- The knowledge files store confirmed facts and decisions.
