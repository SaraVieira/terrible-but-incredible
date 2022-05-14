/*
  Warnings:

  - You are about to drop the column `innerReleaseDatesId` on the `ReleaseDates` table. All the data in the column will be lost.
  - You are about to drop the `InnerReleaseDates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `certification` to the `ReleaseDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iso_639_1` to the `ReleaseDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `ReleaseDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `ReleaseDates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ReleaseDates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReleaseDates" DROP CONSTRAINT "ReleaseDates_innerReleaseDatesId_fkey";

-- AlterTable
ALTER TABLE "ReleaseDates" DROP COLUMN "innerReleaseDatesId",
ADD COLUMN     "certification" TEXT NOT NULL,
ADD COLUMN     "iso_639_1" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "release_date" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL;

-- DropTable
DROP TABLE "InnerReleaseDates";
