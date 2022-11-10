export interface Post {
  id: number;
  src: string;
  prompt: string;
  likes: number;
  authorName: string;
  authorAvatar: string;
}

export default Post;
