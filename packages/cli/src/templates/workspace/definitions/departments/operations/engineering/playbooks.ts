import type { PlaybookDefinition } from "../../../../types.js";

export const operationsEngineeringPlaybooks: PlaybookDefinition[] = [
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
  ];
