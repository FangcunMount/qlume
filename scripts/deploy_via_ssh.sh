#!/usr/bin/env bash

set -Eeuo pipefail

: "${SVRB_HOST:?SVRB_HOST is required}"
: "${SVRB_USERNAME:?SVRB_USERNAME is required}"
: "${SVRB_SSH_KEY_FILE:?SVRB_SSH_KEY_FILE is required}"

SVRB_SSH_PORT="${SVRB_SSH_PORT:-22}"
DEPLOY_PATH_SERVERB="${DEPLOY_PATH_SERVERB:-/data/www/www.fangcunmount.cn}"
DEPLOY_SOURCE_DIR="${DEPLOY_SOURCE_DIR:-dist}"
SVRB_SSH_KEY_FILE="${SVRB_SSH_KEY_FILE/#\~/$HOME}"

if [[ ! -d "${DEPLOY_SOURCE_DIR}" ]]; then
  echo "deploy source directory not found: ${DEPLOY_SOURCE_DIR}" >&2
  echo "current working directory: $(pwd)" >&2
  echo "available files:" >&2
  ls -la >&2
  exit 1
fi

SSH_OPTIONS=(
  -i "$SVRB_SSH_KEY_FILE"
  -p "$SVRB_SSH_PORT"
  -o BatchMode=yes
  -o StrictHostKeyChecking=no
  -o UserKnownHostsFile=/dev/null
)

printf -v RSYNC_RSH '%q ' ssh "${SSH_OPTIONS[@]}"
RSYNC_RSH="${RSYNC_RSH% }"
REMOTE_TARGET="${SVRB_USERNAME}@${SVRB_HOST}"

echo "Deploying ${DEPLOY_SOURCE_DIR}/ to ${REMOTE_TARGET}:${DEPLOY_PATH_SERVERB}"

ssh "${SSH_OPTIONS[@]}" "${REMOTE_TARGET}" "mkdir -p '${DEPLOY_PATH_SERVERB}'"

rsync \
  -az \
  --delete \
  --delay-updates \
  --chmod=D755,F644 \
  -e "${RSYNC_RSH}" \
  "${DEPLOY_SOURCE_DIR%/}/" "${REMOTE_TARGET}:${DEPLOY_PATH_SERVERB}/"

if [[ -n "${SVRB_POST_DEPLOY_COMMAND:-}" ]]; then
  echo "Running post-deploy command on ${REMOTE_TARGET}"
  ssh "${SSH_OPTIONS[@]}" "${REMOTE_TARGET}" "${SVRB_POST_DEPLOY_COMMAND}"
fi
