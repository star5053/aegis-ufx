"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const missingDb =
    error.message.includes("DATABASE_URL") ||
    error.message.includes("Can't reach database") ||
    error.message.includes("P1001") ||
    error.message.includes("does not exist");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#04060c] px-6 text-white">
      <div className="max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.2em] text-[#2ee6a6]">
          AEGIS
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-syne)] text-2xl font-semibold">
          {missingDb ? "Database not connected" : "Something went wrong"}
        </h1>
        <p className="mt-3 text-sm text-white/55">
          {missingDb
            ? "Set DATABASE_URL to a PostgreSQL database (Neon is free and works with Vercel), then run db push + seed."
            : error.message}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
