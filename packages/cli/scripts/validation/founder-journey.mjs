import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers, projectRoot } from "./fixtures.mjs";
import { assertExists } from "./assertions.mjs";
import { exists } from "./path-utils.mjs";

export async function validateFounderJourneyReviewPr() {
  await assertReviewPrJourneyDoc();
  await assertReviewPrRouteAfterSequentialActivation();
}

async function assertReviewPrJourneyDoc() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const reviewJourneyPath = join(projectRoot, "docs", "framework", "founder-journeys", "review-pr.md");

  assert(
    journeyMap.includes("| [x] | 7 | Review e PR | `review-pr.md` | `operations/engineering/playbooks/pr-validation.playbook.md`"),
    "Founder journey map should mark Review e PR as complete through Engineering pr-validation"
  );

  await assertExists(reviewJourneyPath);

  const reviewJourney = await readFile(reviewJourneyPath, "utf8");

  assert(reviewJourney.includes("# Jornada: Review E PR"), "Review PR journey should have a clear title");
  assert(reviewJourney.includes('founder diz "revise o PR"'), "Review PR journey should document the founder trigger");
  assert(reviewJourney.includes("operations/engineering/playbooks/pr-validation.playbook.md"), "Review PR journey should route through pr-validation");
  assert(reviewJourney.includes("operations/engineering/skills/review-pr/SKILL.md"), "Review PR journey should load the review-pr skill");
  assert(reviewJourney.includes("Founder Testing Guide"), "Review PR journey should validate the Founder Testing Guide");
  assert(reviewJourney.includes("achados por severidade"), "Review PR journey should require severity-ordered findings");
  assert(reviewJourney.includes("Não faça merge automaticamente"), "Review PR journey should forbid automatic merge");
  assert(reviewJourney.includes("post-merge-continuation"), "Review PR journey should bridge to post-merge continuation");
  assert(reviewJourney.includes("## Checklist De Validação Da Jornada"), "Review PR journey should include a validation checklist");
}

async function assertReviewPrRouteAfterSequentialActivation() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-founder-review-pr-"));

  await generateWorkspace(rootDir, answers);
  assert.equal(await exists(join(rootDir, "operations")), false, "Initial Founder Journey should start Strategy-only");

  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");

  await assertExists(join(rootDir, "operations", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "product-ops", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "product-ops", "knowledge", "ready-to-develop.md"));
  await assertExists(join(rootDir, "operations", "workflows", "feature-to-delivery-cycle.workflow.md"));
  await assertExists(join(rootDir, "operations", "engineering", "AGENT.md"));
  await assertExists(join(rootDir, "operations", "engineering", "skills", "review-pr", "SKILL.md"));
  await assertExists(join(rootDir, "operations", "engineering", "playbooks", "prepare-pr.playbook.md"));
  await assertExists(join(rootDir, "operations", "engineering", "playbooks", "pr-validation.playbook.md"));

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operationsAgent = await readFile(join(rootDir, "operations", "AGENT.md"), "utf8");
  const operationsWorkflowsReadme = await readFile(join(rootDir, "operations", "workflows", "README.md"), "utf8");
  const engineeringAgent = await readFile(join(rootDir, "operations", "engineering", "AGENT.md"), "utf8");
  const prReviewerRole = await readFile(join(rootDir, "operations", "engineering", "roles", "pr-reviewer.role.md"), "utf8");
  const prValidationPlaybook = await readFile(join(rootDir, "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  const reviewPrSkill = await readFile(join(rootDir, "operations", "engineering", "skills", "review-pr", "SKILL.md"), "utf8");

  assert.deepEqual(yaml.departments.active, ["strategy", "operations"], "Sequential activation should keep Operations active");
  assert(yaml.activation.active_areas.includes("operations.product-ops"), "Product Ops should be active before PR review");
  assert(yaml.activation.active_areas.includes("operations.engineering"), "Engineering should be active for PR review");
  assert(yaml.workflows.active.includes("feature-to-delivery-cycle"), "Feature delivery workflow should be active after Engineering activation");
  assert(rootAgent.includes("- Operations: `operations/AGENT.md`"), "Root AGENT should route delivery work to Operations after activation");
  assert.equal(rootAgent.includes("`operations/engineering/README.md`"), false, "Root AGENT should not bypass Operations for Engineering review");
  assert(operationsAgent.includes("workflows/README.md"), "Operations AGENT should route multi-area delivery work through the workflow index");
  assert(operationsWorkflowsReadme.includes("feature-to-delivery-cycle.workflow.md"), "Operations workflow index should expose feature-to-delivery-cycle");
  assert(engineeringAgent.includes("PR Reviewer"), "Engineering AGENT should expose the PR Reviewer role");
  assert(prReviewerRole.includes("pr-validation"), "PR Reviewer role should expose PR validation");
  assert(prValidationPlaybook.includes("Founder Testing Guide"), "PR validation playbook should validate founder test instructions");
  assert(prValidationPlaybook.includes("Liste achados por severidade"), "PR validation playbook should require severity-ordered findings");
  assert(reviewPrSkill.includes("description: Use quando revisar um PR"), "Review PR skill should keep a trigger-based description");
  assert(reviewPrSkill.includes("Não faça recomendação de merge"), "Review PR skill should prevent premature merge recommendation");
}
