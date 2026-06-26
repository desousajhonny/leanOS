# Plano De Implementação Do Founder Progression Model

> **Para agentes executores:** SUB-SKILL OBRIGATÓRIA: use superpowers:subagent-driven-development (recomendado) ou superpowers:executing-plans para implementar este plano tarefa por tarefa. As etapas usam sintaxe de checkbox (`- [ ]`) para acompanhamento.

**Objetivo:** adicionar o Founder Progression Model como asset gerado de foundation do LeanOS, validá-lo automaticamente e prepará-lo para orientar a ativação progressiva do workspace.

**Arquitetura:** o primeiro slice mantém o modelo como documentação gerada a partir do source em `ai-standard/foundation/`, porque essa pasta já é dona das regras de nível de framework para navegação, conversa guiada e qualidade. A validação do generator deve falhar quando o arquivo, as rotas no README ou as âncoras obrigatórias de progressão estiverem ausentes.

**Stack Técnica:** templates do generator em TypeScript, script de validação em Node e assets Markdown gerados no workspace.

---

### Tarefa 1: Adicionar Validação Do Generator Para Founder Progression

**Arquivos:**
- Modificar: `packages/cli/scripts/validate-generator.mjs`

- [x] **Etapa 1: Adicionar a expectativa de existência de arquivo que deve falhar**

Adicionar `ai-standard/foundation/founder-progression-model.md` aos paths gerados esperados em `validateWorkspaceFiles()`.

- [x] **Etapa 2: Adicionar assertions de conteúdo**

Em `assertAiStandardFoundation(rootDir)`, ler `founder-progression-model.md` e garantir que ele contém as âncoras obrigatórias:

```js
const founderProgressionModel = await readFile(join(rootDir, "ai-standard", "foundation", "founder-progression-model.md"), "utf8");

for (const expected of [
  "Setup Seed",
  "Strategy Seed",
  "Strategy Baseline",
  "Idea Diagnosis",
  "Roadmap Inicial",
  "MVP Decision",
  "Product Shaping",
  "Delivery Readiness",
  "Implementation",
  "Launch",
  "Learning Loop",
  "Scaling / Operating Cadence",
  "activation_required",
  "Progression Intent Routing",
  "Do not load inactive departments"
]) {
  assert(founderProgressionModel.includes(expected), `Founder Progression Model should include ${expected}`);
}
```

- [x] **Etapa 3: Rodar validação e confirmar RED**

Rodar: `node packages\cli\scripts\validate-generator.mjs`

Esperado: FAIL porque `ai-standard/foundation/founder-progression-model.md` ainda não é gerado.

Observado: FAIL com `Expected generated path missing: ai-standard/foundation/founder-progression-model.md`.

### Tarefa 2: Gerar O Arquivo De Foundation Founder Progression

**Arquivos:**
- Modificar: `packages/cli/src/templates/workspace/renderers/ai-standard.ts`

- [x] **Etapa 1: Registrar o novo asset de foundation**

Adicionar o arquivo à lista do README de foundation e ao array de retorno de `aiStandardFiles()`:

```ts
{ path: "ai-standard/foundation/founder-progression-model.md", content: founderProgressionModel() },
```

- [x] **Etapa 2: Adicionar a função de conteúdo**

Criar `founderProgressionModel(): string` com seções para:

- propósito e quando usar
- estágios de progressão inicial
- comportamento do Chief no startup
- regras de perguntas guiadas
- gates de ativação
- comportamento de resposta para `activation_required`
- linhas vermelhas contra assets inativos ou inexistentes
- exemplos práticos de roteamento

- [x] **Etapa 3: Atualizar rotas do README de AI Standard**

Adicionar uma linha de rota para escolher o próximo estágio de progressão do founder:

```md
| Decide the next founder progression stage | `foundation/founder-progression-model.md` | Defines Strategy-first progression, gates, activation_required and Chief routing behavior. |
```

- [x] **Etapa 4: Rodar validação e confirmar GREEN**

Rodar: `node packages\cli\scripts\validate-generator.mjs`

Esperado: PASS com `LeanOS generator validations passed.`

Observado: PASS depois de compilar `packages/cli` com `packages\cli\node_modules\.bin\tsc.CMD -p packages\cli\tsconfig.json` e regenerar `examples/client-workspace`.

### Tarefa 3: Revisar O Diff Gerado

**Arquivos:**
- Revisar: `packages/cli/src/templates/workspace/renderers/ai-standard.ts`
- Revisar: `packages/cli/scripts/validate-generator.mjs`
- Revisar: `docs/superpowers/plans/2026-06-25-founder-progression-model.md`

- [x] **Etapa 1: Inspecionar arquivos alterados**

Rodar: `git diff -- packages/cli/src/templates/workspace/renderers/ai-standard.ts packages/cli/scripts/validate-generator.mjs docs/superpowers/plans/2026-06-25-founder-progression-model.md`

Esperado: o diff adiciona apenas o novo foundation model, roteamento no README e assertions de validação.

Observado: o diff inclui a fixture de preview gerada para o novo arquivo de foundation, além do arquivo temporário de roadmap já modificado nesta sessão.

- [ ] **Etapa 2: Decidir o próximo slice**

Depois que isso passar, continuar com roteamento de progressão no `AGENT.md` raiz / agente raiz gerado, depois regras de ativação do scaffold Strategy-only.
