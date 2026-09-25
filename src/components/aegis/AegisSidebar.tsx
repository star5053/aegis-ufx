"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Brain,
  Gauge,
  HardDrive,
  LineChart,
  Radio,
  ScrollText,
  Settings,
  Shield,
  ShieldAlert,
  Users,
  Wallet,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  soon?: boolean;
  id: string;
};

const nav: NavItem[] = [
  { id: "dashboard", href: "/aegis", label: "Dashboard", icon: Gauge },
  { id: "applications", href: "/aegis/applications", label: "Applications", icon: Boxes },
  { id: "users", href: "/aegis/users", label: "Users", icon: Users },
  { id: "security", href: "/aegis/security", label: "Security", icon: Shield },
  { id: "storage", href: "/aegis/applications", label: "Storage", icon: HardDrive, soon: true },
  { id: "wallet", href: "/aegis/applications", label: "Wallet", icon: Wallet, soon: true },
  { id: "live", href: "/aegis/applications", label: "Live", icon: Radio, soon: true },
  { id: "moderation", href: "/aegis/audit", label: "Moderation", icon: ShieldAlert },
  { id: "ai", href: "/aegis/audit", label: "AI", icon: Brain, soon: true },
  { id: "analytics", href: "/aegis", label: "Analytics", icon: LineChart },
  { id: "logs", href: "/aegis/audit", label: "Logs", icon: ScrollText },
  { id: "settings", href: "/aegis/security", label: "Settings", icon: Settings },
];

function isActive(pathname: string, item: NavItem) {
  if (item.id === "dashboard" || item.id === "analytics") {
    return pathname === "/aegis";
  }
  if (item.id === "applications" || item.soon) {
    return item.id === "applications" && pathname.startsWith("/aegis/applications");
  }
  return pathname.startsWith(item.href) && item.href !== "/aegis";
}

export function AegisSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[248px] shrink-0 border-r border-[var(--aegis-line)] px-4 py-5 lg:flex lg:flex-col">
      <Link href="/aegis" className="mb-8 block px-2">
        <p className="font-[family-name:var(--font-syne)] text-[26px] font-bold tracking-[0.2em]">
          AEGIS
        </p>
      </Link>
      <nav className="space-y-0.5">
        {nav.map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-[var(--aegis-accent-dim)] text-[var(--aegis-accent)] shadow-[inset_3px_0_0_0_var(--aegis-accent)]"
                  : "text-[var(--aegis-muted)] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.soon && (
                <span className="text-[9px] uppercase tracking-wider text-white/25">Soon</span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto space-y-2 px-2 pt-10">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">System Status</p>
        <p className="flex items-center gap-2 text-xs text-[var(--aegis-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--aegis-accent)]" />
          All Systems Operational
        </p>
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/25">
          AEGIS INFRASTRUCTURE v2.7.1
        </p>
      </div>
    </aside>
  );
}

export function AegisMobileNav() {
  const pathname = usePathname();
  return (
    <div className="border-b border-[var(--aegis-line)] px-4 py-2 lg:hidden">
      <div className="flex gap-2 overflow-x-auto text-xs scrollbar-hide">
        {nav.slice(0, 7).map((item) => {
          const active = isActive(pathname, item);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 ${
                active
                  ? "border-[var(--aegis-accent)]/40 bg-[var(--aegis-accent-dim)] text-[var(--aegis-accent)]"
                  : "border-white/10 text-white/60"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
