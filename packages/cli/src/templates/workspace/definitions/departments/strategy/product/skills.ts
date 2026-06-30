import type { SkillDefinition } from "../../../../types.js";

export const strategyProductSkills: SkillDefinition[] = [
    {
      slug: "business-baseline",
      title: "Business Baseline",
      purpose: "Mapeie uma ideia bruta do founder ou o contexto atual do negócio em fatos conhecidos, lacunas de Strategy Baseline, próxima pergunta guiada e próxima rota segura.",
      useWhen: ["o founder está iniciando o LeanOS", "a ideia de produto é bruta", "o Chief precisa identificar o estágio de negócio atual antes de roadmap ou escopo de validação do MVP"],
      requiredContext: ["../../../leanos.yaml", "../../../.leanos/standard/foundation/founder-progression-model.md", "../../../.leanos/standard/foundation/progression-gates.md", "../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      inputs: ["Contexto seed", "Mensagem do founder", "Fatos conhecidos de produto", "Suposições conhecidas", "Estágio atual", "Lacunas abertas de Strategy"],
      process: ["Leia apenas o contexto ativo de Strategy.", "Reafirme o que é conhecido a partir do contexto seed e do knowledge de Product.", "Classifique o estágio de negócio atual usando o Founder Progression Model.", "Verifique `progression-gates.md` para contexto obrigatório, próximos estágios permitidos e próximos estágios bloqueados.", "Identifique lacunas de Strategy Baseline: usuário-alvo, problema, promessa, alternativa, suposição mais arriscada, foco imediato e alvo de validação do MVP.", "Escolha a menor próxima pergunta guiada.", "Recomende a próxima rota apenas quando o gate estiver satisfeito."],
      checks: ["A saída nomeia lacunas de baseline em vez de fazer uma pergunta genérica.", "A próxima pergunta está ligada a uma decisão ausente.", "Roadmap e validação do MVP são recomendados apenas depois que Strategy Baseline estiver minimamente coerente.", "activation_required é usado apenas para áreas inativas depois que o gate permitir."],
      outputs: ["Estágio de negócio atual", "Resumo do contexto conhecido", "Lacunas de Strategy Baseline", "Próxima pergunta guiada", "Próxima rota segura"],
      filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      redLines: ["Não faça perguntas amplas e vazias como conte mais.", "Não crie roadmap, backlog de MVP, Epics, Features ou trabalho de implementação.", "Não ative Operations, Growth ou GitHub a partir da calibração de ideia."]
    },
    {
      slug: "product-core",
      title: "Product Core",
      purpose: "Consolide produto, usuário primário, problema central, promessa, diferenciação e suposições mais arriscadas em um Product Core coerente apenas quando a ideia tiver sinal suficiente.",
      useWhen: ["uma ideia do founder tem sinais de discovery suficientes para consolidar", "o playbook idea-calibration precisa de uma tese de produto antes do escopo de validação do MVP", "ICP, problema e proposta de valor estão interligados"],
      requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md"],
      inputs: ["Ideia do founder", "Estágio de negócio atual", "Lacunas de Strategy Baseline", "Usuário primário", "Problema central", "Alternativa existente", "Resultado desejado", "Promessa do produto", "Evidência", "Restrições"],
      process: ["Verifique prontidão do Product Core: se usuário primário, problema central ou promessa do produto estiverem ausentes, ainda não consolide; retorne sinais ausentes e próxima pergunta útil para idea-calibration.", "Reafirme o produto em linguagem simples.", "Defina o usuário primário e seus critérios de qualificação.", "Nomeie o problema central, gatilho de dor e alternativa existente.", "Articule a promessa do produto, resultado desejado e diferenciação.", "Separe evidência, suposições, suposição mais arriscada e perguntas abertas.", "Proponha atualizações de arquivo apenas depois que o founder confirmar o Product Core."],
      checks: ["Product Core pode ser resumido em um parágrafo coerente.", "Usuário primário, problema central e promessa do produto sustentam uns aos outros.", "A evidência não é inventada nem exagerada.", "Não escreva Product Core quando usuário primário, problema central e promessa ainda forem chute.", "Perguntas de pricing, receita ou modelo de delivery são roteadas para Strategy Business quando bloquearem a decisão."],
      outputs: ["Produto em uma frase", "Usuário primário", "Problema central", "Alternativa existente", "Promessa do produto", "Diferenciação", "Evidência", "Suposições", "Suposição mais arriscada", "Principal pergunta aberta", "Próxima rota recomendada"],
      filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md"],
      redLines: ["Não conduza uma entrevista rígida de discovery.", "Não invente evidência de cliente ou validação.", "Não force Product Core a partir de sinal fraco; retorne lacunas.", "Não crie roadmap, backlog de MVP, Epics, Features ou trabalho de implementação.", "Roteie decisões de pricing, receita ou modelo de delivery para Strategy Business."]
    },
    {
      slug: "mvp-validation-scope",
      title: "Escopo de Validação do MVP",
      purpose: "Defina o menor caminho de validação do MVP capaz de testar a tese de negócio e produzir uma Sequência de Validação do MVP.",
      useWhen: ["o founder tem uma ideia bruta e quer a primeira direção de MVP", "o negócio está em seed, strategy_forming ou mvp_shaping", "a validação deve acontecer por MVP, landing page, workflow manual ou slice concierge"],
      requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../../business/knowledge/business-model-canvas.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      inputs: ["Ideia do founder", "Tese de Negócio", "Usuário-alvo", "Problema central", "Promessa", "Restrições conhecidas", "Opções de validação manual ou productizada"],
      process: ["Reafirme a tese de negócio e o usuário-alvo.", "Nomeie o problema central e a promessa.", "Defina o objetivo de validação do MVP.", "Escolha o menor MVP Slice capaz de validar a tese.", "Separe Dentro do Escopo, Fora do Escopo, Partes Manuais / Concierge e Partes Productizadas.", "Defina Sinais de Sucesso e Sinais de Pivot.", "Rascunhe a Sequência de Validação do MVP sem criar roadmap, Epics ou Features.", "Registre riscos abertos e se o escopo está pronto para Product Ops."],
      checks: ["O MVP valida a tese de negócio em vez de maximizar quantidade de features.", "Trabalho manual ou concierge é permitido quando acelera validação.", "Sinais de sucesso e pivô são observáveis.", "A Sequência de Validação do MVP não é roadmap nem escopo de delivery.", "Não atualize arquivos de Roadmap a partir do escopo de validação do MVP."],
      outputs: ["Escopo de Validação do MVP", "Tese de Negócio", "MVP Slice", "Sinais de Sucesso", "Sinais de Pivot", "Sequência de Validação do MVP", "Recomendação ready-for-Product-Ops"],
      filesToUpdate: ["../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      redLines: ["Não exija entrevistas ou pesquisa antes de propor um escopo de validação de MVP quando o founder quer velocidade.", "Não crie Epics, Features ou escopo de implementação a partir de Strategy Product.", "Não atualize arquivos de Roadmap a partir do escopo de validação do MVP."]
    },
    {
      slug: "coherence",
      title: "Checagem De Coerência",
      purpose: "Checar alinhamento entre ICP, problema, proposta de valor, MVP Validation Scope, roadmap e issue.",
      useWhen: ["strategy parece inconsistente", "MVP Validation Scope pode não combinar com o problema", "roadmap ou issue precisa de review de produto"],
      requiredContext: ["../knowledge/icp.md", "../knowledge/problem.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../../roadmap/knowledge/roadmap.md"],
      inputs: ["ICP", "Problema", "Proposta de valor", "Escopo de Validação do MVP", "Roadmap ou issue"],
      process: ["Cheque fit entre ICP e problema.", "Cheque fit entre proposta de valor e problema.", "Cheque fit entre MVP Validation Scope e valor.", "Cheque fit entre roadmap e MVP Validation Scope.", "Liste contradições e próximos ajustes."],
      checks: ["Achados separam alinhamento de inconsistência.", "Riscos são acionáveis.", "Próximo comando ou workflow está claro."],
      outputs: ["Score de coerência", "Pontos alinhados", "Inconsistências", "Riscos", "Próxima ação recomendada"],
      filesToUpdate: ["Não atualize arquivos salvo se o usuário pedir após revisar os achados."],
      redLines: ["Não reescreva estratégia silenciosamente.", "Não trate review de coerência como aprovação para implementar."]
    },
    {
      slug: "write-product-readme",
      title: "Escrever README Do Produto",
      purpose: "Transformar contexto de empresa/produto em um README.md user-friendly, claro para founders, colaboradores e modelos, preservando repositórios existentes.",
      useWhen: ["o modelo criar um novo repositório para o founder", "um repositório existente tiver README fraco, genérico ou desatualizado", "o modelo editar um repositório existente e precisar melhorar a apresentação do produto", "o founder pedir para melhorar o README do produto", "o README atual falar mais do LeanOS do que do negócio/produto"],
      requiredContext: ["../../../README.md quando existir", "../../../leanos.yaml", "../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/mvp-validation-scope.md", "../../../.leanos/standard/templates/product/product-readme-template.md"],
      inputs: ["Nome do produto", "Empresa", "Descrição curta", "Usuário ou ICP", "Problema", "Proposta de valor", "Status atual", "Modo novo ou repositório existente", "Estrutura real do repositório", "README existente quando houver"],
      process: ["Entre pela Navigation Chain: Root -> Strategy -> Product -> Product Narrative Editor -> write-product-readme.", "Rota oficial da área: Strategy Product -> Product Narrative Editor -> write-product-readme.", "Use quando o modelo criar um novo repositório para o founder.", "Use quando um repositório existente tiver README fraco, genérico ou desatualizado.", "Leia o README existente antes de propor qualquer alteração.", "Leia o contexto de Strategy Product disponível e separe fatos confirmados de lacunas.", "Use `.leanos/standard/templates/product/product-readme-template.md` como estrutura base, adaptando ao estágio e ao tipo de repositório.", "Escreva primeiro uma proposta de README ou diff resumido; deve propor diff antes de escrever e pedir confirmação explícita antes de atualizar `../../../README.md`.", "Em repositório existente, preserve comandos, badges, links, instruções de setup e notas técnicas úteis já presentes.", "Em repositório novo sem app/código, explique que o app ou código de produto ainda não foi criado pelo LeanOS e aponte para o Business OS.", "Mantenha a seção LeanOS curta e no fim; o começo do README deve explicar o produto/empresa."],
      checks: ["O README começa explicando o produto, não o framework.", "O README inclui O Que É, Para Quem É, Problema, Proposta De Valor, Status Atual, Estrutura, Foco Atual e LeanOS.", "Fatos incertos aparecem como lacunas ou próximos passos, não como afirmações inventadas.", "README existente é preservado quando contém instruções técnicas úteis.", "A saída é útil para um founder, um colaborador novo e um modelo que abre o repo pela primeira vez."],
      outputs: ["README do produto proposto", "Resumo do que foi preservado do README existente", "Lacunas de contexto de produto", "Próxima pergunta ou confirmação para escrita", "Diff proposto quando houver README existente"],
      filesToUpdate: ["Atualize `../../../README.md` somente após confirmação explícita.", "Atualize Strategy Product knowledge somente se o founder confirmar que o README revelou uma decisão durável de produto."],
      redLines: ["Não sobrescreva README existente sem confirmação explícita.", "Não remova instruções técnicas úteis de setup, build, test ou deploy.", "Não invente clientes, métricas, provas, features, stack ou comandos.", "Não transforme o README em landing page.", "Não polua o root `AGENT.md`; use a Navigation Chain LeanOS para chegar nesta skill."]
    }
  ];
