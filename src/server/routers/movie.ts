import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultPostSelect = Prisma.validator<Prisma.MovieSelect>()({
  id: true,
  title: true,
  createdAt: true,
  updatedAt: true,
});

const allChildren = {
  genres: true,
  production_companies: true,
  production_countries: true,
  spoken_languages: true,
  images: true,
  videos: true,
  external_ids: true,
  release_dates: true,
};

export const movieRouter = createRouter()
  .query('all', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.any().nullish(), // <-- "cursor" needs to exist, but can be any type
    }),
    async resolve({ input }) {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const prismaHatesEmptyCursors = cursor
        ? {
            cursor: {
              id: cursor || '',
            },
          }
        : {};
      // @ts-ignore
      const items = await prisma.movie.findMany({
        include: allChildren,
        take: limit + 1,
        ...prismaHatesEmptyCursors,
      });
      let nextCursor: typeof cursor | null = null;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    },
  })

  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const post = await prisma.movie.findUnique({
        where: { id },
        include: allChildren,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  });
