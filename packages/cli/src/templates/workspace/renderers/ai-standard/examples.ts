import { rootDepartments } from "../../definitions/departments.js";
import { getAllAreas, getArea } from "../../selectors.js";
import type { FileEntry, WorkspaceAnswers } from "../../types.js";
import { folderReadme, toTitle } from "../../content/shared.js";
import { rootAgent } from "../agent.js";
import { playbookFile, roleFile, skillFile } from "../departments.js";

type ExampleGroup = {
  key: string;
  title: string;
  purpose: string;
  use: string;
  files: string[];
};

const exampleGroups: ExampleGroup[] = [
  {
    key: "agents",
    title: "Exemplos de Agente",
    purpose: "Exemplos de comportamento de roteamento de AGENT.md raiz e de área.",
    use: "Use quando revisar como um agente deve rotear, definir limites e delegar ao próximo owner.",
    files: ["example-root-agent.md", "example-area-agent.md"]
  },
  {
    key: "structure",
    title: "Exemplos de Estrutura",
    purpose: "Exemplos de documentação de pasta e área.",
    use: "Use quando revisar como arquivos estilo README devem mapear estrutura sem virar operadores.",
    files: ["example-folder-readme.md", "example-area-readme.md"]
  },
  {
    key: "execution",
    title: "Exemplos de Execução",
    purpose: "Exemplos de roles, skills, playbooks e workflows.",
    use: "Use quando revisar assets de execução de nível de área ou workflows de departamento/área.",
    files: ["example-role-senior-developer.md", "example-skill-coherence.md", "example-playbook-prepare-pr.md", "example-workflow-feature-to-delivery-cycle.md"]
  },
  {
    key: "github",
    title: "Exemplos de GitHub",
    purpose: "Exemplos de epics, features e pull requests do GitHub.",
    use: "Use quando revisar artefatos de colaboração prontos para GitHub.",
    files: ["example-github-epic.md", "example-github-feature.md", "example-pull-request.md"]
  },
  {
    key: "review",
    title: "Exemplos de Review",
    purpose: "Exemplos de saídas de review.",
    use: "Use quando revisar como estruturar findings e decisões de code review.",
    files: ["example-code-review.md"]
  }
];

const exampleWorkspaceAnswers: WorkspaceAnswers = {
  workspaceMode: "new-product-workspace",
  initialActivationMode: "all-at-once",
  prepareGithubManagement: true,
  companyName: "Clinic AI",
  productName: "Clinic Assistant AI",
  productStatus: "new-product",
  productType: "ai-agent-product",
  description: "Example product for LeanOS asset examples.",
  targetUser: "Small clinic owners",
  stage: "idea",
  mode: "founder-plus-ai-agents",
  subareas: getAllAreas().map((area) => area.key)
};

export function exampleFiles(): FileEntry[] {
  return [
    { path: "ai-standard/examples/README.md", content: examplesReadme(exampleGroups) },
    ...exampleGroups.map((group) => ({ path: `ai-standard/examples/${group.key}/README.md`, content: exampleGroupReadme(group) })),
    ...exampleGroups.flatMap((group) => group.files.map((file) => ({ path: `ai-standard/examples/${group.key}/${file}`, content: exampleContent(group.key, file) })))
  ];
}

function examplesReadme(groups: ExampleGroup[]): string {
  return `# Examples

## Propósito

Exemplos ilustrativos de assets LeanOS.

## Use Quando

Use exemplos depois de ler a foundation, instrução, template e checklist correspondentes.

Exemplos mostram como "bom o bastante" pode parecer. Eles não são contexto ativo do workspace, nem templates, nem instruções.

## Categorias

${groups.map((group) => `### \`${group.key}/\`\n\n${group.purpose}\n\nUse quando: ${group.use}\n\nArquivos:\n${group.files.map((file) => `- \`${group.key}/${file}\``).join("\n")}`).join("\n\n")}

## Como Usar

1. Confirme o tipo de asset em \`../foundation/asset-taxonomy.md\`.
2. Carregue a instrução de criação correspondente em \`../instructions/\`.
3. Use o template correspondente em \`../templates/\`.
4. Valide com o checklist correspondente em \`../checklists/\`.
5. Abra apenas a menor categoria de exemplo se precisar de uma referência.

## Linhas Vermelhas

- Não copie exemplos cegamente.
- Não trate conteúdo de empresa, produto, issue ou PR de exemplo como contexto real do workspace.
- Não use exemplos no lugar de templates.
- Não deixe exemplos sobrescreverem o departamento, área, role, skill, playbook ou workflow ativo.
`;
}

