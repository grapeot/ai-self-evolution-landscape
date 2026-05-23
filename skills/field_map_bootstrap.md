# Field Map Bootstrap — 陌生领域快速建立直觉

## 元数据

- **类型**: Workflow
- **适用场景**: 给定一个陌生领域的 seed（方向描述、paper list、URL 列表、reading list），产出结构化的领域直觉地图
- **输出位置**: `adhoc_jobs/ai_self_evolution_reading/frontend/src/data/fieldMap.ts`（当前唯一 field map 实例；多领域时各自建独立 data 文件）
- **创建日期**: 2026-05-22
- **依赖**: `workflow_deep_research_survey.md`（调研）、`workflow_analytical_writing.md`（分析合成）、Tavily

## 目标

给定一个陌生领域的 seed，产出一个结构化的 field map：这个领域在讨论什么、有哪些流派、核心直觉是什么、它们之间的矛盾在哪里。产出同时用于两个用途：驱动单页 website 的渲染，以及作为后续深入研究的起点。

不是做文献综述。文献综述按论文组织，field map 按 idea 组织。一篇论文里的多个 idea 会被拆到不同 Region 里；跨论文反复出现的同一个直觉会被合并成一个 Intuition。

## 边界

- 不做：完整文献综述、meta-analysis、自己的实验
- 不做：生产可以直接发布的分析文章（那是 analytical writing skill 的事）
- 不做的判断标准：如果一个判断需要大量领域知识才能做出（例如"这个方向三年内不会有突破"），标注为 opinion 并 trace 到 source，不做独立判断
- 可以做的判断：区分 fact 和 opinion、识别 contradictions、发现反复出现的 theme

## 验收标准

以下标准由 agent 在完成 field map 后自行检查。不需要外部评审。

### 结构完整

1. Region 数量在 3-8 之间。少于 3 说明没找到足够的结构；多于 8 说明切分过细、失去概要价值。
2. 每个 Region 的 thesis 可以用一句话说清这个方向在干什么。
3. seed 中的每条关键信息都可以定位到至少一个 Region（不要求一一对应，但要求无重大遗漏）。

### 直觉密度

4. 每个 Region 有 3-10 个 Intuition。每条 Intuition 包含一个具体的、可被质疑的 claim，不是一个笼统的方向描述。
5. 自测：逐条 Intuition 问"它的反面是什么？"如果答不出，说明太模糊，需要重写。
6. 不同 Region 的 Intuition 之间不重复（同一 idea 不应该出现在两个 Region 里，除非它确实是两个方向的共同基础）。

### 矛盾检测

7. 至少有一个 cross-region Tension 被显式记录。如果所有 Region 都观点一致，要么领域太浅（不太可能），要么调研忽略了反对声音。
8. 每个 Tension 的 positions 都有具体的 source 支撑，不能是 agent 自己对 debate 的想象。

### 事实与观点的区分

9. 每个 Intuition 标注了 `fact` 或 `opinion`。Fact = 有可公开验证的 source 支持的陈述（例如"AlphaZero 在 4 小时自我对弈后超越了 Stockfish"）。Opinion = 包含价值判断或因果推断的陈述（例如"自我对弈是自进化最有希望的方向"）。
10. Opinion 必须 trace 到具体的 source（哪个人/哪个组织在什么 context 下说了这个），不能是 agent 自己做出的判断。

### 来源可追溯

11. 每个 Intuition 的 sources 数组非空。关键 claim（region thesis、tension position）的 source 标注 tier（primary / supporting / counterpoint）。
12. 没有 source 的 Intuition 只在一种情况下允许：它是跨多个 source 归纳出的 pattern（例如"三篇独立文章都提到了 X 但角度不同"），此时标注 type: 'opinion' 并在 text 中写明它是归纳。

### 世界观连贯性

13. 读完整个 field map 后能回答：这个领域的核心驱动力是什么？主要的分歧线在哪里？未来一两年最可能变化的是什么？
14. 如果不能回答其中一个，说明缺乏跨 Region 的整合 — 检查是否漏了 Tension 或 overview 需要加强。

### 自我可评估性

15. Agent 可以在没有外部反馈的情况下逐条检查以上标准。如果某个标准无法自查（例如"直觉密度"过于主观），说明标准需要进一步具体化。

## 可用资源

