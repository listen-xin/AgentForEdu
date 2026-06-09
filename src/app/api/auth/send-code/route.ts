import { NextRequest, NextResponse } from "next/server";
import { sendEmailCode, sendSmsCode, checkIdentifierExists, isVerificationEnabled } from "@/lib/verify";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, type } = await req.json();

    if (!type || !["register", "reset"].includes(type)) {
      return NextResponse.json({ error: "无效的验证类型" }, { status: 400 });
    }

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
      let user = null;
      if (email) user = await prisma.user.findUnique({ where: { email } });
      else if (phone) user = await prisma.user.findUnique({ where: { phone } });
      if (!user) {
        return NextResponse.json({ error: "该账号不存在" }, { status: 400 });
      }
    }

    // Send code
    let sentCode: string | null = null;
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

    // When verification is disabled, return the code in the response (dev mode)
    if (!isVerificationEnabled()) {
      const identifier = email || phone;
      const record = await prisma.verificationCode.findFirst({
        where: { identifier, type, used: false },
        orderBy: { createdAt: "desc" },
      });
      sentCode = record?.code || null;
    }

    return NextResponse.json({
      success: true,
      devCode: sentCode, // only present when verification is disabled
    });
  } catch (err) {
    console.error("Send code error:", err);
    return NextResponse.json({ error: "发送失败，请稍后重试" }, { status: 500 });
  }
}
