import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const checks: Record<string, string> = {};

  // Check environment
  checks.env = process.env.DATABASE_URL ? "ok" : "missing DATABASE_URL";
  checks.ai = process.env.AI_API_KEY ? "ok" : "missing AI_API_KEY";
  checks.auth = process.env.AUTH_SECRET ? "ok" : "missing AUTH_SECRET";

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch (e: any) {
    checks.database = `error: ${e?.message || "unknown"}`;
  }

  // Check if verification is enabled
  const verifyEnabled = !!(process.env.SMTP_HOST || process.env.ALIYUN_ACCESS_KEY_ID);
  checks.verification = verifyEnabled ? "email/sms" : "dev (code in response)";

  const allOk = Object.values(checks).every((v) => v === "ok");

  return NextResponse.json({
    status: allOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
}
