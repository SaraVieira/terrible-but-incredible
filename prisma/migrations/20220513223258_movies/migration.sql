/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "homepage" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "runtime" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video" BOOLEAN NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "externalIdsId" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InnerReleaseDates" (
    "id" TEXT NOT NULL,
    "certification" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "InnerReleaseDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReleaseDates" (
    "id" TEXT NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "movieId" TEXT,
    "innerReleaseDatesId" TEXT NOT NULL,

    CONSTRAINT "ReleaseDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalIds" (
    "id" TEXT NOT NULL,
    "imdb_id" TEXT,
    "facebook_id" TEXT,
    "instagram_id" TEXT,
    "twitter_id" TEXT,

    CONSTRAINT "ExternalIds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Videos" (
    "iso_639_1" TEXT NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "official" BOOLEAN NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackdropType" (
    "id" TEXT NOT NULL,
    "aspect_ratio" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "iso_639_1" TEXT,
    "file_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "imagesId" TEXT,

    CONSTRAINT "BackdropType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PosterType" (
    "id" TEXT NOT NULL,
    "aspect_ratio" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "iso_639_1" TEXT,
    "file_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "imagesId" TEXT,

    CONSTRAINT "PosterType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogoType" (
    "id" TEXT NOT NULL,
    "aspect_ratio" DOUBLE PRECISION NOT NULL,
    "height" INTEGER NOT NULL,
    "iso_639_1" TEXT,
    "file_path" TEXT NOT NULL,
    "vote_average" DOUBLE PRECISION NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "imagesId" TEXT,

    CONSTRAINT "LogoType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_path" TEXT NOT NULL,
    "origin_country" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "ProductionCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpokenLanguage" (
    "id" TEXT NOT NULL,
    "english_name" TEXT NOT NULL,
    "iso_639_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "SpokenLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionCountry" (
    "id" TEXT NOT NULL,
    "iso_3166_1" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "ProductionCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "movieId" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BelongsToCollection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,

    CONSTRAINT "BelongsToCollection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_externalIdsId_fkey" FOREIGN KEY ("externalIdsId") REFERENCES "ExternalIds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDates" ADD CONSTRAINT "ReleaseDates_innerReleaseDatesId_fkey" FOREIGN KEY ("innerReleaseDatesId") REFERENCES "InnerReleaseDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
