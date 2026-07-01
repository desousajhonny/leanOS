import type { RootDepartmentDefinition } from "../../types.js";
import { growthCustomerExperienceArea } from "./growth/customer-experience/index.js";
import { growthMarketingArea } from "./growth/marketing/index.js";
import { growthFinanceArea } from "./growth/finance/index.js";

export const growthDepartment: RootDepartmentDefinition = {
  key: "growth",
  name: "Growth",
  purpose: "Own customer experience, marketing, launch and financial learning loops.",
  requestTypes: "customer experience, marketing, landing pages, launch, acquisition or finance",
  areas: [growthCustomerExperienceArea, growthMarketingArea, growthFinanceArea],
  workflows: [
    {
      slug: "launch-learning-loop",
      purpose: "Coordinate marketing, customer experience and finance after an approved or executed launch.",
      requiredAreas: ["marketing", "customer-experience"],
      founderTriggers: [
        "lancamento aprovado, prepare a execucao",
        "execute o lancamento aprovado",
        "como aprendemos com os usuarios?",
        "o que fazer depois do lancamento?",
        "vamos analisar feedback dos clientes",
        "o lancamento rodou, e agora?"
      ],
      owner: {
        department: "growth",
        primaryArea: "marketing",
        supportingAreas: ["customer-experience"],
        conditionalAreas: ["finance", "strategy.product", "operations.product-ops"]
      },
      conditionalAreas: [
        { area: "growth/finance", when: "Enter when pricing, budget, revenue, cost or unit economics are part of the launch decision." },
        { area: "strategy/product", when: "Enter when launch learning changes positioning, ICP, problem framing or value proposition." },
        { area: "operations/product-ops", when: "Enter when customer learning should become delivery scope, Epics or Features." }
      ],
      loadFirst: [
        "AGENT.md",
        "growth/AGENT.md",
        "growth/workflows/launch-learning-loop.workflow.md",
        "growth/marketing/AGENT.md",
        "growth/marketing/knowledge/launch-plan.md",
        "growth/marketing/knowledge/positioning.md",
        "growth/marketing/knowledge/growth-experiments.md",
        "growth/customer-experience/AGENT.md",
        "growth/customer-experience/knowledge/customer-feedback.md",
        "growth/customer-experience/knowledge/success-moments.md",
        "growth/customer-experience/knowledge/churn-reasons.md"
      ],
      navigationRoute: [
        "AGENT.md",
        "growth/AGENT.md",
        "growth/workflows/launch-learning-loop.workflow.md",
        "growth/marketing/AGENT.md",
        "growth/marketing/roles/growth-lead.role.md",
        "growth/marketing/skills/launch-plan/SKILL.md",
        "growth/marketing/skills/growth-experiment-planning/SKILL.md",
        "growth/marketing/skills/growth-result-analysis/SKILL.md",
        "growth/marketing/playbooks/mvp-launch.playbook.md",
        "growth/marketing/playbooks/growth-experiment.playbook.md",
        "growth/customer-experience/AGENT.md",
        "growth/customer-experience/roles/cx-lead.role.md",
        "growth/customer-experience/skills/customer-feedback-mapping/SKILL.md",
        "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
        "growth/finance/AGENT.md quando pricing, orçamento ou unit economics estiverem envolvidos",
        "strategy/product/AGENT.md when positioning or ICP should change",
        "operations/product-ops/AGENT.md when learning should become delivery work"
      ],
      steps: [
        "Leia o AGENT de Marketing, launch knowledge e Growth Experiment Ledger antes de planejar ou resumir trabalho de lançamento.",
        "Leia o AGENT de Customer Experience e customer feedback antes de afirmar o que usuários aprenderam, sentiram ou fizeram.",
        "Use `growth/marketing/knowledge/growth-experiments.md` ou feedback registrado antes de recomendar qualquer decisão de Growth.",
        "Quando ainda não houver experimento, use `growth/marketing/skills/growth-experiment-planning/SKILL.md` e entregue o Manual Result Input Template para execução manual.",
        "Quando houver resultado colado pelo founder ou evidência registrada, use `growth/marketing/skills/growth-result-analysis/SKILL.md` e produza Decision output.",
        "Separate launch activity, customer evidence, founder interpretation and next decision.",
        "Review Finance AGENT only when pricing, budget, revenue, cost or unit economics are involved.",
        "Route to Strategy Product only when learning changes ICP, positioning, problem framing or value proposition.",
        "Route to Product Ops only when learning should become delivery scope, Epics or Features.",
        "Recommend the next learning loop in founder-friendly language.",
        "Ask for confirmation before updating launch, feedback, finance, strategy or delivery files."
      ],
      confirmationGates: [
        "Peça confirmação antes de atualizar plano de lançamento ou posicionamento.",
        "Peça confirmação antes de registrar feedback como aprendizado.",
        "Peça confirmação antes de alterar notas de pricing, receita, orçamento ou unit economics.",
        "Peça confirmação antes de rotear aprendizado para Strategy ou Product Ops.",
        "Peça confirmação antes de criar trabalho de delivery a partir de aprendizado de cliente."
      ],
      allowedUpdates: [
        "growth/marketing/knowledge/launch-plan.md",
        "growth/marketing/knowledge/growth-experiments.md",
        "growth/marketing/knowledge/positioning.md after founder confirmation",
        "growth/customer-experience/knowledge/customer-feedback.md",
        "growth/customer-experience/knowledge/success-moments.md",
        "growth/customer-experience/knowledge/churn-reasons.md",
        "growth/finance/knowledge/pricing.md when Finance is involved and founder confirms",
        "growth/finance/knowledge/unit-economics.md when Finance is involved and founder confirms"
      ],
      forbiddenUpdates: [
        "operations/product-ops/epics/ without Product Ops route and founder confirmation",
        "strategy/roadmap/knowledge/roadmap.md without Strategy route and founder confirmation",
        ".github/",
        ".leanos/",
        "código-fonte",
        "branches",
        "pull requests"
      ],
      externalCapabilities: [
        "No external capability is required by default.",
        "Não chame APIs de analytics, CRM, email, pagamento, GitHub ou deploy a partir deste workflow sem um fluxo separado e confirmado para a ferramenta específica.",
        "When external evidence is missing, ask the founder for the available signal instead of inventing it."
      ],
      stopConditions: [
        "There is no launch activity or customer evidence to review.",
        "Não existe experimento registrado nem feedback registrado para sustentar uma decisão de Growth.",
        "The founder asks for implementation rather than learning-loop planning.",
        "Customer feedback is too vague to turn into learning.",
        "The founder does not confirm updates or next routing.",
        "External analytics or CRM access is required but not available."
      ],
      expectedOutput: [
        "Resumo do status de lançamento.",
        "Resumo de evidência de cliente separado de interpretação.",
        "Decision output: continue | iterate_copy | iterate_pricing | open_product_ops_item | route_to_strategy | scale_spend | pause.",
        "Aprendizados, riscos e oportunidades.",
        "Próximo loop recomendado: marketing, CX, finance, strategy ou delivery.",
        "Não tome decisão de Growth apenas por intuição.",
        "Pergunta de confirmação founder-friendly antes de qualquer atualização."
      ],
      continuationBridge: {
        immediate: "Esse aprendizado parece apontar para o proximo ciclo.\nQuer que eu transforme isso em ajuste de marketing/CX, revisao de estrategia ou trabalho de produto?",
        laterTriggers: ["o que aprendemos com o lancamento?", "transforme feedback em proximos passos", "isso vira roadmap?", "isso muda o posicionamento?", "isso vira feature?"],
        nextRoute: "strategy/product/AGENT.md or operations/product-ops/AGENT.md depending on the founder decision"
      }
    }
  ]
};
