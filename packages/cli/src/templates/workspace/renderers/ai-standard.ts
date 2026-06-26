import { rootDepartments } from "../definitions/departments.js";
import { getAllAreas, getArea } from "../selectors.js";
import type { FileEntry } from "../types.js";
import { rootAgent } from "./agent.js";
import { playbookFile, roleFile, skillFile } from "./departments.js";
import { folderReadme, standardTemplate, toTitle } from "../content/shared.js";

type TemplateGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

export function aiStandardFiles(): FileEntry[] {
  const templateGroups = [
    {
      key: "agents",
      title: "Agent Templates",
      purpose: "Templates for root, department and area AGENT.md files.",
      use: "Use when creating an operating owner or routing layer.",
      files: ["agent-template.md", "root-agent-template.md", "department-agent-template.md", "area-agent-template.md"]
    },
    {
      key: "structure",
      title: "Structure Templates",
      purpose: "Templates for folders, READMEs, departments, areas and YAML structure.",
      use: "Use when creating or documenting workspace structure.",
      files: ["root-readme-template.md", "folder-readme-template.md", "area-readme-template.md", "department-template.md", "department-template.yaml", "area-template.md", "area-template.yaml"]
    },
    {
      key: "execution",
      title: "Execution Templates",
      purpose: "Templates for area-level roles, skills, playbooks and workflows.",
      use: "Use when creating operational execution assets inside an area or department workflow folder.",
      files: ["role-template.md", "role-template.yaml", "skill-template.md", "skill-template.yaml", "playbook-template.md", "playbook-template.yaml", "workflow-template.md"]
    },
    {
      key: "commands",
      title: "Command Templates",
      purpose: "Templates for portable LeanOS chat command files.",
      use: "Use when creating a stable slash-command behavior in .leanos/commands/.",
      files: ["command-template.md"]
    },
    {
      key: "github",
      title: "GitHub Templates",
      purpose: "Templates for GitHub issues, epics, features, branch naming, PRs and readiness matrices.",
      use: "Use when shaping GitHub-ready work items or repository collaboration artifacts.",
      files: ["github-issue-template.md", "github-epic-template.md", "github-feature-template.md", "delivery-readiness-matrix-template.md", "branch-name-template.md", "pull-request-template.md"]
    },
    {
      key: "product",
      title: "Product Work Templates",
      purpose: "Templates for local LeanOS product work before optional GitHub sync.",
      use: "Use when shaping local epics and features from delivery scope.",
      files: ["epic-template.md", "feature-template.md"]
    },
    {
      key: "design",
      title: "Design Templates",
      purpose: "Templates for Design-owned specifications that hand off user-facing structure to Engineering.",
      use: "Use when Design needs to document a component contract before implementation.",
      files: ["component-spec-template.md"]
    },
    {
      key: "review",
      title: "Review Templates",
      purpose: "Templates for reviewing code, implementation and delivery quality.",
      use: "Use when creating or applying review outputs.",
      files: ["code-review-template.md"]
    }
  ];
  const checklists = ["agent", "area", "command", "department", "playbook", "readme", "role", "skill", "workflow"];
  const instructions = ["create-agent", "create-area", "create-command", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];
  const exampleGroups = [
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
      files: ["example-role-senior-developer.md", "example-skill-check-coherence.md", "example-playbook-prepare-pr.md", "example-workflow-feature-to-delivery-cycle.md"]
    },
    {
      key: "commands",
      title: "Command Examples",
      purpose: "Examples of portable LeanOS chat command behavior.",
      use: "Use when reviewing command loading, allowed updates, forbidden updates and confirmation rules.",
      files: ["example-command-define-design.md"]
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

  return [
    { path: "ai-standard/README.md", content: aiStandardReadme() },
    { path: "ai-standard/foundation/README.md", content: folderReadme("Foundation", "Core LeanOS foundation for asset taxonomy, progression, navigation, naming, guided conversation, creation and quality.", "Start here when deciding what kind of asset exists, which founder progression stage is active, where it belongs, how to talk to the founder or how to judge quality.", "asset-taxonomy.md", ["asset-taxonomy.md", "navigation-chain.md", "founder-progression-model.md", "progression-gates.md", "guided-conversation.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-documentation-rules.md"], ["../templates/", "../checklists/", "../instructions/", "../examples/"], "Load only the foundation file needed for the active decision. Do not load all foundation files by default.") },
    { path: "ai-standard/foundation/navigation-chain.md", content: "# Navigation Chain\n\nLeanOS uses owner-first navigation:\n\n`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output`\n\nUse the chain to choose the next owner, one level at a time.\n\n1. Root chooses the owning department.\n2. Department chooses a workflow or active area.\n3. Area chooses the specialist role when it has `AGENT.md`; otherwise use its `README.md` as the local map.\n4. Role points to the required skills and playbooks.\n5. Skills and playbooks shape the work.\n6. Output updates only the smallest relevant knowledge, decision or project file.\n\nDo not skip levels because a later file looks relevant.\nDo not load the whole workspace when a smaller route exists.\n" },
    { path: "ai-standard/foundation/founder-progression-model.md", content: founderProgressionModel() },
    { path: "ai-standard/foundation/progression-gates.md", content: progressionGates() },
    { path: "ai-standard/foundation/guided-conversation.md", content: guidedConversation() },
    { path: "ai-standard/foundation/asset-taxonomy.md", content: assetTaxonomy() },
    { path: "ai-standard/foundation/creation-rules.md", content: creationRules() },
    { path: "ai-standard/foundation/quality-criteria.md", content: qualityCriteria() },
    { path: "ai-standard/foundation/naming-conventions.md", content: "# Naming Conventions\n\n- Use lowercase kebab-case for folders and file basenames.\n- Use direct, singular asset names: `<direct-name>.role.md`, `<direct-name>.skill.md`, `<direct-name>.playbook.md`, `<direct-name>.workflow.md`.\n- Roles end with `.role.md`.\n- Skills end with `.skill.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n- Prefer domain capability names such as `accessibility.skill.md` or `design-system.skill.md` over generic action names such as `define-accessibility.skill.md`.\n- Use action verbs only when the asset is truly procedural, such as `create-branch.skill.md`.\n- Knowledge files do not use asset suffixes; use names such as `knowledge/design-system.md`.\n" },
    { path: "ai-standard/foundation/folder-documentation-rules.md", content: folderDocumentationRules() },
    { path: "ai-standard/templates/README.md", content: templatesReadme(templateGroups) },
    ...templateGroups.map((group) => ({ path: `ai-standard/templates/${group.key}/README.md`, content: templateGroupReadme(group) })),
    ...templateGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/templates/${group.key}/${file}`, content: templateContent(file) }))),
    { path: "ai-standard/checklists/README.md", content: checklistsReadme(checklists) },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklistContent(name) })),
    { path: "ai-standard/instructions/README.md", content: instructionsReadme(instructions) },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructionContent(name) })),
    { path: "ai-standard/examples/README.md", content: examplesReadme(exampleGroups) },
    ...exampleGroups.map((group) => ({ path: `ai-standard/examples/${group.key}/README.md`, content: exampleGroupReadme(group) })),
    ...exampleGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/examples/${group.key}/${file}`, content: exampleContent(group.key, file) })))
  ];
}

function templateContent(fileName: string): string {
  const templates: Record<string, string> = {
    "agent-template.md": agentTemplate(),
    "root-agent-template.md": rootAgentTemplate(),
    "department-agent-template.md": departmentAgentTemplate(),
    "area-agent-template.md": areaAgentTemplate(),
    "area-readme-template.md": areaReadmeTemplate(),
    "playbook-template.md": playbookTemplate(),
    "playbook-template.yaml": playbookYamlTemplate(),
    "epic-template.md": productEpicTemplate(),
    "feature-template.md": productFeatureTemplate(),
    "github-epic-template.md": githubEpicTemplate(),
    "github-feature-template.md": githubFeatureTemplate(),
    "delivery-readiness-matrix-template.md": deliveryReadinessMatrixTemplate(),
    "branch-name-template.md": branchNameTemplate(),
    "pull-request-template.md": pullRequestTemplate(),
    "code-review-template.md": codeReviewTemplate(),
    "component-spec-template.md": componentSpecTemplate()
  };

  return templates[fileName] ?? standardTemplate(fileName);
}

function templatesReadme(groups: TemplateGroup[]): string {
  return `# Templates

## Purpose

Reusable starting structures for LeanOS framework assets and GitHub collaboration artifacts.

## When to Use

Use after selecting the asset type with \`../foundation/asset-taxonomy.md\` and before drafting a new file.

Templates are starting structures. They are not active workspace context and should not override the owning AGENT, role, skill, playbook, workflow or command.

## Categories

${groups.map((group) => `### \`${group.key}/\`\n\n${group.purpose}\n\nUse when: ${group.use}\n\nFiles:\n${group.files.map((file) => `- \`${group.key}/${file}\``).join("\n")}`).join("\n\n")}

## How to Use

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Load the matching creation instruction from \`../instructions/\`.
3. Open only the smallest matching template category.
4. Copy the matching template shape.
5. Adapt it to the active department or area.
6. Validate with the matching checklist in \`../checklists/\`.

## Red Lines

- Do not load every template by default.
- Do not use a GitHub template for a LeanOS framework asset.
- Do not use an execution template for folder documentation.
- Do not use examples as templates when a real template exists.
`;
}

function templateGroupReadme(group: TemplateGroup): string {
  return `# ${group.title}

## Purpose

${group.purpose}

## When to Use

${group.use}

## Files

${group.files.map((file) => `- \`${file}\``).join("\n")}

## Related Folders

- \`../\`
- \`../../instructions/\`
- \`../../checklists/\`
- \`../../foundation/\`

## Navigation

Use this folder only after \`../../foundation/asset-taxonomy.md\` confirms the needed asset type.

## Agent Notes

Load only the matching template file. Do not load unrelated template categories.
`;
}

