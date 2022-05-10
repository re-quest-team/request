-- CreateTable
CREATE TABLE "S3Image" (
    "id" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "S3Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "S3Image" ADD CONSTRAINT "S3Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
