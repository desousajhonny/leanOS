import { securityKnowledge } from "./security-knowledge-template.js";

export function securitySecureCodingKnowledge(): string {
  return securityKnowledge(
    "Secure Coding",
    "Define secure implementation expectations for AI-assisted coding and human code review.",
    ["Input validation rules.", "Output encoding or escaping expectations.", "Auth and authorization checks.", "Dependency review expectations.", "Shell command and file-system safety.", "Test expectations for security-sensitive changes."],
    ["Security-sensitive code has tests or manual validation notes.", "Dependencies are known and current enough for MVP.", "Shell commands and file edits are scoped.", "Agent-generated changes are reviewed before merge."],
    ["No unsafe shell command from user-controlled input.", "No auth, secrets, CI/CD, infra or dependency changes without human review.", "No fabricated tests or deleted tests to make CI pass.", "No out-of-scope file edits."],
    ["../playbooks/ai-generated-code-security-review.playbook.md", "../playbooks/pre-mvp-security-checklist.playbook.md"],
    ["OWASP Secure Coding with AI", "OWASP Top 10", "NIST SSDF"]
  );
}
