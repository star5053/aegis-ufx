import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { UfxHeader } from "@/components/ufx/UfxHeader";

export default async function InboxPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/ufx/login");

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const tabs = ["Chats", "Contacts", "Requests", "Followers", "Notifications"];

  return (
    <div>
      <UfxHeader user={user} variant="minimal" />
      <div className="px-4 pt-2">
        <h1 className="font-[family-name:var(--font-syne)] text-2xl font-semibold">Inbox</h1>
        <p className="mt-1 text-sm text-white/45">
          Messages and alerts powered by AEGIS Notification Engine
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
        {tabs.map((t) => (
          <span
            key={t}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${
              t === "Notifications"
                ? "bg-[var(--ufx-accent)] text-white"
                : "bg-white/5 text-white/45"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-2 px-4 pb-8">
        {notifications.length === 0 ? (
          <p className="py-12 text-center text-sm text-white/40">No notifications yet.</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="mt-1 text-xs text-white/50">{n.body}</p>
                </div>
                <span className="shrink-0 text-[10px] text-white/35">
                  {formatDistanceToNow(n.createdAt, { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
