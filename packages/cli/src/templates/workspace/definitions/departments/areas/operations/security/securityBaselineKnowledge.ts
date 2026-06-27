import { securityKnowledge } from "./securityKnowledgeTemplate.js";

export function securityBaselineKnowledge(): string {
  return securityKnowledge(
    "Security Baseline",
    "Define the minimum security baseline for an MVP or startup product. Do not try to solve enterprise security completely now. The goal is an initial mandatory baseline that reduces common MVP and AI-generated-code risks.",
    [
      "Security posture for the current product stage.",
      "Required gates before implementation, PR and deploy.",
      "Known security risks, owners and open questions.",
      "Where security context lives across Product Ops, Engineering, DevOps and Security."
    ],
    [
      "Security review is required when work touches data, auth, permissions, privacy, abuse, compliance, dependencies, CI/CD, infra or deploy.",
      "PRs must state whether Security is applicable or not applicable.",
      "Deploy readiness must include backup, rollback and security review for sensitive changes."
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
      "AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review."
    ],
    [
      "../playbooks/security-foundation.playbook.md",
      "../playbooks/pre-mvp-security-checklist.playbook.md",
      "../playbooks/pre-deploy-security-review.playbook.md",
      "../playbooks/ai-generated-code-security-review.playbook.md"
    ],
    ["OWASP Top 10", "OWASP API Security Top 10", "OWASP ASVS", "NIST SSDF", "CIS Controls", "OWASP Secure Coding with AI"]
  );
}
