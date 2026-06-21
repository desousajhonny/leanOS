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
export type Department =
  | "product"
  | "validation"
  | "engineering"
  | "design"
  | "growth";

export type WorkspaceAnswers = {
  companyName: string;
  productName: string;
  productStatus: ProductStatus;
  productType: ProductType;
  description: string;
  targetUser: string;
  stage: ProductStage;
  mode: OperatingMode;
  departments: Department[];
};

type DepartmentDefinition = {
  key: "product" | "design" | "engineering" | "validation" | "growth";
  name: string;
  routingKey: string;
  requestTypes: string;
  purpose: string;
  whenToUse: string[];
  roles: RoleDefinition[];
  skills: SkillDefinition[];
  playbooks: PlaybookDefinition[];
  sourceOfTruth: string[];
  commonPaths: string[];
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

type CommandDefinition = {
  slug: string;
  purpose: string;
  department?: DepartmentDefinition["key"];
  assetCreation?: boolean;
};

type TopLevelFileDefinition = {
  name: string;
  content: (answers: WorkspaceAnswers) => string;
};

type DepartmentRouteNoteDefinition = {
  department: DepartmentDefinition["key"];
  label: string;
  activeMessage?: string;
};

type TopLevelAreaDefinition = {
  key: string;
  title: string;
  purpose: string;
  whenToUse: string;
  sourceOfTruth: string;
  files: TopLevelFileDefinition[];
  relatedFolders: string[];
  agentNotes: string | DepartmentRouteNoteDefinition;
};

const departments: DepartmentDefinition[] = [
  {
    key: "product",
    name: "Product",
    routingKey: "strategy",
    requestTypes: "strategy, ICP, value proposition, business model or roadmap",
    purpose: "Own strategy, ICP, value proposition, business model, roadmap coherence and MVP definition.",
    whenToUse: ["define strategy", "clarify ICP", "shape MVP scope", "prioritize roadmap", "check coherence"],
    roles: [
      {
        slug: "product-strategist",
        title: "Product Strategist",
        purpose: "Connect company strategy, customer, problem, value proposition, roadmap and validation logic.",
        useWhen: ["strategy is unclear", "ICP or value proposition needs definition", "roadmap coherence is at risk"],
        beforeActing: ["../../../../product/brief.md", "../../../../product/icp.md", "../../../../product/value-proposition.md", "../../../../roadmap/current-cycle.md"],
        skills: ["define-company", "define-product", "define-icp", "define-value-proposition", "define-business-model", "create-roadmap", "check-coherence"],
        playbooks: ["product-strategy", "mvp-definition"]
      },
      {
        slug: "product-manager",
        title: "Product Manager",
        purpose: "Translate strategy into MVP scope, user stories, acceptance criteria and prioritized execution.",
        useWhen: ["MVP scope needs definition", "roadmap work needs issue-ready shape", "acceptance criteria are missing"],
        beforeActing: ["../../../../mvp/scope.md", "../../../../mvp/user-stories.md", "../../../../mvp/acceptance-criteria.md", "../../../../roadmap/backlog.md"],
        skills: ["define-product", "create-roadmap", "check-coherence"],
        playbooks: ["mvp-definition", "product-strategy"]
      }
    ],
    skills: [
      { slug: "define-company", title: "Define Company", purpose: "Clarify company context, mission, principles and operating model." },
      { slug: "define-product", title: "Define Product", purpose: "Clarify product brief, problem, target user and product status." },
      { slug: "define-icp", title: "Define ICP", purpose: "Define the first customer segment with pains, triggers and exclusions." },
      { slug: "define-value-proposition", title: "Define Value Proposition", purpose: "Articulate the promise, outcome, proof and differentiation." },
      { slug: "define-business-model", title: "Define Business Model", purpose: "Draft the revenue, channels, cost and delivery model." },
      { slug: "create-roadmap", title: "Create Roadmap", purpose: "Sequence roadmap work by validation cycle and strategic priority." },
      { slug: "check-coherence", title: "Check Coherence", purpose: "Check alignment between ICP, problem, value proposition, MVP, roadmap and issue." }
    ],
    playbooks: [
      { slug: "product-strategy", title: "Product Strategy", purpose: "Move from raw product context to coherent strategy.", steps: ["Read product brief", "Clarify ICP", "Define problem", "Define value proposition", "Check roadmap coherence"] },
      { slug: "mvp-definition", title: "MVP Definition", purpose: "Turn strategy into the smallest coherent validation scope.", steps: ["Read strategy files", "Define MVP scope", "Write user stories", "Define acceptance criteria", "List non-goals"] }
    ],
    sourceOfTruth: ["../../../company/profile.md", "../../../product/brief.md", "../../../product/icp.md", "../../../product/value-proposition.md", "../../../mvp/scope.md", "../../../roadmap/current-cycle.md"],
    commonPaths: [
      "Strategy request: role `roles/product-strategist.role.md` -> skill `skills/check-coherence.skill.md` -> playbook `playbooks/product-strategy.playbook.md`.",
      "MVP request: role `roles/product-manager.role.md` -> skill `skills/create-roadmap.skill.md` -> playbook `playbooks/mvp-definition.playbook.md`."
    ]
  },
  {
    key: "design",
    name: "Design",
    routingKey: "ux",
    requestTypes: "screens, flows, UX, UI, onboarding or usability",
    purpose: "Own UX flows, screen specs, usability states and MVP design decisions.",
    whenToUse: ["map user flows", "define screens", "design onboarding", "reason about usability", "document UX states"],
    roles: [
      {
        slug: "ux-lead",
        title: "UX Lead",
        purpose: "Translate customer and MVP context into clear flows, screens, states and usability decisions.",
        useWhen: ["the user asks about screens, flows, onboarding, UI or usability"],
        beforeActing: ["../../../../product/icp.md", "../../../../mvp/scope.md", "../../../../mvp/user-flows.md", "../../../../design/design-principles.md"],
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
    sourceOfTruth: ["../../../product/icp.md", "../../../mvp/scope.md", "../../../mvp/user-flows.md", "../../../design/user-flows.md", "../../../design/screen-specs.md"],
    commonPaths: [
      "UX request: role `roles/ux-lead.role.md` -> skill `skills/map-user-flow.skill.md` -> playbook `playbooks/mvp-ux-flow.playbook.md`.",
      "Screen request: role `roles/ux-lead.role.md` -> skill `skills/create-screen-spec.skill.md`."
    ]
  },
  {
    key: "engineering",
    name: "Engineering",
    routingKey: "engineering",
    requestTypes: "code, implementation, bugs, architecture, tests or technical decisions",
    purpose: "Own implementation, architecture, tests, technical decisions, code quality and PR readiness.",
    whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "define architecture", "write tests", "work on a GitHub issue"],
    roles: [
      {
        slug: "senior-developer",
        title: "Senior Developer",
        purpose: "Implement roadmap issues with maintainable code, tests and MVP alignment.",
        useWhen: ["implement an issue", "fix a bug", "modify code", "write tests", "refactor code", "prepare implementation for a PR"],
        beforeActing: ["../../../context/current-focus.md", "../../../../mvp/scope.md", "../../../../mvp/acceptance-criteria.md", "../../../../architecture/overview.md", "../../../../architecture/technical-decisions.md"],
        skills: ["plan-implementation", "write-tests", "create-pr"],
        playbooks: ["issue-to-pr", "pr-validation"]
      },
      {
        slug: "ai-architect",
        title: "AI Architect",
        purpose: "Design AI capabilities, prompt architecture, data flow and integration boundaries.",
        useWhen: ["AI behavior is unclear", "prompt architecture is needed", "technical boundaries need definition"],
        beforeActing: ["../../../../architecture/ai-capabilities.md", "../../../../architecture/prompt-architecture.md", "../../../../architecture/system-context.md"],
        skills: ["create-api-contract", "plan-implementation"],
        playbooks: ["issue-to-pr"]
      },
      {
        slug: "pr-reviewer",
        title: "PR Reviewer",
        purpose: "Review pull requests against scope, tests, coherence and validation goals.",
        useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
        beforeActing: ["../../../../mvp/scope.md", "../../../../mvp/acceptance-criteria.md", "../../../../.github/leanos/pr-validation-rules.md"],
        skills: ["review-pr"],
        playbooks: ["pr-validation"]
      }
    ],
    skills: [
      { slug: "plan-implementation", title: "Plan Implementation", purpose: "Turn an issue into a scoped technical implementation plan." },
      { slug: "write-tests", title: "Write Tests", purpose: "Define or update tests for changed behavior." },
      { slug: "create-pr", title: "Create PR", purpose: "Prepare a PR summary tied to scope, tests and learning." },
      { slug: "create-api-contract", title: "Create API Contract", purpose: "Define API inputs, outputs, errors and ownership boundaries." },
      { slug: "review-pr", title: "Review PR", purpose: "Review PR changes for correctness, scope and LeanOS coherence." }
    ],
    playbooks: [
      { slug: "issue-to-pr", title: "Issue to PR", purpose: "Move from a scoped issue to a reviewable pull request.", steps: ["Read issue and MVP scope", "Plan implementation", "Change code", "Update tests", "Prepare PR"] },
      { slug: "pr-validation", title: "PR Validation", purpose: "Validate implementation before merge.", steps: ["Read PR context", "Check scope", "Review tests", "Check coherence", "Recommend merge or changes"] }
    ],
    sourceOfTruth: ["../../../architecture/overview.md", "../../../architecture/technical-decisions.md", "../../../mvp/scope.md", "../../../mvp/acceptance-criteria.md", "../../../roadmap/current-cycle.md"],
    commonPaths: [
      "Implementation request: role `roles/senior-developer.role.md` -> skills `skills/plan-implementation.skill.md` and `skills/write-tests.skill.md` -> playbook `playbooks/issue-to-pr.playbook.md`.",
      "PR review request: role `roles/pr-reviewer.role.md` -> skill `skills/review-pr.skill.md` -> playbook `playbooks/pr-validation.playbook.md`."
    ]
  },
  {
    key: "validation",
    name: "Validation",
    routingKey: "validation",
    requestTypes: "assumptions, experiments, interviews, research or validation",
    purpose: "Own assumptions, experiments, interviews, success metrics and learning capture.",
    whenToUse: ["define assumptions", "plan validation", "write interview scripts", "measure success", "capture learning"],
    roles: [
      {
        slug: "validation-researcher",
        title: "Validation Researcher",
        purpose: "Design validation work that tests the riskiest product assumptions.",
        useWhen: ["research, interviews, assumptions, experiments or learning are involved"],
        beforeActing: ["../../../../validation/assumptions.md", "../../../../validation/riskiest-assumptions.md", "../../../../validation/experiments.md", "../../../../validation/success-metrics.md"],
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
    sourceOfTruth: ["../../../validation/assumptions.md", "../../../validation/experiments.md", "../../../validation/success-metrics.md", "../../../validation/learning-log.md"],
    commonPaths: [
      "Validation request: role `roles/validation-researcher.role.md` -> skill `skills/define-assumptions.skill.md` -> playbook `playbooks/mvp-validation.playbook.md`."
    ]
  },
  {
    key: "growth",
    name: "Growth",
    routingKey: "growth",
    requestTypes: "landing pages, positioning, launch or acquisition",
    purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
    whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
    roles: [
      {
        slug: "growth-lead",
        title: "Growth Lead",
        purpose: "Translate product strategy into positioning, launch and acquisition experiments.",
        useWhen: ["growth, positioning, landing pages, acquisition or launch is involved"],
        beforeActing: ["../../../../growth/positioning.md", "../../../../growth/landing-page.md", "../../../../growth/acquisition-channels.md", "../../../../growth/launch-plan.md"],
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
    sourceOfTruth: ["../../../growth/positioning.md", "../../../growth/landing-page.md", "../../../growth/acquisition-channels.md", "../../../growth/launch-plan.md"],
    commonPaths: [
      "Launch request: role `roles/growth-lead.role.md` -> skill `skills/create-launch-plan.skill.md` -> playbook `playbooks/mvp-launch.playbook.md`."
    ]
  }
];

function getActiveDepartments(answers: WorkspaceAnswers): DepartmentDefinition[] {
  const selectedDepartments = new Set(answers.departments);
  return departments.filter((department) => selectedDepartments.has(department.key));
}

function getActiveWorkflowKeys(activeDepartments: DepartmentDefinition[]): string[] {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);
  return workflowDefinitions
    .filter((workflow) => workflow.requiredDepartments.every((department) => activeKeys.has(department)))
    .map((workflow) => workflow.slug);
}

function getAvailableCommands(activeDepartments: DepartmentDefinition[]): CommandDefinition[] {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);
  return commandDefinitions.filter((command) => !command.department || activeKeys.has(command.department));
}

function getActiveDepartmentKeys(activeDepartments: DepartmentDefinition[]): Set<DepartmentDefinition["key"]> {
  return new Set(activeDepartments.map((department) => department.key));
}

const workflowDefinitions: Array<{
  slug: string;
  requiredDepartments: DepartmentDefinition["key"][];
  steps: string[];
}> = [
  {
    slug: "new-product-mvp-validation",
    requiredDepartments: ["product", "validation"],
    steps: ["Route to Product", "Define ICP", "Define MVP", "Route to Validation", "Plan experiment", "Capture learning"]
  },
  {
    slug: "existing-product-audit",
    requiredDepartments: ["product"],
    steps: ["Route to Product", "Audit product context", "Check coherence", "Route to Engineering if implementation risk exists", "Recommend next cycle"]
  },
  {
    slug: "issue-to-pr",
    requiredDepartments: ["engineering"],
    steps: ["Route to Engineering", "Activate Senior Developer", "Plan implementation", "Write tests", "Create PR"]
  },
  {
    slug: "launch-and-learn",
    requiredDepartments: ["growth", "validation"],
    steps: ["Route to Growth", "Define positioning", "Create launch plan", "Route to Validation", "Capture learning"]
  }
];

const commandDefinitions: CommandDefinition[] = [
  { slug: "init-leanos", purpose: "Initialize LeanOS by reading AGENT.md, leanos.yaml, current focus and next actions." },
  { slug: "status", purpose: "Summarize the current LeanOS workspace status." },
  { slug: "define-icp", purpose: "Define ICP.", department: "product" },
  { slug: "define-mvp", purpose: "Define MVP scope.", department: "product" },
  { slug: "check-coherence", purpose: "Check coherence across strategy, MVP, roadmap and issue.", department: "product" },
  { slug: "create-roadmap", purpose: "Create a validation-first roadmap.", department: "product" },
  { slug: "create-issues", purpose: "Draft GitHub-ready issues.", department: "product" },
  { slug: "workon-issue", purpose: "Plan issue implementation.", department: "engineering" },
  { slug: "create-pr", purpose: "Prepare a PR summary.", department: "engineering" },
  { slug: "review-pr", purpose: "Review a PR.", department: "engineering" },
  { slug: "create-role", purpose: "Create a new department-owned role using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill", purpose: "Create a new department-owned skill using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-playbook", purpose: "Create a new department-owned playbook using LeanOS AI Standard.", assetCreation: true },
  { slug: "create-skill-role-playbook", purpose: "Create a coherent role, skill and playbook set inside the correct department.", assetCreation: true }
];

const topLevelAreas: TopLevelAreaDefinition[] = [
  {
    key: "company",
    title: "Company",
    purpose: "Company source-of-truth files.",
    whenToUse: "Use for company identity, principles and operating decisions.",
    sourceOfTruth: "profile.md",
    files: [
      { name: "profile.md", content: companyProfile },
      { name: "mission.md", content: () => titledDraft("Mission", "Define why the company exists and who it serves.") },
      { name: "vision.md", content: () => titledDraft("Vision", "Describe the future state this company wants to create.") },
      { name: "principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
      { name: "operating-model.md", content: () => titledDraft("Operating Model", "Define how the company operates with humans and AI agents.") },
      { name: "decision-log.md", content: () => decisionLog("Decision Log") }
    ],
    relatedFolders: ["../product/", "../operations/"],
    agentNotes: "Update decision-log.md for meaningful company decisions."
  },
  {
    key: "product",
    title: "Product",
    purpose: "Product strategy source-of-truth files.",
    whenToUse: "Use for ICP, problem, value proposition, positioning and business model.",
    sourceOfTruth: "brief.md",
    files: [
      { name: "brief.md", content: productBrief },
      { name: "problem.md", content: () => titledDraft("Problem", "Define the painful, frequent and valuable problem.") },
      { name: "icp.md", content: () => titledDraft("Ideal Customer Profile", "Define the first customer segment to validate.") },
      { name: "jobs-to-be-done.md", content: () => titledDraft("Jobs To Be Done", "Describe the job the customer is trying to get done.") },
      { name: "value-proposition.md", content: () => titledDraft("Value Proposition", "Define promise, outcome, proof and differentiation.") },
      { name: "positioning.md", content: () => titledDraft("Positioning", "Define category, audience, problem and point of view.") },
      { name: "business-model-canvas.md", content: () => titledDraft("Business Model Canvas", "Define customers, channels, revenue, costs, partners and key activities.") }
    ],
    relatedFolders: ["../company/", "../mvp/", "../roadmap/"],
    agentNotes: "Product decisions should stay coherent with MVP and validation files."
  },
  {
    key: "validation",
    title: "Validation",
    purpose: "Validation source-of-truth files.",
    whenToUse: "Use for assumptions, experiments, interviews, metrics and learning.",
    sourceOfTruth: "assumptions.md",
    files: [
      { name: "assumptions.md", content: () => titledDraft("Assumptions", "List assumptions behind customer, problem, value and MVP.") },
      { name: "riskiest-assumptions.md", content: () => titledDraft("Riskiest Assumptions", "Prioritize assumptions that could invalidate the product.") },
      { name: "experiments.md", content: () => titledDraft("Experiments", "Plan validation experiments.") },
      { name: "interview-script.md", content: () => titledDraft("Interview Script", "Prepare customer discovery questions.") },
      { name: "success-metrics.md", content: () => titledDraft("Success Metrics", "Define validation signals.") },
      { name: "learning-log.md", content: () => learningLog() }
    ],
    relatedFolders: ["../product/", "../mvp/"],
    agentNotes: "Validation should test assumptions before expanding scope."
  },
  {
    key: "mvp",
    title: "MVP",
    purpose: "MVP source-of-truth files.",
    whenToUse: "Use for MVP scope, stories, flows, acceptance criteria and release readiness.",
    sourceOfTruth: "scope.md",
    files: [
      { name: "scope.md", content: () => titledDraft("MVP Scope", "Define the smallest coherent product scope.") },
      { name: "user-stories.md", content: () => titledDraft("User Stories", "Capture user stories in priority order.") },
      { name: "user-flows.md", content: () => titledDraft("User Flows", "Describe core MVP flows.") },
      { name: "acceptance-criteria.md", content: () => titledDraft("Acceptance Criteria", "Define completion criteria.") },
      { name: "non-goals.md", content: () => titledDraft("Non-Goals", "List what is intentionally excluded.") },
      { name: "release-checklist.md", content: () => checklist("MVP Release Checklist") }
    ],
    relatedFolders: ["../product/", "../validation/", "../roadmap/"],
    agentNotes: "The MVP should be the smallest coherent validation scope."
  },
  {
    key: "design",
    title: "Design",
    purpose: "Design source-of-truth files.",
    whenToUse: "Use for design principles, flows, screen specs, UX decisions and usability notes.",
    sourceOfTruth: "design-principles.md",
    files: [
      { name: "design-principles.md", content: () => titledDraft("Design Principles", "Define UX principles for the product.") },
      { name: "user-flows.md", content: () => titledDraft("User Flows", "Document key user flows.") },
      { name: "screen-specs.md", content: () => titledDraft("Screen Specs", "Define screen behavior and states.") },
      { name: "ux-decisions.md", content: () => decisionLog("UX Decisions") },
      { name: "usability-notes.md", content: () => titledDraft("Usability Notes", "Capture usability observations.") }
    ],
    relatedFolders: ["../mvp/", "../product/"],
    agentNotes: { department: "design", label: "Design" }
  },
  {
    key: "roadmap",
    title: "Roadmap",
    purpose: "Roadmap source-of-truth files.",
    whenToUse: "Use for current cycle, milestones and backlog.",
    sourceOfTruth: "current-cycle.md",
    files: [
      { name: "roadmap.md", content: () => titledDraft("Roadmap", "Sequence product work by validation cycle.") },
      { name: "milestones.md", content: () => titledDraft("Milestones", "Define visible checkpoints.") },
      { name: "current-cycle.md", content: () => titledDraft("Current Cycle", "Define the current validation or delivery cycle.") },
      { name: "backlog.md", content: () => titledDraft("Backlog", "Collect candidate work before prioritization.") }
    ],
    relatedFolders: ["../product/", "../mvp/"],
    agentNotes: "Roadmap work should be validation-first."
  },
  {
    key: "architecture",
    title: "Architecture",
    purpose: "Technical source-of-truth files.",
    whenToUse: "Use for system context, data model, API contracts, AI capabilities and technical decisions.",
    sourceOfTruth: "overview.md",
    files: [
      { name: "overview.md", content: () => titledDraft("Architecture Overview", "Describe the current or intended architecture.") },
      { name: "system-context.md", content: () => titledDraft("System Context", "Define actors, systems and boundaries.") },
      { name: "data-model.md", content: () => titledDraft("Data Model", "Describe core entities and relationships.") },
      { name: "api-contract.md", content: () => titledDraft("API Contract", "Define API inputs, outputs and errors.") },
      { name: "ai-capabilities.md", content: () => titledDraft("AI Capabilities", "Define AI features and responsibilities.") },
      { name: "prompt-architecture.md", content: () => titledDraft("Prompt Architecture", "Define prompt strategy and context boundaries.") },
      { name: "integrations.md", content: () => titledDraft("Integrations", "Document external systems and APIs.") },
      { name: "technical-decisions.md", content: () => decisionLog("Technical Decisions") }
    ],
    relatedFolders: ["../mvp/", "../.leanos/departments/engineering/"],
    agentNotes: {
      department: "engineering",
      label: "Engineering",
      activeMessage: "Route implementation through `.leanos/departments/engineering/README.md` before changing code."
    }
  },
  {
    key: "growth",
    title: "Growth",
    purpose: "Growth source-of-truth files.",
    whenToUse: "Use for positioning, landing pages, acquisition and launch.",
    sourceOfTruth: "positioning.md",
    files: [
      { name: "positioning.md", content: () => titledDraft("Positioning", "Define market-facing positioning.") },
      { name: "landing-page.md", content: () => titledDraft("Landing Page", "Draft landing page message and conversion goal.") },
      { name: "acquisition-channels.md", content: () => titledDraft("Acquisition Channels", "List channels and first experiments.") },
      { name: "launch-plan.md", content: () => titledDraft("Launch Plan", "Plan launch actions and learning loops.") }
    ],
    relatedFolders: ["../product/", "../validation/"],
    agentNotes: { department: "growth", label: "Growth" }
  },
  {
    key: "operations",
    title: "Operations",
    purpose: "Operating cadence and risk source-of-truth files.",
    whenToUse: "Use for weekly review, metrics and risks.",
    sourceOfTruth: "weekly-review.md",
    files: [
      { name: "weekly-review.md", content: () => titledDraft("Weekly Review", "Review progress, blockers, decisions and next actions.") },
      { name: "metrics-review.md", content: () => titledDraft("Metrics Review", "Review key product and validation metrics.") },
      { name: "risk-register.md", content: () => titledDraft("Risk Register", "Track product, technical, legal and operational risks.") }
    ],
    relatedFolders: ["../company/", "../validation/"],
    agentNotes: "Use operations files to keep the company cadence visible."
  }
];

export function createWorkspaceFiles(answers: WorkspaceAnswers): FileEntry[] {
  const activeDepartments = getActiveDepartments(answers);

  return [
    { path: "AGENT.md", content: rootAgent(activeDepartments) },
    { path: "README.md", content: workspaceReadme(answers, activeDepartments) },
    { path: "leanos.yaml", content: createLeanOsYaml(answers, activeDepartments) },
    ...leanosCoreFiles(),
    ...aiStandardFiles(),
    ...indexFiles(activeDepartments),
    ...departmentFiles(activeDepartments),
    ...workflowFiles(activeDepartments),
    ...commandFiles(activeDepartments),
    ...contextFiles(answers, activeDepartments),
    ...topLevelWorkspaceFiles(answers, activeDepartments),
    ...githubFiles(activeDepartments),
    ...vscodeIntegrationFiles()
  ];
}

function createLeanOsYaml(answers: WorkspaceAnswers, activeDepartments: DepartmentDefinition[]): string {
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
        doc: ".leanos/ai-standard/navigation-chain.md"
      },
      standard_library: ".leanos/ai-standard"
    },
    governance: {
      mode: "balanced"
    },
    github: {
      status: "not_configured",
      project_sync: "disabled"
    },
    architecture: {
      stack_status: "undefined"
    },
    departments: {
      active: activeDepartments.map((department) => department.key)
    },
    roles: {
      ownership: "department-first",
      active: Object.fromEntries(activeDepartments.map((department) => [department.key, department.roles.map((role) => role.slug)]))
    },
    skills: {
      ownership: "department-first"
    },
    playbooks: {
      ownership: "department-first"
    },
    workflows: {
      active: getActiveWorkflowKeys(activeDepartments)
    },
    ai_standard: {
      enabled: true,
      path: ".leanos/ai-standard",
      templates_path: ".leanos/ai-standard/templates",
      checklists_path: ".leanos/ai-standard/checklists",
      instructions_path: ".leanos/ai-standard/instructions"
    }
  });
}

function rootAgent(activeDepartments: DepartmentDefinition[]): string {
  const routingLines = activeDepartments.map((department) => `If the user asks about ${department.requestTypes}:\n\nGo to:\n\n\`.leanos/departments/${department.key}/README.md\``);

  return `# AGENT.md

You are operating inside a LeanOS workspace.

LeanOS is an agent-native startup operating system that helps founders build AI-first products from strategy to validated MVP.

You are not only a coding assistant.

You must behave as the LeanOS Chief Agent and route the user's request to the correct department, role, skills and playbook.

## Always Start Here

Before acting, read:

1. \`leanos.yaml\`
2. \`.leanos/context/current-focus.md\`
3. \`.leanos/context/next-actions.md\`
4. This \`AGENT.md\`

## LeanOS Navigation Chain

Follow this chain:

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

Do not load all departments.
Do not load all roles.
Do not load all skills.
Do not load all playbooks.

Load only the minimum files required for the current task.

## Routing

${routingLines.join("\n\n")}

If the user asks about a department that is not active in \`leanos.yaml\`, do not load a missing department path. Ask whether to activate or create that department using the LeanOS AI Standard.

If the user asks to create a new role, skill, playbook, command, workflow, README or department:

Go to:

\`.leanos/ai-standard/README.md\`

## Role Activation Rule

Before executing a task, explicitly identify:

- Active Department
- Active Role
- Loaded Skills
- Relevant Playbook

Then execute the task.

## Output Standard

Start task responses with:

Active Department:
Active Role:
Loaded Skills:
Relevant Playbook:

Then continue with the task-specific output.
`;
}

function getWorkspaceReadmeStatus(activeDepartments: DepartmentDefinition[]): string {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);
  const productStatus = activeKeys.has("product") ? "Needs definition" : "Product department not active";

  return [
    "- Company profile: Draft",
    "- Product brief: Draft",
    `- Active departments: ${formatActiveDepartments(activeDepartments)}`,
    `- ICP: ${productStatus}`,
    `- Value proposition: ${productStatus === "Needs definition" ? "Not defined" : "Product department not active"}`,
    `- MVP scope: ${productStatus === "Needs definition" ? "Not defined" : "Product department not active"}`,
    "- Roadmap: Not created",
    "- GitHub sync: Not connected",
    "- Coherence score: Not available yet"
  ].join("\n");
}

