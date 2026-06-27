import { rootDepartments } from "../../definitions/departments.js";
import { getAllAreas, getArea } from "../../selectors.js";
import type { FileEntry } from "../../types.js";
import { folderReadme, toTitle } from "../../content/shared.js";
import { rootAgent } from "../agent.js";
import { playbookFile, roleFile, skillFile } from "../departments.js";

type ExampleGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

const exampleGroups: ExampleGroup[] = [
  {
    key: "agents",
    title: "Agent Examples",
    purpose: "Examples of root and area AGENT.md routing behavior.",
    use: "Use when reviewing how an agent should route, set boundaries and delegate to the next owner.",
    files: ["example-root-agent.md", "example-area-agent.md"]
  },
  {
    key: "structure",
    title: "Structure Examples",
    purpose: "Examples of folder and area documentation.",
    use: "Use when reviewing how README-style files should map structure without becoming operators.",
    files: ["example-folder-readme.md", "example-area-readme.md"]
  },
  {
    key: "execution",
    title: "Execution Examples",
    purpose: "Examples of roles, skills, playbooks and workflows.",
    use: "Use when reviewing area-level execution assets or department/area workflows.",
    files: ["example-role-senior-developer.md", "example-skill-coherence.md", "example-playbook-prepare-pr.md", "example-workflow-feature-to-delivery-cycle.md"]
  },
  {
    key: "github",
    title: "GitHub Examples",
    purpose: "Examples of GitHub epics, features and pull requests.",
    use: "Use when reviewing GitHub-ready collaboration artifacts.",
    files: ["example-github-epic.md", "example-github-feature.md", "example-pull-request.md"]
  },
  {
    key: "review",
    title: "Review Examples",
    purpose: "Examples of review outputs.",
    use: "Use when reviewing how to structure code review findings and decisions.",
    files: ["example-code-review.md"]
  }
];

export function exampleFiles(): FileEntry[] {
  return [
    { path: "ai-standard/examples/README.md", content: examplesReadme(exampleGroups) },
    ...exampleGroups.map((group) => ({ path: `ai-standard/examples/${group.key}/README.md`, content: exampleGroupReadme(group) })),
    ...exampleGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/examples/${group.key}/${file}`, content: exampleContent(group.key, file) })))
  ];
}

function examplesReadme(groups: ExampleGroup[]): string {
  return `# Examples

## Purpose

Illustrative examples of LeanOS assets.

## When to Use

Use examples after reading the matching foundation, instruction, template and checklist.

Examples show what "good enough" can look like. They are not active workspace context, not templates and not instructions.

## Categories

${groups.map((group) => `### \`${group.key}/\`\n\n${group.purpose}\n\nUse when: ${group.use}\n\nFiles:\n${group.files.map((file) => `- \`${group.key}/${file}\``).join("\n")}`).join("\n\n")}

## How to Use

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Load the matching creation instruction in \`../instructions/\`.
3. Use the matching template in \`../templates/\`.
4. Validate with the matching checklist in \`../checklists/\`.
5. Open the smallest example category only if you need a reference.

## Red Lines

- Do not copy examples blindly.
- Do not treat example company, product, issue or PR content as real workspace context.
- Do not use examples instead of templates.
- Do not let examples override the active department, area, role, skill, playbook or workflow.
`;
}

function exampleGroupReadme(group: ExampleGroup): string {
  return `# ${group.title}

## Purpose

${group.purpose}

## When to Use

${group.use}

## Files

${group.files.map((file) => `- \`${file}\``).join("\n")}

## Related Folders

- \`../\`
- \`../../foundation/\`
- \`../../instructions/\`
- \`../../templates/\`
- \`../../checklists/\`

## Agent Notes

These files are examples only. Use them for shape and quality signals, not as active context.
`;
}

function exampleContent(_groupKey: string, fileName: string): string {
  const engineering = getArea("operations.engineering");
  const product = getArea("strategy.product");
  const seniorDeveloper = engineering.roles.find((role) => role.slug === "senior-developer") ?? engineering.roles[0];
  const coherence = product.skills.find((skill) => skill.slug === "coherence") ?? product.skills[0];
  const preparePr = engineering.playbooks.find((playbook) => playbook.slug === "prepare-pr") ?? engineering.playbooks[0];
  const examples: Record<string, string> = {
    "example-root-agent.md": rootAgent(getAllAreas(), rootDepartments),
    "example-area-agent.md": exampleAreaAgent(),
    "example-folder-readme.md": folderReadme("Example Folder", "Example purpose.", "Use when relevant.", "README.md", ["README.md"], ["../"], "Example notes."),
    "example-area-readme.md": exampleAreaReadme(),
    "example-role-senior-developer.md": roleFile(engineering, seniorDeveloper),
    "example-skill-coherence.md": skillFile(product, coherence),
    "example-playbook-prepare-pr.md": playbookFile(engineering, preparePr),
    "example-workflow-feature-to-delivery-cycle.md": exampleWorkflowFeatureToDeliveryCycle(),
    "example-github-epic.md": exampleGithubEpic(),
    "example-github-feature.md": exampleGithubFeature(),
    "example-pull-request.md": examplePullRequest(),
    "example-code-review.md": exampleCodeReview()
  };

  return examples[fileName] ?? `# ${toTitle(fileName.replace(".md", ""))}

This example is intentionally minimal.

Use the matching template, instruction and checklist before creating a real asset.
`;
}

