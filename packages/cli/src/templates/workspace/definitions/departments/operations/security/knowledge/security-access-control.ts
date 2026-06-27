import { securityKnowledge } from "./security-knowledge-template.js";

export function securityAccessControlKnowledge(): string {
  return securityKnowledge(
    "Access Control",
    "Define authentication, authorization, ownership and admin access expectations.",
    ["Roles and permissions.", "Tenant/user ownership rules.", "Admin access rules.", "Protected server-side checks.", "Audit expectations."],
    ["Every private endpoint has server-side auth and authorization.", "Every user-owned or tenant-owned object validates ownership server-side.", "Admin access has RBAC, MFA when available and audit trail.", "Client-provided identity fields are ignored for authorization decisions."],
    ["Never trust userId, tenantId, role or isAdmin from the client.", "No private endpoint without server-side authorization.", "No admin route without explicit RBAC and audit trail.", "No broad service account for user-level actions."],
    ["../playbooks/pre-mvp-security-checklist.playbook.md", "../playbooks/pre-deploy-security-review.playbook.md"],
    ["OWASP Top 10 - Broken Access Control", "OWASP ASVS"]
  );
}
