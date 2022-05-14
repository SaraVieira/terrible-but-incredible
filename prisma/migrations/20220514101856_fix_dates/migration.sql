-- DropForeignKey
ALTER TABLE "ReleaseDates" DROP CONSTRAINT "ReleaseDates_innerReleaseDatesId_fkey";

-- AlterTable
ALTER TABLE "ReleaseDates" ALTER COLUMN "innerReleaseDatesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_innerReleaseDatesId_fkey" FOREIGN KEY ("innerReleaseDatesId") REFERENCES "InnerReleaseDates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
