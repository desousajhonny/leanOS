import type { FileEntry } from "../../types.js";
import { standardTemplate } from "../../content/shared.js";
import { agentTemplate, areaAgentTemplate, departmentAgentTemplate, rootAgentTemplate } from "./templates/agents.js";
import { componentSpecTemplate } from "./templates/design.js";
import { playbookTemplate, playbookYamlTemplate, roleTemplate, roleYamlTemplate, skillTemplate, skillYamlTemplate } from "./templates/execution.js";
import { branchNameTemplate, deliveryReadinessMatrixTemplate, githubEpicTemplate, githubFeatureTemplate, pullRequestTemplate } from "./templates/github.js";
import { productEpicTemplate, productFeatureTemplate, productReadmeTemplate } from "./templates/product.js";
import { codeReviewTemplate } from "./templates/review.js";
import { areaReadmeTemplate } from "./templates/structure.js";

type TemplateGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

const templateGroups: TemplateGroup[] = [
  {
    key: "agents",
    title: "Templates de Agente",
    purpose: "Templates para arquivos AGENT.md de raiz, departamento e área.",
    use: "Use quando criar um owner operacional ou uma camada de roteamento.",
    files: ["agent-template.md", "root-agent-template.md", "department-agent-template.md", "area-agent-template.md"]
  },
  {
    key: "structure",
    title: "Templates de Estrutura",
    purpose: "Templates para pastas, READMEs, departamentos, áreas e estrutura YAML.",
    use: "Use quando criar ou documentar a estrutura do workspace.",
    files: ["root-readme-template.md", "folder-readme-template.md", "area-readme-template.md", "department-template.md", "department-template.yaml", "area-template.md", "area-template.yaml"]
  },
  {
    key: "execution",
    title: "Templates de Execução",
    purpose: "Templates para roles, skills, playbooks e workflows de nível de área.",
    use: "Use quando criar assets de execução operacional dentro de uma área ou pasta de workflow de departamento.",
    files: ["role-template.md", "role-template.yaml", "skill-template.md", "skill-template.yaml", "playbook-template.md", "playbook-template.yaml", "workflow-template.md"]
  },
  {
    key: "github",
    title: "GitHub Templates",
    purpose: "Templates para issues, epics, features, nomes de branch, PRs e matrizes de prontidão no GitHub.",
    use: "Use quando estruturar itens prontos para GitHub ou artefatos de colaboração do repositório.",
    files: ["github-issue-template.md", "github-epic-template.md", "github-feature-template.md", "delivery-readiness-matrix-template.md", "branch-name-template.md", "pull-request-template.md"]
  },
  {
    key: "product",
    title: "Templates de Trabalho de Produto",
    purpose: "Templates para README de produto e trabalho local de produto no LeanOS antes de sincronização opcional com GitHub.",
    use: "Use quando estruturar README de produto, epics e features locais a partir do contexto de Strategy/Product.",
    files: ["product-readme-template.md", "epic-template.md", "feature-template.md"]
  },
  {
    key: "design",
    title: "Design Templates",
    purpose: "Templates para especificações de Design que entregam estrutura voltada ao usuário para Engineering.",
    use: "Use quando Design precisar documentar um contrato de componente antes da implementação.",
    files: ["component-spec-template.md"]
  },
  {
    key: "review",
    title: "Templates de Review",
    purpose: "Templates para revisar código, implementação e qualidade de delivery.",
    use: "Use quando criar ou aplicar saídas de review.",
    files: ["code-review-template.md"]
  }
];

export function templateFiles(): FileEntry[] {
  return [
    { path: "ai-standard/templates/README.md", content: templatesReadme(templateGroups) },
    ...templateGroups.map((group) => ({ path: `ai-standard/templates/${group.key}/README.md`, content: templateGroupReadme(group) })),
    ...templateGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/templates/${group.key}/${file}`, content: templateContent(file) })))
  ];
}

function templateContent(fileName: string): string {
  const templates: Record<string, string> = {
    "agent-template.md": agentTemplate(),
    "root-agent-template.md": rootAgentTemplate(),
    "department-agent-template.md": departmentAgentTemplate(),
    "area-agent-template.md": areaAgentTemplate(),
    "area-readme-template.md": areaReadmeTemplate(),
    "role-template.md": roleTemplate(),
    "role-template.yaml": roleYamlTemplate(),
    "skill-template.md": skillTemplate(),
    "skill-template.yaml": skillYamlTemplate(),
    "playbook-template.md": playbookTemplate(),
    "playbook-template.yaml": playbookYamlTemplate(),
    "product-readme-template.md": productReadmeTemplate(),
    "epic-template.md": productEpicTemplate(),
    "feature-template.md": productFeatureTemplate(),
    "github-epic-template.md": githubEpicTemplate(),
    "github-feature-template.md": githubFeatureTemplate(),
    "delivery-readiness-matrix-template.md": deliveryReadinessMatrixTemplate(),
    "branch-name-template.md": branchNameTemplate(),
    "pull-request-template.md": pullRequestTemplate(),
    "code-review-template.md": codeReviewTemplate(),
    "component-spec-template.md": componentSpecTemplate()
  };

  return templates[fileName] ?? standardTemplate(fileName);
}

function templatesReadme(groups: TemplateGroup[]): string {
  return `# Templates

## Propósito

Estruturas iniciais reutilizáveis para assets do framework LeanOS e artefatos de colaboração no GitHub.

## Use Quando

Use depois de selecionar o tipo de asset com \`../foundation/asset-taxonomy.md\` e antes de rascunhar um novo arquivo.

Templates são estruturas iniciais. Eles não são contexto ativo do workspace e não devem sobrescrever o AGENT, role, skill, playbook ou workflow owner.

## Categorias

${groups.map((group) => `### \`${group.key}/\`\n\n${group.purpose}\n\nUse quando: ${group.use}\n\nArquivos:\n${group.files.map((file) => `- \`${group.key}/${file}\``).join("\n")}`).join("\n\n")}

## Como Usar

1. Confirme o tipo de asset em \`../foundation/asset-taxonomy.md\`.
2. Carregue a instrução de criação correspondente em \`../instructions/\`.
3. Abra apenas a menor categoria de template correspondente.
4. Copie a estrutura do template correspondente.
5. Adapte ao departamento ou área ativa.
6. Valide com o checklist correspondente em \`../checklists/\`.

## Linhas Vermelhas

- Não carregue todos os templates por padrão.
- Não use um template de GitHub para um asset do framework LeanOS.
- Não use um template de execução para documentação de pasta.
- Não use exemplos como templates quando existir um template real.
`;
}

function templateGroupReadme(group: TemplateGroup): string {
  const productNotes = group.key === "product"
    ? "\n## Regra de Navegação\n\nUse `product-readme-template.md` como estrutura de escrita depois que Strategy/Product escolher a role e a skill corretas. Este template não substitua a Navigation Chain; ele apoia a saída da skill `write-product-readme`.\n"
    : "";

  return `# ${group.title}

## Propósito

${group.purpose}

## Use Quando

${group.use}

## Arquivos

${group.files.map((file) => `- \`${file}\``).join("\n")}

## Pastas Relacionadas

- \`../\`
- \`../../instructions/\`
- \`../../checklists/\`
- \`../../foundation/\`

## Navegação

Use esta pasta apenas depois que \`../../foundation/asset-taxonomy.md\` confirmar o tipo de asset necessário.
${productNotes}

## Notas para Agentes

Carregue apenas o arquivo de template correspondente. Não carregue categorias de template não relacionadas.
`;
}