function getRecommendedCommand(activeDepartments: DepartmentDefinition[]): { label: string; command: string } {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);

  if (activeKeys.has("product")) {
    return { label: "Define your ICP", command: "/define icp" };
  }

  return { label: "Check workspace status before choosing or activating another department", command: "/status" };
}

function formatCommandInvocation(command: string): string {
  if (command === "init-leanos") {
    return "/init leanos";
  }

  if (command === "create-skill-role-playbook") {
    return "/create-skill-role-playbook";
  }

  return `/${command.replaceAll("-", " ")}`;
}

function formatActiveDepartments(activeDepartments: DepartmentDefinition[]): string {
  if (activeDepartments.length === 0) {
    return "none";
  }

  return activeDepartments.map((department) => department.key).join(", ");
}

function workspaceReadme(answers: WorkspaceAnswers, activeDepartments: DepartmentDefinition[]): string {
  const availableCommands = getAvailableCommands(activeDepartments);
  const recommendedCommand = getRecommendedCommand(activeDepartments);

  return `# ${answers.productName}

This workspace is powered by LeanOS.

LeanOS helps you transform startup strategy into roadmap, GitHub issues, branches, pull requests and validated MVP learning.

## Start Here

Open your editor chat and type:

\`\`\`text
/init leanos
\`\`\`

## For AI Agents

The universal agent entrypoint is:

\`AGENT.md\`

Any model working in this repository should start there.

## LeanOS Navigation Chain

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

## Useful Commands

\`\`\`text
${availableCommands.map((command) => formatCommandInvocation(command.slug)).join("\n")}
\`\`\`

Commands tied to inactive departments are generated with warnings in \`.leanos/commands/\`, but should not be run until the department is active.

## Current LeanOS Status

${getWorkspaceReadmeStatus(activeDepartments)}

## Recommended Next Step

${recommendedCommand.label}:

\`\`\`text
${recommendedCommand.command}
\`\`\`
`;
}

