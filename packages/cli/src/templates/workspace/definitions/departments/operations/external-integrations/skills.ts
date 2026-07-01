import type { SkillDefinition } from "../../../../types.js";

export const operationsExternalIntegrationsSkills: SkillDefinition[] = [
  {
    slug: "api-contract",
    title: "API Contract",
    purpose: "Define endpoint, payload, response, error behavior, limits and versioning for external API calls.",
    useWhen: [
      "uma Feature chama API externa e precisa de endpoint, payload, resposta e erros definidos",
      "provider docs precisam virar contrato implementavel para Engineering",
      "payload, schema, rate limit ou breaking change podem quebrar fluxo de usuario"
    ],
    requiredContext: ["External Integrations AGENT", "api-contracts.md", "integration-catalog.md", "Feature implementation packet when available"],
    inputs: ["Provider", "Endpoint", "Method", "Payload", "Response", "Errors", "Rate limits", "Versioning"],
    process: [
      "Identify the provider purpose and user-facing behavior.",
      "Capture endpoint, method, required payload fields, optional fields and forbidden fields.",
      "Capture expected response, error cases, rate limits and versioning risk.",
      "Define fallback or blocked behavior when provider returns error.",
      "Return an Engineering-ready contract or blocked-by-missing-provider-info."
    ],
    checks: ["Payload is explicit", "Error behavior is explicit", "Rate limit or quota is noted when relevant", "Sensitive fields are flagged", "Fallback or user-facing error is known"],
    outputs: ["API contract", "Payload schema", "Error behavior", "Fallback notes", "Engineering handoff"],
    filesToUpdate: ["Update `../knowledge/api-contracts.md` only after confirmation.", "Update Feature implementation packet only after confirmation."],
    redLines: ["Não codar contra API externa sem contrato mínimo.", "Não inventar provider behavior ausente.", "Não registrar dados sensíveis em exemplos de payload."]
  },
  {
    slug: "webhook-reliability",
    title: "Webhook Reliability",
    purpose: "Define webhook delivery, signature, retry, ordering, duplicate-event and failure behavior before implementation.",
    useWhen: [
      "webhook inbound ou outbound pode criar, cobrar, enviar mensagem ou alterar estado",
      "retry, assinatura, ordem de evento ou duplicidade de webhook precisam de regra",
      "suporte precisa debugar falhas de webhook sem expor payload sensivel"
    ],
    requiredContext: ["External Integrations AGENT", "webhook-contracts.md", "integration-reliability.md", "auth-and-secrets.md"],
    inputs: ["Webhook direction", "Event", "Payload", "Signature model", "Retry behavior", "Side effect", "Failure mode"],
    process: [
      "Classify webhook direction and side effect.",
      "Document payload, signature validation and event source.",
      "Define retry, ordering, duplicate-event and dead-letter behavior when applicable.",
      "Route idempotency decisions to `idempotency` when side effects exist.",
      "Define safe debugging notes and status."
    ],
    checks: ["Signature status is explicit", "Retry behavior is explicit", "Duplicate handling is explicit", "Side effects are listed", "Failure mode is visible"],
    outputs: ["Webhook reliability plan", "Retry rules", "Signature status", "Duplicate-event handling", "Failure behavior"],
    filesToUpdate: ["Update `../knowledge/webhook-contracts.md` only after confirmation.", "Update `../knowledge/integration-reliability.md` only after confirmation."],
    redLines: ["Não aceitar webhook sensível sem assinatura quando provider suporta.", "Não tratar retry como seguro sem duplicidade resolvida.", "Não esconder falhas de entrega."]
  },
  {
    slug: "idempotency",
    title: "Idempotency",
    purpose: "Define idempotency keys and duplicate handling for external effects that can be retried or replayed.",
    useWhen: [
      "uma chamada externa ou webhook pode criar cobrança, usuario, mensagem, assinatura ou mutacao",
      "retry, replay, timeout ou duplicate event podem executar efeito colateral duas vezes",
      "Engineering precisa de chave de idempotencia antes de implementar fluxo com provider"
    ],
    requiredContext: ["External Integrations AGENT", "webhook-contracts.md", "integration-reliability.md", "API or webhook contract"],
    inputs: ["Operation", "Side effect", "Retry source", "Idempotency key candidate", "Storage or lookup method", "Conflict behavior"],
    process: [
      "Identify the side effect that must not duplicate.",
      "Define idempotency key source and scope.",
      "Define storage, lookup or provider-native idempotency behavior.",
      "Define conflict result for duplicate, expired, mismatched or replayed requests.",
      "Return idempotency-ready, not-applicable or blocked-by-state-design."
    ],
    checks: ["Side effect is explicit", "Key source is stable", "Conflict behavior is explicit", "Retry/replay path is covered", "No destructive mutation lacks duplicate handling"],
    outputs: ["Idempotency decision", "Idempotency key", "Duplicate handling", "Conflict behavior", "Engineering notes"],
    filesToUpdate: ["Update `../knowledge/integration-reliability.md` only after confirmation.", "Update webhook or API contract only after confirmation."],
    redLines: ["Não implementar efeito colateral externo sem idempotência ou justificativa de não aplicável.", "Não usar chave instável.", "Não ignorar replay de webhook."]
  },
  {
    slug: "integration-auth",
    title: "Integration Auth",
    purpose: "Map provider authentication, secret source, environment ownership and rotation needs without storing secret values.",
    useWhen: [
      "integracao externa precisa de API key, OAuth, webhook secret, service account ou provider token",
      "ambientes local, preview e producao precisam de owners e fontes de segredo",
      "um token foi exposto, esta ausente ou precisa de rotacao antes da implementacao"
    ],
    requiredContext: ["External Integrations AGENT", "auth-and-secrets.md", "DevOps environments", "Security baseline when active"],
    inputs: ["Provider", "Auth type", "Secret source", "Environment", "Owner", "Rotation status", "Exposure risk"],
    process: [
      "Classify auth as public ID, private config or secret.",
      "Record source and owner without recording values.",
      "Separate local, preview/staging and production needs.",
      "Route exposed or uncertain secrets to Security and DevOps.",
      "Return ready, blocked-by-secret, rotation-required or owner-needed."
    ],
    checks: ["No secret value is documented", "Owner is explicit or blocked", "Environment is explicit", "Rotation status is visible", "Security/DevOps routing is explicit when needed"],
    outputs: ["Auth boundary", "Secret source map", "Owner and environment status", "Rotation need", "Blocked gaps"],
    filesToUpdate: ["Update `../knowledge/auth-and-secrets.md` only after confirmation.", "Update DevOps environment notes only through DevOps."],
    redLines: ["Não pedir segredo no chat.", "Não salvar token em markdown, Git, log ou prompt.", "Não misturar config pública com segredo."]
  },
  {
    slug: "safe-integration-logging",
    title: "Safe Integration Logging",
    purpose: "Define logs, redaction and debugging signals for external integrations without leaking secrets, PII or sensitive payloads.",
    useWhen: [
      "suporte precisa debugar API externa, webhook, retry, timeout ou falha de provider",
      "logs de integracao podem conter token, payload sensivel, PII ou dados de cliente",
      "observabilidade de provider precisa de sinais seguros antes de launch ou PR"
    ],
    requiredContext: ["External Integrations AGENT", "integration-reliability.md", "auth-and-secrets.md", "Security baseline when active", "DevOps observability when active"],
    inputs: ["Integration", "Failure modes", "Payload categories", "Sensitive fields", "Debugging needs", "Observability target"],
    process: [
      "Identify what support or Engineering must debug.",
      "Classify fields as safe, redact, hash, aggregate or never-log.",
      "Define correlation IDs and status codes instead of raw sensitive payloads.",
      "Route logs with PII, secrets or customer data to Security before approval.",
      "Return safe log fields, redaction rules and observability gaps."
    ],
    checks: ["Secrets are never logged", "PII and sensitive payloads are redacted or blocked", "Correlation is possible without raw payload", "Failure signals are actionable", "Retention or destination risk is visible"],
    outputs: ["Safe logging plan", "Redaction rules", "Allowed fields", "Blocked fields", "Observability handoff"],
    filesToUpdate: ["Update `../knowledge/integration-reliability.md` only after confirmation.", "Update DevOps observability only through DevOps."],
    redLines: ["Não logar tokens, secrets ou Authorization headers.", "Não logar payload sensível bruto.", "Não criar logs ruidosos sem owner ou ação."]
  }
];
