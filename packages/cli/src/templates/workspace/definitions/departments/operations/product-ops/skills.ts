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
    { slug: "write-acceptance-criteria", title: "Write Acceptance Criteria", purpose: "Define completion criteria for MVP work." },
    { slug: "check-delivery-coherence", title: "Check Delivery Coherence", purpose: "Check that delivery scope matches strategy, roadmap and acceptance criteria." },
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
    { slug: "define-delivery-boundaries", title: "Define Delivery Boundaries", purpose: "Define enough technical and operational boundaries for safe implementation without creating premature architecture artifacts." }
  ];
