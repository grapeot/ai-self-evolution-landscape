# PRD: Field Map — 陌生领域快速建立直觉的网站

## 目标

给定一个陌生领域的 seed（阅读清单 / paper list / URL 列表 / 方向描述），经过深度调研和分析合成，产出一个单页 website。这个网站不是阅读清单 — 它是这个领域的 field map：让人在几分钟内建立 mental model，知道这个领域在讨论什么、有哪些流派、核心直觉是什么、它们之间的矛盾在哪里。

读者是 AI 行业从业者，有通用认知但不是该领域专家。他们需要的是领域脉络和直觉，不是技术细节。

## 成功标准

1. 打开页面 30 秒内能说出领域的主题结构（有几个流派/方向、它们在争论什么）
2. 每个 idea 旁边有一颗一句话直觉，不读原文就知道它的大意
3. 能区分哪些是已有共识、哪些是活跃争论、哪些是刚浮现的方向
4. 每个直觉可以追溯到至少一个 source；fact 和 opinion 有明确区分
5. 加一条新直觉 = 编辑一个 TypeScript 数据文件，重新 build 即可

## 不是

- 不是 reading list display（不按文章维度组织，按 idea 维度组织）
- 不是 blog、不是 newsletter
- 不是知识库、不是 wiki
- 不需要协作、评论、收藏

## 内容模型

组织单位是 Region（领域子方向/流派），每个 Region 包含：一句话 thesis、若干 Intuition（关键直觉，每条约 1-2 句）、Pros / Cons、参考文章（标注 tier）。另有跨 Region 的 Tension（争论）和 Reading Path（时间有限的阅读路线）。

一篇文章可能对应多个直觉，一个直觉可能引用多篇文章。

## 构建流程

1. 用户提供 seed（方向描述、reading list、URL 列表等）
2. 深度调研：按 `workflow_deep_research_survey.md` 的 Phase 1-3 执行
3. 分析合成：按 `workflow_analytical_writing.md` 的 Phase A-D 执行
4. Field Map 提取：将调研和分析结果结构化为 FieldMap 数据模型
5. Build：React 项目从 FieldMap 数据生成静态站点

流程本身封装为一个 skill：`rules/skills/field_map_bootstrap.md`
