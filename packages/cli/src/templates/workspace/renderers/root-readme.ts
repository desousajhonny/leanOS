import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";

export function workspaceReadme(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# ${answers.productName}

Workspace LeanOS para ${answers.companyName}.

Este workspace separa arquivos de runtime do LeanOS da estrutura operacional do cliente.

${workspaceModeIntro(answers)}

## Início

Para qualquer modelo de AI, comece em linguagem natural:

\`\`\`text
Quero iniciar o LeanOS.
\`\`\`

Depois comece por:

\`AGENT.md\`

## Estrutura Principal

- \`.github/\` Arquivos de integração com VS Code e GitHub.
- \`.leanos/\` Runtime, contexto e índices do LeanOS.
- \`ai-standard/\` templates, checklists e instruções para criar assets LeanOS.
${activeRoots.map((department) => `- \`${department.key}/\` ${department.name} departamento.`).join("\n")}

## Snapshot do Produto

- Modo do workspace: ${answers.workspaceMode}
- Empresa: ${answers.companyName}
- Produto: ${answers.productName}
- Status: ${answers.productStatus}
- Tipo: ${answers.productType}
- Estágio: ${answers.stage}
- Modo: ${answers.mode}
- Usuário primário: ${answers.targetUser}
- Descrição: ${answers.description}
- GitHub management: ${answers.prepareGithubManagement ? "preparado; adicione um token local apenas ao configurar GitHub Projects ou sync de Epics/Features" : "ainda não solicitado"}

## Áreas Ativas

${activeAreas.map((area) => `- \`${area.path}/\` ${area.purpose}`).join("\n")}

## Próximo Passo

Abra o Copilot Chat, selecione \`LeanOS Chief\`, e peça:

\`\`\`text
Quero iniciar o LeanOS.
\`\`\`
`;
}

function workspaceModeIntro(answers: WorkspaceAnswers): string {
  if (answers.workspaceMode === "existing-product-repo") {
    return "LeanOS está instalado como camada operacional sobre um repositório de produto existente. Ele deve preservar código de produto, arquivos de pacote, configuração de deploy e arquivos existentes do repositório, a menos que o usuário confirme explicitamente uma mudança.";
  }

  return "LeanOS está preparando Strategy e Operations antes do bootstrap de app/código. O setup inicial não cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json`.";
}
