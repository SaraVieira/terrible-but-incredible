/*
  Warnings:

  - The primary key for the `BackdropType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `BackdropType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imagesId` column on the `BackdropType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Genre` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `Genre` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `Images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `LogoType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `LogoType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imagesId` column on the `LogoType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `PosterType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PosterType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imagesId` column on the `PosterType` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductionCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductionCompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `ProductionCompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `ProductionCountry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `ReleaseDates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `SpokenLanguage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movieId` column on the `Videos` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "BackdropType" DROP CONSTRAINT "BackdropType_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_movieId_fkey";

-- DropForeignKey
ALTER TABLE "LogoType" DROP CONSTRAINT "LogoType_imagesId_fkey";

-- DropForeignKey
ALTER TABLE "PosterType" DROP CONSTRAINT "PosterType_imagesId_fkey";

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
ALTER TABLE "BackdropType" DROP CONSTRAINT "BackdropType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "imagesId",
ADD COLUMN     "imagesId" INTEGER,
ADD CONSTRAINT "BackdropType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Images" DROP CONSTRAINT "Images_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER,
ADD CONSTRAINT "Images_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LogoType" DROP CONSTRAINT "LogoType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "imagesId",
ADD COLUMN     "imagesId" INTEGER,
ADD CONSTRAINT "LogoType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Movie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PosterType" DROP CONSTRAINT "PosterType_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "imagesId",
ADD COLUMN     "imagesId" INTEGER,
ADD CONSTRAINT "PosterType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER,
ADD CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductionCountry" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER;

-- AlterTable
ALTER TABLE "ReleaseDates" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER;

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER;

-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackdropType" ADD CONSTRAINT "BackdropType_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PosterType" ADD CONSTRAINT "PosterType_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogoType" ADD CONSTRAINT "LogoType_imagesId_fkey" FOREIGN KEY ("imagesId") REFERENCES "Images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
