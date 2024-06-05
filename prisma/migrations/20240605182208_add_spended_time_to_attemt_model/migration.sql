/*
  Warnings:

  - Added the required column `spendedTime` to the `Attempt` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Attempt` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Attempt" DROP CONSTRAINT "Attempt_userId_fkey";

-- AlterTable
ALTER TABLE "Attempt" ADD COLUMN     "spendedTime" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
