export function pullRequestTemplate(): string {
  return `# Pull Request

## Summary

Describe what changed and why.

## Linked Issue

Closes #

## Parent Epic

Epic #

## LeanOS Context

- Active Department:
- Active Area:
- Active Role:
- Loaded Skills:
- Relevant Playbook:

## Product / Delivery Scope Alignment

- Strategy alignment:
- Delivery scope alignment:
- Acceptance criteria:
- Validation or learning impact:

## Design Notes

State "Not applicable" when no user-facing design change exists.

## Notas De Security

Declare "não aplicável" quando não houver superfície sensível a Security.

## Tests

- [ ] Comando de build ou teste executado
- [ ] Validação manual concluída

## Founder Testing Guide

Explique como um founder não técnico pode testar este PR antes do merge.

### O Que Mudou

Resumo em linguagem simples do comportamento de usuário ou negócio entregue.

### Onde Testar

- URL de preview:
- Rota ou tela local:
- Conta ou dados de teste:

### Como Testar

1. Abra...
2. Faça...
3. Confirme...

### Resultado Esperado

O que o founder deve ver quando o PR funcionar.

### Fora Do Escopo

O que este PR intencionalmente não cobre.

### Riscos Conhecidos Ou Limites

Qualquer coisa que o founder deva saber antes de aprovar.

## Riscos

- Scope risk:
- Technical risk:
- Product risk:
- Security risk:

## Checklist De Review LeanOS

- [ ] Issue context loaded
- [ ] Branch follows LeanOS naming
- [ ] Acceptance criteria addressed
- [ ] Testes executados ou explicados
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Design criteria addressed or not applicable
- [ ] Security criteria addressed or not applicable
- [ ] Nenhum escopo não relacionado adicionado
`;
}
