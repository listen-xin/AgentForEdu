Status: pass

## Key Findings

### Finding 1: "Death by PowerPoint" is a Cognitive Failure, Not a Design Failure
The root cause of failed presentations is cognitive overload, not poor aesthetics. Research from Richard Mayer (UC Santa Barbara) and John Sweller (UNSW) converges on three mechanisms: the **Redundancy Effect** (reading text aloud while it's on screen reduces comprehension, Cohen's d = 0.72), **Cognitive Load Theory** (working memory handles only ~4 chunks at a time for under 30 seconds), and the **Dual-Channel Principle** (visual + auditory channels must be used in complementary, not competing, ways). A 2025 study of 52 UK medical school lectures found 84.4% of student exposure time involved text-heavy slides (mean 38.2 words/slide, median 1,531 words/deck), violating CTML principles systematically. Only 2% of lectures used visual signalling/highlighting.

### Finding 2: 88% of Presenters Report Shrinking Attention Spans, But the Problem is in the Slide Design
A 2024 AhaSlides survey of 1,048 U.S. professionals found 82.4% regularly experience audience distraction. The top causes are multitasking (48.3%), digital device use (43.9%), screen fatigue (41.9%), and lack of interactivity (41.7%). However, the "short attention span" narrative is partly a scapegoat: the University of Melbourne's attention decay research shows that monotonous, identically formatted slides create a signal the brain learns to ignore. Attention recovers when format changes — the brain responds to novelty, not duration. The fix is varied slide structure and interactivity every ~10 minutes, not simply fewer slides.

### Finding 3: The Final Slide is a Decision Tool, Not a Politeness Gesture
Ending with "Thank You" kills momentum, wastes the most valuable screen real estate (the slide people photograph and the last impression during Q&A), and passive politeness on-screen is weaker than a sincere verbal thank-you. Presentations with one clear CTA generate ~27% more leads/conversions than those ending with generic closings. An effective CTA slide needs: (a) one specific, singular ask, (b) large-font contact info designed for phone photos, (c) a one-line value reminder, and (d) optional social proof. The only valid exceptions are when the decision was pre-made, the presentation is purely informational with no expected action, or the audience lacks authority to act.

### Finding 4: The Animation Boundary is Defined by "Who Notices What"
The litmus test across all expert sources: "When animation works, the audience barely notices the effect itself. They notice the lesson feels easier to follow." Sequential reveals (Appear/Fade/Wipe) are evidence-backed for controlling cognitive load in educational and complex content. Animation becomes a killer when: everything moves, flashy effects replace subtle ones, timing is inconsistent, the effect style mismatches the message tone, animations compete with narration pace, or you cannot articulate a one-sentence purpose for each animation. Context determines acceptability: consulting/board decks are a hard no; training/educational content benefits; virtual presentations should avoid animation entirely due to streaming lag.

### Finding 5: NASA's Columbia Disaster Demonstrates That PowerPoint's Cognitive Style Can Be Literally Fatal
Edward Tufte's analysis of the Boeing slide presented to NASA before the 2003 Columbia disaster revealed how PowerPoint's hierarchical bullet structure buried critical safety warnings (lower-level bullets mentioned wing damage doubts) beneath an optimistic executive summary (top-level bullets). NASA remained convinced Columbia was safe, and all seven astronauts died. This is the extreme case, but the pattern is universal: PowerPoint's cognitive style rewards oversimplification, buries nuance in sub-bullets, and reduces analytical quality when critical information is structured as bullet hierarchies rather than prose reasoning.

## Anti-Pattern Checklist (15+ items)

