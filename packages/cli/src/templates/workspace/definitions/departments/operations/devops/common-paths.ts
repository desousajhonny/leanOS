export const operationsDevopsCommonPaths: string[] = [
    "GitHub setup request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/configure-github-project/SKILL.md` -> playbook `playbooks/configure-github-project.playbook.md`.",
    "Repository bootstrap request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> verify `README-ready`; if missing, route to `Strategy Product -> Product Narrative Editor -> write-product-readme` before creating or publishing a new GitHub repository.",
    "GitHub safety baseline request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> playbook `playbooks/github-safety-baseline.playbook.md` -> skills `skills/repository-profile/SKILL.md`, `skills/setup-ci/SKILL.md` and `skills/branch-protection/SKILL.md`.",
    "Branch protection request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/branch-protection/SKILL.md` after PR validation has run at least once.",
    "Environment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/configure-environments/SKILL.md` -> playbook `playbooks/configure-environments.playbook.md`.",
    "Deployment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment/SKILL.md` -> playbook `playbooks/plan-deployment.playbook.md`.",
    "CI request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/setup-ci/SKILL.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.",
    "Observability request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/define-observability/SKILL.md` -> playbook `playbooks/define-observability.playbook.md`.",
    "Release request: area lead `AGENT.md` -> role `roles/release-manager.role.md` -> skill `skills/prepare-release/SKILL.md` -> playbook `playbooks/release-operations.playbook.md`."
  ];
