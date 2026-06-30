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

export async function assertDesignFoundation(rootDir) {
  const designReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "README.md"), "utf8");
  const designAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "AGENT.md"), "utf8");
  const designKnowledgeReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "README.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "area.yaml"), "utf8"));
  const productDesigner = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "product-designer.role.md"), "utf8");
  const uxResearcher = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "ux-researcher.role.md"), "utf8");
  const accessibilitySpecialist = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "accessibility-specialist.role.md"), "utf8");
  const uxWriter = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "ux-writer.role.md"), "utf8");
  const designFoundationPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "design-foundation.playbook.md"), "utf8");
  const nextActions = await readFile(join(rootDir, ".leanos", "runtime", "context", "next-actions.md"), "utf8");
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "skills.yaml"), "utf8"));
  const designSystemKnowledge = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "design-system.md"), "utf8");
  const accessibilityKnowledge = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "accessibility.md"), "utf8");
  const userFlowsKnowledge = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "user-flows.md"), "utf8");
  const componentInventoryKnowledge = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "component-inventory.md"), "utf8");
  const componentSpecsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "components", "README.md"), "utf8");
  const userResearchSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "user-research/SKILL.md"), "utf8");
  const userFlowMappingSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "user-flow-mapping/SKILL.md"), "utf8");
  const designSystemSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "design-system/SKILL.md"), "utf8");
  const componentAnalysisSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "component-analysis/SKILL.md"), "utf8");
  const screenSpecificationSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "screen-specification/SKILL.md"), "utf8");
  const microcopySkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "microcopy/SKILL.md"), "utf8");
  const accessibilitySkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "accessibility/SKILL.md"), "utf8");
  const designReviewSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "design-review/SKILL.md"), "utf8");
  const componentReadinessPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "component-readiness.playbook.md"), "utf8");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "README.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "design-system.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "accessibility.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "user-flows.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "component-inventory.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "components", "README.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "ux-researcher.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "product-designer.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "accessibility-specialist.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "ux-writer.role.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "design-system/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "accessibility/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "user-research/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "user-flow-mapping/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "component-analysis/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "screen-specification/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "microcopy/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "design-review/SKILL.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "user-research.playbook.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "component-readiness.playbook.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "accessibility-review.playbook.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "playbooks", "ux-writing.playbook.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "design-principles.md")), false, "Design principles should move out of the Design area root");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "user-flows.md")), false, "User flows should move into Design knowledge");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "screen-specs.md")), false, "Screen specs should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "ux-decisions.md")), false, "UX decisions should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "usability-notes.md")), false, "Usability notes should not be generated in the initial Design scaffold");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "roles", "ux-lead.role.md")), false, "UX Lead should be the area AGENT, not a specialist role file");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "define-design-system/SKILL.md")), false, "Design skill should use direct naming without define- prefix");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "define-accessibility/SKILL.md")), false, "Accessibility skill should use direct naming without define- prefix");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "map-user-flow/SKILL.md")), false, "User flow skill should use direct naming");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "create-screen-spec/SKILL.md")), false, "Screen spec skill should use direct naming");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "ux-states/SKILL.md")), false, "UX states should be incorporated into screen specification");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "skills", "define-ux-states/SKILL.md")), false, "UX states skill should use direct naming");

  for (const heading of ["## Tokens", "## Typography", "## Color Intent", "## Spacing", "## Components", "## Interaction Principles", "## Não Faça", "## Perguntas em Aberto"]) {
    assert(designSystemKnowledge.includes(heading), `Design system knowledge should include ${heading}`);
  }

  for (const heading of ["## Accessibility Baseline", "## WCAG Target", "## Keyboard Navigation", "## Focus Rules", "## Contrast Rules", "## Forms and Errors", "## Screen Reader Notes", "## Riscos Conhecidos"]) {
    assert(accessibilityKnowledge.includes(heading), `Accessibility knowledge should include ${heading}`);
  }

  for (const heading of ["## Primary Flow", "## Entry Point", "## User Goal", "## Etapas", "## Edge Cases", "## Required Screens", "## Perguntas em Aberto"]) {
    assert(userFlowsKnowledge.includes(heading), `User flows knowledge should include ${heading}`);
  }

  for (const heading of ["## Propósito", "## How To Use", "## Component List", "## Lacunas Conhecidas", "## Reuse Rules", "## Perguntas em Aberto"]) {
    assert(componentInventoryKnowledge.includes(heading), `Component inventory knowledge should include ${heading}`);
  }
  assert(componentInventoryKnowledge.includes("approved, planned, needs-spec, deprecated or unknown"), "Component inventory should define practical component statuses");
  assert(componentSpecsReadme.includes("Store concrete Design component specifications created for real Features"), "Component specs README should explain its purpose");
  assert(componentSpecsReadme.includes("intentionally empty in the initial scaffold except for this README"), "Component specs folder should avoid speculative specs");
  assert(componentSpecsReadme.includes("<component-name>.md"), "Component specs README should define component spec naming");
  assert(componentSpecsReadme.includes(".leanos/standard/templates/design/component-spec-template.md"), "Component specs README should point to the component spec template");
  const componentSpecEntries = await readdir(join(rootDir, "clinic-assistant-ai-os", "operations", "design", "knowledge", "components"));
  assert.deepEqual(componentSpecEntries, ["README.md"], "Component specs folder should not generate concrete component specs in the initial scaffold");

  for (const skillContent of [userResearchSkill, userFlowMappingSkill, designSystemSkill, componentAnalysisSkill, screenSpecificationSkill, microcopySkill, accessibilitySkill, designReviewSkill]) {
    assert(skillContent.includes("---\nname:"), "Design skill should include YAML frontmatter");
    assert(skillContent.includes("description: Use quando"), "Design skill should include trigger-only description");
    assert(skillContent.includes("### Etapa 1"), "Design skill should use Step headings inside Process");

    for (const heading of ["## Visão Geral", "## Use Quando", "## Contexto Obrigatório", "## Entradas", "## Processo", "## Verificações", "## Saída", "## Arquivos para Atualizar", "## Linhas Vermelhas"]) {
      assert(skillContent.includes(heading), `Design skill should include ${heading}`);
    }
  }

  assert(userResearchSkill.includes("Separate evidence from assumptions"), "User research skill should separate evidence from assumptions");
  assert(userResearchSkill.includes("Não trate hipóteses como fatos"), "User research skill should avoid treating hypotheses as facts");
  assert(userFlowMappingSkill.includes("Avoid flows larger than the MVP"), "User flow mapping should avoid oversized MVP flows");
  assert(designSystemSkill.includes("Prioritize flow clarity before visual polish"), "Design system skill should avoid polish before flow clarity");
  assert(componentAnalysisSkill.includes("reuse, adapt, create-new, not-applicable or blocked"), "Component analysis should classify component readiness decisions");
  assert(componentAnalysisSkill.includes("component-inventory.md"), "Component analysis should read component inventory");
  assert(componentAnalysisSkill.includes("component-spec-template.md"), "Component analysis should use the component spec template");
  assert(screenSpecificationSkill.includes("default, loading, empty, error, success and edge-case states"), "Screen specification should include required UX states");
  assert(microcopySkill.includes("labels, helper text, empty states, errors, success messages and onboarding hints"), "Microcopy skill should cover key copy surfaces");
  assert(accessibilitySkill.includes("WCAG 2.2 AA"), "Accessibility skill should use WCAG 2.2 AA baseline");
  assert(designReviewSkill.includes("pass, concerns, blocked or not applicable"), "Design review skill should classify review result");
  assert(designReviewSkill.includes("Findings are ordered by severity"), "Design review skill should order findings by severity");

  assert(designReadme.includes("knowledge/design-system.md"), "Design README should point to Design knowledge");
  assert(designKnowledgeReadme.includes("components/README.md"), "Design knowledge README should include component specs folder guidance");
  assert(designKnowledgeReadme.includes("Create component specs inside `components/` only when a real Feature requires them"), "Design knowledge README should prevent speculative component specs");
  assert(designReadme.includes("Design foundation request"), "Design README should expose the design foundation common path");
  assert(designReadme.includes("For operational work, comece em `AGENT.md`"), "Design README should point operational work to the area AGENT");
  assert(designAgent.includes("Você é UX Lead"), "Design AGENT should define UX Lead as the area owner");
  assert(designAgent.includes("Product Designer: `roles/product-designer.role.md`"), "Design AGENT should route product design work");
  assert(designAgent.includes("UX Researcher: `roles/ux-researcher.role.md`"), "Design AGENT should route research work");
  assert(designAgent.includes("Accessibility Specialist: `roles/accessibility-specialist.role.md`"), "Design AGENT should route accessibility work");
  assert(designAgent.includes("UX Writer: `roles/ux-writer.role.md`"), "Design AGENT should route UX writing work");
  assert(designAgent.includes("Mantenha knowledge reutilizável da área em `knowledge/`"), "Design AGENT should keep knowledge modular");
  assert.equal(areaYaml.area.agent, "AGENT.md");
  assert(areaYaml.area.skills.includes("design-review"), "Design area YAML should list design-review skill");
  assert(areaYaml.area.skills.includes("component-analysis"), "Design area YAML should list component-analysis skill");
  assert(areaYaml.area.playbooks.includes("component-readiness"), "Design area YAML should list component-readiness playbook");
  assert.equal(areaYaml.area.skills.includes("ux-states"), false, "Design area YAML should not list ux-states skill");
  assert(skillsIndex.skills.some((skill) => skill.key === "design-review" && skill.path === "../../operations/design/skills/design-review/SKILL.md"), "Skills index should list design-review");
  assert(skillsIndex.skills.some((skill) => skill.key === "component-analysis" && skill.path === "../../operations/design/skills/component-analysis/SKILL.md"), "Skills index should list component-analysis");
  assert.equal(skillsIndex.skills.some((skill) => skill.key === "ux-states"), false, "Skills index should not list ux-states");
  assert.deepEqual(areaYaml.area.source_of_truth, ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md", "knowledge/component-inventory.md"]);
  assert(productDesigner.includes("../knowledge/design-system.md"), "Product Designer should read design-system knowledge");
  assert(productDesigner.includes("../knowledge/user-flows.md"), "Product Designer should read user-flow knowledge");
  assert(productDesigner.includes("../knowledge/component-inventory.md"), "Product Designer should read component inventory");
  assert(productDesigner.includes("../skills/component-analysis/SKILL.md"), "Product Designer should point to component-analysis skill");
  assert(productDesigner.includes("../playbooks/component-readiness.playbook.md"), "Product Designer should point to component-readiness playbook");
  assert(productDesigner.includes("../skills/design-review/SKILL.md"), "Product Designer should point to design-review skill");
  assert(uxResearcher.includes("../knowledge/user-flows.md"), "UX Researcher should read user-flow knowledge");
  assert(accessibilitySpecialist.includes("../knowledge/accessibility.md"), "Accessibility Specialist should read accessibility knowledge");
  assert(accessibilitySpecialist.includes("../skills/design-review/SKILL.md"), "Accessibility Specialist should point to design-review skill");
  assert(uxWriter.includes("../knowledge/user-flows.md"), "UX Writer should read user-flow knowledge");
  assert(uxWriter.includes("../skills/design-review/SKILL.md"), "UX Writer should point to design-review skill");

  assert.equal(await exists(join(rootDir, ".leanos", "commands", "define-design.md")), false, "Define design command should not be generated");
  assert(designAgent.includes("Product Designer: `roles/product-designer.role.md`"), "Design AGENT should route Product Designer");
  assert(productDesigner.includes("../skills/design-system/SKILL.md"), "Product Designer should load the direct design-system skill name");
  assert(productDesigner.includes("../skills/accessibility/SKILL.md"), "Product Designer should load the direct accessibility skill name");
  assert(productDesigner.includes("../skills/user-flow-mapping/SKILL.md"), "Product Designer should load user-flow-mapping skill");
  assert.equal(productDesigner.includes("../roles/ux-lead.role.md"), false, "Design foundation route should not load old UX Lead role file");
  assert.equal(productDesigner.includes("../skills/define-design-system/SKILL.md"), false, "Design foundation route should not load define-prefixed design-system skill");
  assert.equal(productDesigner.includes("../skills/define-accessibility/SKILL.md"), false, "Design foundation route should not load define-prefixed accessibility skill");
  assert(designFoundationPlaybook.includes("../knowledge/design-system.md"), "Design foundation should update design-system knowledge");
  assert(designFoundationPlaybook.includes("Leave screen-specific artifacts for later feature or screen-specific work"), "Design foundation should defer screen-specific files");
  assert.equal(designFoundationPlaybook.includes("screen-specs.md"), false, "Design foundation should not reference removed screen specs file");
  assert.equal(designFoundationPlaybook.includes("usability-notes.md"), false, "Design foundation should not reference removed usability notes file");
  assert.equal(designFoundationPlaybook.includes("ux-decisions.md"), false, "Design foundation should not reference removed UX decisions file");
  assert(designFoundationPlaybook.includes("wait for confirmation before writing"), "Design foundation should use propose-first writes");
  assert(designFoundationPlaybook.includes("Design system baseline"), "Design foundation playbook should output a design system baseline");
  assert(designFoundationPlaybook.includes("Accessibility baseline"), "Design foundation playbook should output an accessibility baseline");
  assert(componentReadinessPlaybook.includes("Component readiness result"), "Component readiness playbook should output a readiness result");
  assert(componentReadinessPlaybook.includes("component-spec-template.md"), "Component readiness playbook should use the component spec template");
  assert(componentReadinessPlaybook.includes("Return the Design readiness result to Product Ops and Engineering"), "Component readiness should hand off to Product Ops and Engineering");
  assert(nextActions.includes("Product Ops is active"), "Full workspace should recommend natural delivery routes when Product Ops is active");
}

