import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  hashPassword,
  nextPublicId,
  toSessionUser,
} from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { getClientIp, jsonError, jsonOk } from "@/lib/api";
import { ensureDemoData } from "@/lib/seed-demo";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(/^[a-z0-9_]+$/i, "Username: letters, numbers, underscore"),
  displayName: z.string().min(1).max(48),
});

export async function POST(request: Request) {
  try {
    await ensureDemoData();
    const body = schema.parse(await request.json());
    const email = body.email.toLowerCase();
    const username = body.username.toLowerCase();

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) {
      return jsonError("Email or username already exists", 409);
    }

    const ufx = await prisma.application.findUnique({ where: { slug: "ufx" } });
    if (!ufx) {
      return jsonError("UFX application is not registered on AEGIS", 500);
    }

    const user = await prisma.user.create({
      data: {
        publicId: await nextPublicId("UFX"),
        email,
        username,
        displayName: body.displayName,
        passwordHash: await hashPassword(body.password),
        role: "USER",
        applicationId: ufx.id,
        avatarUrl: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(username)}&backgroundColor=0a0a0a`,
      },
    });

    const ip = getClientIp(request);
    await createSession(user.id, ip);
    await writeAuditLog({
      actorId: user.id,
      action: "USER_REGISTERED",
      targetType: "User",
      targetId: user.id,
      meta: { publicId: user.publicId, via: "UFX" },
      ip,
    });

    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "system",
        title: "Welcome to UFX",
        body: "Your AEGIS ID is active. Explore the feed and create your first post.",
      },
    });

    return jsonOk({ user: toSessionUser(user) }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid input");
    }
    console.error(error);
    return jsonError("Registration failed", 500);
  }
}
