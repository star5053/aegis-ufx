import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { writeAuditLog } from "@/lib/audit";
import { getClientIp, jsonError, jsonOk } from "@/lib/api";
import { ensureDemoData } from "@/lib/seed-demo";

export async function GET(request: Request) {
  try {
    await ensureDemoData();
    const { searchParams } = new URL(request.url);
    const take = Math.min(Number(searchParams.get("limit") ?? 20), 50);
    const user = await getCurrentUser();

    const posts = await prisma.post.findMany({
      take,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            publicId: true,
          },
        },
        likes: user
          ? { where: { userId: user.id }, select: { id: true } }
          : false,
      },
    });

    return jsonOk({
      posts: posts.map((p) => ({
        id: p.id,
        type: p.type,
        caption: p.caption,
        imageUrl: p.imageUrl,
        likeCount: p.likeCount,
        createdAt: p.createdAt,
        likedByMe: Array.isArray(p.likes) ? p.likes.length > 0 : false,
        author: p.user,
      })),
    });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load feed", 500);
  }
}

const createSchema = z.object({
  caption: z.string().min(1).max(2000),
  imageUrl: z
    .string()
    .optional()
    .transform((v) => v?.trim() || undefined)
    .pipe(z.string().url().optional()),
  type: z.enum(["TEXT", "PHOTO", "VIDEO"]).optional(),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return jsonError("Unauthorized", 401);

    const ufx = await prisma.application.findUnique({ where: { slug: "ufx" } });
    if (!ufx) return jsonError("UFX not registered", 500);

    const body = createSchema.parse(await request.json());
    const imageUrl = body.imageUrl || null;
    const type = imageUrl ? "PHOTO" : body.type ?? "TEXT";

    const post = await prisma.post.create({
      data: {
        userId: user.id,
        applicationId: ufx.id,
        caption: body.caption,
        imageUrl,
        type,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            publicId: true,
          },
        },
      },
    });

    await writeAuditLog({
      actorId: user.id,
      action: "POST_CREATED",
      targetType: "Post",
      targetId: post.id,
      meta: { type: post.type },
      ip: getClientIp(request),
    });

    return jsonOk(
      {
        post: {
          id: post.id,
          type: post.type,
          caption: post.caption,
          imageUrl: post.imageUrl,
          likeCount: post.likeCount,
          createdAt: post.createdAt,
          likedByMe: false,
          author: post.user,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message ?? "Invalid input");
    }
    console.error(error);
    return jsonError("Failed to create post", 500);
  }
}