function examplesReadme(groups: TemplateGroup[]): string {
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
- Do not let examples override the active department, area, role, skill, playbook or command.
`;
}

function exampleGroupReadme(group: TemplateGroup): string {
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
  const checkCoherence = product.skills.find((skill) => skill.slug === "check-coherence") ?? product.skills[0];
  const preparePr = engineering.playbooks.find((playbook) => playbook.slug === "prepare-pr") ?? engineering.playbooks[0];
  const examples: Record<string, string> = {
    "example-root-agent.md": rootAgent(getAllAreas(), rootDepartments),
    "example-area-agent.md": exampleAreaAgent(),
    "example-folder-readme.md": folderReadme("Example Folder", "Example purpose.", "Use when relevant.", "README.md", ["README.md"], ["../"], "Example notes."),
    "example-area-readme.md": exampleAreaReadme(),
    "example-role-senior-developer.md": roleFile(engineering, seniorDeveloper),
    "example-skill-check-coherence.md": skillFile(product, checkCoherence),
    "example-playbook-prepare-pr.md": playbookFile(engineering, preparePr),
    "example-workflow-feature-to-delivery-cycle.md": exampleWorkflowFeatureToDeliveryCycle(),
    "example-command-define-design.md": exampleCommandDefineDesign(),
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

function exampleCommandDefineDesign(): string {
  return `# /define design

## Purpose

Prepare the MVP Design foundation before implementation.

## Load First

- \`../../AGENT.md\`
- \`../../operations/AGENT.md\`
- \`../../operations/design/AGENT.md\`
- \`../../operations/design/roles/product-designer.role.md\`
- \`../../operations/design/skills/design-system.skill.md\`
- \`../../operations/design/skills/accessibility.skill.md\`
- \`../../operations/design/skills/user-flow-mapping.skill.md\`
- \`../../operations/design/playbooks/design-foundation.playbook.md\`
- \`../../strategy/product/README.md\`
- \`../../operations/product-ops/mvp/scope.md\`

## Process

1. Confirm product, ICP, problem, value proposition and delivery scope.
2. Define the design system baseline.
3. Define accessibility baseline.
4. Map primary user flows.
5. Propose updates to Design knowledge files.
6. Write only after explicit confirmation.

## Allowed Updates

- \`../../operations/design/knowledge/design-system.md\`
- \`../../operations/design/knowledge/accessibility.md\`
- \`../../operations/design/knowledge/user-flows.md\`

## Forbidden Updates

- product code
- roles, skills, playbooks or workflows
- \`ai-standard/\`
- remote systems

## Output

- Loaded context
- Design foundation proposal
- Files to update
- Open questions
- Confirmation question
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

function checklistsReadme(checklists: string[]): string {
  return `# Checklists

## Purpose

Quality gates for LeanOS assets.

## When to Use

Use before accepting a newly created or modified asset.

## Files

${checklists.map((name) => `- \`${name}-quality-checklist.md\``).join("\n")}

## Related Folders

- \`../foundation/\`
- \`../templates/\`
- \`../instructions/\`

## Navigation

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Use the matching checklist only.
3. If no checklist matches, use \`../foundation/quality-criteria.md\` and ask before creating a new checklist.

## Agent Notes

Do not treat all checklists as interchangeable. Each checklist protects a different asset type.
`;
}

function qualityChecklistContent(name: string): string {
  const checklists: Record<string, string> = {
    agent: `# Agent Quality Checklist

Use this checklist before accepting an \`AGENT.md\`.

## Scope

- [ ] The agent owns routing for exactly one level: root, department or area.
- [ ] The agent states its operating scope.
- [ ] The agent does not try to be a full inventory of every child file.

## Routing

- [ ] Root agents route only to departments.
- [ ] Department agents route to workflows or active areas.
- [ ] Area agents route to specialist roles before skills or playbooks.
- [ ] The agent does not skip levels in the Navigation Chain.

## Context Loading

- [ ] The agent tells models which minimal files to load first.
- [ ] The agent avoids asking models to load the whole workspace.
- [ ] Missing paths are handled as gaps, not invented.

## Red Lines

- [ ] The agent protects secrets.
- [ ] The agent asks before modifying durable files.
- [ ] The agent does not enrich framework assets with product context during init.

## Output

- [ ] The agent defines the expected response header or output shape when relevant.
- [ ] The agent makes the next route clear.
`,
    readme: `# README Quality Checklist

Use this checklist before accepting a folder \`README.md\`.

## Folder Map

- [ ] The README explains the folder purpose.
- [ ] The README says when to use the folder.
- [ ] The README lists important files and subfolders.
- [ ] The README points to the operating owner when one exists.

## Navigation

- [ ] If the folder has \`AGENT.md\`, the README tells agents to start there for operational work.
- [ ] The README identifies related folders.
- [ ] The README avoids routing directly to child roles when an area agent should route first.

## Boundaries

- [ ] The README is a map, not the operator.
- [ ] The README does not duplicate the full content of child files.
- [ ] The README does not hide process rules that belong in a playbook.
- [ ] The README does not store product facts that belong in knowledge files.
`,
    department: `# Department Quality Checklist

Use this checklist before accepting a root department.

## Structure

- [ ] The department has \`AGENT.md\`.
- [ ] The department has \`README.md\`.
- [ ] The department has \`department.yaml\`.
- [ ] The department has \`workflows/\` when cross-area flows exist.
- [ ] Active areas are listed and routed clearly.

## Ownership

- [ ] The department owns broad operating direction.
- [ ] The department does not contain \`roles/\`, \`skills/\` or \`playbooks/\` directly.
- [ ] Area-level execution assets live inside areas.
- [ ] Department workflows coordinate across areas or stages.

## Routing

- [ ] The department AGENT routes to workflows or areas.
- [ ] The README acts as a map.
- [ ] The YAML is machine-readable and does not store narrative product context.
`,
    area: `# Area Quality Checklist

Use this checklist before accepting an area.

## Structure

- [ ] The area has \`README.md\`.
- [ ] The area has \`area.yaml\`.
- [ ] The area has \`roles/\`, \`skills/\` and \`playbooks/\` when operational work exists.
- [ ] The area has \`knowledge/\` when it owns reusable context.
- [ ] The area has \`AGENT.md\` when specialist routing is needed.

## Ownership

- [ ] The area has a clear responsibility inside its department.
- [ ] Roles, skills and playbooks belong to this area.
- [ ] Knowledge files store confirmed reusable context.

## Routing

- [ ] Area AGENT, when present, chooses the specialist role.
- [ ] Roles point to skills and playbooks.
- [ ] The area does not require inactive or missing paths.
`,
    role: `# Role Quality Checklist

Use this checklist before accepting a \`.role.md\` file.

## Responsibility

- [ ] The role defines a clear operating persona.
- [ ] The role answers "with which hat should the agent act?"
- [ ] The role does not duplicate a skill or playbook.

## Context

- [ ] The role lists the context it should read before acting.
- [ ] The role points to relevant knowledge files when needed.
- [ ] The role does not ask for unrelated workspace context.

## Execution Assets

- [ ] The role points to relevant skills.
- [ ] The role points to relevant playbooks.
- [ ] The role does not reference missing files.

## Output

- [ ] The role states the kind of output it should produce.
- [ ] The role states when to ask for clarification or confirmation.
`,
    skill: `# Skill Quality Checklist

Use this checklist before accepting a \`.skill.md\` file.

## Capability

- [ ] The skill defines one reusable capability.
- [ ] The skill answers "which capability should be applied?"
- [ ] The skill is reusable by one or more roles or playbooks.
- [ ] The skill does not become a full process sequence.

## Operating Detail

- [ ] The skill states when to use it.
- [ ] The skill states required context.
- [ ] The skill states inputs.
- [ ] The skill states checks.
- [ ] The skill states outputs.
- [ ] The skill states red lines.

## Boundaries

- [ ] The skill does not invent product facts.
- [ ] The skill does not update files without confirmation when durable context changes.
- [ ] The skill does not duplicate another skill.
`,
    playbook: `# Playbook Quality Checklist

Use this checklist before accepting a \`.playbook.md\` file.

## Sequence

- [ ] The playbook defines an ordered execution sequence.
- [ ] The playbook answers "in which order should the work happen?"
- [ ] The playbook uses skills rather than duplicating all skill content.
- [ ] The playbook has clear start and end conditions.

## Inputs and Outputs

- [ ] Inputs are listed.
- [ ] Process steps are listed.
- [ ] Outputs are listed.
- [ ] Files to update are listed when applicable.
- [ ] Confirmation is required before durable file updates.

## Guided Conversation

- [ ] If the playbook asks the founder to choose, classify, prioritize or confirm, it references \`../foundation/guided-conversation.md\`.
- [ ] Guided questions use numbered options when the decision has predictable paths.
- [ ] The founder can answer with a number or free-form text.
- [ ] Technical paths appear after the founder understands the decision.

## Scope

- [ ] The playbook belongs to the correct area.
- [ ] The playbook does not duplicate a department workflow.
- [ ] The playbook does not reference inactive or missing paths.
`,
    workflow: `# Workflow Quality Checklist

Use this checklist before accepting a \`.workflow.md\` file.

## Ownership

- [ ] The workflow belongs to a department or a truly area-owned flow.
- [ ] The workflow coordinates multiple areas, roles or stages.
- [ ] The workflow does not live in \`.leanos/workflows/\`.

## Flow

- [ ] The workflow defines trigger, required context and end state.
- [ ] The workflow identifies participating areas or roles.
- [ ] The workflow defines handoffs between owners.
- [ ] Conditional participants are marked as conditional.
- [ ] Missing active areas are handled as gaps.

## Output

- [ ] The workflow states expected outputs.
- [ ] The workflow identifies follow-up routes.
- [ ] The workflow does not duplicate area playbooks.
`,
    command: `# Command Quality Checklist

Use this checklist before accepting a \`.leanos/commands/<command>.md\` file.

## Intent

- [ ] The command maps to a stable user intent.
- [ ] The command is portable across VS Code, Claude, Codex, terminal agents and chat interfaces.
- [ ] The command does not duplicate natural-language routing unless stable loading rules are needed.

## Loading

- [ ] The command defines \`Load First\` or equivalent context.
- [ ] The command loads only necessary context.
- [ ] The command does not require missing or inactive paths without warning.

## Safety

- [ ] Allowed updates are explicit.
- [ ] Forbidden updates are explicit.
- [ ] Remote writes require confirmation and should be delegated to tool-capable scripts/capabilities.
- [ ] Secrets are never requested into tracked files.

## Output

- [ ] The command defines expected output.
- [ ] The command asks for confirmation before durable changes.
`
  };

  return checklists[name] ?? `# ${toTitle(name)} Quality Checklist

- [ ] Purpose is clear.
- [ ] Owner is clear.
- [ ] Navigation is explicit.
- [ ] Output expectations are clear.
- [ ] No inactive or missing paths are required.
`;
}

function instructionsReadme(instructions: string[]): string {
  return `# Instructions

## Purpose

Step-by-step creation procedures for LeanOS assets.

## When to Use

Use when the user asks to create or update framework assets such as agents, departments, areas, roles, skills, playbooks, workflows, commands or READMEs.

## Files

${instructions.map((name) => `- \`${name}-instructions.md\``).join("\n")}

## Related Folders

- \`../foundation/\`
- \`../templates/\`
- \`../checklists/\`

## Navigation

1. Confirm the asset type in \`../foundation/asset-taxonomy.md\`.
2. Read \`../foundation/creation-rules.md\`.
3. Open the matching instruction file.
4. Use the matching template.
5. Validate with the matching checklist.

## Agent Notes

Do not use one instruction for every asset type. Each instruction protects a different creation path.
`;
}

