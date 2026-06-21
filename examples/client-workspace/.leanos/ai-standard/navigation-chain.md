# LeanOS Navigation Chain

## Purpose

The LeanOS Navigation Chain ensures that the Chief Agent loads only the minimum context required for the current task.

## Chain

`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output`

## Creation Chain

`AGENT.md -> ai-standard README -> instructions -> templates -> checklists -> new asset`

## Rules

- Do not load all departments.
- Do not load all roles.
- Do not load all skills.
- Do not load all playbooks.
- Follow links from one file to the next.
- Each file should guide the agent to the next right file.
- Every generated LeanOS asset must include navigation guidance.