function leanosCoreFiles(): FileEntry[] {
  return [
    { path: ".leanos/README.md", content: folderReadme("LeanOS", "LeanOS operating files for the Chief Agent.", "Use when routing agent behavior, commands, departments, workflows or standards.", "leanos.yaml", ["agent/", "ai-standard/", "departments/", "commands/", "context/", "workflows/", "index/", "vscode/"], ["../AGENT.md", "../README.md"], "Start at ../AGENT.md, then load only the relevant local README.") },
    { path: ".leanos/agent/README.md", content: folderReadme("Agent", "Chief Agent operating guidance.", "Use when defining how the agent loads context, activates roles and formats output.", "chief-agent.md", ["chief-agent.md", "operating-rules.md", "context-loading.md", "role-activation.md", "output-standards.md"], ["../ai-standard/", "../departments/", "../commands/"], "Keep this folder concise; route detailed work to departments.") },
    { path: ".leanos/agent/chief-agent.md", content: chiefAgent() },
    { path: ".leanos/agent/operating-rules.md", content: operatingRules() },
    { path: ".leanos/agent/context-loading.md", content: contextLoading() },
    { path: ".leanos/agent/role-activation.md", content: roleActivation() },
    { path: ".leanos/agent/output-standards.md", content: outputStandards() }
  ];
}

