import { rootDepartments } from "../definitions/departments.js";
import { getAllAreas, getArea } from "../selectors.js";
import type { FileEntry } from "../types.js";
import { rootAgent } from "./agent.js";
import { playbookFile, roleFile, skillFile } from "./departments.js";
import { creationInstructions, folderReadme, qualityChecklist, standardTemplate, toTitle } from "../content/shared.js";

export function aiStandardFiles(): FileEntry[] {
  const templateFiles = [
    "agent-template.md",
    "command-template.md",
    "department-template.md",
    "department-template.yaml",
    "area-template.md",
    "area-template.yaml",
    "folder-readme-template.md",
    "github-issue-template.md",
    "github-epic-template.md",
    "github-subissue-template.md",
    "issue-readiness-matrix-template.md",
    "branch-name-template.md",
    "pull-request-template.md",
    "code-review-template.md",
    "playbook-template.md",
    "playbook-template.yaml",
    "role-template.md",
    "role-template.yaml",
    "root-readme-template.md",
    "skill-template.md",
    "skill-template.yaml",
    "workflow-template.md"
  ];
  const checklists = ["agent", "area", "command", "department", "playbook", "readme", "role", "skill"];
  const instructions = ["create-agent", "create-area", "create-command", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];

  return [
    { path: "ai-standard/README.md", content: folderReadme("AI Standard", "LeanOS standards for creating and reviewing AI-native workspace assets.", "Use before creating or changing agents, departments, areas, roles, skills, playbooks, workflows or commands.", "navigation-chain.md", ["navigation-chain.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-readme-rules.md", "templates/", "checklists/", "instructions/", "examples/"], ["../AGENT.md", "../.leanos/commands/"], "Consult the standard before creating or modifying LeanOS assets.") },
    { path: "ai-standard/navigation-chain.md", content: "# Navigation Chain\n\n`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output`\n\nRoot departments route work. Areas own roles, skills and playbooks. Outputs should update source-of-truth files only when requested or clearly needed.\n" },
    { path: "ai-standard/creation-rules.md", content: "# Creation Rules\n\n- Create roles, skills and playbooks inside the correct area.\n- Do not place roles, skills or playbooks directly under root departments.\n- Every area asset must reference its local README and source-of-truth files.\n- Keep LeanOS runtime files in `.leanos/` small and route-focused.\n" },
    { path: "ai-standard/quality-criteria.md", content: "# Quality Criteria\n\n- Clear purpose\n- Explicit routing\n- Minimal context loading\n- Source-of-truth references\n- Output expectations\n" },
    { path: "ai-standard/naming-conventions.md", content: "# Naming Conventions\n\n- Areas use lowercase kebab-case paths.\n- Roles end with `.role.md`.\n- Skills end with `.skill.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n" },
    { path: "ai-standard/folder-readme-rules.md", content: "# Folder README Rules\n\nEvery important folder should explain purpose, when to use it, source of truth, files, related folders and navigation notes.\n" },
    { path: "ai-standard/templates/README.md", content: folderReadme("Templates", "Reusable templates for LeanOS assets.", "Use when creating new workspace assets.", "role-template.md", templateFiles, ["../checklists/", "../instructions/"], "Copy the smallest matching template and adapt it to the active department or area.") },
    ...templateFiles.map((file) => ({ path: `ai-standard/templates/${file}`, content: templateContent(file) })),
    { path: "ai-standard/checklists/README.md", content: folderReadme("Checklists", "Quality checklists for LeanOS assets.", "Use before accepting newly created or modified assets.", "role-quality-checklist.md", checklists.map((name) => `${name}-quality-checklist.md`), ["../templates/", "../instructions/"], "Run the relevant checklist before final output.") },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklist(toTitle(name)) })),
    { path: "ai-standard/instructions/README.md", content: folderReadme("Instructions", "Instructions for creating LeanOS assets.", "Use when a command asks to create or update framework assets.", "create-role-instructions.md", instructions.map((name) => `${name}-instructions.md`), ["../templates/", "../checklists/"], "Follow instructions, then validate with the matching checklist.") },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructions(toTitle(name.replace("create-", ""))) })),
    { path: "ai-standard/examples/README.md", content: folderReadme("Examples", "Examples of LeanOS assets.", "Use as references only; prefer active area context.", "example-role-senior-developer.md", ["example-agent.md", "example-folder-readme.md", "example-role-senior-developer.md", "example-skill-check-coherence.md", "example-playbook-issue-to-pr.md"], ["../templates/", "../checklists/"], "Examples are illustrative and should not override active workspace context.") },
    { path: "ai-standard/examples/example-agent.md", content: rootAgent(getAllAreas(), rootDepartments) },
    { path: "ai-standard/examples/example-folder-readme.md", content: folderReadme("Example Folder", "Example purpose.", "Use when relevant.", "README.md", ["README.md"], ["../"], "Example notes.") },
    { path: "ai-standard/examples/example-role-senior-developer.md", content: roleFile(getArea("operations.engineering"), getArea("operations.engineering").roles[0]) },
    { path: "ai-standard/examples/example-skill-check-coherence.md", content: skillFile(getArea("strategy.product"), getArea("strategy.product").skills.find((skill) => skill.slug === "check-coherence") ?? getArea("strategy.product").skills[0]) },
    { path: "ai-standard/examples/example-playbook-issue-to-pr.md", content: playbookFile(getArea("operations.engineering"), getArea("operations.engineering").playbooks[0]) }
  ];
}

