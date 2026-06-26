import { stringifyYaml } from "../../../utils/yaml.js";
import { rootDepartments } from "../definitions/departments.js";
import { getActiveWorkflowKeys, getAllAreas } from "../selectors.js";
import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";

export function createLeanOsYaml(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  const activeDepartmentKeys = activeRoots.map((department) => department.key);
  const activeAreaKeys = activeAreas.map((area) => area.key);
  const activeDepartmentSet = new Set(activeDepartmentKeys);
  const activeAreaSet = new Set(activeAreaKeys);
  const availableDepartmentKeys = rootDepartments.map((department) => department.key);
  const availableAreaKeys = getAllAreas().map((area) => area.key);
  const founderSelectedAreaKeys = answers.subareas;
  const founderSelectedAreaSet = new Set(founderSelectedAreaKeys);
  const founderSelectedDepartmentKeys = rootDepartments
    .filter((department) => department.areas.some((area) => founderSelectedAreaSet.has(area.key)))
    .map((department) => department.key);

  return stringifyYaml({
    leanos: {
      version: "0.1.0",
      workspace_type: "startup"
    },
    workspace: {
      mode: answers.workspaceMode,
      product_code_policy:
        answers.workspaceMode === "existing-product-repo"
          ? "preserve_existing_product_code"
          : "do_not_create_app_code_during_initial_setup",
      detected_project: answers.detectedProject
        ? {
            has_git: answers.detectedProject.hasGit,
            has_package_json: answers.detectedProject.hasPackageJson,
            has_source_dir: answers.detectedProject.hasSourceDir,
            has_github_dir: answers.detectedProject.hasGithubDir,
            has_vercel_config: answers.detectedProject.hasVercelConfig,
            git_remote_origin: answers.detectedProject.gitRemoteOrigin ?? null
          }
        : null
    },
    activation: {
      mode: "progressive",
      current_stage: "setup-seed",
      progression_model: "ai-standard/foundation/founder-progression-model.md",
      active_departments: activeDepartmentKeys,
      inactive_departments: availableDepartmentKeys.filter((department) => !activeDepartmentSet.has(department)),
      available_departments: availableDepartmentKeys,
      active_areas: activeAreaKeys,
      inactive_areas: availableAreaKeys.filter((area) => !activeAreaSet.has(area)),
      available_areas: availableAreaKeys,
      founder_selected_departments: founderSelectedDepartmentKeys,
      founder_selected_areas: founderSelectedAreaKeys,
      available_means: "can_be_activated_later_not_path_exists",
      missing_asset_behavior: "return_activation_required"
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
        doc: "ai-standard/foundation/navigation-chain.md"
      },
      standard_library: "ai-standard"
    },
    departments: {
      active: activeRoots.map((department) => department.key),
      routes: Object.fromEntries(activeRoots.map((department) => [
        department.key,
        {
          agent: `${department.key}/AGENT.md`,
          readme: `${department.key}/README.md`
        }
      ]))
    },
    subareas: {
      active: activeAreas.map((area) => ({
        key: area.key,
        department: area.root,
        path: `${area.path}/README.md`,
        agent: area.lead ? `${area.path}/AGENT.md` : null,
        readme: `${area.path}/README.md`
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
      ownership: "department-local",
      active: getActiveWorkflowKeys(activeAreas),
      by_department: Object.fromEntries(
        activeRoots.map((department) => [
          department.key,
          activeDepartmentWorkflows(department, activeAreas).map((workflow) => ({
            key: workflow.slug,
            path: `${department.key}/workflows/${workflow.slug}.workflow.md`
          }))
        ])
      )
    },
    ai_standard: {
      path: "ai-standard/README.md",
      foundation: "ai-standard/foundation",
      templates: "ai-standard/templates",
      checklists: "ai-standard/checklists",
      instructions: "ai-standard/instructions"
    },
    github: {
      status: answers.prepareGithubManagement ? "pending_user_token" : "not_configured",
      project_management: answers.prepareGithubManagement ? "prepared" : "not_requested",
      token_source: "env:LEANOS_GITHUB_TOKEN"
    }
  });
}

function activeDepartmentWorkflows(department: RootDepartmentDefinition, activeAreas: AreaDefinition[]) {
  const activeAreaSlugs = new Set(activeAreas.filter((area) => area.root === department.key).map((area) => area.slug));
  return department.workflows.filter((workflow) => workflow.requiredAreas.every((area) => activeAreaSlugs.has(area)));
}
