import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { operationsDepartment } from "../../dist/templates/workspace/definitions/departments/operations.js";
import { packageRoot } from "./fixtures.mjs";

const areaDefinitions = [
  ["strategy", "business"],
  ["strategy", "product"],
  ["strategy", "roadmap"],
  ["operations", "product-ops"],
  ["operations", "design"],
  ["operations", "engineering"],
  ["operations", "devops"],
  ["operations", "security"],
  ["growth", "customer-experience"],
  ["growth", "marketing"],
  ["growth", "finance"]
];

const areaModuleFiles = [
  "index.ts",
  "files.ts",
  "roles.ts",
  "skills.ts",
  "playbooks.ts",
  "common-paths.ts",
  join("knowledge", "index.ts")
];

export async function validateAreaDefinitionsAreModular() {
  const departmentsRoot = join(packageRoot, "src", "templates", "workspace", "definitions", "departments");

  await assertMissing(join(departmentsRoot, "areas"), "Legacy definitions/departments/areas directory should not exist");

  for (const [department, area] of areaDefinitions) {
    await assertAreaPackage(departmentsRoot, department, area);
  }

  assertFeatureDeliveryWorkflowDefinition();
  assertReadyForLaunchWorkflowDefinition();
  assertSecurityHardeningWorkflowDefinition();
  assertDeliveryItemToEpicPlaybookDefinition();
  assertEpicToFeaturesPlaybookDefinition();
  assertProductOpsSkillContracts();
  assertEngineeringSkillContracts();
  assertEngineeringKnowledgeContracts();
  assertDevopsSkillContracts();
  assertSecuritySkillContracts();
  assertDesignSkillContracts();
  assertAllSkillsHaveRedLines();
}

async function assertAreaPackage(departmentsRoot, department, area) {
  const areaDir = join(departmentsRoot, department, area);

  for (const fileName of areaModuleFiles) {
    await access(join(areaDir, fileName), constants.F_OK);
  }

  const indexLineCount = (await readFile(join(areaDir, "index.ts"), "utf8")).split(/\r?\n/).length;
  assert(indexLineCount <= 60, `Area definition index should stay as a small composition root: ${department}/${area}/index.ts`);
}

async function assertMissing(path, message) {
  try {
    await access(path, constants.F_OK);
  } catch {
    return;
  }

  assert.fail(message);
}

