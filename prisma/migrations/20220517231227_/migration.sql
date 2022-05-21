/*
  Warnings:

  - You are about to drop the column `externalIdsId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the `_CastToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CrewToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToProductionCompany` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToProductionCountry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToSpokenLanguage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `ExternalIds` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieId` to the `Cast` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Crew` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `ExternalIds` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `ProductionCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `ProductionCountry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `SpokenLanguage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_externalIdsId_fkey";

-- DropForeignKey
ALTER TABLE "_CastToMovie" DROP CONSTRAINT "_CastToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_CastToMovie" DROP CONSTRAINT "_CastToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_CrewToMovie" DROP CONSTRAINT "_CrewToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_CrewToMovie" DROP CONSTRAINT "_CrewToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCompany" DROP CONSTRAINT "_MovieToProductionCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCompany" DROP CONSTRAINT "_MovieToProductionCompany_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCountry" DROP CONSTRAINT "_MovieToProductionCountry_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToProductionCountry" DROP CONSTRAINT "_MovieToProductionCountry_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpokenLanguage" DROP CONSTRAINT "_MovieToSpokenLanguage_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpokenLanguage" DROP CONSTRAINT "_MovieToSpokenLanguage_B_fkey";

-- AlterTable
ALTER TABLE "Cast" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Crew" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExternalIds" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "externalIdsId";

-- AlterTable
ALTER TABLE "ProductionCompany" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductionCountry" ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SpokenLanguage" ADD COLUMN     "movieId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CastToMovie";

-- DropTable
DROP TABLE "_CrewToMovie";

-- DropTable
DROP TABLE "_GenreToMovie";

-- DropTable
DROP TABLE "_MovieToProductionCompany";

-- DropTable
DROP TABLE "_MovieToProductionCountry";

-- DropTable
DROP TABLE "_MovieToSpokenLanguage";

-- CreateIndex
CREATE UNIQUE INDEX "ExternalIds_movieId_key" ON "ExternalIds"("movieId");

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalIds" ADD CONSTRAINT "ExternalIds_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCompany" ADD CONSTRAINT "ProductionCompany_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpokenLanguage" ADD CONSTRAINT "SpokenLanguage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCountry" ADD CONSTRAINT "ProductionCountry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
