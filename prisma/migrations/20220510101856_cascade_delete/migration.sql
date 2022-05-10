-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_gameId_fkey";

-- DropForeignKey
ALTER TABLE "S3Image" DROP CONSTRAINT "S3Image_userId_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "S3Image" ADD CONSTRAINT "S3Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
