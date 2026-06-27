import type { AreaDefinition } from "../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../content/shared.js";
import { growthKnowledge } from "./shared-content.js";

function customerFeedbackKnowledge(): string {
  return growthKnowledge("Customer Feedback", "Capture customer feedback, requests, objections and repeated product signals.", ["Signals", "Customer Quotes", "Requests", "Friction", "Product Impact"]);
}

function supportNotesKnowledge(): string {
  return growthKnowledge("Support Notes", "Capture support patterns that should inform product, onboarding or growth decisions.", ["Common Questions", "Recurring Problems", "Workarounds", "Support Burden", "Follow-Up"]);
}

function successMomentsKnowledge(): string {
  return growthKnowledge("Success Moments", "Capture when customers get value and what caused the useful outcome.", ["Moment", "User Context", "Trigger", "Value Created", "Repeatable Pattern"]);
}

function churnReasonsKnowledge(): string {
  return growthKnowledge("Churn Reasons", "Capture why users leave, fail to activate or stop getting value.", ["Reason", "Segment", "Evidence", "Preventable Signals", "Follow-Up"]);
}

export const growthCustomerExperienceArea: AreaDefinition = {
  key: "growth.customer-experience",
  root: "growth",
  slug: "customer-experience",
  name: "Customer Experience",
  path: "growth/customer-experience",
  lead: {
    title: "Customer Experience Lead",
    purpose: "Route customer feedback, support patterns, success moments and churn signals into practical learning loops."
  },
  routingKey: "customer_experience",
  requestTypes: "customer feedback, support, onboarding, retention or success moments",
  purpose: "Own customer learning loops, support notes and experience feedback.",
  whenToUse: ["capture customer feedback", "analyze support notes", "understand churn", "document success moments"],
  operatingRules: [
    "Treat customer signals as evidence, not product decisions by themselves.",
    "Route product changes back to Strategy Product or Product Ops when feedback affects scope.",
    "Keep feedback lightweight and useful for learning loops."
  ],
  redLines: [
    "Do not store sensitive customer data, private identifiers or support secrets in these files.",
    "Do not treat one loud customer as validated market evidence.",
    "Do not promise roadmap changes without Strategy/Roadmap confirmation."
  ],
  sourceOfTruth: ["knowledge/customer-feedback.md", "knowledge/support-notes.md", "knowledge/churn-reasons.md", "knowledge/success-moments.md"],
  files: [
    { path: "knowledge/README.md", content: () => folderReadme("Customer Experience Knowledge", "Customer learning context for feedback, support patterns, success moments and churn reasons.", "Use after launch or user testing when customer signals should inform product or growth decisions.", "customer-feedback.md", ["customer-feedback.md", "support-notes.md", "success-moments.md", "churn-reasons.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../marketing/", "../../finance/"], "Keep customer data minimal. Capture patterns and learning, not private details.") },
    { path: "knowledge/customer-feedback.md", content: () => customerFeedbackKnowledge() },
    { path: "knowledge/support-notes.md", content: () => supportNotesKnowledge() },
    { path: "knowledge/churn-reasons.md", content: () => churnReasonsKnowledge() },
    { path: "knowledge/success-moments.md", content: () => successMomentsKnowledge() }
  ],
  roles: [
    {
      slug: "cx-lead",
      title: "Customer Experience Lead",
      purpose: "Turn customer signals into product and growth learning.",
      useWhen: ["customer feedback is involved", "support patterns need synthesis", "retention questions arise"],
      beforeActing: ["../AGENT.md", "../knowledge/customer-feedback.md", "../knowledge/support-notes.md", "../knowledge/churn-reasons.md", "../knowledge/success-moments.md"],
      skills: ["map-customer-feedback", "synthesize-support-patterns"],
      playbooks: ["customer-learning-loop"],
      outputs: ["Customer signal summary", "Learning themes", "Product or growth follow-up", "Risks and open questions"],
      redLines: ["Do not expose private customer information.", "Do not convert feedback into roadmap commitment without Strategy/Roadmap review."]
    }
  ],
  skills: [
    {
      slug: "map-customer-feedback",
      title: "Map Customer Feedback",
      purpose: "Cluster feedback into product, support and growth signals.",
      useWhen: ["new customer feedback arrives", "feedback needs to inform roadmap or growth", "signals need clustering"],
      requiredContext: ["Customer feedback knowledge", "Product context when available", "Current roadmap when available"],
      inputs: ["Feedback", "Customer segment", "Source", "Frequency", "Impact"],
      process: ["Remove private details", "Cluster by problem or desired outcome", "Separate signal from opinion", "Identify product/growth/support impact", "Recommend next owner"],
      checks: ["No private customer data is stored", "Patterns are not overclaimed", "Roadmap impact is routed to Strategy/Roadmap"],
      outputs: ["Feedback clusters", "Learning themes", "Recommended next owner"],
      filesToUpdate: ["Update `../knowledge/customer-feedback.md` after explicit confirmation."],
      redLines: ["Do not invent evidence.", "Do not treat one-off feedback as validation."]
    },
    {
      slug: "synthesize-support-patterns",
      title: "Synthesize Support Patterns",
      purpose: "Turn support notes into learning and actions.",
      useWhen: ["support notes repeat", "onboarding friction appears", "retention or success patterns need synthesis"],
      requiredContext: ["Support notes", "Success moments", "Churn reasons"],
      inputs: ["Support notes", "Frequency", "Affected user segment", "Workarounds", "Outcome"],
      process: ["Identify recurring problems", "Separate product defects from education gaps", "Map friction to onboarding/product/growth", "Recommend next action"],
      checks: ["Sensitive support details removed", "Pattern has enough signal", "Owner is clear"],
      outputs: ["Support pattern summary", "Friction themes", "Recommended action"],
      filesToUpdate: ["Update `../knowledge/support-notes.md`, `../knowledge/success-moments.md` or `../knowledge/churn-reasons.md` after explicit confirmation."],
      redLines: ["Do not store secrets or customer private data.", "Do not promise fixes without Product Ops or Roadmap review."]
    }
  ],
  playbooks: [
    {
      slug: "customer-learning-loop",
      title: "Customer Learning Loop",
      purpose: "Turn customer experience signals into next actions without overbuilding process.",
      inputs: ["Customer feedback", "Support notes", "Success moments", "Churn reasons", "Current product/roadmap context when available"],
      steps: ["Read Customer Experience AGENT and choose CX Lead", "Use `skills/map-customer-feedback/SKILL.md` to cluster feedback", "Use `skills/synthesize-support-patterns/SKILL.md` when support patterns exist", "Identify friction, success moments and churn risks", "Route product changes to Strategy/Product or Product Ops when needed", "Route messaging/launch implications to Marketing when needed"],
      outputs: ["Learning summary", "Customer signal clusters", "Recommended product/growth/support follow-up", "Open questions"],
      filesToUpdate: ["Update `../knowledge/customer-feedback.md`, `../knowledge/support-notes.md`, `../knowledge/success-moments.md` or `../knowledge/churn-reasons.md` after explicit confirmation."]
    }
  ],
  commonPaths: [
    "Customer experience request: area lead `AGENT.md` -> role `roles/cx-lead.role.md` -> skills `skills/map-customer-feedback/SKILL.md` and conditional `skills/synthesize-support-patterns/SKILL.md` -> playbook `playbooks/customer-learning-loop.playbook.md`."
  ]
};
