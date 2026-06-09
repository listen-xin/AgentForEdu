import { NextRequest, NextResponse } from "next/server";
import { sendEmailCode, sendSmsCode, checkIdentifierExists } from "@/lib/verify";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, type } = await req.json();

    if (!type || !["register", "reset"].includes(type)) {
      return NextResponse.json({ error: "无效的验证类型" }, { status: 400 });
    }

    // Must provide email or phone
    if (!email && !phone) {
      return NextResponse.json({ error: "请提供邮箱或手机号" }, { status: 400 });
    }

    // For registration, check if already exists
    if (type === "register") {
      const exists = await checkIdentifierExists(email, phone);
      if (exists) {
        return NextResponse.json({ error: exists.message }, { status: 400 });
      }
    }

    // For password reset, check if user exists
    if (type === "reset") {
      const { prisma } = await import("@/lib/db");
      let user = null;
      if (email) user = await prisma.user.findUnique({ where: { email } });
      else if (phone) user = await prisma.user.findUnique({ where: { phone } });

      if (!user) {
        return NextResponse.json({ error: "该账号不存在" }, { status: 400 });
      }
    }

    // Send code
    if (email) {
      const result = await sendEmailCode(email, type);
      if (!result.success) {
        return NextResponse.json({ error: result.error || "发送失败" }, { status: 500 });
      }
    } else if (phone) {
      const result = await sendSmsCode(phone, type);
      if (!result.success) {
        return NextResponse.json({ error: result.error || "发送失败" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send code error:", err);
    return NextResponse.json({ error: "发送失败，请稍后重试" }, { status: 500 });
  }
}
