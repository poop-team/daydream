import { PreviewPost } from "./post.type";

interface Collection {
  id: string;
  name: string;
  posts: PreviewPost[];
  postCount: number;
}

export default Collection;
