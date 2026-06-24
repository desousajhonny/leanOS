# Branch For Feature

## Purpose

Create a safe branch plan before implementation starts.

## Inputs

- Local Feature slug or GitHub issue number
- Feature title
- Current default branch
- Existing branch list when available
- Branch rules
- Skill: create-branch

## Process

1. Use this as the branch step of `engineering-delivery.playbook.md`; return to engineering-delivery after branch status is clear
2. Read the Feature context and title
3. Load `.github/leanos/branch-rules.md`
4. Use `skills/create-branch.skill.md` to generate a branch name using the required Feature/GitHub branch format
5. Use `feature/...` for local-only Features and `issue/...` for mapped GitHub issues
6. Check for sensitive words or unnecessary scope
7. Ask before using an existing branch or creating a new one

## Output

- Proposed branch name
- Linked Feature or GitHub issue
- Branch safety notes
- Next implementation step

## Files to Update

- Do not update files just to create a branch plan. Record branch decisions in `../knowledge/implementation-notes.md` only when the user asks for persistent notes.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
