/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import seeds from './seed.json';
import { omit } from 'lodash';
const prisma = new PrismaClient();

const removeid = (arr) => arr.map((obj) => omit(obj, 'id'));

async function main() {
  const count = await prisma.movie.count();
  if (count) return;
  const a = seeds.map(async (seed) => {
    return prisma.movie.create({
      data: {
        ...omit(seed, [
          `belongs_to_collection`,
          'id',
          'genres',
          'production_countries',
          'spoken_languages',
          'production_companies',
          'images',
          'external_ids',
          'release_dates',
          'videos',
        ]),
        release_date: new Date(seed.release_date),
        release_dates: {
          createMany: {
            data: seed.release_dates
              .map((date) =>
                date.release_dates.flatMap((b) => ({
                  iso_3166_1: date.iso_3166_1,
                  ...omit(b, 'id'),
                })),
              )
              .flat()
              .filter((c) => c.certification),
          },
        },
        tmdb_id: seed.id,
        production_companies: {
          createMany: {
            data: removeid(seed.production_companies),
          },
        },
        production_countries: {
          createMany: {
            data: removeid(seed.production_countries),
          },
        },
        spoken_languages: {
          createMany: {
            data: removeid(seed.spoken_languages),
          },
        },
        images: {
          create: {
            backdrops: {
              createMany: {
                data: seed.images.backdrops,
              },
            },
            logos: {
              createMany: {
                data: seed.images.logos,
              },
            },
            posters: {
              createMany: {
                data: seed.images.posters,
              },
            },
            id: seed.images.id,
          },
        },
        videos: {
          createMany: {
            // @ts-ignore
            data: seed.videos.results,
          },
        },
        external_ids: {
          create: omit(seed.external_ids, 'id'),
        },
        genres: {
          createMany: {
            data: removeid(seed.genres),
          },
        },
      },
    });
  });

  await Promise.all(a);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
