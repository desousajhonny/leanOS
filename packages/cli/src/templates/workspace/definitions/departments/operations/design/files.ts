import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { designAccessibilityKnowledge } from "./knowledge/design-accessibility.js";
import { designComponentInventoryKnowledge } from "./knowledge/design-component-inventory.js";
import { designComponentSpecsReadme } from "./knowledge/design-component-specsreadme.js";
import { designSystemKnowledge } from "./knowledge/design-system.js";
import { designUserFlowsKnowledge } from "./knowledge/design-user-flows.js";

export const operationsDesignSourceOfTruth = ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md", "knowledge/component-inventory.md"];

export const operationsDesignFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Design Knowledge", "Design context produced by the Design area.", "Use after Product and MVP context exist, before implementation or user-facing issue work.", "design-system.md", ["design-system.md", "accessibility.md", "user-flows.md", "component-inventory.md", "components/README.md"], ["../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../product-ops/mvp/"], "Keep this folder focused on reusable design foundation and component readiness. Create component specs inside `components/` only when a real Feature requires them. Create screen specs, usability notes and UX decisions later when a concrete feature or screen requires them.") },
    { path: "knowledge/design-system.md", content: designSystemKnowledge },
    { path: "knowledge/accessibility.md", content: designAccessibilityKnowledge },
    { path: "knowledge/user-flows.md", content: designUserFlowsKnowledge },
    { path: "knowledge/component-inventory.md", content: designComponentInventoryKnowledge },
    { path: "knowledge/components/README.md", content: designComponentSpecsReadme }
  ];
