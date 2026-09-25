import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";

export default function AegisLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-2">
      <div className="mb-8">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.25em] text-[#2ee6a6]">
          AEGIS
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-semibold">
          Staff sign in
        </h1>
        <p className="mt-2 text-sm text-[var(--aegis-muted)]">
          Control Center is restricted to platform roles. UFX users are redirected away.
        </p>
      </div>
      <div className="rounded-3xl border border-[var(--aegis-line)] bg-white/[0.03] p-5">
        <AuthForm mode="aegis" />
      </div>
      <p className="mt-6 text-center text-xs text-white/35">
        Demo: owner@aegis.dev / Demo123! ·{" "}
        <Link href="/ufx/login" className="underline">
          UFX user login
        </Link>
      </p>
    </div>
  );
}
