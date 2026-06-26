# AI Standard

## Purpose

LeanOS source-of-truth for creating, reviewing and routing AI-native framework assets.

## When to Use

Use this folder before creating or changing agents, departments, areas, roles, skills, playbooks, workflows, commands, templates, checklists or instructions.

## Fast Route

Use this route for most asset creation work:

1. Decide the asset type with `foundation/asset-taxonomy.md`.
2. Confirm placement and boundaries with `foundation/creation-rules.md`.
3. Confirm naming with `foundation/naming-conventions.md`.
4. Use `foundation/guided-conversation.md` when the asset asks the founder to decide, classify, prioritize or confirm.
5. Load the matching file in `instructions/`.
6. Use the matching starter in `templates/`.
7. Validate the result with the matching file in `checklists/`.
8. Open `examples/` only if a reference would improve quality.

## Decision Map

| Need | Go To | Why |
| --- | --- | --- |
| Decide what kind of asset something is | `foundation/asset-taxonomy.md` | Defines AGENT, README, YAML, role, skill, playbook, knowledge, workflow and command. |
| Decide how a model should move through the workspace | `foundation/navigation-chain.md` | Defines owner-first navigation and prevents route skipping. |
| Decide the next founder progression stage | `foundation/founder-progression-model.md` | Defines Strategy-first progression, gates, activation_required and Chief routing behavior. |
| Check if a founder progression move is allowed | `foundation/progression-gates.md` | Defines required context, allowed next stages and blocked next stages. |
| Design founder-friendly questions or decisions | `foundation/guided-conversation.md` | Defines numbered options, decision pauses and confirmation prompts. |
| Decide whether a new file should exist | `foundation/creation-rules.md` | Prevents asset sprawl and duplicated ownership. |
| Name a file or folder | `foundation/naming-conventions.md` | Keeps names predictable and machine-readable. |
| Judge quality when no specific checklist is enough | `foundation/quality-criteria.md` | Provides universal quality and rejection criteria. |
| Create a folder README | `foundation/folder-documentation-rules.md` and `instructions/create-readme-instructions.md` | Keeps README files as maps, not executors. |
| Create an asset | `instructions/` then `templates/` | Gives the procedure and the starting shape. |
| Review an asset before accepting it | `checklists/` | Applies the right quality gate for the asset type. |
| See what good looks like | `examples/` | Provides reference shape only, not active context. |

## Routes

### `foundation/`

Core conceptual rules. Use when deciding what belongs where, how assets relate, how navigation works or whether a proposed asset is valid.

### `templates/`

Reusable starting structures. Use after choosing the asset type and before drafting the file.

### `checklists/`

Quality gates. Use before accepting a newly created or modified asset.

### `instructions/`

Creation procedures. Use when the user asks to create or update a LeanOS asset.

### `examples/`

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

- `foundation/`
- `templates/`
- `checklists/`
- `instructions/`
- `examples/`

## Related Folders

- `../AGENT.md`

## Agent Notes

Do not load all of `ai-standard/` by default. Choose the smallest foundation file, instruction, template and checklist needed for the active request.

If the next route is unclear, start with `foundation/asset-taxonomy.md`.
