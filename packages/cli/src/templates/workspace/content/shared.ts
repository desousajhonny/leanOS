import type { WorkspaceAnswers } from "../types.js";

export function businessProfile(answers: WorkspaceAnswers): string {
  return `# Perfil do Negócio

## Propósito

Registrar o contexto inicial de negócio coletado pelo LeanOS.

## Estado Atual

- Empresa: ${answers.companyName}
- Modo de operação: ${answers.mode}
- Estágio atual: ${answers.stage}

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function productBrief(answers: WorkspaceAnswers): string {
  return `# Brief do Produto

## Propósito

Registrar o contexto inicial de produto coletado pelo LeanOS.

## Estado Atual

- Produto: ${answers.productName}
- Tipo: ${answers.productType}
- Status: ${answers.productStatus}
- Usuário primário: ${answers.targetUser}

## Descrição

${answers.description}

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function folderReadme(title: string, purpose: string, whenToUse: string, sourceOfTruth: string, files: string[], relatedFolders: string[], agentNotes: string): string {
  return `# ${title}

## Propósito

${purpose}

## Use Quando

${whenToUse}

## Fonte da Verdade

\`${sourceOfTruth}\`

## Arquivos

${files.map((file) => `- \`${file}\``).join("\n")}

## Pastas Relacionadas

${relatedFolders.map((folder) => `- \`${folder}\``).join("\n")}

## Navegação

Use este README para escolher o próximo arquivo específico. Não carregue arquivos sem relação com o pedido.

## Notas para Agentes

${agentNotes}
`;
}

export function titledDraft(title: string, guidance: string): string {
  return stateDraft(title, guidance);
}

export function stateDraft(title: string, purpose: string): string {
  return `# ${title}

## Propósito

${purpose}

## Estado Atual

