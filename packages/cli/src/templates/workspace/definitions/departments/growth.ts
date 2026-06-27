import type { RootDepartmentDefinition } from "../../types.js";
import { growthCustomerExperienceArea } from "./areas/growth-customer-experience.js";
import { growthMarketingArea } from "./areas/growth-marketing.js";
import { growthFinanceArea } from "./areas/growth-finance.js";

export const growthDepartment: RootDepartmentDefinition = {
  key: "growth",
  name: "Growth",
  purpose: "Own customer experience, marketing, launch and financial learning loops.",
  requestTypes: "customer experience, marketing, landing pages, launch, acquisition or finance",
  areas: [growthCustomerExperienceArea, growthMarketingArea, growthFinanceArea],
  workflows: [
    {
      slug: "launch-learning-loop",
      purpose: "Coordinate marketing, customer experience and finance after launch.",
      requiredAreas: ["marketing", "customer-experience"],
      founderTriggers: [
        "vamos lancar",
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
        "growth/marketing/skills/create-launch-plan/SKILL.md",
        "growth/marketing/playbooks/mvp-launch.playbook.md",
        "growth/customer-experience/AGENT.md",
        "growth/customer-experience/roles/cx-lead.role.md",
        "growth/customer-experience/skills/map-customer-feedback/SKILL.md",
        "growth/customer-experience/playbooks/customer-learning-loop.playbook.md",
        "growth/finance/AGENT.md when pricing, budget or unit economics are involved",
        "strategy/product/AGENT.md when positioning or ICP should change",
        "operations/product-ops/AGENT.md when learning should become delivery work"
      ],
      steps: [
        "Read Marketing AGENT and launch knowledge before planning or summarizing launch work.",
        "Read Customer Experience AGENT and customer feedback before claiming what users learned or felt.",
        "Separate launch activity, customer evidence, founder interpretation and next decision.",
        "Review Finance AGENT only when pricing, budget, revenue, cost or unit economics are involved.",
        "Route to Strategy Product only when learning changes ICP, positioning, problem framing or value proposition.",
        "Route to Product Ops only when learning should become delivery scope, Epics or Features.",
        "Recommend the next learning loop in founder-friendly language.",
        "Ask for confirmation before updating launch, feedback, finance, strategy or delivery files."
      ],
      confirmationGates: [
        "Ask before updating launch plan or positioning.",
        "Ask before recording feedback as learning.",
        "Ask before changing pricing, revenue, budget or unit economics notes.",
        "Ask before routing learning into Strategy or Product Ops.",
        "Ask before creating delivery work from customer learning."
      ],
      allowedUpdates: [
        "growth/marketing/knowledge/launch-plan.md",
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
        "source code",
        "branches",
        "pull requests"
      ],
      externalCapabilities: [
        "No external capability is required by default.",
        "Do not call analytics, CRM, email, payment, GitHub or deployment APIs from this workflow without a separate confirmed tool-specific flow.",
        "When external evidence is missing, ask the founder for the available signal instead of inventing it."
      ],
      stopConditions: [
        "There is no launch activity or customer evidence to review.",
        "The founder asks for implementation rather than learning-loop planning.",
        "Customer feedback is too vague to turn into learning.",
        "The founder does not confirm updates or next routing.",
        "External analytics or CRM access is required but not available."
      ],
      expectedOutput: [
        "Launch status summary.",
        "Customer evidence summary separated from interpretation.",
        "Learning, risk and opportunity list.",
        "Recommended next loop: marketing, CX, finance, strategy or delivery.",
        "Founder-friendly confirmation question before any update."
      ],
      continuationBridge: {
        immediate: "Esse aprendizado parece apontar para o proximo ciclo.\nQuer que eu transforme isso em ajuste de marketing/CX, revisao de estrategia ou trabalho de produto?",
        laterTriggers: ["o que aprendemos com o lancamento?", "transforme feedback em proximos passos", "isso vira roadmap?", "isso muda o posicionamento?", "isso vira feature?"],
        nextRoute: "strategy/product/AGENT.md or operations/product-ops/AGENT.md depending on the founder decision"
      }
    }
  ]
};
