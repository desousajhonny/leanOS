# Product UI Spec

Use este template para definir progressivamente os padrões canônicos de UI deste produto.

Este arquivo pertence a Design. Screen specs e component specs devem checar este arquivo antes de propor novos padrões de UI.

Caminho esperado:

`operations/design/knowledge/product-ui-spec.md`

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
| Tipografia | TBD | `design-system.md` |
| Intenção de cor | TBD | `design-system.md` |
| Espaçamento | TBD | `design-system.md` |
| Radius | TBD | `design-system.md` |
| Border | TBD | `design-system.md` |
| Shadow | TBD | `design-system.md` |
| Motion | TBD | `design-system.md` |

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

`operations/design/knowledge/components/<component-slug>.md`

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
