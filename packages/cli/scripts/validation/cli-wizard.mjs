import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { allSubareas, answers, projectRoot } from "./fixtures.mjs";
import { assertExists } from "./assertions.mjs";

export async function validateCliWizardProgressiveSetup() {
  await assertWizardCopyAndFlow();
  await assertAdvancedSetupGeneratesAllAreas();
}

async function assertWizardCopyAndFlow() {
  const prompts = await readFile(join(projectRoot, "packages", "cli", "src", "prompts", "ai-prompts.ts"), "utf8");
  const command = await readFile(join(projectRoot, "packages", "cli", "src", "commands", "ai.ts"), "utf8");
  const outro = await readFile(join(projectRoot, "packages", "cli", "src", "ui", "outro.ts"), "utf8");

  assert.equal(prompts.includes("groupMultiselect"), false, "Wizard should not expose manual department or area multiselect");
  assert(prompts.includes("Nome do produto"), "Wizard should ask for product name in PT-BR");
  assert(prompts.includes("Tipo de produto"), "Wizard should ask for product type in PT-BR");
  assert(prompts.includes("Descrição curta"), "Wizard should ask for a short description in PT-BR");
  assert(prompts.includes("Progressivo (recomendado)"), "Wizard should default to progressive setup");
  assert(prompts.includes("Avançado: preparar tudo agora"), "Wizard should expose the all-at-once advanced setup");
  assert(prompts.includes("initialActivationMode"), "Wizard should persist the selected initial activation mode");

  for (const obsoletePrompt of [
    "Company or startup name",
    "Primary user or customer",
    "Current stage",
    "Operating mode",
    "Which workspace areas should LeanOS prepare?",
    "Choose the client workspace areas"
  ]) {
    assert.equal(prompts.includes(obsoletePrompt), false, `Wizard should not show obsolete prompt: ${obsoletePrompt}`);
  }

  for (const englishWizardCopy of [
    "What do you want to do?",
    "Create a new LeanOS workspace",
    "Connect LeanOS to an existing project",
    "LeanOS setup cancelled.",
    "Workspace generation stopped.",
    "LeanOS workspace created",
    "Next actions",
    "Useful first requests"
  ]) {
    assert.equal(
      prompts.includes(englishWizardCopy) || command.includes(englishWizardCopy) || outro.includes(englishWizardCopy),
      false,
      `Wizard-facing copy should be PT-BR, found English text: ${englishWizardCopy}`
    );
  }
}

async function assertAdvancedSetupGeneratesAllAreas() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-advanced-setup-"));
  const advancedAnswers = {
    ...answers,
    initialActivationMode: "all-at-once",
    subareas: allSubareas
  };

  await generateWorkspace(rootDir, advancedAnswers);

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "strategy", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "growth", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "AGENT.md"));

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));

  assert.equal(yaml.activation.mode, "all-at-once", "Advanced setup should record all-at-once activation mode");
  assert.deepEqual(yaml.activation.active_departments, ["strategy", "operations", "growth"]);
  assert.deepEqual(yaml.activation.inactive_departments, []);
  assert.deepEqual(yaml.activation.active_areas, allSubareas);
  assert.deepEqual(yaml.activation.inactive_areas, []);
  assert(yaml.workflows.active.includes("feature-to-delivery-cycle"), "Advanced setup should activate Operations delivery workflow");
  assert(yaml.workflows.active.includes("launch-learning-loop"), "Advanced setup should activate Growth learning workflow");
}
