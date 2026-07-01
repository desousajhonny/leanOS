import assert from "node:assert/strict";
import { operationsDepartment } from "../../dist/templates/workspace/definitions/departments/operations.js";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export function validateImplementationPacketContract() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));

  assertGeneratedImplementationPacketFiles(byPath);
  assertAgentAndReadmeImplementationPacketRouting(byPath);
  assertProductOpsImplementationPacketContract(byPath);
  assertDesignImplementationPacketContract(byPath);
  assertEngineeringImplementationPacketContract(byPath);
  assertWorkflowImplementationPacketContract();
}

function requiredFile(byPath, path) {
  const content = byPath.get(path);
  assert(content, `${path} should exist`);
  return content;
}

function assertGeneratedImplementationPacketFiles(byPath) {
  const packetTemplate = requiredFile(byPath, ".leanos/standard/templates/product/implementation-packet-template.md");
  const productUiSpecTemplate = requiredFile(byPath, ".leanos/standard/templates/design/product-ui-spec-template.md");
  const screenSpecTemplate = requiredFile(byPath, ".leanos/standard/templates/design/screen-spec-template.md");
  const componentSpecTemplate = requiredFile(byPath, ".leanos/standard/templates/design/component-spec-template.md");
  const packetsReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/knowledge/implementation-packets/README.md");
  const screenReadinessPlaybook = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/playbooks/screen-readiness.playbook.md");

  assert(packetTemplate.includes("## Readiness Gates"), "Implementation packet template should define readiness gates");
  assert(packetTemplate.includes("design/screen-specs/"), "Implementation packet template should include Design screen specs path");
  assert(packetTemplate.includes("design/component-specs/"), "Implementation packet template should include Design component specs path");
  assert(packetTemplate.includes("Engineering não inicia código"), "Implementation packet template should gate Engineering before code");

  for (const expectedSection of ["## Propósito", "## Estados Da Tela", "## Ações", "## Acessibilidade", "## Handoff Para Engineering"]) {
    assert(screenSpecTemplate.includes(expectedSection), `Screen spec template should include ${expectedSection}`);
  }

  assert(productUiSpecTemplate.includes("## Estrutura Do Produto"), "Product UI spec template should define product shell patterns");
  assert(productUiSpecTemplate.includes("## Prioridade De Ações"), "Product UI spec template should define action priority");
  assert(productUiSpecTemplate.includes("proposed / approved / experimental / deprecated"), "Product UI spec template should define pattern lifecycle statuses");
  assert(productUiSpecTemplate.includes("Origem: Feature / PR / decisão de Design"), "Product UI spec template should capture pattern origin");
  assert(productUiSpecTemplate.includes("## Exemplos De Uso"), "Product UI spec template should include usage examples");
  assert(productUiSpecTemplate.includes("## Antipadrões"), "Product UI spec template should include anti-patterns");
  assert(productUiSpecTemplate.includes("## Critérios Para Atualizar"), "Product UI spec template should define update criteria");
  assert(productUiSpecTemplate.includes("## Conteúdo E Microcopy"), "Product UI spec template should include content and action-label patterns");
  assert(productUiSpecTemplate.includes("## Regras De Promoção De Padrões"), "Product UI spec template should define progressive promotion rules");
  assert(screenSpecTemplate.includes("## Conformidade Com Product UI Spec"), "Screen spec template should require Product UI Spec compliance");
  assert(screenSpecTemplate.includes("operations/design/knowledge/product-ui-spec.md"), "Screen spec template should reference the Product UI Spec");
  assert(screenSpecTemplate.includes("Padrão do Product UI Spec usado"), "Screen spec template should require the Product UI Spec pattern used");
  assert(screenSpecTemplate.includes("Componentes duráveis usados"), "Screen spec template should require durable component references");
  assert(screenSpecTemplate.includes("Divergência proposta"), "Screen spec template should require divergence rationale");
  assert(screenSpecTemplate.includes("## Evidência De Handoff"), "Screen spec template should include handoff evidence");
  assert(componentSpecTemplate.includes("## Alinhamento Com Product UI Spec"), "Component spec template should require Product UI Spec alignment");
  assert(componentSpecTemplate.includes("operations/design/knowledge/product-ui-spec.md"), "Component spec template should reference the Product UI Spec");
  assert(componentSpecTemplate.includes("## O Que É"), "Component spec template should document what the component is");
  assert(componentSpecTemplate.includes("## Dicas De Usabilidade"), "Component spec template should include usability tips");
  assert(componentSpecTemplate.includes("## Faça / Não Faça"), "Component spec template should include do and don't guidance");
  assert(componentSpecTemplate.includes("## Exemplos"), "Component spec template should include examples");
  assert(componentSpecTemplate.includes("## Evidência De Handoff"), "Component spec template should include handoff evidence");

  assert(packetsReadme.includes("Feature implementation packet"), "Implementation packets README should define the Feature implementation packet");
  assert(packetsReadme.includes("Security, DevOps e outras áreas"), "Implementation packets README should support non-Design artifacts too");
  assert(screenReadinessPlaybook.includes("Feature implementation packet"), "Screen readiness should treat the implementation packet as the delivery handoff");
}

