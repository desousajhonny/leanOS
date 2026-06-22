# Create Command Instructions

Use when creating a portable chat command in `.leanos/commands/`.

## Before Creating

1. Confirm the command maps to a stable user intent.
2. Check whether natural-language routing is enough.
3. Confirm allowed updates, forbidden updates and confirmation rules.

## Choose Template

- Command: `../templates/commands/command-template.md`

## Process

1. Define invocation.
2. Define purpose.
3. Define Load First.
4. Define process.
5. Define allowed updates.
6. Define forbidden updates.
7. Define output.
8. Require confirmation before durable or remote changes.

## Validate

Use `../checklists/command-quality-checklist.md`.

## Red Lines

- Do not create commands for every possible workflow.
- Do not ask the model to perform remote writes directly.
- Do not request secrets into tracked files.
