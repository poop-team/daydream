export interface Post {
  dateCreated: Date;
  id: string;
  prompt: string;
  imageURL: string;
  author: {
    id: string;
    name: string;
  };
  likes: [];
}
