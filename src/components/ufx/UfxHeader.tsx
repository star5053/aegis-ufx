import Link from "next/link";
import { Bell, Camera, Search } from "lucide-react";
import type { SessionUser } from "@/lib/auth";

export function UfxHeader({
  user,
  variant = "home",
}: {
  user: SessionUser | null;
  variant?: "home" | "minimal";
}) {
  return (
    <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        {variant === "home" ? (
          <button className="rounded-full p-2 text-white/80" aria-label="Camera">
            <Camera className="h-5 w-5" />
          </button>
        ) : (
          <span className="w-9" />
        )}
        <Link
          href="/ufx"
          className="font-[family-name:var(--font-syne)] text-[22px] font-bold tracking-[0.28em] text-white"
        >
          .UFX.
        </Link>
        <div className="flex items-center gap-0.5">
          <Link href="/ufx/inbox" className="rounded-full p-2 text-white/80" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/ufx/inbox" className="relative rounded-full p-2 text-white/80" aria-label="Alerts">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--ufx-accent)]" />
          </Link>
          {user ? (
            <Link href="/ufx/profile" className="ml-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  user.avatarUrl ||
                  `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`
                }
                alt=""
                className="h-7 w-7 rounded-full border border-white/20"
              />
            </Link>
          ) : (
            <Link
              href="/ufx/login"
              className="ml-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-black"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
