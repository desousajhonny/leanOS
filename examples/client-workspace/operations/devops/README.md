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

- `knowledge/github-management.md`
- `knowledge/environments.md`
- `knowledge/deployment-readiness.md`
- `knowledge/ci-cd.md`
- `knowledge/observability.md`
- `knowledge/release-notes.md`

## Operating Rules

- Treat DevOps as readiness and operational guidance first, execution second.
- Use GitHub/Vercel/provider files as configuration drafts until the founder confirms execution.
- Keep local, preview/staging and production environments distinct.
- Prefer dry-run, status checks and proposed payloads before any remote write.
- Route product code implementation back to Engineering and product scope questions back to Product Ops.

## Red Lines

- Do not store tokens, secrets or credentials in workspace files.
- Do not ask the founder to paste tokens into chat or markdown files.
- Do not call GitHub, Vercel or any provider API without explicit confirmation.
- Do not create `.vercel/`, run `vercel link` or deploy automatically from the scaffold.
- Do not create or modify `vercel.json` until a real app/framework exists and overrides are required.
- Do not add CI deploy gates or branch protection changes without explaining impact and asking first.


## Navigation

1. For operational work, start with `AGENT.md`.
2. Use this README as the directory map.
3. After the area AGENT selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- `README.md`: area map and explanation.
- `AGENT.md`: area operating lead when present.
- `area.yaml`: machine-readable structure for this area.
- `roles/`: operating personas for this area.
- `skills/`: focused capabilities used by roles.
- `playbooks/`: tactical execution sequences.

## Common Paths

- GitHub setup request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/configure-github-project.skill.md` -> playbook `playbooks/configure-github-project.playbook.md`.
- Environment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/configure-environments.skill.md` -> playbook `playbooks/configure-environments.playbook.md`.
- Deployment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment.skill.md` -> playbook `playbooks/plan-deployment.playbook.md`.
- CI request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/setup-ci.skill.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.
- Observability request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/define-observability.skill.md` -> playbook `playbooks/define-observability.playbook.md`.
- Release request: area lead `AGENT.md` -> role `roles/release-manager.role.md` -> skill `skills/prepare-release.skill.md` -> playbook `playbooks/release-operations.playbook.md`.
