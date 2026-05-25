import { NextResponse } from "next/server";
import { skills } from "@/lib/skills";

export async function GET() {
  return NextResponse.json(
    skills.map(({ systemPrompt, ...rest }) => rest)
  );
}
