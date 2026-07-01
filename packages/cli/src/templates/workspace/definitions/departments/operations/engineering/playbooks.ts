import type { PlaybookDefinition } from "../../../../types.js";

export const operationsEngineeringPlaybooks: PlaybookDefinition[] = [
    {
      slug: "engineering-delivery",
      title: "Entrega De Engineering",
      purpose: "Orquestrar o caminho interno de Engineering de uma Feature pronta até branch, implementação, testes, PR e validação de PR.",
      useWhen: ["uma Feature passou pelo ready-to-develop", "a implementação deve começar", "Engineering precisa da ordem segura de execução", "o founder pede para implementar uma Feature"],
      beforeActing: ["../AGENT.md", "../../product-ops/knowledge/ready-to-develop.md", "../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md", "../../product-ops/epics/README.md", "../knowledge/implementation-rules.md", "../knowledge/code-standards.md", "../knowledge/component-guidelines.md", "../knowledge/data-guidelines.md", "../knowledge/workspace-hygiene.md", "../knowledge/testing-strategy.md", ".github/leanos/branch-rules.md", ".github/leanos/pr-validation-rules.md"],
      inputs: ["Feature local confirmada ou issue de Feature do GitHub mapeada", "Feature implementation packet", "Resultado ready-to-develop", "Epic pai", "Critérios de aceite", "Especificação de tela ou componente de Design quando aplicável", "Prontidão de Security e DevOps quando aplicável", "Regras de branch", "Regras de validação de PR"],
      steps: [
        "Confirme que a solicitação é uma Feature pronta, não uma ideia solta, item de roadmap ou Epic não quebrado",
        "Confirme a prontidão de Product Ops em `../../product-ops/knowledge/ready-to-develop.md`",
        "Leia o Feature implementation packet em `operations/product-ops/knowledge/implementation-packets/<feature-slug>/README.md`; se estiver ausente ou bloqueado, volte para Product Ops antes de branch/código",
        "Use `playbooks/branch-for-feature.playbook.md` antes de editar código",
        "Use `skills/implementation-planning/SKILL.md` para resumir a Feature, arquivos prováveis, riscos e testes",
        "Se um novo componente reutilizável for necessário, confirme a especificação de componente aprovada por Design antes do código e execute `playbooks/component-implementation.playbook.md` primeiro",
        "Use `skills/follow-code-standards/SKILL.md` durante a implementação para preservar modularidade, padrões locais e regras contra hardcoding",
        "Use `skills/temporary-artifact-hygiene/SKILL.md` sempre que criar script temporário, probe local, arquivo de debug ou antes de preparar PR",
        "Use `skills/data-change-review/SKILL.md` quando dados, API, persistência, auth, permissões ou privacidade estiverem envolvidos",
        "Use `skills/test-coverage/SKILL.md` para adicionar ou atualizar testes, ou explicar claramente a lacuna de teste",
        "Execute um Temporary Artifact Sweep antes de `playbooks/prepare-pr.playbook.md`",
        "Use `playbooks/prepare-pr.playbook.md` para preparar escopo do PR, notas de teste, riscos, Founder Testing Guide e screenshots ou notas de UX quando aplicável",
        "Use `playbooks/pr-validation.playbook.md` antes de recomendar prontidão de merge"
      ],
      gates: [
        "Não edite código antes de uma branch vinculada à Feature ser criada ou confirmada.",
        "Não edite código antes de ler o Feature implementation packet ou registrar que a lacuna foi aceita explicitamente pelo founder.",
        "Não implemente um novo componente voltado ao usuário sem uma especificação de componente aprovada por Design quando prontidão de componente for aplicável.",
        "Não abra nem prepare um PR sem testes, notas de validação manual ou explicação clara de lacuna de teste.",
        "Não abra nem prepare um PR com scripts temporários, probes locais ou arquivos de debug sem owner, propósito, documentação e comando oficial.",
        "Não marque um PR como pronto para revisão do founder sem um Founder Testing Guide que explique onde e como testar a mudança.",
        "Não recomende merge antes de `playbooks/pr-validation.playbook.md` estar completo.",
        "Não expanda além do escopo confirmado da Feature sem confirmação do founder."
      ],
      securityGate: [
        "Pare antes da implementação quando gatilhos de Security se aplicarem e não houver prontidão de Security.",
        "Pare antes de migração de dados, mudanças destrutivas de dados ou mudanças de permissão sem confirmação explícita e notas de rollback.",
        "Não comite segredos, tokens, credenciais ou dados sensíveis de cliente."
      ],
      outputs: ["Nome e status da branch", "Plano de implementação", "Arquivos alterados", "Resumo de implementação de componente quando aplicável", "Temporary Artifact Sweep", "Testes executados ou explicação de lacuna de teste", "Resumo do rascunho de PR", "Founder Testing Guide", "Resultado de validação do PR", "Riscos restantes e próximo passo"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` quando decisões de implementação precisarem persistir.", "Atualize `../knowledge/pr-log.md` após a criação do PR ou quando o usuário pedir registros persistentes de PR."],
      stopConditions: [
        "A prontidão da Feature está ausente ou bloqueada.",
        "O Feature implementation packet está ausente, draft, pending ou blocked.",
        "Nenhuma branch vinculada à Feature pode ser criada ou confirmada.",
        "Uma especificação obrigatória de componente de Design está ausente.",
        "Prontidão de Security ou DevOps é obrigatória e está ausente.",
        "A implementação excederia o escopo confirmado da Feature.",
        "Testes não podem ser executados e nenhuma validação manual útil pode ser descrita.",
        "A validação do PR encontra risco bloqueante."
      ]
    },
    {
      slug: "branch-for-feature",
      title: "Branch Para Feature",
      purpose: "Criar um plano seguro de branch antes do início da implementação.",
      useWhen: ["uma Feature pronta vai começar implementação e precisa de branch vinculada", "uma issue do GitHub mapeada precisa de nome de branch seguro antes de editar código", "o tipo de mudança exige convenção feature, issue, fix, chore, docs ou spike"],
      inputs: ["Slug da Feature local ou número da issue do GitHub", "Título da Feature", "Branch padrão atual", "Lista de branches existentes quando disponível", "Regras de branch", "Skill: feature-branching"],
      steps: ["Use este playbook como etapa de branch de `engineering-delivery.playbook.md`; retorne para engineering-delivery depois que o status da branch estiver claro", "Leia o contexto e o título da Feature", "Carregue `.github/leanos/branch-rules.md`", "Use `skills/feature-branching/SKILL.md` para gerar um nome de branch no formato obrigatório de Feature/GitHub", "Use `feature/...` para Features apenas locais e `issue/...` para issues do GitHub mapeadas", "Use `fix/...` para correção de bug vinculada a issue, `chore/...` para manutenção interna, `docs/...` para documentação e `spike/...` para investigação técnica aprovada", "Verifique palavras sensíveis ou escopo desnecessário", "Peça confirmação antes de usar uma branch existente ou criar uma nova"],
      outputs: ["Nome de branch proposto", "Feature ou issue do GitHub vinculada", "Notas de segurança da branch", "Próximo passo de implementação"],
      filesToUpdate: ["Não atualize arquivos apenas para criar um plano de branch. Registre decisões de branch em `../knowledge/implementation-notes.md` somente quando o usuário pedir notas persistentes."]
    },
    {
      slug: "component-implementation",
      title: "Implementação De Componente",
      purpose: "Implementar um componente reutilizável a partir de uma especificação aprovada por Design antes da tela ou Feature que depende dele.",
      useWhen: ["uma Feature depende de novo componente reutilizável aprovado por Design", "uma especificação de componente existe no implementation packet e precisa virar código", "uma tela ou fluxo não deve ser implementado antes do componente base estar pronto e validado"],
      inputs: ["Feature ou issue de Feature no GitHub", "Feature implementation packet", "Approved Design component spec", "Especificação aprovada de componente de Design", "Product UI Spec", "Inventário de componentes de Design", "Design system", "Baseline de acessibilidade", "Diretrizes de componentes de Engineering", "Padrões de código", "Estratégia de testes", "Skill: component-implementation"],
      steps: ["Use este playbook como etapa de componente de `engineering-delivery.playbook.md`; retorne para engineering-delivery antes de implementar a tela ou Feature dependente", "Leia o AGENT de Engineering e escolha a role Senior Developer", "Leia a Feature e confirme que um componente reutilizável é necessário", "Leia o Feature implementation packet antes de alterar código", "Carregue a especificação de componente de Design antes de alterar código, preferindo `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md` quando a spec for Feature-scoped", "Carregue `../../design/knowledge/product-ui-spec.md`, `../../design/knowledge/component-inventory.md`, `../../design/knowledge/design-system.md` e `../../design/knowledge/accessibility.md`", "Carregue `knowledge/component-guidelines.md`, `knowledge/code-standards.md` e `knowledge/testing-strategy.md`", "Use `skills/component-implementation/SKILL.md` para planejar a implementação do componente", "Inspecione padrões de componentes existentes antes de criar um novo arquivo", "Crie ou confirme uma branch vinculada à Feature antes de editar código", "Implemente o componente reutilizável antes da tela ou Feature que o consome", "Valide estados obrigatórios, comportamento de teclado, comportamento de foco e notas de acessibilidade", "Adicione testes, exemplos, stories ou notas de validação manual quando o repositório suportar", "Resuma a prontidão do componente antes de continuar para a tela ou Feature dependente"],
      outputs: ["Plano de implementação do componente", "Branch usada", "Arquivos alterados", "Estados implementados", "Validação de acessibilidade", "Testes ou validação manual", "Lacunas conhecidas", "Decisão de continuar para implementação da tela ou Feature"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` quando decisões de implementação de componente precisarem persistir.", "Não atualize especificações de componente de Design sem roteamento de volta para Design e confirmação do usuário."]
    },
    {
      slug: "prepare-pr",
      title: "Preparar PR",
      purpose: "Preparar um pull request revisável a partir de uma implementação de Feature confirmada.",
      useWhen: ["uma implementação terminou e precisa virar PR revisável", "branch, testes, riscos e Founder Testing Guide precisam ser organizados antes de abrir PR", "o PR precisa comunicar escopo, não objetivos, deploy/rollback e Temporary Artifact Sweep"],
      inputs: ["Corpo da issue do GitHub", "Epic pai quando disponível", "Escopo do MVP", "PRD", "Critérios de aceite", "Critérios de Product, Design, Engineering e Security", "Nome da branch", "Knowledge de Engineering", "Workspace hygiene"],
      steps: ["Use este playbook como etapa de preparação de PR de `engineering-delivery.playbook.md`; não use antes de o status de implementação e testes estar claro", "Leia o AGENT de Engineering e escolha a role Senior Developer", "Leia a Feature ou issue do GitHub mapeada, PRD, escopo do MVP e critérios de aceite", "Confirme prontidão da Feature com critérios de Product e Engineering", "Verifique se critérios de Design são obrigatórios para UX voltada ao usuário", "Verifique se critérios de Security/Data são obrigatórios para dados, auth, privacidade, abuso ou compliance", "Crie ou confirme uma branch vinculada à Feature antes de mudanças de código", "Use `skills/implementation-planning/SKILL.md` para planejar a implementação", "Execute `playbooks/component-implementation.playbook.md` antes de trabalho de tela ou Feature quando um novo componente reutilizável for necessário", "Use `skills/follow-code-standards/SKILL.md` ao alterar código", "Use `skills/temporary-artifact-hygiene/SKILL.md` para executar um Temporary Artifact Sweep antes do PR", "Use `skills/data-change-review/SKILL.md` quando dados/API/persistência estiverem envolvidos", "Use `skills/test-coverage/SKILL.md` para atualizar testes ou explicar lacunas", "Use `skills/pull-request/SKILL.md` para preparar o PR usando o template de PR", "Preencha o Título do PR em formato Conventional Commit quando fizer sentido", "Preencha o Status De Prontidão como draft, founder-ready, blocked-by-tests ou blocked-by-context", "Preencha o `Founder Testing Guide` com passos em linguagem simples, onde testar, resultado esperado, notas fora de escopo e limites conhecidos", "Preencha o Temporary Artifact Sweep com scripts removidos, scripts permanentes justificados e riscos de dados/secrets/API/banco", "Preencha Deploy / Rollback quando houver impacto em deploy, migração, rollback, observabilidade ou monitoramento", "Se não houver URL de preview, forneça a rota local, comando ou fallback manual que o founder consiga usar de forma realista", "Depois que o PR for criado, diga: `Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora? Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.` Se o founder aceitar a revisão, siga para `playbooks/pr-validation.playbook.md`"],
      outputs: ["Título do PR em formato Conventional Commit", "Resumo de implementação", "Status De Prontidão", "Branch usada", "Arquivos alterados", "Temporary Artifact Sweep", "Testes executados ou propostos", "Founder Testing Guide", "Deploy / Rollback", "Rascunho de PR", "Convite pós-PR para revisão", "Lembrete pós-merge: `Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.`", "Riscos conhecidos"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` quando decisões de implementação precisarem persistir.", "Atualize `../knowledge/pr-log.md` após a criação do PR ou quando o usuário pedir um registro persistente de PR."]
    },
    {
      slug: "test-planning",
      title: "Planejamento De Testes",
      purpose: "Planejar validação para trabalho de implementação sem armazenar instruções procedurais de teste como arquivos soltos da área.",
      useWhen: ["uma mudança de comportamento precisa de cobertura automatizada ou validação manual explícita", "critérios de aceite precisam ser mapeados para testes antes de PR", "lacunas de teste precisam ser classificadas por risco e explicadas ao founder"],
      inputs: ["Escopo de implementação", "PRD", "Critérios de aceite", "Comportamento alterado", "Riscos conhecidos", "Estratégia de testes", "Skill: test-coverage"],
      steps: ["Leia `knowledge/testing-strategy.md`", "Identifique o comportamento alterado", "Use `skills/test-coverage/SKILL.md` para escolher validação automatizada e manual", "Mapeie testes para critérios de aceite", "Identifique lacunas arriscadas", "Resuma prontidão de validação"],
      outputs: ["Estratégia de testes", "Lacunas de validação", "Checks manuais", "Próxima ação"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` ou notas de PR se o workspace precisar de uma decisão persistente de teste."]
    },
    {
      slug: "pr-validation",
      title: "Validação De PR",
      purpose: "Validar a implementação antes do merge.",
      useWhen: ["um PR foi criado e o founder aceitou rodar revisão", "uma implementação precisa ser comparada contra Feature, packet, specs, critérios de aceite e testes antes do merge", "há risco de merge sem Founder Testing Guide, Temporary Artifact Sweep ou gates de Design/Security/Data aplicáveis"],
      inputs: ["Descrição do PR", "Issue vinculada", "Feature implementation packet", "Product UI Spec quando UI mudou", "Epic pai quando disponível", "Escopo do MVP", "PRD", "Critérios de aceite", "Arquivos alterados", "Testes ou evidência de validação", "Founder Testing Guide", "Temporary Artifact Sweep", "Critérios de revisão"],
      steps: ["Use este playbook como etapa final de validação de `engineering-delivery.playbook.md`; não recomende merge antes de esta revisão estar completa", "Leia o AGENT de Engineering e escolha PR Reviewer ou Test Engineer conforme necessário", "Leia o contexto do PR", "Leia o Feature implementation packet quando existir e compare o PR contra Feature, screen specs, component specs e gates aplicáveis", "Quando UX/UI mudou, leia `../../design/knowledge/product-ui-spec.md` e compare shell, menus, forms, tables, panels, action priority, feedback patterns e reusable layout contra o PR", "Carregue `.github/leanos/pr-validation-rules.md` e `knowledge/review-criteria.md`", "Use `skills/pull-request-review/SKILL.md` para verificar escopo contra issue, PRD e MVP", "Use `skills/follow-code-standards/SKILL.md` para verificar qualidade de código", "Use `skills/temporary-artifact-hygiene/SKILL.md` para revisar temporary scripts or scratch files", "Bloqueie debug-*, temp-*, scratch-*, check-* or verify-* sem owner, propósito, documentação e comando oficial", "Use `skills/data-change-review/SKILL.md` quando dados/API/persistência estiverem envolvidos", "Valide critérios de Product e critérios de aceite", "Revise o Founder Testing Guide e confirme que um founder não técnico consegue testar o PR", "Revise critérios de Design somente quando UX mudou", "Revise critérios de Security somente quando dados, auth, privacidade, abuso ou compliance estiverem envolvidos", "Revise testes e validação manual", "Liste achados por severidade", "Recomende merge, mudanças ou blocked-by-context"],
      outputs: ["Achados por severidade", "Alinhamento de Product", "Resultado de qualidade de código", "Resultado de aceite do founder", "Resultado de revisão de Design ou não aplicável", "Resultado de revisão de Security/Data ou não aplicável", "Confiança de teste", "Recomendação de merge"],
      filesToUpdate: ["Atualize `../knowledge/code-review-notes.md` ou `../knowledge/pr-log.md` somente quando o usuário pedir notas persistentes de revisão."]
    }
  ];