function chiefAgent(): string {
  return `# Chief Agent

You are the LeanOS Chief Agent.

Your job is to route the user's request through the Navigation Chain, activate the correct role, load the minimum skills and playbooks, and produce coherent output.

## Navigation

Start from \`../../AGENT.md\`.

Use:

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

For creating LeanOS assets, use:

\`AGENT.md -> ai-standard README -> instructions -> templates -> checklists -> new asset\`
`;
}

function operatingRules(): string {
  return `# Operating Rules

- Do not load the whole workspace by default.
- Do not implement before routing to a department and role.
- Keep strategy, validation, roadmap and implementation connected.
- Prefer the smallest coherent action.
- When creating LeanOS assets, consult \`../ai-standard/README.md\` first.
- Keep READMEs updated when folders gain important files.
`;
}

function contextLoading(): string {
  return `# Context Loading

## Required Startup Context

1. \`../../leanos.yaml\`
2. \`../context/current-focus.md\`
3. \`../context/next-actions.md\`
4. \`../../AGENT.md\`

## Lazy Loading Rule

After startup, load only the department README, role, skills and playbook needed for the current task.
`;
}

function roleActivation(): string {
  return `# Role Activation

Before executing any task, identify:

- Active Department
- Active Role
- Loaded Skills
- Relevant Playbook

Use department READMEs as routers. Do not guess the role when the README gives a path.
`;
}

