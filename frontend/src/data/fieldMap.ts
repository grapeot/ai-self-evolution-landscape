// ============================================================
// FieldMap data model — types + data for AI self-evolution
// ============================================================

export interface FieldMap {
  field: string;
  overview: string;
  lastUpdated: string;
  regions: Region[];
  tensions: Tension[];
  readingPath: ReadingPath;
}

export interface Region {
  id: string;
  title: string;
  thesis: string;
  intuitions: Intuition[];
  pros: string[];
  cons: string[];
  articles: ArticleRef[];
}

export interface Intuition {
  id: string;
  text: string;
  type: 'fact' | 'opinion';
  sources: number[];
}

export interface ArticleRef {
  title: string;
  url: string;
  translatedUrl?: string;  // Chinese translation, if available
  relevance: string;
  tier: 'primary' | 'supporting' | 'counterpoint';
}

export interface Tension {
  id: string;
  question: string;
  positions: { side: string; argument: string }[];
  status: 'active' | 'emerging' | 'resolved';
}

export interface ReadingPath {
  ifYouHave5Min: string[];
  ifYouHave30Min: string[];
}

const fieldMap: FieldMap = {
  field: 'AI 自进化（递归自我改进）',
  overview:
    'AI 能否改进自己的代码、架构和学习过程？从 1965 年 I.J. Good 提出"智能爆炸"假设，到 2026 年 Recursive Superintelligence 以 6.5 亿美元融资将这个方向变成一个赛道——这个领域经历了从哲学思辨到工程实践、从学术角落到资本焦点的转变。核心问题仍未解决：自我改进的上限在哪里？它会导致不可控的智能爆炸，还是会在某个瓶颈处自然停滞？2026 年的关键进展是：AI 已经在真实生产环境中优化自己（AlphaEvolve 为 Google 恢复 0.7% 全球算力、为 Gemini 训练提速 1%），但离"自主决定优化什么"还有本质距离。',
  lastUpdated: '2026-05-22',
  regions: [
    {
      id: 'conceptual-origins',
      title: '概念与思想起源',
      thesis: '自进化的思想起源于 1965 年 I.J. Good 的"智能爆炸"假设：足够智能的 AI 可以设计比自己更智能的后继者。但 Good 的论证是纯演绎的——它假设 ultraintelligent machine 已存在，未讨论它能否被造出来。',
      intuitions: [
        { id: 'conceptual-origins-1', text: 'Good 的原始论证："第一个 ultraintelligent machine 是人类的最后一项发明"——之后机器会接手。但论证纯演绎，不含数据或形式证明。', type: 'fact', sources: [0] },
        { id: 'conceptual-origins-2', text: 'MIRI 的风险框架：不声称智能爆炸必然发生，但认为后果极其重大值得提前研究。核心 concern 是 competence（能力）而非 malevolence（恶意）：一个 competent 但目标与人类不一致的系统是主要威胁。', type: 'opinion', sources: [1] },
        { id: 'conceptual-origins-3', text: 'AI 研究者对"何时"没有共识。2011 Oxford 会议中位数预计 2050 年 50% 概率有 HLMI，但 41% 的 AI@50 参会者认为机器智能永远不会达到人类水平。预测本身的分散程度就是一个值得注意的信号——如果专家都不能收敛，任何单一预测都不可靠。', type: 'opinion', sources: [1] },
        { id: 'conceptual-origins-4', text: 'Yudkowsky 对 Chollet 的反驳：No Free Lunch 定理在此不适用——我们生活在归纳有效的低熵宇宙。AlphaGo Zero 三天内超越人类几世纪围棋知识，证明单个系统可以超越分布式人类智慧的积累。', type: 'opinion', sources: [3] },
      ],
      pros: ['逻辑简洁：如果 AI 能改进自己，循环就闭合了', 'AlphaGo Zero 等案例提供实证支撑', '为后续工程探索提供概念地基'],
      cons: ['Good 的论证是纯演绎，无经验数据', '专家预测高度分散——"何时"而非"是否"才是真正未知', '历史 AI 预测屡次落空：1956 年预计一个夏天解决视觉'],
      articles: [
        { title: 'I.J. Good — 关于第一台超智能机器的思辨 (1965)', url: 'https://www.historyofinformation.com/detail.php?id=2142',
        translatedUrl: '/ai-self-evolution-landscape/translations/good-1965.html', relevance: '智能爆炸概念的原始出处', tier: 'primary' },
        { title: '智能爆炸 FAQ — MIRI', url: 'https://intelligence.org/ie-faq/',
        translatedUrl: '/ai-self-evolution-landscape/translations/miri-faq.html', relevance: '最系统的论证框架', tier: 'primary' },
        { title: 'AI 开始构建自己 — TechCrunch (2026)', url: 'https://techcrunch.com/2026/05/14/what-happens-when-ai-starts-building-itself/',
        translatedUrl: '/ai-self-evolution-landscape/translations/techcrunch-2026.html', relevance: 'Socher 将 Good 愿景商业化的尝试', tier: 'primary' },
        { title: 'MIRI 对 Chollet 的回复 (2017)', url: 'https://intelligence.org/2017/12/06/chollet/',
        translatedUrl: '/ai-self-evolution-landscape/translations/miri-chollet.html', relevance: '理解正反双方核心分歧的最佳单一来源', tier: 'primary' },
      ],
    },
    {
      id: 'evolutionary-search',
      title: '自对弈与进化搜索',
      thesis: '从 AlphaZero（游戏中的自对弈）到 AlphaEvolve（生产环境中的进化搜索），这条路线证明了同一个核心机制——"生成-评估-迭代"——可以从零人类数据出发，在封闭规则系统和可量化评估的开放域中都达到超人类水平。但关键约束未变：必须有可自动计算的评估函数，否则选择压力无法建立。"开放"与"封闭"的区别不在机制，在评估函数的可得性。',
      intuitions: [
        { id: 'evolutionary-search-1', text: 'AlphaZero (2018) 是 proof of concept：从零开始 4 小时超越 Stockfish。具体机制：每步 1,600 次 MCTS 模拟，每代 25,000 局自对弈，新旧网络 400 局/55% 阈值替换，200 代。Magnus Carlsen 后来的正式比赛采用了它的策略。AlphaGo→AlphaGo Zero→AlphaZero 的演进展示了"逐步移除人类先验"的通用模式。', type: 'fact', sources: [0, 1] },
        { id: 'evolutionary-search-2', text: 'AlphaZero 的硬件不对称是一个被低估的 caveat：跑在 TPU 上而 Stockfish 跑在 CPU 上。论文注释 23 承认此差异。AlphaStar 和 OpenAI Five 在更复杂游戏中的训练时间（10 个月）和泛化受限也提示：自对弈效率随环境复杂度非线性下降。', type: 'opinion', sources: [0, 2] },
        { id: 'evolutionary-search-3', text: 'AlphaEvolve (2025) 将自对弈逻辑搬到算法空间——LLM 生成候选解 → 自动评估器打分 → 保留最优 → 迭代。四项生产级成果：(1) Google Borg 调度恢复 0.7% 全球算力；(2) Gemini 内核提速 23%（训练时间减 1%）；(3) FlashAttention GPU 内核提速 32.5%；(4) TPU 电路将进下一代。2026 年影响力已扩展至基因组学、量子计算和物流。', type: 'fact', sources: [3, 4] },
        { id: 'evolutionary-search-4', text: 'AlphaEvolve 最被低估的特征是自指性：它优化了 Gemini 训练内核，而 Gemini 正是 AlphaEvolve 内部的 LLM——AI 在加速训练自己的组件。循环已闭合但范围窄（仅限特定内核）。1% 训练时间节省在多代训练中产生复利。', type: 'opinion', sources: [3, 4] },
        { id: 'evolutionary-search-5', text: 'AutoML-Zero (2020) 是学术前身——从基本数学运算进化出 SGD 和反向传播，证明了"去除人类先验后算法可被重新发现"。但它的遗产不是方法本身（从零搜索太慢），而是"不那么人类先验的搜索空间可以发现人类未想到的解"这个洞察——这正是 AlphaEvolve 用 LLM 做搜索引导后实现的。', type: 'opinion', sources: [5, 6] },
        { id: 'evolutionary-search-6', text: '可验证性约束（verifiability constraint）：DeepMind 论文自述"需要自动化评估指标，排除了需要人工实验的任务"。这是整个进化搜索路线的根限——战略规划、创意工作、开放科学推理等没有清晰"好坏"标准的领域，连选择压力都无法建立。AlphaEvolve 的 2026 扩展（基因组学、量子、物流）都是可量化验证的领域，不是随机挑选的——它们恰好属于"有评估器"的子集。', type: 'opinion', sources: [3, 7] },
        { id: 'evolutionary-search-7', text: '开源复现已超越 AlphaEvolve 在部分问题上。方法论优势在工程规模和应用广度而非模型质量——技术壁垒有限。同时 AlphaEvolve 不修改自己的搜索过程（LLM 集合、prompt 采样、MAP-Elites 数据库都是人工设计的固定组件），不是完整意义上的递归自改进。', type: 'opinion', sources: [8, 9] },
      ],
      pros: [
        '从游戏（AlphaZero）到芯片/基因组/物流（AlphaEvolve），机制通用性已验证',
        '自指性循环已部分闭合——AI 在优化训练自己的组件',
        '零人类数据自改进的模式可迁移到任何有自动评估器的领域',
      ],
      cons: [
        '可验证性约束是根限——没有评估器就没有选择压力',
        '硬件优势难以与算法优势分离（TPU vs CPU 是 AlphaZero 时期就存在的归因问题）',
        '不能改进自己的搜索过程——LLM 集合、评估器、进化数据库都是固定的人工组件',
        '开源复现已追上——技术壁垒主要在工程规模而非算法',
      ],
      articles: [
        { title: 'AlphaZero 论文 — Science (2018)', url: 'https://www.science.org/doi/10.1126/science.aar6404', relevance: '自对弈这一机制的里程碑证明', tier: 'primary' },
        { title: 'AlphaZero 技术解析 — TDS', url: 'https://towardsdatascience.com/alphazero-chess-how-it-works-what-sets-it-apart-and-what-it-can-tell-us-4ab3d2d08867/',
        translatedUrl: '/ai-self-evolution-landscape/translations/alphazero-tds.html', relevance: '大师级棋手撰写的技术细节全解', tier: 'primary' },
        { title: '自我对弈 RL 通俗讲解 — Medium', url: 'https://medium.com/biased-algorithms/self-play-reinforcement-learning-for-strategic-games-886cf4b9baf8',
        translatedUrl: '/ai-self-evolution-landscape/translations/selfplay-medium.html', relevance: 'AlphaGo→AlphaZero→MuZero→OpenAI Five 完整演进', tier: 'supporting' },
        { title: 'AlphaEvolve 发布 — Google DeepMind (2025)', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/',
        translatedUrl: '/ai-self-evolution-landscape/translations/alphaevolve-2025.html', relevance: '架构、方法、初始成果', tier: 'primary' },
        { title: 'AlphaEvolve 影响力 — Google DeepMind (2026)', url: 'https://deepmind.google/blog/alphaevolve-impact/',
        translatedUrl: '/ai-self-evolution-landscape/translations/alphaevolve-impact.html', relevance: '跨域扩展：基因组学、量子、物流', tier: 'primary' },
        { title: 'AutoML-Zero 论文 (2020)', url: 'https://arxiv.org/abs/2003.03384', relevance: '学术前身：从基本运算进化出 ML 算法', tier: 'supporting' },
        { title: 'AutoML-Zero 通俗版 — Google Blog', url: 'https://research.google/blog/automl-zero-evolving-code-that-learns/',
        translatedUrl: '/ai-self-evolution-landscape/translations/automl-zero-blog.html', relevance: '入门解读', tier: 'supporting' },
        { title: 'Self-Improving AI Guide 2026 — o-mega', url: 'https://o-mega.ai/articles/self-improving-ai-agents-the-2026-guide',
        translatedUrl: '/ai-self-evolution-landscape/translations/self-improving-guide.html', relevance: '可验证性约束的系统分析', tier: 'supporting' },
        { title: '开源复现论文 (2025)', url: 'https://arxiv.org/html/2510.14150v2',
        translatedUrl: '/ai-self-evolution-landscape/translations/codeevolve.html', relevance: '用开源模型超越 AlphaEvolve 在部分问题上', tier: 'counterpoint' },
        { title: 'AlphaEvolve 独立评测 — Ernest Davis (NYU)', url: 'https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf',
        translatedUrl: '/ai-self-evolution-landscape/translations/alphaevolve-review.html', relevance: '学术评审：增量性质，TPU 改进被独立发现', tier: 'counterpoint' },
      ],
    },
    {
      id: 'continual-learning',
      title: '持续学习与自修改架构',
      thesis: '当前 LLM 训练后"冻结"无法从使用中学习。Nested Learning / HOPE 提出多层嵌套优化范式——不同层以不同频率更新。但 HOPE 仅在 760M-1.3B 参数验证。Darwin Godel Machine 从代码自修改路线也在推进。',
      intuitions: [
        { id: 'continual-learning-1', text: '"冻结模型"的代价：ChatGPT 知识截止于训练数据。重训成本数千万美元且可能灾难性遗忘。持续学习试图在推理阶段就地更新，不依赖重新训练。', type: 'fact', sources: [0] },
        { id: 'continual-learning-2', text: 'Nested Learning 核心理论主张：架构（深度/宽度/层类型）和优化器（SGD/Adam）本质是同一事物的不同"层级"。"深度"来自不同更新频率的嵌套优化，不是堆叠层数。如果成立，"设计更好架构"和"设计更好训练方法"塌缩成一个问题。', type: 'opinion', sources: [0, 1] },
        { id: 'continual-learning-3', text: 'HOPE 基于 Titans，用 Continuum Memory System 替代前馈网络：更新频率从每 16 token 到每 1600 万 token 递减。在 760M-1.3B 参数的语言建模和常识推理上超越同等 Transformer、Titans、Samba。', type: 'fact', sources: [1, 2] },
        { id: 'continual-learning-4', text: 'HOPE 的 scale 缺口：所有测试在 760M-1.3B 参数。无证据表明多频率更新在分布式训练下能扩展到 70B+。独立评审："离玩具任务之外的任何东西还很远。"', type: 'fact', sources: [3] },
        { id: 'continual-learning-5', text: 'Darwin Godel Machine（Sakana AI, 2026）从代码层面自修改：进化算法让 coding agent 修改自身代码，包括修改代码的代码。SWE-bench 20%→50%。与 HOPE 互补——HOPE 在权重层自修改，DGM 在代码层自修改。', type: 'fact', sources: [4] },
      ],
      pros: ['Nested Learning 统一架构和优化器的框架', 'HOPE 在防灾难性遗忘上有实证优势', 'DGM 是首个显式修改修改机制的系统'],
      cons: ['HOPE 仅 760M-1.3B 参数验证', '依赖 Titans（本身未大规模验证）', '自修改系统的 debug 和安全性未解决'],
      articles: [
        { title: 'Nested Learning 官方 — Google Research (2025)', url: 'https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/',
        translatedUrl: '/ai-self-evolution-landscape/translations/nested-learning.html', relevance: '核心理论、三大技术贡献、HOPE', tier: 'primary' },
        { title: 'HOPE 详解 — AI Papers Academy (2026)', url: 'https://aipapersacademy.com/nested-learning-hope/',
        translatedUrl: '/ai-self-evolution-landscape/translations/hope-detail.html', relevance: 'NLM、CMS、自修改机制、benchmark', tier: 'primary' },
        { title: 'Nested Learning 论文 — NeurIPS 2025', url: 'https://arxiv.org/abs/2512.24695', relevance: '原始论文', tier: 'primary' },
        { title: 'HOPE 独立评测 — Chris Paxton', url: 'https://itcanthink.substack.com/p/paper-notes-nested-learning',
        translatedUrl: '/ai-self-evolution-landscape/translations/hope-review.html', relevance: '指出 scale 局限', tier: 'counterpoint' },
        { title: 'Darwin Godel Machine — Sakana AI', url: 'https://sakana.ai/darwin-godel-machine/',
        translatedUrl: '/ai-self-evolution-landscape/translations/dgm.html', relevance: 'SWE-bench 20%→50%', tier: 'primary' },
        { title: 'HyperAgents / DGM-H — Meta AI (2026)', url: 'https://arxiv.org/abs/2603.19461',
        translatedUrl: '/ai-self-evolution-landscape/translations/hyperagents.html', relevance: '元认知自改进：元级修改过程本身可编辑，跨域迁移', tier: 'primary' },
      ],
    },
    {
      id: 'agentic-auto-research',
      title: 'Agentic 自研究',
      thesis: '与进化搜索（在固定 pipeline 内搜索最优解）不同，Agentic Auto-Research 系统自主规划和执行完整的研究工作流——从 idea 生成到实验执行到论文撰写到同行评审——并在过程中反思和修订自己的计划。这代表了从"搜索解空间"到"自主执行科学方法"的跃迁。',
      intuitions: [
        { id: 'agentic-auto-research-1', text: 'Sakana AI "The AI Scientist" (Nature, 2026 年 3 月) 是首批完整闭环系统：四个阶段——idea 生成（用 Semantic Scholar 做新颖性过滤）、实验执行（tree search 调试自己的代码）、论文撰写（LaTeX + 自动引用匹配 20 轮）、自动同行评审（5-reviewer ensemble）。其中一篇论文在 ICLR workshop 获得 human reviewer 评分 6.33/10，超过接受阈值。', type: 'fact', sources: [0] },
        { id: 'agentic-auto-research-2', text: 'Google AI Co-Scientist (2025) 是多 agent 系统：Generation、Reflection、Ranking、Evolution、Proximity、Meta-review 六种 agent 组成自改进 tournament。采用 Elo 自动评估来校准推理质量。三项实验室验证结果：急性髓系白血病药物重定位（确认肿瘤抑制效果）、肝纤维化靶点发现（与 Stanford 合作）、抗菌素耐药性机制（独立提出后被实验证实，发表于 Cell）。', type: 'fact', sources: [1] },
        { id: 'agentic-auto-research-3', text: 'Meta HyperAgents / DGM-H (2026) 是目前最清晰的元认知自改进实例。核心创新：元级修改过程本身可编辑——系统不仅改进输出，还进化改进过程。在运行中自发产生了性能追踪系统、持久化记忆和计算规划机制——这些都不是预先指定的。元级改进跨域迁移：在 coding 中学到的改进策略加速了 robotics 和 math grading 的自我提升。', type: 'fact', sources: [2] },
        { id: 'agentic-auto-research-4', text: 'Agentic 系统和进化搜索系统的根本区别：AlphaEvolve 在固定 pipeline（LLM 生成→自动评估→保留最优）中搜索解——它的 LLM 集合、prompt 采样和 MAP-Elites 数据库都是人工设计的固定组件。Agentic 系统自主规划多阶段工作流、在阶段间传递状态、用反馈修订计划、在某些情况下自行生成评估标准。前者是"在给定空间内优化"，后者是"自己决定要做什么"。', type: 'opinion', sources: [0, 2] },
        { id: 'agentic-auto-research-5', text: 'Analemma 的 FARS (Fully Automated Research System, 2026) 代表了工业化尺度：166 篇 ML 论文在 417 小时内完成，约 $1,100/篇。Google PaperOrchestra 则从研究员的原始实验日志自动生成投稿级论文，在 11 位 AI 研究者的盲评中超过现有系统。这两个案例表明自动研究的吞吐量已经进入生产级。', type: 'fact', sources: [3] },
      ],
      pros: [
        '从"搜索解空间"到"自主执行科学方法"的跃迁——机制上有本质区别',
        'AI Scientist 已通过 workshop 同行评审——闭环验证初步成立',
        'HyperAgents 的元认知自改进是目前最接近"改进过程自我进化"的实例',
      ],
      cons: [
        '目前仅在 narrow domains 验证（ML 论文、药物靶点），泛化性未证实',
        'AI Scientist 的论文质量仍低于顶会标准（workshop 级别）',
        'FARS 的"166 篇/417 小时"侧重于吞吐量而非深度——量不等于质',
        'Agentic 系统中的反思和元认知可能只是表面现象而非真正理解',
      ],
      articles: [
        { title: '"The AI Scientist" — Nature (2026)', url: 'https://www.nature.com/articles/s41586-026-10265-5', relevance: '首个完整闭环自动科研系统，通过 workshop 同行评审', tier: 'primary' },
        { title: 'AI Co-Scientist — Google Research (2025)', url: 'https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/',
        translatedUrl: '/ai-self-evolution-landscape/translations/ai-scientist.html', relevance: '多 agent tournament 架构，三项实验室验证', tier: 'primary' },
        { title: 'HyperAgents / DGM-H — Meta AI (2026)', url: 'https://arxiv.org/abs/2603.19461',
        translatedUrl: '/ai-self-evolution-landscape/translations/hyperagents.html', relevance: '元认知自改进：元级修改过程可编辑，跨域迁移', tier: 'primary' },
        { title: 'FARS / PaperOrchestra (2026)', url: 'https://theconversation.com/ai-is-generating-research-papers-on-its-own-scientists-are-using-them-255719', relevance: '工业化自动科研 + 盲评超越现有系统', tier: 'supporting' },
      ],
    },
    {
      id: 'industry-frontier',
      title: '产业前沿',
      thesis: '2026 年 5 月 Recursive Superintelligence 以 6.5 亿美元融资标志自进化 AI 成为赛道。但公司成立仅 4 个月、不到 30 人、零产品——纯粹团队+叙事押注。大实验室（OpenAI/Anthropic/DeepMind）的内部项目可能进展更深，但不透明。',
      intuitions: [
        { id: 'industry-frontier-1', text: 'Recursive 全明星团队：CEO Richard Socher（You.com 创始人）；联创含 ViT 作者 Dosovitskiy、DeepMind 开放式进化负责人 Rocktaschel、POET 作者 Clune、前 Meta FAIR 总监 Tian。顾问 Peter Norvig。', type: 'fact', sources: [0, 1] },
        { id: 'industry-frontier-2', text: '技术路线：开放式进化（open-endedness），核心手段 rainbow teaming——两个 AI 对抗共同进化。Socher 区分自改进和 auto-research：前者需系统发展"对自身缺陷的自我意识"。', type: 'fact', sources: [0, 1] },
        { id: 'industry-frontier-3', text: '三家自改进创业公司：Recursive（Socher, $650M/$4.65B）、SSI（Sutskever, $3B+/$32B）、Ricursive Intelligence（AlphaChip 分拆）。三家均无公开产品。一位分析师的观察是，市场在为"如果成立"的上行空间定价，而非为已验证的产品定价。', type: 'opinion', sources: [0, 3] },
        { id: 'industry-frontier-4', text: '大实验室内部进展可能比创业公司更深入，但不透明。OpenAI 在构建"自动化 AI 研究员"（Altman 预计 2026 秋达到初级研究员水平）；Anthropic 多数代码已由 Claude 编写（Jack Clark 估计 60% 概率 2028 年底前出现能自主训练后继者的系统）；DeepMind 的 AlphaEvolve 已生产运行 1 年以上。但这些信息的公开程度有限，难以独立验证。', type: 'opinion', sources: [4] },
        { id: 'industry-frontier-5', text: 'Nvidia 和 AMD 同时投资 Recursive 不是巧合。如果自改进成真，最大瓶颈是算力——芯片公司是卖铲人。它们的参与表明认为自改进是近期计算需求驱动力，不只是遥远理论。', type: 'opinion', sources: [0] },
        { id: 'industry-frontier-6', text: '自改进 AI 的安全哲学分裂成两条路线：Recursive 的开放式进化和 rainbow teaming 认为对抗性自我测试本身就是安全机制——两个 AI 互相攻击能暴露漏洞；SSI（Sutskever, $32B）则拒绝公开任何产品和路线图，认为自改进系统一旦启动就无法关闭，安全验证必须在封闭环境中预先完成。这两种路线代表了"开放即安全"和"封闭才安全"的根本分歧。', type: 'opinion', sources: [0, 4] },
      ],
      pros: ['资本涌入加速工程探索', '全明星团队密度罕见', '大实验室内部项目提供更可靠验证'],
      cons: ['$4.65B 估值建立在零产品零 demo 上', 'Socher 同时管理 You.com，精力分散', '关键进展不透明——公共叙事可能滞后或误导'],
      articles: [
        { title: 'Recursive 融资报道 — TNW (2026)', url: 'https://thenextweb.com/news/recursive-superintelligence-self-improving-ai-funding',
        translatedUrl: '/ai-self-evolution-landscape/translations/recursive-tnw.html', relevance: '最详细人物+路线图，含批判视角', tier: 'primary' },
        { title: 'Recursive 解读 — Unite.AI', url: 'https://www.unite.ai/recursive-superintelligence-raises-650-million-to-pursue-self-improving-ai/',
        translatedUrl: '/ai-self-evolution-landscape/translations/recursive-unite.html', relevance: '开放式进化+rainbow teaming', tier: 'primary' },
        { title: 'IEEE Spectrum RSI 全景 (2026)', url: 'https://spectrum.ieee.org/recursive-self-improvement',
        translatedUrl: '/ai-self-evolution-landscape/translations/ieee-rsi.html', relevance: '覆盖所有玩家和专家观点', tier: 'primary' },
        { title: 'Dean Ball: 论 RSI (2026)', url: 'https://www.hyperdimensional.co/p/on-recursive-self-improvement-part',
        translatedUrl: '/ai-self-evolution-landscape/translations/dean-ball.html', relevance: '冷静分析：最重要的不是是否而是如何', tier: 'primary' },
        { title: 'SSI 官网 (Sutskever)', url: 'https://ssi.inc', relevance: '安全优先路线，$32B，零产品', tier: 'supporting' },
      ],
    },
    {
      id: 'skepticism',
      title: '质疑、摩擦与边界',
      thesis: '反对"智能爆炸必然发生"的论点来自四个不同层面——概念（Chollet：智能是 situated 的，不能脱离环境）、工程（Lambert：摩擦递增，sigmoid 而非指数）、认知（Harjas：怀疑 LLM 恰恰是严肃对待自改进的理由）、组织（Ball：知识是分布式嵌入的，单个系统无法复制文明级复杂度）。它们不是同一种反驳的不同版本，而是对"问题出在哪里"的不同诊断。',
      intuitions: [
        { id: 'skepticism-1', text: '[哲学层 · 概念质疑] Chollet 的五条核心反驳：智能依赖情境而非内在于大脑（野孩子无人类文化不发展智能）；IQ 130 以上与现实成就相关性断裂——环境设了硬上限；多数智能外化为文明（语言、书籍、机构），单个大脑无法设计比自己更聪明的实体；历史上无一人做到；递归系统实践中呈 S 形增长。αGo Zero 反例动摇了"封闭系统不能自改进"这部分，但未触及 situated intelligence 的核心主张。', type: 'opinion', sources: [0] },
        { id: 'skepticism-2', text: '[哲学层 · 反反驳] Yudkowsky 的反驳：No Free Lunch 定理不适用——我们生活在归纳有效的低熵宇宙。αGo Zero 单个系统三天超越人类几世纪围棋智慧，证明个体可超分布式集体。但 Chollet 会说围棋是封闭系统——争论核心正是开放系统是否遵循同样模式。', type: 'opinion', sources: [5] },
        { id: 'skepticism-3', text: '[工程层 · 摩擦分析] Lambert 的"有损自改进"（LSI）框架指出三类递增摩擦：(1) 可自动化研究范围太窄——优化单 benchmark 易，多指标不退化是 90% 难度；(2) 并行 agent 的 Amdahl 定律——一个研究员无法有效指导 300+ agent；(3) 资源瓶颈和组织政治——没人会把数十亿美元算力交给完全自主的 AI 实验。"每个 sigmoid 底部像指数"——GPT-4 scaling、o1 reasoning 都趋平了，自改进不会例外。', type: 'opinion', sources: [1] },
        { id: 'skepticism-4', text: '[认知层 · 技术树论证] Harjas 的 paraconsistent 论证：即使 LLM 永远到不了 AGI（怀疑论前提），它们仍可通过自动化研究加速发现正确的技术分支（如神经符号 AI）。你不需相信 LLM 能成 AGI，只需相信它能帮人类找到通往 AGI 的正确道路。这是怀疑论者对自己阵营做的最强 alarmist case——怀疑 LLM 恰恰是严肃对待自改进的理由。', type: 'opinion', sources: [2] },
        { id: 'skepticism-5', text: '[组织层 · 分布式知识] Dean Ball 的论证：TSMC 芯片制造能力来自 9 万互动员工，不是一个大脑的产物。要做出实际改变需要运营实验室、谈判政治、开采矿物——不只是智力问题。知识是隐性的、分布式的、嵌入组织文化的。这个论证和 Chollet 的"智能外化"一脉相承，但更聚焦工程现实而非哲学前提。', type: 'opinion', sources: [3] },
        { id: 'skepticism-6', text: '[工程层 · 可验证性约束] 所有当前自改进系统仅在有客观评估器的领域工作。在无清晰"好坏"标准的领域（战略、创意、开放科学推理），连选择压力都建立不起来。这被一些分析者视为方法论的根限而非暂时障碍——如果找不到构造改进信号的通用方法，自改进将永限于可量化子集。', type: 'opinion', sources: [4] },
      ],
      pros: [
        '多角度约束了"爆炸叙事"——不是一种反驳而是四种（概念、速度、路径、分析单元）',
        'Lambert 的 LSI 提供了可操作的工程分析而非哲学反驳——可直接指导资源分配决策',
        'Harjas 的论证结构独特：怀疑论者做 alarmist case，避免了这个领域的标准两极分化',
      ],
      cons: [
        'Chollet 的 αGo Zero 反例暴露了"封闭系统"和"开放系统"的区分可能过于二元',
        'Ball 的分布式知识论证可能低估 AI 获取和整合信息的速度——AI 可以同时读取整个互联网',
        '过于保守可能错过突破窗口——类似 1990 年代对互联网影响的系统性低估',
        '可验证性约束本身在松动——AlphaEvolve 的 2026 扩展证明"可评估"的领域边界在扩大',
      ],
      articles: [
        { title: '智能爆炸的不可能性 — Chollet (2017)', url: 'https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec',
        translatedUrl: '/ai-self-evolution-landscape/translations/chollet-2017.html', relevance: '五条论证，最著名反驳', tier: 'primary' },
        { title: '有损自改进 — Lambert (2026)', url: 'https://www.interconnects.ai/p/lossy-self-improvement',
        translatedUrl: '/ai-self-evolution-landscape/translations/lambert-lsi.html', relevance: '工程摩擦分析', tier: 'primary' },
        { title: 'AI 怀疑论者的 RSI 论证 — Harjas (2026)', url: 'https://www.greaterwrong.com/posts/Fy2fLPKgb8K3sWuRn/an-ai-skeptic-s-case-for-recursive-self-improvement',
        translatedUrl: '/ai-self-evolution-landscape/translations/harjas-rsi.html', relevance: '技术树框架', tier: 'primary' },
        { title: 'IEEE Spectrum RSI 全景 (2026)', url: 'https://spectrum.ieee.org/recursive-self-improvement',
        translatedUrl: '/ai-self-evolution-landscape/translations/ieee-rsi.html', relevance: '含 Ball、Krueger、Clune 审慎观点', tier: 'primary' },
        { title: 'AlphaEvolve 独立评测 — Davis (NYU)', url: 'https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf',
        translatedUrl: '/ai-self-evolution-landscape/translations/alphaevolve-review.html', relevance: '可验证性约束证据', tier: 'supporting' },
        { title: 'MIRI 对 Chollet 回复 (2017)', url: 'https://intelligence.org/2017/12/06/chollet/',
        translatedUrl: '/ai-self-evolution-landscape/translations/miri-chollet.html', relevance: 'Yudkowsky 逐条反驳', tier: 'counterpoint' },
      ],
    },
  ],
  tensions: [
    {
      id: 'tension-explosion',
      question: '自改进会爆炸性加速还是自然趋平？',
      positions: [
        { side: '爆炸派 (MIRI/Yudkowsky)', argument: '如果 AI 能改进自己，每次改进降低下次成本，正反馈必然爆炸。AlphaGo Zero 单个系统三天超人类几世纪围棋智慧——分布式人类并行效率极低，单个足够强的系统可以胜过任何规模的协作。核心在于是否准备好，不在于是否发生。' },
        { side: '不可能派 (Chollet)', argument: '智能不是可无限放大的标量。历史上无一人设计出比自己更聪明的东西。所有递归系统实践呈 S 形增长——边际递减、瓶颈积累、对抗性摩擦。知识分布式地嵌入组织和文化中（TSMC 的能力来自 9 万互动员工而非一个大脑），单个 AI 无法复制这种复杂性。' },
        { side: '有损派 (Lambert/LSI)', argument: '自改进真实但非指数。"每个 sigmoid 底部像指数"——GPT-4 scaling、o1 reasoning 都趋平了。自改进同受限于：可自动化研究范围窄、并行 Amdahl 定律、组织政治。不是是否发生的问题，而是是否可持续的问题。' },
      ],
      status: 'active',
    },
    {
      id: 'tension-closed-to-open',
      question: '封闭系统方法能扩展到开放世界吗？',
      positions: [
        { side: '正方', argument: '自对弈→算法发现→芯片设计已展示迁移路径。AlphaEvolve 2026 影响力报告覆盖基因组学到量子计算。每次扩展只需更宽松的搜索空间。Rainbow teaming 提供不需预定义目标的新范式。' },
        { side: '反方', argument: '每步都需人类设计新评估器。真正的"自己发现该优化什么"未发生。可验证性约束排除多数现实战略创意问题——这是方法论根限，不是工程问题。' },
      ],
      status: 'active',
    },
    {
      id: 'tension-continuity',
      question: '自改进是连续渐进还是质的飞跃？',
      positions: [
        { side: '连续派 (Karpathy)', argument: 'RSI 一直存在：汇编→编译器→IDE→自动补全→AI 编程→AI agent。每步加速下一步但无不连续。当前 RSI 关注只是给熟悉过程贴新标签。' },
        { side: '飞跃派 (Ball)', argument: 'Bugatti 200→300mph 是连续加速，学会飞行是质变。两种情形截然不同：更快做已在做的事 vs 做全新的事。如果只是快 2 倍，世界变快但不质变。如果发现全新 AI 范式，世界重新洗牌。' },
      ],
      status: 'active',
    },
    {
      id: 'tension-alignment-speed',
      question: '自改进应该追求速度还是追求安全？',
      positions: [
        { side: '速度优先 (Recursive)', argument: '开放式进化和 rainbow teaming 本身就是安全机制——两个 AI 对抗性共同进化，攻击方天然会暴露防守方的漏洞。开放比封闭更安全，因为封闭系统的缺陷不可见。最快的进展也是最好的安全策略——谁先到达可自改进的 AI，谁就能定义规则。' },
        { side: '安全优先 (SSI/Sutskever)', argument: 'SSI 以 $32B 估值、零产品、零公开路线图的姿态明确拒绝速度竞争。他们的隐含假设是：自改进系统一旦启动就无法关闭，因此必须在启动前确保安全。速度和安全是 trade-off，而当前的市场竞争压力系统性地偏向速度。' },
      ],
      status: 'active',
    },
  ],
  readingPath: {
    ifYouHave5Min: ['conceptual-origins-1', 'evolutionary-search-1', 'evolutionary-search-3', 'continual-learning-3', 'agentic-auto-research-1', 'industry-frontier-1', 'skepticism-1'],
    ifYouHave30Min: ['conceptual-origins-1', 'conceptual-origins-2', 'conceptual-origins-4', 'evolutionary-search-1', 'evolutionary-search-3', 'evolutionary-search-4', 'evolutionary-search-6', 'continual-learning-2', 'continual-learning-3', 'continual-learning-5', 'agentic-auto-research-1', 'agentic-auto-research-3', 'agentic-auto-research-4', 'industry-frontier-1', 'industry-frontier-2', 'industry-frontier-4', 'industry-frontier-6', 'skepticism-1', 'skepticism-3', 'skepticism-4'],
  },
};

export default fieldMap;
