import type { FileEntry } from "../generators/file-writer.js";
import { stringifyYaml } from "../utils/yaml.js";

export type ProductStatus = "new-product" | "existing-product" | "codebase-without-strategy";
export type ProductType =
  | "b2b-saas"
  | "b2c-app"
  | "ai-agent-product"
  | "developer-tool"
  | "marketplace"
  | "internal-tool"
  | "api-product"
  | "not-sure";
export type ProductStage =
  | "idea"
  | "researching-problem"
  | "designing-mvp"
  | "building-mvp"
  | "mvp-launched"
  | "existing-product-with-users"
  | "scaling";
export type OperatingMode =
  | "solo-founder"
  | "founder-plus-ai-agents"
  | "small-team"
  | "existing-startup-team"
  | "internal-innovation-team";
export type RootDepartment = "strategy" | "operations" | "growth";
export type Subarea =
  | "strategy.company"
  | "strategy.product"
  | "strategy.roadmap"
  | "strategy.validation"
  | "operations.core"
  | "operations.design"
  | "operations.engineering"
  | "operations.devops"
  | "operations.security"
  | "growth.customer-experience"
  | "growth.marketing"
  | "growth.finance";

export type WorkspaceAnswers = {
  companyName: string;
  productName: string;
  productStatus: ProductStatus;
  productType: ProductType;
  description: string;
  targetUser: string;
  stage: ProductStage;
  mode: OperatingMode;
  subareas: Subarea[];
};

type RootDepartmentDefinition = {
  key: RootDepartment;
  name: string;
  purpose: string;
  requestTypes: string;
  areas: AreaDefinition[];
  workflows: DepartmentWorkflowDefinition[];
};

type AreaDefinition = {
  key: Subarea;
  root: RootDepartment;
  slug: string;
  name: string;
  path: string;
  routingKey: string;
  requestTypes: string;
  purpose: string;
  whenToUse: string[];
  sourceOfTruth: string[];
  files: AreaFileDefinition[];
  roles: RoleDefinition[];
  skills: SkillDefinition[];
  playbooks: PlaybookDefinition[];
  commonPaths: string[];
};

type AreaFileDefinition = {
  path: string;
  content: (answers: WorkspaceAnswers) => string;
};

type RoleDefinition = {
  slug: string;
  title: string;
  purpose: string;
  useWhen: string[];
  beforeActing: string[];
  skills: string[];
  playbooks: string[];
};

type SkillDefinition = {
  slug: string;
  title: string;
  purpose: string;
};

type PlaybookDefinition = {
  slug: string;
  title: string;
  purpose: string;
  steps: string[];
};

type WorkflowDefinition = {
  slug: string;
  purpose: string;
  requiredSubareas: Subarea[];
  steps: string[];
};

type DepartmentWorkflowDefinition = {
  slug: string;
  purpose: string;
  requiredAreas: string[];
  steps: string[];
};

type CommandDefinition = {
  slug: string;
  purpose: string;
  area?: Subarea;
  assetCreation?: boolean;
};

