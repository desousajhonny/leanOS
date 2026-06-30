import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { marketingPositioningKnowledge } from "./knowledge/marketing-positioning.js";
import { landingPageKnowledge } from "./knowledge/landing-page.js";
import { acquisitionCanaisKnowledge } from "./knowledge/acquisition-channels.js";
import { launchPlanKnowledge } from "./knowledge/launch-plan.js";
import { growthExperimentsKnowledge } from "./knowledge/growth-experiments.js";

export const growthMarketingSourceOfTruth = ["knowledge/positioning.md", "knowledge/landing-page.md", "knowledge/acquisition-channels.md", "knowledge/launch-plan.md", "knowledge/growth-experiments.md"];

export const growthMarketingFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Marketing Knowledge", "Contexto go-to-market para posicionamento, copy de landing page, canais de aquisição, lançamento do MVP e experimentos de Growth.", "Use ao preparar lançamento, experimentos de aquisição, análise de resultado ou mensagem voltada ao cliente.", "growth-experiments.md", ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md", "growth-experiments.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../operations/design/", "../customer-experience/", "../finance/"], "Não invente prova de mercado ou telemetria. Roteie design visual para Operations Design quando necessário e gastos para Growth Finance.") },
    { path: "knowledge/positioning.md", content: () => marketingPositioningKnowledge() },
    { path: "knowledge/landing-page.md", content: () => landingPageKnowledge() },
    { path: "knowledge/acquisition-channels.md", content: () => acquisitionCanaisKnowledge() },
    { path: "knowledge/launch-plan.md", content: () => launchPlanKnowledge() },
    { path: "knowledge/growth-experiments.md", content: () => growthExperimentsKnowledge() }
  ];
