export type FeedPost = {
  id: string;
  type: string;
  caption: string;
  imageUrl: string | null;
  likeCount: number;
  createdAt: string;
  likedByMe: boolean;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
    publicId: string;
  };
};