const rootDepartments: RootDepartmentDefinition[] = [
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
          { path: "assumptions.md", content: () => titledDraft("Assumptions", "List assumptions behind customer, problem, value and MVP.") },
          { path: "riskiest-assumptions.md", content: () => titledDraft("Riskiest Assumptions", "Prioritize assumptions that could invalidate the product.") },
          { path: "experiments.md", content: () => titledDraft("Experiments", "Plan validation experiments.") },
          { path: "interview-script.md", content: () => titledDraft("Interview Script", "Prepare customer discovery questions.") },
          { path: "success-metrics.md", content: () => titledDraft("Success Metrics", "Define validation signals.") },
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
          { slug: "mvp-validation", title: "MVP Validation", purpose: "Plan and run the first validation cycle.", steps: ["List assumptions", "Prioritize risks", "Choose experiment", "Define metrics", "Capture learning"] }
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
        sourceOfTruth: ["implementation-notes.md", "test-plan.md", "code-review-notes.md", "pr-log.md"],
        files: [
          { path: "implementation-notes.md", content: () => titledDraft("Implementation Notes", "Capture implementation context and decisions.") },
          { path: "test-plan.md", content: () => titledDraft("Test Plan", "Define automated and manual validation for implementation work.") },
          { path: "code-review-notes.md", content: () => titledDraft("Code Review Notes", "Capture review observations and risks.") },
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
            playbooks: ["issue-to-pr", "pr-validation"]
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
        requestTypes: "deployment, environments, CI, observability or operations runbooks",
        purpose: "Own delivery infrastructure, environments, deployment and observability notes.",
        whenToUse: ["plan deployment", "configure CI", "document environments", "define observability"],
        sourceOfTruth: ["environments.md", "deployment.md", "ci-cd.md", "observability.md", "runbooks.md"],
        files: [
          { path: "environments.md", content: () => titledDraft("Environments", "Document local, staging and production environments.") },
          { path: "deployment.md", content: () => titledDraft("Deployment", "Define deployment flow and release constraints.") },
          { path: "ci-cd.md", content: () => titledDraft("CI/CD", "Document build, test and release automation.") },
          { path: "observability.md", content: () => titledDraft("Observability", "Define logs, metrics, alerts and traces.") },
          { path: "runbooks.md", content: () => titledDraft("Runbooks", "Capture operational procedures.") }
        ],
        roles: [
          {
            slug: "devops-engineer",
            title: "DevOps Engineer",
            purpose: "Prepare release, environment and observability practices.",
            useWhen: ["deployment or CI is involved", "runtime operations need documentation", "environment risk exists"],
            beforeActing: ["../environments.md", "../deployment.md", "../ci-cd.md", "../observability.md"],
            skills: ["setup-ci", "plan-deployment", "define-observability"],
            playbooks: ["release-operations"]
          }
        ],
        skills: [
          { slug: "setup-ci", title: "Setup CI", purpose: "Define build, test and validation automation." },
          { slug: "plan-deployment", title: "Plan Deployment", purpose: "Plan safe release and rollback flow." },
          { slug: "define-observability", title: "Define Observability", purpose: "Define runtime visibility for the product." }
        ],
        playbooks: [
          { slug: "release-operations", title: "Release Operations", purpose: "Prepare a release-ready operational path.", steps: ["Read environment docs", "Check CI", "Plan deployment", "Define observability", "Record runbook"] }
        ],
        commonPaths: [
          "DevOps request: role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment.skill.md` -> playbook `playbooks/release-operations.playbook.md`."
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
        sourceOfTruth: ["threat-model.md", "data-protection.md", "access-control.md", "security-checklist.md"],
        files: [
          { path: "threat-model.md", content: () => titledDraft("Threat Model", "Document assets, threats, trust boundaries and mitigations.") },
          { path: "data-protection.md", content: () => titledDraft("Data Protection", "Document sensitive data, retention and protection expectations.") },
          { path: "access-control.md", content: () => titledDraft("Access Control", "Define permissions, roles and access boundaries.") },
          { path: "security-checklist.md", content: () => checklist("Security Checklist") }
        ],
        roles: [
          {
            slug: "security-reviewer",
            title: "Security Reviewer",
            purpose: "Review product and implementation work for security and privacy risk.",
            useWhen: ["security risk is present", "user data is involved", "access control needs definition"],
            beforeActing: ["../threat-model.md", "../data-protection.md", "../access-control.md"],
            skills: ["threat-model", "review-security"],
            playbooks: ["security-review"]
          }
        ],
        skills: [
          { slug: "threat-model", title: "Threat Model", purpose: "Identify threats, trust boundaries and mitigations." },
          { slug: "review-security", title: "Review Security", purpose: "Review a change or scope for security and privacy risk." }
        ],
        playbooks: [
          { slug: "security-review", title: "Security Review", purpose: "Review work against security expectations.", steps: ["Read threat model", "Check data protection", "Review access control", "Record risks"] }
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

const workflowDefinitions: WorkflowDefinition[] = [
  {
    slug: "new-product-mvp-validation",
    purpose: "Move from product strategy to MVP scope and validation plan.",
    requiredSubareas: ["strategy.product", "strategy.validation", "operations.core"],
    steps: ["Route to Strategy Product", "Define ICP", "Route to Operations Core", "Define MVP", "Route to Strategy Validation", "Plan experiment"]
  },
  {
    slug: "issue-to-pr",
    purpose: "Move from scoped MVP work to implementation and PR readiness.",
    requiredSubareas: ["operations.core", "operations.engineering"],
    steps: ["Route to Operations Core", "Confirm scope", "Route to Engineering", "Plan implementation", "Write tests", "Create PR"]
  },
  {
    slug: "launch-and-learn",
    purpose: "Launch, capture feedback and convert learning into the next cycle.",
    requiredSubareas: ["growth.marketing", "strategy.validation"],
    steps: ["Route to Growth Marketing", "Create launch plan", "Route to Strategy Validation", "Capture learning", "Recommend next action"]
  }
];

const commandDefinitions: CommandDefinition[] = [
  { slug: "init-leanos", purpose: "Initialize LeanOS by reading AGENT.md, leanos.yaml, current focus and next actions." },
  { slug: "status", purpose: "Summarize the current LeanOS workspace status." },
  { slug: "define-icp", purpose: "Define ICP.", area: "strategy.product" },
  { slug: "define-mvp", purpose: "Define MVP scope.", area: "operations.core" },
  { slug: "check-coherence", purpose: "Check coherence across strategy, MVP, roadmap and issue.", area: "strategy.product" },
  { slug: "create-roadmap", purpose: "Create a validation-first roadmap.", area: "strategy.roadmap" },
  { slug: "create-issues", purpose: "Draft GitHub-ready issues.", area: "operations.core" },
  { slug: "workon-issue", purpose: "Plan issue implementation.", area: "operations.engineering" },
  { slug: "create-pr", purpose: "Prepare a PR summary.", area: "operations.engineering" },
  { slug: "review-pr", purpose: "Review a PR.", area: "operations.engineering" },
  { slug: "create-role", purpose: "Create a new area-owned role using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill", purpose: "Create a new area-owned skill using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-playbook", purpose: "Create a new area-owned playbook using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill-role-playbook", purpose: "Create a coherent role, skill and playbook set inside the correct area.", assetCreation: true }
];

export function createWorkspaceFiles(answers: WorkspaceAnswers): FileEntry[] {
  const activeAreas = getActiveAreas(answers);
  const activeRoots = getActiveRootDepartments(activeAreas);

  return [
    { path: "AGENT.md", content: rootAgent(activeAreas, activeRoots) },
    { path: "README.md", content: workspaceReadme(answers, activeAreas, activeRoots) },
    { path: "leanos.yaml", content: createLeanOsYaml(answers, activeAreas, activeRoots) },
    ...leanosRuntimeFiles(),
    ...aiStandardFiles(),
    ...indexFiles(activeAreas, activeRoots),
    ...rootDepartmentFiles(answers, activeAreas, activeRoots),
    ...globalWorkflowFiles(activeAreas),
    ...commandFiles(activeAreas),
    ...contextFiles(answers, activeAreas, activeRoots),
    ...githubFiles(activeAreas),
    ...vscodeIntegrationFiles()
  ];
}

export function getAllSubareas(): Subarea[] {
  return rootDepartments.flatMap((department) => department.areas.map((area) => area.key));
}

function getActiveAreas(answers: WorkspaceAnswers): AreaDefinition[] {
  const selectedSubareas = new Set(answers.subareas);
  return getAllAreas().filter((area) => selectedSubareas.has(area.key));
}

function getAllAreas(): AreaDefinition[] {
  return rootDepartments.flatMap((department) => department.areas);
}

function getActiveRootDepartments(activeAreas: AreaDefinition[]): RootDepartmentDefinition[] {
  const activeRootKeys = new Set(activeAreas.map((area) => area.root));
  return rootDepartments.filter((department) => activeRootKeys.has(department.key));
}

function getActiveSubareaKeys(activeAreas: AreaDefinition[]): Set<Subarea> {
  return new Set(activeAreas.map((area) => area.key));
}

function getActiveWorkflowKeys(activeAreas: AreaDefinition[]): string[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  return workflowDefinitions
    .filter((workflow) => workflow.requiredSubareas.every((area) => activeKeys.has(area)))
    .map((workflow) => workflow.slug);
}

function getAvailableCommands(activeAreas: AreaDefinition[]): CommandDefinition[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  return commandDefinitions.filter((command) => !command.area || activeKeys.has(command.area));
}

function getArea(key: Subarea): AreaDefinition {
  const area = getAllAreas().find((candidate) => candidate.key === key);

  if (!area) {
    throw new Error(`Unknown area: ${key}`);
  }

  return area;
}

function createLeanOsYaml(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return stringifyYaml({
    leanos: {
      version: "0.1.0",
      workspace_type: "startup"
    },
    company: {
      name: answers.companyName,
      stage: answers.stage,
      mode: answers.mode
    },
    product: {
      name: answers.productName,
      type: answers.productType,
      status: answers.productStatus,
      description: answers.description,
      target_user: answers.targetUser
    },
    agent: {
      entrypoint: "AGENT.md",
      chief_agent: "enabled",
      command_style: "slash-and-natural-language",
      context_loading: "lazy",
      navigation_chain: {
        enabled: true,
        doc: "ai-standard/navigation-chain.md"
      },
      standard_library: "ai-standard"
    },
    departments: {
      active: activeRoots.map((department) => department.key),
      paths: Object.fromEntries(activeRoots.map((department) => [department.key, `${department.key}/README.md`]))
    },
    subareas: {
      active: activeAreas.map((area) => ({
        key: area.key,
        department: area.root,
        path: `${area.path}/README.md`
      }))
    },
    roles: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.roles.map((role) => role.slug)]))
    },
    skills: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.skills.map((skill) => skill.slug)]))
    },
    playbooks: {
      ownership: "area-first",
      active: Object.fromEntries(activeAreas.map((area) => [area.key, area.playbooks.map((playbook) => playbook.slug)]))
    },
    workflows: {
      active: getActiveWorkflowKeys(activeAreas)
    },
    ai_standard: {
      path: "ai-standard/README.md",
      templates: "ai-standard/templates",
      checklists: "ai-standard/checklists",
      instructions: "ai-standard/instructions"
    },
    github: {
      status: "not_configured"
    }
  });
}

