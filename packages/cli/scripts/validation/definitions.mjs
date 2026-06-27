import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./fixtures.mjs";

export async function validateAreaDefinitionsAreModular() {
  await assertAreaFacade("operations-devops.ts", "operations/devops", [
    "index.ts",
    "devopsGithubManagementKnowledge.ts",
    "devopsEnvironmentsKnowledge.ts",
    "devopsDeploymentReadinessKnowledge.ts",
    "devopsCiCdKnowledge.ts",
    "devopsObservabilityKnowledge.ts",
    "devopsReleaseNotesKnowledge.ts"
  ]);
  await assertAreaFacade("operations-engineering.ts", "operations/engineering", [
    "index.ts",
    "engineeringImplementationNotesKnowledge.ts",
    "engineeringPrLogKnowledge.ts",
    "engineeringCodeStandardsKnowledge.ts",
    "engineeringImplementationRulesKnowledge.ts",
    "engineeringComponentGuidelinesKnowledge.ts",
    "engineeringDataGuidelinesKnowledge.ts",
    "engineeringTestingStrategyKnowledge.ts",
    "engineeringReviewCriteriaKnowledge.ts"
  ]);
  await assertAreaFacade("operations-product-ops.ts", "operations/product-ops", [
    "index.ts",
    "productOpsOverviewKnowledge.ts",
    "productOpsEpicsReadmeKnowledge.ts",
    "productOpsDeliveryScopeKnowledge.ts",
    "productOpsIssueReadinessKnowledge.ts",
    "productOpsReadyToDevelopKnowledge.ts",
    "productOpsMvpDecisionGateKnowledge.ts",
    "productOpsMvpScopeKnowledge.ts",
    "productOpsMvpBacklogKnowledge.ts",
    "productOpsMvpPrdKnowledge.ts",
    "productOpsMvpUserStoriesKnowledge.ts",
    "productOpsMvpAcceptanceCriteriaKnowledge.ts",
    "productOpsWorkTaxonomyKnowledge.ts"
  ]);
  await assertAreaFacade("operations-design.ts", "operations/design", [
    "index.ts",
    "designSystemKnowledge.ts",
    "designAccessibilityKnowledge.ts",
    "designUserFlowsKnowledge.ts",
    "designComponentInventoryKnowledge.ts",
    "designComponentSpecsReadme.ts"
  ]);
  await assertAreaFacade("operations-security.ts", "operations/security", [
    "index.ts",
    "securityKnowledgeTemplate.ts",
    "securityBaselineKnowledge.ts",
    "securityThreatModelKnowledge.ts",
    "securityAccessControlKnowledge.ts",
    "securityDataProtectionKnowledge.ts",
    "securityDatabaseSecurityKnowledge.ts",
    "securitySecretsManagementKnowledge.ts",
    "securityInfraHardeningKnowledge.ts",
    "securitySecureCodingKnowledge.ts",
    "securityIncidentResponseKnowledge.ts",
    "securityAutomationKnowledge.ts"
  ]);
}

async function assertAreaFacade(fileName, moduleDirectory, expectedModules) {
  const areasRoot = join(packageRoot, "src", "templates", "workspace", "definitions", "departments", "areas");
  const facadePath = join(areasRoot, fileName);
  const moduleDir = join(areasRoot, moduleDirectory);
  const facadeLineCount = (await readFile(facadePath, "utf8")).split(/\r?\n/).length;

  assert(facadeLineCount <= 40, `Area definition facade should stay small: ${fileName}`);

  for (const moduleName of expectedModules) {
    await access(join(moduleDir, moduleName), constants.F_OK);
  }
}
