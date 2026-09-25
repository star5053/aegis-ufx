import { requireAegisStaff } from "@/lib/aegis-guard";
import { prisma } from "@/lib/prisma";

export default async function ApplicationsPage() {
  await requireAegisStaff();

  const apps = await prisma.application.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { users: true, posts: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold">
          Applications
        </h1>
        <p className="mt-2 text-sm text-[var(--aegis-muted)]">
          Multi-application registry. New products register here and reuse AEGIS services.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {apps.map((app) => (
          <div
            key={app.id}
            className="rounded-3xl border border-[var(--aegis-line)] bg-white/[0.03] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-syne)] text-xl font-semibold">
                  {app.name}
                </p>
                <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-xs text-white/40">
                  {app.slug}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                  app.status === "ACTIVE"
                    ? "bg-[#2ee6a6]/15 text-[#2ee6a6]"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {app.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-[var(--aegis-muted)]">{app.description}</p>
            <div className="mt-5 flex gap-6 text-sm">
              <div>
                <p className="text-lg font-semibold">{app._count.users}</p>
                <p className="text-xs text-white/40">Users</p>
              </div>
              <div>
                <p className="text-lg font-semibold">{app._count.posts}</p>
                <p className="text-xs text-white/40">Posts</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