function rootAgent(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  const routingLines = activeAreas.map((area) => `If the user asks about ${area.requestTypes}:\n\nGo to:\n\n\`${area.path}/README.md\``);

  return `# LeanOS Agent

You are the LeanOS Chief Agent for this workspace.

Your job is to help the user operate a product company with strategic coherence before and during implementation.

## Start Here

Read these files first:

- \`leanos.yaml\`
- \`.leanos/context/workspace-summary.md\`
- \`.leanos/context/current-focus.md\`
- \`.leanos/context/next-actions.md\`
- \`.leanos/index/routing-map.yaml\`

## Navigation Chain

\`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Do not jump directly to implementation.
Do not load every file.
Load the smallest relevant department, area, role, skill and playbook.

## LeanOS Runtime

\`.leanos/\` contains runtime files for commands, context, indexes, workflows and VS Code integration.

\`ai-standard/\` contains reusable templates, instructions and quality criteria.

## Active Root Departments

${activeRoots.map((department) => `- ${department.name}: \`${department.key}/README.md\``).join("\n")}

## Active Areas

${activeAreas.map((area) => `- ${area.name}: \`${area.path}/README.md\``).join("\n")}

## Routing

${routingLines.join("\n\n")}
`;
}

function workspaceReadme(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# ${answers.productName}

LeanOS workspace for ${answers.companyName}.

This workspace separates LeanOS runtime files from the client's operating structure.

## Start

For any AI model:

\`\`\`text
/leanos-init
\`\`\`

Then start from:

\`AGENT.md\`

## Main Structure

- \`.github/\` VS Code and GitHub integration files.
- \`.leanos/\` LeanOS runtime, commands, context, indexes and global workflows.
- \`ai-standard/\` templates, checklists and instructions for creating LeanOS assets.
${activeRoots.map((department) => `- \`${department.key}/\` ${department.name} department.`).join("\n")}

## Product Snapshot

- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}

## Active Areas

${activeAreas.map((area) => `- \`${area.path}/\` ${area.purpose}`).join("\n")}

## Next Step

Open Copilot Chat, select \`LeanOS Chief\`, and run:

\`\`\`text
/leanos-init
\`\`\`
`;
}

function leanosRuntimeFiles(): FileEntry[] {
  return [
    { path: ".leanos/README.md", content: folderReadme("LeanOS Runtime", "Runtime files for LeanOS Chief.", "Use for commands, context, indexes, global workflows and VS Code integration.", "context/current-focus.md", ["agent/", "commands/", "context/", "workflows/", "index/", "vscode/"], ["../AGENT.md", "../ai-standard/", "../strategy/", "../operations/", "../growth/"], "This folder is runtime support. Operational roles, skills and playbooks live in workspace departments and areas.") },
    { path: ".leanos/agent/README.md", content: folderReadme("Agent", "Chief Agent operating guidance.", "Use when defining how LeanOS Chief loads context, activates routes and formats output.", "chief-agent.md", ["chief-agent.md", "operating-rules.md", "context-loading.md", "role-activation.md", "output-standards.md"], ["../../ai-standard/", "../commands/", "../context/"], "Keep this folder concise. Route product work to root departments and areas.") },
    { path: ".leanos/agent/chief-agent.md", content: "# Chief Agent\n\nLeanOS Chief is the bootloader and dispatcher for the workspace.\n\nIt should load AGENT.md, leanos.yaml, context files and the routing map before acting.\n" },
    { path: ".leanos/agent/operating-rules.md", content: "# Operating Rules\n\n- Start from `../../AGENT.md`.\n- Load only relevant context.\n- Route through departments and areas.\n- Do not implement before loading the matching command, area, role, skill and playbook.\n" },
    { path: ".leanos/agent/context-loading.md", content: "# Context Loading\n\nLeanOS uses lazy context loading.\n\nLoad `../context/` first, then use `../index/` to choose the smallest relevant path.\n" },
    { path: ".leanos/agent/role-activation.md", content: "# Role Activation\n\nRoles live inside active workspace areas.\n\nDo not activate a role from an inactive or missing area without asking the user.\n" },
    { path: ".leanos/agent/output-standards.md", content: "# Output Standards\n\nEvery output should include:\n\n- What was loaded\n- Decision or result\n- Files to update, if any\n- Next recommended command or route\n" }
  ];
}

