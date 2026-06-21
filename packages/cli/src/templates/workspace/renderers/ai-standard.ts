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
    ...templateFiles.map((file) => ({ path: `ai-standard/templates/${file}`, content: standardTemplate(file) })),
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
