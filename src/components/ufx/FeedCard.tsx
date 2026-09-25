"use client";

import { useState } from "react";
import {
  Bookmark,
  Gift,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import Link from "next/link";
import type { FeedPost } from "@/components/ufx/feed-types";

export type { FeedPost };

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

export function FeedCard({ post: initial }: { post: FeedPost }) {
  const [post, setPost] = useState(initial);
  const [busy, setBusy] = useState(false);
  const hashtags = post.caption.match(/#[\w]+/g) ?? [];
  const body = post.caption.replace(/#[\w]+/g, "").trim();
  // Engagement placeholders until comment/gift/share services ship on AEGIS
  const comments = Math.max(12, post.likeCount * 3 + 18);
  const gifts = Math.max(6, post.likeCount * 2 + 8);
  const shares = Math.max(20, post.likeCount * 4 + 32);

  async function toggleLike() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/aegis/posts/${post.id}/like`, { method: "POST" });
      const json = await res.json();
      if (json.ok) {
        setPost((p) => ({
          ...p,
          likedByMe: json.data.liked,
          likeCount: json.data.likeCount,
        }));
      } else if (res.status === 401) {
        window.location.href = "/ufx/login";
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="border-b border-white/[0.06] pb-5">
      <div className="mb-3 flex items-center gap-3 px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            post.author.avatarUrl ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${post.author.username}`
          }
          alt=""
          className="h-9 w-9 rounded-full border border-white/10 object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">@{post.author.username}</p>
        </div>
        <button type="button" className="text-white/40" aria-label="More">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {post.imageUrl ? (
        <div className="relative mx-4 overflow-hidden rounded-[22px] bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.imageUrl} alt="" className="aspect-[4/5] w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-4 right-3 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={toggleLike}
              className="flex flex-col items-center gap-1"
            >
              <Heart
                className={`h-7 w-7 drop-shadow-lg ${
                  post.likedByMe
                    ? "fill-[var(--ufx-accent)] text-[var(--ufx-accent)]"
                    : "text-white"
                }`}
              />
              <span className="text-xs font-semibold text-white drop-shadow">
                {formatCount(Math.max(post.likeCount, post.likedByMe ? 1 : 0))}
              </span>
            </button>
            <Link href="/ufx/reels" className="flex flex-col items-center gap-1 text-white">
              <MessageCircle className="h-7 w-7 drop-shadow-lg" />
              <span className="text-xs font-semibold drop-shadow">{formatCount(comments)}</span>
            </Link>
            <span className="flex flex-col items-center gap-1 text-white">
              <Gift className="h-7 w-7 drop-shadow-lg" />
              <span className="text-xs font-semibold drop-shadow">{formatCount(gifts)}</span>
            </span>
            <span className="flex flex-col items-center gap-1 text-white">
              <Share2 className="h-7 w-7 drop-shadow-lg" />
              <span className="text-xs font-semibold drop-shadow">{formatCount(shares)}</span>
            </span>
            <Bookmark className="h-7 w-7 text-white drop-shadow-lg" />
          </div>
        </div>
      ) : (
        <div className="mx-4 rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-6">
          <p className="text-[15px] leading-relaxed text-white/90">{body || post.caption}</p>
        </div>
      )}

      <div className="mt-3 px-4">
        {post.imageUrl && body && (
          <p className="text-[14px] leading-relaxed text-white/90">{body}</p>
        )}
        {hashtags.length > 0 && (
          <p className="mt-1 text-[13px] font-medium text-[var(--ufx-accent)]">
            {hashtags.join(" ")}
          </p>
        )}
      </div>
    </article>
  );
}