function outputStandards(): string {
  return `# Output Standards

Start task responses with:

\`\`\`text
Active Department:
Active Role:
Loaded Skills:
Relevant Playbook:
\`\`\`

Then provide the task-specific output. Keep outputs concise, decision-oriented and connected to source-of-truth files.
`;
}

function aiStandardFiles(): FileEntry[] {
  const templateFiles: Record<string, string> = {
    "agent-template.md": agentTemplate(),
    "root-readme-template.md": rootReadmeTemplate(),
    "folder-readme-template.md": folderReadmeTemplate(),
    "department-readme-template.md": departmentReadmeTemplate(),
    "department-template.md": markdownAssetTemplate("Department", ["Purpose", "When to Use", "Choose a Role", "Common Paths", "Source of Truth", "Agent Notes"]),
    "department-template.yaml": yamlTemplate("department"),
    "role-template.md": markdownAssetTemplate("Role", ["Purpose", "Use This Role When", "Before Acting", "Responsibilities", "Skills", "Playbooks", "Source of Truth Files", "Output Style", "Quality Checklist"]),
    "role-template.yaml": yamlTemplate("role"),
    "skill-template.md": markdownAssetTemplate("Skill", ["Purpose", "Inputs", "Process", "Expected Output", "Source of Truth", "Quality Checklist", "Navigation"]),
    "skill-template.yaml": yamlTemplate("skill"),
    "playbook-template.md": markdownAssetTemplate("Playbook", ["Purpose", "When to Use", "Sequence", "Inputs", "Outputs", "Quality Checklist", "Navigation"]),
    "playbook-template.yaml": yamlTemplate("playbook"),
    "workflow-template.md": markdownAssetTemplate("Workflow", ["Purpose", "Trigger", "Sequence", "Departments", "Outputs", "Navigation"]),
    "command-template.md": markdownAssetTemplate("Command", ["Purpose", "Before Acting", "Process", "Expected Output", "AI Standard Checks"]),
    "github-issue-template.md": markdownAssetTemplate("GitHub Issue", ["Context", "Scope", "Acceptance Criteria", "LeanOS Coherence"])
  };

  const checklistFiles = [
    "agent-quality-checklist",
    "readme-quality-checklist",
    "department-quality-checklist",
    "role-quality-checklist",
    "skill-quality-checklist",
    "playbook-quality-checklist",
    "command-quality-checklist"
  ];

  const instructionFiles = [
    "create-agent-instructions",
    "create-readme-instructions",
    "create-department-instructions",
    "create-role-instructions",
    "create-skill-instructions",
    "create-playbook-instructions",
    "create-workflow-instructions",
    "create-command-instructions"
  ];

  const exampleFiles: Record<string, string> = {
    "example-agent.md": rootAgent(departments),
    "example-folder-readme.md": folderReadmeTemplate(),
    "example-role-senior-developer.md": roleFile(departments[2], departments[2].roles[0]),
    "example-role-ux-lead.md": roleFile(departments[1], departments[1].roles[0]),
    "example-skill-check-coherence.md": skillFile(departments[0], departments[0].skills.find((skill) => skill.slug === "check-coherence")!),
    "example-skill-create-roadmap.md": skillFile(departments[0], departments[0].skills.find((skill) => skill.slug === "create-roadmap")!),
    "example-playbook-issue-to-pr.md": playbookFile(departments[2], departments[2].playbooks[0])
  };

  return [
    { path: ".leanos/ai-standard/README.md", content: aiStandardReadme() },
    { path: ".leanos/ai-standard/navigation-chain.md", content: navigationChain() },
    { path: ".leanos/ai-standard/creation-rules.md", content: aiStandardDoc("Creation Rules", ["Use the Creation Chain before creating any LeanOS asset.", "Create assets inside the correct department when they are role, skill or playbook assets.", "Every asset must point to the next right file.", "Every asset must pass the relevant checklist."]) },
    { path: ".leanos/ai-standard/naming-conventions.md", content: aiStandardDoc("Naming Conventions", ["Use lowercase kebab-case file names.", "Use suffixes: .role.md, .skill.md, .playbook.md, .workflow.md.", "Department folders use singular domain names such as product, design, engineering, validation and growth."]) },
    { path: ".leanos/ai-standard/quality-criteria.md", content: aiStandardDoc("Quality Criteria", ["Assets must be concise.", "Assets must include navigation guidance.", "Assets must declare source-of-truth files.", "Assets must avoid duplicating the whole system."]) },
    { path: ".leanos/ai-standard/folder-readme-rules.md", content: aiStandardDoc("Folder README Rules", ["Every important folder needs a README.md.", "READMEs must explain purpose, when to use, source of truth, files, related folders, navigation and agent notes.", "Use relative links."]) },
    { path: ".leanos/ai-standard/templates/README.md", content: folderReadme("AI Standard Templates", "Reusable templates for creating LeanOS assets.", "Use before creating agents, READMEs, departments, roles, skills, playbooks, workflows or commands.", "../README.md", Object.keys(templateFiles), ["../checklists/", "../instructions/"], "Choose the template that matches the asset type, then run the checklist.") },
    ...Object.entries(templateFiles).map(([fileName, content]) => ({ path: `.leanos/ai-standard/templates/${fileName}`, content })),
    { path: ".leanos/ai-standard/checklists/README.md", content: folderReadme("AI Standard Checklists", "Quality gates for LeanOS assets.", "Use after drafting or updating any LeanOS asset.", "../quality-criteria.md", checklistFiles.map((name) => `${name}.md`), ["../templates/", "../instructions/"], "Run the checklist for the asset type before finalizing.") },
    ...checklistFiles.map((name) => ({ path: `.leanos/ai-standard/checklists/${name}.md`, content: checklist(name) })),
    { path: ".leanos/ai-standard/instructions/README.md", content: folderReadme("AI Standard Instructions", "Step-by-step creation instructions for LeanOS assets.", "Use when the user asks to create or update a LeanOS asset.", "../creation-rules.md", instructionFiles.map((name) => `${name}.md`), ["../templates/", "../checklists/"], "Follow instructions, template and checklist in that order.") },
    ...instructionFiles.map((name) => ({ path: `.leanos/ai-standard/instructions/${name}.md`, content: instruction(name) })),
    { path: ".leanos/ai-standard/examples/README.md", content: folderReadme("AI Standard Examples", "Reference examples for LeanOS assets.", "Use when a new asset needs an example shape.", "../README.md", Object.keys(exampleFiles), ["../templates/", "../checklists/"], "Examples guide shape but should not be copied blindly.") },
    ...Object.entries(exampleFiles).map(([fileName, content]) => ({ path: `.leanos/ai-standard/examples/${fileName}`, content }))
  ];
}

