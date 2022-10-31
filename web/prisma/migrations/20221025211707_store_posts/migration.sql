/*
  Warnings:

  - You are about to drop the column `collectionId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `saves` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageURL` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "savedByID" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "collectionId",
DROP COLUMN "saves",
DROP COLUMN "userId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "savedByID" TEXT;

-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "postID" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","postID")
);

-- CreateTable
CREATE TABLE "CollectionOnPosts" (
    "postId" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PostsOnCollections" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectionOnPosts_postId_collectionId_key" ON "CollectionOnPosts"("postId", "collectionId");

-- CreateIndex
CREATE UNIQUE INDEX "_PostsOnCollections_AB_unique" ON "_PostsOnCollections"("A", "B");

-- CreateIndex
CREATE INDEX "_PostsOnCollections_B_index" ON "_PostsOnCollections"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_savedByID_fkey" FOREIGN KEY ("savedByID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_savedByID_fkey" FOREIGN KEY ("savedByID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionOnPosts" ADD CONSTRAINT "CollectionOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionOnPosts" ADD CONSTRAINT "CollectionOnPosts_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsOnCollections" ADD CONSTRAINT "_PostsOnCollections_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostsOnCollections" ADD CONSTRAINT "_PostsOnCollections_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
