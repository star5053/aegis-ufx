"use client";

import Link from "next/link";
import {
  Clapperboard,
  Gamepad2,
  Music2,
  Pencil,
  Radio,
  Square,
  X,
} from "lucide-react";

const options = [
  { label: "Post", href: "/ufx/create?type=post", icon: Pencil },
  { label: "Reel", href: "/ufx/reels", icon: Clapperboard },
  { label: "Story", href: "/ufx/create?type=story", icon: Square },
  { label: "Music", href: "/ufx/music", icon: Music2 },
  { label: "Live", href: "/ufx/live", icon: Radio },
  { label: "Game Room", href: "/ufx/game", icon: Gamepad2 },
];

export function CreateSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close create menu"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-lg animate-rise rounded-t-[28px] border border-white/10 bg-[#121212] pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="flex justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        <div className="relative px-6 pb-2 pt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-3 rounded-full p-2 text-white/40 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-[family-name:var(--font-syne)] text-xs tracking-[0.35em] text-white/70">
            .UFX.
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-instrument)] text-4xl tracking-wide text-white">
            CREATE
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-[var(--ufx-accent)]" />
        </div>
        <div className="mt-2 px-2">
          {options.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-4 border-b border-white/[0.06] px-4 py-4 text-[15px] text-white transition hover:bg-white/[0.03]"
            >
              <item.icon className="h-5 w-5 text-white/90" strokeWidth={1.7} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