| # | 反模式 | 严重级别 | 检测规则 |
|---|--------|---------|---------|
| 1 | **Bullet point overload** — 6+ bullets per slide, each with full sentences | 致命 | 检测任一 slide 是否含 ≥6 个 bullet points 或 bullet 文本总字数 >40 |
| 2 | **Reading slides verbatim** — presenter reads on-screen text word-for-word, triggering the Redundancy Effect | 致命 | 检测 slide 文本是否包含完整段落 (>2 个完整句子)；提醒此为 speaker note，非 slide content |
| 3 | **Text-as-document** — slide functions as a standalone document, with paragraphs, dense data, and no visual hierarchy | 致命 | 检测任一 slide 文本量是否 >50 words；检测是否缺少视觉焦点元素（图片/图表/icon） |
| 4 | **Font too small** — body text <20pt or heading <28pt, making back-row reading impossible | 致命 | 检测最小字号；body <20pt 报致命，20-23pt 报警示 |
| 5 | **Low color contrast** — text/background contrast ratio insufficient for readability (e.g., yellow on white, light gray on white) | 致命 | 检测文本色与背景色对比度是否 <4.5:1 (WCAG AA 标准) |
| 6 | **Animation abuse** — gratuitous animations (Bounce, Swivel, Spin, Vortex) with no pedagogical purpose | 警示 | 检测是否使用了非 Fade/Appear/Wipe 类别动画；≥3 种不同动画类型报警示 |
| 7 | **Inconsistent design** — random fonts, clashing colors, mismatched layouts across slides | 警示 | 检测字体种类是否 >2；检测跨 slide 标题位置/字号是否一致；检测配色是否超出 palette |
| 8 | **Missing signalling** — no outline, no agenda slide, no verbal pointer words, no section dividers | 警示 | 检测 deck 前 3 slide 是否含 agenda/outline；检测是否有 section divider slides |
| 9 | **No interactivity** — deck runs >15 minutes of passive slides with no audience engagement point | 警示 | 检测连续无交互 slide 数量；≥30 slide 无交互报警示 |
| 10 | **Data without narrative** — chart/table presented without takeaway headline or oral interpretation | 警示 | 检测 chart/table slide 是否有总结性标题文字；提醒每个 chart 需要 one-sentence takeaway |
| 11 | **Thank-you slide as closer** — last slide is passive politeness instead of CTA (when action is expected) | 警示 | 检测最后一页内容是否为"谢谢"/"Thank You"/"Questions?"且无任何 CTA 元素 |
| 12 | **Overly complex diagrams** — single slide contains >7 visual elements or a process with >5 steps | 警示 | 检测单 slide 内独立视觉元素（图标/箭头/形状/图片）数量；≥8 个报警示 |
| 13 | **Clip art usage** — using dated clip art or mixing clip art style with modern photography | 警示 | 检测图片是否为 clip-art 风格（矢量卡通/低分辨率）；检测 clip art 与 photography 混用 |
| 14 | **No source attribution** — data, quotes, images lack citations or credits | 警示 | 检测含数据/引用/图片的 slide 是否缺少来源标注 |
| 15 | **Inconsistent animation timing** — animation durations vary wildly, breaking rhythm | 警示 | 检测动画时长是否在 0.3-1.5s 范围外；检测相邻元素动画时长差异 >0.5s |
| 16 | **No conclusion slide** — presentation ends abruptly without summary of key takeaways | 警示 | 检测最后 3 slide 是否含总结性内容或明确结论标记 |
| 17 | **Ignoring accessibility** — color-only cues, no alt text, no reading order, complex language unexplained | 警示 | 检测是否仅用颜色区分信息（无 icon/shape 辅助）；检测是否含未解释的 jargon/acronym |
| 18 | **Y-axis manipulation** — column/bar chart Y-axis does not start at zero, misleading visual proportion | 致命 | 检测 column/bar chart 的 Y 轴最小值是否 !=0（无 axis break 标注） |
| 19 | **Too many slides for time** — average <30 seconds per slide, forcing rushed delivery or skipping content | 警示 | 检测 slide_count / allocated_minutes 比率；<0.5 min/slide 报警示 |
| 20 | **Extraneous decoration** — irrelevant images, decorative backgrounds, or "cute" elements that violate the Coherence Principle | 警示 | 检测图片/content 是否与 slide 核心主题无关；检测装饰性背景是否干扰正文可读性 |

## Dilemma Decision Cases (≥2 required)

### Case 1: 最后一页写"谢谢"vs 放 Call-to-Action