function templateContent(fileName: string): string {
  const templates: Record<string, string> = {
    "github-epic-template.md": githubEpicTemplate(),
    "github-subissue-template.md": githubSubissueTemplate(),
    "issue-readiness-matrix-template.md": issueReadinessMatrixTemplate(),
    "branch-name-template.md": branchNameTemplate(),
    "pull-request-template.md": pullRequestTemplate(),
    "code-review-template.md": codeReviewTemplate()
  };

  return templates[fileName] ?? standardTemplate(fileName);
}

function githubEpicTemplate(): string {
  return `# Epic: <title>

## Outcome

What business, user or validation outcome this epic should create.

## Strategic Context

- Product:
- ICP:
- Problem:
- Value proposition:
- Validation assumption:
- Evidence status:

## MVP Linkage

- MVP scope:
- Non-goals:
- Acceptance criteria:
- Roadmap item:
- Milestone:

## Scope

What is included.

## Non-goals

What is explicitly excluded.

## Product Criteria

- User value:
- Jobs to be done:
- Acceptance criteria:
- Learning or success signal:

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

## Sub-issue Breakdown

- Status: not_started
- Expected sub-issues:
- Open questions:
`;
}

function githubSubissueTemplate(): string {
  return `# <sub-issue title>

## Parent Epic

- Epic:
- Milestone:
- Roadmap item:

## Purpose

Why this issue exists.

## Scope

What should be implemented.

## Non-goals

What should not be implemented.

## Product Criteria

- User value:
- Acceptance criteria:
- Success or learning signal:

## Design Criteria

Use only when this sub-issue changes a user-facing flow, screen, state, copy or interaction.

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

Use when this sub-issue touches data, auth, permissions, privacy, abuse risk or compliance.

- Data:
- Permissions:
- Privacy:
- Abuse cases:
- Security acceptance criteria:

If not applicable, write: "Not applicable; no security-sensitive surface identified."

## Definition of Done

- [ ] Product criteria satisfied
- [ ] Design criteria satisfied or explicitly not applicable
- [ ] Engineering criteria satisfied
- [ ] Security criteria satisfied or explicitly not applicable
- [ ] Tests or validation plan defined
- [ ] Parent epic updated if needed
`;
}

function issueReadinessMatrixTemplate(): string {
  return `# Issue Readiness Matrix

Use this before creating epics, sub-issues or implementation plans.

| Dimension | Required When | Required Output | Status |
| --- | --- | --- | --- |
| Product | Always | user, problem, outcome, acceptance criteria, learning signal | TBD |
| Design | User-facing flow, screen, state, copy or interaction changes | flow, states, UX constraints, accessibility notes | not_applicable/TBD |
| Engineering | Always for implementation work | technical approach, boundaries, dependencies, test plan | TBD |
| Security | Data, auth, permissions, privacy, abuse or compliance is involved | data classification, permission rules, privacy/security criteria | not_applicable/TBD |

## Readiness Rule

Do not create implementation-ready sub-issues until Product and Engineering are clear.

Design is required only when user experience is affected.

Security is required only when the issue has a security-sensitive surface.
`;
}

function branchNameTemplate(): string {
  return `# Branch Name Template

Use focused branches tied to a GitHub issue.

## Format

\`\`\`text
issue/<issue-number>-<short-kebab-slug>
\`\`\`

## Examples

\`\`\`text
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
\`\`\`

## Rules

- Always include the real issue number.
- Use a short kebab-case slug.
- Do not include secrets, customer names or sensitive details.
- Do not implement issue work on the default branch.
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

## Product / MVP Alignment

- Roadmap item:
- MVP scope:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Security Notes

State "Not applicable" when no security-sensitive surface exists.

## Tests

- [ ] Automated tests run or updated
- [ ] Manual validation completed or explained

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
- MVP scope:
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
