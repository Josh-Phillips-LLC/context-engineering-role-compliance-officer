# Future TODOs — Compliance Officer (WIP)

Purpose: capture lightweight, actionable follow-ups from the PR #109 compliance review and related governance gaps for later triage.

1) CI: Protected-path gating workflow

2) PR template & metadata hygiene

3) Automated labeling

4) Compliance Officer review checklist update

5) Post-merge telemetry and auditability

6) Owner & prioritization

7) Follow-up PR to draft now (optional)

- Preventive control: add a lightweight PR-check CI

	- Description: a minimal `pull_request` GH Action that scans changed files and fails the run when any of the protected paths are modified unless the PR body contains the exact metadata key `Executive-Sponsor-Approval: Provided`.
	- Protected paths to check: `00-os/**`, `governance.md`, `context-flow.md`.
	- Minimal behavior: on `pull_request` run `git diff --name-only ${{ github.event.before }} ${{ github.sha }}` and if any protected path is found and `Executive-Sponsor-Approval:` is not present in the PR body, exit non-zero with a clear failure message explaining how to provide approval.
	- Deliverables: small GH Action script + example `workflow` file + README snippet showing required PR metadata format.
	- Rationale: prevents accidental merges of protected files and enforces Executive Sponsor gating as required by `governance.md`.
Notes
- Protected-paths (examples): `00-os/`, `governance.md`, `00-os/role-charters/`, `.github/` workflow files that alter policy
---
Last updated: 2026-02-13
