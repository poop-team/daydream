export interface User {
  createdAt: string;
  updatedAt: string;
  email?: string;
  emailVerified?: string;
  id: string;
  image: string | null;
  name: string;
  collectionCount: number;
  postCount: number;
}