- **困境 (Dilemma)**: 演讲最后一页是放"谢谢"/"Thank You"还是放 CTA？社会礼仪规范要求表达感谢（尤其在东亚/学术文化中），但研究证明"谢谢"页会杀死行动势能、浪费最宝贵的屏幕时间、且在屏幕上写"谢谢"不如口头真诚表达。然而，强行在所有场合都用 CTA 又会显得 pushy、商业化、不符合场景预期。

- **约束 (Constraints)**:
  - 文化约束：学术报告、东亚商务场景中，不放"谢谢"可能被视为不礼貌
  - 场景约束：信息分享型演讲（季度汇报、知识分享）本身不期待听众行动
  - 权力约束：听众若无决策权，CTA 无意义
  - 格式约束：若 deck 会被打印或作为 leave-behind PDF，CTA 页需要同时具备独立可读性

- **决策步骤 (Decision Steps)**:
  1. 判断演讲类型：说服型（pitch/提案/销售）→ 必须 CTA；信息型（汇报/培训/知识分享）→ 可选 CTA；仪式型（颁奖/纪念/开场致辞）→ "谢谢"可接受
  2. 判断听众是否有行动权限：有 → CTA 必须具体到"谁在什么时间做什么"；无 → 使用"Next Steps"或"Key Takeaways"替代直接 CTA，末尾口头致谢
  3. 判断决策是否已提前做出：是 → CTA 改为 confirmation + 口头感谢；否 → 必须包含 CTA
  4. 如果文化/场景要求"谢谢"但确实需要 CTA → 使用拆分策略：CTA 页作为倒数第 2 页，口头致谢后切换到简洁的"谢谢+联系方式"收尾页

- **结果 (Outcome)**: 输出分类决策表，将演讲场景映射到最佳结尾策略。核心原则：CTA 是默认选项，"谢谢"页只在 3 种例外情况下合理（决策已定、纯信息型、听众无权行动）。文化约束通过"拆分 CTA + 口头致谢"解决。

- **可提取的操作 (Extractable Operation)**:
  - **OP-CLOSE-STRATEGY**: 根据演讲类型(说服/信息/仪式)、听众权限(有/无)、决策状态(已定/待定)三重判断，自动推荐结尾页类型(CTA/Key-Takeaways/Thank-You)及其内容结构
  - 具体规则：
    - IF 说服型 AND 听众有权限 AND 决策未定 → CTA slide (1 ask + contact + 1 value line)
    - IF 信息型 → Key Takeaways slide (3-5 bullets) + 口头致谢
    - IF 仪式型 → "谢谢"可接受 + 可选联系方式
    - IF 文化要求致谢 → 拆分：CTA page + verbal thank-you + optional thank-you slide as backup

### Case 2: 动画分步揭示 vs 动画过度 — 动画使用的边界在哪里

- **困境 (Dilemma)**: 动画的分步揭示（build animation）能有效控制认知负荷——每次只展示一个 bullet、一个图表元素、一个流程步骤，防止听众提前阅读、保持注意力与讲解同步。但动画过度是公认的"演讲杀手"——Bounce/Swivel/Spin 等效果破坏专业感，过多动画导致听众注意力涣散。两者的边界不是"用不用动画"，而是"什么时候动画从教学工具变成了干扰源"。

- **约束 (Constraints)**:
  - 认知约束：工作记忆有限（~4 chunks），复杂内容需要分步揭示以降低瞬时认知负荷
  - 工具约束：PowerPoint 提供了 40+ 种动画效果，从极简(Appear/Fade)到极炫(Bounce/Swivel)不等，选择范围过大本身构成陷阱
  - 场景约束：咨询/董事局 deck 经常被打印或转 PDF，动画完全失效；线上演示的屏幕共享延迟会破坏动画节奏
  - 受众约束：不同受众对动画的容忍度差异巨大（设计师 vs 工程师 vs 高管）

