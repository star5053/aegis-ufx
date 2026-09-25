import type { FeedPost } from "@/components/ufx/feed-types";

export type HomeReel = {
  id: string;
  username: string;
  caption: string;
  sound: string;
  likesLabel: string;
  commentsLabel: string;
  image: string;
  avatar: string;
  postId?: string;
  likedByMe?: boolean;
  likeCount?: number;
};

export function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
  return String(n);
}

export function postsToHomeReels(posts: FeedPost[]): HomeReel[] {
  return posts
    .filter((p) => p.imageUrl)
    .map((p) => ({
      id: p.id,
      postId: p.id,
      username: p.author.username,
      caption: p.caption,
      sound: "Original Sound — Neon Pulse",
      likesLabel: formatCount(p.likeCount),
      commentsLabel: formatCount(Math.max(892, Math.floor(p.likeCount / 14))),
      image: p.imageUrl as string,
      avatar:
        p.author.avatarUrl ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${p.author.username}&backgroundColor=111111`,
      likedByMe: p.likedByMe,
      likeCount: p.likeCount,
    }));
}
