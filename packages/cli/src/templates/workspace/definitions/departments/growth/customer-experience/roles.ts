import type { RoleDefinition } from "../../../../types.js";

export const growthCustomerExperienceRoles: RoleDefinition[] = [
    {
      slug: "cx-lead",
      title: "Customer Experience Lead",
      purpose: "Turn customer signals into product and growth learning.",
      useWhen: ["customer feedback is involved", "support patterns need synthesis", "retention questions arise"],
      beforeActing: ["../AGENT.md", "../knowledge/customer-feedback.md", "../knowledge/support-notes.md", "../knowledge/churn-reasons.md", "../knowledge/success-moments.md"],
      skills: ["customer-feedback-mapping", "support-patterns"],
      playbooks: ["customer-learning-loop"],
      outputs: ["Customer signal summary", "Temas de aprendizado", "Product or growth follow-up", "Risks and open questions"],
      redLines: ["Não exponha informações privadas de clientes.", "Não converta feedback em compromisso de roadmap sem revisão de Strategy/Roadmap."]
    }
  ];
