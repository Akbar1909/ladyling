-- CreateEnum
CREATE TYPE "TestStatus" AS ENUM ('active', 'upcoming', 'closed');

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "TestStatus" NOT NULL DEFAULT 'upcoming';
