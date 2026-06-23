# Security

## Purpose

Own the mandatory security baseline for implementation, PR and deploy readiness.

## When to Use

- review security risk
- define access control
- document data protection
- threat model a feature
- review AI-generated code
- review API, database, secrets, infrastructure or dependency risk
- prepare pre-deploy security gate

## Source of Truth

- `knowledge/security-baseline.md`
- `knowledge/threat-model.md`
- `knowledge/access-control.md`
- `knowledge/data-protection.md`
- `knowledge/database-security.md`
- `knowledge/secrets-management.md`
- `knowledge/infra-hardening.md`
- `knowledge/secure-coding.md`
- `knowledge/incident-response.md`
- `knowledge/security-automation.md`

## Operating Rules

- Treat Security as a quality gate before implementation, PR and deploy when sensitive surfaces are involved.
- Keep the baseline practical for MVP/startup work; do not create enterprise-heavy process unless the product requires it.
- Route app code changes back to Engineering, environment/deploy changes back to DevOps and product scope questions back to Product Ops.
- Use OWASP/NIST/CIS references as guardrails, not as academic documentation dumps.
- Prefer clear stop conditions over vague warnings.

## Red Lines

- No public production database.
- No secrets in Git, logs, prompts, screenshots or tracked files.
- No private endpoint without server-side authentication and authorization.
- Never trust userId, tenantId, role or isAdmin from the client.
- Never build SQL with string concatenation.
- AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review.


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

- Baseline request: area lead `AGENT.md` -> role `roles/security-reviewer.role.md` -> skill `skills/threat-modeling.skill.md` -> playbook `playbooks/security-foundation.playbook.md`.
- API request: area lead `AGENT.md` -> role `roles/application-security-engineer.role.md` -> skill `skills/api-security-review.skill.md` -> playbook `playbooks/api-security-review.playbook.md`.
- Database request: area lead `AGENT.md` -> role `roles/data-protection-reviewer.role.md` -> skill `skills/database-security-review.skill.md` -> playbook `playbooks/database-security-review.playbook.md`.
- Security automation request: area lead `AGENT.md` -> role `roles/cloud-security-reviewer.role.md` or `roles/security-reviewer.role.md` -> skill `skills/security-automation-readiness.skill.md` -> playbook `playbooks/security-automation-readiness.playbook.md`.
- Pre-deploy request: area lead `AGENT.md` -> role `roles/cloud-security-reviewer.role.md` or `roles/security-reviewer.role.md` -> skills `skills/infra-hardening-review.skill.md`, `skills/secrets-management.skill.md` and conditional specialist skills -> playbook `playbooks/pre-deploy-security-review.playbook.md`.
- AI-generated-code request: area lead `AGENT.md` -> role `roles/application-security-engineer.role.md` -> skill `skills/ai-generated-code-security.skill.md` -> playbook `playbooks/ai-generated-code-security-review.playbook.md`.
