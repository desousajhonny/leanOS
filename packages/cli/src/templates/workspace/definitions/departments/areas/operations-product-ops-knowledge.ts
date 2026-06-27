export function productOpsOverviewKnowledge(): string {
  return `# Product Ops Overview

## Purpose

Keep the operational bridge between Strategy, Roadmap and Engineering clear enough for implementation.

## Current State

TBD

## Product Context

TBD

## MVP Boundary

TBD

## Delivery Model

TBD

## Issue Readiness

TBD

## Cross-Area Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function epicsReadmeKnowledge(): string {
  return `# Product Ops Epics

## Purpose

This folder stores local LeanOS Epics before optional GitHub sync.

Use this folder only after a roadmap item has become a confirmed Delivery Scope.

## Local Structure

~~~text
operations/product-ops/epics/
  README.md
  <epic-slug>/
    README.md
    <feature-slug>.md
~~~

## Rules

- Each Epic gets one folder.
- The Epic folder name must use stable kebab-case.
- The Epic README must follow \`../../../ai-standard/templates/product/epic-template.md\`.
- Every markdown file inside an Epic folder, except \`README.md\`, is a Feature that belongs to that Epic.
- Feature files must follow \`../../../ai-standard/templates/product/feature-template.md\`.
- Do not create a \`features/\` subfolder in the MVP scaffold.
- Tasks stay inside Feature files as internal checklists unless separate tracking is explicitly needed.
- GitHub sync is optional and must be confirmed by the founder.
- GitHub mapping rules live in \`../../../.github/leanos/work-mapping.md\`.

## Naming

Use stable, searchable names:

~~~text
operations/product-ops/epics/customer-management/README.md
operations/product-ops/epics/customer-management/create-customer-profile.md
operations/product-ops/epics/customer-management/import-customers-csv.md
~~~

Epic title:

~~~text
[EPIC] Customer Management
~~~

Feature title:

~~~text
[FEATURE: Customer Management] Create customer profile
~~~

## Workflow

1. Confirm Delivery Scope.
2. Run \`delivery-item-to-epic\` to create or update the local Epic folder.
3. Run \`epic-to-features\` to create Feature files inside the Epic folder.
4. Run \`ready-to-develop.md\` before Engineering starts implementation.
5. Sync with GitHub only after confirmation.

## GitHub Mapping

- Epic folder README -> GitHub issue with labels \`leanos\` and \`epic\`.
- Feature markdown file -> GitHub issue with labels \`leanos\` and \`feature\`.
- Feature Tasks -> checklist inside the Feature GitHub issue.
- Separate Task issue -> only when assignment, review, deployment, security or tracking needs separate ownership.
- Remote IDs and issue numbers -> \`../../../.github/leanos/sync-state.yaml\`, not product status.

## Sync Location Decision

Keep synced and unsynced Epics in this folder.

Do not create \`operations/product-ops/epics/synced/\` in the MVP scaffold.

Use \`../../../.github/leanos/sync-state.yaml\` to know whether an Epic or Feature is \`not_synced\`, \`sync_ready\`, \`synced\` or \`conflict\`.

This keeps Product Ops context visible to the model without forcing it to reread a second archive folder.

## Status Rules

Use \`status\` for product work state:

~~~yaml
status: candidate | scoped | ready | in-progress | blocked | done
~~~

Use \`sync_status\` only for GitHub or remote tracking:

~~~yaml
sync_status: not_synced | sync_ready | synced | conflict
~~~

Do not use \`synced\` as a product status.

## Do Not Do

- Do not create example Epics that are not tied to real delivery scope.
- Do not move synced Epics to another folder unless a future framework version explicitly supports that flow.
- Do not treat GitHub as the source of truth when local LeanOS files exist.
`;
}

