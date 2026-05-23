# RFC: Architecture & Design

## 两层架构

流程层（skill）和展示层（website）解耦。换一个领域只需替换 data 文件，组件不变。

```
field_map_bootstrap skill (rules/skills/)
  seed → research → synthesis → FieldMap data
       │
       ▼
FieldMap data (frontend/src/data/)
       │
       ▼
React + Vite static site (frontend/)
```

## Tech stack

- Frontend: React + Vite + TypeScript — component-based, static output
- Backend: FastAPI — serves built frontend in production; dev 时 Vite dev server 独立运行
- Styling: Plain CSS with custom properties — 设计意图在 CSS 里可见
- Data: TypeScript object literal — 类型安全、零解析开销
- Deployment: GitHub Pages 或任意 static host

## 为什么不是 X

- Not plain HTML: 需要组件复用和类型检查
- Not Tailwind: 设计决策在 CSS 里比 utility class soup 更可维护
- Not Next.js: 无 SSR、无路由、无 API
- Not a CMS: 数据量小、一人编辑、git 版本控制

## FieldMap 数据模型

```typescript
interface FieldMap {
  field: string;
  overview: string;
  lastUpdated: string;
  regions: Region[];
  tensions: Tension[];
  readingPath: ReadingPath;
}

interface Region {
  id: string;
  title: string;
  thesis: string;
  intuitions: Intuition[];
  pros: string[];
  cons: string[];
  articles: ArticleRef[];
}

interface Intuition {
  text: string;
  type: 'fact' | 'opinion';
  sources: number[];
}

interface ArticleRef {
  title: string;
  url: string;
  relevance: string;
  tier: 'primary' | 'supporting' | 'counterpoint';
}

interface Tension {
  question: string;
  positions: { side: string; argument: string }[];
  status: 'active' | 'emerging' | 'resolved';
}

interface ReadingPath {
  ifYouHave5Min: string[];
  ifYouHave30Min: string[];
}
```

## Visual architecture

- Layout: single column, max-width ~720px, centered
- Navigation: sticky top bar, region anchors + tensions + reading path
- Regions: visually distinct blocks, thesis as section header
- Intuitions: listed with fact/opinion badge, compact source annotation
- Articles: compact reference cards within each region
- Tensions: debate format with positions side by side
- Typography: system font stack, CJK-friendly line height
- Color: neutral warm-gray base, one accent; no dark mode default
- Mobile: single column stacks naturally

## Extensibility

Adding a new field: replace `frontend/src/data/fieldMap.ts`, rebuild. Adding features (timeline, relationship graph): extend components, data model stays stable.
