/*
  Warnings:

  - Changed the type of `popularity` on the `Cast` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `popularity` on the `Crew` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cast" DROP COLUMN "popularity",
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Crew" DROP COLUMN "popularity",
ADD COLUMN     "popularity" DOUBLE PRECISION NOT NULL;
