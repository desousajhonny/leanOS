export const operationsSecurityCommonPaths: string[] = [
    "Baseline request: area lead `AGENT.md` -> role `roles/security-reviewer.role.md` -> skill `skills/threat-modeling/SKILL.md` -> playbook `playbooks/security-foundation.playbook.md`.",
    "API request: area lead `AGENT.md` -> role `roles/application-security-engineer.role.md` -> skill `skills/api-security-review/SKILL.md` -> playbook `playbooks/api-security-review.playbook.md`.",
    "Database request: area lead `AGENT.md` -> role `roles/data-protection-reviewer.role.md` -> skill `skills/database-security-review/SKILL.md` -> playbook `playbooks/database-security-review.playbook.md`.",
    "Security automation request: area lead `AGENT.md` -> role `roles/cloud-security-reviewer.role.md` or `roles/security-reviewer.role.md` -> skill `skills/security-automation-readiness/SKILL.md` -> playbook `playbooks/security-automation-readiness.playbook.md`.",
    "Pre-deploy request: area lead `AGENT.md` -> role `roles/cloud-security-reviewer.role.md` or `roles/security-reviewer.role.md` -> skills `skills/infra-hardening-review/SKILL.md`, `skills/secrets-management/SKILL.md` and conditional specialist skills -> playbook `playbooks/pre-deploy-security-review.playbook.md`.",
    "AI app security request: area lead `AGENT.md` -> role `roles/ai-security-engineer.role.md` -> skill `skills/ai-runtime-security-review/SKILL.md` -> playbook `playbooks/ai-app-security-review.playbook.md`.",
    "AI-generated-code request: area lead `AGENT.md` -> role `roles/application-security-engineer.role.md` -> skill `skills/ai-generated-code-security/SKILL.md` -> playbook `playbooks/ai-generated-code-security-review.playbook.md`."
  ];