- **调研工具**: Tavily（web search, `max_results=6-10`, `search_depth="advanced"`）、webfetch（读具体 URL）
- **调研工作流**: `rules/skills/workflow_deep_research_survey.md` — Phase 1（扫描+claim 提取）、Phase 2（并行深入）、Phase 3（交叉验证）、Phase 3.3（事实核查）
- **分析工作流**: `rules/skills/workflow_analytical_writing.md` — Phase A（视角匹配）、Phase B（族谱追溯）、Phase C（叙事重构）、Phase D（thesis 成型）
- **并行 subagent**: `rules/skills/workflow_parallel_subagents.md` — 用于 Phase 2 的并行调研
- **数据模型参考**: `adhoc_jobs/ai_self_evolution_reading/frontend/src/data/fieldMap.ts`
- **写作风格**: `rules/COMMUNICATION.md` — Intuition 的 text 字段用中文写，遵守同样的风格规则

## 工作流

### Step 1: 消化 seed

Seed 可能是 reading list MD、paper list、URL 列表、方向描述、或它们的组合。先读完所有 seed 中的内容（如果是 URL，用 webfetch 读；如果是 paper，读 abstract 和 intro/conclusion）。

产出 scratchpad：列出 seed 中出现的所有 idea、claim、和它们之间的关联方向。不急着归类。

### Step 2: 初步扫描（深度调研 Phase 1）

用 Tavily 做 2-3 轮搜索，覆盖：
- 领域概览（"[topic] overview"、"what is [topic]"）
- 批评与争议（"[topic] criticism"、"[topic] debate"、"[topic] skepticism"）
- 最新进展（"[topic] 2026"、"[topic] latest"）

提取 3-5 个可能的 Region 方向，和每个方向下的关键 claim。对每个 claim 标注验证通道。

### Step 3: 并行深入（深度调研 Phase 2）

按证据功能（而非仅按主题）划分 3-5 个维度，并行启动 subagent：
- 官方叙事维度（Tier 1-2）：产品/论文的官方 claim
- 独立使用/验证维度（Tier 3）：社区复现、实际使用记录
- 批评与边界维度（Tier 3-4）：已知问题、反对声音
- 迁移与对比维度（Tier 4）：谁从什么方案迁移到什么方案，为什么

每个 subagent 要求返回 URL + 原文摘录。维度间保持 ≥50% overlap。

### Step 4: 提取直觉

这是 field map 独有的步骤。从调研结果中提取 Intuition。

Intuition 的提取原则：
- 一个 Intuition = 一个可以被独立理解的 idea。如果一段文字包含三个 idea，拆成三个 Intuition。
- 优先提取"反复出现的直觉"（多个 source 独立提到同一个 idea）和"相互矛盾的直觉"（source A 和 source B 在同一个问题上观点相反）。
- 每个 Intuition 写 1-2 句。如果写出来需要 3 句以上，说明它包含了多个 idea 或者还没有想清楚核心。

Intuition 的质量自检：
- 反面是什么？（能答出来 → 足够具体）
- 如果我读了这个直觉但不读 source，我能对大致的论证方向有一个判断吗？（能 → 直觉合格）
- 这个直觉在 seed 材料里吗，还是在调研中新发现的？如果全部来自 seed，说明调研不够深。

### Step 5: 结构化为 Region

将 Intuition 分组为 Region。分组原则：
- 解决同一个问题的 Intuition 归入同一个 Region
- 同一个方法论传统/流派的归入一起
- 如果一个 Intuition 可以合理归入两个 Region，选更核心的那个，不要重复
- Region 的 thesis 是"这个方向整体在主张什么"的一句话

给每个 Region 写 pros（这个方向的优势/为什么有人支持它）和 cons（局限/为什么有人反对它）。

### Step 6: 识别 Tension

扫描不同 Region 之间、以及同一 Region 内部的矛盾 Intuition。把矛盾上升为 Tension：
- 格式：一个问题 + 两到三个立场 + 各自的论据
- 标注 status：active（活跃争论）、emerging（刚浮现）、resolved（已有共识结论）
- 每个 Tension 的每个立场必须有 source 支撑

### Step 7: 事实核查（深度调研 Phase 3.3）

对关键 Intuition 做逐源回查：用 Tavily extract 或 webfetch 重新读原始内容，确认转述准确、URL 有效、数据精确。标注 type: 'fact' 的 Intuition 优先核查。

### Step 8: 组装 FieldMap 数据 + 构建 website

将 Region、Tension、overview、readingPath 组装成完整的 FieldMap 对象，写入 `frontend/src/data/fieldMap.ts`。运行 `npm run build` 生成静态站点。

### Step 9: 自我评估

按验收标准逐条检查。如果有不通过的，回到对应步骤修补。修补完成后重新 build。

## 方法论建议

### 如何发现"反复出现的直觉"

当多个 source 独立提到同一个 idea 时，这是一个值得提取的直觉。独立的意思：不是同一篇 paper 的不同报道，不是同一个作者的不同文章。如果只有一个 source 提到某个 idea，但它非常有力（Tier 4 evidence、production post-mortem），也可以作为 Intuition 记录下来，但标注为单 source 且 type: 'fact' 需要更强的核查。

