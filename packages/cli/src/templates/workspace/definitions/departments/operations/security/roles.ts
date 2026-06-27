import type { RoleDefinition } from "../../../../types.js";

export const operationsSecurityRoles: RoleDefinition[] = [
    {
      slug: "security-reviewer",
      title: "Security Reviewer",
      purpose: "Review product, implementation, PR and deploy work against the Security Starter Baseline.",
      useWhen: ["security risk is present", "data, auth, privacy, abuse or compliance is involved", "a PR or deploy needs security gate review"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/threat-model.md", "../knowledge/access-control.md", "../knowledge/data-protection.md", "../knowledge/secure-coding.md", "../knowledge/security-automation.md"],
      skills: ["threat-modeling", "access-control-review", "secure-code-review", "ai-generated-code-security", "security-automation-readiness"],
      playbooks: ["security-foundation", "pre-mvp-security-checklist", "pre-deploy-security-review", "security-automation-readiness", "ai-generated-code-security-review"],
      outputs: ["Security risk summary", "Gate decision", "Required fixes", "Stop conditions", "Files that may be updated after confirmation"],
      redLines: ["Do not approve private data access without server-side authorization.", "Do not treat client-side checks as security controls.", "Do not ignore AI-generated-code risks.", "Do not update auth, secrets, CI/CD, infra or dependencies without human review."]
    },
    {
      slug: "application-security-engineer",
      title: "Application Security Engineer",
      purpose: "Review application, API, dependency, generated-code and secure-coding risk.",
      useWhen: ["API security is involved", "auth or authorization logic changes", "dependencies change", "AI generated code needs review", "unsafe shell/file-system behavior is possible"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/secure-coding.md", "../knowledge/access-control.md", "../knowledge/secrets-management.md", "../../engineering/AGENT.md"],
      skills: ["api-security-review", "secure-code-review", "dependency-supply-chain-review", "ai-generated-code-security", "secrets-management"],
      playbooks: ["api-security-review", "ai-generated-code-security-review", "vulnerability-response", "pre-deploy-security-review"],
      outputs: ["Application security findings", "Required code/security fixes", "Dependency and supply-chain notes", "PR/deploy gate result"],
      redLines: ["Do not approve unsafe query construction.", "Do not accept fabricated tests or deleted security tests.", "Do not let generated code change auth, secrets, CI/CD or infra without review."]
    },
    {
      slug: "cloud-security-reviewer",
      title: "Cloud Security Reviewer",
      purpose: "Review deployment, infrastructure, CORS, service accounts, environment separation and runtime exposure.",
      useWhen: ["deployment or hosting is involved", "service accounts or CI/CD permissions change", "CORS, rate limits or public exposure need review", "production readiness is being checked"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/infra-hardening.md", "../knowledge/secrets-management.md", "../knowledge/security-automation.md", "../../devops/AGENT.md", "../../devops/knowledge/deployment-readiness.md"],
      skills: ["infra-hardening-review", "secrets-management", "security-automation-readiness", "incident-response"],
      playbooks: ["pre-deploy-security-review", "security-automation-readiness", "secrets-rotation", "incident-response"],
      outputs: ["Infrastructure risk summary", "Deployment blockers", "Secret/service-account findings", "Rollback or incident-response notes"],
      redLines: ["Do not approve public production databases.", "Do not approve over-permissive service accounts.", "Do not approve production deploy without backup and rollback path."]
    },
    {
      slug: "data-protection-reviewer",
      title: "Data Protection Reviewer",
      purpose: "Review sensitive data, database, privacy, logging and tenant-isolation risk.",
      useWhen: ["personal or sensitive data is involved", "database access changes", "tenant isolation matters", "logs/analytics/errors may expose data"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/data-protection.md", "../knowledge/database-security.md", "../knowledge/access-control.md"],
      skills: ["database-security-review", "access-control-review", "secure-code-review"],
      playbooks: ["database-security-review", "pre-deploy-security-review", "pre-mvp-security-checklist"],
      outputs: ["Data protection findings", "Tenant/access-control result", "Database safety result", "Required follow-up"],
      redLines: ["Do not approve sensitive data in logs, analytics, errors or events.", "Do not approve missing tenant isolation.", "Do not approve destructive data changes without backup and rollback."]
    }
  ];
