# Critérios de Qualidade

Use estes critérios para julgar se um asset LeanOS é bom o bastante para manter.

## Propósito

Critérios de qualidade evitam assets vagos, lógica duplicada e rotas confusas.

Elas respondem:

- Este asset está claro?
- Ele pertence ao nível certo?
- Ele carrega apenas o contexto necessário?
- Ele preserva a Navigation Chain?
- Ele ajuda modelos futuros a agir melhor?

## Critérios Universais

Todo asset LeanOS deve ter:

- Propósito claro.
- Owner explícito.
- Local correto.
- Carregamento mínimo de contexto.
- Entradas claras.
- Saídas claras.
- Limites e linhas vermelhas quando relevante.
- Referências a assets relacionados apenas quando úteis.
- Nenhuma responsabilidade duplicada.
- Nenhum fato inventado de produto ou empresa.

## Qualidade de Roteamento

Um bom asset:

- Mantém o roteamento raiz no nível de departamento.
- Permite que AGENTs de departamento escolham workflows ou áreas.
- Permite que AGENTs de área escolham roles.
- Permite que roles carreguem skills e playbooks.
- Não pula níveis porque um arquivo posterior parece relevante.
- Não pede que um modelo carregue o workspace inteiro.

## Qualidade de Conteúdo

Um bom asset:

- Usa linguagem direta.
- Diz quando usar.
- Diz quando não usar.
- Nomeia os arquivos que pode atualizar.
- Separa fatos de suposições.
- Uses `not applicable` explicitly when a dimension does not apply.
- Pede confirmação antes de alterar arquivos duráveis.

## Sinais Específicos por Asset

| Asset | Sinal de Qualidade |
| --- | --- |
| `AGENT.md` | Roteia para o próximo owner sem se tornar um inventário gigante. |
| `README.md` | Explica propósito, arquivos e navegação da pasta sem se tornar executor. |
| `role` | Define um chapéu operacional claro e aponta para skills/playbooks relevantes. |
| `skill` | Descreve uma capacidade reutilizável, verificações e saídas. |
| `playbook` | Fornece uma sequência ordenada de execução com entradas e saídas. |
| `knowledge` | Armazena contexto confirmado sem instruções de processo. |
| `workflow` | Coordena trabalho multiárea ou multiestágio. |
| `command` | Carrega contexto mínimo e define atualizações permitidas/proibidas. |

## Critérios de Rejeição

Rejeite ou revise um asset quando:

- Ele duplica outro asset.
- Ele mistura responsabilidades de role, skill, playbook e knowledge.
- Ele não tem owner claro.
- Ele aponta para paths que não existem.
- Ele recomenda áreas inativas sem aviso.
- Ele armazena segredos ou valores de tokens.
- Ele toma decisões de implementação sem carregar role, skill e playbook obrigatórios.
- Ele atualiza source of truth ou arquivos do framework sem confirmação.

## Checagem Final

Antes de aceitar um asset, responda:

1. Que tipo de asset é este?
2. Quem é o owner?
3. Qual pergunta ele responde?
4. O que deve carregá-lo?
5. O que ele nunca deve fazer?
6. Qual checklist o valida?
