import { stringifyYaml } from "../../../utils/yaml.js";
import { workflowDefinitions } from "../definitions/workflows.js";
import { getActiveSubareaKeys } from "../selectors.js";
import type { AreaDefinition, FileEntry, RootDepartmentDefinition } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function indexFiles(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const routing = Object.fromEntries(activeAreas.map((area) => [area.routingKey, `../../${area.path}/README.md`]));

  return [
    { path: ".leanos/index/README.md", content: folderReadme("LeanOS Index", "Structured maps that help agents route without loading every asset.", "Use when a model needs a quick routing map.", "routing-map.yaml", ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml"], ["../../strategy/", "../../operations/", "../../growth/", "../workflows/"], "Use index files as maps, then load the destination README.") },
    { path: ".leanos/index/departments.yaml", content: stringifyYaml({ departments: activeRoots.map((department) => ({ key: department.key, path: `../../${department.key}/README.md` })) }) },
    { path: ".leanos/index/areas.yaml", content: stringifyYaml({ areas: activeAreas.map((area) => ({ key: area.key, department: area.root, path: `../../${area.path}/README.md` })) }) },
    { path: ".leanos/index/roles.yaml", content: stringifyYaml({ roles: activeAreas.flatMap((area) => area.roles.map((role) => ({ key: role.slug, area: area.key, path: `../../${area.path}/roles/${role.slug}.role.md` }))) }) },
    { path: ".leanos/index/skills.yaml", content: stringifyYaml({ skills: activeAreas.flatMap((area) => area.skills.map((skill) => ({ key: skill.slug, area: area.key, path: `../../${area.path}/skills/${skill.slug}.skill.md` }))) }) },
    { path: ".leanos/index/playbooks.yaml", content: stringifyYaml({ playbooks: activeAreas.flatMap((area) => area.playbooks.map((playbook) => ({ key: playbook.slug, area: area.key, path: `../../${area.path}/playbooks/${playbook.slug}.playbook.md` }))) }) },
    { path: ".leanos/index/workflows.yaml", content: stringifyYaml({ workflows: workflowDefinitions.map((workflow) => ({ key: workflow.slug, path: `../workflows/${workflow.slug}.workflow.md`, active: workflow.requiredSubareas.every((subarea) => getActiveSubareaKeys(activeAreas).has(subarea)) })) }) },
    { path: ".leanos/index/routing-map.yaml", content: stringifyYaml({ routing: { departments: Object.fromEntries(activeRoots.map((department) => [department.key, `../../${department.key}/README.md`])), areas: routing, asset_creation: "../../ai-standard/README.md" } }) }
  ];
}
