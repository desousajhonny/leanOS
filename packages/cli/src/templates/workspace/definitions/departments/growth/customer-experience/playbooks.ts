import type { PlaybookDefinition } from "../../../../types.js";

export const growthCustomerExperiencePlaybooks: PlaybookDefinition[] = [
    {
      slug: "customer-learning-loop",
      title: "Customer Learning Loop",
      purpose: "Turn customer experience signals into next actions without overbuilding process.",
      inputs: ["Customer feedback", "Notas de suporte", "Momentos de sucesso", "Razões de churn", "Current product/roadmap context when available"],
      steps: ["Leia o AGENT de Customer Experience e escolha CX Lead", "Use `skills/customer-feedback-mapping/SKILL.md` para agrupar feedback", "Use `skills/support-patterns/SKILL.md` quando houver padrões de suporte", "Identifique fricção, momentos de sucesso e riscos de churn", "Roteie mudanças de produto para Strategy/Product ou Product Ops quando necessário", "Roteie implicações de mensagem/lançamento para Marketing quando necessário"],
      outputs: ["Learning summary", "Customer signal clusters", "Recommended product/growth/support follow-up", "Perguntas abertas"],
      filesToUpdate: ["Update `../knowledge/customer-feedback.md`, `../knowledge/support-notes.md`, `../knowledge/success-moments.md` or `../knowledge/churn-reasons.md` after explicit confirmation."]
    }
  ];
