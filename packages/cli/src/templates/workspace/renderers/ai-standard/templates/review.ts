export function codeReviewTemplate(): string {
  return `# Template De Code Review

## Contexto Do Review

- PR:
- Issue vinculada:
- Epic pai:
- Escopo de delivery:
- Acceptance criteria:

## Achados

Liste achados por severidade.

| Severidade | Arquivo/Área | Achado | Mudança Obrigatória |
| --- | --- | --- | --- |
| blocker/high/medium/low | TBD | TBD | TBD |

## Dimensões Do Review

- Correctness
- Scope control
- Tests
- Architecture
- Security/privacy when applicable
- Design/UX when applicable
- LeanOS source-of-truth alignment

## Decisão

- [ ] Pronto para merge
- [ ] Precisa de mudanças
- [ ] Bloqueado por contexto ausente

## Perguntas em Aberto

TBD
`;
}
