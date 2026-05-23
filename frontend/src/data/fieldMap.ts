// ============================================================
// FieldMap data model — types + seed data for AI self-evolution
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
  sources: number[]; // indices into region.articles
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
  ifYouHave5Min: string[];  // intuition IDs
  ifYouHave30Min: string[];
}

// ============================================================
// Seed data: AI 自进化（递归自我改进）
// Based on curated reading list, not full deep research pipeline.
// Intuitions labeled as 'opinion' where they involve causal claims
// or value judgments; 'fact' where publicly verifiable.
// ============================================================

const fieldMap: FieldMap = {
  field: 'AI 自进化（递归自我改进）',
  overview:
    'AI 能否改进自己的代码、架构和学习过程？从 1965 年 I.J. Good 提出"智能爆炸"假设，到 2026 年 Recursive Superintelligence 以 6.5 亿美元融资将这个方向变成一个赛道——这个领域经历了从哲学思辨到工程实践、从学术角落到资本焦点的转变。核心问题仍未解决：自我改进的上限在哪里？它会导致不可控的智能爆炸，还是会在某个瓶颈处自然停滞？',
  lastUpdated: '2026-05-22',

  regions: [
    {
      id: 'conceptual-origins',
      title: '概念与思想起源',
      thesis: 'AI 自进化的思想起源于 1965 年的"智能爆炸"假设：足够智能的 AI 可以设计比自己更智能的后继者，形成正反馈循环。',
      intuitions: [
        {
          id: 'conceptual-origins-1',
          text: '"智能爆炸"假设的核心逻辑：如果 AI 能够改进自己的代码，每次改进都提升它进一步改进自己的能力，智能增长可能是指数级的。第一个 ultraintelligent machine 可能是人类的最后一个发明。',
          type: 'fact',
          sources: [0],
        },
        {
          id: 'conceptual-origins-2',
          text: 'MIRI 对智能爆炸的论证框架：不是"一定会发生"，而是"如果发生，后果极其重大，因此值得提前研究安全措施"。这个框架把讨论从预测转向了风险管理。',
          type: 'opinion',
          sources: [1],
        },
        {
          id: 'conceptual-origins-3',
          text: '2026 年的主流叙事已经从哲学思辨转向工程可行性讨论，标志是 Recursive Superintelligence 的 6.5 亿美元融资。讨论不再停留在"是否可能"，而是"如何做到、风险是什么"。',
          type: 'fact',
          sources: [2],
        },
      ],
      pros: ['逻辑简洁优雅', '如果成立，后果极其重大，值得提前研究', '为后续工程探索提供了概念地基'],
      cons: [
        '依赖多个未经检验的前提假设（智能可标量化、改进可迭代、边际回报不递减）',
        '历史上多次 AI 预测落空削弱了这类推论的信用',
      ],
      articles: [
        {
          title: 'I.J. Good — 关于第一台超智能机器的思辨 (1965)',
          url: 'https://www.historyofinformation.com/detail.php?id=2142',
          relevance: '"智能爆炸"概念的原始出处',
          tier: 'primary',
        },
        {
          title: '智能爆炸 FAQ — 机器智能研究所 (MIRI)',
          url: 'https://intelligence.org/ie-faq/',
          relevance: '最系统的智能爆炸论证框架，从风险管理角度切入',
          tier: 'primary',
        },
        {
          title: '当 AI 开始构建自己 — TechCrunch (2026)',
          url: 'https://techcrunch.com/2026/05/14/what-happens-when-ai-starts-building-itself/',
          relevance: '当下视角的最佳入门，连接历史概念与当前进展',
          tier: 'primary',
        },
      ],
    },
    {
      id: 'self-play',
      title: '自我对弈',
      thesis: 'AI 通过和自己博弈从零成为超人类高手的第一个成功案例，证明了"不需要人类数据、不需要人类指导"的自我改进路径在封闭规则系统中可行。',
      intuitions: [
        {
          id: 'self-play-1',
          text: 'AlphaZero 从零开始，只靠自我对弈和游戏规则，4 小时内超越所有人类棋谱训练的传统引擎。它的突破在于：不依赖人类专家数据，而是通过与自己下棋发现人类从未想过的策略。',
          type: 'fact',
          sources: [0],
        },
        {
          id: 'self-play-2',
          text: '自我对弈的关键前提是清晰、可自动评估的奖励信号（胜负）。这是它在围棋、国际象棋中有效，但在大多数真实世界问题中受限的根本原因——大多数问题没有"胜负"只有"好坏"，而"好坏"往往需要人来定义。',
          type: 'opinion',
          sources: [1],
        },
        {
          id: 'self-play-3',
          text: 'AlphaZero 的成功启发了一整类"自对弈 + 搜索"的方法，但都面临同一个边界：当规则不完全已知或奖励稀疏时，自对弈的效率急剧下降。把封闭游戏的方法搬到开放世界，不是简单放大计算量能解决的问题。',
          type: 'opinion',
          sources: [2],
        },
      ],
      pros: ['不需要标注数据，学习成本极低', '在封闭规则系统中表现出超人类水平', '发现的策略可能超出人类经验范围'],
      cons: [
        '依赖封闭规则和清晰奖励信号',
        '扩展到开放域仍然困难',
        '计算资源需求巨大（AlphaZero 训练需要数千 TPU）',
      ],
      articles: [
        {
          title: '通过自我对弈掌握国际象棋与将棋 — AlphaZero (Science, 2018)',
          url: 'https://www.science.org/doi/10.1126/science.aar6404',
          relevance: '自我对弈方法的里程碑论文',
          tier: 'primary',
        },
        {
          title: 'AlphaZero 是如何工作的 — Towards Data Science',
          url: 'https://towardsdatascience.com/alphazero-chess-how-it-works-what-sets-it-apart-and-what-it-can-tell-us-4ab3d2d08867/',
          relevance: '技术原理解析，适合非强化学习背景的读者',
          tier: 'supporting',
        },
        {
          title: '策略游戏中的自我对弈强化学习 — Medium',
          url: 'https://medium.com/biased-algorithms/self-play-reinforcement-learning-for-strategic-games-886cf4b9baf8',
          relevance: '通俗讲解自对弈 RL 的通用框架',
          tier: 'supporting',
        },
      ],
    },
    {
      id: 'algorithm-discovery',
      title: '算法发现',
      thesis: 'AlphaEvolve 代表了 AI 从"玩得好"到"设计得好"的跃迁——AI 不只是在规则内优化，而是在设计解决问题的新算法，且产出在某些指标上超过了人类设计的版本。',
      intuitions: [
        {
          id: 'algorithm-discovery-1',
          text: 'AlphaEvolve 用 Gemini 作为 coding agent，自动设计出排序、哈希等基础算法的新变体，在某些 benchmark 上性能超越人类最优实现。核心机制是"生成-评估-迭代"循环。',
          type: 'fact',
          sources: [0],
        },
        {
          id: 'algorithm-discovery-2',
          text: 'AutoML-Zero (2020) 是 AlphaEvolve 的前身。它的核心洞察：机器学习算法本身可以用进化算法从零"长出来"，不需要人类设计。用最基本的数学运算（加减乘除）组合出可工作的 ML pipeline。',
          type: 'fact',
          sources: [2, 3],
        },
        {
          id: 'algorithm-discovery-3',
          text: 'AI 设计的芯片已经在工程实践中使用。芯片布局布线优化被 AI 接手后，设计周期从数月缩短到数小时——这不是 demo，是已经在生产环境中跑的东西。',
          type: 'fact',
          sources: [4],
        },
        {
          id: 'algorithm-discovery-4',
          text: '这些成果的共同局限：AI 发现的算法在特定 benchmark 上优于人类，但在泛化性、可解释性和实际部署的工程适配性上仍有差距。benchmark 上的领先不等于生产环境里更好用。',
          type: 'opinion',
          sources: [1],
        },
      ],
      pros: [
        '已产生可验证的实用成果（芯片设计）',
        '自动化了原本需要大量专家时间的优化工作',
        '发现的算法可能打破人类的设计惯性',
      ],
      cons: [
        '最佳结果依赖大量计算资源',
        '发现的算法往往是"黑盒优化"而非理论突破',
        'benchmark 上的提升是否能迁移到真实场景仍然不确定',
      ],
      articles: [
        {
          title: 'AlphaEvolve: 用 AI 设计先进算法 — Google DeepMind (2025)',
          url: 'https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/',
          relevance: '算法自动发现的核心工作',
          tier: 'primary',
        },
        {
          title: 'AlphaEvolve 的实际影响 — Google DeepMind (2026)',
          url: 'https://deepmind.google/blog/alphaevolve-impact/',
          relevance: '从 demo 到实际应用的进展',
          tier: 'primary',
        },
        {
          title: 'AutoML-Zero: 从零进化出机器学习算法 (2020)',
          url: 'https://arxiv.org/abs/2003.03384',
          relevance: 'AlphaEvolve 的前身，算法自动发现的概念验证',
          tier: 'supporting',
        },
        {
          title: 'AutoML-Zero 通俗版 — Google Research Blog',
          url: 'https://research.google/blog/automl-zero-evolving-code-that-learns/',
          relevance: 'AutoML-Zero 的入门解读',
          tier: 'supporting',
        },
        {
          title: '用 AI 设计 AI 芯片 — IEEE Spectrum',
          url: 'https://spectrum.ieee.org/recursive-self-improvement',
          relevance: 'AI 优化硬件的实际案例，展示了从算法到芯片的落地路径',
          tier: 'primary',
        },
      ],
    },
    {
      id: 'continual-learning',
      title: '持续学习',
      thesis: '当前 LLM 训练完就被"冻结"，无法从使用中学习。嵌套学习提出了一种新范式：模型在推理过程中边用边学，知识积累不依赖重新训练。',
      intuitions: [
        {
          id: 'continual-learning-1',
          text: '"冻结模型"问题的实质：ChatGPT 的知识截止于训练数据。2024 年发生的事它不知道，除非重新训练——而重新训练的代价是数千万美元。持续学习试图在推理阶段就地更新知识。',
          type: 'fact',
          sources: [0],
        },
        {
          id: 'continual-learning-2',
          text: '嵌套学习的核心机制（HOPE 架构）：外层模型管理多个内层子任务，类似"元学习"——模型学会如何学习新任务，而不是记住所有训练数据。关键创新在于把学习过程本身变成模型的一个可优化行为。',
          type: 'fact',
          sources: [1, 2],
        },
        {
          id: 'continual-learning-3',
          text: 'Catastrophic forgetting 是持续学习的核心难题：学到新东西后忘记旧知识。嵌套学习通过隔离子任务来缓解，但代价是架构复杂度和推理时的额外计算开销。这个问题没有完美的解法，所有方案都在"记住"和"学到"之间做取舍。',
          type: 'opinion',
          sources: [1],
        },
      ],
      pros: ['解决了"冻结模型"的实际痛点', '架构设计有理论深度（元学习视角）', '与 LLM 的实际使用场景直接相关'],
      cons: [
        '仍在实验室阶段，未见大规模部署',
        '工程复杂度和计算开销高于传统 fine-tuning',
        'catastrophic forgetting 的 trade-off 尚未彻底解决',
      ],
      articles: [
        {
          title: '介绍嵌套学习：持续学习的新范式 — Google Research (2025)',
          url: 'https://research.google/blog/introducing-nested-learning-a-new-ml-paradigm-for-continual-learning/',
          relevance: '嵌套学习的官方介绍，包含核心概念和动机',
          tier: 'primary',
        },
        {
          title: '嵌套学习与 HOPE 架构详解 — AI Papers Academy',
          url: 'https://aipapersacademy.com/nested-learning-hope/',
          relevance: 'HOPE 架构的技术深度拆解',
          tier: 'supporting',
        },
        {
          title: '嵌套学习论文 — arXiv (2025)',
          url: 'https://arxiv.org/abs/2512.24695',
          relevance: '原始论文，包含完整的实验和理论分析',
          tier: 'primary',
        },
      ],
    },
    {
      id: 'industry-frontier',
      title: '产业前沿',
      thesis: '2026 年 5 月 Recursive Superintelligence 以 6.5 亿美元融资，标志着"自进化 AI"从学术方向变成了风险资本下注的赛道。参与者不再只是发论文，而是在押注产品化路径。',
      intuitions: [
        {
          id: 'industry-frontier-1',
          text: 'Recursive Superintelligence 的核心主张：构建能够自我改进的 AI 模型，目标是"开放式进化"——AI 可以无限改进自己，不限于特定任务或领域。这个叙事直接对标 AGI。',
          type: 'fact',
          sources: [0],
        },
        {
          id: 'industry-frontier-2',
          text: '"开放式进化"区别于 AlphaZero 的关键：AlphaZero 在固定的游戏规则内优化，开放式进化是规则本身也在演化——AI 不仅优化策略，还重新定义它要优化什么。这个区别在概念上是巨大的，在工程上目前几乎没有成熟的实现路径。',
          type: 'opinion',
          sources: [1],
        },
        {
          id: 'industry-frontier-3',
          text: '这一轮资本涌入的风险：6.5 亿美元的估值建立在"自进化可行且可控"这两个前提上，但两个前提目前在学术上都没有共识。投资押注的是"如果成立"的上行空间，不是"已经成立"的确认信号。',
          type: 'opinion',
          sources: [0, 1, 2],
        },
      ],
      pros: ['资本涌入加速了工程化探索', '吸引了顶级人才进入这个方向', '将学术讨论转化为可投资的产品路径'],
      cons: [
        '估值可能建立在未经验证的假设上',
        '融资叙事与学术共识之间存在巨大鸿沟',
        '泡沫破裂可能伤害整个方向的长期可信度',
      ],
      articles: [
        {
          title: 'Recursive Superintelligence 融资 6.5 亿美元 — SiliconANGLE (2026)',
          url: 'https://siliconangle.com/2026/05/13/recursive-superintelligence-raises-650m-build-self-improving-ai-models/',
          relevance: '融资事件的第一手报道',
          tier: 'primary',
        },
        {
          title: '深度解读：Recursive 与"开放式进化"理念 — Unite.AI',
          url: 'https://www.unite.ai/recursive-superintelligence-raises-650-million-to-pursue-self-improving-ai/',
          relevance: '对 Recursive 技术路线的分析和背景补充',
          tier: 'supporting',
        },
        {
          title: '递归自我改进正在 AI 实验室中逼近现实 — IEEE Spectrum',
          url: 'https://spectrum.ieee.org/recursive-self-improvement',
          relevance: '产业全景，包含多个实验室的进展和专家观点',
          tier: 'primary',
        },
      ],
    },
    {
      id: 'skepticism',
      title: '质疑与边界',
      thesis: '并非所有人都相信"智能爆炸"会自然发生。反对者的核心论点是：智能改进的边际回报递减、物理世界的约束、以及"更难的问题需要更多资源来解决"这一自限性——智能爆炸的前提假设可能本身就不成立。',
      intuitions: [
        {
          id: 'skepticism-1',
          text: 'Chollet 的核心反驳：智能不是单一的标量。解决更难的问题需要的不仅是更多"智能"，还需要更多数据、更好的反馈信号、更丰富的环境互动——这些东西不会随着 AI 自我改进而自动出现。把智能当作一个可以无限放大的标量，是对问题本质的误解。',
          type: 'opinion',
          sources: [0],
        },
        {
          id: 'skepticism-2',
          text: 'IEEE Spectrum 中的审慎观点：即使自进化在技术上可行，alignment 问题可能比能力问题更难。一个能自我改进的 AI 的行为边界可能无法预测，而无法预测的系统在安全上等同于不可控。',
          type: 'opinion',
          sources: [1],
        },
        {
          id: 'skepticism-3',
          text: '从历史看，几乎所有关于"指数级进步"的技术预测都低估了物理和社会约束。摩尔定律放缓、核聚变"永远还有 30 年"——技术乐观主义的系统性偏差是真实存在的，每代人都觉得自己站在奇点上。',
          type: 'opinion',
          sources: [0],
        },
      ],
      pros: ['防止过度乐观和泡沫', '提醒 alignment 问题的优先级', '基于可验证的历史模式而非理论推演'],
      cons: [
        '可能低估了 AI 区别于传统技术的特殊性',
        '历史类比可能不适用于软件系统的自我改进',
        '过于保守可能错过真正重要的突破',
      ],
      articles: [
        {
          title: '智能爆炸的不可能性 — François Chollet (Keras 作者)',
          url: 'https://medium.com/@francois.chollet/the-impossibility-of-intelligence-explosion-5be4a9eda6ec',
          relevance: '对智能爆炸概念的最著名反驳，从多角度论证其不可能性',
          tier: 'primary',
        },
        {
          title: '递归自我改进逼近现实 — IEEE Spectrum（含审慎观点）',
          url: 'https://spectrum.ieee.org/recursive-self-improvement',
          relevance: '平衡报道，包含专家对可行性和风险的审慎评估',
          tier: 'counterpoint',
        },
      ],
    },
  ],

  tensions: [
    {
      id: 'tension-explosion',
      question: '智能爆炸：必然逻辑还是不可能的前提？',
      positions: [
        {
          side: '正方：逻辑上必然',
          argument:
            '如果 AI 能改进自己，每次改进都降低下一次改进的成本，正反馈循环必然导致爆炸性增长。核心不在于它会不会发生，而在于我们是否准备好了。（MIRI, Good 1965）',
        },
        {
          side: '反方：前提不成立',
          argument:
            '智能改进有内在的边际递减。第一个 10% 改进可能容易，最后一个 1% 可能比前面加起来都难。更难的问题需要更多的数据、反馈和环境互动——这些东西不会凭空变出来。（Chollet 2017）',
        },
      ],
      status: 'active',
    },
    {
      id: 'tension-closed-to-open',
      question: '封闭系统的方法能扩展到开放世界吗？',
      positions: [
        {
          side: '正方：扩展路径清晰',
          argument:
            '自我对弈 → 算法发现 → 芯片设计，已经展示了从封闭到开放的迁移路径。每一步扩展只需要人类定义更宽松的搜索空间。（Google DeepMind 系列工作）',
        },
        {
          side: '反方：每步都需要人类定义新规则',
          argument:
            '每个扩展步骤都需要人类设计新的奖励函数或搜索空间。真正的"自己发现自己该优化什么"仍然没有发生。我们离"AI 自己决定优化什么"还有本质差距。（IEEE Spectrum 审慎观点）',
        },
      ],
      status: 'active',
    },
  ],

  readingPath: {
    ifYouHave5Min: [
      'conceptual-origins-1',
      'self-play-1',
      'algorithm-discovery-1',
      'continual-learning-1',
      'industry-frontier-1',
      'skepticism-1',
    ],
    ifYouHave30Min: [
      'conceptual-origins-1',
      'conceptual-origins-2',
      'conceptual-origins-3',
      'self-play-1',
      'self-play-2',
      'self-play-3',
      'algorithm-discovery-1',
      'algorithm-discovery-2',
      'algorithm-discovery-3',
      'algorithm-discovery-4',
      'continual-learning-1',
      'continual-learning-2',
      'continual-learning-3',
      'industry-frontier-1',
      'industry-frontier-2',
      'industry-frontier-3',
      'skepticism-1',
      'skepticism-2',
      'skepticism-3',
    ],
  },
};

export default fieldMap;
