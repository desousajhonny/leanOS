import type { AreaDefinition } from "../../../../types.js";
import { operationsExternalIntegrationsSourceOfTruth, operationsExternalIntegrationsFiles } from "./files.js";
import { operationsExternalIntegrationsRoles } from "./roles.js";
import { operationsExternalIntegrationsSkills } from "./skills.js";
import { operationsExternalIntegrationsPlaybooks } from "./playbooks.js";
import { operationsExternalIntegrationsCommonPaths } from "./common-paths.js";

export const operationsExternalIntegrationsArea: AreaDefinition = {
  key: "operations.external-integrations",
  root: "operations",
  slug: "external-integrations",
  name: "External Integrations",
  path: "operations/external-integrations",
  lead: {
    title: "Integration Architect",
    purpose: "Route external API, webhook, auth, idempotency, retry, fallback and safe logging work before Engineering changes provider-facing code."
  },
  routingKey: "external_integrations",
  requestTypes: "external APIs, webhooks, third-party providers, payload contracts, integration auth, idempotency, retry, fallback or safe integration logs",
  purpose: "Own third-party integration contracts and reliability expectations before implementation, launch or support workflows rely on external systems.",
  whenToUse: [
    "a Feature calls an external API, payment provider, CRM, email tool, automation platform or AI provider",
    "a webhook needs payload, signature, retry, idempotency or duplicate-event handling",
    "provider authentication, secrets, quotas, rate limits or fallback behavior are unclear",
    "support or reliability depends on safe logs for an external integration"
  ],
  operatingRules: [
    "Use External Integrations as the source of truth for provider catalog, API contracts, webhook contracts, reliability and auth boundaries.",
    "Route secrets, credentials, auth boundaries and sensitive payloads to Security before implementation when risk exists.",
    "Route environment variables, provider setup, CI secrets and runtime config to DevOps before remote actions.",
    "Route code implementation to Engineering only after contract, auth, retry/idempotency and logging expectations are explicit.",
    "If this area is inactive and a request needs external API, webhook, payload, auth, retry, idempotency, fallback or safe logs, return `activation_required: operations.external-integrations`."
  ],
  redLines: [
    "Não armazene segredos, tokens, webhook secrets, OAuth credentials ou service account keys em markdown, Git, logs ou prompts.",
    "Não implemente chamada remota sem contrato de payload, comportamento de erro e fallback conhecidos.",
    "Não implemente webhook com efeito colateral sem idempotência.",
    "Não registre payload sensível, PII, token ou resposta de provider em logs.",
    "Não chame API externa ou escreva estado remoto sem confirmação explícita."
  ],
  sourceOfTruth: operationsExternalIntegrationsSourceOfTruth,
  files: operationsExternalIntegrationsFiles,
  roles: operationsExternalIntegrationsRoles,
  skills: operationsExternalIntegrationsSkills,
  playbooks: operationsExternalIntegrationsPlaybooks,
  commonPaths: operationsExternalIntegrationsCommonPaths
};
