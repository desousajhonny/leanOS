import { stringifyYaml } from "../../../utils/yaml.js";
import type { AreaDefinition, DepartmentWorkflowDefinition, FileEntry, PlaybookDefinition, RoleDefinition, RootDepartmentDefinition, SkillDefinition, WorkspaceAnswers } from "../types.js";
import { folderReadme, toTitle } from "../content/shared.js";

export function rootDepartmentFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  return activeRoots.flatMap((department) => {
    const areas = activeAreas.filter((area) => area.root === department.key);

    return [
      { path: `${department.key}/AGENT.md`, content: departmentAgent(department, areas) },
      { path: `${department.key}/README.md`, content: departmentReadme(department, areas) },
      { path: `${department.key}/department.yaml`, content: departmentYaml(department, areas) },
      { path: `${department.key}/workflows/README.md`, content: folderReadme(`${department.name} Workflows`, `Internal cross-area workflows for ${department.name}.`, "Use when work spans more than one active area inside this department.", "../department.yaml", department.workflows.map((workflow) => `${workflow.slug}.workflow.md`), areas.map((area) => `../${area.slug}/`), "Workflows route between areas; if an area is missing, ask before activating or creating it.") },
      ...department.workflows.map((workflow) => ({
        path: `${department.key}/workflows/${workflow.slug}.workflow.md`,
        content: departmentWorkflowFile(department, areas, workflow)
      })),
      ...areas.flatMap((area) => areaFiles(area, answers))
    ];
  });
}

