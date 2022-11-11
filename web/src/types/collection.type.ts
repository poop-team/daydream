import { Post } from "./post.type";

interface Collection {
  id: string;
  name: string;
  recentPosts: Post[];
  postCount: number;
}

export default Collection;
