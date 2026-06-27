import type { FileEntry } from "../../types.js";

export function epicIssueTemplate(): string {
  return `name: Epic
description: Roadmap-level LeanOS epic.
title: "[EPIC] "
labels: ["leanos", "epic"]
body:
  - type: input
    id: local-epic-key
    attributes:
      label: Local epic key
      description: Stable LeanOS epic key, for example customer-management.
    validations:
      required: true
  - type: textarea
    id: outcome
    attributes:
      label: Outcome
      description: What business, user or validation outcome should this epic create?
    validations:
      required: true
  - type: textarea
    id: strategic-context
    attributes:
      label: Strategic context
      description: Product, ICP, problem, value proposition and validation assumption.
    validations:
      required: true
  - type: textarea
    id: delivery-scope-linkage
    attributes:
      label: Delivery scope and roadmap linkage
      description: Delivery scope, non-goals, acceptance criteria, roadmap item and milestone.
    validations:
      required: true
  - type: textarea
    id: decision-ownership
    attributes:
      label: Decision ownership
      description: Product Owner, Roadmap/Strategy reviewer and any conditional Engineering, Design, Security or DevOps reviewer.
    validations:
      required: true
  - type: textarea
    id: epic-readiness-matrix
    attributes:
      label: Epic readiness matrix
      description: Product Ops and Roadmap are required; Engineering, Design, Security and DevOps are conditional. Explain required/not applicable for each.
    validations:
      required: true
  - type: textarea
    id: feature-breakdown
    attributes:
      label: Feature breakdown
      description: Expected features, dependencies, risks and open questions.
`;
}

export function featureIssueTemplate(): string {
  return `name: Feature
description: Implementation-ready feature derived from an epic.
title: "[FEATURE: <epic>] "
labels: ["leanos", "feature"]
body:
  - type: input
    id: local-feature-key
    attributes:
      label: Local feature key
      description: Stable LeanOS feature key, for example create-customer-profile.
    validations:
      required: true
  - type: input
    id: parent-epic
    attributes:
      label: Parent epic
      description: Link the parent epic issue number.
      placeholder: "#654"
    validations:
      required: true
  - type: textarea
    id: purpose-scope
    attributes:
      label: Purpose and scope
      description: Why this feature exists, what is included and what is explicitly excluded.
    validations:
      required: true
  - type: textarea
    id: product-criteria
    attributes:
      label: Product criteria
      description: User story, user value, acceptance criteria and success or learning signal.
    validations:
      required: true
  - type: textarea
    id: tasks
    attributes:
      label: Tasks
      description: Internal implementation checklist for this feature.
    validations:
      required: true
  - type: textarea
    id: delivery-readiness-matrix
    attributes:
      label: Delivery Readiness Matrix
      description: Product Ops and Engineering are required. Design, Security and DevOps are required only when applicable; otherwise explain why not applicable.
    validations:
      required: true
  - type: textarea
    id: design-criteria
    attributes:
      label: Design criteria
      description: Required only when user-facing UX, screens, states, copy or interactions are involved. Otherwise say not applicable.
  - type: textarea
    id: engineering-criteria
    attributes:
      label: Engineering criteria
      description: Technical notes, dependencies, test expectations and operational notes.
    validations:
      required: true
  - type: textarea
    id: security-criteria
    attributes:
      label: Security criteria
      description: Required only when data, auth, permissions, privacy, abuse or compliance are involved. Otherwise say not applicable.
`;
}

export function issueTemplate(fileName: string, name: string, description: string): FileEntry {
  return {
    path: `.github/ISSUE_TEMPLATE/${fileName}`,
    content: `name: ${name}
description: ${description}
title: "[${name}]: "
labels: ["leanos"]
body:
  - type: textarea
    id: context
    attributes:
      label: Context
      description: What problem, assumption, roadmap item or workflow does this relate to?
    validations:
      required: true
  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: What should be done?
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance criteria
      description: How will we know this is complete?
    validations:
      required: true
`
  };
}
