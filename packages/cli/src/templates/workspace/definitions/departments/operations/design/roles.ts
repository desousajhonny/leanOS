import type { RoleDefinition } from "../../../../types.js";

export const operationsDesignRoles: RoleDefinition[] = [
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
  ];
