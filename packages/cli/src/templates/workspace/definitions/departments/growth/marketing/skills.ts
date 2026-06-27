import type { SkillDefinition } from "../../../../types.js";

export const growthMarketingSkills: SkillDefinition[] = [
    {
      slug: "define-positioning",
      title: "Define Positioning",
      purpose: "Define category, audience, promise and differentiation.",
      useWhen: ["market message is unclear", "landing page needs positioning", "launch needs a focused story"],
      requiredContext: ["Product problem", "ICP", "Value proposition", "Existing positioning"],
      inputs: ["Audience", "Problem", "Promise", "Alternatives", "Differentiation"],
      process: ["Load product context", "Define audience and category", "Clarify promise and proof", "Identify differentiation", "Capture open claims that need validation"],
      checks: ["No invented proof", "Message matches ICP/problem", "Differentiation is specific enough for MVP"],
      outputs: ["Positioning statement", "Messaging risks", "Open proof questions"],
      filesToUpdate: ["Update `../knowledge/positioning.md` after explicit confirmation."],
      redLines: ["Do not invent evidence.", "Do not overpromise beyond product capability."]
    },
    {
      slug: "create-landing-page-copy",
      title: "Create Landing Page Copy",
      purpose: "Draft clear copy for the first validation or launch page.",
      useWhen: ["landing page copy is needed", "MVP validation page is needed", "launch page needs a concise message"],
      requiredContext: ["Positioning", "Product context", "Design foundation when visual/UI structure is needed"],
      inputs: ["Audience", "Problem", "Offer", "CTA", "Objections", "Validation goal"],
      process: ["Load positioning", "Draft hero, problem, offer and CTA", "Address objections", "Define validation signal", "Route visual design needs to Operations Design"],
      checks: ["Copy is clear", "CTA matches learning goal", "No fake proof/testimonials", "Design dependency is flagged when needed"],
      outputs: ["Landing page copy", "CTA", "Validation signal", "Design follow-up if needed"],
      filesToUpdate: ["Update `../knowledge/landing-page.md` after explicit confirmation."],
      redLines: ["Do not invent testimonials or metrics.", "Do not define final UI design when Design is required."]
    },
    {
      slug: "create-launch-plan",
      title: "Create Launch Plan",
      purpose: "Plan launch actions, channels and learning loops.",
      useWhen: ["MVP launch is being planned", "acquisition channels need prioritization", "launch learning needs structure"],
      requiredContext: ["Positioning", "Landing page", "Acquisition channels", "Customer learning goals"],
      inputs: ["Launch goal", "Audience", "Channels", "Assets", "Timeline", "Learning metrics"],
      process: ["Clarify launch goal", "Choose smallest viable channels", "List needed assets", "Define learning metrics", "Route budget questions to Finance"],
      checks: ["Launch is feasible", "Learning goal is explicit", "Budget implications are visible"],
      outputs: ["Launch plan", "Channel experiments", "Learning metrics", "Risks"],
      filesToUpdate: ["Update `../knowledge/launch-plan.md` and `../knowledge/acquisition-channels.md` after explicit confirmation."],
      redLines: ["Do not commit spend without Finance review.", "Do not optimize for vanity metrics only."]
    }
  ];
