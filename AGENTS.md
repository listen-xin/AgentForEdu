# AgentForEdu

教育智能体网站，利用 AI 辅助高等教育中的教案设计、课程设计、PPT制作、试题设计、作业批改等场景。

## 技术栈

- Next.js 16 (App Router)
- Prisma 6 + PostgreSQL
- Auth.js 5 (NextAuth)
- Vercel AI SDK
- Tailwind CSS 4

## 项目结构

```
src/
├── app/
│   ├── page.tsx              # 首页
│   ├── login/page.tsx        # 登录/注册
│   ├── chat/page.tsx         # 聊天页
│   ├── chat/[id]/page.tsx    # 已有聊天会话
│   └── history/page.tsx      # 生成历史
├── api/
│   ├── auth/[...nextauth]    # Auth.js 路由
│   ├── auth/register         # 注册 API
│   ├── chat/                 # 聊天流式 API
│   ├── chat/[id]             # 单个聊天 CRUD
│   ├── chats/                # 聊天列表 API
│   └── skills/               # 技能列表 API
├── components/
│   ├── ChatMessage.tsx       # 消息气泡组件
│   ├── ChatSidebar.tsx       # 聊天侧边栏
│   └── SessionProvider.tsx   # Auth Session Provider
├── lib/
│   ├── ai.ts                 # AI 调用封装（Vercel AI SDK）
│   ├── auth.ts               # Auth.js 配置
│   ├── db.ts                 # Prisma 客户端
│   └── skills.ts             # 教育技能定义 + 路由引擎
skills/                        # 各技能的 SKILL.md 文件
prisma/
└── schema.prisma              # 数据库模型
```

## 本地开发

```bash
cp .env.example .env
# 编辑 .env 配置数据库和 API Key
npx prisma generate
npm run dev
```

## 部署到 Vercel

1. 在 Vercel 导入本仓库
2. 设置环境变量（参考 .env.example）
3. 部署自动运行 `npx prisma generate && npm run build`

## 教育技能

| 技能 | 说明 | 触发关键词 |
|------|------|-----------|
| 教案设计 | 设计完整教案 | 教案、备课、教学方案 |
| 课程设计 | 设计课程体系 | 课程大纲、课程设计 |
| PPT大纲 | 生成演示文稿大纲 | PPT、课件、幻灯片 |
| 试题设计 | 设计考试试卷 | 试题、考试、出题 |
| 作业批改 | 批改作业与反馈 | 批改、评分、评语 |