function exampleGroupReadme(group: ExampleGroup): string {
  return `# ${group.title}

## Propósito

${group.purpose}

## Use Quando

${group.use}

## Arquivos

${group.files.map((file) => `- \`${file}\``).join("\n")}

## Pastas Relacionadas

- \`../\`
- \`../../foundation/\`
- \`../../instructions/\`
- \`../../templates/\`
- \`../../checklists/\`

## Notas para Agentes

Estes arquivos são apenas exemplos. Use-os para formato e sinais de qualidade, não como contexto ativo.
`;
}

function exampleContent(_groupKey: string, fileName: string): string {
  const engineering = getArea("operations.engineering");
  const product = getArea("strategy.product");
  const seniorDeveloper = engineering.roles.find((role) => role.slug === "senior-developer") ?? engineering.roles[0];
  const coherence = product.skills.find((skill) => skill.slug === "coherence") ?? product.skills[0];
  const preparePr = engineering.playbooks.find((playbook) => playbook.slug === "prepare-pr") ?? engineering.playbooks[0];
  const examples: Record<string, string> = {
    "example-root-agent.md": rootAgent(getAllAreas(), rootDepartments, exampleWorkspaceAnswers),
    "example-area-agent.md": exampleAreaAgent(),
    "example-folder-readme.md": folderReadme("Pasta de Exemplo", "Propósito de exemplo.", "Use quando for relevante.", "README.md", ["README.md"], ["../"], "Notas de exemplo."),
    "example-area-readme.md": exampleAreaReadme(),
    "example-role-senior-developer.md": roleFile(engineering, seniorDeveloper),
    "example-skill-coherence.md": skillFile(product, coherence),
    "example-playbook-prepare-pr.md": playbookFile(engineering, preparePr),
    "example-workflow-feature-to-delivery-cycle.md": exampleWorkflowFeatureToDeliveryCycle(),
    "example-github-epic.md": exampleGithubEpic(),
    "example-github-feature.md": exampleGithubFeature(),
    "example-pull-request.md": examplePullRequest(),
    "example-code-review.md": exampleCodeReview()
  };

  return examples[fileName] ?? `# ${toTitle(fileName.replace(".md", ""))}

This example is intentionally minimal.

Use the matching template, instruction and checklist before creating a real asset.
`;
}

function exampleAreaAgent(): string {
  return `# Design Agent

Você é o Design Lead deste workspace.

This \`AGENT.md\` is the operating owner for \`operations/design/\`.

Use \`README.md\` as the directory map. Use \`area.yaml\` when machine-readable structure matters.

## Escopo Operacional

Roteie trabalho de Design para a menor role especialista antes de carregar skills ou playbooks.

## Roteamento De Roles

- Product Designer: \`roles/product-designer.role.md\` - use for design system, flows, screens and interaction decisions.
- UX Researcher: \`roles/ux-researcher.role.md\` - use for research questions, interview synthesis and learning loops.
- Accessibility Specialist: \`roles/accessibility-specialist.role.md\` - use for WCAG, keyboard, focus, contrast and assistive technology concerns.
- UX Writer: \`roles/ux-writer.role.md\` - use for product copy, microcopy, errors and empty states.

## Regras De Roteamento

1. Comece pelo AGENT desta área para trabalho operacional dentro de Design.
2. Carregue uma role especialista antes de carregar skills ou playbooks.
3. Carregue somente skills e playbooks exigidos pela role selecionada.
4. Mantenha contexto reutilizável de Design em \`knowledge/\`.
5. Peça confirmação antes de alterar arquivos duráveis de knowledge.

## Navegação

\`operations/design/AGENT.md -> Role -> Skills -> Playbook -> Saída\`
`;
}

function exampleAreaReadme(): string {
  return `# Design

## Propósito

Own product experience quality: design system, accessibility, flows, interaction decisions and UX writing.

## Use Quando

- The request changes user-facing behavior, screens, states, copy or interaction.
- The founder wants to define design before implementation.
- A GitHub issue needs Design criteria.

## Source of Truth

- \`knowledge/design-system.md\`
- \`knowledge/accessibility.md\`
- \`knowledge/user-flows.md\`

## Navegação

1. For operational work, start with \`AGENT.md\`.
2. Use this README as the directory map.
3. After the area AGENT selects a role, load only required skills and playbooks.
4. Produce the requested output and update knowledge only after confirmation.

## Responsabilidades dos Arquivos

- \`AGENT.md\`: Design operating lead.
- \`README.md\`: Design area map.
- \`area.yaml\`: machine-readable Design structure.
- \`knowledge/\`: confirmed reusable Design context.
- \`roles/\`: Design specialist operating personas.
- \`skills/\`: focused Design capabilities.
- \`playbooks/\`: Design execution sequences.
`;
}

