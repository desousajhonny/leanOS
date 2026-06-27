import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, mkdir, mkdtemp, readdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";
import { createTreeMarkdown, exampleAnswers } from "../generate-client-workspace.mjs";
import { writeWorkspaceFiles } from "../../dist/generators/file-writer.js";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
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
} from "./fixtures.mjs";
import {
  assertExists,
  assertPlaybookFormat,
  assertRoleFormat,
  assertSkillFormat,
  ensureTrailingNewline,
  failOutOfDate,
  formatPathDiff
} from "./assertions.mjs";
import {
  assertIndexPathsExist,
  assertInitialContextCoherence,
  assertPathInside,
  collectPathStrings,
  exists,
  isInitialStrategyWorkspacePath,
  listFiles,
  resolveFixturePath
} from "./path-utils.mjs";
import { assertWorkflowContract, assertCommandContract } from "./contracts.mjs";
import {
  assertBusinessAreaPattern,
  assertDesignFoundation,
  assertDevOpsAreaPattern,
  assertEngineeringAreaPattern,
  assertGrowthAreaPattern,
  assertMvpValidationScopeSections,
  assertNaturalStartupRules,
  assertOperationalPlaybookSections,
  assertProductAreaPattern,
  assertProductOpsPrdSections,
  assertRoadmapAreaPattern,
  assertRootAgentMutationRules,
  assertSecurityAreaPattern,
  assertSourceScaffoldSections,
  assertTraceDiagnostics
} from "./areas.mjs";

export async function validateAiStandardRendererIsModular() {
  const facadePath = join(packageRoot, "src", "templates", "workspace", "renderers", "ai-standard.ts");
  const moduleDir = join(packageRoot, "src", "templates", "workspace", "renderers", "ai-standard");
  const facadeLineCount = (await readFile(facadePath, "utf8")).split(/\r?\n/).length;
  const expectedModules = [
    "index.ts",
    "foundation.ts",
    "templates.ts",
    "examples.ts",
    "checklists.ts",
    "instructions.ts"
  ];

  assert(facadeLineCount <= 40, "AI Standard renderer facade should stay small; split content into renderers/ai-standard modules");

  for (const moduleName of expectedModules) {
    await access(join(moduleDir, moduleName), constants.F_OK);
  }
}

