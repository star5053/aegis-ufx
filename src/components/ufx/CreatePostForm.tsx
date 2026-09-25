"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CreatePostForm() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/aegis/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption,
          imageUrl: imageUrl || undefined,
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        if (res.status === 401) {
          router.push("/ufx/login");
          return;
        }
        setError(json.error || "Failed");
        setLoading(false);
        return;
      }
      router.push("/ufx");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 px-4">
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-white/40">Caption</span>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
          rows={5}
          placeholder="Night views. No plans. Just vibes. #citylights"
          className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-[var(--ufx-accent)]/50"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.14em] text-white/40">
          Image URL (optional)
        </span>
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-[var(--ufx-accent)]/50"
        />
      </label>
      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-[var(--ufx-accent)] py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {loading ? "Publishing via AEGIS…" : "Publish"}
      </button>
      <p className="text-center text-xs text-white/35">
        UI → AEGIS API → Auth → Database → Audit → Feed
      </p>
    </form>
  );
}
