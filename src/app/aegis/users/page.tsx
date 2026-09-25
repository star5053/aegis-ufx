import { requireAegisStaff } from "@/lib/aegis-guard";
import { prisma } from "@/lib/prisma";
import { ROLE_LABELS } from "@/lib/permissions";
import { format } from "date-fns";

export default async function AegisUsersPage() {
  await requireAegisStaff();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { application: { select: { name: true, slug: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold">Users</h1>
        <p className="mt-2 text-sm text-[var(--aegis-muted)]">
          Centralized AEGIS Identity — UFX displays accounts, AEGIS owns them.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-[var(--aegis-line)]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-[var(--aegis-muted)]">
            <tr>
              <th className="px-4 py-3">Public ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">App</th>
              <th className="px-4 py-3">2FA</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-[var(--aegis-line)]">
                <td className="px-4 py-3 font-[family-name:var(--font-jetbrains)] text-xs text-[#2ee6a6]">
                  {u.publicId}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{u.displayName}</p>
                  <p className="text-xs text-white/40">
                    @{u.username} · {u.email}
                  </p>
                </td>
                <td className="px-4 py-3 text-xs">{ROLE_LABELS[u.role]}</td>
                <td className="px-4 py-3 text-xs text-white/50">
                  {u.application?.name ?? "Platform"}
                </td>
                <td className="px-4 py-3 text-xs">
                  {u.twoFactorEnabled ? (
                    <span className="text-[#2ee6a6]">Enabled</span>
                  ) : (
                    <span className="text-white/35">Off</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-white/40">
                  {format(u.createdAt, "yyyy-MM-dd HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
