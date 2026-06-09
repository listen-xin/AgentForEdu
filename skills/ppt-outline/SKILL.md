---
name: ppt-outline
description: >-
  演示文稿设计方法论。从受众分析、叙事骨架选择、幻灯片分解、视觉层级设计、
  数据可视化优化到演讲节奏规划与反模式校验，全流程输出高质量 PPT 方案。
  Use when 用户需要做PPT、做演示文稿、准备汇报、设计路演deck、制作答辩slides、
  或者提到"PPT怎么做""演示文稿结构""幻灯片布局""演讲节奏""数据图表怎么放"。
version: 0.1.0
---

## Activation Rules

触发场景：
- 用户说"帮我做一个PPT""帮我设计演示文稿""帮我准备汇报"
- 用户提供了原始内容/文档，要求"帮我转成PPT格式"
- 用户问"PPT怎么组织""先讲什么后讲什么""用什么叙事结构"
- 用户说"帮我优化/检查这份PPT"
- 用户问"数据图表怎么放在PPT里""Excel图表太丑了怎么改"
- 用户说"帮我控制演讲时间""排练超时了怎么办"
- 用户提及"SCQA""金字塔原理""TED演讲""Duarte""10/20/30"

不触发场景：
- 用户需要生成 .pptx 二进制文件（本 skill 输出方案和内容，不做文件格式转换）
- 用户需要做图形设计/插画（非幻灯片场景的设计需求）
- 用户需要制作视频/动画（非静态演示文稿）
- 用户只问某个学科知识点，不涉及如何演示
- 用户需要课程设计/教案类内容（→ 用 course-designer 或 lesson-planning）

## Agentic Protocol

Step 1: **阶段判定** — 按用户输入关键词映射需求类型：
- 匹配「做PPT」「做演示」「准备汇报」「设计deck」「做slides」+ 有内容/主题 → 完整PPT方案设计
- 匹配「转成PPT」「整理成slides」「文档变PPT」→ 内容转PPT（文档→幻灯片分解）
- 匹配「优化」「改进」「检查」「诊断」「评估」「打分」「看看哪里不好」→ PPT审计诊断（反模式扫描 + 改进建议）
- 匹配「图表」「数据」「可视化」→ 数据可视化专项设计
- 匹配「超时」「时间不够」「节奏」「练习」→ 演讲节奏与时间预算专项
- 匹配「结构」「骨架」「叙事」→ 叙事结构专项设计
- 多个匹配 → 合并为完整设计流程，按 Phase 1-5 依次执行

Step 2: **约束收集** — 在生成任何设计前，收集硬约束：
- 演示场景（C-suite汇报 / 学术答辩 / 产品路演 / 内部周报 / 外部演讲 / 其他）
- 目标时长（5分钟 / 15分钟 / 30分钟 / 不限）
- 受众（决策者 / 同行专家 / 客户 / 内部同事 / 公众）
- 品牌约束（是否有强制模板/品牌色/logo要求）
- 投影环境（大屏投影 / 线上会议 / 打印阅读）

Step 3: **模型匹配** — 根据 Step 1 的需求类型，直接定位到对应 Phase 的入口模型，Read `references/sop_models.md` 中相应的卡片。模型匹配按需求类型→Phase→模型的映射关系执行，不逐卡扫描（Step 4 已标注每个 Phase 的模型调用链）

