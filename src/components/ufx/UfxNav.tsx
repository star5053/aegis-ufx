"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Home, Inbox, Music2, Plus } from "lucide-react";
import { useState } from "react";
import { CreateSheet } from "./CreateSheet";

const tabs = [
  {
    href: "/ufx",
    label: "Home",
    icon: Home,
    match: (p: string) => p === "/ufx" || p.startsWith("/ufx/reels") || p === "/",
  },
  {
    href: "/ufx/music",
    label: "Music",
    icon: Music2,
    match: (p: string) => p.startsWith("/ufx/music"),
  },
  { href: "/ufx/create", label: "Create", icon: Plus, primary: true as const },
  {
    href: "/ufx/inbox",
    label: "Inbox",
    icon: Inbox,
    match: (p: string) => p.startsWith("/ufx/inbox"),
  },
  {
    href: "/ufx/game",
    label: "Game",
    icon: Gamepad2,
    match: (p: string) => p.startsWith("/ufx/game"),
  },
];

export function UfxNav() {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);
  const hideOn =
    pathname.startsWith("/ufx/live") ||
    pathname.startsWith("/ufx/login") ||
    pathname.startsWith("/ufx/wallet");

  if (hideOn) return null;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/92 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-1 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1">
          {tabs.map((tab) => {
            if ("primary" in tab && tab.primary) {
              return (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  aria-label="Create"
                  className="relative -top-3 flex w-[4.25rem] flex-col items-center justify-center"
                >
                  <span className="ufx-create-glow flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--ufx-accent)] text-white">
                    <Plus className="h-7 w-7" strokeWidth={2.8} />
                  </span>
                </button>
              );
            }

            const active = tab.match?.(pathname) ?? false;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex min-w-[3.6rem] flex-col items-center gap-0.5 px-1 py-1.5 text-[10px] font-medium ${
                  active ? "text-white" : "text-white/55"
                }`}
              >
                <tab.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.85} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <CreateSheet open={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
}