TBD

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function decisionLog(title: string): string {
  return `# ${title}

## Propósito

Registrar decisões duráveis e por que elas foram tomadas.

## Estado Atual

Nenhuma decisão registrada ainda.

## Decisões

| Data | Decisão | Contexto | Dono |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function learningLog(): string {
  return `# Registro de Aprendizado

## Propósito

Registrar aprendizado validado e seu impacto em roadmap, backlog e decisões de produto.

## Estado Atual

Nenhum aprendizado registrado ainda.

## Loop de Validação

Use esta sequência:

1. Suposição
2. Experimento
3. Evidência
4. Insight
5. Decisão
6. Impacto no roadmap

## Regras de Evidência

- Suposição: algo em que se acredita, mas que ainda não foi provado.
- Evidência: algo observado em usuários, comportamento, dados ou produto entregue.
- Insight: interpretação da evidência.
- Decisão: mudança assumida em estratégia, MVP, roadmap ou backlog.
- Impacto no roadmap: o que muda por causa da decisão.

Não registre uma suposição como aprendizado validado sem evidência.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD

## Entradas de Aprendizado

| Data | Suposição | Experimento | Evidência | Insight | Decisão | Impacto no Roadmap |
| --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | TBD | TBD |
`;
}

export function assumptionsRegister(): string {
  return `# Suposições

## Propósito

Listar suposições sobre cliente, problema, valor e MVP antes de tratá-las como fatos.

## Estado Atual

Nenhuma suposição priorizada ainda.

## Como Usar

Use este arquivo como registro de suposições para afirmações sobre produto, cliente, problema, valor e MVP.

Não escreva conclusões aqui como fatos. Escreva como suposições até que exista evidência.

## Loop de Validação

Cada suposição deve passar por:

\`assumption -> experiment -> evidence -> decision -> roadmap impact\`

## Tipos de Suposição

- customer: para quem o produto é.
- problem: dor, frequência ou urgência assumida.
- value: resultado ou promessa que se acredita importar.
- MVP: menor escopo que se acredita validar o produto.
- channel: como o usuário descobrirá ou adotará o produto.
- business: preço, disposição a pagar ou unit economics.

## Status de Evidência

- untested: ainda sem evidência.
- weak_signal: anedota, opinião ou sinal muito pequeno.
- tested: experimento concluído e evidência registrada.
- validated: evidência suficiente para apoiar uma decisão.
- invalidated: a evidência sugere que a suposição é falsa.

## Registro de Suposições

| ID | Suposição | Tipo | Fonte | Confiança | Status de Evidência | Próximo Experimento |
| --- | --- | --- | --- | --- | --- | --- |
| A-001 | TBD | customer/problem/value/MVP | TBD | low/medium/high | untested | TBD |

## Template de Entrada

Use este formato ao adicionar uma nova suposição:

| ID | Suposição | Tipo | Fonte | Confiança | Status de Evidência | Próximo Experimento |
| --- | --- | --- | --- | --- | --- | --- |
| A-002 | Acreditamos que [usuário primário] tem [problema] com frequência suficiente para se importar com [promessa de valor]. | problem | crença do founder / sinal de usuário | low | untested | Entrevistar 5 usuários-alvo |

## Checklist de Promoção

Antes de mover uma suposição para aprendizado ou roadmap:

- [ ] A fonte da evidência está nomeada.
- [ ] O sinal de sucesso ou falha está definido.
- [ ] Evidência está separada de interpretação.
- [ ] A decisão está explícita.
- [ ] Impacto em roadmap ou backlog está registrado quando relevante.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function riskiestSuposições(): string {
  return `# Suposições Mais Arriscadas

## Propósito

Priorizar suposições que poderiam invalidar o produto, MVP ou roadmap.

## Estado Atual

Nenhuma suposição mais arriscada selecionada ainda.

## Critérios de Priorização

- Importância: isso quebraria o produto se fosse falso?
- Incerteza: quão pouca evidência temos?
- Testabilidade: conseguimos aprender rapidamente?
- Custo do atraso: o que acontece se adiarmos esse aprendizado?

## Riscos Ranqueados

| Rank | ID da Suposição | Risco | Por que Importa | Próximo Experimento | Decisão Necessária |
| --- | --- | --- | --- | --- | --- |
| 1 | TBD | TBD | TBD | TBD | TBD |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function validationExperiments(): string {
  return `# Experimentos

## Propósito

Planejar experimentos que produzam evidência para as suposições mais arriscadas.

## Estado Atual

Nenhum experimento planejado ainda.

## Regras de Experimento

- Todo experimento deve se conectar a uma suposição.
- Defina sinais de sucesso e falha antes de executar.
- Separe evidência observada de interpretação.
- Registre decisão e impacto no roadmap depois do experimento.

## Plano de Experimento

| ID | ID da Suposição | Método | Público | Sinal de Sucesso | Sinal de Falha | Status |
| --- | --- | --- | --- | --- | --- | --- |
| E-001 | TBD | interview/landing-page/prototype/manual-test/data-review | TBD | TBD | TBD | planned |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function validationSuccessMetrics(): string {
  return `# Métricas de Sucesso

## Propósito

Definir sinais de validação antes de tratar aprendizado como evidência.

## Estado Atual

Nenhuma métrica de sucesso definida ainda.

## Regras de Métrica

- Métricas devem se conectar a suposições ou experimentos.
- Evidência qualitativa é permitida, mas precisa nomear a fonte.
- Um sinal não é uma decisão; decisões são registradas depois da interpretação da evidência.

## Métricas

| Métrica | Suposição ou Experimento Conectado | Limite de Sucesso | Limite de Falha | Fonte de Evidência |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}

export function checklist(title: string): string {
  return `# ${title}

## Propósito

Acompanhar readiness sem inventar fatos específicos do projeto.

## Estado Atual

TBD

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD

## Checklist

- [ ] Contexto revisado
- [ ] Escopo coerente
- [ ] Riscos visíveis
- [ ] Próxima ação clara
`;
}

export function standardTemplate(fileName: string): string {
  return `# ${toTitle(fileName.replace(/\.(md|yaml)$/, ""))}

Use este template como ponto de partida.

## Obrigatório

- Propósito
- Entradas
- Processo
- Saída
- Navegação
`;
}

export function qualityChecklist(name: string): string {
  return `# Checklist de Qualidade de ${name}

- [ ] O propósito está claro
- [ ] Os arquivos de fonte da verdade estão referenciados
- [ ] A navegação está explícita
- [ ] As expectativas de saída estão claras
- [ ] Nenhum path inativo ou ausente é exigido
`;
}

export function creationInstructions(assetName: string): string {
  return `# Instruções para Criar ${assetName}

1. Leia \`../README.md\`.
2. Escolha o departamento e a área ativos.
3. Use o template correspondente.
4. Valide com o checklist correspondente.
5. Crie o asset dentro da área selecionada.
`;
}

export function toTitle(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
