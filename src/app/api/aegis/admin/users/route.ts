import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { canAccessControlCenter } from "@/lib/permissions";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return jsonError("Unauthorized", 401);
  if (!canAccessControlCenter(user.role)) return jsonError("Forbidden", 403);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      publicId: true,
      email: true,
      username: true,
      displayName: true,
      role: true,
      status: true,
      twoFactorEnabled: true,
      createdAt: true,
      application: { select: { name: true, slug: true } },
    },
  });

  return jsonOk({ users });
}