function aiStandardReadme(): string {
  return `# LeanOS AI Standard

## Purpose

The AI Standard teaches the LeanOS Chief Agent how to create new roles, skills, playbooks, workflows, commands, departments and READMEs consistently.

## When to Use

Use this folder whenever the user asks to create or update a LeanOS asset.

## Creation Chain

\`AGENT.md -> ai-standard README -> instructions -> templates -> checklists -> new asset\`

## Source of Truth

- \`navigation-chain.md\`
- \`creation-rules.md\`
- \`templates/\`
- \`checklists/\`
- \`instructions/\`

## Agent Notes

Do not create assets from memory. Choose the right instruction, use the matching template and run the checklist.
`;
}

function navigationChain(): string {
  return `# LeanOS Navigation Chain

## Purpose

The LeanOS Navigation Chain ensures that the Chief Agent loads only the minimum context required for the current task.

## Chain

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

## Creation Chain

\`AGENT.md -> ai-standard README -> instructions -> templates -> checklists -> new asset\`

## Rules

- Do not load all departments.
- Do not load all roles.
- Do not load all skills.
- Do not load all playbooks.
- Follow links from one file to the next.
- Each file should guide the agent to the next right file.
- Every generated LeanOS asset must include navigation guidance.
`;
}

function aiStandardDoc(title: string, rules: string[]): string {
  return `# ${title}

${rules.map((rule) => `- ${rule}`).join("\n")}
`;
}

function agentTemplate(): string {
  return `# AGENT.md

You are operating inside a LeanOS workspace.

## Always Start Here

1. \`leanos.yaml\`
2. \`.leanos/context/current-focus.md\`
3. \`.leanos/context/next-actions.md\`
4. This \`AGENT.md\`

## Navigation Chain

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

## Routing

Route to the smallest department context needed for the user's task.
`;
}

function rootReadmeTemplate(): string {
  return `# Product Name

This workspace is powered by LeanOS.

## Start Here

\`/init leanos\`

## For AI Agents

Start from \`AGENT.md\`.

## Navigation Chain

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`
`;
}

function folderReadmeTemplate(): string {
  return `# Folder Name

## Purpose

## When to Use

## Source of Truth

## Files

## Related Folders

## Navigation

## Agent Notes
`;
}

function departmentReadmeTemplate(): string {
  return `# Department Name

## Purpose

## When to Use

## Choose a Role

## Common Paths

## Source of Truth

## Related Product Files

## Agent Notes
`;
}

function markdownAssetTemplate(title: string, sections: string[]): string {
  return [`# ${title} Name`, "", ...sections.flatMap((section) => [`## ${section}`, "", "TBD", ""])].join("\n");
}

function yamlTemplate(kind: string): string {
  return stringifyYaml({
    type: kind,
    name: "example-name",
    owner: "department",
    source_of_truth: [],
    related_assets: []
  });
}

function checklist(name: string): string {
  return `# ${toTitle(name)}

- [ ] The asset has a clear purpose.
- [ ] The asset points to the next right file.
- [ ] The asset names source-of-truth files.
- [ ] The asset is concise.
- [ ] The asset avoids duplicating unrelated context.
`;
}

function instruction(name: string): string {
  const asset = name.replace("create-", "").replace("-instructions", "");

  return `# ${toTitle(name)}

## Process

1. Read \`../README.md\`.
2. Read \`../navigation-chain.md\`.
3. Read \`../creation-rules.md\`.
4. Select the matching template in \`../templates/\`.
5. Create or update the ${asset} in the correct folder.
6. Run the matching checklist in \`../checklists/\`.

## Department-First Rule

Roles, skills and playbooks must live inside the correct department:

\`.leanos/departments/<department>/roles/\`
\`.leanos/departments/<department>/skills/\`
\`.leanos/departments/<department>/playbooks/\`
`;
}

function indexFiles(activeDepartments: DepartmentDefinition[]): FileEntry[] {
  const routing = Object.fromEntries(
    activeDepartments.map((department) => [department.routingKey, `../departments/${department.key}/README.md`])
  );

  return [
    { path: ".leanos/index/README.md", content: folderReadme("LeanOS Index", "Structured maps that help agents route without loading every asset.", "Use when a model needs a quick routing map.", "routing-map.yaml", ["departments.yaml", "roles.yaml", "skills.yaml", "playbooks.yaml", "workflows.yaml", "routing-map.yaml"], ["../departments/", "../workflows/"], "Use index files as maps, then load the destination README.") },
    { path: ".leanos/index/departments.yaml", content: stringifyYaml({ departments: activeDepartments.map((department) => ({ key: department.key, path: `../departments/${department.key}/README.md` })) }) },
    { path: ".leanos/index/roles.yaml", content: stringifyYaml({ roles: activeDepartments.flatMap((department) => department.roles.map((role) => ({ key: role.slug, department: department.key, path: `../departments/${department.key}/roles/${role.slug}.role.md` }))) }) },
    { path: ".leanos/index/skills.yaml", content: stringifyYaml({ skills: activeDepartments.flatMap((department) => department.skills.map((skill) => ({ key: skill.slug, department: department.key, path: `../departments/${department.key}/skills/${skill.slug}.skill.md` }))) }) },
    { path: ".leanos/index/playbooks.yaml", content: stringifyYaml({ playbooks: activeDepartments.flatMap((department) => department.playbooks.map((playbook) => ({ key: playbook.slug, department: department.key, path: `../departments/${department.key}/playbooks/${playbook.slug}.playbook.md` }))) }) },
    { path: ".leanos/index/workflows.yaml", content: stringifyYaml({ workflows: workflowDefinitions.map((workflow) => ({ key: workflow.slug, path: `../workflows/${workflow.slug}.workflow.md`, active: getActiveWorkflowKeys(activeDepartments).includes(workflow.slug) })) }) },
    { path: ".leanos/index/routing-map.yaml", content: stringifyYaml({ routing: { ...routing, asset_creation: "../ai-standard/README.md" } }) }
  ];
}

function departmentFiles(activeDepartments: DepartmentDefinition[]): FileEntry[] {
  return [
    { path: ".leanos/departments/README.md", content: folderReadme("Departments", "Department-first ownership for roles, skills and playbooks.", "Use after AGENT.md routes a task to a domain.", "../index/departments.yaml", activeDepartments.map((department) => `${department.key}/`), ["../ai-standard/", "../commands/", "../workflows/"], "Choose one department README, then follow its local path.") },
    ...activeDepartments.flatMap((department) => [
      { path: `.leanos/departments/${department.key}/README.md`, content: departmentReadme(department) },
      { path: `.leanos/departments/${department.key}/department.yaml`, content: departmentYaml(department) },
      { path: `.leanos/departments/${department.key}/roles/README.md`, content: folderReadme(`${department.name} Roles`, `Roles owned by the ${department.name} department.`, "Use after the department README selects a role.", "../README.md", department.roles.map((role) => `${role.slug}.role.md`), ["../skills/", "../playbooks/"], "Load one role, then follow its skills and playbooks.") },
      ...department.roles.map((role) => ({ path: `.leanos/departments/${department.key}/roles/${role.slug}.role.md`, content: roleFile(department, role) })),
      { path: `.leanos/departments/${department.key}/skills/README.md`, content: folderReadme(`${department.name} Skills`, `Skills owned by the ${department.name} department.`, "Use when a selected role points to a skill.", "../README.md", department.skills.map((skill) => `${skill.slug}.skill.md`), ["../roles/", "../playbooks/"], "Load only skills needed for the active task.") },
      ...department.skills.map((skill) => ({ path: `.leanos/departments/${department.key}/skills/${skill.slug}.skill.md`, content: skillFile(department, skill) })),
      { path: `.leanos/departments/${department.key}/playbooks/README.md`, content: folderReadme(`${department.name} Playbooks`, `Execution sequences owned by the ${department.name} department.`, "Use when a selected role points to a playbook.", "../README.md", department.playbooks.map((playbook) => `${playbook.slug}.playbook.md`), ["../roles/", "../skills/"], "Use playbooks for sequencing, not for duplicating skill details.") },
      ...department.playbooks.map((playbook) => ({ path: `.leanos/departments/${department.key}/playbooks/${playbook.slug}.playbook.md`, content: playbookFile(department, playbook) }))
    ])
  ];
}

