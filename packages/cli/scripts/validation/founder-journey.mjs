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

export async function validateFounderJourneyReadyForLaunch() {
  await assertReadyForLaunchJourneyDoc();
  await assertReadyForLaunchRouteAfterSequentialActivation();
}

async function assertReadyForLaunchJourneyDoc() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const workflowsInventory = await readFile(join(projectRoot, "docs", "framework", "workflows", "README.md"), "utf8");
  const readyForLaunchPath = join(projectRoot, "docs", "framework", "founder-journeys", "ready-for-launch.md");

  assert(
    journeyMap.includes("| [x] | 9 | Ready for launch | `ready-for-launch.md` | `operations/workflows/ready-for-launch.workflow.md`"),
    "Founder journey map should mark Ready for launch as complete through Operations ready-for-launch"
  );
  assert(
    workflowsInventory.includes("| `ready-for-launch` | `operations` | Decidir se uma release, beta ou MVP pode ir para usuários reais"),
    "Workflow inventory should include ready-for-launch as an Operations workflow"
  );

  await assertExists(readyForLaunchPath);

  const readyForLaunchJourney = await readFile(readyForLaunchPath, "utf8");

  assert(readyForLaunchJourney.includes("# Jornada: Ready For Launch"), "Ready for launch journey should have a clear title");
  assert(readyForLaunchJourney.includes('founder pergunta "está pronto para lançar?"'), "Ready for launch journey should document the founder trigger");
  assert(readyForLaunchJourney.includes("operations/workflows/ready-for-launch.workflow.md"), "Ready for launch journey should route through ready-for-launch");
  assert(readyForLaunchJourney.includes("operations/devops/playbooks/release-operations.playbook.md"), "Ready for launch journey should load DevOps release operations");
  assert(readyForLaunchJourney.includes("growth/marketing/playbooks/mvp-launch.playbook.md"), "Ready for launch journey should bridge launch execution to Growth marketing");
  assert(readyForLaunchJourney.includes("growth/workflows/launch-learning-loop.workflow.md"), "Ready for launch journey should bridge post-launch learning to Growth workflow");
  assert(readyForLaunchJourney.includes("ready_to_launch"), "Ready for launch journey should define ready_to_launch output");
  assert(readyForLaunchJourney.includes("blocked_by_devops"), "Ready for launch journey should define DevOps blocking output");
  assert(readyForLaunchJourney.includes("Não faça deploy automaticamente"), "Ready for launch journey should forbid automatic deploy");
  assert(readyForLaunchJourney.includes("## Checklist De Validação Da Jornada"), "Ready for launch journey should include a validation checklist");
}

