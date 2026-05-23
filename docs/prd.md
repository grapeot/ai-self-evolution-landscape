# PRD: Field Map — 陌生领域快速建立直觉的网站

## 金字塔架构

网站按三层金字塔组织，从底层到顶层分别是"数据"→"理解"→"思考"：

```
        ┌──────────────┐
        │  思维辅助     │  ← 框架、比喻、对比分析
        │  (Thinking)   │     帮助读者形成自己的判断
        ├──────────────┤
        │  直觉地图     │  ← Field Map：Region / Intuition / Tension
        │  (Intuition)  │     低认知负担，30 秒建立 mental model
        ├──────────────┤
        │  原文图书馆   │  ← 所有原始文章的中文翻译
        │  (Library)    │     easy access，不用自己翻英文
        └──────────────┘
```

**底层 — 原文图书馆**：给定一个领域的 seed（阅读清单 / paper list / URL 列表），将所有原始文章翻译成中文，部署为可直接访问的 HTML 页面。每篇翻译保留"原文链接"。不只翻译 seed 中的文章——追踪每篇文章的引用，对关键一手资料（papers、first-hand data）也做翻译。这层的目标是消除语言障碍，让读者不需要自己去搜、去翻英文。

**中层 — 直觉地图**：在原文图书馆的基础上，通过深度调研和分析合成，将领域知识结构化为单页 field map。按 Region（子方向/流派）组织，每个 Region 包含 thesis、Intuition（1-2 句直觉，标注 fact/opinion）、Pros/Cons、参考文章。另有跨 Region 的 Tension（争论）和 Reading Path。这层的目标是低认知负担——30 秒扫描建立 mental model，5 分钟理解全貌。

**顶层 — 思维辅助**：在中层直觉的基础上，提供框架、比喻、对比分析等思维工具。例如：将晦涩的学术概念用生动的类比呈现、将技术路线差异总结为可复用的判断框架、标注不同流派的前提假设和适用范围。这层的目标是帮助读者形成自己的判断——不是给结论，而是给依据。

读者是 AI 行业从业者，有通用认知但不是该领域专家。他们需要的是：不用翻英文 → 不用自己读论文 → 领域脉络和直觉 → 形成自己的判断。

## 成功标准

1. 打开页面 30 秒内能说出领域的主题结构（有几个流派/方向、它们在争论什么）
2. 每个 idea 旁边有一颗一句话直觉，不读原文就知道它的大意
3. 点击任意 source 默认进中文翻译，附带原文链接
4. 能区分哪些是已有共识、哪些是活跃争论、哪些是刚浮现的方向
5. 每个直觉可以追溯到至少一个 source；fact 和 opinion 有明确区分
6. 有跨领域的框架/比喻帮助读者建立 mental model
7. 加一条新直觉 = 编辑一个 TypeScript 数据文件，重新 build 即可

## 不是

- 不是 reading list display（不按文章维度组织，按 idea 维度组织）
- 不是 blog、不是 newsletter
- 不是知识库、不是 wiki
- 不需要协作、评论、收藏

## 构建流程

1. 用户提供 seed（方向描述、reading list、URL 列表等）
2. **原文图书馆**：DeepSeek V4 Flash 翻译所有 seed 文章 + 追踪引用翻译一手资料
3. 深度调研：按 `workflow_deep_research_survey.md` 的 Phase 1-3 执行
4. 分析合成：按 `workflow_analytical_writing.md` 的 Phase A-D 执行
5. Field Map 提取：将调研和分析结果结构化为 FieldMap 数据模型
6. Build：React 项目从 FieldMap 数据生成静态站点

流程本身封装为一个 skill：`skills/field_map_bootstrap.md`
