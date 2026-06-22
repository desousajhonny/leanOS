# Create Branch

## Purpose

Define a safe issue-linked branch name and creation checklist before code changes.

## Use When

- implementation is about to start
- a GitHub issue has been selected
- branch naming needs validation

## Required Context

- GitHub issue number
- Issue title
- Branch rules

## Inputs

- Issue number
- Issue title
- Branch type
- Existing branch names when available

## Process

1. Load branch rules
2. Generate an issue-linked branch name
3. Keep the branch name short and descriptive
4. Check for conflicting branch names
5. Ask before reusing or replacing a branch

## Checks

- Branch includes the issue number when available
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
