import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers, projectRoot } from "./fixtures.mjs";
import { exists } from "./path-utils.mjs";

export async function validateGrowthExperimentContract() {
  await assertGrowthExperimentDocs();

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-growth-experiments-"));

  await generateWorkspace(rootDir, answers);
  await activateWorkspaceArea(rootDir, "growth.marketing");
  await activateWorkspaceArea(rootDir, "growth.customer-experience");
  await activateWorkspaceArea(rootDir, "growth.finance");

  const marketingYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "area.yaml"), "utf8"));
  const growthExperiments = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "knowledge", "growth-experiments.md"), "utf8");
  const growthLead = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "roles", "growth-lead.role.md"), "utf8");
  const planGrowthExperiment = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "skills", "growth-experiment-planning", "SKILL.md"), "utf8");
  const analyzeGrowthResult = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "skills", "growth-result-analysis", "SKILL.md"), "utf8");
  const growthExperimentPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "playbooks", "growth-experiment.playbook.md"), "utf8");
  const launchLearningLoop = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "workflows", "launch-learning-loop.workflow.md"), "utf8");

  assert(marketingYaml.area.source_of_truth.includes("knowledge/growth-experiments.md"), "Marketing area.yaml should list growth experiments knowledge");
  assert(growthLead.includes("../knowledge/growth-experiments.md"), "Growth Lead should read growth experiments knowledge");
  assert(growthLead.includes("growth-experiment-planning"), "Growth Lead should expose growth-experiment-planning");
  assert(growthLead.includes("growth-result-analysis"), "Growth Lead should expose growth-result-analysis");
  assert(growthLead.includes("growth-experiment"), "Growth Lead should expose growth-experiment playbook");

  for (const requiredContent of [
    "## Experiment Register",
    "experiment_id",
    "hypothesis",
    "channel",
    "asset",
    "measurement_source",
    "success_criteria",
    "decision",
    "continue | iterate_copy | iterate_pricing | open_product_ops_item | route_to_strategy | scale_spend | pause",
    "## Manual Result Input Template",
    "visitors",
    "leads",
    "qualified_leads",
    "calls",
    "spend",
    "objections",
    "Não invente telemetria"
  ]) {
    assert(growthExperiments.includes(requiredContent), `Growth experiments knowledge should include ${requiredContent}`);
  }

  assert(planGrowthExperiment.includes("Measurement plan"), "growth-experiment-planning should output measurement plan");
  assert(planGrowthExperiment.includes("Manual Result Input Template"), "growth-experiment-planning should give the founder a manual input template");
  assert(planGrowthExperiment.includes("Plausible, Google Analytics, Vercel Analytics, PostHog"), "growth-experiment-planning should suggest lightweight analytics sources");
  assert(planGrowthExperiment.includes("growth/finance/knowledge/spend-ledger.md"), "growth-experiment-planning should reference Spend Ledger when budget is involved");
  assert(planGrowthExperiment.includes("Não chame APIs externas"), "growth-experiment-planning should avoid external analytics automation by default");

  assert(analyzeGrowthResult.includes("conversion_rate"), "growth-result-analysis should calculate conversion rate");
  assert(analyzeGrowthResult.includes("cost_per_qualified_lead"), "growth-result-analysis should calculate cost per qualified lead");
  assert(analyzeGrowthResult.includes("Decision output"), "growth-result-analysis should output a decision");
  assert(analyzeGrowthResult.includes("continue, iterate_copy, iterate_pricing, open_product_ops_item, route_to_strategy, scale_spend or pause"), "growth-result-analysis should use decision enum");
  assert(analyzeGrowthResult.includes("Não invente telemetria"), "growth-result-analysis should forbid invented telemetry");

  assert(growthExperimentPlaybook.includes("Modo 1: Planejar experimento"), "growth-experiment playbook should support planning mode");
  assert(growthExperimentPlaybook.includes("Modo 2: Analisar resultado"), "growth-experiment playbook should support analysis mode");
  assert(growthExperimentPlaybook.includes("skills/growth-experiment-planning/SKILL.md"), "growth-experiment playbook should use planning skill");
  assert(growthExperimentPlaybook.includes("skills/growth-result-analysis/SKILL.md"), "growth-experiment playbook should use analysis skill");
  assert(growthExperimentPlaybook.includes("Manual Result Input Template"), "growth-experiment playbook should include manual result input template");

  assert(launchLearningLoop.includes("Use `growth/marketing/knowledge/growth-experiments.md` ou feedback registrado"), "launch-learning-loop should require experiment or feedback evidence");
  assert(launchLearningLoop.includes("Decision output"), "launch-learning-loop should output a decision");
  assert(launchLearningLoop.includes("continue | iterate_copy | iterate_pricing | open_product_ops_item | route_to_strategy | scale_spend | pause"), "launch-learning-loop should list decision outputs");
  assert(launchLearningLoop.includes("Não tome decisão de Growth apenas por intuição"), "launch-learning-loop should block intuition-only decisions");
}

async function assertGrowthExperimentDocs() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const journeyPath = join(projectRoot, "docs", "framework", "founder-journeys", "growth-experiment-learning.md");
  const decisionLog = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "decision-log.md"), "utf8");

  assert(await exists(journeyPath), "Growth experiment learning journey should exist");
  const journey = await readFile(journeyPath, "utf8");

  assert(journeyMap.includes("Growth experiment learning"), "Founder journey map should include growth experiment learning");
  assert(journey.includes("Manual Result Input Template"), "Growth experiment journey should include manual result input");
  assert(journey.includes("validateGrowthExperimentContract"), "Growth experiment journey should name the validation contract");
  assert(decisionLog.includes("Growth Experiment Ledger Como Fonte De Aprendizado De Mercado"), "Decision log should record Growth Experiment Ledger decision");
}
