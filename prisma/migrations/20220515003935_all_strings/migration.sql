/*
  Warnings:

  - The primary key for the `BackdropType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExternalIds` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Genre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LogoType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PosterType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductionCompany` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_externalIdsId_fkey";

-- AlterTable
ALTER TABLE "BackdropType" DROP CONSTRAINT "BackdropType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BackdropType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BackdropType_id_seq";

-- AlterTable
ALTER TABLE "ExternalIds" DROP CONSTRAINT "ExternalIds_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ExternalIds_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ExternalIds_id_seq";

-- AlterTable
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Genre_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Genre_id_seq";

-- AlterTable
ALTER TABLE "LogoType" DROP CONSTRAINT "LogoType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LogoType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LogoType_id_seq";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "externalIdsId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PosterType" DROP CONSTRAINT "PosterType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PosterType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PosterType_id_seq";

-- AlterTable
ALTER TABLE "ProductionCompany" DROP CONSTRAINT "ProductionCompany_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProductionCompany_id_seq";

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_externalIdsId_fkey" FOREIGN KEY ("externalIdsId") REFERENCES "ExternalIds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
