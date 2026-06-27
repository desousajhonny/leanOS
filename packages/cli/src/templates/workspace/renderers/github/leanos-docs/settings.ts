export function githubSettingsExampleJson(): string {
  return `{
  "github": {
    "status": "not_configured",
    "token_source": "env:LEANOS_GITHUB_TOKEN",
    "owner": "example-org",
    "repository": "example-repo",
    "project": {
      "type": "organization",
      "number": 12,
      "url": "https://github.com/orgs/example-org/projects/12"
    },
    "fields": {
      "status": "Status",
      "priority": "Priority",
      "size": "Size",
      "area": "Area",
      "roadmap_item": "Roadmap Item",
      "epic": "Epic"
    }
  },
  "security": {
    "store_token_in_workspace": false,
    "allowed_token_sources": [
      "env:GITHUB_TOKEN",
      "env:LEANOS_GITHUB_TOKEN",
      "env:GH_TOKEN",
      "github_cli_auth",
      "secure_prompt",
      "system_keychain"
    ]
  }
}
`;
}
