import type { PlaybookDefinition } from "../../../../types.js";

export const growthMarketingPlaybooks: PlaybookDefinition[] = [
    {
      slug: "mvp-launch",
      title: "MVP Launch",
      purpose: "Launch the MVP into a focused learning loop.",
      inputs: ["Product positioning", "Copy de landing page", "Canais de aquisição", "Objetivo de lançamento", "Customer feedback plan"],
      steps: ["Leia o AGENT de Marketing e escolha Growth Lead", "Use `skills/define-positioning/SKILL.md` se o posicionamento estiver pouco claro", "Use `skills/create-landing-page-copy/SKILL.md` para preparar copy de lançamento", "Use `skills/create-launch-plan/SKILL.md` para escolher canais e métricas de aprendizado", "Roteie design visual para Operations Design quando necessário", "Roteie implicações de orçamento/pricing para Growth Finance quando necessário", "Planeje como Customer Experience capturará feedback"],
      outputs: ["Plano de lançamento", "Copy de landing page", "Acquisition experiment", "Learning loop", "Open risks"],
      filesToUpdate: ["Update `../knowledge/positioning.md`, `../knowledge/landing-page.md`, `../knowledge/acquisition-channels.md` or `../knowledge/launch-plan.md` after explicit confirmation."]
    }
  ];
