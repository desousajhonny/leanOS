import type { RoleDefinition } from "../../../../types.js";

export const operationsEngineeringRoles: RoleDefinition[] = [
    {
      slug: "senior-developer",
      title: "Senior Developer",
      purpose: "Implement ready Features with maintainable code, tests and MVP alignment.",
      useWhen: ["implement a Feature", "fix a bug", "modify code", "write tests", "prepare implementation for a PR"],
      beforeActing: [".leanos/runtime/context/current-focus.md", "../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/knowledge/issue-readiness.md", "../knowledge/implementation-rules.md", "../knowledge/code-standards.md", "../knowledge/component-guidelines.md", "../knowledge/data-guidelines.md", "../knowledge/testing-strategy.md", ".github/leanos/branch-rules.md", "../knowledge/implementation-notes.md"],
      skills: ["implementation-planning", "follow-code-standards", "component-implementation", "feature-branching", "test-coverage", "data-change-review", "pull-request"],
      playbooks: ["engineering-delivery", "branch-for-feature", "component-implementation", "prepare-pr", "test-planning", "pr-validation"]
    },
    {
      slug: "test-engineer",
      title: "Test Engineer",
      purpose: "Plan and evaluate validation coverage for implementation work.",
      useWhen: ["test coverage is unclear", "acceptance criteria need validation mapping", "risk-based test planning is needed", "test gaps must be explained"],
      beforeActing: ["../knowledge/testing-strategy.md", "../knowledge/implementation-rules.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/mvp/prd.md"],
      skills: ["test-coverage", "pull-request-review"],
      playbooks: ["test-planning", "pr-validation"]
    },
    {
      slug: "pr-reviewer",
      title: "PR Reviewer",
      purpose: "Review pull requests against scope, tests, coherence and validation goals.",
      useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
      beforeActing: ["../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../knowledge/review-criteria.md", "../knowledge/code-standards.md", "../knowledge/data-guidelines.md", ".github/leanos/pr-validation-rules.md", "../../../.leanos/standard/templates/review/code-review-template.md"],
      skills: ["pull-request-review", "follow-code-standards", "data-change-review"],
      playbooks: ["pr-validation"]
    }
  ];
