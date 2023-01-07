/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */

import { PrismaClient } from "@prisma/client"
import seeds from "./utils/seed.json"
import { omit } from "lodash"
import { createMovieData } from "./utils/createMovieData"
import { writeFileSync } from "fs"

const prisma = new PrismaClient()

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
const removeid = (arr) => arr.map((obj) => omit(obj, "id"))
async function main() {
  const movies = [];
  const a = seeds.map(async (seed) => {
    const exists = await prisma.movie.findFirst({
      where: {
        tmdb_id: seed.id,
      },
    })


    const movie = await createMovieData(seed.id)
    // @ts-ignore
    movies.push(movie)
    if (exists) return
    return prisma.movie.create({
      // @ts-ignore
      data: {
        ...omit(movie, [
          `belongs_to_collection`,
          "id",
          "genres",
          "production_countries",
          "spoken_languages",
          "production_companies",
          "images",
          "external_ids",
          "release_dates",
          "videos",
          "cast",
          "adult",
          "crew",
        ]),
        release_date: new Date(movie.release_date),
        release_dates: {
          createMany: {
            data: movie.release_dates
              .map((date) =>
                date.release_dates.flatMap((b) => ({
                  iso_3166_1: date.iso_3166_1,
                  ...omit(b, "id"),
                }))
              )
              .flat()
              .filter((c) => c.certification),
          },
        },
        tmdb_id: movie.id,
        production_companies: {
          createMany: {
            data: removeid(movie.production_companies),
          },
        },
        cast: {
          createMany: {
            data: removeid(movie.cast),
          },
        },
        crew: {
          createMany: {
            data: removeid(movie.crew),
          },
        },
        production_countries: {
          createMany: {
            data: removeid(movie.production_countries),
          },
        },
        spoken_languages: {
          createMany: {
            data: removeid(movie.spoken_languages),
          },
        },

        images: {
          create: {
            backdrops: {
              createMany: {
                data: movie.images.backdrops,
              },
            },
            logos: {
              createMany: {
                data: movie.images.logos,
              },
            },
            posters: {
              createMany: {
                data: movie.images.posters,
              },
            },
            id: movie.images.id,
          },
        },
        videos: {
          createMany: {
            data: movie.videos.results,
          },
        },
        external_ids: {
          create: omit(movie.external_ids, "id"),
        },
        genres: {
          createMany: {
            data: removeid(movie.genres),
          },
        },
      },
    })
  })

  await Promise.all(a)

  writeFileSync("all.json", JSON.stringify(movies))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
