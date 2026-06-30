# Jornada: Security Hardening Cycle

## Intenção Do Founder

Quando o founder pergunta "audite segurança", "tem vulnerabilidade?", "isso atende LGPD?", "tem risco com dados de cliente?", "vazou token" ou "como proteger API?", o LeanOS deve tratar isso como uma jornada de Security em Operations.

O objetivo não é corrigir código imediatamente. O objetivo é entender o risco, revisar a menor evidência relevante, produzir uma decisão de Security e rotear a mitigação para a área dona.

## Rota

```text
Root AGENT.md
-> activation_required: operations.security quando Security estiver inativo
-> operations/AGENT.md
-> operations/workflows/security-hardening-cycle.workflow.md
-> operations/security/AGENT.md
-> role especialista de Security
-> skill/playbook menor para o risco
```

Para AI app security:

```text
operations/security/roles/ai-security-engineer.role.md
-> operations/security/skills/ai-runtime-security-review/SKILL.md
-> operations/security/playbooks/ai-app-security-review.playbook.md
```

## Gatilhos

- Vulnerabilidade, hardening ou auditoria geral.
- LGPD, privacidade, dados de cliente ou tenant isolation.
- Token, secret, credencial, `.env` ou vazamento.
- API, auth, permissões, admin, rate limit ou CORS.
- AI app, agente, RAG, automação 24/7 ou tool use.
- Launch bloqueado por Security.

## AI-Native Security

Quando o produto usa AI, o modelo precisa revisar explicitamente:

- LLM input/output;
- tool permissions;
- RAG/vector DB;
- customer data boundary;
- prompt injection;
- cost/rate abuse.

Se qualquer item for aplicável e não houver evidência suficiente, a decisão deve ser `blocked_by_security`, `needs_engineering`, `needs_devops`, `needs_product_ops` ou `needs_rotation`, não "pronto".

## Saídas Esperadas

- Tipo de pedido de Security identificado.
- Evidência revisada e lacunas.
- Achados por severidade.
- Owner e menor mitigação por achado.
- Decisão de Security: `security_pass`, `security_concerns`, `blocked_by_security`, `needs_rotation`, `incident_response_required` ou `not_applicable`.
- Rota de follow-up para Product Ops, Engineering, DevOps, Growth ou Strategy.

## Limites

- Não altere código, infra, secrets ou permissões automaticamente.
- Não peça token ou segredo em chat.
- Não escreva em `.env`, provider, GitHub remoto, CRM, email, analytics ou pagamento.
- Não rode scanner externo sem confirmação e sem rota específica.
- Não transforme achado de Security em Feature sem Product Ops quando isso mudar escopo ou critérios.

## Checklist De Validação Da Jornada

- [x] Root `AGENT.md` reconhece pedidos diretos de segurança.
- [x] Root retorna `activation_required: operations.security` quando Security está inativo.
- [x] Ativar `operations.security` cria `operations/workflows/security-hardening-cycle.workflow.md`.
- [x] O workflow aponta para `operations/security/AGENT.md`.
- [x] AI app security passa por `operations/security/playbooks/ai-app-security-review.playbook.md`.
- [x] AI runtime review passa por `operations/security/skills/ai-runtime-security-review/SKILL.md`.
- [x] O workflow não corrige código, infra, secrets ou permissões automaticamente.
- [x] Ready for launch bloqueia quando Security é aplicável e `security_gate_passed` não existe.
