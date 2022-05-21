/*
  Warnings:

  - The primary key for the `ProductionCountry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SpokenLanguage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ProductionCountry` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SpokenLanguage` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_MovieToProductionCountry" DROP CONSTRAINT "_MovieToProductionCountry_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToSpokenLanguage" DROP CONSTRAINT "_MovieToSpokenLanguage_B_fkey";

-- AlterTable
ALTER TABLE "ProductionCountry" DROP CONSTRAINT "ProductionCountry_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SpokenLanguage" DROP CONSTRAINT "SpokenLanguage_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SpokenLanguage_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_MovieToProductionCountry" ADD CONSTRAINT "_MovieToProductionCountry_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCountry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSpokenLanguage" ADD CONSTRAINT "_MovieToSpokenLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "SpokenLanguage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
