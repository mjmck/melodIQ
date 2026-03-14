/*
  Warnings:

  - A unique constraint covering the columns `[sessionKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sessionKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionKey_key" ON "User"("sessionKey");
