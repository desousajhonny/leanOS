import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { pricingKnowledge } from "./knowledge/pricing.js";
import { spendLedgerKnowledge } from "./knowledge/spend-ledger.js";
import { revenueModelKnowledge } from "./knowledge/revenue-model.js";
import { unitEconomicsKnowledge } from "./knowledge/unit-economics.js";
import { budgetKnowledge } from "./knowledge/budget.js";
import { financeRisksKnowledge } from "./knowledge/finance-risks.js";

export const growthFinanceSourceOfTruth = ["knowledge/pricing.md", "knowledge/spend-ledger.md", "knowledge/revenue-model.md", "knowledge/unit-economics.md", "knowledge/budget.md", "knowledge/finance-risks.md"];

export const growthFinanceFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Finance Knowledge", "Contexto financeiro leve para pricing, gastos, budget, runway, modelo de receita, unit economics e riscos financeiros.", "Use quando pricing, receita, gasto, orçamento, runway ou unit economics afetarem decisões de produto ou growth.", "pricing.md", ["pricing.md", "spend-ledger.md", "revenue-model.md", "unit-economics.md", "budget.md", "finance-risks.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../marketing/"], "Isto não é aconselhamento contábil, tributário, jurídico ou de investimento. Mantenha premissas explícitas.") },
    { path: "knowledge/pricing.md", content: () => pricingKnowledge() },
    { path: "knowledge/spend-ledger.md", content: () => spendLedgerKnowledge() },
    { path: "knowledge/revenue-model.md", content: () => revenueModelKnowledge() },
    { path: "knowledge/unit-economics.md", content: () => unitEconomicsKnowledge() },
    { path: "knowledge/budget.md", content: () => budgetKnowledge() },
    { path: "knowledge/finance-risks.md", content: () => financeRisksKnowledge() }
  ];