function guidedConversation(): string {
  return `# Guided Conversation

## Purpose

Make LeanOS feel guided for founders without turning workflows into rigid forms.

Use this foundation when an agent, workflow, playbook or command needs to ask the founder for context, classification, prioritization, confirmation or a decision.

## Core Rule

When the founder needs to choose between predictable paths, use numbered options instead of only open-ended questions.

Use:

- the host application's native selection UI when available;
- 3 to 5 numbered options;
- one "not sure / help me decide" option;
- one question at a time when the decision changes state, roadmap, MVP, issue, PR or implementation;
- plain founder-friendly language before technical paths;
- free-form answers as valid input.

If no native selection UI is available, write numbered options directly in chat.

Always allow:

\`\`\`text
You can reply with the number, or describe it in your own words.
\`\`\`

## When To Use Guided Questions

Use guided questions when:

- the founder needs to choose a destination for an idea;
- the model lacks required context;
- a decision changes roadmap, MVP, issue, PR, implementation, launch or learning state;
- a file update depends on founder confirmation;
- the founder may not know the correct LeanOS command or workflow name.

Do not use guided questions when:

- the answer is a simple factual clarification;
- the founder already gave a clear decision;
- the model can safely summarize and ask for confirmation;
- the question would create fake precision too early.

## Question Types

### Discovery Question

Use to understand missing context.

Example:

\`\`\`text
Quem essa ideia ajudaria primeiro?

1. Um usuario novo tentando entender o produto
2. Um usuario ativo tentando concluir uma tarefa
3. Um cliente pagante com problema operacional
4. O founder/time interno
5. Nao sei ainda, me ajude a descobrir
\`\`\`

### Decision Question

Use to choose the next path.

Example:

\`\`\`text
Qual destino faz mais sentido para essa ideia agora?

1. Refinar melhor comigo
2. Registrar como hipotese para validar depois
3. Guardar como candidata ao roadmap
4. Descartar por enquanto
5. Nao sei, me ajude a decidir
\`\`\`

### Priority Question

Use to rank urgency or impact.

Example:

\`\`\`text
Por que essa ideia parece importante agora?

1. Resolve uma dor clara do usuario
2. Pode aumentar conversao ou receita
3. Reduz trabalho manual
4. Melhora retencao ou experiencia
5. Ainda e so uma intuicao
\`\`\`

### Confirmation Question

Use before durable updates or external actions.

Example:

\`\`\`text
Posso registrar essa ideia como candidata ao roadmap?

1. Sim, registre no backlog
2. Nao, vamos apenas manter na conversa
3. Quero ajustar a ideia antes
\`\`\`

### Risk Question

Use when a path may introduce risk.

Example:

\`\`\`text
Essa ideia envolve dados sensiveis, login, pagamento ou permissoes?

1. Sim
2. Nao
3. Talvez, nao tenho certeza
\`\`\`

## Writing Rules

- Ask one important guided question at a time.
- Prefer native selectable options when the host supports them; otherwise use numbered options.
- Do not ask a long questionnaire unless the playbook explicitly requires an intake form.
- Put the human decision before file paths.
- Explain the recommendation before asking for confirmation.
- If the founder answers with a number, restate the selected meaning before continuing.
- If the founder answers freely, map the answer to the closest option and say how you interpreted it.

## Output Shape

Recommended shape:

\`\`\`text
Minha leitura:
<short evaluation>

Proximo passo:
<recommended path>

Escolha uma opcao:
1. <option>
2. <option>
3. <option>
4. Nao sei, me ajude a decidir

Voce pode responder so com o numero ou do seu jeito.
\`\`\`

## Red Lines

- Do not make a decision for the founder when the decision changes durable state.
- Do not hide file updates behind friendly language.
- Do not expose technical paths before the founder understands the decision.
- Do not force numbered options when the founder needs open exploration.
`;
}

function creationInstructionContent(name: string): string {
  const instructions: Record<string, string> = {
    "create-agent": `# Create Agent Instructions

Use when creating or changing an \`AGENT.md\`.

## Before Creating

1. Load \`../foundation/asset-taxonomy.md\`.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm whether the agent is root, department or area level.
4. Check whether a README map is enough instead of an AGENT.

## Choose Template

- Root agent: \`../templates/agents/root-agent-template.md\`
- Department agent: \`../templates/agents/department-agent-template.md\`
- Area agent: \`../templates/agents/area-agent-template.md\`

## Process

1. Define the exact level this agent owns.
2. Define what it routes to next.
3. Define red lines for this level.
4. Keep inventory short; delegate detail to README, workflows, roles, skills and playbooks.
5. Ask before writing.

## Validate

Use \`../checklists/agent-quality-checklist.md\`.

## Red Lines

- Do not make root AGENT route directly to area roles or skills.
- Do not list every child workflow, role, skill or playbook.
- Do not duplicate command instructions.
`,
    "create-readme": `# Create README Instructions

Use when creating or changing a folder \`README.md\`.

## Before Creating

1. Load \`../foundation/folder-documentation-rules.md\`.
2. Confirm the folder purpose.
3. Confirm whether an \`AGENT.md\` owns operational routing for this folder.

## Choose Template

- Folder README: \`../templates/structure/folder-readme-template.md\`
- Area README: \`../templates/structure/area-readme-template.md\`
- Root README: \`../templates/structure/root-readme-template.md\`

## Process

1. Explain purpose.
2. Explain when to use the folder.
3. List important files and subfolders.
4. Point to operating owner when present.
5. Add navigation notes.
6. Keep it a map, not an executor.

## Validate

Use \`../checklists/readme-quality-checklist.md\`.

## Red Lines

- Do not duplicate child file contents.
- Do not hide process inside README.
- Do not store product facts that belong in knowledge files.
`,
    "create-department": `# Create Department Instructions

Use when creating a new root department.

## Before Creating

1. Load \`../foundation/asset-taxonomy.md\`.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm that the scope is broad enough to be a root department.
4. Check whether an existing department or area should own the work.

## Choose Templates

- Department AGENT: \`../templates/agents/department-agent-template.md\`
- Department README: \`../templates/structure/department-template.md\`
- Department YAML: \`../templates/structure/department-template.yaml\`

## Process

1. Define department scope.
2. Define active areas.
3. Define department-local workflows when cross-area work exists.
4. Create \`AGENT.md\`, \`README.md\`, \`department.yaml\` and \`workflows/\` when needed.
5. Do not create roles, skills or playbooks at department root.

## Validate

Use \`../checklists/department-quality-checklist.md\`.

## Red Lines

- Do not create a department for one capability.
- Do not place area execution assets at department root.
- Do not duplicate existing department ownership.
`,
    "create-area": `# Create Area Instructions

Use when creating an area inside a root department.

## Before Creating

1. Confirm the owning department.
2. Load \`../foundation/navigation-chain.md\`.
3. Confirm the area has a stable operational responsibility.
4. Check whether an existing area already owns the work.

## Choose Templates

- Area README: \`../templates/structure/area-readme-template.md\`
- Area YAML: \`../templates/structure/area-template.yaml\`
- Area AGENT, when needed: \`../templates/agents/area-agent-template.md\`

## Process

1. Define area purpose.
2. Define whether it needs \`AGENT.md\`.
3. Define knowledge files, roles, skills and playbooks.
4. Create \`README.md\` and \`area.yaml\`.
5. Create \`roles/\`, \`skills/\`, \`playbooks/\` and \`knowledge/\` only when they are needed.

## Validate

Use \`../checklists/area-quality-checklist.md\`.

## Red Lines

- Do not create an area with no clear owner or use case.
- Do not create empty execution folders just for decoration.
- Do not bypass department ownership.
`,
    "create-role": `# Create Role Instructions

Use when creating a \`.role.md\` file inside an area.

## Before Creating

1. Confirm the active area.
2. Load the area \`AGENT.md\` when present.
3. Load the area \`README.md\` and \`area.yaml\`.
4. Confirm that a distinct operating persona is needed.

## Choose Template

- Role: \`../templates/execution/role-template.md\`
- Role YAML: \`../templates/execution/role-template.yaml\`

## Process

1. Define what hat the agent should wear.
2. Define when to use the role.
3. Define required context.
4. Point to existing skills and playbooks.
5. Create missing skills or playbooks only after separate confirmation.

## Validate

Use \`../checklists/role-quality-checklist.md\`.

## Red Lines

- Do not create a role for a one-off task.
- Do not make the role perform the skill or playbook itself.
- Do not point to missing files without marking the gap.
`,
    "create-skill": `# Create Skill Instructions

Use when creating a \`.skill.md\` file inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm which role or playbook will use the skill.
3. Check whether an existing skill already covers the capability.

## Choose Template

- Skill: \`../templates/execution/skill-template.md\`
- Skill YAML: \`../templates/execution/skill-template.yaml\`

## Process

1. Define one reusable capability.
2. Define when to use it.
3. Define required context and inputs.
4. Define checks and outputs.
5. Define red lines.
6. Avoid turning the skill into a full ordered process.

## Validate

Use \`../checklists/skill-quality-checklist.md\`.

## Red Lines

- Do not duplicate another skill.
- Do not create a skill for a one-off answer.
- Do not put durable product facts in a skill.
`,
    "create-playbook": `# Create Playbook Instructions

Use when creating a \`.playbook.md\` file inside an area.

## Before Creating

1. Confirm the active area.
2. Confirm the playbook is tactical execution inside one area.
3. Check whether a department workflow should own the broader flow.
4. Identify skills the playbook should use.
5. Load \`../foundation/guided-conversation.md\` when the playbook asks the founder to choose, classify, prioritize or confirm.

## Choose Template

- Playbook: \`../templates/execution/playbook-template.md\`
- Playbook YAML: \`../templates/execution/playbook-template.yaml\`

## Process

1. Define trigger and goal.
2. Define inputs.
3. Define ordered process.
4. Reference skills instead of duplicating them.
5. Add \`Guided Conversation\` when founder input or confirmation is part of the playbook.
6. Define outputs.
7. Define files to update and confirmation rules.

## Validate

Use \`../checklists/playbook-quality-checklist.md\`.

## Red Lines

- Do not duplicate a workflow.
- Do not hide missing role or skill gaps.
- Do not update durable files without confirmation.
`,
    "create-workflow": `# Create Workflow Instructions

Use when creating a \`.workflow.md\` file.

## Before Creating

1. Confirm whether the workflow belongs to a department or area.
2. Confirm that the flow spans multiple areas, roles or stages.
3. Check whether an existing playbook is enough.

## Choose Template

- Workflow: \`../templates/execution/workflow-template.md\`

## Process

1. Define trigger.
2. Define participating areas or roles.
3. Define required context.
4. Define ordered stages and handoffs.
5. Mark conditional participants as conditional.
6. Define outputs and follow-up routes.

## Validate

Use \`../checklists/workflow-quality-checklist.md\`.

## Red Lines

- Do not place business workflows in \`.leanos/workflows/\`.
- Do not duplicate area playbooks.
- Do not require inactive areas without warning.
`,
    "create-command": `# Create Command Instructions

Use when creating a portable chat command in \`.leanos/commands/\`.

## Before Creating

1. Confirm the command maps to a stable user intent.
2. Check whether natural-language routing is enough.
3. Confirm allowed updates, forbidden updates and confirmation rules.

## Choose Template

- Command: \`../templates/commands/command-template.md\`

## Process

1. Define invocation.
2. Define purpose.
3. Define Load First.
4. Define process.
5. Define allowed updates.
6. Define forbidden updates.
7. Define output.
8. Require confirmation before durable or remote changes.

## Validate

Use \`../checklists/command-quality-checklist.md\`.

## Red Lines

- Do not create commands for every possible workflow.
- Do not ask the model to perform remote writes directly.
- Do not request secrets into tracked files.
`
  };

  return instructions[name] ?? `# ${toTitle(name.replace("create-", ""))} Instructions

1. Load \`../foundation/asset-taxonomy.md\`.
2. Choose the active department and area.
3. Use the matching template.
4. Validate with the matching checklist.
5. Ask before writing.
`;
}