function assertReadyForLaunchWorkflowDefinition() {
  const workflow = operationsDepartment.workflows.find((item) => item.slug === "ready-for-launch");

  assert(workflow, "Operations should define ready-for-launch workflow");
  assert.deepEqual(
    workflow.requiredAreas,
    ["product-ops", "engineering", "devops"],
    "ready-for-launch should require Product Ops, Engineering and DevOps"
  );
  assert.equal(workflow.owner?.department, "operations", "ready-for-launch should be owned by Operations");
  assert.equal(workflow.owner?.primaryArea, "devops", "ready-for-launch should use DevOps as the primary release gate owner");
  assert(workflow.owner?.supportingAreas?.includes("product-ops"), "ready-for-launch should include Product Ops as a supporting area");
  assert(workflow.owner?.supportingAreas?.includes("engineering"), "ready-for-launch should include Engineering as a supporting area");

  const triggerText = (workflow.founderTriggers ?? []).join("\n");
  for (const expectedTrigger of ["pronto para lancar", "podemos lancar", "go-live", "abrir beta", "usuarios reais"]) {
    assert(
      triggerText.includes(expectedTrigger),
      `ready-for-launch should include founder trigger '${expectedTrigger}'`
    );
  }

  const phaseText = (workflow.phases ?? []).join("\n");
  for (const expectedPhase of [
    "Release candidate",
    "Product scope",
    "Engineering evidence",
    "DevOps readiness",
    "Conditional gates",
    "Launch decision",
    "Growth bridge"
  ]) {
    assert(
      phaseText.includes(expectedPhase),
      `ready-for-launch should include phase '${expectedPhase}'`
    );
  }

  const fullText = [
    workflow.purpose,
    ...(workflow.entryGate ?? []),
    ...(workflow.activeRequirements ?? []),
    ...(workflow.phases ?? []),
    ...(workflow.decisionOutputs ?? []),
    ...(workflow.steps ?? []),
    ...(workflow.stopConditions ?? []),
    ...(workflow.expectedOutput ?? []),
    workflow.continuationBridge?.immediate ?? "",
    workflow.continuationBridge?.nextRoute ?? "",
    ...(workflow.continuationBridge?.rules ?? [])
  ].join("\n");

  for (const expectedDecision of [
    "ready_to_launch",
    "ready_with_known_risks",
    "blocked_by_product",
    "blocked_by_engineering",
    "blocked_by_devops",
    "blocked_by_growth",
    "not_ready_to_learn"
  ]) {
    assert(
      fullText.includes(expectedDecision),
      `ready-for-launch should output decision status '${expectedDecision}'`
    );
  }

  assert(fullText.includes("activation_required"), "ready-for-launch should explain activation_required for missing launch areas");
  assert(fullText.includes("security_gate_passed"), "ready-for-launch should require explicit security_gate_passed when Security is applicable");
  assert(
    fullText.includes("blocked_by_security"),
    "ready-for-launch should block launch explicitly when Security applies but has not passed"
  );
  assert(fullText.includes("mvp-launch"), "ready-for-launch should bridge approved launch execution to Growth mvp-launch");
  assert(fullText.includes("launch-learning-loop"), "ready-for-launch should bridge launched evidence to launch-learning-loop");
  assert(fullText.includes("feature-to-delivery-cycle"), "ready-for-launch should send unfinished delivery back to feature-to-delivery-cycle");
  assert(
    (workflow.forbiddenUpdates ?? []).some((item) => /deploy|deployment|produção|producao/i.test(item)),
    "ready-for-launch should forbid automatic production deployment"
  );
}

function assertSecurityHardeningWorkflowDefinition() {
  const workflow = operationsDepartment.workflows.find((item) => item.slug === "security-hardening-cycle");

  assert(workflow, "Operations should define security-hardening-cycle workflow");
  assert.deepEqual(
    workflow.requiredAreas,
    ["security"],
    "security-hardening-cycle should require only Security so it can activate progressively"
  );
  assert.equal(workflow.owner?.department, "operations", "security-hardening-cycle should be owned by Operations");
  assert.equal(workflow.owner?.primaryArea, "security", "security-hardening-cycle should use Security as the primary owner");
  assert(workflow.owner?.supportingAreas?.includes("product-ops"), "security-hardening-cycle should include Product Ops as a supporting area");
  assert(workflow.owner?.supportingAreas?.includes("engineering"), "security-hardening-cycle should include Engineering as a supporting area");
  assert(workflow.owner?.supportingAreas?.includes("devops"), "security-hardening-cycle should include DevOps as a supporting area");

  const triggerText = (workflow.founderTriggers ?? []).join("\n");
  for (const expectedTrigger of ["audite seguranca", "tem vulnerabilidade", "dados de cliente", "LGPD", "vazou token", "proteger API"]) {
    assert(
      triggerText.includes(expectedTrigger),
      `security-hardening-cycle should include founder trigger '${expectedTrigger}'`
    );
  }

  const fullText = [
    workflow.purpose,
    ...(workflow.entryGate ?? []),
    ...(workflow.activeRequirements ?? []),
    ...(workflow.phases ?? []),
    ...(workflow.decisionOutputs ?? []),
    ...(workflow.steps ?? []),
    ...(workflow.stopConditions ?? []),
    ...(workflow.expectedOutput ?? []),
    workflow.continuationBridge?.immediate ?? "",
    workflow.continuationBridge?.nextRoute ?? "",
    ...(workflow.continuationBridge?.rules ?? [])
  ].join("\n");

  for (const expectedContent of [
    "ai-app-security-review",
    "ai-runtime-security-review",
    "LLM input/output",
    "tool permissions",
    "RAG/vector DB",
    "customer data boundary",
    "prompt injection",
    "cost/rate abuse",
    "activation_required: operations.security"
  ]) {
    assert(
      fullText.includes(expectedContent),
      `security-hardening-cycle should include ${expectedContent}`
    );
  }
}

