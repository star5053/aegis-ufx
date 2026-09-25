"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton({ redirectTo = "/ufx/login" }: { redirectTo?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/aegis/auth/logout", { method: "POST" });
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:text-white disabled:opacity-50"
    >
      {loading ? "…" : "Logout"}
    </button>
  );
}
