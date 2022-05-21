/*
  Warnings:

  - You are about to drop the column `movieId` on the `Cast` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Crew` table. All the data in the column will be lost.
  - The primary key for the `ProductionCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SpokenLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ProductionCountry` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SpokenLanguage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Cast" DROP CONSTRAINT "Cast_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_movieId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCountry" DROP CONSTRAINT "_MovieToProductionCountry_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpokenLanguage" DROP CONSTRAINT "_MovieToSpokenLanguage_B_fkey";

-- AlterTable
ALTER TABLE "Cast" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "Crew" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SpokenLanguage_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_CastToMovie" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CrewToMovie" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CastToMovie_AB_unique" ON "_CastToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CastToMovie_B_index" ON "_CastToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CrewToMovie_AB_unique" ON "_CrewToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewToMovie_B_index" ON "_CrewToMovie"("B");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCountry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpokenLanguage" ADD CONSTRAINT "_MovieToSpokenLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "SpokenLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToMovie" ADD CONSTRAINT "_CastToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Cast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CastToMovie" ADD CONSTRAINT "_CastToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewToMovie" ADD CONSTRAINT "_CrewToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Crew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewToMovie" ADD CONSTRAINT "_CrewToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
