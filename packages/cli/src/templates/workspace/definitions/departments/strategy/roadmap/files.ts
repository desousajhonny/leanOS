import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { roadmapKnowledge } from "./knowledge/roadmap.js";
import { roadmapMilestonesKnowledge } from "./knowledge/roadmap-milestones.js";
import { roadmapCurrentCycleKnowledge } from "./knowledge/roadmap-current-cycle.js";
import { roadmapBacklogKnowledge } from "./knowledge/roadmap-backlog.js";

export const strategyRoadmapSourceOfTruth = ["knowledge/roadmap.md", "knowledge/milestones.md", "knowledge/current-cycle.md", "knowledge/backlog.md"];

export const strategyRoadmapFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Knowledge de Roadmap", "Contexto durável de roadmap produzido por Strategy Roadmap.", "Use quando sequenciar trabalho de produto, planejar milestones, escolher o ciclo atual ou preparar handoff para Product Ops.", "roadmap.md", ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../../.github/leanos/"], "Mantenha contexto de planejamento de roadmap aqui. Não transforme itens candidatos de backlog em escopo comprometido sem confirmação explícita.") },
    { path: "knowledge/roadmap.md", content: roadmapKnowledge },
    { path: "knowledge/milestones.md", content: roadmapMilestonesKnowledge },
    { path: "knowledge/current-cycle.md", content: roadmapCurrentCycleKnowledge },
    { path: "knowledge/backlog.md", content: roadmapBacklogKnowledge }
  ];