function founderProgressionModel(): string {
  return `# Founder Progression Model

## Purpose

Define how LeanOS moves a founder from a raw idea to an operating startup without creating the whole workspace too early.

The model keeps the Chief focused on the current startup stage, active files and next founder decision. It is the source of truth for progressive workspace activation, stage gates and natural-language startup routing.

## When To Use

Use this file when the founder asks to start, diagnose an idea, continue from an unclear point, create a roadmap, define an MVP, prepare delivery, launch, learn from evidence or activate a new department.

Use \`progression-gates.md\` for concrete required context, allowed next stages and blocked next stages. This file explains the journey; the gate matrix decides whether the next step is allowed.

Use \`guided-conversation.md\` for the actual question style after this model identifies the next stage.

## Core Rule

Progression is stage-first and activation-aware.

Do not load inactive departments, roles, skills, playbooks, workflows or knowledge.

If the next step needs an inactive workspace area, return an \`activation_required\` decision with the department or area that should be created next. Do not pretend the path exists.

## Startup Progression Stages

| Stage | Active Scope | Founder State | Chief Job | Gate To Next |
| --- | --- | --- | --- | --- |
| Setup Seed | \`leanos.yaml\`, root \`AGENT.md\`, minimal Strategy | The founder described the idea in the wizard or has almost no structure. | Read the seed context and orient the founder. | Founder wants to begin and accepts guided diagnosis. |
| Strategy Seed | Strategy only | There is a rough idea, but problem, customer and value are incomplete. | Ask guided diagnosis questions and fill the minimum Strategy knowledge. | Problem, ICP, value proposition and assumptions are minimally clear. |
| Strategy Baseline | Strategy only | The business direction is coherent enough to compare options. | Confirm positioning, business model, validation risk and current constraints. | Founder confirms a baseline worth turning into a roadmap. |
| Idea Diagnosis | Strategy only | The founder needs to know what the idea is, for whom and why now. | Diagnose clarity, risk and evidence without jumping to execution. | One clear opportunity or validation path is selected. |
| MVP Validation Scope | Strategy only | The founder wants to validate the business through a first MVP path. | Define business thesis, target user, core problem, MVP slice, manual/concierge parts, productized parts, success signals and pivot signals. | Founder confirms the MVP validation scope is ready for roadmap sequencing. |
| Roadmap Inicial | Strategy only | The founder has a validated-enough direction or MVP Validation Scope but no sequence. | Convert Strategy into first roadmap options, prioritization and MVP Candidate Roadmap. | Founder chooses a near-term roadmap item or validation path. |
| MVP Delivery Decision | Strategy plus Product Ops activation when needed | The founder wants to turn a chosen roadmap/MVP item into executable scope. | Decide delivery boundary, PRD, non-goals, acceptance criteria and dependencies. | If Product Ops is missing, return \`activation_required\` for Product Ops/Operations. |
| Product Shaping | Product Ops active | A roadmap item needs scope, non-goals and acceptance criteria. | Shape epic/feature candidates and delivery readiness. | Feature scope has Product and Engineering readiness inputs. |
| Delivery Readiness | Product Ops plus required supporting areas | Work is nearly implementation-ready. | Check Design, Security and DevOps applicability before Engineering starts. | Required criteria are ready or explicitly not applicable. |
| Implementation | Engineering active | The founder approved a ready feature or issue. | Route to delivery workflow, implementation plan, tests and PR readiness. | Feature is merged, shipped or explicitly stopped. |
| Launch | Marketing/Sales/Customer Success active as needed | The product change needs market, sales or onboarding motion. | Prepare launch, messaging, onboarding and feedback capture. | Launch signals and owner follow-up are recorded. |
| Learning Loop | Strategy plus active delivery/market areas | Evidence exists after launch, experiment or user feedback. | Compare results against assumptions and update roadmap decisions. | Keep, iterate, pivot or pause decision is confirmed. |
| Scaling / Operating Cadence | Multiple active departments | The startup needs repeated operating rhythm. | Maintain cadence, metrics, backlog, risks and cross-department focus. | Next operating cycle is scheduled and owners are clear. |

## Chief Behavior At Startup

When the founder says "quero começar", "como começar", "iniciar leanos", "quero começar agora" or a similar natural-language start intent:

1. Load only the root routing context, \`leanos.yaml\` and active Strategy files.
2. Summarize what is already known from \`seed_context\` and Strategy.
3. State the current stage.
4. Identify the smallest missing Strategy decision.
5. Ask one guided question with useful options.
6. Do not ask empty questions such as "tell me more".
7. Do not create roadmap, delivery MVP, feature or implementation files until the Strategy gate is satisfied.

Use this response shape:

\`\`\`text
O que já temos:
O que ainda falta:
Próximo passo recomendado:
Pergunta:
\`\`\`

## Guided Question Rules

- Ask one decision at a time.
- Offer 3 to 5 concrete options when the founder may not know the answer.
- Include one "not sure / help me decide" option when uncertainty is likely.
- Tie every question to the next file or decision it unlocks.
- Prefer founder language over internal framework terms.
- After each answer, restate the updated understanding and the next gate.

## Progression Intent Routing

Use intent routing as a stage-aware decision table:

\`\`\`text
Intent -> Current Stage -> Gate -> Active Requirements -> Route
\`\`\`

Routing rules:

1. If the current stage can handle the intent with active files, route to the smallest active workflow.
2. If the intent belongs to a future stage, explain the missing gate before proceeding.
3. If the future stage requires a missing department or area, return \`activation_required\`.
4. Root routing must not point directly to roles, skills, playbooks or knowledge.
5. Root routing must not point to commands.

## Activation Gates

Activation creates workspace surface area only when the founder's stage needs it.

| Activation | Required When | Must Be True First |
| --- | --- | --- |
| Product Ops / Operations | MVP delivery scope, product scope, epics, features or delivery shaping begins. | Strategy Baseline is coherent and a roadmap item or MVP Candidate Roadmap item exists. |
| Design | User-facing flow, screen, copy, accessibility or design system decisions are needed. | A feature, experiment or MVP scope has UX impact. |
| Engineering | Implementation, technical planning, branch, tests or PR work begins. | Feature is delivery-ready or an explicitly approved technical spike exists. |
| Security | Data, auth, permissions, privacy, abuse, API or compliance risk appears. | The active feature or workflow has a security-sensitive surface. |
| DevOps | Environments, CI/CD, deploy, release, observability or GitHub automation are needed. | Delivery scope requires operational execution. |
| Marketing / Sales / Customer Success | Launch, acquisition, sales motion, onboarding or retention work begins. | Product or validation direction has a market-facing motion. |
| Finance / Legal / Data | Pricing, budget, contracts, risk, compliance, analytics or metrics become necessary. | The founder decision depends on that specialty. |

## activation_required Response

When activation is required, the Chief should not try to open missing paths.

Do not answer with only \`activation_required\`.

First explain the next natural operating step in founder language:

\`\`\`text
Esse pedido ja passou do ponto de estrategia. Minha sugestao e abrir Product Ops agora para transformar isso em escopo executavel.
\`\`\`

Then ask for confirmation before creating or activating any department or area:

\`\`\`text
Posso ativar Operations/Product Ops e criar os arquivos minimos para esse proximo passo?
\`\`\`

After confirmation, run \`lean-os activate <area>\` from the workspace root, then reload \`leanos.yaml\`, context and routing indexes before opening the activated area.

Then include the structured activation decision:

\`\`\`yaml
activation_required:
  target: operations/product-ops
  reason: executable MVP delivery scope needs Product Ops ownership before epics or features exist.
  prerequisite_met: MVP Candidate Roadmap item confirmed
  next_action: create the minimal Product Ops workspace and route to define-mvp.workflow.md
\`\`\`

If the prerequisite is not met, say what Strategy decision must happen first.

## Red Lines

- Do not load inactive departments.
- Do not access roles, skills, playbooks, workflows or knowledge that are not active or generated.
- Do not treat "available" as "exists".
- Do not create all departments during setup.
- Do not skip Strategy because the founder asks for an MVP.
- Do not ask broad empty questions when a guided diagnostic question can move the founder forward.
- Do not route to implementation until Product and Engineering readiness are clear.
- Do not mutate durable files without confirming the founder-facing summary.

## Practical Routing Examples

| Founder Says | Stage | Route |
| --- | --- | --- |
| "Quero começar agora" | Setup Seed or Strategy Seed | Active Strategy founder diagnosis workflow. |
| "Minha ideia faz sentido?" | Strategy Seed or Idea Diagnosis | Diagnose problem, ICP, promise, evidence and risk before roadmap. |
| "Vamos montar o roadmap" | Strategy Baseline | Strategy roadmap workflow if baseline gate is met. |
| "Vamos definir o MVP" | Idea Diagnosis or MVP Validation Scope | Strategy Product defines MVP Validation Scope, then Strategy Roadmap creates the MVP Candidate Roadmap. |
| "Vamos transformar esse item do MVP em entrega" | Roadmap Inicial or MVP Delivery Decision | Return \`activation_required\` for Product Ops if not active; then route to MVP delivery scope definition. |
| "Quebre isso em features" | Product Shaping | Require Product Ops active and delivery scope confirmed. |
| "Implemente essa feature" | Delivery Readiness or Implementation | Return \`activation_required\` for Engineering if not active; then route to delivery cycle. |
| "Lance isso" | Launch | Activate market-facing departments only as needed. |
| "O que aprendemos?" | Learning Loop | Compare evidence with assumptions and update roadmap decisions. |

## Minimum Strategy Gate

Before MVP Validation Scope, Roadmap Inicial or MVP Delivery Decision, Strategy should contain at least:

- problem statement
- ICP or first user segment
- value proposition
- MVP validation scope when the founder is asking for the first MVP path
- key assumptions
- evidence level
- business model direction or explicit uncertainty
- founder priority for the next step

If any item is missing, ask the smallest guided question that fills it.
`;
}

