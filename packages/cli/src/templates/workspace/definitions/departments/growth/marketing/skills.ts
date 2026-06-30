import type { SkillDefinition } from "../../../../types.js";

export const growthMarketingSkills: SkillDefinition[] = [
    {
      slug: "define-positioning",
      title: "Definir Posicionamento",
      purpose: "Definir categoria, audiência, promessa e diferenciação.",
      useWhen: ["a mensagem de mercado está pouco clara", "a landing page precisa de posicionamento", "o lançamento precisa de uma narrativa focada"],
      requiredContext: ["Problema de produto", "ICP", "Proposta de valor", "Posicionamento existente"],
      inputs: ["Audiência", "Problem", "Promessa", "Alternativas", "Diferenciação"],
      process: ["Carregue contexto de produto", "Defina audiência e categoria", "Esclareça promessa e prova", "Identifique diferenciação", "Capture afirmações abertas que precisam de validação"],
      checks: ["Nenhuma prova inventada", "A mensagem combina com ICP/problema", "Diferenciação is specific enough for MVP"],
      outputs: ["Declaração de posicionamento", "Riscos de mensagem", "Perguntas abertas sobre prova"],
      filesToUpdate: ["Atualize `../knowledge/positioning.md` após confirmação explícita."],
      redLines: ["Não invente evidência.", "Não prometa além da capacidade do produto."]
    },
    {
      slug: "create-landing-page-copy",
      title: "Criar Copy De Landing Page",
      purpose: "Rascunhar copy clara para a primeira página de validação ou lançamento.",
      useWhen: ["copy de landing page é necessária", "uma página de validação do MVP é necessária", "a página de lançamento precisa de mensagem concisa", "a landing page mostra plano, preço, trial, desconto, pacote ou entitlement"],
      requiredContext: ["Positioning", "Product context", "../finance/knowledge/pricing.md quando houver plano ou preço", "Fundação de Design quando estrutura visual/UI for necessária"],
      inputs: ["Audiência", "Problem", "Oferta", "Planos exibidos se aplicável", "CTA", "Objeções", "Objetivo de validação"],
      process: ["Carregue posicionamento", "Se houver plano, preço, trial, desconto, pacote, limite ou entitlement, carregue `../finance/knowledge/pricing.md` antes de escrever a oferta", "Rascunhe hero, problema, oferta e CTA", "Trate objeções", "Defina sinal de validação", "Roteie necessidades de design visual para Operations Design", "Roteie alterações de plano, preço ou entitlement para Growth Finance"],
      checks: ["A copy está clara", "O CTA combina com o objetivo de aprendizado", "Nenhuma prova ou depoimento falso", "Planos e preços vêm do Pricing Catalog quando aparecem na página", "Dependência de Design é sinalizada quando necessária"],
      outputs: ["Copy de landing page", "CTA", "Sinal de validação", "Pricing Catalog references quando aplicável", "Follow-up de Design se necessário"],
      filesToUpdate: ["Atualize `../knowledge/landing-page.md` após confirmação explícita."],
      redLines: ["Não invente depoimentos ou métricas.", "Não crie preço, desconto, trial, limite ou entitlement novo; use `../finance/knowledge/pricing.md` ou bloqueie por Finance.", "Não defina design final de UI quando Design for necessário."]
    },
    {
      slug: "create-launch-plan",
      title: "Criar Plano De Lançamento",
      purpose: "Planejar ações de lançamento, canais e loops de aprendizado.",
      useWhen: ["o lançamento do MVP está sendo planejado", "canais de aquisição precisam de priorização", "aprendizado de lançamento precisa de estrutura"],
      requiredContext: ["Positioning", "Landing page", "Canais de aquisição", "Objetivos de aprendizado com clientes"],
      inputs: ["Objetivo de lançamento", "Audiência", "Canais", "Assets", "Timeline", "Métricas de aprendizado"],
      process: ["Esclareça objetivo de lançamento", "Escolha os menores canais viáveis", "Liste assets necessários", "Defina métricas de aprendizado", "Roteie perguntas de orçamento para Finance"],
      checks: ["O lançamento é viável", "O objetivo de aprendizado está explícito", "Implicações de orçamento estão visíveis"],
      outputs: ["Plano de lançamento", "Experimentos de canal", "Métricas de aprendizado", "Risks"],
      filesToUpdate: ["Atualize `../knowledge/launch-plan.md` e `../knowledge/acquisition-channels.md` após confirmação explícita."],
      redLines: ["Não comprometa gasto sem revisão de Finance.", "Não otimize apenas para métricas de vaidade."]
    }
  ];
