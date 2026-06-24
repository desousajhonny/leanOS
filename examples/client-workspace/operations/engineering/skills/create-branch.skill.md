# Create Branch

## Purpose

Define a safe Feature-linked branch name and creation checklist before code changes.

## Use When

- implementation is about to start
- a local Feature or mapped GitHub issue has been selected
- branch naming needs validation

## Required Context

- Local Feature slug or GitHub issue number
- Feature title
- Branch rules

## Inputs

- Feature slug or issue number
- Feature title
- Branch type
- Existing branch names when available

## Process

1. Load branch rules
2. Generate a Feature-linked branch name
3. Use `feature/...` for local-only Features and `issue/...` for mapped GitHub issues
4. Keep the branch name short and descriptive
5. Check for conflicting branch names
6. Ask before reusing or replacing a branch

## Checks

- Branch includes the issue number when available
- Branch uses the Feature slug when no issue number exists
- Branch name does not include secrets or vague wording
- Branch matches repository convention

## Output

- Proposed branch name
- Branch command or plan
- Safety notes

## Files to Update

- Do not update files just to create a branch plan.

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying files.
