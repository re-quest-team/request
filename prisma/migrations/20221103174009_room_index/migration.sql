/*
  Warnings:

  - A unique constraint covering the columns `[gameId,index]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `index` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "index" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Room_gameId_index_key" ON "Room"("gameId", "index");