function progressionGates(): string {
  return `# Progression Gates

## Purpose

Define the concrete gates that decide whether LeanOS can move from one founder progression stage to the next.

Use this file with \`founder-progression-model.md\`. The model explains the journey. This file names the required context, allowed next stages and blocked next stages.

## Gate Matrix

| Stage | Required Context | Allowed Next Stages | Blocked Next Stages |
| --- | --- | --- | --- |
| Setup Seed | \`leanos.yaml\` seed context, active Strategy routes, founder start intent | Strategy Seed, Idea Diagnosis | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Seed | product idea, target user guess, problem guess, value promise guess | Strategy Baseline, Idea Diagnosis | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Baseline | problem statement, ICP or first user segment, value proposition, alternative, riskiest assumption, business model direction, immediate focus | MVP Validation Scope, Roadmap Inicial, Idea Diagnosis | MVP Delivery Decision, Product Shaping, Implementation |
| Idea Diagnosis | idea restated, user and problem named, fit with ICP/value checked, evidence and assumptions visible | MVP Validation Scope, Roadmap Inicial, Strategy Baseline | MVP Delivery Decision, Product Shaping, Implementation |
| MVP Validation Scope | Business Thesis, Target User, Core Problem, Promise, MVP Slice, Success Signals, Pivot Signals, Initial MVP Roadmap Candidate | MVP Candidate Roadmap, Roadmap Inicial | MVP Delivery Decision, Product Shaping, Implementation |
| MVP Candidate Roadmap | confirmed roadmap/backlog candidate, outcome, validation goal, Now/Next placement, founder confirmation | MVP Delivery Decision, Product Shaping when Product Ops is active | Implementation |
| MVP Delivery Decision | Product Ops active, delivery scope, PRD or equivalent scope, non-goals, acceptance criteria, dependencies | Product Shaping, Delivery Readiness | Implementation before Feature readiness |
| Product Shaping | Epic exists, scope type, milestone or release goal, expected Features, readiness gaps | Delivery Readiness, Feature Shaping | Implementation |
| Delivery Readiness | Feature exists, Product Ops criteria, Engineering criteria, Design/Security/DevOps criteria satisfied or not applicable | Implementation | Launch, Learning Loop without shipped or tested output |
| Implementation | Engineering active, branch plan, implementation plan, tests or validation plan, PR readiness path | Launch, Learning Loop, Post-Merge Continuation | Scaling / Operating Cadence without usage or recurring operation |
| Launch | release or MVP is available to users, launch owner, support path, rollback or recovery plan, learning signals | Learning Loop, Scaling / Operating Cadence | Implementation without a new ready Feature |
| Learning Loop | evidence, insight, decision, roadmap or backlog impact, next learning action | Strategy Baseline, Roadmap Inicial, MVP Validation Scope, Product Shaping | Scaling / Operating Cadence without recurring usage or operating rhythm |
| Scaling / Operating Cadence | product in use, recurring feedback or operations, metrics, cadence owner, backlog/launch/learning rhythm | Learning Loop, Roadmap Inicial, Delivery Readiness | Setup Seed |

## Required Context

Before moving stages, confirm:

- the current stage is named;
- required context for the current stage exists in active files or is explicitly unknown;
- assumptions are not treated as evidence;
- the next route exists or returns \`activation_required\`;
- the founder has confirmed any durable file update.

## Allowed Next Stages

Allowed next stages are the only stages LeanOS may recommend without explaining a blocked gate.

When multiple next stages are allowed, choose the smallest one that answers the founder's intent:

- if context is unclear, stay in Strategy Seed or Idea Diagnosis;
- if the founder wants fast business validation, move to MVP Validation Scope;
- if the founder wants sequence, move to MVP Candidate Roadmap or Roadmap Inicial;
- if the founder chose a roadmap item for delivery, request Product Ops activation and move to MVP Delivery Decision.

## Blocked Next Stages

Blocked stages require a founder-friendly explanation and the missing gate.

- Do not allow Engineering before Product Ops delivery readiness.
- Do not allow Product Ops to create delivery scope before Strategy Baseline and a roadmap/MVP candidate exist.
- Do not allow Growth launch work before there is a productized, landing-page, concierge or release surface to put in front of users.
- Do not allow GitHub sync before local delivery assets or GitHub setup readiness exist.
- Do not allow Scaling / Operating Cadence before usage, feedback, release activity or recurring operations exist.

## Activation Rules

Use \`activation_required\` only when:

- the requested next stage belongs to an inactive area;
- the current stage gate is satisfied;
- the founder has been told why the active Strategy files are no longer enough;
- the founder confirms activation.

Do not use \`activation_required\` as a substitute for missing Strategy context.

## Founder-Friendly Output

When a gate blocks progress, say:

~~~text
Ainda falta uma decisao antes desse passo.
Estamos em: <current stage>.
Falta: <missing gate>.
Proximo passo seguro: <next route or question>.
~~~
`;
}

function aiStandardReadme(): string {
  return `# AI Standard

## Purpose

LeanOS source-of-truth for creating, reviewing and routing AI-native framework assets.

## When to Use

Use this folder before creating or changing agents, departments, areas, roles, skills, playbooks, workflows, commands, templates, checklists or instructions.

## Fast Route

Use this route for most asset creation work:

1. Decide the asset type with \`foundation/asset-taxonomy.md\`.
2. Confirm placement and boundaries with \`foundation/creation-rules.md\`.
3. Confirm naming with \`foundation/naming-conventions.md\`.
4. Use \`foundation/guided-conversation.md\` when the asset asks the founder to decide, classify, prioritize or confirm.
5. Load the matching file in \`instructions/\`.
6. Use the matching starter in \`templates/\`.
7. Validate the result with the matching file in \`checklists/\`.
8. Open \`examples/\` only if a reference would improve quality.

## Decision Map

| Need | Go To | Why |
| --- | --- | --- |
| Decide what kind of asset something is | \`foundation/asset-taxonomy.md\` | Defines AGENT, README, YAML, role, skill, playbook, knowledge, workflow and command. |
| Decide how a model should move through the workspace | \`foundation/navigation-chain.md\` | Defines owner-first navigation and prevents route skipping. |
| Decide the next founder progression stage | \`foundation/founder-progression-model.md\` | Defines Strategy-first progression, gates, activation_required and Chief routing behavior. |
| Check if a founder progression move is allowed | \`foundation/progression-gates.md\` | Defines required context, allowed next stages and blocked next stages. |
| Design founder-friendly questions or decisions | \`foundation/guided-conversation.md\` | Defines numbered options, decision pauses and confirmation prompts. |
| Decide whether a new file should exist | \`foundation/creation-rules.md\` | Prevents asset sprawl and duplicated ownership. |
| Name a file or folder | \`foundation/naming-conventions.md\` | Keeps names predictable and machine-readable. |
| Judge quality when no specific checklist is enough | \`foundation/quality-criteria.md\` | Provides universal quality and rejection criteria. |
| Create a folder README | \`foundation/folder-documentation-rules.md\` and \`instructions/create-readme-instructions.md\` | Keeps README files as maps, not executors. |
| Create an asset | \`instructions/\` then \`templates/\` | Gives the procedure and the starting shape. |
| Review an asset before accepting it | \`checklists/\` | Applies the right quality gate for the asset type. |
| See what good looks like | \`examples/\` | Provides reference shape only, not active context. |

## Routes

### \`foundation/\`

Core conceptual rules. Use when deciding what belongs where, how assets relate, how navigation works or whether a proposed asset is valid.

### \`templates/\`

Reusable starting structures. Use after choosing the asset type and before drafting the file.

### \`checklists/\`

Quality gates. Use before accepting a newly created or modified asset.

### \`instructions/\`

Creation procedures. Use when the user asks to create or update a LeanOS asset.

### \`examples/\`

Illustrative examples. Use only for reference; active workspace context wins.

## Creation Flow

For any new LeanOS asset:

1. Load only this README and the smallest matching files.
2. State the selected asset type and owner.
3. State the target path.
4. Use the matching instruction and template.
5. Validate with the matching checklist.
6. Ask before writing framework files.

## Do Not Load By Default

- Do not load every foundation file.
- Do not load every template category.
- Do not load every checklist.
- Do not load examples unless a reference is needed.
- Do not let examples override active workspace context.

## Files

- \`foundation/\`
- \`templates/\`
- \`checklists/\`
- \`instructions/\`
- \`examples/\`

## Related Folders

- \`../AGENT.md\`
- \`../.leanos/commands/\`

## Agent Notes

Do not load all of \`ai-standard/\` by default. Choose the smallest foundation file, instruction, template and checklist needed for the active request.

If the next route is unclear, start with \`foundation/asset-taxonomy.md\`.
`;
}

function creationRules(): string {
  return `# Creation Rules

Use these rules before creating or changing any LeanOS framework asset.

## Purpose

Creation rules protect the workspace from asset sprawl, duplicated responsibilities and route-breaking files.

They answer:

- Should this asset exist?
- Where should it live?
- Which existing asset should own this responsibility?
- What must be loaded before creating it?
- What should not be created?

## Load First

Before creating an asset, load:

1. \`asset-taxonomy.md\` to confirm the asset type.
2. \`navigation-chain.md\` to confirm where the asset belongs.
3. \`naming-conventions.md\` to name the file correctly.
4. The matching instruction in \`../instructions/\`.
5. The matching template in \`../templates/\`.
6. The matching checklist in \`../checklists/\`.

## Creation Decision

Create a new asset only when all are true:

- The request cannot be handled by an existing asset.
- The new asset has a clear owner in the Navigation Chain.
- The new asset has a stable reusable purpose.
- The asset will reduce ambiguity for future models.
- The user confirms the creation or update.

Do not create an asset when:

- A README note is enough.
- A role can reference an existing skill.
- A skill can be reused instead of a new skill.
- A playbook would duplicate an existing workflow.
- The asset is only a one-off answer to the current user.
- The asset would bypass department or area ownership.

## Placement Rules

- Root \`AGENT.md\` lives at workspace root.
- Department \`AGENT.md\`, \`README.md\`, \`department.yaml\` and \`workflows/\` live at department root.
- Area \`AGENT.md\`, \`README.md\`, \`area.yaml\`, \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\` live inside the area.
- Roles, skills and playbooks do not live directly under root departments.
- Business workflows live in departments or areas, not in \`.leanos/\`.
- Runtime command instructions live in \`.leanos/commands/\`.
- Framework standards, templates, checklists, instructions and examples live in \`ai-standard/\`.

## Responsibility Rules

- \`AGENT.md\` routes and sets operating boundaries.
- \`README.md\` maps a folder.
- \`department.yaml\` and \`area.yaml\` provide machine-readable structure.
- Role files define who acts.
- Skill files define reusable capabilities.
- Playbook files define execution sequence.
- Knowledge files store confirmed facts and decisions.
- Workflow files coordinate multi-step work across owners.
- Command files define portable chat command behavior.

## Confirmation Rule

Before writing or changing framework assets:

1. State the asset type.
2. State the owner path.
3. State why an existing asset is not enough.
4. State which template and checklist will be used.
5. Ask for explicit confirmation.

## Red Lines

- Do not invent missing roles, skills, playbooks, workflows, commands or templates.
- Do not create assets outside the owning department or area.
- Do not place product or company facts inside framework operating assets.
- Do not update \`ai-standard/\`, \`.leanos/commands/\`, roles, skills, playbooks or workflows during \`/start-leanos\`.
- Do not create a broad asset when a narrow one would be clearer.
- Do not create files just to make the workspace look complete.

## Design Example

If Design needs a reusable capability for evaluating PRs:

- Asset type: skill.
- Owner: \`operations/design/skills/\`.
- File: \`design-review.skill.md\`.
- Role usage: Product Designer, Accessibility Specialist or UX Writer can load it when relevant.
- Do not create \`design-review.playbook.md\` unless there is a repeatable execution sequence beyond the skill itself.
`;
}