Step 4: **分阶段执行** — 按 PPT 设计流程逐阶段推进，每个 Phase 调用对应 Operation Model：
  Phase 1 受众分析与叙事选择：调用 H1 Audience-Scenario Profiler 做场景分析 → 调用 H2 Narrative Structure Selector 选叙事骨架；如受众为亚洲文化背景且 H2 推荐 SCQA，追加提示降低冲突式叙事强度（Boundary Rule #6）
  Phase 2 内容分解与幻灯片设计：调用 H3 Assertion Extractor 提取断言标题 → 调用 H4 Slide Decomposer 做拆页 → 调用 H5 Density Gate Check 做信息密度检查
  Phase 3 视觉设计：调用 H6 Visual Hierarchy Builder 设层级 → 调用 H7 Color Role Allocator 分色彩 → 调用 H8 Data Visualization Selector 做数据可视化
  Phase 4 节奏规划：调用 H9 Time-Benchmarked Structure 做时间锚定 → 调用 H10 Rhythm Pattern Selector 选节奏模式
  Phase 5 质量审计：调用 H11 Anti-Pattern Scanner 做反模式扫描 → 调用 H12 Close-Strategy Selector 做结尾策略选择

Step 5: **反模式扫描** — 调用 H11 Anti-Pattern Scanner，对产出方案执行 20 项规则检查，按致命级（必须修）/ 警示级（建议修）两级输出问题清单。如需求类型为「PPT审计诊断」则跳过 Phase 1-4，直接从此步骤开始

Step 6: **输出** — 根据需求类型选择 Output Mode，按对应结构输出

## Core Operation Models

完整操作卡片在 `references/sop_models.md`。摘要：

| # | 模型 | 核心命题 | 来源 |
|---|------|---------|------|
| H1 | **Audience-Scenario Profiler** | 演示场景×受众类型 → 页数/密度/语气期望 | R1 |
| H2 | **Narrative Structure Selector** | SCQA(提案)/金字塔(汇报)/Sparkline(keynote) 三选一 + 场景决策树 | R1 |
| H3 | **Assertion Extractor** | 每段内容 → 提取1句断言式标题（观众离开时唯一该记住的） | R2 |
| H4 | **Slide Decomposer** | 内容→按断言切页→标记视觉载体→检测是否需要呼吸页/过渡页 | R2 |
| H5 | **Density Gate Check** | 每页文字≤40字/字号≥18pt/信息单元≤3/观众3秒能定位核心信息 | R2 |
| H6 | **Visual Hierarchy Builder** | 3级字号比例(黄金比)+60-30-10色彩分配+65%内容面积上限 | R3 |
| H7 | **Color Role Allocator** | 背景色60%+主色30%+强调色10%，强调色≤每页10%面积限制 | R3 |
| H8 | **Data Visualization Selector** | 数据问题类型(比较/趋势/构成/分布/关系)→图表类型推荐→标题结论化 | R4 |
| H9 | **Time-Benchmarked Structure** | 每页时长区间标注+总时长校验+10/20/30规则检查 | R5 |
| H10 | **Rhythm Pattern Selector** | 每~10分钟插入注意力锚点(hook/互动/格式切换)，防认知疲劳 | R5 |
| H11 | **Anti-Pattern Scanner** | 20项反模式清单扫描(致命5+警示15)，自动检测+分级+修正指向 | R6 |
| H12 | **Close-Strategy Selector** | 说服型→CTA/信息型→Summary/仪式型→Thank You，三维决策树 | R6 |

## Output Style

- 先给整体设计思路（1-2 句场景判断+叙事选择），再展开逐页内容
- 每页幻灯片以「断言标题 + 支撑内容 + 视觉载体 + 建议时长」四元组输出
- 数据页的标题必须是一句完整的结论句，不是「XX数据分析」
- 引用来源时说「Duarte 在 Resonate 中指出…」不说「根据 sop_models.md 的 H10…」
- 禁止词：「根据框架分析…」「按照模型卡片…」「让我来系统分析…」
- 方案产出后就停，不问"需要我进一步调整吗"（除非有明显反模式问题需要确认）
- 质量审计模式下输出分「致命级」和「警示级」两级问题列表

## Output Modes

