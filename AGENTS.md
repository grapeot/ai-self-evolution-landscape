# AGENTS.md — AI Self-Evolution Landscape

## What this is

A single-page field map of the AI recursive self-improvement landscape. Reads like a curated map of a research area — themes as regions, articles as points of interest with one-line insights.

## Project structure

```
├── AGENTS.md
├── .gitignore
├── docs/
│   ├── prd.md
│   ├── rfc.md
│   ├── working.md
│   └── test.md
├── frontend/          # React + Vite + TypeScript
│   └── src/
│       ├── data/      # Article data (editing target)
│       ├── components/
│       └── App.tsx
├── src/               # Python backend (FastAPI serves built frontend)
├── scripts/
│   ├── start_frontend.sh
│   ├── build_frontend.sh
│   └── start_backend.sh
└── tests/
```

## Environment

- **Frontend**: Node.js, `cd frontend && npm install && npm run dev`
- **Backend**: Python, workspace `.venv` at repo root (`/Users/grapeot/co/knowledge_working/.venv`)

## Rules for agents

1. **Update `docs/working.md`** after every session — date heading + bullets
2. **Commit frequently** — one commit per logical change
3. **Data edits go in `frontend/src/data/fieldMap.ts`** — structured TypeScript, not MD
4. **No backend complexity creep** — the FastAPI server only serves static files; no DB, no auth, no API routes beyond that
5. **Design constraint**: single page, skimmable, progressive disclosure — don't add pages, tabs, or complex navigation