function qualityCriteria(): string {
  return `# Quality Criteria

Use these criteria to judge whether a LeanOS asset is good enough to keep.

## Purpose

Quality criteria prevent vague assets, duplicated logic and confusing routes.

They answer:

- Is this asset clear?
- Is it owned by the right level?
- Does it load only necessary context?
- Does it preserve the Navigation Chain?
- Does it help future models act better?

## Universal Criteria

Every LeanOS asset should have:

- Clear purpose.
- Explicit owner.
- Correct location.
- Minimal context loading.
- Clear inputs.
- Clear outputs.
- Boundaries and red lines when relevant.
- References to related assets only when useful.
- No duplicated responsibility.
- No invented product or company facts.

## Routing Quality

A good asset:

- Keeps root routing at department level.
- Lets department AGENTs choose workflows or areas.
- Lets area AGENTs choose roles.
- Lets roles load skills and playbooks.
- Does not skip levels because a later file looks relevant.
- Does not ask a model to load the whole workspace.

## Content Quality

A good asset:

- Uses direct language.
- Says when to use it.
- Says when not to use it.
- Names the files it may update.
- Separates facts from assumptions.
- Uses \`not applicable\` explicitly when a dimension does not apply.
- Asks for confirmation before mutating durable files.

## Asset-Specific Signals

| Asset | Quality Signal |
| --- | --- |
| \`AGENT.md\` | Routes to the next owner without becoming a giant inventory. |
| \`README.md\` | Explains folder purpose, files and navigation without becoming an executor. |
| \`role\` | Defines a clear operating hat and points to relevant skills/playbooks. |
| \`skill\` | Describes a reusable capability, checks and outputs. |
| \`playbook\` | Provides an ordered execution sequence with inputs and outputs. |
| \`knowledge\` | Stores confirmed context without process instructions. |
| \`workflow\` | Coordinates multi-area or multi-stage work. |
| \`command\` | Loads minimal context and defines allowed/forbidden updates. |

## Rejection Criteria

Reject or revise an asset when:

- It duplicates another asset.
- It mixes role, skill, playbook and knowledge responsibilities.
- It has no clear owner.
- It points to paths that do not exist.
- It recommends inactive areas without warning.
- It stores secrets or token values.
- It makes implementation decisions without loading the required role, skill and playbook.
- It updates source-of-truth or framework files without confirmation.

## Final Check

Before accepting an asset, answer:

1. What type of asset is this?
2. Who owns it?
3. What question does it answer?
4. What should load it?
5. What should it never do?
6. Which checklist validates it?
`;
}

function folderDocumentationRules(): string {
  return `# Folder Documentation Rules

Use these rules when creating or reviewing folder documentation, especially \`README.md\` files.

## Purpose

Folder documentation helps humans and models understand where they are, what belongs there and where to go next.

It answers:

- What is this folder for?
- When should an agent enter it?
- Which files are important?
- Which files are source of truth, operating assets or examples?
- Where should the agent route next?

## README Responsibility

A folder README is a map, not the operator.

It should:

- Explain the folder purpose.
- Explain when to use the folder.
- List important files and subfolders.
- Point to the operating owner when one exists.
- Identify related folders.
- Provide navigation notes.

It should not:

- Replace \`AGENT.md\` routing.
- Replace role instructions.
- Replace skill capabilities.
- Replace playbook sequence.
- Store product facts that belong in knowledge files.
- Become a catch-all document.

## Required Sections

Use these sections for important folders:

- \`# <Folder Name>\`
- \`## Purpose\`
- \`## When to Use\`
- \`## Source of Truth\` when the folder owns knowledge or durable context.
- \`## Files\`
- \`## Related Folders\`
- \`## Navigation\`
- \`## Agent Notes\`

If a section does not apply, omit it or state \`Not applicable\` when the absence matters.

## Navigation Rules

- If the folder has \`AGENT.md\`, tell agents to start there for operational work.
- If the folder has \`department.yaml\` or \`area.yaml\`, mention that it provides machine-readable structure.
- If the folder has \`roles/\`, \`skills/\` or \`playbooks/\`, explain that the area owner selects them.
- If the folder contains examples, say examples are references only.
- If the folder contains templates, say templates are starting structures, not active workspace context.

## Folder Type Examples

### Department Folder

Example: \`operations/README.md\`

- Explains what Operations owns.
- Points to \`operations/AGENT.md\`.
- Lists active areas.
- Points to \`workflows/\` for cross-area work.
- Does not list every role, skill or playbook from every area.

### Area Folder

Example: \`operations/design/README.md\`

- Explains what Design owns.
- Points to \`operations/design/AGENT.md\`.
- Lists \`knowledge/\`, \`roles/\`, \`skills/\` and \`playbooks/\`.
- Explains common paths at a high level.
- Does not execute the Design process itself.

### Knowledge Folder

Example: \`operations/design/knowledge/README.md\`

- Explains which durable Design facts live there.
- Lists knowledge files.
- Says updates require confirmation.
- Does not define skills or playbook sequence.

### AI Standard Folder

Example: \`ai-standard/README.md\`

- Routes to foundation, templates, checklists, instructions and examples.
- Explains when to use each route.
- Tells models not to load everything by default.

## Red Lines

- Do not make folder README files huge inventories.
- Do not duplicate all content from child files.
- Do not document paths that do not exist.
- Do not point directly to a role when an area AGENT should route first.
- Do not hide process rules inside a README when a playbook should own them.
`;
}

function assetTaxonomy(): string {
  return `# Asset Taxonomy

Use this taxonomy before creating, changing or routing LeanOS workspace assets.

## Core Rule

\`\`\`text
Role = who acts.
Skill = capability used.
Playbook = practical task execution inside an area.
Knowledge = information/source of truth.
Workflow = coordination across areas, stages or handoffs.
\`\`\`

Do not use one asset type to do another asset type's job.

## Quick Reference

| Asset | What It Is | Question It Answers |
| --- | --- | --- |
| \`AGENT.md\` | Operating owner and router for a workspace level | "Who owns routing at this level?" |
| \`README.md\` | Directory map and human explanation | "What is here and when should I use it?" |
| \`department.yaml\` | Machine-readable department structure | "Which areas and workflows belong to this department?" |
| \`area.yaml\` | Machine-readable area structure | "Which roles, skills, playbooks and knowledge belong to this area?" |
| \`role\` | Persona/responsibility used by the agent | "Which hat should the agent wear?" |
| \`skill\` | Reusable capability used by a role | "Which capability should be applied?" |
| \`playbook\` | Practical task execution inside an area | "In which order should this area execute the task?" |
| \`knowledge\` | Context, facts and source of truth | "What do we know about this?" |
| \`workflow\` | Multi-area, multi-stage or handoff coordination | "How should larger work move across owners?" |
| \`command\` | Portable chat instruction for a known intent | "What should happen when the user invokes this command?" |

## Workflow vs Playbook

Use this distinction when deciding where a process belongs:

\`\`\`text
Workflow = coordinates multiple areas, stages or handoffs.
Playbook = executes a practical task inside one area.
\`\`\`

A workflow should explain who participates, what handoffs happen and when the work moves from one owner to another.
A playbook should explain the concrete steps an area follows after the correct owner, role and skills are selected.

If the process crosses Product Ops, Design, Engineering or Security, it is probably a workflow.
If the process is branch creation, PR preparation, design foundation or security review inside one area, it is probably a playbook.

## Asset Types

### \`AGENT.md\`

An \`AGENT.md\` is the operating owner for a level of the workspace.

- Lives at the root, department root or selected area root.
- Answers: "Who decides the next route here?"
- Create when a level needs routing rules, red lines or delegation logic.
- Do not create when a README map is enough.
- Agents should load it before entering lower-level roles, skills or playbooks.

Example: \`operations/design/AGENT.md\` acts as the Design area lead. It chooses between Product Designer, UX Researcher, Accessibility Specialist and UX Writer.

### \`README.md\`

A \`README.md\` is the map for a folder.

- Lives in every important folder.
- Answers: "What is this folder for, what files exist here and how do I navigate?"
- Create for folders that humans or models will enter.
- Do not use it as a long operating manual when an \`AGENT.md\`, role, skill or playbook should own that detail.
- Agents should use it to understand local structure.

Example: \`operations/design/README.md\` explains the Design area, its knowledge files, roles, skills and playbooks.

### \`department.yaml\`

\`department.yaml\` is the structured map for a root department.

- Lives at \`strategy/department.yaml\`, \`operations/department.yaml\` or \`growth/department.yaml\`.
- Answers: "Which areas and workflows are active in this department?"
- Create for every root department.
- Do not store narrative product context or company facts in it.
- Agents should use it when they need machine-readable structure.

Example: \`operations/department.yaml\` lists areas such as Product Ops, Design, Engineering, DevOps and Security.

### \`area.yaml\`

\`area.yaml\` is the structured map for an area.

- Lives inside an area, such as \`operations/design/area.yaml\`.
- Answers: "Which roles, skills, playbooks and knowledge files belong here?"
- Create for every active area.
- Do not use it as a replacement for role, skill or playbook instructions.
- Agents should use it to verify available local assets.

Example: \`operations/design/area.yaml\` lists Design roles, skills, playbooks and \`knowledge/\` files.

### Role

A role is an operating persona and responsibility boundary.

- Lives in \`<area>/roles/<direct-name>.role.md\`.
- Answers: "With which hat should the agent act?"
- Create when a recurring responsibility needs a distinct point of view.
- Do not create a role for a one-off task or a simple capability.
- Agents should select one role before loading skills or playbooks.

Example: \`operations/design/roles/product-designer.role.md\` owns product design decisions and points to \`design-system.skill.md\`, \`user-flow-mapping.skill.md\`, \`screen-specification.skill.md\` and \`design-review.skill.md\`.

### Skill

A skill is a reusable capability.

- Lives in \`<area>/skills/<direct-name>.skill.md\`.
- Answers: "Which capability should be applied?"
- Create when the same capability is reused by one or more roles or playbooks.
- Do not make a skill a full process; that belongs in a playbook.
- Agents should load only the skills required by the active role and task.

Example: \`operations/design/skills/accessibility.skill.md\` defines how to apply accessibility checks and WCAG 2.2 AA expectations.

### Playbook

A playbook is a practical execution sequence inside one area.

- Lives in \`<area>/playbooks/<direct-name>.playbook.md\`.
- Answers: "In which order should this area execute the task?"
- Create when a task has repeatable steps, inputs, outputs and file update rules.
- Do not create a playbook for a single check or isolated capability.
- Do not use a playbook to coordinate multiple areas or cross-department handoffs.
- Agents should use it after selecting the role and loading required skills.

Example: \`operations/design/playbooks/design-foundation.playbook.md\` sequences design-system, accessibility and user-flow work before implementation.

### Knowledge

Knowledge files hold context, facts, decisions and source-of-truth notes.

- Lives in \`<area>/knowledge/\` when the area uses reusable knowledge.
- Answers: "What do we know about this?"
- Create when information must persist across tasks.
- Do not put operating instructions, role behavior or process steps here.
- Agents should update knowledge only after explicit user confirmation.

Example: \`operations/design/knowledge/design-system.md\` stores the design-system baseline. It does not decide how to create the design system; the skill and playbook do that.

### Workflow

A workflow coordinates multiple areas, stages or handoffs.

- Lives in \`<department>/workflows/\` or, when truly area-owned, \`<area>/workflows/\`.
- Answers: "How should larger work move across owners?"
- Create when the task spans multiple roles, areas or stages.
- Do not create a workflow for practical execution inside one area; use a playbook for that.
- Do not place business workflows in \`.leanos/workflows/\`; \`.leanos/\` is runtime support.
- Agents should use workflows to coordinate owners, then enter the relevant area and role.

Example: \`operations/workflows/feature-to-delivery-cycle.workflow.md\` can coordinate Product Ops, Design, Engineering and Security for feature delivery.

### Command

A command is a portable chat instruction for a known user intent.

- Lives in \`.leanos/commands/<command>.md\`.
- Answers: "What should happen when the user invokes this command?"
- Create when a common chat intent needs stable loading rules.
- Do not create commands for every possible workflow; natural language can route through AGENT.md.
- Agents should load the command file before acting on a matching slash command.

Example: \`.leanos/commands/define-design.md\` tells the agent how to prepare Design foundation safely.

## Design Example

If the founder says, "define the design before implementation":

1. Root \`AGENT.md\` routes to \`operations/AGENT.md\`.
2. Operations routes to \`operations/design/AGENT.md\`.
3. Design area AGENT chooses \`roles/product-designer.role.md\`.
4. The role loads skills:
   - \`skills/design-system.skill.md\`
   - \`skills/accessibility.skill.md\`
   - \`skills/user-flow-mapping.skill.md\`
5. The work follows \`playbooks/design-foundation.playbook.md\`.
6. Confirmed outputs update:
   - \`knowledge/design-system.md\`
   - \`knowledge/accessibility.md\`
   - \`knowledge/user-flows.md\`

This keeps responsibilities separated:

- The role defines the operating perspective.
- The skills define capabilities.
- The playbook defines order.
- The knowledge files store confirmed facts and decisions.
`;
}

