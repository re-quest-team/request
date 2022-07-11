/*
  Warnings:

  - You are about to drop the column `germanLanguage` on the `Game` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GameLanguage" AS ENUM ('DE', 'EN');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "germanLanguage",
ADD COLUMN     "language" "GameLanguage" NOT NULL DEFAULT E'DE';
