import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";
import { growthKnowledge } from "./shared-content.js";

function pricingKnowledge(): string {
  return growthKnowledge("Pricing", "Capture pricing hypotheses, packaging and willingness-to-pay assumptions.", ["Pricing Hypothesis", "Package", "Value Metric", "Willingness to Pay", "Validation Plan"]);
}

function revenueModelKnowledge(): string {
  return growthKnowledge("Revenue Model", "Capture how the product may generate revenue and what assumptions need validation.", ["Revenue Stream", "Customer Segment", "Billing Logic", "Assumptions", "Evidence Needed"]);
}

function unitEconomicsKnowledge(): string {
  return growthKnowledge("Unit Economics", "Track lightweight assumptions about acquisition, delivery cost and margin.", ["Acquisition Cost", "Delivery Cost", "Gross Margin", "Payback", "Sensitivity"]);
}

function budgetKnowledge(): string {
  return growthKnowledge("Budget", "Track practical budget constraints and planned spend for the current stage.", ["Runway Constraint", "Planned Spend", "Tools", "Marketing Spend", "Engineering / Ops Spend"]);
}

function financeRisksKnowledge(): string {
  return growthKnowledge("Finance Risks", "Capture financial risks around pricing, costs, runway and business assumptions.", ["Risk", "Impact", "Likelihood", "Early Warning", "Mitigation"]);
}

export const growthFinanceArea: AreaDefinition = {
  key: "growth.finance",
  root: "growth",
  slug: "finance",
  name: "Finance",
  path: "growth/finance",
  lead: {
    title: "Finance Lead",
    purpose: "Route pricing, revenue model, unit economics, budget and finance-risk questions without overbuilding finance operations."
  },
  routingKey: "finance",
  requestTypes: "pricing, revenue model, budget, unit economics or finance",
  purpose: "Own pricing, revenue model, unit economics, budget and financial risks.",
  whenToUse: ["define pricing", "review unit economics", "track budget", "reason about revenue model"],
  operatingRules: [
    "Keep finance lightweight and hypothesis-driven for MVP.",
    "Route pricing assumptions back to Strategy Product when they affect positioning or value proposition.",
    "Route paid acquisition or spend decisions back to Marketing/Founder before committing."
  ],
  redLines: [
    "Do not present unvalidated pricing as fact.",
    "Do not make accounting, tax, legal or investment advice claims.",
    "Do not commit spend, revenue forecast or runway claims without explicit founder confirmation."
  ],
  sourceOfTruth: ["knowledge/pricing.md", "knowledge/revenue-model.md", "knowledge/unit-economics.md", "knowledge/budget.md", "knowledge/finance-risks.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Finance Knowledge", "Lightweight financial context for pricing, revenue model, unit economics, budget and finance risks.", "Use when pricing, revenue, spend or unit economics affect product or growth decisions.", "pricing.md", ["pricing.md", "revenue-model.md", "unit-economics.md", "budget.md", "finance-risks.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../marketing/"], "This is not accounting, tax, legal or investment advice. Keep assumptions explicit.") },
    { path: "knowledge/pricing.md", content: () => pricingKnowledge() },
    { path: "knowledge/revenue-model.md", content: () => revenueModelKnowledge() },
    { path: "knowledge/unit-economics.md", content: () => unitEconomicsKnowledge() },
    { path: "knowledge/budget.md", content: () => budgetKnowledge() },
    { path: "knowledge/finance-risks.md", content: () => financeRisksKnowledge() }
  ],
  roles: [
    {
      slug: "finance-operator",
      title: "Finance Operator",
      purpose: "Reason about pricing, unit economics, budget and revenue assumptions.",
      useWhen: ["pricing or revenue model is involved", "budget risk needs review", "unit economics are unclear"],
      beforeActing: ["../AGENT.md", "../knowledge/pricing.md", "../knowledge/revenue-model.md", "../knowledge/unit-economics.md", "../knowledge/budget.md", "../knowledge/finance-risks.md"],
      skills: ["model-unit-economics", "review-pricing"],
      playbooks: ["finance-review"],
      outputs: ["Pricing or unit economics summary", "Financial assumptions", "Risks", "Founder decisions needed"],
      redLines: ["Do not invent pricing validation.", "Do not provide accounting, tax, legal or investment advice.", "Do not commit spend or forecasts without founder confirmation."]
    }
  ],
  skills: [
    {
      slug: "model-unit-economics",
      title: "Model Unit Economics",
      purpose: "Clarify acquisition, delivery and margin assumptions.",
      useWhen: ["unit economics are unclear", "pricing or acquisition cost needs rough evaluation", "growth spend is being considered"],
      requiredContext: ["Pricing", "Revenue model", "Budget", "Known costs"],
      inputs: ["Acquisition cost", "Delivery cost", "Price", "Gross margin", "Usage or value metric"],
      process: ["List assumptions", "Separate knowns from guesses", "Estimate unit economics directionally", "Identify sensitivity and missing evidence"],
      checks: ["Assumptions are explicit", "No false precision", "Risks are visible"],
      outputs: ["Unit economics summary", "Sensitive assumptions", "Risks", "Validation needs"],
      filesToUpdate: ["Update `../knowledge/unit-economics.md` after explicit confirmation."],
      redLines: ["Do not present estimates as validated facts.", "Do not make investment or accounting claims."]
    },
    {
      slug: "review-pricing",
      title: "Review Pricing",
      purpose: "Evaluate pricing hypotheses against customer value and costs.",
      useWhen: ["pricing is being considered", "packaging needs review", "willingness to pay is unclear"],
      requiredContext: ["Pricing", "Value proposition", "ICP", "Revenue model"],
      inputs: ["Target user", "Value created", "Pricing hypothesis", "Alternatives", "Costs"],
      process: ["Check value alignment", "Check package simplicity", "Identify willingness-to-pay assumptions", "List validation method"],
      checks: ["Pricing matches ICP/value", "Assumptions are not treated as proof", "Validation path exists"],
      outputs: ["Pricing review", "Risks", "Validation plan", "Open questions"],
      filesToUpdate: ["Update `../knowledge/pricing.md` or `../knowledge/revenue-model.md` after explicit confirmation."],
      redLines: ["Do not invent willingness-to-pay evidence.", "Do not promise revenue outcomes."]
    }
  ],
  playbooks: [
    {
      slug: "finance-review",
      title: "Finance Review",
      purpose: "Review business assumptions and financial risk.",
      inputs: ["Pricing", "Revenue model", "Unit economics", "Budget", "Finance risks"],
      steps: ["Read Finance AGENT and choose Finance Operator", "Use `skills/review-pricing/SKILL.md` when pricing or packaging is involved", "Use `skills/model-unit-economics/SKILL.md` when costs, margins or spend are involved", "Separate assumptions from evidence", "Identify founder decisions needed", "Route product value questions to Strategy Product when needed"],
      outputs: ["Finance review", "Assumptions", "Risks", "Decisions needed", "Validation needs"],
      filesToUpdate: ["Update `../knowledge/pricing.md`, `../knowledge/revenue-model.md`, `../knowledge/unit-economics.md`, `../knowledge/budget.md` or `../knowledge/finance-risks.md` after explicit confirmation."]
    }
  ],
  commonPaths: [
    "Finance request: area lead `AGENT.md` -> role `roles/finance-operator.role.md` -> skills `skills/review-pricing/SKILL.md` and conditional `skills/model-unit-economics/SKILL.md` -> playbook `playbooks/finance-review.playbook.md`."
  ]
};
