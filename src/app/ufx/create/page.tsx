import { CreatePostForm } from "@/components/ufx/CreatePostForm";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/ufx/login");
  const { type } = await searchParams;
  const mode = type === "story" ? "Story" : "Post";

  return (
    <div className="py-5">
      <div className="mb-6 px-4 text-center">
        <p className="font-[family-name:var(--font-syne)] text-xs tracking-[0.35em] text-white/60">
          .UFX.
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-instrument)] text-4xl tracking-wide">
          CREATE
        </h1>
        <div className="mx-auto mt-3 h-px w-14 bg-[var(--ufx-accent)]" />
        <p className="mt-3 text-sm text-white/45">
          Publishing a {mode} through AEGIS Content API
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-2 px-4">
        {[
          { label: "Post", href: "/ufx/create?type=post", live: true },
          { label: "Reel", href: "/ufx/reels", live: true },
          { label: "Story", href: "/ufx/create?type=story", live: true },
          { label: "Music", href: "/ufx/music", live: true },
          { label: "Live", href: "/ufx/live", live: true },
          { label: "Game Room", href: "/ufx/game", live: true },
        ].map((o) => (
          <Link
            key={o.label}
            href={o.href}
            className={`rounded-2xl border px-2 py-3 text-center text-sm ${
              o.label === mode || (mode === "Post" && o.label === "Post" && !type)
                ? "border-[var(--ufx-accent)]/60 bg-[var(--ufx-accent)]/15"
                : "border-white/10 bg-white/[0.03] text-white/70"
            }`}
          >
            {o.label}
          </Link>
        ))}
      </div>

      <CreatePostForm />
    </div>
  );
}
