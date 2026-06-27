import { securityKnowledge } from "./security-knowledge-template.js";

export function securityIncidentResponseKnowledge(): string {
  return securityKnowledge(
    "Incident Response",
    "Define a lightweight response path for leaks, vulnerabilities, abuse, outages and security regressions.",
    ["Incident types and severity.", "Who decides pause, rollback or rotation.", "Evidence to collect.", "Communication notes.", "Post-incident follow-up."],
    ["Secrets leaks trigger rotation.", "Critical vulnerabilities trigger mitigation plan.", "Production incidents include rollback or containment.", "Customer-impacting incidents capture timeline and follow-up."],
    ["Do not hide security incidents in implementation notes.", "Do not continue deployment when containment is unclear.", "Do not delete evidence needed for review.", "Do not claim resolution without verification."],
    ["../playbooks/incident-response.playbook.md", "../playbooks/vulnerability-response.playbook.md", "../playbooks/secrets-rotation.playbook.md"],
    ["NIST SSDF", "CIS Controls"]
  );
}
