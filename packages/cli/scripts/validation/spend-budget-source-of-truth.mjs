import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parse } from "yaml";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers, projectRoot } from "./fixtures.mjs";
import { exists } from "./path-utils.mjs";

export async function validateSpendBudgetSourceOfTruthContract() {
  await assertSpendBudgetDocs();

  const rootDir = await mkdtemp(join(tmpdir(), "leanos-spend-budget-source-of-truth-"));

  await generateWorkspace(rootDir, answers);
  await activateWorkspaceArea(rootDir, "growth.finance");
  await activateWorkspaceArea(rootDir, "growth.marketing");
  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");
  await activateWorkspaceArea(rootDir, "operations.devops");
  await activateWorkspaceArea(rootDir, "operations.security");

  const rootAgent = await readFile(join(rootDir, "AGENT.md"), "utf8");
  const financeYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "area.yaml"), "utf8"));
  const spendLedger = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "knowledge", "spend-ledger.md"), "utf8");
  const budget = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "knowledge", "budget.md"), "utf8");
  const financeOperator = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "roles", "finance-operator.role.md"), "utf8");
  const reviewSpend = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "skills", "review-spend", "SKILL.md"), "utf8");
  const runwayCheck = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "skills", "runway-check", "SKILL.md"), "utf8");
  const budgetPlanning = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "skills", "budget-planning", "SKILL.md"), "utf8");
  const spendApproval = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "playbooks", "spend-approval.playbook.md"), "utf8");
  const monthlyFinanceCheck = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "finance", "playbooks", "monthly-finance-check.playbook.md"), "utf8");
  const marketingLaunch = await readFile(join(rootDir, "clinic-assistant-ai-os", "growth", "marketing", "skills", "create-launch-plan", "SKILL.md"), "utf8");
  const readyToDevelop = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "product-ops", "knowledge", "ready-to-develop.md"), "utf8");
  const engineeringData = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "data-guidelines.md"), "utf8");
  const devopsEnvironments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "knowledge", "environments.md"), "utf8");
  const configureEnvironments = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "devops", "skills", "configure-environments", "SKILL.md"), "utf8");
  const securityBaseline = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "security", "knowledge", "security-baseline.md"), "utf8");

  assert(rootAgent.includes("Gastos, orçamento, budget, burn, runway, custos, ferramentas pagas, infra paga, mídia paga ou unit economics"), "Root AGENT should route spend and budget requests tersely");
  assert(rootAgent.includes("activation_required` para `growth.finance`"), "Root AGENT should activate Growth Finance for spend and budget requests");
  assert(financeYaml.area.source_of_truth.includes("knowledge/spend-ledger.md"), "Finance area.yaml should list spend-ledger knowledge");

  for (const requiredContent of [
    "Growth Finance é o owner do Spend Ledger",
    "## Expense Register",
    "expense_id",
    "category",
    "type",
    "amount",
    "currency",
    "period",
    "owner",
    "status",
    "business_reason",
    "linked_feature",
    "review_date",
    "infra, ai-api, tools, growth, people, support, legal-accounting, payment-fees, experiments, other",
    "proposed, approved, active, paused, cancelled, rejected",
    "## Automation Candidates",
    "## Consumer Contract",
    "Não use extrato bancário, chat, invoice solta, landing page ou código como fonte canônica de gasto"
  ]) {
    assert(spendLedger.includes(requiredContent), `Spend Ledger should include source-of-truth contract content: ${requiredContent}`);
  }

  assert(budget.includes("## Monthly Budget"), "Budget knowledge should include monthly budget");
  assert(budget.includes("## Runway Snapshot"), "Budget knowledge should include runway snapshot");
  assert(budget.includes("## Approval Thresholds"), "Budget knowledge should include approval thresholds");
  assert(budget.includes("growth/finance/knowledge/spend-ledger.md"), "Budget should point to Spend Ledger");

  for (const requiredRoute of ["review-spend", "runway-check", "budget-planning", "spend-approval", "monthly-finance-check"]) {
    assert(financeOperator.includes(requiredRoute), `Finance Operator should expose ${requiredRoute}`);
  }

  assert(reviewSpend.includes("Spend decision"), "review-spend should output a Spend decision");
  assert(reviewSpend.includes("../knowledge/spend-ledger.md"), "review-spend should require Spend Ledger");
  assert(reviewSpend.includes("Não aprove gasto recorrente, ferramenta paga, campanha paga, provider novo ou custo variável relevante fora de `../knowledge/spend-ledger.md`"), "review-spend should block off-ledger spend");
  assert(runwayCheck.includes("Runway estimate"), "runway-check should output runway estimate");
  assert(runwayCheck.includes("burn mensal"), "runway-check should estimate monthly burn");
  assert(budgetPlanning.includes("Budget guardrails"), "budget-planning should output budget guardrails");
  assert(budgetPlanning.includes("limites por categoria"), "budget-planning should define category limits");
  assert(spendApproval.includes("spend_approved"), "spend-approval should produce spend approval decision");
  assert(monthlyFinanceCheck.includes("monthly burn"), "monthly finance check should review monthly burn");
  assert(monthlyFinanceCheck.includes("runway"), "monthly finance check should review runway");

  assert(marketingLaunch.includes("../finance/knowledge/spend-ledger.md"), "Marketing launch plan should consult Spend Ledger for paid campaigns");
  assert(marketingLaunch.includes("Não comprometa mídia paga"), "Marketing launch plan should block unapproved paid media spend");
  assert(readyToDevelop.includes("## Cost And Spend Readiness"), "Ready-to-develop should define cost/spend readiness");
  assert(readyToDevelop.includes("growth/finance/knowledge/spend-ledger.md"), "Ready-to-develop should reference Spend Ledger");
  assert(engineeringData.includes("## Cost And Usage Controls"), "Engineering data guidelines should include cost and usage controls");
  assert(engineeringData.includes("AI/API, storage, worker, queue, vector DB, logging, analytics or paid provider"), "Engineering should catch variable-cost technical work");
  assert(devopsEnvironments.includes("## Cost Controls"), "DevOps environments should include cost controls");
  assert(configureEnvironments.includes("paid providers, quotas, budgets or usage caps"), "DevOps configure environments should map paid providers and caps");
  assert(securityBaseline.includes("Cost/rate abuse must have limits or accepted risk owner"), "Security baseline should keep cost/rate abuse as financial guardrail");
}

async function assertSpendBudgetDocs() {
  const journeyMap = await readFile(join(projectRoot, "docs", "framework", "founder-journeys", "journey-map.md"), "utf8");
  const journeyPath = join(projectRoot, "docs", "framework", "founder-journeys", "spend-budget-control.md");
  const decisionLog = await readFile(join(projectRoot, "docs", "framework", "source-of-truth", "decision-log.md"), "utf8");

  assert(await exists(journeyPath), "Spend budget journey should exist");
  const journey = await readFile(journeyPath, "utf8");

  assert(journeyMap.includes("Spend/budget control"), "Founder journey map should include spend/budget control");
  assert(journey.includes("Spend Ledger"), "Spend budget journey should name Spend Ledger");
  assert(journey.includes("Growth Finance"), "Spend budget journey should name Growth Finance");
  assert(journey.includes("validateSpendBudgetSourceOfTruthContract"), "Spend budget journey should name the validation contract");
  assert(decisionLog.includes("Spend Ledger Como Fonte Canônica De Gastos E Runway"), "Decision log should record Spend Ledger decision");
}
