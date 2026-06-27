# Create Playbook Instructions

Use when creating a `.playbook.md` file inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm the playbook is tactical execution inside one area.
3. Check whether a department workflow should own the broader flow.
4. Identify skills the playbook should use.
5. Load `../foundation/guided-conversation.md` when the playbook asks the founder to choose, classify, prioritize or confirm.

## Choose Template

- Playbook: `../templates/execution/playbook-template.md`
- Playbook YAML: `../templates/execution/playbook-template.yaml`

## Process

1. Define trigger and goal.
2. Add YAML frontmatter with `name` and a trigger-only `description` that starts with "Use when".
3. Define inputs.
4. Define ordered process.
5. Reference skills instead of duplicating them.
6. Add `Guided Conversation` when founder input or confirmation is part of the playbook.
7. Define Stop Conditions.
8. Define Acceptance Criteria & Outputs.
9. Define Files to Update.

## Validate

Use `../checklists/playbook-quality-checklist.md`.

## Red Lines

- Do not duplicate a workflow.
- Do not hide missing role or skill gaps.
- Do not update durable files without confirmation.
