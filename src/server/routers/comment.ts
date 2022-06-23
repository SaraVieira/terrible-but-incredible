import { z } from "zod"
import { createRouter } from "~/server/createRouter"
import { prisma } from "~/server/prisma"

export const commentsRouter = createRouter()
  .query("all", {
    input: z.object({
      movieId: z.string(),
    }),
    async resolve({ input }) {
      const comments = await prisma.comment.findMany({
        where: {
          movieId: input.movieId,
        },
      })

      return comments
    },
  })

  .mutation("add", {
    input: z.object({
      userId: z.string(),
      movieId: z.string(),
      comment: z.string().min(1),
    }),
    async resolve({ input }) {
      const comment = await prisma.comment.create({
        data: {
          movieId: input.movieId,
          userId: input.userId,
          comment: input.comment,
        },
      })
      return comment
    },
  })
