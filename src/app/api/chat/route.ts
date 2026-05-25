import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createStream } from "@/lib/ai";
import { detectSkill } from "@/lib/skills";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chatId, message } = await req.json();
  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  // Find or create chat
  let chat;
  if (chatId) {
    chat = await prisma.chat.findFirst({
      where: { id: chatId, userId: session.user.id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  } else {
    const detected = detectSkill(message);
    const title = message.slice(0, 50) + (message.length > 50 ? "..." : "");

    chat = await prisma.chat.create({
      data: { title, userId: session.user.id, skillSlug: detected.slug },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
  }

  // Save user message
  await prisma.message.create({
    data: { chatId: chat.id, role: "user", content: message },
  });

  // Build history
  const history = chat.messages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));
  history.push({ role: "user", content: message });

  // Create stream
  const result = createStream(message, history);

  // Stream text to client while capturing full response for DB
  const encoder = new TextEncoder();
  let fullText = "";
  let streamEnded = false;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          if (part.type === "text-delta") {
            fullText += part.textDelta;
            controller.enqueue(encoder.encode(part.textDelta));
          }
        }
        streamEnded = true;
        controller.close();

        // Save assistant message after stream ends
        if (fullText) {
          await prisma.message.create({
            data: { chatId: chat.id, role: "assistant", content: fullText },
          });
        }
      } catch (err) {
        streamEnded = true;
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Chat-Id": chat.id,
    },
  });
}