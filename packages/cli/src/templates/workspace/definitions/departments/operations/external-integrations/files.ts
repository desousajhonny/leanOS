import type { AreaFileDefinition } from "../../../../types.js";
import { folderReadme } from "../../../../content/shared.js";

export const operationsExternalIntegrationsSourceOfTruth = [
  "knowledge/integration-catalog.md",
  "knowledge/api-contracts.md",
  "knowledge/webhook-contracts.md",
  "knowledge/integration-reliability.md",
  "knowledge/auth-and-secrets.md"
];

export const operationsExternalIntegrationsFiles: AreaFileDefinition[] = [
  {
    path: "knowledge/README.md",
    content: () => folderReadme(
      "External Integrations Knowledge",
      "Fonte da verdade para APIs externas, webhooks, payloads, retry, idempotencia, autenticacao, fallback e logs seguros.",
      "Use quando o produto depender de terceiros, APIs, webhooks, CRM, pagamentos, email, automacoes ou providers externos.",
      "integration-catalog.md",
      ["integration-catalog.md", "api-contracts.md", "webhook-contracts.md", "integration-reliability.md", "auth-and-secrets.md"],
      ["../roles/", "../skills/", "../playbooks/", "../../security/", "../../devops/", "../../product-ops/knowledge/implementation-packets/"],
      "Nao armazene segredos. Documente fontes, owners, ambientes, payloads e riscos, nunca valores de token ou credenciais."
    )
  },
  { path: "knowledge/integration-catalog.md", content: integrationCatalogKnowledge },
  { path: "knowledge/api-contracts.md", content: apiContractsKnowledge },
  { path: "knowledge/webhook-contracts.md", content: webhookContractsKnowledge },
  { path: "knowledge/integration-reliability.md", content: integrationReliabilityKnowledge },
  { path: "knowledge/auth-and-secrets.md", content: authAndSecretsKnowledge }
];

function integrationCatalogKnowledge(): string {
  return `# Integration Catalog

## Propósito

Registrar providers externos, owner, finalidade, ambiente, status e riscos de cada integracao usada pelo produto.

## Estado Atual

TBD

## Catalogo

| Provider | Finalidade | Ambiente | Owner | Status | Riscos |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | local/preview/prod | TBD | planned/active/deprecated/blocked | TBD |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function apiContractsKnowledge(): string {
  return `# API Contracts

## Propósito

Definir contratos de API externa, payload, schema, autenticacao, limites, erros e fallback antes de implementar chamadas remotas.

## Estado Atual

TBD

## Contratos

| Provider | Endpoint | Metodo | Payload | Resposta | Erros | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | GET/POST/PATCH/DELETE | TBD | TBD | TBD | draft/confirmed/implemented |

## Regras

- Defina payload minimo antes de codar.
- Registre campos obrigatorios, opcionais e proibidos.
- Marque breaking changes e versionamento quando existirem.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function webhookContractsKnowledge(): string {
  return `# Webhook Contracts

## Propósito

Definir eventos recebidos ou enviados por webhook com payload, assinatura, retry, idempotencia e verificacao segura.

## Estado Atual

TBD

## Webhooks

| Provider | Evento | Direcao | Payload | Retry | Idempotencia | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | inbound/outbound | TBD | TBD | TBD | draft/confirmed/implemented |

## Regras

- Toda entrada inbound deve validar assinatura quando provider suportar.
- Toda mutacao por webhook deve ter chave de idempotencia.
- Retry deve evitar duplicar cobranca, mensagem, criacao de usuario ou efeito colateral.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function integrationReliabilityKnowledge(): string {
  return `# Integration Reliability

## Propósito

Definir comportamento de timeout, retry, idempotencia, fallback, degradacao, alertas e logs seguros para integracoes externas.

## Estado Atual

TBD

## Reliability Matrix

| Integracao | Timeout | Retry | Fallback | Logs Seguros | Owner |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | sem PII/secrets | TBD |

## Regras

- Falha de provider externo deve ter comportamento esperado.
- Logs nao devem conter tokens, payload sensivel, PII ou dados de cliente desnecessarios.
- Fallback deve preservar experiencia do usuario ou expor erro claro quando nao houver alternativa.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

function authAndSecretsKnowledge(): string {
  return `# Auth And Secrets

## Propósito

Registrar fonte, owner e ambiente de autenticacao de integracoes externas sem armazenar segredos, tokens ou credenciais.

## Estado Atual

TBD

## Mapa de Credenciais

| Provider | Tipo | Fonte Segura | Ambiente | Owner | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | API key/OAuth/webhook secret/service account | provider/CI/secret manager | local/preview/prod | TBD | unknown/ready/blocked |

## Regras

- Nunca salve valores de secrets em markdown, Git, logs ou prompts.
- Diferencie ID publico, config privada e segredo.
- Rotacione credenciais expostas antes de continuar implementacao.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
