import { securityKnowledge } from "./security-knowledge-template.js";

export function securityIncidentResponseKnowledge(): string {
  return securityKnowledge(
    "Incident Response",
    "Define a lightweight response path for leaks, vulnerabilities, abuse, outages and security regressions.",
    ["Incident types and severity.", "Who decides pause, rollback or rotation.", "Evidence to collect.", "Communication notes.", "Post-incident follow-up."],
    ["Secrets leaks trigger rotation.", "Critical vulnerabilities trigger mitigation plan.", "Production incidents include rollback or containment.", "Customer-impacting incidents capture timeline and follow-up."],
    ["Não esconda incidentes de Security em notas de implementação.", "Não continue deploy quando a contenção estiver incerta.", "Não delete evidência necessária para review.", "Não alegue resolução sem verificação."],
    ["../playbooks/incident-response.playbook.md", "../playbooks/vulnerability-response.playbook.md", "../playbooks/secrets-rotation.playbook.md"],
    ["NIST SSDF", "CIS Controls"]
  );
}
