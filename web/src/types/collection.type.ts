import { PreviewPost } from "./post.type";

export interface Collection {
  id: string;
  name: string;
  posts: PreviewPost[];
  postCount: number;
}

export type CollectionPreview = Pick<Collection, "id" | "name">;
