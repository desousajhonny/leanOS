# Create Skill Instructions

Use when creating a skill folder inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm which role or playbook will use the skill.
3. Check whether an existing skill already covers the capability.
4. Create `skills/<skill-name>/SKILL.md`.

## Choose Template

- Skill: `../templates/execution/skill-template.md`
- Skill YAML: `../templates/execution/skill-template.yaml`

## Process

1. Define one reusable capability.
2. Add YAML frontmatter with `name` and a trigger-only `description` that starts with "Use when".
3. Define when to use it.
4. Define required context and inputs.
5. Use `### Step N` headings inside `## Process`.
6. Define checks and outputs.
7. Define red lines.
8. Avoid turning the skill into a full ordered process.

## Validate

Use `../checklists/skill-quality-checklist.md`.

## Red Lines

- Do not duplicate another skill.
- Do not create a skill for a one-off answer.
- Do not put durable product facts in a skill.
