"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ChatListItem { id: string; title: string; skillSlug: string | null; updatedAt: string; _count: { messages: number }; }
interface ChatSidebarProps { currentChatId: string | null; onNewChat: () => void; }

export default function ChatSidebar({ currentChatId, onNewChat }: ChatSidebarProps) {
  const router = useRouter();
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchChats(); }, [currentChatId]);

  async function fetchChats() {
    try { const res = await fetch(`/api/chats${search ? `?search=${search}` : ""}`); if (res.ok) setChats(await res.json()); } catch {}
  }

  function handleSelect(chatId: string) { router.push(`/chat/${chatId}`); setIsOpen(false); }

  const skillIcons: Record<string, { emoji: string; color: string }> = {
    "lesson-planning": { emoji: "📖", color: "text-blue-500" },
    "course-design": { emoji: "📐", color: "text-emerald-500" },
    "ppt-outline": { emoji: "📽️", color: "text-amber-500" },
    "exam-generation": { emoji: "📝", color: "text-rose-500" },
    "homework-grading": { emoji: "✅", color: "text-sky-500" },
  };

  const sidebarContent = (
    <div className="w-72 h-full bg-white border-r border-gray-100 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-50">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center">
            <span className="text-white text-xs font-bold">AE</span>
          </div>
          <span className="font-semibold text-gray-800 text-sm tracking-tight">AgentForEdu</span>
        </div>
        <button
          onClick={() => { onNewChat(); router.push("/chat"); setIsOpen(false); }}
          className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          新建对话
        </button>
      </div>

      <div className="px-4 py-2.5">
        <div className="relative">
          <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && fetchChats()}
            placeholder="搜索对话..." className="w-full pl-8 pr-3 py-2 text-xs border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none bg-gray-50 placeholder:text-gray-300 transition-all" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-2 space-y-1">
        {chats.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-gray-250" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <p className="text-xs text-gray-300">暂无对话</p>
          </div>
        ) : (
          chats.map((chat) => (
            <button key={chat.id} onClick={() => handleSelect(chat.id)}
              className={`w-full text-left p-2.5 rounded-xl text-sm transition-all duration-200 group ${chat.id === currentChatId ? "bg-blue-50 border border-blue-100 shadow-sm" : "hover:bg-gray-50 border border-transparent"}`}>
              <div className="flex items-center gap-2.5">
                <span className="text-base shrink-0">
                  {(chat.skillSlug && skillIcons[chat.skillSlug]) ? <span className={skillIcons[chat.skillSlug].color}>{skillIcons[chat.skillSlug].emoji}</span> : "💬"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-700 truncate group-hover:text-gray-900 transition-colors">{chat.title}</p>
                  <div className="flex items-center gap-2 mt-0.5"><span className="text-[10px] text-gray-300">{chat._count.messages} 条消息</span></div>
                </div>
                <span className="text-[10px] text-gray-250 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">{formatDate(chat.updatedAt)}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-50">
        <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left text-xs text-gray-350 hover:text-gray-600 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          退出登录
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div className="hidden lg:block shrink-0">{sidebarContent}</div>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 animate-slide-in">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString); const now = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (days === 0) return "今天"; if (days === 1) return "昨天"; if (days < 7) return `${days}天前`;
  return date.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}
