-- CreateEnum
CREATE TYPE "QuestType" AS ENUM ('QUEST_CRYPTO', 'QUEST_CODING', 'QUEST_QR_SCAN', 'QUEST_STATISTICS', 'MEDIA_TEXT', 'MEDIA_IMAGE', 'MEDIA_INSTAGRAM', 'MEDIA_YOUTUBE', 'MEDIA_IFRAME');

-- AlterTable
ALTER TABLE "Quest" ADD COLUMN     "type" "QuestType";
