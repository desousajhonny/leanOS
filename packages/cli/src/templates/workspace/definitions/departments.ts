import type { RootDepartmentDefinition } from "../types.js";
import { assumptionsRegister, checklist, companyProfile, decisionLog, folderReadme, learningLog, productBrief, riskiestAssumptions, stateDraft, titledDraft, validationExperiments, validationSuccessMetrics } from "../content/shared.js";

export const rootDepartments: RootDepartmentDefinition[] = [
  {
    key: "strategy",
    name: "Strategy",
    purpose: "Own company direction, product strategy, roadmap and validation learning.",
    requestTypes: "company, product strategy, roadmap, validation, ICP or assumptions",
    areas: [
      {
        key: "strategy.company",
        root: "strategy",
        slug: "company",
        name: "Company",
        path: "strategy/company",
        routingKey: "company",
        requestTypes: "company, mission, vision, principles or operating model",
        purpose: "Keep company identity, principles, mission and operating decisions coherent.",
        whenToUse: ["define company", "clarify mission", "capture principles", "record strategic decisions"],
        sourceOfTruth: ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "decision-log.md"],
        files: [
          { path: "profile.md", content: companyProfile },
          { path: "mission.md", content: () => titledDraft("Mission", "Define why the company exists and who it serves.") },
          { path: "vision.md", content: () => titledDraft("Vision", "Describe the future state this company wants to create.") },
          { path: "principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
          { path: "operating-model.md", content: () => titledDraft("Operating Model", "Define how the company operates with humans and AI models.") },
          { path: "decision-log.md", content: () => decisionLog("Decision Log") }
        ],
        roles: [
          {
            slug: "company-strategist",
            title: "Company Strategist",
            purpose: "Clarify company context, principles, positioning and decision quality.",
            useWhen: ["company direction is unclear", "operating model needs definition", "a strategic decision must be recorded"],
            beforeActing: ["../profile.md", "../principles.md", "../operating-model.md", "../decision-log.md"],
            skills: ["define-company", "clarify-operating-model"],
            playbooks: ["company-foundation"]
          }
        ],
        skills: [
          { slug: "define-company", title: "Define Company", purpose: "Clarify company context, mission, principles and operating model." },
          { slug: "clarify-operating-model", title: "Clarify Operating Model", purpose: "Define how humans and AI models collaborate in the company." }
        ],
        playbooks: [
          { slug: "company-foundation", title: "Company Foundation", purpose: "Move from raw company context to usable operating principles.", steps: ["Read company profile", "Clarify mission", "List principles", "Define operating model", "Record decisions"] }
        ],
        commonPaths: [
          "Company request: role `roles/company-strategist.role.md` -> skill `skills/define-company.skill.md` -> playbook `playbooks/company-foundation.playbook.md`."
        ]
      },
      {
        key: "strategy.product",
        root: "strategy",
        slug: "product",
        name: "Product",
        path: "strategy/product",
        routingKey: "product",
        requestTypes: "product strategy, ICP, value proposition, positioning or business model",
        purpose: "Own product strategy, ICP, value proposition, positioning and business model coherence.",
        whenToUse: ["define strategy", "clarify ICP", "shape value proposition", "check product coherence"],
        sourceOfTruth: ["brief.md", "problem.md", "icp.md", "jobs-to-be-done.md", "value-proposition.md", "positioning.md", "business-model-canvas.md"],
        files: [
          { path: "brief.md", content: productBrief },
          { path: "problem.md", content: () => titledDraft("Problem", "Define the painful, frequent and valuable problem.") },
          { path: "icp.md", content: () => titledDraft("Ideal Customer Profile", "Define the first customer segment to validate.") },
          { path: "jobs-to-be-done.md", content: () => titledDraft("Jobs To Be Done", "Describe the job the customer is trying to get done.") },
          { path: "value-proposition.md", content: () => titledDraft("Value Proposition", "Define promise, outcome, proof and differentiation.") },
          { path: "positioning.md", content: () => titledDraft("Positioning", "Define category, audience, problem and point of view.") },
          { path: "business-model-canvas.md", content: () => titledDraft("Business Model Canvas", "Define customers, channels, revenue, costs, partners and key activities.") }
        ],
        roles: [
          {
            slug: "product-strategist",
            title: "Product Strategist",
            purpose: "Connect customer, problem, value proposition, business model, roadmap and validation logic.",
            useWhen: ["strategy is unclear", "ICP or value proposition needs definition", "roadmap coherence is at risk"],
            beforeActing: ["../brief.md", "../icp.md", "../value-proposition.md", "../../roadmap/current-cycle.md"],
            skills: ["define-product", "define-icp", "define-value-proposition", "define-business-model", "check-coherence"],
            playbooks: ["product-strategy"]
          },
          {
            slug: "product-manager",
            title: "Product Manager",
            purpose: "Translate strategy into coherent scope, stories and priorities with Operations Core.",
            useWhen: ["scope needs definition", "roadmap work needs issue-ready shape", "acceptance criteria are missing"],
            beforeActing: ["../brief.md", "../../roadmap/backlog.md", "../../../operations/core/mvp/scope.md", "../../../operations/core/mvp/acceptance-criteria.md"],
            skills: ["define-product", "check-coherence"],
            playbooks: ["product-strategy"]
          }
        ],
        skills: [
          { slug: "define-product", title: "Define Product", purpose: "Clarify product brief, problem, target user and product status." },
          { slug: "define-icp", title: "Define ICP", purpose: "Define the first customer segment with pains, triggers and exclusions." },
          { slug: "define-value-proposition", title: "Define Value Proposition", purpose: "Articulate the promise, outcome, proof and differentiation." },
          { slug: "define-business-model", title: "Define Business Model", purpose: "Draft revenue, channels, costs and delivery model." },
          { slug: "check-coherence", title: "Check Coherence", purpose: "Check alignment between ICP, problem, value proposition, MVP, roadmap and issue." }
        ],
        playbooks: [
          { slug: "product-strategy", title: "Product Strategy", purpose: "Move from raw product context to coherent strategy.", steps: ["Read product brief", "Clarify ICP", "Define problem", "Define value proposition", "Check roadmap and MVP coherence"] }
        ],
        commonPaths: [
          "Product strategy request: role `roles/product-strategist.role.md` -> skill `skills/check-coherence.skill.md` -> playbook `playbooks/product-strategy.playbook.md`."
        ]
      },
      {
        key: "strategy.roadmap",
        root: "strategy",
        slug: "roadmap",
        name: "Roadmap",
        path: "strategy/roadmap",
        routingKey: "roadmap",
        requestTypes: "roadmap, milestones, backlog, cycle planning or prioritization",
        purpose: "Own roadmap sequence, milestones, backlog and validation-first prioritization.",
        whenToUse: ["sequence product work", "prioritize backlog", "define current cycle", "plan milestones"],
        sourceOfTruth: ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"],
        files: [
          { path: "roadmap.md", content: () => titledDraft("Roadmap", "Sequence product work by validation cycle.") },
          { path: "milestones.md", content: () => titledDraft("Milestones", "Define visible checkpoints.") },
          { path: "current-cycle.md", content: () => titledDraft("Current Cycle", "Define the current validation or delivery cycle.") },
          { path: "backlog.md", content: () => titledDraft("Backlog", "Collect candidate work before prioritization.") }
        ],
        roles: [
          {
            slug: "roadmap-planner",
            title: "Roadmap Planner",
            purpose: "Turn strategy and validation risk into a coherent cycle plan.",
            useWhen: ["roadmap order is unclear", "backlog needs prioritization", "cycle planning is needed"],
            beforeActing: ["../roadmap.md", "../current-cycle.md", "../backlog.md", "../../product/brief.md"],
            skills: ["create-roadmap", "prioritize-backlog"],
            playbooks: ["validation-cycle-planning"]
          }
        ],
        skills: [
          { slug: "create-roadmap", title: "Create Roadmap", purpose: "Sequence roadmap work by validation cycle and strategic priority." },
          { slug: "prioritize-backlog", title: "Prioritize Backlog", purpose: "Prioritize work by risk, learning value and delivery cost." }
        ],
        playbooks: [
          { slug: "validation-cycle-planning", title: "Validation Cycle Planning", purpose: "Plan the next coherent validation or delivery cycle.", steps: ["Read product strategy", "Read validation risk", "Review backlog", "Choose current cycle", "Record milestones"] }
        ],
        commonPaths: [
          "Roadmap request: role `roles/roadmap-planner.role.md` -> skill `skills/create-roadmap.skill.md` -> playbook `playbooks/validation-cycle-planning.playbook.md`."
        ]
      },
      {
        key: "strategy.validation",
        root: "strategy",
        slug: "validation",
        name: "Validation",
        path: "strategy/validation",
        routingKey: "validation",
        requestTypes: "assumptions, experiments, interviews, research or validation",
        purpose: "Own assumptions, experiments, interviews, success metrics and learning capture.",
        whenToUse: ["define assumptions", "plan validation", "write interview scripts", "measure success", "capture learning"],
        sourceOfTruth: ["assumptions.md", "riskiest-assumptions.md", "experiments.md", "interview-script.md", "success-metrics.md", "learning-log.md"],
        files: [
          { path: "assumptions.md", content: () => assumptionsRegister() },
          { path: "riskiest-assumptions.md", content: () => riskiestAssumptions() },
          { path: "experiments.md", content: () => validationExperiments() },
          { path: "interview-script.md", content: () => titledDraft("Interview Script", "Prepare customer discovery questions.") },
          { path: "success-metrics.md", content: () => validationSuccessMetrics() },
          { path: "learning-log.md", content: () => learningLog() }
        ],
        roles: [
          {
            slug: "validation-researcher",
            title: "Validation Researcher",
            purpose: "Design validation work that tests the riskiest product assumptions.",
            useWhen: ["research, interviews, assumptions, experiments or learning are involved"],
            beforeActing: ["../assumptions.md", "../riskiest-assumptions.md", "../experiments.md", "../success-metrics.md"],
            skills: ["define-assumptions", "create-interview-script", "define-success-metrics"],
            playbooks: ["mvp-validation"]
          }
        ],
        skills: [
          { slug: "define-assumptions", title: "Define Assumptions", purpose: "Identify and prioritize risky assumptions." },
          { slug: "create-interview-script", title: "Create Interview Script", purpose: "Write discovery questions that reduce bias." },
          { slug: "define-success-metrics", title: "Define Success Metrics", purpose: "Define signals that indicate validation progress." }
        ],
        playbooks: [
          {
            slug: "mvp-validation",
            title: "MVP Validation",
            purpose: "Run the validation loop from assumption to roadmap impact.",
            inputs: ["Product strategy", "MVP scope", "Assumption register", "Riskiest assumptions", "Experiment plan", "Success metrics"],
            steps: ["Identify the assumption being tested", "Classify the risk and why it matters", "Design the smallest experiment that can produce evidence", "Define success and failure signals before running the experiment", "Collect evidence without interpreting it as fact too early", "Separate evidence from insight", "Make or defer a decision", "Update roadmap or backlog only when the decision requires it"],
            outputs: ["Validated learning summary", "Evidence vs insight separation", "Decision or explicit no-decision", "Roadmap or backlog impact", "Next validation action"],
            filesToUpdate: ["Update `../assumptions.md` when assumptions are added or reclassified.", "Update `../riskiest-assumptions.md` when priority changes.", "Update `../experiments.md` when an experiment is planned or completed.", "Update `../success-metrics.md` when signals are defined or changed.", "Update `../learning-log.md` only when evidence supports learning.", "Propose changes to `../../roadmap/roadmap.md` or `../../roadmap/backlog.md` only after a decision is confirmed."]
          }
        ],
        commonPaths: [
          "Validation request: role `roles/validation-researcher.role.md` -> skill `skills/define-assumptions.skill.md` -> playbook `playbooks/mvp-validation.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "strategy-validation-cycle",
        purpose: "Coordinate company, product, roadmap and validation work inside Strategy.",
        requiredAreas: ["product", "roadmap", "validation"],
        steps: ["Read product strategy", "Review roadmap cycle", "Prioritize assumptions", "Plan validation", "Capture learning"]
      }
    ]
  },
  {
    key: "operations",
    name: "Operations",
    purpose: "Own MVP execution, architecture, design, engineering, DevOps and security.",
    requestTypes: "MVP, architecture, design, engineering, implementation, DevOps or security",
    areas: [
      {
        key: "operations.core",
        root: "operations",
        slug: "core",
        name: "Core",
        path: "operations/core",
        routingKey: "core",
        requestTypes: "MVP, architecture, system context, data model or technical decisions",
        purpose: "Own MVP scope, system architecture and the operating bridge between Product and Engineering.",
        whenToUse: ["define MVP", "shape acceptance criteria", "define architecture", "coordinate delivery scope"],
        sourceOfTruth: ["overview.md", "system-context.md", "data-model.md", "api-contract.md", "ai-capabilities.md", "prompt-architecture.md", "integrations.md", "technical-decisions.md", "mvp/scope.md", "mvp/user-stories.md", "mvp/acceptance-criteria.md"],
        files: [
          { path: "overview.md", content: () => titledDraft("Architecture Overview", "Describe the current or intended architecture.") },
          { path: "system-context.md", content: () => titledDraft("System Context", "Define actors, systems and boundaries.") },
          { path: "data-model.md", content: () => titledDraft("Data Model", "Describe core entities and relationships.") },
          { path: "api-contract.md", content: () => titledDraft("API Contract", "Define API inputs, outputs and errors.") },
          { path: "ai-capabilities.md", content: () => titledDraft("AI Capabilities", "Define AI features and responsibilities.") },
          { path: "prompt-architecture.md", content: () => titledDraft("Prompt Architecture", "Define prompt strategy and context boundaries.") },
          { path: "integrations.md", content: () => titledDraft("Integrations", "Document external systems and APIs.") },
          { path: "technical-decisions.md", content: () => decisionLog("Technical Decisions") },
          { path: "mvp/README.md", content: () => folderReadme("MVP", "MVP execution source-of-truth files.", "Use for MVP scope, stories, flows, acceptance criteria and release readiness.", "scope.md", ["scope.md", "user-stories.md", "user-flows.md", "acceptance-criteria.md", "non-goals.md", "release-checklist.md"], ["../", "../../../strategy/product/", "../../../strategy/roadmap/"], "MVP work is owned by Operations Core with Product/PM supervision.") },
          { path: "mvp/scope.md", content: () => titledDraft("MVP Scope", "Define the smallest coherent product scope.") },
          { path: "mvp/user-stories.md", content: () => titledDraft("User Stories", "Capture user stories in priority order.") },
          { path: "mvp/user-flows.md", content: () => titledDraft("User Flows", "Describe core MVP flows.") },
          { path: "mvp/acceptance-criteria.md", content: () => titledDraft("Acceptance Criteria", "Define completion criteria.") },
          { path: "mvp/non-goals.md", content: () => titledDraft("Non-Goals", "List what is intentionally excluded.") },
          { path: "mvp/release-checklist.md", content: () => checklist("MVP Release Checklist") }
        ],
        roles: [
          {
            slug: "product-owner",
            title: "Product Owner",
            purpose: "Own MVP execution clarity with supervision from Product and PM strategy.",
            useWhen: ["MVP scope needs definition", "acceptance criteria are unclear", "delivery scope needs coordination"],
            beforeActing: ["../mvp/scope.md", "../mvp/user-stories.md", "../mvp/acceptance-criteria.md", "../../../strategy/product/brief.md"],
            skills: ["define-mvp", "write-acceptance-criteria", "check-delivery-coherence"],
            playbooks: ["mvp-delivery"]
          },
          {
            slug: "technical-architect",
            title: "Technical Architect",
            purpose: "Define architecture boundaries, data model, APIs and AI capabilities.",
            useWhen: ["system boundaries are unclear", "API/data model is needed", "technical decisions need recording"],
            beforeActing: ["../overview.md", "../system-context.md", "../data-model.md", "../technical-decisions.md"],
            skills: ["define-architecture", "create-api-contract"],
            playbooks: ["architecture-planning"]
          }
        ],
        skills: [
          { slug: "define-mvp", title: "Define MVP", purpose: "Turn strategy into the smallest coherent validation scope." },
          { slug: "write-acceptance-criteria", title: "Write Acceptance Criteria", purpose: "Define completion criteria for MVP work." },
          { slug: "check-delivery-coherence", title: "Check Delivery Coherence", purpose: "Check that delivery scope matches strategy, roadmap and acceptance criteria." },
          { slug: "define-architecture", title: "Define Architecture", purpose: "Define system boundaries, data flow and technical decisions." },
          { slug: "create-api-contract", title: "Create API Contract", purpose: "Define API inputs, outputs, errors and ownership boundaries." }
        ],
        playbooks: [
          { slug: "mvp-delivery", title: "MVP Delivery", purpose: "Turn product strategy into executable MVP scope.", steps: ["Read product strategy", "Define MVP scope", "Write user stories", "Define acceptance criteria", "Confirm non-goals"] },
          { slug: "architecture-planning", title: "Architecture Planning", purpose: "Create enough architecture context to guide implementation.", steps: ["Read system context", "Define data model", "Define API contract", "Capture technical decisions"] }
        ],
        commonPaths: [
          "MVP request: role `roles/product-owner.role.md` -> skill `skills/define-mvp.skill.md` -> playbook `playbooks/mvp-delivery.playbook.md`.",
          "Architecture request: role `roles/technical-architect.role.md` -> skill `skills/define-architecture.skill.md` -> playbook `playbooks/architecture-planning.playbook.md`."
        ]
      },
      {
        key: "operations.design",
        root: "operations",
        slug: "design",
        name: "Design",
        path: "operations/design",
        routingKey: "design",
        requestTypes: "screens, flows, UX, UI, onboarding or usability",
        purpose: "Own UX flows, screen specs, usability states and MVP design decisions.",
        whenToUse: ["map user flows", "define screens", "design onboarding", "reason about usability", "document UX states"],
        sourceOfTruth: ["design-principles.md", "user-flows.md", "screen-specs.md", "ux-decisions.md", "usability-notes.md"],
        files: [
          { path: "design-principles.md", content: () => titledDraft("Design Principles", "Define UX principles for the product.") },
          { path: "user-flows.md", content: () => titledDraft("User Flows", "Document key user flows.") },
          { path: "screen-specs.md", content: () => titledDraft("Screen Specs", "Define screen behavior and states.") },
          { path: "ux-decisions.md", content: () => decisionLog("UX Decisions") },
          { path: "usability-notes.md", content: () => titledDraft("Usability Notes", "Capture usability observations.") }
        ],
        roles: [
          {
            slug: "ux-lead",
            title: "UX Lead",
            purpose: "Translate customer and MVP context into clear flows, screens, states and usability decisions.",
            useWhen: ["screens, flows, onboarding, UI or usability are involved"],
            beforeActing: ["../design-principles.md", "../user-flows.md", "../screen-specs.md", "../ux-decisions.md"],
            skills: ["map-user-flow", "create-screen-spec", "define-ux-states"],
            playbooks: ["mvp-ux-flow"]
          }
        ],
        skills: [
          { slug: "map-user-flow", title: "Map User Flow", purpose: "Map the steps a user takes to reach the MVP outcome." },
          { slug: "create-screen-spec", title: "Create Screen Spec", purpose: "Define screen purpose, content, states and interactions." },
          { slug: "define-ux-states", title: "Define UX States", purpose: "Define loading, empty, error, success and edge states." }
        ],
        playbooks: [
          { slug: "mvp-ux-flow", title: "MVP UX Flow", purpose: "Create a usable flow for the first validation cycle.", steps: ["Read ICP and MVP scope", "Map primary flow", "Specify screens", "Define UX states", "Record UX decisions"] }
        ],
        commonPaths: [
          "UX request: role `roles/ux-lead.role.md` -> skill `skills/map-user-flow.skill.md` -> playbook `playbooks/mvp-ux-flow.playbook.md`."
        ]
      },
      {
        key: "operations.engineering",
        root: "operations",
        slug: "engineering",
        name: "Engineering",
        path: "operations/engineering",
        routingKey: "engineering",
        requestTypes: "code, implementation, bugs, tests, issues or pull requests",
        purpose: "Own implementation, tests, code quality and PR readiness.",
        whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "write tests", "work on a GitHub issue"],
        sourceOfTruth: ["implementation-notes.md", "code-review-notes.md", "pr-log.md"],
        files: [
          { path: "implementation-notes.md", content: () => stateDraft("Implementation Notes", "Capture implementation context and decisions.") },
          { path: "code-review-notes.md", content: () => stateDraft("Code Review Notes", "Capture review observations and risks.") },
          { path: "pr-log.md", content: () => decisionLog("PR Log") }
        ],
        roles: [
          {
            slug: "senior-developer",
            title: "Senior Developer",
            purpose: "Implement roadmap issues with maintainable code, tests and MVP alignment.",
            useWhen: ["implement an issue", "fix a bug", "modify code", "write tests", "prepare implementation for a PR"],
            beforeActing: ["../../../.leanos/context/current-focus.md", "../../core/mvp/scope.md", "../../core/mvp/acceptance-criteria.md", "../../core/overview.md", "../implementation-notes.md"],
            skills: ["plan-implementation", "write-tests", "create-pr"],
            playbooks: ["issue-to-pr", "test-planning", "pr-validation"]
          },
          {
            slug: "pr-reviewer",
            title: "PR Reviewer",
            purpose: "Review pull requests against scope, tests, coherence and validation goals.",
            useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
            beforeActing: ["../../core/mvp/scope.md", "../../core/mvp/acceptance-criteria.md", "../../../.github/leanos/pr-validation-rules.md"],
            skills: ["review-pr"],
            playbooks: ["pr-validation"]
          }
        ],
        skills: [
          { slug: "plan-implementation", title: "Plan Implementation", purpose: "Turn an issue into a scoped technical implementation plan." },
          { slug: "write-tests", title: "Write Tests", purpose: "Define or update tests for changed behavior." },
          { slug: "create-pr", title: "Create PR", purpose: "Prepare a PR summary tied to scope, tests and learning." },
          { slug: "review-pr", title: "Review PR", purpose: "Review PR changes for correctness, scope and LeanOS coherence." }
        ],
        playbooks: [
          { slug: "issue-to-pr", title: "Issue to PR", purpose: "Move from a scoped issue to a reviewable pull request.", steps: ["Read issue and MVP scope", "Plan implementation", "Change code", "Update tests", "Prepare PR"] },
          {
            slug: "test-planning",
            title: "Test Planning",
            purpose: "Plan validation for implementation work without storing procedural test instructions as loose area files.",
            inputs: ["Implementation scope", "Acceptance criteria", "Changed behavior", "Known risks"],
            steps: ["Identify changed behavior", "Choose automated and manual validation", "Map tests to acceptance criteria", "Identify risky gaps", "Summarize validation readiness"],
            outputs: ["Test strategy", "Validation gaps", "Manual checks", "Next action"],
            filesToUpdate: ["Update `../implementation-notes.md` or PR notes if the workspace needs a persistent test decision."]
          },
          { slug: "pr-validation", title: "PR Validation", purpose: "Validate implementation before merge.", steps: ["Read PR context", "Check scope", "Review tests", "Check coherence", "Recommend merge or changes"] }
        ],
        commonPaths: [
          "Implementation request: role `roles/senior-developer.role.md` -> skills `skills/plan-implementation.skill.md` and `skills/write-tests.skill.md` -> playbook `playbooks/issue-to-pr.playbook.md`."
        ]
      },
      {
        key: "operations.devops",
        root: "operations",
        slug: "devops",
        name: "DevOps",
        path: "operations/devops",
        routingKey: "devops",
        requestTypes: "deployment, environments, CI, observability, GitHub Projects or operations runbooks",
        purpose: "Own delivery infrastructure, environments, deployment, GitHub workflow setup and observability notes.",
        whenToUse: ["plan deployment", "configure CI", "configure GitHub Projects", "document environments", "define observability"],
        sourceOfTruth: [],
        files: [],
        roles: [
          {
            slug: "devops-engineer",
            title: "DevOps Engineer",
            purpose: "Prepare release, environment, GitHub workflow and observability practices.",
            useWhen: ["deployment or CI is involved", "GitHub Project setup is needed", "runtime operations need documentation", "environment risk exists"],
            beforeActing: ["../README.md", "../area.yaml", "../../../.github/leanos/project-sync.yaml", "../../../.github/leanos/github-settings.example.json"],
            skills: ["setup-ci", "plan-deployment", "configure-github-project", "define-observability"],
            playbooks: ["setup-ci-cd", "plan-deployment", "configure-github-project", "configure-environments", "define-observability", "release-operations"]
          },
          {
            slug: "github-devops",
            title: "GitHub DevOps",
            purpose: "Guide safe GitHub repository, Project, labels and sync configuration without storing secrets.",
            useWhen: ["the founder wants to connect GitHub", "roadmap sync needs setup", "GitHub Project fields or labels need validation"],
            beforeActing: ["../../../.github/leanos/github-settings.example.json", "../../../.github/leanos/project-sync.yaml", "../../../.github/leanos/sync-state.yaml", "../../../.github/leanos/labels.yaml"],
            skills: ["configure-github-project"],
            playbooks: ["configure-github-project"]
          }
        ],
        skills: [
          { slug: "setup-ci", title: "Setup CI", purpose: "Define build, test and validation automation." },
          { slug: "plan-deployment", title: "Plan Deployment", purpose: "Plan safe release and rollback flow." },
          { slug: "configure-github-project", title: "Configure GitHub Project", purpose: "Guide GitHub repository, Project fields, labels and token source setup without storing secrets." },
          { slug: "define-observability", title: "Define Observability", purpose: "Define runtime visibility for the product." }
        ],
        playbooks: [
          {
            slug: "setup-ci-cd",
            title: "Setup CI/CD",
            purpose: "Plan build, test and release automation for the workspace.",
            inputs: ["Repository structure", "Build command", "Test command", "Deployment target", "Required validation gates"],
            steps: ["Identify build and test commands", "Choose required CI checks", "Define release trigger", "Document secrets or environment needs", "Define failure handling"],
            outputs: ["CI/CD readiness", "Required checks", "Automation gaps", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or GitHub workflow files if the workspace has them."]
          },
          {
            slug: "plan-deployment",
            title: "Plan Deployment",
            purpose: "Plan a safe deployment path.",
            inputs: ["Release scope", "Target environment", "Current validation status", "Known risks"],
            steps: ["Identify target environment", "Confirm required validation gates", "Define deployment steps", "Define rollback path", "Define post-deploy checks"],
            outputs: ["Deployment readiness", "Deployment steps", "Risks", "Rollback notes", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or release records if the workspace has them."]
          },
          {
            slug: "configure-github-project",
            title: "Configure GitHub Project",
            purpose: "Prepare GitHub settings for roadmap sync without calling the API directly from the model.",
            inputs: ["Founder GitHub owner or organization", "Repository name", "GitHub Project URL or number", "Desired project fields", "Token source from environment, secure prompt or keychain", "Deployment target such as Vercel when known"],
            steps: ["Read `.github/leanos/github-settings.example.json`", "Review `.github/leanos/project-sync.yaml`", "Ask for missing owner, repository, project and field mapping", "Confirm token source without asking the user to paste secrets into files", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it", "Propose the project-sync update before writing", "Validate that sync-state remains secret-free"],
            outputs: ["GitHub readiness summary", "Missing configuration", "Proposed project-sync.yaml updates", "Token-source guidance", "Vercel readiness notes", "Next action for roadmap sync"],
            filesToUpdate: ["Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/sync-state.yaml` only with non-secret sync metadata."]
          },
          {
            slug: "configure-environments",
            title: "Configure Environments",
            purpose: "Plan environment boundaries and configuration without inventing project-specific infrastructure.",
            inputs: ["Product stage", "Runtime requirements", "Secrets or integration needs", "Deployment target"],
            steps: ["Identify required environments", "Define environment responsibilities", "List configuration needs", "Identify secrets and access boundaries", "Capture open questions"],
            outputs: ["Environment plan", "Configuration needs", "Access risks", "Open questions"],
            filesToUpdate: ["Update relevant DevOps notes or environment records if the workspace has them."]
          },
          {
            slug: "define-observability",
            title: "Define Observability",
            purpose: "Define runtime visibility for logs, metrics, alerts and traces.",
            inputs: ["Critical user flows", "Failure modes", "Runtime architecture", "Support needs"],
            steps: ["Identify critical signals", "Define logs and metrics", "Choose alert conditions", "Define incident visibility", "List observability gaps"],
            outputs: ["Observability plan", "Critical signals", "Alert candidates", "Instrumentation gaps", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or observability records if the workspace has them."]
          },
          {
            slug: "release-operations",
            title: "Release Operations",
            purpose: "Prepare a release-ready operational path.",
            inputs: ["Release scope", "CI/CD readiness", "Environment plan", "Deployment plan", "Observability plan"],
            steps: ["Check CI/CD readiness", "Confirm environment target", "Review deployment path", "Confirm observability checks", "Summarize release readiness"],
            outputs: ["Release readiness", "Blocking risks", "Rollback notes", "Post-release checks", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes, release records or PR notes if the workspace has them."]
          }
        ],
        commonPaths: [
          "GitHub setup request: role `roles/github-devops.role.md` -> skill `skills/configure-github-project.skill.md` -> playbook `playbooks/configure-github-project.playbook.md`.",
          "Deployment request: role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment.skill.md` -> playbook `playbooks/plan-deployment.playbook.md`.",
          "CI request: role `roles/devops-engineer.role.md` -> skill `skills/setup-ci.skill.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.",
          "Observability request: role `roles/devops-engineer.role.md` -> skill `skills/define-observability.skill.md` -> playbook `playbooks/define-observability.playbook.md`."
        ]
      },
      {
        key: "operations.security",
        root: "operations",
        slug: "security",
        name: "Security",
        path: "operations/security",
        routingKey: "security",
        requestTypes: "security, privacy, access control, threat model or data protection",
        purpose: "Own security, privacy, access control and threat-modeling context.",
        whenToUse: ["review security risk", "define access control", "document data protection", "threat model a feature"],
        sourceOfTruth: ["threat-model.md", "data-protection.md", "access-control.md"],
        files: [
          { path: "threat-model.md", content: () => stateDraft("Threat Model", "Document assets, threats, trust boundaries and mitigations.") },
          { path: "data-protection.md", content: () => stateDraft("Data Protection", "Document sensitive data, retention and protection expectations.") },
          { path: "access-control.md", content: () => stateDraft("Access Control", "Define permissions, roles and access boundaries.") }
        ],
        roles: [
          {
            slug: "security-reviewer",
            title: "Security Reviewer",
            purpose: "Review product and implementation work for security and privacy risk.",
            useWhen: ["security risk is present", "user data is involved", "access control needs definition"],
            beforeActing: ["../threat-model.md", "../data-protection.md", "../access-control.md"],
            skills: ["threat-model", "review-security"],
            playbooks: ["security-review", "security-checklist"]
          }
        ],
        skills: [
          { slug: "threat-model", title: "Threat Model", purpose: "Identify threats, trust boundaries and mitigations." },
          { slug: "review-security", title: "Review Security", purpose: "Review a change or scope for security and privacy risk." }
        ],
        playbooks: [
          { slug: "security-review", title: "Security Review", purpose: "Review work against security expectations.", steps: ["Read threat model", "Check data protection", "Review access control", "Record risks"] },
          {
            slug: "security-checklist",
            title: "Security Checklist",
            purpose: "Run a lightweight security checklist as an executable review process.",
            inputs: ["Feature or change scope", "Threat model", "Data protection notes", "Access control notes"],
            steps: ["Check sensitive data exposure", "Check access boundaries", "Check threat mitigations", "Identify open security questions", "Record risks or required follow-up"],
            outputs: ["Checklist result", "Security risks", "Required follow-up", "Next action"],
            filesToUpdate: ["Update `../threat-model.md`, `../data-protection.md` or `../access-control.md` when new decisions are discovered."]
          }
        ],
        commonPaths: [
          "Security request: role `roles/security-reviewer.role.md` -> skill `skills/review-security.skill.md` -> playbook `playbooks/security-review.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "mvp-to-pr",
        purpose: "Coordinate Operations Core, Design and Engineering for delivery.",
        requiredAreas: ["core", "engineering"],
        steps: ["Read MVP scope", "Check architecture", "Route UX if needed", "Plan implementation", "Prepare PR"]
      }
    ]
  },
  {
    key: "growth",
    name: "Growth",
    purpose: "Own customer experience, marketing, launch and financial learning loops.",
    requestTypes: "customer experience, marketing, landing pages, launch, acquisition or finance",
    areas: [
      {
        key: "growth.customer-experience",
        root: "growth",
        slug: "customer-experience",
        name: "Customer Experience",
        path: "growth/customer-experience",
        routingKey: "customer_experience",
        requestTypes: "customer feedback, support, onboarding, retention or success moments",
        purpose: "Own customer learning loops, support notes and experience feedback.",
        whenToUse: ["capture customer feedback", "analyze support notes", "understand churn", "document success moments"],
        sourceOfTruth: ["customer-feedback.md", "support-notes.md", "churn-reasons.md", "success-moments.md"],
        files: [
          { path: "customer-feedback.md", content: () => titledDraft("Customer Feedback", "Capture customer feedback and requests.") },
          { path: "support-notes.md", content: () => titledDraft("Support Notes", "Document support patterns and unresolved issues.") },
          { path: "churn-reasons.md", content: () => titledDraft("Churn Reasons", "Capture why users leave or disengage.") },
          { path: "success-moments.md", content: () => titledDraft("Success Moments", "Document when customers get value.") }
        ],
        roles: [
          {
            slug: "cx-lead",
            title: "Customer Experience Lead",
            purpose: "Turn customer signals into product and growth learning.",
            useWhen: ["customer feedback is involved", "support patterns need synthesis", "retention questions arise"],
            beforeActing: ["../customer-feedback.md", "../support-notes.md", "../churn-reasons.md", "../success-moments.md"],
            skills: ["map-customer-feedback", "synthesize-support-patterns"],
            playbooks: ["customer-learning-loop"]
          }
        ],
        skills: [
          { slug: "map-customer-feedback", title: "Map Customer Feedback", purpose: "Cluster feedback into product, support and growth signals." },
          { slug: "synthesize-support-patterns", title: "Synthesize Support Patterns", purpose: "Turn support notes into learning and actions." }
        ],
        playbooks: [
          { slug: "customer-learning-loop", title: "Customer Learning Loop", purpose: "Turn customer experience signals into next actions.", steps: ["Read feedback", "Cluster support patterns", "Identify friction", "Recommend product or growth follow-up"] }
        ],
        commonPaths: [
          "Customer experience request: role `roles/cx-lead.role.md` -> skill `skills/map-customer-feedback.skill.md` -> playbook `playbooks/customer-learning-loop.playbook.md`."
        ]
      },
      {
        key: "growth.marketing",
        root: "growth",
        slug: "marketing",
        name: "Marketing",
        path: "growth/marketing",
        routingKey: "marketing",
        requestTypes: "positioning, landing page, launch, acquisition or marketing",
        purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
        whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
        sourceOfTruth: ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md"],
        files: [
          { path: "positioning.md", content: () => titledDraft("Positioning", "Define market-facing positioning.") },
          { path: "landing-page.md", content: () => titledDraft("Landing Page", "Draft landing page message and conversion goal.") },
          { path: "acquisition-channels.md", content: () => titledDraft("Acquisition Channels", "List channels and first experiments.") },
          { path: "launch-plan.md", content: () => titledDraft("Launch Plan", "Plan launch actions and learning loops.") }
        ],
        roles: [
          {
            slug: "growth-lead",
            title: "Growth Lead",
            purpose: "Translate product strategy into positioning, launch and acquisition experiments.",
            useWhen: ["growth, positioning, landing pages, acquisition or launch is involved"],
            beforeActing: ["../positioning.md", "../landing-page.md", "../acquisition-channels.md", "../launch-plan.md"],
            skills: ["define-positioning", "create-landing-page-copy", "create-launch-plan"],
            playbooks: ["mvp-launch"]
          }
        ],
        skills: [
          { slug: "define-positioning", title: "Define Positioning", purpose: "Define category, audience, promise and differentiation." },
          { slug: "create-landing-page-copy", title: "Create Landing Page Copy", purpose: "Draft clear copy for the first validation or launch page." },
          { slug: "create-launch-plan", title: "Create Launch Plan", purpose: "Plan launch actions, channels and learning loops." }
        ],
        playbooks: [
          { slug: "mvp-launch", title: "MVP Launch", purpose: "Launch the MVP into a focused learning loop.", steps: ["Read positioning", "Draft landing page", "Choose channels", "Plan launch", "Capture results"] }
        ],
        commonPaths: [
          "Launch request: role `roles/growth-lead.role.md` -> skill `skills/create-launch-plan.skill.md` -> playbook `playbooks/mvp-launch.playbook.md`."
        ]
      },
      {
        key: "growth.finance",
        root: "growth",
        slug: "finance",
        name: "Finance",
        path: "growth/finance",
        routingKey: "finance",
        requestTypes: "pricing, revenue model, budget, unit economics or finance",
        purpose: "Own pricing, revenue model, unit economics, budget and financial risks.",
        whenToUse: ["define pricing", "review unit economics", "track budget", "reason about revenue model"],
        sourceOfTruth: ["pricing.md", "revenue-model.md", "unit-economics.md", "budget.md", "finance-risks.md"],
        files: [
          { path: "pricing.md", content: () => titledDraft("Pricing", "Document pricing hypotheses and packaging.") },
          { path: "revenue-model.md", content: () => titledDraft("Revenue Model", "Define revenue streams and assumptions.") },
          { path: "unit-economics.md", content: () => titledDraft("Unit Economics", "Track acquisition, delivery and margin assumptions.") },
          { path: "budget.md", content: () => titledDraft("Budget", "Track planned spend and constraints.") },
          { path: "finance-risks.md", content: () => titledDraft("Finance Risks", "Capture risks around pricing, runway and unit economics.") }
        ],
        roles: [
          {
            slug: "finance-operator",
            title: "Finance Operator",
            purpose: "Reason about pricing, unit economics, budget and revenue assumptions.",
            useWhen: ["pricing or revenue model is involved", "budget risk needs review", "unit economics are unclear"],
            beforeActing: ["../pricing.md", "../revenue-model.md", "../unit-economics.md", "../budget.md"],
            skills: ["model-unit-economics", "review-pricing"],
            playbooks: ["finance-review"]
          }
        ],
        skills: [
          { slug: "model-unit-economics", title: "Model Unit Economics", purpose: "Clarify acquisition, delivery and margin assumptions." },
          { slug: "review-pricing", title: "Review Pricing", purpose: "Evaluate pricing hypotheses against customer value and costs." }
        ],
        playbooks: [
          { slug: "finance-review", title: "Finance Review", purpose: "Review business assumptions and financial risk.", steps: ["Read pricing", "Review revenue model", "Check unit economics", "Record risks"] }
        ],
        commonPaths: [
          "Finance request: role `roles/finance-operator.role.md` -> skill `skills/model-unit-economics.skill.md` -> playbook `playbooks/finance-review.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "launch-learning-loop",
        purpose: "Coordinate marketing, customer experience and finance after launch.",
        requiredAreas: ["marketing", "customer-experience"],
        steps: ["Read positioning", "Plan launch", "Capture customer feedback", "Review finance assumptions", "Recommend next learning loop"]
      }
    ]
  }
];
