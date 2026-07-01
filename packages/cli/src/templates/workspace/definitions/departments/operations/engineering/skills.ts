import type { SkillDefinition } from "../../../../types.js";

export const operationsEngineeringSkills: SkillDefinition[] = [
    {
      slug: "implementation-planning",
      title: "Planejar Implementação",
      purpose: "Transformar uma Feature pronta em um plano técnico escopado antes de alterar código.",
      useWhen: ["uma Feature local ou issue do GitHub mapeada deve ser implementada", "uma correção de bug precisa de escopo", "o trabalho de implementação precisa de sequência"],
      requiredContext: ["Corpo da Feature ou da issue do GitHub mapeada", "Feature implementation packet em ../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md quando existir", "PRD", "Escopo do MVP", "Critérios de aceite", "Regras de implementação de Engineering", "Padrões de código"],
      inputs: ["Feature", "Epic ou PRD vinculado", "Critérios de aceite", "Padrões atuais do repositório", "Riscos conhecidos"],
      process: ["Resuma a Feature no chat", "Leia o packet em `../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md` quando a Feature tiver packet", "Identifique arquivos ou módulos provavelmente envolvidos", "Classifique impacto de Design, Security e dados", "Planeje os menores passos seguros de implementação", "Identifique testes e validação", "Peça confirmação antes de alterar código quando o escopo estiver incerto"],
      checks: ["O plano de implementação permanece dentro do escopo da Feature", "O packet foi lido ou a ausência foi tratada como lacuna de readiness", "Padrões existentes do repositório são preferidos", "Dependências e riscos estão explícitos", "O roteamento para Design/Security/Data está explícito quando aplicável"],
      outputs: ["Resumo da Feature", "Plano de implementação", "Arquivos provavelmente envolvidos", "Testes a executar ou adicionar", "Riscos", "Pergunta de confirmação quando necessário"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` somente quando decisões de implementação precisarem persistir."],
      redLines: ["Não comece mudanças de código sem contexto de branch", "Não comece implementação normal sem packet pronto ou lacuna aceita pelo founder", "Não expanda escopo silenciosamente", "Não pule classificação de Design/Security/Data."]
    },
    {
      slug: "follow-code-standards",
      title: "Seguir Padrões De Código",
      purpose: "Aplicar padrões de código do projeto, modularidade, nomenclatura e regras contra hardcoding.",
      useWhen: ["ao escrever ou revisar código", "ao escolher um padrão", "ao dividir arquivos ou componentes", "ao decidir se uma nova abstração deve existir"],
      requiredContext: ["Padrões de código", "Regras de implementação", "Padrões existentes do repositório"],
      inputs: ["Área de código alvo", "Arquivos existentes", "Mudança proposta", "Convenções conhecidas do projeto"],
      process: ["Inspecione padrões próximos", "Escolha o menor padrão compatível", "Separe UI, estado, acesso a dados, validação e efeitos colaterais quando prático", "Evite segredos, config, copy ou valores de Design hardcoded", "Mantenha funções e componentes focados", "Documente qualquer desvio intencional"],
      checks: ["Nenhuma nova abstração desnecessária", "Nenhum componente ou arquivo grande e sem estrutura", "Nenhuma regra de negócio escondida", "Nenhuma lógica duplicada quando há padrão reutilizável local"],
      outputs: ["Decisão de padrão", "Notas de modularidade", "Riscos de hardcoding", "Recomendação de refatorar ou não refatorar"],
      filesToUpdate: ["Atualize `../knowledge/code-standards.md` somente quando o usuário confirmar uma mudança durável de padrão."],
      redLines: ["Não invente arquitetura que o repositório não precisa", "Não hardcode valores que pertencem a config, dados, design tokens ou fontes de copy."]
    },
    {
      slug: "component-implementation",
      title: "Implementar Componente",
      purpose: "Implementar componentes de UI reutilizáveis a partir de uma especificação de componente de Design antes da tela ou Feature dependente.",
      useWhen: ["uma Feature exige um novo componente voltado ao usuário", "Design produziu ou confirmou uma especificação de componente", "uma tela depende de um componente reutilizável que ainda não existe", "comportamento, estados ou acessibilidade do componente precisam existir antes da entrega da Feature"],
      requiredContext: ["Feature ou issue de Feature no GitHub", "Feature implementation packet", "Especificação de componente de Design em ../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md quando Feature-scoped", "Product UI Spec", "Inventário de componentes de Design", "Design system", "Baseline de acessibilidade", "Diretrizes de componentes de Engineering", "Padrões de código", "Estratégia de testes"],
      inputs: ["Especificação de componente aprovada", "Critérios de aceite da Feature pai", "Padrões de componentes existentes", "Design tokens", "Requisitos de acessibilidade", "Estados esperados", "Convenções de UI do repositório"],
      process: ["Leia a Feature e confirme por que o componente é necessário", "Leia o Feature implementation packet antes de alterar código", "Leia a especificação de componente de Design antes de alterar código", "Prefira `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md` quando a spec for Feature-scoped", "Verifique `../../design/knowledge/product-ui-spec.md` para confirmar o padrão de produto que o componente suporta", "Verifique `../../design/knowledge/component-inventory.md` e código próximo para encontrar componente reutilizável existente", "Carregue `../../design/knowledge/design-system.md`, `../../design/knowledge/accessibility.md` e `../knowledge/component-guidelines.md`", "Implemente o componente reutilizável antes da tela ou Feature que o consome", "Mantenha estilo, copy, variantes, estados, Product UI Spec e acessibilidade alinhados ao contrato de Design", "Separe comportamento reutilizável do componente da lógica pontual da tela", "Adicione testes, exemplos, stories ou notas de validação manual quando o repositório suportar"],
      checks: ["O componente segue a especificação de Design", "Product UI Spec, Design tokens e requisitos de acessibilidade são respeitados", "Não existe componente duplicado", "O componente é reutilizável e componível", "Estados obrigatórios são tratados", "Lógica de fluxo específica da Feature fica fora do componente reutilizável", "Testes ou lacunas de validação estão explícitos"],
      outputs: ["Plano de implementação do componente", "Arquivos alterados", "Estados cobertos", "Notas de acessibilidade", "Testes ou validação manual", "Lacunas conhecidas", "Próximo passo de implementação da tela ou Feature"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` quando decisões de implementação de componente precisarem persistir.", "Não atualize especificações de componente de Design sem roteamento de volta para Design e confirmação do usuário."],
      redLines: ["Não implemente um novo componente voltado ao usuário sem uma especificação de Design ou confirmação explícita de Design", "Não hardcode cores, espaçamento, copy, regras de negócio ou estados que pertencem a Design, dados ou configuração", "Não misture código de componente reutilizável com comportamento pontual de tela quando a separação for prática", "Não contorne estados de acessibilidade, comportamento de teclado ou requisitos de foco."]
    },
    {
      slug: "feature-branching",
      title: "Criar Branch",
      purpose: "Definir um nome de branch seguro e vinculado à Feature, com checklist de criação antes de alterar código.",
      useWhen: ["a implementação está prestes a começar", "uma Feature local ou issue do GitHub mapeada foi selecionada", "o nome da branch precisa de validação", "um fix, chore, docs ou spike precisa de branch segura"],
      requiredContext: ["Slug da Feature local ou número da issue do GitHub", "Título da Feature ou mudança", "Regras de branch"],
      inputs: ["Slug da Feature ou número da issue", "Título da Feature ou mudança", "Tipo de branch", "Nomes de branch existentes quando disponíveis"],
      process: ["Carregue as regras de branch", "Gere um nome de branch vinculado à Feature, issue, fix, chore, docs ou spike", "Use `feature/...` para Features apenas locais e `issue/...` para issues do GitHub mapeadas", "Use `fix/...` para bug vinculado a issue, `chore/...` para manutenção, `docs/...` para documentação e `spike/...` para investigação técnica aprovada", "Mantenha o nome da branch curto e descritivo", "Verifique conflitos com nomes de branch existentes", "Peça confirmação antes de reutilizar ou substituir uma branch"],
      checks: ["A branch inclui o número da issue quando o formato exige", "A branch usa o slug da Feature quando não há número de issue", "O nome da branch não inclui segredos nem termos vagos", "A branch segue a convenção do repositório"],
      outputs: ["Nome de branch proposto", "Comando ou plano de branch", "Notas de segurança"],
      filesToUpdate: ["Não atualize arquivos apenas para criar um plano de branch."],
      redLines: ["Não crie nem reutilize uma branch sem confirmação explícita do founder.", "Não crie branch a partir de ideia solta, item de roadmap ou Epic não quebrado.", "Não inclua segredos, dados de cliente ou escopo vago em nomes de branch."]
    },
    {
      slug: "test-coverage",
      title: "Escrever Testes",
      purpose: "Definir ou atualizar testes e evidência de validação para comportamento alterado antes da prontidão de PR.",
      useWhen: ["comportamento mudou", "correções de bug precisam de cobertura de regressão", "critérios de aceite exigem validação", "antes de implementar comportamento quando test-first for viável", "validação manual é a única opção prática", "lacunas de teste do PR precisam de explicação"],
      requiredContext: ["Estratégia de testes", "Critérios de aceite", "Comportamento alterado", "Padrões de teste existentes", "Riscos conhecidos", "Comandos de validação"],
      inputs: ["Escopo de implementação", "Comportamento alterado", "Critérios de aceite", "Padrões de teste existentes", "Áreas de risco", "Comandos de teste disponíveis"],
      process: ["Identifique o comportamento alterado e o critério de aceite que ele prova", "Para bugs ou comportamento determinístico, escreva ou identifique primeiro o teste falhando e verifique RED antes da implementação quando viável", "Escolha unitário, integração, e2e ou validação manual com base em risco e padrões do repositório", "Mapeie cada teste ou check manual para critérios de aceite", "Verifique GREEN após a implementação ou documente o comando exato/evidência de validação manual", "Liste lacunas de teste honestamente, com motivo e o que as fecharia"],
      checks: ["Testes provam comportamento, não detalhes de implementação", "Evidência RED/GREEN existe quando test-first é viável", "Testes executados ou passos de validação manual são concretos e reproduzíveis", "Comportamento arriscado tem cobertura ou explicação explícita de lacuna de teste"],
      outputs: ["Plano de testes", "Evidência RED/GREEN", "Mudanças de teste", "Validação manual", "Explicação de lacuna de teste", "Riscos conhecidos"],
      filesToUpdate: ["Atualize `../knowledge/implementation-notes.md` somente quando decisões persistentes de teste forem úteis."],
      redLines: ["Não trate testes escritos depois da implementação como evidência RED/GREEN.", "Não alegue que validação manual cobre edge cases não testados sem passos concretos.", "Não alegue cobertura sem execução de teste, plano de teste ou lacuna explícita de validação.", "Não esconda lacunas de teste ou comportamento arriscado não testado.", "Não teste detalhes de implementação quando comportamento de aceite pode ser testado."]
    },
    {
      slug: "data-change-review",
      title: "Revisar Mudança De Dados",
      purpose: "Revisar banco de dados, API, persistência, migração e mudanças sensíveis a dados antes da implementação ou aprovação do PR.",
      useWhen: ["há modelo de dados, migração, contrato de API, persistência, auth, permissões, privacidade ou dados sensíveis envolvidos"],
      requiredContext: ["Diretrizes de dados", "Contexto de Security quando dados sensíveis estão envolvidos", "Critérios de aceite", "Schema atual ou padrões de API"],
      inputs: ["Mudança de dados proposta", "Sensibilidade dos dados", "Necessidade de migração", "Expectativa de rollback", "Requisitos de compatibilidade"],
      process: ["Classifique a sensibilidade dos dados", "Identifique impacto em schema ou API", "Verifique validação e autorização", "Verifique implicações de migração e rollback", "Verifique necessidade de índice/performance", "Roteie para Security quando houver risco de privacidade/auth/compliance"],
      checks: ["Nenhuma mudança destrutiva sem confirmação", "Nenhuma exposição de dados sensíveis", "Compatibilidade retroativa foi considerada", "Caminho de rollback está visível"],
      outputs: ["Revisão de mudança de dados", "Riscos", "Notas de migração", "Resultado de roteamento para Security", "Notas de rollback"],
      filesToUpdate: ["Atualize `../knowledge/data-guidelines.md` somente após confirmação explícita."],
      redLines: ["Não aprove mudanças destrutivas de dados sem confirmação explícita e notas de rollback.", "Não pule roteamento para Security quando auth, privacidade, compliance ou dados sensíveis estiverem envolvidos.", "Não armazene segredos, credenciais ou dados sensíveis de cliente em notas."]
    },
    {
      slug: "pull-request",
      title: "Criar PR",
      purpose: "Preparar um pacote de PR revisável, vinculado ao escopo da Feature, testes, Founder Testing Guide e riscos.",
      useWhen: ["a implementação está pronta para revisão", "a descrição do PR precisa de estrutura", "o risco de merge precisa ser comunicado", "o founder precisa de um caminho de validação em linguagem simples"],
      requiredContext: ["Template de PR", "Issue vinculada", "Notas de implementação", "Testes executados", "Riscos conhecidos", "Requisitos do Founder Testing Guide", "Convenção de título do PR", "Notas de deploy ou rollback quando aplicáveis"],
      inputs: ["Branch", "Issue vinculada", "Arquivos alterados", "Testes", "Riscos", "Screenshots ou notas de UX quando aplicável", "URL de preview ou rota local quando disponível", "Impacto de deploy ou rollback quando aplicável"],
      process: ["Confirme a Feature local ou issue do GitHub vinculada e a branch atual", "Carregue o template de PR", "Defina o Título do PR em formato Conventional Commit quando fizer sentido", "Resuma escopo, não objetivos e notas de implementação", "Liste arquivos alterados que importam para revisão", "Inclua testes executados, validação manual e explicação de lacuna de teste", "Escreva o Founder Testing Guide em linguagem simples com onde testar, como testar e resultado esperado", "Sinalize aplicabilidade de Design/Security/Data/DevOps", "Marque o Status de prontidão como draft, founder-ready, blocked-by-tests ou blocked-by-context", "Preencha Deploy / Rollback quando houver impacto em deploy, migração, rollback, observabilidade ou monitoramento", "Liste riscos conhecidos e follow-up", "Depois que o PR for criado, responda: `Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora? Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.` Se o founder aceitar a revisão, carregue `playbooks/pr-validation.playbook.md` antes de qualquer recomendação de merge"],
      checks: ["O PR referencia a issue ou Feature local", "O título do PR segue a convenção quando aplicável", "Testes executados ou explicação de lacuna de teste estão presentes", "O Founder Testing Guide é usável por um founder não técnico", "Aplicabilidade de Design/Security/Data/DevOps está explícita quando relevante", "Notas de Deploy / Rollback existem quando aplicáveis", "A descrição não esconde risco conhecido", "A resposta final do PR inclui: `Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.`"],
      outputs: ["Título do PR em formato Conventional Commit", "Corpo do PR", "Founder Testing Guide", "Resumo de testes", "Status de prontidão do PR", "Deploy / Rollback", "Notas de risco", "Convite pós-PR para rodar `playbooks/pr-validation.playbook.md`", "Lembrete pós-merge: `Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.`"],
      filesToUpdate: ["Atualize `../knowledge/pr-log.md` após a criação do PR ou quando o usuário pedir um registro persistente de PR."],
      redLines: ["Não prepare um PR sem escopo de Feature ou issue vinculada.", "Não omita testes, lacunas de validação ou riscos conhecidos do corpo do PR.", "Não marque um PR como founder-ready sem testes, lacunas e riscos documentados.", "Não marque um PR como founder-ready sem Founder Testing Guide usável."]
    },
    {
      slug: "pull-request-review",
      title: "Revisar PR",
      purpose: "Revisar mudanças de PR por correção, escopo, evidência e prontidão de merge no LeanOS.",
      useWhen: ["revisar um PR", "validar prontidão da implementação", "verificar risco de merge", "fazer code review"],
      requiredContext: ["Critérios de revisão", "Regras de validação de PR", "Issue vinculada", "PRD", "Critérios de aceite", "Arquivos alterados", "Testes", "Founder Testing Guide"],
      inputs: ["Descrição do PR", "Diff", "Issue vinculada", "Testes", "Founder Testing Guide", "Riscos conhecidos", "Screenshots ou URL de preview quando aplicável"],
      process: ["Verifique escopo contra issue, PRD e critérios de aceite", "Revise evidência incluindo testes, validação manual, screenshots, URL de preview e Founder Testing Guide", "Revise padrões de código e arquivos alterados", "Revise aplicabilidade de Design/Security/Data/DevOps somente quando relevante", "Liste achados por severidade com referência de arquivo/linha ou artefato quando possível", "Declare evidência revisada e lacunas de evidência antes da recomendação de merge", "Recomende merge, mudanças ou blocked"],
      checks: ["Achados são acionáveis", "Severidade está clara", "Achados acionáveis incluem arquivo/linha ou referência de artefato quando possível", "O founder consegue testar o PR sem ler código", "Design/Security/Data não são forçados quando não aplicáveis", "A recomendação de merge é justificada por evidência"],
      outputs: ["Achados por severidade", "Evidência revisada", "Resultado de escopo", "Resultado de código", "Resultado de aceite do founder", "Resultado de testes", "Resultado de Design ou não aplicável", "Resultado de Security/Data ou não aplicável", "Recomendação de merge"],
      filesToUpdate: ["Atualize `../knowledge/code-review-notes.md` ou `../knowledge/pr-log.md` somente quando o usuário pedir notas persistentes de revisão."],
      redLines: ["Não faça recomendação de merge sem evidência revisada e evidência de validação do PR.", "Não esconda achados bloqueantes abaixo de resumos ou notas nice-to-have.", "Não ignore critérios de Product, Design, Security ou Data quando aplicáveis."]
    }
  ];
