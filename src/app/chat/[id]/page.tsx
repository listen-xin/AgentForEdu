"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatMessage from "@/components/ChatMessage";

interface Message { id: string; role: "user" | "assistant"; content: string; }

export default function ChatSessionPage() {
  const router = useRouter(); const params = useParams();
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => {
    if (status === "unauthenticated") { router.push("/login"); return; }
    if (status === "authenticated" && params.id) loadChat(params.id as string);
  }, [status, params.id]);

  async function loadChat(id: string) {
    try {
      const res = await fetch(`/api/chat/${id}`);
      if (!res.ok) { router.push("/chat"); return; }
      const chat = await res.json();
      setChatId(chat.id);
      setMessages(chat.messages.map((m: { id: string; role: string; content: string }) => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content })));
    } catch { router.push("/chat"); }
    setPageLoaded(true);
  }

  if (status === "loading" || (status === "authenticated" && !pageLoaded)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-subtle">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">加载对话...</p>
        </div>
      </div>
    );
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault(); if (!input.trim() || isLoading) return;
    const userMessage = input.trim(); setInput("");
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: userMessage }]);
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ chatId, message: userMessage }) });
      if (!res.ok) throw new Error("请求失败");
      const reader = res.body?.getReader(); if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        const text = decoder.decode(value, { stream: true });
        setMessages((prev) => { const u = [...prev]; const l = u[u.length - 1]; if (l?.role === "assistant") u[u.length - 1] = { ...l, content: l.content + text }; return u; });
      }
    } catch {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "抱歉，请求失败，请检查 API 配置后重试。" }]);
    } finally { setIsLoading(false); }
  }

  function handleKeyDown(e: React.KeyboardEvent) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar currentChatId={chatId} onNewChat={() => { setChatId(null); setMessages([]); router.push("/chat"); }} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center"><span className="text-white text-xs font-bold">AE</span></div>
            <h1 className="font-semibold text-gray-800 text-sm tracking-tight">AgentForEdu</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/history")} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">历史记录</button>
            <div className="w-7 h-7 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-[11px] text-gray-600 font-medium ring-2 ring-white">
              {(session?.user?.name || session?.user?.email || "?")[0].toUpperCase()}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-thin bg-subtle">
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[12%] left-[8%] text-6xl opacity-[0.04]">✦</div>
            <div className="absolute top-[25%] right-[12%] text-5xl opacity-[0.03]">◇</div>
            <div className="absolute top-[55%] left-[15%] text-4xl opacity-[0.04]">○</div>
            <div className="absolute top-[70%] right-[10%] text-6xl opacity-[0.03]">△</div>
            <div className="absolute top-[40%] right-[25%] text-3xl opacity-[0.04]">▿</div>
            <div className="absolute top-[85%] left-[20%] text-5xl opacity-[0.03]">◈</div>
          </div>
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5 relative z-10">
            {messages.map((msg, i) => (<ChatMessage key={msg.id} message={msg} index={i} />))}
            {isLoading && (
              <div className="flex items-center gap-3 py-2 animate-fade-in-up">
                <div className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center ring-2 ring-offset-1 ring-gray-100">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-gray-100 bg-white/90 backdrop-blur-sm px-4 py-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3 items-end">
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="继续对话..." rows={1} style={{ minHeight: "52px", maxHeight: "160px" }}
              className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 focus:bg-white outline-none text-sm text-gray-700 placeholder:text-gray-350 transition-all"
              disabled={isLoading} />
            <button type="submit" disabled={isLoading || !input.trim()}
              className="px-5 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 shadow-sm active:scale-[0.97]">
              {isLoading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l7-7-7-7m-7 7h14" /></svg>}
            </button>
          </form>
          <p className="text-[11px] text-gray-300 text-center mt-2.5">Enter 发送 · Shift + Enter 换行</p>
        </div>
      </div>
    </div>
  );
}
