import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers } from "./fixtures.mjs";
import { assertExists, assertPlaybookFormat, assertRoleFormat, assertSkillFormat } from "./assertions.mjs";

const productAnalyticsArea = "operations.product-analytics";
const externalIntegrationsArea = "operations.external-integrations";

export async function validateCapabilityPacks() {
  const fullAnswers = {
    ...answers,
    initialActivationMode: "all-at-once",
    subareas: [...new Set([...answers.subareas, productAnalyticsArea, externalIntegrationsArea])]
  };
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-capability-packs-"));

  await generateWorkspace(rootDir, fullAnswers);

  await assertProductAnalyticsPack(rootDir);
  await assertExternalIntegrationsPack(rootDir);
  await assertCapabilityPacksAreIndexed(rootDir);
}

async function assertProductAnalyticsPack(rootDir) {
  const base = join(rootDir, "clinic-assistant-ai-os", "operations", "product-analytics");
  const agent = await readFile(join(base, "AGENT.md"), "utf8");
  const readme = await readFile(join(base, "README.md"), "utf8");
  const areaYaml = parse(await readFile(join(base, "area.yaml"), "utf8"));
  const plan = await readFile(join(base, "knowledge", "tracking-plan.md"), "utf8");
  const taxonomy = await readFile(join(base, "knowledge", "event-taxonomy.md"), "utf8");
  const funnel = await readFile(join(base, "knowledge", "funnel-map.md"), "utf8");
  const attribution = await readFile(join(base, "knowledge", "utm-attribution.md"), "utf8");
  const privacy = await readFile(join(base, "knowledge", "tracking-privacy.md"), "utf8");
  const leadRole = await readFile(join(base, "roles", "product-analytics-lead.role.md"), "utf8");
  const trackingPlanSkill = await readFile(join(base, "skills", "tracking-plan/SKILL.md"), "utf8");
  const eventTaxonomySkill = await readFile(join(base, "skills", "event-taxonomy/SKILL.md"), "utf8");
  const funnelAnalysisSkill = await readFile(join(base, "skills", "funnel-analysis/SKILL.md"), "utf8");
  const attributionSkill = await readFile(join(base, "skills", "utm-attribution/SKILL.md"), "utf8");
  const readinessPlaybook = await readFile(join(base, "playbooks", "analytics-readiness.playbook.md"), "utf8");
  const growthEvidencePlaybook = await readFile(join(base, "playbooks", "growth-evidence-review.playbook.md"), "utf8");

  for (const path of [
    "AGENT.md",
    "README.md",
    "area.yaml",
    "knowledge/README.md",
    "knowledge/tracking-plan.md",
    "knowledge/event-taxonomy.md",
    "knowledge/funnel-map.md",
    "knowledge/utm-attribution.md",
    "knowledge/tracking-privacy.md",
    "roles/product-analytics-lead.role.md",
    "skills/tracking-plan/SKILL.md",
    "skills/event-taxonomy/SKILL.md",
    "skills/funnel-analysis/SKILL.md",
    "skills/utm-attribution/SKILL.md",
    "playbooks/analytics-readiness.playbook.md",
    "playbooks/growth-evidence-review.playbook.md"
  ]) {
    await assertExists(join(base, path));
  }

  assert.equal(areaYaml.area.key, productAnalyticsArea, "Product Analytics area.yaml should declare the area key");
  assert.deepEqual(areaYaml.area.source_of_truth, [
    "knowledge/tracking-plan.md",
    "knowledge/event-taxonomy.md",
    "knowledge/funnel-map.md",
    "knowledge/utm-attribution.md",
    "knowledge/tracking-privacy.md"
  ]);
  assert(areaYaml.area.skills.includes("event-taxonomy"), "Product Analytics area YAML should list event-taxonomy");
  assert(areaYaml.area.playbooks.includes("analytics-readiness"), "Product Analytics area YAML should list analytics-readiness");
  assert(agent.includes("Voce e Product Analytics Lead") || agent.includes("Você é Product Analytics Lead"), "Product Analytics AGENT should define the area lead");
  assert(agent.includes("Nao invente metricas") || agent.includes("Não invente métricas"), "Product Analytics AGENT should forbid fabricated metrics");
  assert(agent.includes("activation_required: operations.product-analytics"), "Product Analytics AGENT should expose activation behavior");
  assert(readme.includes("tracking-plan.md"), "Product Analytics README should expose tracking plan");

  for (const content of [plan, taxonomy, funnel, attribution, privacy]) {
    for (const section of ["## Proposito", "## Estado Atual", "## Decisoes", "## Perguntas em Aberto", "## Proxima Atualizacao"]) {
      assert(
        stripAccents(content).includes(section),
        `Product Analytics knowledge should include ${section}`
      );
    }
  }

  assert(plan.includes("eventos"), "Tracking plan should document events");
  assert(taxonomy.includes("funnel") || taxonomy.includes("funil"), "Event taxonomy should connect events to funnel");
  assert(funnel.includes("conversao") || funnel.includes("conversão"), "Funnel map should include conversion");
  assert(attribution.includes("UTM"), "Attribution knowledge should cover UTM");
  assert(privacy.includes("PII") || privacy.includes("dados pessoais"), "Tracking privacy should cover PII or personal data");

  assertRoleFormat(leadRole, "product-analytics-lead");
  for (const [content, name] of [
    [trackingPlanSkill, "tracking-plan"],
    [eventTaxonomySkill, "event-taxonomy"],
    [funnelAnalysisSkill, "funnel-analysis"],
    [attributionSkill, "utm-attribution"]
  ]) {
    assertSkillFormat(content, name);
    assert(content.includes("Use quando"), `${name} should keep concrete trigger language`);
  }

  assertPlaybookFormat(readinessPlaybook, "analytics-readiness");
  assertPlaybookFormat(growthEvidencePlaybook, "growth-evidence-review");
  assert(readinessPlaybook.includes("Product Ops") && readinessPlaybook.includes("Engineering"), "Analytics readiness should bridge Product Ops and Engineering");
  assert(growthEvidencePlaybook.includes("Growth") && growthEvidencePlaybook.includes("experimento"), "Growth evidence review should bridge Growth experiments");
}

