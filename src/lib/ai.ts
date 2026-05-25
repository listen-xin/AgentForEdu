import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { skills, detectSkill } from "./skills";

const openai = createOpenAI({
  apiKey: process.env.AI_API_KEY || "",
  baseURL: process.env.AI_BASE_URL || "https://api.openai.com/v1",
});

const model = process.env.AI_MODEL || "gpt-4o";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function createStream(prompt: string, messages: ChatMessage[]) {
  const detected = detectSkill(prompt);
  const skillSystemPrompt = detected.systemPrompt;

  const systemMessage = {
    role: "system" as const,
    content: `你是一个高等教育 AI 助手，运行在 AgentForEdu 平台上。
你拥有以下专业技能：

${skills.map((s) => `- ${s.name}：${s.description}`).join("\n")}

当前激活的技能：**${detected.name}**

${skillSystemPrompt}

## 通用规则
1. 回复使用中文，语言专业但不晦涩
2. 使用 Markdown 格式输出，结构化呈现
3. 如果用户需求不清晰，主动追问细节（课程名称、学时、学生水平等）
4. 如果用户需求超出技能范围，诚实说明并建议合适的技能
5. 输出完成后，可以询问是否需要调整或补充`,
  };

  return streamText({
    model: openai(model),
    messages: [systemMessage, ...messages.map((m) => ({ role: m.role, content: m.content }))],
    temperature: 0.7,
  });
}