export async function assertAiStandardAssetTaxonomy(rootDir) {
  const aiStandardReadme = await readFile(join(rootDir, "ai-standard", "README.md"), "utf8");
  const foundationReadme = await readFile(join(rootDir, "ai-standard", "foundation", "README.md"), "utf8");
  const founderProgressionModel = await readFile(join(rootDir, "ai-standard", "foundation", "founder-progression-model.md"), "utf8");
  const progressionGates = await readFile(join(rootDir, "ai-standard", "foundation", "progression-gates.md"), "utf8");
  const assetTaxonomy = await readFile(join(rootDir, "ai-standard", "foundation", "asset-taxonomy.md"), "utf8");
  const guidedConversation = await readFile(join(rootDir, "ai-standard", "foundation", "guided-conversation.md"), "utf8");
  const creationRules = await readFile(join(rootDir, "ai-standard", "foundation", "creation-rules.md"), "utf8");
  const qualityCriteria = await readFile(join(rootDir, "ai-standard", "foundation", "quality-criteria.md"), "utf8");
  const folderDocumentationRules = await readFile(join(rootDir, "ai-standard", "foundation", "folder-documentation-rules.md"), "utf8");

  assert(aiStandardReadme.includes("foundation/"), "AI Standard README should route to foundation");
  assert(aiStandardReadme.includes("templates/"), "AI Standard README should route to templates");
  assert(aiStandardReadme.includes("checklists/"), "AI Standard README should route to checklists");
  assert(aiStandardReadme.includes("instructions/"), "AI Standard README should route to instructions");
  assert(aiStandardReadme.includes("examples/"), "AI Standard README should route to examples");
  assert(aiStandardReadme.includes("Do not load all of `ai-standard/` by default"), "AI Standard README should encourage minimal loading");
  assert(foundationReadme.includes("asset-taxonomy.md"), "Foundation README should list asset taxonomy");
  assert(foundationReadme.includes("navigation-chain.md"), "Foundation README should list navigation chain");
  assert(foundationReadme.includes("founder-progression-model.md"), "Foundation README should list founder progression model");
  assert(foundationReadme.includes("progression-gates.md"), "Foundation README should list progression gates");
  assert(foundationReadme.includes("guided-conversation.md"), "Foundation README should list guided conversation");
  assert(foundationReadme.includes("folder-documentation-rules.md"), "Foundation README should list folder documentation rules");
  assert(aiStandardReadme.includes("foundation/founder-progression-model.md"), "AI Standard README should route founder progression decisions");
  assert(aiStandardReadme.includes("foundation/progression-gates.md"), "AI Standard README should route progression gate decisions");
  assert(aiStandardReadme.includes("foundation/guided-conversation.md"), "AI Standard README should route guided conversation decisions");
  for (const expected of [
    "Setup Seed",
    "Strategy Seed",
    "Strategy Baseline",
    "Idea Calibration",
    "MVP Validation Scope",
    "Roadmap Inicial",
    "MVP Delivery Decision",
    "Product Shaping",
    "Delivery Readiness",
    "Implementation",
    "Launch",
    "Learning Loop",
    "Scaling / Operating Cadence",
    "activation_required",
    "Do not answer with only `activation_required`",
    "Esse pedido ja passou do ponto de estrategia",
    "Posso ativar Operations/Product Ops",
    "Progression Intent Routing",
    "Do not load inactive departments"
  ]) {
    assert(founderProgressionModel.includes(expected), `Founder Progression Model should include ${expected}`);
  }
  assert(founderProgressionModel.includes("Strategy Product defines MVP Validation Scope"), "Founder Progression Model should route first MVP definition through Strategy Product");
  assert(founderProgressionModel.includes("MVP Validation Scope can hand off directly to Product Ops"), "Founder Progression Model should allow MVP validation to hand off without Roadmap");
  assert(founderProgressionModel.includes("Roadmap is not mandatory after first MVP validation"), "Founder Progression Model should prevent forced Roadmap after first MVP validation");
  assert(founderProgressionModel.includes("approved MVP validation scope needs Product Ops ownership"), "Founder Progression Model should reserve Product Ops for approved MVP backlog planning");
  assert(founderProgressionModel.includes("progression-gates.md"), "Founder Progression Model should delegate concrete gate criteria to progression gates");
  for (const expected of [
    "# Progression Gates",
    "## Gate Matrix",
    "## Required Context",
    "## Allowed Next Stages",
    "## Blocked Next Stages",
    "Setup Seed",
    "Strategy Baseline",
    "MVP Validation Scope",
    "MVP Delivery Decision",
    "Implementation"
  ]) {
    assert(progressionGates.includes(expected), `Progression Gates should include ${expected}`);
  }
  assert(progressionGates.includes("Do not force Roadmap between MVP Validation Scope and Product Ops delivery planning"), "Progression Gates should block forced Roadmap between MVP validation and delivery planning");
  assert(progressionGates.includes("Do not allow Engineering before Product Ops delivery readiness"), "Progression Gates should block premature Engineering");
  assert(progressionGates.includes("activation_required"), "Progression Gates should document activation decisions");
  assert(guidedConversation.includes("# Guided Conversation"), "Guided conversation should have expected title");
  assert(guidedConversation.includes("the host application's native selection UI when available"), "Guided conversation should prefer native selection UI when available");
  assert(guidedConversation.includes("If no native selection UI is available, write numbered options directly in chat"), "Guided conversation should define numbered fallback");
  assert(guidedConversation.includes("3 to 5 numbered options"), "Guided conversation should define numbered options");
  assert(guidedConversation.includes("not sure / help me decide"), "Guided conversation should include a help-me-decide option");
  assert(guidedConversation.includes("You can reply with the number"), "Guided conversation should support low-friction answers");
  assert(assetTaxonomy.includes("# Asset Taxonomy"), "Asset taxonomy should have expected title");
  assert(assetTaxonomy.includes("Role = who acts."), "Asset taxonomy should define role concept");
  assert(assetTaxonomy.includes("Skill = capability used."), "Asset taxonomy should define skill concept");
  assert(assetTaxonomy.includes("Playbook = practical task execution inside an area."), "Asset taxonomy should define playbook concept");
  assert(assetTaxonomy.includes("Knowledge = information/source of truth."), "Asset taxonomy should define knowledge concept");
  assert(assetTaxonomy.includes("Workflow = coordination across areas, stages or handoffs."), "Asset taxonomy should define workflow concept");
  assert(assetTaxonomy.includes("## Workflow vs Playbook"), "Asset taxonomy should distinguish workflows from playbooks");
  assert(assetTaxonomy.includes("Workflow = coordinates multiple areas, stages or handoffs."), "Asset taxonomy should clarify workflow scope");
  assert(assetTaxonomy.includes("Playbook = executes a practical task inside one area."), "Asset taxonomy should clarify playbook scope");
  assert(assetTaxonomy.includes("| Asset | What It Is | Question It Answers |"), "Asset taxonomy should include summary table");
  assert(assetTaxonomy.includes("`AGENT.md`"), "Asset taxonomy should explain AGENT.md");
  assert(assetTaxonomy.includes("`README.md`"), "Asset taxonomy should explain README.md");
  assert(assetTaxonomy.includes("`department.yaml`"), "Asset taxonomy should explain department.yaml");
  assert(assetTaxonomy.includes("`area.yaml`"), "Asset taxonomy should explain area.yaml");
  assert(assetTaxonomy.includes("### Role"), "Asset taxonomy should explain roles");
  assert(assetTaxonomy.includes("### Skill"), "Asset taxonomy should explain skills");
  assert(assetTaxonomy.includes("### Playbook"), "Asset taxonomy should explain playbooks");
  assert(assetTaxonomy.includes("### Knowledge"), "Asset taxonomy should explain knowledge");
  assert(assetTaxonomy.includes("### Workflow"), "Asset taxonomy should explain workflows");
  assert.equal(assetTaxonomy.includes("### Command"), false, "Asset taxonomy should not present slash commands as a generated asset type");
  assert(assetTaxonomy.includes("operations/design/AGENT.md"), "Asset taxonomy should include Design AGENT example");
  assert(assetTaxonomy.includes("operations/design/skills/accessibility/SKILL.md"), "Asset taxonomy should include Design skill example");
  assert(assetTaxonomy.includes("operations/design/playbooks/design-foundation.playbook.md"), "Asset taxonomy should include Design playbook example");
  assert(assetTaxonomy.includes("operations/design/knowledge/design-system.md"), "Asset taxonomy should include Design knowledge example");
  assert(creationRules.includes("## Creation Decision"), "Creation rules should explain creation decisions");
  assert(creationRules.includes("## Placement Rules"), "Creation rules should explain placement rules");
  assert(creationRules.includes("## Confirmation Rule"), "Creation rules should explain confirmation rules");
  assert(creationRules.includes("Do not create files just to make the workspace look complete"), "Creation rules should prevent cosmetic scaffolding");
  assert(qualityCriteria.includes("## Universal Criteria"), "Quality criteria should include universal criteria");
  assert(qualityCriteria.includes("## Asset-Specific Signals"), "Quality criteria should include asset-specific signals");
  assert(qualityCriteria.includes("## Rejection Criteria"), "Quality criteria should include rejection criteria");
  assert(folderDocumentationRules.includes("# Folder Documentation Rules"), "Folder documentation rules should have expected title");
  assert(folderDocumentationRules.includes("A folder README is a map, not the operator"), "Folder documentation rules should define README responsibility");
  assert(folderDocumentationRules.includes("## Required Sections"), "Folder documentation rules should define required sections");
  assert(folderDocumentationRules.includes("Do not make folder README files huge inventories"), "Folder documentation rules should prevent huge inventories");
}

