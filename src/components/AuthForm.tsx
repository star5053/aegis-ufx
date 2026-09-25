"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type Mode = "ufx" | "aegis";

export function AuthForm({
  mode,
  intent = "login",
}: {
  mode: Mode;
  intent?: "login" | "register";
}) {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(intent === "register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accent = mode === "ufx" ? "#ff2d6a" : "#2ee6a6";
  const redirectTo = mode === "ufx" ? "/ufx" : "/aegis";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
      username: String(form.get("username") || ""),
      displayName: String(form.get("displayName") || ""),
    };

    try {
      const res = await fetch(
        isRegister ? "/api/aegis/auth/register" : "/api/aegis/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json();
      if (!json.ok) {
        setError(json.error || "Request failed");
        setLoading(false);
        return;
      }

      if (mode === "aegis" && json.data.user.role === "USER") {
        await fetch("/api/aegis/auth/logout", { method: "POST" });
        setError("This account is a UFX user. Use an AEGIS staff account for Control Center.");
        setLoading(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isRegister && (
        <>
          <Field label="Display name" name="displayName" placeholder="Henry" required />
          <Field label="Username" name="username" placeholder="henry" required />
        </>
      )}
      <Field
        label="Email"
        name="email"
        type="email"
        placeholder={mode === "aegis" ? "owner@aegis.dev" : "henry@ufx.app"}
        required
      />
      <Field
        label="Password"
        name="password"
        type="password"
        placeholder="Demo123!"
        required
      />

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-black transition disabled:opacity-60"
        style={{ background: accent }}
      >
        {loading ? "Working…" : isRegister ? "Create AEGIS ID" : "Sign in"}
      </button>

      {mode === "ufx" && (
        <button
          type="button"
          onClick={() => setIsRegister((v) => !v)}
          className="w-full text-center text-sm text-white/50 hover:text-white/80"
        >
          {isRegister ? "Already have an account? Sign in" : "New here? Create account"}
        </button>
      )}

      <p className="text-center text-xs text-white/35">
        Auth runs through AEGIS Identity ·{" "}
        <Link href="/" className="underline underline-offset-2">
          Architecture
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-[0.14em] text-white/40">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-sm outline-none ring-0 placeholder:text-white/25 focus:border-white/30"
      />
    </label>
  );
}