function exampleAreaAgent(): string {
  return `# Design Agent

You are the Design Lead for this workspace.

This \`AGENT.md\` is the operating owner for \`operations/design/\`.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Operating Scope

Route design work to the smallest specialist role before loading skills or playbooks.

## Role Routing

- Product Designer: \`roles/product-designer.role.md\` - use for design system, flows, screens and interaction decisions.
- UX Researcher: \`roles/ux-researcher.role.md\` - use for research questions, interview synthesis and learning loops.
- Accessibility Specialist: \`roles/accessibility-specialist.role.md\` - use for WCAG, keyboard, focus, contrast and assistive technology concerns.
- UX Writer: \`roles/ux-writer.role.md\` - use for product copy, microcopy, errors and empty states.

## Routing Rules

1. Start from this area AGENT for operational work inside Design.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. Keep reusable Design context in \`knowledge/\`.
5. Ask before changing durable knowledge files.

## Navigation

\`operations/design/AGENT.md -> Role -> Skills -> Playbook -> Output\`
`;
}

function exampleAreaReadme(): string {
  return `# Design

## Purpose

Own product experience quality: design system, accessibility, flows, interaction decisions and UX writing.

## When to Use

- The request changes user-facing behavior, screens, states, copy or interaction.
- The founder wants to define design before implementation.
- A GitHub issue needs Design criteria.

## Source of Truth

- \`knowledge/design-system.md\`
- \`knowledge/accessibility.md\`
- \`knowledge/user-flows.md\`

## Navigation

1. For operational work, start with \`AGENT.md\`.
2. Use this README as the directory map.
3. After the area AGENT selects a role, load only required skills and playbooks.
4. Produce the requested output and update knowledge only after confirmation.

## File Responsibilities

- \`AGENT.md\`: Design operating lead.
- \`README.md\`: Design area map.
- \`area.yaml\`: machine-readable Design structure.
- \`knowledge/\`: confirmed reusable Design context.
- \`roles/\`: Design specialist operating personas.
- \`skills/\`: focused Design capabilities.
- \`playbooks/\`: Design execution sequences.
`;
}

function exampleWorkflowFeatureToDeliveryCycle(): string {
  return `# Feature To Delivery Cycle Workflow

## Purpose

Move a confirmed local Feature or mapped GitHub issue from understanding to branch, implementation, review and PR readiness.

## Trigger

The founder asks to implement a specific Feature, or a GitHub issue that represents a Feature.

## Participating Areas

- Product Ops: confirms delivery scope, issue readiness and delivery boundaries.
- Engineering: plans, implements, tests and prepares PR.
- Design: conditional, only when UX changes.
- Security: conditional, only when data, auth, permissions, privacy, abuse risk or compliance is involved.

## Sequence

1. Load the Feature, parent Epic and MVP context.
2. Summarize the Feature in chat and ask for confirmation.
3. Check Product and Engineering readiness.
4. Add Design criteria only when user-facing UX changes.
5. Add Security criteria only when the issue has a security-sensitive surface.
6. Create a Feature-linked branch plan.
7. Implement only after confirmation.
8. Run tests or explain why they cannot run.
9. Prepare a PR draft using the PR template.
10. Route to review before merge.

## Output

- Confirmed Feature summary
- Implementation plan
- Branch name
- Test plan
- PR draft
- Review readiness notes
`;
}

