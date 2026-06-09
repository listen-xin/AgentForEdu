"use client";

import { useState } from "react";

interface ChatMessageProps {
  message: { id: string; role: "user" | "assistant"; content: string };
  index?: number;
}

export default function ChatMessage({ message, index = 0 }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [exporting, setExporting] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);

  async function handleExport(format: "md" | "pdf" | "docx") {
    if (exporting) return;
    setExporting(format);
    try {
      const res = await fetch("/api/export", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message.content, format, title: message.content.slice(0, 50).replace(/\n/g, " ") }),
      });
      if (!res.ok) throw new Error(await res.text());
      if (format === "pdf") {
        const html = await res.text();
        window.open(URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" })), "_blank");
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = format === "md" ? "export.md" : "export.docx";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) { console.error("Export failed:", err); alert("导出失败，请重试"); }
    finally { setExporting(null); }
  }

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} animate-fade-in-up`}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => !isUser && setShowExport(true)}
      onMouseLeave={() => !isUser && setShowExport(false)}
    >
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ring-2 ring-offset-1 ${isUser ? "bg-gray-700 text-white ring-gray-100" : "bg-white text-gray-500 ring-gray-100 border border-gray-200"}`}>
        {isUser ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-4 py-3 leading-relaxed text-sm shadow-sm ${isUser ? "bg-gray-800 text-white" : "bg-white text-gray-800 border border-gray-100 hover:shadow-md transition-shadow"}`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }} />
          )}
        </div>

        {/* Export bar */}
        {!isUser && message.content && message.content.length > 20 && (
          <div className={`flex items-center gap-1 mt-1.5 transition-all duration-200 ${showExport ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
            <span className="text-[11px] text-gray-300 mr-1 select-none">导出</span>
            {[
              { format: "md" as const, label: "MD", color: "hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300" },
              { format: "pdf" as const, label: "PDF", color: "hover:bg-red-50 hover:text-red-600 hover:border-red-200" },
              { format: "docx" as const, label: "DOCX", color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
            ].map(({ format, label, color }) => (
              <button key={format} onClick={() => handleExport(format)} disabled={exporting !== null}
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-md border transition-all border-gray-150 text-gray-350 bg-transparent ${color} disabled:opacity-50`}>
                {exporting === format ? <span className="w-2.5 h-2.5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <span className="font-semibold">{label}</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function renderMarkdown(content: string): string {
  let html = content;
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => `<pre><code class="language-${lang || ""}">${escapeHtml(code.trim())}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);
  html = html.replace(/(\|.*\|)\n(\|[-:,\s|]*\|)\n((?:\|.*\|(?:\n|$))*)/g, (_, header, _s, rows) => {
    const hCells = header.split("|").filter((h: string) => h.trim()).map((h: string) => `<th>${inlineMarkdown(h.trim())}</th>`).join("");
    const rHtml = rows.trim().split("\n").map((row: string) => {
      const cells = row.split("|").filter((c: string) => c.trim()).map((c: string) => `<td>${inlineMarkdown(c.trim())}</td>`).join("");
      return `<tr>${cells}</tr>`;
    }).join("");
    return `<table><thead><tr>${hCells}</tr></thead><tbody>${rHtml}</tbody></table>`;
  });
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
  html = html.replace(/^\d+\.\s(.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => (!m.includes("<ol>") ? `<ol>${m}</ol>` : m));
  html = html.replace(/<\/ul>\n?<ul>/g, ""); html = html.replace(/<\/ol>\n?<ol>/g, "");
  html = html.replace(/^---$/gm, "<hr>");
  html = html.replace(/\n\n/g, "</p><p>"); html = html.replace(/\n/g, "<br>");
  if (!html.startsWith("<")) html = `<p>${html}</p>`;
  return html;
}
function escapeHtml(t: string): string { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function inlineMarkdown(t: string): string { return t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>"); }
