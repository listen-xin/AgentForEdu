"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

type Mode = "login" | "register" | "forgot";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");

  // Shared fields
  const [account, setAccount] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Verification code
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // State
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Detect if account looks like phone or email
  const isPhone = /^1[3-9]\d{9}$/.test(account);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);
  const canSendCode = (isEmail || isPhone) && !sendingCode && countdown === 0;
  const modeLabel = mode === "login" ? "登录" : mode === "register" ? "注册" : "重置密码";

  async function handleSendCode() {
    if (!canSendCode) return;
    setSendingCode(true);
    setError("");

    try {
      const body: Record<string, string> = {
        type: mode === "register" ? "register" : "reset",
      };
      if (isEmail) body.email = account;
      else if (isPhone) body.phone = account;

      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "发送失败");
        setSendingCode(false);
        return;
      }

      setCodeSent(true);
      setSendingCode(false);

      // Start countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError("发送失败，请稍后重试");
      setSendingCode(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        // Register with verification code
        const body: Record<string, string> = { password, code };
        if (isEmail) body.email = account;
        else if (isPhone) body.phone = account;
        if (name) body.name = name;

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) { setError(data.error || "注册失败"); setLoading(false); return; }
        // Auto-login after register
      }

      if (mode === "forgot") {
        // Reset password
        const body: Record<string, string> = { newPassword: password, code };
        if (isEmail) body.email = account;
        else if (isPhone) body.phone = account;

        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) { setError(data.error || "重置失败"); setLoading(false); return; }
        // Success — switch to login
        setError("");
        setMode("login");
        setCodeSent(false);
        setCode("");
        setPassword("");
        setLoading(false);
        return;
      }

      // Login (works for both register+auto-login and direct login)
      const result = await signIn("credentials", {
        account,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("账号或密码错误");
        setLoading(false);
        return;
      }

      window.location.href = "/chat";
    } catch {
      setError("操作失败，请稍后重试");
      setLoading(false);
    }
  }

  function switchMode(m: Mode) {
    setMode(m);
    setError("");
    setCode("");
    setCodeSent(false);
    setCountdown(0);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-subtle px-4">
      {/* Subtle background symbols */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[12%] text-5xl opacity-[0.04]">✦</div>
        <div className="absolute top-[70%] right-[10%] text-6xl opacity-[0.03]">◇</div>
        <div className="absolute top-[40%] right-[20%] text-4xl opacity-[0.04]">○</div>
        <div className="absolute bottom-[20%] left-[18%] text-5xl opacity-[0.03]">△</div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 mb-4">
            <span className="text-2xl">🎓</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">AgentForEdu</h1>
          <p className="text-sm text-gray-400 mt-1">高等教育 AI 智能体平台</p>
        </div>

        {/* Mode tabs */}
        <div className="flex bg-white rounded-2xl p-1 mb-6 border border-gray-100 shadow-sm">
          {([
            ["login", "登录"],
            ["register", "注册"],
            ["forgot", "找回密码"],
          ] as const).map(([m, label]) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 text-sm font-medium rounded-xl transition-all ${
                mode === m ? "bg-gray-900 text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/30 p-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">{modeLabel}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (register only) */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">姓名</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none bg-gray-50 focus:bg-white transition-all"
                  placeholder="您的姓名（选填）"
                />
              </div>
            )}

            {/* Account: email or phone */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                {mode === "register" ? "邮箱或手机号" : "邮箱 / 手机号"}
              </label>
              <input
                type="text" value={account}
                onChange={(e) => { setAccount(e.target.value); setCodeSent(false); }}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none bg-gray-50 focus:bg-white transition-all"
                placeholder={mode === "register" ? "输入邮箱或11位手机号" : "输入邮箱或手机号"}
                required
              />
              {mode === "register" && account && !isEmail && !isPhone && (
                <p className="text-[11px] text-amber-500 mt-1 ml-1">请输入有效的邮箱地址或11位手机号</p>
              )}
            </div>

            {/* Verification code (register + forgot) */}
            {(mode === "register" || mode === "forgot") && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">验证码</label>
                <div className="flex gap-2">
                  <input
                    type="text" value={code} onChange={(e) => setCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none bg-gray-50 focus:bg-white transition-all"
                    placeholder="6位验证码" maxLength={6} required
                  />
                  <button
                    type="button" onClick={handleSendCode} disabled={!canSendCode}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
                      canSendCode
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.97]"
                        : "bg-gray-100 text-gray-350 cursor-not-allowed"
                    }`}
                  >
                    {sendingCode ? "发送中..." : countdown > 0 ? `${countdown}s` : codeSent ? "重发" : "获取验证码"}
                  </button>
                </div>
                {isEmail && (
                  <p className="text-[11px] text-gray-350 mt-1 ml-1">
                    验证码将发送至邮箱（开发模式下请在浏览器控制台或终端查看）
                  </p>
                )}
                {isPhone && (
                  <p className="text-[11px] text-gray-350 mt-1 ml-1">
                    验证码将通过短信发送（开发模式下请在终端查看）
                  </p>
                )}
              </div>
            )}

            {/* Password (login + register + forgot) */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 ml-1">
                {mode === "forgot" ? "新密码" : "密码"}
              </label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none bg-gray-50 focus:bg-white transition-all"
                placeholder={mode === "forgot" ? "设置新密码（至少6位）" : "至少6位"}
                minLength={6} required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-500 text-xs text-center bg-red-50 py-2.5 rounded-xl border border-red-100">{error}</div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? "处理中..." : modeLabel}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-5 pt-4 border-t border-gray-50 flex justify-center gap-4 text-xs text-gray-400">
            {mode !== "login" && (
              <button onClick={() => switchMode("login")} className="hover:text-gray-600 transition-colors">返回登录</button>
            )}
            {mode === "login" && (
              <button onClick={() => switchMode("forgot")} className="hover:text-gray-600 transition-colors">忘记密码？</button>
            )}
          </div>
          <div className="mt-3">
            <Link href="/" className="block text-center text-xs text-gray-350 hover:text-gray-500 transition-colors">← 返回首页</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