function exampleGithubEpic(): string {
  return `# Epic: Guided clinic intake MVP

## Outcome

Clinic owners can capture structured patient intake before the appointment.

## Strategic Context

- Product: Clinic Assistant AI
- ICP: small clinic owners
- Problem: front-desk intake is slow and inconsistent
- Value proposition: reduce manual intake work before appointments
- Validation assumption: clinics will trust guided AI intake for low-risk cases
- Evidence status: assumption

## Delivery Scope Linkage

- scope_type: MVP
- milestone: MVP Alpha
- release_goal: validate the guided intake flow, intake summary and staff review
- Non-goals: insurance automation, diagnosis, clinical decision-making
- Acceptance criteria: staff can review and edit the intake summary
- Roadmap item: MVP Intake Flow
- Milestone: MVP Alpha

## Product Criteria

- User value: less front-desk time
- Jobs to be done: capture intake information before visit
- Acceptance criteria: intake summary is understandable and editable
- Learning signal: at least 5 clinics complete test intake sessions

## Design Criteria

- User flow: patient starts from appointment link and submits intake
- Screens or states: start, question flow, review, submitted
- UX constraints: simple language, progress indication, error recovery
- Accessibility considerations: keyboard navigation and readable form labels

## Engineering Criteria

- Technical approach: form flow with persisted draft state
- System boundaries: patient intake and staff review only
- Test expectations: form validation and summary generation tests

## Security Criteria

- Data involved: patient-provided personal information
- Auth or permissions: staff-only review
- Privacy considerations: avoid exposing intake data in logs
- Abuse cases: spam submissions

## Sub-issue Breakdown

- Status: ready_for_breakdown
- Expected features: intake form, draft persistence, staff review, security controls
- Open questions: retention policy
`;
}

function exampleGithubFeature(): string {
  return `# Build patient intake form flow

## Parent Epic

- Epic: #123 Guided clinic intake MVP
- Milestone: MVP Alpha
- Roadmap item: MVP Intake Flow

## Purpose

Create the first patient-facing flow for collecting intake information.

## Scope

Implement start, question flow, review and submitted states.

## Non-goals

- Staff review dashboard
- Diagnosis
- Insurance processing

## Product Criteria

- User value: patient can submit intake before appointment
- Acceptance criteria: patient can complete and review all required fields
- Success or learning signal: test users complete the flow without assistance

## Design Criteria

- Flow: appointment link -> intake questions -> review -> submitted
- Screens or states: start, step, validation error, review, success
- UX constraints: clear progress and plain-language questions
- Accessibility: labeled inputs and keyboard navigation

## Engineering Criteria

- Suggested area: operations/engineering
- Technical notes: persist draft state locally or server-side based on selected stack
- Dependencies: product field list and validation rules
- Test expectations: validation, navigation and submit tests

## Security Criteria

- Data: patient-provided personal information
- Permissions: no staff-only data exposed to patient
- Privacy: no sensitive data in analytics events

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied
- [ ] Engineering criteria satisfied
- [ ] Security criteria satisfied
- [ ] Tests or validation plan defined
`;
}

function examplePullRequest(): string {
  return `# Add patient intake form flow

## Summary

Adds the initial patient intake form flow with required field validation and review state.

## Linked Issue

Closes #554

## Parent Epic

Epic #123

## LeanOS Context

- Department: Operations
- Area: Engineering
- Role: Senior Developer
- Skills: plan-implementation, create-pr
- Playbook: prepare-pr

## Product / Delivery Scope Alignment

- Roadmap item: MVP Intake Flow
- Delivery scope: guided intake flow
- Acceptance criteria: patient can complete and review required fields
- Validation or learning impact: enables first usability test

## Design Notes

Uses the current Design foundation for form labels, spacing and focus behavior.

## Security Notes

Avoids logging intake field values.

## Tests

- [x] Form validation tests
- [x] Manual keyboard navigation check

## Founder Testing Guide

### What Changed

Patients can now complete the first intake form flow, review answers and submit the intake.

### Where to Test

- Preview URL: use the PR preview URL when available
- Local route or screen: /intake
- Test account or data: use a test patient profile only

### How to Test

1. Open the intake route.
2. Complete the required questions.
3. Try submitting with one required answer missing.
4. Review the answers.
5. Submit the form.

### Expected Result

The founder should see validation for missing required answers, a review state and a final submitted state without exposing intake data in logs.

### Out of Scope

Staff review dashboard and diagnosis are not included in this PR.

### Known Risks or Limits

Question order still needs usability validation.

## Risks

- Scope risk: staff review remains separate
- Technical risk: persistence strategy may change
- Product risk: question order still needs user validation
- Security risk: retention policy is still open
`;
}

function exampleCodeReview(): string {
  return `# Code Review

## Review Context

- PR: #812
- Linked issue: #554
- Parent epic: #123
- Delivery scope: guided intake flow
- Acceptance criteria: patient can complete and review required fields

## Findings

| Severity | File/Area | Finding | Required Change |
| --- | --- | --- | --- |
| medium | intake form validation | Error state is not announced to screen readers. | Add accessible error messaging and focus behavior. |
| low | tests | Missing keyboard-only manual check note. | Add validation note to PR checklist. |

## Review Dimensions

- Correctness: mostly aligned
- Scope control: no unrelated scope found
- Tests: automated validation present
- Security/privacy: no sensitive logs found
- Design/UX: accessibility fix required

## Decision

- [ ] Ready to merge
- [x] Needs changes
- [ ] Blocked by missing context

## Open Questions

- Should intake draft state persist across browser sessions?
`;
}
