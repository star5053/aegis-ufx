import { HomeForYou } from "@/components/ufx/HomeForYou";
import { getCurrentUser } from "@/lib/auth";
import { postsToHomeReels, type HomeReel } from "@/lib/home-reels";
import { prisma } from "@/lib/prisma";
import { ensureDemoData } from "@/lib/seed-demo";
import { reelsDemo } from "@/lib/ufx-catalog";

async function loadHomeReels(userId?: string): Promise<HomeReel[]> {
  await ensureDemoData();

  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
    where: { imageUrl: { not: null } },
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
      likes: userId ? { where: { userId }, select: { id: true } } : false,
    },
  });

  const fromDb = postsToHomeReels(
    posts.map((p) => ({
      id: p.id,
      type: p.type,
      caption: p.caption,
      imageUrl: p.imageUrl,
      likeCount: p.likeCount,
      createdAt: p.createdAt.toISOString(),
      likedByMe: Array.isArray(p.likes) ? p.likes.length > 0 : false,
      author: p.user,
    })),
  );

  const featured: HomeReel = {
    id: reelsDemo[0].id,
    username: reelsDemo[0].username,
    caption: reelsDemo[0].caption,
    sound: reelsDemo[0].sound,
    likesLabel: reelsDemo[0].likes,
    commentsLabel: reelsDemo[0].comments,
    image: reelsDemo[0].image,
    avatar: reelsDemo[0].avatar,
    likedByMe: true,
    likeCount: 12400,
  };

  const rest = fromDb.filter((r) => r.image !== featured.image);
  return [featured, ...rest];
}

export default async function UfxHomePage() {
  const user = await getCurrentUser();
  const reels = await loadHomeReels(user?.id);

  return <HomeForYou reels={reels} />;
}
