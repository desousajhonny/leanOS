import type { SkillDefinition } from "../../../../types.js";

export const operationsDesignSkills: SkillDefinition[] = [
    {
      slug: "user-research",
      title: "User Research",
      purpose: "Extract design-relevant user evidence, assumptions, confidence level and open questions from Product and Validation context.",
      useWhen: ["user evidence is unclear", "research questions are needed", "design decisions depend on user behavior, pain or context", "a design decision needs confidence or evidence-gap labeling"],
      requiredContext: ["Product brief", "ICP or target user", "Validation assumptions when available", "Existing user-flow knowledge", "Design decision being informed"],
      inputs: ["User request", "Known evidence", "Known assumptions", "Open product or design questions", "Decision that depends on evidence"],
      process: ["Separate evidence from assumptions", "Identify user, behavior, pain and context", "Classify evidence confidence as high, medium, low or assumption-only", "Extract research questions tied to design decisions", "Map evidence gaps and risky assumptions", "Propose the smallest next research step", "State which design decisions can proceed and which remain blocked"],
      checks: ["Do not treat hypotheses as facts", "Keep assumptions visibly tentative", "Evidence confidence matches the source quality", "Make research questions specific enough to act on", "Design recommendations do not outrun available evidence"],
      outputs: ["Evidence summary", "Evidence confidence", "Assumption list", "Research questions", "Evidence gaps", "Smallest next research step", "Design decision impact"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only when confirmed design-relevant flow learning exists."],
      redLines: ["Do not invent user evidence", "Do not claim validation without evidence", "Do not convert assumptions into design requirements without labeling confidence.", "Ask before writing research conclusions to knowledge files."]
    },
    {
      slug: "user-flow-mapping",
      title: "User Flow Mapping",
      purpose: "Map the steps a user takes to reach the MVP outcome and decide whether the flow is ready for screen/spec work.",
      useWhen: ["a flow, onboarding path, task sequence or user journey needs definition", "an issue or feature has user-facing steps", "a flow needs pass/blocked/not-applicable classification before Engineering"],
      requiredContext: ["Product brief", "MVP scope", "User goal", "Existing user-flow knowledge", "Entry point and success outcome"],
      inputs: ["Entry point", "User goal", "MVP scope", "Known constraints", "Success and failure conditions", "Actor and permission context"],
      process: ["Map entry point", "Define user goal and success outcome", "Map happy path steps", "Identify decisions, failures and edge cases", "Identify required screens and reusable components", "Connect the flow to MVP scope", "Mark Flow decision status as ready, concerns, blocked or not applicable"],
      checks: ["Avoid flows larger than the MVP", "Separate happy path from edge cases", "Flag missing product or design context", "Flow decision status matches missing entry point, actor, outcome or screen decisions"],
      outputs: ["Flow decision status", "Primary flow", "Steps", "Edge cases", "Required screens", "Component implications", "Open questions"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."],
      redLines: ["Do not invent screens outside the MVP", "Do not turn vague feature ideas into large product flows without confirmation.", "Do not hand off a blocked or assumption-only flow as implementation-ready."]
    },
    {
      slug: "design-system",
      title: "Design System",
      purpose: "Define MVP design tokens, visual rules, component expectations, interaction principles and readiness decision.",
      useWhen: ["the design foundation is being defined", "UI consistency, tokens, typography, spacing or component expectations are needed", "Engineering needs design-system constraints before UI work"],
      requiredContext: ["Product brief", "MVP scope", "Target user", "Existing design-system knowledge", "Accessibility baseline"],
      inputs: ["Brand or product constraints", "Audience needs", "Core flows", "Accessibility expectations", "Existing tokens or UI conventions"],
      process: ["Define minimum tokens", "Define color intent and accessibility constraints", "Define typography", "Define spacing", "Define component expectations", "Define interaction principles", "Record do and don't guidance", "Mark MVP design-system decision as ready, concerns, blocked or not applicable"],
      checks: ["Prioritize flow clarity before visual polish", "Keep tokens minimal for the MVP", "Check design-system choices against accessibility needs", "Design-system decision matches missing brand, accessibility or component constraints"],
      outputs: ["MVP design-system decision", "Design-system baseline", "Token notes", "Typography notes", "Color intent", "Component expectations", "Do and don't guidance"],
      filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation."],
      redLines: ["Do not over-polish before user flow clarity", "Do not invent brand constraints", "Do not create a full design system when an MVP baseline is enough.", "Do not approve tokens that conflict with accessibility constraints."]
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
      purpose: "Define implementation-ready screen purpose, content, states, interactions, accessibility and engineering handoff notes.",
      useWhen: ["a concrete screen, view, form, modal or page needs definition", "Engineering needs implementation-ready UI details", "screen readiness is uncertain before implementation"],
      requiredContext: ["Product brief", "MVP scope", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge", "Component analysis when reusable UI is involved"],
      inputs: ["Screen purpose", "User goal", "Required content", "Primary and secondary actions", "Validation rules", "Known constraints", "Component requirements"],
      process: ["Define screen purpose", "Define user goal and MVP flow mapping", "Structure content", "Define primary and secondary actions", "Define validation and errors", "Define default, loading, empty, error, success and edge-case states", "Add accessibility and focus notes", "Add component and engineering handoff notes", "Mark implementation readiness as ready, concerns, blocked or not applicable"],
      checks: ["Every screen state has a user outcome", "Errors are actionable", "The screen maps to an MVP flow", "Accessibility and focus expectations are visible", "Engineering handoff notes avoid visual ambiguity"],
      outputs: ["Implementation-ready screen spec", "Screen purpose", "Content structure", "Actions", "Validation and error rules", "Default/loading/empty/error/success states", "Accessibility notes", "Engineering handoff notes"],
      filesToUpdate: ["Do not create screen-specific files until a concrete feature or screen requires them.", "Update issue or implementation notes only after confirmation."],
      redLines: ["Do not invent screens without a concrete feature or flow", "Do not skip loading, empty, error or success states when they are relevant.", "Do not hand off a screen to Engineering without states, accessibility and unresolved questions made explicit."]
    },
    {
      slug: "microcopy",
      title: "Microcopy",
      purpose: "Write clear interface copy, labels, helper text, empty states and error messages with a copy decision status.",
      useWhen: ["labels, helper text, empty states, errors, success messages and onboarding hints need definition", "copy quality affects completion, trust or accessibility", "Engineering needs approved text for a concrete screen state"],
      requiredContext: ["Product positioning", "User-flow knowledge", "Accessibility knowledge", "Target user context"],
      inputs: ["User goal", "Screen or flow context", "Tone expectations", "Error or success condition", "Accessibility constraints", "Product promise or legal constraint"],
      process: ["Identify the user-facing moment and screen state", "Draft labels and helper text", "Draft empty, error and success messages", "Add onboarding hints when needed", "Check tone, clarity and accessibility of language", "Flag product promises, legal claims or unsupported guarantees", "Mark Copy decision status as ready, concerns, blocked or not applicable"],
      checks: ["Use clear language", "Avoid clever copy that reduces comprehension", "Make errors actionable", "Avoid jargon unless the target user expects it", "Copy decision status matches unresolved promise, tone or accessibility risks"],
      outputs: ["Copy decision status", "Labels", "Helper text", "Empty states", "Errors", "Success messages", "Onboarding hints", "Tone notes"],
      filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."],
      redLines: ["Do not invent product promises", "Do not hide important constraints in friendly copy", "Do not approve copy that makes unsupported guarantees or legal claims.", "Ask before changing persistent copy guidance."]
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
  ];
