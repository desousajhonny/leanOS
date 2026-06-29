import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { marketingPositioningKnowledge } from "./knowledge/marketing-positioning.js";
import { landingPageKnowledge } from "./knowledge/landing-page.js";
import { acquisitionCanaisKnowledge } from "./knowledge/acquisition-channels.js";
import { launchPlanKnowledge } from "./knowledge/launch-plan.js";

export const growthMarketingSourceOfTruth = ["knowledge/positioning.md", "knowledge/landing-page.md", "knowledge/acquisition-channels.md", "knowledge/launch-plan.md"];

export const growthMarketingFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Marketing Knowledge", "Contexto go-to-market para posicionamento, copy de landing page, canais de aquisição e lançamento do MVP.", "Use ao preparar lançamento, experimentos de aquisição ou mensagem voltada ao cliente.", "positioning.md", ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../operations/design/", "../customer-experience/"], "Não invente prova de mercado. Roteie design visual para Operations Design quando necessário.") },
    { path: "knowledge/positioning.md", content: () => marketingPositioningKnowledge() },
    { path: "knowledge/landing-page.md", content: () => landingPageKnowledge() },
    { path: "knowledge/acquisition-channels.md", content: () => acquisitionCanaisKnowledge() },
    { path: "knowledge/launch-plan.md", content: () => launchPlanKnowledge() }
  ];