function aiStandardFiles(): FileEntry[] {
  const templateFiles = [
    "agent-template.md",
    "command-template.md",
    "department-template.md",
    "department-template.yaml",
    "area-template.md",
    "area-template.yaml",
    "folder-readme-template.md",
    "github-issue-template.md",
    "playbook-template.md",
    "playbook-template.yaml",
    "role-template.md",
    "role-template.yaml",
    "root-readme-template.md",
    "skill-template.md",
    "skill-template.yaml",
    "workflow-template.md"
  ];
  const checklists = ["agent", "area", "command", "department", "playbook", "readme", "role", "skill"];
  const instructions = ["create-agent", "create-area", "create-command", "create-department", "create-playbook", "create-readme", "create-role", "create-skill", "create-workflow"];

  return [
    { path: "ai-standard/README.md", content: folderReadme("AI Standard", "LeanOS standards for creating and reviewing AI-native workspace assets.", "Use before creating or changing agents, departments, areas, roles, skills, playbooks, workflows or commands.", "navigation-chain.md", ["navigation-chain.md", "creation-rules.md", "quality-criteria.md", "naming-conventions.md", "folder-readme-rules.md", "templates/", "checklists/", "instructions/", "examples/"], ["../AGENT.md", "../.leanos/commands/"], "Consult the standard before creating or modifying LeanOS assets.") },
    { path: "ai-standard/navigation-chain.md", content: "# Navigation Chain\n\n`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output`\n\nRoot departments route work. Areas own roles, skills and playbooks. Outputs should update source-of-truth files only when requested or clearly needed.\n" },
    { path: "ai-standard/creation-rules.md", content: "# Creation Rules\n\n- Create roles, skills and playbooks inside the correct area.\n- Do not place roles, skills or playbooks directly under root departments.\n- Every area asset must reference its local README and source-of-truth files.\n- Keep LeanOS runtime files in `.leanos/` small and route-focused.\n" },
    { path: "ai-standard/quality-criteria.md", content: "# Quality Criteria\n\n- Clear purpose\n- Explicit routing\n- Minimal context loading\n- Source-of-truth references\n- Output expectations\n" },
    { path: "ai-standard/naming-conventions.md", content: "# Naming Conventions\n\n- Areas use lowercase kebab-case paths.\n- Roles end with `.role.md`.\n- Skills end with `.skill.md`.\n- Playbooks end with `.playbook.md`.\n- Workflows end with `.workflow.md`.\n" },
    { path: "ai-standard/folder-readme-rules.md", content: "# Folder README Rules\n\nEvery important folder should explain purpose, when to use it, source of truth, files, related folders and navigation notes.\n" },
    { path: "ai-standard/templates/README.md", content: folderReadme("Templates", "Reusable templates for LeanOS assets.", "Use when creating new workspace assets.", "role-template.md", templateFiles, ["../checklists/", "../instructions/"], "Copy the smallest matching template and adapt it to the active department or area.") },
    ...templateFiles.map((file) => ({ path: `ai-standard/templates/${file}`, content: standardTemplate(file) })),
    { path: "ai-standard/checklists/README.md", content: folderReadme("Checklists", "Quality checklists for LeanOS assets.", "Use before accepting newly created or modified assets.", "role-quality-checklist.md", checklists.map((name) => `${name}-quality-checklist.md`), ["../templates/", "../instructions/"], "Run the relevant checklist before final output.") },
    ...checklists.map((name) => ({ path: `ai-standard/checklists/${name}-quality-checklist.md`, content: qualityChecklist(toTitle(name)) })),
    { path: "ai-standard/instructions/README.md", content: folderReadme("Instructions", "Instructions for creating LeanOS assets.", "Use when a command asks to create or update framework assets.", "create-role-instructions.md", instructions.map((name) => `${name}-instructions.md`), ["../templates/", "../checklists/"], "Follow instructions, then validate with the matching checklist.") },
    ...instructions.map((name) => ({ path: `ai-standard/instructions/${name}-instructions.md`, content: creationInstructions(toTitle(name.replace("create-", ""))) })),
    { path: "ai-standard/examples/README.md", content: folderReadme("Examples", "Examples of LeanOS assets.", "Use as references only; prefer active area context.", "example-role-senior-developer.md", ["example-agent.md", "example-folder-readme.md", "example-role-senior-developer.md", "example-skill-check-coherence.md", "example-playbook-issue-to-pr.md"], ["../templates/", "../checklists/"], "Examples are illustrative and should not override active workspace context.") },
    { path: "ai-standard/examples/example-agent.md", content: rootAgent(getAllAreas(), rootDepartments) },
    { path: "ai-standard/examples/example-folder-readme.md", content: folderReadme("Example Folder", "Example purpose.", "Use when relevant.", "README.md", ["README.md"], ["../"], "Example notes.") },
    { path: "ai-standard/examples/example-role-senior-developer.md", content: roleFile(getArea("operations.engineering"), getArea("operations.engineering").roles[0]) },
    { path: "ai-standard/examples/example-skill-check-coherence.md", content: skillFile(getArea("strategy.product"), getArea("strategy.product").skills.find((skill) => skill.slug === "check-coherence") ?? getArea("strategy.product").skills[0]) },
    { path: "ai-standard/examples/example-playbook-issue-to-pr.md", content: playbookFile(getArea("operations.engineering"), getArea("operations.engineering").playbooks[0]) }
  ];
}

