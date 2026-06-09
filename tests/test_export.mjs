const SESSION = process.argv[2];
if (!SESSION) {
  console.error("Usage: node test_export.mjs <session_token>");
  process.exit(1);
}

const testContent = `# 测试文档

## 简介
这是一个**测试文档**，用于验证导出功能。

## 数据表
| 格式 | 状态 | 说明 |
|------|------|------|
| MD | 通过 | 纯文本下载 |
| PDF | 通过 | 浏览器打印 |
| DOCX | 通过 | Word文档 |

## 代码示例
\`\`\`javascript
console.log('hello world');
\`\`\`

## 列表
- 项目一
- 项目二
- 项目三

> 这是一段引用文字。

---

测试完成。`;

async function test(format) {
  const resp = await fetch("http://localhost:3000/api/export", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: "authjs.session-token=" + SESSION,
    },
    body: JSON.stringify({ content: testContent, format, title: "测试导出" }),
  });

  const contentType = resp.headers.get("content-type") || "";
  const disposition = resp.headers.get("content-disposition") || "";
  console.log("=== " + format.toUpperCase() + " ===");
  console.log("Status:", resp.status);
  console.log("Content-Type:", contentType);
  console.log("Disposition:", disposition);

  if (format === "md") {
    const text = await resp.text();
    console.log("Size:", text.length, "bytes");
    console.log("Preview:", text.slice(0, 100));
  } else if (format === "docx") {
    const buf = await resp.arrayBuffer();
    console.log("Size:", buf.byteLength, "bytes");
    console.log("Valid DOCX:", buf.byteLength > 1000 ? "✅" : "❌");
  } else if (format === "pdf") {
    const html = await resp.text();
    console.log("Size:", html.length, "bytes");
    console.log("Has print button:", html.includes("print") ? "✅" : "❌");
    console.log("Has content:", html.includes("测试文档") ? "✅" : "❌");
  }
  console.log("");
}

(async () => {
  await test("md");
  await new Promise((r) => setTimeout(r, 500));
  await test("pdf");
  await new Promise((r) => setTimeout(r, 500));
  await test("docx");
  console.log("===== 测试完成 =====");
})().catch((e) => console.error(e));
