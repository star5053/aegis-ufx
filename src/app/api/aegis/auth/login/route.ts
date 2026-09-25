import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession, toSessionUser, verifyPassword } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { getClientIp, jsonError, jsonOk } from "@/lib/api";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    const user = await prisma.user.findUnique({
      where: { email: body.email.toLowerCase() },
    });

    if (!user || !(await verifyPassword(body.password, user.passwordHash))) {
      return jsonError("Invalid email or password", 401);
    }

    if (user.status !== "ACTIVE") {
      return jsonError("Account is not active", 403);
    }

    const ip = getClientIp(request);
    await createSession(user.id, ip);
    await writeAuditLog({
      actorId: user.id,
      action: "USER_LOGIN",
      targetType: "User",
      targetId: user.id,
      meta: { role: user.role },
      ip,
    });

    return jsonOk({ user: toSessionUser(user) });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid input");
    }
    console.error(error);
    return jsonError("Login failed", 500);
  }
}