async function assertReadyForLaunchRouteAfterSequentialActivation() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-founder-ready-for-launch-"));

  await generateWorkspace(rootDir, answers);
  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");

  assert.equal(
    await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "ready-for-launch.workflow.md")),
    false,
    "Ready for launch workflow should wait for DevOps activation"
  );

  await activateWorkspaceArea(rootDir, "operations.devops");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "ready-for-launch.workflow.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "release-operations.playbook.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "growth")), false, "Ready for launch activation should not activate Growth automatically");

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operationsAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"), "utf8");
  const operationsWorkflowsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "README.md"), "utf8");
  const readyForLaunchWorkflow = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "ready-for-launch.workflow.md"), "utf8");
  const workflowsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "workflows.yaml"), "utf8"));

  assert.deepEqual(yaml.departments.active, ["strategy", "operations"], "Sequential activation should keep Operations active");
  assert(yaml.activation.active_areas.includes("operations.product-ops"), "Product Ops should be active for launch readiness");
  assert(yaml.activation.active_areas.includes("operations.engineering"), "Engineering should be active for launch readiness");
  assert(yaml.activation.active_areas.includes("operations.devops"), "DevOps should be active for launch readiness");
  assert(yaml.workflows.active.includes("ready-for-launch"), "ready-for-launch workflow should be active after DevOps activation");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "ready-for-launch"), "Workflows index should expose ready-for-launch");
  assert(rootAgent.includes("Readiness de launch, go-live, beta ou usuários reais"), "Root AGENT should route launch readiness distinctly from Growth execution");
  assert(rootAgent.includes("Execução de launch, aquisição, onboarding ou learning loop"), "Root AGENT should keep launch execution and learning with Growth");
  assert(operationsAgent.includes("decidir se uma release pode ir para usuários reais"), "Operations AGENT should recognize launch readiness as an Operations journey");
  assert(operationsWorkflowsReadme.includes("ready-for-launch.workflow.md"), "Operations workflow index should expose ready-for-launch");
  assert(readyForLaunchWorkflow.includes("## Decisões Possíveis"), "ready-for-launch workflow should name its possible decisions");
  assert(readyForLaunchWorkflow.includes("ready_to_launch"), "ready-for-launch workflow should output ready_to_launch");
  assert(readyForLaunchWorkflow.includes("ready_with_known_risks"), "ready-for-launch workflow should output ready_with_known_risks");
  assert(readyForLaunchWorkflow.includes("blocked_by_growth"), "ready-for-launch workflow should output blocked_by_growth");
  assert(readyForLaunchWorkflow.includes("not_ready_to_learn"), "ready-for-launch workflow should output not_ready_to_learn");
  assert(readyForLaunchWorkflow.includes("Não faça deploy automaticamente"), "ready-for-launch workflow should forbid automatic deployment");
  assert(readyForLaunchWorkflow.includes("activation_required: growth.marketing"), "ready-for-launch workflow should return activation_required when launch execution needs inactive Growth");
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
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations")), false, "Initial Founder Journey should start Strategy-only");

  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "knowledge", "ready-to-develop.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "feature-to-delivery-cycle.workflow.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "review-pr", "SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "prepare-pr.playbook.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "pr-validation.playbook.md"));

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operationsAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"), "utf8");
  const operationsWorkflowsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "README.md"), "utf8");
  const engineeringAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "AGENT.md"), "utf8");
  const prReviewerRole = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "roles", "pr-reviewer.role.md"), "utf8");
  const prValidationPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");
  const reviewPrSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "review-pr", "SKILL.md"), "utf8");

  assert.deepEqual(yaml.departments.active, ["strategy", "operations"], "Sequential activation should keep Operations active");
  assert(yaml.activation.active_areas.includes("operations.product-ops"), "Product Ops should be active before PR review");
  assert(yaml.activation.active_areas.includes("operations.engineering"), "Engineering should be active for PR review");
  assert(yaml.workflows.active.includes("feature-to-delivery-cycle"), "Feature delivery workflow should be active after Engineering activation");
  assert(rootAgent.includes("- Operations: `clinic-assistant-ai-os/operations/AGENT.md`"), "Root AGENT should route delivery work to Operations after activation");
  assert.equal(rootAgent.includes("`clinic-assistant-ai-os/operations/engineering/README.md`"), false, "Root AGENT should not bypass Operations for Engineering review");
  assert(operationsAgent.includes("workflows/README.md"), "Operations AGENT should route multi-area delivery work through the workflow index");
  assert(operationsWorkflowsReadme.includes("feature-to-delivery-cycle.workflow.md"), "Operations workflow index should expose feature-to-delivery-cycle");
  assert(engineeringAgent.includes("PR Reviewer"), "Engineering AGENT should expose the PR Reviewer role");
  assert(prReviewerRole.includes("pr-validation"), "PR Reviewer role should expose PR validation");
  assert(prValidationPlaybook.includes("Founder Testing Guide"), "PR validation playbook should validate founder test instructions");
  assert(prValidationPlaybook.includes("Liste achados por severidade"), "PR validation playbook should require severity-ordered findings");
  assert(reviewPrSkill.includes("description: Use quando revisar um PR"), "Review PR skill should keep a trigger-based description");
  assert(reviewPrSkill.includes("Não faça recomendação de merge"), "Review PR skill should prevent premature merge recommendation");
}
