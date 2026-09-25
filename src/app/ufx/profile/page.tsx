import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/ufx/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      posts: { orderBy: { createdAt: "desc" }, take: 12 },
      _count: { select: { posts: true, likes: true } },
    },
  });

  if (!dbUser) redirect("/ufx/login");

  return (
    <div className="px-4 py-6">
      <div className="flex items-start gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={
            dbUser.avatarUrl ||
            `https://api.dicebear.com/9.x/avataaars/svg?seed=${dbUser.username}`
          }
          alt=""
          className="h-20 w-20 rounded-full border border-white/15 bg-white/5"
        />
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-[family-name:var(--font-syne)] text-2xl font-semibold">
            {dbUser.displayName}
          </h1>
          <p className="text-sm text-white/50">@{dbUser.username}</p>
          <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-xs text-[var(--ufx-accent)]">
            {dbUser.publicId}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/70">{dbUser.bio || "No bio yet."}</p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Posts", value: dbUser._count.posts },
          { label: "Likes given", value: dbUser._count.likes },
          { label: "2FA", value: dbUser.twoFactorEnabled ? "On" : "Off" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] py-3">
            <p className="text-lg font-semibold">{s.value}</p>
            <p className="text-[11px] text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/ufx/create"
          className="flex-1 rounded-xl bg-[var(--ufx-accent)] py-2.5 text-center text-sm font-semibold"
        >
          Create
        </Link>
        <Link
          href="/ufx/wallet"
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80"
        >
          Wallet
        </Link>
        <Link
          href="/ufx/live"
          className="rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80"
        >
          Live
        </Link>
        <LogoutButton />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex gap-4 text-sm text-white/40">
          {["Posts", "Reels", "Music", "Games"].map((t, i) => (
            <span key={t} className={i === 0 ? "font-semibold text-white" : ""}>
              {t}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {dbUser.posts.map((p) => (
            <div
              key={p.id}
              className="aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-2 text-center text-[10px] text-white/50">
                  {p.caption.slice(0, 40)}
                </div>
              )}
            </div>
          ))}
        </div>
        {dbUser.posts[0] && (
          <p className="mt-3 text-xs text-white/35">
            Latest{" "}
            {formatDistanceToNow(dbUser.posts[0].createdAt, { addSuffix: true })}
          </p>
        )}
      </div>
    </div>
  );
}
