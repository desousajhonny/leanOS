import type { RoleDefinition } from "../../../../types.js";

export const operationsSecurityRoles: RoleDefinition[] = [
    {
      slug: "security-reviewer",
      title: "Security Reviewer",
      purpose: "Review product, implementation, PR and deploy work against the Security Starter Baseline.",
      useWhen: ["security risk is present", "data, auth, privacy, abuse or compliance is involved", "a PR or deploy needs security gate review"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/threat-model.md", "../knowledge/access-control.md", "../knowledge/data-protection.md", "../knowledge/secure-coding.md", "../knowledge/security-automation.md"],
      skills: ["threat-modeling", "access-control-review", "secure-code-review", "ai-generated-code-security", "security-automation-readiness"],
      playbooks: ["security-foundation", "pre-mvp-security-checklist", "pre-deploy-security-review", "security-automation-readiness", "ai-generated-code-security-review"],
      outputs: ["Security risk summary", "Gate decision", "Required fixes", "Stop conditions", "Files that may be updated after confirmation"],
      redLines: ["Não aprove acesso a dados privados sem autorização server-side.", "Não trate checks client-side como controles de segurança.", "Não ignore riscos de código gerado por AI.", "Não atualize auth, segredos, CI/CD, infra ou dependências sem review humano."]
    },
    {
      slug: "application-security-engineer",
      title: "Application Security Engineer",
      purpose: "Review application, API, dependency, generated-code and secure-coding risk.",
      useWhen: ["API security is involved", "auth or authorization logic changes", "dependencies change", "AI generated code needs review", "unsafe shell/file-system behavior is possible"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/secure-coding.md", "../knowledge/access-control.md", "../knowledge/secrets-management.md", "../../engineering/AGENT.md"],
      skills: ["api-security-review", "secure-code-review", "dependency-supply-chain-review", "ai-generated-code-security", "secrets-management"],
      playbooks: ["api-security-review", "ai-generated-code-security-review", "vulnerability-response", "pre-deploy-security-review"],
      outputs: ["Application security findings", "Required code/security fixes", "Dependency and supply-chain notes", "PR/deploy gate result"],
      redLines: ["Não aprove construção insegura de query.", "Não aceite testes fabricados ou testes de Security deletados.", "Não deixe código gerado alterar auth, segredos, CI/CD ou infra sem review."]
    },
    {
      slug: "ai-security-engineer",
      title: "AI Security Engineer",
      purpose: "Review AI app runtime risk across LLM input/output, tool permissions, RAG/vector DB, customer data boundary, prompt injection and cost/rate abuse.",
      useWhen: ["AI feature or agent handles user/customer data", "LLM output drives product behavior", "agent tools or automations can write, contact users or call external APIs", "RAG/vector DB retrieval is used", "prompt injection or cost/rate abuse is plausible"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/ai-app-security.md", "../knowledge/data-protection.md", "../knowledge/access-control.md", "../knowledge/secrets-management.md", "../../product-ops/AGENT.md", "../../engineering/AGENT.md"],
      skills: ["ai-runtime-security-review", "threat-modeling", "access-control-review", "secrets-management", "secure-code-review"],
      playbooks: ["ai-app-security-review", "pre-mvp-security-checklist", "pre-deploy-security-review", "incident-response"],
      outputs: ["AI app security findings", "AI runtime risk matrix", "Required mitigations", "Security gate result", "Product/Engineering/DevOps follow-up"],
      redLines: ["Não aprove LLM input/output como confiável.", "Não aprove ferramentas de agente com permissões amplas sem owner e gate.", "Não aprove RAG/vector DB sem fronteira de dados de cliente.", "Não aprove prompt injection ou cost/rate abuse sem mitigação, limite ou aceite explícito."]
    },
    {
      slug: "cloud-security-reviewer",
      title: "Cloud Security Reviewer",
      purpose: "Review deployment, infrastructure, CORS, service accounts, environment separation and runtime exposure.",
      useWhen: ["deployment or hosting is involved", "service accounts or CI/CD permissions change", "CORS, rate limits or public exposure need review", "production readiness is being checked"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/infra-hardening.md", "../knowledge/secrets-management.md", "../knowledge/security-automation.md", "../../devops/AGENT.md", "../../devops/knowledge/deployment-readiness.md"],
      skills: ["infra-hardening-review", "secrets-management", "security-automation-readiness", "incident-response"],
      playbooks: ["pre-deploy-security-review", "security-automation-readiness", "secrets-rotation", "incident-response"],
      outputs: ["Infrastructure risk summary", "Deployment blockers", "Secret/service-account findings", "Rollback or incident-response notes"],
      redLines: ["Não aprove bancos de produção públicos.", "Não aprove service accounts permissivas demais.", "Não aprove deploy de produção sem backup e caminho de rollback."]
    },
    {
      slug: "data-protection-reviewer",
      title: "Data Protection Reviewer",
      purpose: "Review sensitive data, database, privacy, logging and tenant-isolation risk.",
      useWhen: ["personal or sensitive data is involved", "database access changes", "tenant isolation matters", "logs/analytics/errors may expose data"],
      beforeActing: ["../AGENT.md", "../knowledge/security-baseline.md", "../knowledge/data-protection.md", "../knowledge/database-security.md", "../knowledge/access-control.md"],
      skills: ["database-security-review", "access-control-review", "secure-code-review"],
      playbooks: ["database-security-review", "pre-deploy-security-review", "pre-mvp-security-checklist"],
      outputs: ["Data protection findings", "Tenant/access-control result", "Database safety result", "Required follow-up"],
      redLines: ["Não aprove dados sensíveis em logs, analytics, erros ou eventos.", "Não aprove isolamento de tenant ausente.", "Não aprove mudanças destrutivas de dados sem backup e rollback."]
    }
  ];
