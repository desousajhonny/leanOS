# Gates de Progressão

## Propósito

Define os gates concretos que decidem se o LeanOS pode mover de um estágio de progressão do founder para o próximo.

Use this file with `founder-progression-model.md`. The model explains the journey. This file names the required context, allowed next stages and blocked next stages.

## Matriz de Gates

| Estágio | Contexto Obrigatório | Próximos Estágios Permitidos | Próximos Estágios Bloqueados |
| --- | --- | --- | --- |
| Setup Seed | `leanos.yaml` seed context, active Strategy routes, founder start intent | Strategy Seed, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Seed | product idea, target user guess, problem guess, value promise guess | Strategy Baseline, Idea Calibration | Roadmap Inicial, MVP Delivery Decision, Product Shaping, Implementation |
| Strategy Baseline | declaração do problema, ICP ou primeiro segmento de usuário, proposta de valor, alternative, riskiest suposição, business model direction, immediate focus | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Idea Calibration | MVP Delivery Decision, Product Shaping, Implementation |
| Idea Calibration | idea restated, user and problem named, fit with ICP/value checked, evidence and suposiçãos visible | MVP Validation Scope, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist, Strategy Baseline | MVP Delivery Decision, Product Shaping, Implementation |
| MVP Validation Scope | Business Thesis, Target User, Core Problem, Promessa, MVP Slice, Success Signals, Pivot Signals, MVP Validation Sequence | MVP Delivery Decision, Product Shaping when Product Ops is active, Roadmap Inicial when product_operating/growth_scaling or multiple priorities exist | Implementation |
| MVP Delivery Decision | Product Ops active, MVP backlog or delivery scope, PRD or equivalent scope, non-goals, acceptance criteria, dependencies | Product Shaping, Delivery Readiness | Implementation before Feature readiness |
| Product Shaping | Epic exists, scope type, milestone or release goal, expected Features, readiness gaps | Delivery Readiness, Feature Shaping | Implementation |
| Delivery Readiness | Feature exists, Product Ops criteria, Engineering criteria, Design/Security/DevOps criteria satisfied or not applicable | Implementation | Launch, Learning Loop without shipped or tested output |
| Implementation | Engineering active, branch plan, implementation plan, tests or validation plan, PR readiness path | Launch, Learning Loop, Post-Merge Continuation | Scaling / Operating Cadence without usage or recurring operation |
| Launch | release or MVP is available to users, launch owner, support path, rollback or recovery plan, learning signals | Learning Loop, Scaling / Operating Cadence | Implementation without a new ready Feature |
| Learning Loop | evidence, insight, decision, roadmap or backlog impact, next learning action | Strategy Baseline, Roadmap Inicial, MVP Validation Scope, Product Shaping | Scaling / Operating Cadence without recurring usage or operating rhythm |
| Scaling / Operating Cadence | product in use, recurring feedback or operations, metrics, cadence owner, backlog/launch/learning rhythm | Learning Loop, Roadmap Inicial, Delivery Readiness | Setup Seed |

## Contexto Obrigatório

Antes de mover estágios, confirme:

- o estágio atual está nomeado;
- o contexto obrigatório do estágio atual existe em arquivos ativos ou está explicitamente desconhecido;
- suposições não são tratadas como evidência;
- the next route exists or returns `activation_required`;
- o founder confirmou qualquer atualização de arquivo durável.

## Próximos Estágios Permitidos

Próximos estágios permitidos são os únicos que o LeanOS pode recomendar sem explicar um gate bloqueado.

Quando múltiplos próximos estágios forem permitidos, escolha o menor que responda à intenção do founder:

- se o contexto estiver incerto, permaneça em Strategy Seed ou Idea Calibration;
- se o founder quiser validação rápida de negócio, mova para MVP Validation Scope;
- se o founder quiser sequência e o produto estiver em product_operating/growth_scaling ou tiver múltiplas prioridades, mova para Roadmap Inicial;
- se o founder escolheu um item de MVP backlog, roadmap, backlog ou delivery-scope para entrega, peça ativação de Product Ops e mova para MVP Delivery Decision.
- se o founder confirmar o primeiro escopo de validação do MVP e quiser delivery, mova de MVP Validation Scope diretamente para Product Ops / MVP Delivery Decision.

## Próximos Estágios Bloqueados

Estágios bloqueados exigem uma explicação amigável ao founder e o gate ausente.

- Não permita Engineering antes de Product Ops delivery readiness.
- Não force Roadmap entre MVP Validation Scope e planejamento de entrega de Product Ops.
- Não permita Product Ops criar escopo de delivery antes de Strategy Baseline e MVP Validation Scope ou um item atual de MVP/backlog existir.
- Não permita trabalho de launch de Growth antes de existir superfície productizada, landing page, concierge ou release para colocar diante de usuários.
- Não permita sync com GitHub antes de existirem assets locais de delivery ou prontidão de setup do GitHub.
- Não permita Scaling / Operating Cadence antes de existirem uso, feedback, atividade de release ou operações recorrentes.

## Regras de Ativação

Use `activation_required` only when:

- o próximo estágio solicitado pertence a uma área inativa;
- o gate do estágio atual está satisfeito;
- o founder foi informado por que os arquivos ativos de Strategy não são mais suficientes;
- o founder confirma a ativação.

Não use `activation_required` como substituto para contexto de Strategy ausente.

## Founder-Friendly Output

Quando um gate bloquear progresso, diga:

~~~text
Ainda falta uma decisao antes desse passo.
Estamos em: <current stage>.
Falta: <missing gate>.
Proximo passo seguro: <next route or question>.
~~~
