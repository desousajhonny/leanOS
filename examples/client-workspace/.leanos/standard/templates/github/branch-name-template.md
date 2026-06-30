# Branch Name Template

Use branches focadas e vinculadas a uma Feature local LeanOS, issue mapeada ou manutenção explicitamente escopada.

## Formats

```text
feature/<feature-slug>-<short-kebab-slug>
issue/<issue-number>-<short-kebab-slug>
fix/<issue-number>-<short-kebab-slug>
chore/<short-kebab-slug>
docs/<short-kebab-slug>
spike/<short-kebab-slug>
```

## Examples

```text
feature/customer-import-add-csv-upload
issue/554-add-login-rate-limit
issue/598-fix-onboarding-empty-state
fix/612-handle-null-clinic-phone
chore/update-pr-validation-copy
docs/add-founder-testing-guide
spike/evaluate-webhook-retry-queue
```

## Regras

- Use `feature/...` quando a Feature existe apenas no workspace local LeanOS.
- Use `issue/...` quando a Feature está mapeada para uma issue real do GitHub.
- Use `fix/...` para correção de bug vinculada a uma issue real.
- Use `chore/...` para manutenção interna sem mudança de produto.
- Use `docs/...` para mudanças de documentação.
- Use `spike/...` para investigação técnica aprovada e explicitamente limitada.
- Sempre inclua o número real da issue ao usar `issue/...` ou `fix/...`.
- Use um slug curto em kebab-case.
- Não inclua segredos, nomes de clientes ou detalhes sensíveis.
- Não implemente trabalho de Feature na branch padrão.
- Se a branch já existir, peça confirmação antes de continuar.
