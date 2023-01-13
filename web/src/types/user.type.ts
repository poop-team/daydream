export interface User {
  createdAt: string;
  updatedAt: string;
  lastPostCreatedAt: string | null;
  email?: string;
  emailVerified?: string;
  id: string;
  image: string | null;
  name: string;
  collectionCount: number;
  postCount: number;
}
