# Navigation Chain

LeanOS usa navegação owner-first:

`Root AGENT.md -> Department AGENT.md -> Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Saída`

Use a cadeia para escolher o próximo owner, um nível por vez.

1. A raiz escolhe o departamento owner.
2. O departamento escolhe um workflow ou área ativa.
3. A área escolhe a role especialista quando tem `AGENT.md`; caso contrário, use seu `README.md` como mapa local.
4. A role aponta para as skills e playbooks obrigatórios.
5. Skills e playbooks estruturam o trabalho.
6. A saída atualiza apenas o menor arquivo relevante de knowledge, decisão ou projeto.

## Topologia Operacional

A Navigation Chain aplica a Lei de Conway: a comunicação modelada pelo LeanOS tende a aparecer no produto gerado. Por isso, a rota deve representar fluxo de valor, não organograma.

Use Team Topologies como lente prática:

- Strategy/Product e Product Ops mantêm o fluxo principal de valor até Feature pronta.
- Design, Security e Finance entram como enabling/specialist quando um gatilho reduz risco ou aumenta qualidade.
- DevOps e `.leanos/standard` funcionam como platform: reduzem fricção e padronizam caminhos seguros, sem assumir decisões de produto.
- Growth e Customer Experience fecham o loop de mercado, feedback e aprendizado.

Antes de adicionar handoff, área, role, skill ou playbook, pergunte: isso reduz carga cognitiva, esclarece ownership, protege source of truth ou melhora a próxima decisão do founder?

Não pule níveis porque um arquivo posterior parece relevante.
Não carregue o workspace inteiro quando existe uma rota menor.
Não crie organograma em pasta quando o founder precisa de fluxo de valor.
