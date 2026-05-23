import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="AI Self-Evolution Landscape")

dist_dir = Path(__file__).parent.parent / "frontend" / "dist"
if dist_dir.exists():
    app.mount("/", StaticFiles(directory=str(dist_dir), html=True), name="static")
else:
    @app.get("/")
    async def not_built():
        return {"message": "Frontend not built. Run scripts/build_frontend.sh first."}
