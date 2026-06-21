# Branch From Issue

## Purpose

Create a safe branch plan before implementation starts.

## Inputs

- GitHub issue number
- Issue title
- Current default branch
- Existing branch list when available
- Branch rules

## Process

1. Read the issue context and title
2. Load `.github/leanos/branch-rules.md`
3. Generate a branch name using the required issue format
4. Check for sensitive words or unnecessary scope
5. Ask before using an existing branch or creating a new one

## Output

- Proposed branch name
- Linked issue
- Branch safety notes
- Next implementation step

## Files to Update

- Do not update files just to create a branch plan. Record branch decisions in `../implementation-notes.md` only when the user asks for persistent notes.

## Navigation

Start from `../README.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
