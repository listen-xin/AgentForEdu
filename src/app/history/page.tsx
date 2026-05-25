"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ChatItem {
  id: string;
  title: string;
  skillSlug: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { messages: number };
}

const skillNames: Record<string, string> = {
  "lesson-planning": "教案设计",
  "course-design": "课程设计",
  "ppt-outline": "PPT大纲",
  "exam-generation": "试题设计",
  "homework-grading": "作业批改",
};

const skillIcons: Record<string, string> = {
  "lesson-planning": "📖",
  "course-design": "📐",
  "ppt-outline": "📽️",
  "exam-generation": "📝",
  "homework-grading": "✅",
};

export default function HistoryPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    fetchChats();
  }, [status]);

  async function fetchChats(query?: string) {
    setIsLoading(true);
    try {
      const url = query ? `/api/chats?search=${query}` : "/api/chats";
      const res = await fetch(url);
      if (res.ok) setChats(await res.json());
    } catch {}
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("确定删除这个对话？")) return;
    try {
      await fetch(`/api/chat/${id}`, { method: "DELETE" });
      setChats((prev) => prev.filter((c) => c.id !== id));
    } catch {}
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const groupedChats = groupByDate(chats);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-lg font-semibold text-gray-900">生成历史</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              新对话
            </Link>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchChats(search)}
          placeholder="搜索对话..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
      </div>

      {/* Chat list */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">暂无对话记录</p>
            <Link
              href="/chat"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              开始第一次对话
            </Link>
          </div>
        ) : (
          Object.entries(groupedChats).map(([dateLabel, items]) => (
            <div key={dateLabel} className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 mb-3 px-1">
                {dateLabel}
              </h2>
              <div className="space-y-2">
                {items.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <button
                        onClick={() => router.push(`/chat/${chat.id}`)}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{skillIcons[chat.skillSlug || ""] || "💬"}</span>
                          <span className="font-medium text-gray-900">
                            {chat.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400 ml-7">
                          {chat.skillSlug && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                              {skillNames[chat.skillSlug] || chat.skillSlug}
                            </span>
                          )}
                          <span>{chat._count.messages} 条消息</span>
                          <span>{formatDate(chat.createdAt)}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleDelete(chat.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                        title="删除"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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
  const groups: Record<string, ChatItem[]> = {};
  const now = new Date();
  const today = now.toDateString();
  const yesterday = new Date(now.getTime() - 86400000).toDateString();

  for (const chat of chats) {
    const date = new Date(chat.createdAt);
    let label: string;
    if (date.toDateString() === today) label = "今天";
    else if (date.toDateString() === yesterday) label = "昨天";
    else if (now.getTime() - date.getTime() < 7 * 86400000) label = "最近 7 天";
    else label = "更早";

    if (!groups[label]) groups[label] = [];
    groups[label].push(chat);
  }
  return groups;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