function assertFeatureDeliveryWorkflowDefinition() {
  const workflow = operationsDepartment.workflows.find((item) => item.slug === "feature-to-delivery-cycle");

  assert(workflow, "Operations should define feature-to-delivery-cycle workflow");

  for (const expectedPhase of [
    "Intake",
    "Product Ops readiness",
    "Conditional area readiness",
    "Engineering delivery",
    "PR preparation",
    "PR validation",
    "Founder handoff"
  ]) {
    assert(
      workflow.phases?.some((phase) => phase.includes(expectedPhase)),
      `feature-to-delivery-cycle should include phase '${expectedPhase}'`
    );
  }

  const preparePrStep = workflow.steps.findIndex((step) => step.includes("prepare-pr"));
  const prValidationStep = workflow.steps.findIndex((step) => step.includes("pr-validation"));

  assert.notEqual(preparePrStep, -1, "feature-to-delivery-cycle should mention prepare-pr in steps");
  assert.notEqual(prValidationStep, -1, "feature-to-delivery-cycle should mention pr-validation in steps");
  assert(preparePrStep < prValidationStep, "feature-to-delivery-cycle should prepare PR before PR validation");

  assert(
    workflow.steps.some((step) => /workflow coordinates|workflow coordina/i.test(step) && step.includes("engineering-delivery")),
    "feature-to-delivery-cycle should state that the workflow coordinates while engineering-delivery executes implementation"
  );

  assert(
    [...workflow.steps, ...(workflow.stopConditions ?? []), ...(workflow.expectedOutput ?? [])].some((item) => item.includes("activation_required")),
    "feature-to-delivery-cycle should name activation_required for inactive required conditional areas"
  );

  const fullText = [...workflow.steps, ...(workflow.conditionalAreas ?? []).map((item) => item.when), ...(workflow.stopConditions ?? []), ...(workflow.expectedOutput ?? [])].join("\n");

  for (const expectedRisk of ["LLM input/output", "tool permissions", "RAG/vector DB", "customer data boundary", "prompt injection", "cost/rate abuse"]) {
    assert(
      fullText.includes(expectedRisk),
      `feature-to-delivery-cycle should treat AI-native risk as Security readiness: ${expectedRisk}`
    );
  }
}

function assertEpicToFeaturesPlaybookDefinition() {
  const productOpsArea = operationsDepartment.areas.find((area) => area.slug === "product-ops");

  assert(productOpsArea, "Operations should define Product Ops area");

  const playbook = productOpsArea.playbooks.find((item) => item.slug === "epic-to-features");

  assert(playbook, "Product Ops should define epic-to-features playbook");

  assert(
    playbook.filesToUpdate?.some((item) => item.includes("../epics/<epic-slug>/<feature-slug>.md")),
    "epic-to-features filesToUpdate should include local Feature file path"
  );

  assert(
    [...playbook.steps, ...(playbook.filesToUpdate ?? [])].some(
      (item) => /confirmation before creating local Feature files|confirmação antes de criar arquivos locais de Feature/i.test(item)
    ),
    "epic-to-features should require confirmation before creating local Feature files"
  );

  const guardText = [...playbook.steps, ...(playbook.filesToUpdate ?? []), ...(playbook.stopConditions ?? [])].join("\n");

  for (const forbiddenWork of ["GitHub issue", "branch", "code", "PR"]) {
    assert(
      forbidsWork(guardText, forbiddenWork),
      `epic-to-features should explicitly avoid creating ${forbiddenWork}`
    );
  }
}