function agentTemplate(): string {
  return `# Agent Template

Use the smallest matching agent template.

## Choose One

- Root workspace agent: \`root-agent-template.md\`
- Department agent: \`department-agent-template.md\`
- Area agent: \`area-agent-template.md\`

## Rule

\`AGENT.md\` is the operating owner for its level. It should route work, set red lines and delegate details to the next owner. Do not turn an AGENT.md into a full inventory of every workflow, role, skill or playbook.
`;
}

function rootAgentTemplate(): string {
  return `# <Workspace> Agent

You are the chief operating agent for this workspace.

Your job is to help the user operate a product company with strategic coherence before and during implementation.

## Start Here

Read these files first:

- \`leanos.yaml\`
- \`.leanos/context/workspace-summary.md\`
- \`.leanos/context/current-focus.md\`
- \`.leanos/context/next-actions.md\`
- \`.leanos/index/routing-map.yaml\`

## Red Lines / Non-Negotiable Rules

- For every LeanOS task, command, workflow, file update, strategy decision, product decision, implementation request or review request, always start with the Response Header.
- Never execute a routed LeanOS task before showing the route.
- Use \`not applicable\` only when a Response Header field truly does not apply.
- Enter the owning department or area before acting.
- When an area has its own \`AGENT.md\`, use it as the area operating owner before loading roles, skills or playbooks.
- Do not invent missing workflows, roles, skills, playbooks, commands or templates.
- Do not load the whole workspace when a smaller route exists.
- Do not write secrets to tracked files.
- Ask before modifying knowledge, decision or framework files.
- Do not create or modify LeanOS framework assets from memory. Route through \`ai-standard/README.md\`.
- For "where are we?", "what do we have?", "what is missing?", "can we start building?" or similar readiness/status requests, load \`.leanos/agent/protocols/where-we-are.md\` before recommending a next step or implementation.
- For trace, debug, diagnostic, "what did LeanOS do?" or "send a report to the framework" requests, load \`.leanos/agent/protocols/chief-trace.md\` and create only a safe local trace after confirmation.
- During \`/start-leanos\`, do not enrich roles, skills, playbooks, workflows, commands or \`ai-standard/\` with company/product context.
- Do not modify source-of-truth, decision, framework or runtime files until the user explicitly confirms the proposed changes.

## Response Header

For every routed LeanOS task, start with:

Active Department:
Active Area:
Active Role:
Loaded Skills:
Relevant Playbook:
Loaded Context:

## Command Handling

LeanOS slash commands are portable across VS Code, Claude, Codex, terminal agents and any chat interface.

When the user invokes \`/start-leanos\`, load \`.leanos/commands/start-leanos.md\` and follow it.

When the user invokes legacy \`/leanos-init\` or inverted \`/leanos-start\`, treat it as \`/start-leanos\`.

For any LeanOS slash command, normalize the command to kebab-case and load \`.leanos/commands/<command>.md\` before acting.

If the command file is missing, do not invent the command. Explain what is missing and route through the active context instead.

## Natural Language Handling

If a natural-language request clearly matches an existing LeanOS command, load the matching command file before acting.

Examples:

- "help me define the ICP" -> \`.leanos/commands/define-icp.md\`
- "define the MVP validation scope" -> route to active Strategy Product before delivery scope exists
- "turn this roadmap item into executable MVP scope" -> \`.leanos/commands/define-mvp.md\` when Product Ops is active
- "review this PR" -> \`.leanos/commands/review-pr.md\`

If no command clearly matches, route through the Navigation Chain.

## Status And Readiness Questions

When the founder asks where the product stands, what exists so far, what is missing, what should happen next or whether development can start, do not answer from memory and do not jump directly to implementation.

Load:

\`.leanos/agent/protocols/where-we-are.md\`

Use that protocol to inspect the smallest relevant Strategy, Operations and GitHub readiness files. Then explain the current product moment, missing prerequisites, risk of skipping steps and the safest next route.

## Trace And Diagnostics

When the founder asks to debug LeanOS behavior, inspect what the Chief did, record the route, or send a report to the framework maintainer, do not export the conversation and do not invent telemetry.

Load:

\`.leanos/agent/protocols/chief-trace.md\`

Use that protocol to create a local, structured and redacted trace in \`.leanos/traces/\` only after explicit confirmation.

## Navigation Chain

LeanOS uses owner-first navigation:

\`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

Use the chain to choose the next owner, one level at a time.

1. Root chooses the owning department.
2. Department chooses a workflow or active area.
3. Area chooses the specialist role when it has \`AGENT.md\`; otherwise use its \`README.md\` as the local map.
4. Role points to the required skills and playbooks.
5. Skills and playbooks shape the work.
6. Output updates only the smallest relevant knowledge, decision or project file.

Do not skip levels because a later file looks relevant.
Do not load the whole workspace when a smaller route exists.

## File Responsibilities

- \`AGENT.md\`: operating owner for this level.
- \`README.md\`: directory map and explanation.
- \`department.yaml\` and \`area.yaml\`: machine-readable structure.
- \`workflows/\`: multi-step flows owned by the department or area that contains them.
- \`roles/\`, \`skills/\` and \`playbooks/\`: area-level execution assets.

## Root Routing

Use this section only to choose the owning department. The department \`AGENT.md\` chooses the workflow or area.

- <Department>: \`<department>/AGENT.md\`
  Use for <request types>.
  Map: \`<department>/README.md\`

## LeanOS Runtime

\`.leanos/\` contains runtime files for commands, context, indexes and VS Code integration.
\`.leanos/\` does not own business workflows. Operational workflows live in root departments or their areas.

\`ai-standard/\` is the framework standards router for creating, changing, reviewing or validating LeanOS assets.

## Framework Standards Routing

Use \`ai-standard/README.md\` only when the user asks to create, change, review or validate LeanOS framework assets.

Framework assets include:

- roles, skills, playbooks, workflows and commands
- \`AGENT.md\` files and README files
- templates, checklists and instructions
- \`department.yaml\` and \`area.yaml\`

Do not guess the correct template, checklist or instruction from memory.

When framework standards are needed:

1. Load \`ai-standard/README.md\`.
2. Follow its route to the smallest needed foundation, instruction, template, checklist or example.
3. State the selected asset type, owner and target path.
4. Propose the change before writing.
5. Validate with the matching checklist before final output.

Do not use \`ai-standard/\` to define product strategy, MVP, roadmap, design, engineering work or growth work. Route those through the Navigation Chain first.
`;
}

function departmentAgentTemplate(): string {
  return `# <Department> Agent

You are the operating owner for this department.

Use \`README.md\` as the directory map. Use \`department.yaml\` when machine-readable structure matters.

Roles, skills and playbooks do not live at the department root. They live inside active areas.

## Operating Scope

Describe what this department owns.

## Routing Rules

1. If the founder request is a journey, open \`workflows/README.md\` and choose the smallest matching workflow.
2. A journey changes state, priority, scope, handoff, roadmap, delivery, launch or learning.
3. If the request belongs to one area and one asset family, route to that area \`AGENT.md\` when present; otherwise route to its README.
4. If you are unsure, check \`workflows/README.md\` first; if no workflow matches, route to the smallest active area.
5. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
6. Do not load roles, skills or playbooks before entering the owning area.

## Journey Signals

Use \`workflows/README.md\` when the founder asks for a multi-step decision or transition, such as:

- evaluating, planning, shaping, implementing, reviewing or launching something;
- moving work from one stage to another;
- coordinating multiple areas or handoffs;
- changing priority, scope, roadmap, delivery or learning state.

## Active Areas

- <Area>: \`<area>/AGENT.md\` or \`<area>/README.md\` - <purpose>

## Workflow Entry

- Department workflows: \`workflows/README.md\`

Use workflows for multi-step journeys and cross-area sequencing. Use area playbooks for tactical execution inside one area.
`;
}

function areaAgentTemplate(): string {
  return `# <Area> Agent

You are the <Area Lead> for this workspace.

This \`AGENT.md\` is the operating owner for the area.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Operating Scope

Describe what this area lead owns and how it protects quality.

## Role Routing

Choose the smallest specialist role for the request:

- <Specialist Role>: \`roles/<role>.role.md\` - use when <condition>.

## Routing Rules

1. Start from this area AGENT for operational work inside the area.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. If the request needs a missing specialist, skill or playbook, explain the gap and ask before creating it.
5. Keep reusable area knowledge in \`knowledge/\` when the area uses a knowledge folder.

## Navigation

\`<area>/AGENT.md -> Role -> Skills -> Playbook -> Output\`
`;
}

