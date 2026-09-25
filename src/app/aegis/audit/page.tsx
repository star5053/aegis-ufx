import { requireAegisStaff } from "@/lib/aegis-guard";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function AuditPage() {
  await requireAegisStaff();

  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      actor: {
        select: { publicId: true, username: true, displayName: true, role: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold">
          Audit logs
        </h1>
        <p className="mt-2 text-sm text-[var(--aegis-muted)]">
          Every important action is recorded for professional administration and security.
        </p>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-2xl border border-[var(--aegis-line)] bg-white/[0.03] px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--font-jetbrains)] text-sm text-[#2ee6a6]">
                  {log.action}
                </p>
                <p className="mt-1 text-sm">
                  {log.actor
                    ? `${log.actor.displayName} (${log.actor.publicId})`
                    : "System"}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  {log.targetType ?? "—"}
                  {log.targetId ? ` · ${log.targetId}` : ""}
                  {log.ip ? ` · IP ${log.ip}` : ""}
                </p>
              </div>
              <p className="font-[family-name:var(--font-jetbrains)] text-xs text-white/35">
                {format(log.createdAt, "yyyy-MM-dd HH:mm:ss")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