function assertDeliveryItemToEpicPlaybookDefinition() {
  const productOpsArea = operationsDepartment.areas.find((area) => area.slug === "product-ops");

  assert(productOpsArea, "Operations should define Product Ops area");

  const playbook = productOpsArea.playbooks.find((item) => item.slug === "delivery-item-to-epic");

  assert(playbook, "Product Ops should define delivery-item-to-epic playbook");

  assert(
    playbook.filesToUpdate?.some((item) => item.includes("../epics/<epic-slug>/epic.md")),
    "delivery-item-to-epic filesToUpdate should include local Epic artifact path"
  );

  assert(
    playbook.outputs?.includes("Caminho do `epic.md` local"),
    "delivery-item-to-epic should output the local Epic artifact path"
  );

  assert(
    playbook.outputs?.includes("Status de confirmação do founder"),
    "delivery-item-to-epic should output founder confirmation status"
  );

  const guardText = [
    playbook.purpose,
    ...playbook.steps,
    ...(playbook.gates ?? []),
    ...(playbook.filesToUpdate ?? []),
    ...(playbook.stopConditions ?? [])
  ].join("\n");

  assert(
    /only.*local.*Epic|somente.*Epic local/i.test(guardText),
    "delivery-item-to-epic should state that it creates only a local Epic"
  );

  for (const forbiddenWork of ["Feature files", "GitHub issues", "branches", "source code", "PRs"]) {
    assert(
      forbidsWork(guardText, forbiddenWork),
      `delivery-item-to-epic should explicitly avoid creating ${forbiddenWork}`
    );
  }
}

function forbidsWork(text, forbiddenWork) {
  const aliases = {
    "Feature files": ["Feature files", "arquivos de Feature"],
    "GitHub issues": ["GitHub issues", "issues do GitHub"],
    "GitHub issue": ["GitHub issue", "issue do GitHub", "issues do GitHub"],
    branches: ["branches"],
    branch: ["branch"],
    "source code": ["source code", "código-fonte", "código"],
    code: ["code", "código"],
    PRs: ["PRs"],
    PR: ["PR"]
  }[forbiddenWork] ?? [forbiddenWork];

  return aliases.some((alias) =>
    new RegExp(`Do not create.*${alias}|no ${alias}|not create.*${alias}|Não crie.*${alias}|não crie.*${alias}`, "i").test(text)
  );
}

function assertProductOpsSkillContracts() {
  const productOpsArea = operationsDepartment.areas.find((area) => area.slug === "product-ops");

  assert(productOpsArea, "Operations should define Product Ops area");

  for (const skillSlug of ["write-acceptance-criteria", "check-delivery-coherence", "define-delivery-boundaries"]) {
    const skill = productOpsArea.skills.find((item) => item.slug === skillSlug);

    assert(skill, `Product Ops should define ${skillSlug} skill`);

    for (const field of ["useWhen", "requiredContext", "inputs", "process", "checks", "outputs", "filesToUpdate", "redLines"]) {
      assert(
        Array.isArray(skill[field]) && skill[field].length >= 3,
        `${skillSlug} should define a rich ${field} contract`
      );
    }
  }

  const acceptanceCriteria = productOpsArea.skills.find((item) => item.slug === "write-acceptance-criteria");
  const deliveryCoherence = productOpsArea.skills.find((item) => item.slug === "check-delivery-coherence");
  const deliveryBoundaries = productOpsArea.skills.find((item) => item.slug === "define-delivery-boundaries");

  assert(
    acceptanceCriteria.checks?.some((item) => /testable|testável|pass\/fail|passa\/falha/i.test(item)),
    "write-acceptance-criteria should require testable pass/fail criteria"
  );
  assert(
    acceptanceCriteria.redLines?.some(
      (item) => /implementation|implementação|code|código/i.test(item)
    ),
    "write-acceptance-criteria should block implementation details and code work"
  );

  assert(
    deliveryCoherence.outputs?.includes("Resultado de coerência"),
    "check-delivery-coherence should output a Coherence result"
  );
  assert(
    deliveryCoherence.redLines?.some((item) => /rewrite|reescreva|silently|silenciosamente/i.test(item)),
    "check-delivery-coherence should block silent scope rewrites"
  );

  assert(
    deliveryBoundaries.outputs?.includes("Aplicabilidade de Design/Security/DevOps"),
    "define-delivery-boundaries should output Design/Security/DevOps applicability"
  );
  assert(
    deliveryBoundaries.redLines?.some(
      (item) => /architecture artifact|artefatos? de arquitetura|source code|código-fonte|código/i.test(item)
    ),
    "define-delivery-boundaries should block premature architecture artifacts or source code"
  );
}

