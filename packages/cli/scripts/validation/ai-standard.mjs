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
  assert(aiStandardReadme.includes("Não carregue todo `ai-standard/` por padrão"), "AI Standard README should encourage minimal loading");
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
    "Não responda apenas com `activation_required`",
    "Esse pedido ja passou do ponto de estrategia",
    "Posso ativar Operations/Product Ops",
    "Roteamento de Intenção de Progressão",
    "Não carregue departamentos inativos"
  ]) {
    assert(founderProgressionModel.includes(expected), `Founder Progression Model should include ${expected}`);
  }
  assert(founderProgressionModel.includes("Strategy Product defines MVP Validation Scope"), "Founder Progression Model should route first MVP definition through Strategy Product");
  assert(founderProgressionModel.includes("MVP Validation Scope can hand off directly to Product Ops"), "Founder Progression Model should allow MVP validation to hand off without Roadmap");
  assert(founderProgressionModel.includes("Roadmap is not mandatory after first MVP validation"), "Founder Progression Model should prevent forced Roadmap after first MVP validation");
  assert(founderProgressionModel.includes("approved MVP validation scope needs Product Ops ownership"), "Founder Progression Model should reserve Product Ops for approved MVP backlog planning");
  assert(founderProgressionModel.includes("progression-gates.md"), "Founder Progression Model should delegate concrete gate criteria to progression gates");
  for (const expected of [
    "# Gates de Progressão",
    "## Matriz de Gates",
    "## Contexto Obrigatório",
    "## Próximos Estágios Permitidos",
    "## Próximos Estágios Bloqueados",
    "Setup Seed",
    "Strategy Baseline",
    "MVP Validation Scope",
    "MVP Delivery Decision",
    "Implementation"
  ]) {
    assert(progressionGates.includes(expected), `Progression Gates should include ${expected}`);
  }
  assert(progressionGates.includes("Não force Roadmap entre MVP Validation Scope e planejamento de entrega de Product Ops"), "Progression Gates should block forced Roadmap between MVP validation and delivery planning");
  assert(progressionGates.includes("Não permita Engineering antes de Product Ops delivery readiness"), "Progression Gates should block premature Engineering");
  assert(progressionGates.includes("activation_required"), "Progression Gates should document activation decisions");
  assert(guidedConversation.includes("# Conversa Guiada"), "Guided conversation should have expected title");
  assert(guidedConversation.includes("a UI nativa de seleção da aplicação host quando disponível"), "Guided conversation should prefer native selection UI when available");
  assert(guidedConversation.includes("Se não houver UI nativa de seleção disponível, escreva opções numeradas diretamente no chat"), "Guided conversation should define numbered fallback");
  assert(guidedConversation.includes("3 a 5 opções numeradas"), "Guided conversation should define numbered options");
  assert(guidedConversation.includes("não tenho certeza / me ajude a decidir"), "Guided conversation should include a help-me-decide option");
  assert(guidedConversation.includes("Você pode responder com o número"), "Guided conversation should support low-friction answers");
  assert(assetTaxonomy.includes("# Taxonomia de Assets"), "Asset taxonomy should have expected title");
  assert(assetTaxonomy.includes("Role = quem atua."), "Asset taxonomy should define role concept");
  assert(assetTaxonomy.includes("Skill = capacidade usada."), "Asset taxonomy should define skill concept");
  assert(assetTaxonomy.includes("Playbook = execução prática de tarefa dentro de uma área."), "Asset taxonomy should define playbook concept");
  assert(assetTaxonomy.includes("Knowledge = informação/source of truth."), "Asset taxonomy should define knowledge concept");
  assert(assetTaxonomy.includes("Workflow = coordenação entre áreas, estágios ou handoffs."), "Asset taxonomy should define workflow concept");
  assert(assetTaxonomy.includes("## Workflow vs Playbook"), "Asset taxonomy should distinguish workflows from playbooks");
  assert(assetTaxonomy.includes("Workflow = coordena múltiplas áreas, estágios ou handoffs."), "Asset taxonomy should clarify workflow scope");
  assert(assetTaxonomy.includes("Playbook = executa uma tarefa prática dentro de uma área."), "Asset taxonomy should clarify playbook scope");
  assert(assetTaxonomy.includes("| Asset | O Que É | Pergunta Que Responde |"), "Asset taxonomy should include summary table");
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
  assert(creationRules.includes("## Decisão de Criação"), "Creation rules should explain creation decisions");
  assert(creationRules.includes("## Regras de Posicionamento"), "Creation rules should explain placement rules");
  assert(creationRules.includes("## Regra de Confirmação"), "Creation rules should explain confirmation rules");
  assert(creationRules.includes("Não crie arquivos apenas para o workspace parecer completo"), "Creation rules should prevent cosmetic scaffolding");
  assert(qualityCriteria.includes("## Critérios Universais"), "Quality criteria should include universal criteria");
  assert(qualityCriteria.includes("## Sinais Específicos por Asset"), "Quality criteria should include asset-specific signals");
  assert(qualityCriteria.includes("## Critérios de Rejeição"), "Quality criteria should include rejection criteria");
  assert(folderDocumentationRules.includes("# Regras de Documentação de Pasta"), "Folder documentation rules should have expected title");
  assert(folderDocumentationRules.includes("Um README de pasta é um mapa, não o operador"), "Folder documentation rules should define README responsibility");
  assert(folderDocumentationRules.includes("## Seções Obrigatórias"), "Folder documentation rules should define required sections");
  assert(folderDocumentationRules.includes("Não transforme READMEs de pasta em inventários enormes"), "Folder documentation rules should prevent huge inventories");
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
  assert(templatesReadme.includes("Não carregue todos os templates por padrão"), "Templates README should discourage loading every template");
  assert(agentsReadme.includes("root-agent-template.md"), "Agent templates README should list root agent template");
  assert(structureReadme.includes("department-template.yaml"), "Structure templates README should list department YAML template");
  assert(executionReadme.includes("role-template.md"), "Execution templates README should list role template");
  assert(executionReadme.includes("playbook-template.md"), "Execution templates README should list playbook template");
  assert(executionReadme.includes("workflow-template.md"), "Execution templates README should list workflow template");
  assert(playbookTemplate.includes("## Conversa Guiada"), "Playbook template should include guided conversation section");
  assert(playbookTemplate.includes("../../../ai-standard/foundation/guided-conversation.md"), "Playbook template should point to guided conversation foundation");
  assert(githubReadme.includes("github-epic-template.md"), "GitHub templates README should list epic template");
  assert(githubReadme.includes("github-feature-template.md"), "GitHub templates README should list feature template");
  assert(githubReadme.includes("pull-request-template.md"), "GitHub templates README should list PR template");
  assert(designReadme.includes("component-spec-template.md"), "Design templates README should list component spec template");
  for (const heading of ["## When To Use", "## Anatomy", "## Variants", "## States", "## Accessibility", "## Composition Rules", "## Engineering Notes", "## Não Faça"]) {
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
  assert(checklistsReadme.includes("Não trate todos os checklists como intercambiáveis"), "Checklists README should explain checklist specificity");
  assert(agentChecklist.includes("Agentes raiz roteiam apenas para departamentos"), "Agent checklist should validate root routing boundaries");
  assert(agentChecklist.includes("não tenta ser um inventário completo"), "Agent checklist should prevent giant inventories");
  assert(readmeChecklist.includes("O README é um mapa, não o operador"), "README checklist should define README responsibility");
  assert(readmeChecklist.includes("não duplica o conteúdo completo dos arquivos filhos"), "README checklist should prevent duplication");
  assert(departmentChecklist.includes("não contém `roles/`, `skills/` ou `playbooks/` diretamente"), "Department checklist should enforce area-first execution assets");
  assert(departmentChecklist.includes("Workflows de departamento coordenam entre áreas ou estágios"), "Department checklist should validate workflow ownership");
  assert(areaChecklist.includes("tem `roles/`, `skills/` e `playbooks/`"), "Area checklist should validate execution folders");
  assert(areaChecklist.includes("O AGENT da área, quando existir, escolhe a role especialista"), "Area checklist should validate area routing");
  assert(roleChecklist.includes("com qual chapéu o agente deve atuar"), "Role checklist should validate persona responsibility");
  assert(roleChecklist.includes("aponta para skills relevantes"), "Role checklist should require skill pointers");
  assert(skillChecklist.includes("uma capacidade reutilizável"), "Skill checklist should validate reusable capability");
  assert(skillChecklist.includes("não se torna uma sequência completa de processo"), "Skill checklist should avoid playbook duplication");
  assert(playbookChecklist.includes("sequência ordenada de execução"), "Playbook checklist should validate sequencing");
  assert(playbookChecklist.includes("usa skills em vez de duplicar todo o conteúdo delas"), "Playbook checklist should avoid skill duplication");
  assert(playbookChecklist.includes("## Conversa Guiada"), "Playbook checklist should include guided conversation criteria");
  assert(playbookChecklist.includes("opções numeradas"), "Playbook checklist should validate guided numbered options");
  assert(workflowChecklist.includes("não vive em `.leanos/workflows/`"), "Workflow checklist should keep workflows local to departments or areas");
  assert(workflowChecklist.includes("define handoffs entre owners"), "Workflow checklist should validate handoffs");
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

  assert(instructionsReadme.includes("Não use uma instrução única para todos os tipos de asset"), "Instructions README should explain instruction specificity");
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
  assert(contents["create-agent"].includes("Não faça o AGENT raiz rotear diretamente para roles ou skills de área"), "Create agent instructions should protect Navigation Chain levels");

  assert(contents["create-readme"].includes("../foundation/folder-documentation-rules.md"), "Create README instructions should point to folder documentation rules");
  assert(contents["create-readme"].includes("../templates/structure/folder-readme-template.md"), "Create README instructions should point to folder README template");
  assert(contents["create-readme"].includes("../checklists/readme-quality-checklist.md"), "Create README instructions should point to README checklist");
  assert(contents["create-readme"].includes("Mantenha como mapa, não como executor"), "Create README instructions should keep README as a map");

  assert(contents["create-department"].includes("../templates/agents/department-agent-template.md"), "Create department instructions should point to department agent template");
  assert(contents["create-department"].includes("../templates/structure/department-template.yaml"), "Create department instructions should point to department YAML template");
  assert(contents["create-department"].includes("../checklists/department-quality-checklist.md"), "Create department instructions should point to department checklist");
  assert(contents["create-department"].includes("Não crie roles, skills ou playbooks na raiz do departamento"), "Create department instructions should protect area-owned assets");

  assert(contents["create-area"].includes("../templates/structure/area-template.yaml"), "Create area instructions should point to area YAML template");
  assert(contents["create-area"].includes("../templates/agents/area-agent-template.md"), "Create area instructions should point to area agent template");
  assert(contents["create-area"].includes("../checklists/area-quality-checklist.md"), "Create area instructions should point to area checklist");
  assert(contents["create-area"].includes("Crie `roles/`, `skills/`, `playbooks/` e `knowledge/` apenas quando forem necessários"), "Create area instructions should avoid decorative folders");

  assert(contents["create-role"].includes("../templates/execution/role-template.md"), "Create role instructions should point to role template");
  assert(contents["create-role"].includes("../checklists/role-quality-checklist.md"), "Create role instructions should point to role checklist");
  assert(contents["create-role"].includes("Defina qual chapéu operacional o agente deve vestir"), "Create role instructions should define persona responsibility");
  assert(contents["create-role"].includes("Não crie uma role para uma tarefa única"), "Create role instructions should avoid one-off roles");

  assert(contents["create-skill"].includes("../templates/execution/skill-template.md"), "Create skill instructions should point to skill template");
  assert(contents["create-skill"].includes("../checklists/skill-quality-checklist.md"), "Create skill instructions should point to skill checklist");
  assert(contents["create-skill"].includes("Defina uma capacidade reutilizável"), "Create skill instructions should define reusable capability");
  assert(contents["create-skill"].includes("Evite transformar a skill em um processo ordenado completo"), "Create skill instructions should avoid playbook duplication");

  assert(contents["create-playbook"].includes("../templates/execution/playbook-template.md"), "Create playbook instructions should point to playbook template");
  assert(contents["create-playbook"].includes("../foundation/guided-conversation.md"), "Create playbook instructions should point to guided conversation foundation when needed");
  assert(contents["create-playbook"].includes("../checklists/playbook-quality-checklist.md"), "Create playbook instructions should point to playbook checklist");
  assert(contents["create-playbook"].includes("Referencie skills em vez de duplicá-las"), "Create playbook instructions should reference skills");
  assert(contents["create-playbook"].includes("Conversa Guiada"), "Create playbook instructions should require guided conversation when founder input is needed");
  assert(contents["create-playbook"].includes("Não duplique um workflow"), "Create playbook instructions should avoid workflow duplication");

  assert(contents["create-workflow"].includes("../templates/execution/workflow-template.md"), "Create workflow instructions should point to workflow template");
  assert(contents["create-workflow"].includes("../checklists/workflow-quality-checklist.md"), "Create workflow instructions should point to workflow checklist");
  assert(contents["create-workflow"].includes("atravessa múltiplas áreas, roles ou estágios"), "Create workflow instructions should explain workflow scope");
  assert(contents["create-workflow"].includes("Não coloque workflows de negócio em `.leanos/workflows/`"), "Create workflow instructions should keep business workflows local");

  for (const [name, content] of Object.entries(contents)) {
    assert.equal(content.includes("Escolha o departamento e a área ativos"), false, `${name} instructions should not use the old generic body`);
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

  assert(examplesReadme.includes("Exemplos mostram como \"bom o bastante\" pode parecer"), "Examples README should explain examples are quality references");
  assert(examplesReadme.includes("Eles não são contexto ativo do workspace, nem templates, nem instruções"), "Examples README should prevent example misuse");
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
  assert(areaAgentExample.includes("Roteamento De Roles"), "Area AGENT example should show role routing");
  assert(areaAgentExample.includes("operations/design/AGENT.md -> Role -> Skills -> Playbook -> Saída"), "Area AGENT example should show area Navigation Chain");
  assert(areaReadmeExample.includes("## Responsabilidades dos Arquivos"), "Area README example should show file responsibilities");
  assert(roleExample.includes("# Senior Developer"), "Role example should use Senior Developer");
  assert(skillExample.includes("Checagem De Coerência"), "Skill example should use Coherence Check");
  assert(playbookExample.includes("Preparar PR"), "Playbook example should use Prepare PR");
  assert(workflowExample.includes("Áreas Participantes"), "Workflow example should show participating areas");
  assert(workflowExample.includes("Design: condicional"), "Workflow example should mark Design as conditional");
  assert(workflowExample.includes("Security: condicional"), "Workflow example should mark Security as conditional");
  assert(epicExample.includes("## Critérios De Product"), "Epic example should include Product criteria");
  assert(epicExample.includes("## Critérios De Design"), "Epic example should include Design criteria");
  assert(epicExample.includes("## Critérios De Security"), "Epic example should include Security criteria");
  assert(featureExample.includes("## Definição De Pronto"), "Feature example should include Definition of Done");
  assert(prExample.includes("## Contexto LeanOS"), "PR example should include LeanOS context");
  assert(codeReviewExample.includes("## Achados"), "Code review example should include findings");

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
    "## Rota Rápida",
    "## Mapa de Decisão",
    "## Rotas",
    "## Fluxo de Criação",
    "## Não Carregar por Padrão",
    "## Notas para Agentes"
  ];

  for (const route of requiredRoutes) {
    assert(aiStandardReadme.includes(route), `AI Standard README should route to ${route}`);
  }

  for (const section of requiredSections) {
    assert(aiStandardReadme.includes(section), `AI Standard README should include ${section}`);
  }

  assert(aiStandardReadme.includes("Use esta rota para a maior parte do trabalho de criação de assets"), "AI Standard README should give a default creation route");
  assert(aiStandardReadme.includes("Se a próxima rota não estiver clara, comece por `foundation/asset-taxonomy.md`"), "AI Standard README should provide a fallback route");
  assert(aiStandardReadme.includes("Não carregue todas as categorias de template"), "AI Standard README should discourage loading all templates");
  assert(aiStandardReadme.includes("Não deixe exemplos sobrescreverem o contexto ativo do workspace"), "AI Standard README should keep examples subordinate to context");

  const fileChecks = [
    ["ai-standard/foundation/asset-taxonomy.md", ["Role = quem atua.", "Skill = capacidade usada.", "Playbook = execução prática de tarefa dentro de uma área.", "Knowledge = informação/source of truth.", "Workflow = coordenação entre áreas, estágios ou handoffs."]],
    ["ai-standard/checklists/agent-quality-checklist.md", ["Agentes raiz roteiam apenas para departamentos", "não tenta ser um inventário completo"]],
    ["ai-standard/checklists/skill-quality-checklist.md", ["uma capacidade reutilizável", "não se torna uma sequência completa de processo"]],
    ["ai-standard/instructions/create-skill-instructions.md", ["Defina uma capacidade reutilizável", "../templates/execution/skill-template.md", "../checklists/skill-quality-checklist.md"]],
    ["ai-standard/templates/execution/skill-template.md", ["name: <skill-name>", "description: Use quando", "## Visão Geral", "### Etapa 1"]],
    ["ai-standard/examples/README.md", ["Eles não são contexto ativo do workspace, nem templates, nem instruções"]]
  ];

  for (const [path, snippets] of fileChecks) {
    const content = await readFile(join(rootDir, path), "utf8");

    for (const snippet of snippets) {
      assert(content.includes(snippet), `${path} should include readiness snippet: ${snippet}`);
    }
  }
}
