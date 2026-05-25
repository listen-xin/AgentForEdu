import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createStream } from "@/lib/ai";
import { detectSkill } from "@/lib/skills";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { chatId, message } = await req.json();
  if (!message) {
    return new Response("Message is required", { status: 400 });
  }

  // Find or create chat
  let chat;
  if (chatId) {
    chat = await prisma.chat.findFirst({
      where: { id: chatId, userId: session.user.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!chat) return new Response("Chat not found", { status: 404 });
  } else {
    // Auto-detect skill and create title
    const detected = detectSkill(message);
    const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");

    chat = await prisma.chat.create({
      data: {
        title,
        userId: session.user.id,
        skillSlug: detected.slug,
      },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
  }

  // Save user message
  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "user",
      content: message,
    },
  });

  // Build message history
  const allMessages = [
    ...chat.messages,
    { id: "", chatId: chat.id, role: "user" as const, content: message, createdAt: new Date() },
  ];

  const formattedMessages = allMessages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  // Create stream
  const stream = createStream(message, formattedMessages);

  // Save assistant response
  let fullResponse = "";

  const response = stream.toTextStreamResponse();

  // We need to capture the full response for DB storage
  // Using a different approach: clone the response body
  const reader = response.body?.getReader();
  if (!reader) return new Response("Stream error", { status: 500 });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readable = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        fullResponse += text;
        controller.enqueue(value);
      }
      controller.close();

      // Save assistant message
      if (fullResponse) {
        await prisma.message.create({
          data: {
            chatId: chat.id,
            role: "assistant",
            content: fullResponse,
          },
        });
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Chat-Id": chat.id,
    },
  });
}
