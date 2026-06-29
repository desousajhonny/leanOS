export function productOpsMvpDecisionGateKnowledge(): string {
  return `# MVP Decision Gate

## Propósito

Define the fixed LeanOS criteria for deciding what belongs in the first MVP scope.

Isto é um critério do framework, não um log de status de produto. Não reescreva com progresso específico do produto salvo quando o próprio framework mudar.

## Core Rule

An item enters the MVP only when it is the smallest useful version of the product that can validate the main user problem, create visible user value and be implemented safely with current constraints.

Important items can stay outside the MVP. Urgent requests can still be too broad, too risky or too unclear for the first version.

## Required Inputs

- Product brief, problem, ICP and value proposition.
- Business model or business assumption when available.
- Roadmap or backlog item when the request starts from an existing item.
- Founder intent and constraints.
- Existing MVP scope, PRD, stories, acceptance criteria and non-goals.
- Known Design, Security, Engineering and DevOps constraints when applicable.

## Gate Criteria

### Value Risk

Question: will this help validate or deliver the core product value?

Pass when:

- the target user and problem are clear;
- the item contributes directly to the MVP outcome;
- the user value is understandable without inventing product facts;
- the item is not only internal polish, preference or future optimization.

Block or defer when:

- the user, problem or value is unclear;
- the item is interesting but disconnected from the core MVP learning;
- the item should stay in backlog until the main product promise is sharper.

### Usability Risk

Question: can a real user understand and use this in the first version?

Pass when:

- the core flow is explainable;
- the required interaction is simple enough for MVP;
- accessibility and obvious UX risks are visible;
- missing design details can be safely handled before implementation.

Block or defer when:

- the user flow is unknown;
- the item needs major design discovery before scope is safe;
- the MVP would be confusing without a design foundation.

### Feasibility Risk

Question: can this be implemented safely with the current technical and operational constraints?

Pass when:

- the implementation boundary is small enough to plan;
- major dependencies are known;
- data, integration, AI, infrastructure or architecture risks are named;
- uncertainty can be handled by a small spike before delivery.

Block or defer when:

- the item is too large for a first version;
- feasibility depends on unknown systems or integrations;
- the work would force premature architecture, automation or scale assumptions.

### Business Viability Risk

Question: does this fit the business model, operating model and current founder constraints?

Pass when:

- the item supports the expected business outcome or learning;
- the effort makes sense for the founder's current stage;
- cost, support, compliance or operational burden is acceptable or explicit;
- there is a reason to learn this now instead of later.

Block or defer when:

- the item adds operational complexity before value is proven;
- the item increases cost, support or compliance burden without clear MVP value;
- the business reason is weak or absent.

## Decision States

- \`ready-for-mvp\`: include in MVP now.
- \`needs-product-clarity\`: product problem, user or value is still unclear.
- \`needs-usability-flow\`: user flow, UX, copy, accessibility or design foundation is missing.
- \`needs-technical-spike\`: feasibility, architecture, data, AI, integration or infrastructure risk is unclear.
- \`needs-business-viability-check\`: pricing, cost, support, operations, compliance or business value is unclear.
- \`too-large-for-mvp\`: the item should be split or deferred.
- \`not-a-fit-now\`: keep out of current MVP and explain why.

## MVP Scope Buckets

Use these buckets in founder-facing output:

- In MVP now.
- Later / backlog.
- Needs discovery.
- Needs spike or specialist check.
- Not now.

## Model Behavior

- Ask guided questions only for missing information.
- Prefer fewer, clearer MVP items over a broad first version.
- Não marque algo como MVP só porque o founder gosta.
- Não crie Epics, Features, issues do GitHub, branches, PRs ou código a partir deste gate.
- Não atualize arquivos de MVP até o founder confirmar a decisão proposta.
- If Design, Security, Engineering or DevOps risk is applicable, name the risk and recommend the next LeanOS route.

## Founder-Friendly Output

Use this shape:

~~~text
Minha recomendacao:
<include now | leave for later | investigate first | split | not now>

Por que:
- Value Risk: <pass/gap>
- Usability Risk: <pass/gap>
- Feasibility Risk: <pass/gap>
- Business Viability Risk: <pass/gap>

O que entra no MVP agora:
- <item>

O que fica fora por enquanto:
- <item>

Proximo passo seguro:
<route>

Quer que eu transforme essa decisao no escopo inicial do MVP?
~~~
`;
}