export async function assertAiStandardTemplates(rootDir) {
  const templatesReadme = await readFile(join(rootDir, "ai-standard", "templates", "README.md"), "utf8");
  const agentsReadme = await readFile(join(rootDir, "ai-standard", "templates", "agents", "README.md"), "utf8");
  const structureReadme = await readFile(join(rootDir, "ai-standard", "templates", "structure", "README.md"), "utf8");
  const executionReadme = await readFile(join(rootDir, "ai-standard", "templates", "execution", "README.md"), "utf8");
  const githubReadme = await readFile(join(rootDir, "ai-standard", "templates", "github", "README.md"), "utf8");
  const designReadme = await readFile(join(rootDir, "ai-standard", "templates", "design", "README.md"), "utf8");
  const reviewReadme = await readFile(join(rootDir, "ai-standard", "templates", "review", "README.md"), "utf8");
  const playbookTemplate = await readFile(join(rootDir, "ai-standard", "templates", "execution", "playbook-template.md"), "utf8");
  const componentSpecTemplate = await readFile(join(rootDir, "ai-standard", "templates", "design", "component-spec-template.md"), "utf8");

  assert(templatesReadme.includes("agents/"), "Templates README should route to agents");
  assert(templatesReadme.includes("structure/"), "Templates README should route to structure");
  assert(templatesReadme.includes("execution/"), "Templates README should route to execution");
  assert.equal(templatesReadme.includes("commands/"), false, "Templates README should not route to command templates");
  assert.equal(await exists(join(rootDir, "ai-standard", "templates", "commands")), false, "Command templates should not be generated");
  assert(templatesReadme.includes("github/"), "Templates README should route to GitHub");
  assert(templatesReadme.includes("design/"), "Templates README should route to Design templates");
  assert(templatesReadme.includes("review/"), "Templates README should route to review");
  assert(templatesReadme.includes("Do not load every template by default"), "Templates README should discourage loading every template");
  assert(agentsReadme.includes("root-agent-template.md"), "Agent templates README should list root agent template");
  assert(structureReadme.includes("department-template.yaml"), "Structure templates README should list department YAML template");
  assert(executionReadme.includes("role-template.md"), "Execution templates README should list role template");
  assert(executionReadme.includes("playbook-template.md"), "Execution templates README should list playbook template");
  assert(executionReadme.includes("workflow-template.md"), "Execution templates README should list workflow template");
  assert(playbookTemplate.includes("## Guided Conversation"), "Playbook template should include guided conversation section");
  assert(playbookTemplate.includes("../../../ai-standard/foundation/guided-conversation.md"), "Playbook template should point to guided conversation foundation");
  assert(githubReadme.includes("github-epic-template.md"), "GitHub templates README should list epic template");
  assert(githubReadme.includes("github-feature-template.md"), "GitHub templates README should list feature template");
  assert(githubReadme.includes("pull-request-template.md"), "GitHub templates README should list PR template");
  assert(designReadme.includes("component-spec-template.md"), "Design templates README should list component spec template");
  for (const heading of ["## When To Use", "## Anatomy", "## Variants", "## States", "## Accessibility", "## Composition Rules", "## Engineering Notes", "## Do Not Do"]) {
    assert(componentSpecTemplate.includes(heading), `Component spec template should include ${heading}`);
  }
  assert(reviewReadme.includes("code-review-template.md"), "Review templates README should list code review template");
}