### 如何发现矛盾

矛盾有两种形式：显式矛盾（source A 直接说 source B 错了）和隐式矛盾（source A 的结论和 source B 的结论在逻辑上不可能同时成立）。显式矛盾容易发现，关注"criticism"、"debate"、"vs" 关键词即可。隐式矛盾需要对比不同 source 的 arguments 和前提假设：当两个 source 的前提假设不同但都在论证同一件事时，往往隐藏着一个更深的矛盾。

### 事实 vs 观点

经验法则：如果一段陈述可以通过查看公开数据/代码/文档来验证，它是 fact。如果它涉及"好/坏""重要/不重要""会/不会"，它是 opinion。灰色地带：对未来事件的预测（"2027 年会有 X"）— 标注为 opinion，因为它不可验证。对过去事件的因果推断（"X 导致了 Y"）— 如果 X 和 Y 都是 fact 但因果链是推断，标注为 opinion。

### 什么时候停

调研是无限的，field map 必须有边界。停止信号：
- 三轮 Tavily 搜索后新结果不再带来新的 Intuition（信息收敛）
- 每个 Region 有至少 3 个 Intuition 且至少一个来自 Tier 3+
- 至少发现了一个 cross-region Tension
- 你已经能回答"这个领域的核心驱动力是什么"而不需要翻资料

### 处理单一 seed 的偏向

如果 seed 只有一个来源（例如只有一篇 reading list、只有一个作者的观点），Step 2 的 Tavily 搜索必须主动覆盖对立观点。不要假设 seed 的作者是中立或全面的。

## 已知陷阱

以下来自 2026-05-22 实际运行 pipeline 的已确认陷阱：

- **fact/opinion 标注膨胀**：agent 容易把包含因果推断和价值判断的陈述标成 fact。本轮发现 8 条 Intuition 标注错误（例如"硬件不对称被低估"、"市场在为上行空间定价"——这些是 opinion 而非 fact）。规则：只要陈述涉及"被低估/被高估"、"可能来自"、"说明……"、任何因果推断或价值判断，就应该是 opinion。
- **把阅读清单当结论**：seed 是调研起点，不是 answers。本轮 seed 中的 19 篇文章提供了初始结构，但 7 个并行 sub-agent 的深度调研后，6 个 Region 的 thesis 全部重写，新增了 15 条 Intuition 和 25 篇 reference。如果只靠 seed 写 Intuition 而不做独立验证，产出会停留在 summary 层面而非 analysis 层面。
- **Intuition 过于笼统**：写"自我对弈是 AI 自进化的关键方法"而不是"AlphaZero 证明了自我对弈可以在封闭规则系统内从零达到超人类水平，但扩展性取决于能否定义清晰的奖励信号"。前者是方向描述，后者是可质疑的 claim。
- **Tension 是 agent 自己编的**：Tension 必须有 source 支撑的立场。本轮 5 个 Tension 全部 trace 到具体 source（MIRI、Chollet、Ball、Lambert、Harjas、Karpathy、Recursive、SSI）。
- **GitHub Pages 子路径部署**：GitHub Pages 部署在 `/<repo-name>/` 而非根路径。Vite 默认生成根相对路径的 assets（`/assets/...`）。必须设置 `base: '/<repo-name>/'` 否则 JS/CSS 404。这个 bug 导致网站首次部署后显示为空白页。
- **网站部署后需 Playwright 验证**：`curl` 只能检查 HTML 是否返回 200，无法发现 React 渲染失败或 JS 404。本轮 curl 返回了正确的 HTML（含 `<div id="root">`），但浏览器中 JS 实际加载失败——只有 Playwright snapshot 能暴露这个问题。
- **审阅 agent 的类别选择**：gemini31pro 擅长事实核查（准确识别了全部 7 条 fact→opinion 错误和缺失的 alignment tension），deepseek 擅长结构审查（识别出分类轴不一致、质疑区混层、阅读路径伪时间线问题）。审阅应同时派两种 agent 而非二选一。

## 输出规格

### 主产出

`frontend/src/data/fieldMap.ts` — 一个 TypeScript 文件，export 一个 `FieldMap` 对象。类型定义在同一个文件里。

### 中间产物（存 `tmp/<session_slug>/`）

- `scratchpad.md` — seed 消化 + claim 提取 + 直觉草稿
- `search_manifest.md` — subagent 对应表 + URL 索引
- `fact_check.md` — 逐源回查记录

### FieldMap 结构与示例

类型定义和完整示例见 `adhoc_jobs/ai_self_evolution_reading/frontend/src/data/fieldMap.ts`。
