import { stringifyYaml } from "../../../../utils/yaml.js";
import type { AreaDefinition, DepartmentWorkflowDefinition, FileEntry, RootDepartmentDefinition, WorkspaceAnswers } from "../../types.js";
import { folderReadme } from "../../content/shared.js";
import { createWorkspacePaths, departmentPath } from "../../paths.js";
import { areaFiles } from "./area.js";
import { departmentWorkflowFile } from "./workflow.js";

export function rootDepartmentFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const paths = createWorkspacePaths(answers);

  return activeRoots.flatMap((department) => {
    const areas = activeAreas.filter((area) => area.root === department.key);
    const workflows = activeDepartmentWorkflows(department, areas);

    return [
      { path: `${department.key}/AGENT.md`, content: departmentAgent(department, areas, workflows, answers) },
      { path: `${department.key}/README.md`, content: departmentReadme(department, areas, answers) },
      { path: `${department.key}/department.yaml`, content: departmentYaml(department, areas, workflows) },
      ...(workflows.length > 0
        ? [{ path: `${department.key}/workflows/README.md`, content: folderReadme(`Workflows de ${department.name}`, `Workflows internos entre áreas de ${department.name}.`, "Use quando o trabalho atravessar mais de uma área ativa dentro deste departamento.", "../department.yaml", workflows.map((workflow) => `${workflow.slug}.workflow.md`), areas.map((area) => `../${area.slug}/`), "Workflows roteiam entre áreas ativas; se um workflow estiver ausente, pergunte antes de ativar ou criar a área ausente.") }]
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

function departmentAgent(department: RootDepartmentDefinition, areas: AreaDefinition[], workflows: DepartmentWorkflowDefinition[], answers: WorkspaceAnswers): string {
  const paths = createWorkspacePaths(answers);
  const hasWorkflows = workflows.length > 0;
  const areaRoute = areas.some((area) => area.lead) ? "\`AGENT.md\` quando existir; caso contrário, roteie para o README" : "README";
  const workflowRoutingRules = hasWorkflows
    ? `1. Se o pedido do founder precisar de coordenação multiárea, multidepartamento ou de ciclo de vida, abra \`workflows/README.md\` e escolha o menor workflow compatível.
2. Se o pedido for uma mudança de estado pertencente inteiramente a uma área, calibração, esclarecimento, avaliação ou definição, roteie para essa área via ${areaRoute}.
3. Se o pedido pertencer a uma área e uma família de assets, roteie para essa área via ${areaRoute}.
4. Se houver dúvida, verifique \`workflows/README.md\` primeiro; se nenhum workflow corresponder, roteie para a menor área ativa.
5. Se o workflow, área, papel, skill ou playbook necessário estiver ausente, explique o que falta e peça confirmação antes de criar ou ativar.
6. Não carregue roles, skills ou playbooks antes de entrar na área dona.`
    : `1. Se o pedido do founder pertencer a este departamento e não existir workflow departamental, roteie para o menor \`AGENT.md\` ou README de área ativa.
2. Se o pedido for uma mudança de estado pertencente inteiramente a uma área, calibração, esclarecimento, avaliação ou definição, roteie para essa área via ${areaRoute}.
3. Se o pedido pertencer a uma área e uma família de assets, roteie para essa área via ${areaRoute}.
4. Se houver dúvida, use \`department.yaml\` e a lista de áreas ativas para escolher a menor área ativa.
5. Se a área, papel, skill ou playbook necessário estiver ausente, explique o que falta e peça confirmação antes de criar ou ativar.
6. Não carregue roles, skills ou playbooks antes de entrar na área dona.`;
  const workflowEntry = hasWorkflows
    ? `## Entrada de Workflow

- Workflows do departamento: \`workflows/README.md\`

Use workflows para jornadas com múltiplas etapas e sequenciamento entre áreas. Use playbooks de área para execução tática dentro de uma área.`
    : `## Entrada de Playbook

Este departamento não tem workflows ativos no nível departamental. Use playbooks de área para execução prática com múltiplas etapas dentro da área dona.`;
  const journeySignals = hasWorkflows
    ? `Use \`workflows/README.md\` quando o founder pedir uma decisão ou transição com múltiplas etapas, como:`
    : `Roteie decisões com múltiplas etapas para o playbook da área dona quando não existir workflow departamental, como:`;

  return `# Agente de ${department.name}

Você é ${departmentOperatingOwner(department)} deste workspace.

Este \`AGENT.md\` é o dono operacional do departamento ${department.name}.

Use \`README.md\` como mapa do diretório. Use \`department.yaml\` quando a estrutura legível por máquina importar.

Roles, skills e playbooks não ficam na raiz do departamento. Eles vivem dentro das áreas ativas.

## Escopo Operacional

${department.purpose}

Use este departamento para ${department.requestTypes}.

## Regras de Roteamento

${workflowRoutingRules}

## Sinais de Jornada

${journeySignals}

${departmentJourneySignals(department)}

## Áreas Ativas

${areas.map((area) => `- ${area.name}: \`${area.slug}/${area.lead ? "AGENT.md" : "README.md"}\` - ${area.purpose}`).join("\n")}

${workflowEntry}

## Navegação

\`${departmentPath(department.key, paths)}/AGENT.md -> Área ${areas.some((area) => area.lead) ? "AGENT.md/README.md" : "README"} -> Papel -> Skills -> Playbook -> Saída\`

Carregue um dono de área antes de carregar roles, skills ou playbooks.
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
      "decidir se uma ideia deve entrar no roadmap",
      "mudar direção, prioridade ou sequência de produto",
      "preparar handoff para Product Ops ou handoff estratégico"
    ],
    operations: [
      "transformar escopo de entrega em trabalho executável",
      "formatar Epics ou Features antes da implementação",
      "coordenar handoffs de Design, Engineering, Security ou DevOps",
      "mover de issue para implementação, PR ou follow-up pós-merge"
    ],
    growth: [
      "planejar launch, aprendizado ou loops de aquisição",
      "conectar feedback de clientes a decisões de produto ou marketing",
      "revisar tradeoffs de pricing, financeiro ou Growth"
    ]
  };

  return signals[department.key].map((signal) => `- ${signal}`).join("\n");
}

function departmentReadme(department: RootDepartmentDefinition, areas: AreaDefinition[], answers: WorkspaceAnswers): string {
  const paths = createWorkspacePaths(answers);

  return `# ${department.name}

## Propósito

${department.purpose}

Use para ${department.requestTypes}.

## Arquivos

- \`AGENT.md\`: dono operacional do departamento. Ele roteia pedidos para a área ou workflow departamental correto.
- \`README.md\`: este mapa.
- \`department.yaml\`: estrutura legível por máquina para áreas e workflows ativos.
- \`workflows/\`: workflows entre áreas pertencentes a este departamento.
${areas.map((area) => `- \`${area.slug}/\`: ${area.purpose}`).join("\n")}

## Comece Aqui

\`AGENT.md\`

## Pastas Relacionadas

- \`../../${paths.runtimeRoot}/index/\`
- \`../../${paths.standardRoot}/\`

## Notas para Agentes

A raiz deste departamento não possui roles, skills ou playbooks diretamente. Roteie para uma área ativa antes de carregar assets de execução.
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
