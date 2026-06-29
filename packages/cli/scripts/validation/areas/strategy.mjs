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

export async function assertBusinessAreaPattern(rootDir) {
  const businessAgent = await readFile(join(rootDir, "strategy", "business", "AGENT.md"), "utf8");
  const businessReadme = await readFile(join(rootDir, "strategy", "business", "README.md"), "utf8");
  const businessAreaYaml = parse(await readFile(join(rootDir, "strategy", "business", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "business", "knowledge", "README.md"), "utf8");
  const profile = await readFile(join(rootDir, "strategy", "business", "knowledge", "profile.md"), "utf8");
  const businessModel = await readFile(join(rootDir, "strategy", "business", "knowledge", "business-model-canvas.md"), "utf8");
  const role = await readFile(join(rootDir, "strategy", "business", "roles", "business-strategist.role.md"), "utf8");
  const identitySkill = await readFile(join(rootDir, "strategy", "business", "skills", "business-identity/SKILL.md"), "utf8");
  const operatingModelSkill = await readFile(join(rootDir, "strategy", "business", "skills", "operating-model/SKILL.md"), "utf8");
  const businessModelSkill = await readFile(join(rootDir, "strategy", "business", "skills", "business-model/SKILL.md"), "utf8");
  const playbook = await readFile(join(rootDir, "strategy", "business", "playbooks", "business-foundation.playbook.md"), "utf8");

  assert(businessAgent.includes("# Agente de Business"), "Business should have an area AGENT");
  assert(businessAgent.includes("Você é Business Lead"), "Business AGENT should act as Business Lead");
  assert(businessAgent.includes("Escolha o menor papel especialista"), "Business AGENT should route to specialist roles");
  assert(businessReadme.includes("comece em `AGENT.md`"), "Business README should route operational work through AGENT.md");
  assert.equal(businessAreaYaml.area.agent, "AGENT.md", "Business area.yaml should declare AGENT.md");
  assert(businessAreaYaml.area.source_of_truth.includes("knowledge/profile.md"), "Business area.yaml should list knowledge source files");
  assert(businessAreaYaml.area.source_of_truth.includes("knowledge/business-model-canvas.md"), "Business area.yaml should own business model source of truth");
  assert(knowledgeReadme.includes("# Business Knowledge"), "Business knowledge folder should include a README");
  assert(knowledgeReadme.includes("business-model-canvas.md"), "Business knowledge README should list business model canvas");
  assert(profile.includes("# Perfil do Negócio"), "Business profile should use Business naming");
  assert(businessModel.includes("## Modelo de Receita"), "Business model should include revenue model");
  assert(businessModel.includes("## Suposições para Validar"), "Business model should include assumptions to validate");
  assert(role.includes("# Business Strategist"), "Business should use Business Strategist role");
  assert(role.includes("../knowledge/profile.md"), "Business Strategist should load Business knowledge files");
  assert(role.includes("business-model"), "Business Strategist should expose business model definition");
  assertRoleFormat(role, "business-strategist");
  assertSkillFormat(identitySkill, "business-identity");
  assertSkillFormat(operatingModelSkill, "operating-model");
  assertSkillFormat(businessModelSkill, "business-model");
  assert(identitySkill.includes("## Contexto Obrigatório"), "Business identity skill should use rich skill structure");
  assert(identitySkill.includes("../knowledge/profile.md"), "Business identity skill should update Business knowledge");
  assert(operatingModelSkill.includes("Pontos de aprovação humana estão explícitos"), "Operating model skill should preserve human approval points");
  assert(businessModelSkill.includes("Roteie modelagem financeira detalhada para Growth Finance quando necessário"), "Business model skill should route finance detail to Growth Finance");
  assert(playbook.includes("Business Foundation"), "Business foundation playbook should exist");
  assert(playbook.includes("../knowledge/operating-model.md"), "Business foundation playbook should update operating model knowledge");
  assertPlaybookFormat(playbook, "business-foundation");

  assert.equal(await exists(join(rootDir, "strategy", "company")), false, "Old strategy/company path should not be generated");
}

export async function assertProductAreaPattern(rootDir) {
  const productAgent = await readFile(join(rootDir, "strategy", "product", "AGENT.md"), "utf8");
  const productReadme = await readFile(join(rootDir, "strategy", "product", "README.md"), "utf8");
  const productAreaYaml = parse(await readFile(join(rootDir, "strategy", "product", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "product", "knowledge", "README.md"), "utf8");
  const problem = await readFile(join(rootDir, "strategy", "product", "knowledge", "problem.md"), "utf8");
  const icp = await readFile(join(rootDir, "strategy", "product", "knowledge", "icp.md"), "utf8");
  const valueProposition = await readFile(join(rootDir, "strategy", "product", "knowledge", "value-proposition.md"), "utf8");
  const positioning = await readFile(join(rootDir, "strategy", "product", "knowledge", "positioning.md"), "utf8");
  const validationNotes = await readFile(join(rootDir, "strategy", "product", "knowledge", "validation-notes.md"), "utf8");
  const mvpValidationScope = await readFile(join(rootDir, "strategy", "product", "knowledge", "mvp-validation-scope.md"), "utf8");
  const productStrategistRole = await readFile(join(rootDir, "strategy", "product", "roles", "product-strategist.role.md"), "utf8");
  const productManagerRole = await readFile(join(rootDir, "strategy", "product", "roles", "product-manager.role.md"), "utf8");
  const diagnoseFounderIdeaSkill = await readFile(join(rootDir, "strategy", "product", "skills", "business-baseline/SKILL.md"), "utf8");
  const defineProductCoreSkill = await readFile(join(rootDir, "strategy", "product", "skills", "product-core/SKILL.md"), "utf8");
  const defineMvpValidationScopeSkill = await readFile(join(rootDir, "strategy", "product", "skills", "mvp-validation-scope/SKILL.md"), "utf8");
  const productStrategyPlaybook = await readFile(join(rootDir, "strategy", "product", "playbooks", "idea-calibration.playbook.md"), "utf8");
  const mvpValidationScopePlaybook = await readFile(join(rootDir, "strategy", "product", "playbooks", "mvp-validation-scope.playbook.md"), "utf8");

  assert(productAgent.includes("# Agente de Product"), "Product should have an area AGENT");
  assert(productAgent.includes("Você é Product Lead"), "Product AGENT should act as Product Lead");
  assert(productAgent.includes("Escolha o menor papel especialista"), "Product AGENT should route to specialist roles");
  assert(productReadme.includes("comece em `AGENT.md`"), "Product README should route operational work through AGENT.md");
  assert.equal(productAreaYaml.area.agent, "AGENT.md", "Product area.yaml should declare AGENT.md");
  assert(productAreaYaml.area.source_of_truth.includes("knowledge/brief.md"), "Product area.yaml should list knowledge source files");
  assert(knowledgeReadme.includes("# Product Knowledge"), "Product knowledge folder should include a README");
  assert(problem.includes("## Declaração do Problema"), "Product problem knowledge should include a problem statement section");
  assert(problem.includes("## Alternativas Existentes"), "Product problem knowledge should include alternatives");
  assert(icp.includes("## Segmento Primário"), "Product ICP knowledge should include primary segment");
  assert(icp.includes("## Exclusões"), "Product ICP knowledge should include exclusions");
  assert(valueProposition.includes("## Promessa"), "Product value proposition should include promise");
  assert(valueProposition.includes("## Diferenciação"), "Product value proposition should include differentiation");
  assert(positioning.includes("## Categoria"), "Product positioning should include category");
  assert(positioning.includes("## Não Dizer"), "Product positioning should include Do Not Say");
  assert.equal(productAreaYaml.area.source_of_truth.includes("knowledge/business-model-canvas.md"), false, "Product should not own business model source of truth");
  assert.equal(knowledgeReadme.includes("business-model-canvas.md"), false, "Product knowledge README should not list business model canvas");
  assert(validationNotes.includes("## Suposições-Chave"), "Product validation notes should include key assumptions");
  assert(validationNotes.includes("## Evidência"), "Product validation notes should include evidence");
  assert(validationNotes.includes("## Impacto no Roadmap"), "Product validation notes should include roadmap impact");
  assert(knowledgeReadme.includes("mvp-validation-scope.md"), "Product knowledge README should list MVP validation scope");
  assert(mvpValidationScope.includes("# Escopo de Validação do MVP"), "Product should define MVP validation scope knowledge");
  assert(mvpValidationScope.includes("## Tese de Negócio"), "MVP validation scope should include business thesis");
  assert(mvpValidationScope.includes("## MVP Slice"), "MVP validation scope should include MVP slice");
  assert(mvpValidationScope.includes("## Sinais de Sucesso"), "MVP validation scope should include success signals");
  assert(mvpValidationScope.includes("## Sinais de Pivot"), "MVP validation scope should include pivot signals");
  assert(mvpValidationScope.includes("## Sequência de Validação do MVP"), "MVP validation scope should include validation sequence");
  assert(productAreaYaml.area.source_of_truth.includes("knowledge/mvp-validation-scope.md"), "Product area.yaml should list MVP validation scope as source of truth");
  assert(productAreaYaml.area.source_of_truth.includes("knowledge/validation-notes.md"), "Product area.yaml should list validation notes as source of truth");
  assert(productAreaYaml.area.skills.includes("product-core"), "Product area.yaml should list product-core");
  assert.equal(productAreaYaml.area.skills.includes("define-product"), false, "Product area.yaml should not list removed define-product");
  assert.equal(productAreaYaml.area.skills.includes("define-icp"), false, "Product area.yaml should not list removed define-icp");
  assert.equal(productAreaYaml.area.skills.includes("define-value-proposition"), false, "Product area.yaml should not list removed define-value-proposition");
  assert.equal(productAreaYaml.area.skills.includes("business-model"), false, "Product area.yaml should not list Strategy Business skill");
  assert.equal(productAreaYaml.area.skills.includes("evaluate-idea"), false, "Product area.yaml should not list removed evaluate-idea");
  assert(productStrategistRole.includes("../knowledge/brief.md"), "Product Strategist should load Product knowledge files");
  assert(productStrategistRole.includes("../knowledge/mvp-validation-scope.md"), "Product Strategist should load MVP validation scope");
  assert(productStrategistRole.includes("business-baseline"), "Product Strategist should expose business baseline mapping skill");
  assert(productStrategistRole.includes("product-core"), "Product Strategist should expose product core definition");
  assert(productStrategistRole.includes("mvp-validation-scope"), "Product Strategist should expose MVP validation scope skill");
  assertRoleFormat(productStrategistRole, "product-strategist");
  assert.equal(productStrategistRole.includes("../skills/define-product/SKILL.md"), false, "Product Strategist should not load removed define-product skill");
  assert.equal(productStrategistRole.includes("../skills/define-icp/SKILL.md"), false, "Product Strategist should not load removed define-icp skill");
  assert.equal(productStrategistRole.includes("../skills/define-value-proposition/SKILL.md"), false, "Product Strategist should not load removed define-value-proposition skill");
  assert.equal(productStrategistRole.includes("../skills/business-model/SKILL.md"), false, "Product Strategist should not load business model skill from Product");
  assert.equal(productStrategistRole.includes("../skills/evaluate-idea/SKILL.md"), false, "Product Strategist should not load removed evaluate-idea skill");
  assert(productManagerRole.includes("../knowledge/brief.md"), "Product Manager should load Product knowledge files");
  assert(productManagerRole.includes("product-core"), "Product Manager should expose product core definition");
  assertRoleFormat(productManagerRole, "product-manager");
  assert.equal(productManagerRole.includes("../skills/define-product/SKILL.md"), false, "Product Manager should not load removed define-product skill");
  assert.equal(productManagerRole.includes("../skills/evaluate-idea/SKILL.md"), false, "Product Manager should not load removed evaluate-idea skill");
  assertSkillFormat(diagnoseFounderIdeaSkill, "business-baseline");
  assertSkillFormat(defineProductCoreSkill, "product-core");
  assertSkillFormat(defineMvpValidationScopeSkill, "mvp-validation-scope");
  assertPlaybookFormat(productStrategyPlaybook, "idea-calibration");
  assertPlaybookFormat(mvpValidationScopePlaybook, "mvp-validation-scope");
  assert(diagnoseFounderIdeaSkill.includes("# Business Baseline"), "Product should have a dedicated business baseline mapping skill");
  assert(diagnoseFounderIdeaSkill.includes("Strategy Baseline"), "Business baseline mapping skill should build Strategy Baseline");
  assert(diagnoseFounderIdeaSkill.includes("../../../ai-standard/foundation/progression-gates.md"), "Business baseline mapping skill should load progression gates");
  assert(diagnoseFounderIdeaSkill.includes("lacunas de baseline"), "Business baseline mapping skill should identify lacunas de baseline");
  assert(diagnoseFounderIdeaSkill.includes("Não crie roadmap, backlog de MVP, Epics, Features ou trabalho de implementação"), "Business baseline mapping skill should stop before roadmap and delivery");
  assert(defineProductCoreSkill.includes("# Product Core"), "Product should have a dedicated product core definition skill");
  assert(defineProductCoreSkill.includes("Usuário primário"), "Product core skill should cover the primary user");
  assert(defineProductCoreSkill.includes("Problema central"), "Product core skill should cover the core problem");
  assert(defineProductCoreSkill.includes("Promessa do produto"), "Product core skill should cover the product promise");
  assert(defineProductCoreSkill.includes("Verifique prontidão do Product Core"), "Product core skill should check readiness before consolidation");
  assert(defineProductCoreSkill.includes("ainda não consolide"), "Product core skill should avoid forced consolidation");
  assert(defineProductCoreSkill.includes("retorne sinais ausentes e próxima pergunta útil para idea-calibration"), "Product core skill should return gaps to idea calibration when signal is insufficient");
  for (const outputLabel of [
    "Produto em uma frase",
    "Alternativa existente",
    "Evidência",
    "Suposições",
    "Principal pergunta aberta"
  ]) {
    assert(defineProductCoreSkill.includes(outputLabel), `Product core skill should include output label: ${outputLabel}`);
  }
  assert(defineProductCoreSkill.includes("Roteie decisões de pricing, receita ou modelo de delivery para Strategy Business"), "Product core skill should route business model decisions to Strategy Business");
  assert(defineMvpValidationScopeSkill.includes("# Escopo de Validação do MVP"), "Product should have a dedicated MVP validation scope skill");
  assert(defineMvpValidationScopeSkill.includes("Tese de Negócio"), "MVP validation scope skill should require business thesis");
  assert(defineMvpValidationScopeSkill.includes("MVP Slice"), "MVP validation scope skill should require MVP slice");
  assert(defineMvpValidationScopeSkill.includes("Sinais de Sucesso"), "MVP validation scope skill should require success signals");
  assert(defineMvpValidationScopeSkill.includes("Sinais de Pivot"), "MVP validation scope skill should require pivot signals");
  assert(defineMvpValidationScopeSkill.includes("Sequência de Validação do MVP"), "MVP validation scope skill should define the validation sequence");
  assert(defineMvpValidationScopeSkill.includes("Não atualize arquivos de Roadmap a partir do escopo de validação do MVP"), "MVP validation scope skill should not update Roadmap files");
  assert(defineMvpValidationScopeSkill.includes("Não crie Epics, Features ou escopo de implementação"), "MVP validation scope skill should stop before delivery work");
  assert(productStrategyPlaybook.includes("## Conversa Guiada"), "Idea calibration playbook should include guided conversation");
  assert(productStrategyPlaybook.includes("../../../ai-standard/foundation/guided-conversation.md"), "Idea calibration playbook should point to guided conversation standard");
  assert(productStrategyPlaybook.includes("Faça uma pergunta útil por vez"), "Idea calibration playbook should keep calibration conversational");
  assert(productStrategyPlaybook.includes("skills/product-core/SKILL.md"), "Idea calibration playbook should use product core skill");
  assert(productStrategyPlaybook.includes("Avalie fit, suposições, evidência, impacto no MVP e impacto no roadmap dentro deste playbook"), "Idea calibration playbook should absorb idea evaluation");
  assert(productStrategyPlaybook.includes("`seed`, `strategy_forming` ou `mvp_shaping` -> `playbooks/mvp-validation-scope.playbook.md`"), "Idea calibration should route early-stage ideas to MVP validation scope");
  assert(productStrategyPlaybook.includes("`mvp_building` ou `mvp_live_learning` -> `activation_required: operations.product-ops`"), "Idea calibration should route active MVP work to Product Ops");
  assert(productStrategyPlaybook.includes("`product_operating` ou `growth_scaling` -> `../../roadmap/playbooks/roadmap-cycle-planning.playbook.md`"), "Idea calibration should route operating products to Roadmap");
  assert.equal(productStrategyPlaybook.includes("strategy/workflows/idea-to-roadmap.workflow.md"), false, "Idea calibration should not bridge through removed idea-to-roadmap workflow");
  assert.equal(productStrategyPlaybook.includes("skills/evaluate-idea/SKILL.md"), false, "Idea calibration playbook should not call evaluate-idea as a separate skill");
  assert(productStrategyPlaybook.includes("Não crie roadmap, Epics, Features ou escopo de delivery aqui"), "Idea calibration playbook should stop before roadmap and delivery");
  assert(mvpValidationScopePlaybook.includes("## Conversa Guiada"), "MVP validation scope playbook should include guided conversation");
  assert(mvpValidationScopePlaybook.includes("../../business/knowledge/business-model-canvas.md"), "MVP validation scope playbook should read business model from Strategy Business");
  assert(mvpValidationScopePlaybook.includes("../knowledge/mvp-validation-scope.md"), "MVP validation scope playbook should use MVP validation scope knowledge");
  assert(mvpValidationScopePlaybook.includes("Sequência de Validação do MVP"), "MVP validation scope playbook should produce a validation sequence");
  assert.equal(mvpValidationScopePlaybook.includes("../../roadmap/knowledge/backlog.md"), false, "MVP validation scope playbook should not update Roadmap backlog");
  assert.equal(mvpValidationScopePlaybook.includes("../../roadmap/knowledge/roadmap.md"), false, "MVP validation scope playbook should not update Roadmap");
  assert.equal(mvpValidationScopePlaybook.includes("MVP Candidate Roadmap"), false, "MVP validation scope playbook should not create MVP Candidate Roadmap");
  assert(mvpValidationScopePlaybook.includes("Product Ops transforma escopo confirmado em trabalho de delivery"), "MVP validation scope playbook should make the Product Ops handoff explicit");

  for (const oldSkill of [
    "define-product",
    "define-icp",
    "define-value-proposition",
    "define-business-model",
    "business-model",
    "evaluate-idea"
  ]) {
    assert.equal(await exists(join(rootDir, "strategy", "product", "skills", oldSkill, "SKILL.md")), false, `Product should not generate removed skill ${oldSkill}`);
  }

  assert.equal(await exists(join(rootDir, "strategy", "product", "knowledge", "business-model-canvas.md")), false, "Product should not generate business model canvas knowledge");

  for (const oldPath of [
    "brief.md",
    "problem.md",
    "icp.md",
    "jobs-to-be-done.md",
    "value-proposition.md",
    "positioning.md",
    "business-model-canvas.md"
  ]) {
    assert.equal(await exists(join(rootDir, "strategy", "product", oldPath)), false, `Product should not generate loose root file ${oldPath}`);
  }
}

export async function assertRoadmapAreaPattern(rootDir) {
  const roadmapAgent = await readFile(join(rootDir, "strategy", "roadmap", "AGENT.md"), "utf8");
  const roadmapReadme = await readFile(join(rootDir, "strategy", "roadmap", "README.md"), "utf8");
  const roadmapAreaYaml = parse(await readFile(join(rootDir, "strategy", "roadmap", "area.yaml"), "utf8"));
  const knowledgeReadme = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "README.md"), "utf8");
  const roadmap = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "roadmap.md"), "utf8");
  const milestones = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "milestones.md"), "utf8");
  const currentCycle = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "current-cycle.md"), "utf8");
  const backlog = await readFile(join(rootDir, "strategy", "roadmap", "knowledge", "backlog.md"), "utf8");
  const role = await readFile(join(rootDir, "strategy", "roadmap", "roles", "roadmap-planner.role.md"), "utf8");
  const roadmapSkill = await readFile(join(rootDir, "strategy", "roadmap", "skills", "roadmap/SKILL.md"), "utf8");
  const prioritizeBacklogSkill = await readFile(join(rootDir, "strategy", "roadmap", "skills", "backlog-prioritization/SKILL.md"), "utf8");
  const cyclePlaybook = await readFile(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-cycle-planning.playbook.md"), "utf8");
  const projectSync = await readFile(join(rootDir, ".github", "leanos", "project-sync.yaml"), "utf8");

  assert(roadmapAgent.includes("# Agente de Roadmap"), "Roadmap should have an area AGENT");
  assert(roadmapAgent.includes("Você é Roadmap Lead"), "Roadmap AGENT should act as Roadmap Lead");
  assert(roadmapAgent.includes("Escolha o menor papel especialista"), "Roadmap AGENT should route to specialist roles");
  assert(roadmapReadme.includes("comece em `AGENT.md`"), "Roadmap README should route operational work through AGENT.md");
  assert.equal(roadmapAreaYaml.area.agent, "AGENT.md", "Roadmap area.yaml should declare AGENT.md");
  assert(roadmapAreaYaml.area.source_of_truth.includes("knowledge/roadmap.md"), "Roadmap area.yaml should list knowledge source files");
  assert(roadmapAreaYaml.area.playbooks.includes("roadmap-cycle-planning"), "Roadmap area.yaml should list roadmap-cycle-planning");
  assert.equal(roadmapAreaYaml.area.playbooks.includes("validation-cycle-planning"), false, "Roadmap area.yaml should not list validation-cycle-planning");
  assert.equal(roadmapAreaYaml.area.skills.includes("prepare-roadmap-sync"), false, "Roadmap area.yaml should not list GitHub sync skills");
  assert.equal(roadmapAreaYaml.area.playbooks.includes("roadmap-sync-prep"), false, "Roadmap area.yaml should not list GitHub sync playbooks");
  assert(knowledgeReadme.includes("# Knowledge de Roadmap"), "Roadmap knowledge folder should include a README");
  assert(roadmap.includes("## Now"), "Roadmap knowledge should include Now");
  assert(roadmap.includes("## Next"), "Roadmap knowledge should include Next");
  assert(roadmap.includes("## Not Planned"), "Roadmap knowledge should include Not Planned");
  assert(milestones.includes("## Active Milestones"), "Milestones knowledge should include active milestones");
  assert(currentCycle.includes("## Cycle Goal"), "Current cycle knowledge should include cycle goal");
  assert(currentCycle.includes("## Success Criteria"), "Current cycle knowledge should include success criteria");
  assert(backlog.includes("## Candidate Items"), "Backlog knowledge should include candidate items");
  assert(role.includes("../knowledge/roadmap.md"), "Roadmap Planner should load Roadmap knowledge files");
  assert.equal(role.includes("../../product/knowledge/mvp-validation-scope.md"), false, "Roadmap Planner should not depend on MVP validation scope as mandatory input");
  assert(role.includes("../../product/knowledge/brief.md"), "Roadmap Planner should load Product brief context");
  assert.equal(role.includes("../../../operations/product-ops/mvp/scope.md"), false, "Roadmap Planner should not depend on inactive Product Ops MVP scope");
  assert.equal(role.includes("prepare-roadmap-sync"), false, "Roadmap Planner should not own GitHub sync preparation");
  assert(roadmapSkill.includes("## Contexto Obrigatório"), "Roadmap skill should use rich skill structure");
  assert.equal(roadmapSkill.includes("../../product/knowledge/mvp-validation-scope.md"), false, "Roadmap should not require Product MVP validation scope");
  assert.equal(roadmapSkill.includes("MVP Candidate Roadmap"), false, "Roadmap should not create MVP Candidate Roadmap");
  assert(roadmapSkill.includes("product_operating"), "Roadmap should target product_operating stage");
  assert(roadmapSkill.includes("growth_scaling"), "Roadmap should target growth_scaling stage");
  assert(roadmapSkill.includes("Não use Roadmap como continuação obrigatória da primeira validação de MVP"), "Roadmap should prevent forced Roadmap after MVP validation");
  assert.equal(roadmapSkill.includes("../../../operations/product-ops/mvp/scope.md"), false, "Roadmap should not depend on inactive Product Ops MVP scope");
  assert(prioritizeBacklogSkill.includes("Itens grandes são marcados para quebra em Epic"), "Prioritize backlog skill should identify large items");
  assert.equal(await exists(join(rootDir, "strategy", "roadmap", "skills", "prepare-roadmap-sync/SKILL.md")), false, "Roadmap should not generate prepare-roadmap-sync skill");
  assert(cyclePlaybook.includes("Roadmap Cycle Planning"), "Roadmap cycle playbook should replace validation cycle planning");
  assert(cyclePlaybook.includes("../knowledge/current-cycle.md"), "Roadmap cycle playbook should update current-cycle knowledge");
  assert.equal(cyclePlaybook.includes("../../product/knowledge/mvp-validation-scope.md"), false, "Roadmap cycle playbook should not require Product MVP validation scope");
  assert.equal(cyclePlaybook.includes("MVP Candidate Roadmap"), false, "Roadmap cycle playbook should not create MVP Candidate Roadmap");
  assert(cyclePlaybook.includes("Use apenas quando o produto estiver em `product_operating` ou `growth_scaling`"), "Roadmap cycle playbook should be stage-gated to operating products");
  assert(cyclePlaybook.includes("Se o negócio estiver em `mvp_building` ou `mvp_live_learning`"), "Roadmap cycle playbook should route active MVP work to Product Ops");
  assert.equal(cyclePlaybook.includes("../../../operations/product-ops/mvp/scope.md"), false, "Roadmap cycle playbook should not depend on inactive Product Ops MVP scope");
  assert.equal(await exists(join(rootDir, "strategy", "roadmap", "playbooks", "roadmap-sync-prep.playbook.md")), false, "Roadmap should not generate roadmap-sync-prep playbook");
  assert(projectSync.includes("operations/product-ops/epics/"), "GitHub project sync should point to local Epics/Features");

  for (const oldPath of ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"]) {
    assert.equal(await exists(join(rootDir, "strategy", "roadmap", oldPath)), false, `Roadmap should not generate loose root file ${oldPath}`);
  }

  assert.equal(await exists(join(rootDir, "strategy", "roadmap", "playbooks", "validation-cycle-planning.playbook.md")), false, "Roadmap should not generate validation-cycle-planning playbook in MVP roadmap scaffold");
}

