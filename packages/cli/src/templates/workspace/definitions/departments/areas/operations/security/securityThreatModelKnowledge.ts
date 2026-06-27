import { securityKnowledge } from "./securityKnowledgeTemplate.js";

export function securityThreatModelKnowledge(): string {
  return securityKnowledge(
    "Threat Model",
    "Capture the most important assets, actors, trust boundaries and abuse paths before implementation or release.",
    ["Assets and data that need protection.", "Users, admins, external systems and attackers.", "Trust boundaries between client, server, database and third-party services.", "Likely abuse cases and mitigations."],
    ["Auth, authorization and tenant boundaries are identified.", "Sensitive data flows are visible.", "High-risk endpoints or jobs have mitigation notes.", "Open threats have owners or stop conditions."],
    ["Do not mark a feature safe when data ownership or auth boundaries are unknown.", "Do not ignore abuse paths because the product is still MVP.", "Do not assume client-side checks protect server resources."],
    ["../playbooks/security-foundation.playbook.md", "../playbooks/pre-mvp-security-checklist.playbook.md"],
    ["OWASP Top 10", "OWASP ASVS"]
  );
}
