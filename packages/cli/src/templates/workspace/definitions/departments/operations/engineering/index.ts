import type { AreaDefinition } from "../../../../types.js";
import { operationsEngineeringSourceOfTruth, operationsEngineeringFiles } from "./files.js";
import { operationsEngineeringRoles } from "./roles.js";
import { operationsEngineeringSkills } from "./skills.js";
import { operationsEngineeringPlaybooks } from "./playbooks.js";
import { operationsEngineeringCommonPaths } from "./common-paths.js";

export const operationsEngineeringArea: AreaDefinition = {
  key: "operations.engineering",
  root: "operations",
  slug: "engineering",
  name: "Engineering",
  path: "operations/engineering",
  lead: {
    title: "Engineering Lead",
    purpose: "Route implementation, branch, testing, data-change, PR and review work while enforcing Engineering red lines before code changes."
  },
  routingKey: "engineering",
  requestTypes: "code, implementation, bugs, tests, issues or pull requests",
  purpose: "Own implementation, tests, code quality and PR readiness.",
  whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "write tests", "work on a local Feature or mapped GitHub issue"],
  operatingRules: [
    "Read the Feature or mapped GitHub issue, PRD, MVP scope and acceptance criteria before planning implementation.",
    "Create or confirm a Feature-linked branch before changing code.",
    "Follow existing repository patterns before introducing new abstractions.",
    "Route user-facing UI work through Design when the design foundation or flow is missing.",
    "Read the approved Design component spec before implementing a new reusable component.",
    "Implement reusable component work before the screen or Feature that depends on it.",
    "Use `.leanos/runtime/scratch/` for temporary scripts and remove scratch artifacts before PR.",
    "Route data, auth, permissions, privacy, abuse or compliance work through Security when risk is present.",
    "Use `.github/leanos/branch-rules.md` and `.github/PULL_REQUEST_TEMPLATE.md` for branch and PR conventions.",
    "For implementation work that arrives from `feature-to-delivery-cycle`, route to Senior Developer and use `playbooks/engineering-delivery.playbook.md` as the master execution path before sub-playbooks."
  ],
  redLines: [
    "Não implemente fora do escopo confirmado da Feature ou PRD.",
    "Não crie novos componentes voltados ao usuário antes de Design definir a estrutura ou confirmar a especificação do componente.",
    "Não hardcode segredos, configuração, regras de negócio, copy ou valores de design.",
    "Não deixe scripts temporários, probes locais ou arquivos de debug entrarem em commit ou PR.",
    "Não crie arquivos, componentes ou funções grandes e sem estrutura quando composição modular for possível.",
    "Não faça mudanças destrutivas de dados ou migração sem confirmação explícita e notas de rollback.",
    "Não abra nem recomende um PR sem testes, notas de validação manual ou explicação clara de lacuna de teste."
  ],
  sourceOfTruth: operationsEngineeringSourceOfTruth,
  files: operationsEngineeringFiles,
  roles: operationsEngineeringRoles,
  skills: operationsEngineeringSkills,
  playbooks: operationsEngineeringPlaybooks,
  commonPaths: operationsEngineeringCommonPaths
};
