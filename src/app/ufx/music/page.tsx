"use client";

import { useState } from "react";
import { MoreHorizontal, Pause, SkipForward } from "lucide-react";
import { musicCatalog } from "@/lib/ufx-catalog";

const tabs = ["Trending", "New Releases", "Top Charts", "For You", "Downloads"];

export default function MusicPage() {
  const [tab, setTab] = useState("Trending");
  const [playing, setPlaying] = useState(true);
  const current = musicCatalog.tracks[0];

  return (
    <div className="relative min-h-screen pb-24">
      <div className="px-4 pt-4">
        <p className="font-[family-name:var(--font-syne)] text-xs tracking-[0.28em] text-white/60">
          .UFX.
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-syne)] text-5xl font-bold italic tracking-tight">
          Music
        </h1>
      </div>

      <div className="mt-5 flex gap-5 overflow-x-auto border-b border-white/[0.06] px-4 scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`whitespace-nowrap pb-3 text-sm ${
              tab === t
                ? "border-b-2 border-[var(--ufx-accent)] font-semibold text-[var(--ufx-accent)]"
                : "text-white/45"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pt-5">
        <div className="relative overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={musicCatalog.featured.image}
            alt=""
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-2xl font-bold">{musicCatalog.featured.title}</p>
            <p className="mt-1 text-sm text-white/70">{musicCatalog.featured.subtitle}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--ufx-accent)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--ufx-accent)]">
              🔥 {musicCatalog.featured.badge}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tracks</h2>
          <button type="button" className="text-sm font-medium text-[var(--ufx-accent)]">
            See All
          </button>
        </div>

        <div className="mt-3 space-y-1">
          {musicCatalog.tracks.map((track) => (
            <button
              key={track.id}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-1 py-2.5 text-left hover:bg-white/[0.03]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={track.cover}
                alt=""
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{track.title}</p>
                <p className="truncate text-xs text-white/45">{track.artist}</p>
              </div>
              <span className="text-xs text-white/45">{track.duration}</span>
              <MoreHorizontal className="h-4 w-4 text-white/35" />
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[4.75rem] left-0 right-0 z-30 mx-auto max-w-lg px-3">
        <div className="glass-dark flex items-center gap-3 rounded-2xl px-3 py-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.cover} alt="" className="h-11 w-11 rounded-lg object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{current.title}</p>
            <p className="truncate text-[11px] text-white/45">{current.artist}</p>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
          >
            <Pause className={`h-4 w-4 ${playing ? "" : "opacity-40"}`} />
          </button>
          <SkipForward className="h-5 w-5 text-white/80" />
        </div>
      </div>
    </div>
  );
}
