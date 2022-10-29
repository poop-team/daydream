import React from "react";

export interface Post {
  id: number;
  src: string;
  prompt: string;
  likes: number;
  authorName: string;
  authorAvatar: string;
}

declare const Post: React.SFC<Postss>;

export default Post;