function assertEngineeringSkillContracts() {
  const engineeringArea = operationsDepartment.areas.find((area) => area.slug === "engineering");

  assert(engineeringArea, "Operations should define Engineering area");

  const writeTests = engineeringArea.skills.find((item) => item.slug === "write-tests");
  const createPr = engineeringArea.skills.find((item) => item.slug === "create-pr");
  const reviewPr = engineeringArea.skills.find((item) => item.slug === "review-pr");

  assert(writeTests, "Engineering should define write-tests skill");
  assert(createPr, "Engineering should define create-pr skill");
  assert(reviewPr, "Engineering should define review-pr skill");

  assert(
    writeTests.process?.some((item) => /failing test|RED/i.test(item)),
    "write-tests should require failing test or RED evidence when test-first is feasible"
  );
  assert(
    writeTests.outputs?.includes("Evidência RED/GREEN"),
    "write-tests should output RED/GREEN evidence"
  );
  assert(
    writeTests.outputs?.includes("Explicação de lacuna de teste"),
    "write-tests should output explicit test-gap explanation"
  );
  assert(
    writeTests.redLines?.some(
      (item) => /tests written after implementation|testes escritos depois da implementação|manual validation|validação manual/i.test(item)
    ),
    "write-tests should block weak after-the-fact test or manual-validation claims"
  );

  assert(
    createPr.outputs?.includes("Status de prontidão do PR"),
    "create-pr should output PR readiness status"
  );
  assert(
    createPr.checks?.some((item) => /tests run or test-gap explanation|testes executados ou explicação de lacuna de teste/i.test(item)),
    "create-pr should require tests run or test-gap explanation"
  );
  assert(
    createPr.redLines?.some(
      (item) => /founder-ready/i.test(item) && /tests|testes|gaps|lacunas|risks|riscos/i.test(item)
    ),
    "create-pr should block founder-ready PRs without tests, gaps and risks"
  );

  assert(
    reviewPr.outputs?.includes("Evidência revisada"),
    "review-pr should output evidence reviewed"
  );
  assert(
    reviewPr.checks?.some((item) => /file\/line|arquivo\/linha|line reference|artifact reference|referência de artefato/i.test(item)),
    "review-pr should require file/line or artifact references when possible"
  );
  assert(
    reviewPr.redLines?.some((item) => /merge recommendation|recomendação de merge/i.test(item) && /evidence|evidência/i.test(item)),
    "review-pr should block merge recommendations without evidence"
  );
}

