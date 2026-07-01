import type { AreaDefinition, RootDepartmentDefinition, WorkspaceAnswers } from "../types.js";
import { areaPath, createWorkspacePaths, departmentPath } from "../paths.js";

export function workspaceReadme(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  const paths = createWorkspacePaths(answers);

  return `# ${answers.productName}

${answers.description}

## O Que É

${answers.productName} é um produto de ${answers.companyName} do tipo ${answers.productType}. Este README deve ajudar um founder, colaborador ou modelo de AI a entender rapidamente o negócio, o produto e o estado atual do repositório.

## Para Quem É

- Usuário primário: ${answers.targetUser}
- Empresa: ${answers.companyName}
- Produto: ${answers.productName}

## Problema

Problema central ainda será refinado por Strategy Product em \`${paths.businessOsRoot}/strategy/product/knowledge/problem.md\`.

## Proposta De Valor

Proposta de valor inicial: ${answers.description}

Strategy Product deve amadurecer esta promessa em \`${paths.businessOsRoot}/strategy/product/knowledge/value-proposition.md\`.

## Status Atual

- Status do produto: ${answers.productStatus}
- Estágio: ${answers.stage}
- Modo do workspace: ${answers.workspaceMode}
- Modo operacional: ${answers.mode}
- GitHub management: ${answers.prepareGithubManagement ? "preparado; adicione um token local apenas ao configurar GitHub Projects ou sync de Epics/Features" : "ainda não solicitado"}

${workspaceModeIntro(answers)}

## Início

Para qualquer modelo de AI, comece em linguagem natural:

\`\`\`text
Quero iniciar o LeanOS.
\`\`\`

Depois comece por:

\`AGENT.md\`

## O Que Existe Neste Repositório

${repositoryContentsSummary(answers, paths.businessOsRoot)}

## Como Rodar Localmente

${localRunInstructions(answers)}

## Estrutura

- \`.github/\` arquivos de integração com GitHub.
- \`.leanos/\` shell local do LeanOS.
- \`${paths.runtimeRoot}/\` contexto, índices e traces locais.
- \`${paths.standardRoot}/\` templates, checklists e instruções para criar assets LeanOS.
- \`${paths.businessOsRoot}/\` sistema operacional de negócio do produto.
${activeRoots.map((department) => `- \`${departmentPath(department.key, paths)}/\` ${department.name} departamento.`).join("\n")}

## Foco Atual

- Primeiro foco: consolidar Strategy Baseline em \`${paths.businessOsRoot}/strategy/\`.
- Produto: refinar problema, ICP, proposta de valor e escopo de validação.
- Próxima decisão: pedir ao LeanOS Chief para iniciar a conversa guiada.

## Áreas Ativas

${activeAreas.map((area) => `- \`${areaPath(area, paths)}/\` ${area.purpose}`).join("\n")}

## LeanOS

LeanOS organiza o negócio como um produto: Strategy define direção, Operations transforma escopo em entrega, e Growth apoia lançamento, aprendizado e escala quando essas áreas estiverem ativas.

Este repositório usa a Navigation Chain do LeanOS. O root \`AGENT.md\` escolhe o departamento dono; a área dona escolhe role, skill e playbook. Para melhorar este README depois que houver mais contexto de produto, use:

\`\`\`text
Strategy Product -> Product Narrative Editor -> product-readme
\`\`\`

## Próximo Passo Para O Founder

Abra o chat/agente de AI que você usa neste repositório e peça:

\`\`\`text
Quero iniciar o LeanOS.
\`\`\`
`;
}

function workspaceModeIntro(answers: WorkspaceAnswers): string {
  if (answers.workspaceMode === "existing-product-repo") {
    return "LeanOS foi adicionado como camada operacional sobre um produto existente. Ao melhorar este README, preserve o README existente, comandos, links, badges e instruções úteis, a menos que o founder confirme uma mudança.";
  }

  return "LeanOS está preparando Strategy antes do bootstrap de app/código. O setup inicial não cria `src/`, `app/`, `pages/`, `package.json` ou `vercel.json`.";
}

function repositoryContentsSummary(answers: WorkspaceAnswers, businessOsRoot: string): string {
  if (answers.workspaceMode === "existing-product-repo") {
    return `Este repositório já possuía estrutura de produto antes do LeanOS. Use o código, scripts e documentação existentes como fonte operacional do app. O LeanOS fica em \`${businessOsRoot}/\`, \`.leanos/\` e \`.github/leanos/\` para organizar estratégia, operação e integração.`;
  }

  return `Este repositório contém o Business OS inicial do produto em \`${businessOsRoot}/\`. O app ou código de produto ainda não foi criado pelo LeanOS. Crie código somente quando Strategy/Product e, depois, Product Ops/Engineering indicarem que existe escopo pronto.`;
}

function localRunInstructions(answers: WorkspaceAnswers): string {
  if (answers.workspaceMode === "existing-product-repo") {
    return "Use os comandos já existentes do projeto. Se houver `package.json`, confira os scripts reais antes de rodar build, teste ou dev server. Não invente comandos neste README.";
  }

  return "Ainda não há app ou código de produto para rodar localmente. Depois que uma Feature estiver pronta para Engineering, registre aqui os comandos reais de desenvolvimento, build e teste.";
}
