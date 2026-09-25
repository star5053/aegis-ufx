import { destroySession, getCurrentUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { getClientIp, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  await destroySession();

  if (user) {
    await writeAuditLog({
      actorId: user.id,
      action: "USER_LOGOUT",
      targetType: "User",
      targetId: user.id,
      ip: getClientIp(request),
    });
  }

  return jsonOk({ success: true });
}
