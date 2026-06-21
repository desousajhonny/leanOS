import { rootDepartments } from "../definitions/departments.js";
import { getAllAreas, getArea } from "../selectors.js";
import type { FileEntry } from "../types.js";
import { rootAgent } from "./agent.js";
import { playbookFile, roleFile, skillFile } from "./departments.js";
import { creationInstructions, folderReadme, qualityChecklist, standardTemplate, toTitle } from "../content/shared.js";

export function aiStandardFiles(): FileEntry[] {
  const templateFiles = [
    "agent-template.md",
    "root-agent-template.md",
    "department-agent-template.md",
    "area-agent-template.md",
    "area-readme-template.md",
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
    { path: "ai-standard/navigation-chain.md", content: "# Navigation Chain\n\nLeanOS uses owner-first navigation:\n\n`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output`\n\nUse the chain to choose the next owner, one level at a time.\n\n1. Root chooses the owning department.\n2. Department chooses a workflow or active area.\n3. Area chooses the specialist role when it has `AGENT.md`; otherwise use its `README.md` as the local map.\n4. Role points to the required skills and playbooks.\n5. Skills and playbooks shape the work.\n6. Output updates only the smallest relevant source-of-truth, knowledge or decision file.\n\nDo not skip levels because a later file looks relevant.\nDo not load the whole workspace when a smaller route exists.\n" },
    { path: "ai-standard/creation-rules.md", content: "# Creation Rules\n\n- `AGENT.md` is the operating owner for its level.\n- `README.md` is the directory map and explanation.\n- Area `AGENT.md` files are optional and should exist only when an area needs a lead router before specialist roles.\n- Create roles, skills and playbooks inside the correct area.\n- Do not place roles, skills or playbooks directly under root departments.\n- Every area asset must reference its area owner, local README and source-of-truth files.\n- Keep LeanOS runtime files in `.leanos/` small and route-focused.\n" },
    { path: "ai-standard/quality-criteria.md", content: "# Quality Criteria\n\n- Clear purpose\n- Explicit routing\n- Minimal context loading\n- Source-of-truth references\n- Output expectations\n" },
    { path: "ai-standard/naming-conventions.md", content: "# Naming Conventions\n\n- Use lowercase kebab-case for folders and file basenames.\n- Use direct, singular asset names: `<direct-name>.role.md`, `<direct-name>.skill.md`, `<direct-name>.playbook.md`, `<direct-name>.workflow.md`.\n- Roles end with `.role.md`.\n- Skills end with `.skill.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n- Prefer domain capability names such as `accessibility.skill.md` or `design-system.skill.md` over generic action names such as `define-accessibility.skill.md`.\n- Use action verbs only when the asset is truly procedural, such as `create-branch.skill.md`.\n- Knowledge files do not use asset suffixes; use names such as `knowledge/design-system.md`.\n" },
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
    "agent-template.md": agentTemplate(),
    "root-agent-template.md": rootAgentTemplate(),
    "department-agent-template.md": departmentAgentTemplate(),
    "area-agent-template.md": areaAgentTemplate(),
    "area-readme-template.md": areaReadmeTemplate(),
    "github-epic-template.md": githubEpicTemplate(),
    "github-subissue-template.md": githubSubissueTemplate(),
    "issue-readiness-matrix-template.md": issueReadinessMatrixTemplate(),
    "branch-name-template.md": branchNameTemplate(),
    "pull-request-template.md": pullRequestTemplate(),
    "code-review-template.md": codeReviewTemplate()
  };

  return templates[fileName] ?? standardTemplate(fileName);
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

## Start Here

- \`leanos.yaml\`
- \`.leanos/context/workspace-summary.md\`
- \`.leanos/context/current-focus.md\`
- \`.leanos/context/next-actions.md\`
- \`.leanos/index/routing-map.yaml\`

## Navigation Chain

LeanOS uses owner-first navigation:

\`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output\`

Use the chain to choose the next owner, one level at a time.

1. Root chooses the owning department.
2. Department chooses a workflow or active area.
3. Area chooses the specialist role when it has \`AGENT.md\`; otherwise use its \`README.md\` as the local map.
4. Role points to the required skills and playbooks.
5. Skills and playbooks shape the work.
6. Output updates only the smallest relevant source-of-truth, knowledge or decision file.

Do not skip levels because a later file looks relevant.
Do not load the whole workspace when a smaller route exists.

## File Responsibilities

- \`AGENT.md\`: operating owner for this level.
- \`README.md\`: directory map and explanation.
- \`department.yaml\` and \`area.yaml\`: machine-readable structure.
- \`workflows/\`: multi-step flows owned by the department or area that contains them.
- \`roles/\`, \`skills/\` and \`playbooks/\`: area-level execution assets.

## Red Lines

- Enter the owning department or area before acting.
- When an area has \`AGENT.md\`, use it before loading roles, skills or playbooks.
- Do not invent missing workflows, roles, skills, playbooks, commands or templates.
- Do not load the whole workspace when a smaller route exists.
- Do not write secrets to tracked files.
- Ask before modifying source-of-truth files or operating assets.

## Routing

Route only to the owning department \`AGENT.md\`. The department agent chooses the workflow or area.
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

1. If the request spans multiple active areas, open \`workflows/README.md\` and choose the smallest matching workflow.
2. If the request belongs to one area, route to that area \`AGENT.md\` when present; otherwise route to its README.
3. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
4. Do not load roles, skills or playbooks before entering the owning area.

## Active Areas

- <Area>: \`<area>/AGENT.md\` or \`<area>/README.md\` - <purpose>

## Workflow Entry

- Department workflows: \`workflows/README.md\`

Use workflows for cross-area sequencing. Use area playbooks for tactical execution inside one area.
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