function assertEngineeringKnowledgeContracts() {
  const engineeringArea = findOperationsArea("engineering", "Engineering");
  const frameworkKnowledgeFiles = [
    "knowledge/code-standards.md",
    "knowledge/implementation-rules.md",
    "knowledge/component-guidelines.md",
    "knowledge/data-guidelines.md",
    "knowledge/testing-strategy.md",
    "knowledge/review-criteria.md"
  ];

  const readAreaFile = (path) => {
    const file = engineeringArea.files.find((item) => item.path === path);

    assert(file, `Engineering should define ${path}`);

    return file.content();
  };

  for (const path of frameworkKnowledgeFiles) {
    assert(
      !/\bTBD\b/.test(readAreaFile(path)),
      `${path} should not contain TBD placeholders`
    );
  }

  const knowledgeReadme = readAreaFile("knowledge/README.md");
  const codeStandards = readAreaFile("knowledge/code-standards.md");
  const implementationRules = readAreaFile("knowledge/implementation-rules.md");
  const dataGuidelines = readAreaFile("knowledge/data-guidelines.md");
  const testingStrategy = readAreaFile("knowledge/testing-strategy.md");
  const reviewCriteria = readAreaFile("knowledge/review-criteria.md");

  assert(knowledgeReadme.includes("## Responsabilidades dos Arquivos"), "Engineering knowledge README should define file responsibilities");
  assert(knowledgeReadme.includes("code-review-notes.md"), "Engineering knowledge README should distinguish code-review-notes.md");
  assert(knowledgeReadme.includes("pr-log.md"), "Engineering knowledge README should distinguish pr-log.md");

  for (const expectedSection of ["## Existing Patterns First", "## Modularization", "## Não Faça"]) {
    assert(codeStandards.includes(expectedSection), `code-standards.md should include ${expectedSection}`);
  }

  for (const expectedSection of ["## Contexto Obrigatório Before Coding", "## Design Dependency", "## Linhas Vermelhas"]) {
    assert(implementationRules.includes(expectedSection), `implementation-rules.md should include ${expectedSection}`);
  }

  for (const expectedContent of ["## Migrations", "## Rollback", "Security"]) {
    assert(dataGuidelines.includes(expectedContent), `data-guidelines.md should include ${expectedContent}`);
  }

  for (const expectedContent of ["RED/GREEN", "## Test Gaps", "Manual Validation"]) {
    assert(testingStrategy.includes(expectedContent), `testing-strategy.md should include ${expectedContent}`);
  }

  for (const expectedContent of ["## Findings By Severity", "## Merge Recommendation", "Design Review"]) {
    assert(reviewCriteria.includes(expectedContent), `review-criteria.md should include ${expectedContent}`);
  }
}

function assertDevopsSkillContracts() {
  const devopsArea = findOperationsArea("devops", "DevOps");

  for (const skillSlug of ["configure-environments", "setup-ci", "plan-deployment", "define-observability", "prepare-release"]) {
    const skill = findAreaSkill(devopsArea, skillSlug, "DevOps");

    assertRichSkillField(skill, "process", 6, skillSlug);
    assertRichSkillField(skill, "checks", 4, skillSlug);
    assertRichSkillField(skill, "outputs", 6, skillSlug);
    assertRichSkillField(skill, "redLines", 3, skillSlug);
  }

  assert(
    findAreaSkill(devopsArea, "configure-environments", "DevOps").outputs?.includes("Status de prontidão de ambiente"),
    "configure-environments should output Environment readiness status"
  );
  assert(
    findAreaSkill(devopsArea, "setup-ci", "DevOps").outputs?.includes("Decisão de gate de CI"),
    "setup-ci should output CI gate decision"
  );
  assert(
    findAreaSkill(devopsArea, "plan-deployment", "DevOps").outputs?.includes("Decisão deploy/no-deploy"),
    "plan-deployment should output Deploy/no-deploy decision"
  );
  assert(
    findAreaSkill(devopsArea, "define-observability", "DevOps").outputs?.includes("Mapa de owner/ação por sinal"),
    "define-observability should output Signal owner/action map"
  );
  assert(
    findAreaSkill(devopsArea, "prepare-release", "DevOps").outputs?.includes("Status de prontidão de release"),
    "prepare-release should output Release readiness status"
  );
}

