/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import seeds from './seed.json';
import { omit } from 'lodash';
const prisma = new PrismaClient();

async function main() {
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
        release_dates: {
          createMany: {
            skipDuplicates: true,
            data: seed.release_dates
              .map((date) =>
                date.release_dates.flatMap((b) => ({
                  iso_3166_1: date.iso_3166_1,
                  ...b,
                })),
              )
              .flat()
              .filter((c) => c.certification),
          },
        },
        tmdb_id: seed.id,
        production_companies: {
          createMany: {
            skipDuplicates: true,
            data: seed.production_companies,
          },
        },
        production_countries: {
          createMany: {
            skipDuplicates: true,
            data: seed.production_countries,
          },
        },
        spoken_languages: {
          createMany: {
            skipDuplicates: true,
            data: seed.spoken_languages,
          },
        },
        images: {
          create: {
            backdrops: {
              createMany: {
                skipDuplicates: true,
                data: seed.images.backdrops,
              },
            },
            logos: {
              createMany: {
                skipDuplicates: true,
                data: seed.images.logos,
              },
            },
            posters: {
              createMany: {
                skipDuplicates: true,
                data: seed.images.posters,
              },
            },
            id: seed.images.id,
          },
        },
        videos: {
          createMany: {
            skipDuplicates: true,
            // @ts-ignore
            data: seed.videos.results,
          },
        },
        external_ids: {
          create: seed.external_ids,
        },
        genres: {
          createMany: {
            skipDuplicates: true,
            data: seed.genres,
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
