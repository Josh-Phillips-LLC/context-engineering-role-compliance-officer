# context-engineering-role-compliance-officer

Role-specific agent workspace for **Compliance Officer**.

This repository is generated from templates and role definitions in `context-engineering-implementation`.

## Purpose

- Provide a role-scoped default repo for IDE agents and role-based workstation containers.
- Keep role instructions self-contained for tools that read repo-root instruction files.

## Managed Files

These files are generated artifacts and should not be manually edited:

- `AGENTS.md`
- `.github/copilot-instructions.md`
- `.vscode/settings.json`
- `scripts/bootstrap-governance-labels.sh`
- `scripts/gh-safe-comment.sh`
- `scripts/request-pr-review.sh`
- `scripts/validate-pr-metadata.py`
- `handbook/README.md`
- `handbook/sops/README.md`
- `handbook/runbooks/README.md`
- `handbook/runbooks/general-governance-label-bootstrap.md`
- `handbook/runbooks/general-github-commenting.md`
- `handbook/runbooks/general-reviewer-request-preflight.md`
- `handbook/templates/README.md`
- `handbook/references/README.md`

Some roles include additional managed role-specific files generated from templates.

Instruction model:

- `AGENTS.md` is the canonical compiled role instruction set.
- `.github/copilot-instructions.md` is an adapter that points to `AGENTS.md`.

## Agent Handbook

The `handbook/` folder contains role-specific SOPs, runbooks, templates, and references required for daily work.
Agents should be able to operate using only this repo plus the handbook contents.

## Source of Truth

Canonical role definitions live in `context-engineering-implementation`:

- `10-templates/job-description-spec/global.json`
- `10-templates/job-description-spec/roles/compliance-officer.json`
- `10-templates/agent-instructions/base.md`
- `10-templates/agent-instructions/roles/compliance-officer.md`
- `00-os/role-charters/compliance-officer.md`

Governance policy authority is `context-engineering-governance/governance.md` and is consumed by implementation via `contracts/upstream/governance.md`.

For `compliance-officer`, generated instructions also embed:

- `10-templates/compliance-officer-pr-review-brief.md`

## Regeneration

Regenerate this repository from `context-engineering-implementation` using:

```bash
10-templates/repo-starters/role-repo-template/scripts/render-role-repo-template.sh \
  --role-slug compliance-officer \
  --repo-name context-engineering-role-compliance-officer \
  --output-dir <path-to-role-repo>
```

## Generation Metadata

- Source ref: `50d1d9b`
- Generated at (UTC): `2026-02-27T10:42:41Z`
