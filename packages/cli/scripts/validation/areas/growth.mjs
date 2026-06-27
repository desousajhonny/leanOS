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
  const cxReadme = await readFile(join(rootDir, "growth", "customer-experience", "README.md"), "utf8");
  const cxAgent = await readFile(join(rootDir, "growth", "customer-experience", "AGENT.md"), "utf8");
  const cxYaml = parse(await readFile(join(rootDir, "growth", "customer-experience", "area.yaml"), "utf8"));
  const customerFeedback = await readFile(join(rootDir, "growth", "customer-experience", "knowledge", "customer-feedback.md"), "utf8");
  const supportNotes = await readFile(join(rootDir, "growth", "customer-experience", "knowledge", "support-notes.md"), "utf8");
  const cxRole = await readFile(join(rootDir, "growth", "customer-experience", "roles", "cx-lead.role.md"), "utf8");
  const customerLearningLoop = await readFile(join(rootDir, "growth", "customer-experience", "playbooks", "customer-learning-loop.playbook.md"), "utf8");

  const marketingReadme = await readFile(join(rootDir, "growth", "marketing", "README.md"), "utf8");
  const marketingAgent = await readFile(join(rootDir, "growth", "marketing", "AGENT.md"), "utf8");
  const marketingYaml = parse(await readFile(join(rootDir, "growth", "marketing", "area.yaml"), "utf8"));
  const landingPage = await readFile(join(rootDir, "growth", "marketing", "knowledge", "landing-page.md"), "utf8");
  const growthLead = await readFile(join(rootDir, "growth", "marketing", "roles", "growth-lead.role.md"), "utf8");
  const mvpLaunch = await readFile(join(rootDir, "growth", "marketing", "playbooks", "mvp-launch.playbook.md"), "utf8");

  const financeReadme = await readFile(join(rootDir, "growth", "finance", "README.md"), "utf8");
  const financeAgent = await readFile(join(rootDir, "growth", "finance", "AGENT.md"), "utf8");
  const financeYaml = parse(await readFile(join(rootDir, "growth", "finance", "area.yaml"), "utf8"));
  const pricing = await readFile(join(rootDir, "growth", "finance", "knowledge", "pricing.md"), "utf8");
  const financeOperator = await readFile(join(rootDir, "growth", "finance", "roles", "finance-operator.role.md"), "utf8");
  const financeReview = await readFile(join(rootDir, "growth", "finance", "playbooks", "finance-review.playbook.md"), "utf8");
  const growthWorkflow = await readFile(join(rootDir, "growth", "workflows", "launch-learning-loop.workflow.md"), "utf8");

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
    assert(readme.includes("start with `AGENT.md`"), "Growth area README should route operational work through AGENT.md");
    assert(agent.includes(`You are the ${expectedAgentTitle}`), `Growth area AGENT should define ${expectedAgentTitle}`);
    assert.equal(yaml.area.agent, "AGENT.md", "Growth area.yaml should declare AGENT.md");
  }

  for (const content of [customerFeedback, supportNotes, landingPage, pricing]) {
    for (const section of ["## Purpose", "## Current State", "## Decisions", "## Risks", "## Open Questions", "## Next Update"]) {
      assert(content.includes(section), `Growth knowledge should include ${section}`);
    }
  }

  assert(cxYaml.area.source_of_truth.includes("knowledge/customer-feedback.md"), "CX area.yaml should list customer feedback knowledge");
  assert(marketingYaml.area.source_of_truth.includes("knowledge/landing-page.md"), "Marketing area.yaml should list landing page knowledge");
  assert(financeYaml.area.source_of_truth.includes("knowledge/pricing.md"), "Finance area.yaml should list pricing knowledge");
  assert(cxRole.includes("## Red Lines"), "CX role should include red lines");
  assert(growthLead.includes("## Red Lines"), "Growth Lead should include red lines");
  assert(financeOperator.includes("## Red Lines"), "Finance Operator should include red lines");
  assert(customerLearningLoop.includes("skills/map-customer-feedback/SKILL.md"), "Customer learning loop should use feedback mapping skill");
  assert(customerLearningLoop.includes("Strategy/Product or Product Ops"), "Customer learning loop should route product changes back to product owners");
  assert(mvpLaunch.includes("Route visual design to Operations Design"), "MVP launch should route design work to Operations Design");
  assert(mvpLaunch.includes("Route budget/pricing implications to Growth Finance"), "MVP launch should route finance work to Finance");
  assert(financeReadme.includes("Do not make accounting, tax, legal or investment advice claims"), "Finance should avoid professional advice claims");
  assert(growthWorkflow.includes("Read Marketing AGENT"), "Growth workflow should route through Marketing AGENT");
  assert(growthWorkflow.includes("Read Customer Experience AGENT"), "Growth workflow should route through Customer Experience AGENT");
  assert(growthWorkflow.includes("growth/finance/AGENT.md when pricing, budget or unit economics are involved"), "Growth workflow should make Finance conditional");
}

