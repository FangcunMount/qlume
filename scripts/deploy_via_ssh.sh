#!/usr/bin/env bash

set -euo pipefail

: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_USER:?DEPLOY_USER is required}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required}"
: "${DEPLOY_SSH_KEY_FILE:?DEPLOY_SSH_KEY_FILE is required}"

DEPLOY_PORT="${DEPLOY_PORT:-22}"

if [[ ! -d "dist" ]]; then
  echo "dist directory not found. Run the build first." >&2
  exit 1
fi

SSH_OPTIONS=(
  -i "$DEPLOY_SSH_KEY_FILE"
  -p "$DEPLOY_PORT"
  -o StrictHostKeyChecking=yes
)

rsync -az --delete -e "ssh ${SSH_OPTIONS[*]}" dist/ "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"

if [[ -n "${DEPLOY_POST_COMMAND:-}" ]]; then
  ssh "${SSH_OPTIONS[@]}" "${DEPLOY_USER}@${DEPLOY_HOST}" "$DEPLOY_POST_COMMAND"
fi
