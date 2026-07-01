import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { designAccessibilityKnowledge } from "./knowledge/design-accessibility.js";
import { designComponentInventoryKnowledge } from "./knowledge/design-component-inventory.js";
import { designComponentSpecsReadme } from "./knowledge/design-component-specsreadme.js";
import { designProductUiSpecKnowledge } from "./knowledge/design-product-ui-spec.js";
import { designSystemKnowledge } from "./knowledge/design-system.js";
import { designUserFlowsKnowledge } from "./knowledge/design-user-flows.js";

export const operationsDesignSourceOfTruth = ["knowledge/design-system.md", "knowledge/product-ui-spec.md", "knowledge/accessibility.md", "knowledge/user-flows.md", "knowledge/component-inventory.md"];

export const operationsDesignFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Design Knowledge", "Design context produced by the Design area.", "Use after Product and MVP context exist, before implementation or user-facing issue work.", "design-system.md", ["design-system.md", "product-ui-spec.md", "accessibility.md", "user-flows.md", "component-inventory.md", "components/README.md"], ["../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../product-ops/mvp/", "../../product-ops/knowledge/implementation-packets/"], "Keep this folder focused on reusable design foundation, Product UI Spec patterns and component readiness. Write Feature-scoped screen specs and component specs inside `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/`. Use `product-ui-spec.md` for product-level UI patterns and `components/` only for durable reusable component specs that should outlive one Feature. Create screen specs, usability notes and UX decisions only when a concrete Feature or screen requires them.") },
    { path: "knowledge/design-system.md", content: designSystemKnowledge },
    { path: "knowledge/product-ui-spec.md", content: designProductUiSpecKnowledge },
    { path: "knowledge/accessibility.md", content: designAccessibilityKnowledge },
    { path: "knowledge/user-flows.md", content: designUserFlowsKnowledge },
    { path: "knowledge/component-inventory.md", content: designComponentInventoryKnowledge },
    { path: "knowledge/components/README.md", content: designComponentSpecsReadme }
  ];