- **决策步骤 (Decision Steps)**:
  1. 检查交付媒介：会被打印/转 PDF？→ 禁用动画；线上屏幕共享？→ 禁用动画或仅用 Appear；线下大屏？→ 可以使用
  2. 检查场景类型：咨询/金融/董事局 → 禁用（内容可信度优先）；培训/教育 → 积极使用分步揭示；销售/营销 → 可用但克制，仅用 Fade/Appear
  3. 对每一个 animated element 执行"目的性测试"：能否用一句话说清这个动画存在的理由？说不出 → 删除。理由必须是"防止观众提前阅读第 3 点"、"让流程步骤按时间顺序出现"、"强调关键数据转折点"，而不能是"好看"/"有趣"/"让 PPT 不那么无聊"
  4. 限制动画类型：只用 Appear / Fade / Wipe / Float Up 四种"Subtle Four"。任何 Bounce / Swivel / Spin / Vortex / Boomerang → 一票否决
  5. 统一动画时长：所有元素动画时长统一在 0.5-1.0s，相邻元素间不超过 0.2s 差异
  6. 执行"眨眼测试"：快速预览时，动画是否让你注意到"这里有动画"而非"这里的内容是什么"？如果是 → 动画过度，削减
  7. 为复杂 slide（多步骤流程/多层数据）添加 exit animation，揭示新内容时移除已讲解的旧内容，防止屏幕信息堆积

- **结果 (Outcome)**: 输出动画使用决策矩阵，将交付媒介(现场/线上/打印)、场景类型(咨询/培训/营销/学术)、内容类型(文字列表/流程图/数据图表)三维交叉，标注"推荐用/禁用/谨慎用"。核心边界规则：(1) 任何非 Subtle Four 类型动画在专业场合一律禁用；(2) 无法用一句话解释目的的动画一律删除；(3) 会被打印或线上演示的 deck 禁用动画。

- **可提取的操作 (Extractable Operation)**:
  - **OP-ANIMATION-BOUNDARY**: 三维检查（媒介 × 场景 × 内容类型）+ 目的性测试 + 类型白名单 + 统一时长 + 眨眼测试，构成一个完整的动画审核流水线
  - 具体规则：
    - IF 媒介 in {打印, PDF, 线上} → 禁用所有动画
    - IF 场景 in {咨询, 金融, 董事局} → 禁用所有动画
    - ELSE IF 动画类型 NOT IN {Appear, Fade, Wipe, Float Up} → 替换或删除
    - ELSE IF 动画时长 NOT IN [0.5s, 1.0s] → 调整
    - ELSE IF NOT pass 目的性测试 → 删除
    - ELSE → 保留，并考虑添加 exit animation 清理旧内容

## Evidence Sources

