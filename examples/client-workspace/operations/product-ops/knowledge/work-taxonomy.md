# Work Taxonomy

## Purpose

Define the LeanOS product work hierarchy so agents, founders and future GitHub sync flows use the same language.

This file is a framework rule for Product Ops. Use it before creating epics, features, tasks or GitHub tracking items.

## Core Hierarchy

~~~text
Backlog
  -> Roadmap
    -> Delivery Scope
      -> Epic
        -> Feature
          -> Task
            -> Implementation / PR
~~~

## Backlog

Backlog is the organized parking lot for ideas, opportunities, improvements and problems that may become roadmap later.

It answers:

- What might be worth considering later?
- What is not committed yet?
- What needs more evidence or prioritization?

Backlog items do not automatically become delivery work.

## Roadmap

Roadmap is the product direction and sequencing plan.

It answers:

- What are we likely to build?
- Why does it matter?
- When or in which horizon should it happen?
- Which milestone, cycle or release might own it?

Roadmap is not a task list and not everything in roadmap needs GitHub tracking.

## Delivery Scope

Delivery Scope is the confirmed slice of roadmap that becomes real delivery work.

It answers:

- What are we actually preparing to build now?
- Is this MVP, Release, Experiment, Beta or Internal work?
- What is the milestone?
- What is the release goal?
- What is explicitly out of scope?

Delivery Scope must exist before an Epic is created.

## Epic

Epic is a large delivery initiative inside a confirmed Delivery Scope.

It answers:

- What outcome should this delivery block achieve?
- Which user or business capability does it unlock?
- Which features belong inside it?
- What is out of scope?

Epic is not usually small enough to implement directly.

Epic is decided by Product Ops, with Roadmap/Strategy confirming fit and timing. Engineering, Design, Security and DevOps participate only when their criteria are applicable.

Start Epic analysis from:

- confirmed Delivery Scope;
- roadmap item and milestone;
- PRD or MVP scope when relevant;
- user/business outcome;
- scope and non-goals;
- expected feature groups;
- risk and dependency map.

Epic-level DRM decides who must participate before features are created. It does not replace feature-level DRM.

Local Epic structure:

~~~text
operations/product-ops/epics/<epic-slug>/
  README.md
  <feature-slug>.md
~~~

The Epic README owns the epic context. Files inside the Epic folder are Features that belong to that Epic.

## Feature

Feature is a concrete product capability inside an Epic.

It answers:

- What can the user or system do after this is implemented?
- What acceptance criteria prove it works?
- Which Design, Security, DevOps or Engineering criteria apply?
- Which tasks are needed to implement it?

Feature is the main unit that should pass the Delivery Readiness Matrix before implementation.

Feature-level DRM turns the Epic decision into concrete Product Ops, Engineering and conditional Design, Security and DevOps criteria.

## Task

Task is a concrete implementation or operational checklist item inside a Feature.

It answers:

- What specific work needs to be done?
- What can be checked off during implementation?

Tasks should normally live inside the Feature file as a checklist.

Example task names:

~~~text
Create database model
Create form
Add validation
Add tests
~~~

Create separate Task issues only when there is a clear operational reason.

## Naming Convention

Use stable, searchable titles:

- Epic title: [EPIC] Customer Management
- Feature title: [FEATURE: Customer Management] Create customer profile

Use stable keys in metadata or body when needed:

~~~yaml
epic_key: customer-management
feature_key: create-customer-profile
~~~

Avoid manual ordering names like [EPIC A] because they break when priority changes.

## Lifecycle Status

Use these values for product work status. Do not use GitHub sync as product status.

| Status | Meaning | Decided By |
| --- | --- | --- |
| idea | Raw idea, note or opportunity. Not qualified yet. | Strategy / Product |
| candidate | Worth tracking, but not committed to delivery. | Strategy Roadmap |
| scoped | Delivery boundaries, milestone and non-goals are confirmed. | Product Ops |
| ready | Ready for the next step because required criteria are satisfied or explicitly not applicable. | Product Ops with required reviewers |
| in-progress | Actively being implemented, reviewed or delivered. | Owning execution area |
| blocked | Cannot move forward until a named blocker is resolved. | Owning area, with blocker owner |
| done | Delivered, descoped with explanation or closed with result recorded. | Owning area with Product Ops review |

## Sync Status

Use these values only for remote tracking such as GitHub.

| Sync Status | Meaning |
| --- | --- |
| not_synced | Exists locally only. |
| sync_ready | Local item is ready to be proposed for remote sync. |
| synced | Remote GitHub item exists and matches local state enough to continue. |
| conflict | Local and remote state disagree and need founder confirmation before overwrite. |

Product status and sync status are separate.

Example:

~~~yaml
status: ready
sync_status: not_synced
~~~

## Local Vs GitHub

LeanOS local files are the primary operational source.

GitHub is an optional tracking and sync layer.

Mapping:

- Local Epic -> GitHub issue with label epic
- Local Feature -> GitHub issue with label feature
- Feature Tasks -> checklist inside the Feature issue by default

If local and GitHub disagree, the model must explain the conflict and ask before overwriting either side.

## Ownership

- Backlog and Roadmap: Strategy Roadmap.
- Delivery Scope: Product Ops.
- Epic: Product Ops.
- Feature: Product Ops with Engineering, and Design/Security/DevOps when applicable.
- Task: Engineering or the area responsible for execution.

## Transition Ownership

| Transition | Owner | Required Confirmation |
| --- | --- | --- |
| idea -> candidate | Strategy / Product | founder confirms it is worth tracking |
| candidate -> scoped | Product Ops | founder confirms delivery scope, milestone and release goal |
| scoped -> ready | Product Ops + required reviewers | Product Ops and Engineering are ready; Design/Security/DevOps are ready or not applicable |
| ready -> in-progress | Engineering or execution area | implementation owner confirms branch/plan |
| in-progress -> blocked | Owning execution area | blocker and blocker owner are named |
| in-progress -> done | Owning execution area + Product Ops | result and acceptance criteria are recorded |
| not_synced -> synced | DevOps or GitHub capability | founder confirms remote write |

## Readiness Rule

A Feature can exist before it is ready to develop.

A Feature can enter implementation only after it passes `ready-to-develop.md`.

## Do Not Do

- Do not treat roadmap items as implementation work.
- Do not skip Delivery Scope before creating an Epic.
- Do not send vague Epics directly to Engineering.
- Do not create GitHub issues before the founder confirms sync.
- Do not make Tasks top-level planning objects unless they need separate tracking.
