export function githubEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Local Source

- Local epic key:
- Local epic path:
- Delivery scope:
- Roadmap item:
- GitHub sync status:

## Outcome

What business, user or validation outcome this epic should create.

## Decision Ownership

- Owner: Product Ops / Product Owner
- Strategy/Roadmap reviewer:
- Engineering reviewer when technical feasibility matters:
- Design reviewer when UX is affected:
- Security reviewer when data/auth/privacy/security is affected:
- DevOps reviewer when GitHub, deploy or environment readiness is affected:

## Strategic Context

- Product:
- ICP:
- Problem:
- Value proposition:
- Validation assumption:
- Evidence status:

## Delivery Scope Linkage

- scope_type:
- milestone:
- release_goal:
- Non-goals:
- Roadmap item:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Product Criteria

- User value:
- Jobs to be done:
- Learning or success signal:

## Success Metrics

- Primary success metric:
- Supporting metric:
- Qualitative signal:
- Learning signal:

## Epic Done When

The Epic is done when all confirmed Features are delivered or explicitly descoped, the outcome can be measured, and the parent delivery scope is updated.

## Approval Gate

- Product Owner approval:
- Roadmap / Strategy approval:
- Engineering feasibility checked:
- Design checked or not applicable:
- Security checked or not applicable:
- DevOps checked or not applicable:
- Founder confirmation:

## Epic Readiness Matrix

Use this matrix to decide which specialists must shape the features under this epic.

| Dimension | Required? | Why / Not Applicable | Required Output |
| --- | --- | --- | --- |
| Product Ops | yes | Epic ownership and delivery scope | outcome, scope, non-goals, expected features |
| Strategy / Roadmap | yes | Roadmap and milestone alignment | priority rationale |
| Engineering | conditional | Feasibility, dependencies or unknown complexity | feasibility notes |
| Design | conditional | UX, UI, flow, copy or accessibility impact | design criteria for affected features |
| Security | conditional | data, auth, permissions, privacy, abuse, API or compliance risk | security criteria for affected features |
| DevOps | conditional | GitHub sync, CI/CD, env, deploy, observability or config impact | operational criteria |

## Design Criteria

Use only when the epic affects user experience.

- User flow:
- Screens or states:
- UX constraints:
- Accessibility considerations:
- Design dependency:

If not applicable, write: "Not applicable; no user-facing design change."

## Engineering Criteria

- Technical approach:
- System boundaries:
- Data or API impact:
- Test expectations:
- Operational risks:

## Security Criteria

Use when the epic involves data, auth, permissions, privacy, abuse risk or compliance.

- Data involved:
- Auth or permissions:
- Privacy considerations:
- Abuse cases:
- Compliance constraints:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Feature Breakdown

- Status: not_started
- Expected features:
- Open questions:

## Next Step

After this epic is confirmed, break it into local features with internal tasks before implementation.
`;
}

export function githubFeatureTemplate(): string {
  return `# [FEATURE: <epic title>] <feature title>

## Local Source

- Local feature key:
- Local feature path:
- Parent epic key:
- GitHub sync status:

## Parent Epic

- Epic:
- Milestone:
- Roadmap item:

## Purpose

Why this feature exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Product Criteria

- User story:
- User value:
- Acceptance criteria:
- Success or learning signal:

## Tasks

Use tasks as an internal checklist for this feature.

~~~text
Create model
Create UI
Add validation
Add tests
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | deploy, env, CI/CD, observability, config or GitHub sync impact |

## Design Criteria

Use only when this feature changes a user-facing flow, screen, state, copy or interaction.

- Flow:
- Screens or states:
- UX constraints:
- Accessibility:
- Design asset or decision needed:

If not applicable, write: "Not applicable; no user-facing design change."

## Engineering Criteria

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Security Criteria

Use when this feature touches data, auth, permissions, privacy, abuse risk or compliance.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Definition of Ready

- [ ] Parent epic is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied or explicitly not applicable
- [ ] Engineering criteria satisfied
- [ ] Security criteria satisfied or explicitly not applicable
- [ ] Tests or validation plan defined
- [ ] Parent epic updated if needed
`;
}

export function deliveryReadinessMatrixTemplate(): string {
  return `# Delivery Readiness Matrix (DRM)

Use this before creating epics, features or implementation plans.

The DRM shapes work before development starts. It prevents the model from coding before the feature or issue has enough Product, Design, Engineering, Security and DevOps clarity.

Epic-level DRM decides which dimensions must participate and what kinds of feature criteria will be needed.

Feature-level DRM turns those dimensions into concrete, testable criteria and internal tasks.

| Dimension | Required When | Required Output | Status |
| --- | --- | --- | --- |
| Product Ops | Always | outcome, scope boundary, non-goals, acceptance criteria, milestone, parent epic linkage | TBD |
| Design | User-facing flow, screen, state, copy, accessibility or interaction changes | user flow, required screens/states, component/design-system notes, accessibility notes | not_applicable/TBD |
| Engineering | Always for implementation work | implementation boundary, dependencies, test plan, branch/PR expectation | TBD |
| Security | Data, auth, permissions, privacy, abuse, API, database, secrets, compliance or AI-generated-code risk | risk notes, security criteria, data/auth/privacy requirements | not_applicable/TBD |
| DevOps | Environment, deploy, CI/CD, GitHub Project, observability, config or release impact | environment/config notes, CI/deploy/release/observability criteria | not_applicable/TBD |

## Readiness Rule

Do not create implementation-ready features or GitHub issues until Product Ops and Engineering are clear.

Design is required only when user experience is affected.

Security is required only when the issue has a security-sensitive surface.

DevOps is required only when delivery, environment, automation, release or operational readiness is affected.

## Output Rule

If a dimension is not applicable, say why. If it is applicable but unclear, mark it as missing context and stop before creating GitHub issues.
`;
}

export function branchNameTemplate(): string {
  return `# Branch Name Template

Use focused branches tied to a local LeanOS Feature or mapped GitHub issue.

## Formats

\`\`\`text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
\`\`\`

## Examples

\`\`\`text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Rules

- Use \`feature/...\` when the Feature exists only in the local LeanOS workspace.
- Use \`issue/...\` when the Feature is mapped to a real GitHub issue.
- Always include the real issue number when using the \`issue/...\` format.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- Do not implement Feature work on the default branch.
- If the branch already exists, ask before continuing.
`;
}

export function pullRequestTemplate(): string {
  return `# Pull Request

## Summary

What changed and why.

## Linked Issue

Closes #

## Parent Epic

Epic #

## LeanOS Context

- Department:
- Area:
- Role:
- Skills:
- Playbook:

## Product / Delivery Scope Alignment

- Roadmap item:
- Delivery scope:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Security Notes

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Automated tests run or updated
- [ ] Manual validation completed or explained

## Founder Testing Guide

Explain how a non-technical founder can test this PR before merge.

### What Changed

Plain-language summary of the user-facing or business behavior delivered.

### Where to Test

- Preview URL:
- Local route or screen:
- Test account or data:

### How to Test

1. Open...
2. Do...
3. Confirm...

### Expected Result

What the founder should see when the PR works.

### Out of Scope

What this PR intentionally does not cover.

### Known Risks or Limits

Anything the founder should know before approving.

## Risks

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## LeanOS Review Checklist

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Tests run or explained
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] No unrelated scope added
`;
}
