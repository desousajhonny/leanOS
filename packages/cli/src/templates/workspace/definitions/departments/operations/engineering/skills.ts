import type { SkillDefinition } from "../../../../types.js";

export const operationsEngineeringSkills: SkillDefinition[] = [
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
      filesToUpdate: ["Do not update files just to create a branch plan."],
      redLines: ["Do not create or reuse a branch without explicit founder confirmation.", "Do not branch from a loose idea, roadmap item or unsplit Epic.", "Do not include secrets, customer data or vague scope in branch names."]
    },
    {
      slug: "write-tests",
      title: "Write Tests",
      purpose: "Define or update tests and validation evidence for changed behavior before PR readiness.",
      useWhen: ["behavior changes", "bug fixes need regression coverage", "acceptance criteria require validation", "before implementing behavior when test-first is feasible", "manual validation is the only practical option", "PR test gaps need explanation"],
      requiredContext: ["Testing strategy", "Acceptance criteria", "Changed behavior", "Existing test patterns", "Known risks", "Validation commands"],
      inputs: ["Implementation scope", "Changed behavior", "Acceptance criteria", "Existing test patterns", "Risk areas", "Available test commands"],
      process: ["Identify changed behavior and the acceptance criterion it proves", "For bug fixes or deterministic behavior, write or identify the failing test first and verify RED before implementation when feasible", "Choose unit, integration, e2e or manual validation based on risk and repository patterns", "Map each test or manual check to acceptance criteria", "Verify GREEN after implementation or document the exact command/manual validation evidence", "List test gaps honestly with why they remain and what would close them"],
      checks: ["Tests prove behavior, not implementation details", "RED/GREEN evidence exists when test-first is feasible", "Tests run or manual validation steps are concrete and reproducible", "Risky behavior has coverage or explicit test-gap explanation"],
      outputs: ["Test plan", "RED/GREEN evidence", "Test changes", "Manual validation", "Test gap explanation", "Known risks"],
      filesToUpdate: ["Update `../knowledge/implementation-notes.md` only when persistent testing decisions are useful."],
      redLines: ["Do not treat tests written after implementation as RED/GREEN evidence.", "Do not claim manual validation covers untested edge cases without concrete steps.", "Do not claim coverage without a test run, test plan or explicit validation gap.", "Do not hide test gaps or risky untested behavior.", "Do not test implementation details when acceptance behavior can be tested."]
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
      filesToUpdate: ["Update `../knowledge/data-guidelines.md` only after explicit confirmation."],
      redLines: ["Do not approve destructive data changes without explicit confirmation and rollback notes.", "Do not skip Security routing when auth, privacy, compliance or sensitive data is involved.", "Do not store secrets, credentials or sensitive customer data in notes."]
    },
    {
      slug: "create-pr",
      title: "Create PR",
      purpose: "Prepare a reviewable PR package tied to Feature scope, tests, Founder Testing Guide and risks.",
      useWhen: ["implementation is ready for review", "PR description needs structure", "merge risk needs communication", "Founder needs a plain-language validation path"],
      requiredContext: ["PR template", "Linked issue", "Implementation notes", "Tests run", "Known risks", "Founder Testing Guide requirements"],
      inputs: ["Branch", "Linked issue", "Changed files", "Tests", "Risks", "Screenshots or UX notes when applicable", "Preview URL or local route when available"],
      process: ["Confirm linked local Feature or GitHub issue and current branch", "Load PR template", "Summarize scope, non-goals and implementation notes", "List changed files that matter for review", "Include tests run, manual validation and test-gap explanation", "Write the Founder Testing Guide in plain language with where to test, how to test and expected result", "Flag Design/Security/Data/DevOps applicability", "Mark PR readiness status as draft, founder-ready, blocked-by-tests or blocked-by-context", "List known risks and follow-up"],
      checks: ["PR references the issue or local Feature", "Tests run or test-gap explanation is present", "Founder Testing Guide is usable by a non-technical founder", "Design/Security/Data/DevOps applicability is explicit when relevant", "Description does not hide known risk"],
      outputs: ["PR title", "PR body", "Founder Testing Guide", "Test summary", "PR readiness status", "Risk notes"],
      filesToUpdate: ["Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record."],
      redLines: ["Do not prepare a PR without linked Feature or issue scope.", "Do not omit tests, validation gaps or known risks from the PR body.", "Do not mark a PR founder-ready without tests, gaps and risks documented.", "Do not mark a PR founder-ready without a usable Founder Testing Guide."]
    },
    {
      slug: "review-pr",
      title: "Review PR",
      purpose: "Review PR changes for correctness, scope, evidence and LeanOS merge readiness.",
      useWhen: ["review a PR", "validate implementation readiness", "check merge risk", "perform code review"],
      requiredContext: ["Review criteria", "PR validation rules", "Linked issue", "PRD", "Acceptance criteria", "Changed files", "Tests", "Founder Testing Guide"],
      inputs: ["PR description", "Diff", "Linked issue", "Tests", "Founder Testing Guide", "Known risks", "Screenshots or preview URL when applicable"],
      process: ["Check scope against issue, PRD and acceptance criteria", "Review evidence including tests, manual validation, screenshots, preview URL and Founder Testing Guide", "Review code standards and changed files", "Review Design/Security/Data/DevOps applicability only when relevant", "List findings by severity with file/line or artifact reference when possible", "State evidence reviewed and evidence gaps before the merge recommendation", "Recommend merge, changes or blocked"],
      checks: ["Findings are actionable", "Severity is clear", "Actionable findings include file/line or artifact reference when possible", "Founder can test the PR without reading code", "Design/Security/Data are not forced when not applicable", "Merge recommendation is justified by evidence"],
      outputs: ["Findings by severity", "Evidence reviewed", "Scope result", "Code result", "Founder acceptance result", "Test result", "Design result or not applicable", "Security/Data result or not applicable", "Merge recommendation"],
      filesToUpdate: ["Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes."],
      redLines: ["Do not make a merge recommendation without evidence reviewed and PR validation evidence.", "Do not bury blocking findings below summaries or nice-to-have notes.", "Do not ignore Product, Design, Security or Data criteria when they are applicable."]
    }
  ];