export async function assertAiStandardChecklists(rootDir) {
  const checklistsReadme = await readFile(join(rootDir, "ai-standard", "checklists", "README.md"), "utf8");
  const agentChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "agent-quality-checklist.md"), "utf8");
  const readmeChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "readme-quality-checklist.md"), "utf8");
  const departmentChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "department-quality-checklist.md"), "utf8");
  const areaChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "area-quality-checklist.md"), "utf8");
  const roleChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "role-quality-checklist.md"), "utf8");
  const skillChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "skill-quality-checklist.md"), "utf8");
  const playbookChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "playbook-quality-checklist.md"), "utf8");
  const workflowChecklist = await readFile(join(rootDir, "ai-standard", "checklists", "workflow-quality-checklist.md"), "utf8");
  assert(checklistsReadme.includes("workflow-quality-checklist.md"), "Checklists README should list workflow checklist");
  assert.equal(checklistsReadme.includes("command-quality-checklist.md"), false, "Checklists README should not list command checklist");
  assert.equal(await exists(join(rootDir, "ai-standard", "checklists", "command-quality-checklist.md")), false, "Command checklist should not be generated");
  assert(checklistsReadme.includes("Do not treat all checklists as interchangeable"), "Checklists README should explain checklist specificity");
  assert(agentChecklist.includes("Root agents route only to departments"), "Agent checklist should validate root routing boundaries");
  assert(agentChecklist.includes("does not try to be a full inventory"), "Agent checklist should prevent giant inventories");
  assert(readmeChecklist.includes("The README is a map, not the operator"), "README checklist should define README responsibility");
  assert(readmeChecklist.includes("does not duplicate the full content of child files"), "README checklist should prevent duplication");
  assert(departmentChecklist.includes("does not contain `roles/`, `skills/` or `playbooks/` directly"), "Department checklist should enforce area-first execution assets");
  assert(departmentChecklist.includes("Department workflows coordinate across areas or stages"), "Department checklist should validate workflow ownership");
  assert(areaChecklist.includes("has `roles/`, `skills/` and `playbooks/`"), "Area checklist should validate execution folders");
  assert(areaChecklist.includes("Area AGENT, when present, chooses the specialist role"), "Area checklist should validate area routing");
  assert(roleChecklist.includes("with which hat should the agent act"), "Role checklist should validate persona responsibility");
  assert(roleChecklist.includes("points to relevant skills"), "Role checklist should require skill pointers");
  assert(skillChecklist.includes("one reusable capability"), "Skill checklist should validate reusable capability");
  assert(skillChecklist.includes("does not become a full process sequence"), "Skill checklist should avoid playbook duplication");
  assert(playbookChecklist.includes("ordered execution sequence"), "Playbook checklist should validate sequencing");
  assert(playbookChecklist.includes("uses skills rather than duplicating all skill content"), "Playbook checklist should avoid skill duplication");
  assert(playbookChecklist.includes("## Guided Conversation"), "Playbook checklist should include guided conversation criteria");
  assert(playbookChecklist.includes("numbered options"), "Playbook checklist should validate guided numbered options");
  assert(workflowChecklist.includes("does not live in `.leanos/workflows/`"), "Workflow checklist should keep workflows local to departments or areas");
  assert(workflowChecklist.includes("defines handoffs between owners"), "Workflow checklist should validate handoffs");
}

