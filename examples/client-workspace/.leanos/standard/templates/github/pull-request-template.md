# Pull Request

## Título Do PR

Use um título curto em estilo Conventional Commit quando fizer sentido:

```text
feat(<escopo>): <resumo curto>
fix(<escopo>): <resumo curto>
chore(<escopo>): <resumo curto>
docs(<escopo>): <resumo curto>
```

## Resumo

Descreva o que mudou e por quê.

## Issue Vinculada

Closes #

## Epic Pai

Epic #

## Status De Prontidão

Status: draft | founder-ready | blocked-by-tests | blocked-by-context

Explique em uma frase por que este status é correto.

## Contexto LeanOS

- Department:
- Area:
- Role:
- Skills:
- Playbook:

## Alinhamento De Produto / Escopo De Delivery

- Item de roadmap:
- Escopo de delivery:
- Critérios de aceite:
- Impacto de validação ou aprendizado:

## Notas De Design

Declare "não aplicável" quando não houver mudança de UX voltada ao usuário.

## Notas De Security

Declare "não aplicável" quando não houver superfície sensível a Security.

## Testes

- [ ] Testes automatizados executados ou atualizados
- [ ] Validação manual concluída ou explicada

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

## Deploy / Rollback

- Impacto de deploy:
- Migração necessária:
- Caminho de rollback:
- Observabilidade ou monitoramento:

## Riscos

- Risco de escopo:
- Risco técnico:
- Risco de produto:
- Risco de Security:

## Checklist De Review LeanOS

- [ ] Contexto da issue carregado
- [ ] Branch segue a nomenclatura LeanOS
- [ ] Critérios de aceite atendidos
- [ ] Testes executados ou explicados
- [ ] Founder Testing Guide is clear enough for a non-technical founder
- [ ] Critérios de Design atendidos ou não aplicáveis
- [ ] Critérios de Security atendidos ou não aplicáveis
- [ ] Nenhum escopo não relacionado adicionado
