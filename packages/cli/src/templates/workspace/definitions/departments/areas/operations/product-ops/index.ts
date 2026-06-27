import type { AreaDefinition } from "../../../../../types.js";
import { checklist, decisionLog, folderReadme, titledDraft } from "../../../../../content/shared.js";
import { productOpsOverviewKnowledge } from "./productOpsOverviewKnowledge.js";
import { productOpsEpicsReadmeKnowledge } from "./productOpsEpicsReadmeKnowledge.js";
import { productOpsDeliveryScopeKnowledge } from "./productOpsDeliveryScopeKnowledge.js";
import { productOpsIssueReadinessKnowledge } from "./productOpsIssueReadinessKnowledge.js";
import { productOpsReadyToDevelopKnowledge } from "./productOpsReadyToDevelopKnowledge.js";
import { productOpsMvpDecisionGateKnowledge } from "./productOpsMvpDecisionGateKnowledge.js";
import { productOpsMvpScopeKnowledge } from "./productOpsMvpScopeKnowledge.js";
import { productOpsMvpBacklogKnowledge } from "./productOpsMvpBacklogKnowledge.js";
import { productOpsMvpPrdKnowledge } from "./productOpsMvpPrdKnowledge.js";
import { productOpsMvpUserStoriesKnowledge } from "./productOpsMvpUserStoriesKnowledge.js";
import { productOpsMvpAcceptanceCriteriaKnowledge } from "./productOpsMvpAcceptanceCriteriaKnowledge.js";
import { productOpsWorkTaxonomyKnowledge } from "./productOpsWorkTaxonomyKnowledge.js";

