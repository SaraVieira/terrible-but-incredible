/*
  Warnings:

  - You are about to drop the column `movieId` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `ProductionCompany` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `ProductionCountry` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `SpokenLanguage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_movieId_fkey";

-- DropForeignKey
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_movieId_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "ProductionCompany" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "ProductionCountry" DROP COLUMN "movieId";

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP COLUMN "movieId";

-- CreateTable
CREATE TABLE "_MovieToProductionCompany" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToProductionCountry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToSpokenLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToProductionCompany_AB_unique" ON "_MovieToProductionCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToProductionCompany_B_index" ON "_MovieToProductionCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToProductionCountry_AB_unique" ON "_MovieToProductionCountry"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToProductionCountry_B_index" ON "_MovieToProductionCountry"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToSpokenLanguage_AB_unique" ON "_MovieToSpokenLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToSpokenLanguage_B_index" ON "_MovieToSpokenLanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCompany" ADD CONSTRAINT "_MovieToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCountry"("iso_3166_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpokenLanguage" ADD CONSTRAINT "_MovieToSpokenLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpokenLanguage" ADD CONSTRAINT "_MovieToSpokenLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "SpokenLanguage"("iso_639_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