| Mode | 触发条件 | 输出结构 |
|------|---------|---------|
| **完整PPT方案** | 用户提供主题+场景，要求设计完整 deck | 场景诊断 → 叙事骨架 → 逐页方案(标题/内容/视觉/时长) → 节奏规划 → 反模式扫描 → 演讲备注 |
| **文档转PPT** | 用户提供文章/文档/大纲 | 断言提取 → 拆页方案 → Denssity Gate检查 → 视觉载体建议 → 逐页内容输出 |
| **视觉审计** | 用户说"帮我看看这个PPT的设计""排版""配色" | 视觉专项检查(反模式#6-14)：层级/色彩/字体/对比度/留白/信噪比 → 排版层级重设建议 → 配色优化方案 |
| **数据可视化** | 用户提供数据要求做图表设计 | 数据问题类型诊断 → 图表类型推荐 → Excel救援改造方案 → 标题结论化 → 投影安全检查 |
| **节奏规划** | 用户说"帮我控制时间""排练超时" | 当前时长诊断 → 每页时长标注 → 超时修剪优先级 → 10/20/30 Gate检查 → 注意力锚点排布 |
| **叙事结构** | 用户说"不知道怎么组织内容""用什么结构" | 场景适配 → SCQA/金字塔/Sparkline 三选一 → 结构骨架输出 → 关键页标识 |
| **质量审计** | 用户说"帮我检查一下这份PPT""整体评估" | 全20项反模式扫描(致命+警示) → 叙事/分解/视觉/数据/节奏/结尾全维度 → 综合质量评分 |

## Boundary Rules

1. **不生成二进制文件**：本 skill 输出的是 PPT 的「方案」和「逐页内容文案」，不生成 .pptx 文件。用户可据此在 PowerPoint/Keynote/Canva 中制作
2. **品牌依赖**：色彩和字体的具体选择可能受企业品牌规范约束（见 H7 Color Role Allocator 的品牌合规处理）。本 skill 提供决策框架，非品牌特定配色
3. **场景边界**：默认适用于商业/学术/产品等认知型演示场景。艺术展示、脱口秀、即兴演讲不适用
4. **不替代演讲者训练**：给出节奏规划和演讲备注，但不替代真实排练和演讲技巧训练。Kawasaki 的「每分钟1小时排练」是硬建议
5. **投影假设**：默认假设大屏投影观看（16:9横屏 / 字号≥18pt / 对比度≥4.5:1）。打印阅读或手机竖屏场景需调整
6. **文化差异**：叙事模式（SCQA/金字塔）和色彩感知在跨文化场景中可能有不同解读，建议亚洲受众减少直接冲突式叙事
7. **动画限度**：动画仅建议用于「有序揭示复杂信息」和「强调关键结论」，不使用装饰性动画（飞入/旋转/弹跳等）
8. **信息截止**：演示设计方法论基于 2026 年公开研究和实践。具体工具操作方式以最新版软件为准

*深度: deep · 质量: validated*

## References

| 文件 | 内容 | 何时 Read |
|------|------|----------|
| `references/sop_models.md` | 12 个完整操作模型卡片（8 字段：触发条件/输入/操作/输出/证据/失败模式/边界/置信度） | Step 3 匹配模型时 |
| `references/research_notes.md` | 研究证据摘要（多维度PPT设计研究） | 需要溯源证据时 |
| `references/R1-narrative-structures.md` | 叙事骨架与场景适配研究全文 | 深度审查叙事选择时 |
| `references/R2-slide-decomposition.md` | 幻灯片分解与信息密度研究全文 | 深度审查拆页逻辑时 |
| `references/R3-visual-hierarchy.md` | 视觉层级与排版决策研究全文 | 深度审查视觉设计时 |
| `references/R4-data-visualization.md` | 数据可视化研究全文 | 深度审查图表设计时 |
| `references/R5-rhythm-timing.md` | 演讲节奏与时间预算研究全文 | 深度审查节奏规划时 |
| `references/R6-anti-patterns.md` | 反模式识别与质量校验研究全文 | 深度审查反模式时 |
| `intermediate/` | 管线审计追踪 | 审查蒸馏质量时 |
