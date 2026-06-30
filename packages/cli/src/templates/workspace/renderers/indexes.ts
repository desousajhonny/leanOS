import { stringifyYaml } from "../../../utils/yaml.js";
import { areaPath, createWorkspacePaths, departmentPath, relativePath, standardPath } from "../paths.js";
import type { AreaDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function indexFiles(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[], answers: WorkspaceAnswers): FileEntry[] {
  const paths = createWorkspacePaths(answers);
  const indexRoot = `${paths.runtimeRoot}/index`;
  const fromIndex = (targetPath: string) => relativePath(indexRoot, targetPath);
  const routing = Object.fromEntries(activeAreas.map((area) => [
    area.routingKey,
    area.lead
      ? { agent: fromIndex(`${areaPath(area, paths)}/AGENT.md`), readme: fromIndex(`${areaPath(area, paths)}/README.md`) }
      : fromIndex(`${areaPath(area, paths)}/README.md`)
  ]));

  return [
    { path: ".leanos/index/README.md", content: folderReadme("LeanOS Index", "Mapas estruturados que ajudam agentes a rotear sem carregar todos os assets.", "Use quando um modelo precisa de um mapa rápido de roteamento.", "routing-map.yaml", ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml"], [fromIndex(departmentPath("strategy", paths)), fromIndex(departmentPath("operations", paths)), fromIndex(departmentPath("growth", paths))], "Use index files as maps, then load the destination README. Business workflows live in departments or areas, not in `.leanos/`.") },
    { path: ".leanos/index/departments.yaml", content: stringifyYaml({ departments: activeRoots.map((department) => ({ key: department.key, agent: fromIndex(`${departmentPath(department.key, paths)}/AGENT.md`), readme: fromIndex(`${departmentPath(department.key, paths)}/README.md`) })) }) },
    { path: ".leanos/index/areas.yaml", content: stringifyYaml({ areas: activeAreas.map((area) => ({ key: area.key, department: area.root, agent: area.lead ? fromIndex(`${areaPath(area, paths)}/AGENT.md`) : null, readme: fromIndex(`${areaPath(area, paths)}/README.md`) })) }) },
    { path: ".leanos/index/roles.yaml", content: stringifyYaml({ roles: activeAreas.flatMap((area) => area.roles.map((role) => ({ key: role.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/roles/${role.slug}.role.md`) }))) }) },
    { path: ".leanos/index/skills.yaml", content: stringifyYaml({ skills: activeAreas.flatMap((area) => area.skills.map((skill) => ({ key: skill.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/skills/${skill.slug}/SKILL.md`) }))) }) },
    { path: ".leanos/index/playbooks.yaml", content: stringifyYaml({ playbooks: activeAreas.flatMap((area) => area.playbooks.map((playbook) => ({ key: playbook.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/playbooks/${playbook.slug}.playbook.md`) }))) }) },
    { path: ".leanos/index/workflows.yaml", content: stringifyYaml({ workflows: localWorkflowIndex(activeAreas, activeRoots, paths, fromIndex) }) },
    {
      path: ".leanos/index/routing-map.yaml",
      content: stringifyYaml({
        routing: {
          departments: Object.fromEntries(activeRoots.map((department) => [
            department.key,
            {
              agent: fromIndex(`${departmentPath(department.key, paths)}/AGENT.md`),
              readme: fromIndex(`${departmentPath(department.key, paths)}/README.md`)
            }
          ])),
          areas: routing,
          asset_creation: fromIndex(standardPath("README.md", paths))
        }
      })
    }
  ];
}

function localWorkflowIndex(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[], paths: ReturnType<typeof createWorkspacePaths>, fromIndex: (path: string) => string) {
  return activeRoots.flatMap((department) => {
    const activeAreaSlugs = new Set(activeAreas.filter((area) => area.root === department.key).map((area) => area.slug));

    return department.workflows
      .filter((workflow) => workflow.requiredAreas.every((area) => activeAreaSlugs.has(area)))
      .map((workflow) => ({
        key: workflow.slug,
        department: department.key,
        path: fromIndex(`${departmentPath(department.key, paths)}/workflows/${workflow.slug}.workflow.md`),
        active: true
      }));
  });
}
