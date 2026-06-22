# DevOps

## Purpose

Own delivery infrastructure, environments, deployment, GitHub workflow setup and observability notes.

## When to Use

- plan deployment
- configure CI
- configure GitHub Projects
- document environments
- define observability

## Source of Truth

- No loose source-of-truth files yet. Use playbooks for operational procedures and update persistent notes only when the workspace creates them.




## Navigation

1. Choose the relevant role from `roles/`.
2. Load only the required skills from `skills/`.
3. Use the matching playbook from `playbooks/`.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- GitHub setup request: role `roles/github-devops.role.md` -> skill `skills/configure-github-project.skill.md` -> playbook `playbooks/configure-github-project.playbook.md`.
- Deployment request: role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment.skill.md` -> playbook `playbooks/plan-deployment.playbook.md`.
- CI request: role `roles/devops-engineer.role.md` -> skill `skills/setup-ci.skill.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.
- Observability request: role `roles/devops-engineer.role.md` -> skill `skills/define-observability.skill.md` -> playbook `playbooks/define-observability.playbook.md`.