function assertSecuritySkillContracts() {
  const securityArea = findOperationsArea("security", "Security");

  for (const skillSlug of ["threat-modeling", "access-control-review", "secrets-management", "secure-code-review", "dependency-supply-chain-review", "infra-hardening-review", "ai-runtime-security-review"]) {
    const skill = findAreaSkill(securityArea, skillSlug, "Security");

    assertRichSkillField(skill, "process", 6, skillSlug);
    assertRichSkillField(skill, "checks", 4, skillSlug);
    assertRichSkillField(skill, "outputs", 5, skillSlug);
    assertRichSkillField(skill, "redLines", 3, skillSlug);
  }

  assert(
    findAreaSkill(securityArea, "threat-modeling", "Security").outputs?.includes("Threat-model decision"),
    "threat-modeling should output Threat-model decision"
  );
  assert(
    findAreaSkill(securityArea, "access-control-review", "Security").checks?.some((item) => /deny-by-default|unknown ownership/i.test(item)),
    "access-control-review should use deny-by-default when ownership is unknown"
  );
  assert(
    findAreaSkill(securityArea, "secrets-management", "Security").outputs?.includes("Secret handling decision"),
    "secrets-management should output Secret handling decision"
  );
  assert(
    findAreaSkill(securityArea, "secure-code-review", "Security").outputs?.includes("Evidence reviewed"),
    "secure-code-review should output Evidence reviewed"
  );
  assert(
    findAreaSkill(securityArea, "dependency-supply-chain-review", "Security").outputs?.includes("Provenance evidence"),
    "dependency-supply-chain-review should output Provenance evidence"
  );
  assert(
    findAreaSkill(securityArea, "infra-hardening-review", "Security").outputs?.includes("Hardening decision status"),
    "infra-hardening-review should output Hardening decision status"
  );

  const aiRuntimeSecurity = findAreaSkill(securityArea, "ai-runtime-security-review", "Security");

  for (const expectedRisk of ["LLM input/output", "tool permissions", "RAG/vector DB", "customer data boundary", "prompt injection", "cost/rate abuse"]) {
    assert(
      [
        ...(aiRuntimeSecurity.process ?? []),
        ...(aiRuntimeSecurity.checks ?? []),
        ...(aiRuntimeSecurity.outputs ?? []),
        ...(aiRuntimeSecurity.redLines ?? [])
      ].join("\n").includes(expectedRisk),
      `ai-runtime-security-review should cover ${expectedRisk}`
    );
  }
}

function assertDesignSkillContracts() {
  const designArea = findOperationsArea("design", "Design");

  for (const skillSlug of ["user-research", "user-flow-mapping", "design-system", "screen-specification", "microcopy"]) {
    const skill = findAreaSkill(designArea, skillSlug, "Design");

    assertRichSkillField(skill, "process", 6, skillSlug);
    assertRichSkillField(skill, "checks", 4, skillSlug);
    assertRichSkillField(skill, "outputs", 6, skillSlug);
    assertRichSkillField(skill, "redLines", 3, skillSlug);
  }

  assert(
    findAreaSkill(designArea, "user-research", "Design").outputs?.includes("Evidence confidence"),
    "user-research should output Evidence confidence"
  );
  assert(
    findAreaSkill(designArea, "user-flow-mapping", "Design").outputs?.includes("Flow decision status"),
    "user-flow-mapping should output Flow decision status"
  );
  assert(
    findAreaSkill(designArea, "design-system", "Design").outputs?.includes("MVP design-system decision"),
    "design-system should output MVP design-system decision"
  );
  assert(
    findAreaSkill(designArea, "screen-specification", "Design").outputs?.includes("Implementation-ready screen spec"),
    "screen-specification should output Implementation-ready screen spec"
  );
  assert(
    findAreaSkill(designArea, "microcopy", "Design").outputs?.includes("Copy decision status"),
    "microcopy should output Copy decision status"
  );
}

function findOperationsArea(slug, label) {
  const area = operationsDepartment.areas.find((item) => item.slug === slug);

  assert(area, `Operations should define ${label} area`);

  return area;
}

function findAreaSkill(area, skillSlug, label) {
  const skill = area.skills.find((item) => item.slug === skillSlug);

  assert(skill, `${label} should define ${skillSlug} skill`);

  return skill;
}

function assertRichSkillField(skill, field, minimumLength, skillSlug) {
  assert(
    Array.isArray(skill[field]) && skill[field].length >= minimumLength,
    `${skillSlug} should define a rich ${field} contract`
  );
}

function assertAllSkillsHaveRedLines() {
  for (const department of [operationsDepartment]) {
    for (const area of department.areas) {
      for (const skill of area.skills) {
        assert(
          Array.isArray(skill.redLines) && skill.redLines.length > 0,
          `${area.key}/${skill.slug} should define redLines`
        );
      }
    }
  }
}