export async function assertEngineeringAreaPattern(rootDir) {
  const engineeringReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "README.md"), "utf8");
  const engineeringAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "area.yaml"), "utf8"));
  const skillsIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "skills.yaml"), "utf8"));
  const playbooksIndex = parse(await readFile(join(rootDir, ".leanos", "runtime", "index", "playbooks.yaml"), "utf8"));
  const codeStandards = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "code-standards.md"), "utf8");
  const implementationRules = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "implementation-rules.md"), "utf8");
  const componentGuidelines = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "component-guidelines.md"), "utf8");
  const dataGuidelines = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "data-guidelines.md"), "utf8");
  const testingStrategy = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "testing-strategy.md"), "utf8");
  const reviewCriteria = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "review-criteria.md"), "utf8");
  const seniorDeveloper = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "roles", "senior-developer.role.md"), "utf8");
  const testEngineer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "roles", "test-engineer.role.md"), "utf8");
  const prReviewer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "roles", "pr-reviewer.role.md"), "utf8");
  const planImplementation = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "plan-implementation/SKILL.md"), "utf8");
  const followCodeStandards = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "follow-code-standards/SKILL.md"), "utf8");
  const implementComponent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "implement-component/SKILL.md"), "utf8");
  const reviewDataChange = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "review-data-change/SKILL.md"), "utf8");
  const engineeringDelivery = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "engineering-delivery.playbook.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "branch-for-feature.playbook.md"), "utf8");
  const componentImplementation = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "component-implementation.playbook.md"), "utf8");
  const preparePr = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const prValidation = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "README.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "implementation-notes.md")), false, "Engineering notes should move into knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "code-review-notes.md")), false, "Code review notes should move into knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "pr-log.md")), false, "PR log should move into knowledge/");

  assert(engineeringReadme.includes("comece em `AGENT.md`"), "Engineering README should route operational work through AGENT.md");
  assert(engineeringReadme.includes("Read the approved Design component spec before implementing a new reusable component"), "Engineering README should require Design component spec before component work");
  assert(engineeringReadme.includes("Não crie novos componentes voltados ao usuário antes de Design definir a estrutura ou confirmar a especificação do componente"), "Engineering README should include component red line");
  assert(engineeringAgent.includes("Você é Engineering Lead"), "Engineering AGENT should define Engineering Lead");
  assert(engineeringAgent.includes("Senior Developer: `roles/senior-developer.role.md`"), "Engineering AGENT should route Senior Developer work");
  assert(engineeringAgent.includes("Test Engineer: `roles/test-engineer.role.md`"), "Engineering AGENT should route Test Engineer work");
  assert(engineeringAgent.includes("PR Reviewer: `roles/pr-reviewer.role.md`"), "Engineering AGENT should route PR Reviewer work");
  assert(engineeringAgent.includes("Create or confirm a Feature-linked branch before changing code"), "Engineering AGENT should require branch before code changes");
  assert(engineeringAgent.includes("Implement reusable component work before the screen or Feature that depends on it"), "Engineering AGENT should implement reusable component before dependent Feature");
  assert(engineeringAgent.includes("playbooks/engineering-delivery.playbook.md"), "Engineering AGENT should route implementation through engineering-delivery");
  assert(engineeringAgent.includes("Não hardcode segredos, configuração, regras de negócio, copy ou valores de design"), "Engineering AGENT should forbid hardcoding");
  assert.equal(areaYaml.area.agent, "AGENT.md", "Engineering area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/code-standards.md"), "Engineering area.yaml should list code standards");
  assert(areaYaml.area.roles.includes("test-engineer"), "Engineering area.yaml should list test-engineer");
  assert(areaYaml.area.skills.includes("follow-code-standards"), "Engineering area.yaml should list follow-code-standards");
  assert(areaYaml.area.skills.includes("implement-component"), "Engineering area.yaml should list implement-component");
  assert(areaYaml.area.skills.includes("review-data-change"), "Engineering area.yaml should list review-data-change");
  assert(areaYaml.area.playbooks.includes("engineering-delivery"), "Engineering area.yaml should list engineering-delivery");
  assert(areaYaml.area.playbooks.includes("component-implementation"), "Engineering area.yaml should list component-implementation");
  assert(skillsIndex.skills.some((skill) => skill.key === "implement-component" && skill.path === "../../operations/engineering/skills/implement-component/SKILL.md"), "Skills index should list implement-component");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "engineering-delivery" && playbook.path === "../../operations/engineering/playbooks/engineering-delivery.playbook.md"), "Playbooks index should list engineering-delivery");
  assert(playbooksIndex.playbooks.some((playbook) => playbook.key === "component-implementation" && playbook.path === "../../operations/engineering/playbooks/component-implementation.playbook.md"), "Playbooks index should list component-implementation");

  for (const content of [codeStandards, implementationRules, componentGuidelines, dataGuidelines, testingStrategy, reviewCriteria]) {
    for (const section of ["## Propósito", "## Estado Atual", "## Decisões", "## Perguntas em Aberto", "## Próxima Atualização"]) {
      assert(content.includes(section), `Engineering knowledge should include ${section}`);
    }
  }

  assert(componentGuidelines.includes("## Design Dependency"), "Component guidelines should define Design dependency");
  assert(componentGuidelines.includes("Read the approved Design component spec before implementing a new user-facing component"), "Component guidelines should require Design spec before component implementation");
  assert(componentGuidelines.includes("../../design/knowledge/component-inventory.md"), "Component guidelines should point to component inventory");
  assert(componentGuidelines.includes("Implement reusable component behavior before the screen or Feature that consumes it"), "Component guidelines should implement component before dependent Feature");
  assert(componentGuidelines.includes("Não crie um novo componente voltado ao usuário sem uma especificação de Design"), "Component guidelines should block component work without Design spec");
  assert(componentGuidelines.includes("## Não Faça"), "Component guidelines should include Do Not Do");
  assert(dataGuidelines.includes("## Migrations"), "Data guidelines should include migrations");
  assert(dataGuidelines.includes("## Rollback"), "Data guidelines should include rollback");
  assert(testingStrategy.includes("## Test Gaps"), "Testing strategy should include test gaps");
  assert(reviewCriteria.includes("## Merge Recommendation"), "Review criteria should include merge recommendation");
  assert(seniorDeveloper.includes("../knowledge/code-standards.md"), "Senior Developer should read code standards");
  assert(seniorDeveloper.includes("../knowledge/component-guidelines.md"), "Senior Developer should read component guidelines");
  assert(seniorDeveloper.includes("../playbooks/engineering-delivery.playbook.md"), "Senior Developer should use engineering delivery playbook");
  assert(seniorDeveloper.includes("../skills/implement-component/SKILL.md"), "Senior Developer should use implement-component skill");
  assert(seniorDeveloper.includes("../playbooks/component-implementation.playbook.md"), "Senior Developer should use component implementation playbook");
  assert(testEngineer.includes("../knowledge/testing-strategy.md"), "Test Engineer should read testing strategy");
  assert(prReviewer.includes("../knowledge/review-criteria.md"), "PR Reviewer should read review criteria");

  for (const skillContent of [planImplementation, followCodeStandards, implementComponent, reviewDataChange]) {
    assert(skillContent.includes("---\nname:"), "Engineering skill should include YAML frontmatter");
    assert(skillContent.includes("description: Use quando"), "Engineering skill should include trigger-only description");
    assert(skillContent.includes("### Etapa 1"), "Engineering skill should use Step headings inside Process");

    for (const heading of ["## Visão Geral", "## Use Quando", "## Contexto Obrigatório", "## Entradas", "## Processo", "## Verificações", "## Saída"]) {
      assert(skillContent.includes(heading), `Engineering skill should include ${heading}`);
    }
  }

  assert(planImplementation.includes("Não comece mudanças de código sem contexto de branch"), "Plan implementation should block code without branch context");
  assert(followCodeStandards.includes("No large unstructured component or file"), "Code standards skill should enforce modularity");
  assert(implementComponent.includes("Design component spec"), "Implement component skill should require Design component spec");
  assert(implementComponent.includes("../../design/knowledge/component-inventory.md"), "Implement component skill should read Design component inventory");
  assert(implementComponent.includes("../knowledge/component-guidelines.md"), "Implement component skill should read Engineering component guidelines");
  assert(implementComponent.includes("Não implemente um novo componente voltado ao usuário sem uma especificação de Design"), "Implement component skill should block component work without Design spec");
  assert(engineeringDelivery.includes("Orchestrate the internal Engineering path"), "Engineering delivery playbook should define the master Engineering path");
  assert(engineeringDelivery.includes("playbooks/branch-for-feature.playbook.md"), "Engineering delivery playbook should start with branch playbook");
  assert(engineeringDelivery.includes("skills/plan-implementation/SKILL.md"), "Engineering delivery playbook should require implementation planning");
  assert(engineeringDelivery.includes("playbooks/component-implementation.playbook.md"), "Engineering delivery playbook should include component implementation when needed");
  assert(engineeringDelivery.includes("skills/follow-code-standards/SKILL.md"), "Engineering delivery playbook should use code standards skill");
  assert(engineeringDelivery.includes("skills/review-data-change/SKILL.md"), "Engineering delivery playbook should use data review when applicable");
  assert(engineeringDelivery.includes("skills/write-tests/SKILL.md"), "Engineering delivery playbook should require tests or test-gap explanation");
  assert(engineeringDelivery.includes("playbooks/prepare-pr.playbook.md"), "Engineering delivery playbook should prepare PR through prepare-pr");
  assert(engineeringDelivery.includes("playbooks/pr-validation.playbook.md"), "Engineering delivery playbook should end with PR validation");
  assert(engineeringDelivery.includes("Founder Testing Guide"), "Engineering delivery should require Founder Testing Guide before founder review");
  assert(engineeringDelivery.includes("## Gates"), "Engineering delivery playbook should declare explicit gates");
  assert(engineeringDelivery.includes("Não edite código antes de uma branch vinculada à Feature"), "Engineering delivery should gate code behind branch creation");
  assert(engineeringDelivery.includes("Não implemente um novo componente voltado ao usuário sem uma especificação de componente aprovada por Design"), "Engineering delivery should gate new components behind Design spec");
  assert(engineeringDelivery.includes("Não abra nem prepare um PR sem testes"), "Engineering delivery should gate PR behind tests or validation notes");
  assert(engineeringDelivery.includes("Não recomende merge antes de `playbooks/pr-validation.playbook.md` estar completo"), "Engineering delivery should gate merge recommendation behind PR validation");
  assert(engineeringDelivery.includes("Stop Conditions"), "Engineering delivery playbook should include stop conditions");
  assert(componentImplementation.includes("Approved Design component spec"), "Component implementation playbook should require approved Design spec");
  assert(branchPlaybook.includes("branch step of `engineering-delivery.playbook.md`"), "Branch playbook should identify itself as engineering-delivery branch step");
  assert(componentImplementation.includes("../../design/knowledge/component-inventory.md"), "Component implementation playbook should read component inventory");
  assert(componentImplementation.includes("component step of `engineering-delivery.playbook.md`"), "Component implementation playbook should identify itself as engineering-delivery component step");
  assert(componentImplementation.includes("Implement the reusable component before the screen or Feature"), "Component implementation playbook should implement component before dependent Feature");
  assert(componentImplementation.includes("skills/implement-component/SKILL.md"), "Component implementation playbook should use implement-component skill");
  assert(reviewDataChange.includes("No destructive change without confirmation"), "Data review skill should block destructive changes");
  assert(preparePr.includes("skills/follow-code-standards/SKILL.md"), "Prepare PR playbook should use code standards skill");
  assert(preparePr.includes("PR preparation step of `engineering-delivery.playbook.md`"), "Prepare PR playbook should identify itself as engineering-delivery PR preparation step");
  assert(preparePr.includes("playbooks/component-implementation.playbook.md"), "Prepare PR playbook should run component implementation when needed");
  assert(preparePr.includes("skills/review-data-change/SKILL.md"), "Prepare PR playbook should use data review when applicable");
  assert(preparePr.includes("Founder Testing Guide"), "Prepare PR playbook should prepare Founder Testing Guide");
  assert(preparePr.includes("where to test"), "Prepare PR playbook should tell the founder where to test");
  assert(prValidation.includes("knowledge/review-criteria.md"), "PR validation should load review criteria");
  assert(prValidation.includes("final validation step of `engineering-delivery.playbook.md`"), "PR validation playbook should identify itself as engineering-delivery final validation step");
  assert(prValidation.includes("Founder Testing Guide"), "PR validation should validate Founder Testing Guide");
  assert(prValidation.includes("non-technical founder can test"), "PR validation should require founder-testable instructions");
  assert(prValidation.includes("Security/Data review result or not applicable"), "PR validation should classify Security/Data result");
  assert.equal(await exists(join(rootDir, ".leanos", "commands", "workon-feature.md")), false, "Workon feature command should not be generated");
  assert(engineeringAgent.includes("Senior Developer: `roles/senior-developer.role.md`"), "Engineering AGENT should own feature work routing");
  assert(seniorDeveloper.includes("../knowledge/code-standards.md"), "Senior Developer should load code standards");
}

