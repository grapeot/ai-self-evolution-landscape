# AI 自进化 · 领域直觉地图

给定一个陌生领域的方向描述或阅读清单，用 AI 深度调研 + 分析合成，产出一个单页 website——不是阅读清单，是这个领域的**直觉地图**：快速理解核心流派、关键直觉和它们之间的矛盾。

👉 **[查看网站](https://grapeot.github.io/ai-self-evolution-landscape/)**

## 这是什么

**前台**（这个 GitHub Pages）：渲染后的领域直觉地图，面向想快速理解 AI 自进化领域的读者。

**后台**（这个 repo）：AI 辅助生成 field map 的完整 pipeline。核心流程在 `skills/field_map_bootstrap.md`：seed 输入 → 深度调研 → 分析合成 → FieldMap 数据 → 构建静态站点。

## 怎么用

### 看现有的领域地图

直接访问 [GitHub Pages](https://grapeot.github.io/ai-self-evolution-landscape/)。30 秒扫描建立 mental model，5 分钟读完核心直觉，30 分钟覆盖全领域。

### 为新领域构建地图

1. 准备 seed：方向描述、reading list、paper list 或 URL 列表
2. 按 `skills/field_map_bootstrap.md` 执行 pipeline
3. 产出新的 `frontend/src/data/fieldMap.ts`
4. Push → GitHub Actions 自动构建并部署到 gh-pages

## 依赖

本项目的调研和分析流程依赖 [Context Infrastructure](https://github.com/grapeot/context-infrastructure)（Tavily 搜索、语义搜索、深度调研工作流等基础设施）。

## 项目结构

```
├── README.md
├── AGENTS.md
├── docs/              # PRD、RFC、working log、test strategy
├── skills/            # 核心 skill：field_map_bootstrap.md
├── frontend/          # React + Vite + TypeScript 静态站点
│   └── src/data/      # FieldMap 数据（编辑入口）
├── src/               # Python 后端（FastAPI serve 静态文件）
├── scripts/           # 构建和启动脚本
├── .github/workflows/ # CI/CD：push → build → deploy gh-pages
└── tests/
```

## 本地开发

```bash
cd frontend
npm install
npm run dev        # 开发模式，热更新
npm run build      # 生产构建，输出到 dist/
```
