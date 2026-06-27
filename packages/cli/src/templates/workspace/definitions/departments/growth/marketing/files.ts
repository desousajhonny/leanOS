import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { marketingPositioningKnowledge } from "./knowledge/marketing-positioning.js";
import { landingPageKnowledge } from "./knowledge/landing-page.js";
import { acquisitionChannelsKnowledge } from "./knowledge/acquisition-channels.js";
import { launchPlanKnowledge } from "./knowledge/launch-plan.js";

export const growthMarketingSourceOfTruth = ["knowledge/positioning.md", "knowledge/landing-page.md", "knowledge/acquisition-channels.md", "knowledge/launch-plan.md"];

export const growthMarketingFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Marketing Knowledge", "Go-to-market context for positioning, landing page copy, acquisition channels and MVP launch.", "Use when preparing launch, acquisition experiments or customer-facing messaging.", "positioning.md", ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../operations/design/", "../customer-experience/"], "Do not invent market proof. Route visual design to Operations Design when needed.") },
    { path: "knowledge/positioning.md", content: () => marketingPositioningKnowledge() },
    { path: "knowledge/landing-page.md", content: () => landingPageKnowledge() },
    { path: "knowledge/acquisition-channels.md", content: () => acquisitionChannelsKnowledge() },
    { path: "knowledge/launch-plan.md", content: () => launchPlanKnowledge() }
  ];
