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
    ...(area.lead ? [{ path: `${area.path}/AGENT.md`, content: areaAgent(area) }] : []),
    { path: `${area.path}/README.md`, content: areaReadme(area) },
    { path: `${area.path}/area.yaml`, content: areaYaml(area) },
    { path: `${area.path}/roles/README.md`, content: folderReadme(`${area.name} Roles`, `Roles owned by the ${area.name} area.`, area.lead ? "Use after the area AGENT selects a role." : "Use after the area README selects a role.", area.lead ? "../AGENT.md" : "../README.md", area.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Load one role, then follow its skills and playbooks.") },
    ...area.roles.map((role) => ({ path: `${area.path}/roles/${role.slug}.role.md`, content: roleFile(area, role) })),
    { path: `${area.path}/skills/README.md`, content: folderReadme(`${area.name} Skills`, `Skills owned by the ${area.name} area.`, "Use when a selected role points to a skill.", area.lead ? "../AGENT.md" : "../README.md", area.skills.map((skill) => `${skill.slug}.skill.md`), ["../roles/", "../playbooks/"], "Load only skills needed for the active task.") },
    ...area.skills.map((skill) => ({ path: `${area.path}/skills/${skill.slug}.skill.md`, content: skillFile(area, skill) })),
    { path: `${area.path}/playbooks/README.md`, content: folderReadme(`${area.name} Playbooks`, `Execution sequences owned by the ${area.name} area.`, "Use when a selected role points to a playbook.", area.lead ? "../AGENT.md" : "../README.md", area.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks for sequencing, not for duplicating skill details.") },
    ...area.playbooks.map((playbook) => ({ path: `${area.path}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(area, playbook) })),
    ...area.files.map((file) => ({ path: `${area.path}/${file.path}`, content: file.content(answers) }))
  ];
}

function departmentAgent(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return `# ${department.name} Agent

You are the ${departmentOperatingOwner(department)} for this workspace.

This \`AGENT.md\` is the operating owner for the ${department.name} department.

Use \`README.md\` as the directory map. Use \`department.yaml\` when machine-readable structure matters.

Roles, skills and playbooks do not live at the department root. They live inside active areas.

## Operating Scope

${department.purpose}

Use this department for ${department.requestTypes}.

## Routing Rules

1. If the request spans multiple active areas, open \`workflows/README.md\` and choose the smallest matching workflow.
2. If the request belongs to one area, route to that area README.
3. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
4. Do not load roles, skills or playbooks before entering the owning area.

## Active Areas

${areas.map((area) => `- ${area.name}: \`${area.slug}/${area.lead ? "AGENT.md" : "README.md"}\` - ${area.purpose}`).join("\n")}

## Workflow Entry

- Department workflows: \`workflows/README.md\`

Use workflows for cross-area sequencing. Use area playbooks for tactical execution inside one area.

## Navigation

\`${department.key}/AGENT.md -> Area ${areas.some((area) => area.lead) ? "AGENT.md/README.md" : "README"} -> Role -> Skills -> Playbook -> Output\`

Load one area owner before loading roles, skills or playbooks.
`;
}

function departmentOperatingOwner(department: RootDepartmentDefinition): string {
  const owners: Record<RootDepartmentDefinition["key"], string> = {
    strategy: "CEO / PMO / Product Strategy operator",
    operations: "CTO / Operations Lead",
    growth: "Growth / Marketing / Finance Lead"
  };

  return owners[department.key];
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
      active_areas: areas.map((area) => ({ key: area.key, agent: area.lead ? `${area.slug}/AGENT.md` : null, readme: `${area.slug}/README.md` })),
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

Use ${department.name} area READMEs for each step to preserve area-first ownership.
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

${area.lead ? "1. For operational work, start with `AGENT.md`.\n2. Use this README as the directory map.\n3. After the area AGENT selects a role, load only required skills and playbooks.\n4. Produce the requested output and update source-of-truth files when needed." : "1. Choose the relevant role from `roles/`.\n2. Load only the required skills from `skills/`.\n3. Use the matching playbook from `playbooks/`.\n4. Produce the requested output and update source-of-truth files when needed."}

## File Responsibilities

- \`README.md\`: area map and explanation.
- \`AGENT.md\`: area operating lead when present.
- \`area.yaml\`: machine-readable structure for this area.
- \`roles/\`: operating personas for this area.
- \`skills/\`: focused capabilities used by roles.
- \`playbooks/\`: tactical execution sequences.

## Common Paths

${area.commonPaths.map((item) => `- ${item}`).join("\n")}
`;
}

function areaAgent(area: AreaDefinition): string {
  if (!area.lead) return "";

  return `# ${area.name} Agent

You are the ${area.lead.title} for this workspace.

This \`AGENT.md\` is the operating owner for the ${area.name} area.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Operating Scope

${area.lead.purpose}

## Role Routing

Choose the smallest specialist role for the request:

${area.roles.map((role) => `- ${role.title}: \`roles/${role.slug}.role.md\` - use when ${role.useWhen.join("; ")}.`).join("\n")}

## Routing Rules

1. Start from this area AGENT for operational work inside ${area.name}.
2. Load one specialist role before loading skills or playbooks.
3. Load only skills and playbooks required by the selected role.
4. If the request needs a missing specialist, skill or playbook, explain the gap and ask before creating it.
5. Keep reusable area knowledge in \`knowledge/\`.

## Navigation

\`${area.path}/AGENT.md -> Role -> Skills -> Playbook -> Output\`
`;
}

function areaYaml(area: AreaDefinition): string {
  return stringifyYaml({
    area: {
      key: area.key,
      department: area.root,
      path: area.path,
      agent: area.lead ? "AGENT.md" : null,
      readme: "README.md",
      roles: area.roles.map((role) => role.slug),
      skills: area.skills.map((skill) => skill.slug),
      playbooks: area.playbooks.map((playbook) => playbook.slug),
      source_of_truth: area.sourceOfTruth
    }
  });
}

export function roleFile(area: AreaDefinition, role: RoleDefinition): string {
  const areaOwner = area.lead ? "../AGENT.md" : "../README.md";

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

Start from \`${areaOwner}\`, then load only the required skill and playbook.
`;
}

export function skillFile(area: AreaDefinition, skill: SkillDefinition): string {
  if (skill.useWhen || skill.requiredContext || skill.inputs || skill.process || skill.checks || skill.outputs || skill.filesToUpdate || skill.redLines) {
    return `# ${skill.title}

## Purpose

${skill.purpose}

## Use When

${(skill.useWhen ?? ["Use when this capability is required for the active request."]).map((item) => `- ${item}`).join("\n")}

## Required Context

${(skill.requiredContext ?? ["Area README", "Active role instructions", "User request"]).map((item) => `- ${item}`).join("\n")}

## Inputs

${(skill.inputs ?? ["Relevant area knowledge", "Active role instructions", "User request"]).map((item) => `- ${item}`).join("\n")}

## Process

${(skill.process ?? ["Read the minimum relevant context.", "Apply this skill to the request.", "Prepare a concise output or file update."]).map((item, index) => `${index + 1}. ${item}`).join("\n")}

## Checks

${(skill.checks ?? ["Check that the output matches the active request.", "Check that no unsupported product facts were invented."]).map((item) => `- ${item}`).join("\n")}

## Output

${(skill.outputs ?? ["Summary", "Decisions", "Suggested file updates"]).map((item) => `- ${item}`).join("\n")}

## Files to Update

${(skill.filesToUpdate ?? ["Update relevant area knowledge only after explicit confirmation."]).map((item) => `- ${item}`).join("\n")}

## Red Lines

${(skill.redLines ?? ["Do not invent product-specific facts.", "Ask before modifying files."]).map((item) => `- ${item}`).join("\n")}
`;
  }

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
  const areaOwner = area.lead ? "../AGENT.md" : "../README.md";

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

Start from \`${areaOwner}\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
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

Start from \`${areaOwner}\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
`;
}
