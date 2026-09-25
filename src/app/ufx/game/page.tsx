"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Coins,
  Disc3,
  MessageCircleQuestion,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { gameCatalog } from "@/lib/ufx-catalog";

const categories = ["Featured", "Popular", "Racing", "Wrestling", "Mini Games", "My Games"];

export default function GamePage() {
  const [cat, setCat] = useState("Featured");

  return (
    <div className="px-4 pb-8 pt-4">
      <div className="flex flex-wrap items-end gap-2">
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Game</h1>
        <span className="pb-1 font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.18em] text-[var(--ufx-accent)]">
          .UFX.
        </span>
        <span className="pb-1 text-xs tracking-[0.2em] text-white/45">GAMES HUB</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`inline-flex h-9 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-xs font-medium leading-none ${
              cat === c
                ? "bg-[var(--ufx-accent)] text-white"
                : "bg-[var(--ufx-elevated)] text-white/60"
            }`}
          >
            {c === "Featured" && <Star className="h-3.5 w-3.5 shrink-0" />}
            {c}
          </button>
        ))}
      </div>

      <div className="relative mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={gameCatalog.featured.image}
          alt=""
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--ufx-accent)]">
            FEATURED
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-syne)] text-3xl font-extrabold italic tracking-wide">
            {gameCatalog.featured.title}
          </h2>
          <div className="mt-2 h-0.5 w-10 bg-[var(--ufx-accent)]" />
          <p className="mt-2 max-w-xs text-sm text-white/75">{gameCatalog.featured.subtitle}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--ufx-accent)] px-5 py-2.5 text-sm font-semibold"
          >
            Create Room
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="mt-4 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-[var(--ufx-accent)]" : "bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Game Rooms</h3>
        <button type="button" className="text-sm text-white/45">
          View All &gt;
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {gameCatalog.rooms.map((room) => (
          <div
            key={room.id}
            className="flex items-center gap-3 rounded-2xl bg-[var(--ufx-elevated)] px-3 py-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[var(--ufx-accent)]">
              {room.kind === "racing" && <Disc3 className="h-6 w-6" />}
              {room.kind === "wrestling" && <Shield className="h-6 w-6" />}
              {room.kind === "quiz" && <MessageCircleQuestion className="h-6 w-6" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{room.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/45">
                <Users className="h-3 w-3" />
                {room.players}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/85"
            >
              <Coins className="h-3.5 w-3.5 text-[var(--ufx-gold)]" />
              {room.entry} Entry
              <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-white/35">
        Coin entry is enforced by AEGIS Game Service — results are server-authoritative.
      </p>
      <Link href="/ufx/wallet" className="mt-2 block text-center text-xs text-[var(--ufx-accent)]">
        Open Wallet →
      </Link>
    </div>
  );
}
