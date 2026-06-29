import type { PlaybookDefinition } from "../../../../types.js";

export const strategyBusinessPlaybooks: PlaybookDefinition[] = [
    {
      slug: "business-foundation",
      title: "Business Foundation",
      purpose: "Move from raw business context to usable identity, principles and operating model.",
      inputs: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"],
      steps: ["Carregue o AGENT de Business e a role Business Strategist.", "Esclareça perfil e missão do negócio.", "Identifique princípios que afetam decisões de produto, roadmap e execução.", "Defina como founder e agentes de IA colaboram.", "Registre decisões e perguntas abertas.", "Proponha atualizações de arquivo e aguarde confirmação antes de escrever."],
      outputs: ["Business foundation summary", "Mission/principles proposal", "Operating model proposal", "Decision log entries"],
      filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"]
    }
  ];
