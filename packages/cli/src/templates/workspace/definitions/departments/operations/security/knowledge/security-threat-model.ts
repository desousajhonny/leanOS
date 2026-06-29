import { securityKnowledge } from "./security-knowledge-template.js";

export function securityThreatModelKnowledge(): string {
  return securityKnowledge(
    "Threat Model",
    "Capture the most important assets, actors, trust boundaries and abuse paths before implementation or release.",
    ["Assets and data that need protection.", "Users, admins, external systems and attackers.", "Trust boundaries between client, server, database and third-party services.", "Likely abuse cases and mitigations."],
    ["Auth, authorization and tenant boundaries are identified.", "Sensitive data flows are visible.", "High-risk endpoints or jobs have mitigation notes.", "Open threats have owners or stop conditions."],
    ["Não marque uma Feature como segura quando ownership de dados ou limites de auth forem desconhecidos.", "Não ignore caminhos de abuso porque o produto ainda é MVP.", "Não presuma que checks client-side protegem recursos de servidor."],
    ["../playbooks/security-foundation.playbook.md", "../playbooks/pre-mvp-security-checklist.playbook.md"],
    ["OWASP Top 10", "OWASP ASVS"]
  );
}