export async function assertAiStandardInstructions(rootDir) {
  const instructionsRoot = join(rootDir, "ai-standard", "instructions");
  const instructionsReadme = await readFile(join(instructionsRoot, "README.md"), "utf8");
  const instructionFiles = [
    "create-agent",
    "create-area",
    "create-department",
    "create-playbook",
    "create-readme",
    "create-role",
    "create-skill",
    "create-workflow"
  ];
  const contents = Object.fromEntries(
    await Promise.all(instructionFiles.map(async (name) => [name, await readFile(join(instructionsRoot, `${name}-instructions.md`), "utf8")]))
  );

  assert(instructionsReadme.includes("Do not use one instruction for every asset type"), "Instructions README should explain instruction specificity");
  assert(instructionsReadme.includes("../foundation/asset-taxonomy.md"), "Instructions README should point to asset taxonomy");
  assert(instructionsReadme.includes("../foundation/creation-rules.md"), "Instructions README should point to creation rules");
  assert(instructionsReadme.includes("../templates/"), "Instructions README should point to templates");
  assert(instructionsReadme.includes("../checklists/"), "Instructions README should point to checklists");
  assert.equal(instructionsReadme.includes("create-command-instructions.md"), false, "Instructions README should not list command creation instructions");
  assert.equal(await exists(join(instructionsRoot, "create-command-instructions.md")), false, "Command creation instructions should not be generated");

  assert(contents["create-agent"].includes("../templates/agents/root-agent-template.md"), "Create agent instructions should point to root agent template");
  assert(contents["create-agent"].includes("../templates/agents/department-agent-template.md"), "Create agent instructions should point to department agent template");
  assert(contents["create-agent"].includes("../templates/agents/area-agent-template.md"), "Create agent instructions should point to area agent template");
  assert(contents["create-agent"].includes("../checklists/agent-quality-checklist.md"), "Create agent instructions should point to agent checklist");
  assert(contents["create-agent"].includes("Do not make root AGENT route directly to area roles or skills"), "Create agent instructions should protect Navigation Chain levels");

  assert(contents["create-readme"].includes("../foundation/folder-documentation-rules.md"), "Create README instructions should point to folder documentation rules");
  assert(contents["create-readme"].includes("../templates/structure/folder-readme-template.md"), "Create README instructions should point to folder README template");
  assert(contents["create-readme"].includes("../checklists/readme-quality-checklist.md"), "Create README instructions should point to README checklist");
  assert(contents["create-readme"].includes("Keep it a map, not an executor"), "Create README instructions should keep README as a map");

  assert(contents["create-department"].includes("../templates/agents/department-agent-template.md"), "Create department instructions should point to department agent template");
  assert(contents["create-department"].includes("../templates/structure/department-template.yaml"), "Create department instructions should point to department YAML template");
  assert(contents["create-department"].includes("../checklists/department-quality-checklist.md"), "Create department instructions should point to department checklist");
  assert(contents["create-department"].includes("Do not create roles, skills or playbooks at department root"), "Create department instructions should protect area-owned assets");

  assert(contents["create-area"].includes("../templates/structure/area-template.yaml"), "Create area instructions should point to area YAML template");
  assert(contents["create-area"].includes("../templates/agents/area-agent-template.md"), "Create area instructions should point to area agent template");
  assert(contents["create-area"].includes("../checklists/area-quality-checklist.md"), "Create area instructions should point to area checklist");
  assert(contents["create-area"].includes("Create `roles/`, `skills/`, `playbooks/` and `knowledge/` only when they are needed"), "Create area instructions should avoid decorative folders");

  assert(contents["create-role"].includes("../templates/execution/role-template.md"), "Create role instructions should point to role template");
  assert(contents["create-role"].includes("../checklists/role-quality-checklist.md"), "Create role instructions should point to role checklist");
  assert(contents["create-role"].includes("Define what hat the agent should wear"), "Create role instructions should define persona responsibility");
  assert(contents["create-role"].includes("Do not create a role for a one-off task"), "Create role instructions should avoid one-off roles");

  assert(contents["create-skill"].includes("../templates/execution/skill-template.md"), "Create skill instructions should point to skill template");
  assert(contents["create-skill"].includes("../checklists/skill-quality-checklist.md"), "Create skill instructions should point to skill checklist");
  assert(contents["create-skill"].includes("Define one reusable capability"), "Create skill instructions should define reusable capability");
  assert(contents["create-skill"].includes("Avoid turning the skill into a full ordered process"), "Create skill instructions should avoid playbook duplication");

  assert(contents["create-playbook"].includes("../templates/execution/playbook-template.md"), "Create playbook instructions should point to playbook template");
  assert(contents["create-playbook"].includes("../foundation/guided-conversation.md"), "Create playbook instructions should point to guided conversation foundation when needed");
  assert(contents["create-playbook"].includes("../checklists/playbook-quality-checklist.md"), "Create playbook instructions should point to playbook checklist");
  assert(contents["create-playbook"].includes("Reference skills instead of duplicating them"), "Create playbook instructions should reference skills");
  assert(contents["create-playbook"].includes("Guided Conversation"), "Create playbook instructions should require guided conversation when founder input is needed");
  assert(contents["create-playbook"].includes("Do not duplicate a workflow"), "Create playbook instructions should avoid workflow duplication");

  assert(contents["create-workflow"].includes("../templates/execution/workflow-template.md"), "Create workflow instructions should point to workflow template");
  assert(contents["create-workflow"].includes("../checklists/workflow-quality-checklist.md"), "Create workflow instructions should point to workflow checklist");
  assert(contents["create-workflow"].includes("spans multiple areas, roles or stages"), "Create workflow instructions should explain workflow scope");
  assert(contents["create-workflow"].includes("Do not place business workflows in `.leanos/workflows/`"), "Create workflow instructions should keep business workflows local");

  for (const [name, content] of Object.entries(contents)) {
    assert.equal(content.includes("Choose the active department and area"), false, `${name} instructions should not use the old generic body`);
  }

  assert(new Set(Object.values(contents)).size === instructionFiles.length, "Instructions should be specific, not identical copies");
}

