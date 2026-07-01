export function productOpsImplementationPacketsKnowledge(): string {
  return `# Implementation Packets

## Propósito

Centralizar, por Feature, os artefatos que Product Ops, Design, Security, DevOps, Growth, Finance e Engineering precisam antes de implementação.

Um Feature implementation packet evita que o modelo implemente apenas com base em uma issue resumida ou em memória solta.

## Estado Atual

Nenhum packet de Feature criado no scaffold inicial.

Crie um packet somente quando uma Feature real entrar em \`feature-to-delivery-cycle\`.

## Estrutura

~~~text
implementation-packets/
  <feature-slug>/
    README.md
    design/
      screen-specs/
        <screen-slug>.md
      component-specs/
        <component-slug>.md
    security/
      security-review.md
    devops/
      deploy-readiness.md
    engineering/
      implementation-plan.md
~~~

Security, DevOps e outras áreas só criam artefatos aqui quando seus gates forem aplicáveis.

## Readiness Gates

- Product Ops confirma Feature, escopo, não objetivos e critérios de aceite.
- Design escreve screen specs ou component specs quando UX, UI, fluxo, copy, acessibilidade, tela, estado ou componente forem afetados.
- Security escreve review quando dados, auth, permissões, privacidade, API, abuso, AI runtime ou compliance forem afetados.
- DevOps escreve readiness quando ambiente, CI/CD, deploy, config, observabilidade ou release forem afetados.
- Engineering escreve plano técnico somente depois que gates aplicáveis estiverem ready ou not_applicable com motivo.

Engineering não inicia código enquanto o packet da Feature estiver missing, pending ou blocked.

## Status

Use estes status no \`README.md\` do packet:

- \`missing\`: packet ainda não existe.
- \`draft\`: packet existe, mas falta gate aplicável.
- \`ready\`: todos os gates aplicáveis estão prontos ou not_applicable com motivo.
- \`blocked\`: existe lacuna que impede implementação.
- \`done\`: Feature implementada, PR validado e contexto pós-merge tratado.

## Decisões

- Product Ops é dono do packet e do gate de readiness.
- Áreas especialistas são donas dos artefatos que escrevem dentro do packet.
- PR Validation compara o PR contra Feature + implementation packet.
- Componentes especificados por Design não são considerados disponíveis até implementação e merge.

## Perguntas em Aberto

TBD

## Próxima Atualização

Atualize este README somente quando a regra de packet do framework mudar.
`;
}
