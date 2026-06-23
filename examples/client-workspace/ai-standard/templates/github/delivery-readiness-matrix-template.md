# Delivery Readiness Matrix (DRM)

Use this before creating epics, sub-issues or implementation plans.

The DRM shapes work before development starts. It prevents the model from coding before the issue has enough Product, Design, Engineering, Security and DevOps clarity.

| Dimension | Required When | Required Output | Status |
| --- | --- | --- | --- |
| Product Ops | Always | outcome, scope boundary, non-goals, acceptance criteria, milestone, parent epic linkage | TBD |
| Design | User-facing flow, screen, state, copy, accessibility or interaction changes | user flow, required screens/states, component/design-system notes, accessibility notes | not_applicable/TBD |
| Engineering | Always for implementation work | implementation boundary, dependencies, test plan, branch/PR expectation | TBD |
| Security | Data, auth, permissions, privacy, abuse, API, database, secrets, compliance or AI-generated-code risk | risk notes, security criteria, data/auth/privacy requirements | not_applicable/TBD |
| DevOps | Environment, deploy, CI/CD, GitHub Project, observability, config or release impact | environment/config notes, CI/deploy/release/observability criteria | not_applicable/TBD |

## Readiness Rule

Do not create implementation-ready sub-issues until Product Ops and Engineering are clear.

Design is required only when user experience is affected.

Security is required only when the issue has a security-sensitive surface.

DevOps is required only when delivery, environment, automation, release or operational readiness is affected.

## Output Rule

If a dimension is not applicable, say why. If it is applicable but unclear, mark it as missing context and stop before creating GitHub issues.
