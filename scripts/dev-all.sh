#!/usr/bin/env sh
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

BACKEND_PID=""
FRONTEND_PID=""

cleanup() {
  if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
    kill "$FRONTEND_PID" 2>/dev/null || true
  fi
  if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    echo "\n==> Menghentikan Go Backend (PID: $BACKEND_PID)..."
    pkill -P "$BACKEND_PID" 2>/dev/null || true
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if /usr/sbin/lsof -iTCP:8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "==> [Backend] Go API sudah aktif di http://localhost:8080"
else
  echo "==> [Backend] Menjalankan Go API Server di http://localhost:8080 ..."
  (
    cd "$BACKEND_DIR" && /usr/local/bin/go run ./cmd/api
  ) &
  BACKEND_PID=$!
fi

echo "==> [Frontend] Menjalankan Next.js Dev Server di http://localhost:3000 ..."
cd "$FRONTEND_DIR"
./node_modules/.bin/next dev &
FRONTEND_PID=$!

wait "$FRONTEND_PID"
