"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ChatListItem {
  id: string;
  title: string;
  skillSlug: string | null;
  updatedAt: string;
  _count: { messages: number };
}

interface ChatSidebarProps {
  currentChatId: string | null;
  onNewChat: () => void;
}

export default function ChatSidebar({
  currentChatId,
  onNewChat,
}: ChatSidebarProps) {
  const router = useRouter();
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchChats();
  }, [currentChatId]);

  async function fetchChats() {
    try {
      const res = await fetch(`/api/chats${search ? `?search=${search}` : ""}`);
      if (res.ok) setChats(await res.json());
    } catch {}
  }

  function handleSelect(chatId: string) {
    router.push(`/chat/${chatId}`);
  }

  const skillIcons: Record<string, string> = {
    "lesson-planning": "📖",
    "course-design": "📐",
    "ppt-outline": "📽️",
    "exam-generation": "📝",
    "homework-grading": "✅",
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gray-50 border-r border-gray-200 flex flex-col transition-transform`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => {
              onNewChat();
              router.push("/chat");
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新建对话
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchChats()}
            placeholder="搜索历史..."
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2 space-y-1">
          {chats.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">暂无对话记录</p>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelect(chat.id)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                  chat.id === currentChatId
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-100 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{skillIcons[chat.skillSlug || ""] || "💬"}</span>
                  <span className="font-medium text-gray-900 truncate flex-1">
                    {chat.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">
                    {chat._count.messages} 条消息
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(chat.updatedAt)}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className="w-full text-left text-sm text-gray-500 hover:text-gray-700 py-1"
          >
            退出登录
          </button>
        </div>
      </div>
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days}天前`;
  return date.toLocaleDateString("zh-CN");
}
