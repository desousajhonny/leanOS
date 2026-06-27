export const operationsEngineeringCommonPaths: string[] = [
    "Branch request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/create-branch/SKILL.md` -> playbook `playbooks/branch-for-feature.playbook.md`.",
    "Component implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/implement-component/SKILL.md` -> playbook `playbooks/component-implementation.playbook.md`.",
    "Implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> playbook `playbooks/engineering-delivery.playbook.md` -> sub-playbooks `playbooks/branch-for-feature.playbook.md`, conditional `playbooks/component-implementation.playbook.md`, `playbooks/prepare-pr.playbook.md` and `playbooks/pr-validation.playbook.md`.",
    "Data change request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` or `roles/pr-reviewer.role.md` -> skill `skills/review-data-change/SKILL.md` -> route Security when sensitive risk exists.",
    "Test request: area lead `AGENT.md` -> role `roles/test-engineer.role.md` -> skill `skills/write-tests/SKILL.md` -> playbook `playbooks/test-planning.playbook.md`.",
    "PR review request: area lead `AGENT.md` -> role `roles/pr-reviewer.role.md` -> skills `skills/review-pr/SKILL.md`, `skills/follow-code-standards/SKILL.md` and conditional `skills/review-data-change/SKILL.md` -> playbook `playbooks/pr-validation.playbook.md`."
  ];
