export function spendLedgerKnowledge(): string {
  return `# Spend Ledger

## Propósito

Growth Finance é o owner do Spend Ledger. Use este arquivo como fonte canônica leve para gastos recorrentes, pontuais, ferramentas pagas, campanhas, providers, custos variáveis e compromissos financeiros do produto.

Não use extrato bancário, chat, invoice solta, landing page ou código como fonte canônica de gasto. Esses itens podem ser evidência, mas o Spend Ledger registra a decisão operacional que o LeanOS usa.

Isto não substitui contabilidade, fiscal, banco, ERP ou aconselhamento financeiro profissional.

## Estado Atual

TBD

## Expense Register

Categorias permitidas: infra, ai-api, tools, growth, people, support, legal-accounting, payment-fees, experiments, other.

Status permitidos: proposed, approved, active, paused, cancelled, rejected.

| expense_id | name | category | type | amount | currency | period | owner | status | business_reason | linked_feature | cost_driver | risk | review_date | evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | tools | recurring | TBD | TBD | monthly | TBD | proposed | TBD | TBD | TBD | TBD | TBD | TBD |

Campos obrigatórios:

- \`expense_id\`: identificador estável do gasto.
- \`category\`: infra, ai-api, tools, growth, people, support, legal-accounting, payment-fees, experiments ou other.
- \`type\`: recurring, one-off, variable, usage-based ou experiment.
- \`amount\`: valor estimado ou conhecido.
- \`period\`: monthly, annual, one-off, per-user, per-usage ou unknown.
- \`owner\`: área ou pessoa responsável pelo gasto.
- \`business_reason\`: por que o gasto existe.
- \`linked_feature\`: Feature, campanha, experimento ou operação relacionada quando existir.
- \`cost_driver\`: o que faz o custo subir.
- \`review_date\`: quando revisar, cancelar ou renegociar.

## Automation Candidates

Registre automações candidatas sem criar integrações automaticamente.

- Cost alert: TBD
- Usage cap: TBD
- Provider budget limit: TBD
- Renewal reminder: TBD
- Invoice/import source: TBD
- Owner for automation: TBD
- Automation status: not-started | manual | proposed | active | paused

## Spend Controls

- Limite para gasto pequeno sem revisão formal: TBD
- Limite para gasto recorrente que exige confirmação do founder: TBD
- Limite para campanha paga: TBD
- Limite para custo variável por usuário/cliente: TBD
- Regra para cancelar ferramenta sem owner: TBD
- Regra para revisar gasto sem evidência de uso: TBD

## Consumer Contract

- Strategy Business define modelo de negócio e restrições estratégicas, mas não registra gastos operacionais aqui.
- Marketing consulta este arquivo antes de comprometer mídia paga, ferramenta de aquisição ou campanha com orçamento.
- Product Ops exige Spend readiness quando uma Feature cria custo recorrente, provider pago, ferramenta paga ou custo variável relevante.
- Engineering consulta este arquivo quando implementação usa AI/API, storage, worker, queue, vector DB, logging, analytics ou provider pago que escala com uso.
- DevOps consulta este arquivo ao configurar ambientes, providers, quotas, budgets, observabilidade paga e limites de uso.
- Security revisa cost/rate abuse quando gasto pode escalar por abuso, automação, API pública ou agente.

## Change Control

Toda mudança relevante de gasto deve registrar:

- motivo da criação, pausa, cancelamento ou aumento;
- owner;
- categoria;
- impacto em runway, budget e unit economics;
- vínculo com Feature, campanha, provider ou operação;
- data de revisão;
- evidência conhecida;
- automação ou alerta necessário.

## Decisões

TBD

## Riscos

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
