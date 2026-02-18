#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ ! -d "WIP" ]]; then
  echo "No WIP directory found; nothing to clean."
  exit 0
fi

shopt -s nullglob
matches=(
  WIP/pr*_review*.md
  WIP/pr*_rereview*.md
  WIP/pr*_final_rereview*.md
)
shopt -u nullglob

if [[ ${#matches[@]} -eq 0 ]]; then
  echo "No matching WIP review artifacts found."
  exit 0
fi

if [[ "${1:-}" == "--apply" ]]; then
  rm -f -- "${matches[@]}"
  echo "Removed ${#matches[@]} WIP review artifact file(s)."
else
  echo "Dry run (no files deleted)."
  printf '  %s\n' "${matches[@]}"
  echo ""
  echo "Run with --apply to delete these files."
fi
