-- CreateEnum
CREATE TYPE "WordListType" AS ENUM ('topicbased', 'process');

-- AlterTable
ALTER TABLE "WordList" ADD COLUMN     "type" "WordListType" NOT NULL DEFAULT 'topicbased';