export const operationsProductOpsArea: AreaDefinition = {
  key: "operations.product-ops",
  root: "operations",
  slug: "product-ops",
  name: "Product Ops",
  path: "operations/product-ops",
  lead: {
    title: "Product Ops Lead",
    purpose: "Route delivery scope, epic shaping, issue readiness and delivery-boundary work before Engineering starts implementation."
  },
  routingKey: "product_ops",
  requestTypes: "MVP backlog, delivery scope, acceptance criteria, epics, features, issue readiness or delivery boundaries",
  purpose: "Turn approved Strategy validation plans into MVP backlog, delivery scope, acceptance criteria and implementation-ready work.",
  whenToUse: ["record MVP backlog", "shape acceptance criteria", "break epics into features", "check issue readiness", "coordinate delivery scope"],
  sourceOfTruth: ["knowledge/overview.md", "knowledge/work-taxonomy.md", "knowledge/delivery-scope.md", "knowledge/issue-readiness.md", "knowledge/mvp-decision-gate.md", "knowledge/ready-to-develop.md", "knowledge/technical-decisions.md", "mvp/backlog.md", "mvp/scope.md", "mvp/prd.md", "mvp/user-stories.md", "mvp/acceptance-criteria.md", "epics/README.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Product Ops Knowledge", "Durable operational context produced by Product Ops.", "Use when turning strategy and roadmap into MVP backlog, delivery scope, issue readiness and delivery boundaries.", "overview.md", ["overview.md", "work-taxonomy.md", "delivery-scope.md", "issue-readiness.md", "mvp-decision-gate.md", "ready-to-develop.md", "technical-decisions.md"], ["../roles/", "../skills/", "../playbooks/", "../mvp/", "../epics/", "../../../strategy/product/", "../../../strategy/roadmap/"], "Keep this folder focused on delivery criteria and scope. The current delivery state should live in MVP backlog, Epics/Features, while PR and implementation memory live in Engineering knowledge.") },
    { path: "knowledge/overview.md", content: productOpsOverviewKnowledge },
    { path: "knowledge/work-taxonomy.md", content: productOpsWorkTaxonomyKnowledge },
    { path: "knowledge/delivery-scope.md", content: productOpsDeliveryScopeKnowledge },
    { path: "knowledge/issue-readiness.md", content: productOpsIssueReadinessKnowledge },
    { path: "knowledge/mvp-decision-gate.md", content: productOpsMvpDecisionGateKnowledge },
    { path: "knowledge/ready-to-develop.md", content: productOpsReadyToDevelopKnowledge },
    { path: "knowledge/technical-decisions.md", content: () => decisionLog("Technical Decisions") },
    { path: "mvp/README.md", content: () => folderReadme("MVP", "MVP execution knowledge owned by Product Ops.", "Use for MVP backlog, operational scope, PRD, stories, flows, acceptance criteria and release readiness.", "backlog.md", ["backlog.md", "scope.md", "prd.md", "user-stories.md", "user-flows.md", "acceptance-criteria.md", "non-goals.md", "release-checklist.md"], ["../knowledge/", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../strategy/roadmap/"], "MVP work is owned by Product Ops with Product/PM supervision. Keep implementation details out until Engineering starts. Every approved MVP backlog item must become an Epic before Feature work.") },
    { path: "mvp/backlog.md", content: productOpsMvpBacklogKnowledge },
    { path: "mvp/scope.md", content: productOpsMvpScopeKnowledge },
    { path: "mvp/prd.md", content: productOpsMvpPrdKnowledge },
    { path: "mvp/user-stories.md", content: productOpsMvpUserStoriesKnowledge },
    { path: "mvp/user-flows.md", content: () => titledDraft("User Flows", "Describe core MVP flows.") },
    { path: "mvp/acceptance-criteria.md", content: productOpsMvpAcceptanceCriteriaKnowledge },
    { path: "mvp/non-goals.md", content: () => titledDraft("Non-Goals", "List what is intentionally excluded.") },
    { path: "mvp/release-checklist.md", content: () => checklist("MVP Release Checklist") },
    { path: "epics/README.md", content: productOpsEpicsReadmeKnowledge }
  ],
  roles: [
    {
      slug: "product-owner",
      title: "Product Owner",
      purpose: "Own MVP execution clarity with supervision from Product and PM strategy.",
      useWhen: ["MVP backlog needs planning", "acceptance criteria are unclear", "delivery scope needs coordination", "an epic needs to be broken into features"],
      beforeActing: ["../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../knowledge/mvp-decision-gate.md", "../knowledge/ready-to-develop.md", "../mvp/backlog.md", "../mvp/scope.md", "../mvp/prd.md", "../mvp/user-stories.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/product/knowledge/mvp-validation-scope.md", "../../../strategy/roadmap/knowledge/roadmap.md", "../../../ai-standard/templates/product/epic-template.md", "../../../ai-standard/templates/product/feature-template.md", "../../../ai-standard/templates/github/delivery-readiness-matrix-template.md"],
      skills: ["define-delivery-scope", "write-acceptance-criteria", "check-delivery-coherence", "shape-epic", "write-feature-criteria"],
      playbooks: ["mvp-backlog-planning", "delivery-item-to-epic", "delivery-scope-planning", "epic-to-features"]
    },
    {
      slug: "delivery-architect",
      title: "Delivery Architect",
      purpose: "Define delivery boundaries, technical constraints and implementation readiness without overdesigning architecture too early.",
      useWhen: ["delivery boundaries are unclear", "technical constraints affect scope", "implementation readiness needs review", "technical decisions need recording"],
      beforeActing: ["../knowledge/overview.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../knowledge/technical-decisions.md", "../mvp/scope.md"],
      skills: ["define-delivery-boundaries", "check-delivery-coherence"],
      playbooks: ["delivery-readiness"]
    }
  ],
  skills: [
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
  ],
  playbooks: [
    {
      slug: "delivery-scope-planning",
      title: "Delivery Scope Planning",
      purpose: "Turn an MVP backlog, roadmap, backlog or delivery candidate into confirmed delivery scope without creating epics, issues or code.",
      inputs: ["MVP backlog item, roadmap item, backlog item or delivery candidate", "Product brief", "Backlog and roadmap status", "Existing delivery scope", "MVP scope when scope_type is MVP", "Known constraints"],
      steps: ["Read Product Ops AGENT and choose the Product Owner role.", "Read the delivery item, product brief and current delivery scope.", "Use `skills/define-delivery-scope/SKILL.md` to decide whether the item becomes delivery scope.", "Set `scope_type`, `milestone` and `release_goal` only after the founder confirms.", "Define non-goals, dependencies and applicability for Design, Security and DevOps.", "If `scope_type` is MVP, map the decision to MVP files.", "Propose file updates and wait for confirmation before writing."],
      outputs: ["Delivery scope proposal", "scope_type", "milestone", "release_goal", "Non-goals", "Design/Security/DevOps applicability", "Recommended next route"],
      filesToUpdate: ["Update `../knowledge/delivery-scope.md` only after explicit confirmation.", "Update `../mvp/scope.md`, `../mvp/prd.md`, `../mvp/non-goals.md` and `../mvp/acceptance-criteria.md` only when `scope_type` is MVP and the founder confirms.", "Do not update GitHub from this playbook."]
    },
    {
      slug: "mvp-backlog-planning",
      title: "MVP Backlog Planning",
      purpose: "Turn the founder-approved Strategy Product MVP Validation Scope into Product Ops MVP backlog items before any Epic or Feature exists.",
      useWhen: ["the founder approved the MVP validation plan", "Strategy Product is ready to hand off MVP validation scope to Product Ops", "Product Ops needs to record candidate and approved MVP items before Epic planning"],
      beforeActing: ["../AGENT.md", "../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/mvp-decision-gate.md", "../knowledge/delivery-scope.md", "../mvp/backlog.md", "../mvp/scope.md", "../mvp/prd.md", "../../../strategy/product/AGENT.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/product/knowledge/problem.md", "../../../strategy/product/knowledge/icp.md", "../../../strategy/product/knowledge/value-proposition.md", "../../../strategy/product/knowledge/mvp-validation-scope.md"],
      inputs: ["Founder-approved MVP Validation Scope", "Product brief", "Problem", "ICP", "Value proposition", "Business model or assumption", "Existing MVP backlog", "MVP Decision Gate"],
      steps: ["Read Product Ops AGENT and choose the Product Owner role.", "Read Strategy Product MVP Validation Scope and confirm it was approved by the founder.", "Load `../knowledge/mvp-decision-gate.md` to keep Value, Usability, Feasibility and Business Viability risks visible.", "Translate the approved validation plan into MVP backlog items.", "Classify each item as candidate, approved_for_mvp, needs_discovery, needs_specialist_check, deferred or not_now.", "Record which items are approved for Epic creation and which remain parked.", "Identify Design, Security, Engineering or DevOps checks only when they affect an item entering the MVP backlog.", "Explain the MVP backlog proposal in founder-friendly language.", "Propose updates and wait for confirmation before writing.", "After confirmation, ask whether the founder wants to transform an approved item into an Epic now or keep refining the MVP backlog."],
      guidedConversation: ["Ask only when the approved Strategy plan lacks enough detail to create backlog items.", "Prefer package approval for the backlog proposal, then item-by-item confirmation only before Epic creation.", "Do not re-open Strategy discovery unless the validation plan is inconsistent."],
      gates: ["Strategy Product MVP Validation Scope exists.", "Founder approved the MVP validation plan.", "Each backlog item has a validation reason or product outcome.", "Items needing specialists are marked before Epic creation.", "Founder confirms before files are updated."],
      outputs: ["MVP backlog proposal", "Approved for MVP", "Candidate items", "Needs discovery", "Needs specialist check", "Deferred items", "Recommended first Epic candidate", "Open questions"],
      filesToUpdate: ["Update `../mvp/backlog.md` only after explicit confirmation.", "Update `../knowledge/overview.md` when Product Ops summary changes.", "Update `../knowledge/delivery-scope.md` only after founder confirms a delivery-scope decision."],
      stopConditions: ["Stop if Strategy Product MVP Validation Scope is missing.", "Stop if the founder has not approved the MVP validation plan.", "Stop before creating Epics, Features, GitHub sync, branches, PRs or code.", "Stop if the request becomes implementation work before an Epic exists."]
    },
    {
      slug: "delivery-item-to-epic",
      title: "Delivery Item To Epic",
      purpose: "Turn an approved MVP backlog, roadmap, backlog or delivery-scope item into a local LeanOS Epic before any Feature, GitHub sync, branch or code exists.",
      useWhen: ["the founder asks to create an Epic for an approved item", "an MVP backlog item is approved for Epic creation", "a roadmap or backlog item has enough product context to become delivery work", "a delivery-scope item needs local Epic ownership"],
      beforeActing: ["../AGENT.md", "../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/delivery-scope.md", "../knowledge/issue-readiness.md", "../mvp/backlog.md", "../epics/README.md", "../../../strategy/product/knowledge/brief.md", "../../../strategy/roadmap/knowledge/roadmap.md", "../../../strategy/roadmap/knowledge/backlog.md", "../../../ai-standard/templates/product/epic-template.md"],
      inputs: ["Approved MVP backlog item, roadmap item, backlog item or delivery-scope item", "Product outcome", "User/business value", "Known scope", "Non-goals", "Milestone or release goal", "Known risks"],
      steps: ["Read Product Ops AGENT and choose the Product Owner role.", "Confirm the delivery item exists, is approved and has enough product context.", "Use `skills/define-delivery-scope/SKILL.md` to decide `scope_type`, `milestone` and `release_goal` as Epic fields.", "Use `skills/shape-epic/SKILL.md` to define outcome, owner, scope boundary, non-goals, risks and likely feature groups.", "Mark Design, Security, Engineering or DevOps checks as needed only when they can change the Epic.", "If a missing specialist check blocks the Epic boundary, stop and ask to activate or route to that area instead of inventing the answer.", "Explain the Epic recommendation in founder-friendly language.", "Ask for confirmation before creating or updating the local Epic folder.", "After confirmation, ask whether the founder wants to break the Epic into Features with `epic-to-features` or stop."],
      guidedConversation: ["Ask only for missing context that changes the Epic boundary.", "Prefer yes/no or short option questions when deciding scope type, milestone or non-goals.", "Do not ask specialist questions on behalf of inactive specialist areas."],
      gates: ["The item is approved for delivery consideration.", "Outcome, user or business value is clear.", "Scope and non-goals are explicit enough to create an Epic.", "Blocking specialist checks are identified before writing.", "Founder confirms before files are updated."],
      outputs: ["Epic recommendation", "Local Epic title and folder slug", "scope_type", "milestone", "release_goal", "Outcome", "Scope", "Non-goals", "Risks", "Likely feature groups", "Specialist checks", "Recommended next route"],
      filesToUpdate: ["Create or update `../epics/<epic-slug>/README.md` only after explicit confirmation.", "Update `../mvp/backlog.md` when an MVP backlog item changes status.", "Update `../knowledge/delivery-scope.md` or `../knowledge/issue-readiness.md` only when the founder confirms the delivery decision.", "Do not update GitHub, branches, source code or Feature files from this playbook."],
      stopConditions: ["Stop if the item does not exist or cannot be identified.", "Stop if the item is still a loose idea.", "Stop if the founder does not confirm Epic creation.", "Stop before Feature files, GitHub sync, branches, code or PR work."]
    },
    {
      slug: "epic-to-features",
      title: "Epic To Features",
      purpose: "Break a local LeanOS Epic into Product Ops Feature drafts with internal tasks and readiness criteria before Engineering starts work.",
      useWhen: ["The founder asks to break an epic into features.", "A local Epic needs feature slices.", "Product Ops needs to draft Feature files and mark readiness gaps before implementation."],
      beforeActing: ["../AGENT.md", "../knowledge/overview.md", "../knowledge/work-taxonomy.md", "../knowledge/issue-readiness.md", "../knowledge/ready-to-develop.md", "../mvp/prd.md", "../mvp/scope.md", "../mvp/acceptance-criteria.md", "../epics/README.md", "../../../strategy/product/AGENT.md", "../../../strategy/roadmap/AGENT.md", "../../../ai-standard/templates/product/epic-template.md", "../../../ai-standard/templates/product/feature-template.md", "../../../ai-standard/templates/github/github-epic-template.md", "../../../ai-standard/templates/github/github-feature-template.md", "../../../ai-standard/templates/github/delivery-readiness-matrix-template.md"],
      inputs: ["Parent Epic", "Milestone/current cycle", "MVP scope", "PRD", "Acceptance criteria", "Delivery Readiness Matrix (DRM)", "Known Design context when UX is affected", "Known Security context when sensitive surfaces are involved", "Known DevOps context when delivery or environment impact exists"],
      steps: ["Load Product Ops AGENT and choose `roles/product-owner.role.md`.", "Load the local Product Epic and Feature templates from `../../../ai-standard/templates/product/` before preparing any GitHub issue.", "Load `skills/shape-epic/SKILL.md` and confirm the epic outcome, decision ownership, scope boundary, non-goals and Epic Readiness Matrix.", "Load `skills/write-feature-criteria/SKILL.md` and apply the Feature-level Delivery Readiness Matrix (DRM).", "Write Product Ops criteria for every Feature.", "Add internal tasks inside each Feature.", "Add Design criteria only when UX, UI, flow, copy, accessibility, screens, states, components or interaction is affected.", "When a Feature depends on UI components, mark whether it can reuse a known component, adapt one or needs a future component spec.", "Do not create the full component spec during Feature Shaping; add a Design readiness task for `operations/design/playbooks/component-readiness.playbook.md` when a spec is needed.", "Add Security criteria only when data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk is involved.", "Add DevOps criteria only when environments, CI/CD, deploy, observability, GitHub Project, config or release readiness are affected.", "Mark Engineering criteria as readiness expectations, not implementation approval.", "Mark non-applicable dimensions explicitly and explain why.", "Prepare local Feature drafts and ask for confirmation before any remote write."],
      securityGate: ["Stop if the epic touches data, auth, permissions, privacy, abuse, API, database, secrets, compliance, infrastructure or AI-generated-code risk and Security criteria are missing.", "Do not downgrade a Security dimension to not applicable without explaining why."],
      outputs: ["Epic readiness summary", "Feature draft list", "Internal task checklist per feature", "DRM criteria for each feature", "Product Ops criteria", "Design criteria or not applicable with reason", "Component reuse/adaptation/spec decision when UI is affected", "Design readiness task for component spec when needed", "Engineering readiness expectations", "Security criteria or not applicable with reason", "DevOps criteria or not applicable with reason", "Dependencies and risks", "Missing context", "Confirmation question before remote issue creation"],
      filesToUpdate: ["Do not update GitHub directly from the model.", "Do not update source code.", "Update `../knowledge/issue-readiness.md` or MVP files only when the user explicitly confirms a scope or criteria change."],
      stopConditions: ["Stop if the parent epic is missing outcome, scope or non-goals.", "Stop if Product Ops or Engineering criteria are missing.", "Stop if applicable Design, Security or DevOps criteria cannot be determined.", "Stop before any GitHub API write until the user explicitly confirms."]
    },
    {
      slug: "delivery-readiness",
      title: "Delivery Readiness",
      purpose: "Confirm that an issue or MVP slice has enough product, technical and operational clarity to enter Engineering.",
      inputs: ["Issue or MVP slice", "Product Ops overview", "Ready To Develop criteria", "MVP scope", "PRD", "Acceptance criteria", "Issue readiness notes", "Design and Security context when applicable"],
      steps: ["Read Product Ops AGENT and choose the Delivery Architect role", "Review MVP scope, PRD and acceptance criteria", "Identify dependencies and technical constraints", "Check Design and Security applicability", "Capture only confirmed technical decisions", "Recommend ready, needs product shaping, needs design, needs security or blocked"],
      outputs: ["Delivery readiness result", "Missing criteria", "Dependencies", "Design or Security applicability", "Technical decision notes", "Recommended next action"],
      filesToUpdate: ["Update `../knowledge/issue-readiness.md` or `../knowledge/technical-decisions.md` only after explicit confirmation."]
    }
  ],
  commonPaths: [
    "Product Ops request: area lead `AGENT.md` -> choose Product Owner or Delivery Architect -> load only the required skills and playbook.",
    "Delivery scope request: role `roles/product-owner.role.md` -> skill `skills/define-delivery-scope/SKILL.md` -> playbook `playbooks/delivery-scope-planning.playbook.md`.",
    "MVP backlog request: area lead `AGENT.md` -> role `roles/product-owner.role.md` -> gate `knowledge/mvp-decision-gate.md` -> playbook `playbooks/mvp-backlog-planning.playbook.md` -> `mvp/backlog.md`.",
    "Delivery item to Epic request: role `roles/product-owner.role.md` -> skills `skills/define-delivery-scope/SKILL.md` and `skills/shape-epic/SKILL.md` -> playbook `playbooks/delivery-item-to-epic.playbook.md`.",
    "Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic/SKILL.md` and `skills/write-feature-criteria/SKILL.md` -> playbook `playbooks/epic-to-features.playbook.md`.",
    "Delivery readiness request: role `roles/delivery-architect.role.md` -> skill `skills/define-delivery-boundaries/SKILL.md` -> playbook `playbooks/delivery-readiness.playbook.md`."
  ]
};
