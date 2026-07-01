import type { RoleDefinition } from "../../../../types.js";

export const operationsProductOpsRoles: RoleDefinition[] = [
    {
      slug: "product-owner",
      title: "Product Owner",
      purpose: "Own MVP execution clarity with supervision from Product and PM strategy.",
      useWhen: ["MVP backlog needs planning", "acceptance criteria are unclear", "delivery scope needs coordination", "an epic needs to be broken into features"],
      beforeActing: ["../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../knowledge/mvp-decision-gate.md", "../knowledge/ready-to-develop.md", "../mvp/backlog.md", "../mvp/scope.md", "../mvp/prd.md", "../mvp/user-stories.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/product/knowledge/mvp-validation-scope.md", "../../../strategy/roadmap/knowledge/roadmap.md", "../../../.leanos/standard/templates/product/epic-template.md", "../../../.leanos/standard/templates/product/feature-template.md", "../../../.leanos/standard/templates/github/delivery-readiness-matrix-template.md"],
      skills: ["delivery-scope", "acceptance-criteria", "delivery-coherence", "shape-epic", "feature-criteria"],
      playbooks: ["mvp-backlog-planning", "delivery-item-to-epic", "delivery-scope-planning", "epic-to-features"]
    },
    {
      slug: "delivery-architect",
      title: "Delivery Architect",
      purpose: "Define delivery boundaries, technical constraints and implementation readiness without overdesigning architecture too early.",
      useWhen: ["delivery boundaries are unclear", "technical constraints affect scope", "implementation readiness needs review", "technical decisions need recording"],
      beforeActing: ["../knowledge/overview.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../knowledge/technical-decisions.md", "../mvp/scope.md"],
      skills: ["delivery-boundaries", "delivery-coherence"],
      playbooks: ["delivery-readiness"]
    }
  ];
