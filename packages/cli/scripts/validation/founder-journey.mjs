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

export async function validateFounderJourneySecurityHardeningCycle() {
  await assertSecurityHardeningJourneyDoc();
  await assertSecurityHardeningRouteAfterActivation();
}

async function assertSecurityHardeningJourneyDoc() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const workflowsInventory = await readFile(join(projectRoot, "docs", "framework", "workflows", "README.md"), "utf8");
  const securityHardeningPath = join(projectRoot, "docs", "framework", "founder-journeys", "security-hardening-cycle.md");

  assert(
    journeyMap.includes("| [x] | 10 | Security hardening | `security-hardening-cycle.md` | `operations/workflows/security-hardening-cycle.workflow.md`"),
    "Founder journey map should mark Security hardening as complete through Operations security-hardening-cycle"
  );
  assert(
    workflowsInventory.includes("| `security-hardening-cycle` | `operations` | Auditar e fortalecer riscos de Security"),
    "Workflow inventory should include security-hardening-cycle as an Operations workflow"
  );

  await assertExists(securityHardeningPath);

  const securityHardeningJourney = await readFile(securityHardeningPath, "utf8");

  assert(securityHardeningJourney.includes("# Jornada: Security Hardening Cycle"), "Security hardening journey should have a clear title");
  assert(securityHardeningJourney.includes('founder pergunta "audite segurança"'), "Security hardening journey should document the founder trigger");
  assert(securityHardeningJourney.includes("operations/workflows/security-hardening-cycle.workflow.md"), "Security hardening journey should route through security-hardening-cycle");
  assert(securityHardeningJourney.includes("operations/security/playbooks/ai-app-security-review.playbook.md"), "Security hardening journey should load AI app security review");
  assert(securityHardeningJourney.includes("operations/security/skills/ai-runtime-security-review/SKILL.md"), "Security hardening journey should load AI runtime security skill");
  assert(securityHardeningJourney.includes("activation_required: operations.security"), "Security hardening journey should document progressive activation");
  assert(securityHardeningJourney.includes("LLM input/output"), "Security hardening journey should include AI-native security risk");
  assert(securityHardeningJourney.includes("RAG/vector DB"), "Security hardening journey should include RAG/vector DB risk");
  assert(securityHardeningJourney.includes("Não altere código, infra, secrets ou permissões automaticamente"), "Security hardening journey should forbid automatic risky changes");
  assert(securityHardeningJourney.includes("## Checklist De Validação Da Jornada"), "Security hardening journey should include a validation checklist");
}

async function assertSecurityHardeningRouteAfterActivation() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-founder-security-hardening-"));

  await generateWorkspace(rootDir, answers);
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations")), false, "Initial Founder Journey should start Strategy-only");

  let rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");

  assert(rootAgent.includes("Auditoria de segurança, vulnerabilidade, LGPD, dados de cliente, vazamento de token, proteção de API ou hardening"), "Root AGENT should route direct security hardening requests");
  assert(rootAgent.includes("activation_required` para `operations.security`"), "Root AGENT should return activation_required for inactive Security");

  await activateWorkspaceArea(rootDir, "operations.security");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "ai-security-engineer.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "ai-runtime-security-review", "SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "playbooks", "ai-app-security-review.playbook.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "ai-app-security.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "security-hardening-cycle.workflow.md"));

  const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));
  rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operationsAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "AGENT.md"), "utf8");
  const operationsWorkflowsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "README.md"), "utf8");
  const securityWorkflow = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "workflows", "security-hardening-cycle.workflow.md"), "utf8");
  const workflowsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "workflows.yaml"), "utf8"));

  assert.deepEqual(yaml.departments.active, ["strategy", "operations"], "Security activation should keep Operations active");
  assert(yaml.activation.active_areas.includes("operations.security"), "Security should be active for security hardening");
  assert(yaml.workflows.active.includes("security-hardening-cycle"), "security-hardening-cycle workflow should be active after Security activation");
  assert(workflowsIndex.workflows.some((workflow) => workflow.key === "security-hardening-cycle"), "Workflows index should expose security-hardening-cycle");
  assert(rootAgent.includes("- Operations: `clinic-assistant-ai-os/operations/AGENT.md`"), "Root AGENT should route Security work to Operations after activation");
  assert(operationsAgent.includes("workflows/README.md"), "Operations AGENT should route multi-step Security work through the workflow index");
  assert(operationsWorkflowsReadme.includes("security-hardening-cycle.workflow.md"), "Operations workflow index should expose security-hardening-cycle");
  assert(securityWorkflow.includes("ai-app-security-review"), "Security hardening workflow should call the AI app security review playbook");
  assert(securityWorkflow.includes("LLM input/output"), "Security hardening workflow should cover LLM input/output");
  assert(securityWorkflow.includes("prompt injection"), "Security hardening workflow should cover prompt injection");
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
