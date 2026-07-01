import assert from "node:assert/strict";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export function validateSkillQualityPass() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));

  assertSkillNamesAreCapabilities(byPath);
  assertSkillTemplate(byPath);
  assertSecuritySkillQuality(byPath);
  assertGrowthSkillQuality(byPath);
  assertDesignSkillQuality(byPath);
  assertStrategyCoherenceQuality(byPath);
}

function requiredFile(byPath, path) {
  const content = byPath.get(path);
  assert(content, `${path} should exist`);
  return content;
}

function assertSkillTemplate(byPath) {
  const skillPaths = [...byPath.keys()].filter((path) => path.endsWith("/SKILL.md"));

  assert(skillPaths.length > 0, "Workspace should generate skills for validation");

  for (const path of skillPaths) {
    const content = byPath.get(path);

    for (const section of [
      "## Visão Geral",
      "## Use Quando",
      "## Contexto Obrigatório",
      "## Entradas",
      "## Processo",
      "### Etapa 1",
      "## Verificações e Critérios de Aceite",
      "## Saída",
      "## Arquivos para Atualizar",
      "## Linhas Vermelhas"
    ]) {
      assert(content.includes(section), `${path} should follow the required SKILL.md template section: ${section}`);
    }
  }
}

function assertSkillNamesAreCapabilities(byPath) {
  const forbiddenActionPrefixes = [
    "analyze",
    "check",
    "configure",
    "create",
    "define",
    "implement",
    "map",
    "plan",
    "prepare",
    "review",
    "setup",
    "synthesize",
    "write"
  ];
  const forbiddenActionSuffixes = ["check"];
  const skillSlugs = [...byPath.keys()]
    .map((path) => path.match(/\/skills\/([^/]+)\/SKILL\.md$/)?.[1])
    .filter(Boolean);
  const actionNamedSkills = skillSlugs.filter((slug) =>
    forbiddenActionPrefixes.some((prefix) => slug.startsWith(`${prefix}-`)) ||
    forbiddenActionSuffixes.some((suffix) => slug.endsWith(`-${suffix}`))
  );

  assert.deepEqual(actionNamedSkills, [], "Generated skill slugs should name stable capabilities, not imperative actions");
}

function assertSecuritySkillQuality(byPath) {
  const apiSecurityReview = requiredFile(byPath, "clinic-assistant-ai-os/operations/security/skills/api-security-review/SKILL.md");
  const databaseSecurityReview = requiredFile(byPath, "clinic-assistant-ai-os/operations/security/skills/database-security-review/SKILL.md");
  const incidentResponse = requiredFile(byPath, "clinic-assistant-ai-os/operations/security/skills/incident-response/SKILL.md");

  assert(apiSecurityReview.includes("Decisão de API Security: pass, concerns, blocked ou not_applicable"), "API security review should output a structured decision");
  assert(apiSecurityReview.includes("authn/authz server-side"), "API security review should explicitly check server-side authn/authz");
  assert(apiSecurityReview.includes("rate limit, abuse limit ou quota"), "API security review should check abuse controls");
  assert(apiSecurityReview.includes("Evidência revisada"), "API security review should require reviewed evidence");
  assert(apiSecurityReview.includes("Não aprove endpoint sensível sem authn/authz server-side"), "API security review should block missing auth on sensitive endpoints");

  assert(databaseSecurityReview.includes("Decisão de Database Security: pass, concerns, blocked ou not_applicable"), "Database security review should output a structured decision");
  assert(databaseSecurityReview.includes("tenant isolation"), "Database security review should check tenant isolation");
  assert(databaseSecurityReview.includes("backup, rollback e plano de migração"), "Database security review should require backup and rollback");
  assert(databaseSecurityReview.includes("queries parametrizadas"), "Database security review should require parameterized queries");
  assert(databaseSecurityReview.includes("Não aprove migração destrutiva sem backup, rollback e confirmação explícita"), "Database security review should block destructive migration without rollback");

  assert(incidentResponse.includes("Classifique severidade como sev1, sev2, sev3 ou sev4"), "Incident response should classify severity");
  assert(incidentResponse.includes("contido, mitigado, monitorando ou resolvido"), "Incident response should define incident status");
  assert(incidentResponse.includes("rotação de secrets"), "Incident response should handle secret rotation");
  assert(incidentResponse.includes("comunicação ao founder e clientes afetados"), "Incident response should include communication handling");
  assert(incidentResponse.includes("postmortem"), "Incident response should include postmortem follow-up");
  assert(incidentResponse.includes("Não alegue resolução sem verificação e janela de monitoramento"), "Incident response should forbid unverified resolution claims");
}