export async function assertAiStandardExamples(rootDir) {
  const examplesRoot = join(rootDir, "ai-standard", "examples");
  const examplesReadme = await readFile(join(examplesRoot, "README.md"), "utf8");
  const agentsReadme = await readFile(join(examplesRoot, "agents", "README.md"), "utf8");
  const structureReadme = await readFile(join(examplesRoot, "structure", "README.md"), "utf8");
  const executionReadme = await readFile(join(examplesRoot, "execution", "README.md"), "utf8");
  const githubReadme = await readFile(join(examplesRoot, "github", "README.md"), "utf8");
  const reviewReadme = await readFile(join(examplesRoot, "review", "README.md"), "utf8");
  const areaAgentExample = await readFile(join(examplesRoot, "agents", "example-area-agent.md"), "utf8");
  const areaReadmeExample = await readFile(join(examplesRoot, "structure", "example-area-readme.md"), "utf8");
  const roleExample = await readFile(join(examplesRoot, "execution", "example-role-senior-developer.md"), "utf8");
  const skillExample = await readFile(join(examplesRoot, "execution", "example-skill-coherence.md"), "utf8");
  const playbookExample = await readFile(join(examplesRoot, "execution", "example-playbook-prepare-pr.md"), "utf8");
  const workflowExample = await readFile(join(examplesRoot, "execution", "example-workflow-feature-to-delivery-cycle.md"), "utf8");
  const epicExample = await readFile(join(examplesRoot, "github", "example-github-epic.md"), "utf8");
  const featureExample = await readFile(join(examplesRoot, "github", "example-github-feature.md"), "utf8");
  const prExample = await readFile(join(examplesRoot, "github", "example-pull-request.md"), "utf8");
  const codeReviewExample = await readFile(join(examplesRoot, "review", "example-code-review.md"), "utf8");

  assert(examplesReadme.includes("Examples show what \"good enough\" can look like"), "Examples README should explain examples are quality references");
  assert(examplesReadme.includes("They are not active workspace context, not templates and not instructions"), "Examples README should prevent example misuse");
  assert(examplesReadme.includes("agents/"), "Examples README should route to agents examples");
  assert(examplesReadme.includes("structure/"), "Examples README should route to structure examples");
  assert(examplesReadme.includes("execution/"), "Examples README should route to execution examples");
  assert.equal(examplesReadme.includes("commands/"), false, "Examples README should not route to command examples");
  assert.equal(await exists(join(examplesRoot, "commands")), false, "Command examples should not be generated");
  assert(examplesReadme.includes("github/"), "Examples README should route to GitHub examples");
  assert(examplesReadme.includes("review/"), "Examples README should route to review examples");

  assert(agentsReadme.includes("example-root-agent.md"), "Agent examples README should list root agent example");
  assert(agentsReadme.includes("example-area-agent.md"), "Agent examples README should list area agent example");
  assert(structureReadme.includes("example-folder-readme.md"), "Structure examples README should list folder README example");
  assert(structureReadme.includes("example-area-readme.md"), "Structure examples README should list area README example");
  assert(executionReadme.includes("example-role-senior-developer.md"), "Execution examples README should list role example");
  assert(executionReadme.includes("example-skill-coherence.md"), "Execution examples README should list skill example");
  assert(executionReadme.includes("example-playbook-prepare-pr.md"), "Execution examples README should list playbook example");
  assert(executionReadme.includes("example-workflow-feature-to-delivery-cycle.md"), "Execution examples README should list workflow example");
  assert(githubReadme.includes("example-github-epic.md"), "GitHub examples README should list epic example");
  assert(githubReadme.includes("example-github-feature.md"), "GitHub examples README should list feature example");
  assert(githubReadme.includes("example-pull-request.md"), "GitHub examples README should list PR example");
  assert(reviewReadme.includes("example-code-review.md"), "Review examples README should list code review example");

  assert(areaAgentExample.includes("# Design Agent"), "Area AGENT example should use a concrete Design area");
  assert(areaAgentExample.includes("Role Routing"), "Area AGENT example should show role routing");
  assert(areaAgentExample.includes("operations/design/AGENT.md -> Role -> Skills -> Playbook -> Output"), "Area AGENT example should show area Navigation Chain");
  assert(areaReadmeExample.includes("## File Responsibilities"), "Area README example should show file responsibilities");
  assert(roleExample.includes("# Senior Developer"), "Role example should use Senior Developer");
  assert(skillExample.includes("Coherence Check"), "Skill example should use Coherence Check");
  assert(playbookExample.includes("Prepare PR"), "Playbook example should use Prepare PR");
  assert(workflowExample.includes("Participating Areas"), "Workflow example should show participating areas");
  assert(workflowExample.includes("Design: conditional"), "Workflow example should mark Design as conditional");
  assert(workflowExample.includes("Security: conditional"), "Workflow example should mark Security as conditional");
  assert(epicExample.includes("## Product Criteria"), "Epic example should include Product criteria");
  assert(epicExample.includes("## Design Criteria"), "Epic example should include Design criteria");
  assert(epicExample.includes("## Security Criteria"), "Epic example should include Security criteria");
  assert(featureExample.includes("## Definition of Done"), "Feature example should include Definition of Done");
  assert(prExample.includes("## LeanOS Context"), "PR example should include LeanOS context");
  assert(codeReviewExample.includes("## Findings"), "Code review example should include findings");

  for (const oldFlatExample of [
    "example-agent.md",
    "example-folder-readme.md",
    "example-role-senior-developer.md",
    "example-skill-coherence.md",
    "example-playbook-prepare-pr.md"
  ]) {
    assert.equal(await exists(join(examplesRoot, oldFlatExample)), false, `Old flat example should not exist: ${oldFlatExample}`);
  }
}

