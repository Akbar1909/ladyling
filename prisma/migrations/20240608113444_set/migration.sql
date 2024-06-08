-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_correctId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_selectedId_fkey";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_selectedId_fkey" FOREIGN KEY ("selectedId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_correctId_fkey" FOREIGN KEY ("correctId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