async function assertExternalIntegrationsPack(rootDir) {
  const base = join(rootDir, "clinic-assistant-ai-os", "operations", "external-integrations");
  const agent = await readFile(join(base, "AGENT.md"), "utf8");
  const readme = await readFile(join(base, "README.md"), "utf8");
  const areaYaml = parse(await readFile(join(base, "area.yaml"), "utf8"));
  const catalog = await readFile(join(base, "knowledge", "integration-catalog.md"), "utf8");
  const apiContracts = await readFile(join(base, "knowledge", "api-contracts.md"), "utf8");
  const webhooks = await readFile(join(base, "knowledge", "webhook-contracts.md"), "utf8");
  const reliability = await readFile(join(base, "knowledge", "integration-reliability.md"), "utf8");
  const auth = await readFile(join(base, "knowledge", "auth-and-secrets.md"), "utf8");
  const role = await readFile(join(base, "roles", "integration-architect.role.md"), "utf8");
  const apiContractSkill = await readFile(join(base, "skills", "api-contract/SKILL.md"), "utf8");
  const webhookReliabilitySkill = await readFile(join(base, "skills", "webhook-reliability/SKILL.md"), "utf8");
  const idempotencySkill = await readFile(join(base, "skills", "idempotency/SKILL.md"), "utf8");
  const integrationAuthSkill = await readFile(join(base, "skills", "integration-auth/SKILL.md"), "utf8");
  const readinessPlaybook = await readFile(join(base, "playbooks", "integration-readiness.playbook.md"), "utf8");
  const webhookPlaybook = await readFile(join(base, "playbooks", "webhook-readiness.playbook.md"), "utf8");

  for (const path of [
    "AGENT.md",
    "README.md",
    "area.yaml",
    "knowledge/README.md",
    "knowledge/integration-catalog.md",
    "knowledge/api-contracts.md",
    "knowledge/webhook-contracts.md",
    "knowledge/integration-reliability.md",
    "knowledge/auth-and-secrets.md",
    "roles/integration-architect.role.md",
    "skills/api-contract/SKILL.md",
    "skills/webhook-reliability/SKILL.md",
    "skills/idempotency/SKILL.md",
    "skills/integration-auth/SKILL.md",
    "playbooks/integration-readiness.playbook.md",
    "playbooks/webhook-readiness.playbook.md"
  ]) {
    await assertExists(join(base, path));
  }

  assert.equal(areaYaml.area.key, externalIntegrationsArea, "External Integrations area.yaml should declare the area key");
  assert.deepEqual(areaYaml.area.source_of_truth, [
    "knowledge/integration-catalog.md",
    "knowledge/api-contracts.md",
    "knowledge/webhook-contracts.md",
    "knowledge/integration-reliability.md",
    "knowledge/auth-and-secrets.md"
  ]);
  assert(areaYaml.area.skills.includes("idempotency"), "External Integrations area YAML should list idempotency");
  assert(areaYaml.area.playbooks.includes("webhook-readiness"), "External Integrations area YAML should list webhook-readiness");
  assert(agent.includes("Voce e Integration Architect") || agent.includes("Você é Integration Architect"), "External Integrations AGENT should define the area lead");
  assert(agent.includes("Nao armazene segredos") || agent.includes("Não armazene segredos"), "External Integrations AGENT should forbid storing secrets");
  assert(agent.includes("activation_required: operations.external-integrations"), "External Integrations AGENT should expose activation behavior");
  assert(readme.includes("integration-catalog.md"), "External Integrations README should expose the integration catalog");

  for (const content of [catalog, apiContracts, webhooks, reliability, auth]) {
    for (const section of ["## Proposito", "## Estado Atual", "## Decisoes", "## Perguntas em Aberto", "## Proxima Atualizacao"]) {
      assert(
        stripAccents(content).includes(section),
        `External Integrations knowledge should include ${section}`
      );
    }
  }

  assert(apiContracts.includes("payload") || apiContracts.includes("schema"), "API contracts should cover payloads");
  assert(webhooks.includes("retry") && webhooks.includes("idempot"), "Webhook contracts should cover retry and idempotency");
  assert(reliability.includes("fallback") && reliability.includes("logs"), "Integration reliability should cover fallback and logs");
  assert(auth.includes("segredos") || auth.includes("secrets"), "Auth knowledge should cover secrets");

  assertRoleFormat(role, "integration-architect");
  for (const [content, name] of [
    [apiContractSkill, "api-contract"],
    [webhookReliabilitySkill, "webhook-reliability"],
    [idempotencySkill, "idempotency"],
    [integrationAuthSkill, "integration-auth"]
  ]) {
    assertSkillFormat(content, name);
    assert(content.includes("Use quando"), `${name} should keep concrete trigger language`);
  }

  assertPlaybookFormat(readinessPlaybook, "integration-readiness");
  assertPlaybookFormat(webhookPlaybook, "webhook-readiness");
  assert(readinessPlaybook.includes("Security") && readinessPlaybook.includes("DevOps"), "Integration readiness should bridge Security and DevOps");
  assert(webhookPlaybook.includes("retry") && webhookPlaybook.includes("idempot"), "Webhook readiness should require retry and idempotency");
}