function departmentReadme(department: DepartmentDefinition): string {
  return `# ${department.name} Department

## Purpose

${department.purpose}

## When to Use

Use this department when the user asks to:

${department.whenToUse.map((item) => `- ${item}`).join("\n")}

## Choose a Role

${department.roles.map((role) => `For ${role.useWhen[0]}, use:\n\n\`roles/${role.slug}.role.md\``).join("\n\n")}

## Common Paths

${department.commonPaths.map((path) => `- ${path}`).join("\n")}

## Source of Truth

Also read when needed:

${department.sourceOfTruth.map((file) => `- \`${file}\``).join("\n")}

## Related Product Files

${department.sourceOfTruth.map((file) => `- \`${file}\``).join("\n")}

## Agent Notes

Do not execute before selecting one role and the minimum skills/playbooks for the task.
`;
}

function departmentYaml(department: DepartmentDefinition): string {
  return stringifyYaml({
    department: department.key,
    purpose: department.purpose,
    roles: department.roles.map((role) => role.slug),
    skills: department.skills.map((skill) => skill.slug),
    playbooks: department.playbooks.map((playbook) => playbook.slug)
  });
}

function roleFile(department: DepartmentDefinition, role: RoleDefinition): string {
  return `# ${role.title} Role

## Purpose

${role.purpose}

## Use This Role When

${role.useWhen.map((item) => `- ${item}`).join("\n")}

## Before Acting

Read:

${role.beforeActing.map((file) => `- \`${file}\``).join("\n")}

## Responsibilities

- Route the task through the ${department.name} department.
- Load only the required skills and playbooks.
- Keep output aligned with source-of-truth files.

## Skills

${role.skills.map((skill) => `For ${toTitle(skill)}:\n\n\`../skills/${skill}.skill.md\``).join("\n\n")}

## Playbooks

${role.playbooks.map((playbook) => `For ${toTitle(playbook)}:\n\n\`../playbooks/${playbook}.playbook.md\``).join("\n\n")}

## Source of Truth Files

${department.sourceOfTruth.map((file) => `- \`${file}\``).join("\n")}

## Output Style

Always respond with:

1. Active Department
2. Active Role
3. Loaded Skills
4. Relevant Playbook
5. Understanding of the task
6. Plan or output
7. Risks
8. Next action

## Quality Checklist

- [ ] Active department and role are explicit.
- [ ] Only required skills were loaded.
- [ ] Output references source-of-truth files.
- [ ] Work stays inside the user's requested scope.
`;
}

function skillFile(department: DepartmentDefinition, skill: SkillDefinition): string {
  return `# ${skill.title} Skill

## Purpose

${skill.purpose}

## Inputs

- Active department README
- Active role file
- Relevant source-of-truth files

## Process

1. Confirm the active role.
2. Read only the required source-of-truth files.
3. Produce the smallest useful output.
4. Point to the next playbook or command.

## Expected Output

- Current context
- Key decision or recommendation
- Files to update
- Suggested next action

## Navigation

Return to \`../README.md\` or continue to a playbook in \`../playbooks/\`.

## Agent Notes

This skill belongs to the ${department.name} department. Do not use it as a global skill without routing through the department first.
`;
}

function playbookFile(department: DepartmentDefinition, playbook: PlaybookDefinition): string {
  return `# ${playbook.title} Playbook

## Purpose

${playbook.purpose}

## When to Use

Use this playbook when the active ${department.name} role needs a sequence of execution.

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

function workflowFiles(activeDepartments: DepartmentDefinition[]): FileEntry[] {
  const activeKeys = new Set(activeDepartments.map((department) => department.key));

  return [
    { path: ".leanos/workflows/README.md", content: folderReadme("Workflows", "Cross-department LeanOS workflows.", "Use when work spans more than one department.", "../index/workflows.yaml", workflowDefinitions.map((workflow) => `${workflow.slug}.workflow.md`), ["../departments/", "../context/"], "Workflows route between departments; if a required department is not active, ask before activating or creating it.") },
    ...workflowDefinitions.map((workflow) => {
      const missingDepartments = workflow.requiredDepartments.filter((department) => !activeKeys.has(department));

      return {
        path: `.leanos/workflows/${workflow.slug}.workflow.md`,
        content: `# ${toTitle(workflow.slug)} Workflow

## Purpose

Coordinate a LeanOS flow across departments without loading the whole workspace.

## Required Departments

${workflow.requiredDepartments.map((department) => `- ${department}`).join("\n")}

${missingDepartments.length > 0 ? `## Availability\n\nThis workflow references departments that are not currently active: ${missingDepartments.join(", ")}.\n\nDo not load missing department paths. Ask whether to activate or create the missing department before executing this workflow.\n` : "## Availability\n\nAll required departments are active in this workspace.\n"}

## Sequence

${workflow.steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}

## Navigation

Use department READMEs for each step. Do not bypass department-first ownership.
`
      };
    })
  ];
}

function commandFiles(activeDepartments: DepartmentDefinition[]): FileEntry[] {
  const activeKeys = activeDepartments.map((department) => department.key);
  const availableCommands = getAvailableCommands(activeDepartments);

  return [
    { path: ".leanos/commands/README.md", content: folderReadme("Commands", "Slash command instructions for LeanOS agent chats.", "Use when the user invokes or describes a LeanOS command.", "../index/routing-map.yaml", commandDefinitions.map((command) => `${command.slug}.md`), ["../departments/", "../ai-standard/"], `Available now: ${availableCommands.map((command) => formatCommandInvocation(command.slug)).join(", ")}. Commands tied to inactive departments include a warning and require explicit activation before use.`) },
    ...commandDefinitions.map((command) => ({
      path: `.leanos/commands/${command.slug}.md`,
      content: command.assetCreation ? assetCreationCommand(command, activeKeys) : routingCommand(command, activeKeys)
    }))
  ];
}

function routingCommand(command: CommandDefinition, activeDepartments: string[]): string {
  const departmentAvailable = !command.department || activeDepartments.includes(command.department);
  const departmentGuidance = command.department
    ? departmentAvailable
      ? `Route through \`../departments/${command.department}/README.md\`.`
      : `This command normally uses the ${command.department} department, which is not active in this workspace. Do not load missing paths. Ask whether to activate or create that department before executing.`
    : "Use AGENT.md and the routing map to choose the smallest active department context.";

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

Read:

- \`../../AGENT.md\`
- \`../context/current-focus.md\`
- \`../context/next-actions.md\`

## Process

1. ${departmentGuidance}
2. Activate the role named by that department.
3. Load only the required skills and playbook.
4. Produce the requested output.

## Active Departments

${activeDepartments.map((department) => `- ${department}`).join("\n")}
`;
}

function assetCreationCommand(command: CommandDefinition, activeDepartments: string[]): string {
  const activeKeys = new Set(activeDepartments);

  return `# ${formatCommandInvocation(command.slug)}

## Purpose

${command.purpose}

## Before Acting

First consult:

- \`../ai-standard/README.md\`
- \`../ai-standard/navigation-chain.md\`
- \`../ai-standard/creation-rules.md\`
- \`../ai-standard/templates/\`
- \`../ai-standard/checklists/\`
- \`../ai-standard/instructions/\`

## Department-First Rule

Create role, skill and playbook assets inside the correct department:

${departments.map((department) => `- ${department.name} assets: \`../departments/${department.key}/\`${activeKeys.has(department.key) ? "" : " (not active; ask before activating or creating it)"}`).join("\n")}

## Expected Output

- Selected department
- Assets to create
- Templates used
- Checklists used
- Files created or updated

## Active Departments

