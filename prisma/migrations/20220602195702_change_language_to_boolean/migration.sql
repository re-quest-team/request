/*
  Warnings:

  - You are about to drop the column `language` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "language",
ADD COLUMN     "germanLanguage" BOOLEAN NOT NULL DEFAULT true;
