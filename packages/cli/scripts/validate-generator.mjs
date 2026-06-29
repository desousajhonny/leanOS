import { validateGeneratorScriptIsModular } from "./validation/assertions.mjs";
import { validateProductOpsActivation, validateActivationCliCommand } from "./validation/activation.mjs";
import { validateAiStandardRendererIsModular } from "./validation/ai-standard.mjs";
import { validateClientWorkspaceFixture } from "./validation/client-fixture.mjs";
import { validateAreaDefinitionsAreModular } from "./validation/definitions.mjs";
import { validateExistingProductRepoMode } from "./validation/existing-product-repo.mjs";
import { validateWorkspaceRenderersAreModular } from "./validation/renderers.mjs";
import { validateRootModelMemory } from "./validation/root-memory.mjs";
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
await validateClientWorkspaceFixture();
await validatePartialAreaSelection();
await validateEngineeringOnlyContext();
await validateDesignOnlyContext();
await validateGrowthValidationContext();
await validateProductOpsActivation();
await validateActivationCliCommand();
await validateExistingProductRepoMode();
await validateWriterSkipsExistingFiles();
await validateWriterOverwritesWhenAllowed();

console.log("LeanOS generator validations passed.");