${activeDepartments.map((department) => `- ${department}`).join("\n")}
`;
}

function contextFiles(answers: WorkspaceAnswers, activeDepartments: DepartmentDefinition[]): FileEntry[] {
  const activeWorkflows = getActiveWorkflowKeys(activeDepartments);

  return [
    { path: ".leanos/context/README.md", content: folderReadme("Context", "Current workspace state that helps the Chief Agent start quickly.", "Use at the beginning of every LeanOS session.", "current-focus.md", ["workspace-summary.md", "active-workflow.md", "current-focus.md", "next-actions.md", "decision-index.md"], ["../departments/", "../workflows/"], "Context files are lightweight pointers, not full manuals.") },
    { path: ".leanos/context/workspace-summary.md", content: workspaceSummary(answers, activeDepartments) },
    { path: ".leanos/context/active-workflow.md", content: activeWorkflowContext(activeWorkflows) },
    { path: ".leanos/context/current-focus.md", content: getCurrentFocus(activeDepartments) },
    { path: ".leanos/context/next-actions.md", content: getNextActions(activeDepartments) },
    { path: ".leanos/context/decision-index.md", content: "# Decision Index\n\n| Area | Decision Log |\n| --- | --- |\n| Company | `../../company/decision-log.md` |\n| Architecture | `../../architecture/technical-decisions.md` |\n| Design | `../../design/ux-decisions.md` |\n" }
  ];
}

function activeWorkflowContext(activeWorkflows: string[]): string {
  if (activeWorkflows.length === 0) {
    return `# Active Workflow

No complete workflow is active yet.

The currently active departments do not satisfy any full workflow requirements.

Use the active department READMEs and available commands until the user activates more departments.
`;
  }

  return `# Active Workflow

Current compatible workflows:

${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}

Use only workflows listed here as active. Other workflow files may exist, but they can require departments that are not active yet.
`;
}

function workspaceSummary(answers: WorkspaceAnswers, activeDepartments: DepartmentDefinition[]): string {
  return `# Workspace Summary

- Company: ${answers.companyName}
- Product: ${answers.productName}
- Status: ${answers.productStatus}
- Type: ${answers.productType}
- Stage: ${answers.stage}
- Mode: ${answers.mode}
- Primary user: ${answers.targetUser}
- Description: ${answers.description}
- Active departments: ${formatActiveDepartments(activeDepartments)}
`;
}

function getCurrentFocus(activeDepartments: DepartmentDefinition[]): string {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);
  const activeWorkflows = getActiveWorkflowKeys(activeDepartments);

  if (!activeKeys.has("product")) {
    return `# Current Focus

The current focus is to operate only through active departments:

${activeDepartments.map((department) => `- ${department.key}: \`.leanos/departments/${department.key}/README.md\``).join("\n")}

${activeWorkflows.length > 0 ? `Compatible active workflows:\n\n${activeWorkflows.map((workflow) => `- ${workflow}`).join("\n")}` : "No complete workflow is active yet."}

Product strategy commands are not active in this workspace. Ask before activating Product or creating product-specific assets.
`;
  }

  return `# Current Focus

The current focus is to define ICP, problem, value proposition and MVP scope before implementation.

Active product strategy commands are available because Product is active.
`;
}

function getNextActions(activeDepartments: DepartmentDefinition[]): string {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);
  const activeWorkflows = getActiveWorkflowKeys(activeDepartments);

  if (!activeKeys.has("product")) {
    return `# Next Actions

## 1. Check Status

Command:

\`\`\`text
/status
\`\`\`

## 2. Use Active Routing Only

Product is not active in this workspace, so do not run product strategy commands yet.

Active departments:

${activeDepartments.map((department) => `- \`../departments/${department.key}/README.md\``).join("\n")}

${activeWorkflows.length > 0 ? `Compatible active workflows:\n\n${activeWorkflows.map((workflow) => `- \`${workflow}\``).join("\n")}` : "No complete workflow is active yet."}

Ask before activating Product or any missing department.
`;
  }

  const productCommands = ["define-icp", "define-mvp", "check-coherence"]
    .map((slug) => getAvailableCommands(activeDepartments).find((command) => command.slug === slug))
    .filter((command): command is CommandDefinition => Boolean(command));

  return `# Next Actions

${productCommands.map((command, index) => `## ${index + 1}. ${toTitle(command.slug)}\n\nCommand:\n\n\`\`\`text\n${formatCommandInvocation(command.slug)}\n\`\`\``).join("\n\n")}
`;
}

function topLevelWorkspaceFiles(answers: WorkspaceAnswers, activeDepartments: DepartmentDefinition[]): FileEntry[] {
  return topLevelAreas.flatMap((area) => [
    {
      path: `${area.key}/README.md`,
      content: folderReadme(
        area.title,
        area.purpose,
        area.whenToUse,
        area.sourceOfTruth,
        area.files.map((file) => file.name),
        area.relatedFolders,
        getTopLevelAgentNotes(area, activeDepartments)
      )
    },
    ...area.files.map((file) => ({
      path: `${area.key}/${file.name}`,
      content: file.content(answers)
    }))
  ]);
}

function getTopLevelAgentNotes(area: TopLevelAreaDefinition, activeDepartments: DepartmentDefinition[]): string {
  if (typeof area.agentNotes === "string") {
    return area.agentNotes;
  }

  return getDepartmentRouteNote(area.agentNotes.label, area.agentNotes.department, activeDepartments, area.agentNotes.activeMessage);
}

function getDepartmentRouteNote(
  departmentLabel: string,
  departmentKey: DepartmentDefinition["key"],
  activeDepartments: DepartmentDefinition[],
  activeMessage = `Route ${departmentLabel.toLowerCase()} work through \`.leanos/departments/${departmentKey}/README.md\`.`
): string {
  const activeKeys = getActiveDepartmentKeys(activeDepartments);

  if (activeKeys.has(departmentKey)) {
    return activeMessage;
  }

  return `The ${departmentLabel} department is not active in this workspace. Ask before activating or creating it.`;
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

function githubFiles(activeDepartments: DepartmentDefinition[]): FileEntry[] {
  return [
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nStart from `../AGENT.md` and follow the LeanOS Navigation Chain before implementing product work.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    ...["feature", "bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: folderReadme("GitHub LeanOS", "GitHub support files for LeanOS workflow conventions.", "Use when configuring labels, branch rules or PR validation guidance.", "pr-validation-rules.md", ["labels.yaml", "project-sync.yaml", "branch-rules.md", "pr-validation-rules.md"], ["../ISSUE_TEMPLATE/", "../../.leanos/departments/engineering/"], getDepartmentRouteNote("Engineering", "engineering", activeDepartments, "Route GitHub and PR validation work through `.leanos/departments/engineering/README.md` before changing GitHub workflow files.")) },
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
description: Operate LeanOS workspaces through AGENT.md, commands, active departments, roles, skills and playbooks.
argument-hint: Start with /init leanos or /leanos-init
---
# LeanOS Chief

You are LeanOS Chief.
You operate LeanOS workspaces inside VS Code.

Always start from \`AGENT.md\` and \`leanos.yaml\`.

On \`/init leanos\`, load:

- [AGENT.md](../../AGENT.md)
- [leanos.yaml](../../leanos.yaml)
- [.leanos/context/workspace-summary.md](../../.leanos/context/workspace-summary.md)
- [.leanos/context/current-focus.md](../../.leanos/context/current-focus.md)
- [.leanos/context/next-actions.md](../../.leanos/context/next-actions.md)
- [.leanos/index/routing-map.yaml](../../.leanos/index/routing-map.yaml)

For any LeanOS slash command, load \`.leanos/commands/<command>.md\`. Normalize spaces to hyphens when needed.

Follow the LeanOS Navigation Chain:

\`AGENT.md -> Department README -> Role -> Skills -> Playbook -> Output\`

Respect active departments in \`leanos.yaml\`.
Do not load missing department paths.
Do not invent workflows.
Do not implement code before loading the matching command, department, role, skill and playbook.
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

Then summarize the active LeanOS workspace status, active departments, available workflows and recommended next action.
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
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Summary

Describe what changed.

## Coherence Check

- ICP alignment:
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

function toTitle(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