export async function assertNoOldAiStandardReferences(rootDir) {
  const oldReferences = [
    "ai-standard/navigation-chain.md",
    "ai-standard/asset-taxonomy.md",
    "ai-standard/creation-rules.md",
    "ai-standard/quality-criteria.md",
    "ai-standard/naming-conventions.md",
    "ai-standard/folder-readme-rules.md",
    "ai-standard/folder-documentation-rules.md",
    "ai-standard/standards",
    "ai-standard/templates/root-agent-template.md",
    "ai-standard/templates/department-agent-template.md",
    "ai-standard/templates/area-agent-template.md",
    "ai-standard/templates/role-template.md",
    "ai-standard/templates/skill-template.md",
    "ai-standard/templates/playbook-template.md",
    "ai-standard/templates/workflow-template.md",
    "ai-standard/templates/command-template.md",
    "ai-standard/templates/github-epic-template.md",
    "ai-standard/templates/github-feature-template.md",
    "ai-standard/templates/issue-readiness-matrix-template.md",
    "ai-standard/templates/branch-name-template.md",
    "ai-standard/templates/pull-request-template.md",
    "ai-standard/templates/code-review-template.md",
    "ai-standard/examples/example-agent.md",
    "ai-standard/examples/example-folder-readme.md",
    "ai-standard/examples/example-role-senior-developer.md",
    "ai-standard/examples/example-skill-coherence.md",
    "ai-standard/examples/example-playbook-prepare-pr.md",
    ".leanos/ai-standard",
    ".leanos/departments"
  ];
  const files = await listFiles(rootDir);

  for (const file of files) {
    const content = await readFile(join(rootDir, file), "utf8");

    for (const oldReference of oldReferences) {
      assert.equal(
        content.includes(oldReference),
        false,
        `Old AI Standard path reference should not appear in ${file}: ${oldReference}`
      );
    }
  }
}