export async function assertDevOpsAreaPattern(rootDir) {
  const devopsReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "README.md"), "utf8");
  const devopsAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "area.yaml"), "utf8"));
  const githubManagement = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "github-management.md"), "utf8");
  const environments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "environments.md"), "utf8");
  const deploymentReadiness = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "deployment-readiness.md"), "utf8");
  const ciCd = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "ci-cd.md"), "utf8");
  const observability = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "observability.md"), "utf8");
  const releaseNotes = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "release-notes.md"), "utf8");
  const devopsEngineer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "roles", "devops-engineer.role.md"), "utf8");
  const githubDevops = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "roles", "github-devops.role.md"), "utf8");
  const releaseManager = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "roles", "release-manager.role.md"), "utf8");
  const configureGithubProject = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "configure-github-project/SKILL.md"), "utf8");
  const configureEnvironments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "configure-environments/SKILL.md"), "utf8");
  const setupCi = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "setup-ci/SKILL.md"), "utf8");
  const planDeployment = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "plan-deployment/SKILL.md"), "utf8");
  const defineObservability = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "define-observability/SKILL.md"), "utf8");
  const prepareRelease = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "prepare-release/SKILL.md"), "utf8");
  const githubProjectPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "configure-github-project.playbook.md"), "utf8");
  const setupCiCdPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "setup-ci-cd.playbook.md"), "utf8");
  const planDeploymentPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "plan-deployment.playbook.md"), "utf8");
  const releaseOperationsPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "playbooks", "release-operations.playbook.md"), "utf8");

  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "AGENT.md"));
  await assertExists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "README.md"));
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "github-management.md")), false, "DevOps GitHub management should live in knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "environments.md")), false, "DevOps environments should live in knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "deployment-readiness.md")), false, "DevOps deployment readiness should live in knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "ci-cd.md")), false, "DevOps CI/CD should live in knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "observability.md")), false, "DevOps observability should live in knowledge/");
  assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "release-notes.md")), false, "DevOps release notes should live in knowledge/");

  assert(devopsReadme.includes("comece em `AGENT.md`"), "DevOps README should route operational work through AGENT.md");
  assert(devopsReadme.includes("Não armazene tokens, segredos ou credenciais em arquivos do workspace"), "DevOps README should include token storage red line");
  assert(devopsAgent.includes("Você é DevOps Lead"), "DevOps AGENT should define DevOps Lead");
  assert(devopsAgent.includes("GitHub DevOps: `roles/github-devops.role.md`"), "DevOps AGENT should route GitHub DevOps work");
  assert(devopsAgent.includes("DevOps Engineer: `roles/devops-engineer.role.md`"), "DevOps AGENT should route DevOps Engineer work");
  assert(devopsAgent.includes("Release Manager: `roles/release-manager.role.md`"), "DevOps AGENT should route Release Manager work");
  assert(devopsAgent.includes("Não armazene tokens, segredos ou credenciais em arquivos do workspace"), "DevOps AGENT should protect secrets");
  assert(devopsAgent.includes("Não crie `.vercel/`, rode `vercel link` ou faça deploy automaticamente"), "DevOps AGENT should block automatic Vercel actions");
  assert.equal(areaYaml.area.agent, "AGENT.md", "DevOps area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/github-management.md"), "DevOps area.yaml should list GitHub management knowledge");
  assert(areaYaml.area.source_of_truth.includes("knowledge/deployment-readiness.md"), "DevOps area.yaml should list deployment readiness knowledge");
  assert(areaYaml.area.roles.includes("release-manager"), "DevOps area.yaml should list release-manager");
  assert(areaYaml.area.skills.includes("prepare-release"), "DevOps area.yaml should list prepare-release");

  for (const content of [environments, deploymentReadiness, ciCd, observability, releaseNotes]) {
    for (const section of ["## Propósito", "## Estado Atual", "## Decisões", "## Perguntas em Aberto", "## Próxima Atualização"]) {
      assert(content.includes(section), `DevOps knowledge should include ${section}`);
    }
  }

  for (const section of ["## Propósito", "## Setup Status", "## Repository", "## GitHub Project", "## Project Fields", "## Token Source", "## Readiness Checklist", "## Dry Run", "## Decisões", "## Perguntas em Aberto", "## Próxima Atualização"]) {
    assert(githubManagement.includes(section), `GitHub management knowledge should include ${section}`);
  }
  assert(githubManagement.includes("## Token Source"), "GitHub management knowledge should define token source");
  assert(githubManagement.includes("## Dry Run"), "GitHub management knowledge should define dry-run readiness");
  assert(githubManagement.includes("Never store token values in this file"), "GitHub management knowledge should protect token values");
  assert(githubManagement.includes("Owner and repository are known"), "GitHub management knowledge should include readiness checklist");
  assert(githubManagement.includes("Capability contract reviewed"), "GitHub management knowledge should track capability contract review");
  assert(environments.includes("## Preview / Staging"), "Environments knowledge should separate preview/staging");
  assert(environments.includes("## Secrets"), "Environments knowledge should include secret handling");
  assert(deploymentReadiness.includes("## Vercel Readiness"), "Deployment readiness should include Vercel readiness");
  assert(deploymentReadiness.includes("## Framework Detection"), "Deployment readiness should include framework detection");
  assert(deploymentReadiness.includes("## Rollback"), "Deployment readiness should include rollback");
  assert(ciCd.includes("## Verificações Obrigatórias"), "CI/CD knowledge should include required checks");
  assert(ciCd.includes("## Failure Handling"), "CI/CD knowledge should include failure handling");
  assert(observability.includes("## Logs"), "Observability knowledge should include logs");
  assert(observability.includes("## Errors"), "Observability knowledge should include errors");
  assert(observability.includes("## Metrics"), "Observability knowledge should include metrics");
  assert(observability.includes("## Post-Deploy Checks"), "Observability knowledge should include post-deploy checks");
  assert(releaseNotes.includes("## Linked Issues"), "Release notes should include linked issues");
  assert(releaseNotes.includes("## Rollback"), "Release notes should include rollback");

  assert(devopsEngineer.includes("../knowledge/environments.md"), "DevOps Engineer should load environments knowledge");
  assert(devopsEngineer.includes("../knowledge/deployment-readiness.md"), "DevOps Engineer should load deployment readiness knowledge");
  assert(githubDevops.includes("../knowledge/github-management.md"), "GitHub DevOps should load GitHub management knowledge");
  assert(githubDevops.includes("../../../.github/leanos/capability-contract.md"), "GitHub DevOps should load capability contract");
  assert(releaseManager.includes("../knowledge/release-notes.md"), "Release Manager should load release notes knowledge");

  for (const skillContent of [configureGithubProject, configureEnvironments, setupCi, planDeployment, defineObservability, prepareRelease]) {
    assert(skillContent.includes("---\nname:"), "DevOps skill should include YAML frontmatter");
    assert(skillContent.includes("description: Use quando"), "DevOps skill should include trigger-only description");
    assert(skillContent.includes("### Etapa 1"), "DevOps skill should use Step headings inside Process");

    for (const heading of ["## Visão Geral", "## Use Quando", "## Contexto Obrigatório", "## Entradas", "## Processo", "## Verificações", "## Saída"]) {
      assert(skillContent.includes(heading), `DevOps skill should include ${heading}`);
    }
  }

  assert(configureGithubProject.includes("No token stored in workspace"), "Configure GitHub Project should protect tokens");
  assert(configureGithubProject.includes("Founder never pastes token into chat"), "Configure GitHub Project should prevent token paste in chat");
  assert(configureGithubProject.includes("Dry-run readiness"), "Configure GitHub Project should output dry-run readiness");
  assert(configureEnvironments.includes("Secrets are not written into markdown"), "Configure Environments should protect secrets");
  assert(setupCi.includes("CI does not deploy automatically by default"), "Setup CI should avoid automatic deploy");
  assert(planDeployment.includes("No `.vercel/` creation"), "Plan Deployment should block Vercel metadata creation");
  assert(defineObservability.includes("Post-deploy checks"), "Define Observability should include post-deploy checks");
  assert(prepareRelease.includes("Rollback is explicit"), "Prepare Release should include rollback checks");
  assert(githubProjectPlaybook.includes("Read DevOps AGENT and choose GitHub DevOps"), "GitHub project playbook should start at DevOps AGENT");
  assert(githubProjectPlaybook.includes("../../../.github/leanos/setup-guide.md"), "GitHub project playbook should load setup guide");
  assert(githubProjectPlaybook.includes("../../../.github/leanos/capability-contract.md"), "GitHub project playbook should load capability contract");
  assert(githubProjectPlaybook.includes("where the founder can find owner/repository and Project URL/number"), "GitHub project playbook should guide founders to find GitHub details");
  assert(githubProjectPlaybook.includes("End with whether GitHub Epics/Features sync is ready for dry-run"), "GitHub project playbook should bridge back to Epics/Features sync");
  assert(githubProjectPlaybook.includes("knowledge/github-management.md"), "GitHub project playbook should update GitHub knowledge");
  assert(setupCiCdPlaybook.includes("skills/setup-ci/SKILL.md"), "Setup CI/CD playbook should use setup-ci skill");
  assert(planDeploymentPlaybook.includes("do not create `.vercel/`, run `vercel link` or deploy automatically"), "Plan deployment playbook should preserve Vercel safety");
  assert(releaseOperationsPlaybook.includes("skills/prepare-release/SKILL.md"), "Release operations should use prepare-release skill");
  assert(releaseOperationsPlaybook.includes("knowledge/release-notes.md"), "Release operations should update release notes");
}

