import type { AreaDefinition } from "../../../../types.js";
import { operationsDevopsSourceOfTruth, operationsDevopsFiles } from "./files.js";
import { operationsDevopsRoles } from "./roles.js";
import { operationsDevopsSkills } from "./skills.js";
import { operationsDevopsPlaybooks } from "./playbooks.js";
import { operationsDevopsCommonPaths } from "./common-paths.js";

export const operationsDevopsArea: AreaDefinition = {
  key: "operations.devops",
  root: "operations",
  slug: "devops",
  name: "DevOps",
  path: "operations/devops",
  lead: {
    title: "DevOps Lead",
    purpose: "Route GitHub setup, repository bootstrap, environments, CI/CD, deployment readiness, observability and release operations without storing secrets or deploying automatically."
  },
  routingKey: "devops",
  requestTypes: "deployment, environments, CI, observability, GitHub repository bootstrap, GitHub Projects or operations runbooks",
  purpose: "Own delivery infrastructure, environments, deployment, GitHub workflow setup, repository bootstrap readiness and observability notes.",
  whenToUse: ["plan deployment", "configure CI", "configure GitHub Projects", "prepare GitHub repository bootstrap", "document environments", "define observability"],
  operatingRules: [
    "Treat DevOps as readiness and operational guidance first, execution second.",
    "Use GitHub/Vercel/provider files as configuration drafts until the founder confirms execution.",
    "Keep local, preview/staging and production environments distinct.",
    "Prefer dry-run, status checks and proposed payloads before any remote write.",
    "For a new GitHub repository, require README-ready from Strategy Product before create, publish or remote connect.",
    "Route product code implementation back to Engineering and product scope questions back to Product Ops."
  ],
  redLines: [
    "Não armazene tokens, segredos ou credenciais em arquivos do workspace.",
    "Não peça ao founder para colar tokens em chat ou arquivos markdown.",
    "Não chame GitHub, Vercel ou qualquer API de provider sem confirmação explícita.",
    "Não crie `.vercel/`, rode `vercel link` ou faça deploy automaticamente from the scaffold.",
    "Não crie nem modifique `vercel.json` até existir um app/framework real e overrides serem necessários.",
    "Não adicione gates de deploy em CI ou mudanças de branch protection sem explicar impacto e perguntar antes."
  ],
  sourceOfTruth: operationsDevopsSourceOfTruth,
  files: operationsDevopsFiles,
  roles: operationsDevopsRoles,
  skills: operationsDevopsSkills,
  playbooks: operationsDevopsPlaybooks,
  commonPaths: operationsDevopsCommonPaths
};