function assertAgentAndReadmeImplementationPacketRouting(byPath) {
  const operationsAgent = requiredFile(byPath, "clinic-assistant-ai-os/operations/AGENT.md");
  const operationsReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/README.md");
  const productOpsAgent = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/AGENT.md");
  const productOpsReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/README.md");
  const designAgent = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/AGENT.md");
  const designReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/README.md");
  const engineeringAgent = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/AGENT.md");
  const engineeringReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/README.md");

  assert(operationsAgent.includes("Feature implementation packets"), "Operations AGENT should expose implementation packet ownership");
  assert(operationsAgent.includes("criar ou confirmar implementation packet"), "Operations AGENT should route implementation packet journey signals");
  assert(operationsReadme.includes("Feature implementation packets"), "Operations README should expose implementation packet ownership");

  assert(productOpsAgent.includes("Implementation packet request"), "Product Ops AGENT should route implementation packet requests");
  assert(productOpsAgent.includes("knowledge/implementation-packets/<feature-slug>/README.md"), "Product Ops AGENT should name the packet README path");
  assert(productOpsReadme.includes("Implementation packet request"), "Product Ops README should route implementation packet requests");

  assert(designAgent.includes("Screen readiness request"), "Design AGENT should route screen readiness requests");
  assert(designReadme.includes("Screen readiness request"), "Design README should route screen readiness requests");
  assert(designAgent.includes("Product UI Spec request"), "Design AGENT should route Product UI Spec requests");
  assert(designReadme.includes("Product UI Spec request"), "Design README should route Product UI Spec requests");
  assert(designAgent.includes("implementation-packets/<feature-slug>/design/component-specs"), "Design AGENT should route component specs into packets");
  assert(designReadme.includes("implementation-packets/<feature-slug>/design/screen-specs"), "Design README should route screen specs into packets");

  assert(engineeringAgent.includes("Feature implementation packet"), "Engineering AGENT should require packet context");
  assert(engineeringReadme.includes("Feature implementation packet"), "Engineering README should require packet context");
  assert(engineeringAgent.includes("implementation-packets/<feature-slug>/README.md"), "Engineering AGENT should name the packet README path");
  assert(engineeringAgent.includes("pr-validation.playbook.md"), "Engineering AGENT should keep PR validation in the packet-aware route");
}

function assertProductOpsImplementationPacketContract(byPath) {
  const knowledgeReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/knowledge/README.md");
  const readyToDevelop = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/knowledge/ready-to-develop.md");
  const epicToFeatures = requiredFile(byPath, "clinic-assistant-ai-os/operations/product-ops/playbooks/epic-to-features.playbook.md");
  const featureTemplate = requiredFile(byPath, ".leanos/standard/templates/product/feature-template.md");

  assert(knowledgeReadme.includes("implementation-packets/README.md"), "Product Ops knowledge README should expose implementation packets");
  assert(readyToDevelop.includes("operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md"), "Ready-to-develop should require a Feature packet path");
  assert(readyToDevelop.includes("needs-implementation-packet"), "Ready-to-develop should include needs-implementation-packet state");
  assert(readyToDevelop.includes("needs-screen-spec"), "Ready-to-develop should include needs-screen-spec state");
  assert(readyToDevelop.includes("Engineering não inicia código"), "Ready-to-develop should block Engineering before packet readiness");
  assert(epicToFeatures.includes("implementation packet"), "Epic-to-features should identify whether a Feature will need a packet");
  assert(featureTemplate.includes("Implementation Packet"), "Feature template should reference the implementation packet");
}

