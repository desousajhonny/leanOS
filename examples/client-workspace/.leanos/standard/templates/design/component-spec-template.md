# Component Spec: <component-name>

Use este template quando uma Feature precisar de um componente reutilizável ainda não aprovado no inventário de Design.

Este arquivo pertence a Design. Engineering usa como contrato de implementação.

## Status

- Status: draft / approved / needs-review / deprecated
- Dono: Design
- Feature relacionada:
- Epic relacionada:
- Origem: Feature / PR / decisão de Design
- Última atualização:

## O Que É

Explique o que este componente é, qual problema de usuário resolve e por que deve existir como componente reutilizável.

## Quando Usar

- Use quando...
- Use quando...

## Quando Não Usar

- Não use quando...
- Não use quando...

## Anatomia

Liste as partes visíveis e estruturais do componente.

- Container:
- Header/title:
- Primary content:
- Actions:
- Supporting text:
- Feedback area:

## Variantes

| Variante | Propósito | Quando Usar | Notas |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |

## Estados

| Estado | Comportamento Esperado | Copy De UX | Notas De Acessibilidade |
| --- | --- | --- | --- |
| Default | TBD | TBD | TBD |
| Hover | TBD | TBD | TBD |
| Focus | TBD | TBD | TBD |
| Disabled | TBD | TBD | TBD |
| Loading | TBD | TBD | TBD |
| Empty | TBD | TBD | TBD |
| Error | TBD | TBD | TBD |
| Success | TBD | TBD | TBD |

## Comportamento

- Interaction:
- Validation:
- Data loading:
- Error handling:
- Responsive behavior:

## Dicas De Usabilidade

- Densidade:
- Hierarquia visual:
- Clareza de ação:
- Feedback esperado:
- Limites de complexidade:
- Erros comuns de uso:

## Acessibilidade

- Keyboard behavior:
- Focus order:
- ARIA/semantic requirements:
- Contrast requirements:
- Screen reader notes:
- Reduced motion notes:

## Regras De Conteúdo

- Labels:
- Helper text:
- Empty state:
- Error messages:
- Success messages:
- Copy red lines:

## Design Tokens

- Typography:
- Color intent:
- Spacing:
- Radius:
- Border:
- Shadow:
- Motion:

## Alinhamento Com Product UI Spec

- Product UI Spec: `operations/design/knowledge/product-ui-spec.md`
- Padrão existente seguido:
- Novo padrão ou extensão proposta:
- Por que padrões existentes não bastam:
- Candidato a promoção: sim / não

## Regras De Composição

- Can contain:
- Can be contained by:
- Should not be nested with:
- Maximum recommended complexity:
- Reuse guidance:

## Exemplos

| Exemplo | Quando Usar | Observação |
| --- | --- | --- |
| TBD | TBD | TBD |

## Faça / Não Faça

| Faça | Não Faça | Motivo |
| --- | --- | --- |
| TBD | TBD | TBD |

## Notas Para Engineering

- Expected props or inputs:
- Data dependencies:
- Events/callbacks:
- Testing expectations:
- Performance concerns:
- Existing patterns to follow:

## Evidência De Handoff

- Caminho da spec:
- Caminho da documentação durável em `operations/design/knowledge/components/<component-slug>.md`:
- Code path esperado:
- Code path confirmado após merge:
- PR ou referência:
- Screenshot, preview ou Storybook:
- Evidência de teste ou validação no PR:
- Lacunas conhecidas:

## Não Faça

- Não hardcode copy de produto que deveria vir do contexto da Feature.
- Não hardcode cores fora da intenção dos Design tokens.
- Não crie um componente único quando ele deveria ser reutilizável.
- Não pule estados de teclado, foco, loading, vazio ou erro quando aplicáveis.

## Perguntas em Aberto

- TBD