function indexFiles(activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const routing = Object.fromEntries(activeAreas.map((area) => [area.routingKey, `../../${area.path}/README.md`]));

  return [
    { path: ".leanos/index/README.md", content: folderReadme("LeanOS Index", "Structured maps that help agents route without loading every asset.", "Use when a model needs a quick routing map.", "routing-map.yaml", ["departments.yaml", "areas.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml"], ["../../strategy/", "../../operations/", "../../growth/", "../workflows/"], "Use index files as maps, then load the destination README.") },
    { path: ".leanos/index/departments.yaml", content: stringifyYaml({ departments: activeRoots.map((department) => ({ key: department.key, path: `../../${department.key}/README.md` })) }) },
    { path: ".leanos/index/areas.yaml", content: stringifyYaml({ areas: activeAreas.map((area) => ({ key: area.key, department: area.root, path: `../../${area.path}/README.md` })) }) },
    { path: ".leanos/index/roles.yaml", content: stringifyYaml({ roles: activeAreas.flatMap((area) => area.roles.map((role) => ({ key: role.slug, area: area.key, path: `../../${area.path}/roles/${role.slug}.role.md` }))) }) },
    { path: ".leanos/index/skills.yaml", content: stringifyYaml({ skills: activeAreas.flatMap((area) => area.skills.map((skill) => ({ key: skill.slug, area: area.key, path: `../../${area.path}/skills/${skill.slug}.skill.md` }))) }) },
    { path: ".leanos/index/playbooks.yaml", content: stringifyYaml({ playbooks: activeAreas.flatMap((area) => area.playbooks.map((playbook) => ({ key: playbook.slug, area: area.key, path: `../../${area.path}/playbooks/${playbook.slug}.playbook.md` }))) }) },
    { path: ".leanos/index/workflows.yaml", content: stringifyYaml({ workflows: workflowDefinitions.map((workflow) => ({ key: workflow.slug, path: `../workflows/${workflow.slug}.workflow.md`, active: workflow.requiredSubareas.every((subarea) => getActiveSubareaKeys(activeAreas).has(subarea)) })) }) },
    { path: ".leanos/index/routing-map.yaml", content: stringifyYaml({ routing: { departments: Object.fromEntries(activeRoots.map((department) => [department.key, `../../${department.key}/README.md`])), areas: routing, asset_creation: "../../ai-standard/README.md" } }) }
  ];
}

function rootDepartmentFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  return activeRoots.flatMap((department) => {
    const areas = activeAreas.filter((area) => area.root === department.key);

    return [
      { path: `${department.key}/AGENT.md`, content: departmentAgent(department, areas) },
      { path: `${department.key}/README.md`, content: departmentReadme(department, areas) },
      { path: `${department.key}/department.yaml`, content: departmentYaml(department, areas) },
      { path: `${department.key}/workflows/README.md`, content: folderReadme(`${department.name} Workflows`, `Internal cross-area workflows for ${department.name}.`, "Use when work spans more than one active area inside this department.", "../department.yaml", department.workflows.map((workflow) => `${workflow.slug}.workflow.md`), areas.map((area) => `../${area.slug}/`), "Workflows route between areas; if an area is missing, ask before activating or creating it.") },
      ...department.workflows.map((workflow) => ({
        path: `${department.key}/workflows/${workflow.slug}.workflow.md`,
        content: departmentWorkflowFile(department, areas, workflow)
      })),
      ...areas.flatMap((area) => areaFiles(area, answers))
    ];
  });
}