function assertGrowthSkillQuality(byPath) {
  const definePositioning = requiredFile(byPath, "clinic-assistant-ai-os/growth/marketing/skills/positioning/SKILL.md");
  const mapCustomerFeedback = requiredFile(byPath, "clinic-assistant-ai-os/growth/customer-experience/skills/customer-feedback-mapping/SKILL.md");
  const modelUnitEconomics = requiredFile(byPath, "clinic-assistant-ai-os/growth/finance/skills/model-unit-economics/SKILL.md");

  assert(definePositioning.includes("categoria, ICP, alternativa, promessa, diferenciação e prova disponível"), "Positioning skill should cover complete positioning components");
  assert(definePositioning.includes("Mapa de claims: permitido, incerto, proibido"), "Positioning skill should produce a claims map");
  assert(definePositioning.includes("Roteie claims sem prova para experimento de Growth"), "Positioning skill should route unsupported claims to experiments");
  assert(definePositioning.includes("Não use posicionamento genérico que poderia servir para qualquer produto"), "Positioning skill should block generic positioning");

  assert(mapCustomerFeedback.includes("Remova PII, segredos, dados sensíveis e identificadores desnecessários"), "Customer feedback skill should redact sensitive data");
  assert(mapCustomerFeedback.includes("Classifique força do sinal como isolated, repeated, pattern ou critical"), "Customer feedback skill should classify signal strength");
  assert(mapCustomerFeedback.includes("Não transforme feedback isolado em Feature sem Product Ops"), "Customer feedback skill should block isolated feedback becoming a Feature");
  assert(mapCustomerFeedback.includes("Próxima rota: Customer Experience, Product Ops, Strategy, Growth Marketing ou Finance"), "Customer feedback skill should route the next owner");

  assert(modelUnitEconomics.includes("Calcule de forma direcional: gross_margin, contribution_margin, payback e break_even"), "Unit economics skill should define directional formulas");
  assert(modelUnitEconomics.includes("confidence_level: low, medium ou high"), "Unit economics skill should output confidence level");
  assert(modelUnitEconomics.includes("Use Pricing Catalog e Spend Ledger como fontes"), "Unit economics skill should use Finance sources of truth");
  assert(modelUnitEconomics.includes("Não apresente unit economics como certeza quando dados forem incompletos"), "Unit economics skill should block false precision");
}

function assertDesignSkillQuality(byPath) {
  const designSkillPaths = [
    "clinic-assistant-ai-os/operations/design/skills/user-research/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/user-flow-mapping/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/design-system/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/component-analysis/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/screen-specification/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/microcopy/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/accessibility/SKILL.md",
    "clinic-assistant-ai-os/operations/design/skills/design-review/SKILL.md"
  ];

  for (const path of designSkillPaths) {
    const content = requiredFile(byPath, path);

    for (const forbiddenEnglish of [
      "Evidence summary",
      "Flow decision status",
      "MVP design-system decision",
      "Component decision:",
      "Implementation-ready screen spec",
      "Copy decision status",
      "WCAG 2.2 AA notes",
      "Findings ordered by severity"
    ]) {
      assert(!content.includes(forbiddenEnglish), `${path} should use PT-BR output labels instead of ${forbiddenEnglish}`);
    }
  }

  const userResearch = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/user-research/SKILL.md");
  const userFlowMapping = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/user-flow-mapping/SKILL.md");
  const designSystem = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/design-system/SKILL.md");
  const microcopy = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/microcopy/SKILL.md");
  const designReview = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/design-review/SKILL.md");

  assert(userResearch.includes("confiança da evidência: alta, média, baixa ou suposição"), "User research should classify evidence confidence in PT-BR");
  assert(userFlowMapping.includes("Decisão de fluxo: pronto, com ressalvas, bloqueado ou não aplicável"), "User flow mapping should use structured flow decision");
  assert(designSystem.includes("Decisão de design system do MVP: pronto, com ressalvas, bloqueado ou não aplicável"), "Design system should use structured readiness decision");
  assert(microcopy.includes("Não aprove copy que esconda restrição, risco, preço, limite ou promessa sem fonte"), "Microcopy should block unsupported product promises");
  assert(designReview.includes("Ordene achados por severidade: blocker, high, medium, low"), "Design review should order findings by severity in PT-BR");
}

function assertStrategyCoherenceQuality(byPath) {
  const coherence = requiredFile(byPath, "clinic-assistant-ai-os/strategy/product/skills/coherence/SKILL.md");

  assert(coherence.includes("Matriz de coerência"), "Coherence skill should use an explicit matrix");
  assert(coherence.includes("ICP, problema, promessa, alternativa, MVP Validation Scope, roadmap, Feature e evidência"), "Coherence skill should cover the product chain");
  assert(coherence.includes("Classifique cada dimensão como aligned, weak, conflict ou missing"), "Coherence skill should classify each dimension");
  assert(coherence.includes("Não use score sem explicar critérios e evidência"), "Coherence skill should block unsupported scoring");
  assert(coherence.includes("Não aprove implementação a partir de uma checagem de coerência"), "Coherence skill should forbid implementation approval");
}