function areaReadmeTemplate(): string {
  return `# <Area>

## Purpose

What this area owns.

## When to Use

- <intent or situation>

## Source of Truth

- \`<file>.md\`

## Navigation

1. If this area has \`AGENT.md\`, start there for operational routing.
2. Use this README as the directory map.
3. After the area owner selects a role, load only required skills and playbooks.
4. Produce the requested output and update source-of-truth files when needed.

## File Responsibilities

- \`AGENT.md\`: optional area operating owner.
- \`README.md\`: area map and explanation.
- \`area.yaml\`: machine-readable structure for this area.
- \`roles/\`: operating personas for this area.
- \`skills/\`: focused capabilities used by roles.
- \`playbooks/\`: tactical execution sequences.

## Common Paths

- <request>: role \`roles/<role>.role.md\` -> skill \`skills/<skill>.skill.md\` -> playbook \`playbooks/<playbook>.playbook.md\`.
`;
}

function playbookTemplate(): string {
  return `# <Playbook Name>

## Purpose

Explain the practical task this playbook executes inside one area.

## Use When

- ...
- ...
- ...

## Inputs

- ...
- ...
- ...

## Guided Conversation

Use \`../../../ai-standard/foundation/guided-conversation.md\` when the playbook needs the founder to choose, classify, prioritize or confirm.

Ask guided questions when:

- required context is missing;
- the founder must choose between predictable paths;
- a durable file update depends on confirmation;
- the next step changes roadmap, MVP, issue, PR, implementation, launch or learning state.

Do not ask a rigid questionnaire. Ask only what is missing.

## Process

1. ...
2. ...
3. ...

## Outputs

- ...
- ...
- ...

## Files To Update

- ...

## Confirmation Rules

- Ask before updating durable files.
- Ask before calling scripts, APIs or external capabilities.
- Ask before changing roadmap, MVP, issue, PR or implementation state.

## Red Lines

- Do not duplicate a workflow.
- Do not duplicate skills.
- Do not invent missing context.
- Do not update files without explicit confirmation.

## Navigation

\`../AGENT.md -> roles/<role>.role.md -> skills/<skill>.skill.md -> playbooks/<this-playbook>.playbook.md -> Output\`
`;
}

function playbookYamlTemplate(): string {
  return `playbook:
  key: <playbook-key>
  title: <Playbook Name>
  owner_area: <department.area>
  purpose: <practical task this playbook executes>
  use_when:
    - <trigger>
  inputs:
    - <input>
  guided_conversation:
    foundation: ../../../ai-standard/foundation/guided-conversation.md
    use_when:
      - founder decision is needed
      - durable update needs confirmation
  process:
    - <step>
  outputs:
    - <output>
  files_to_update:
    - <path>
  confirmation_required:
    - durable file updates
    - external actions
  red_lines:
    - do not duplicate a workflow
`;
}

function productEpicTemplate(): string {
  return `# [EPIC] <epic title>

## Metadata

~~~yaml
epic_key: <stable-kebab-key>
source_roadmap_item: <roadmap item or backlog reference>
delivery_scope:
  scope_type: MVP | Release | Experiment | Beta | Internal
  milestone:
  release_goal:
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
owner: Product Ops
decision_owner: Product Owner
supporting_roles:
  - Roadmap Planner
  - Product Strategist
  - Senior Developer when technical feasibility matters
  - Product Designer when UX is affected
  - Security Reviewer when data/auth/privacy/security is affected
  - DevOps Engineer when delivery, deploy or GitHub sync is affected
github_issue:
  url:
~~~

## Outcome

What user, business or validation outcome this epic should create.

## Why Now

Why this epic belongs in the current delivery scope instead of backlog or later roadmap.

## Starting Point

Use these inputs before shaping the epic:

- Product brief:
- ICP / user segment:
- Problem:
- Roadmap item:
- Delivery scope:
- PRD or MVP scope:
- Existing evidence:
- Known constraints:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Epic Decision Criteria

- User value:
- Business value:
- Strategic fit:
- Evidence level:
- Opportunity cost:
- Milestone fit:
- Risk level:

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

Use this to decide which specialists must participate before breaking the epic into features.

| Dimension | Required? | Why / Not Applicable | Required Output |
| --- | --- | --- | --- |
| Product Ops | yes | Epic ownership and delivery scope | outcome, scope, non-goals, feature candidates |
| Roadmap / Strategy | yes | Roadmap and milestone alignment | roadmap linkage and priority rationale |
| Engineering | conditional | Technical feasibility, dependencies or unknown complexity | feasibility notes and implementation boundary |
| Design | conditional | User-facing flow, screen, state, copy or accessibility impact | UX notes and design questions |
| Security | conditional | Data, auth, permissions, privacy, abuse, API or compliance risk | security criteria and risks |
| DevOps | conditional | GitHub sync, CI/CD, environment, release, observability or config impact | operational criteria |

## Expected Features

List candidate features. Do not fully detail them here; each feature gets its own feature file.

| Feature | User Outcome | Required Dimensions | Notes |
| --- | --- | --- | --- |
| <feature title> | <outcome> | Product Ops, Engineering, Design/Security/DevOps if applicable | <notes> |

## Dependencies

- Product:
- Design:
- Engineering:
- Security:
- DevOps:

## Risks

- Product risk:
- Technical risk:
- Design risk:
- Security risk:
- Delivery risk:

## Open Questions

- TBD

## Next Step

After this epic is confirmed, run \`epic-to-features\` to create feature files with internal tasks and Delivery Readiness Matrix criteria.
`;
}

function productFeatureTemplate(): string {
  return `# [FEATURE: <epic title>] <feature title>

## Metadata

~~~yaml
feature_key: <stable-kebab-key>
parent_epic_key: <epic-key>
status: candidate | scoped | ready | in-progress | blocked | done
sync_status: not_synced | sync_ready | synced | conflict
owner: Product Ops
execution_owner: Engineering
github_issue:
  url:
~~~

## Parent Epic

- Epic:
- Epic outcome:
- Milestone:
- Delivery scope:

## User Story

As a <user>, I want <capability> so that <outcome>.

## Purpose

Why this feature exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Acceptance Criteria

- TBD

## Tasks

Use tasks as the internal implementation checklist. Keep them small enough to guide Engineering.

~~~text
Create database model
Create UI
Add validation
Add tests
~~~

## Delivery Readiness Matrix

| Dimension | Status | Criteria / Notes |
| --- | --- | --- |
| Product Ops | required | user value, acceptance criteria, non-goals |
| Engineering | required | implementation boundary, dependencies, tests |
| Design | not_applicable/TBD/ready | required only for UX, UI, copy, flow, state or accessibility impact |
| Security | not_applicable/TBD/ready | required only for data, auth, permissions, privacy, abuse, API or compliance risk |
| DevOps | not_applicable/TBD/ready | required only for deploy, env, CI/CD, observability, config or GitHub sync impact |

## Design Criteria

If not applicable, say why.

- Flow:
- Screens or states:
- Component/design-system notes:
- Accessibility:

## Engineering Criteria

- Suggested area:
- Technical notes:
- Dependencies:
- Test expectations:
- Observability or operational notes:

## Security Criteria

If not applicable, say why.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

## Definition of Ready

- [ ] Parent epic is clear
- [ ] Acceptance criteria are testable
- [ ] Product Ops and Engineering criteria are ready
- [ ] Design is ready or explicitly not applicable
- [ ] Security is ready or explicitly not applicable
- [ ] DevOps is ready or explicitly not applicable
- [ ] Tasks are clear enough for implementation

## Definition of Done

- [ ] Acceptance criteria satisfied
- [ ] Tasks completed or explicitly descoped
- [ ] Tests or validation evidence recorded
- [ ] Design review completed or explicitly not applicable
- [ ] Security review completed or explicitly not applicable
- [ ] DevOps/release notes completed or explicitly not applicable
- [ ] Parent epic updated with result
`;
}

function githubEpicTemplate(): string {
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

function githubFeatureTemplate(): string {
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

function deliveryReadinessMatrixTemplate(): string {
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

function componentSpecTemplate(): string {
  return `# Component Spec: <component-name>

Use this template when a Feature needs a reusable UI component that is not already approved in the Design component inventory.

This file is owned by Design. Engineering uses it as an implementation contract.

## Status

- Status: draft / approved / needs-review / deprecated
- Owner: Design
- Related Feature:
- Related Epic:
- Last Updated:

## Purpose

Explain what this component does and what user problem it helps solve.

## When To Use

- Use when...
- Use when...

## When Not To Use

- Do not use when...
- Do not use when...

## Anatomy

List the visible and structural parts of the component.

- Container:
- Header/title:
- Primary content:
- Actions:
- Supporting text:
- Feedback area:

## Variants

| Variant | Purpose | When To Use | Notes |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |

## States

| State | Expected Behavior | UX Copy | Accessibility Notes |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |
| Hover | TBD | TBD | TBD |
| Focus | TBD | TBD | TBD |
| Disabled | TBD | TBD | TBD |
| Loading | TBD | TBD | TBD |
| Empty | TBD | TBD | TBD |
| Error | TBD | TBD | TBD |
| Success | TBD | TBD | TBD |

## Behavior

- Interaction:
- Validation:
- Data loading:
- Error handling:
- Responsive behavior:

## Accessibility

- Keyboard behavior:
- Focus order:
- ARIA/semantic requirements:
- Contrast requirements:
- Screen reader notes:
- Reduced motion notes:

## Content Rules

- Labels:
- Helper text:
- Empty state:
- Error messages:
- Success messages:
- Copy red lines:

## Design Tokens

- Typography:
- Color intent:
- Spacing:
- Radius:
- Border:
- Shadow:
- Motion:

## Composition Rules

- Can contain:
- Can be contained by:
- Should not be nested with:
- Maximum recommended complexity:
- Reuse guidance:

## Engineering Notes

- Expected props or inputs:
- Data dependencies:
- Events/callbacks:
- Testing expectations:
- Performance concerns:
- Existing patterns to follow:

## Do Not Do

- Do not hardcode product copy that should come from Feature context.
- Do not hardcode colors outside the Design token intent.
- Do not create a one-off component when this should be reusable.
- Do not skip keyboard, focus, loading, empty or error states when applicable.

## Open Questions

- TBD
`;
}

function branchNameTemplate(): string {
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

function pullRequestTemplate(): string {
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

function codeReviewTemplate(): string {
  return `# Code Review Template

## Review Context

- PR:
- Linked issue:
- Parent epic:
- Delivery scope:
- Acceptance criteria:

## Findings

List findings by severity.

| Severity | File/Area | Finding | Required Change |
| --- | --- | --- | --- |
| blocker/high/medium/low | TBD | TBD | TBD |

## Review Dimensions

- Correctness
- Scope control
- Tests
- Architecture
- Security/privacy when applicable
- Design/UX when applicable
- LeanOS source-of-truth alignment

## Decision

- [ ] Ready to merge
- [ ] Needs changes
- [ ] Blocked by missing context

## Open Questions

TBD
`;
}
