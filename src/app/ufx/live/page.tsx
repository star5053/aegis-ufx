"use client";

import Link from "next/link";
import {
  Eye,
  Gift,
  Heart,
  MoreHorizontal,
  Send,
  Share2,
  Smile,
} from "lucide-react";
import { liveDemo } from "@/lib/ufx-catalog";

export default function LivePage() {
  return (
    <div className="fixed inset-0 z-20 mx-auto max-w-lg overflow-hidden bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={liveDemo.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35" />

      <div className="relative z-10 flex h-full flex-col px-4 pb-6 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[var(--ufx-accent)] px-2 py-0.5 text-[11px] font-bold tracking-wide">
              LIVE
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/45 px-2.5 py-1 text-xs backdrop-blur">
              <Eye className="h-3.5 w-3.5" />
              {liveDemo.viewers}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Heart className="h-5 w-5" />
            <Gift className="h-5 w-5" />
            <Share2 className="h-5 w-5" />
          </div>
        </div>

        <div className="relative mt-auto">
          <div className="pointer-events-none absolute bottom-28 right-2 h-40 w-24">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="petal absolute text-lg"
                style={{
                  right: `${i * 14}px`,
                  bottom: `${i * 8}px`,
                  animationDelay: `${i * 0.45}s`,
                }}
              >
                🌹
              </span>
            ))}
          </div>

          <div className="mb-4 max-w-[80%] space-y-2.5">
            {liveDemo.chat.map((m, idx) => (
              <div key={idx} className="flex items-start gap-2 text-[13px]">
                {!m.gift && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${m.user}`}
                    alt=""
                    className="mt-0.5 h-6 w-6 rounded-full"
                  />
                )}
                {m.gift ? (
                  <p className="rounded-full bg-black/35 px-2.5 py-1 text-pink-200 backdrop-blur">
                    <Heart className="mr-1 inline h-3.5 w-3.5 fill-pink-400 text-pink-400" />
                    <span className="font-semibold">{m.user}</span> {m.text}
                  </p>
                ) : (
                  <p className="rounded-2xl bg-black/35 px-2.5 py-1.5 backdrop-blur">
                    <span className="font-semibold">{m.user}</span>{" "}
                    <span className="text-white/90">{m.text}</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex flex-1 items-center rounded-full bg-black/45 px-3 py-2.5 backdrop-blur">
              <input
                placeholder="Say something..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
              />
              <button type="button" className="text-[var(--ufx-accent)]">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between px-1 text-white">
            <Smile className="h-6 w-6" />
            <div className="flex items-center gap-5">
              <Heart className="h-6 w-6" />
              <Gift className="h-6 w-6" />
              <MoreHorizontal className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <Link
        href="/ufx"
        className="absolute left-4 top-14 z-20 rounded-full bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur"
      >
        Leave
      </Link>
    </div>
  );
}