export async function assertNaturalStartupRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const productPlaybook = await readFile(join(rootDir, "strategy", "product", "playbooks", "idea-calibration.playbook.md"), "utf8");

  assert.equal(await exists(join(rootDir, ".leanos", "commands")), false, "Startup should not depend on generated command files");
  assert(rootAgent.includes("Setup or restart LeanOS: `strategy/AGENT.md`"), "Root AGENT should route startup intent through Strategy");
  assert(rootAgent.includes("Strategy Product -> `idea-calibration.playbook.md`"), "Root AGENT should route startup and ideas to Strategy Product idea calibration");
  assert(rootAgent.includes("Intent -> Current Stage -> Gate -> Active Requirements -> Route"), "Root AGENT should use progression intent routing");
  assert(rootAgent.includes("Do not write during the first response"), "Root AGENT should avoid writing during the first startup response");
  assert(rootAgent.includes("Do not modify roles, skills, playbooks, workflows, `ai-standard/` or `.github/` during startup"), "Root AGENT should protect operating assets during startup");
  assert.equal(await exists(join(rootDir, "strategy", "workflows", "business-intake.workflow.md")), false, "Startup should not depend on business-intake workflow");
  assert.equal(await exists(join(rootDir, "strategy", "workflows", "new-idea-intake.workflow.md")), false, "Startup should not depend on new-idea-intake workflow");
  assert(productPlaybook.includes("Use `skills/business-baseline/SKILL.md` first to read `leanos.yaml`"), "Idea calibration should start with baseline mapping");
  assert(productPlaybook.includes("business stage"), "Idea calibration should use the current business stage");
  assert(productPlaybook.includes("Ask one useful question at a time"), "Idea calibration playbook should keep startup guided and incremental");
  assert(productPlaybook.includes("End with a clear confirmation question before file updates"), "Idea calibration playbook should ask for confirmation before writing");
}

