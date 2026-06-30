import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";
import { createTreeMarkdown, exampleAnswers } from "../../generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../../../dist/generators/file-writer.js";
import { activateWorkspaceArea } from "../../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../../../dist/templates/workspace-template.js";
import {
  answers,
  clientWorkspaceFixtureDir,
  clientWorkspaceTreePath,
  designOnlyAnswers,
  engineeringOnlyAnswers,
  execFileAsync,
  existingProductRepoAnswers,
  growthValidationAnswers,
  initialStrategySubareas,
  packageRoot,
  partialAreaAnswers,
  projectRoot
} from "../fixtures.mjs";
import {
  assertExists,
  assertPlaybookFormat,
  assertRoleFormat,
  assertSkillFormat,
  ensureTrailingNewline,
  failOutOfDate,
  formatPathDiff
} from "../assertions.mjs";
import {
  assertIndexPathsExist,
  assertInitialContextCoherence,
  assertPathInside,
  collectPathStrings,
  exists,
  isInitialStrategyWorkspacePath,
  listFiles,
  resolveFixturePath
} from "../path-utils.mjs";
import { assertWorkflowContract, assertCommandContract } from "../contracts.mjs";
import {
  assertAiStandardAssetTaxonomy,
  assertAiStandardChecklists,
  assertAiStandardExamples,
  assertAiStandardInstructions,
  assertAiStandardReadiness,
  assertAiStandardTemplates,
  assertNoOldAiStandardReferences
} from "../ai-standard.mjs";

export async function assertGrowthAreaPattern(rootDir) {
  const cxReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "README.md"), "utf8");
  const cxAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "AGENT.md"), "utf8");
  const cxYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "area.yaml"), "utf8"));
  const customerFeedback = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "knowledge", "customer-feedback.md"), "utf8");
  const supportNotes = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "knowledge", "support-notes.md"), "utf8");
  const cxRole = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "roles", "cx-lead.role.md"), "utf8");
  const customerLearningLoop = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "customer-experience", "playbooks", "customer-learning-loop.playbook.md"), "utf8");

  const marketingReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "README.md"), "utf8");
  const marketingAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "AGENT.md"), "utf8");
  const marketingYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "area.yaml"), "utf8"));
  const landingPage = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "knowledge", "landing-page.md"), "utf8");
  const growthExperiments = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "knowledge", "growth-experiments.md"), "utf8");
  const growthLead = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "roles", "growth-lead.role.md"), "utf8");
  const mvpLaunch = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "playbooks", "mvp-launch.playbook.md"), "utf8");
  const growthExperiment = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "playbooks", "growth-experiment.playbook.md"), "utf8");

  const financeReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "README.md"), "utf8");
  const financeAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "AGENT.md"), "utf8");
  const financeYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "area.yaml"), "utf8"));
  const pricing = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "knowledge", "pricing.md"), "utf8");
  const financeOperator = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "roles", "finance-operator.role.md"), "utf8");
  const reviewPricing = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "skills", "review-pricing", "SKILL.md"), "utf8");
  const financeReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "playbooks", "finance-review.playbook.md"), "utf8");
  const growthWorkflow = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "workflows", "launch-learning-loop.workflow.md"), "utf8");

  for (const oldPath of [
    "growth/customer-experience/customer-feedback.md",
    "growth/customer-experience/support-notes.md",
    "growth/customer-experience/success-moments.md",
    "growth/customer-experience/churn-reasons.md",
    "growth/marketing/positioning.md",
    "growth/marketing/landing-page.md",
    "growth/marketing/acquisition-channels.md",
    "growth/marketing/launch-plan.md",
    "growth/finance/pricing.md",
    "growth/finance/revenue-model.md",
    "growth/finance/unit-economics.md",
    "growth/finance/budget.md",
    "growth/finance/finance-risks.md"
  ]) {
    assert.equal(await exists(join(rootDir, oldPath)), false, `Growth loose path should move into knowledge/: ${oldPath}`);
  }

  for (const [readme, agent, yaml, expectedAgentTitle] of [
    [cxReadme, cxAgent, cxYaml, "Customer Experience Lead"],
    [marketingReadme, marketingAgent, marketingYaml, "Marketing Lead"],
    [financeReadme, financeAgent, financeYaml, "Finance Lead"]
  ]) {
    assert(readme.includes("comece em `AGENT.md`"), "Growth area README should route operational work through AGENT.md");
    assert(agent.includes(`You are the ${expectedAgentTitle}`), `Growth area AGENT should define ${expectedAgentTitle}`);
    assert.equal(yaml.area.agent, "AGENT.md", "Growth area.yaml should declare AGENT.md");
  }

  for (const content of [customerFeedback, supportNotes, landingPage, growthExperiments, pricing]) {
    for (const section of ["## Propósito", "## Estado Atual", "## Decisões", "## Riscos", "## Perguntas em Aberto", "## Próxima Atualização"]) {
      assert(content.includes(section), `Growth knowledge should include ${section}`);
    }
  }

  assert(cxYaml.area.source_of_truth.includes("knowledge/customer-feedback.md"), "CX area.yaml should list customer feedback knowledge");
  assert(marketingYaml.area.source_of_truth.includes("knowledge/landing-page.md"), "Marketing area.yaml should list landing page knowledge");
  assert(marketingYaml.area.source_of_truth.includes("knowledge/growth-experiments.md"), "Marketing area.yaml should list growth experiments knowledge");
  assert(financeYaml.area.source_of_truth.includes("knowledge/pricing.md"), "Finance area.yaml should list pricing knowledge");
  assert(cxRole.includes("## Linhas Vermelhas"), "CX role should include red lines");
  assert(growthLead.includes("## Linhas Vermelhas"), "Growth Lead should include red lines");
  assert(financeOperator.includes("## Linhas Vermelhas"), "Finance Operator should include red lines");
  assert(customerLearningLoop.includes("skills/map-customer-feedback/SKILL.md"), "Customer learning loop should use feedback mapping skill");
  assert(customerLearningLoop.includes("Strategy/Product ou Product Ops"), "Customer learning loop should route product changes back to product owners");
  assert(mvpLaunch.includes("Roteie design visual para Operations Design"), "MVP launch should route design work to Operations Design");
  assert(mvpLaunch.includes("Roteie implicações de orçamento/pricing para Growth Finance"), "MVP launch should route finance work to Finance");
  assert(growthExperiment.includes("skills/plan-growth-experiment/SKILL.md"), "Growth experiment playbook should route to planning skill");
  assert(growthExperiment.includes("skills/analyze-growth-result/SKILL.md"), "Growth experiment playbook should route to analysis skill");
  assert(financeReadme.includes("Não faça alegações de aconselhamento contábil, fiscal, jurídico ou de investimento"), "Finance should avoid professional advice claims");
  assertPricingSourceOfTruthContract({ pricing, financeOperator, reviewPricing, financeReview, landingPage, supportNotes, mvpLaunch });
  assert(growthWorkflow.includes("Leia o AGENT de Marketing"), "Growth workflow should route through Marketing AGENT");
  assert(growthWorkflow.includes("Leia o AGENT de Customer Experience"), "Growth workflow should route through Customer Experience AGENT");
  assert(growthWorkflow.includes("growth/finance/AGENT.md quando pricing, orçamento ou unit economics estiverem envolvidos"), "Growth workflow should make Finance conditional");
}