function assertDesignImplementationPacketContract(byPath) {
  const areaYaml = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/area.yaml");
  const productDesigner = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/roles/product-designer.role.md");
  const knowledgeReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/knowledge/README.md");
  const productUiSpec = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/knowledge/product-ui-spec.md");
  const componentsReadme = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/knowledge/components/README.md");
  const componentInventory = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/knowledge/component-inventory.md");
  const productUiSpecSkill = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/product-ui-spec/SKILL.md");
  const componentAnalysis = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/component-analysis/SKILL.md");
  const screenSpecification = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/skills/screen-specification/SKILL.md");
  const productUiSpecReadiness = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/playbooks/product-ui-spec-readiness.playbook.md");
  const componentReadiness = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/playbooks/component-readiness.playbook.md");
  const screenReadiness = requiredFile(byPath, "clinic-assistant-ai-os/operations/design/playbooks/screen-readiness.playbook.md");

  assert(areaYaml.includes("- product-ui-spec"), "Design area YAML should list product-ui-spec skill");
  assert(areaYaml.includes("- product-ui-spec-readiness"), "Design area YAML should list product-ui-spec-readiness playbook");
  assert(areaYaml.includes("- screen-readiness"), "Design area YAML should list screen-readiness playbook");
  assert(productDesigner.includes("../playbooks/screen-readiness.playbook.md"), "Product Designer should point to screen-readiness playbook");
  assert(productDesigner.includes("../knowledge/product-ui-spec.md"), "Product Designer should load the Product UI Spec before screen/component work");
  assert(knowledgeReadme.includes("product-ui-spec.md"), "Design knowledge README should expose the Product UI Spec");
  assert(productUiSpec.includes("## Estrutura Do Produto"), "Product UI Spec should define product shell patterns");
  assert(productUiSpec.includes("proposed / approved / experimental / deprecated"), "Product UI Spec should define pattern lifecycle statuses");
  assert(productUiSpec.includes("Origem: Feature / PR / decisão de Design"), "Product UI Spec should capture pattern origin");
  assert(productUiSpec.includes("## Regras Progressivas De Padrão"), "Product UI Spec should define progressive pattern governance");
  assert(productUiSpec.includes("## Conteúdo E Microcopy"), "Product UI Spec should include content and action-label patterns");
  assert(productUiSpec.includes("## Critérios Para Atualizar"), "Product UI Spec should define update criteria");
  assert(productUiSpec.includes("operations/design/knowledge/components/"), "Product UI Spec should route durable component docs");
  assert(componentsReadme.includes("O Que É"), "Durable component specs should document what the component is");
  assert(componentsReadme.includes("Dicas De Usabilidade"), "Durable component specs should document usability tips");
  assert(componentsReadme.includes("Faça / Não Faça"), "Durable component specs should document do and don't guidance");
  assert(componentsReadme.includes("Evidência De Handoff"), "Durable component specs should document handoff evidence");
  assert(componentInventory.includes("specified, planned, implemented, available, needs-spec, deprecated or unknown"), "Component inventory should define lifecycle statuses");
  assert(componentInventory.includes("Specified is not implemented"), "Component inventory should prevent treating specs as available code");
  assert(componentInventory.includes("Post-merge"), "Component inventory should define post-merge status update responsibility");
  assert(componentInventory.includes("Promote reusable component specs"), "Component inventory should define durable component promotion");

  assert(productUiSpecSkill.includes("product-ui-spec.md"), "Product UI Spec skill should update product-ui-spec.md");
  assert(productUiSpecSkill.includes("progressive, not speculative"), "Product UI Spec skill should keep patterns progressive");
  for (const decision of ["follow_existing_pattern", "extend_existing_pattern", "create_new_pattern", "blocked_by_missing_context", "not_applicable"]) {
    assert(productUiSpecSkill.includes(decision), `Product UI Spec skill should define ${decision} decision`);
  }
  assert(productUiSpecReadiness.includes("product-ui-spec-template.md"), "Product UI Spec readiness should use the template");
  for (const decision of ["follow_existing_pattern", "extend_existing_pattern", "create_new_pattern", "blocked_by_missing_context", "not_applicable"]) {
    assert(productUiSpecReadiness.includes(decision), `Product UI Spec readiness should output ${decision}`);
  }
  assert(productUiSpecReadiness.includes("screen-readiness"), "Product UI Spec readiness should run before screen readiness when needed");
  assert(componentAnalysis.includes("implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md"), "Component analysis should write Feature-scoped component specs into the packet");
  assert(componentAnalysis.includes("product-ui-spec.md"), "Component analysis should check the Product UI Spec");
  assert(componentAnalysis.includes("specified, not implemented"), "Component analysis should distinguish specified components from implemented components");
  assert(screenSpecification.includes("screen-spec-template.md"), "Screen specification should use the screen spec template");
  assert(screenSpecification.includes("product-ui-spec.md"), "Screen specification should check the Product UI Spec");
  assert(screenSpecification.includes("implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md"), "Screen specification should write screen specs into the packet");
  assert(componentReadiness.includes("product-ui-spec.md"), "Component readiness should check the Product UI Spec");
  assert(componentReadiness.includes("implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md"), "Component readiness should write component specs into the packet");
  assert(componentReadiness.includes("specified, not implemented"), "Component readiness should not mark unmerged components as available");
  assert(screenReadiness.includes("screen-spec-template.md"), "Screen readiness should use the screen spec template");
  assert(screenReadiness.includes("Product UI Spec compliance"), "Screen readiness should check Product UI Spec compliance");
  assert(screenReadiness.includes("Evidência De Handoff"), "Screen readiness should require handoff evidence");
  assert(screenReadiness.includes("implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md"), "Screen readiness should write screen specs into the packet");
}

