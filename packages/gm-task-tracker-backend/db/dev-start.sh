#!/usr/bin/env bash
PROJ_DIR="$(cd "$( dirname "${BASH_SOURCE[0]}" )/../../.." >/dev/null 2>&1 && pwd)"

docker compose -f "${PROJ_DIR}/packages/gm-task-tracker-backend/db/docker-compose.db.yml" -p gm-task-tracker up -d
