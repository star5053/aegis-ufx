import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessControlCenter } from "@/lib/permissions";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!canAccessControlCenter(user.role)) return jsonError("Forbidden", 403);

  const logs = await prisma.auditLog.findMany({
    take: 50,
    orderBy: { createdAt: "desc" },
    include: {
      actor: {
        select: {
          publicId: true,
          username: true,
          displayName: true,
          role: true,
        },
      },
    },
  });

  return jsonOk({ logs });
}