function areaFiles(area: AreaDefinition, answers: WorkspaceAnswers): FileEntry[] {
  return [
    { path: `${area.path}/README.md`, content: areaReadme(area) },
    { path: `${area.path}/area.yaml`, content: areaYaml(area) },
    { path: `${area.path}/roles/README.md`, content: folderReadme(`${area.name} Roles`, `Roles owned by the ${area.name} area.`, "Use after the area README selects a role.", "../README.md", area.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Load one role, then follow its skills and playbooks.") },
    ...area.roles.map((role) => ({ path: `${area.path}/roles/${role.slug}.role.md`, content: roleFile(area, role) })),
    { path: `${area.path}/skills/README.md`, content: folderReadme(`${area.name} Skills`, `Skills owned by the ${area.name} area.`, "Use when a selected role points to a skill.", "../README.md", area.skills.map((skill) => `${skill.slug}.skill.md`), ["../roles/", "../playbooks/"], "Load only skills needed for the active task.") },
    ...area.skills.map((skill) => ({ path: `${area.path}/skills/${skill.slug}.skill.md`, content: skillFile(area, skill) })),
    { path: `${area.path}/playbooks/README.md`, content: folderReadme(`${area.name} Playbooks`, `Execution sequences owned by the ${area.name} area.`, "Use when a selected role points to a playbook.", "../README.md", area.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks for sequencing, not for duplicating skill details.") },
    ...area.playbooks.map((playbook) => ({ path: `${area.path}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(area, playbook) })),
    ...area.files.map((file) => ({ path: `${area.path}/${file.path}`, content: file.content(answers) }))
  ];
}

function departmentAgent(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return `# ${department.name} Agent

You are operating inside the ${department.name} department.

This department routes work across areas. Roles, skills and playbooks do not live at the department root.

## Active Areas

${areas.map((area) => `- ${area.name}: \`${area.slug}/README.md\``).join("\n")}

## Navigation

\`${department.key}/AGENT.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Load one area README before loading roles, skills or playbooks.
`;
}

function departmentReadme(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return folderReadme(
    department.name,
    department.purpose,
    `Use for ${department.requestTypes}.`,
    "department.yaml",
    ["AGENT.md", "department.yaml", "workflows/", ...areas.map((area) => `${area.slug}/`)],
    ["../.leanos/index/", "../ai-standard/"],
    "This department root does not own roles, skills or playbooks directly. Route into an active area."
  );
}

function departmentYaml(department: RootDepartmentDefinition, areas: AreaDefinition[]): string {
  return stringifyYaml({
    department: {
      key: department.key,
      name: department.name,
      purpose: department.purpose,
      active_areas: areas.map((area) => ({ key: area.key, path: `${area.slug}/README.md` })),
      workflows: department.workflows.map((workflow) => ({ key: workflow.slug, path: `workflows/${workflow.slug}.workflow.md` }))
    }
  });
}

function departmentWorkflowFile(department: RootDepartmentDefinition, activeAreas: AreaDefinition[], workflow: DepartmentWorkflowDefinition): string {
  const activeSlugs = new Set(activeAreas.map((area) => area.slug));
  const missingAreas = workflow.requiredAreas.filter((area) => !activeSlugs.has(area));

  return `# ${toTitle(workflow.slug)} Workflow

## Purpose

${workflow.purpose}

## Required Areas

${workflow.requiredAreas.map((area) => `- ${area}`).join("\n")}

${missingAreas.length > 0 ? `## Availability\n\nThis workflow references areas that are not currently active: ${missingAreas.join(", ")}.\n\nDo not load missing area paths. Ask whether to activate or create the missing area before executing this workflow.\n` : "## Availability\n\nAll required areas are active in this department.\n"}

## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Navigation

Use ${department.name} area READMEs for each step. Do not bypass area-first ownership.
`;
}

function areaReadme(area: AreaDefinition): string {
  return `# ${area.name}

## Purpose

${area.purpose}

## When to Use

${area.whenToUse.map((item) => `- ${item}`).join("\n")}

## Source of Truth

${area.sourceOfTruth.map((file) => `- \`${file}\``).join("\n")}

## Navigation

1. Choose the relevant role from \`roles/\`.
2. Load only the required skills from \`skills/\`.
3. Use the matching playbook from \`playbooks/\`.
4. Produce the requested output and update source-of-truth files when needed.

## Common Paths

${area.commonPaths.map((item) => `- ${item}`).join("\n")}
`;
}

function areaYaml(area: AreaDefinition): string {
  return stringifyYaml({
    area: {
      key: area.key,
      department: area.root,
      path: area.path,
      roles: area.roles.map((role) => role.slug),
      skills: area.skills.map((skill) => skill.slug),
      playbooks: area.playbooks.map((playbook) => playbook.slug),
      source_of_truth: area.sourceOfTruth
    }
  });
}

function roleFile(area: AreaDefinition, role: RoleDefinition): string {
  return `# ${role.title}

## Purpose

${role.purpose}

## Use When

${role.useWhen.map((item) => `- ${item}`).join("\n")}

## Before Acting

Read:

${role.beforeActing.map((file) => `- \`${file}\``).join("\n")}

## Skills

${role.skills.map((skill) => `- \`../skills/${skill}.skill.md\``).join("\n")}

## Playbooks

${role.playbooks.map((playbook) => `- \`../playbooks/${playbook}.playbook.md\``).join("\n")}

## Output Style

- State what context was loaded.
- Make the smallest coherent recommendation or change.
- Identify files that should be updated.

## Navigation

Start from \`../README.md\`, then load only the required skill and playbook.
`;
}

function skillFile(area: AreaDefinition, skill: SkillDefinition): string {
  return `# ${skill.title}

## Purpose

${skill.purpose}

## Area

\`${area.path}\`

## Inputs

- Area source-of-truth files
- Active role instructions
- User request

## Process

1. Read the minimum relevant source-of-truth files.
2. Apply this skill to the user request.
3. Prepare a concise output or file update.

## Output

- Summary
- Decisions
- Suggested file updates
`;
}

function playbookFile(area: AreaDefinition, playbook: PlaybookDefinition): string {
  return `# ${playbook.title}

## Purpose

${playbook.purpose}

## Area

\`${area.path}\`

## Sequence

${playbook.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Outputs

- Decision or action summary
- Updated source-of-truth files when requested
- Next recommended LeanOS command

## Navigation

Start from \`../README.md\`, choose a role in \`../roles/\`, load required skills in \`../skills/\`, then use this playbook.
`;
}

function globalWorkflowFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);

  return [
    { path: ".leanos/workflows/README.md", content: folderReadme("Global Workflows", "Cross-department LeanOS workflows.", "Use when work spans more than one root department.", "../index/workflows.yaml", workflowDefinitions.map((workflow) => `${workflow.slug}.workflow.md`), ["../../strategy/", "../../operations/", "../../growth/", "../context/"], "Workflows route between departments and areas; if a required area is not active, ask before activating or creating it.") },
    ...workflowDefinitions.map((workflow) => {
      const missingSubareas = workflow.requiredSubareas.filter((area) => !activeKeys.has(area));

      return {
        path: `.leanos/workflows/${workflow.slug}.workflow.md`,
        content: `# ${toTitle(workflow.slug)} Workflow

## Purpose

${workflow.purpose}

## Required Areas

${workflow.requiredSubareas.map((area) => `- ${area}: \`../../${getArea(area).path}/README.md\``).join("\n")}

${missingSubareas.length > 0 ? `## Availability\n\nThis workflow references areas that are not currently active: ${missingSubareas.join(", ")}.\n\nDo not load missing area paths. Ask whether to activate or create the missing area before executing this workflow.\n` : "## Availability\n\nAll required areas are active in this workspace.\n"}

## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Navigation

Use department and area READMEs for each step. Do not bypass area-first ownership.
`
      };
    })
  ];
}

function commandFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = activeAreas.map((area) => area.key);
  const availableCommands = getAvailableCommands(activeAreas);

  return [
    { path: ".leanos/commands/README.md", content: folderReadme("Commands", "Slash command instructions for LeanOS agent chats.", "Use when the user invokes or describes a LeanOS command.", "../index/routing-map.yaml", commandDefinitions.map((command) => `${command.slug}.md`), ["../context/", "../index/", "../../ai-standard/"], `Available now: ${availableCommands.map((command) => formatCommandInvocation(command.slug)).join(", ")}. Commands tied to inactive areas include a warning and require explicit activation before use.`) },
    ...commandDefinitions.map((command) => ({
      path: `.leanos/commands/${command.slug}.md`,
      content: command.assetCreation ? assetCreationCommand(command, activeAreas) : routingCommand(command, activeKeys)
    }))
  ];
}

function routingCommand(command: CommandDefinition, activeSubareas: Subarea[]): string {
  const areaAvailable = !command.area || activeSubareas.includes(command.area);
  const areaGuidance = command.area
    ? areaAvailable
      ? `Route through \`../../${getArea(command.area).path}/README.md\`.`
      : `This command normally uses \`${command.area}\`, which is not active in this workspace. Do not load missing paths. Ask whether to activate or create that area before executing.`
    : "Use AGENT.md and the routing map to choose the smallest active area context.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

Read:

- \`../../AGENT.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`
- \`../index/routing-map.yaml\`

## Process

1. ${areaGuidance}
2. Load the department AGENT.md or README first.
3. Activate the role named by the area README.
4. Load only the required skills and playbook.
5. Produce the requested output.

## Active Areas

${activeSubareas.map((area) => `- ${area}`).join("\n")}
`;
}

function assetCreationCommand(command: CommandDefinition, activeAreas: AreaDefinition[]): string {
  const activeKeys = new Set(activeAreas.map((area) => area.key));

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

First consult:

- \`../../ai-standard/README.md\`
- \`../../ai-standard/navigation-chain.md\`
- \`../../ai-standard/creation-rules.md\`
- \`../../ai-standard/templates/\`
- \`../../ai-standard/checklists/\`
- \`../../ai-standard/instructions/\`

## Area-First Rule

Create role, skill and playbook assets inside the correct active area:

${getAllAreas().map((area) => `- ${area.name} assets: \`../../${area.path}/\`${activeKeys.has(area.key) ? "" : " (not active; ask before activating or creating it)"}`).join("\n")}

## Expected Output

- Selected department and area
- Assets to create
- Templates used
- Checklists used
- Files created or updated

## Active Areas

${activeAreas.map((area) => `- ${area.key}`).join("\n")}
`;
}

function contextFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): FileEntry[] {
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return [
    { path: ".leanos/context/README.md", content: folderReadme("Context", "Current workspace state that helps LeanOS Chief start quickly.", "Use at the beginning of every LeanOS session.", "current-focus.md", ["workspace-summary.md", "active-workflow.md", "current-focus.md", "next-actions.md", "decision-index.md"], ["../index/", "../workflows/", "../../strategy/", "../../operations/", "../../growth/"], "Context files are lightweight pointers, not full manuals.") },
    { path: ".leanos/context/workspace-summary.md", content: workspaceSummary(answers, activeAreas, activeRoots) },
    { path: ".leanos/context/active-workflow.md", content: activeWorkflowContext(activeWorkflows) },
    { path: ".leanos/context/current-focus.md", content: getCurrentFocus(activeAreas) },
    { path: ".leanos/context/next-actions.md", content: getNextActions(activeAreas) },
    { path: ".leanos/context/decision-index.md", content: decisionIndex(activeAreas) }
  ];
}

function activeWorkflowContext(activeWorkflows: string[]): string {
  if (activeWorkflows.length === 0) {
    return `# Active Workflow

No complete global workflow is active yet.

The currently active areas do not satisfy any full global workflow requirements.

Use active area READMEs and available commands until the user activates more areas.
`;
  }

  return `# Active Workflow

Current compatible global workflows:

${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}

Use only workflows listed here as active. Other workflow files may exist, but they can require areas that are not active yet.
`;
}

function workspaceSummary(answers: WorkspaceAnswers, activeAreas: AreaDefinition[], activeRoots: RootDepartmentDefinition[]): string {
  return `# Workspace Summary

- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}
- Active departments: ${activeRoots.map((department) => department.key).join(", ")}
- Active areas: ${activeAreas.map((area) => area.key).join(", ")}
`;
}

function getCurrentFocus(activeAreas: AreaDefinition[]): string {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const activeWorkflows = getActiveWorkflowKeys(activeAreas);

  return `# Current Focus

Operate only through active workspace areas:

${activeAreas.map((area) => `- ${area.key}: \`${area.path}/README.md\``).join("\n")}

${activeWorkflows.length > 0 ? `Compatible global workflows:\n\n${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}` : "No complete global workflow is active yet."}

${activeKeys.has("strategy.product") ? "Product strategy commands are available." : "Product strategy commands are not active. Ask before activating Strategy Product or creating product-specific assets."}
`;
}

function getNextActions(activeAreas: AreaDefinition[]): string {
  const availableCommands = getAvailableCommands(activeAreas)
    .filter((command) => !command.assetCreation)
    .filter((command) => ["status", "define-icp", "define-mvp", "check-coherence", "workon-issue"].includes(command.slug))
    .slice(0, 4);

  if (availableCommands.length === 0) {
    return `# Next Actions

## 1. Check Status

Command:

\`\`\`text
/status
\`\`\`

No area-specific command is active yet. Use the active area READMEs and ask before activating missing areas.
`;
  }

  return `# Next Actions

${availableCommands.map((command, index) => `## ${index + 1}. ${toTitle(command.slug)}\n\nCommand:\n\n\`\`\`text\n${formatCommandInvocation(command.slug)}\n\`\`\``).join("\n\n")}
`;
}

function decisionIndex(activeAreas: AreaDefinition[]): string {
  const rows = activeAreas.flatMap((area) => area.sourceOfTruth.filter((file) => file.includes("decision") || file.includes("log")).map((file) => `| ${area.name} | \`../../${area.path}/${file}\` |`));

  return `# Decision Index

| Area | Decision Log |
| --- | --- |
${rows.length > 0 ? rows.join("\n") : "| TBD | TBD |"}
`;
}

