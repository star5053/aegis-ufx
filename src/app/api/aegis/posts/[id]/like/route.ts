import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { getClientIp, jsonError, jsonOk } from "@/lib/api";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user) return jsonError("Unauthorized", 401);

    const { id } = await params;
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return jsonError("Post not found", 404);

    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: user.id, postId: id } },
    });

    if (existing) {
      await prisma.$transaction([
        prisma.like.delete({ where: { id: existing.id } }),
        prisma.post.update({
          where: { id },
          data: { likeCount: { decrement: 1 } },
        }),
      ]);

      await writeAuditLog({
        actorId: user.id,
        action: "POST_UNLIKED",
        targetType: "Post",
        targetId: id,
        ip: getClientIp(request),
      });

      const updated = await prisma.post.findUnique({ where: { id } });
      return jsonOk({ liked: false, likeCount: updated?.likeCount ?? 0 });
    }

    await prisma.$transaction([
      prisma.like.create({ data: { userId: user.id, postId: id } }),
      prisma.post.update({
        where: { id },
        data: { likeCount: { increment: 1 } },
      }),
    ]);

    if (post.userId !== user.id) {
      await prisma.notification.create({
        data: {
          userId: post.userId,
          type: "like",
          title: `${user.displayName} liked your post`,
          body: "Someone engaged with your content on UFX.",
        },
      });
    }

    await writeAuditLog({
      actorId: user.id,
      action: "POST_LIKED",
      targetType: "Post",
      targetId: id,
      ip: getClientIp(request),
    });

    const updated = await prisma.post.findUnique({ where: { id } });
    return jsonOk({ liked: true, likeCount: updated?.likeCount ?? 0 });
  } catch (error) {
    console.error(error);
    return jsonError("Like failed", 500);
  }
}
