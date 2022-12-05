import type { CollectionPreview } from "./collection.type";

export interface Post {
  dateCreated: Date;
  id: string;
  prompt: string;
  imageURL: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  likeCount: number;
  isLiked: boolean;
}

export interface PostWithCollections extends Post {
  collections: CollectionPreview[];
}

export interface CreatedPost {
  prompt: string;
  imageURL: string;
}

export type PreviewPost = Pick<
  Post,
  "id" | "dateCreated" | "prompt" | "imageURL"
>;
