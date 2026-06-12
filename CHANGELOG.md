# Changelog

## [Unreleased] — 2026-06-11

### Fixed

- **layout.tsx** — 将字体从 `next/font/google`（需联网拉取 Google Fonts）改为 `geist` npm 本地包，解决中国云端 build 时因 Google 服务不可达导致的构建失败
- **export/route.ts** — 修复 `createFormattedTextRun`：原函数在解析多段内联格式（`**粗体**`、`*斜体*`、`` `code` ``）后将结果全部丢弃并返回原始字符串，导致 Word 文档中出现字面量 `**` 符号；改为返回 `TextRun[]` 数组并在 `Paragraph.children` 处展开，粗体 / 斜体 / 等宽字体现在正确渲染
- **chat/route.ts** — 修复 TypeScript 隐式 `any` 类型报错（`Parameter 'm' implicitly has an 'any' type`）

### Changed

- **package.json** — 新增 `geist ^1.7.2` 依赖

### Notes

- 云端部署时需在环境变量中设置 `AUTH_URL=https://<实际域名>`，否则 Auth.js v5 登录后跳转会失败
- `proxy.ts` 是 Next.js 16 的中间件文件命名约定（Next.js 16 将原 `middleware.ts` 重命名为 `proxy.ts`），文件本身逻辑正确，无需修改

---

## 历史提交（来自 git log）

- `6a2cdf6` fix: 修复 export route TypeScript 类型错误 — createFormattedTextRun 使用动态 D 参数
- `9fd07c7` chore: 移除所有 Vercel 部署相关内容
- `1321134` fix: 移除 prisma.config.ts + 添加健康检查 API
- `158e961` fix: docx 改为动态 import 防止云函数冷启动崩溃
- `5cc0646` fix: 修复云函数部署 502 错误 — serverExternalPackages + nodemailer 容错
