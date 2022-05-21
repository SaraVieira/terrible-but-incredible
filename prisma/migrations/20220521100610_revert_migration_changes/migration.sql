/*
  Warnings:

  - The primary key for the `Cast` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Crew` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductionCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.

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
ALTER TABLE "Cast" DROP CONSTRAINT "Cast_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cast_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cast_id_seq";

-- AlterTable
ALTER TABLE "Crew" DROP CONSTRAINT "Crew_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Crew_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Crew_id_seq";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "movieId" DROP NOT NULL,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Genre_id_seq";

-- AlterTable
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "movieId" DROP NOT NULL,
ADD CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductionCompany_id_seq";

-- AlterTable
ALTER TABLE "ProductionCountry" ALTER COLUMN "movieId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SpokenLanguage" ALTER COLUMN "movieId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductionCompany" ADD CONSTRAINT "ProductionCompany_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpokenLanguage" ADD CONSTRAINT "SpokenLanguage_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductionCountry" ADD CONSTRAINT "ProductionCountry_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
