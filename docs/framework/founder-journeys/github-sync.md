# Jornada: Sincronização Com GitHub

## Visão Humana

- **Trigger:** founder diz "sincronize com GitHub", "joga esses epics/features no GitHub Projects" ou "configura GitHub para o LeanOS".
- **Objetivo:** verificar readiness do GitHub, guiar o setup quando faltar algo e depois preparar um payload de dry-run rico para sincronizar Epics e Features locais sem perder descrição, metadata, milestone ou relações.
- **Começa em:** `AGENT.md` raiz.
- **Passa por:** DevOps/GitHub DevOps, Product Ops, Strategy/Roadmap opcional, Security opcional e contrato de capability do GitHub.
- **Termina com:** orientação de setup, payload de dry-run aguardando confirmação ou handoff confirmado para uma capability/script futura, seguido de verificação remota e patch local quando a escrita for concluída.
- **Não faz:** chamar APIs do GitHub diretamente pelo raciocínio do modelo, escrever tokens, criar código, criar branches ou abrir PRs.

## Diagrama Do Fluxo

```mermaid
flowchart TD
  A["Founder: sincronizar Epics/Features com GitHub"]
  B["Root AGENT.md"]
  C["Ler leanos.yaml + indexes ativos"]
  D{"DevOps ativo?"}
  E["Retornar activation_required: operations.devops"]
  F["DevOps AGENT"]
  G["role GitHub DevOps"]
  H["skill configure-github-project"]
  I["playbook configure-github-project"]
  J["Verificação de readiness do GitHub"]
  K{"GitHub pronto?"}
  L["Orientação de setup + updates de config propostos"]
  M{"Founder confirma updates de setup?"}
  N["Atualizar github-management / project-sync / labels"]
  O{"Product Ops ativo e Epics/Features existem?"}
  P["Rotear para ativação de Product Ops ou explicar trabalho local ausente"]
  Q["Ler Epics + Features locais"]
  R["Comparar sync-state"]
  S["Criar payload de dry-run"]
  T{"Founder confirma escrita remota?"}
  U["Ler capability-contract"]
  V["Capability futura executa"]
  W["Capability faz read-back verification"]
  X{"Verificação passou?"}
  Y["Atualizar sync-state + Epics/Features locais"]
  Z["Parar com próxima rota"]

  A --> B --> C --> D
  D -->|Não| E --> Z
  D -->|Sim| F --> G --> H --> I --> J --> K
  K -->|Não| L --> M
  M -->|Sim| N --> J
  M -->|Não| Z
  K -->|Sim| O
  O -->|Não| P --> Z
  O -->|Sim| Q --> R --> S --> T
  T -->|Não| Z
  T -->|Sim| U --> V --> W --> X
  X -->|Sim| Y --> Z
  X -->|Não| Z
```

## Fluxo Em Linguagem Simples

O modelo começa no `AGENT.md` raiz porque o founder fala em linguagem natural. Ele lê `leanos.yaml` e indexes ativos antes de rotear. Se DevOps estiver inativo, o modelo não abre paths de DevOps; ele retorna `activation_required: operations.devops` com uma explicação orientada a setup.

Quando DevOps está ativo, a jornada começa com readiness do GitHub, não com sync. Se o setup estiver incompleto, GitHub DevOps guia o founder por owner, repository, Project, labels e fonte de token sem expor secrets. Somente depois que a readiness passa é que Product Ops lê Epics e Features locais e prepara um payload de dry-run.

O modelo nunca realiza escritas remotas no GitHub por conta própria. Ele prepara um payload, pede confirmação, lê `.github/leanos/capability-contract.md` e passa a execução para uma capability/script segura futura.

O payload não pode ser apenas um resumo. Ele deve levar o body rico de cada Epic e Feature, milestone, campos de GitHub Projects (`Status`, `Priority`, `Size`, `Effort`, `Area`, `Roadmap Item`, `Epic`) e relações Epic -> Features. Depois da escrita remota, a capability deve ler o GitHub de volta para confirmar que o body, milestone, labels, Project fields e relacionamentos existem. Só então o LeanOS atualiza os arquivos locais com:

