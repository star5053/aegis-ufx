import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessControlCenter } from "@/lib/permissions";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!canAccessControlCenter(user.role)) return jsonError("Forbidden", 403);

  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      _count: { select: { users: true, posts: true } },
    },
  });

  return jsonOk({ applications });
}