function assertEngineeringImplementationPacketContract(byPath) {
  const componentGuidelines = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/knowledge/component-guidelines.md");
  const reviewCriteria = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/knowledge/review-criteria.md");
  const planImplementation = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/skills/plan-implementation/SKILL.md");
  const implementComponent = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/skills/implement-component/SKILL.md");
  const engineeringDelivery = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/playbooks/engineering-delivery.playbook.md");
  const componentImplementation = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/playbooks/component-implementation.playbook.md");
  const prValidation = requiredFile(byPath, "clinic-assistant-ai-os/operations/engineering/playbooks/pr-validation.playbook.md");

  assert(componentGuidelines.includes("Feature implementation packet"), "Component guidelines should require Feature implementation packet context");
  assert(componentGuidelines.includes("specified, not implemented"), "Component guidelines should prevent treating specified components as implemented");
  assert(componentGuidelines.includes("post-merge"), "Component guidelines should define post-merge component inventory update");
  assert(reviewCriteria.includes("## Implementation Packet Review"), "Review criteria should require implementation packet review");
  assert(reviewCriteria.includes("screen specs and component specs"), "Review criteria should compare UI changes to Design specs");
  assert(reviewCriteria.includes("Product UI Spec"), "Review criteria should compare UI changes to the Product UI Spec");
  assert(planImplementation.includes("implementation-packets/<feature-slug>/README.md"), "Plan implementation should require the Feature implementation packet");
  assert(implementComponent.includes("implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md"), "Implement component skill should read packet component specs");
  assert(engineeringDelivery.includes("Feature implementation packet"), "Engineering delivery should read the packet before branch/code");
  assert(engineeringDelivery.includes("operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md"), "Engineering delivery should name the packet README path");
  assert(componentImplementation.includes("implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md"), "Component implementation should read the packet component spec");
  assert(prValidation.includes("Feature implementation packet"), "PR validation should compare PR against the packet");
  assert(prValidation.includes("screen specs, component specs"), "PR validation should check Design specs when present");
  assert(prValidation.includes("Product UI Spec"), "PR validation should check Product UI Spec compliance for UI changes");
}

function assertWorkflowImplementationPacketContract() {
  const featureWorkflow = operationsDepartment.workflows.find((item) => item.slug === "feature-to-delivery-cycle");
  const postMergeWorkflow = operationsDepartment.workflows.find((item) => item.slug === "post-merge-continuation");

  assert(featureWorkflow, "Operations should define feature-to-delivery-cycle workflow");
  assert(postMergeWorkflow, "Operations should define post-merge-continuation workflow");

  const featureWorkflowText = [
    featureWorkflow.purpose,
    ...(featureWorkflow.phases ?? []),
    ...(featureWorkflow.steps ?? []),
    ...(featureWorkflow.allowedUpdates ?? []),
    ...(featureWorkflow.stopConditions ?? []),
    ...(featureWorkflow.expectedOutput ?? [])
  ].join("\n");

  assert(featureWorkflowText.includes("Feature implementation packet"), "Feature delivery workflow should route through the packet");
  assert(featureWorkflowText.includes("operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md"), "Feature delivery workflow should name the packet path");
  assert(featureWorkflowText.includes("screen specs, component specs"), "Feature delivery workflow should include Design artifacts in the packet");

  const postMergeText = [
    ...(postMergeWorkflow.steps ?? []),
    ...(postMergeWorkflow.allowedUpdates ?? []),
    ...(postMergeWorkflow.expectedOutput ?? []),
    ...(postMergeWorkflow.continuationBridge?.rules ?? [])
  ].join("\n");

  assert(postMergeText.includes("component inventory"), "Post-merge continuation should update component inventory when components shipped");
  assert(postMergeText.includes("implemented/available"), "Post-merge continuation should mark shipped components implemented/available");
  assert(postMergeText.includes("operations/design/knowledge/components/<component-slug>.md"), "Post-merge continuation should promote durable component docs");
  assert(postMergeText.includes("operations/design/knowledge/product-ui-spec.md"), "Post-merge continuation should promote accepted UI patterns");
}