function exampleWorkflowFeatureToDeliveryCycle(): string {
  return `# Workflow Feature To Delivery Cycle

## Propósito

Mover uma Feature local confirmada ou issue do GitHub mapeada de entendimento para branch, implementação, review e prontidão de PR.

## Gatilho

O founder pede para implementar uma Feature específica ou uma issue do GitHub que representa uma Feature.

## Áreas Participantes

- Product Ops: confirma escopo de delivery, prontidão de issue e limites de delivery.
- Engineering: planeja, implementa, testa e prepara PR.
- Design: condicional, somente quando UX muda.
- Security: condicional, somente quando dados, auth, permissões, privacidade, risco de abuso ou compliance estiverem envolvidos.

## Sequência

1. Carregue a Feature, Epic pai e contexto do MVP.
2. Resuma a Feature no chat e peça confirmação.
3. Cheque prontidão de Product e Engineering.
4. Adicione critérios de Design somente quando UX voltada ao usuário mudar.
5. Adicione critérios de Security somente quando a issue tiver superfície sensível a Security.
6. Crie um plano de branch vinculado à Feature.
7. Implemente somente após confirmação.
8. Rode testes ou explique por que não podem rodar.
9. Prepare um rascunho de PR usando o template de PR.
10. Roteie para review antes do merge.

## Saída

- Resumo da Feature confirmada
- Plano de implementação
- Nome da branch
- Plano de teste
- Rascunho de PR
- Notas de prontidão de review
`;
}

function exampleGithubEpic(): string {
  return `# Epic: Guided clinic intake MVP

## Outcome

Donos de clínica conseguem capturar intake estruturado do paciente antes da consulta.

## Contexto Estratégico

- Produto: Clinic Assistant AI
- ICP: donos de clínicas pequenas
- Problem: o intake da recepção é lento e inconsistente
- Proposta de valor: reduzir trabalho manual de intake antes das consultas
- Validation suposição: clínicas confiarão em intake guiado por IA para casos de baixo risco
- Evidence status: suposição

## Vínculo Com Escopo De Delivery

- scope_type: MVP
- milestone: MVP Alpha
- release_goal: validar o fluxo guiado de intake, resumo do intake e review da equipe
- Non-goals: automação de seguro, diagnóstico, tomada de decisão clínica
- Acceptance criteria: equipe consegue revisar e editar o resumo do intake
- Roadmap item: Fluxo De Intake Do MVP
- Milestone: MVP Alpha

## Critérios De Product

- Valor para usuário: menos tempo de recepção
- Jobs to be done: capturar informações de intake antes da visita
- Critérios de aceite: resumo do intake é compreensível e editável
- Sinal de aprendizado: pelo menos 5 clínicas completam sessões de teste de intake

## Critérios De Design

- Fluxo de usuário: paciente começa pelo link da consulta e envia o intake
- Telas ou estados: início, fluxo de perguntas, review, enviado
- Restrições de UX: linguagem simples, indicação de progresso, recuperação de erro
- Considerações de acessibilidade: navegação por teclado e labels de formulário legíveis

## Critérios De Engineering

- Abordagem técnica: fluxo de formulário com estado de rascunho persistido
- Limites do sistema: apenas intake do paciente e review da equipe
- Expectativas de teste: testes de validação de formulário e geração de resumo

## Critérios De Security

- Dados envolvidos: informações pessoais fornecidas pelo paciente
- Auth ou permissões: review somente pela equipe
- Considerações de privacidade: evitar expor dados de intake em logs
- Casos de abuso: submissões de spam

## Quebra Em Sub-Issues

- Status: ready_for_breakdown
- Features esperadas: formulário de intake, persistência de rascunho, review da equipe, controles de Security
- Perguntas abertas: retention policy
`;
}

