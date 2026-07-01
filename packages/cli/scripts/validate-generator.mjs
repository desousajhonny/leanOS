import { validateGeneratorScriptIsModular } from "./validation/assertions.mjs";
import { validateProductOpsActivation, validateActivationCliCommand } from "./validation/activation.mjs";
import { validateAiStandardRendererIsModular } from "./validation/ai-standard.mjs";
import { validateBranchAndPrStandards } from "./validation/branch-pr-standards.mjs";
import { validateClientWorkspaceFixture } from "./validation/client-fixture.mjs";
import { validateCliWizardProgressiveSetup } from "./validation/cli-wizard.mjs";
import { validateCreateLeanOsPackage } from "./validation/create-package.mjs";
import { validateAreaDefinitionsAreModular } from "./validation/definitions.mjs";
import { validateExistingProductRepoMode } from "./validation/existing-product-repo.mjs";
import { validateFounderJourneyReadyForLaunch, validateFounderJourneyReviewPr, validateFounderJourneySecurityHardeningCycle } from "./validation/founder-journey.mjs";
import { validateFrameworkGovernance } from "./validation/framework-governance.mjs";
import { validateGeneratedHumanLanguage } from "./validation/language.mjs";
import { validateBusinessOsLayout } from "./validation/layout.mjs";
import { validateGithubRepositoryReadmeGate } from "./validation/github-repository-readme-gate.mjs";
import { validateGithubSyncContract } from "./validation/github-sync.mjs";
import { validateGrowthExperimentContract } from "./validation/growth-experiments.mjs";
import { validateImplementationPacketContract } from "./validation/implementation-packets.mjs";
import { validateNpmPublishReleaseProtocol } from "./validation/npm-publish-release.mjs";
import { validatePricingSourceOfTruthContract } from "./validation/pricing-source-of-truth.mjs";
import { validateProductReadmeContract } from "./validation/product-readme.mjs";
import { validateWorkspaceRenderersAreModular } from "./validation/renderers.mjs";
import { validateRootModelMemory } from "./validation/root-memory.mjs";
import { validateSemanticTriggerQuality } from "./validation/semantic-triggers.mjs";
import { validateSkillQualityPass } from "./validation/skill-quality.mjs";
import { validateSpendBudgetSourceOfTruthContract } from "./validation/spend-budget-source-of-truth.mjs";
import { validateWorkspaceUpdateCommand } from "./validation/update.mjs";
import {
  validateWorkspaceFiles,
  validatePartialAreaSelection,
  validateEngineeringOnlyContext,
  validateDesignOnlyContext,
  validateGrowthValidationContext
} from "./validation/workspace-files.mjs";
import { validateWriterSkipsExistingFiles, validateWriterOverwritesWhenAllowed } from "./validation/writer.mjs";

await validateGeneratorScriptIsModular();
await validateWorkspaceFiles();
await validateAiStandardRendererIsModular();
await validateWorkspaceRenderersAreModular();
await validateRootModelMemory();
await validateFrameworkGovernance();
await validateAreaDefinitionsAreModular();
await validateGeneratedHumanLanguage();
await validateBusinessOsLayout();
await validateGithubSyncContract();
await validateNpmPublishReleaseProtocol();
await validateGithubRepositoryReadmeGate();
await validateProductReadmeContract();
await validatePricingSourceOfTruthContract();
await validateSpendBudgetSourceOfTruthContract();
await validateGrowthExperimentContract();
await validateImplementationPacketContract();
await validateSemanticTriggerQuality();
await validateSkillQualityPass();
await validateBranchAndPrStandards();
await validateCliWizardProgressiveSetup();
await validateCreateLeanOsPackage();
await validateClientWorkspaceFixture();
await validatePartialAreaSelection();
await validateEngineeringOnlyContext();
await validateDesignOnlyContext();
await validateGrowthValidationContext();
await validateProductOpsActivation();
await validateActivationCliCommand();
await validateExistingProductRepoMode();
await validateFounderJourneyReviewPr();
await validateFounderJourneyReadyForLaunch();
await validateFounderJourneySecurityHardeningCycle();
await validateWorkspaceUpdateCommand();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");
