"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  if (status === "unauthenticated") { router.push("/login"); return null; }
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-subtle">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId, message: userMessage }),
      });
      if (!res.ok) throw new Error(await res.text());

      const newChatId = res.headers.get("X-Chat-Id");
      if (newChatId) { setChatId(newChatId); window.history.replaceState(null, "", `/chat/${newChatId}`); }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") updated[updated.length - 1] = { ...last, content: last.content + text };
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "抱歉，请求失败，请检查 API 配置后重试。" }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  }

  const skillIcons: Record<string, { emoji: string; color: string }> = {
    "lesson-planning": { emoji: "📖", color: "bg-blue-100 text-blue-700" },
    "course-design": { emoji: "📐", color: "bg-emerald-100 text-emerald-700" },
    "ppt-outline": { emoji: "📽️", color: "bg-amber-100 text-amber-700" },
    "exam-generation": { emoji: "📝", color: "bg-rose-100 text-rose-700" },
    "homework-grading": { emoji: "✅", color: "bg-sky-100 text-sky-700" },
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar currentChatId={chatId} onNewChat={() => { setChatId(null); setMessages([]); setActiveSkill(null); }} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-200">
              <span className="text-white text-xs font-bold">AE</span>
            </div>
            <h1 className="font-semibold text-gray-800 text-sm tracking-tight">AgentForEdu</h1>
            {activeSkill && skillIcons[activeSkill] && (
              <span className={`px-2 py-0.5 text-[11px] rounded-full font-medium ${skillIcons[activeSkill].color}`}>
                {skillIcons[activeSkill].emoji} {activeSkill}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/history")} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">历史记录</button>
            <div className="w-7 h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-[11px] text-gray-600 font-medium ring-2 ring-white">
              {(session?.user?.name || session?.user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin bg-subtle">
          {/* Decorative symbols — very subtle */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[12%] left-[8%] text-6xl opacity-[0.04]">✦</div>
            <div className="absolute top-[25%] right-[12%] text-5xl opacity-[0.03]">◇</div>
            <div className="absolute top-[55%] left-[15%] text-4xl opacity-[0.04]">○</div>
            <div className="absolute top-[70%] right-[10%] text-6xl opacity-[0.03]">△</div>
            <div className="absolute top-[40%] right-[25%] text-3xl opacity-[0.04]">▿</div>
            <div className="absolute top-[85%] left-[20%] text-5xl opacity-[0.03]">◈</div>
          </div>

          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4 relative z-10">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg shadow-gray-200/50 border border-gray-100">
                  <span className="text-3xl">🎓</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">有什么可以帮你的？</h2>
              <p className="text-gray-400 text-sm mb-10 max-w-md text-center leading-relaxed">
                描述你的教学需求，AI 自动匹配最合适的技能来处理
              </p>
              <div className="grid grid-cols-2 gap-3 max-w-lg w-full">
                {[
                  { text: "帮我设计一份高等数学教案", icon: "📖" },
                  { text: "我需要数据结构课程的教学大纲", icon: "📐" },
                  { text: "帮我生成计算机网络的PPT大纲", icon: "📽️" },
                  { text: "出10道Java编程的选择题", icon: "📝" },
                ].map((hint) => (
                  <button
                    key={hint.text}
                    onClick={() => { setInput(hint.text); inputRef.current?.focus(); }}
                    className="group p-3.5 text-left text-sm text-gray-600 bg-white hover:bg-gray-50 rounded-xl hover:shadow-md border border-gray-100 hover:border-blue-200 transition-all"
                  >
                    <span className="mr-2">{hint.icon}</span>
                    <span className="group-hover:text-gray-800 transition-colors">{hint.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 relative z-10">
              {messages.map((msg, i) => (
                <ChatMessage key={msg.id} message={msg} index={i} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 py-2 animate-fade-in-up">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center ring-2 ring-offset-1 ring-blue-100">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 bg-white/90 backdrop-blur-sm px-4 py-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="描述你的教学需求..."
              rows={1}
              className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-350 transition-all"
              style={{ minHeight: "52px", maxHeight: "160px" }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 shadow-sm active:scale-[0.97]"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7-7-7m-7 7h14" />
                </svg>
              )}
            </button>
          </form>
          <p className="text-[11px] text-gray-300 text-center mt-2.5">Enter 发送 · Shift + Enter 换行</p>
        </div>
      </div>
    </div>
  );
}
