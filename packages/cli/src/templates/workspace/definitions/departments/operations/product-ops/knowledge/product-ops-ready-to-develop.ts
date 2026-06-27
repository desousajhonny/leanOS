export function productOpsReadyToDevelopKnowledge(): string {
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
