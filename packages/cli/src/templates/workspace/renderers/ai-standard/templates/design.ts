export function productUiSpecTemplate(): string {
  return `# Product UI Spec

Use este template para definir progressivamente os padrões canônicos de UI deste produto.

Este arquivo pertence a Design. Screen specs e component specs devem checar este arquivo antes de propor novos padrões de UI.

Caminho esperado:

\`operations/design/knowledge/product-ui-spec.md\`

## Status

- Status geral: draft / baseline-ready / needs-review / blocked
- Status do padrão: proposed / approved / experimental / deprecated
- Origem: Feature / PR / decisão de Design
- Dono: Design
- Produto:
- Última atualização:

## Propósito

Definir como a interface deste produto se comporta para manter consistência entre novas telas, fluxos e componentes.

## Critérios Para Atualizar

Atualize este arquivo somente quando:

- uma tela, fluxo ou componente real exigir um padrão ainda ausente;
- um padrão existente precisar ser estendido para cobrir uma necessidade recorrente;
- um PR mergeado provar que um padrão deve virar canônico;
- uma divergência de screen spec ou component spec for aprovada por Design;
- o padrão puder ser descrito sem depender de uma única Feature.

## Estrutura Do Produto

| Padrão | Status | Origem: Feature / PR / decisão de Design | Decisão Atual | Componentes Relacionados |
| --- | --- | --- | --- | --- |
| Modelo de navegação | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Sidebar | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Top bar | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Região principal | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Cabeçalho de página | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Responsividade do shell | proposed / approved / experimental / deprecated | TBD | TBD | TBD |

## Padrões De Layout

| Padrão | Status | Quando Usar | Estrutura | Notas |
| --- | --- | --- | --- |
| List page | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Detail page | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Form page | proposed / approved / experimental / deprecated | TBD | TBD | TBD |
| Modal flow | proposed / approved / experimental / deprecated | TBD | TBD | TBD |

## Prioridade De Ações

| Ação | Regra De Prioridade | Posição | Componente Relacionado |
| --- | --- | --- | --- |
| Primária | TBD | TBD | TBD |
| Secundária | TBD | TBD | TBD |
| Destrutiva | TBD | TBD | TBD |
| Em massa | TBD | TBD | TBD |
| Inline | TBD | TBD | TBD |
| Estado vazio | TBD | TBD | TBD |

## Navegação E Menus

| Padrão | Status | Regra | Componentes Relacionados |
| --- | --- | --- | --- |
| Itens de sidebar | proposed / approved / experimental / deprecated | TBD | TBD |
| Seções de topo | proposed / approved / experimental / deprecated | TBD | TBD |
| Navegação contextual | proposed / approved / experimental / deprecated | TBD | TBD |
| Breadcrumbs | proposed / approved / experimental / deprecated | TBD | TBD |
| Tabs | proposed / approved / experimental / deprecated | TBD | TBD |
| Menu overflow | proposed / approved / experimental / deprecated | TBD | TBD |

## Forms

| Padrão | Regra | Componentes Relacionados |
| --- | --- | --- |
| Posição de label | TBD | TBD |
| Helper text | TBD | TBD |
| Momento de validação | TBD | TBD |
| Campos obrigatórios | TBD | TBD |
| Posição de erro | TBD | TBD |
| Submit | TBD | TBD |

## Tabelas E Listas

| Padrão | Regra | Componentes Relacionados |
| --- | --- | --- |
| Densidade | TBD | TBD |
| Prioridade de colunas | TBD | TBD |
| Ações por linha | TBD | TBD |
| Filtros | TBD | TBD |
| Ordenação | TBD | TBD |
| Paginação | TBD | TBD |
| Estado vazio | TBD | TBD |
| Loading | TBD | TBD |

## Painéis E Cards

| Padrão | Regra | Componentes Relacionados |
| --- | --- | --- |
| Quando usar painéis | TBD | TBD |
| Quando usar cards | TBD | TBD |
| Estrutura de header | TBD | TBD |
| Posição de ações | TBD | TBD |
| Regras de aninhamento | TBD | TBD |

## Padrões De Feedback

| Padrão | Regra | Componentes Relacionados |
| --- | --- | --- |
| Success | TBD | TBD |
| Warning | TBD | TBD |
| Error | TBD | TBD |
| Empty | TBD | TBD |
| Loading | TBD | TBD |
| Confirmation | TBD | TBD |

## Uso De Design Tokens

| Área De Token | Regra De Aplicação No Produto | Fonte |
| --- | --- | --- |
| Tipografia | TBD | \`design-system.md\` |
| Intenção de cor | TBD | \`design-system.md\` |
| Espaçamento | TBD | \`design-system.md\` |
| Radius | TBD | \`design-system.md\` |
| Border | TBD | \`design-system.md\` |
| Shadow | TBD | \`design-system.md\` |
| Motion | TBD | \`design-system.md\` |

## Conteúdo E Microcopy

| Padrão | Regra | Exemplo |
| --- | --- | --- |
| Action labels | TBD | TBD |
| Empty states | TBD | TBD |
| Error messages | TBD | TBD |
| Success messages | TBD | TBD |
| Helper text | TBD | TBD |
| Confirmation copy | TBD | TBD |

## Referências De Componentes

Documentação durável de componentes fica em:

\`operations/design/knowledge/components/<component-slug>.md\`

| Componente | Uso Canônico | Spec | Status |
| --- | --- | --- |
| TBD | TBD | TBD | proposed / approved / experimental / deprecated |

## Exemplos De Uso

| Contexto | Padrão Aplicado | Componentes | Observação |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Antipadrões

| Evite | Motivo | Alternativa |
| --- | --- | --- |
| TBD | TBD | TBD |

## Regras Progressivas De Padrão

- Comece pelo menor conjunto de padrões necessário para a superfície atual.
- Adicione um novo padrão somente quando uma tela, fluxo ou componente real exigir.
- Prefira estender um padrão existente antes de criar outro.
- Não duplique padrões com nomes diferentes.
- Registre perguntas em aberto em vez de inventar comportamento de produto.

## Regras De Promoção De Padrões

- Um padrão específico de Feature começa no Feature implementation packet.
- Promova para cá somente depois que Design confirmar que ele vale além de uma Feature.
- Quando um padrão depender de componente reutilizável, linke a spec durável.
- Post-merge deve propor atualização deste arquivo quando uma UI entregue estabelecer padrão reutilizável.

## Perguntas Em Aberto

- TBD
`;
}

export function componentSpecTemplate(): string {
  return `# Component Spec: <component-name>

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

- Product UI Spec: \`operations/design/knowledge/product-ui-spec.md\`
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
- Caminho da documentação durável em \`operations/design/knowledge/components/<component-slug>.md\`:
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
`;
}

export function screenSpecTemplate(): string {
  return `# Screen Spec: <screen-name>

Use este template quando uma Feature concreta precisar de uma tela, página, view, form ou modal definido antes da implementação.

Este arquivo pertence a Design e fica dentro do Feature implementation packet.

Caminho esperado:

\`operations/product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md\`

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

- Product UI Spec: \`operations/design/knowledge/product-ui-spec.md\`
- Padrão do Product UI Spec usado:
- Novo padrão proposto:
- Divergência proposta:
- Motivo da divergência:
- Atualização do Product UI Spec necessária: sim / não
- Componentes duráveis usados em \`operations/design/knowledge/components/\`:

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
`;
}
