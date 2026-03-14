/*
  Warnings:

  - You are about to drop the column `lastfmSessionKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastfmSessionKey",
ADD COLUMN     "sessionKey" TEXT;
