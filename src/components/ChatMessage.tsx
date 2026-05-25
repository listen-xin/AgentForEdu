"use client";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-50 text-gray-900 border border-gray-200"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
        ) : (
          <div
            className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
        )}
      </div>
    </div>
  );
}

function renderMarkdown(content: string): string {
  let html = content;

  // Code blocks (```lang\n...\n```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre><code class="language-${lang || ''}">${escapeHtml(code.trim())}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`);

  // Tables
  html = html.replace(
    /(\|.*\|)\n(\|[-:,\s|]*\|)\n((?:\|.*\|(?:\n|$))*)/g,
    (_, header, separator, rows) => {
      const headers = header
        .split("|")
        .filter((h: string) => h.trim())
        .map((h: string) => `<th>${inlineMarkdown(h.trim())}</th>`)
        .join("");

      const rowHtml = rows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${inlineMarkdown(c.trim())}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<table><thead><tr>${headers}</tr></thead><tbody>${rowHtml}</tbody></table>`;
    }
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Ordered lists
  html = html.replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    if (!match.includes("<ol>")) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });

  // Check for ordered lists (more specific context-based detection would need state)
  // Fix doubled lists
  html = html.replace(/<\/ul>\n?<ul>/g, "");
  html = html.replace(/<\/ol>\n?<ol>/g, "");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraphs if not already
  if (!html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}
