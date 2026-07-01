export function growthExperimentsKnowledge(): string {
  return `# Growth Experiments

## Propósito

Registrar experimentos de Growth como fonte de aprendizado de mercado. Use este arquivo para planejar, acompanhar e analisar testes de aquisição, landing page, oferta, mensagem, canal, campanha, onboarding ou venda assistida.

Toda decisão de Growth depois de um lançamento deve usar um experimento registrado aqui ou feedback registrado em Customer Experience. Não trate opinião, intuição ou atividade como evidência.

## Estado Atual

Nenhum experimento ativo registrado ainda.

## Experiment Register

Decisões permitidas: continue | iterate_copy | iterate_pricing | open_product_ops_item | route_to_strategy | scale_spend | pause

| experiment_id | status | hypothesis | channel | asset | audience | owner | start_date | end_date | measurement_source | success_criteria | failure_criteria | decision | linked_spend | evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GX-001 | planned | TBD | landing-page / outbound / content / referral / paid / community / support | TBD | TBD | Growth Marketing | TBD | TBD | manual / Plausible / Google Analytics / Vercel Analytics / PostHog / CRM / ad-platform / support-notes | TBD | TBD | continue | TBD | TBD |

Campos obrigatórios:

- \`experiment_id\`: identificador estável do experimento.
- \`status\`: planned, running, completed, paused, invalidated ou archived.
- \`hypothesis\`: hipótese testável, não desejo genérico.
- \`channel\`: canal usado para gerar sinal.
- \`asset\`: landing page, campanha, copy, formulário, email, DM, call script, anúncio, post ou fluxo.
- \`measurement_source\`: origem da evidência. Pode ser analytics, formulário, CRM, suporte, ad platform ou input manual do founder.
- \`success_criteria\`: limite de sucesso definido antes de interpretar resultado.
- \`failure_criteria\`: limite de falha ou aprendizado insuficiente.
- \`decision\`: continue, iterate_copy, iterate_pricing, open_product_ops_item, route_to_strategy, scale_spend ou pause.
- \`linked_spend\`: referência a \`growth/finance/knowledge/spend-ledger.md\` quando houver mídia paga, ferramenta paga ou custo variável relevante.
- \`evidence\`: link, resumo ou referência. Não armazene dados pessoais de leads ou clientes no repositório.

## Measurement Rules

- Defina sucesso e falha antes de executar.
- Separe métrica observada de interpretação.
- Use \`growth/finance/knowledge/spend-ledger.md\` quando houver gasto, mídia paga, ferramenta paga ou custo variável.
- Use \`growth/customer-experience/knowledge/customer-feedback.md\` quando o aprendizado vier de conversa, suporte, call ou ticket.
- Use Strategy Product quando o resultado mudar ICP, problema, promessa, categoria ou posicionamento.
- Use Product Ops quando o resultado precisar virar Epic, Feature, critério de aceite ou item de delivery.
- Não invente telemetria.

## Manual Result Input Template

Cole resultados manuais neste formato quando não houver integração com analytics:

\`\`\`yaml
experiment_id: GX-001
period: YYYY-MM-DD..YYYY-MM-DD
measurement_source: manual | Plausible | Google Analytics | Vercel Analytics | PostHog | CRM | ad-platform | support-notes
visitors: TBD
leads: TBD
qualified_leads: TBD
calls: TBD
conversions: TBD
revenue: TBD
spend: TBD
conversion_rate: TBD
cost_per_lead: TBD
cost_per_qualified_lead: TBD
top_messages:
  - TBD
objections:
  - TBD
customer_quotes_summary:
  - TBD
evidence_links:
  - TBD
notes: TBD
\`\`\`

Regras para input manual:

- Use \`TBD\` quando não souber.
- Não invente telemetria, conversões, origem de tráfego, custo ou receita.
- Não cole dados pessoais de leads ou clientes.
- Resuma objeções e aprendizados em vez de copiar conversas sensíveis.

## Decisões

TBD

## Riscos

- Métricas de vaidade podem parecer tração sem aprendizado real.
- Resultado sem fonte de medição não deve virar decisão.
- Gasto de aquisição sem Spend Ledger pode esconder burn ou risco de runway.

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
