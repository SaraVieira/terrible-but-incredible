/*
  Warnings:

  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `watchList` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `watched` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "watchList",
DROP COLUMN "watched";

-- CreateTable
CREATE TABLE "WatchedMovies" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "movieId" TEXT,

    CONSTRAINT "WatchedMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchListedMovies" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "movieId" TEXT,

    CONSTRAINT "WatchListedMovies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WatchedMovies" ADD CONSTRAINT "WatchedMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedMovies" ADD CONSTRAINT "WatchedMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchListedMovies" ADD CONSTRAINT "WatchListedMovies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchListedMovies" ADD CONSTRAINT "WatchListedMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
