import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";

function roadmapKnowledge(): string {
  return `# Roadmap

## Purpose

Sequence product and business work into visible, decision-ready roadmap items when the business is operating, scaling or explicitly choosing between multiple priorities.

## Current State

TBD

## Roadmap Principles

TBD

## Delivery Scope Model

Backlog guarda possibilidades. Roadmap organiza uma sequencia candidata de operacao, crescimento ou multiplas prioridades. Delivery scope transforma um item confirmado em compromisso de entrega.

Roadmap is not mandatory after first MVP validation. The first MVP validation path lives in Strategy Product as MVP Validation Scope; Roadmap enters when the product is operating, scaling or the founder explicitly needs a cycle, backlog order or priority sequence.

Use this lightweight header when a roadmap item becomes delivery-ready:

~~~yaml
scope_type: MVP | Release | Experiment | Beta | Internal
milestone: TBD
release_goal: TBD
~~~

## Now

| Item | Outcome | Delivery Scope | Milestone | Release Goal | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | none | TBD | TBD | candidate |

## Next

| Item | Outcome | Delivery Scope | Milestone | Release Goal | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | none | TBD | TBD | candidate |

## Later

| Item | Outcome | Delivery Scope | Milestone | Release Goal | Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | none | TBD | TBD | candidate |

## Not Planned

| Item | Reason | Decision Date | Revisit Trigger |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Decision Criteria

TBD

## Risks and Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapMilestonesKnowledge(): string {
  return `# Milestones

## Purpose

Define visible checkpoints that connect roadmap work to outcomes.

## Current State

TBD

## Active Milestones

| Milestone | Outcome | Target Window | Status |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Milestone Criteria

TBD

## Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapCurrentCycleKnowledge(): string {
  return `# Current Cycle

## Purpose

Define the current planning or delivery cycle without overcommitting future work.

## Current State

TBD

## Cycle Goal

TBD

## Committed Work

TBD

## Candidate Work

TBD

## Constraints

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

function roadmapBacklogKnowledge(): string {
  return `# Backlog

## Purpose

Collect candidate work before it becomes committed roadmap scope.

## Current State

TBD

## Candidate Items

| Item | Source | User/Business Value | Evidence | Risk | Roadmap Status |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD | candidate |

## Roadmap Status Values

- candidate: worth tracking, not sequenced yet.
- now: belongs to the current roadmap horizon.
- next: likely next after current focus.
- later: useful, but intentionally delayed.
- not-planned: explicitly not pursued now.

## Prioritization Criteria

TBD

## Parking Lot

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export const strategyRoadmapArea: AreaDefinition = {
  key: "strategy.roadmap",
  root: "strategy",
  slug: "roadmap",
  name: "Roadmap",
  path: "strategy/roadmap",
  lead: {
    title: "Roadmap Lead",
    purpose: "Route roadmap planning, prioritization and cycle planning."
  },
  routingKey: "roadmap",
  requestTypes: "roadmap, milestones, backlog, cycle planning, prioritization or operating product sequencing",
  purpose: "Own roadmap sequence, milestones, backlog and planning-cycle prioritization for operating or scaling products.",
  whenToUse: ["sequence product work for product_operating or growth_scaling", "prioritize multiple backlog candidates", "define current cycle", "plan milestones"],
  sourceOfTruth: ["knowledge/roadmap.md", "knowledge/milestones.md", "knowledge/current-cycle.md", "knowledge/backlog.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Roadmap Knowledge", "Durable roadmap context produced by Strategy Roadmap.", "Use when sequencing product work, planning milestones, choosing the current cycle or preparing Product Ops handoff.", "roadmap.md", ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../../.github/leanos/"], "Keep roadmap planning context here. Do not turn candidate backlog items into committed scope without explicit confirmation.") },
    { path: "knowledge/roadmap.md", content: roadmapKnowledge },
    { path: "knowledge/milestones.md", content: roadmapMilestonesKnowledge },
    { path: "knowledge/current-cycle.md", content: roadmapCurrentCycleKnowledge },
    { path: "knowledge/backlog.md", content: roadmapBacklogKnowledge }
  ],
  roles: [
    {
      slug: "roadmap-planner",
      title: "Roadmap Planner",
      purpose: "Turn business, product and operating constraints into a coherent roadmap and cycle plan.",
      useWhen: ["roadmap order is unclear", "backlog needs prioritization", "cycle planning is needed", "the business is product_operating or growth_scaling"],
      beforeActing: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      skills: ["roadmap", "backlog-prioritization"],
      playbooks: ["roadmap-cycle-planning"]
    }
  ],
  skills: [
    {
      slug: "roadmap",
      title: "Roadmap",
      purpose: "Sequence roadmap work by business outcome, product value, operating stage and delivery constraints.",
      useWhen: ["the founder needs a roadmap for a product_operating business", "growth_scaling requires sequencing across multiple priorities", "backlog candidates need Now/Next/Later/Not Planned classification"],
      requiredContext: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      inputs: ["Business stage", "Product strategy", "Business constraints", "Known risks", "Customer or validation signals", "Candidate work"],
      process: ["Clarify the roadmap objective.", "Confirm the business is `product_operating` or `growth_scaling`, or that the founder explicitly asks to sequence multiple priorities.", "Do not use Roadmap as the mandatory continuation of first MVP validation.", "Separate Now, Next, Later and Not Planned.", "Connect items to outcomes, customer signals and validation or operating signals.", "Identify delivery scope type, milestone and release goal only when confirmed later by Product Ops.", "Identify dependencies and risks.", "Propose updates before writing."],
      checks: ["Now items are small enough to reason about.", "Roadmap items are not vague wishes.", "Product is operating/scaling or the founder explicitly needs multi-priority sequencing.", "Delivery scope is not expanded silently.", "MVP-building items are routed to Product Ops scope/backlog instead of Roadmap when they affect current delivery."],
      outputs: ["Roadmap proposal", "Current cycle proposal", "Risks and dependencies", "Open questions"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md"],
      redLines: ["Do not commit future work without founder confirmation.", "Do not invent milestones or dates.", "Do not turn backlog candidates into committed scope silently."]
    },
    {
      slug: "backlog-prioritization",
      title: "Backlog Prioritization",
      purpose: "Prioritize candidate work by value, risk, evidence, effort and current cycle fit.",
      useWhen: ["backlog is unordered", "a new idea needs placement", "the current cycle needs sharper priority"],
      requiredContext: ["../knowledge/backlog.md", "../knowledge/current-cycle.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md"],
      inputs: ["Candidate backlog items", "Product value", "Risk", "Effort", "Dependencies"],
      process: ["Group candidate work.", "Score by outcome value, risk reduction, effort and dependency.", "Recommend keep, park, split or discard.", "Update only after confirmation."],
      checks: ["Top items have a clear user or business outcome.", "Large items are flagged for epic breakdown.", "Dependencies are visible."],
      outputs: ["Prioritized backlog", "Parked items", "Items needing epic breakdown"],
      filesToUpdate: ["../knowledge/backlog.md", "../knowledge/current-cycle.md"],
      redLines: ["Do not use priority as permission to implement.", "Do not hide uncertainty.", "Do not remove backlog items without confirmation."]
    }
  ],
  playbooks: [
    {
      slug: "roadmap-cycle-planning",
      title: "Roadmap Cycle Planning",
      purpose: "Plan the next coherent roadmap cycle from product strategy, operating constraints and known risks.",
      inputs: ["../../../leanos.yaml", "../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md", "../../product/knowledge/validation-notes.md"],
      steps: ["Load the Roadmap AGENT and Roadmap Planner role.", "Use only when the product is `product_operating` or `growth_scaling`, or when the founder explicitly asks to sequence multiple priorities.", "If the business is `mvp_building` or `mvp_live_learning`, route the idea to `activation_required: operations.product-ops` for MVP scope, backlog or delivery planning.", "Review product strategy, customer signals and validation notes.", "Review backlog candidates.", "Choose Now, Next, Later and Not Planned boundaries.", "Define current cycle goal and success criteria.", "Propose updates and wait for confirmation before writing."],
      outputs: ["Roadmap cycle summary", "Current cycle proposal", "Backlog changes", "Milestone follow-up"],
      filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md"]
    }
  ],
  commonPaths: [
    "Roadmap request: `AGENT.md` -> role `roles/roadmap-planner.role.md` -> skill `skills/roadmap/SKILL.md` -> playbook `playbooks/roadmap-cycle-planning.playbook.md`."
  ]
};
