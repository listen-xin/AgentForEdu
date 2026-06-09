#!/bin/bash
# AgentforEdu 综合测试脚本
# 测试模糊输入、技能检测、多轮对话、边界情况

BASE="http://localhost:3000"
COOKIES="/tmp/test_cookies.txt"
RESULTS="/tmp/test_results.txt"

# 1. 登录
csrf=$(curl -s -c "$COOKIES" -b "$COOKIES" "$BASE/api/auth/csrf" | grep -o '"csrfToken":"[^"]*"' | cut -d'"' -f4)
curl -s -X POST "$BASE/api/auth/callback/credentials" -H "Content-Type: application/x-www-form-urlencoded" -c "$COOKIES" -b "$COOKIES" -d "email=test3@edu.com&password=test123456&csrfToken=$csrf" -o /dev/null

echo "========================================"
echo "  AgentforEdu 综合功能测试"
echo "========================================"

run_test() {
  local id="$1"
  local msg="$2"
  local desc="$3"
  echo ""
  echo "===== [$id] $desc ====="
  echo "输入: $msg"
  echo "---"
  response=$(curl -s -X POST "$BASE/api/chat" -H "Content-Type: application/json" -b "$COOKIES" -d "{\"message\":\"$msg\"}" --max-time 120 2>&1)
  echo "$response" | head -30
  echo "..."
  echo "---(共 $(echo "$response" | wc -c) 字符)---"
}

# ========== 第一轮：模糊输入测试 ==========
echo ""
echo "##########################################################"
echo "# 第1轮：模糊/不完整输入 — AI应有追问澄清能力"
echo "##########################################################"

run_test "T1" "帮我设计课程" "模糊：什么都不说清，应追问"
sleep 3

run_test "T2" "搞个教案" "模糊：极度简略，应追问"
sleep 3

run_test "T3" "我想给学生上操作系统课" "模糊：有课程名但无具体需求"
sleep 3

run_test "T4" "PPT" "极简输入，2个字"
sleep 3

run_test "T5" "设计一个关于网络安全的，你看着办" "半模糊：有主题但无约束"
sleep 3

# ========== 第二轮：跨技能边界测试 ==========
echo ""
echo "##########################################################"
echo "# 第2轮：技能边界模糊 — 可能触发多个skill"
echo "##########################################################"

run_test "T6" "帮我设计一套计算机网络的课程，包括教案和试卷" "混合需求：课程设计+试题"
sleep 5

run_test "T7" "我要给本科生讲数据库，需要PPT和课堂练习题" "混合需求：PPT+试题"
sleep 5

run_test "T8" "帮我规划一门新课的教学安排，每节课都要有教案" "课程设计+教案设计的边界"
sleep 5

# ========== 第三轮：完全非教学问题 ==========
echo ""
echo "##########################################################"
echo "# 第3轮：非教学问题 — 应直接回答"
echo "##########################################################"

run_test "T9" "中国大学计算机专业排名" "一般知识查询"
sleep 3

run_test "T10" "什么是布鲁姆教育目标分类学" "教育理论概念"
sleep 3

run_test "T11" "今天天气怎么样" "完全无关话题"
sleep 3

# ========== 第四轮：多轮对话上下文 ==========
echo ""
echo "##########################################################"
echo "# 第4轮：多轮对话 — 上下文保持"
echo "##########################################################"

# 先开始一个chat，获取chatId
first_response=$(curl -s -X POST "$BASE/api/chat" -H "Content-Type: application/json" -b "$COOKIES" -d '{"message":"我想设计一门Python编程入门课程"}' --max-time 120)
chat_id=$(curl -s "$BASE/api/chats" -b "$COOKIES" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Chat ID: $chat_id"

run_test "T12" "目标学生是大一非计算机专业" "多轮：补充信息（应关联之前的Python课程话题）"
sleep 5

run_test "T13" "课时改成32学时，加一个数据分析项目" "多轮：进一步细化"
sleep 5

# ========== 第五轮：边缘情况 ==========
echo ""
echo "##########################################################"
echo "# 第5轮：边缘情况和压力测试"
echo "##########################################################"

run_test "T14" "好" "极简确认"
sleep 3

run_test "T15" "请给我生成一份详细的期末考试试卷，科目是高等数学，覆盖微积分和线性代数，难度适中，要有选择题、填空题、计算题和证明题" "长输入：详细需求"
sleep 5

# 英文输入
run_test "T16" "Design a course syllabus for Machine Learning" "英文输入"
sleep 5

echo ""
echo "========================================"
echo "  测试完成"
echo "========================================"
