import type { SkillDefinition } from "../../../../types.js";

export const operationsProductOpsSkills: SkillDefinition[] = [
    {
      slug: "define-delivery-scope",
      title: "Define Delivery Scope",
      purpose: "Decide whether an MVP backlog, roadmap or delivery candidate becomes concrete delivery scope and capture scope_type, milestone and release_goal.",
      useWhen: ["an MVP backlog item may become an Epic", "a roadmap item may enter the next delivery", "the founder asks whether something enters MVP, release, beta or experiment scope", "a delivery item needs Product Ops shaping before epic creation"],
      requiredContext: ["../knowledge/delivery-scope.md", "../mvp/backlog.md", "../../../strategy/roadmap/knowledge/roadmap.md", "../../../strategy/roadmap/knowledge/backlog.md", "../../../strategy/product/knowledge/brief.md"],
      inputs: ["MVP backlog item, roadmap item or delivery candidate", "Product outcome", "User/business value", "Evidence level", "Scope type", "Milestone", "Release goal", "Known constraints"],
      process: ["Restate the delivery item and outcome.", "Confirm whether the item is ready for delivery scope or should remain in MVP backlog, roadmap or backlog.", "Choose scope_type: MVP, Release, Experiment, Beta or Internal.", "Define milestone and release_goal.", "Identify non-goals, dependencies and risks.", "Check Design, Security and DevOps applicability.", "Propose file updates and wait for confirmation before writing."],
      checks: ["The delivery item is clear enough to scope.", "The scope_type is explicit.", "Milestone and release_goal are not invented silently.", "Non-goals are visible.", "The item is not sent to GitHub before delivery scope is confirmed."],
      outputs: ["Delivery scope recommendation", "scope_type", "milestone", "release_goal", "Non-goals", "Dependencies", "Next workflow recommendation"],
      filesToUpdate: ["Update `../knowledge/delivery-scope.md` only after explicit confirmation.", "Update `../mvp/scope.md` only when `scope_type` is MVP and the founder confirms.", "Do not create GitHub issues from this skill."],
      redLines: ["Do not treat roadmap priority as delivery commitment.", "Do not mark an item as MVP just because it is important.", "Do not create epics or features in this step."]
    },
    {
      slug: "write-acceptance-criteria",
      title: "Write Acceptance Criteria",
      purpose: "Define testable Product Ops acceptance criteria for MVP, Epic or Feature work without turning criteria into implementation instructions.",
      useWhen: ["MVP, Epic or Feature work needs completion criteria", "a delivery item has unclear pass/fail expectations", "Product Ops needs acceptance criteria before readiness or handoff", "existing criteria mix scope, implementation details and outcomes"],
      requiredContext: ["../AGENT.md", "../knowledge/work-taxonomy.md", "../mvp/prd.md", "../mvp/scope.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../../strategy/product/knowledge/brief.md"],
      inputs: ["Delivery item, Epic or Feature", "User or customer outcome", "MVP scope or delivery scope", "Known non-goals", "Existing PRD or acceptance criteria", "Known Design, Security, DevOps or Engineering applicability"],
      process: ["Restate the intended outcome and who benefits.", "Separate in-scope behavior from non-goals and implementation ideas.", "Write observable criteria with a clear pass/fail test.", "Cover happy path, edge states, errors, permissions, data and copy only when they apply.", "Map criteria to Product Ops, Design, Engineering, Security or DevOps readiness dimensions.", "Mark missing context explicitly and ask before updating local criteria files."],
      checks: ["Each criterion describes observable behavior or a concrete business/user outcome.", "Each criterion is testable with a pass/fail result.", "Criteria do not prescribe implementation details, code structure or tool choices.", "Non-goals and out-of-scope expectations are visible.", "Applicable Design, Security, DevOps and Engineering dimensions are included or marked not applicable with reason."],
      outputs: ["Acceptance criteria list", "Pass/fail validation notes", "Non-goals", "Readiness dimensions touched", "Missing context", "Recommended file updates"],
      filesToUpdate: ["Update `../mvp/acceptance-criteria.md` only after explicit confirmation.", "Update a local Epic or Feature file only after the founder confirms the scoped criteria.", "Do not update GitHub, branches, source code or PRs from this skill."],
      redLines: ["Do not write implementation instructions, code tasks or architecture choices as acceptance criteria.", "Do not expand scope while writing criteria.", "Do not accept vague criteria that cannot be tested.", "Do not create Epics, Feature files, GitHub issues, branches, code or PRs."]
    },
    {
      slug: "check-delivery-coherence",
      title: "Check Delivery Coherence",
      purpose: "Check whether delivery scope, MVP context, roadmap intent and acceptance criteria agree before Product Ops moves work forward.",
      useWhen: ["delivery scope may not match Strategy or MVP scope", "an Epic, Feature or backlog item feels inconsistent", "criteria conflict with roadmap, PRD, non-goals or readiness", "Product Ops needs a coherence gate before Epic, Feature or Engineering handoff"],
      requiredContext: ["../AGENT.md", "../knowledge/work-taxonomy.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../mvp/backlog.md", "../mvp/prd.md", "../mvp/scope.md", "../mvp/acceptance-criteria.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/roadmap/knowledge/roadmap.md"],
      inputs: ["Delivery scope, Epic, Feature or backlog item", "Product outcome", "MVP scope", "PRD", "Acceptance criteria", "Roadmap or backlog context", "Known risks, dependencies and non-goals"],
      process: ["Restate the proposed work and its claimed outcome.", "Compare the work against Strategy Product brief, MVP scope, PRD and acceptance criteria.", "Check whether roadmap or backlog priority is being treated as delivery commitment.", "Identify contradictions, missing criteria, oversized scope and unowned dependencies.", "Classify the result as coherent, needs-shaping, blocked or out-of-scope.", "Recommend the smallest next Product Ops route without rewriting scope silently."],
      checks: ["The work maps to an approved product or delivery outcome.", "MVP scope, PRD, criteria and non-goals do not contradict each other.", "Roadmap priority is not treated as implementation approval.", "Dependencies and specialist checks are visible.", "The recommendation names the next owner or stop condition."],
      outputs: ["Coherence result", "Aligned context", "Contradictions", "Missing criteria", "Scope risks", "Recommended next route"],
      filesToUpdate: ["Update `../knowledge/issue-readiness.md` only after explicit confirmation.", "Update `../knowledge/delivery-scope.md` only after the founder confirms a scope decision.", "Do not update roadmap, GitHub, branches, source code or PRs from this skill."],
      redLines: ["Do not silently rewrite delivery scope to make it look coherent.", "Do not promote roadmap priority into delivery readiness.", "Do not hide contradictions or missing specialist checks.", "Do not create Epics, Features, GitHub issues, branches, code or PRs."]
    },
    {
      slug: "shape-epic",
      title: "Shape Epic",
      purpose: "Turn an approved delivery item into an implementation-ready Epic scope boundary before features are created.",
      useWhen: ["an approved MVP backlog item needs to become a local LeanOS Epic", "a roadmap item needs to become a local LeanOS Epic", "an existing epic needs enough clarity to be broken down", "the team needs to confirm outcome, scope and non-goals before features or remote sync"],
      requiredContext: ["../AGENT.md", "../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../mvp/backlog.md", "../mvp/prd.md", "../mvp/scope.md", "../epics/README.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/roadmap/knowledge/roadmap.md", "../../../ai-standard/templates/product/epic-template.md", "../../../ai-standard/templates/github/delivery-readiness-matrix-template.md"],
      inputs: ["Approved delivery item, MVP backlog item or roadmap item", "Product outcome", "MVP scope", "Non-goals", "Milestone or current cycle", "Known dependencies"],
      process: ["Restate the epic outcome in one sentence.", "Confirm the user, problem and business value.", "Identify scope boundaries and non-goals.", "Map the epic to delivery scope, PRD and roadmap milestone.", "Use the Epic Readiness Matrix to decide which specialists must participate.", "List likely feature slices without creating them yet.", "Mark missing context explicitly instead of inventing it."],
      checks: ["Outcome is clear.", "Scope and non-goals are explicit.", "The epic can be split without losing product intent.", "Missing Product, Design, Security, DevOps or Engineering input is called out."],
      outputs: ["Epic readiness summary", "Decision ownership", "Scope boundary", "Non-goals", "Epic readiness matrix", "Likely feature groups", "Missing context", "Recommendation to proceed, refine or block"],
      filesToUpdate: ["Update `../knowledge/issue-readiness.md` only after explicit confirmation.", "Do not update GitHub directly from the model."],
      redLines: ["Do not split an epic that lacks outcome or scope.", "Do not invent acceptance criteria.", "Do not bypass Design, Security or DevOps when their criteria are applicable."]
    },
    {
      slug: "write-feature-criteria",
      title: "Write Feature Criteria",
      purpose: "Apply the Delivery Readiness Matrix (DRM) to draft implementation-ready features with internal tasks.",
      useWhen: ["an epic is ready to be broken into features", "features need Product, Design, Engineering, Security or DevOps criteria", "GitHub issue drafts need to be prepared before remote creation"],
      requiredContext: ["../AGENT.md", "../knowledge/work-taxonomy.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../mvp/prd.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../../ai-standard/templates/product/feature-template.md", "../../../ai-standard/templates/github/delivery-readiness-matrix-template.md", "../../../ai-standard/templates/github/github-feature-template.md"],
      inputs: ["Ready epic", "MVP scope", "PRD", "Acceptance criteria", "Delivery Readiness Matrix", "Applicable Design, Security, DevOps and Engineering context"],
      process: ["Write Product Ops criteria for every feature.", "Write Engineering criteria for every implementation-ready feature.", "Add internal tasks inside each feature.", "Add Design criteria only when the feature affects UX, UI, flow, copy, accessibility, screens, states, components or interaction.", "When Design is applicable, identify whether the feature can reuse a component, adapt a component or needs a new component spec.", "Do not write the full component spec during Feature Shaping; add a Design task for `component-readiness` when a spec is required.", "Add Security criteria only when the feature touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk.", "Add DevOps criteria only when the feature touches environments, CI/CD, deploy, observability, GitHub Project, config or release readiness.", "Mark non-applicable dimensions explicitly with a reason.", "Produce local feature drafts and ask for confirmation before remote creation."],
      checks: ["Every feature has Product Ops and Engineering clarity.", "Every feature has internal tasks.", "Design is included or explicitly not applicable.", "UI features identify component reuse, adaptation or required component spec.", "Features that need a new component include a Design task before Engineering work.", "Security is included or explicitly not applicable.", "DevOps is included or explicitly not applicable.", "Dependencies and risks are visible.", "No GitHub write happens without confirmation."],
      outputs: ["Feature draft list", "DRM table per feature", "Internal task checklist per feature", "Component readiness decision when UI is affected", "Design task for component spec when needed", "Dependencies", "Risks", "Missing context", "Draft payload readiness", "Confirmation question"],
      filesToUpdate: ["Update `../knowledge/issue-readiness.md` only after explicit confirmation.", "Do not update GitHub directly from the model."],
      redLines: ["Do not create implementation-ready features without Product Ops and Engineering criteria.", "Do not add fake Design, Security or DevOps criteria when not applicable.", "Do not call GitHub API directly from the model."]
    },
    {
      slug: "define-delivery-boundaries",
      title: "Define Delivery Boundaries",
      purpose: "Define the minimum product, technical and operational boundaries needed for safe implementation without creating premature architecture artifacts.",
      useWhen: ["an issue or MVP slice needs delivery readiness", "Product Ops must clarify implementation boundaries before Engineering", "Design, Security, DevOps or Engineering applicability is unclear", "technical constraints or operational risks may change the delivery scope"],
      requiredContext: ["../AGENT.md", "../knowledge/work-taxonomy.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../knowledge/technical-decisions.md", "../mvp/prd.md", "../mvp/scope.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../engineering/knowledge/implementation-rules.md"],
      inputs: ["Issue, Feature or MVP slice", "Acceptance criteria", "Known dependencies", "Known technical constraints", "Data, auth, privacy or API impact", "UI, flow, accessibility or component impact", "Environment, deploy or observability impact"],
      process: ["Restate the slice and the delivery boundary in founder-friendly language.", "Separate product boundary, technical boundary, operational boundary and non-goals.", "Classify Design, Security, DevOps and Engineering applicability with a reason.", "Identify dependencies, blocked assumptions, spike needs and readiness gaps.", "Recommend ready, needs-product-shaping, needs-design, needs-security, needs-devops, needs-engineering-spike or blocked.", "Propose the smallest local knowledge update and wait for confirmation before writing."],
      checks: ["The boundary is narrow enough for Engineering to plan safely.", "Design/Security/DevOps applicability is explicit and reasoned.", "Data, auth, privacy, API, environment and release risks are not skipped when applicable.", "Non-goals prevent scope creep.", "The recommendation does not invent implementation details."],
      outputs: ["Delivery boundary summary", "Design/Security/DevOps applicability", "Engineering readiness expectations", "Dependencies", "Risks and blocked assumptions", "Recommended readiness result"],
      filesToUpdate: ["Update `../knowledge/issue-readiness.md` only after explicit confirmation.", "Update `../knowledge/technical-decisions.md` only when a durable confirmed decision exists.", "Do not update design specs, engineering code, GitHub issues, branches or PRs from this skill."],
      redLines: ["Do not create architecture artifacts or source code from this skill.", "Do not decide Security, Design or DevOps is not applicable without a reason.", "Do not turn a boundary decision into implementation approval.", "Do not create Epics, Features, GitHub issues, branches, code or PRs."]
    }
  ];
