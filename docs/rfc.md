# RFC: Architecture & Design

## 三层金字塔

网站按三层组织：底层是原文图书馆（消除语言障碍），中层是直觉地图（降低认知负担），顶层是思维辅助（帮助形成判断）。三层独立可扩展，分别对应不同的读者需求和构建流程。

## 流程层与展示层

流程层（`skills/field_map_bootstrap.md`）和展示层（`frontend/`）解耦。Seed → 原文翻译 → 追踪引用 → 深度调研 → 分析合成 → FieldMap 数据 → 静态站点。

## Tech stack

- Frontend: React + Vite + TypeScript
- Styling: Plain CSS with custom properties
- Data: TypeScript object literal（类型安全、零解析开销）
- Translation: DeepSeek V4 Flash API batch parallel
- Deployment: GitHub Pages, `base: '/ai-self-evolution-landscape/'`

## 为什么不是 X

- Not Tailwind: 设计决策在 CSS custom properties 里显式可见
- Not a CMS: 数据量小、一人编辑、git 版本控制
- Translation not manual: 25 篇文章人工翻译不现实

## 关键设计决策

- `translatedUrl` 为可选字段，有则优先中文链接，附原文链接
- fact/opinion 标注规则：包含因果推断、价值判断、预测的陈述均为 opinion
- Region 分类轴为"机制"（自对弈/进化搜索 vs 自修改架构 vs Agentic 自研究）而非混用多条轴
- Tension 为 source-backed 争论，非 agent 自造

## Visual architecture

- 单栏 720px，暖白底色，深棕标题，琥珀强调
- Intuition 标注 fact/opinion badge
- Article links 优先中文（translatedUrl），附"原文"链接
