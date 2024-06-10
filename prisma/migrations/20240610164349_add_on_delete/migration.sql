-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_attempId_fkey";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_attempId_fkey" FOREIGN KEY ("attempId") REFERENCES "Attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
