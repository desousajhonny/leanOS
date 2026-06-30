import type { WorkspaceAnswers } from "../../types.js";
import { createWorkspacePaths } from "../../paths.js";

export function envLocal(): string {
  return `# LeanOS local environment
# Local apenas. Não faça commit.
# Used by future LeanOS GitHub capabilities after Epics/Features sync readiness.

LEANOS_GITHUB_TOKEN=
GITHUB_TOKEN=
`;
}

export function projectSyncYaml(answers: WorkspaceAnswers): string {
  const githubRemote = parseGithubRemote(answers.detectedProject?.gitRemoteOrigin);
  const paths = createWorkspacePaths(answers);
  const productOpsRoot = `${paths.businessOsRoot}/operations/product-ops`;
  const owner = githubRemote?.owner ?? "TODO";
  const repository = githubRemote?.repository ?? "TODO";

  return `github:
  status: ${answers.prepareGithubManagement ? "pending_user_token" : "not_configured"}
  token_source: env:LEANOS_GITHUB_TOKEN
  owner: ${owner}
  repository: ${repository}
  project:
    type: organization
    number: TODO
    url: TODO
  fields:
    status: Status
    priority: Priority
    size: Size
    effort: Effort
    area: Area
    roadmap_item: Roadmap Item
    epic: Epic
  project_sync:
    status: ${answers.prepareGithubManagement ? "pending_configuration" : "not_requested"}
    enabled: false
    source:
      epics: ../../${productOpsRoot}/epics/
      work_mapping: ../../.github/leanos/work-mapping.md
  work_mapping:
    epic:
      local_source: ${productOpsRoot}/epics/<epic-slug>/epic.md
      legacy_local_source: ${productOpsRoot}/epics/<epic-slug>/README.md
      github_target: issue
      required_labels: [leanos, epic]
      title_format: "[EPIC] <epic title>"
    feature:
      local_source: ${productOpsRoot}/epics/<epic-slug>/<feature-slug>.md
      github_target: issue
      required_labels: [leanos, feature]
      title_format: "[FEATURE: <epic title>] <feature title>"
    task:
      local_source: feature_file_checklist
      github_target: feature_issue_checklist
      separate_issue_default: false
  body:
    body_renderer: rich_markdown
    preserve_local_sections: true
    forbid_summary_only_body: true
    required_epic_sections: [Local Source, Metadados, Outcome, Escopo, Nao Objetivos, Success Metrics, Feature Breakdown]
    required_feature_sections: [Local Source, Metadados, Epic Pai, Proposito, Escopo, Criterios de Aceite, Tasks, Delivery Readiness Matrix]
  metadata:
    require_milestone: true
    required_project_fields: [Status, Priority, Size, Effort, Area, Roadmap Item, Epic]
  relationships:
    epic_lists_features: true
    feature_points_to_parent_epic: true
    project_epic_field_required: true
    native_parent_child_preferred: true
  remote_verification:
    required_after_write: true
    verify_body_sections: true
    verify_milestone: true
    verify_project_fields: [Status, Priority, Size, Effort, Area, Roadmap Item, Epic]
    verify_relationships: true
  local_patch:
    update_source_files_after_verified_remote: true
    set_sync_status: synced
    set_github_issue_url: true
    update_sync_state: true
  rules:
    never_store_token: true
    dry_run_before_remote_write: true
    require_confirmation_before_api_write: true
    no_duplicate_epics_without_review: true
`;
}

export function parseGithubRemote(remote?: string): { owner: string; repository: string } | undefined {
  if (!remote) {
    return undefined;
  }

  const normalized = remote.replace(/\.git$/, "");
  const httpsMatch = normalized.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
  const sshMatch = normalized.match(/^git@github\.com:([^/]+)\/([^/]+)$/);
  const sshUrlMatch = normalized.match(/^ssh:\/\/git@github\.com\/([^/]+)\/([^/]+)$/);
  const match = httpsMatch ?? sshMatch ?? sshUrlMatch;

  if (!match) {
    return undefined;
  }

  return {
    owner: match[1],
    repository: match[2]
  };
}

export function syncStateYaml(): string {
  return `github_sync_state:
  status: not_configured
  last_checked_at: null
  last_synced_at: null
  repository: null
  project_number: null
  milestones: {}
  epics: {}
  features: {}
  task_issues: {}
  notes:
    - This file may store GitHub IDs, issue numbers and sync metadata.
    - This file must never store tokens, secrets or personal credentials.
    - Local LeanOS files remain the operational source unless the founder confirms a remote overwrite.
`;
}
