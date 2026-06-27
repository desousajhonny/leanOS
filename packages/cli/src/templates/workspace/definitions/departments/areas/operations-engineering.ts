import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";

function implementationNotesKnowledge(): string {
  return `# Implementation Notes

## Purpose

Capture durable technical lessons learned during implementation so future model sessions can reuse decisions instead of rediscovering them.

Use this file for implementation memory, not delivery status.

## How To Use

- Add a note only when the decision or learning should survive the current session.
- Prefer concrete lessons tied to a Feature, PR, component, module or data change.
- Keep notes short enough for future agents to scan quickly.
- Do not duplicate PR status; use \`pr-log.md\` for PR/merge summaries.

## Current Technical Context

TBD

## Lessons Learned

| Date | Feature / PR | Lesson | Why It Matters | Reuse / Warning |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |

## Implementation Decisions

| Date | Feature / PR | Decision | Reason | Follow-up |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |

## Reusable Patterns

TBD

## Risks Or Technical Debt

TBD

## Do Not Use For

- PR status, merge status or founder testing results.
- Product scope decisions.
- Design component specs.
- Secrets, credentials or private customer data.
`;
}

function prLogKnowledge(): string {
  return `# PR Log

## Purpose

Keep a lightweight delivery log of PRs, reviews and merges so the founder and future agents can understand what shipped without rereading every code change.

Use this file for quick delivery summaries. Use \`implementation-notes.md\` for technical lessons learned.

## How To Use

- Add an entry after PR creation, review, founder testing or merge when a persistent record is useful.
- Keep each entry founder-readable.
- Link each PR back to its Feature or Epic when possible.
- Record risks accepted, test gaps and follow-ups clearly.

## PR Summary Log

| Date | PR | Feature / Epic | Status | What Shipped | Validation | Founder Testing | Follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## Latest Merge Summary

TBD

## Open Follow-Ups

TBD

## Do Not Use For

- Deep technical lessons learned.
- Product roadmap priority.
- Design specs.
- Secrets, credentials or private customer data.
`;
}

