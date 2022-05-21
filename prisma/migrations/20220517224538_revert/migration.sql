/*
  Warnings:

  - The primary key for the `ProductionCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductionCountry` table. All the data in the column will be lost.
  - The primary key for the `SpokenLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SpokenLanguage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieToProductionCountry" DROP CONSTRAINT "_MovieToProductionCountry_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpokenLanguage" DROP CONSTRAINT "_MovieToSpokenLanguage_B_fkey";

-- AlterTable
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("iso_3166_1");

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "SpokenLanguage_pkey" PRIMARY KEY ("iso_639_1");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCountry"("iso_3166_1") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpokenLanguage" ADD CONSTRAINT "_MovieToSpokenLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "SpokenLanguage"("iso_639_1") ON DELETE CASCADE ON UPDATE CASCADE;
