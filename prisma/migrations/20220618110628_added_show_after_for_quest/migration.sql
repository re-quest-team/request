/*
  Warnings:

  - A unique constraint covering the columns `[questId]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "questId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Quest_questId_key" ON "Quest"("questId");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
