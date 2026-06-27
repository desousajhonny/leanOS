import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";
import { growthKnowledge } from "./shared-content.js";

function marketingPositioningKnowledge(): string {
  return growthKnowledge("Positioning", "Capture the market-facing story for the current MVP or launch loop.", ["Audience", "Category", "Promise", "Differentiation", "Proof"]);
}

function landingPageKnowledge(): string {
  return growthKnowledge("Landing Page", "Draft the first landing page message, conversion goal and validation signal.", ["Hero Message", "Problem", "Offer", "CTA", "Objections", "Validation Signal"]);
}

function acquisitionChannelsKnowledge(): string {
  return growthKnowledge("Acquisition Channels", "List the first practical acquisition channels and learning experiments.", ["Channel", "Audience Fit", "Experiment", "Cost / Effort", "Success Signal"]);
}

function launchPlanKnowledge(): string {
  return growthKnowledge("Launch Plan", "Plan the smallest useful MVP launch and learning loop.", ["Launch Goal", "Audience", "Channel Plan", "Assets", "Timeline", "Learning Goal"]);
}

export const growthMarketingArea: AreaDefinition = {
  key: "growth.marketing",
  root: "growth",
  slug: "marketing",
  name: "Marketing",
  path: "growth/marketing",
  lead: {
    title: "Marketing Lead",
    purpose: "Route positioning, landing page copy, acquisition experiments and launch planning without turning early growth into heavy process."
  },
  routingKey: "marketing",
  requestTypes: "positioning, landing page, launch, acquisition or marketing",
  purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
  whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
  operatingRules: [
    "Use Strategy Product as the source for ICP, problem, value proposition and positioning claims.",
    "Route visual design or UI structure to Operations Design when needed.",
    "Keep launch plans focused on learning, not vanity activity."
  ],
  redLines: [
    "Do not invent proof, testimonials or customer results.",
    "Do not create visual design direction without Design when UX/brand details matter.",
    "Do not spend budget or commit channels without Finance review when money is involved."
  ],
  sourceOfTruth: ["knowledge/positioning.md", "knowledge/landing-page.md", "knowledge/acquisition-channels.md", "knowledge/launch-plan.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Marketing Knowledge", "Go-to-market context for positioning, landing page copy, acquisition channels and MVP launch.", "Use when preparing launch, acquisition experiments or customer-facing messaging.", "positioning.md", ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../operations/design/", "../customer-experience/"], "Do not invent market proof. Route visual design to Operations Design when needed.") },
    { path: "knowledge/positioning.md", content: () => marketingPositioningKnowledge() },
    { path: "knowledge/landing-page.md", content: () => landingPageKnowledge() },
    { path: "knowledge/acquisition-channels.md", content: () => acquisitionChannelsKnowledge() },
    { path: "knowledge/launch-plan.md", content: () => launchPlanKnowledge() }
  ],
  roles: [
    {
      slug: "growth-lead",
      title: "Growth Lead",
      purpose: "Translate product strategy into positioning, launch and acquisition experiments.",
      useWhen: ["growth, positioning, landing pages, acquisition or launch is involved"],
      beforeActing: ["../AGENT.md", "../knowledge/positioning.md", "../knowledge/landing-page.md", "../knowledge/acquisition-channels.md", "../knowledge/launch-plan.md", "../../../strategy/product/README.md"],
      skills: ["define-positioning", "create-landing-page-copy", "create-launch-plan"],
      playbooks: ["mvp-launch"],
      outputs: ["Positioning or launch recommendation", "Customer-facing copy draft", "Acquisition experiment", "Open risks"],
      redLines: ["Do not invent proof or customer quotes.", "Do not define visual design without Operations Design when required.", "Do not commit paid acquisition spend without Finance review."]
    }
  ],
  skills: [
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
  ],
  playbooks: [
    {
      slug: "mvp-launch",
      title: "MVP Launch",
      purpose: "Launch the MVP into a focused learning loop.",
      inputs: ["Product positioning", "Landing page copy", "Acquisition channels", "Launch goal", "Customer feedback plan"],
      steps: ["Read Marketing AGENT and choose Growth Lead", "Use `skills/define-positioning/SKILL.md` if positioning is unclear", "Use `skills/create-landing-page-copy/SKILL.md` to prepare launch copy", "Use `skills/create-launch-plan/SKILL.md` to choose channels and learning metrics", "Route visual design to Operations Design when needed", "Route budget/pricing implications to Growth Finance when needed", "Plan how Customer Experience will capture feedback"],
      outputs: ["Launch plan", "Landing page copy", "Acquisition experiment", "Learning loop", "Open risks"],
      filesToUpdate: ["Update `../knowledge/positioning.md`, `../knowledge/landing-page.md`, `../knowledge/acquisition-channels.md` or `../knowledge/launch-plan.md` after explicit confirmation."]
    }
  ],
  commonPaths: [
    "Launch request: area lead `AGENT.md` -> role `roles/growth-lead.role.md` -> skills `skills/define-positioning/SKILL.md`, `skills/create-landing-page-copy/SKILL.md` and `skills/create-launch-plan/SKILL.md` -> playbook `playbooks/mvp-launch.playbook.md`."
  ]
};
