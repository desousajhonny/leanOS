export function engineeringWorkspaceHygieneKnowledge(): string {
  return `# Workspace Hygiene

## Propósito

Define regras de higiene do workspace para impedir acúmulo de scripts temporários, probes locais, arquivos de debug e artefatos descartáveis criados durante implementação por AI ou humanos.

## Temporary Artifact Hygiene

Scripts temporários devem ser tratados como ferramenta de sessão, não como parte do produto.

Use \`.leanos/runtime/scratch/\` para scripts temporários quando precisar criar arquivo local para validar hipótese, investigar bug, converter dados de teste, inspecionar API, rodar probe ou automatizar checagem descartável.

Sempre que possível, prefira comandos inline, REPL, testes reais ou scripts existentes a criar novo arquivo temporário.

## Nomes Que Exigem Atenção

Trate estes padrões como temporários até prova em contrário:

- \`debug.js\`, \`debug.ts\`, \`debug.py\`
- \`temp.js\`, \`temp.ts\`, \`temp.py\`
- \`scratch.js\`, \`scratch.ts\`, \`scratch.py\`
- \`check.js\`, \`check.mjs\`, \`check.py\`
- \`verify.js\`, \`verify.mjs\`, \`verify.py\`
- arquivos com prefixo \`debug-\`, \`temp-\`, \`scratch-\`, \`check-\` ou \`verify-\`

## Temporary Artifact Sweep

Antes de preparar PR, faça um sweep explícito:

- revisar \`git status\`;
- remover scripts temporários que não pertencem ao produto;
- confirmar que \`.leanos/runtime/scratch/\` não contém arquivo versionado além do README;
- justificar qualquer script novo fora de \`.leanos/runtime/scratch/\`;
- marcar scripts permanentes com owner, propósito, documentação e comando oficial;
- sinalizar riscos quando script temporário tocou dados, secrets, API externa, banco, filesystem amplo ou automação remota.

## Promoção Para Script Permanente

Script permanente precisa ter owner, propósito, documentação e comando oficial.

Antes de versionar um script novo, confirme:

- quem mantém o script;
- quando ele deve ser usado;
- qual comando oficial roda o script;
- quais entradas e saídas são esperadas;
- quais riscos de dados, secrets, API, banco, filesystem ou custo existem;
- quais testes ou validações provam que o script é seguro.

## Linhas Vermelhas

- Não permita scripts temporários em commit ou PR.
- Não crie scripts soltos na raiz do repositório.
- Não use script temporário para tocar produção, dados de cliente, secrets, billing, banco remoto ou APIs externas sem Security/DevOps quando aplicável.
- Não esconda script temporário como "utilitário" sem owner, propósito, documentação e comando oficial.
- Não deixe arquivos gerados por AI acumularem em \`scripts/\`, raiz, \`src/\`, \`tests/\` ou pastas de produto sem justificativa.

## Saída Esperada Em PR

Inclua no PR ou na revisão:

\`\`\`text
Temporary Artifact Sweep:
- git status revisado: sim/não
- scripts temporários removidos: <lista ou nenhum>
- scripts permanentes novos: <lista com owner/propósito/comando ou nenhum>
- riscos de dados/secrets/API/banco: <não aplicável ou resumo>
\`\`\`

## Próxima Atualização

Atualize quando o repositório adotar diretório oficial de scripts, runner próprio, política de fixtures, automação de limpeza ou CI que valide artefatos temporários.
`;
}
