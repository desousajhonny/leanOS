# Ready To Develop

## Purpose

Define the fixed LeanOS gate for deciding whether a roadmap item, delivery scope, epic or issue can move into implementation.

This is a framework criterion, not a product status log. Do not rewrite it with product-specific progress unless the framework itself changes.

## Core Rule

A work item is ready to develop only when Product, Delivery Scope, Issue, Design, Security, Engineering and DevOps readiness are satisfied or explicitly marked not applicable.

## Product Readiness

- The user, problem and expected outcome are clear.
- The work is tied to product strategy, roadmap or confirmed founder intent.
- The value proposition or business reason is understandable.
- Missing product context is listed before implementation starts.

## Delivery Scope Readiness

- The item belongs to a delivery scope such as MVP, Release, Experiment, Beta or Internal.
- `scope_type`, `milestone` and `release_goal` are defined when applicable.
- Non-goals are explicit.
- Dependencies and constraints are visible.

## Issue Readiness

- The work has an issue, epic or confirmed bootstrap request.
- Acceptance criteria are clear enough to validate the result.
- The implementation boundary is small enough to execute safely.
- The issue is not just an idea, note or vague roadmap item.

## Design Readiness

Required when the work touches UX, UI, copy, accessibility, onboarding, screens, states, flows or user interaction.

- Design foundation or user-flow context exists.
- Accessibility impact is checked.
- Required screens, states or components are described enough for Engineering.
- If Design is not applicable, the reason is explicit.

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

- `not-ready`: the work is still an idea or lacks essential context.
- `needs-product`: product intent, user, problem or value is unclear.
- `needs-delivery-scope`: roadmap item exists but no delivery scope is confirmed.
- `needs-design`: UX/UI/accessibility context is required before coding.
- `needs-security`: data/auth/privacy/API/security context is required before coding.
- `needs-devops`: environment/deploy/CI/GitHub readiness is required before coding.
- `ready-to-plan`: enough context exists to create a development plan, branch and implementation approach.
- `ready-to-code`: enough context exists to begin implementation after the plan is confirmed.

## Model Behavior

- If the work is not ready, explain the missing criteria in founder-friendly language.
- Recommend the next LeanOS route instead of writing code too early.
- Use `where-we-are.md` for status/readiness questions.
- Use `issue-delivery-cycle` only after readiness is confirmed.
- Never treat importance as readiness.

## Founder-Friendly Output

Use this shape when the founder asks if development can start:

~~~text
Ainda nao recomendo comecar pelo codigo.

O item ainda precisa de <missing readiness area>.
Se implementarmos agora, o risco e <risk>.

O proximo passo seguro e <recommended route>.
Quer que eu conduza esse passo agora?
~~~