export async function assertAiStandardReadiness(rootDir) {
  const aiStandardReadme = await readFile(join(rootDir, "ai-standard", "README.md"), "utf8");
  const requiredRoutes = [
    "foundation/asset-taxonomy.md",
    "foundation/navigation-chain.md",
    "foundation/creation-rules.md",
    "foundation/naming-conventions.md",
    "foundation/quality-criteria.md",
    "foundation/folder-documentation-rules.md",
    "instructions/",
    "templates/",
    "checklists/",
    "examples/"
  ];
  const requiredSections = [
    "## Fast Route",
    "## Decision Map",
    "## Routes",
    "## Creation Flow",
    "## Do Not Load By Default",
    "## Agent Notes"
  ];

  for (const route of requiredRoutes) {
    assert(aiStandardReadme.includes(route), `AI Standard README should route to ${route}`);
  }

  for (const section of requiredSections) {
    assert(aiStandardReadme.includes(section), `AI Standard README should include ${section}`);
  }

  assert(aiStandardReadme.includes("Use this route for most asset creation work"), "AI Standard README should give a default creation route");
  assert(aiStandardReadme.includes("If the next route is unclear, start with `foundation/asset-taxonomy.md`"), "AI Standard README should provide a fallback route");
  assert(aiStandardReadme.includes("Do not load every template category"), "AI Standard README should discourage loading all templates");
  assert(aiStandardReadme.includes("Do not let examples override active workspace context"), "AI Standard README should keep examples subordinate to context");

  const fileChecks = [
    ["ai-standard/foundation/asset-taxonomy.md", ["Role = who acts.", "Skill = capability used.", "Playbook = practical task execution inside an area.", "Knowledge = information/source of truth.", "Workflow = coordination across areas, stages or handoffs."]],
    ["ai-standard/checklists/agent-quality-checklist.md", ["Root agents route only to departments", "does not try to be a full inventory"]],
    ["ai-standard/checklists/skill-quality-checklist.md", ["one reusable capability", "does not become a full process sequence"]],
    ["ai-standard/instructions/create-skill-instructions.md", ["Define one reusable capability", "../templates/execution/skill-template.md", "../checklists/skill-quality-checklist.md"]],
    ["ai-standard/templates/execution/skill-template.md", ["name: <skill-name>", "description: Use when", "## Overview", "### Step 1"]],
    ["ai-standard/examples/README.md", ["They are not active workspace context, not templates and not instructions"]]
  ];

  for (const [path, snippets] of fileChecks) {
    const content = await readFile(join(rootDir, path), "utf8");

    for (const snippet of snippets) {
      assert(content.includes(snippet), `${path} should include readiness snippet: ${snippet}`);
    }
  }
}
