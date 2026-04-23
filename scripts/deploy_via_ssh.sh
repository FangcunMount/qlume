#!/usr/bin/env bash

set -Eeuo pipefail

: "${SVRB_HOST:?SVRB_HOST is required}"
: "${SVRB_USERNAME:?SVRB_USERNAME is required}"
: "${SVRB_SSH_KEY_FILE:?SVRB_SSH_KEY_FILE is required}"

SVRB_SSH_PORT="${SVRB_SSH_PORT:-22}"
DEPLOY_PATH_SERVERB="${DEPLOY_PATH_SERVERB:-/data/www/www.fangcunmount.cn}"

if [[ ! -d "dist" ]]; then
  echo "dist directory not found. Run the build first." >&2
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

echo "Deploying dist/ to ${REMOTE_TARGET}:${DEPLOY_PATH_SERVERB}"

ssh "${SSH_OPTIONS[@]}" "${REMOTE_TARGET}" "mkdir -p '${DEPLOY_PATH_SERVERB}'"

rsync \
  -az \
  --delete \
  --delay-updates \
  --chmod=D755,F644 \
  -e "${RSYNC_RSH}" \
  dist/ "${REMOTE_TARGET}:${DEPLOY_PATH_SERVERB}/"

if [[ -n "${SVRB_POST_DEPLOY_COMMAND:-}" ]]; then
  echo "Running post-deploy command on ${REMOTE_TARGET}"
  ssh "${SSH_OPTIONS[@]}" "${REMOTE_TARGET}" "${SVRB_POST_DEPLOY_COMMAND}"
fi
