/*
  Warnings:

  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Genre` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductionCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductionCompany` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ProductionCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ProductionCountry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SpokenLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SpokenLanguage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SpokenLanguage_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Cast" (
    "id" SERIAL NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "gender" INTEGER NOT NULL,
    "known_for_department" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "popularity" TEXT NOT NULL,
    "profile_path" TEXT,
    "cast_id" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "Cast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crew" (
    "id" SERIAL NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "gender" INTEGER NOT NULL,
    "known_for_department" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "popularity" TEXT NOT NULL,
    "profile_path" TEXT,
    "cast_id" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "credit_id" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "Crew_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cast" ADD CONSTRAINT "Cast_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crew" ADD CONSTRAINT "Crew_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
