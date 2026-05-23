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
        { title: 'I.J. Good — 关于第一台超智能机器的思辨 (1965)', url: 'https://www.historyofinformation.com/detail.php?id=2142', relevance: '智能爆炸概念的原始出处', tier: 'primary' },
        { title: '智能爆炸 FAQ — MIRI', url: 'https://intelligence.org/ie-faq/', relevance: '最系统的论证框架', tier: 'primary' },
        { title: 'AI 开始构建自己 — TechCrunch (2026)', url: 'https://techcrunch.com/2026/05/14/what-happens-when-ai-starts-building-itself/', relevance: 'Socher 将 Good 愿景商业化的尝试', tier: 'primary' },
        { title: 'MIRI 对 Chollet 的回复 (2017)', url: 'https://intelligence.org/2017/12/06/chollet/', relevance: '理解正反双方核心分歧的最佳单一来源', tier: 'primary' },
      ],
    },
    {
      id: 'self-play',
      title: '自我对弈',
      thesis: 'AlphaZero 证明了"零人类数据"的自改进在封闭规则系统中可行。但它的成功依赖三个前提：清晰可自动评估的奖励信号、封闭规则空间、大量计算资源。这些在开放世界中不自动成立。',
      intuitions: [
        { id: 'self-play-1', text: 'AlphaZero 从零开始 4 小时超越 Stockfish。具体：每步 1,600 次 MCTS 模拟，每代 25,000 局自对弈，新旧网络 400 局验证 55% 阈值替换，共 200 代。Magnus Carlsen 后来在正式比赛中采用了 AlphaZero 首创的侧翼兵推进策略。', type: 'fact', sources: [0, 1] },
        { id: 'self-play-2', text: '硬件不对称是一个重要的 methodological caveat：AlphaZero 跑在 TPU 上，Stockfish 跑在 CPU 上。论文注释 23 承认此差异。部分提升可能来自硬件优势——虽然策略创新是真实的，但"4 小时超越"的比较不能直接归因于纯算法优势。', type: 'opinion', sources: [0, 1] },
        { id: 'self-play-3', text: '演进路径 AlphaGo（需人类棋谱）→ AlphaGo Zero（纯自对弈）→ AlphaZero（跨三游戏泛化）示范了"逐步移除人类先验"的模式，正被复制到算法发现领域（AutoML-Zero → AlphaEvolve）。', type: 'opinion', sources: [2] },
        { id: 'self-play-4', text: 'OpenAI Five（Dota 2）和 AlphaStar（StarCraft II）展示在更复杂、不完全信息游戏中的扩展，但也暴露边界：训练需 10 个月，泛化受限。规则越复杂、信息越不完全，自对弈的效率会有明显下降——这是一个从多个案例中观察到的模式。', type: 'opinion', sources: [2] },
      ],
      pros: ['零标注数据', '发现人类未想到的策略', '自对弈的"对手即评估器"模式可迁移'],
      cons: ['依赖封闭规则和清晰奖励', '硬件不对称使部分提升难以归因', '开放域扩展仍困难'],
      articles: [
        { title: 'AlphaZero 论文 — Science (2018)', url: 'https://www.science.org/doi/10.1126/science.aar6404', relevance: '里程碑论文', tier: 'primary' },
        { title: 'AlphaZero 技术解析 — TDS', url: 'https://towardsdatascience.com/alphazero-chess-how-it-works-what-sets-it-apart-and-what-it-can-tell-us-4ab3d2d08867/', relevance: '技术细节全解，大师级棋手撰写', tier: 'primary' },
        { title: '自我对弈 RL 通俗讲解 — Medium', url: 'https://medium.com/biased-algorithms/self-play-reinforcement-learning-for-strategic-games-886cf4b9baf8', relevance: 'AlphaGo→AlphaZero→MuZero→OpenAI Five', tier: 'supporting' },
      ],
    },
    {
      id: 'algorithm-discovery',
      title: '算法自动发现与基础设施优化',
      thesis: 'AlphaEvolve 证明 LLM 引导的进化搜索可在生产环境发现优于人类设计的算法。但核心约束是"可验证性"：必须有人工设计的自动评估器，否则进化循环无选择压力。',
      intuitions: [
        { id: 'algorithm-discovery-1', text: '四个生产级成果：(1) Google Borg 调度恢复 0.7% 全球算力；(2) Gemini 内核提速 23%（训练时间减 1%）；(3) FlashAttention GPU 内核提速 32.5%；(4) TPU 电路将进下一代 TPU。', type: 'fact', sources: [0, 1] },
        { id: 'algorithm-discovery-2', text: '被低估的自指性：AlphaEvolve 优化的 Gemini 内核正用于训练 AlphaEvolve 内部的 LLM——AI 在加速训练自己的组件。循环已闭合但范围窄（仅限特定内核）。1% 训练时间节省在多代训练中产生复利。', type: 'opinion', sources: [0, 1] },
        { id: 'algorithm-discovery-3', text: 'AutoML-Zero (2020) 是学术前身：从基本数学运算进化出 SGD、反向传播、归一化梯度。但未成为持续研究方向——可能的解释是从零开始的搜索空间太大，LLM 引导的搜索效率高出几个数量级，使得 AutoML-Zero 的纯进化方法在实践上被取代。', type: 'opinion', sources: [2, 3] },
        { id: 'algorithm-discovery-4', text: 'DeepMind 自述的核心约束："需要自动化评估指标……排除了需要人工实验的任务。"这意味着在没有可量化目标函数的领域（营销、战略、创意），AlphaEvolve 的搜索循环无法建立——这个约束被认为是方法论的根限，而非暂时性的工程障碍。', type: 'opinion', sources: [0, 5] },
        { id: 'algorithm-discovery-5', text: '已有开源项目在部分问题上复现并超越了 AlphaEvolve 的结果，使用的是开源权重模型。这暗示 AlphaEvolve 的方法论优势可能在工程规模和应用广度上，而非模型质量——技术壁垒比表面看起来低。', type: 'opinion', sources: [4] },
      ],
      pros: ['生产级成果（Google 全球算力）', '自指性循环部分闭合', '跨域通用性已验证（芯片→基因组→物流）'],
      cons: ['受可验证性约束——多数问题无客观评分器', '无法改进自身搜索过程', '开源复现已超越，技术壁垒有限'],
      articles: [
        { title: 'AlphaEvolve 发布 — DeepMind (2025)', url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/', relevance: '核心发布：架构、方法、初始成果', tier: 'primary' },
        { title: 'AlphaEvolve 影响力 — DeepMind (2026)', url: 'https://deepmind.google/blog/alphaevolve-impact/', relevance: '基因组学、量子、物流数据', tier: 'primary' },
        { title: 'AutoML-Zero 论文 (2020)', url: 'https://arxiv.org/abs/2003.03384', relevance: '学术前身', tier: 'supporting' },
        { title: 'AutoML-Zero 通俗版 — Google Blog', url: 'https://research.google/blog/automl-zero-evolving-code-that-learns/', relevance: '入门解读', tier: 'supporting' },
        { title: 'CodeEvolve 论文 (2025)', url: 'https://arxiv.org/html/2510.14150v2', relevance: '开源复现，4 问题上超越原版', tier: 'counterpoint' },
        { title: 'AlphaEvolve 独立评测 — Ernest Davis (NYU)', url: 'https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf', relevance: '学术评审：增量性质、TPU 改进被独立发现', tier: 'counterpoint' },
        { title: 'Self-Improving AI Guide 2026 — o-mega', url: 'https://o-mega.ai/articles/self-improving-ai-agents-the-2026-guide', relevance: '可验证性约束系统分析', tier: 'supporting' },
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
        { title: 'Nested Learning 官方 — Google Research (2025)', url: 'https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/', relevance: '核心理论、三大技术贡献、HOPE', tier: 'primary' },
        { title: 'HOPE 详解 — AI Papers Academy (2026)', url: 'https://aipapersacademy.com/nested-learning-hope/', relevance: 'NLM、CMS、自修改机制、benchmark', tier: 'primary' },
        { title: 'Nested Learning 论文 — NeurIPS 2025', url: 'https://arxiv.org/abs/2512.24695', relevance: '原始论文', tier: 'primary' },
        { title: 'HOPE 独立评测 — Chris Paxton', url: 'https://itcanthink.substack.com/p/paper-notes-nested-learning', relevance: '指出 scale 局限', tier: 'counterpoint' },
        { title: 'Darwin Godel Machine — Sakana AI', url: 'https://sakana.ai/darwin-godel-machine/', relevance: 'SWE-bench 20%→50%', tier: 'primary' },
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
        { title: 'Recursive 融资报道 — TNW (2026)', url: 'https://thenextweb.com/news/recursive-superintelligence-self-improving-ai-funding', relevance: '最详细人物+路线图，含批判视角', tier: 'primary' },
        { title: 'Recursive 解读 — Unite.AI', url: 'https://www.unite.ai/recursive-superintelligence-raises-650-million-to-pursue-self-improving-ai/', relevance: '开放式进化+rainbow teaming', tier: 'primary' },
        { title: 'IEEE Spectrum RSI 全景 (2026)', url: 'https://spectrum.ieee.org/recursive-self-improvement', relevance: '覆盖所有玩家和专家观点', tier: 'primary' },
        { title: 'Dean Ball: 论 RSI (2026)', url: 'https://www.hyperdimensional.co/p/on-recursive-self-improvement-part', relevance: '冷静分析：最重要的不是是否而是如何', tier: 'primary' },
        { title: 'SSI 官网 (Sutskever)', url: 'https://ssi.inc', relevance: '安全优先路线，$32B，零产品', tier: 'supporting' },
      ],
    },
    {
      id: 'skepticism',
      title: '质疑、摩擦与边界',
      thesis: '反对智能爆炸的论点有三层：哲学层（Chollet：智能是 situated 的，不能脱离环境无限放大）；工程层（Lambert：自改进伴随递增摩擦）；认知层（Harjas：即使 LLM 到不了 AGI，也可能加速发现其他路径——怀疑论者做的最强 alarmist case）。',
      intuitions: [
        { id: 'skepticism-1', text: 'Chollet 五条核心反驳：(1) 智能依赖情境——野孩子无人类文化不发展人类智能；(2) IQ 130 以上与现实成就相关性断裂；(3) 多数智能外化为文明——单个大脑无法设计比自己更聪明的；(4) 历史上无一人做到；(5) 递归系统实践中呈 S 形增长——边际递减、瓶颈、对抗性摩擦。', type: 'opinion', sources: [0] },
        { id: 'skepticism-2', text: 'Yudkowsky 的反驳：AlphaGo Zero 三天超越人类几世纪围棋知识——单个自包含系统做到了分布式人类智慧做不到的。但 Chollet 会说围棋是封闭系统——这正是争论核心：开放系统的自改进是否遵循同样模式。', type: 'opinion', sources: [5] },
        { id: 'skepticism-3', text: 'Lambert 的"有损自改进"(LSI) 框架：三个递增摩擦——(1) 可自动化的研究太窄（优化单 benchmark 易，多指标不退化是 90% 难度）；(2) 并行 agent 的 Amdahl 定律；(3) 资源瓶颈和组织政治。"每个 sigmoid 底部像指数"——GPT-4 scaling、o1 reasoning 都趋平了。', type: 'opinion', sources: [1] },
        { id: 'skepticism-4', text: 'Harjas 的"技术树"论证：即使 LLM 到不了 AGI，它们仍可通过自动化研究加速发现正确技术分支（如神经符号 AI）。你不需相信 LLM 能成 AGI，只需信它能帮人类找到 AGI 的正确道路。这是怀疑论者做的最强 alarmist case。', type: 'opinion', sources: [2] },
        { id: 'skepticism-5', text: 'Ball 的"分布式知识"反驳：TSMC 能力来自 9 万互动员工而非一个大脑。统治世界需运营实验室、谈判政治、开采矿物——不只是智力问题。与 Chollet 的"智能外化"一脉相承，但更聚焦工程现实。', type: 'opinion', sources: [3] },
        { id: 'skepticism-6', text: '可验证性约束（从 AlphaEvolve 泛化到全领域）：所有自改进系统只在有客观评分器的领域工作。无清晰"好坏"标准的领域连选择压力都建立不起来。这不是计算问题——不知道如何构造改进信号。如果无解，自改进将永限于可量化子集。', type: 'opinion', sources: [4] },
      ],
      pros: ['防过度乐观——历史上几乎所有"指数"预测低估摩擦', 'Lambert LSI 提供可操作工程分析', 'Harjas 揭示"需 AGI 才有 RSI"这个被忽视的区分'],
      cons: ['AlphaGo Zero 反例动摇 Chollet 核心论证', '"分布式知识"可能低估 AI 获取整合知识的能力', '过于保守可能错过突破——类似 1990s 对互联网的怀疑'],
      articles: [
        { title: '智能爆炸的不可能性 — Chollet (2017)', url: 'https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec', relevance: '五条论证，最著名反驳', tier: 'primary' },
        { title: '有损自改进 — Lambert (2026)', url: 'https://www.interconnects.ai/p/lossy-self-improvement', relevance: '工程摩擦分析', tier: 'primary' },
        { title: 'AI 怀疑论者的 RSI 论证 — Harjas (2026)', url: 'https://www.greaterwrong.com/posts/Fy2fLPKgb8K3sWuRn/an-ai-skeptic-s-case-for-recursive-self-improvement', relevance: '技术树框架', tier: 'primary' },
        { title: 'IEEE Spectrum RSI 全景 (2026)', url: 'https://spectrum.ieee.org/recursive-self-improvement', relevance: '含 Ball、Krueger、Clune 审慎观点', tier: 'primary' },
        { title: 'AlphaEvolve 独立评测 — Davis (NYU)', url: 'https://cs.nyu.edu/~davise/papers/AlphaEvolveNotes.pdf', relevance: '可验证性约束证据', tier: 'supporting' },
        { title: 'MIRI 对 Chollet 回复 (2017)', url: 'https://intelligence.org/2017/12/06/chollet/', relevance: 'Yudkowsky 逐条反驳', tier: 'counterpoint' },
      ],
    },
  ],
  tensions: [
    {
      id: 'tension-explosion',
      question: '智能爆炸：必然逻辑还是不可能的前提？',
      positions: [
        { side: '正方 (MIRI/Yudkowsky)', argument: '如果 AI 能改进自己，每次改进降低下次成本，正反馈必然爆炸。AlphaGo Zero 三天超越人类几世纪围棋知识证明单个系统可超分布式智慧。核心不在于是否发生，在于是否准备好。' },
        { side: '反方 (Chollet)', argument: '智能不是可无限放大的标量。需传感器、环境、文化共进化。历史上无一人设计出比自己聪明的。所有递归系统实践呈 S 形增长——边际递减、瓶颈积累。AlphaGo Zero 在封闭系统有效正说明开放系统是不同问题。' },
        { side: '中间 (Lambert/LSI)', argument: '自改进真实但非指数。"每个 sigmoid 底部像指数"——GPT-4 scaling、o1 reasoning 都趋平了。自改进同受限于：可自动化研究范围窄、并行 Amdahl 定律、组织政治约束。' },
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
      id: 'tension-individual-vs-distributed',
      question: '单个系统能超越分布式人类智慧吗？',
      positions: [
        { side: '个体论者 (Yudkowsky)', argument: 'AlphaGo Zero 单个系统三天超人类几世纪围棋智慧。Kasparov vs The World 也输了。人类并行低效——沟通成本 N(N-1)/2。单个足够强的系统可胜任何规模分布式协作。' },
        { side: '分布式论者 (Chollet/Ball)', argument: '围棋和芯片制造不同。TSMC 能力来自 9 万互动员工。要实际改变需物理基础设施、供应链、政治谈判——不只是智力。知识隐性的、分布式的、嵌入组织文化。单个 AI 无法复制这种复杂性。' },
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
    ifYouHave5Min: ['conceptual-origins-1', 'self-play-1', 'algorithm-discovery-1', 'continual-learning-3', 'industry-frontier-1', 'skepticism-1'],
    ifYouHave30Min: ['conceptual-origins-1', 'conceptual-origins-2', 'conceptual-origins-4', 'self-play-1', 'self-play-2', 'self-play-3', 'algorithm-discovery-1', 'algorithm-discovery-2', 'algorithm-discovery-4', 'continual-learning-2', 'continual-learning-3', 'continual-learning-5', 'industry-frontier-1', 'industry-frontier-2', 'industry-frontier-4', 'skepticism-1', 'skepticism-3', 'skepticism-4', 'skepticism-6'],
  },
};

export default fieldMap;
