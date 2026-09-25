"use client";

import { useMemo, useState } from "react";
import {
  Bookmark,
  Gift,
  Heart,
  MessageCircle,
  Music2,
  Plus,
  Share2,
} from "lucide-react";
import { formatCount, type HomeReel } from "@/lib/home-reels";

export type { HomeReel };

export function HomeForYou({
  reels,
  initialIndex = 0,
}: {
  reels: HomeReel[];
  initialIndex?: number;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [items, setItems] = useState(reels);
  const [busy, setBusy] = useState(false);
  const [touchY, setTouchY] = useState<number | null>(null);
  const reel = items[index] ?? items[0];

  const likesDisplay = useMemo(() => {
    if (typeof reel?.likeCount === "number") return formatCount(reel.likeCount);
    return reel?.likesLabel ?? "0";
  }, [reel]);

  async function toggleLike() {
    if (busy || !reel) return;

    if (!reel.postId) {
      setItems((prev) =>
        prev.map((r, i) =>
          i === index
            ? {
                ...r,
                likedByMe: !r.likedByMe,
                likeCount: (r.likeCount ?? 12400) + (r.likedByMe ? -1 : 1),
              }
            : r,
        ),
      );
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`/api/aegis/posts/${reel.postId}/like`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.ok) {
        setItems((prev) =>
          prev.map((r, i) =>
            i === index
              ? {
                  ...r,
                  likedByMe: json.data.liked,
                  likeCount: json.data.likeCount,
                }
              : r,
          ),
        );
      } else if (res.status === 401) {
        window.location.href = "/ufx/login";
      }
    } finally {
      setBusy(false);
    }
  }

  function go(delta: number) {
    setIndex((i) => {
      const next = i + delta;
      if (next < 0) return items.length - 1;
      if (next >= items.length) return 0;
      return next;
    });
  }

  if (!reel) return null;

  const captionLines = reel.caption.split(/(?<=\.)\s+/);

  return (
    <div
      data-ufx-home
      className="fixed inset-y-0 left-1/2 z-10 h-[100dvh] w-full max-w-lg -translate-x-1/2 overflow-hidden bg-black"
      onTouchStart={(e) => setTouchY(e.touches[0]?.clientY ?? null)}
      onTouchEnd={(e) => {
        if (touchY == null) return;
        const dy = (e.changedTouches[0]?.clientY ?? touchY) - touchY;
        if (Math.abs(dy) > 48) go(dy < 0 ? 1 : -1);
        setTouchY(null);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reel.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      <div className="pointer-events-none relative z-20 flex h-full flex-col">
        <header className="flex items-center justify-center px-4 pt-[max(0.85rem,env(safe-area-inset-top))]">
          <p className="font-[family-name:var(--font-instrument)] text-[26px] leading-none tracking-[0.18em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            .UFX.
          </p>
        </header>

        <div className="pointer-events-auto mt-auto flex items-end justify-between gap-3 px-3.5 pb-[calc(4.85rem+env(safe-area-inset-bottom))]">
          <div className="min-w-0 flex-1 space-y-1.5 pb-2 pr-2">
            <p className="text-[15px] font-bold tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
              @{reel.username}
            </p>
            <p className="max-w-[14.5rem] text-[13px] leading-[1.35] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
              {captionLines.length > 1 ? (
                <>
                  {captionLines[0]}
                  <br />
                  {captionLines.slice(1).join(" ")}
                </>
              ) : (
                reel.caption
              )}
            </p>
            <p className="flex max-w-[14.5rem] items-center gap-1.5 text-[12px] text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]">
              <Music2 className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              <span className="truncate">{reel.sound}</span>
            </p>
          </div>

          {/* Match Images/2: Like → Comment → Gift → Share → Save → Avatar */}
          <div className="flex shrink-0 flex-col items-center gap-[1.15rem] pb-1">
            <button
              type="button"
              onClick={toggleLike}
              className="flex flex-col items-center gap-0.5"
              aria-label={reel.likedByMe ? "Unlike" : "Like"}
            >
              <Heart
                className={`h-[34px] w-[34px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] ${
                  reel.likedByMe
                    ? "fill-[var(--ufx-accent)] text-[var(--ufx-accent)]"
                    : "text-white"
                }`}
              />
              <span className="text-[11px] font-semibold text-white drop-shadow">
                {likesDisplay}
              </span>
            </button>

            <button type="button" className="flex flex-col items-center gap-0.5 text-white">
              <MessageCircle
                className="h-[34px] w-[34px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                strokeWidth={1.6}
              />
              <span className="text-[11px] font-semibold drop-shadow">{reel.commentsLabel}</span>
            </button>

            <button type="button" className="text-white" aria-label="Gift">
              <Gift
                className="h-[34px] w-[34px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                strokeWidth={1.6}
              />
            </button>

            <button type="button" className="flex flex-col items-center gap-0.5 text-white">
              <Share2
                className="h-[30px] w-[30px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                strokeWidth={1.6}
              />
              <span className="text-[11px] font-medium drop-shadow">Share</span>
            </button>

            <button type="button" className="flex flex-col items-center gap-0.5 text-white">
              <Bookmark
                className="h-[30px] w-[30px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]"
                strokeWidth={1.6}
              />
              <span className="text-[11px] font-medium drop-shadow">Save</span>
            </button>

            <div className="relative mt-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={reel.avatar}
                alt=""
                className="h-11 w-11 rounded-full border-[1.5px] border-white object-cover shadow-lg"
              />
              <span className="absolute -bottom-1 left-1/2 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full bg-[var(--ufx-accent)] shadow">
                <Plus className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
