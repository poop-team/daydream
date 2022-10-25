/*
  Warnings:

  - You are about to drop the `CollectionOnPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostsOnCollections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollectionOnPosts" DROP CONSTRAINT "CollectionOnPosts_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionOnPosts" DROP CONSTRAINT "CollectionOnPosts_postId_fkey";

-- DropForeignKey
ALTER TABLE "_PostsOnCollections" DROP CONSTRAINT "_PostsOnCollections_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostsOnCollections" DROP CONSTRAINT "_PostsOnCollections_B_fkey";

-- DropTable
DROP TABLE "CollectionOnPosts";

-- DropTable
DROP TABLE "_PostsOnCollections";

-- CreateTable
CREATE TABLE "CollectionsOnPosts" (
    "postId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionsOnPosts_postId_collectionId_key" ON "CollectionsOnPosts"("postId", "collectionId");

-- AddForeignKey
ALTER TABLE "CollectionsOnPosts" ADD CONSTRAINT "CollectionsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionsOnPosts" ADD CONSTRAINT "CollectionsOnPosts_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
