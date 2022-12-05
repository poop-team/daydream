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

interface Like {
  userId: string;
  postID: string;
}

export interface CreatedPost {
  prompt: string;
  imageURL: string;
}

export interface PreviewPost {
  id: string;
  dateCreated: string;
  prompt: string;
  imageURL: string;
}