```yaml
sync_status: synced
github_issue:
  url: https://github.com/<owner>/<repo>/issues/<number>
```

## Trigger Do Founder

- "sincronize os epics com GitHub"
- "cria as issues no GitHub Projects"
- "configura GitHub para o LeanOS"
- "essas features já podem ir para o GitHub?"

## Owner

- Área primária para setup: `<product-slug>-os/operations/devops/`
- Role primária para setup: `<product-slug>-os/operations/devops/roles/github-devops.role.md`
- Skill primária: `<product-slug>-os/operations/devops/skills/configure-github-project/SKILL.md`
- Playbook primário: `<product-slug>-os/operations/devops/playbooks/configure-github-project.playbook.md`
- Owner do trabalho de produto: `<product-slug>-os/operations/product-ops/AGENT.md`
- Limite de capability: `.github/leanos/capability-contract.md`

## Contrato De Rota

Quando DevOps está inativo:

```text
Root AGENT.md
-> leanos.yaml
-> active .leanos/index/*
-> activation_required: operations.devops
```

Quando DevOps está ativo:

```text
Root AGENT.md
-> <product-slug>-os/operations/devops/AGENT.md
-> <product-slug>-os/operations/devops/roles/github-devops.role.md
-> <product-slug>-os/operations/devops/skills/configure-github-project/SKILL.md
-> <product-slug>-os/operations/devops/playbooks/configure-github-project.playbook.md
-> .github/leanos/setup-guide.md
-> .github/leanos/project-sync.yaml
-> .github/leanos/sync-state.yaml
-> .github/leanos/work-mapping.md
-> <product-slug>-os/operations/product-ops/AGENT.md
-> <product-slug>-os/operations/product-ops/epics/
-> .github/leanos/capability-contract.md
-> Output
```

## Regras

- O modelo deve declarar se está em modo setup ou modo de dry-run sync.
- O modelo não deve pedir que o founder cole um token no chat.
- O modelo não deve imprimir valores de token.
- O modelo não deve criar issues do GitHub para ideias brutas, notas de backlog ou Epics não quebrados.
- O modelo não deve tratar GitHub sync como prova de que uma Feature está pronta para desenvolvimento.
- O modelo deve parar antes de escrita remota, a menos que o founder confirme o dry-run.
- O modelo deve ler `.github/leanos/capability-contract.md` antes de descrever qualquer handoff de execução.
- O Epic canônico é `<product-slug>-os/operations/product-ops/epics/<epic-slug>/epic.md`; `README.md` é fallback legado e mapa de pasta.
- O modelo não deve transformar Epic ou Feature local rica em issue de um parágrafo.
- O modelo deve exigir milestone quando o item local marcado para sync tiver milestone obrigatório.
- O modelo deve incluir Size, Effort, Priority, Area, Roadmap Item e Epic no payload de GitHub Projects quando existirem localmente.
- O modelo deve verificar o remoto depois da escrita antes de marcar localmente `sync_status: synced`.
- O modelo deve atualizar `github_issue.url` nos arquivos locais de Epic e Feature somente depois da verificação remota passar.

## Checklist De Conclusão

- [x] GitHub sync começa por intenção em linguagem natural no `AGENT.md` raiz.
- [x] A ativação de DevOps é obrigatória antes de paths de DevOps serem carregados.
- [x] Readiness vem antes do dry-run sync.
- [x] Epics/Features locais de Product Ops são a fonte da verdade para sync.
- [x] Escrita remota exige confirmação de dry-run e handoff de capability.
- [x] Payload preserva body rico, metadata, milestone, fields de Project e relações Epic/Feature.
- [x] Capability precisa fazer read-back verification antes de considerar sync concluído.
- [x] Após verificação, arquivos locais recebem `github_issue.url` e `sync_status: synced`.
