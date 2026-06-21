import { stringifyYaml } from "../../../utils/yaml.js";
import { getActiveWorkflowKeys } from "../selectors.js";
import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";

export function createLeanOsYaml(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return stringifyYaml({
    leanos: {
      version: "0.1.0",
      workspace_type: "startup"
    },
    company: {
      name: answers.companyName,
      stage: answers.stage,
      mode: answers.mode
    },
    product: {
      name: answers.productName,
      type: answers.productType,
      status: answers.productStatus,
      description: answers.description,
      target_user: answers.targetUser
    },
    agent: {
      entrypoint: "AGENT.md",
      chief_agent: "enabled",
      command_style: "slash-and-natural-language",
      context_loading: "lazy",
      navigation_chain: {
        enabled: true,
        doc: "ai-standard/navigation-chain.md"
      },
      standard_library: "ai-standard"
    },
    departments: {
      active: activeRoots.map((department) => department.key),
      paths: Object.fromEntries(activeRoots.map((department) => [department.key, `${department.key}/README.md`]))
    },
    subareas: {
      active: activeAreas.map((area) => ({
        key: area.key,
        department: area.root,
        path: `${area.path}/README.md`
      }))
    },
    roles: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.roles.map((role) => role.slug)]))
    },
    skills: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.skills.map((skill) => skill.slug)]))
    },
    playbooks: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.playbooks.map((playbook) => playbook.slug)]))
    },
    workflows: {
      active: getActiveWorkflowKeys(activeAreas)
    },
    ai_standard: {
      path: "ai-standard/README.md",
      templates: "ai-standard/templates",
      checklists: "ai-standard/checklists",
      instructions: "ai-standard/instructions"
    },
    github: {
      status: "not_configured"
    }
  });
}
