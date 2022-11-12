// FIXME: Change these types once the search API is ready (Especially the "likes" type which should be a number)
export interface Post {
  dateCreated: Date;
  id: string;
  prompt: string;
  imageURL: string;
  author: {
    id: string;
    name: string;
  };
  likes: Like[];
}

interface Like {
  userId: string;
  postID: string;
}

export interface CreatedPost {
  prompt: string;
  imageURL: string;
}