export async function assertRootAgentMutationRules(rootDir) {
  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const operatingRules = await readFile(join(rootDir, ".leanos", "agent", "operating-rules.md"), "utf8");

  assert.equal(rootAgent.includes("## Workspace Mutation Rules"), false, "AGENT.md should not include the old Workspace Mutation Rules section");
  assert.equal(rootAgent.includes("## Command Handling"), false, "AGENT.md should not include generated slash-command handling");
  assert.equal(rootAgent.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), false, "AGENT.md should not present slash commands as the interface");
  assert.equal(rootAgent.includes("`.leanos/commands/start-leanos.md`"), false, "AGENT.md should not map startup to command files");
  assert(rootAgent.includes("Do not create or modify LeanOS framework assets from memory. Route through `ai-standard/README.md`"), "AGENT.md should route framework asset changes through AI Standard README");
  assert(rootAgent.includes("## Framework Standards Routing"), "AGENT.md should include Framework Standards Routing");
  assert(rootAgent.includes("Do not modify roles, skills, playbooks, workflows, `ai-standard/` or `.github/` during startup"), "AGENT.md should protect framework assets during startup from Red Lines");
  assert(rootAgent.includes("Ask before modifying knowledge, decision or framework files"), "AGENT.md should require confirmation before file mutation");
  assert(rootAgent.includes("## Trace And Diagnostics"), "AGENT.md should include Trace And Diagnostics");
  assert(rootAgent.includes("`.leanos/agent/protocols/chief-trace.md`"), "AGENT.md should route trace diagnostics to chief-trace protocol");
  assert(rootAgent.includes("GitHub setup, GitHub Projects configuration or Epics/Features sync"), "AGENT.md should route natural GitHub sync requests to DevOps");
  assert.equal(rootAgent.includes("Source-of-truth files describe what the company knows"), false, "AGENT.md should avoid old source-of-truth taxonomy");
  assert.equal(rootAgent.includes("Operating assets describe how LeanOS works"), false, "AGENT.md should avoid old operating-assets taxonomy");
  assert.equal(operatingRules.includes("LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface"), false, "operating rules should not promote slash commands");
  assert.equal(operatingRules.includes("For `/start-leanos`, load `../commands/start-leanos.md` before acting"), false, "operating rules should not map startup to command files");
  assert(operatingRules.includes("For trace, debug or diagnostic requests, load `protocols/chief-trace.md`"), "operating rules should route trace diagnostics");
  assert(operatingRules.includes("During startup, propose updates first"), "operating rules should require propose-first startup");
  assert(operatingRules.includes("Do not modify roles, skills, playbooks, workflows, `ai-standard/` or `.github/` during startup"), "operating rules should protect operating assets during startup");
}

export async function assertTraceDiagnostics(rootDir) {
  const runtimeReadme = await readFile(join(rootDir, ".leanos", "README.md"), "utf8");
  const protocolReadme = await readFile(join(rootDir, ".leanos", "agent", "protocols", "README.md"), "utf8");
  const traceReadme = await readFile(join(rootDir, ".leanos", "traces", "README.md"), "utf8");
  const traceTemplate = await readFile(join(rootDir, ".leanos", "traces", "trace-template.md"), "utf8");
  const chiefTrace = await readFile(join(rootDir, ".leanos", "agent", "protocols", "chief-trace.md"), "utf8");
  const traceIndex = parse(await readFile(join(rootDir, ".leanos", "traces", "trace-index.yaml"), "utf8"));

  assert(runtimeReadme.includes("traces/"), "LeanOS runtime README should list traces folder");
  assert(runtimeReadme.includes("Traces are local diagnostics, not telemetry"), "LeanOS runtime README should explain trace scope");
  assert(protocolReadme.includes("chief-trace.md"), "Agent protocols README should list chief-trace protocol");
  assert(traceReadme.includes("Traces are local, opt-in and safe-by-default"), "Trace README should explain local opt-in diagnostics");
  assert(traceReadme.includes("Do not store full transcripts, secrets, tokens"), "Trace README should forbid sensitive trace content");
  assert(Array.isArray(traceIndex.traces), "trace-index.yaml should expose a traces array");
  assert(traceTemplate.includes("## Detected Route"), "Trace template should capture detected route");
  assert(traceTemplate.includes("## Navigation Chain Check"), "Trace template should capture Navigation Chain check");
  assert(traceTemplate.includes("## Sensitive Data Review"), "Trace template should capture sensitive data review");
  assert(chiefTrace.includes("Ask before writing a trace file"), "Chief trace protocol should require confirmation before writing");
  assert(chiefTrace.includes("Do not store full chat transcripts"), "Chief trace protocol should forbid full transcript storage");
  assert(chiefTrace.includes(".leanos/traces/YYYY-MM-DD-<short-kebab-intent>.trace.md"), "Chief trace protocol should define trace naming");
  assert(chiefTrace.includes("Do not update:"), "Chief trace protocol should forbid product/runtime mutations outside traces");
}
