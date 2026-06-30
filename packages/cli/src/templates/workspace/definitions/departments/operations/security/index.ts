import type { AreaDefinition } from "../../../../types.js";
import { operationsSecuritySourceOfTruth, operationsSecurityFiles } from "./files.js";
import { operationsSecurityRoles } from "./roles.js";
import { operationsSecuritySkills } from "./skills.js";
import { operationsSecurityPlaybooks } from "./playbooks.js";
import { operationsSecurityCommonPaths } from "./common-paths.js";

export const operationsSecurityArea: AreaDefinition = {
  key: "operations.security",
  root: "operations",
  slug: "security",
  name: "Security",
  path: "operations/security",
  lead: {
    title: "Security Lead",
    purpose: "Route security baseline, appsec, AI app/runtime security, data protection, cloud/security readiness, AI-generated-code review and incident response for MVP-stage products."
  },
  routingKey: "security",
  requestTypes: "security, privacy, access control, threat model, data protection, AI app security or vulnerability response",
  purpose: "Own the mandatory security baseline for implementation, PR and deploy readiness.",
  whenToUse: ["review security risk", "define access control", "document data protection", "threat model a feature", "review AI app runtime risk", "review AI-generated code", "review LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection or cost/rate abuse", "review API, database, secrets, infrastructure or dependency risk", "prepare pre-deploy security gate"],
  operatingRules: [
    "Treat Security as a quality gate before implementation, PR and deploy when sensitive surfaces are involved.",
    "Keep the baseline practical for MVP/startup work; do not create enterprise-heavy process unless the product requires it.",
    "Treat AI app behavior as product security surface, not only generated-code review.",
    "Route app code changes back to Engineering, environment/deploy changes back to DevOps and product scope questions back to Product Ops.",
    "Use OWASP/NIST/CIS references as guardrails, not as academic documentation dumps.",
    "Prefer clear stop conditions over vague warnings."
  ],
  redLines: [
    "No public production database.",
    "Nenhum segredo em Git, logs, prompts, screenshots ou arquivos versionados.",
    "Nenhum endpoint privado sem autenticação e autorização server-side.",
    "Nunca confie em userId, tenantId, role ou isAdmin vindos do cliente.",
    "Never build SQL with string concatenation.",
    "AI agents must not change auth, secrets, CI/CD, infra or dependencies without human review.",
    "LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection and cost/rate abuse must be reviewed before AI features launch."
  ],
  sourceOfTruth: operationsSecuritySourceOfTruth,
  files: operationsSecurityFiles,
  roles: operationsSecurityRoles,
  skills: operationsSecuritySkills,
  playbooks: operationsSecurityPlaybooks,
  commonPaths: operationsSecurityCommonPaths
};
