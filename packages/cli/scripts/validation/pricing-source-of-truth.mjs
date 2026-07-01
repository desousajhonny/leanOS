import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers, projectRoot } from "./fixtures.mjs";

export async function validatePricingSourceOfTruthContract() {
  await assertPricingSourceOfTruthDocs();

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-pricing-source-of-truth-"));

  await generateWorkspace(rootDir, answers);
  await activateWorkspaceArea(rootDir, "growth.finance");
  await activateWorkspaceArea(rootDir, "growth.marketing");
  await activateWorkspaceArea(rootDir, "growth.customer-experience");
  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");
  await activateWorkspaceArea(rootDir, "operations.devops");
  await activateWorkspaceArea(rootDir, "operations.security");

  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const intentMap = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "intent-map.yaml"), "utf8"));
  const whereWeAre = await readFile(join(rootDir, ".leanos", "runtime", "agent", "protocols", "where-we-are.md"), "utf8");
  const pricing = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "knowledge", "pricing.md"), "utf8");
  const financeOperator = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "roles", "finance-operator.role.md"), "utf8");
  const reviewPricing = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "skills", "review-pricing", "SKILL.md"), "utf8");
  const financeReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "playbooks", "finance-review.playbook.md"), "utf8");
  const landingPage = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "knowledge", "landing-page.md"), "utf8");
  const landingPageSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "skills", "create-landing-page-copy", "SKILL.md"), "utf8");
  const supportNotes = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "knowledge", "support-notes.md"), "utf8");
  const supportPatternsSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "skills", "synthesize-support-patterns", "SKILL.md"), "utf8");
  const readyToDevelop = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "knowledge", "ready-to-develop.md"), "utf8");
  const writeFeatureCriteria = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "skills", "write-feature-criteria", "SKILL.md"), "utf8");
  const deliveryBoundaries = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "skills", "define-delivery-boundaries", "SKILL.md"), "utf8");
  const dataGuidelines = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "data-guidelines.md"), "utf8");
  const reviewCriteria = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "review-criteria.md"), "utf8");
  const environments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "environments.md"), "utf8");
  const configureEnvironments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "configure-environments", "SKILL.md"), "utf8");
  const securityBaseline = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "security-baseline.md"), "utf8");
  const threatModeling = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "threat-modeling", "SKILL.md"), "utf8");

  assert(rootAgent.includes("`.leanos/runtime/index/intent-map.yaml`"), "Root AGENT should route pricing and plan requests through intent map");
  assert(intentMap.intents.pricing.signals.includes("planos"), "Intent map should route pricing and plan requests");
  assert.equal(intentMap.intents.pricing.activation_required, "growth.finance", "Intent map should activate Growth Finance for pricing requests");
  assert(whereWeAre.includes("growth/finance/knowledge/pricing.md"), "Where-we-are should load the Pricing Catalog for pricing readiness");

  for (const requiredContent of [
    "Growth Finance é o owner do Pricing Catalog",
    "## Pricing Catalog",
    "plan_id",
    "Nome público",
    "Preço",
    "Status",
    "Entitlements",
    "Provider ID",
    "draft, active, deprecated, grandfathered, hidden, archived",
    "## Runtime Source",
    "billing provider",
    "database table",
    "code path",
    "## Consumer Contract",
    "Não use chat, landing page, código ou README como fonte canônica de preço.",
    "## Change Control"
  ]) {
    assert(pricing.includes(requiredContent), `Pricing knowledge should include source-of-truth contract content: ${requiredContent}`);
  }

  assert(financeOperator.includes("skills/review-pricing/SKILL.md"), "Finance Operator should point directly to review-pricing skill");
  assert(financeOperator.includes("playbooks/finance-review.playbook.md"), "Finance Operator should point directly to finance-review playbook");
  assert(reviewPricing.includes("Pricing Catalog decision"), "review-pricing should produce a Pricing Catalog decision");
  assert(reviewPricing.includes("Runtime Source"), "review-pricing should require runtime source mapping");
  assert(reviewPricing.includes("Não aprove plano, preço, trial, limite ou entitlement fora de `../knowledge/pricing.md`"), "review-pricing should block off-catalog pricing");
  assert(financeReview.includes("Confirme `../knowledge/pricing.md` como fonte canônica"), "finance-review should confirm pricing source of truth");
  assert(financeReview.includes("provider IDs, database table e code paths"), "finance-review should verify runtime mappings");

  assert(landingPage.includes("../finance/knowledge/pricing.md"), "Landing page knowledge should reference Finance pricing catalog");
  assert(landingPage.includes("Não invente nomes, preços, trials, limites ou entitlements"), "Landing page knowledge should forbid invented plan details");
  assert(landingPageSkill.includes("../finance/knowledge/pricing.md"), "Landing page skill should load Finance pricing catalog");
  assert(landingPageSkill.includes("Não crie preço, desconto, trial, limite ou entitlement novo"), "Landing page skill should block invented pricing");
  assert(supportNotes.includes("../finance/knowledge/pricing.md"), "Support notes should reference Finance pricing catalog");
  assert(supportNotes.includes("Não prometa limite, desconto, upgrade, trial ou direito de plano"), "Support notes should forbid unsupported plan promises");
  assert(supportPatternsSkill.includes("../finance/knowledge/pricing.md"), "Support synthesis should load Finance pricing catalog");
  assert(supportPatternsSkill.includes("Não prometa upgrade, desconto, limite, trial ou entitlement"), "Support synthesis should block unsupported plan promises");

  assert(readyToDevelop.includes("## Pricing And Plan Readiness"), "Ready-to-develop should define pricing readiness");
  assert(readyToDevelop.includes("plans, prices, billing, checkout, paywall, subscription, trial, usage limit, quota or entitlement"), "Ready-to-develop should trigger pricing readiness for plan-related work");
  assert(readyToDevelop.includes("growth/finance/knowledge/pricing.md"), "Ready-to-develop should reference the Pricing Catalog");
  assert(writeFeatureCriteria.includes("Add Pricing criteria only when"), "Feature criteria should add Pricing criteria conditionally");
  assert(writeFeatureCriteria.includes("growth/finance/knowledge/pricing.md"), "Feature criteria should reference Finance pricing catalog");
  assert(deliveryBoundaries.includes("Pricing/Plan applicability"), "Delivery boundaries should classify Pricing/Plan applicability");

  assert(dataGuidelines.includes("## Pricing And Entitlements"), "Engineering data guidelines should cover pricing and entitlements");
  assert(dataGuidelines.includes("Não hardcode plano, preço, trial, limite, quota ou entitlement"), "Engineering data guidelines should block hardcoded pricing");
  assert(reviewCriteria.includes("Pricing/Plan Review"), "Engineering review criteria should include pricing/plan review");
  assert(reviewCriteria.includes("Block hardcoded prices, plan names, provider IDs or entitlements"), "Engineering review criteria should block pricing drift");

  assert(environments.includes("## Billing Provider Mapping"), "DevOps environments should include billing provider mapping");
  assert(environments.includes("provider IDs, webhook secrets, variáveis de ambiente e runtime config"), "DevOps environments should define billing runtime config");
  assert(configureEnvironments.includes("billing provider price IDs"), "DevOps configure environments should handle billing provider price IDs");
  assert(configureEnvironments.includes("Não escreva price IDs, webhook secrets ou billing secrets"), "DevOps configure environments should protect billing secrets");

  assert(securityBaseline.includes("No payment, billing, pricing or entitlement change without Security review when money, access or customer data is affected."), "Security baseline should gate billing/pricing risk");
  assert(threatModeling.includes("pricing, billing, checkout, subscription, trial, entitlement or quota manipulation"), "Threat modeling should cover pricing and entitlement abuse");
}

async function assertPricingSourceOfTruthDocs() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const journey = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "pricing-source-of-truth.md"), "utf8");
  const decisionLog = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "decision-log.md"), "utf8");

  assert(journeyMap.includes("Pricing source of truth"), "Founder journey map should include pricing source of truth");
  assert(journey.includes("Growth Finance"), "Pricing journey should name Growth Finance");
  assert(journey.includes("Runtime Source"), "Pricing journey should distinguish runtime source");
  assert(journey.includes("validatePricingSourceOfTruthContract"), "Pricing journey should name the validation contract");
  assert(decisionLog.includes("Pricing Catalog Como Fonte Canônica De Planos E Entitlements"), "Decision log should record Pricing Catalog decision");
  assert(decisionLog.includes("Growth Finance é o owner do Pricing Catalog"), "Decision log should record Growth Finance ownership");
}
