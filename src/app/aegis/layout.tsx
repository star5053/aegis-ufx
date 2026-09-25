import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";
import { AegisMobileNav, AegisSidebar } from "@/components/aegis/AegisSidebar";
import { Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AegisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="aegis-shell">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <AegisSidebar />
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[var(--aegis-line)] px-4 py-4 md:px-8">
            <div className="lg:hidden">
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold tracking-[0.16em]">
                AEGIS
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-[var(--aegis-line)] bg-[var(--aegis-panel)] px-3 py-1.5 text-xs sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--aegis-accent)]" />
                UFX
              </span>
              <Link
                href="/ufx"
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white"
              >
                Open UFX
              </Link>
              <AegisHeaderActions />
            </div>
          </header>
          <AegisMobileNav />
          <main className="px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

async function AegisHeaderActions() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <Link
        href="/aegis/login"
        className="rounded-full bg-[var(--aegis-accent)] px-3 py-1.5 text-xs font-semibold text-black"
      >
        Staff login
      </Link>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 sm:flex">
        <Shield className="h-4 w-4 text-[var(--aegis-accent)]" />
        <div className="text-right">
          <p className="text-sm font-medium">Operator Session</p>
          <p className="text-[10px] text-[var(--aegis-accent)]">
            Admin · Level 5 · {user.role.replaceAll("_", " ")}
          </p>
        </div>
      </div>
      <LogoutButton redirectTo="/aegis/login" />
    </div>
  );
}
