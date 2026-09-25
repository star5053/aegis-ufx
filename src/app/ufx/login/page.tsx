import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";

export default function UfxLoginPage() {
  return (
    <div className="px-4 py-10">
      <div className="mb-8 text-center">
        <p className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-[0.28em]">
          .UFX.
        </p>
        <p className="mt-2 text-sm text-white/50">
          Sign in with your AEGIS ID — identity is platform-owned
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <AuthForm mode="ufx" />
      </div>
      <p className="mt-6 text-center text-xs text-white/35">
        Demo: henry@ufx.app / Demo123! ·{" "}
        <Link href="/aegis/login" className="underline">
          Staff? Use Control Center
        </Link>
      </p>
    </div>
  );
}
