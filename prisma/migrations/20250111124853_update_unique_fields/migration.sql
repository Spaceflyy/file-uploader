/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[folderId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File_authorId_key" ON "File"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "File_folderId_key" ON "File"("folderId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_authorId_key" ON "Folder"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
