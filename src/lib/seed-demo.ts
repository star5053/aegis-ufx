import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

/**
 * Idempotent demo bootstrap. Safe to call on every request:
 * only seeds when the database has zero applications.
 */
export async function ensureDemoData(client: PrismaClient = prisma) {
  const appCount = await client.application.count();
  if (appCount > 0) return { seeded: false as const };

  const passwordHash = await bcrypt.hash("Demo123!", 10);

  const ufx = await client.application.create({
    data: {
      slug: "ufx",
      name: "UFX",
      description: "Social + Music + Games + Live super-app on AEGIS",
      status: "ACTIVE",
      branding: { primary: "#FF2D6A", mark: ".UFX." },
    },
  });

  await client.application.create({
    data: {
      slug: "marketplace-future",
      name: "Future Marketplace",
      description: "Placeholder app registration proving multi-app architecture",
      status: "DRAFT",
      branding: { primary: "#0EA5E9" },
    },
  });

  const owner = await client.user.create({
    data: {
      publicId: "AEGIS-000001",
      email: "owner@aegis.dev",
      passwordHash,
      username: "owner",
      displayName: "Platform Owner",
      bio: "AEGIS Super Owner",
      role: UserRole.SUPER_OWNER,
      twoFactorEnabled: true,
    },
  });

  const henry = await client.user.create({
    data: {
      publicId: "UFX-000001",
      email: "henry@ufx.app",
      passwordHash,
      username: "henry",
      displayName: "Henry",
      bio: "Building moments on UFX",
      role: UserRole.USER,
      applicationId: ufx.id,
      avatarUrl:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Henry&backgroundColor=0a0a0a",
    },
  });

  const maya = await client.user.create({
    data: {
      publicId: "UFX-000002",
      email: "maya@ufx.app",
      passwordHash,
      username: "maya",
      displayName: "Maya",
      bio: "Reels · Music · Live",
      role: UserRole.USER,
      applicationId: ufx.id,
      avatarUrl:
        "https://api.dicebear.com/9.x/avataaars/svg?seed=Maya&backgroundColor=111111",
    },
  });

  await client.user.create({
    data: {
      publicId: "AEGIS-000002",
      email: "mod@aegis.dev",
      passwordHash,
      username: "moderator",
      displayName: "Moderation Lead",
      role: UserRole.MODERATOR,
      twoFactorEnabled: true,
    },
  });

  const post = await client.post.create({
    data: {
      userId: henry.id,
      applicationId: ufx.id,
      type: "PHOTO",
      caption:
        "Night views. No plans. Just vibes. #citylights #nightmode #goodenergy",
      imageUrl:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900&q=80",
      likeCount: 12400,
    },
  });

  await client.post.create({
    data: {
      userId: maya.id,
      applicationId: ufx.id,
      type: "PHOTO",
      caption: "Vertical energy. Reels pipeline ready for Stage 2 media processing.",
      imageUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=900&q=80",
    },
  });

  await client.post.create({
    data: {
      userId: maya.id,
      applicationId: ufx.id,
      type: "TEXT",
      caption:
        "Music → Use in Video is coming. Same AEGIS media + rights layer powering both.",
    },
  });

  await client.like.create({
    data: { userId: maya.id, postId: post.id },
  });

  await client.notification.createMany({
    data: [
      {
        userId: henry.id,
        type: "like",
        title: "Maya liked your post",
        body: "Your UFX post received a like.",
      },
      {
        userId: henry.id,
        type: "system",
        title: "Welcome to UFX",
        body: "Your identity is managed by AEGIS ID.",
      },
    ],
  });

  await client.auditLog.createMany({
    data: [
      {
        actorId: owner.id,
        action: "APPLICATION_REGISTERED",
        targetType: "Application",
        targetId: ufx.id,
        meta: { slug: "ufx" },
      },
      {
        actorId: henry.id,
        action: "USER_REGISTERED",
        targetType: "User",
        targetId: henry.id,
        meta: { publicId: henry.publicId },
      },
      {
        actorId: owner.id,
        action: "DEMO_AUTO_SEEDED",
        targetType: "System",
        meta: { via: "ensureDemoData" },
      },
    ],
  });

  return { seeded: true as const };
}