function areaFiles(area: AreaDefinition, answers: WorkspaceAnswers): FileEntry[] {
  return [
    { path: `${area.path}/README.md`, content: areaReadme(area) },
    { path: `${area.path}/area.yaml`, content: areaYaml(area) },
    { path: `${area.path}/roles/README.md`, content: folderReadme(`${area.name} Roles`, `Roles owned by the ${area.name} area.`, "Use after the area README selects a role.", "../README.md", area.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Load one role, then follow its skills and playbooks.") },
    ...area.roles.map((role) => ({ path: `${area.path}/roles/${role.slug}.role.md`, content: roleFile(area, role) })),
    { path: `${area.path}/skills/README.md`, content: folderReadme(`${area.name} Skills`, `Skills owned by the ${area.name} area.`, "Use when a selected role points to a skill.", "../README.md", area.skills.map((skill) => `${skill.slug}.skill.md`), ["../roles/", "../playbooks/"], "Load only skills needed for the active task.") },
    ...area.skills.map((skill) => ({ path: `${area.path}/skills/${skill.slug}.skill.md`, content: skillFile(area, skill) })),
    { path: `${area.path}/playbooks/README.md`, content: folderReadme(`${area.name} Playbooks`, `Execution sequences owned by the ${area.name} area.`, "Use when a selected role points to a playbook.", "../README.md", area.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks for sequencing, not for duplicating skill details.") },
    ...area.playbooks.map((playbook) => ({ path: `${area.path}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(area, playbook) })),
    ...area.files.map((file) => ({ path: `${area.path}/${file.path}`, content: file.content(answers) }))
  ];
}

function departmentAgent(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return `# ${department.name} Agent

You are operating inside the ${department.name} department.

This department routes work across areas. Roles, skills and playbooks do not live at the department root.

## Active Areas

${areas.map((area) => `- ${area.name}: \`${area.slug}/README.md\``).join("\n")}

## Navigation

\`${department.key}/AGENT.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Load one area README before loading roles, skills or playbooks.
`;
}

function departmentReadme(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return folderReadme(
    department.name,
    department.purpose,
    `Use for ${department.requestTypes}.`,
    "department.yaml",
    ["AGENT.md", "department.yaml", "workflows/", ...areas.map((area) => `${area.slug}/`)],
    ["../.leanos/index/", "../ai-standard/"],
    "This department root does not own roles, skills or playbooks directly. Route into an active area."
  );
}

function departmentYaml(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return stringifyYaml({
    department: {
      key: department.key,
      name: department.name,
      purpose: department.purpose,
      active_areas: areas.map((area) => ({ key: area.key, path: `${area.slug}/README.md` })),
      workflows: department.workflows.map((workflow) => ({ key: workflow.slug, path: `workflows/${workflow.slug}.workflow.md` }))
    }
  });
}

function departmentWorkflowFile(department: RootDepartmentDefinition, activeAreas: AreaDefinition[], workflow: DepartmentWorkflowDefinition): string {
  const activeSlugs = new Set(activeAreas.map((area) => area.slug));
  const missingAreas = workflow.requiredAreas.filter((area) => !activeSlugs.has(area));

  return `# ${toTitle(workflow.slug)} Workflow

## Purpose

${workflow.purpose}

## Required Areas

${workflow.requiredAreas.map((area) => `- ${area}`).join("\n")}

${missingAreas.length > 0 ? `## Availability\n\nThis workflow references areas that are not currently active: ${missingAreas.join(", ")}.\n\nDo not load missing area paths. Ask whether to activate or create the missing area before executing this workflow.\n` : "## Availability\n\nAll required areas are active in this department.\n"}

## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Navigation

Use ${department.name} area READMEs for each step. Do not bypass area-first ownership.
`;
}

function areaReadme(area: AreaDefinition): string {
  return `# ${area.name}

## Purpose

${area.purpose}

## When to Use

${area.whenToUse.map((item) => `- ${item}`).join("\n")}

## Source of Truth

${area.sourceOfTruth.length > 0 ? area.sourceOfTruth.map((file) => `- \`${file}\``).join("\n") : "- No loose source-of-truth files yet. Use playbooks for operational procedures and update persistent notes only when the workspace creates them."}

## Navigation

1. Choose the relevant role from \`roles/\`.
2. Load only the required skills from \`skills/\`.
3. Use the matching playbook from \`playbooks/\`.
4. Produce the requested output and update source-of-truth files when needed.

## Common Paths

${area.commonPaths.map((item) => `- ${item}`).join("\n")}
`;
}

function areaYaml(area: AreaDefinition): string {
  return stringifyYaml({
    area: {
      key: area.key,
      department: area.root,
      path: area.path,
      roles: area.roles.map((role) => role.slug),
      skills: area.skills.map((skill) => skill.slug),
      playbooks: area.playbooks.map((playbook) => playbook.slug),
      source_of_truth: area.sourceOfTruth
    }
  });
}

export function roleFile(area: AreaDefinition, role: RoleDefinition): string {
  return `# ${role.title}

## Purpose

${role.purpose}

## Use When

${role.useWhen.map((item) => `- ${item}`).join("\n")}

## Before Acting

Read:

${role.beforeActing.map((file) => `- \`${file}\``).join("\n")}

## Skills

${role.skills.map((skill) => `- \`../skills/${skill}.skill.md\``).join("\n")}

## Playbooks

${role.playbooks.map((playbook) => `- \`../playbooks/${playbook}.playbook.md\``).join("\n")}

## Output Style

- State what context was loaded.
- Make the smallest coherent recommendation or change.
- Identify files that should be updated.

## Navigation

Start from \`../README.md\`, then load only the required skill and playbook.
`;
}

export function skillFile(area: AreaDefinition, skill: SkillDefinition): string {
  return `# ${skill.title}

## Purpose

${skill.purpose}

## Area

\`${area.path}\`

## Inputs

- Area source-of-truth files
- Active role instructions
- User request

## Process

1. Read the minimum relevant source-of-truth files.
2. Apply this skill to the user request.
3. Prepare a concise output or file update.

## Output

- Summary
- Decisions
- Suggested file updates
`;
}

export function playbookFile(area: AreaDefinition, playbook: PlaybookDefinition): string {
  if (playbook.inputs || playbook.outputs || playbook.filesToUpdate) {
    return `# ${playbook.title}

## Purpose

${playbook.purpose}

## Inputs

${(playbook.inputs ?? ["Area source-of-truth files", "Active role instructions", "User request"]).map((input) => `- ${input}`).join("\n")}

## Process

${playbook.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Output

${(playbook.outputs ?? ["Decision or action summary", "Updated source-of-truth files when requested", "Next recommended LeanOS command"]).map((output) => `- ${output}`).join("\n")}

## Files to Update

${(playbook.filesToUpdate ?? ["Update relevant area source-of-truth files if applicable."]).map((file) => `- ${file}`).join("\n")}

## Navigation

Start from \`../README.md\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
`;
  }

  return `# ${playbook.title}

## Purpose

${playbook.purpose}

## Area

\`${area.path}\`

## Sequence

${playbook.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Outputs

- Decision or action summary
- Updated source-of-truth files when requested
- Next recommended LeanOS command

## Navigation

Start from \`../README.md\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
`;
}
