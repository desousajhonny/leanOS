import type { PlaybookDefinition } from "../../../../types.js";

export const operationsExternalIntegrationsPlaybooks: PlaybookDefinition[] = [
  {
    slug: "integration-readiness",
    title: "Integration Readiness",
    purpose: "Prepare an external integration contract before Engineering implements provider-facing behavior.",
    useWhen: [
      "uma Feature depende de API externa, provider pago, CRM, email, pagamento, automacao ou AI provider",
      "payload, autenticacao, erros, fallback, limites ou logs de integracao ainda estao incertos",
      "Product Ops precisa de criterio de prontidao para uma integracao antes de enviar para Engineering"
    ],
    beforeActing: ["../AGENT.md", "../knowledge/integration-catalog.md", "../knowledge/api-contracts.md", "../knowledge/integration-reliability.md", "../knowledge/auth-and-secrets.md", "../../security/AGENT.md when security risk applies", "../../devops/AGENT.md when environment or provider setup applies"],
    inputs: ["Feature or provider request", "Provider docs or known contract", "Payload needs", "Auth model", "Environment needs", "Reliability expectations", "Security and DevOps applicability"],
    steps: [
      "Identify provider, business purpose, data categories and user-facing impact.",
      "Use `skills/api-contract/SKILL.md` to define endpoint, method, payload, response, errors and limits.",
      "Use `skills/integration-auth/SKILL.md` to classify auth, secrets, owner and environment without storing values.",
      "Use `skills/idempotency/SKILL.md` when the integration can create, charge, send, mutate or duplicate state.",
      "Use `skills/safe-integration-logging/SKILL.md` to define logs without exposing secrets, PII or sensitive payloads.",
      "Route Security when auth, PII, customer data, payment, abuse or sensitive payload risk exists.",
      "Route DevOps when provider setup, environment secrets, CI config, quotas or runtime config are involved.",
      "Write integration requirements into the Feature implementation packet before Engineering when the Feature is concrete."
    ],
    gates: [
      "Provider purpose and owner are explicit.",
      "Payload contract and error behavior are known or blocked.",
      "Auth and secrets have source and owner without secret values.",
      "Retry, idempotency, fallback and safe logs are explicit when applicable.",
      "Security and DevOps applicability are resolved before Engineering."
    ],
    outputs: ["Integration readiness result", "API contract summary", "Auth and secrets status", "Reliability requirements", "Security/DevOps routing", "Engineering handoff"],
    filesToUpdate: [
      "Update `../knowledge/integration-catalog.md` only after confirmation.",
      "Update `../knowledge/api-contracts.md` only after confirmation.",
      "Update `../knowledge/integration-reliability.md` only after confirmation.",
      "Update `../knowledge/auth-and-secrets.md` only after confirmation.",
      "Update Feature implementation packet only after Product Ops or founder confirmation."
    ],
    stopConditions: [
      "Stop if provider, purpose or data category is unknown.",
      "Stop if the request requires a secret value in chat or markdown.",
      "Stop before Engineering when auth, payload, error behavior or fallback is unclear.",
      "Stop if Security or DevOps is required but inactive; return activation_required for the smallest missing area."
    ],
    redLines: [
      "Não armazenar segredos.",
      "Não fazer chamada remota sem confirmação explícita.",
      "Não implementar integração sem contrato mínimo de payload e erro.",
      "Não ignorar Security ou DevOps quando auth, dados, ambiente ou provider setup estiverem envolvidos."
    ]
  },
  {
    slug: "webhook-readiness",
    title: "Webhook Readiness",
    purpose: "Prepare inbound or outbound webhook contracts before implementation or launch depends on event delivery.",
    useWhen: [
      "um provider envia ou recebe webhooks que podem criar, cobrar, atualizar ou disparar mensagens",
      "retry, assinatura, idempotencia, ordem de eventos ou deduplicacao de webhook estao incertos",
      "um launch ou suporte depende de confiabilidade de webhook e logs seguros"
    ],
    beforeActing: ["../AGENT.md", "../knowledge/webhook-contracts.md", "../knowledge/integration-reliability.md", "../knowledge/auth-and-secrets.md", "../../security/AGENT.md when signature or sensitive payload risk applies", "../../devops/AGENT.md when endpoint, secret or runtime setup applies"],
    inputs: ["Provider", "Webhook event", "Direction", "Payload", "Signature model", "Retry behavior", "Idempotency key", "Side effects", "Logging needs"],
    steps: [
      "Classify the webhook as inbound or outbound and identify the side effect.",
      "Use `skills/webhook-reliability/SKILL.md` to define retry, ordering, failure and duplicate-event behavior.",
      "Use `skills/idempotency/SKILL.md` to define idempotency key and duplicate handling.",
      "Use `skills/integration-auth/SKILL.md` to define signature, webhook secret source and environment owner without storing values.",
      "Use `skills/safe-integration-logging/SKILL.md` to define safe logs for debugging delivery without leaking payloads.",
      "Route Security when signature validation, payment, customer data, PII or abuse risk exists.",
      "Route DevOps when endpoint, secret manager, environment, alerting or provider setup is needed.",
      "Return a ready, blocked-by-auth, blocked-by-idempotency, blocked-by-payload or blocked-by-runtime decision."
    ],
    gates: [
      "Inbound webhook validates signature when provider supports it.",
      "Every side effect has idempotency or an explicit not-applicable reason.",
      "Retry behavior avoids duplicate charges, messages, user creation or destructive mutation.",
      "Logs exclude secrets, tokens, PII and sensitive payload values.",
      "Failure mode and fallback are explicit."
    ],
    outputs: ["Webhook readiness decision", "Payload contract", "Signature/auth status", "Retry and idempotency plan", "Safe logging plan", "Blocking gaps"],
    filesToUpdate: [
      "Update `../knowledge/webhook-contracts.md` only after confirmation.",
      "Update `../knowledge/integration-reliability.md` only after confirmation.",
      "Update `../knowledge/auth-and-secrets.md` only after confirmation."
    ],
    stopConditions: [
      "Stop if webhook side effects are unknown.",
      "Stop if signature, secret source or idempotency is required but undefined.",
      "Stop if logs would expose sensitive payloads.",
      "Stop if provider docs or payload examples are unavailable and cannot be confirmed by the founder."
    ],
    redLines: [
      "Não implemente webhook mutável sem idempotência.",
      "Não logue payload sensível.",
      "Não ignore assinatura de webhook quando o provider oferece validação.",
      "Não trate retry como seguro sem deduplicação."
    ]
  }
];