export async function assertMvpValidationScopeSections(rootDir) {
  const mvpValidationScope = await readFile(join(rootDir, "strategy", "product", "knowledge", "mvp-validation-scope.md"), "utf8");
  const mvpValidationScopeSkill = await readFile(join(rootDir, "strategy", "product", "skills", "mvp-validation-scope/SKILL.md"), "utf8");
  const productPlaybook = await readFile(join(rootDir, "strategy", "product", "playbooks", "idea-calibration.playbook.md"), "utf8");

  assert.equal(await exists(join(rootDir, "strategy", "validation")), false, "Strategy Validation folder should not exist");
  assert(mvpValidationScope.includes("Tese de Negócio"), "MVP validation scope should capture the business thesis");
  assert(mvpValidationScope.includes("MVP Slice"), "MVP validation scope should define the validation slice");
  assert(mvpValidationScope.includes("Sinais de Sucesso"), "MVP validation scope should define success signals");
  assert(mvpValidationScope.includes("Sinais de Pivot"), "MVP validation scope should define pivot signals");
  assert(mvpValidationScope.includes("não cria Epics, Features ou escopo de implementação"), "MVP validation scope should not become delivery scope");
  assert(mvpValidationScopeSkill.includes("Não exija entrevistas ou pesquisa antes de propor um escopo de validação de MVP"), "MVP validation skill should avoid bureaucratic validation gates");
  assert(mvpValidationScopeSkill.includes("Não crie Epics, Features ou escopo de implementação a partir de Strategy Product"), "MVP validation skill should stop before delivery");
  assert.equal(productPlaybook.includes("Use Validation only for explicit experiment planning"), false, "Idea calibration playbook should not reference removed Strategy Validation area");
}
