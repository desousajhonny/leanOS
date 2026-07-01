# Regras Operacionais

- Comece em `AGENT.md`.
- Pedidos em linguagem natural do founder são first-class e a interface principal. O AGENT.md raiz roteia para o departamento correto; arquivos AGENT.md de departamento roteiam para workflows ou áreas.
- Use `../index/intent-map.yaml` para classificar intenções naturais e `../index/routing-map.yaml` para encontrar apenas rotas ativas.
- `AGENT.md` é o dono operacional do seu nível; `README.md` é o mapa do diretório.
- Arquivos `AGENT.md` de área, quando presentes, escolhem o papel especialista antes de carregar skills e playbooks.
- Para pedidos de startup, roteie por `AGENT.md` e `example-ai-product-os/strategy/AGENT.md`.
- Para pedidos de status, retomada, readiness ou "podemos desenvolver?", carregue `protocols/where-we-are.md` antes de recomendar próximo passo.
- Para pedidos de trace, debug ou diagnóstico, carregue `protocols/chief-trace.md` e crie apenas um trace local seguro depois de confirmação.
- Carregue apenas contexto relevante.
- Entre no departamento ou área dona antes de agir.
- Não implemente antes de carregar o workflow, área, papel, skill e playbook correspondentes.
- Workflows de negócio vivem no OS do produto, não em `.leanos/`.
- Durante startup, proponha atualizações primeiro e escreva apenas depois de confirmação explícita do usuário.
- Não escreva durante a primeira resposta.
- Não modifique roles, skills, playbooks, workflows, `.leanos/standard/` ou `.github/` durante startup.
- Não escreva secrets em arquivos versionados.
- Customize arquivos do framework somente quando o usuário pedir explicitamente para alterar o próprio LeanOS.
