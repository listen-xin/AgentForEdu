import Link from "next/link";
import { auth } from "@/lib/auth";

const skillCards = [
  {
    icon: "📖",
    title: "教案设计",
    desc: "根据教学目标设计完整的教案，包括知识点拆解、教学环节、时间分配和评估方式",
  },
  {
    icon: "📐",
    title: "课程设计",
    desc: "从课程目标出发设计完整的课程体系，包括大纲、学时分配、考核方案和教学资源规划",
  },
  {
    icon: "📽️",
    title: "PPT 大纲",
    desc: "根据教学内容生成结构清晰的授课PPT大纲，规划每一页的内容和讲稿要点",
  },
  {
    icon: "📝",
    title: "试题设计",
    desc: "根据课程内容和考核目标设计试卷，控制题型分布、难度系数和知识点覆盖率",
  },
  {
    icon: "✅",
    title: "作业批改",
    desc: "制定作业批改标准，提供评分细则、常见问题分析和个性化反馈建议",
  },
];

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AE
            </div>
            <span className="font-semibold text-lg text-gray-900">
              AgentForEdu
            </span>
          </div>
          <nav className="flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/chat"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  开始使用
                </Link>
                <Link
                  href="/history"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  历史记录
                </Link>
                <Link
                  href="/chat"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  进入对话
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  开始使用
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-b from-white to-blue-50">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
          用 AI 智能体赋能
          <span className="text-blue-600">高等教育</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
          AgentForEdu
          是一个面向高等教育工作者的智能体平台。只需描述需求，AI
          就能帮你完成教案设计、课程设计、PPT大纲、试题设计等教学任务。
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href={session ? "/chat" : "/login"}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            {session ? "开始对话" : "免费开始"}
          </Link>
          <Link
            href="#skills"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg"
          >
            了解功能
          </Link>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            教育智能体技能
        </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            每个技能针对特定教学场景深度优化，让 AI 理解教育领域的专业需求
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCards.map((skill) => (
              <div
                key={skill.title}
                className="p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{skill.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            如何使用
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "描述需求",
                desc: "用自然语言描述你的教学任务，例如「帮我设计一份高等数学第一章的教案」",
              },
              {
                step: "02",
                title: "AI 智能匹配",
                desc: "系统自动识别任务类型，调用最合适的教育技能来处理你的需求",
              },
              {
                step: "03",
                title: "获取结果",
                desc: "AI 生成专业、结构化的内容，你可以直接使用或进一步调整优化",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>AgentForEdu — 高等教育智能体平台</p>
        </div>
      </footer>
    </div>
  );
}
