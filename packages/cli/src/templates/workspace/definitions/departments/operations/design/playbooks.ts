import type { PlaybookDefinition } from "../../../../types.js";

export const operationsDesignPlaybooks: PlaybookDefinition[] = [
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
  ];
