import { PrismaClient } from "@prisma/client";
import { jsonError, jsonOk } from "@/lib/api";
import { ensureDemoData } from "@/lib/seed-demo";

/**
 * Seed / reset demo data. Protected by SEED_SECRET.
 * Empty DB also auto-seeds on first UFX/AEGIS page load.
 */
export async function POST(request: Request) {
  const seedSecret = process.env.SEED_SECRET;
  if (!seedSecret) {
    return jsonError("SEED_SECRET is not configured", 500);
  }

  const header = request.headers.get("x-seed-secret");
  const body = await request.json().catch(() => ({}));
  const provided = header || (body as { secret?: string }).secret;
  const force = Boolean((body as { force?: boolean }).force);

  if (provided !== seedSecret) {
    return jsonError("Invalid seed secret", 401);
  }

  const prisma = new PrismaClient();

  try {
    if (force) {
      await prisma.like.deleteMany();
      await prisma.notification.deleteMany();
      await prisma.post.deleteMany();
      await prisma.session.deleteMany();
      await prisma.auditLog.deleteMany();
      await prisma.user.deleteMany();
      await prisma.application.deleteMany();
    }

    const result = await ensureDemoData(prisma);

    return jsonOk({
      message: result.seeded
        ? "Demo data ready"
        : "Demo data already present (pass force:true to reset)",
      seeded: result.seeded,
      accounts: [
        { email: "owner@aegis.dev", role: "SUPER_OWNER", password: "Demo123!" },
        { email: "henry@ufx.app", role: "USER", password: "Demo123!" },
        { email: "maya@ufx.app", role: "USER", password: "Demo123!" },
        { email: "mod@aegis.dev", role: "MODERATOR", password: "Demo123!" },
      ],
    });
  } catch (error) {
    console.error(error);
    return jsonError("Seed failed", 500);
  } finally {
    await prisma.$disconnect();
  }
}
