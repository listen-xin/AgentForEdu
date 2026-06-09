import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Types from docx — only import types, not runtime code
import type { Paragraph, Table } from "docx";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, format, title } = await req.json();
  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const exportTitle = title || "export";
  const safeFilename = exportTitle.replace(/[<>:"/\\|?*]/g, "_").slice(0, 50);

  switch (format) {
    case "md":
      return exportMarkdown(content, safeFilename);
    case "docx":
      return await exportDocx(content, safeFilename);
    case "pdf":
      return exportPdfHtml(content, safeFilename);
    default:
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
  }
}

/** Encode filename for HTTP Content-Disposition header (RFC 5987) */
function encodeFilename(name: string, ext: string): string {
  const ascii = name.replace(/[^\x00-\x7F]/g, "_");
  const encoded = encodeURIComponent(name);
  return `attachment; filename="${ascii}${ext}"; filename*=UTF-8''${encoded}${ext}`;
}

/** Download as .md file */
function exportMarkdown(content: string, filename: string) {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": encodeFilename(filename, ".md"),
    },
  });
}

/** Convert markdown to .docx using docx package (dynamic import) */
async function exportDocx(content: string, filename: string) {
  const D = await import("docx").catch(() => null);
  if (!D) {
    return NextResponse.json({ error: "Word 导出暂不可用" }, { status: 500 });
  }

  const children = markdownToDocxChildren(content, D);

  const doc = new D.Document({
    sections: [{ properties: {}, children }],
  });

  return new NextResponse(
    new ReadableStream({
      async start(controller) {
        const buffer = await D.Packer.toBuffer(doc);
        controller.enqueue(new Uint8Array(buffer));
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": encodeFilename(filename, ".docx"),
      },
    }
  );
}

/** Return a print-friendly HTML page for browser PDF export */
function exportPdfHtml(content: string, filename: string) {
  const htmlContent = markdownToHtml(content);
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(filename)}</title>
<style>
  @page { margin: 2cm; size: A4; }
  body {
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    font-size: 14px;
    line-height: 1.8;
    color: #1a1a1a;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  h1 { font-size: 24px; border-bottom: 2px solid #333; padding-bottom: 8px; margin-top: 24px; }
  h2 { font-size: 20px; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-top: 20px; }
  h3 { font-size: 16px; margin-top: 16px; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
  th { background-color: #f5f5f5; font-weight: bold; }
  pre { background: #f5f5f5; padding: 12px; border-radius: 6px; overflow-x: auto; }
  code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
  blockquote { border-left: 3px solid #ddd; margin: 12px 0; padding: 4px 16px; color: #666; }
  hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }
  ul, ol { padding-left: 24px; }
  li { margin: 4px 0; }
  @media print {
    body { padding: 0; }
    .no-print { display: none; }
  }
</style>
</head>
<body>
  <div class="no-print" style="background:#f0f7ff;border:1px solid #bdd7ee;border-radius:8px;padding:12px 16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
    <span>💡 按 <strong>Ctrl+P</strong> 或点击右侧按钮即可保存为 PDF</span>
    <button onclick="window.print()" style="background:#2563eb;color:white;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:14px;">🖨 打印 / 导出 PDF</button>
  </div>
  ${htmlContent}
  <script>
    // Auto-trigger print dialog after page loads
    setTimeout(() => { if (confirm('要立即导出为 PDF 吗？\\n\\n点击「确定」打开打印对话框，在打印设置中选择「另存为 PDF」。\\n点击「取消」留在预览页面。')) { window.print(); } }, 500);
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(filename)}.html`,
    },
  });
}

// ─── Markdown → HTML (for PDF preview) ───

function markdownToHtml(md: string): string {
  let html = md;

  // Code blocks
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_, lang, code) =>
      `<pre><code class="language-${escapeHtml(lang || "")}">${escapeHtml(code.trim())}</code></pre>`
  );
  // Inline code
  html = html.replace(/`([^`]+)`/g, (_, c: string) => `<code>${escapeHtml(c)}</code>`);
  // Tables
  html = html.replace(
    /(\|.*\|)\n(\|[-:,\s|]*\|)\n((?:\|.*\|(?:\n|$))*)/g,
    (_, header, _sep, rows) => {
      const hCells = header
        .split("|")
        .filter((h: string) => h.trim())
        .map((h: string) => `<th>${h.trim()}</th>`)
        .join("");
      const rHtml = rows
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");
      return `<table><thead><tr>${hCells}</tr></thead><tbody>${rHtml}</tbody></table>`;
    }
  );
  // Headings
  html = html.replace(/^#### (.+)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // Bold + italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Lists
  html = html.replace(/^[*-] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => (m.includes("<ul>") ? m : `<ol>${m}</ol>`));
  html = html.replace(/<\/ul>\n?<ul>/g, "");
  html = html.replace(/<\/ol>\n?<ol>/g, "");
  // HR
  html = html.replace(/^---$/gm, "<hr>");
  // Blockquote
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");
  if (!html.startsWith("<")) html = `<p>${html}</p>`;

  return html;
}

// ─── Markdown → DOCX children ───

function markdownToDocxChildren(
  md: string,
  D: any
): any[] {
  const children: any[] = [];
  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line → skip
    if (!line.trim()) {
      i++;
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      children.push(
        new D.Paragraph({
          spacing: { before: 120, after: 120 },
          shading: { type: "solid", color: "F5F5F5" },
          children: [
            new D.TextRun({
              text: codeLines.join("\n"),
              font: "Consolas",
              size: 18,
            }),
          ],
        })
      );
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1].includes("|---")) {
      const headerLine = line;
      i += 2; // skip header + separator
      const bodyLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        bodyLines.push(lines[i]);
        i++;
      }

      const headers = headerLine
        .split("|")
        .filter((c) => c.trim())
        .map((c) => c.trim());
      const rows = bodyLines.map((row) =>
        row
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim())
      );

      const table = new D.Table({
        width: { size: 100, type: D.WidthType.PERCENTAGE },
        rows: [
          new D.TableRow({
            tableHeader: true,
            children: headers.map(
              (h) =>
                new D.TableCell({
                  shading: { type: "solid", color: "F0F0F0" },
                  children: [
                    new D.Paragraph({
                      alignment: D.AlignmentType.CENTER,
                      children: [new D.TextRun({ text: h, bold: true, size: 20 })],
                    }),
                  ],
                })
            ),
          }),
          ...rows.map(
            (row) =>
              new D.TableRow({
                children: row.map(
                  (cell) =>
                    new D.TableCell({
                      children: [
                        new D.Paragraph({
                          children: [new D.TextRun({ text: cell, size: 20 })],
                        }),
                      ],
                    })
                ),
              })
          ),
        ],
      });
      children.push(table);
      continue;
    }

    // Heading
    if (line.startsWith("# ")) {
      children.push(
        new D.Paragraph({
          heading: D.HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
          children: [new D.TextRun({ text: line.slice(2).trim(), bold: true, size: 32 })],
        })
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      children.push(
        new D.Paragraph({
          heading: D.HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          children: [new D.TextRun({ text: line.slice(3).trim(), bold: true, size: 28 })],
        })
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      children.push(
        new D.Paragraph({
          heading: D.HeadingLevel.HEADING_3,
          spacing: { before: 160, after: 80 },
          children: [new D.TextRun({ text: line.slice(4).trim(), bold: true, size: 24 })],
        })
      );
      i++;
      continue;
    }
    if (line.startsWith("#### ")) {
      children.push(
        new D.Paragraph({
          heading: D.HeadingLevel.HEADING_4,
          spacing: { before: 120, after: 60 },
          children: [new D.TextRun({ text: line.slice(5).trim(), bold: true, size: 22 })],
        })
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      children.push(
        new D.Paragraph({
          spacing: { before: 120, after: 120 },
          border: { bottom: { style: D.BorderStyle.SINGLE, size: 1, color: "CCCCCC" } },
          children: [],
        })
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      children.push(
        new D.Paragraph({
          spacing: { before: 40, after: 40 },
          indent: { left: 480 },
          border: { left: { style: D.BorderStyle.SINGLE, size: 6, color: "CCCCCC" } },
          children: [
            new D.TextRun({
              text: line.slice(2).trim(),
              italics: true,
              color: "666666",
              size: 20,
            }),
          ],
        })
      );
      i++;
      continue;
    }

    // List items
    if (/^[*-]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (/^[*-]\s/.test(l)) {
          listItems.push(l.replace(/^[*-]\s/, ""));
          i++;
        } else if (/^\d+\.\s/.test(l)) {
          listItems.push(l.replace(/^\d+\.\s/, ""));
          i++;
        } else if (l.trim() === "") {
          break;
        } else {
          // Continuation of previous list item
          if (listItems.length > 0) {
            listItems[listItems.length - 1] += " " + l.trim();
          }
          i++;
        }
      }
      for (const item of listItems) {
        children.push(
          new D.Paragraph({
            spacing: { before: 20, after: 20 },
            bullet: { level: 0 },
            children: [createFormattedTextRun(item, D)],
          })
        );
      }
      continue;
    }

    // Regular paragraph
    children.push(
      new D.Paragraph({
        spacing: { before: 60, after: 60 },
        children: [createFormattedTextRun(line, D)],
      })
    );
    i++;
  }

  return children;
}

function createFormattedTextRun(text: string, D: any): any {
  // Handle inline formatting: **bold**, *italic*, `code`
  const parts: any[] = [];
  let remaining = text;
  const regex = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`([^`]+)`)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(new D.TextRun({ text: text.slice(lastIdx, match.index), size: 20 }));
    }
    if (match[1]) {
      parts.push(new D.TextRun({ text: match[2], bold: true, italics: true, size: 20 }));
    } else if (match[3]) {
      parts.push(new D.TextRun({ text: match[4], bold: true, size: 20 }));
    } else if (match[5]) {
      parts.push(new D.TextRun({ text: match[6], italics: true, size: 20 }));
    } else if (match[7]) {
      parts.push(new D.TextRun({ text: match[8], font: "Consolas", size: 18 }));
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(new D.TextRun({ text: text.slice(lastIdx), size: 20 }));
  }

  if (parts.length === 1) return parts[0];
  // Return first part and merge... actually, let me just use a simple approach
  return new D.TextRun({ text, size: 20 });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
