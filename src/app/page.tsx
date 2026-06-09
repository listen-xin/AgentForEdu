import Link from "next/link";
import { auth } from "@/lib/auth";

const skillCards = [
  { icon: "📖", title: "教案设计", desc: "根据教学目标设计完整的教案，含知识点拆解、教学环节、时间分配和评估方式", border: "hover:border-blue-200", bg: "bg-blue-50/50" },
  { icon: "📐", title: "课程设计", desc: "从课程目标出发设计完整体系，含大纲、学时分配、考核方案和教学资源规划", border: "hover:border-emerald-200", bg: "bg-emerald-50/50" },
  { icon: "📽️", title: "PPT 大纲", desc: "根据教学内容生成结构清晰的授课PPT大纲，规划每页内容、视觉和讲稿要点", border: "hover:border-amber-200", bg: "bg-amber-50/50" },
  { icon: "📝", title: "试题设计", desc: "根据课程内容和考核目标设计试卷，控制题型分布、难度系数和知识点覆盖率", border: "hover:border-rose-200", bg: "bg-rose-50/50" },
  { icon: "✅", title: "作业批改", desc: "制定作业批改标准，提供评分细则、常见问题分析和个性化反馈建议", border: "hover:border-sky-200", bg: "bg-sky-50/50" },
];

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <span className="text-white text-sm font-bold">AE</span>
            </div>
            <span className="font-semibold text-gray-800 text-sm tracking-tight">AgentForEdu</span>
          </Link>
          <nav className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/chat" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">开始使用</Link>
                <Link href="/history" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">历史记录</Link>
                <Link href="/chat" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm">进入对话</Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">登录</Link>
                <Link href="/login" className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm">开始使用</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center bg-subtle relative overflow-hidden">
        {/* Subtle decorative symbols */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[8%] text-7xl opacity-[0.05]">✦</div>
          <div className="absolute top-[20%] right-[10%] text-6xl opacity-[0.04]">◇</div>
          <div className="absolute bottom-[25%] left-[12%] text-5xl opacity-[0.05]">○</div>
          <div className="absolute bottom-[15%] right-[8%] text-7xl opacity-[0.04]">△</div>
          <div className="absolute top-[50%] right-[20%] text-4xl opacity-[0.04]">▿</div>
          <div className="absolute top-[35%] left-[20%] text-3xl opacity-[0.05]">◈</div>
          <div className="absolute bottom-[40%] left-[30%] text-4xl opacity-[0.03]">◎</div>
          <div className="absolute top-[60%] right-[15%] text-3xl opacity-[0.04]">◆</div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-100 text-xs text-gray-500 mb-8 shadow-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            AI 驱动的高等教育智能体
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            用 AI 智能体赋能
            <br />
            <span className="text-gradient">高等教育</span>
          </h1>

          <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            描述你的教学需求，AI 自动匹配最合适的技能，
            帮你完成教案设计、课程规划、PPT 大纲、试题设计等教学任务。
          </p>

          <div className="mt-10 flex gap-3 justify-center">
            <Link href={session ? "/chat" : "/login"}
              className="px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-medium transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
              {session ? "开始对话" : "免费开始"}
            </Link>
            <a href="#skills" className="px-8 py-3.5 border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium">了解功能</a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-600 mb-3">五大核心技能</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">每个技能深度适配教育场景</h2>
            <p className="text-gray-400 max-w-xl mx-auto">不只回答问题，而是理解教育领域的专业方法论，产出教-学-评一致的高质量内容</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillCards.map((skill) => (
              <div key={skill.title} className={`group p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 ${skill.bg} ${skill.border}`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl mb-4 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-subtle">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-blue-600 mb-3">三步开始</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">像聊天一样简单</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "描述需求", desc: "用自然语言描述你的教学任务，例如「帮我设计一份高等数学第一章的教案」" },
              { step: "2", title: "AI 智能匹配", desc: "系统自动识别任务类型，调用最合适的教育技能来深度处理你的需求" },
              { step: "3", title: "获取成果", desc: "AI 生成专业内容，支持导出 Markdown / PDF / Word，直接使用或继续调整" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-5 group-hover:scale-110 transition-transform shadow-sm border border-gray-100 text-gray-700">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-subtle rounded-3xl p-12 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">准备好开始了吗？</h2>
            <p className="text-gray-500 mb-8">免费使用，无需任何配置即可体验 AI 辅助教学</p>
            <Link href={session ? "/chat" : "/login"}
              className="inline-flex px-8 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-medium transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
              立即开始
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-300">AgentForEdu — 高等教育 AI 智能体平台</p>
        </div>
      </footer>
    </div>
  );
}
