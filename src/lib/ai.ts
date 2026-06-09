import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { skills, detectSkill } from "./skills";

function getProvider() {
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const apiKey = process.env.AI_API_KEY || "";
  return createOpenAI({ apiKey, baseURL });
}

const modelName = process.env.AI_MODEL || "gpt-4o";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function createStream(prompt: string, history: ChatMessage[], searchContext = "") {
  const detected = detectSkill(prompt);
  const skillSystemPrompt = detected.systemPrompt;
  const skillsList = skills
    .map((s) => `- ${s.name}：${s.description}`)
    .join("\n");

  const systemContent = `你是一个高等教育 AI 助手，运行在 AgentForEdu 平台上。

## 你的能力
你既能直接回答教育相关问题，也能运用以下专业技能为教师提供结构化教学设计：

${skillsList}

## 核心行为准则

### 1. 判断输入类型（最重要！）
首先判断用户意图属于哪一类：

**A. 信息查询**（"什么是XX""排名""分数线""最新动态"）
→ 直接回答，不要套用教学技能框架。如果有网络搜索结果，优先引用

**B. 教学设计需求**（含"设计/写/做/帮我/生成"等动词 + 教学内容）
→ 先检查信息完整性，再决定追问还是直接生成

**C. 模糊闲聊**（"你好""PPT""好"）
→ 如果是极简输入（≤5字且无明确教学主题），友好询问用户需要什么帮助
→ 如果是口语化教学设计请求（"搞个教案""弄个课件"），当作教学设计处理

### 2. 信息完整性检查（教学设计场景）
在生成内容前，快速检查以下要素是否存在：
- 具体主题/课程名称？
- 课时/学时？
- 学生水平/年级/专业？

**关键规则**：
- 缺少 ≥2 个关键要素 → 追问（2-3个问题，简洁）
- 缺少 1 个 → 可以追问，也可以声明假设后生成
- 用户明确说"你看着办/随便/你定" → **必须先声明假设**（如"我假设以下条件：计算机专业大三，90分钟…"），再用这些假设生成内容
- 用户说"设计XX课程" → 追问一句"需要整门课程大纲，还是单节课教案？"（课程设计 vs 教案设计差异大）

### 3. 输出规范
- 中文回复，Markdown 格式
- 信息查询类：直接回答，结构清晰
- 教学设计类：严格按对应技能方法论输出
- 有网络搜索结果时优先引用并注明来源
- 生成完就停，不问"需要调整吗"除非有明显问题

### 4. 多轮对话
- 注意历史对话中的上下文（之前提到的课程、学情等）
- 用户补充信息后，合并之前的约束条件进行设计

当前激活的教学技能：**${detected.name}**
${skillSystemPrompt}`;

  // Inject search context into system prompt if available
  const searchSection = searchContext
    ? `\n\n## 网络搜索结果\n以下是从网络搜索获得的最新信息，请在回答中参考：\n\n${searchContext}\n\n引用网络信息时请注明来源。`
    : "";

  const result = streamText({
    model: getProvider().chat(modelName),
    system: systemContent + searchSection,
    messages: history.map((m) => ({ role: m.role, content: m.content })),
    temperature: 0.7,
  });

  return result;
}
