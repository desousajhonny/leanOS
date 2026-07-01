# Screen Spec: <screen-name>

Use este template quando uma Feature concreta precisar de uma tela, página, view, form ou modal definido antes da implementação.

Este arquivo pertence a Design e fica dentro do Feature implementation packet.

Caminho esperado:

`operations/product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md`

## Status

- Status: draft / approved / needs-review / blocked
- Dono: Design
- Feature relacionada:
- Epic relacionada:
- Última atualização:

## Propósito

Explique o que esta tela ajuda o usuário a realizar e por que ela pertence à Feature.

## Contexto

- Usuário:
- Ponto de entrada:
- Resultado de sucesso:
- Não objetivos:
- Fluxo relacionado:

## Layout E Hierarquia

- Padrão do Product UI Spec usado:
- Região primária:
- Região secundária:
- Navegação:
- Ação primária:
- Ações secundárias:
- Prioridade de conteúdo:

## Conteúdo

- Copy obrigatória:
- Labels:
- Helper text:
- Copy de estado vazio:
- Copy de erro:
- Copy de sucesso:

## Estados Da Tela

| State | Trigger | User sees | User can do | Engineering notes |
| --- | --- | --- | --- | --- |
| Default | TBD | TBD | TBD | TBD |
| Loading | TBD | TBD | TBD | TBD |
| Empty | TBD | TBD | TBD | TBD |
| Error | TBD | TBD | TBD | TBD |
| Success | TBD | TBD | TBD | TBD |
| Edge case | TBD | TBD | TBD | TBD |

## Ações

| Action | Trigger | Result | Validation | Error behavior |
| --- | --- | --- | --- | --- |
| Primary | TBD | TBD | TBD | TBD |

## Componentes

- Componentes duráveis usados:
- Componentes existentes do inventário:
- Specs de componentes novos/adaptados:
- Impacto no component inventory:
- Restrições de reuso:

## Conformidade Com Product UI Spec

- Product UI Spec: `operations/design/knowledge/product-ui-spec.md`
- Padrão do Product UI Spec usado:
- Novo padrão proposto:
- Divergência proposta:
- Motivo da divergência:
- Atualização do Product UI Spec necessária: sim / não
- Componentes duráveis usados em `operations/design/knowledge/components/`:

## Acessibilidade

- Keyboard:
- Focus order:
- Screen reader:
- Contrast:
- Reduced motion:
- Form labels and errors:

## Responsividade

- Mobile:
- Tablet:
- Desktop:
- Overflow/content limits:

## Dados E Permissões

- Data shown:
- User input:
- Permissions:
- Privacy notes:
- Security/Data handoff needed:

## Handoff Para Engineering

- Limites de implementação:
- Testes obrigatórios:
- Validação manual:
- Expectativa de screenshots ou preview:
- Perguntas em aberto:

## Evidência De Handoff

- Caminho da screen spec:
- Caminhos das component specs usadas:
- Caminhos das docs duráveis de componentes:
- Product UI Spec checado:
- Code path esperado:
- Screenshot, preview ou Storybook esperado:
- Evidência de teste ou validação no PR:
- Lacunas conhecidas:

## Não Faça

- Não implemente estado visual que não esteja descrito ou explicitamente aceito.
- Não hardcode copy, preço, plano, cor ou regra de negócio fora da fonte correta.
- Não ignore loading, empty, error, success ou foco quando forem relevantes.
