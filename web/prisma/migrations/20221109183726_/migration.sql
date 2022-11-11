/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Collection_id_userId_key" ON "Collection"("id", "userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");
