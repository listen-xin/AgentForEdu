# PPT Architect · 演示文稿设计方法论

> 「观众离开时唯一记住的不是你的全部内容，而是那三句断言式标题。」

系统化的演示文稿设计方法论 skill。从受众分析、叙事骨架选择、幻灯片分解、视觉层级设计、数据可视化优化到演讲节奏规划与反模式校验，全流程输出高质量 PPT 方案。

## 安装

```bash
cp -r output/ppt-architect-skill ~/.claude/skills/ppt-architect/
```

## 触发方式

- 需要做一个重要的汇报/提案/路演/答辩 PPT
- 手上有文档/大纲，需要转成 PPT 格式
- 现有 PPT 需要审计和优化
- 数据图表不知道怎么放进 PPT 里
- 排练超时了需要修剪策略
- 不知道内容用什么叙事结构

## 操作模型摘要

| # | 模型 | 一句话 |
|---|------|--------|
| H1 | Audience-Scenario Profiler | 场景×受众→页数/密度/语气期望 |
| H2 | Narrative Structure Selector | SCQA/金字塔/Sparkline 决策树 |
| H3 | Assertion Extractor | 每段→1句断言式标题 |
| H4 | Slide Decomposer | 断言→切页→视觉载体→呼吸页 |
| H5 | Density Gate Check | 每页≤40字/≥18pt/≤3信息单元 |
| H6 | Visual Hierarchy Builder | 3级字号比例+60-30-10色彩+65%面积 |
| H7 | Color Role Allocator | 色彩功能分配+对比度≥4.5:1 |
| H8 | Data Visualization Selector | 问题类型→图表→结论标题化 |
| H9 | Time-Benchmarked Structure | 每页时长标注+总时长校验 |
| H10 | Rhythm Pattern Selector | 每~10分钟注意力锚点 |
| H11 | Anti-Pattern Scanner | 20项反模式检测(致命+警示) |
| H12 | Close-Strategy Selector | 说服→CTA/信息→Summary/仪式→Thanks |

## 约束

- 输出 PPT 方案和逐页内容，不生成 .pptx 二进制文件
- 认知型演示场景（商业/学术/产品）。艺术展示/脱口秀不适用
- 默认大屏投影（16:9/≥18pt/≥4.5:1对比度）
- 色彩和字体受品牌规范约束时需适配
- 信息截止 2026 年 5 月
