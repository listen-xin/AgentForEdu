import { NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function GET() {
  try {
    const openai = createOpenAI({
      apiKey: process.env.AI_API_KEY || "",
      baseURL: process.env.AI_BASE_URL || "https://api.openai.com/v1",
    });

    const modelName = process.env.AI_MODEL || "gpt-4o";

    const result = streamText({
      model: openai(modelName),
      system: "你是一个帮助用户的高等教育AI助手。请用中文简短回复。",
      messages: [{ role: "user", content: "你好，请用一句话介绍你自己" }],
    });

    let text = "";
    for await (const part of result.fullStream) {
      if (part.type === "text-delta") {
        text += part.textDelta;
      }
    }

    return NextResponse.json({ success: true, response: text });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}