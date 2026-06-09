"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ChatItem { id: string; title: string; skillSlug: string | null; createdAt: string; updatedAt: string; _count: { messages: number }; }

const skillNames: Record<string, string> = { "lesson-planning": "教案设计", "course-design": "课程设计", "ppt-outline": "PPT大纲", "exam-generation": "试题设计", "homework-grading": "作业批改" };
const skillConfig: Record<string, { emoji: string; color: string }> = {
  "lesson-planning": { emoji: "📖", color: "bg-blue-100 text-blue-700" },
  "course-design": { emoji: "📐", color: "bg-emerald-100 text-emerald-700" },
  "ppt-outline": { emoji: "📽️", color: "bg-amber-100 text-amber-700" },
  "exam-generation": { emoji: "📝", color: "bg-rose-100 text-rose-700" },
  "homework-grading": { emoji: "✅", color: "bg-sky-100 text-sky-700" },
};

export default function HistoryPage() {
  const router = useRouter(); const { data: session, status } = useSession();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { if (status === "unauthenticated") { router.push("/login"); return; } fetchChats(); }, [status]);

  async function fetchChats(query?: string) {
    setIsLoading(true);
    try { const url = query ? `/api/chats?search=${query}` : "/api/chats"; const res = await fetch(url); if (res.ok) setChats(await res.json()); } catch {}
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("确定删除这个对话？")) return;
    try { await fetch(`/api/chat/${id}`, { method: "DELETE" }); setChats((prev) => prev.filter((c) => c.id !== id)); } catch {}
  }

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

  const groupedChats = groupByDate(chats);

  return (
    <div className="min-h-screen bg-subtle">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat" className="text-gray-350 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-bold">AE</span></div>
              <h1 className="font-semibold text-gray-800 text-sm">历史记录</h1>
            </div>
          </div>
          <Link href="/chat" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm">新对话</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="relative max-w-md">
          <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchChats(search)}
            placeholder="搜索对话..." className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none bg-white placeholder:text-gray-300 transition-all" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        {isLoading ? (
          <div className="flex justify-center py-16"><div className="w-6 h-6 border-[3px] border-blue-200 border-t-blue-600 rounded-full animate-spin" /></div>
        ) : chats.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
              <svg className="w-7 h-7 text-gray-250" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-gray-400 mb-4">暂无对话记录</p>
            <Link href="/chat" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">开始第一次对话 →</Link>
          </div>
        ) : (
          Object.entries(groupedChats).map(([dateLabel, items]) => (
            <div key={dateLabel} className="mb-8">
              <h2 className="text-xs font-medium text-gray-350 mb-3 px-1 uppercase tracking-wider">{dateLabel}</h2>
              <div className="space-y-2">
                {items.map((chat) => (
                  <div key={chat.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:border-blue-100 transition-all group">
                    <div className="flex items-start justify-between gap-4">
                      <button onClick={() => router.push(`/chat/${chat.id}`)} className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-lg shrink-0">{(chat.skillSlug && skillConfig[chat.skillSlug]) ? skillConfig[chat.skillSlug].emoji : "💬"}</span>
                          <span className="font-medium text-sm text-gray-800 truncate group-hover:text-blue-700 transition-colors">{chat.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-350 ml-10">
                          {chat.skillSlug && skillConfig[chat.skillSlug] && (
                            <span className={`px-2 py-0.5 rounded-md text-[11px] ${skillConfig[chat.skillSlug].color}`}>{skillNames[chat.skillSlug] || chat.skillSlug}</span>
                          )}
                          <span>{chat._count.messages} 条消息</span>
                          <span>{formatDate(chat.createdAt)}</span>
                        </div>
                      </button>
                      <button onClick={() => handleDelete(chat.id)} className="text-gray-250 hover:text-red-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100 p-1" title="删除">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function groupByDate(chats: ChatItem[]): Record<string, ChatItem[]> {
  const groups: Record<string, ChatItem[]> = {}; const now = new Date();
  const today = now.toDateString(); const yesterday = new Date(now.getTime() - 86400000).toDateString();
  for (const chat of chats) {
    const date = new Date(chat.createdAt); let label: string;
    if (date.toDateString() === today) label = "今天";
    else if (date.toDateString() === yesterday) label = "昨天";
    else if (now.getTime() - date.getTime() < 7 * 86400000) label = "最近 7 天";
    else label = "更早";
    if (!groups[label]) groups[label] = []; groups[label].push(chat);
  }
  return groups;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}
