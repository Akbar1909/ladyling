/*
  Warnings:

  - You are about to drop the `test_leaderboards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "test_leaderboards" DROP CONSTRAINT "test_leaderboards_testId_fkey";

-- DropForeignKey
ALTER TABLE "test_leaderboards" DROP CONSTRAINT "test_leaderboards_userId_fkey";

-- DropTable
DROP TABLE "test_leaderboards";

-- CreateTable
CREATE TABLE "LeadBoard" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "spendedTime" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LeadBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeadBoard_testId_userId_key" ON "LeadBoard"("testId", "userId");

-- AddForeignKey
ALTER TABLE "LeadBoard" ADD CONSTRAINT "LeadBoard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadBoard" ADD CONSTRAINT "LeadBoard_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
