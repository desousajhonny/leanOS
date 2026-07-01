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
    { path: ".leanos/index/README.md", content: folderReadme("LeanOS Index", "Mapas estruturados que ajudam agentes a rotear sem carregar todos os assets.", "Use quando um modelo precisa de um mapa rápido de roteamento.", "routing-map.yaml", ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml", "intent-map.yaml"], [fromIndex(departmentPath("strategy", paths)), fromIndex(departmentPath("operations", paths)), fromIndex(departmentPath("growth", paths))], "Use index files as maps, then load the destination README. Business workflows live in departments or areas, not in `.leanos/`.") },
    { path: ".leanos/index/departments.yaml", content: stringifyYaml({ departments: activeRoots.map((department) => ({ key: department.key, agent: fromIndex(`${departmentPath(department.key, paths)}/AGENT.md`), readme: fromIndex(`${departmentPath(department.key, paths)}/README.md`) })) }) },
    { path: ".leanos/index/areas.yaml", content: stringifyYaml({ areas: activeAreas.map((area) => ({ key: area.key, department: area.root, agent: area.lead ? fromIndex(`${areaPath(area, paths)}/AGENT.md`) : null, readme: fromIndex(`${areaPath(area, paths)}/README.md`) })) }) },
    { path: ".leanos/index/roles.yaml", content: stringifyYaml({ roles: activeAreas.flatMap((area) => area.roles.map((role) => ({ key: role.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/roles/${role.slug}.role.md`) }))) }) },
    { path: ".leanos/index/skills.yaml", content: stringifyYaml({ skills: activeAreas.flatMap((area) => area.skills.map((skill) => ({ key: skill.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/skills/${skill.slug}/SKILL.md`) }))) }) },
    { path: ".leanos/index/playbooks.yaml", content: stringifyYaml({ playbooks: activeAreas.flatMap((area) => area.playbooks.map((playbook) => ({ key: playbook.slug, area: area.key, path: fromIndex(`${areaPath(area, paths)}/playbooks/${playbook.slug}.playbook.md`) }))) }) },
    { path: ".leanos/index/workflows.yaml", content: stringifyYaml({ workflows: localWorkflowIndex(activeAreas, activeRoots, paths, fromIndex) }) },
    { path: ".leanos/index/intent-map.yaml", content: stringifyYaml(intentMap()) },
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

function intentMap() {
  return {
    version: 1,
    purpose: "Classificar pedidos em linguagem natural sem transformar o root AGENT.md em inventário de casos.",
    routing_policy: {
      root_loads_department_only: true,
      deep_hints_are_not_direct_loads: true,
      check_leanos_yaml_before_route: true,
      use_routing_map_for_active_department_path: true,
      inactive_area_response: "activation_required"
    },
    global_protocols: {
      status_readiness: "where-we-are",
      trace_diagnostics: "chief-trace",
      leanos_update: "lean-os update",
      framework_assets: "standard-library"
    },
    intents: {
      setup_or_resume: {
        signals: ["vamos começar", "iniciar LeanOS", "retomar", "continuar", "tenho uma ideia", "calibrar ideia"],
        owner_department: "strategy",
        required_areas: ["strategy.product"],
        activation_required: null,
        expected_chain: {
          area: "strategy.product",
          role: "product-strategist",
          skills: ["business-baseline", "product-core"],
          playbook: "idea-calibration"
        }
      },
      business_foundation: {
        signals: ["missão", "visão", "princípios", "modelo de negócio", "business model canvas", "como a empresa opera"],
        owner_department: "strategy",
        required_areas: ["strategy.business"],
        activation_required: null,
        expected_chain: {
          area: "strategy.business",
          role: "business-strategist",
          skills: ["business-identity", "operating-model", "business-model"],
          playbook: "business-foundation"
        }
      },
      product_readme: {
        signals: ["melhorar README", "README do produto", "criar repositório", "apresentação do produto no GitHub"],
        owner_department: "strategy",
        required_areas: ["strategy.product"],
        activation_required: null,
        expected_chain: {
          area: "strategy.product",
          role: "product-narrative-editor",
          skill: "product-readme",
          playbook: null
        }
      },
      mvp_validation_scope: {
        signals: ["escopo de validação", "primeiro MVP", "validar ideia", "menor MVP", "o que o MVP deve validar"],
        owner_department: "strategy",
        required_areas: ["strategy.product"],
        activation_required: null,
        expected_chain: {
          area: "strategy.product",
          role: "product-strategist",
          skill: "mvp-validation-scope",
          playbook: "mvp-validation-scope"
        }
      },
      roadmap_prioritization: {
        signals: ["roadmap", "priorizar", "backlog", "ciclo", "milestone"],
        owner_department: "strategy",
        required_areas: ["strategy.roadmap"],
        activation_required: null,
        expected_chain: {
          area: "strategy.roadmap",
          role: "roadmap-planner",
          skills: ["roadmap", "backlog-prioritization"],
          playbook: "roadmap-cycle-planning"
        }
      },
      delivery_planning: {
        signals: ["MVP backlog", "criar Epic", "quebrar Epic", "criar Features", "escopo de entrega"],
        owner_department: "operations",
        required_areas: ["operations.product-ops"],
        activation_required: "operations.product-ops",
        expected_chain: {
          area: "operations.product-ops",
          role: "product-owner",
          skills: ["delivery-scope", "shape-epic", "feature-criteria"],
          playbooks: ["mvp-backlog-planning", "delivery-item-to-epic", "epic-to-features"]
        }
      },
      implementation: {
        signals: ["implementar", "desenvolver feature", "codar", "criar branch", "abrir PR"],
        owner_department: "operations",
        required_areas: ["operations.product-ops", "operations.engineering"],
        activation_required: "operations.engineering",
        expected_chain: {
          area: "operations.engineering",
          role: "senior-developer",
          skills: ["implementation-planning", "feature-branching", "test-coverage", "pull-request"],
          workflow: "feature-to-delivery-cycle"
        }
      },
      pr_review: {
        signals: ["revisar PR", "review do PR", "validar PR", "rodar revisão agora"],
        owner_department: "operations",
        required_areas: ["operations.engineering"],
        activation_required: "operations.engineering",
        expected_chain: {
          area: "operations.engineering",
          role: "pr-reviewer",
          skill: "pull-request-review",
          playbook: "pr-validation"
        }
      },
      security: {
        signals: ["segurança", "auditar segurança", "vulnerabilidade", "LGPD", "token vazado", "proteger API", "hardening"],
        owner_department: "operations",
        required_areas: ["operations.security"],
        activation_required: "operations.security",
        expected_chain: {
          area: "operations.security",
          role: "security-reviewer",
          skills: ["threat-modeling", "secure-code-review"],
          workflow: "security-hardening-cycle"
        }
      },
      github_operations: {
        signals: ["GitHub", "GitHub Projects", "sync de Epics", "sync de Features", "branch protection", "PR Validation", "release no GitHub"],
        owner_department: "operations",
        required_areas: ["operations.devops"],
        activation_required: "operations.devops",
        expected_chain: {
          area: "operations.devops",
          role: "github-devops",
          skills: ["github-project-management", "repository-profile", "branch-protection"],
          playbooks: ["github-project-management", "github-safety-baseline"]
        }
      },
      launch_readiness: {
        signals: ["pronto para lançar", "ready for launch", "go-live", "beta", "usuários reais"],
        owner_department: "operations",
        required_areas: ["operations.product-ops", "operations.engineering", "operations.devops"],
        activation_required: "smallest_missing_required_area",
        expected_chain: {
          department: "operations",
          workflow: "ready-for-launch"
        }
      },
      launch_learning: {
        signals: ["lançamento", "aquisição", "onboarding", "learning loop", "aprendizado de lançamento", "experimento de growth"],
        owner_department: "growth",
        required_areas: ["growth.marketing", "growth.customer-experience"],
        activation_required: "growth.marketing",
        expected_chain: {
          department: "growth",
          workflow: "launch-learning-loop"
        }
      },
      pricing: {
        signals: ["preço", "planos", "pricing", "cobrança", "assinatura", "entitlements", "trial", "quota"],
        owner_department: "growth",
        required_areas: ["growth.finance"],
        activation_required: "growth.finance",
        expected_chain: {
          area: "growth.finance",
          role: "finance-operator",
          skill: "pricing-review",
          playbook: "finance-review"
        }
      },
      spend_budget: {
        signals: ["gasto", "orçamento", "budget", "burn", "runway", "custo", "ferramenta paga", "mídia paga"],
        owner_department: "growth",
        required_areas: ["growth.finance"],
        activation_required: "growth.finance",
        expected_chain: {
          area: "growth.finance",
          role: "finance-operator",
          skills: ["spend-review", "runway-analysis", "budget-planning"],
          playbooks: ["spend-approval", "monthly-finance-check"]
        }
      }
    }
  };
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