function githubFiles(activeAreas: AreaDefinition[]): FileEntry[] {
  const engineeringActive = getActiveSubareaKeys(activeAreas).has("operations.engineering");
  const engineeringNote = engineeringActive
    ? "Route GitHub and PR validation work through `../../operations/engineering/README.md` before changing GitHub workflow files."
    : "Operations Engineering is not active in this workspace. Ask before activating it or changing GitHub workflow files.";

  return [
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nStart from `../AGENT.md` and follow the LeanOS Navigation Chain before implementing product work.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    ...["feature", "bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: folderReadme("GitHub LeanOS", "GitHub support files for LeanOS workflow conventions.", "Use when configuring labels, branch rules or PR validation guidance.", "pr-validation-rules.md", ["labels.yaml", "project-sync.yaml", "branch-rules.md", "pr-validation-rules.md"], ["../ISSUE_TEMPLATE/", "../../operations/engineering/"], engineeringNote) },
    { path: ".github/leanos/labels.yaml", content: labelsYaml() },
    { path: ".github/leanos/project-sync.yaml", content: "github:\n  status: not_configured\n  project_sync: disabled\n" },
    { path: ".github/leanos/branch-rules.md", content: "# Branch Rules\n\n- Use focused branches tied to a roadmap item or issue.\n- Keep branch scope aligned with MVP and validation goals.\n" },
    { path: ".github/leanos/pr-validation-rules.md", content: "# PR Validation Rules\n\n- Link the PR to a LeanOS issue or task.\n- Check MVP scope and acceptance criteria.\n- Confirm tests or manual validation.\n- Capture learning when relevant.\n" }
  ];
}

function vscodeIntegrationFiles(): FileEntry[] {
  return [
    { path: ".github/agents/leanos-chief.agent.md", content: leanosChiefAgent() },
    { path: ".github/prompts/leanos-init.prompt.md", content: leanosInitPrompt() },
    { path: ".leanos/vscode/README.md", content: vscodeReadme() }
  ];
}

function leanosChiefAgent(): string {
  return `---
name: LeanOS Chief
description: Operate LeanOS workspaces through AGENT.md, runtime commands, active departments, areas, roles, skills and playbooks.
argument-hint: Start with /init leanos or /leanos-init
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

\`.leanos/\` is runtime: commands, context, indexes, global workflows and VS Code support.
\`ai-standard/\` is the standard library for creating and validating LeanOS assets.
The client operating workspace lives in \`strategy/\`, \`operations/\` and \`growth/\`.

On \`/init leanos\`, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

For any LeanOS slash command, load \`.leanos/commands/<command>.md\`. Normalize spaces to hyphens when needed.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output\`

Respect active departments and areas in \`leanos.yaml\`.
Do not load missing area paths.
Do not invent workflows.
Do not implement code before loading the matching command, department, area, role, skill and playbook.
For PR validation or review commands, load the relevant validation criteria before judging.
`;
}

function leanosInitPrompt(): string {
  return `---
name: leanos-init
description: Initialize LeanOS Chief for this workspace.
agent: 'LeanOS Chief'
---
# Initialize LeanOS

Treat this prompt as the safe workspace prompt equivalent of \`/init leanos\`.

Load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

Then summarize the active LeanOS workspace status, active departments, active areas, available workflows and recommended next action.
`;
}

function vscodeReadme(): string {
  return `# VS Code

LeanOS prepares a workspace-level VS Code custom agent for GitHub Copilot Chat.

## Agent

The official workspace agent file is:

\`.github/agents/leanos-chief.agent.md\`

VS Code detects workspace custom agents from \`.github/agents\`.

## Bootstrap

Open Copilot Chat, select \`LeanOS Chief\`, then start with:

\`\`\`text
/init leanos
\`\`\`

If VS Code routes \`/init\` to its native command, use the safe workspace prompt:

\`\`\`text
/leanos-init
\`\`\`

The prompt file is:

\`.github/prompts/leanos-init.prompt.md\`

Do not write global user configuration for this workspace without explicit user approval.
`;
}

function issueTemplate(fileName: string, name: string, description: string): FileEntry {
  return {
    path: `.github/ISSUE_TEMPLATE/${fileName}`,
    content: `name: ${name}
description: ${description}
title: "[${name}]: "
labels: ["leanos"]
body:
  - type: textarea
    id: context
    attributes:
      label: Context
      description: What problem, assumption, roadmap item or workflow does this relate to?
    validations:
      required: true
  - type: textarea
    id: scope
    attributes:
      label: Scope
      description: What should be done?
    validations:
      required: true
  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance criteria
      description: How will we know this is complete?
    validations:
      required: true
`
  };
}

function pullRequestTemplate(): string {
  return `# Pull Request

## LeanOS Context

- Active Department:
- Active Area:
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Summary

Describe what changed.

## Coherence Check

- Strategy alignment:
- MVP scope alignment:
- Acceptance criteria:
- Validation or learning impact:

## Tests

- [ ] Build or test command run
- [ ] Manual validation completed
`;
}

function prValidationWorkflow(): string {
  return `name: LeanOS PR Validation

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  static-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: LeanOS placeholder validation
        run: echo "LeanOS PR validation rules are documented in .github/leanos/pr-validation-rules.md"
`;
}

function labelsYaml(): string {
  return `labels:
  - name: leanos
    color: "5319e7"
    description: LeanOS managed work
  - name: validation
    color: "0e8a16"
    description: Validation or learning task
  - name: mvp
    color: "1d76db"
    description: MVP scope work
  - name: strategy
    color: "fbca04"
    description: Strategy or product definition
`;
}

function companyProfile(answers: WorkspaceAnswers): string {
  return `# Company Profile

- Company: ${answers.companyName}
- Operating mode: ${answers.mode}
- Current stage: ${answers.stage}

## Draft

Describe what the company is building, who it serves and why now.
`;
}

function productBrief(answers: WorkspaceAnswers): string {
  return `# Product Brief

- Product: ${answers.productName}
- Type: ${answers.productType}
- Status: ${answers.productStatus}
- Primary user: ${answers.targetUser}

## Description

${answers.description}

## Draft

Clarify customer, problem, value proposition, MVP and validation path.
`;
}

function folderReadme(title: string, purpose: string, whenToUse: string, sourceOfTruth: string, files: string[], relatedFolders: string[], agentNotes: string): string {
  return `# ${title}

## Purpose

${purpose}

## When to Use

${whenToUse}

## Source of Truth

\`${sourceOfTruth}\`

## Files

${files.map((file) => `- \`${file}\``).join("\n")}

