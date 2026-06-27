import { securityKnowledge } from "./securityKnowledgeTemplate.js";

export function securityDataProtectionKnowledge(): string {
  return securityKnowledge(
    "Data Protection",
    "Define sensitive data handling, privacy boundaries, logging constraints and retention expectations.",
    ["Sensitive data categories.", "Where data is collected, stored, logged and shared.", "Retention and deletion expectations.", "Analytics, events and error-reporting limits."],
    ["Sensitive data does not appear in logs, analytics, errors or events.", "Data access is scoped to authenticated and authorized users.", "Retention expectations are clear enough for MVP.", "Third-party data sharing is visible."],
    ["No sensitive data in logs or screenshots.", "No unneeded personal data collection.", "No production data copied into dev without explicit review.", "No user data sent to third-party tools without purpose and review."],
    ["../playbooks/security-foundation.playbook.md", "../playbooks/pre-deploy-security-review.playbook.md"],
    ["OWASP ASVS", "NIST SSDF"]
  );
}