function assertPricingSourceOfTruthContract({ pricing, financeOperator, reviewPricing, financeReview, landingPage, supportNotes, mvpLaunch }) {
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
  assert(supportNotes.includes("../finance/knowledge/pricing.md"), "Support notes should reference Finance pricing catalog");
  assert(supportNotes.includes("Não prometa limite, desconto, upgrade, trial ou direito de plano"), "Support notes should forbid unsupported plan promises");
  assert(mvpLaunch.includes("Se a landing page mostrar plano ou preço, leia `../finance/knowledge/pricing.md`"), "MVP launch should require pricing catalog for plan/price copy");
}

export async function assertNaturalStartupRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const productPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "strategy", "product", "playbooks", "idea-calibration.playbook.md"), "utf8");

  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Startup should not depend on generated command files");
  assert(rootAgent.includes("Setup ou retomada do LeanOS: `clinic-assistant-ai-os/strategy/AGENT.md`"), "Root AGENT should route startup intent through Strategy");
  assert(rootAgent.includes("Strategy Product -> `idea-calibration.playbook.md`"), "Root AGENT should route startup and ideas to Strategy Product idea calibration");
  assert(rootAgent.includes("Intenção -> Estágio Atual -> Gate -> Requisitos Ativos -> Rota"), "Root AGENT should use progression intent routing");
  assert(rootAgent.includes("Não escreva durante a primeira resposta"), "Root AGENT should avoid writing during the first startup response");
  assert(rootAgent.includes("Não modifique roles, skills, playbooks, workflows, `.leanos/standard/` ou `.github/` durante startup"), "Root AGENT should protect operating assets during startup");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "business-intake.workflow.md")), false, "Startup should not depend on business-intake workflow");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "strategy", "workflows", "new-idea-intake.workflow.md")), false, "Startup should not depend on new-idea-intake workflow");
  assert(productPlaybook.includes("Use `skills/business-baseline/SKILL.md` primeiro para ler `leanos.yaml`"), "Idea calibration should start with baseline mapping");
  assert(productPlaybook.includes("estágio de negócio"), "Idea calibration should use the current estágio de negócio");
  assert(productPlaybook.includes("Faça uma pergunta útil por vez"), "Idea calibration playbook should keep startup guided and incremental");
  assert(productPlaybook.includes("Termine com uma pergunta clara de confirmação antes de atualizar arquivos"), "Idea calibration playbook should ask for confirmation before writing");
}

