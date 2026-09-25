import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessControlCenter } from "@/lib/permissions";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!canAccessControlCenter(user.role)) {
    return jsonError("Forbidden — Control Center requires an AEGIS staff role", 403);
  }

  const [users, applications, posts, likes, auditLogs, notifications, sessions] =
    await Promise.all([
      prisma.user.count(),
      prisma.application.count(),
      prisma.post.count(),
      prisma.like.count(),
      prisma.auditLog.count(),
      prisma.notification.count(),
      prisma.session.count({ where: { expiresAt: { gt: new Date() } } }),
    ]);

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      publicId: true,
      username: true,
      displayName: true,
      role: true,
      createdAt: true,
      status: true,
    },
  });

  const ufx = await prisma.application.findUnique({ where: { slug: "ufx" } });
  const ufxUsers = ufx
    ? await prisma.user.count({ where: { applicationId: ufx.id } })
    : 0;

  return jsonOk({
    metrics: {
      users,
      applications,
      posts,
      likes,
      auditLogs,
      notifications,
      activeSessions: sessions,
      ufxUsers,
    },
    recentUsers,
  });
}
