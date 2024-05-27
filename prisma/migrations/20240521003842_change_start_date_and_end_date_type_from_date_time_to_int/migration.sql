/*
  Warnings:

  - The `endDate` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `startDate` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Test" DROP COLUMN "endDate",
ADD COLUMN     "endDate" INTEGER,
DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER;
