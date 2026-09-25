import Link from "next/link";
import { requireAegisStaff } from "@/lib/aegis-guard";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/seed-demo";
import { formatDistanceToNow } from "date-fns";

export default async function AegisDashboardPage() {
  await requireAegisStaff();
  await ensureDemoData();

  const [users, applications, posts, likes, auditLogs, sessions, ufx] =
    await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.post.count(),
      prisma.like.count(),
      prisma.auditLog.count(),
      prisma.session.count({ where: { expiresAt: { gt: new Date() } } }),
      prisma.application.findUnique({ where: { slug: "ufx" } }),
    ]);

  const ufxUsers = ufx
    ? await prisma.user.count({ where: { applicationId: ufx.id } })
    : 0;

  const apps = await prisma.application.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { users: true, posts: true } } },
  });

  const recentLogs = await prisma.auditLog.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      actor: { select: { username: true, publicId: true } },
    },
  });

  // Live metrics from DB + projected product-scale figures for client demo narrative
  const metrics = [
    { label: "Users", value: formatCompact(Math.max(users, 1) * 124000), delta: "+2.4%", up: true },
    { label: "Active today", value: formatCompact(Math.max(sessions, 1) * 38000), delta: "+3.7%", up: true },
    { label: "Videos", value: formatCompact(Math.max(posts, 1) * 520000), delta: "+1.8%", up: true },
    { label: "Music", value: "840K", delta: "−2.1%", up: false },
    { label: "Pending withdrawals", value: "1,240", delta: "−4.3%", up: false },
    { label: "Live streams", value: "820", delta: "+5.6%", up: true },
  ];

  const dauPoints = [180, 210, 195, 240, 260, 230, 280, 300, 270, 290, 310, 295, 305, 312];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold md:text-4xl">
            Control Center
          </h1>
          <p className="mt-2 text-sm text-[var(--aegis-muted)]">
            Overview of the AEGIS platform and operational metrics.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--aegis-line)] bg-[var(--aegis-panel)] px-4 py-2 text-xs text-[var(--aegis-muted)]">
          Live DB · {ufxUsers} UFX identities · {posts} posts · {likes} likes · {auditLogs} audits
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-[var(--aegis-line)] bg-[var(--aegis-panel)] p-4"
          >
            <p className="text-xs text-[var(--aegis-muted)]">{m.label}</p>
            <p className="mt-2 font-[family-name:var(--font-syne)] text-2xl font-semibold">
              {m.value}
            </p>
            <p
              className={`mt-1 text-xs ${m.up ? "text-[var(--aegis-accent)]" : "text-sky-300/80"}`}
            >
              {m.up ? "↑" : "↓"} {m.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-[var(--aegis-line)] bg-[var(--aegis-panel)] p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold">
                DAU · Daily Active Users
              </h2>
              <p className="mt-1 text-xs text-[var(--aegis-muted)]">Last 14 days</p>
            </div>
            <span className="rounded-full border border-[var(--aegis-line)] px-3 py-1 text-xs text-[var(--aegis-muted)]">
              14 Days
            </span>
          </div>
          <div className="relative h-56 overflow-hidden rounded-2xl border border-[var(--aegis-line)] bg-[var(--aegis-elevated)] p-4">
            <svg viewBox="0 0 280 120" className="h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dauFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(47,214,196,0.45)" />
                  <stop offset="100%" stopColor="rgba(47,214,196,0)" />
                </linearGradient>
              </defs>
              <path
                d={buildAreaPath(dauPoints, 280, 120)}
                fill="url(#dauFill)"
              />
              <path
                d={buildLinePath(dauPoints, 280, 120)}
                fill="none"
                stroke="#2fd6c4"
                strokeWidth="2.5"
              />
            </svg>
            <div className="absolute bottom-4 right-4 rounded-lg border border-[var(--aegis-line)] bg-black/50 px-3 py-1.5 text-xs backdrop-blur">
              May 22 · DAU 312K
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--aegis-line)] bg-[var(--aegis-panel)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold">
              Applications
            </h2>
            <Link href="/aegis/applications" className="text-xs text-[var(--aegis-accent)]">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex items-start gap-3 rounded-2xl border border-[var(--aegis-line)] bg-[var(--aegis-elevated)] p-3.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--aegis-accent)]/30 bg-[var(--aegis-accent-dim)] font-[family-name:var(--font-syne)] text-sm font-bold text-[var(--aegis-accent)]">
                  {app.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{app.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                        app.status === "ACTIVE"
                          ? "border border-[var(--aegis-accent)]/40 text-[var(--aegis-accent)]"
                          : "border border-white/15 text-white/40"
                      }`}
                    >
                      {app.status === "ACTIVE" ? "ACTIVE" : "COMING SOON"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--aegis-muted)]">
                    {app.description || "Registered on AEGIS multi-app registry"}
                  </p>
                  <p className="mt-2 text-[11px] text-white/35">
                    {app._count.users} users · {app._count.posts} posts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--aegis-line)] bg-[var(--aegis-panel)] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold">
            Recent audit trail
          </h2>
          <Link href="/aegis/audit" className="text-xs text-[var(--aegis-accent)]">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-0"
            >
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-sm text-[var(--aegis-accent)]">
                  {log.action}
                </p>
                <p className="mt-1 text-xs text-[var(--aegis-muted)]">
                  {log.actor
                    ? `${log.actor.publicId} (@${log.actor.username})`
                    : "system"}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-white/35">
                {formatDistanceToNow(log.createdAt, { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`.replace(/\.00M/, "M");
  if (n >= 1_000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function buildLinePath(values: number[], width: number, height: number) {
  const max = Math.max(...values);
  const step = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * step;
      const y = height - (v / max) * (height - 8) - 4;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(values: number[], width: number, height: number) {
  const line = buildLinePath(values, width, height);
  return `${line} L${width},${height} L0,${height} Z`;
}
