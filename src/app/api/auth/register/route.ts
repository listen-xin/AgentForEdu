import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCode, isVerificationEnabled } from "@/lib/verify";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password, code } = await req.json();

    if (!email && !phone) {
      return NextResponse.json({ error: "请提供邮箱或手机号" }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "密码至少6位" }, { status: 400 });
    }
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      return NextResponse.json({ error: "手机号格式不正确" }, { status: 400 });
    }

    // Check duplicates
    const { checkIdentifierExists } = await import("@/lib/verify");
    const exists = await checkIdentifierExists(email, phone);
    if (exists) {
      return NextResponse.json({ error: exists.message }, { status: 400 });
    }

    // Verify code only if verification is enabled
    if (isVerificationEnabled()) {
      if (!code) {
        return NextResponse.json({ error: "请输入验证码" }, { status: 400 });
      }
      const identifier = email || phone;
      const isValid = await verifyCode(identifier, code, "register");
      if (!isValid) {
        return NextResponse.json({ error: "验证码错误或已过期" }, { status: 400 });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name: name || (email ? email.split("@")[0] : phone!.slice(-4)),
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "注册失败，请稍后重试" }, { status: 500 });
  }
}
