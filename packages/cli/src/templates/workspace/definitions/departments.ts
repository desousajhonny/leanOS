import type { RootDepartmentDefinition } from "../types.js";
import { assumptionsRegister, checklist, companyProfile, decisionLog, folderReadme, learningLog, productBrief, riskiestAssumptions, stateDraft, titledDraft, validationExperiments, validationSuccessMetrics } from "../content/shared.js";

function designSystemKnowledge(): string {
  return `# Design System

## Tokens

TBD

## Typography

TBD

## Color Intent

TBD

## Spacing

TBD

## Components

TBD

## Interaction Principles

TBD

## Do Not Do

TBD

## Open Questions

TBD
`;
}

function accessibilityKnowledge(): string {
  return `# Accessibility

## Accessibility Baseline

TBD

## WCAG Target

TBD

## Keyboard Navigation

TBD

## Focus Rules

TBD

## Contrast Rules

TBD

## Forms and Errors

TBD

## Screen Reader Notes

TBD

## Known Risks

TBD
`;
}

function userFlowsKnowledge(): string {
  return `# User Flows

## Primary Flow

TBD

## Entry Point

TBD

## User Goal

TBD

## Steps

TBD

## Edge Cases

TBD

## Required Screens

TBD

## Open Questions

TBD
`;
}

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
            skills: ["define-product", "define-icp", "define-value-proposition", "define-business-model", "evaluate-idea", "check-coherence"],
            playbooks: ["product-strategy"]
          },
          {
            slug: "product-manager",
            title: "Product Manager",
            purpose: "Translate strategy into coherent scope, stories and priorities with Operations Core.",
            useWhen: ["scope needs definition", "roadmap work needs issue-ready shape", "acceptance criteria are missing"],
            beforeActing: ["../brief.md", "../../roadmap/backlog.md", "../../../operations/core/mvp/scope.md", "../../../operations/core/mvp/acceptance-criteria.md"],
            skills: ["define-product", "evaluate-idea", "check-coherence"],
            playbooks: ["product-strategy"]
          }
        ],
        skills: [
          { slug: "define-product", title: "Define Product", purpose: "Clarify product brief, problem, target user and product status." },
          { slug: "define-icp", title: "Define ICP", purpose: "Define the first customer segment with pains, triggers and exclusions." },
          { slug: "define-value-proposition", title: "Define Value Proposition", purpose: "Articulate the promise, outcome, proof and differentiation." },
          { slug: "define-business-model", title: "Define Business Model", purpose: "Draft revenue, channels, costs and delivery model." },
          { slug: "evaluate-idea", title: "Evaluate Idea", purpose: "Evaluate a founder idea against user value, evidence, MVP scope and roadmap impact." },
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
            skills: ["create-roadmap", "prioritize-backlog", "prepare-roadmap-sync"],
            playbooks: ["validation-cycle-planning", "roadmap-sync-prep"]
          }
        ],
        skills: [
          { slug: "create-roadmap", title: "Create Roadmap", purpose: "Sequence roadmap work by validation cycle and strategic priority." },
          { slug: "prioritize-backlog", title: "Prioritize Backlog", purpose: "Prioritize work by risk, learning value and delivery cost." },
          { slug: "prepare-roadmap-sync", title: "Prepare Roadmap Sync", purpose: "Prepare roadmap epics, milestones and sync payload before GitHub Project updates." }
        ],
        playbooks: [
          { slug: "validation-cycle-planning", title: "Validation Cycle Planning", purpose: "Plan the next coherent validation or delivery cycle.", steps: ["Read product strategy", "Read validation risk", "Review backlog", "Choose current cycle", "Record milestones"] },
          {
            slug: "roadmap-sync-prep",
            title: "Roadmap Sync Prep",
            purpose: "Prepare roadmap items for GitHub Project sync without calling the API directly.",
            inputs: ["Roadmap", "Milestones", "Current cycle", "Backlog", "MVP scope", "GitHub project sync settings"],
            steps: ["Read roadmap and milestones", "Identify candidate epics", "Check MVP and validation linkage", "Ask DevOps to confirm GitHub project settings when needed", "Prepare sync payload", "Ask for confirmation before any remote write"],
            outputs: ["Roadmap sync summary", "Milestone mapping", "Epic draft list", "Missing GitHub configuration", "Confirmation question before API execution"],
            filesToUpdate: ["Update `../roadmap.md`, `../milestones.md` or `../current-cycle.md` only after explicit confirmation.", "Update `../../../.github/leanos/project-sync.yaml` only through DevOps/GitHub setup guidance."]
          }
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
        slug: "idea-to-roadmap",
        purpose: "Turn founder ideas into product, validation, MVP and roadmap decisions.",
        requiredAreas: ["product", "roadmap", "validation"],
        steps: ["Read product strategy", "Evaluate idea against ICP, problem and value", "Identify validation risk", "Check MVP impact with Operations Core when active", "Decide backlog, roadmap, experiment or discard", "Propose source-of-truth updates before writing"]
      },
      {
        slug: "strategy-validation-cycle",
        purpose: "Coordinate company, product, roadmap and validation work inside Strategy.",
        requiredAreas: ["product", "roadmap", "validation"],
        steps: ["Read product strategy", "Review roadmap cycle", "Prioritize assumptions", "Plan validation", "Capture learning"]
      },
      {
        slug: "roadmap-to-github-project",
        purpose: "Prepare roadmap, milestones and epics for GitHub Project sync.",
        requiredAreas: ["roadmap", "product"],
        steps: ["Read roadmap and current cycle", "Confirm product outcomes and priorities", "Prepare milestones and epic drafts", "Ask DevOps to validate GitHub project settings when needed", "Produce payload and ask for confirmation before API execution"]
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
            useWhen: ["MVP scope needs definition", "acceptance criteria are unclear", "delivery scope needs coordination", "an epic needs to be broken into sub-issues"],
            beforeActing: ["../mvp/scope.md", "../mvp/user-stories.md", "../mvp/acceptance-criteria.md", "../../../strategy/product/brief.md", "../../../ai-standard/templates/github/issue-readiness-matrix-template.md"],
            skills: ["define-mvp", "write-acceptance-criteria", "check-delivery-coherence", "shape-epic", "write-subissue-criteria"],
            playbooks: ["mvp-delivery", "epic-to-subissues"]
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
          { slug: "shape-epic", title: "Shape Epic", purpose: "Turn a roadmap epic into an implementation-ready scope boundary." },
          { slug: "write-subissue-criteria", title: "Write Subissue Criteria", purpose: "Write Product and Engineering criteria for sub-issues, with Design and Security only when applicable." },
          { slug: "define-architecture", title: "Define Architecture", purpose: "Define system boundaries, data flow and technical decisions." },
          { slug: "create-api-contract", title: "Create API Contract", purpose: "Define API inputs, outputs, errors and ownership boundaries." }
        ],
        playbooks: [
          { slug: "mvp-delivery", title: "MVP Delivery", purpose: "Turn product strategy into executable MVP scope.", steps: ["Read product strategy", "Define MVP scope", "Write user stories", "Define acceptance criteria", "Confirm non-goals"] },
          {
            slug: "epic-to-subissues",
            title: "Epic To Subissues",
            purpose: "Break a GitHub epic into implementation-ready sub-issues with clear Product and Engineering criteria.",
            inputs: ["Parent epic", "Roadmap item", "Milestone", "MVP scope", "Acceptance criteria", "Issue readiness matrix", "Design context when UX is affected", "Security context when sensitive surfaces are involved"],
            steps: ["Read the parent epic and MVP scope", "Confirm the epic outcome and non-goals", "Apply the issue readiness matrix", "Write Product criteria for every sub-issue", "Write Engineering criteria for every implementation sub-issue", "Include Design criteria only when the sub-issue affects user-facing UX", "Include Security criteria only when data, auth, privacy, abuse or compliance is involved", "Ask Engineering to validate size and dependencies", "Prepare sub-issue drafts and ask for confirmation before any GitHub API write"],
            outputs: ["Sub-issue draft list", "Product criteria", "Engineering criteria", "Design criteria or not applicable", "Security criteria or not applicable", "Dependencies", "Risks", "Confirmation question before remote issue creation"],
            filesToUpdate: ["Do not update GitHub directly from the model.", "Update MVP source-of-truth files only when the user explicitly confirms a scope or criteria change."]
          },
          { slug: "architecture-planning", title: "Architecture Planning", purpose: "Create enough architecture context to guide implementation.", steps: ["Read system context", "Define data model", "Define API contract", "Capture technical decisions"] }
        ],
        commonPaths: [
          "MVP request: role `roles/product-owner.role.md` -> skill `skills/define-mvp.skill.md` -> playbook `playbooks/mvp-delivery.playbook.md`.",
          "Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic.skill.md` and `skills/write-subissue-criteria.skill.md` -> playbook `playbooks/epic-to-subissues.playbook.md`.",
          "Architecture request: role `roles/technical-architect.role.md` -> skill `skills/define-architecture.skill.md` -> playbook `playbooks/architecture-planning.playbook.md`."
        ]
      },
      {
        key: "operations.design",
        root: "operations",
        slug: "design",
        name: "Design",
        path: "operations/design",
        lead: {
          title: "UX Lead",
          purpose: "Lead Design work, choose the right design specialist and keep design decisions aligned with Product, MVP and implementation needs."
        },
        routingKey: "design",
        requestTypes: "screens, flows, UX, UI, onboarding or usability",
        purpose: "Own the MVP design foundation, accessibility baseline and user-flow clarity before implementation.",
        whenToUse: ["define design foundation", "map user flows", "define accessibility baseline", "design onboarding", "reason about usability"],
        sourceOfTruth: ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Design Knowledge", "Design context produced by the Design area.", "Use after Product and MVP context exist, before implementation or user-facing issue work.", "design-system.md", ["design-system.md", "accessibility.md", "user-flows.md"], ["../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../core/mvp/"], "Keep this folder focused on reusable design foundation. Create screen specs, usability notes and UX decisions later when a concrete feature or screen requires them.") },
          { path: "knowledge/design-system.md", content: designSystemKnowledge },
          { path: "knowledge/accessibility.md", content: accessibilityKnowledge },
          { path: "knowledge/user-flows.md", content: userFlowsKnowledge }
        ],
        roles: [
          {
            slug: "ux-researcher",
            title: "UX Researcher",
            purpose: "Understand user context, behavior, pain points and research signals before design decisions harden.",
            useWhen: ["research, user evidence, interviews, behavior, usability questions or unknown user needs are involved"],
            beforeActing: ["../../../strategy/product/brief.md", "../../core/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/accessibility.md", "../knowledge/user-flows.md"],
            skills: ["user-research", "user-flow-mapping"],
            playbooks: ["user-research", "mvp-ux-flow"]
          },
          {
            slug: "product-designer",
            title: "Product Designer",
            purpose: "Translate product, MVP and user context into coherent UI structure, flows and design system decisions.",
            useWhen: ["design foundation, UI, user flows, onboarding, layout, components or interaction design are involved"],
            beforeActing: ["../../../strategy/product/brief.md", "../../core/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/user-flows.md"],
            skills: ["design-system", "user-flow-mapping", "screen-specification", "design-review"],
            playbooks: ["design-foundation", "mvp-ux-flow"]
          },
          {
            slug: "accessibility-specialist",
            title: "Accessibility Specialist",
            purpose: "Define and review accessibility expectations for the MVP audience, flows and interface constraints.",
            useWhen: ["accessibility, WCAG, keyboard navigation, contrast, screen readers or inclusive UX are involved"],
            beforeActing: ["../knowledge/accessibility.md", "../knowledge/design-system.md", "../knowledge/user-flows.md"],
            skills: ["accessibility", "design-review"],
            playbooks: ["accessibility-review"]
          },
          {
            slug: "ux-writer",
            title: "UX Writer",
            purpose: "Make interface language, labels, empty states, errors and onboarding copy clear and useful.",
            useWhen: ["microcopy, onboarding copy, labels, error messages, empty states or user guidance are involved"],
            beforeActing: ["../../../strategy/product/brief.md", "../knowledge/user-flows.md", "../knowledge/accessibility.md"],
            skills: ["microcopy", "user-flow-mapping", "design-review"],
            playbooks: ["ux-writing"]
          }
        ],
        skills: [
          {
            slug: "user-research",
            title: "User Research",
            purpose: "Extract design-relevant user evidence, assumptions and open questions from Product and Validation context.",
            useWhen: ["user evidence is unclear", "research questions are needed", "design decisions depend on user behavior, pain or context"],
            requiredContext: ["Product brief", "ICP or target user", "Validation assumptions when available", "Existing user-flow knowledge"],
            inputs: ["User request", "Known evidence", "Known assumptions", "Open product or design questions"],
            process: ["Separate evidence from assumptions", "Identify user, behavior, pain and context", "Extract research questions", "Map evidence gaps", "Propose the smallest next research step"],
            checks: ["Do not treat hypotheses as facts", "Keep assumptions visibly tentative", "Make research questions specific enough to act on"],
            outputs: ["Evidence summary", "Assumption list", "Research questions", "Evidence gaps", "Smallest next research step"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only when confirmed design-relevant flow learning exists."],
            redLines: ["Do not invent user evidence", "Do not claim validation without evidence", "Ask before writing research conclusions to knowledge files."]
          },
          {
            slug: "user-flow-mapping",
            title: "User Flow Mapping",
            purpose: "Map the steps a user takes to reach the MVP outcome.",
            useWhen: ["a flow, onboarding path, task sequence or user journey needs definition", "an issue or feature has user-facing steps"],
            requiredContext: ["Product brief", "MVP scope", "User goal", "Existing user-flow knowledge"],
            inputs: ["Entry point", "User goal", "MVP scope", "Known constraints", "Success and failure conditions"],
            process: ["Map entry point", "Define user goal", "Map happy path steps", "Identify decisions, failures and edge cases", "Identify required screens", "Connect the flow to MVP scope"],
            checks: ["Avoid flows larger than the MVP", "Separate happy path from edge cases", "Flag missing product or design context"],
            outputs: ["Primary flow", "Steps", "Edge cases", "Required screens", "Open questions"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."],
            redLines: ["Do not invent screens outside the MVP", "Do not turn vague feature ideas into large product flows without confirmation."]
          },
          {
            slug: "design-system",
            title: "Design System",
            purpose: "Define MVP design tokens, visual rules, component expectations and interaction principles.",
            useWhen: ["the design foundation is being defined", "UI consistency, tokens, typography, spacing or component expectations are needed"],
            requiredContext: ["Product brief", "MVP scope", "Target user", "Existing design-system knowledge"],
            inputs: ["Brand or product constraints", "Audience needs", "Core flows", "Accessibility expectations"],
            process: ["Define minimum tokens", "Define color intent", "Define typography", "Define spacing", "Define component expectations", "Define interaction principles", "Record do and don't guidance"],
            checks: ["Prioritize flow clarity before visual polish", "Keep tokens minimal for the MVP", "Check design-system choices against accessibility needs"],
            outputs: ["Design-system baseline", "Token notes", "Typography notes", "Color intent", "Component expectations", "Do and don't guidance"],
            filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation."],
            redLines: ["Do not over-polish before user flow clarity", "Do not invent brand constraints", "Do not create a full design system when an MVP baseline is enough."]
          },
          {
            slug: "screen-specification",
            title: "Screen Specification",
            purpose: "Define screen purpose, content, states, interactions and engineering handoff notes when a concrete screen exists.",
            useWhen: ["a concrete screen, view, form, modal or page needs definition", "Engineering needs implementation-ready UI details"],
            requiredContext: ["Product brief", "MVP scope", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
            inputs: ["Screen purpose", "User goal", "Required content", "Primary and secondary actions", "Validation rules", "Known constraints"],
            process: ["Define screen purpose", "Define user goal", "Structure content", "Define primary and secondary actions", "Define validation and errors", "Define default, loading, empty, error, success and edge-case states", "Add accessibility notes", "Add engineering handoff notes"],
            checks: ["Every screen state has a user outcome", "Errors are actionable", "The screen maps to an MVP flow", "Engineering handoff notes avoid visual ambiguity"],
            outputs: ["Screen purpose", "Content structure", "Actions", "Validation and error rules", "Default/loading/empty/error/success states", "Accessibility notes", "Engineering handoff notes"],
            filesToUpdate: ["Do not create screen-specific files until a concrete feature or screen requires them.", "Update issue or implementation notes only after confirmation."],
            redLines: ["Do not invent screens without a concrete feature or flow", "Do not skip loading, empty, error or success states when they are relevant."]
          },
          {
            slug: "microcopy",
            title: "Microcopy",
            purpose: "Write clear interface copy, labels, helper text, empty states and error messages.",
            useWhen: ["labels, helper text, empty states, errors, success messages and onboarding hints need definition"],
            requiredContext: ["Product positioning", "User-flow knowledge", "Accessibility knowledge", "Target user context"],
            inputs: ["User goal", "Screen or flow context", "Tone expectations", "Error or success condition", "Accessibility constraints"],
            process: ["Identify the user-facing moment", "Draft labels and helper text", "Draft empty, error and success messages", "Add onboarding hints when needed", "Check tone, clarity and accessibility of language"],
            checks: ["Use clear language", "Avoid clever copy that reduces comprehension", "Make errors actionable", "Avoid jargon unless the target user expects it"],
            outputs: ["Labels", "Helper text", "Empty states", "Errors", "Success messages", "Onboarding hints", "Tone notes"],
            filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."],
            redLines: ["Do not invent product promises", "Do not hide important constraints in friendly copy", "Ask before changing persistent copy guidance."]
          },
          {
            slug: "accessibility",
            title: "Accessibility",
            purpose: "Define accessibility expectations based on the MVP audience, context and product constraints.",
            useWhen: ["accessibility baseline, keyboard navigation, focus, contrast, forms, errors or screen-reader implications are involved"],
            requiredContext: ["MVP audience", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
            inputs: ["Target user context", "Core flows", "UI states", "Forms and errors", "Motion or interaction patterns"],
            process: ["Use WCAG 2.2 AA as the baseline", "Review keyboard navigation", "Review focus states", "Review color contrast", "Review labels and instructions", "Review error identification", "Review screen-reader implications", "Review reduced-motion needs", "Identify when human accessibility review is required"],
            checks: ["Keyboard-only users can complete critical flows", "Focus order is logical", "Contrast intent is sufficient", "Forms and errors are identifiable", "Screen-reader implications are noted"],
            outputs: ["Accessibility baseline", "WCAG 2.2 AA notes", "Keyboard and focus notes", "Contrast notes", "Form and error notes", "Screen-reader notes", "Human review requirement"],
            filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."],
            redLines: ["Do not claim full accessibility compliance without expert validation", "Do not waive accessibility without a documented reason", "Ask for human accessibility review when risk is high."]
          },
          {
            slug: "design-review",
            title: "Design Review",
            purpose: "Evaluate UX and design impact in issues, PRs, screens, flows or product decisions.",
            useWhen: ["an issue, PR, flow, screen or decision may affect user-facing UX", "Design may be not applicable and needs explicit classification"],
            requiredContext: ["Issue, PR, flow or decision context", "MVP scope", "Design-system knowledge", "User-flow knowledge", "Accessibility knowledge when relevant"],
            inputs: ["Changed behavior", "User-facing impact", "Acceptance criteria", "Design context", "Accessibility context", "Microcopy context when relevant"],
            process: ["Classify Design result as pass, concerns, blocked or not applicable", "Review flow clarity", "Review visual hierarchy", "Check consistency with design system", "Check MVP alignment", "Check user friction", "Check basic accessibility", "Check microcopy when relevant", "List usability risks"],
            checks: ["Design is marked not applicable only when there is no user-facing UX impact", "Findings are ordered by severity", "Risks are tied to user outcomes", "Next action is explicit"],
            outputs: ["Design result: pass, concerns, blocked or not applicable", "Findings ordered by severity", "MVP alignment", "Usability risk", "Accessibility risk", "Microcopy risk", "Recommended next action"],
            filesToUpdate: ["Update review notes, PR notes or issue criteria only after explicit confirmation."],
            redLines: ["Do not approve UX without enough context", "Do not block work for polish-only concerns", "Do not apply Design when it is truly not applicable."]
          }
        ],
        playbooks: [
          {
            slug: "design-foundation",
            title: "Design Foundation",
            purpose: "Create the MVP design foundation from product strategy and MVP scope before implementation.",
            inputs: ["Product brief", "ICP", "MVP scope", "Primary user flows", "Accessibility needs", "Brand or product constraints", "Skills: design-system, accessibility, user-flow-mapping"],
            steps: ["Read Product and MVP context", "Use `skills/design-system.skill.md` to define the design system baseline", "Use `skills/accessibility.skill.md` to define accessibility expectations for the MVP audience", "Use `skills/user-flow-mapping.skill.md` to map primary user flows", "Identify missing context", "Propose updates to Design knowledge files before writing"],
            outputs: ["Design system baseline", "Accessibility baseline", "Primary user flows", "Open questions", "Confirmation question before file updates"],
            filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation.", "Update `../knowledge/accessibility.md` only after explicit confirmation.", "Update `../knowledge/user-flows.md` only after explicit confirmation."]
          },
          {
            slug: "user-research",
            title: "User Research",
            purpose: "Clarify design-relevant user evidence before making UX decisions.",
            inputs: ["Product brief", "ICP", "Validation assumptions", "Known user behavior", "Open design questions", "Skill: user-research"],
            steps: ["Read product and validation context", "Use `skills/user-research.skill.md` to separate evidence from assumptions", "Identify design-relevant user needs", "Identify open research questions", "Recommend the smallest next research step"],
            outputs: ["User evidence summary", "Design assumptions", "Open research questions", "Recommended next step"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only when the user confirms a design-relevant flow change."]
          },
          {
            slug: "mvp-ux-flow",
            title: "MVP UX Flow",
            purpose: "Create a usable flow for the first validation cycle.",
            inputs: ["ICP", "MVP scope", "User-flow knowledge", "Accessibility baseline", "Skills: user-flow-mapping, screen-specification when a concrete screen exists"],
            steps: ["Read ICP and MVP scope", "Use `skills/user-flow-mapping.skill.md` to map the primary flow", "Check accessibility expectations", "Use `skills/screen-specification.skill.md` only when a concrete screen, page, form or modal needs definition", "Record proposed Design knowledge updates"],
            outputs: ["Primary UX flow", "Edge cases", "Required screens", "Screen-specification needs when applicable", "Open questions"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."]
          },
          {
            slug: "accessibility-review",
            title: "Accessibility Review",
            purpose: "Review design foundation or UX flow for accessibility expectations.",
            inputs: ["Accessibility knowledge", "Design system baseline", "User flows", "MVP audience and constraints", "Skills: accessibility, design-review when general UX evaluation is needed"],
            steps: ["Read accessibility baseline", "Use `skills/accessibility.skill.md` to check audience needs, keyboard, focus, contrast, forms, errors and screen-reader implications", "Use `skills/design-review.skill.md` when the request needs a broader UX/design result", "List accessibility gaps"],
            outputs: ["Accessibility review", "Gaps", "Required follow-up", "Not applicable notes when justified"],
            filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."]
          },
          {
            slug: "ux-writing",
            title: "UX Writing",
            purpose: "Define clear interface language for MVP flows.",
            inputs: ["Product positioning", "User flows", "Accessibility expectations", "Target user context", "Skill: microcopy"],
            steps: ["Read product and flow context", "Use `skills/microcopy.skill.md` to identify labels, helper text, empty states, errors, success messages and onboarding hints", "Draft concise copy", "Check clarity and accessibility", "List open copy questions"],
            outputs: ["Microcopy draft", "Tone notes", "Accessibility notes", "Open questions"],
            filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."]
          }
        ],
        commonPaths: [
          "Design foundation request: area lead `AGENT.md` -> role `roles/product-designer.role.md` -> skills `skills/design-system.skill.md`, `skills/accessibility.skill.md` and `skills/user-flow-mapping.skill.md` -> playbook `playbooks/design-foundation.playbook.md`.",
          "Research request: area lead `AGENT.md` -> role `roles/ux-researcher.role.md` -> skill `skills/user-research.skill.md` -> playbook `playbooks/user-research.playbook.md`.",
          "Accessibility request: area lead `AGENT.md` -> role `roles/accessibility-specialist.role.md` -> skills `skills/accessibility.skill.md` and `skills/design-review.skill.md` when general UX evaluation is needed -> playbook `playbooks/accessibility-review.playbook.md`.",
          "UX writing request: area lead `AGENT.md` -> role `roles/ux-writer.role.md` -> skill `skills/microcopy.skill.md` -> playbook `playbooks/ux-writing.playbook.md`.",
          "Design review request: area lead `AGENT.md` -> role `roles/product-designer.role.md` or applicable specialist -> skill `skills/design-review.skill.md` -> output findings without creating a review playbook."
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
            beforeActing: ["../../../.leanos/context/current-focus.md", "../../core/mvp/scope.md", "../../core/mvp/acceptance-criteria.md", "../../core/overview.md", "../../../.github/leanos/branch-rules.md", "../implementation-notes.md"],
            skills: ["plan-implementation", "create-branch", "write-tests", "create-pr"],
            playbooks: ["branch-from-issue", "issue-to-pr", "test-planning", "pr-validation"]
          },
          {
            slug: "pr-reviewer",
            title: "PR Reviewer",
            purpose: "Review pull requests against scope, tests, coherence and validation goals.",
            useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
            beforeActing: ["../../core/mvp/scope.md", "../../core/mvp/acceptance-criteria.md", "../../../.github/leanos/pr-validation-rules.md", "../../../ai-standard/templates/review/code-review-template.md"],
            skills: ["review-pr"],
            playbooks: ["pr-validation"]
          }
        ],
        skills: [
          { slug: "plan-implementation", title: "Plan Implementation", purpose: "Turn an issue into a scoped technical implementation plan." },
          { slug: "create-branch", title: "Create Branch", purpose: "Define a safe issue-linked branch name and creation checklist before code changes." },
          { slug: "write-tests", title: "Write Tests", purpose: "Define or update tests for changed behavior." },
          { slug: "create-pr", title: "Create PR", purpose: "Prepare a PR summary tied to scope, tests and learning." },
          { slug: "review-pr", title: "Review PR", purpose: "Review PR changes for correctness, scope and LeanOS coherence." }
        ],
        playbooks: [
          {
            slug: "branch-from-issue",
            title: "Branch From Issue",
            purpose: "Create a safe branch plan before implementation starts.",
            inputs: ["GitHub issue number", "Issue title", "Current default branch", "Existing branch list when available", "Branch rules"],
            steps: ["Read the issue context and title", "Load `.github/leanos/branch-rules.md`", "Generate a branch name using the required issue format", "Check for sensitive words or unnecessary scope", "Ask before using an existing branch or creating a new one"],
            outputs: ["Proposed branch name", "Linked issue", "Branch safety notes", "Next implementation step"],
            filesToUpdate: ["Do not update files just to create a branch plan. Record branch decisions in `../implementation-notes.md` only when the user asks for persistent notes."]
          },
          {
            slug: "issue-to-pr",
            title: "Issue to PR",
            purpose: "Move from a scoped issue to a reviewable pull request.",
            inputs: ["GitHub issue body", "Parent epic when available", "MVP scope", "Acceptance criteria", "Product, Design, Engineering and Security criteria", "Branch name"],
            steps: ["Read issue and MVP scope", "Confirm issue readiness with Product and Engineering criteria", "Check whether Design criteria are required for user-facing UX", "Check whether Security criteria are required for data, auth, privacy, abuse or compliance", "Create or confirm an issue-linked branch before code changes", "Plan implementation", "Change code within issue scope", "Update tests", "Prepare PR using the PR template"],
            outputs: ["Implementation summary", "Branch used", "Files changed", "Tests run or proposed", "PR draft", "Known risks"],
            filesToUpdate: ["Update `../implementation-notes.md` when implementation decisions should persist.", "Update `../pr-log.md` after PR creation or when the user asks for a persistent PR record."]
          },
          {
            slug: "test-planning",
            title: "Test Planning",
            purpose: "Plan validation for implementation work without storing procedural test instructions as loose area files.",
            inputs: ["Implementation scope", "Acceptance criteria", "Changed behavior", "Known risks"],
            steps: ["Identify changed behavior", "Choose automated and manual validation", "Map tests to acceptance criteria", "Identify risky gaps", "Summarize validation readiness"],
            outputs: ["Test strategy", "Validation gaps", "Manual checks", "Next action"],
            filesToUpdate: ["Update `../implementation-notes.md` or PR notes if the workspace needs a persistent test decision."]
          },
          {
            slug: "pr-validation",
            title: "PR Validation",
            purpose: "Validate implementation before merge.",
            inputs: ["PR description", "Linked issue", "Parent epic when available", "MVP scope", "Acceptance criteria", "Changed files", "Tests or validation evidence"],
            steps: ["Read PR context", "Load `.github/leanos/pr-validation-rules.md`", "Check scope against issue and MVP", "Validate Product criteria and acceptance criteria", "Review Design criteria only when UX changed", "Review Security criteria only when data, auth, privacy, abuse or compliance is involved", "Review tests and manual validation", "List findings by severity", "Recommend merge, changes or blocked-by-context"],
            outputs: ["Findings by severity", "Product alignment", "Design review result or not applicable", "Security review result or not applicable", "Test confidence", "Merge recommendation"],
            filesToUpdate: ["Update `../code-review-notes.md` or `../pr-log.md` only when the user asks for persistent review notes."]
          }
        ],
        commonPaths: [
          "Branch request: role `roles/senior-developer.role.md` -> skill `skills/create-branch.skill.md` -> playbook `playbooks/branch-from-issue.playbook.md`.",
          "Implementation request: role `roles/senior-developer.role.md` -> skills `skills/plan-implementation.skill.md` and `skills/write-tests.skill.md` -> playbook `playbooks/issue-to-pr.playbook.md`.",
          "PR review request: role `roles/pr-reviewer.role.md` -> skill `skills/review-pr.skill.md` -> playbook `playbooks/pr-validation.playbook.md`."
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
      },
      {
        slug: "issue-delivery-cycle",
        purpose: "Coordinate Operations areas from issue interpretation to branch, implementation, review and PR.",
        requiredAreas: ["core", "engineering"],
        steps: ["Read issue and MVP scope", "Route Design only when UX is affected", "Route Security only when data, auth, privacy, abuse or compliance is involved", "Create issue-linked branch", "Plan and implement in Engineering", "Run tests or explain gaps", "Run PR validation", "Prepare PR"]
      },
      {
        slug: "post-merge-continuation",
        purpose: "Continue delivery after a founder confirms a merge.",
        requiredAreas: ["core", "engineering"],
        steps: ["Confirm merge evidence or founder confirmation", "Record relevant implementation notes", "Identify learning or roadmap impact if any", "Load the next issue", "Restart issue delivery"]
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
