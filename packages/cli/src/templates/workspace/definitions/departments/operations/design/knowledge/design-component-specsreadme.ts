export function designComponentSpecsReadme(): string {
  return `# Component Specs

## Propósito

Store durable, reusable Design component specifications that should remain available beyond a single Feature.

This folder is where Design documents real product components such as \`table.md\`, \`sidebar-nav.md\`, \`button-controls.md\`, \`pricing-card.md\` or \`customer-status-badge.md\`.

Feature-scoped component specs should be written first inside:

\`../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-name>.md\`

This folder is intentionally empty in the initial scaffold except for this README. Não crie especificações especulativas de componente.

## When To Create A Spec

Create \`<component-name>.md\` here only when:

- a real Feature needs a new or adapted reusable component;
- Product Ops has confirmed the Feature context;
- Design has enough product, user-flow, design-system and accessibility context;
- the founder confirms the component readiness work;
- the component should become durable reusable Design knowledge, usually after implementation or explicit Design approval.

If the component is only needed for one Feature or still awaiting implementation, keep the full spec in the Feature implementation packet and update \`../component-inventory.md\` with status \`specified\`, not \`available\`.

## Seções Obrigatórias Para Component Docs

Each durable component file should include:

- O Que É: o que o componente é e qual problema de usuário resolve.
- Quando Usar: situações concretas de produto em que o componente é apropriado.
- Quando Não Usar: quando outro padrão ou componente deve ser preferido.
- Anatomia: partes visuais e estruturais.
- Variantes: variantes aprovadas e seu propósito.
- Estados: default, hover, focus, disabled, loading, empty, error e success quando aplicável.
- Comportamento: interação, validação, carregamento de dados, erro e responsividade.
- Dicas De Usabilidade: orientação prática de clareza, densidade, hierarquia e interação.
- Faça / Não Faça: regras que evitam uso inconsistente.
- Design Tokens: tipografia, intenção de cor, espaçamento, radius, border, shadow e motion com base em \`../design-system.md\`.
- Alinhamento Com Product UI Spec: qual padrão de produto em \`../product-ui-spec.md\` ele suporta.
- Notas Para Engineering: inputs, eventos, dependências de dados, testes e performance.
- Evidência De Handoff: spec path, code path, PR/referência, screenshot/preview/Storybook e validação no PR.

## Naming

- Use kebab-case: \`customer-table.md\`, \`csv-import-panel.md\`, \`billing-status-badge.md\`.
- Name the component by reusable purpose, not by one screen.
- Link the durable spec or Feature packet spec from \`../component-inventory.md\`.

## Required Template

Use:

\`../../../../.leanos/standard/templates/design/component-spec-template.md\`

## Não Faça

- Não armazene código-fonte aqui.
- Não crie especificações para componentes futuros hipotéticos.
- Não deixe Engineering implementar um novo componente voltado ao usuário a partir de notas que não são uma especificação de componente.
- Não duplique uma especificação de componente quando um componente aprovado puder ser reutilizado ou adaptado.
- Não marque componente como disponível antes do post-merge confirmar código, testes ou evidência de validação.
- Não use esta pasta para specs temporárias de Feature; mantenha essas specs no implementation packet até a promoção.
`;
}