- AhaSlides (2024). Survey of 1,048 U.S. professionals on presentation engagement, attention span, and distraction causes. https://ahaslides.com/blog/death-by-powerpoint/
- Mayer, R.E. (UC Santa Barbara). Cognitive Theory of Multimedia Learning — Redundancy Principle (Cohen's d = 0.72), Modality Principle, Coherence Principle, Signalling Principle, Segmenting Principle.
- Sweller, J. (UNSW). Cognitive Load Theory — working memory limits (~4 chunks, <30 seconds).
- 2025 study in *The Clinical Teacher*: 52 UK medical school lectures analyzed against CTML principles. 84.4% student exposure to text-heavy slides, mean 38.2 words/slide, median 1,531 words/deck. https://pmc.ncbi.nlm.nih.gov/articles/PMC12691884/
- 2023 Saudi medical student study: 379 students from 22 colleges, 94.7% rely on PPT slides as primary resource, 68.6% report >80% exam questions from PPT slides. https://pmc.ncbi.nlm.nih.gov/articles/PMC10403468/
- Tufte, E. (2003). *The Cognitive Style of PowerPoint* — NASA Columbia disaster analysis.
- Nelson Cowan's update to Miller's Law: working memory ~4 chunks (vs. original 7 ± 2).
- University of Melbourne attention decay curve research.
- Deckez (2025). CTA vs. Thank You Slide comparison. https://deckez.com/blogs/tips-and-guides/thank-you-slide-vs-cta-slide-which-works-better/
- SlideCow. "Why You Shouldn't Use a Thank You Slide." https://www.slidecow.com/blog/never-use-thank-you-slide/
- SlideGenius. "Always End Your Business Presentations with a Call-to-Action." https://www.slidegenius.com/blog/always-end-your-business-presentations-with-a-call-to-action
- Verdanabold (2026). "When (and when not) to use PowerPoint animations." https://www.verdanabold.com/post/when-and-when-not-to-use-powerpoint-animations
- PPT Power Tools. "Animations in Professional PowerPoint Presentations: Yay or Nay?" https://pptpowertools.com/animations-in-professional-powerpoint-presentations-yay-or-nay/
- Learniverse. "PowerPoint How To Animate: Master Engaging Slides." https://www.learniverse.app/blog/powerpoint-how-to-animate
- Presented.co.uk. "Animation in PowerPoint: 7 Helpful Tips." https://presented.co.uk/animation-in-powerpoint-7-helpful-tips/
- Slidebazaar. "Add Motion to Presentations That Enhances (Not Distracts From) Your Message." https://slidebazaar.com/blog/add-motion-to-presentations-that-enhances-not-distracts-from-your-message/
- SlidesAI (2025). "32 Common Presentation Mistakes to Avoid." https://www.slidesai.io/blog/common-presentation-mistakes
- Beautiful.ai (2025). "Presentation Mistakes to Leave Behind in 2025." https://www.beautiful.ai/blog/presentation-mistakes-to-leave-behind-in-2025
- Slides365. "10 Common PowerPoint Mistakes and How to Fix Them." https://slides365.com/blog/10-common-powerpoint-mistakes-and-how-to-fix-them/
- Talk-Deck (2025). "10 Common PowerPoint Presentation Design Mistakes (And How to Fix Them)." https://talk-deck.com/2025/04/07/10-common-powerpoint-presentation-design-mistakes-and-how-to-fix-them/
- OwlNet / Rice University. Presentation Checklist. http://www.owlnet.rice.edu/~cainproj/presentchecklist.html
- ClearSay Communications. "End every presentation with a call to action." https://www.clear-say.com/presentation-call-to-action/
- Storydoc. "How to End a Business Presentation & Get People to Act." https://www.storydoc.com/blog/how-to-end-a-presentation

## Supported Candidate Operations

### OP-DETECT-BULLET-OVERLOAD
- **触发条件**: 任一 slide 含 ≥6 个 bullet points，或 bullet 文本总字数 >40
- **操作**: 标记为致命反模式，建议拆分为多个 slide 或将部分 bullet 转为 icon+keyword 视觉布局
- **证据强度**: 强 (CTML Cognitive Load Theory, Mayer; AhaSlides 2024 survey)

### OP-DETECT-REDUNDANCY
- **触发条件**: 任一 slide 含 >2 个完整句子或 >50 words 总文本量
- **操作**: 标记为致命反模式（Redundancy Effect），建议将详细内容移至 speaker notes，slide 仅保留关键词/短语
- **证据强度**: 强 (Mayer Redundancy Principle, d=0.72; 2025 UK medical lecture study)

### OP-CLOSE-STRATEGY (见 Case 1)
- **触发条件**: 检测 deck 最后一页内容
- **操作**: 按说服型/信息型/仪式型 × 听众权限 × 决策状态 三维分类，推荐结尾页策略
- **证据强度**: 中强 (多个实践来源一致，但缺严格对照实验)

### OP-ANIMATION-BOUNDARY (见 Case 2)
- **触发条件**: 检测 deck 中是否使用动画
- **操作**: 媒介 × 场景 × 内容类型三维检查 + 目的性测试 + 类型白名单 + 时长统一 + 眨眼测试
- **证据强度**: 中强 (CTML Segmenting Principle 支持分步揭示；实践社区共识支持克制使用)

### OP-DETECT-CONTRAST
- **触发条件**: 检测 slide 中任意文字-背景色彩组合
- **操作**: 计算对比度，<4.5:1 (WCAG AA) 标记为致命；<7:1 (WCAG AAA) 标记为警示
- **证据强度**: 强 (WCAG 标准; 多来源共识)

## Rejected or Weak Candidate Operations

### OP-DETECT-SLIDE-COUNT (已拒绝)
- **原始想法**: 检测 slide 总数是否超出演讲时间允许范围
- **拒绝理由**: "合适的 slide 数量"高度依赖演讲风格、内容密度和受众类型。TED 演讲 18 分钟可能仅 0-5 slides，学术讲座 60 分钟可能有 80+ slides。"一分钟一页"的简陋规则无法覆盖这种差异。更有效的方法是指出信息密度（words per slide、visual elements per slide）而非 slide 总数，因为认知负荷由密度决定，不由页数决定。

### OP-BAN-ALL-ANIMATIONS (已弱化)
- **原始想法**: 一律禁止动画以保证专业感
- **拒绝理由**: 一刀切禁止忽略了分步揭示在教学/培训场景中的认知收益（CTML Segmenting Principle）。用一个条件决策矩阵（OP-ANIMATION-BOUNDARY）替代简单禁令，既保护专业场合不被炫目动画破坏，又保留教育场景的有效工具。

## Boundaries and Uncertainties

1. **文化差异对结尾页选择的影响未经量化研究验证**: "谢谢"页在东亚商务文化中的接受度/必要性虽有实践共识，但缺乏系统的跨文化对照实验。当前建议（拆分 CTA + 口头致谢）是工程性折中方案，需要在实际使用中按文化区域校准。

2. **"4 chunks"工作记忆上限的个体差异**: Cowan 的 ~4 chunks 是均值，实际个体差异范围可能为 3-5 chunks。领域专家由于 chunking 效应（将多个信息单元编码为一个 chunk），实际容量可能显著高于新手。这意味着"同一 slide 不超过 X 个元素"的规则需要根据受众专业水平调整——但这在实践中很难自动化。

3. **动画"目的性测试"的主观性**: "能否用一句话解释动画目的"是有效的启发式规则，但仍是主观判断。不同审核者可能对同一动画的目的性有不同结论。已通过"类型白名单"约束来部分弥补（Bounce/Swivel 等不论目的都禁止），但 Appear/Fade 的"是否有目的"仍有争议空间。

4. **线上演示的动画禁用的是临时性结论**: 当前工具（Zoom/Teams/Meet）的屏幕共享质量在持续提升。如果未来主流平台都支持 60fps 低延迟共享，当前"线上禁用动画"的规则需要重新评估。

5. **NASA Columbia 案例的因果归因强度**: Tufte 认为 PowerPoint 的认知风格是事故的促成因素之一，但事故调查报告同时指出了组织文化、沟通流程等多重原因。将单一案例推广为"PowerPoint 会导致致命决策"可能过度外推。更准确的说法是：层次化 bullet 结构有系统性风险——会将关键不确定性信息掩埋在子级 bullet 中。

## Recommendations for Later Skill Compilation

1. **反模式清单应作为 ppt-architect 的质量校验层 (Gate)**: 20 条反模式中的"致命"级（共 6 条：bullet overload, reading verbatim, text-as-document, font too small, low contrast, y-axis manipulation）应在 skill 的最终输出前作为强制性检查点执行，不通过则阻止输出或生成修复建议。

2. **两个困境决策案例应提炼为决策树节点**: Case 1 (Close Strategy) 和 Case 2 (Animation Boundary) 都产出了条件化决策逻辑，适合编码为 if-else 决策树或 decision table，嵌入 skill 的 slide review 流程。

3. **Mayer 的 CTML 原则应作为 skill 的理论锚点**: 6 条 CTML 原则（Multimedia, Modality, Redundancy, Coherence, Signalling, Segmenting）为反模式检测提供了认知科学依据，应作为 skill 设计文档的显式理论框架，而非零散的"best practice"列表。

4. **R6 的 5 个候选操作需要与 R4 (教学活动选择) 和 R5 (评估对齐) 的操作交叉引用**: OP-CLOSE-STRATEGY 需与 R4 的 audience engagement 操作对齐；OP-ANIMATION-BOUNDARY 需与 R4 的 content sequencing 操作对齐；OP-DETECT-CONTRAST 和 OP-DETECT-BULLET-OVERLOAD 是通用的格式质量检查，可直接进入编译。

5. **建议后续增加一个"正面案例对照表"**: 当前 R6 产出以反模式为主，但"好的是什么样"没有充分展开。建议在 skill 编译时补充每条反模式的正面替代方案（如：bullet overload → icon + keyword 卡片布局）。
