import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";

function productProblemKnowledge(): string {
  return `# Problem

## Purpose

Define the painful, frequent and valuable problem this product should solve.

## Current State

TBD

## Problem Statement

TBD

## Who Feels It

TBD

## Frequency and Urgency

TBD

## Existing Alternatives

TBD

## Why Now

TBD

## Evidence

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productIcpKnowledge(): string {
  return `# Ideal Customer Profile

## Purpose

Define the first customer segment LeanOS should optimize strategy, MVP and validation around.

## Current State

TBD

## Primary Segment

TBD

## Buyer or Decision Maker

TBD

## End User

TBD

## Pain Triggers

TBD

## Qualification Criteria

TBD

## Exclusions

TBD

## Evidence

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productJobsKnowledge(): string {
  return `# Jobs To Be Done

## Purpose

Describe the job the customer is trying to get done and the progress they want to make.

## Current State

TBD

## Core Job

TBD

## Functional Jobs

TBD

## Emotional Jobs

TBD

## Social Jobs

TBD

## Current Workarounds

TBD

## Success Criteria

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productValuePropositionKnowledge(): string {
  return `# Value Proposition

## Purpose

Define the promise, outcome, proof and differentiation for the product.

## Current State

TBD

## Promise

TBD

## Primary Outcome

TBD

## Before and After

TBD

## Differentiation

TBD

## Proof or Evidence

TBD

## Risks

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productPositioningKnowledge(): string {
  return `# Positioning

## Purpose

Define category, audience, problem, point of view and market alternative.

## Current State

TBD

## Category

TBD

## Audience

TBD

## Market Alternative

TBD

## Point of View

TBD

## Messaging Pillars

TBD

## Do Not Say

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productValidationNotesKnowledge(): string {
  return `# Validation Notes

## Purpose

Capture lightweight product assumptions, evidence, learning and validation needs without requiring a dedicated Validation area.

## Current State

TBD

## Key Assumptions

TBD

## Riskiest Assumption

TBD

## Evidence

TBD

## Learning

TBD

## Validation Needs

TBD

## Decisions

TBD

## Roadmap Impact

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productMvpValidationScopeKnowledge(): string {
  return `# MVP Validation Scope

## Purpose

Define the smallest MVP validation path that can test the business thesis quickly.

This file is Strategy Product context. It may describe landing-page, manual, concierge and productized parts of the MVP validation path, but it does not create Epics, Features or implementation scope.

## Business Thesis

TBD

## Target User

TBD

## Core Problem

TBD

## Promise

TBD

## MVP Validation Goal

TBD

## MVP Slice

TBD

## In Scope

TBD

## Out of Scope

TBD

## Manual / Concierge Parts

TBD

## Productized Parts

TBD

## Success Signals

TBD

## Pivot Signals

TBD

## MVP Validation Sequence

TBD

## Open Risks

TBD

## Ready for Product Ops?

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export const strategyProductArea: AreaDefinition = {
  key: "strategy.product",
  root: "strategy",
  slug: "product",
  name: "Product",
  path: "strategy/product",
  lead: {
    title: "Product Lead",
    purpose: "Route product strategy work, choose the right product role and keep product decisions aligned with validation, roadmap and delivery scope."
  },
  routingKey: "product",
  requestTypes: "idea calibration, product strategy, product core, ICP, value proposition, MVP validation scope or positioning",
  purpose: "Own product strategy, product core, ICP, value proposition, MVP validation scope and positioning coherence.",
  whenToUse: ["start or calibrate a founder idea", "define product core", "clarify ICP", "shape value proposition", "define MVP validation scope", "check product coherence"],
  sourceOfTruth: ["knowledge/brief.md", "knowledge/problem.md", "knowledge/icp.md", "knowledge/jobs-to-be-done.md", "knowledge/value-proposition.md", "knowledge/positioning.md", "knowledge/mvp-validation-scope.md", "knowledge/validation-notes.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Product Knowledge", "Durable product context produced by Strategy Product.", "Use when defining product strategy, product core, ICP, value proposition, MVP validation scope, positioning, lightweight validation notes or product coherence.", "brief.md", ["brief.md", "problem.md", "icp.md", "jobs-to-be-done.md", "value-proposition.md", "positioning.md", "mvp-validation-scope.md", "validation-notes.md"], ["../roles/", "../skills/", "../playbooks/", "../../business/", "../../roadmap/"], "Keep company/product context here. Do not enrich roles, skills or playbooks with company-specific facts.") },
    { path: "knowledge/brief.md", content: productBrief },
    { path: "knowledge/problem.md", content: productProblemKnowledge },
    { path: "knowledge/icp.md", content: productIcpKnowledge },
    { path: "knowledge/jobs-to-be-done.md", content: productJobsKnowledge },
    { path: "knowledge/value-proposition.md", content: productValuePropositionKnowledge },
    { path: "knowledge/positioning.md", content: productPositioningKnowledge },
    { path: "knowledge/mvp-validation-scope.md", content: productMvpValidationScopeKnowledge },
    { path: "knowledge/validation-notes.md", content: productValidationNotesKnowledge }
  ],
  roles: [
    {
      slug: "product-strategist",
      title: "Product Strategist",
      purpose: "Connect customer, problem, value proposition, MVP validation scope, roadmap and validation logic.",
      useWhen: ["strategy is unclear", "a founder idea needs calibration", "product core needs definition", "MVP validation scope needs definition", "roadmap coherence is at risk"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md", "../../roadmap/knowledge/current-cycle.md"],
      skills: ["business-baseline", "product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    },
    {
      slug: "product-manager",
      title: "Product Manager",
      purpose: "Translate strategy into coherent MVP validation context before Product Ops creates delivery assets.",
      useWhen: ["MVP validation scope needs refinement", "delivery readiness questions need Strategy Product context"],
      beforeActing: ["../knowledge/brief.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      skills: ["product-core", "mvp-validation-scope", "coherence"],
      playbooks: ["idea-calibration", "mvp-validation-scope"]
    }
  ],
  skills: [
    {
      slug: "business-baseline",
      title: "Business Baseline",
      purpose: "Map a raw founder idea or current business context into known facts, Strategy Baseline gaps, next guided question and safe next route.",
      useWhen: ["the founder is starting LeanOS", "the product idea is raw", "the Chief needs to identify the current business stage before roadmap or MVP validation scope"],
      requiredContext: ["../../../leanos.yaml", "../../../ai-standard/foundation/founder-progression-model.md", "../../../ai-standard/foundation/progression-gates.md", "../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      inputs: ["Seed context", "Founder message", "Known product facts", "Known assumptions", "Current stage", "Open Strategy gaps"],
      process: ["Read only active Strategy context.", "Restate what is known from seed context and Product knowledge.", "Classify the current business stage using the Founder Progression Model.", "Check `progression-gates.md` for required context, allowed next stages and blocked next stages.", "Identify Strategy Baseline gaps: target user, problem, promise, alternative, riskiest assumption, immediate focus and MVP validation target.", "Choose the smallest next guided question.", "Recommend the next route only when the gate is satisfied."],
      checks: ["The output names baseline gaps instead of asking a generic question.", "The next question is tied to one missing decision.", "Roadmap and MVP validation are recommended only after Strategy Baseline is minimally coherent.", "activation_required is used only for inactive areas after the gate permits it."],
      outputs: ["Current business stage", "Known context summary", "Strategy Baseline gaps", "Next guided question", "Safe next route"],
      filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      redLines: ["Do not ask broad empty questions such as tell me more.", "Do not create roadmap, MVP backlog, Epics, Features or implementation work.", "Do not activate Operations, Growth or GitHub from idea calibration."]
    },
    {
      slug: "product-core",
      title: "Product Core",
      purpose: "Consolidate product, primary user, core problem, promise, differentiation and riskiest assumptions into one coherent product core only when the idea has enough signal.",
      useWhen: ["a founder idea has enough discovery signals to consolidate", "the idea-calibration playbook needs one product thesis before MVP validation scope", "ICP, problem and value proposition are intertwined"],
      requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md"],
      inputs: ["Founder idea", "Current business stage", "Strategy Baseline gaps", "Primary user", "Core problem", "Existing alternative", "Desired outcome", "Product promise", "Evidence", "Constraints"],
      process: ["Check Product Core readiness: if primary user, core problem or product promise are missing, do not consolidate yet; return missing signals and next useful question to idea-calibration.", "Restate the product in plain language.", "Define the Primary user and their qualification criteria.", "Name the Core problem, pain trigger and existing alternative.", "Articulate the Product promise, desired outcome and differentiation.", "Separate evidence, assumptions, riskiest assumption and open questions.", "Propose file updates only after the founder confirms the product core."],
      checks: ["Product Core can be summarized in one coherent paragraph.", "Primary user, Core problem and Product promise support each other.", "Evidence is not invented or overstated.", "Do not write Product Core when primary user, core problem and promise are still guesswork.", "Pricing, revenue or delivery-model questions are routed to Strategy Business when they block the decision."],
      outputs: ["Product in one sentence", "Primary user", "Core problem", "Existing alternative", "Product promise", "Differentiation", "Evidence", "Assumptions", "Riskiest assumption", "Main open question", "Recommended next route"],
      filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md"],
      redLines: ["Do not run a rigid discovery interview.", "Do not invent customer evidence or validation.", "Do not force a Product Core from weak signal; return gaps instead.", "Do not create roadmap, MVP backlog, Epics, Features or implementation work.", "Route pricing, revenue or delivery-model decisions to Strategy Business."]
    },
    {
      slug: "mvp-validation-scope",
      title: "MVP Validation Scope",
      purpose: "Define the smallest MVP validation path that can test the business thesis and produce an MVP Validation Sequence.",
      useWhen: ["a founder has a raw idea and wants the first MVP direction", "the business is in seed, strategy_forming or mvp_shaping", "validation should happen through an MVP, landing page, manual workflow or concierge slice"],
      requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../../business/knowledge/business-model-canvas.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      inputs: ["Founder idea", "Business thesis", "Target user", "Core problem", "Promise", "Known constraints", "Manual or productized validation options"],
      process: ["Restate the business thesis and target user.", "Name the core problem and promise.", "Define the MVP validation goal.", "Choose the smallest MVP Slice that can validate the thesis.", "Separate In Scope, Out of Scope, Manual / Concierge Parts and Productized Parts.", "Define Success Signals and Pivot Signals.", "Draft the MVP Validation Sequence without creating roadmap, Epics or Features.", "Record open risks and whether the scope is ready for Product Ops."],
      checks: ["The MVP validates the business thesis instead of maximizing feature count.", "Manual or concierge work is allowed when it speeds validation.", "Success and pivot signals are observable.", "The MVP Validation Sequence is not roadmap or delivery scope.", "Do not update Roadmap files from MVP validation scope."],
      outputs: ["MVP Validation Scope", "Business Thesis", "MVP Slice", "Success Signals", "Pivot Signals", "MVP Validation Sequence", "Ready-for-Product-Ops recommendation"],
      filesToUpdate: ["../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      redLines: ["Do not require interviews or research before proposing an MVP validation scope when the founder wants speed.", "Do not create Epics, Features or implementation scope from Strategy Product.", "Do not update Roadmap files from MVP validation scope."]
    },
    {
      slug: "coherence",
      title: "Coherence Check",
      purpose: "Check alignment between ICP, problem, value proposition, MVP validation scope, roadmap and issue.",
      useWhen: ["strategy feels inconsistent", "MVP validation scope may not match the problem", "roadmap or issue work needs product review"],
      requiredContext: ["../knowledge/icp.md", "../knowledge/problem.md", "../knowledge/value-proposition.md", "../knowledge/mvp-validation-scope.md", "../../roadmap/knowledge/roadmap.md"],
      inputs: ["ICP", "Problem", "Value proposition", "MVP Validation Scope", "Roadmap or issue"],
      process: ["Check ICP/problem fit.", "Check value proposition/problem fit.", "Check MVP validation scope/value fit.", "Check roadmap/MVP validation scope fit.", "List contradictions and next fixes."],
      checks: ["Findings separate alignment from inconsistency.", "Risks are actionable.", "Next command or workflow is clear."],
      outputs: ["Coherence score", "Aligned points", "Inconsistencies", "Risks", "Recommended next action"],
      filesToUpdate: ["Update no files unless the user asks after reviewing the findings."],
      redLines: ["Do not silently rewrite strategy.", "Do not treat coherence review as approval to implement."]
    }
  ],
  playbooks: [
    {
      slug: "idea-calibration",
      title: "Idea Calibration",
      purpose: "Calibrate any founder idea against the current business stage, from first seed idea to product-operating change, without jumping into roadmap, MVP backlog or implementation.",
      inputs: ["../../../leanos.yaml", "../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md", "../../business/knowledge/business-model-canvas.md"],
      steps: ["Load the Product AGENT and choose Product Strategist or Product Manager.", "Use `skills/business-baseline/SKILL.md` first to read `leanos.yaml`, active Strategy context, business stage and Strategy Baseline gaps.", "Choose the calibration path from the business stage: `seed` or `strategy_forming` builds baseline; `mvp_shaping` compares against MVP Validation Scope; `mvp_building` protects current delivery focus; `mvp_live_learning` checks learning signals; `product_operating` and `growth_scaling` evaluate fit with existing product, customers, roadmap, risks and timing.", "Ask only the discovery questions needed to mature the idea for the current business stage.", "Use `skills/product-core/SKILL.md` when there is enough signal to consolidate product, primary user, core problem, promise, differentiation and riskiest assumption.", "Evaluate fit, assumptions, evidence, MVP impact and roadmap impact inside this playbook when the idea affects an existing MVP, product, roadmap, customer signal or operating cadence.", "Route pricing, revenue, channel or delivery-model decisions to `../../business/skills/business-model/SKILL.md` only when they block the Product decision.", "Separate facts, assumptions, open questions and founder decisions.", "Present the calibrated idea with current business-stage reading, Product Core, fit assessment and smallest safe next route.", "Ask the founder to confirm, correct or keep calibrating before writing knowledge files.", "After confirmation, choose the bridge by business stage: `seed`, `strategy_forming` or `mvp_shaping` -> `playbooks/mvp-validation-scope.playbook.md`; `mvp_building` or `mvp_live_learning` -> `activation_required: operations.product-ops`; `product_operating` or `growth_scaling` -> `../../roadmap/playbooks/roadmap-cycle-planning.playbook.md`. Use a validation note when the idea is not ready. Do not create roadmap, Epics, Features or delivery scope here."],
      guidedConversation: ["Ask one useful question at a time, tied to the biggest Strategy Baseline or fit gap for the current business stage.", "Avoid interview fatigue; do not force every skill when the idea is already clear enough.", "Do not treat every new idea as MVP when the business is already building, validating, operating or scaling.", "Use numbered choices only when they make the founder's decision easier.", "Let the founder answer with a number or free-form text.", "End with a clear confirmation question before file updates."],
      outputs: ["Current business-stage reading", "Calibrated idea summary", "Fit assessment", "Strategy Baseline proposal or product-fit recommendation", "Known facts", "Assumptions", "Open questions", "Recommended next route"],
      filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/validation-notes.md"]
    },
    {
      slug: "mvp-validation-scope",
      title: "MVP Validation Scope",
      purpose: "Turn a confirmed Strategy Baseline into the smallest MVP validation scope before Product Ops delivery planning.",
      inputs: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../../business/knowledge/business-model-canvas.md", "../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"],
      steps: ["Load the confirmed Strategy Baseline from Product knowledge.", "Use `skills/mvp-validation-scope/SKILL.md` to identify the first business thesis to validate.", "Choose the smallest validation artifact: product slice, landing page, manual/concierge workflow, prototype or simple automation.", "Separate In Scope, Out of Scope, Manual / Concierge Parts and Productized Parts.", "Define Success Signals and Pivot Signals.", "Draft the MVP Validation Sequence without creating roadmap, Epics, Features, GitHub issues or implementation work.", "Use `skills/coherence/SKILL.md` before proposing file updates.", "Ask the founder to confirm the MVP validation scope before writing.", "After confirmation, offer the handoff to Product Ops when the founder wants delivery scope or Epic planning."],
      guidedConversation: ["Start by restating the confirmed Strategy Baseline.", "Ask only for missing constraints or validation choices.", "When the founder wants speed, prefer the smallest artifact that can teach the business something real.", "Make the handoff explicit: Strategy validates what should be tried; Product Ops turns confirmed scope into delivery work."],
      outputs: ["MVP Validation Scope", "Business thesis", "MVP slice", "Success signals", "Pivot signals", "MVP Validation Sequence", "Product Ops handoff recommendation"],
      filesToUpdate: ["../knowledge/mvp-validation-scope.md", "../knowledge/validation-notes.md"]
    }
  ],
  commonPaths: [
    "Idea calibration request: `AGENT.md` -> role `roles/product-strategist.role.md` -> skill `skills/business-baseline/SKILL.md` -> skill `skills/product-core/SKILL.md` when enough signal exists -> playbook `playbooks/idea-calibration.playbook.md`.",
    "MVP validation request: `AGENT.md` -> role `roles/product-strategist.role.md` -> skill `skills/mvp-validation-scope/SKILL.md` -> playbook `playbooks/mvp-validation-scope.playbook.md`."
  ]
};
