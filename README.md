# 🎓 AgentForEdu — 高等教育 AI 智能体平台

AgentForEdu 是一个面向高等教育工作者的 AI 智能体平台。只需用自然语言描述教学需求，AI 自动匹配最合适的教育技能，帮你完成教案设计、课程规划、PPT 大纲、试题设计、作业批改等专业教学任务。

## ✨ 核心功能

### 🧠 五大教育技能

| 技能 | 说明 |
|------|------|
| 📖 **教案设计** | 基于 BOPPPS / UbD 方法论，从学情诊断到评价设计全流程产出教-学-评一致的高质量教案 |
| 📐 **课程设计** | 系统化课程方案，含目标矩阵、对齐审计、内容序列、差异化评估与反馈循环 |
| 📽️ **PPT 大纲** | 基于 SCQA / 金字塔叙事，从受众分析到视觉层级、节奏规划的完整演示方案 |
| 📝 **试题设计** | 按布鲁姆分类学控制题型分布、难度系数和知识点覆盖率，附评分标准 |
| ✅ **作业批改** | 评分量规、常见问题分析、个性化反馈建议 |

### 🔍 智能特性

- **自动技能匹配**：系统根据输入内容自动识别任务类型，调用对应技能
- **模糊输入理解**：口语化、简略甚至模糊的需求也能正确处理，自动追问关键信息
- **Web 搜索增强**：对于需要最新信息的问题，自动搜索网络并引用结果
- **多轮对话**：支持上下文连续对话，逐步细化需求
- **先声明假设**：当用户说"你看着办"时，先声明假设条件再生成内容

### 📤 多格式导出

- **Markdown** — 一键下载 `.md` 文件
- **PDF** — 打开预览页，浏览器打印 / 另存为 PDF
- **Word (.docx)** — 直接下载格式化的 Word 文档，保留表格、代码块等

### 🔐 安全认证

- 支持**邮箱**或**中国大陆手机号**注册
- **验证码**验证（邮件 / 短信，开发模式打印到终端）
- 密码**找回与重置**
- JWT 会话管理

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库（可使用 [Neon](https://neon.tech) 等云服务）

### 1. 克隆项目

```bash
git clone https://github.com/listen-xin/AgentForEdu.git
cd AgentForEdu
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env`，填写以下配置：

```env
# 数据库
DATABASE_URL="postgresql://user:password@host:5432/dbname?sslmode=require"

# Auth.js
AUTH_SECRET="your-random-secret"
AUTH_URL="http://localhost:3000"

# AI Provider（OpenAI 兼容接口）
AI_API_KEY="your-api-key"
AI_BASE_URL="https://api.deepseek.com/v1"
AI_MODEL="deepseek-v4-pro"

# 邮件验证码（可选，未配置时开发模式打印到控制台）
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=your_password
SMTP_FROM=noreply@example.com

# 短信验证码（可选，阿里云短信服务）
ALIYUN_ACCESS_KEY_ID=your_key
ALIYUN_ACCESS_KEY_SECRET=your_secret
ALIYUN_SMS_SIGN_NAME=AgentForEdu
```

### 4. 初始化数据库

```bash
npx prisma generate
npx prisma db push
```

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可使用。

---

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) + Turbopack |
| 语言 | TypeScript |
| 数据库 | PostgreSQL + Prisma ORM |
| 认证 | Auth.js v5 (NextAuth) + bcryptjs |
| AI | Vercel AI SDK + OpenAI 兼容接口 |
| 样式 | Tailwind CSS 4 |
| 文档导出 | docx (Word) + 浏览器打印 (PDF) |
| 搜索 | DuckDuckGo API（可替换） |

---

## 📁 项目结构

```
AgentForEdu/
├── prisma/                    # 数据库 Schema
│   └── schema.prisma
├── skills/                    # 教育技能定义
│   ├── course-design/         # 课程设计方法论（含操作模型 + 研究参考）
│   ├── lesson-planning/       # 教案设计方法论
│   ├── ppt-outline/           # PPT 设计方法论
│   ├── exam-generation/       # 试题设计
│   └── homework-grading/      # 作业批改
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # 认证 API（注册/登录/验证码/重置密码）
│   │   │   ├── chat/          # AI 对话流式接口
│   │   │   ├── export/        # 文件导出（MD / PDF / DOCX）
│   │   │   └── chats/         # 对话历史管理
│   │   ├── chat/              # 聊天页面
│   │   ├── login/             # 登录 / 注册 / 找回密码
│   │   ├── history/           # 历史记录
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── ChatMessage.tsx    # 消息气泡 + 导出按钮
│   │   ├── ChatSidebar.tsx    # 对话侧边栏
│   │   └── SessionProvider.tsx
│   └── lib/                   # 核心逻辑
│       ├── ai.ts              # AI 流式处理 + 推理模型适配
│       ├── auth.ts            # NextAuth 配置
│       ├── db.ts              # Prisma 客户端
│       ├── search.ts          # Web 搜索
│       ├── skills.ts          # 技能匹配引擎
│       └── verify.ts          # 验证码服务（邮件 + 短信）
└── tests/                     # 测试脚本
```

---

## 🔧 支持的 AI 模型

项目使用 OpenAI 兼容接口，支持任何兼容的模型提供商。在 `.env` 中修改 `AI_BASE_URL`、`AI_API_KEY` 和 `AI_MODEL` 即可切换。

### 推荐模型

| 模型 | 说明 |
|------|------|
| `deepseek-v4-pro` | DeepSeek 推理模型，适合复杂教学任务 |
| `deepseek-v4-flash` | DeepSeek 快速模型 |
| `gpt-4o` | OpenAI 旗舰模型 |
| `kimi-k2.6` | Moonshot 推理模型 |

> **注意**：推理模型（如 DeepSeek v4-pro）的流式输出会将推理过程放在 `reasoning_content` 字段。本项目已在 `ai.ts` 中做了适配，只将最终回答返回给用户，不会暴露模型的思考过程。

---

## 🧪 开发说明

### 验证码

开发模式下，验证码会打印在终端 / 控制台中，无需配置 SMTP 或短信服务即可测试完整注册、登录、找回密码流程。

### 数据库

默认使用 PostgreSQL。推荐使用 [Neon](https://neon.tech)（免费 Serverless PostgreSQL）进行开发和部署。

### Web 搜索

使用 DuckDuckGo 免费 API，无需 API Key。如需更好的中文搜索结果，可在 `src/lib/search.ts` 中替换为其他搜索服务。

---

## 📄 License

MIT

---

Made with ❤️ for educators
