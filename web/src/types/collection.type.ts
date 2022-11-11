import { Post } from "./post.type";

interface Collection {
  id: string;
  name: string;
  posts: Post[];
}

export default Collection;
