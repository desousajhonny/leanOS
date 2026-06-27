import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { pricingKnowledge } from "./knowledge/pricing.js";
import { revenueModelKnowledge } from "./knowledge/revenue-model.js";
import { unitEconomicsKnowledge } from "./knowledge/unit-economics.js";
import { budgetKnowledge } from "./knowledge/budget.js";
import { financeRisksKnowledge } from "./knowledge/finance-risks.js";

export const growthFinanceSourceOfTruth = ["knowledge/pricing.md", "knowledge/revenue-model.md", "knowledge/unit-economics.md", "knowledge/budget.md", "knowledge/finance-risks.md"];

export const growthFinanceFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Finance Knowledge", "Lightweight financial context for pricing, revenue model, unit economics, budget and finance risks.", "Use when pricing, revenue, spend or unit economics affect product or growth decisions.", "pricing.md", ["pricing.md", "revenue-model.md", "unit-economics.md", "budget.md", "finance-risks.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../marketing/"], "This is not accounting, tax, legal or investment advice. Keep assumptions explicit.") },
    { path: "knowledge/pricing.md", content: () => pricingKnowledge() },
    { path: "knowledge/revenue-model.md", content: () => revenueModelKnowledge() },
    { path: "knowledge/unit-economics.md", content: () => unitEconomicsKnowledge() },
    { path: "knowledge/budget.md", content: () => budgetKnowledge() },
    { path: "knowledge/finance-risks.md", content: () => financeRisksKnowledge() }
  ];
