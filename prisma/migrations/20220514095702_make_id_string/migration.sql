/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDates" DROP CONSTRAINT "ReleaseDates_movieId_fkey";

-- DropForeignKey
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_movieId_fkey";

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Images" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Movie_id_seq";

-- AlterTable
ALTER TABLE "ProductionCompany" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductionCountry" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ReleaseDates" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SpokenLanguage" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Videos" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCompany" ADD CONSTRAINT "ProductionCompany_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpokenLanguage" ADD CONSTRAINT "SpokenLanguage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCountry" ADD CONSTRAINT "ProductionCountry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
