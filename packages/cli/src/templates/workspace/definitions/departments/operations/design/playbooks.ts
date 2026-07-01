import type { PlaybookDefinition } from "../../../../types.js";

export const operationsDesignPlaybooks: PlaybookDefinition[] = [
    {
      slug: "design-foundation",
      title: "Design Foundation",
      purpose: "Create the MVP design foundation from product strategy and MVP scope before implementation.",
      useWhen: ["um MVP ou primeira superfície de produto precisa de baseline visual antes de Engineering", "Design system, acessibilidade ou fluxos primários ainda não existem para guiar telas", "Product Ops ou Engineering precisa de critérios de Design para evitar UI improvisada"],
      inputs: ["Product brief", "ICP", "MVP scope", "Primary user flows", "Accessibility needs", "Brand or product constraints", "Skills: design-system, product-ui-spec, accessibility, user-flow-mapping"],
      steps: ["Read Product and MVP context", "Use `skills/design-system/SKILL.md` to define the design system baseline", "Use `skills/product-ui-spec/SKILL.md` only when product-level UI patterns such as shell, menus, forms, tables, panels or action priority are needed", "Use `skills/accessibility/SKILL.md` to define accessibility expectations for the MVP audience", "Use `skills/user-flow-mapping/SKILL.md` to map primary user flows", "Identify missing context", "Propose updates to Design knowledge files before writing"],
      outputs: ["Design system baseline", "Product UI Spec baseline mínima quando aplicável", "Accessibility baseline", "Primary user flows", "Perguntas abertas", "Confirmation question before file updates"],
      filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation.", "Update `../knowledge/product-ui-spec.md` only after explicit confirmation.", "Update `../knowledge/accessibility.md` only after explicit confirmation.", "Update `../knowledge/user-flows.md` only after explicit confirmation."]
    },
    {
      slug: "product-ui-spec-readiness",
      title: "Product UI Spec Readiness",
      purpose: "Create or update the product-level UI pattern contract before Design writes screen specs, component specs or sends UI work to Engineering.",
      useWhen: ["a new product surface needs its first UI shell or pattern", "a Feature introduces or changes menus, tables, forms, panels, action priority or navigation", "screen-readiness needs a product pattern that does not exist yet", "post-merge should promote a shipped UI pattern"],
      beforeActing: ["../AGENT.md", "../knowledge/design-system.md", "../knowledge/product-ui-spec.md", "../knowledge/component-inventory.md", "../knowledge/components/README.md", "../../../.leanos/standard/templates/design/product-ui-spec-template.md", "skills/product-ui-spec/SKILL.md"],
      inputs: ["Brief de produto", "Escopo do MVP", "Feature implementation packet quando aplicável", "Design system", "Product UI Spec existente", "Component inventory", "Documentação durável de componentes", "Template: ../../../.leanos/standard/templates/design/product-ui-spec-template.md"],
      steps: ["Leia `../knowledge/product-ui-spec.md` e `../knowledge/design-system.md` antes de propor um padrão de UI.", "Identifique se o pedido segue um padrão existente, estende um padrão, precisa de novo padrão, está bloqueado por contexto ou não se aplica.", "Use `skills/product-ui-spec/SKILL.md` para produzir exatamente uma decisão: `follow_existing_pattern`, `extend_existing_pattern`, `create_new_pattern`, `blocked_by_missing_context` ou `not_applicable`.", "Use `skills/product-ui-spec/SKILL.md` para manter o Product UI Spec progressive, not speculative.", "Para um produto novo ou primeira superfície de webapp, crie a menor baseline de Product UI Spec necessária para a primeira tela, como shell, navegação, prioridade de ações e layout primário.", "Para uma variação específica de Feature, documente primeiro no Feature implementation packet e marque se promoção será necessária.", "Use `../../../.leanos/standard/templates/design/product-ui-spec-template.md` ao criar a primeira baseline ou uma seção relevante de padrão.", "Inclua status do padrão, origem, exemplos de uso, antipadrões, critérios para atualizar e regras de conteúdo/microcopy quando aplicáveis.", "Depois da prontidão do Product UI Spec, roteie para `screen-readiness.playbook.md` para screen specs ou `component-readiness.playbook.md` para specs de componentes reutilizáveis.", "Peça confirmação antes de atualizar `../knowledge/product-ui-spec.md`, `../knowledge/components/<component-slug>.md` ou `../knowledge/component-inventory.md`."],
      gates: ["Product UI Spec é checado antes de screen-readiness quando shell, menu, tabela, form, painel, prioridade de ação ou navegação estiverem envolvidos.", "A decisão é exatamente uma de: `follow_existing_pattern`, `extend_existing_pattern`, `create_new_pattern`, `blocked_by_missing_context` ou `not_applicable`.", "Novos padrões estão ligados a uma tela, fluxo, componente ou PR entregue real.", "Padrões existentes são reutilizados a menos que uma divergência seja justificada.", "Uso de tokens aponta para `design-system.md`.", "Labels, empty states, erros e action labels recorrentes são tratados em Conteúdo E Microcopy."],
      outputs: ["Product UI Spec readiness result: `follow_existing_pattern`, `extend_existing_pattern`, `create_new_pattern`, `blocked_by_missing_context` ou `not_applicable`", "Existing pattern followed or new pattern proposed", "Status do padrão", "Origem do padrão", "Exemplos de uso", "Antipadrões", "Critérios para atualizar", "Product UI Spec update proposal", "Component docs affected", "Screen-readiness or component-readiness next route", "Blocking gaps"],
      filesToUpdate: ["Update `../knowledge/product-ui-spec.md` only after explicit confirmation.", "Promote durable components to `../knowledge/components/<component-slug>.md` only after Design confirmation.", "Update `../knowledge/component-inventory.md` only when component status, spec path or code path changes."],
      stopConditions: ["Stop if the proposed pattern is hypothetical and not tied to a real product surface.", "Stop if the pattern duplicates an existing Product UI Spec pattern under a new name.", "Stop before Engineering when Product UI Spec alignment is blocked or unclear for user-facing UI."]
    },
    {
      slug: "component-readiness",
      title: "Component Readiness",
      purpose: "Prepare a Design component decision or component spec when a Feature needs UI/component clarity before Engineering.",
      useWhen: ["uma Feature precisa reutilizar, adaptar ou criar um componente de UI antes de Engineering", "component inventory não deixa claro se já existe componente adequado", "um novo componente precisa de spec com uso, não uso, estados, tokens, acessibilidade e handoff"],
      inputs: ["Feature or GitHub Feature issue", "Feature implementation packet", "Parent Epic when available", "Design system knowledge", "Product UI Spec", "Accessibility knowledge", "User-flow knowledge", "Component inventory", "Durable component docs", "Template: ../../../.leanos/standard/templates/design/component-spec-template.md", "Skill: component-analysis"],
      steps: ["Read the Feature goal, acceptance criteria and UI impact.", "Read `../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md` when it exists; ask Product Ops to create it when missing.", "Read `../knowledge/design-system.md`, `../knowledge/product-ui-spec.md`, `../knowledge/accessibility.md`, `../knowledge/user-flows.md`, `../knowledge/component-inventory.md` and relevant durable docs in `../knowledge/components/`.", "Use `skills/component-analysis/SKILL.md` to classify reuse, adapt, create-new, not-applicable or blocked.", "If reuse is enough, document the chosen component, Product UI Spec pattern and usage notes in the Feature implementation packet.", "If adaptation is needed, define what changes and whether the Product UI Spec or durable component doc must be updated.", "If a new component is needed, use `../../../.leanos/standard/templates/design/component-spec-template.md` to draft the component contract in `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md` with O Que É, Quando Usar, Quando Não Usar, Dicas De Usabilidade, Faça / Não Faça, tokens and Evidência De Handoff.", "Update `../knowledge/component-inventory.md` after confirmation with status specified, not implemented.", "Return the Design readiness result to Product Ops and Engineering."],
      securityGate: ["Stop if accessibility, focus, keyboard behavior, contrast or error-state risk is unclear for a new user-facing component.", "Stop if the component would collect, display or modify sensitive user data and Security has not reviewed the relevant risk."],
      outputs: ["Component readiness result", "Reuse/adapt/create-new decision", "Component spec draft when required", "Inventory update proposal", "Evidência De Handoff", "Engineering handoff notes", "Blocking gaps"],
      filesToUpdate: ["Update `../knowledge/component-inventory.md` only after explicit confirmation and use status `specified, not implemented` until post-merge.", "Create or update `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/component-specs/<component-slug>.md` only for a real Feature after confirmation.", "Promote to `../knowledge/components/<component-slug>.md` only when the component becomes durable reusable Design knowledge."],
      stopConditions: ["Stop if the Feature is hypothetical or not tied to a real delivery need.", "Stop if a new component is needed but the component spec cannot be drafted from available Product, Design and accessibility context.", "Stop before Engineering if the component decision is blocked or missing founder confirmation."]
    },
    {
      slug: "screen-readiness",
      title: "Screen Readiness",
      purpose: "Prepare a concrete Design screen spec in the Feature implementation packet before Engineering implements a user-facing screen, page, form, modal or stateful view.",
      useWhen: ["a Feature changes a concrete screen, page, form, modal, flow state or user-facing view", "Engineering needs implementable UI structure before coding", "PR validation will need a Design artifact to compare against"],
      beforeActing: ["../AGENT.md", "../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md", "../knowledge/design-system.md", "../knowledge/product-ui-spec.md", "../knowledge/accessibility.md", "../knowledge/user-flows.md", "../../../.leanos/standard/templates/design/screen-spec-template.md", "skills/screen-specification/SKILL.md"],
      inputs: ["Feature implementation packet", "Feature acceptance criteria", "Parent Epic", "User-flow knowledge", "Design system", "Product UI Spec", "Accessibility baseline", "Component readiness result when reusable UI is involved", "Template: ../../../.leanos/standard/templates/design/screen-spec-template.md"],
      steps: ["Read the local Feature and packet README before writing Design artifacts.", "Confirm the concrete screen, state, form, modal or page that needs specification.", "Read `../knowledge/product-ui-spec.md` and confirm which product pattern the screen follows.", "If no product pattern covers shell, menu, table, form, panel, action priority or navigation, route to `product-ui-spec-readiness.playbook.md` before writing the screen spec.", "Use `skills/screen-specification/SKILL.md` to define purpose, layout hierarchy, Product UI Spec compliance, content, actions, default/loading/empty/error/success states, accessibility and Engineering handoff.", "Use `../../../.leanos/standard/templates/design/screen-spec-template.md` as the structure.", "Make the screen spec reference the Product UI Spec pattern used, durable component docs, divergence proposal, whether Product UI Spec update is needed and Evidência De Handoff.", "Write the spec proposal to `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md` only after confirmation.", "Update the packet README gate for Design with the screen spec path and status.", "If reusable components are needed and missing, route to `playbooks/component-readiness.playbook.md` before Engineering."],
      gates: ["Feature implementation packet exists or Product Ops agrees to create it first.", "Screen is concrete enough to specify.", "Product UI Spec compliance is explicit or `product-ui-spec-readiness.playbook.md` is used first.", "Required states and accessibility implications are explicit.", "Evidência De Handoff includes spec path, component docs, Product UI Spec checked, screenshot/preview expectation and validation in PR.", "Open questions are listed before Engineering.", "Founder confirms before writing the screen spec file."],
      outputs: ["Screen readiness result", "Screen spec path", "Default/loading/empty/error/success states", "Product UI Spec pattern used", "Durable component docs referenced", "Divergence proposal", "Component dependencies", "Accessibility notes", "Evidência De Handoff", "Engineering handoff notes", "Blocking gaps"],
      filesToUpdate: ["Create or update `../../product-ops/knowledge/implementation-packets/<feature-slug>/design/screen-specs/<screen-slug>.md` only after explicit confirmation.", "Update `../../product-ops/knowledge/implementation-packets/<feature-slug>/README.md` Design gate only after confirmation.", "Do not create screen specs in `../knowledge/`; Design knowledge keeps reusable foundation, not Feature-specific screen contracts."],
      stopConditions: ["Stop if the Feature is hypothetical or not tied to a real delivery need.", "Stop if the screen cannot be named or tied to a user outcome.", "Stop if required states, accessibility or content are too unclear for Engineering handoff.", "Stop before Engineering if the Design gate remains blocked."]
    },
    {
      slug: "user-research",
      title: "User Research",
      purpose: "Clarify design-relevant user evidence before making UX decisions.",
      useWhen: ["uma decisão de UX depende de comportamento, dor ou contexto do usuário ainda incerto", "feedback, pesquisa ou suposição de uso precisa ser separado antes de desenhar fluxo", "Design precisa recomendar o menor próximo passo de pesquisa sem atrasar o MVP inteiro"],
      inputs: ["Product brief", "ICP", "Validation assumptions", "Known user behavior", "Open design questions", "Skill: user-research"],
      steps: ["Read product and validation context", "Use `skills/user-research/SKILL.md` to separate evidence from assumptions", "Identify design-relevant user needs", "Identify open research questions", "Recommend the smallest next research step"],
      outputs: ["User evidence summary", "Design assumptions", "Open research questions", "Recommended next step"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only when the user confirms a design-relevant flow change."]
    },
    {
      slug: "mvp-ux-flow",
      title: "MVP UX Flow",
      purpose: "Create a usable flow for the first validation cycle.",
      useWhen: ["o MVP Validation Scope precisa virar fluxo primário de usuário antes de telas ou código", "o founder precisa visualizar etapas, estados e fricções do primeiro ciclo de validação", "Product Ops ou Engineering precisa de um fluxo UX mínimo para orientar screen specs"],
      inputs: ["ICP", "MVP scope", "User-flow knowledge", "Accessibility baseline", "Skills: user-flow-mapping, screen-specification when a concrete screen exists"],
      steps: ["Read ICP and MVP scope", "Use `skills/user-flow-mapping/SKILL.md` to map the primary flow", "Check accessibility expectations", "Use `skills/screen-specification/SKILL.md` only when a concrete screen, page, form or modal needs definition", "For Feature-specific screen specs, route to `screen-readiness.playbook.md` so the artifact lands in the Feature implementation packet", "Record proposed Design knowledge updates"],
      outputs: ["Primary UX flow", "Edge cases", "Required screens", "Screen-specification needs when applicable", "Perguntas abertas"],
      filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."]
    },
    {
      slug: "accessibility-review",
      title: "Accessibility Review",
      purpose: "Review design foundation or UX flow for accessibility expectations.",
      useWhen: ["um fluxo, tela ou componente user-facing pode afetar teclado, foco, contraste, forms ou mensagens de erro", "Design Foundation ou screen spec precisa de critérios mínimos de acessibilidade antes de Engineering", "PR validation ou handoff precisa checar riscos de acessibilidade aplicáveis"],
      inputs: ["Accessibility knowledge", "Design system baseline", "User flows", "MVP audience and constraints", "Skills: accessibility, design-review when general UX evaluation is needed"],
      steps: ["Read accessibility baseline", "Use `skills/accessibility/SKILL.md` to check audience needs, keyboard, focus, contrast, forms, errors and screen-reader implications", "Use `skills/design-review/SKILL.md` when the request needs a broader UX/design result", "List accessibility gaps"],
      outputs: ["Accessibility review", "Gaps", "Required follow-up", "Not applicable notes when justified"],
      filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."]
    },
    {
      slug: "ux-writing",
      title: "UX Writing",
      purpose: "Define clear interface language for MVP flows.",
      useWhen: ["um fluxo ou tela precisa de labels, helper text, empty states, erros ou mensagens de sucesso", "copy de interface pode afetar clareza, acessibilidade ou confiança do usuário", "Engineering precisa implementar microcopy consistente em uma Feature user-facing"],
      inputs: ["Product positioning", "User flows", "Accessibility expectations", "Usuário alvo context", "Skill: microcopy"],
      steps: ["Read product and flow context", "Use `skills/microcopy/SKILL.md` to identify labels, helper text, empty states, errors, success messages and onboarding hints", "Draft concise copy", "Check clarity and accessibility", "List open copy questions"],
      outputs: ["Microcopy draft", "Tone notes", "Accessibility notes", "Perguntas abertas"],
      filesToUpdate: ["Não crie arquivos de copy específicos de tela até uma tela ou feature concreta exigir."]
    }
  ];
