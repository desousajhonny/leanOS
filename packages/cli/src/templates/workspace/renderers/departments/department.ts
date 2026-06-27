import { stringifyYaml } from "../../../../utils/yaml.js";
import type { AreaDefinition, DepartmentWorkflowDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../../types.js";
import { folderReadme } from "../../content/shared.js";
import { areaFiles } from "./area.js";
import { departmentWorkflowFile } from "./workflow.js";

export function rootDepartmentFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  return activeRoots.flatMap((department) => {
    const areas = activeAreas.filter((area) => area.root === department.key);
    const workflows = activeDepartmentWorkflows(department, areas);

    return [
      { path: `${department.key}/AGENT.md`, content: departmentAgent(department, areas, workflows) },
      { path: `${department.key}/README.md`, content: departmentReadme(department, areas) },
      { path: `${department.key}/department.yaml`, content: departmentYaml(department, areas, workflows) },
      ...(workflows.length > 0
        ? [{ path: `${department.key}/workflows/README.md`, content: folderReadme(`${department.name} Workflows`, `Internal cross-area workflows for ${department.name}.`, "Use when work spans more than one active area inside this department.", "../department.yaml", workflows.map((workflow) => `${workflow.slug}.workflow.md`), areas.map((area) => `../${area.slug}/`), "Workflows route between active areas; if a workflow is missing, ask before activating or creating the missing area.") }]
        : []),
      ...workflows.map((workflow) => ({
        path: `${department.key}/workflows/${workflow.slug}.workflow.md`,
        content: departmentWorkflowFile(department, areas, workflow)
      })),
      ...areas.flatMap((area) => areaFiles(area, answers))
    ];
  });
}

function activeDepartmentWorkflows(department: RootDepartmentDefinition, areas: AreaDefinition[]): DepartmentWorkflowDefinition[] {
  const activeSlugs = new Set(areas.map((area) => area.slug));
  return department.workflows.filter((workflow) => workflow.requiredAreas.every((area) => activeSlugs.has(area)));
}

function departmentAgent(department: RootDepartmentDefinition, areas: AreaDefinition[], workflows: DepartmentWorkflowDefinition[]): string {
  const hasWorkflows = workflows.length > 0;
  const areaRoute = areas.some((area) => area.lead) ? "\`AGENT.md\` when present; otherwise route to its README" : "README";
  const workflowRoutingRules = hasWorkflows
    ? `1. If the founder request needs multi-area, multi-department or lifecycle coordination, open \`workflows/README.md\` and choose the smallest matching workflow.
2. If the request is a state change owned entirely by one area, calibration, clarification, evaluation or definition, route to that area ${areaRoute}.
3. If the request belongs to one area and one asset family, route to that area ${areaRoute}.
4. If you are unsure, check \`workflows/README.md\` first; if no workflow matches, route to the smallest active area.
5. If the needed workflow, area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
6. Do not load roles, skills or playbooks before entering the owning area.`
    : `1. If the founder request is owned by this department and no department workflow exists, route to the smallest active area \`AGENT.md\` or README.
2. If the request is a state change owned entirely by one area, calibration, clarification, evaluation or definition, route to that area ${areaRoute}.
3. If the request belongs to one area and one asset family, route to that area ${areaRoute}.
4. If you are unsure, use \`department.yaml\` and the active area list to choose the smallest active area.
5. If the needed area, role, skill or playbook is missing, explain what is missing and ask before creating or activating it.
6. Do not load roles, skills or playbooks before entering the owning area.`;
  const workflowEntry = hasWorkflows
    ? `## Workflow Entry

- Department workflows: \`workflows/README.md\`

Use workflows for multi-step journeys and cross-area sequencing. Use area playbooks for tactical execution inside one area.`
    : `## Playbook Entry

This department has no active department-level workflows. Use area playbooks for practical multi-step execution inside the owning area.`;
  const journeySignals = hasWorkflows
    ? `Use \`workflows/README.md\` when the founder asks for a multi-step decision or transition, such as:`
    : `Route multi-step decisions to the owning area playbook when no department workflow exists, such as:`;

  return `# ${department.name} Agent

You are the ${departmentOperatingOwner(department)} for this workspace.

This \`AGENT.md\` is the operating owner for the ${department.name} department.

Use \`README.md\` as the directory map. Use \`department.yaml\` when machine-readable structure matters.

Roles, skills and playbooks do not live at the department root. They live inside active areas.

## Operating Scope

${department.purpose}

Use this department for ${department.requestTypes}.

## Routing Rules

${workflowRoutingRules}

## Journey Signals

${journeySignals}

${departmentJourneySignals(department)}

## Active Areas

${areas.map((area) => `- ${area.name}: \`${area.slug}/${area.lead ? "AGENT.md" : "README.md"}\` - ${area.purpose}`).join("\n")}

${workflowEntry}

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

function departmentJourneySignals(department: RootDepartmentDefinition): string {
  const signals: Record<RootDepartmentDefinition["key"], string[]> = {
    strategy: [
      "deciding whether an idea should enter roadmap",
      "changing product direction, priority or sequencing",
      "preparing Product Ops handoff or strategic handoff"
    ],
    operations: [
      "turning delivery scope into executable work",
      "shaping epics or features before implementation",
      "coordinating design, engineering, security or DevOps handoffs",
      "moving from issue to implementation, PR or post-merge follow-up"
    ],
    growth: [
      "planning launch, learning or acquisition loops",
      "connecting customer feedback to product or marketing decisions",
      "reviewing pricing, finance or growth tradeoffs"
    ]
  };

  return signals[department.key].map((signal) => `- ${signal}`).join("\n");
}

function departmentReadme(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return `# ${department.name}

## Purpose

${department.purpose}

Use for ${department.requestTypes}.

## Files

- \`AGENT.md\`: department operating owner. It routes requests to the right area or department workflow.
- \`README.md\`: this map.
- \`department.yaml\`: machine-readable structure for active areas and workflows.
- \`workflows/\`: cross-area workflows owned by this department.
${areas.map((area) => `- \`${area.slug}/\`: ${area.purpose}`).join("\n")}

## Start Here

\`AGENT.md\`

## Related Folders

- \`../.leanos/index/\`
- \`../ai-standard/\`

## Agent Notes

This department root does not own roles, skills or playbooks directly. Route into an active area before loading execution assets.
`;
}

function departmentYaml(department: RootDepartmentDefinition, areas: AreaDefinition[], workflows: DepartmentWorkflowDefinition[]): string {
  return stringifyYaml({
    department: {
      key: department.key,
      name: department.name,
      purpose: department.purpose,
      active_areas: areas.map((area) => ({ key: area.key, agent: area.lead ? `${area.slug}/AGENT.md` : null, readme: `${area.slug}/README.md` })),
      workflows: workflows.map((workflow) => ({ key: workflow.slug, path: `workflows/${workflow.slug}.workflow.md` }))
    }
  });
}