function exampleGithubFeature(): string {
  return `# Construir fluxo de formulário de intake do paciente

## Epic Pai

- Epic: #123 Guided clinic intake MVP
- Milestone: MVP Alpha
- Roadmap item: Fluxo De Intake Do MVP

## Propósito

Criar o primeiro fluxo voltado ao paciente para coletar informações de intake.

## Escopo

Implementar estados de início, fluxo de perguntas, review e enviado.

## Não Objetivos

- Dashboard de review da equipe
- Diagnóstico
- Processamento de seguro

## Critérios De Product

- Valor para usuário: paciente consegue enviar intake antes da consulta
- Critérios de aceite: paciente consegue completar e revisar todos os campos obrigatórios
- Sinal de sucesso ou aprendizado: usuários de teste completam o fluxo sem ajuda

## Critérios De Design

- Fluxo: link da consulta -> perguntas de intake -> review -> enviado
- Telas ou estados: início, etapa, erro de validação, review, sucesso
- Restrições de UX: progresso claro e perguntas em linguagem simples
- Acessibilidade: inputs com label e navegação por teclado

## Critérios De Engineering

- Área sugerida: operations/engineering
- Notas técnicas: persistir estado de rascunho localmente ou server-side conforme stack escolhida
- Dependências: lista de campos de produto e regras de validação
- Expectativas de teste: testes de validação, navegação e submit

## Critérios De Security

- Dados: informações pessoais fornecidas pelo paciente
- Permissões: nenhum dado apenas da equipe exposto ao paciente
- Privacidade: nenhum dado sensível em eventos de analytics

## Definição De Pronto

- [ ] Critérios de Product satisfeitos
- [ ] Critérios de Design satisfeitos
- [ ] Critérios de Engineering satisfeitos
- [ ] Critérios de Security satisfeitos
- [ ] Testes ou plano de validação definidos
`;
}

function examplePullRequest(): string {
  return `# Adicionar fluxo de formulário de intake do paciente

## Resumo

Adiciona o fluxo inicial de formulário de intake do paciente com validação de campos obrigatórios e estado de review.

## Issue Vinculada

Closes #554

## Epic Pai

Epic #123

## Contexto LeanOS

- Department: Operations
- Area: Engineering
- Role: Senior Developer
- Skills: implementation-planning, pull-request
- Playbook: prepare-pr

## Alinhamento De Product / Escopo De Delivery

- Roadmap item: Fluxo De Intake Do MVP
- Escopo de delivery: fluxo guiado de intake
- Critérios de aceite: paciente consegue completar e revisar campos obrigatórios
- Impacto de validação ou aprendizado: habilita primeiro teste de usabilidade

## Notas De Design

Usa a fundação atual de Design para labels de formulário, espaçamento e comportamento de foco.

## Notas De Security

Evita registrar valores de campos de intake em logs.

## Tests

- [x] Testes de validação de formulário
- [x] Check manual de navegação por teclado

## Founder Testing Guide

### O Que Mudou

Pacientes agora conseguem completar o primeiro fluxo de formulário de intake, revisar respostas e enviar o intake.

### Onde Testar

- URL de preview: use a URL de preview do PR quando disponível
- Rota ou tela local: /intake
- Conta ou dado de teste: use apenas perfil de paciente de teste

### Como Testar

1. Abra a rota de intake.
2. Complete as perguntas obrigatórias.
3. Tente enviar com uma resposta obrigatória ausente.
4. Revise as respostas.
5. Envie o formulário.

### Resultado Esperado

O founder deve ver validação para respostas obrigatórias ausentes, um estado de review e um estado final enviado sem expor dados de intake em logs.

### Fora Do Escopo

Dashboard de review da equipe and diagnosis are not included in this PR.

### Riscos Conhecidos Ou Limites

Ordem das perguntas ainda precisa de validação de usabilidade.

## Riscos

- Risco de escopo: review da equipe permanece separado
- Risco técnico: estratégia de persistência pode mudar
- Risco de Product: ordem das perguntas ainda precisa de validação com usuário
- Risco de Security: política de retenção ainda está aberta
`;
}

function exampleCodeReview(): string {
  return `# Code Review

## Contexto Do Review

- PR: #812
- Issue vinculada: #554
- Epic pai: #123
- Escopo de delivery: fluxo guiado de intake
- Critérios de aceite: paciente consegue completar e revisar campos obrigatórios

## Achados

| Severidade | Arquivo/Área | Achado | Mudança Obrigatória |
| --- | --- | --- | --- |
| medium | intake form validation | Estado de erro não é anunciado para leitores de tela. | Adicione mensagem de erro acessível e comportamento de foco. |
| low | tests | Nota de check manual apenas por teclado ausente. | Adicione nota de validação ao checklist do PR. |

## Dimensões Do Review

- Correção: majoritariamente alinhada
- Controle de escopo: nenhum escopo não relacionado encontrado
- Testes: validação automatizada presente
- Security/privacidade: nenhum log sensível encontrado
- Design/UX: ajuste de acessibilidade obrigatório

## Decisão

- [ ] Pronto para merge
- [x] Precisa de mudanças
- [ ] Bloqueado por contexto ausente

## Perguntas em Aberto

- O estado de rascunho do intake deve persistir entre sessões do navegador?
`;
}
