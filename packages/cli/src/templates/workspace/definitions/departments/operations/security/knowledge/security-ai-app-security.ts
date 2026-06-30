import { securityKnowledge } from "./security-knowledge-template.js";

export function securityAiAppSecurityKnowledge(): string {
  return securityKnowledge(
    "AI App Security",
    "Define a baseline de Security para produtos AI-first, agentes, RAG, automações com ferramentas e interfaces baseadas em LLM.",
    [
      "AI feature or agent scope.",
      "LLM input/output boundaries.",
      "Tool permissions and approval points.",
      "RAG/vector DB data boundaries.",
      "Customer data boundary and sensitive data handling.",
      "Prompt injection, jailbreak, cost/rate abuse and model-output risks."
    ],
    [
      "LLM input/output is treated as untrusted product surface.",
      "Tool permissions are least-privilege, explicit and tied to a human-approved workflow.",
      "RAG/vector DB retrieval preserves customer data boundary and tenant isolation.",
      "Prompt injection risk is reviewed before launch or production-like usage.",
      "Cost/rate abuse has limits, monitoring or an accepted risk owner.",
      "AI model outputs are validated before driving writes, external actions or customer-visible decisions."
    ],
    [
      "LLM input/output must be treated as untrusted product surface.",
      "Tool permissions must be least-privilege and explicit.",
      "RAG/vector DB retrieval must preserve customer data boundaries.",
      "Customer data boundary must be explicit before AI features process client data.",
      "Prompt injection must be reviewed before agent or AI feature launch.",
      "Cost/rate abuse must have limits or accepted risk owner.",
      "Model output must not execute tools, write data or contact customers without an approved gate.",
      "No sensitive customer data in prompts, logs, traces, embeddings or analytics without explicit approval and retention rules."
    ],
    [
      "../playbooks/ai-app-security-review.playbook.md",
      "../playbooks/ai-generated-code-security-review.playbook.md",
      "../playbooks/pre-mvp-security-checklist.playbook.md",
      "../playbooks/pre-deploy-security-review.playbook.md"
    ],
    [
      "OWASP Top 10 for Large Language Model Applications",
      "OWASP Top 10",
      "OWASP API Security Top 10",
      "NIST SSDF"
    ]
  );
}
