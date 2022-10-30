//{dateCreated: Date, id: string, prompt: string, imageURL: string, likes: Like[], author: {id: string, name: string | null}}[]
export interface Post {
  dateCreated: Date;
  id: string;
  prompt: string;
  imageURL: string;
  user: {
    id: string;
    name: string | null;
  };
  likes: [];
}
