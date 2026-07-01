export const operationsDevopsCommonPaths: string[] = [
    "GitHub setup request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/github-project-management/SKILL.md` -> playbook `playbooks/github-project-management.playbook.md`.",
    "Repository bootstrap request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> verify `README-ready`; if missing, route to `Strategy Product -> Product Narrative Editor -> product-readme` before creating or publishing a new GitHub repository.",
    "GitHub safety baseline request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> playbook `playbooks/github-safety-baseline.playbook.md` -> skills `skills/repository-profile/SKILL.md`, `skills/ci-pipeline/SKILL.md` and `skills/branch-protection/SKILL.md`.",
    "Branch protection request: area lead `AGENT.md` -> role `roles/github-devops.role.md` -> skill `skills/branch-protection/SKILL.md` after PR validation has run at least once.",
    "Environment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/environment-management/SKILL.md` -> playbook `playbooks/environment-management.playbook.md`.",
    "Deployment request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/deployment-readiness/SKILL.md` -> playbook `playbooks/deployment-readiness.playbook.md`.",
    "CI request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/ci-pipeline/SKILL.md` -> playbook `playbooks/ci-pipeline-cd.playbook.md`.",
    "Observability request: area lead `AGENT.md` -> role `roles/devops-engineer.role.md` -> skill `skills/observability/SKILL.md` -> playbook `playbooks/observability.playbook.md`.",
    "Release request: area lead `AGENT.md` -> role `roles/release-manager.role.md` -> skill `skills/release-readiness/SKILL.md` -> playbook `playbooks/release-operations.playbook.md`."
  ];
