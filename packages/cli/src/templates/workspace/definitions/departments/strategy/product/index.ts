import type { AreaDefinition } from "../../../../types.js";
import { strategyProductSourceOfTruth, strategyProductFiles } from "./files.js";
import { strategyProductRoles } from "./roles.js";
import { strategyProductSkills } from "./skills.js";
import { strategyProductPlaybooks } from "./playbooks.js";
import { strategyProductCommonPaths } from "./common-paths.js";

export const strategyProductArea: AreaDefinition = {
  key: "strategy.product",
  root: "strategy",
  slug: "product",
  name: "Product",
  path: "strategy/product",
  lead: {
    title: "Product Lead",
    purpose: "Roteia trabalho de estratégia de produto, escolhe a role certa e mantém decisões de produto alinhadas com validação, roadmap e escopo de entrega."
  },
  routingKey: "product",
  requestTypes: "calibragem de ideia, estratégia de produto, núcleo do produto, ICP, proposta de valor, escopo de validação do MVP, posicionamento ou README do produto",
  purpose: "Dona da estratégia de produto, núcleo do produto, ICP, proposta de valor, escopo de validação do MVP e coerência de posicionamento.",
  whenToUse: ["iniciar ou calibrar uma ideia do founder", "definir núcleo do produto", "clarificar ICP", "desenhar proposta de valor", "definir escopo de validação do MVP", "checar coerência de produto", "criar ou melhorar o README do produto"],
  sourceOfTruth: strategyProductSourceOfTruth,
  files: strategyProductFiles,
  roles: strategyProductRoles,
  skills: strategyProductSkills,
  playbooks: strategyProductPlaybooks,
  commonPaths: strategyProductCommonPaths
};
