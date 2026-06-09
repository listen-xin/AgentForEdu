/**
 * Web search utility using DuckDuckGo Instant Answer API.
 * Free, no API key required.
 */

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

export async function searchWeb(query: string): Promise<{
  answer: string;
  results: SearchResult[];
}> {
  try {
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
      { signal: AbortSignal.timeout(8000) }
    );

    if (!response.ok) return { answer: "", results: [] };

    const data = await response.json();
    const answer = data.AbstractText || data.Answer || "";

    const results: SearchResult[] = [];

    // Extract related topics as search results
    if (Array.isArray(data.RelatedTopics)) {
      for (const topic of data.RelatedTopics.slice(0, 5)) {
        if (topic.Text) {
          results.push({
            title: topic.FirstURL || "",
            snippet: topic.Text.replace(/<[^>]*>/g, "") || "",
            url: topic.FirstURL || "",
          });
        }
      }
    }

    // Also check Results array
    if (Array.isArray(data.Results)) {
      for (const r of data.Results.slice(0, 3)) {
        if (r.Text) {
          results.push({
            title: r.Text.slice(0, 80) || "",
            snippet: r.Text || "",
            url: r.FirstURL || "",
          });
        }
      }
    }

    return { answer, results };
  } catch {
    return { answer: "", results: [] };
  }
}

/**
 * Determine if a user message could benefit from web search.
 * Returns a refined search query if so, or null if not needed.
 */
export function shouldSearch(userInput: string): string | null {
  const input = userInput.toLowerCase();

  // Keywords that suggest need for current info
  const searchTriggers = [
    "最新", "2024", "2025", "2026", "当前", "最近", "现在", "目前",
    "近期", "前沿", "最新进展", "趋势", "发展现状",
    "什么是", "怎么定义", "如何理解",
    "有哪些", "什么方法", "什么框架",
    "论文", "研究", "文献",
    "对比", "区别", "vs",
    "案例", "实例", "举例",
    "政策", "标准", "规范",
    "教育部", "评估", "认证",
    "慕课", "mooc", "在线课程",
    "教材", "参考书", "推荐",
  ];

  const hasTrigger = searchTriggers.some((t) => input.includes(t));

  if (!hasTrigger) return null;

  // Build a refined search query focused on education
  return `${userInput} 高等教育 教学`;
}