export function deliveryScopeKnowledge(): string {
  return `# Delivery Scope

## Purpose

Define which roadmap items are committed to a concrete delivery scope.

## Current State

TBD

## Scope Header

~~~yaml
scope_type: MVP | Release | Experiment | Beta | Internal
milestone: TBD
release_goal: TBD
~~~

## Included Roadmap Items

| Item | Outcome | Scope Type | Milestone | Release Goal | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | candidate |

## Non-Goals

TBD

## Acceptance Direction

TBD

## Design Applicability

TBD

## Security Applicability

TBD

## DevOps Applicability

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function issueReadinessKnowledge(): string {
  return `# Issue Readiness

## Purpose

Define what an issue needs before it is ready for implementation.

## Current State

TBD

## Required Product Criteria

TBD

## Required Engineering Criteria

TBD

## Design Criteria

TBD

## Security Criteria

TBD

## Dependencies

TBD

## Blockers

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export function readyToDevelopKnowledge(): string {
  return `# Ready To Develop

## Purpose

Define the fixed LeanOS Definition of Ready for deciding whether a Feature can move into implementation.

This is a framework criterion, not a product status log. Do not rewrite it with product-specific progress unless the framework itself changes.

## Core Rule

A Feature is ready to develop only when Product Ops, Delivery Scope, Feature, Design, Security, Engineering and DevOps readiness are satisfied or explicitly marked not applicable.

An Epic can be important and still not ready for code. An Epic becomes developable only after it is broken into Features and at least one Feature passes this gate.

## Local Feature Rule

- A local Feature can exist before GitHub is configured.
- A GitHub issue is optional for readiness when the local Feature file is complete enough to guide implementation.
- GitHub sync is tracking, not product readiness.
- If both local Feature and GitHub issue exist, compare them before planning and explain any mismatch to the founder.
- Do not start \`feature-to-delivery-cycle\` from a vague roadmap item, unsplit Epic or loose idea.

## Product Readiness

- The user, problem and expected outcome are clear.
- The work is tied to product strategy, roadmap or confirmed founder intent.
- The value proposition or business reason is understandable.
- Missing product context is listed before implementation starts.

## Delivery Scope Readiness

- The item belongs to a delivery scope such as MVP, Release, Experiment, Beta or Internal.
- \`scope_type\`, \`milestone\` and \`release_goal\` are defined when applicable.
- Non-goals are explicit.
- Dependencies and constraints are visible.

## Feature Definition of Ready

- The Feature has a clear title, parent Epic and lifecycle status.
- The Feature is small enough to plan, branch, implement, test and review safely.
- The Feature has acceptance criteria that can validate the result.
- Internal tasks are listed when useful, but tasks do not replace acceptance criteria.
- The Feature records Product Ops, Engineering and conditional Design, Security and DevOps criteria.
- The Feature is not just an idea, note or vague roadmap item.

## Feature And Issue Readiness

- The work has a local Feature file or a GitHub issue that represents a Feature.
- Acceptance criteria are clear enough to validate the result.
- The implementation boundary is small enough to execute safely.
- The Feature can be traced back to roadmap item, delivery scope and Epic.
- If GitHub is used, the GitHub issue should mirror the local Feature before code starts.

## Design Readiness

Required when the work touches UX, UI, copy, accessibility, onboarding, screens, states, flows or user interaction.

- Design foundation or user-flow context exists.
- Accessibility impact is checked.
- Required screens, states or components are described enough for Engineering.
- If the Feature needs a new user-facing component, Design must create or confirm a component spec before Engineering starts code.
- If the Feature reuses an existing component, name the component and any usage constraints.
- If Design is not applicable, the reason is explicit.

## Component Readiness

Required when a Feature includes UI that depends on a reusable component.

- Check \`operations/design/knowledge/component-inventory.md\` before assuming a component exists.
- Reuse an approved component when it satisfies the Feature.
- If an existing component needs adaptation, Design must state whether the change belongs in the reusable component or only in this Feature.
- If a new component is required, the Feature is not \`ready-to-code\` until Design creates or confirms a component spec.
- Engineering must read the component spec before using \`operations/engineering/skills/implement-component/SKILL.md\` or \`operations/engineering/playbooks/component-implementation.playbook.md\`.
- A missing component spec should create a Design task or route to \`operations/design/playbooks/component-readiness.playbook.md\`, not trigger immediate code.

## Security Readiness

Required when the work touches data, authentication, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.

- Sensitive data and access rules are understood.
- Security acceptance criteria are defined when needed.
- Secret handling is safe.
- If Security is not applicable, the reason is explicit.

## Engineering Readiness

- The technical boundary is understandable.
- Code standards, testing expectations and review criteria are known.
- Branch and PR conventions are clear.
- The model has enough context to plan before coding.

## DevOps Readiness

Required when the work touches environments, CI/CD, deploy, observability, GitHub Project, config, release or runtime operations.

- Environment impact is understood.
- CI/CD and deployment expectations are clear when applicable.
- Observability or rollback needs are considered when relevant.
- If DevOps is not applicable, the reason is explicit.

## Ready States

- \`not-ready\`: the work is still an idea or lacks essential context.
- \`needs-product\`: product intent, user, problem or value is unclear.
- \`needs-delivery-scope\`: roadmap item exists but no delivery scope is confirmed.
- \`needs-epic-breakdown\`: an Epic exists but has not been broken into Features.
- \`needs-feature-definition\`: the Feature is local but lacks acceptance criteria, boundaries, tasks or readiness criteria.
- \`needs-design\`: UX/UI/accessibility context is required before coding.
- \`needs-component-spec\`: the Feature needs a new or adapted reusable component before Engineering can code it.
- \`needs-security\`: data/auth/privacy/API/security context is required before coding.
- \`needs-devops\`: environment/deploy/CI/GitHub readiness is required before coding.
- \`ready-to-plan\`: enough context exists to create a development plan and implementation approach.
- \`ready-to-code\`: enough context exists to begin implementation after the plan is confirmed.

## Model Behavior

- If the work is not ready, explain the missing criteria in founder-friendly language.
- Recommend the next LeanOS route instead of writing code too early.
- Use \`where-we-are.md\` for status/readiness questions.
- Use \`feature-to-delivery-cycle\` only after readiness is confirmed.
- Route missing component specs to Design before Engineering.
- Never treat importance as readiness.
- Never treat GitHub sync as readiness by itself.
- If the founder asks to code too early, name the current state and offer the smallest next step.

## Founder-Friendly Output

Use this shape when the founder asks if development can start:

~~~text
Ainda nao recomendo comecar pelo codigo.

O item ainda precisa de <missing readiness area>.
Se implementarmos agora, o risco e <risk>.

O proximo passo seguro e <recommended route>.
Quer que eu conduza esse passo agora?
~~~
`;
}

export function mvpDecisionGateKnowledge(): string {
  return `# MVP Decision Gate

## Purpose

Define the fixed LeanOS criteria for deciding what belongs in the first MVP scope.

This is a framework criterion, not a product status log. Do not rewrite it with product-specific progress unless the framework itself changes.

## Core Rule

An item enters the MVP only when it is the smallest useful version of the product that can validate the main user problem, create visible user value and be implemented safely with current constraints.

Important items can stay outside the MVP. Urgent requests can still be too broad, too risky or too unclear for the first version.

## Required Inputs

- Product brief, problem, ICP and value proposition.
- Business model or business assumption when available.
- Roadmap or backlog item when the request starts from an existing item.
- Founder intent and constraints.
- Existing MVP scope, PRD, stories, acceptance criteria and non-goals.
- Known Design, Security, Engineering and DevOps constraints when applicable.

## Gate Criteria

### Value Risk

Question: will this help validate or deliver the core product value?

Pass when:

- the target user and problem are clear;
- the item contributes directly to the MVP outcome;
- the user value is understandable without inventing product facts;
- the item is not only internal polish, preference or future optimization.

Block or defer when:

- the user, problem or value is unclear;
- the item is interesting but disconnected from the core MVP learning;
- the item should stay in backlog until the main product promise is sharper.

### Usability Risk

Question: can a real user understand and use this in the first version?

Pass when:

- the core flow is explainable;
- the required interaction is simple enough for MVP;
- accessibility and obvious UX risks are visible;
- missing design details can be safely handled before implementation.

Block or defer when:

- the user flow is unknown;
- the item needs major design discovery before scope is safe;
- the MVP would be confusing without a design foundation.

### Feasibility Risk

Question: can this be implemented safely with the current technical and operational constraints?

Pass when:

- the implementation boundary is small enough to plan;
- major dependencies are known;
- data, integration, AI, infrastructure or architecture risks are named;
- uncertainty can be handled by a small spike before delivery.

Block or defer when:

- the item is too large for a first version;
- feasibility depends on unknown systems or integrations;
- the work would force premature architecture, automation or scale assumptions.

### Business Viability Risk

Question: does this fit the business model, operating model and current founder constraints?

Pass when:

- the item supports the expected business outcome or learning;
- the effort makes sense for the founder's current stage;
- cost, support, compliance or operational burden is acceptable or explicit;
- there is a reason to learn this now instead of later.

Block or defer when:

- the item adds operational complexity before value is proven;
- the item increases cost, support or compliance burden without clear MVP value;
- the business reason is weak or absent.

## Decision States

- \`ready-for-mvp\`: include in MVP now.
- \`needs-product-clarity\`: product problem, user or value is still unclear.
- \`needs-usability-flow\`: user flow, UX, copy, accessibility or design foundation is missing.
- \`needs-technical-spike\`: feasibility, architecture, data, AI, integration or infrastructure risk is unclear.
- \`needs-business-viability-check\`: pricing, cost, support, operations, compliance or business value is unclear.
- \`too-large-for-mvp\`: the item should be split or deferred.
- \`not-a-fit-now\`: keep out of current MVP and explain why.

## MVP Scope Buckets

Use these buckets in founder-facing output:

- In MVP now.
- Later / backlog.
- Needs discovery.
- Needs spike or specialist check.
- Not now.

## Model Behavior

- Ask guided questions only for missing information.
- Prefer fewer, clearer MVP items over a broad first version.
- Do not mark something as MVP just because the founder likes it.
- Do not create Epics, Features, GitHub issues, branches, PRs or code from this gate.
- Do not update MVP files until the founder confirms the proposed decision.
- If Design, Security, Engineering or DevOps risk is applicable, name the risk and recommend the next LeanOS route.

## Founder-Friendly Output

Use this shape:

~~~text
Minha recomendacao:
<include now | leave for later | investigate first | split | not now>

Por que:
- Value Risk: <pass/gap>
- Usability Risk: <pass/gap>
- Feasibility Risk: <pass/gap>
- Business Viability Risk: <pass/gap>

O que entra no MVP agora:
- <item>

O que fica fora por enquanto:
- <item>

Proximo passo seguro:
<route>

Quer que eu transforme essa decisao no escopo inicial do MVP?
~~~
`;
}
