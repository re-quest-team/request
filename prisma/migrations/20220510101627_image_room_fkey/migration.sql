/*
  Warnings:

  - Made the column `roomId` on table `S3Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "S3Image" DROP CONSTRAINT "S3Image_roomId_fkey";

-- AlterTable
ALTER TABLE "S3Image" ALTER COLUMN "roomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "S3Image" ADD CONSTRAINT "S3Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
