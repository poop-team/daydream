/*
  Warnings:

  - You are about to drop the `CollectionsOnPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollectionsOnPosts" DROP CONSTRAINT "CollectionsOnPosts_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "CollectionsOnPosts" DROP CONSTRAINT "CollectionsOnPosts_postId_fkey";

-- DropTable
DROP TABLE "CollectionsOnPosts";

-- CreateTable
CREATE TABLE "_CollectionToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToPost_AB_unique" ON "_CollectionToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToPost_B_index" ON "_CollectionToPost"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToPost" ADD CONSTRAINT "_CollectionToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToPost" ADD CONSTRAINT "_CollectionToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
