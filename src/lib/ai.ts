import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { skills, detectSkill } from "./skills";

function getProvider() {
  const baseURL = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const apiKey = process.env.AI_API_KEY || "";
  return createOpenAI({
    apiKey,
    baseURL,
    fetch: async (input, init) => {
      const response = await fetch(input, init);
      if (!response.ok || !response.body) return response;
      const reader = response.body.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            // Remap reasoning_content -> content for DeepSeek reasoning models
            buffer = buffer.replace(/"reasoning_content"/g, '"content"');
            controller.enqueue(encoder.encode(buffer));
            buffer = "";
          }
          if (buffer.length > 0) {
            buffer = buffer.replace(/"reasoning_content"/g, '"content"');
            controller.enqueue(encoder.encode(buffer));
          }
          controller.close();
        },
      });
      return new Response(stream, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    },
  });
}

const modelName = process.env.AI_MODEL || "gpt-4o";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function createStream(prompt: string, history: ChatMessage[]) {
  const detected = detectSkill(prompt);
  const skillSystemPrompt = detected.systemPrompt;
  const skillsList = skills
    .map((s) => `- ${s.name}：${s.description}`)
    .join("\n");

  const systemContent = `你是一个高等教育 AI 助手，运行在 AgentForEdu 平台上。
你拥有以下专业技能：

${skillsList}

当前激活的技能：**${detected.name}**

${skillSystemPrompt}

## 通用规则
1. 回复使用中文，语言专业但不晦涩
2. 使用 Markdown 格式输出，结构化呈现
3. 如果用户需求不清晰，主动追问细节（课程名称、学时、学生水平等）
4. 如果用户需求超出技能范围，诚实说明并建议合适的技能
5. 输出完成后，可以询问是否需要调整或补充`;

  const result = streamText({
    model: getProvider().chat(modelName),
    system: systemContent,
    messages: history.map((m) => ({ role: m.role, content: m.content })),
    temperature: 0.7,
  });

  return result;
}
