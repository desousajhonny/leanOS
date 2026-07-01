import type { RoleDefinition } from "../../../../types.js";

export const operationsExternalIntegrationsRoles: RoleDefinition[] = [
  {
    slug: "integration-architect",
    title: "Integration Architect",
    purpose: "Define external integration contracts, auth boundaries, reliability behavior and safe logs before Engineering implements third-party dependencies.",
    useWhen: [
      "a Feature depends on external APIs, providers, webhooks, CRM, email, payments or automation tools",
      "auth, secrets, payloads, retry, idempotency, fallback or logs are unclear",
      "Security, DevOps and Engineering need a shared contract before implementation"
    ],
    beforeActing: [
      "../AGENT.md",
      "../knowledge/integration-catalog.md",
      "../knowledge/api-contracts.md",
      "../knowledge/webhook-contracts.md",
      "../knowledge/integration-reliability.md",
      "../knowledge/auth-and-secrets.md",
      "../../security/knowledge/security-baseline.md",
      "../../devops/knowledge/environments.md"
    ],
    skills: ["api-contract", "webhook-reliability", "idempotency", "integration-auth", "safe-integration-logging"],
    playbooks: ["integration-readiness", "webhook-readiness"],
    outputs: ["Integration readiness status", "API or webhook contract", "Auth and secrets boundary", "Reliability plan", "Security/DevOps/Engineering handoff"],
    redLines: [
      "Não armazene segredos.",
      "Não aprove integração sem payload, erros, auth e fallback mínimos.",
      "Não implemente webhook mutável sem idempotência."
    ]
  }
];