export async function assertRootAgentMutationRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "runtime", "agent", "operating-rules.md"), "utf8");

  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "AGENT.md should not include the old Workspace Mutation Rules section");
  assert.equal(rootAgent.includes("## Command Handling"), false, "AGENT.md should not include generated slash-command handling");
  assert.equal(rootAgent.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), false, "AGENT.md should not present slash commands as the interface");
  assert.equal(rootAgent.includes("`.leanos/commands/start-leanos.md`"), false, "AGENT.md should not map startup to command files");
  assert(rootAgent.includes("Não crie nem modifique assets do framework LeanOS de memória. Roteie por `.leanos/standard/README.md`"), "AGENT.md should route framework asset changes through AI Standard README");
  assert(rootAgent.includes("## Roteamento de Padrões do Framework"), "AGENT.md should include Framework Standards Routing");
  assert(rootAgent.includes("Não modifique roles, skills, playbooks, workflows, `.leanos/standard/` ou `.github/` durante startup"), "AGENT.md should protect framework assets during startup from Red Lines");
  assert(rootAgent.includes("Peça confirmação antes de modificar arquivos de knowledge, decisão ou framework"), "AGENT.md should require confirmation before file mutation");
  assert(rootAgent.includes("## Trace e Diagnóstico"), "AGENT.md should include Trace And Diagnostics");
  assert(rootAgent.includes("`.leanos/runtime/agent/protocols/chief-trace.md`"), "AGENT.md should route trace diagnostics to chief-trace protocol");
  assert(rootAgent.includes("Setup de GitHub, configuração de GitHub Projects ou sync de Epics/Features"), "AGENT.md should route natural GitHub sync requests to DevOps");
  assert.equal(rootAgent.includes("Source-of-truth files describe what the company knows"), false, "AGENT.md should avoid old source-of-truth taxonomy");
  assert.equal(rootAgent.includes("Operating assets describe how LeanOS works"), false, "AGENT.md should avoid old operating-assets taxonomy");
  assert.equal(operatingRules.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), false, "operating rules should not promote slash commands");
  assert.equal(operatingRules.includes("For `/start-leanos`, load `../commands/start-leanos.md` before acting"), false, "operating rules should not map startup to command files");
  assert(operatingRules.includes("Para pedidos de trace, debug ou diagnóstico, carregue `protocols/chief-trace.md`"), "operating rules should route trace diagnostics");
  assert(operatingRules.includes("Durante startup, proponha atualizações primeiro"), "operating rules should require propose-first startup");
  assert(operatingRules.includes("Não modifique roles, skills, playbooks, workflows, `.leanos/standard/` ou `.github/` durante startup"), "operating rules should protect operating assets during startup");
}

export async function assertTraceDiagnostics(rootDir) {
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const protocolReadme = await readFile(join(rootDir, ".leanos", "runtime", "agent", "protocols", "README.md"), "utf8");
  const traceReadme = await readFile(join(rootDir, ".leanos", "runtime", "traces", "README.md"), "utf8");
  const traceTemplate = await readFile(join(rootDir, ".leanos", "runtime", "traces", "trace-template.md"), "utf8");
  const chiefTrace = await readFile(join(rootDir, ".leanos", "runtime", "agent", "protocols", "chief-trace.md"), "utf8");
  const traceIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "traces", "trace-index.yaml"), "utf8"));

  assert(runtimeReadme.includes("traces/"), "LeanOS runtime README should list traces folder");
  assert(runtimeReadme.includes("Traces são diagnósticos locais, não telemetria"), "LeanOS runtime README should explain trace scope");
  assert(protocolReadme.includes("chief-trace.md"), "Agent protocols README should list chief-trace protocol");
  assert(traceReadme.includes("Traces são locais, opt-in e seguros por padrão"), "Trace README should explain local opt-in diagnostics");
  assert(traceReadme.includes("Não armazene transcrições completas, segredos, tokens"), "Trace README should forbid sensitive trace content");
  assert(Array.isArray(traceIndex.traces), "trace-index.yaml should expose a traces array");
  assert(traceTemplate.includes("## Rota Detectada"), "Trace template should capture detected route");
  assert(traceTemplate.includes("## Checagem da Cadeia de Navegação"), "Trace template should capture Navigation Chain check");
  assert(traceTemplate.includes("## Revisão de Dados Sensíveis"), "Trace template should capture sensitive data review");
  assert(chiefTrace.includes("Peça confirmação antes de escrever um arquivo de trace"), "Chief trace protocol should require confirmation before writing");
  assert(chiefTrace.includes("Não armazene transcrições completas de chat"), "Chief trace protocol should forbid full transcript storage");
  assert(chiefTrace.includes(".leanos/runtime/traces/YYYY-MM-DD-<short-kebab-intent>.trace.md"), "Chief trace protocol should define trace naming");
  assert(chiefTrace.includes("Não atualize:"), "Chief trace protocol should forbid product/runtime mutations outside traces");
}
