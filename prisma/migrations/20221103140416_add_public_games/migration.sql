/*
  Warnings:

  - You are about to drop the column `draft` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `questId` on the `Quest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_questId_fkey";

-- DropIndex
DROP INDEX "Quest_questId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "draft",
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "questId";
