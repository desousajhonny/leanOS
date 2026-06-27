import type { SkillDefinition } from "../../../../types.js";

export const strategyProductSkills: SkillDefinition[] = [
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
  ];
