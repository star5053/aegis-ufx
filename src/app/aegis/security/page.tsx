import { requireAegisStaff } from "@/lib/aegis-guard";
import { ROLE_CAPABILITIES, ROLE_LABELS } from "@/lib/permissions";
import { UserRole } from "@prisma/client";

export default async function SecurityPage() {
  const user = await requireAegisStaff();

  const roles = Object.values(UserRole);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold">
          Security & permissions
        </h1>
        <p className="mt-2 text-sm text-[var(--aegis-muted)]">
          Role-based access control. Your session:{" "}
          <span className="text-[#2ee6a6]">{ROLE_LABELS[user.role]}</span>
          {user.twoFactorEnabled ? " · 2FA enabled on staff demos" : ""}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {roles.map((role) => (
          <div
            key={role}
            className={`rounded-3xl border p-5 ${
              role === user.role
                ? "border-[#2ee6a6]/40 bg-[#2ee6a6]/5"
                : "border-[var(--aegis-line)] bg-white/[0.03]"
            }`}
          >
            <p className="font-[family-name:var(--font-syne)] text-lg font-semibold">
              {ROLE_LABELS[role]}
            </p>
            <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[10px] text-white/35">
              {role}
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-[var(--aegis-muted)]">
              {ROLE_CAPABILITIES[role].map((cap) => (
                <li key={cap} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
