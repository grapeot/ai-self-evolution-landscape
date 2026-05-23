#!/bin/bash
set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENV="$PROJECT_ROOT/../../.venv"
source "$VENV/bin/activate"
cd "$PROJECT_ROOT"
python -m uvicorn src.main:app --host 0.0.0.0 --port 8000
