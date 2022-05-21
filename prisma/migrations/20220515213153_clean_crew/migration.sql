/*
  Warnings:

  - You are about to drop the column `cast_id` on the `Crew` table. All the data in the column will be lost.
  - You are about to drop the column `character` on the `Crew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Crew" DROP COLUMN "cast_id",
DROP COLUMN "character";