function engineeringCodeStandardsKnowledge(): string {
  return `# Code Standards

## Purpose

Define how Engineering should write maintainable code inside this product.

## Current State

TBD

## Existing Patterns First

TBD

## Modularization

TBD

## Component and Module Boundaries

TBD

## Naming

TBD

## Error Handling

TBD

## Configuration

TBD

## Do Not Do

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringImplementationRulesKnowledge(): string {
  return `# Implementation Rules

## Purpose

Define the non-negotiable engineering process before code changes start.

## Current State

TBD

## Required Context Before Coding

TBD

## Branch Rule

TBD

## Scope Control

TBD

## Design Dependency

TBD

## Security and Data Dependency

TBD

## Done Criteria

TBD

## Red Lines

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringComponentGuidelinesKnowledge(): string {
  return `# Component Guidelines

## Purpose

Define how Engineering should create, reuse and modify UI components.

## Current State

Component work is implementation work, but the component contract belongs to Design.

Engineering should implement a reusable component only when the Feature requires it and Design has confirmed the structure, behavior, states and accessibility expectations.

## Design Dependency

- Read the approved Design component spec before implementing a new user-facing component.
- If no spec exists and the Feature needs a new or adapted component, route back to Design component readiness before branch/code.
- Use \`../../design/knowledge/component-inventory.md\` to confirm whether a component already exists, is planned or needs a spec.
- Use \`../../design/knowledge/design-system.md\` and \`../../design/knowledge/accessibility.md\` as the baseline for visual and accessibility decisions.
- Do not replace Design decisions with improvised UI choices in code.

## Reuse Existing Components

- Prefer an approved existing component when it satisfies the Feature.
- Adapt an existing component only when the change preserves current usage and Design confirms the adaptation.
- Create a new component only when reuse/adaptation is insufficient and the component spec is approved.
- If a component appears duplicated, stop and explain the reuse conflict before coding.

## Component Boundaries

- Implement reusable component behavior before the screen or Feature that consumes it.
- Keep reusable component behavior separate from one-off screen workflow logic.
- Keep data fetching, persistence, permissions and business rules outside the reusable UI component when practical.
- Keep component APIs small, explicit and aligned with existing repository patterns.

## State and Effects

- Validate required states before moving to the dependent screen or Feature.
- Cover default, loading, empty, error, success, disabled and focus states when applicable.
- Keep side effects predictable and local to the correct layer.
- Do not hide missing states behind generic fallback UI.

## Styling

- Use Design tokens, theme utilities or existing styling conventions before adding new values.
- Do not hardcode colors, spacing, typography or copy that should come from Design, tokens, data or configuration.
- Keep styling composable and consistent with nearby components.

## Accessibility States

- Validate keyboard navigation and focus behavior for interactive components.
- Respect labels, descriptions, error messages and screen reader notes from the component spec.
- Confirm contrast and disabled/loading/error states when applicable.
- Do not ship a component that traps focus, hides essential state or relies only on color.

## Do Not Do

- Do not create a new user-facing component without a Design spec or explicit Design confirmation.
- Do not implement a screen first when a reusable component must be built first.
- Do not mix one-off Feature logic into a reusable component when a clean boundary is practical.
- Do not bypass tests, examples, stories or manual validation notes for states and accessibility.

## Decisions

- Component implementation decisions may be recorded in \`implementation-notes.md\` after confirmation.
- Design specs and component inventory are Design-owned; route back to Design before changing them.

## Open Questions

- Which repository pattern should new reusable components follow?
- Which validation surface exists in this repo: tests, Storybook, examples, screenshots or manual QA?
- Does this Feature need a reusable component or a one-off screen pattern?

## Next Update

Update this file only when the framework-level Engineering component rules change.
`;
}

function engineeringDataGuidelinesKnowledge(): string {
  return `# Data Guidelines

## Purpose

Define how Engineering should handle database, API, persistence and data-sensitive changes.

## Current State

TBD

## Schema Changes

TBD

## Migrations

TBD

## Validation

TBD

## Sensitive Data

TBD

## Indexes and Performance

TBD

## Backward Compatibility

TBD

## Rollback

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringTestingStrategyKnowledge(): string {
  return `# Testing Strategy

## Purpose

Define how Engineering should choose and explain tests for implementation work.

## Current State

TBD

## Unit Tests

TBD

## Integration Tests

TBD

## End-to-End Tests

TBD

## Manual Validation

TBD

## Regression Checks

TBD

## Test Gaps

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringReviewCriteriaKnowledge(): string {
  return `# Review Criteria

## Purpose

Define how Engineering reviews implementation, tests, risk and PR readiness.

## Current State

TBD

## Scope Review

TBD

## Code Review

TBD

## Test Review

TBD

## Design Review

TBD

## Security Review

TBD

## Data Review

TBD

## Merge Recommendation

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export const operationsEngineeringArea: AreaDefinition = {
  key: "operations.engineering",
  root: "operations",
  slug: "engineering",
  name: "Engineering",
  path: "operations/engineering",
  lead: {
    title: "Engineering Lead",
    purpose: "Route implementation, branch, testing, data-change, PR and review work while enforcing Engineering red lines before code changes."
  },
  routingKey: "engineering",
  requestTypes: "code, implementation, bugs, tests, issues or pull requests",
  purpose: "Own implementation, tests, code quality and PR readiness.",
  whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "write tests", "work on a local Feature or mapped GitHub issue"],
  operatingRules: [
    "Read the Feature or mapped GitHub issue, PRD, MVP scope and acceptance criteria before planning implementation.",
    "Create or confirm a Feature-linked branch before changing code.",
    "Follow existing repository patterns before introducing new abstractions.",
    "Route user-facing UI work through Design when the design foundation or flow is missing.",
    "Read the approved Design component spec before implementing a new reusable component.",
    "Implement reusable component work before the screen or Feature that depends on it.",
    "Route data, auth, permissions, privacy, abuse or compliance work through Security when risk is present.",
    "Use `.github/leanos/branch-rules.md` and `.github/PULL_REQUEST_TEMPLATE.md` for branch and PR conventions.",
    "For implementation work that arrives from `feature-to-delivery-cycle`, route to Senior Developer and use `playbooks/engineering-delivery.playbook.md` as the master execution path before sub-playbooks."
  ],
  redLines: [
    "Do not implement outside the confirmed Feature or PRD scope.",
    "Do not create new user-facing components before Design defines the structure or confirms the component spec.",
    "Do not hardcode secrets, configuration, business rules, copy or design values.",
    "Do not create large unstructured files, components or functions when modular composition is possible.",
    "Do not make destructive data or migration changes without explicit confirmation and rollback notes.",
    "Do not open or recommend a PR without tests, manual validation notes or a clear test-gap explanation."
  ],
  sourceOfTruth: ["knowledge/code-standards.md", "knowledge/implementation-rules.md", "knowledge/component-guidelines.md", "knowledge/data-guidelines.md", "knowledge/testing-strategy.md", "knowledge/review-criteria.md", "knowledge/implementation-notes.md", "knowledge/code-review-notes.md", "knowledge/pr-log.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Engineering Knowledge", "Durable Engineering rules, standards and implementation notes.", "Use before planning code changes, branch work, tests, PRs or reviews.", "implementation-rules.md", ["code-standards.md", "implementation-rules.md", "component-guidelines.md", "data-guidelines.md", "testing-strategy.md", "review-criteria.md", "implementation-notes.md", "code-review-notes.md", "pr-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product-ops/mvp/", "../../../.github/leanos/"], "Engineering knowledge defines how code should be changed. It does not replace issue scope, PRD, Design or Security review.") },
    { path: "knowledge/code-standards.md", content: engineeringCodeStandardsKnowledge },
    { path: "knowledge/implementation-rules.md", content: engineeringImplementationRulesKnowledge },
    { path: "knowledge/component-guidelines.md", content: engineeringComponentGuidelinesKnowledge },
    { path: "knowledge/data-guidelines.md", content: engineeringDataGuidelinesKnowledge },
    { path: "knowledge/testing-strategy.md", content: engineeringTestingStrategyKnowledge },
    { path: "knowledge/review-criteria.md", content: engineeringReviewCriteriaKnowledge },
    { path: "knowledge/implementation-notes.md", content: implementationNotesKnowledge },
    { path: "knowledge/code-review-notes.md", content: () => stateDraft("Code Review Notes", "Capture review observations and risks.") },
    { path: "knowledge/pr-log.md", content: prLogKnowledge }
  ],
  roles: [
    {
      slug: "senior-developer",
      title: "Senior Developer",
      purpose: "Implement ready Features with maintainable code, tests and MVP alignment.",
      useWhen: ["implement a Feature", "fix a bug", "modify code", "write tests", "prepare implementation for a PR"],
      beforeActing: ["../../../.leanos/context/current-focus.md", "../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/knowledge/issue-readiness.md", "../knowledge/implementation-rules.md", "../knowledge/code-standards.md", "../knowledge/component-guidelines.md", "../knowledge/data-guidelines.md", "../knowledge/testing-strategy.md", "../../../.github/leanos/branch-rules.md", "../knowledge/implementation-notes.md"],
      skills: ["plan-implementation", "follow-code-standards", "implement-component", "create-branch", "write-tests", "review-data-change", "create-pr"],
      playbooks: ["engineering-delivery", "branch-for-feature", "component-implementation", "prepare-pr", "test-planning", "pr-validation"]
    },
    {
      slug: "test-engineer",
      title: "Test Engineer",
      purpose: "Plan and evaluate validation coverage for implementation work.",
      useWhen: ["test coverage is unclear", "acceptance criteria need validation mapping", "risk-based test planning is needed", "test gaps must be explained"],
      beforeActing: ["../knowledge/testing-strategy.md", "../knowledge/implementation-rules.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/mvp/prd.md"],
      skills: ["write-tests", "review-pr"],
      playbooks: ["test-planning", "pr-validation"]
    },
    {
      slug: "pr-reviewer",
      title: "PR Reviewer",
      purpose: "Review pull requests against scope, tests, coherence and validation goals.",
      useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
      beforeActing: ["../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../knowledge/review-criteria.md", "../knowledge/code-standards.md", "../knowledge/data-guidelines.md", "../../../.github/leanos/pr-validation-rules.md", "../../../ai-standard/templates/review/code-review-template.md"],
      skills: ["review-pr", "follow-code-standards", "review-data-change"],
      playbooks: ["pr-validation"]
    }
  ],
  skills: [
    {
      slug: "plan-implementation",
      title: "Plan Implementation",
      purpose: "Turn a ready Feature into a scoped technical implementation plan before code changes.",
      useWhen: ["a local Feature or mapped GitHub issue should be implemented", "a bug fix needs scope", "implementation work needs sequencing"],
      requiredContext: ["Feature body or mapped GitHub issue body", "PRD", "MVP scope", "Acceptance criteria", "Engineering implementation rules", "Code standards"],
      inputs: ["Feature", "Linked Epic or PRD", "Acceptance criteria", "Current repository patterns", "Known risks"],
      process: ["Summarize the Feature in the chat", "Identify files or modules likely involved", "Classify Design, Security and data impact", "Plan the smallest safe implementation steps", "Identify tests and validation", "Ask for confirmation before code changes when scope is unclear"],
      checks: ["Implementation plan stays inside Feature scope", "Existing repository patterns are preferred", "Dependencies and risks are explicit", "Design/Security/Data routing is explicit when applicable"],
      outputs: ["Feature summary", "Implementation plan", "Files likely involved", "Tests to run or add", "Risks", "Confirmation question when needed"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` only when implementation decisions should persist."],
      redLines: ["Do not begin code changes without branch context", "Do not expand scope silently", "Do not skip Design/Security/Data classification."]
    },
    {
      slug: "follow-code-standards",
      title: "Follow Code Standards",
      purpose: "Apply project coding standards, modularity, naming and hardcoding rules.",
      useWhen: ["writing or reviewing code", "choosing a pattern", "splitting files or components", "deciding whether to introduce a new abstraction"],
      requiredContext: ["Code standards", "Implementation rules", "Existing repository patterns"],
      inputs: ["Target code area", "Existing files", "Proposed change", "Known project conventions"],
      process: ["Inspect nearby patterns", "Choose the smallest matching pattern", "Separate UI, state, data access, validation and side effects where practical", "Avoid hardcoded secrets/config/copy/design values", "Keep functions and components focused", "Document any intentional deviation"],
      checks: ["No unnecessary new abstraction", "No large unstructured component or file", "No hidden business rule", "No duplicated logic when a local reusable pattern exists"],
      outputs: ["Pattern decision", "Modularity notes", "Hardcoding risks", "Refactor or no-refactor recommendation"],
      filesToUpdate: ["Update `../knowledge/code-standards.md` only when the user confirms a durable standard change."],
      redLines: ["Do not invent architecture that the repo does not need", "Do not hardcode values that belong in config, data, design tokens or copy sources."]
    },
    {
      slug: "implement-component",
      title: "Implement Component",
      purpose: "Implement reusable UI components from a Design component spec before dependent screen or Feature work.",
      useWhen: ["a Feature requires a new user-facing component", "Design has produced or confirmed a component spec", "a screen depends on a reusable component that does not exist yet", "component behavior, states or accessibility must be implemented before feature delivery"],
      requiredContext: ["Feature or GitHub Feature issue", "Design component spec", "Design component inventory", "Design system", "Accessibility baseline", "Engineering component guidelines", "Code standards", "Testing strategy"],
      inputs: ["Approved component spec", "Parent Feature acceptance criteria", "Existing component patterns", "Design tokens", "Accessibility requirements", "Expected states", "Repository UI conventions"],
      process: ["Read the Feature and confirm why the component is needed", "Read the component spec from Design before changing code", "Check `../../design/knowledge/component-inventory.md` and nearby code for an existing reusable component", "Load `../../design/knowledge/design-system.md`, `../../design/knowledge/accessibility.md` and `../knowledge/component-guidelines.md`", "Implement the reusable component before the screen or Feature that consumes it", "Keep styling, copy, variants, states and accessibility aligned with the Design contract", "Separate reusable component behavior from one-off screen logic", "Add tests, examples, stories or manual validation notes when the repository supports them"],
      checks: ["Component follows the Design spec", "Design tokens and accessibility requirements are respected", "No duplicate component already exists", "Component is reusable and composable", "Required states are handled", "Feature-specific workflow logic is kept outside the reusable component", "Tests or validation gaps are explicit"],
      outputs: ["Component implementation plan", "Files changed", "States covered", "Accessibility notes", "Tests or manual validation", "Known gaps", "Next screen or Feature implementation step"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` when component implementation decisions should persist.", "Do not update Design component specs unless routed back to Design and confirmed by the user."],
      redLines: ["Do not implement a new user-facing component without a Design spec or explicit Design confirmation", "Do not hardcode colors, spacing, copy, business rules or states that belong in Design, data or configuration", "Do not mix reusable component code with one-off screen behavior when separation is practical", "Do not bypass accessibility states, keyboard behavior or focus requirements."]
    },
    {
      slug: "create-branch",
      title: "Create Branch",
      purpose: "Define a safe Feature-linked branch name and creation checklist before code changes.",
      useWhen: ["implementation is about to start", "a local Feature or mapped GitHub issue has been selected", "branch naming needs validation"],
      requiredContext: ["Local Feature slug or GitHub issue number", "Feature title", "Branch rules"],
      inputs: ["Feature slug or issue number", "Feature title", "Branch type", "Existing branch names when available"],
      process: ["Load branch rules", "Generate a Feature-linked branch name", "Use `feature/...` for local-only Features and `issue/...` for mapped GitHub issues", "Keep the branch name short and descriptive", "Check for conflicting branch names", "Ask before reusing or replacing a branch"],
      checks: ["Branch includes the issue number when available", "Branch uses the Feature slug when no issue number exists", "Branch name does not include secrets or vague wording", "Branch matches repository convention"],
      outputs: ["Proposed branch name", "Branch command or plan", "Safety notes"],
      filesToUpdate: ["Do not update files just to create a branch plan."]
    },
    {
      slug: "write-tests",
      title: "Write Tests",
      purpose: "Define or update tests for changed behavior.",
      useWhen: ["behavior changes", "bug fixes need regression coverage", "acceptance criteria require validation", "PR test gaps need explanation"],
      requiredContext: ["Testing strategy", "Acceptance criteria", "Changed behavior", "Known risks"],
      inputs: ["Implementation scope", "Changed behavior", "Acceptance criteria", "Existing test patterns"],
      process: ["Identify behavior under test", "Choose unit, integration, e2e or manual validation", "Map tests to acceptance criteria", "Add regression coverage for bugs", "List test gaps honestly"],
      checks: ["Tests prove behavior, not implementation details", "Risky behavior has coverage or an explicit gap", "Manual checks are concrete"],
      outputs: ["Test plan", "Test changes", "Manual validation", "Known gaps"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` only when persistent testing decisions are useful."]
    },
    {
      slug: "review-data-change",
      title: "Review Data Change",
      purpose: "Review database, API, persistence, migration and data-sensitive changes before implementation or PR approval.",
      useWhen: ["data model, migration, API contract, persistence, auth, permissions, privacy or sensitive data is involved"],
      requiredContext: ["Data guidelines", "Security context when sensitive data is involved", "Acceptance criteria", "Current schema or API patterns"],
      inputs: ["Proposed data change", "Data sensitivity", "Migration needs", "Rollback expectation", "Compatibility requirements"],
      process: ["Classify data sensitivity", "Identify schema or API impact", "Check validation and authorization", "Check migration and rollback implications", "Check index/performance needs", "Route to Security when privacy/auth/compliance risk exists"],
      checks: ["No destructive change without confirmation", "No sensitive data exposure", "Backward compatibility is considered", "Rollback path is visible"],
      outputs: ["Data-change review", "Risks", "Migration notes", "Security routing result", "Rollback notes"],
      filesToUpdate: ["Update `../knowledge/data-guidelines.md` only after explicit confirmation."]
    },
    {
      slug: "create-pr",
      title: "Create PR",
      purpose: "Prepare a PR summary tied to issue scope, tests and review criteria.",
      useWhen: ["implementation is ready for review", "PR description needs structure", "merge risk needs communication"],
      requiredContext: ["PR template", "Linked issue", "Implementation notes", "Tests run", "Known risks", "Founder Testing Guide requirements"],
      inputs: ["Branch", "Linked issue", "Changed files", "Tests", "Risks", "Screenshots or UX notes when applicable", "Preview URL or local route when available"],
      process: ["Load PR template", "Summarize scope", "List implementation notes", "List tests and manual validation", "Write the Founder Testing Guide in plain language", "Include where to test, how to test and expected result", "Flag Design/Security/Data applicability", "List known risks and follow-up"],
      checks: ["PR references the issue", "Tests or gaps are explicit", "Founder Testing Guide is usable by a non-technical founder", "Description does not hide known risk"],
      outputs: ["PR title", "PR body", "Founder Testing Guide", "Test summary", "Risk notes"],
      filesToUpdate: ["Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record."]
    },
    {
      slug: "review-pr",
      title: "Review PR",
      purpose: "Review PR changes for correctness, scope and LeanOS coherence.",
      useWhen: ["review a PR", "validate implementation readiness", "check merge risk", "perform code review"],
      requiredContext: ["Review criteria", "PR validation rules", "Linked issue", "PRD", "Acceptance criteria", "Changed files"],
      inputs: ["PR description", "Diff", "Linked issue", "Tests", "Known risks"],
      process: ["Check scope against issue and PRD", "Review code standards", "Review tests", "Review Founder Testing Guide usability", "Review Design applicability", "Review Security/Data applicability", "List findings by severity", "Recommend merge, changes or blocked"],
      checks: ["Findings are actionable", "Severity is clear", "Founder can test the PR without reading code", "Design/Security/Data are not forced when not applicable", "Merge recommendation is justified"],
      outputs: ["Findings by severity", "Scope result", "Code result", "Founder acceptance result", "Test result", "Design result or not applicable", "Security/Data result or not applicable", "Merge recommendation"],
      filesToUpdate: ["Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes."]
    }
  ],
  playbooks: [
    {
      slug: "engineering-delivery",
      title: "Engineering Delivery",
      purpose: "Orchestrate the internal Engineering path from a ready Feature to branch, implementation, tests, PR and PR validation.",
      useWhen: ["a Feature has passed ready-to-develop", "implementation should begin", "Engineering needs the safe execution order", "the founder asks to implement a Feature"],
      beforeActing: ["../AGENT.md", "../../product-ops/knowledge/ready-to-develop.md", "../../product-ops/epics/README.md", "../knowledge/implementation-rules.md", "../knowledge/code-standards.md", "../knowledge/component-guidelines.md", "../knowledge/data-guidelines.md", "../knowledge/testing-strategy.md", "../../../.github/leanos/branch-rules.md", "../../../.github/leanos/pr-validation-rules.md"],
      inputs: ["Confirmed local Feature or mapped GitHub Feature issue", "Ready-to-develop result", "Parent Epic", "Acceptance criteria", "Design component spec when applicable", "Security and DevOps readiness when applicable", "Branch rules", "PR validation rules"],
      steps: [
        "Confirm the request is a ready Feature, not a loose idea, roadmap item or unsplit Epic",
        "Confirm Product Ops readiness from `../../product-ops/knowledge/ready-to-develop.md`",
        "Use `playbooks/branch-for-feature.playbook.md` before editing code",
        "Use `skills/plan-implementation/SKILL.md` to summarize the Feature, likely files, risks and tests",
        "If a new reusable component is required, confirm the approved Design component spec before code and run `playbooks/component-implementation.playbook.md` first",
        "Use `skills/follow-code-standards/SKILL.md` during implementation to preserve modularity, local patterns and no-hardcoding rules",
        "Use `skills/review-data-change/SKILL.md` when data, API, persistence, auth, permissions or privacy are involved",
        "Use `skills/write-tests/SKILL.md` to add or update tests, or explain the test gap clearly",
        "Use `playbooks/prepare-pr.playbook.md` to prepare PR scope, test notes, risks, Founder Testing Guide and screenshots or UX notes when applicable",
        "Use `playbooks/pr-validation.playbook.md` before recommending merge readiness"
      ],
      gates: [
        "Do not edit code before a Feature-linked branch is created or confirmed.",
        "Do not implement a new user-facing component without an approved Design component spec when component readiness is applicable.",
        "Do not open or prepare a PR without tests, manual validation notes or a clear test-gap explanation.",
        "Do not mark a PR ready for founder review without a Founder Testing Guide that explains where and how to test the change.",
        "Do not recommend merge before `playbooks/pr-validation.playbook.md` is complete.",
        "Do not expand beyond the confirmed Feature scope without founder confirmation."
      ],
      securityGate: [
        "Stop before implementation when Security triggers apply and no Security readiness exists.",
        "Stop before data migration, destructive data changes or permission changes without explicit confirmation and rollback notes.",
        "Do not commit secrets, tokens, credentials or sensitive customer data."
      ],
      outputs: ["Branch name and branch status", "Implementation plan", "Files changed", "Component implementation summary when applicable", "Tests run or test-gap explanation", "PR draft summary", "Founder Testing Guide", "PR validation result", "Remaining risks and next step"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` when implementation decisions should persist.", "Update `../knowledge/pr-log.md` after PR creation or when the user asks for persistent PR records."],
      stopConditions: [
        "Feature readiness is missing or blocked.",
        "No Feature-linked branch can be created or confirmed.",
        "A required Design component spec is missing.",
        "Security or DevOps readiness is required and missing.",
        "The implementation would exceed the confirmed Feature scope.",
        "Tests cannot be run and no useful manual validation can be described.",
        "PR validation finds blocking risk."
      ]
    },
    {
      slug: "branch-for-feature",
      title: "Branch For Feature",
      purpose: "Create a safe branch plan before implementation starts.",
      inputs: ["Local Feature slug or GitHub issue number", "Feature title", "Current default branch", "Existing branch list when available", "Branch rules", "Skill: create-branch"],
      steps: ["Use this as the branch step of `engineering-delivery.playbook.md`; return to engineering-delivery after branch status is clear", "Read the Feature context and title", "Load `.github/leanos/branch-rules.md`", "Use `skills/create-branch/SKILL.md` to generate a branch name using the required Feature/GitHub branch format", "Use `feature/...` for local-only Features and `issue/...` for mapped GitHub issues", "Check for sensitive words or unnecessary scope", "Ask before using an existing branch or creating a new one"],
      outputs: ["Proposed branch name", "Linked Feature or GitHub issue", "Branch safety notes", "Next implementation step"],
      filesToUpdate: ["Do not update files just to create a branch plan. Record branch decisions in `../knowledge/implementation-notes.md` only when the user asks for persistent notes."]
    },
    {
      slug: "component-implementation",
      title: "Component Implementation",
      purpose: "Implement a reusable component from an approved Design spec before the screen or Feature that depends on it.",
      inputs: ["Feature or GitHub Feature issue", "Approved Design component spec", "Design component inventory", "Design system", "Accessibility baseline", "Engineering component guidelines", "Code standards", "Testing strategy", "Skill: implement-component"],
      steps: ["Use this as the component step of `engineering-delivery.playbook.md`; return to engineering-delivery before implementing the dependent screen or Feature", "Read Engineering AGENT and choose the Senior Developer role", "Read the Feature and confirm that a reusable component is required", "Load the Design component spec before changing code", "Load `../../design/knowledge/component-inventory.md`, `../../design/knowledge/design-system.md` and `../../design/knowledge/accessibility.md`", "Load `knowledge/component-guidelines.md`, `knowledge/code-standards.md` and `knowledge/testing-strategy.md`", "Use `skills/implement-component/SKILL.md` to plan component implementation", "Inspect existing component patterns before creating a new file", "Create or confirm a Feature-linked branch before editing code", "Implement the reusable component before the screen or Feature that consumes it", "Validate required states, keyboard behavior, focus behavior and accessibility notes", "Add tests, examples, stories or manual validation notes when the repository supports them", "Summarize component readiness before continuing to the dependent screen or Feature"],
      outputs: ["Component implementation plan", "Branch used", "Files changed", "States implemented", "Accessibility validation", "Tests or manual validation", "Known gaps", "Decision to continue to screen or Feature implementation"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` when component implementation decisions should persist.", "Do not update Design component specs unless routed back to Design and confirmed by the user."]
    },
    {
      slug: "prepare-pr",
      title: "Prepare PR",
      purpose: "Prepare a reviewable pull request from a confirmed Feature implementation.",
      inputs: ["GitHub issue body", "Parent epic when available", "MVP scope", "PRD", "Acceptance criteria", "Product, Design, Engineering and Security criteria", "Branch name", "Engineering knowledge"],
      steps: ["Use this as the PR preparation step of `engineering-delivery.playbook.md`; do not use it before implementation and test status are clear", "Read Engineering AGENT and choose the Senior Developer role", "Read Feature or mapped GitHub issue, PRD, MVP scope and acceptance criteria", "Confirm Feature readiness with Product and Engineering criteria", "Check whether Design criteria are required for user-facing UX", "Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance", "Create or confirm a Feature-linked branch before code changes", "Use `skills/plan-implementation/SKILL.md` to plan implementation", "Run `playbooks/component-implementation.playbook.md` before screen or Feature work when a new reusable component is required", "Use `skills/follow-code-standards/SKILL.md` while changing code", "Use `skills/review-data-change/SKILL.md` when data/API/persistence is involved", "Use `skills/write-tests/SKILL.md` to update tests or explain gaps", "Use `skills/create-pr/SKILL.md` to prepare PR using the PR template", "Fill the `Founder Testing Guide` with plain-language steps, where to test, expected result, out-of-scope notes and known limits", "If there is no preview URL, provide the local route, command or manual fallback the founder can realistically use"],
      outputs: ["Implementation summary", "Branch used", "Files changed", "Tests run or proposed", "Founder Testing Guide", "PR draft", "Known risks"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` when implementation decisions should persist.", "Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record."]
    },
    {
      slug: "test-planning",
      title: "Test Planning",
      purpose: "Plan validation for implementation work without storing procedural test instructions as loose area files.",
      inputs: ["Implementation scope", "PRD", "Acceptance criteria", "Changed behavior", "Known risks", "Testing strategy", "Skill: write-tests"],
      steps: ["Read `knowledge/testing-strategy.md`", "Identify changed behavior", "Use `skills/write-tests/SKILL.md` to choose automated and manual validation", "Map tests to acceptance criteria", "Identify risky gaps", "Summarize validation readiness"],
      outputs: ["Test strategy", "Validation gaps", "Manual checks", "Next action"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` or PR notes if the workspace needs a persistent test decision."]
    },
    {
      slug: "pr-validation",
      title: "PR Validation",
      purpose: "Validate implementation before merge.",
      inputs: ["PR description", "Linked issue", "Parent epic when available", "MVP scope", "PRD", "Acceptance criteria", "Changed files", "Tests or validation evidence", "Founder Testing Guide", "Review criteria"],
      steps: ["Use this as the final validation step of `engineering-delivery.playbook.md`; do not recommend merge before this review is complete", "Read Engineering AGENT and choose PR Reviewer or Test Engineer as needed", "Read PR context", "Load `.github/leanos/pr-validation-rules.md` and `knowledge/review-criteria.md`", "Use `skills/review-pr/SKILL.md` to check scope against issue, PRD and MVP", "Use `skills/follow-code-standards/SKILL.md` to check code quality", "Use `skills/review-data-change/SKILL.md` when data/API/persistence is involved", "Validate Product criteria and acceptance criteria", "Review the Founder Testing Guide and confirm a non-technical founder can test the PR", "Review Design criteria only when UX changed", "Review Security criteria only when data, auth, privacy, abuse or compliance is involved", "Review tests and manual validation", "List findings by severity", "Recommend merge, changes or blocked-by-context"],
      outputs: ["Findings by severity", "Product alignment", "Code quality result", "Founder acceptance result", "Design review result or not applicable", "Security/Data review result or not applicable", "Test confidence", "Merge recommendation"],
      filesToUpdate: ["Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes."]
    }
  ],
  commonPaths: [
    "Branch request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/create-branch/SKILL.md` -> playbook `playbooks/branch-for-feature.playbook.md`.",
    "Component implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/implement-component/SKILL.md` -> playbook `playbooks/component-implementation.playbook.md`.",
    "Implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> playbook `playbooks/engineering-delivery.playbook.md` -> sub-playbooks `playbooks/branch-for-feature.playbook.md`, conditional `playbooks/component-implementation.playbook.md`, `playbooks/prepare-pr.playbook.md` and `playbooks/pr-validation.playbook.md`.",
    "Data change request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` or `roles/pr-reviewer.role.md` -> skill `skills/review-data-change/SKILL.md` -> route Security when sensitive risk exists.",
    "Test request: area lead `AGENT.md` -> role `roles/test-engineer.role.md` -> skill `skills/write-tests/SKILL.md` -> playbook `playbooks/test-planning.playbook.md`.",
    "PR review request: area lead `AGENT.md` -> role `roles/pr-reviewer.role.md` -> skills `skills/review-pr/SKILL.md`, `skills/follow-code-standards/SKILL.md` and conditional `skills/review-data-change/SKILL.md` -> playbook `playbooks/pr-validation.playbook.md`."
  ]
};
