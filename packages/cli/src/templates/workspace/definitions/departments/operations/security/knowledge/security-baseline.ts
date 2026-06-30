import { securityKnowledge } from "./security-knowledge-template.js";

export function securityBaselineKnowledge(): string {
  return securityKnowledge(
    "Security Baseline",
    "Defina a baseline mínima de Security para um MVP ou produto de startup. Não tente resolver Security enterprise completamente agora. O objetivo é uma baseline inicial obrigatória que reduz riscos comuns de MVP e código gerado por IA.",
    [
      "Security posture for the current product stage.",
      "Required gates before implementation, PR and deploy.",
      "Known security risks, owners and open questions.",
      "Where security context lives across Product Ops, Engineering, DevOps and Security."
    ],
    [
      "Security review is required when work touches data, auth, permissions, privacy, abuse, compliance, dependencies, CI/CD, infra, deploy or AI runtime surfaces.",
      "PRs must state whether Security is applicable or not applicable.",
      "Deploy readiness must include backup, rollback and security review for sensitive changes.",
      "AI features must explicitly review LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection and cost/rate abuse."
    ],
    [
      "No public production database.",
      "No secrets in Git, logs, prompts, screenshots or tracked files.",
      "No private endpoint without server-side authentication and authorization.",
      "Every user-owned or tenant-owned object access must validate ownership server-side.",
      "Never trust userId, tenantId, role or isAdmin from the client.",
      "Never build SQL with string concatenation.",
      "Sensitive data must not appear in logs, analytics, errors or events.",
      "Admin access requires RBAC, MFA when available and audit trail.",
      "Production, staging and development must use separate databases, secrets and permissions.",
      "Production deploy requires backup, rollback path and security review.",
      "No payment, billing, pricing or entitlement change without Security review when money, access or customer data is affected.",
      "AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review.",
      "LLM input/output must be treated as untrusted product surface.",
      "Tool permissions must be least-privilege and explicit.",
      "RAG/vector DB retrieval must preserve customer data boundaries.",
      "Prompt injection must be reviewed before agent or AI feature launch.",
      "Cost/rate abuse must have limits or accepted risk owner."
    ],
    [
      "../playbooks/security-foundation.playbook.md",
      "../playbooks/pre-mvp-security-checklist.playbook.md",
      "../playbooks/pre-deploy-security-review.playbook.md",
      "../playbooks/ai-app-security-review.playbook.md",
      "../playbooks/ai-generated-code-security-review.playbook.md"
    ],
    ["OWASP Top 10", "OWASP Top 10 for Large Language Model Applications", "OWASP API Security Top 10", "OWASP ASVS", "NIST SSDF", "CIS Controls", "OWASP Secure Coding with AI"]
  );
}
