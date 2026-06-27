import type { FileEntry } from "../../types.js";
import { standardTemplate } from "../../content/shared.js";
import { agentTemplate, areaAgentTemplate, departmentAgentTemplate, rootAgentTemplate } from "./templates/agents.js";
import { componentSpecTemplate } from "./templates/design.js";
import { playbookTemplate, playbookYamlTemplate, roleTemplate, roleYamlTemplate, skillTemplate, skillYamlTemplate } from "./templates/execution.js";
import { branchNameTemplate, deliveryReadinessMatrixTemplate, githubEpicTemplate, githubFeatureTemplate, pullRequestTemplate } from "./templates/github.js";
import { productEpicTemplate, productFeatureTemplate } from "./templates/product.js";
import { codeReviewTemplate } from "./templates/review.js";
import { areaReadmeTemplate } from "./templates/structure.js";

type TemplateGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

const templateGroups: TemplateGroup[] = [
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

export function templateFiles(): FileEntry[] {
  return [
    { path: "ai-standard/templates/README.md", content: templatesReadme(templateGroups) },
    ...templateGroups.map((group) => ({ path: `ai-standard/templates/${group.key}/README.md`, content: templateGroupReadme(group) })),
    ...templateGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/templates/${group.key}/${file}`, content: templateContent(file) })))
  ];
}

function templateContent(fileName: string): string {
  const templates: Record<string, string> = {
    "agent-template.md": agentTemplate(),
    "root-agent-template.md": rootAgentTemplate(),
    "department-agent-template.md": departmentAgentTemplate(),
    "area-agent-template.md": areaAgentTemplate(),
    "area-readme-template.md": areaReadmeTemplate(),
    "role-template.md": roleTemplate(),
    "role-template.yaml": roleYamlTemplate(),
    "skill-template.md": skillTemplate(),
    "skill-template.yaml": skillYamlTemplate(),
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

Templates are starting structures. They are not active workspace context and should not override the owning AGENT, role, skill, playbook or workflow.

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