export async function assertSecurityAreaPattern(rootDir) {
  const securityReadme = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "README.md"), "utf8");
  const securityAgent = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "AGENT.md"), "utf8");
  const areaYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "area.yaml"), "utf8"));
  const baseline = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "security-baseline.md"), "utf8");
  const threatModel = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "threat-model.md"), "utf8");
  const accessControl = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "access-control.md"), "utf8");
  const dataProtection = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "data-protection.md"), "utf8");
  const databaseSecurity = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "database-security.md"), "utf8");
  const secretsManagement = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "secrets-management.md"), "utf8");
  const infraHardening = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "infra-hardening.md"), "utf8");
  const secureCoding = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "secure-coding.md"), "utf8");
  const aiAppSecurity = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "ai-app-security.md"), "utf8");
  const incidentResponse = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "incident-response.md"), "utf8");
  const securityAutomation = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "security-automation.md"), "utf8");
  const securityReviewer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "security-reviewer.role.md"), "utf8");
  const appSecEngineer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "application-security-engineer.role.md"), "utf8");
  const aiSecurityEngineer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "ai-security-engineer.role.md"), "utf8");
  const cloudSecurityReviewer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "cloud-security-reviewer.role.md"), "utf8");
  const dataProtectionReviewer = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "roles", "data-protection-reviewer.role.md"), "utf8");
  const aiGeneratedCodeSecurity = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "ai-generated-code-security/SKILL.md"), "utf8");
  const aiRuntimeSecurity = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "ai-runtime-security-review/SKILL.md"), "utf8");
  const securityAutomationReadiness = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "security-automation-readiness/SKILL.md"), "utf8");
  const apiSecurityReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "api-security-review/SKILL.md"), "utf8");
  const databaseSecurityReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "skills", "database-security-review/SKILL.md"), "utf8");
  const preDeployReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "playbooks", "pre-deploy-security-review.playbook.md"), "utf8");
  const aiAppSecurityReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "playbooks", "ai-app-security-review.playbook.md"), "utf8");
  const aiGeneratedReview = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "playbooks", "ai-generated-code-security-review.playbook.md"), "utf8");
  const securityAutomationPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "playbooks", "security-automation-readiness.playbook.md"), "utf8");
  const githubSecurityAutomation = await readFile(join(rootDir, ".github", "leanos", "security-automation.md"), "utf8");
  const epicToFeaturesPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "playbooks", "epic-to-features.playbook.md"), "utf8");

  for (const oldPath of ["threat-model.md", "access-control.md", "data-protection.md"]) {
    assert.equal(await exists(join(rootDir, "clinic-assistant-ai-os", "operations", "security", oldPath)), false, `Security ${oldPath} should live in knowledge/`);
  }

  assert(securityReadme.includes("comece em `AGENT.md`"), "Security README should route operational work through AGENT.md");
  assert(securityReadme.includes("No public production database"), "Security README should include baseline red lines");
  assert(securityReadme.includes("quality gate"), "Security README should explain quality gate role");
  assert(securityAgent.includes("Você é Security Lead"), "Security AGENT should define Security Lead");
  assert(securityAgent.includes("Application Security Engineer: `roles/application-security-engineer.role.md`"), "Security AGENT should route AppSec work");
  assert(securityAgent.includes("AI Security Engineer: `roles/ai-security-engineer.role.md`"), "Security AGENT should route AI Security work");
  assert(securityAgent.includes("Cloud Security Reviewer: `roles/cloud-security-reviewer.role.md`"), "Security AGENT should route cloud security work");
  assert(securityAgent.includes("Data Protection Reviewer: `roles/data-protection-reviewer.role.md`"), "Security AGENT should route data protection work");
  assert(securityAgent.includes("No public production database"), "Security AGENT should include public database red line");
  assert(securityAgent.includes("AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review"), "Security AGENT should include AI agent red line");
  assert.equal(areaYaml.area.agent, "AGENT.md", "Security area.yaml should declare AGENT.md");
  assert(areaYaml.area.source_of_truth.includes("knowledge/security-baseline.md"), "Security area.yaml should list security baseline");
  assert(areaYaml.area.source_of_truth.includes("knowledge/security-automation.md"), "Security area.yaml should list security automation readiness");
  assert(areaYaml.area.source_of_truth.includes("knowledge/ai-app-security.md"), "Security area.yaml should list AI app security knowledge");
  assert(areaYaml.area.source_of_truth.includes("knowledge/database-security.md"), "Security area.yaml should list database security");
  assert(areaYaml.area.roles.includes("application-security-engineer"), "Security area.yaml should list AppSec role");
  assert(areaYaml.area.roles.includes("ai-security-engineer"), "Security area.yaml should list AI Security Engineer role");
  assert(areaYaml.area.skills.includes("ai-generated-code-security"), "Security area.yaml should list AI generated code security skill");
  assert(areaYaml.area.skills.includes("ai-runtime-security-review"), "Security area.yaml should list AI runtime security skill");
  assert(areaYaml.area.skills.includes("security-automation-readiness"), "Security area.yaml should list security automation readiness skill");
  assert(areaYaml.area.playbooks.includes("pre-deploy-security-review"), "Security area.yaml should list pre-deploy security review");
  assert(areaYaml.area.playbooks.includes("ai-app-security-review"), "Security area.yaml should list AI app security review playbook");
  assert(areaYaml.area.playbooks.includes("security-automation-readiness"), "Security area.yaml should list security automation readiness playbook");

  for (const content of [baseline, threatModel, accessControl, dataProtection, databaseSecurity, secretsManagement, infraHardening, secureCoding, aiAppSecurity, incidentResponse, securityAutomation]) {
    for (const section of ["## Propósito", "## O Que Documentar", "## Verificações Obrigatórias", "## Linhas Vermelhas", "## Related Playbooks"]) {
      assert(content.includes(section), `Security knowledge should include ${section}`);
    }
  }

  for (const redLine of [
    "No public production database.",
    "No secrets in Git, logs, prompts, screenshots or tracked files.",
    "No private endpoint without server-side authentication and authorization.",
    "Every user-owned or tenant-owned object access must validate ownership server-side.",
    "Never trust userId, tenantId, role or isAdmin from the client.",
    "Never build SQL with string concatenation.",
    "Sensitive data must not appear in logs, analytics, errors or events.",
    "Admin access requires RBAC, MFA when available and audit trail.",
    "Production, staging and development must use separate databases, secrets and permissions.",
    "Production deploy requires backup, rollback path and security review.",
    "AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review.",
    "LLM input/output must be treated as untrusted product surface.",
    "Tool permissions must be least-privilege and explicit.",
    "RAG/vector DB retrieval must preserve customer data boundaries.",
    "Prompt injection must be reviewed before agent or AI feature launch.",
    "Cost/rate abuse must have limits or accepted risk owner."
  ]) {
    assert(baseline.includes(redLine), `Security baseline should include red line: ${redLine}`);
  }

  assert(baseline.includes("OWASP Top 10"), "Security baseline should reference OWASP Top 10");
  assert(baseline.includes("OWASP Top 10 for Large Language Model Applications"), "Security baseline should reference OWASP LLM Top 10");
  assert(baseline.includes("OWASP API Security Top 10"), "Security baseline should reference OWASP API Security Top 10");
  assert(baseline.includes("NIST SSDF"), "Security baseline should reference NIST SSDF");
  assert(databaseSecurity.includes("OWASP Database Security Cheat Sheet"), "Database security should reference OWASP Database Security Cheat Sheet");
  assert(secureCoding.includes("OWASP Secure Coding with AI"), "Secure coding should reference OWASP Secure Coding with AI");
  assert(securityAutomation.includes("Secret scanning"), "Security automation knowledge should mention secret scanning");
  assert(securityAutomation.toLowerCase().includes("dependency audit"), "Security automation knowledge should mention dependency audit");
  assert(securityAutomation.includes("SAST/code scanning"), "Security automation knowledge should mention SAST/code scanning");
  assert(securityAutomation.includes("IaC/config scanning"), "Security automation knowledge should mention IaC/config scanning");
  assert(securityAutomation.includes("Não crie workflows de scanner até stack, package manager e comandos estáveis serem conhecidos"), "Security automation knowledge should avoid fragile early workflows");

  for (const roleContent of [securityReviewer, appSecEngineer, aiSecurityEngineer, cloudSecurityReviewer, dataProtectionReviewer]) {
    for (const section of ["## Propósito", "## Use Quando", "## Fonte da Verdade", "## Skills Obrigatórias", "## Playbooks Relevantes", "## Saída", "## Linhas Vermelhas"]) {
      assert(roleContent.includes(section), `Security role should include ${section}`);
    }
  }

  for (const skillContent of [aiGeneratedCodeSecurity, aiRuntimeSecurity, apiSecurityReview, databaseSecurityReview, securityAutomationReadiness]) {
    assert(skillContent.includes("---\nname:"), "Security skill should include YAML frontmatter");
    assert(skillContent.includes("description: Use quando"), "Security skill should include trigger-only description");
    assert(skillContent.includes("### Etapa 1"), "Security skill should use Step headings inside Process");

    for (const section of ["## Visão Geral", "## Use Quando", "## Contexto Obrigatório", "## Processo", "## Verificações", "## Saída", "## Arquivos para Atualizar", "## Linhas Vermelhas"]) {
      assert(skillContent.includes(section), `Security skill should include ${section}`);
    }
  }

  for (const aiRisk of [
    "hallucinated dependencies",
    "outdated dependencies with CVEs",
    "prompt injection via issues, PRs, docs or logs",
    "unsafe shell commands",
    "out-of-scope file edits",
    "test deletion or fabricated tests",
    "secrets/context leakage",
    "auth, secrets, CI/CD, infra or dependencies without human review",
    "broad MCP/tool permissions"
  ]) {
    assert(aiGeneratedCodeSecurity.includes(aiRisk), `AI generated code security skill should cover ${aiRisk}`);
  }

  for (const aiAppRisk of [
    "LLM input/output",
    "tool permissions",
    "RAG/vector DB",
    "customer data boundary",
    "prompt injection",
    "cost/rate abuse"
  ]) {
    assert(aiRuntimeSecurity.includes(aiAppRisk), `AI runtime security skill should cover ${aiAppRisk}`);
    assert(aiAppSecurity.includes(aiAppRisk), `AI app security knowledge should cover ${aiAppRisk}`);
    assert(aiAppSecurityReview.includes(aiAppRisk), `AI app security review playbook should cover ${aiAppRisk}`);
  }

  for (const section of ["## Propósito", "## Use Quando", "## Antes de Agir", "## Etapas", "## Gate de Segurança", "## Saída", "## Arquivos para Atualizar", "## Stop Conditions"]) {
    assert(preDeployReview.includes(section), `Pre-deploy security review should include ${section}`);
    assert(aiAppSecurityReview.includes(section), `AI app security review playbook should include ${section}`);
    assert(aiGeneratedReview.includes(section), `AI generated code review playbook should include ${section}`);
    assert(securityAutomationPlaybook.includes(section), `Security automation readiness playbook should include ${section}`);
  }

  for (const blocker of [
    "public database",
    "missing authorization",
    "secrets in code",
    "client-side token exposure",
    "unsafe query",
    "open CORS without justification",
    "no rate limit on login or sensitive APIs",
    "sensitive data in logs",
    "no backup or rollback path",
    "critical vulnerable dependency",
    "over-permissive service account",
    "missing tenant isolation"
  ]) {
    assert(preDeployReview.includes(blocker), `Pre-deploy security review should block ${blocker}`);
  }

  assert(epicToFeaturesPlaybook.includes("Add Security criteria only when"), "Epic-to-features playbook should route Security criteria conditionally");
  assert.equal(epicToFeaturesPlaybook.includes("../../operations/security/README.md` only when"), false, "Epic-to-features playbook should not route Security directly to README");
  assert(securityAutomationReadiness.includes("Secret scanning status is explicit"), "Security automation skill should check secret scanning status");
  assert(securityAutomationReadiness.includes("Dependency audit status is explicit"), "Security automation skill should check dependency audit status");
  assert(securityAutomationReadiness.includes("No scanner workflow is created without stable commands"), "Security automation skill should avoid fragile scanner workflows");
  assert(securityAutomationPlaybook.includes("Production deploy requires explicit security automation status"), "Security automation playbook should gate production readiness");
  assert(securityAutomationPlaybook.includes("Block creating scanner workflows when stack, package manager or commands are unknown"), "Security automation playbook should block premature scanner workflows");
  assert(preDeployReview.includes("security automation readiness status"), "Pre-deploy review should include security automation readiness");
  assert(githubSecurityAutomation.includes("This file is guidance-only in the initial scaffold"), "GitHub security automation doc should be guidance-only");
  assert(githubSecurityAutomation.includes("Secret scanning"), "GitHub security automation doc should mention secret scanning");
  assert(githubSecurityAutomation.includes("Dependency audit"), "GitHub security automation doc should mention dependency audit");
  assert(githubSecurityAutomation.includes("Não crie workflows bloqueantes de CI antes de o projeto ter comandos confiáveis de build/test"), "GitHub security automation doc should avoid fragile blocking workflows");
}

