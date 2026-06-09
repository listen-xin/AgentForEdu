import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCode } from "@/lib/verify";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, phone, code, newPassword } = await req.json();

    // Validate
    if (!email && !phone) {
      return NextResponse.json({ error: "请提供邮箱或手机号" }, { status: 400 });
    }
    if (!code) {
      return NextResponse.json({ error: "请输入验证码" }, { status: 400 });
    }
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "新密码至少6位" }, { status: 400 });
    }

    const identifier = email || phone;

    // Verify code
    const isValid = await verifyCode(identifier, code, "reset");
    if (!isValid) {
      return NextResponse.json({ error: "验证码错误或已过期" }, { status: 400 });
    }

    // Find user and update password
    let user = null;
    if (email) {
      user = await prisma.user.findUnique({ where: { email } });
    } else if (phone) {
      user = await prisma.user.findUnique({ where: { phone } });
    }

    if (!user) {
      return NextResponse.json({ error: "账号不存在" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "重置失败，请稍后重试" }, { status: 500 });
  }
}
