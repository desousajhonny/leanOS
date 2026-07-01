# Jornada: Spend/Budget Control

## Intenção Do Founder

O founder pede algo como:

- "quanto estamos gastando?";
- "qual nosso burn?";
- "quanto runway temos?";
- "posso contratar essa ferramenta?";
- "podemos gastar em anúncios?";
- "essa feature vai ficar cara?";
- "quero automatizar alerta de custo".

## Rota

1. Root `AGENT.md` identifica gastos, orçamento, budget, burn, runway, ferramentas pagas, infra paga, mídia paga ou unit economics.
2. Se `growth.finance` estiver inativo, retorna `activation_required: growth.finance`.
3. Quando Growth Finance está ativo, o agente entra em `growth/finance/AGENT.md`.
4. Finance Operator lê `growth/finance/knowledge/spend-ledger.md`, `budget.md`, `unit-economics.md` e `finance-risks.md`.
5. `skills/spend-review/SKILL.md` revisa gasto novo ou existente.
6. `skills/runway-analysis/SKILL.md` estima burn mensal e runway quando houver dados suficientes.
7. `skills/budget-planning/SKILL.md` define limites por categoria, thresholds e automações candidatas.
8. `spend-approval.playbook.md` decide gasto pontual/recorrente.
9. `monthly-finance-check.playbook.md` revisa monthly burn, runway, gastos sem owner e riscos.

## Fonte Canônica

`growth/finance/knowledge/spend-ledger.md` é a fonte canônica leve para:

- gastos recorrentes;
- gastos pontuais;
- ferramentas pagas;
- mídia paga;
- providers;
- custos variáveis;
- owners;
- datas de revisão;
- automações candidatas de alerta ou limite.

`growth/finance/knowledge/budget.md` registra limites, runway snapshot e thresholds.

## Handoffs Obrigatórios

- Marketing consulta Finance antes de mídia paga, campanha com orçamento ou ferramenta de aquisição paga.
- Product Ops exige Cost/Spend readiness quando uma Feature cria gasto, provider ou custo variável relevante.
- Engineering consulta Finance quando usa AI/API, storage, worker, queue, vector DB, logging, analytics ou provider pago.
- DevOps mapeia providers, quotas, budgets, usage caps e alertas sem criar gasto escondido.
- Security revisa cost/rate abuse quando usuários, agentes ou automações podem gerar custo fora de controle.

## Stop Conditions

- Não há Spend Ledger para gasto recorrente ou relevante.
- O gasto não tem owner.
- O gasto não tem motivo de negócio.
- O custo variável não tem cap, owner ou risco explícito.
- O founder pediu runway, mas não há caixa/gastos suficientes para estimar sem lacuna.
- Security aplicável não revisou cost/rate abuse.

## Checklist De Validação Da Jornada

- [x] Root `AGENT.md` roteia gastos, budget, burn e runway para `growth.finance`.
- [x] `spend-ledger.md` contém Expense Register, categorias, status, automações candidatas e Consumer Contract.
- [x] `budget.md` contém Monthly Budget, Runway Snapshot e Approval Thresholds.
- [x] Finance Operator expõe `spend-review`, `runway-analysis`, `budget-planning`, `spend-approval` e `monthly-finance-check`.
- [x] Marketing, Product Ops, Engineering, DevOps e Security consomem a fonte financeira sem inventar gasto.
- [x] Generator valida regressão com `validateSpendBudgetSourceOfTruthContract`.