export async function assertOperationalPlaybookSections(rootDir) {
  const playbooks = [
    "strategy/roadmap/playbooks/roadmap-cycle-planning.playbook.md",
    "strategy/roadmap/playbooks/roadmap-sync-prep.playbook.md",
    "operations/product-ops/playbooks/mvp-backlog-planning.playbook.md",
    "operations/product-ops/playbooks/delivery-item-to-epic.playbook.md",
    "operations/product-ops/playbooks/epic-to-features.playbook.md",
    "operations/product-ops/playbooks/delivery-readiness.playbook.md",
    "operations/design/playbooks/design-foundation.playbook.md",
    "operations/engineering/playbooks/test-planning.playbook.md",
    "operations/devops/playbooks/setup-ci-cd.playbook.md",
    "operations/devops/playbooks/plan-deployment.playbook.md",
    "operations/devops/playbooks/configure-github-project.playbook.md",
    "operations/devops/playbooks/configure-environments.playbook.md",
    "operations/devops/playbooks/define-observability.playbook.md",
    "operations/devops/playbooks/release-operations.playbook.md",
    "operations/security/playbooks/security-foundation.playbook.md",
    "operations/security/playbooks/pre-mvp-security-checklist.playbook.md",
    "operations/security/playbooks/pre-deploy-security-review.playbook.md",
    "operations/security/playbooks/ai-app-security-review.playbook.md",
    "operations/security/playbooks/api-security-review.playbook.md",
    "operations/security/playbooks/database-security-review.playbook.md",
    "operations/security/playbooks/secrets-rotation.playbook.md",
    "operations/security/playbooks/vulnerability-response.playbook.md",
    "operations/security/playbooks/incident-response.playbook.md",
    "operations/security/playbooks/ai-generated-code-security-review.playbook.md",
    "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
    "growth/marketing/playbooks/mvp-launch.playbook.md",
    "growth/marketing/playbooks/growth-experiment.playbook.md",
    "growth/finance/playbooks/finance-review.playbook.md",
    "growth/finance/playbooks/spend-approval.playbook.md",
    "growth/finance/playbooks/monthly-finance-check.playbook.md"
  ];
  const requiredSections = ["## Propósito", "## Entradas", "## Saída", "## Arquivos para Atualizar", "## Navegação"];

  for (const playbook of playbooks) {
    const content = await readFile(join(rootDir, playbook), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${playbook} should include ${section}`);
    }

    assert(content.includes("## Processo") || content.includes("## Etapas"), `${playbook} should include ## Processo or ## Etapas`);
  }
}

export async function assertSourceScaffoldSections(rootDir) {
  const scaffoldFiles = [
    "strategy/business/knowledge/profile.md",
    "strategy/business/knowledge/decision-log.md",
    "strategy/product/knowledge/brief.md",
    "strategy/business/knowledge/mission.md",
    "strategy/product/knowledge/icp.md",
    "strategy/product/knowledge/validation-notes.md",
    "strategy/product/knowledge/mvp-validation-scope.md",
    "strategy/roadmap/knowledge/roadmap.md",
    "strategy/validation/assumptions.md",
    "strategy/validation/learning-log.md",
    "operations/product-ops/knowledge/overview.md",
    "operations/product-ops/knowledge/issue-readiness.md",
    "operations/product-ops/knowledge/technical-decisions.md",
    "operations/product-ops/mvp/backlog.md",
    "operations/product-ops/mvp/scope.md",
    "operations/product-ops/mvp/prd.md",
    "operations/product-ops/mvp/release-checklist.md",
    "operations/engineering/knowledge/code-standards.md",
    "operations/engineering/knowledge/implementation-rules.md",
    "operations/engineering/knowledge/component-guidelines.md",
    "operations/engineering/knowledge/data-guidelines.md",
    "operations/engineering/knowledge/testing-strategy.md",
    "operations/engineering/knowledge/review-criteria.md",
    "operations/devops/knowledge/github-management.md",
    "operations/devops/knowledge/environments.md",
    "operations/devops/knowledge/deployment-readiness.md",
    "operations/devops/knowledge/ci-cd.md",
    "operations/devops/knowledge/observability.md",
    "operations/devops/knowledge/release-notes.md",
    "growth/customer-experience/knowledge/customer-feedback.md",
    "growth/customer-experience/knowledge/support-notes.md",
    "growth/customer-experience/knowledge/success-moments.md",
    "growth/customer-experience/knowledge/churn-reasons.md",
    "growth/marketing/knowledge/positioning.md",
    "growth/marketing/knowledge/landing-page.md",
    "growth/marketing/knowledge/acquisition-channels.md",
    "growth/marketing/knowledge/launch-plan.md",
    "growth/marketing/knowledge/growth-experiments.md",
    "growth/finance/knowledge/pricing.md",
    "growth/finance/knowledge/spend-ledger.md",
    "growth/finance/knowledge/revenue-model.md",
    "growth/finance/knowledge/unit-economics.md",
    "growth/finance/knowledge/budget.md",
    "growth/finance/knowledge/finance-risks.md"
  ];
  const requiredSections = ["## Propósito", "## Estado Atual", "## Decisões", "## Perguntas em Aberto", "## Próxima Atualização"];

  for (const scaffoldFile of scaffoldFiles) {
    const content = await readFile(join(rootDir, scaffoldFile), "utf8");

    for (const section of requiredSections) {
      assert(content.includes(section), `${scaffoldFile} should include ${section}`);
    }
  }
}

export async function assertProductOpsPrdSections(rootDir) {
  const prd = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "mvp", "prd.md"), "utf8");
  const requiredSections = [
    "## Product Outcome",
    "## Problem",
    "## Target User",
    "## Requirements",
    "## User Stories",
    "## Critérios de Aceite",
    "## Design Considerations",
    "## Security and Privacy Considerations",
    "## Non-Goals"
  ];

  for (const section of requiredSections) {
    assert(prd.includes(section), `Product Ops PRD should include ${section}`);
  }
}
