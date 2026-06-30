import { validateGeneratorScriptIsModular } from "./validation/assertions.mjs";
import { validateProductOpsActivation, validateActivationCliCommand } from "./validation/activation.mjs";
import { validateAiStandardRendererIsModular } from "./validation/ai-standard.mjs";
import { validateBranchAndPrStandards } from "./validation/branch-pr-standards.mjs";
import { validateClientWorkspaceFixture } from "./validation/client-fixture.mjs";
import { validateCliWizardProgressiveSetup } from "./validation/cli-wizard.mjs";
import { validateAreaDefinitionsAreModular } from "./validation/definitions.mjs";
import { validateExistingProductRepoMode } from "./validation/existing-product-repo.mjs";
import { validateFounderJourneyReadyForLaunch, validateFounderJourneyReviewPr } from "./validation/founder-journey.mjs";
import { validateGeneratedHumanLanguage } from "./validation/language.mjs";
import { validateBusinessOsLayout } from "./validation/layout.mjs";
import { validateGithubSyncContract } from "./validation/github-sync.mjs";
import { validateWorkspaceRenderersAreModular } from "./validation/renderers.mjs";
import { validateRootModelMemory } from "./validation/root-memory.mjs";
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
await validateAreaDefinitionsAreModular();
await validateGeneratedHumanLanguage();
await validateBusinessOsLayout();
await validateGithubSyncContract();
await validateBranchAndPrStandards();
await validateCliWizardProgressiveSetup();
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
await validateWorkspaceUpdateCommand();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");