async function assertCapabilityPacksAreIndexed(rootDir) {
  const leanos = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const areasIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "areas.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "playbooks.yaml"), "utf8"));
  const intentMap = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "intent-map.yaml"), "utf8"));
  const operationsAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"), "utf8");

  assert(leanos.activation.available_areas.includes(productAnalyticsArea), "leanos.yaml should list Product Analytics as available");
  assert(leanos.activation.available_areas.includes(externalIntegrationsArea), "leanos.yaml should list External Integrations as available");
  assert(leanos.activation.active_areas.includes(productAnalyticsArea), "all-at-once generation should activate Product Analytics");
  assert(leanos.activation.active_areas.includes(externalIntegrationsArea), "all-at-once generation should activate External Integrations");
  assert(areasIndex.areas.some((area) => area.key === productAnalyticsArea), "areas index should include Product Analytics");
  assert(areasIndex.areas.some((area) => area.key === externalIntegrationsArea), "areas index should include External Integrations");
  assert(skillsIndex.skills.some((skill) => skill.key === "event-taxonomy"), "skills index should include event-taxonomy");
  assert(skillsIndex.skills.some((skill) => skill.key === "api-contract"), "skills index should include api-contract");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "analytics-readiness"), "playbooks index should include analytics-readiness");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "integration-readiness"), "playbooks index should include integration-readiness");

  const serializedIntentMap = JSON.stringify(intentMap);
  assert(serializedIntentMap.includes(productAnalyticsArea), "intent map should route analytics work");
  assert(serializedIntentMap.includes(externalIntegrationsArea), "intent map should route integration work");
  assert(operationsAgent.includes("Product Analytics"), "Operations AGENT should route analytics work");
  assert(operationsAgent.includes("External Integrations"), "Operations AGENT should route integration work");
}

function stripAccents(content) {
  return content.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
