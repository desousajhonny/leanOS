export function designProductUiSpecKnowledge(): string {
  return `# Product UI Spec

## Propósito

Definir os padrões canônicos de UI deste produto: shell, navegação, menus, prioridade de ações, forms, tabelas, painéis, feedback e regras de layout reutilizáveis.

Este arquivo não é um design system completo e não é uma spec de Feature. Ele é o contrato de padrões de produto que screen specs, component specs, Engineering e PR validation usam para evitar inconsistência de UI.

## Como Usar

- Cheque este arquivo antes de criar ou alterar qualquer tela, fluxo ou componente user-facing.
- Siga um padrão existente quando ele cobrir a necessidade.
- Proponha novo padrão ou extensão somente quando uma Feature real exigir.
- Mantenha este arquivo progressive, not speculative.
- Referencie documentação durável de componentes em \`operations/design/knowledge/components/<component-slug>.md\`.
- Mantenha screen specs específicas de Feature dentro do Feature implementation packet.

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

Use \`design-system.md\` como fonte de tokens. Este arquivo explica como os tokens são aplicados aos padrões do produto.

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
| --- | --- | --- | --- |
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

- Decisões específicas de tela e componente começam no Feature implementation packet.
- Promova um padrão para cá somente quando Design confirmar que ele vale além de uma Feature.
- Promova documentação de componente reutilizável para \`operations/design/knowledge/components/<component-slug>.md\`.
- Atualize \`component-inventory.md\` quando status, spec path ou code path de componente mudar.
- Post-merge deve propor atualizações aqui quando uma UI entregue estabelecer padrão reutilizável.

## Não Faça

- Não crie padrões canônicos para telas hipotéticas.
- Não duplique um padrão existente com outro nome.
- Não use este arquivo para documentar uma tela específica de Feature.
- Não promova um componente para padrão reutilizável sem spec, code path ou decisão explícita.

## Perguntas Em Aberto

TBD
`;
}
