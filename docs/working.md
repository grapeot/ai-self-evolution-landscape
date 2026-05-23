# 工作日志

## 2026-05-22 — 项目初始化

- 从 Downloads 移入原始阅读清单 MD
- 设计 field map 概念：单页直觉地图，不是阅读清单
- 参考 guide_me_city 和 guide_me_topic 的架构
- 写 PRD、RFC：两层架构（skill 流程层 + website 展示层）
- 写核心 skill：seed → 调研 → 合成 → FieldMap 数据 → 网站
- 定义 FieldMap 数据模型：Region / Intuition / Tension / ReadingPath
- 19 篇文章转换为 seed 数据：6 个 Region、18 条 Intuition、2 个 Tension
- 搭建 React + Vite 前端：单页 layout、sticky 导航、Pros/Cons、争论区
- CSS：暖白底、深棕标题、琥珀强调色
- FastAPI 后端骨架
- GitHub Actions：push → build → deploy gh-pages
- 写 README（中文）
- 更新 WORKSPACE.md 和 skills/INDEX.md

## 2026-05-22 — 启动完整 pipeline：Phase 1 深度调研

- Tavily 4 路并行搜索：overview、criticism、technical depth、industry funding
- 新发现的重要来源：ICLR 2026 RSI Workshop、Dean W. Ball 分析、MIRI reply to Chollet、Stanford Continually Self-Improving AI 博士论文
- Recursive 融资细节：$650M at $4.65B valuation, Richard Socher 领导, <30人团队, 计划 2026 中公开发布
- 启动 7 个并行 sub-agent：4 个逐篇读 19 篇文章 + 3 个深层调研
- 建 tmp/session_20260522/ 存放中间产物

## 2026-05-22 — Phase 2: 提取和精炼 Intuition

- 7 个并行 sub-agent 全部完成：4 个逐篇读 19 篇文章 + 3 个深层调研（RSI landscape、技术深度、产业事实）
- 关键新发现：
  - 7 个学派（不仅 pro/con）：连续派、效率派、开放式进化派、爆炸派、经济约束派、对齐工程派、情境智能派
  - 4 个新 Tension：连续性 vs 飞跃、个体 vs 分布式智能、元认知 vs 任务级改进、能力增益 vs 对齐漂移
  - AlphaEvolve 的自指性循环已部分闭合（优化训练自身的 Gemini 内核）
  - 可验证性约束是所有方法的共有限制
  - Recursive 全明星团队细节（ViT 作者、POET 作者、DeepMind 开放式进化负责人等）
  - Recursive $650M/$4.65B，成立 4 个月零产品
  - Darwin Godel Machine：首个显式修改自身修改机制的系统（SWE-bench 20%→50%）
  - CodeEvolve 开源复现已超越 AlphaEvolve 在 4 个问题上
- 更新 fieldMap.ts：
  - 6 个 Region 全部重写 thesis 和 intuition——基于调研证据而非 seed 推测
  - 新增 15 条 Intuition（fact/opinion 标注）
  - 新增 25 篇 reference articles（tier 标注）
  - 新增 2 个 Tension（连续性 vs 飞跃、个体 vs 分布式），原 2 个深化为包含中间立场
  - 更新 reading path 适配新 intuition
- 重命名"算法发现"→"算法自动发现与基础设施优化"
- 重命名"持续学习"→"持续学习与自修改架构"，加入 DGM
- "产业前沿"加入 SSI、Ricursive、大实验室内部项目
- "质疑与边界"加入 Lambert LSI、Harjas 技术树、Ball 分布式知识

## 设计决策

- React + Vite 而非 Python 静态生成器：gh-pages 支持更好
- TypeScript 数据而非 JSON：类型检查防止格式错误
- 不用 Tailwind：设计意图在 CSS 里显式可见
- skill 放项目 skills/ 而非全局 rules/skills/：项目特定 pipeline

## Lessons Learned

- guide_me_topic 的 dimension 和 field map 的 Region 同构
- guide_me_city 的 reading-first 设计哲学直接影响视觉方向
- 60 行 MD → 300 行结构化数据：结构化本身就是增值
