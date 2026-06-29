import type { RootDepartmentDefinition } from "../../types.js";
import { operationsProductOpsArea } from "./operations/product-ops/index.js";
import { operationsDesignArea } from "./operations/design/index.js";
import { operationsEngineeringArea } from "./operations/engineering/index.js";
import { operationsDevopsArea } from "./operations/devops/index.js";
import { operationsSecurityArea } from "./operations/security/index.js";

export const operationsDepartment: RootDepartmentDefinition = {
  key: "operations",
  name: "Operations",
  purpose: "Own product operations, design, engineering, DevOps and security for delivery.",
  requestTypes: "delivery scope, issue readiness, design, engineering, implementation, DevOps or security",
  areas: [operationsProductOpsArea, operationsDesignArea, operationsEngineeringArea, operationsDevopsArea, operationsSecurityArea],
  workflows: [
    {
      slug: "feature-to-delivery-cycle",
      purpose: "Coordinate Operations areas from Feature interpretation to readiness, component/design checks, branch, implementation, review and PR.",
      requiredAreas: ["product-ops", "engineering"],
      founderTriggers: [
        "vamos comecar essa feature",
        "implemente a feature",
        "implemente a issue #554",
        "podemos iniciar o desenvolvimento?",
        "essa feature ja pode ir para codigo?"
      ],
      owner: {
        department: "operations",
        primaryArea: "product-ops",
        supportingAreas: ["engineering"],
        conditionalAreas: ["design", "security", "devops"]
      },
      conditionalAreas: [
        { area: "design", when: "Enter before Engineering when the Feature affects UI, screens, flows, copy, accessibility, interaction, design system usage or reusable components." },
        { area: "security", when: "Enter before Engineering when the Feature touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk." },
        { area: "devops", when: "Enter before Engineering when the Feature touches environments, CI/CD, deploy, observability, config, GitHub sync or release readiness." }
      ],
      phases: [
        "Intake - accept only a local Feature or mapped GitHub Feature issue.",
        "Product Ops readiness - identify the Feature, parent Epic, delivery scope and ready-to-develop state.",
        "Conditional area readiness - resolve Design, Security and DevOps applicability before Engineering.",
        "Engineering delivery - delegate branch, implementation and tests to `engineering-delivery.playbook.md`.",
        "PR preparation - prepare PR scope, test notes, risks and Founder Testing Guide through `prepare-pr.playbook.md`.",
        "PR validation - validate implementation through `pr-validation.playbook.md` before merge readiness.",
        "Founder handoff - explain the result, remaining risks and the next decision in founder-friendly language."
      ],
      loadFirst: [
        "AGENT.md",
        "operations/AGENT.md",
        "operations/workflows/README.md",
        "operations/workflows/feature-to-delivery-cycle.workflow.md",
        "operations/product-ops/AGENT.md",
        "operations/product-ops/knowledge/work-taxonomy.md",
        "operations/product-ops/knowledge/ready-to-develop.md",
        "operations/product-ops/epics/README.md"
      ],
      navigationRoute: [
        "AGENT.md",
        "operations/AGENT.md",
        "operations/workflows/feature-to-delivery-cycle.workflow.md",
        "operations/product-ops/AGENT.md",
        "operations/product-ops/knowledge/ready-to-develop.md",
        "operations/design/AGENT.md when UI, flow, accessibility, copy or component readiness is needed",
        "operations/security/AGENT.md when security risk is involved",
        "operations/devops/AGENT.md when delivery infrastructure is involved",
        "operations/engineering/AGENT.md",
        "operations/engineering/roles/senior-developer.role.md",
        "operations/engineering/playbooks/engineering-delivery.playbook.md",
        "operations/engineering/playbooks/branch-for-feature.playbook.md through engineering-delivery",
        "operations/engineering/playbooks/component-implementation.playbook.md through engineering-delivery when a component spec is approved and needed",
        "operations/engineering/playbooks/prepare-pr.playbook.md through engineering-delivery",
        "operations/engineering/playbooks/pr-validation.playbook.md through engineering-delivery"
      ],
      steps: [
        "Accept only a local Feature or GitHub Feature issue as input; do not start from a loose idea, roadmap item or unsplit Epic",
        "Load Product Ops through `operations/product-ops/AGENT.md` first to identify the Feature, parent Epic, delivery scope and readiness state",
        "Run `operations/product-ops/knowledge/ready-to-develop.md` before branch, code or PR work",
        "If Design, Security or DevOps is required but the area is inactive, return `activation_required: operations.<area>` instead of loading missing area paths or inventing the answer",
        "If the Feature affects UI, screens, flows, copy, accessibility or reusable components, route Design before Engineering",
        "Ask Design to confirm whether the Feature can reuse an existing component, adapt an existing component or needs a new component contract",
        "If a new component spec is needed and no approved spec exists, route to `operations/design/playbooks/component-readiness.playbook.md` before branch or code",
        "Route Security only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved",
        "Route DevOps only when environments, CI/CD, deploy, observability, configuration, GitHub sync or release readiness are affected",
        "Record why Design, Security or DevOps are not applicable when they do not enter the flow",
        "After Product Ops, Design, Security and DevOps readiness are ready or explicitly not applicable, route to `operations/engineering/AGENT.md` and load `operations/engineering/playbooks/engineering-delivery.playbook.md`",
        "This workflow coordinates gates and handoffs; `engineering-delivery.playbook.md` executes the Feature-linked branch, implementation, tests, PR preparation and PR validation",
        "Use `operations/engineering/playbooks/engineering-delivery.playbook.md` to create or confirm the Feature-linked branch, plan implementation, run component implementation when needed, update code and execute tests",
        "Run tests or explain gaps",
        "Use `operations/engineering/playbooks/prepare-pr.playbook.md` through engineering-delivery to prepare PR scope, test notes, risks, Founder Testing Guide and PR draft before founder review",
        "Use `operations/engineering/playbooks/pr-validation.playbook.md` through engineering-delivery after PR preparation and before recommending merge readiness",
        "Make clear that PR opened does not mean merge-ready until founder acceptance and PR validation are complete"
      ],
      confirmationGates: [
        "Peça confirmação antes de criar ou atualizar arquivos locais de Feature.",
        "Peça confirmação antes de criar ou alterar especificações de componente de Design.",
        "Peça confirmação antes de criar uma branch.",
        "Peça confirmação antes de editar código de produto.",
        "Peça confirmação antes de marcar o PR pronto para review do founder quando o Founder Testing Guide estiver incompleto.",
        "Peça confirmação antes de rodar ações externas do GitHub, abrir PR ou mudar estado remoto.",
        "Peça confirmação antes de instalar dependências, alterar arquivos do package manager ou adicionar tooling."
      ],
      allowedUpdates: [
        "operations/product-ops/epics/<epic-slug>/<feature-slug>.md",
        "operations/design/knowledge/components/<component-slug>.md after Design confirmation",
        "product source files required by the confirmed Feature after branch confirmation",
        "tests required by the confirmed Feature",
        "pull request draft or description after implementation review"
      ],
      forbiddenUpdates: [
        "loose roadmap items or unsplit Epics as implementation input",
        "roles/",
        "skills/",
        "playbooks/",
        "workflows/",
        "ai-standard/",
        ".leanos/",
        ".github/ without explicit GitHub step confirmation",
        ".env",
        ".env.local",
        "production deployment state"
      ],
      externalCapabilities: [
        "GitHub branch and PR actions are allowed only after Feature readiness and explicit founder confirmation.",
        "Não faça merge de PRs automaticamente.",
        "Não faça deploy para produção a partir deste workflow.",
        "Não trate presença de issue do GitHub como prova de que a Feature está pronta para desenvolver."
      ],
      stopConditions: [
        "The request is a loose idea, roadmap item or unsplit Epic instead of a Feature.",
        "The Feature cannot be mapped to a local Feature or GitHub Feature issue.",
        "`ready-to-develop.md` shows missing Product Ops, Design, Security, DevOps or Engineering readiness.",
        "Design, Security or DevOps is required but inactive; return `activation_required: operations.<area>` instead of loading missing paths.",
        "A required Design component spec is missing.",
        "Security or DevOps triggers apply and cannot be resolved or marked not applicable with a reason.",
        "The founder does not confirm branch, code changes, external actions or PR preparation.",
        "Tests cannot be run or meaningfully replaced with a documented validation plan."
      ],
      expectedOutput: [
        "Feature readiness summary.",
        "Design, Security and DevOps applicability notes with reasons.",
        "Component readiness decision before Engineering when UI components are affected.",
        "Branch name and implementation plan after confirmation.",
        "Code and test changes summary.",
        "Founder Testing Guide with where to test, how to test and expected result.",
        "PR validation summary with risks, gaps and remaining checks.",
        "Founder-friendly next-step recommendation."
      ],
      continuationBridge: {
        immediate: "A implementacao esta pronta para revisao.\nQuer que eu conduza a validacao do PR antes do merge?",
        laterTriggers: ["revise o PR", "esta pronto para merge?", "mergeado, vamos para a proxima", "o PR foi aprovado", "o que fazemos depois do merge?"],
        nextRoute: "post-merge-continuation",
        rules: [
          "Não faça merge automaticamente.",
          "Run PR validation before recommending merge readiness.",
          "If the founder confirms merge happened, restart from Root `AGENT.md` and route to `post-merge-continuation`.",
          "If the PR is not ready, explain the gap and stay inside Engineering review assets."
        ]
      }
    },
    {
      slug: "post-merge-continuation",
      purpose: "Continue delivery after a founder confirms a merge without losing product, engineering, release or learning context.",
      founderTriggers: [
        "mergeado, vamos para a proxima",
        "o PR foi mergeado",
        "terminamos essa feature",
        "o que fazemos depois do merge?",
        "atualiza o contexto depois do merge",
        "qual a proxima feature?"
      ],
      owner: {
        department: "operations",
        primaryArea: "product-ops",
        supportingAreas: ["engineering"],
        conditionalAreas: ["devops", "security", "growth/customer-experience", "strategy/roadmap"]
      },
      requiredAreas: ["product-ops", "engineering"],
      conditionalAreas: [
        { area: "devops", when: "the merged Feature needs release notes, deployment, environment checks, rollback notes or observability follow-up" },
        { area: "security", when: "the merged Feature touched auth, permissions, data exposure, payments, privacy, API boundaries or abuse risk" },
        { area: "growth/customer-experience", when: "the merged Feature affects onboarding, activation, customer learning, support, launch notes or feedback collection" },
        { area: "strategy/roadmap", when: "the merge changes roadmap priority, milestone status, delivery scope or learning that affects product direction" }
      ],
      loadFirst: [
        "AGENT.md",
        "operations/AGENT.md",
        "operations/workflows/README.md",
        "operations/workflows/post-merge-continuation.workflow.md",
        "operations/product-ops/AGENT.md",
        "operations/product-ops/knowledge/work-taxonomy.md",
        "operations/product-ops/knowledge/issue-readiness.md",
        "operations/product-ops/epics/README.md",
        "operations/engineering/AGENT.md",
        "operations/engineering/knowledge/pr-log.md",
        "operations/engineering/knowledge/implementation-notes.md"
      ],
      navigationRoute: [
        "AGENT.md",
        "operations/AGENT.md",
        "operations/workflows/post-merge-continuation.workflow.md",
        "operations/product-ops/AGENT.md",
        "operations/product-ops/roles/product-owner.role.md",
        "operations/engineering/AGENT.md",
        "operations/engineering/roles/pr-reviewer.role.md",
        "operations/devops/AGENT.md when release, deployment or observability follow-up is needed",
        "operations/security/AGENT.md when the merged Feature has security-sensitive impact",
        "growth/AGENT.md when customer learning, support or launch feedback should be captured",
        "strategy/AGENT.md when roadmap, milestone or delivery-scope decisions changed"
      ],
      steps: [
        "Confirm the merged PR, local Feature or GitHub Feature issue. If the founder only says \"mergeado\", ask which PR or Feature before writing.",
        "Map the merge back to the local Epic and Feature in `operations/product-ops/epics/` or to the confirmed GitHub Feature issue.",
        "Summarize what shipped in founder-friendly language: user impact, technical scope, tests, risks and what did not ship.",
        "Compare the merged work against the Feature acceptance criteria, Resultado de validação do PR and Founder Testing Guide.",
        "Propose the smallest local status/context updates before writing anything.",
        "Ask whether release, deployment, environment or observability follow-up is needed. If yes, route DevOps through `operations/devops/AGENT.md` before any deploy action.",
        "Ask whether the merge touched auth, permissions, data, privacy, payments, APIs or abuse risk. If yes, route Security through `operations/security/AGENT.md` before declaring the Feature fully safe.",
        "Ask whether customer learning, support notes or launch feedback should be captured. If yes, bridge to Growth after the Operations update.",
        "Identify remaining Features in the same Epic and the next likely route, but do not choose priority automatically.",
        "Oferta the founder one clear next step: release/deploy follow-up, next Feature in the Epic, roadmap review or customer learning loop."
      ],
      confirmationGates: [
        "Peça confirmação antes de atualizar status local de Epic ou Feature.",
        "Peça confirmação antes de atualizar status de Epic/Feature de Product Ops, PR log de Engineering ou notas de implementação.",
        "Peça confirmação antes de rotear para follow-up de DevOps, Security, Growth ou Strategy.",
        "Peça confirmação antes de iniciar o próximo ciclo de delivery de Feature.",
        "Peça confirmação antes de qualquer escrita no GitHub, deploy, ação de release, branch, mudança de código ou ação de PR."
      ],
      allowedUpdates: [
        "operations/product-ops/epics/<epic-slug>/<feature-slug>.md",
        "operations/product-ops/knowledge/issue-readiness.md",
        "operations/engineering/knowledge/pr-log.md",
        "operations/engineering/knowledge/implementation-notes.md",
        "operations/devops/knowledge/release-notes.md only after DevOps routing and founder confirmation",
        "growth/customer-experience/knowledge/customer-feedback.md only after Growth routing and founder confirmation",
        "strategy/roadmap/knowledge/current-cycle.md only after Strategy/Roadmap routing and founder confirmation"
      ],
      forbiddenUpdates: [
        "código-fonte, componentes, testes ou arquivos de produto",
        "branches, commits, PR creation, PR merge or deploy actions",
        ".github/ or GitHub remote state without an explicit GitHub sync/release step",
        "roadmap priority or delivery-scope changes without Strategy/Roadmap handoff",
        "parent Epic completion when only one Feature was merged",
        "new Features, Epics or roadmap items without routing to the proper workflow",
        "roles/, skills/, playbooks/, workflows/, commands/ or ai-standard/"
      ],
      externalCapabilities: [
        "GitHub may be read only when the founder provides or confirms a PR, issue or repository reference.",
        "Não escreva no GitHub a partir deste workflow a menos que um futuro workflow de sync/release do GitHub seja explicitamente confirmado.",
        "Não faça deploy, merge, criação de branches, criação de PRs ou automação de release a partir deste workflow.",
        "If external evidence is unavailable, rely on the founder confirmation and clearly mark it as founder-confirmed."
      ],
      stopConditions: [
        "The merged PR, Feature or issue cannot be identified.",
        "The founder has not confirmed that merge happened.",
        "Local Feature state and GitHub state conflict and cannot be reconciled safely.",
        "PR validation was blocked, tests failed or founder testing was not accepted.",
        "The request shifts into new implementation, deploy, roadmap reprioritization or GitHub write without confirmation.",
        "A required route file is missing."
      ],
      expectedOutput: [
        "Founder-friendly shipped summary.",
        "Feature/Epic state update proposal.",
        "Engineering PR log or implementation note proposal.",
        "Release, DevOps, Security, Growth and Strategy follow-up applicability with reasons.",
        "Remaining Epic progress summary.",
        "One clear next-step bridge."
      ],
      continuationBridge: {
        immediate: "Essa feature foi mergeada.\nQuer que eu prepare o proximo passo: release/deploy, proxima feature do mesmo Epic, revisao de prioridade ou aprendizado com usuarios?",
        laterTriggers: [
          "mergeado, vamos para a proxima",
          "o PR foi mergeado",
          "qual a proxima feature?",
          "atualiza depois do merge",
          "terminamos essa feature"
        ],
        nextRoute: "feature-to-delivery-cycle",
        rules: [
          "Não inicie automaticamente a próxima Feature.",
          "If release or deploy is chosen, route to DevOps first.",
          "If roadmap priority changed, route to Strategy/Roadmap first.",
          "If customer learning is chosen, route to Growth/Customer Experience first.",
          "If the founder chooses the next Feature, restart from Root `AGENT.md` and route to `feature-to-delivery-cycle`."
        ]
      }
    }
  ]
};
