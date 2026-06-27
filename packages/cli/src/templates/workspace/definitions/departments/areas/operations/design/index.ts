import type { AreaDefinition } from "../../../../../types.js";
import { folderReadme } from "../../../../../content/shared.js";
import { designSystemKnowledge } from "./designSystemKnowledge.js";
import { designAccessibilityKnowledge } from "./designAccessibilityKnowledge.js";
import { designUserFlowsKnowledge } from "./designUserFlowsKnowledge.js";
import { designComponentInventoryKnowledge } from "./designComponentInventoryKnowledge.js";
import { designComponentSpecsReadme } from "./designComponentSpecsReadme.js";

export const operationsDesignArea: AreaDefinition = {
  key: "operations.design",
  root: "operations",
  slug: "design",
  name: "Design",
  path: "operations/design",
  lead: {
    title: "UX Lead",
    purpose: "Lead Design work, choose the right design specialist and keep design decisions aligned with Product, MVP and implementation needs."
  },
  routingKey: "design",
  requestTypes: "screens, flows, UX, UI, onboarding or usability",
  purpose: "Own the MVP design foundation, accessibility baseline and user-flow clarity before implementation.",
  whenToUse: ["define design foundation", "map user flows", "define accessibility baseline", "design onboarding", "reason about usability"],
  sourceOfTruth: ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md", "knowledge/component-inventory.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Design Knowledge", "Design context produced by the Design area.", "Use after Product and MVP context exist, before implementation or user-facing issue work.", "design-system.md", ["design-system.md", "accessibility.md", "user-flows.md", "component-inventory.md", "components/README.md"], ["../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../product-ops/mvp/"], "Keep this folder focused on reusable design foundation and component readiness. Create component specs inside `components/` only when a real Feature requires them. Create screen specs, usability notes and UX decisions later when a concrete feature or screen requires them.") },
    { path: "knowledge/design-system.md", content: designSystemKnowledge },
    { path: "knowledge/accessibility.md", content: designAccessibilityKnowledge },
    { path: "knowledge/user-flows.md", content: designUserFlowsKnowledge },
    { path: "knowledge/component-inventory.md", content: designComponentInventoryKnowledge },
    { path: "knowledge/components/README.md", content: designComponentSpecsReadme }
  ],
  roles: [
    {
      slug: "ux-researcher",
      title: "UX Researcher",
      purpose: "Understand user context, behavior, pain points and research signals before design decisions harden.",
      useWhen: ["research, user evidence, interviews, behavior, usability questions or unknown user needs are involved"],
      beforeActing: ["../../../strategy/product/knowledge/brief.md", "../../product-ops/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/accessibility.md", "../knowledge/user-flows.md"],
      skills: ["user-research", "user-flow-mapping"],
      playbooks: ["user-research", "mvp-ux-flow"]
    },
    {
      slug: "product-designer",
      title: "Product Designer",
      purpose: "Translate product, MVP and user context into coherent UI structure, flows and design system decisions.",
      useWhen: ["design foundation, UI, user flows, onboarding, layout, components or interaction design are involved"],
      beforeActing: ["../../../strategy/product/knowledge/brief.md", "../../product-ops/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/user-flows.md", "../knowledge/component-inventory.md"],
      skills: ["design-system", "user-flow-mapping", "component-analysis", "screen-specification", "design-review"],
      playbooks: ["design-foundation", "component-readiness", "mvp-ux-flow"]
    },
    {
      slug: "accessibility-specialist",
      title: "Accessibility Specialist",
      purpose: "Define and review accessibility expectations for the MVP audience, flows and interface constraints.",
      useWhen: ["accessibility, WCAG, keyboard navigation, contrast, screen readers or inclusive UX are involved"],
      beforeActing: ["../knowledge/accessibility.md", "../knowledge/design-system.md", "../knowledge/user-flows.md"],
      skills: ["accessibility", "design-review"],
      playbooks: ["accessibility-review"]
    },
    {
      slug: "ux-writer",
      title: "UX Writer",
      purpose: "Make interface language, labels, empty states, errors and onboarding copy clear and useful.",
      useWhen: ["microcopy, onboarding copy, labels, error messages, empty states or user guidance are involved"],
      beforeActing: ["../../../strategy/product/knowledge/brief.md", "../knowledge/user-flows.md", "../knowledge/accessibility.md"],
      skills: ["microcopy", "user-flow-mapping", "design-review"],
      playbooks: ["ux-writing"]
    }
  ],
  skills: [
    {
      slug: "user-research",
      title: "User Research",
      purpose: "Extract design-relevant user evidence, assumptions and open questions from Product and Validation context.",
      useWhen: ["user evidence is unclear", "research questions are needed", "design decisions depend on user behavior, pain or context"],
      requiredContext: ["Product brief", "ICP or target user", "Validation assumptions when available", "Existing user-flow knowledge"],
      inputs: ["User request", "Known evidence", "Known assumptions", "Open product or design questions"],
      process: ["Separate evidence from assumptions", "Identify user, behavior, pain and context", "Extract research questions", "Map evidence gaps", "Propose the smallest next research step"],
      checks: ["Do not treat hypotheses as facts", "Keep assumptions visibly tentative", "Make research questions specific enough to act on"],
      outputs: ["Evidence summary", "Assumption list", "Research questions", "Evidence gaps", "Smallest next research step"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only when confirmed design-relevant flow learning exists."],
      redLines: ["Do not invent user evidence", "Do not claim validation without evidence", "Ask before writing research conclusions to knowledge files."]
    },
    {
      slug: "user-flow-mapping",
      title: "User Flow Mapping",
      purpose: "Map the steps a user takes to reach the MVP outcome.",
      useWhen: ["a flow, onboarding path, task sequence or user journey needs definition", "an issue or feature has user-facing steps"],
      requiredContext: ["Product brief", "MVP scope", "User goal", "Existing user-flow knowledge"],
      inputs: ["Entry point", "User goal", "MVP scope", "Known constraints", "Success and failure conditions"],
      process: ["Map entry point", "Define user goal", "Map happy path steps", "Identify decisions, failures and edge cases", "Identify required screens", "Connect the flow to MVP scope"],
      checks: ["Avoid flows larger than the MVP", "Separate happy path from edge cases", "Flag missing product or design context"],
      outputs: ["Primary flow", "Steps", "Edge cases", "Required screens", "Open questions"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."],
      redLines: ["Do not invent screens outside the MVP", "Do not turn vague feature ideas into large product flows without confirmation."]
    },
    {
      slug: "design-system",
      title: "Design System",
      purpose: "Define MVP design tokens, visual rules, component expectations and interaction principles.",
      useWhen: ["the design foundation is being defined", "UI consistency, tokens, typography, spacing or component expectations are needed"],
      requiredContext: ["Product brief", "MVP scope", "Target user", "Existing design-system knowledge"],
      inputs: ["Brand or product constraints", "Audience needs", "Core flows", "Accessibility expectations"],
      process: ["Define minimum tokens", "Define color intent", "Define typography", "Define spacing", "Define component expectations", "Define interaction principles", "Record do and don't guidance"],
      checks: ["Prioritize flow clarity before visual polish", "Keep tokens minimal for the MVP", "Check design-system choices against accessibility needs"],
      outputs: ["Design-system baseline", "Token notes", "Typography notes", "Color intent", "Component expectations", "Do and don't guidance"],
      filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation."],
      redLines: ["Do not over-polish before user flow clarity", "Do not invent brand constraints", "Do not create a full design system when an MVP baseline is enough."]
    },
    {
      slug: "component-analysis",
      title: "Component Analysis",
      purpose: "Decide whether a Feature can reuse an existing component, adapt one or needs a new Design-owned component specification before Engineering starts.",
      useWhen: ["a Feature affects UI, reusable components, tables, forms, cards, navigation, panels, modals or repeated interface patterns", "Engineering may need a component before implementing a screen or Feature"],
      requiredContext: ["Feature or GitHub Feature issue", "Parent Epic when available", "Design system knowledge", "Accessibility knowledge", "User-flow knowledge", "Component inventory", "Component spec template"],
      inputs: ["Feature goal", "Required UI behavior", "Known screens or flows", "Existing component inventory", "Design-system constraints", "Accessibility needs"],
      process: ["Identify the UI surface involved in the Feature", "Check `../knowledge/component-inventory.md` for an approved or planned component", "Classify the decision as reuse, adapt, create-new, not-applicable or blocked", "If reuse is possible, name the component and any usage constraints", "If adaptation is needed, explain whether the change belongs in the reusable component or only in this Feature", "If a new component is needed, require a component spec before Engineering starts", "Use `../../../ai-standard/templates/design/component-spec-template.md` when drafting a new component contract"],
      checks: ["Do not create a new component when an approved one satisfies the need", "Do not adapt a component in a way that breaks existing usage", "Do not send Engineering to code a new user-facing component without a Design component spec", "Design and accessibility requirements are explicit before implementation"],
      outputs: ["Component decision: reuse, adapt, create-new, not-applicable or blocked", "Recommended component", "Required component spec", "Accessibility notes", "Engineering handoff notes", "Open questions"],
      filesToUpdate: ["Update `../knowledge/component-inventory.md` only after explicit confirmation.", "Create or update a concrete component spec only when a real Feature requires it and the user confirms."],
      redLines: ["Do not invent component availability", "Do not create component specs for hypothetical future UI", "Do not let Engineering implement a new user-facing component from vague design notes."]
    },
    {
      slug: "screen-specification",
      title: "Screen Specification",
      purpose: "Define screen purpose, content, states, interactions and engineering handoff notes when a concrete screen exists.",
      useWhen: ["a concrete screen, view, form, modal or page needs definition", "Engineering needs implementation-ready UI details"],
      requiredContext: ["Product brief", "MVP scope", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
      inputs: ["Screen purpose", "User goal", "Required content", "Primary and secondary actions", "Validation rules", "Known constraints"],
      process: ["Define screen purpose", "Define user goal", "Structure content", "Define primary and secondary actions", "Define validation and errors", "Define default, loading, empty, error, success and edge-case states", "Add accessibility notes", "Add engineering handoff notes"],
      checks: ["Every screen state has a user outcome", "Errors are actionable", "The screen maps to an MVP flow", "Engineering handoff notes avoid visual ambiguity"],
      outputs: ["Screen purpose", "Content structure", "Actions", "Validation and error rules", "Default/loading/empty/error/success states", "Accessibility notes", "Engineering handoff notes"],
      filesToUpdate: ["Do not create screen-specific files until a concrete feature or screen requires them.", "Update issue or implementation notes only after confirmation."],
      redLines: ["Do not invent screens without a concrete feature or flow", "Do not skip loading, empty, error or success states when they are relevant."]
    },
    {
      slug: "microcopy",
      title: "Microcopy",
      purpose: "Write clear interface copy, labels, helper text, empty states and error messages.",
      useWhen: ["labels, helper text, empty states, errors, success messages and onboarding hints need definition"],
      requiredContext: ["Product positioning", "User-flow knowledge", "Accessibility knowledge", "Target user context"],
      inputs: ["User goal", "Screen or flow context", "Tone expectations", "Error or success condition", "Accessibility constraints"],
      process: ["Identify the user-facing moment", "Draft labels and helper text", "Draft empty, error and success messages", "Add onboarding hints when needed", "Check tone, clarity and accessibility of language"],
      checks: ["Use clear language", "Avoid clever copy that reduces comprehension", "Make errors actionable", "Avoid jargon unless the target user expects it"],
      outputs: ["Labels", "Helper text", "Empty states", "Errors", "Success messages", "Onboarding hints", "Tone notes"],
      filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."],
      redLines: ["Do not invent product promises", "Do not hide important constraints in friendly copy", "Ask before changing persistent copy guidance."]
    },
    {
      slug: "accessibility",
      title: "Accessibility",
      purpose: "Define accessibility expectations based on the MVP audience, context and product constraints.",
      useWhen: ["accessibility baseline, keyboard navigation, focus, contrast, forms, errors or screen-reader implications are involved"],
      requiredContext: ["MVP audience", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
      inputs: ["Target user context", "Core flows", "UI states", "Forms and errors", "Motion or interaction patterns"],
      process: ["Use WCAG 2.2 AA as the baseline", "Review keyboard navigation", "Review focus states", "Review color contrast", "Review labels and instructions", "Review error identification", "Review screen-reader implications", "Review reduced-motion needs", "Identify when human accessibility review is required"],
      checks: ["Keyboard-only users can complete critical flows", "Focus order is logical", "Contrast intent is sufficient", "Forms and errors are identifiable", "Screen-reader implications are noted"],
      outputs: ["Accessibility baseline", "WCAG 2.2 AA notes", "Keyboard and focus notes", "Contrast notes", "Form and error notes", "Screen-reader notes", "Human review requirement"],
      filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."],
      redLines: ["Do not claim full accessibility compliance without expert validation", "Do not waive accessibility without a documented reason", "Ask for human accessibility review when risk is high."]
    },
    {
      slug: "design-review",
      title: "Design Review",
      purpose: "Evaluate UX and design impact in issues, PRs, screens, flows or product decisions.",
      useWhen: ["an issue, PR, flow, screen or decision may affect user-facing UX", "Design may be not applicable and needs explicit classification"],
      requiredContext: ["Issue, PR, flow or decision context", "MVP scope", "Design-system knowledge", "User-flow knowledge", "Accessibility knowledge when relevant"],
      inputs: ["Changed behavior", "User-facing impact", "Acceptance criteria", "Design context", "Accessibility context", "Microcopy context when relevant"],
      process: ["Classify Design result as pass, concerns, blocked or not applicable", "Review flow clarity", "Review visual hierarchy", "Check consistency with design system", "Check MVP alignment", "Check user friction", "Check basic accessibility", "Check microcopy when relevant", "List usability risks"],
      checks: ["Design is marked not applicable only when there is no user-facing UX impact", "Findings are ordered by severity", "Risks are tied to user outcomes", "Next action is explicit"],
      outputs: ["Design result: pass, concerns, blocked or not applicable", "Findings ordered by severity", "MVP alignment", "Usability risk", "Accessibility risk", "Microcopy risk", "Recommended next action"],
      filesToUpdate: ["Update review notes, PR notes or issue criteria only after explicit confirmation."],
      redLines: ["Do not approve UX without enough context", "Do not block work for polish-only concerns", "Do not apply Design when it is truly not applicable."]
    }
  ],
  playbooks: [
    {
      slug: "design-foundation",
      title: "Design Foundation",
      purpose: "Create the MVP design foundation from product strategy and MVP scope before implementation.",
      inputs: ["Product brief", "ICP", "MVP scope", "Primary user flows", "Accessibility needs", "Brand or product constraints", "Skills: design-system, accessibility, user-flow-mapping"],
      steps: ["Read Product and MVP context", "Use `skills/design-system/SKILL.md` to define the design system baseline", "Use `skills/accessibility/SKILL.md` to define accessibility expectations for the MVP audience", "Use `skills/user-flow-mapping/SKILL.md` to map primary user flows", "Identify missing context", "Propose updates to Design knowledge files before writing"],
      outputs: ["Design system baseline", "Accessibility baseline", "Primary user flows", "Open questions", "Confirmation question before file updates"],
      filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation.", "Update `../knowledge/accessibility.md` only after explicit confirmation.", "Update `../knowledge/user-flows.md` only after explicit confirmation."]
    },
    {
      slug: "component-readiness",
      title: "Component Readiness",
      purpose: "Prepare a Design component decision or component spec when a Feature needs UI/component clarity before Engineering.",
      inputs: ["Feature or GitHub Feature issue", "Parent Epic when available", "Design system knowledge", "Accessibility knowledge", "User-flow knowledge", "Component inventory", "Template: ../../../ai-standard/templates/design/component-spec-template.md", "Skill: component-analysis"],
      steps: ["Read the Feature goal, acceptance criteria and UI impact.", "Read `../knowledge/design-system.md`, `../knowledge/accessibility.md`, `../knowledge/user-flows.md` and `../knowledge/component-inventory.md`.", "Use `skills/component-analysis/SKILL.md` to classify reuse, adapt, create-new, not-applicable or blocked.", "If reuse is enough, document the chosen component and usage notes.", "If adaptation is needed, define what changes and who must approve them.", "If a new component is needed, use `../../../ai-standard/templates/design/component-spec-template.md` to draft the component contract.", "Update `../knowledge/component-inventory.md` after confirmation.", "Return the Design readiness result to Product Ops and Engineering."],
      securityGate: ["Stop if accessibility, focus, keyboard behavior, contrast or error-state risk is unclear for a new user-facing component.", "Stop if the component would collect, display or modify sensitive user data and Security has not reviewed the relevant risk."],
      outputs: ["Component readiness result", "Reuse/adapt/create-new decision", "Component spec draft when required", "Inventory update proposal", "Engineering handoff notes", "Blocking gaps"],
      filesToUpdate: ["Update `../knowledge/component-inventory.md` only after explicit confirmation.", "Create or update `../knowledge/components/<component-name>.md` only for a real Feature after confirmation."],
      stopConditions: ["Stop if the Feature is hypothetical or not tied to a real delivery need.", "Stop if a new component is needed but the component spec cannot be drafted from available Product, Design and accessibility context.", "Stop before Engineering if the component decision is blocked or missing founder confirmation."]
    },
    {
      slug: "user-research",
      title: "User Research",
      purpose: "Clarify design-relevant user evidence before making UX decisions.",
      inputs: ["Product brief", "ICP", "Validation assumptions", "Known user behavior", "Open design questions", "Skill: user-research"],
      steps: ["Read product and validation context", "Use `skills/user-research/SKILL.md` to separate evidence from assumptions", "Identify design-relevant user needs", "Identify open research questions", "Recommend the smallest next research step"],
      outputs: ["User evidence summary", "Design assumptions", "Open research questions", "Recommended next step"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only when the user confirms a design-relevant flow change."]
    },
    {
      slug: "mvp-ux-flow",
      title: "MVP UX Flow",
      purpose: "Create a usable flow for the first validation cycle.",
      inputs: ["ICP", "MVP scope", "User-flow knowledge", "Accessibility baseline", "Skills: user-flow-mapping, screen-specification when a concrete screen exists"],
      steps: ["Read ICP and MVP scope", "Use `skills/user-flow-mapping/SKILL.md` to map the primary flow", "Check accessibility expectations", "Use `skills/screen-specification/SKILL.md` only when a concrete screen, page, form or modal needs definition", "Record proposed Design knowledge updates"],
      outputs: ["Primary UX flow", "Edge cases", "Required screens", "Screen-specification needs when applicable", "Open questions"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."]
    },
    {
      slug: "accessibility-review",
      title: "Accessibility Review",
      purpose: "Review design foundation or UX flow for accessibility expectations.",
      inputs: ["Accessibility knowledge", "Design system baseline", "User flows", "MVP audience and constraints", "Skills: accessibility, design-review when general UX evaluation is needed"],
      steps: ["Read accessibility baseline", "Use `skills/accessibility/SKILL.md` to check audience needs, keyboard, focus, contrast, forms, errors and screen-reader implications", "Use `skills/design-review/SKILL.md` when the request needs a broader UX/design result", "List accessibility gaps"],
      outputs: ["Accessibility review", "Gaps", "Required follow-up", "Not applicable notes when justified"],
      filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."]
    },
    {
      slug: "ux-writing",
      title: "UX Writing",
      purpose: "Define clear interface language for MVP flows.",
      inputs: ["Product positioning", "User flows", "Accessibility expectations", "Target user context", "Skill: microcopy"],
      steps: ["Read product and flow context", "Use `skills/microcopy/SKILL.md` to identify labels, helper text, empty states, errors, success messages and onboarding hints", "Draft concise copy", "Check clarity and accessibility", "List open copy questions"],
      outputs: ["Microcopy draft", "Tone notes", "Accessibility notes", "Open questions"],
      filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."]
    }
  ],
  commonPaths: [
    "Design foundation request: area lead `AGENT.md` -> role `roles/product-designer.role.md` -> skills `skills/design-system/SKILL.md`, `skills/accessibility/SKILL.md` and `skills/user-flow-mapping/SKILL.md` -> playbook `playbooks/design-foundation.playbook.md`.",
    "Component readiness request: area lead `AGENT.md` -> role `roles/product-designer.role.md` -> skill `skills/component-analysis/SKILL.md` -> playbook `playbooks/component-readiness.playbook.md`.",
    "Research request: area lead `AGENT.md` -> role `roles/ux-researcher.role.md` -> skill `skills/user-research/SKILL.md` -> playbook `playbooks/user-research.playbook.md`.",
    "Accessibility request: area lead `AGENT.md` -> role `roles/accessibility-specialist.role.md` -> skills `skills/accessibility/SKILL.md` and `skills/design-review/SKILL.md` when general UX evaluation is needed -> playbook `playbooks/accessibility-review.playbook.md`.",
    "UX writing request: area lead `AGENT.md` -> role `roles/ux-writer.role.md` -> skill `skills/microcopy/SKILL.md` -> playbook `playbooks/ux-writing.playbook.md`.",
    "Design review request: area lead `AGENT.md` -> role `roles/product-designer.role.md` or applicable specialist -> skill `skills/design-review/SKILL.md` -> output findings without creating a review playbook."
  ]
};
