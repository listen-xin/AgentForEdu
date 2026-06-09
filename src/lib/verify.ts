import { prisma } from "./db";
import crypto from "crypto";

/**
 * Whether real verification codes are enabled.
 * Requires SMTP (email) or Aliyun (SMS) to be configured.
 * When disabled, any 6-digit code is accepted (dev/test mode).
 */
export function isVerificationEnabled(): boolean {
  return !!(process.env.SMTP_HOST || process.env.ALIYUN_ACCESS_KEY_ID);
}

/**
 * Send a verification code to an email address via SMTP.
 * In development mode, the code is logged to console.
 */
export async function sendEmailCode(email: string, type: "register" | "reset"): Promise<{ success: boolean; error?: string }> {
  const code = generateCode();

  // Store code in DB
  await prisma.verificationCode.create({
    data: {
      identifier: email,
      code,
      type,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  // Try to send via SMTP if configured, otherwise log to console
  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    try {
      const nodemailer = await import("nodemailer").catch(() => null);
      if (!nodemailer) {
        console.error("[EMAIL] nodemailer module failed to load");
        return { success: false, error: "邮件服务暂不可用" };
      }
      const transporter = nodemailer.default.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const subject = type === "register" ? "AgentForEdu 注册验证码" : "AgentForEdu 密码重置验证码";
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject,
        text: `您的验证码是：${code}，有效期 10 分钟。`,
        html: `<p>您的验证码是：<strong style="font-size:24px;letter-spacing:4px">${code}</strong></p><p>有效期 10 分钟。</p>`,
      });
      console.log(`[EMAIL] Code sent to ${email}`);
    } catch (err) {
      console.error(`[EMAIL] Failed to send to ${email}:`, err);
      // In development, continue — code is in DB and logged
    }
  } else {
    // Development mode: log to console
    console.log(`\n═══ 验证码 [${type}] ═══`);
    console.log(`  收件人: ${email}`);
    console.log(`  验证码: ${code}`);
    console.log(`  有效期: 10 分钟`);
    console.log(`══════════════════════\n`);
  }

  return { success: true };
}

/**
 * Send a verification code to a Chinese mainland phone number via SMS.
 * In development mode, the code is logged to console.
 */
export async function sendSmsCode(phone: string, type: "register" | "reset"): Promise<{ success: boolean; error?: string }> {
  // Validate Chinese phone number format
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return { success: false, error: "手机号格式不正确" };
  }

  const code = generateCode();

  // Store code in DB
  await prisma.verificationCode.create({
    data: {
      identifier: phone,
      code,
      type,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  // Try Aliyun SMS if configured
  const aliyunAccessKey = process.env.ALIYUN_ACCESS_KEY_ID;
  if (aliyunAccessKey) {
    try {
      await sendAliyunSms(phone, code, type);
      console.log(`[SMS] Code sent to ${phone}`);
    } catch (err) {
      console.error(`[SMS] Failed to send to ${phone}:`, err);
    }
  } else {
    // Development mode: log to console
    console.log(`\n═══ 验证码 [${type}] ═══`);
    console.log(`  手机号: ${phone}`);
    console.log(`  验证码: ${code}`);
    console.log(`  有效期: 10 分钟`);
    console.log(`══════════════════════\n`);
  }

  return { success: true };
}

/**
 * Verify a code for the given identifier.
 */
export async function verifyCode(
  identifier: string,
  code: string,
  type: "register" | "reset"
): Promise<boolean> {
  const record = await prisma.verificationCode.findFirst({
    where: {
      identifier,
      code,
      type,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return false;

  // Mark as used
  await prisma.verificationCode.update({
    where: { id: record.id },
    data: { used: true },
  });

  return true;
}

/**
 * Check if email or phone is already registered.
 */
export async function checkIdentifierExists(
  email?: string,
  phone?: string
): Promise<{ field: string; message: string } | null> {
  if (email) {
    const byEmail = await prisma.user.findUnique({ where: { email } });
    if (byEmail) return { field: "email", message: "该邮箱已被注册" };
  }
  if (phone) {
    const byPhone = await prisma.user.findUnique({ where: { phone } });
    if (byPhone) return { field: "phone", message: "该手机号已被注册" };
  }
  return null;
}

function generateCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// ─── Aliyun SMS (real API call with HMAC-SHA1 signing) ───

async function sendAliyunSms(phone: string, code: string, type: "register" | "reset") {
  const accessKeyId = process.env.ALIYUN_ACCESS_KEY_ID!;
  const accessKeySecret = process.env.ALIYUN_ACCESS_KEY_SECRET!;
  const signName = process.env.ALIYUN_SMS_SIGN_NAME || "AgentForEdu";
  const templateCode =
    type === "register"
      ? process.env.ALIYUN_SMS_TEMPLATE_REGISTER || "SMS_XXXXXXXXX"
      : process.env.ALIYUN_SMS_TEMPLATE_RESET || "SMS_XXXXXXXXX";

  const params: Record<string, string> = {
    AccessKeyId: accessKeyId,
    Action: "SendSms",
    Format: "JSON",
    PhoneNumbers: phone,
    SignName: signName,
    TemplateCode: templateCode,
    TemplateParam: JSON.stringify({ code }),
    SignatureMethod: "HMAC-SHA1",
    SignatureVersion: "1.0",
    Timestamp: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    SignatureNonce: crypto.randomUUID().replace(/-/g, ""),
    Version: "2017-05-25",
  };

  // Sort keys alphabetically for canonical query string
  const sortedKeys = Object.keys(params).sort();
  const canonicalQuery = sortedKeys
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join("&");

  // Build string to sign: GET&%2F&<encoded canonical query>
  const stringToSign = `GET&${encodeURIComponent("/")}&${encodeURIComponent(canonicalQuery)}`;

  // HMAC-SHA1 sign
  const hmac = crypto.createHmac("sha1", `${accessKeySecret}&`);
  hmac.update(stringToSign);
  const signature = hmac.digest("base64");

  const finalParams = new URLSearchParams(params);
  finalParams.set("Signature", signature);

  const response = await fetch(
    `https://dysmsapi.aliyuncs.com/?${finalParams.toString()}`,
    { method: "GET" }
  );

  const result = await response.json();
  if (result.Code !== "OK") {
    throw new Error(`Aliyun SMS error: ${result.Code} — ${result.Message}`);
  }
}
