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

Não pule níveis porque um arquivo posterior parece relevante.
Não carregue o workspace inteiro quando existe uma rota menor.
