export function prValidationWorkflow(): string {
  return `name: LeanOS PR Validation

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  static-validation:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: LeanOS placeholder validation
        run: echo "LeanOS PR validation rules are documented in .github/leanos/pr-validation-rules.md"
`;
}
