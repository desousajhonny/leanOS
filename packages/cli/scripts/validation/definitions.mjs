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
  assertDeliveryItemToEpicPlaybookDefinition();
  assertEpicToFeaturesPlaybookDefinition();
  assertProductOpsSkillContracts();
  assertEngineeringSkillContracts();
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
    [...playbook.steps, ...(playbook.filesToUpdate ?? [])].some((item) => /confirmation before creating local Feature files/i.test(item)),
    "epic-to-features should require confirmation before creating local Feature files"
  );

  const guardText = [...playbook.steps, ...(playbook.filesToUpdate ?? []), ...(playbook.stopConditions ?? [])].join("\n");

  for (const forbiddenWork of ["GitHub issue", "branch", "code", "PR"]) {
    assert(
      new RegExp(`Do not create.*${forbiddenWork}|no ${forbiddenWork}|not create.*${forbiddenWork}`, "i").test(guardText),
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
    playbook.filesToUpdate?.some((item) => item.includes("../epics/<epic-slug>/README.md")),
    "delivery-item-to-epic filesToUpdate should include local Epic README path"
  );

  assert(
    playbook.outputs?.includes("Local Epic README path"),
    "delivery-item-to-epic should output the local Epic README path"
  );

  assert(
    playbook.outputs?.includes("Founder confirmation status"),
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
    /only.*local.*Epic/i.test(guardText),
    "delivery-item-to-epic should state that it creates only a local Epic"
  );

  for (const forbiddenWork of ["Feature files", "GitHub issues", "branches", "source code", "PRs"]) {
    assert(
      new RegExp(`Do not create.*${forbiddenWork}|no ${forbiddenWork}|not create.*${forbiddenWork}`, "i").test(guardText),
      `delivery-item-to-epic should explicitly avoid creating ${forbiddenWork}`
    );
  }
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
    acceptanceCriteria.checks?.some((item) => /testable|pass\/fail/i.test(item)),
    "write-acceptance-criteria should require testable pass/fail criteria"
  );
  assert(
    acceptanceCriteria.redLines?.some((item) => /implementation|code/i.test(item)),
    "write-acceptance-criteria should block implementation details and code work"
  );

  assert(
    deliveryCoherence.outputs?.includes("Coherence result"),
    "check-delivery-coherence should output a Coherence result"
  );
  assert(
    deliveryCoherence.redLines?.some((item) => /rewrite|silently/i.test(item)),
    "check-delivery-coherence should block silent scope rewrites"
  );

  assert(
    deliveryBoundaries.outputs?.includes("Design/Security/DevOps applicability"),
    "define-delivery-boundaries should output Design/Security/DevOps applicability"
  );
  assert(
    deliveryBoundaries.redLines?.some((item) => /architecture artifact|source code/i.test(item)),
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
    writeTests.outputs?.includes("RED/GREEN evidence"),
    "write-tests should output RED/GREEN evidence"
  );
  assert(
    writeTests.outputs?.includes("Test gap explanation"),
    "write-tests should output explicit test-gap explanation"
  );
  assert(
    writeTests.redLines?.some((item) => /tests written after implementation|manual validation/i.test(item)),
    "write-tests should block weak after-the-fact test or manual-validation claims"
  );

  assert(
    createPr.outputs?.includes("PR readiness status"),
    "create-pr should output PR readiness status"
  );
  assert(
    createPr.checks?.some((item) => /tests run or test-gap explanation/i.test(item)),
    "create-pr should require tests run or test-gap explanation"
  );
  assert(
    createPr.redLines?.some((item) => /founder-ready/i.test(item) && /tests|gaps|risks/i.test(item)),
    "create-pr should block founder-ready PRs without tests, gaps and risks"
  );

  assert(
    reviewPr.outputs?.includes("Evidence reviewed"),
    "review-pr should output evidence reviewed"
  );
  assert(
    reviewPr.checks?.some((item) => /file\/line|line reference|artifact reference/i.test(item)),
    "review-pr should require file/line or artifact references when possible"
  );
  assert(
    reviewPr.redLines?.some((item) => /merge recommendation/i.test(item) && /evidence/i.test(item)),
    "review-pr should block merge recommendations without evidence"
  );
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
    findAreaSkill(devopsArea, "configure-environments", "DevOps").outputs?.includes("Environment readiness status"),
    "configure-environments should output Environment readiness status"
  );
  assert(
    findAreaSkill(devopsArea, "setup-ci", "DevOps").outputs?.includes("CI gate decision"),
    "setup-ci should output CI gate decision"
  );
  assert(
    findAreaSkill(devopsArea, "plan-deployment", "DevOps").outputs?.includes("Deploy/no-deploy decision"),
    "plan-deployment should output Deploy/no-deploy decision"
  );
  assert(
    findAreaSkill(devopsArea, "define-observability", "DevOps").outputs?.includes("Signal owner/action map"),
    "define-observability should output Signal owner/action map"
  );
  assert(
    findAreaSkill(devopsArea, "prepare-release", "DevOps").outputs?.includes("Release readiness status"),
    "prepare-release should output Release readiness status"
  );
}

function assertSecuritySkillContracts() {
  const securityArea = findOperationsArea("security", "Security");

  for (const skillSlug of ["threat-modeling", "access-control-review", "secrets-management", "secure-code-review", "dependency-supply-chain-review", "infra-hardening-review"]) {
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
