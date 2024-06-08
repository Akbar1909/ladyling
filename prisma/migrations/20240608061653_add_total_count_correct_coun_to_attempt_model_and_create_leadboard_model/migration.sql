-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "correctCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "isFirstAttempt" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "test_leaderboards" (
    "id" SERIAL NOT NULL,
    "testId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "spendedTime" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_leaderboards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_leaderboards_testId_userId_key" ON "test_leaderboards"("testId", "userId");

-- AddForeignKey
ALTER TABLE "test_leaderboards" ADD CONSTRAINT "test_leaderboards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_leaderboards" ADD CONSTRAINT "test_leaderboards_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