## Related Folders

${relatedFolders.map((folder) => `- \`${folder}\``).join("\n")}

## Navigation

Use this README to choose the next specific file. Do not load unrelated files.

## Agent Notes

${agentNotes}
`;
}

function titledDraft(title: string, guidance: string): string {
  return `# ${title}

${guidance}

## Draft

TBD
`;
}

function decisionLog(title: string): string {
  return `# ${title}

| Date | Decision | Context | Owner |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
`;
}

function learningLog(): string {
  return `# Learning Log

| Date | Source | Learning | Impact |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |
`;
}

function checklist(title: string): string {
  return `# ${title}

- [ ] Context reviewed
- [ ] Scope is coherent
- [ ] Risks are visible
- [ ] Next action is clear
`;
}

function standardTemplate(fileName: string): string {
  return `# ${toTitle(fileName.replace(/\.(md|yaml)$/, ""))}

Use this template as a starting point.

## Required

- Purpose
- Inputs
- Process
- Output
- Navigation
`;
}

function qualityChecklist(name: string): string {
  return `# ${name} Quality Checklist

- [ ] Purpose is clear
- [ ] Source-of-truth files are referenced
- [ ] Navigation is explicit
- [ ] Output expectations are clear
- [ ] No inactive or missing paths are required
`;
}

function creationInstructions(assetName: string): string {
  return `# Create ${assetName} Instructions

1. Read \`../README.md\`.
2. Choose the active department and area.
3. Use the matching template.
4. Validate with the matching checklist.
5. Create the asset inside the selected area.
`;
}

function formatCommandInvocation(slug: string): string {
  return `/${slug.replace(/-/g, " ")}`;
}

function toTitle(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
