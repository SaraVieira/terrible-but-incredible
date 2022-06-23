import { createRouter } from "../createRouter"
import { movieRouter } from "./movie"
import superjson from "superjson"
import { commentsRouter } from "./comment"

export const appRouter = createRouter()
  .transformer(superjson)
  .query("healthz", {
    async resolve() {
      return "yay!"
    },
  })
  .merge("movies.", movieRouter)
  .merge("comments.", commentsRouter)

export type AppRouter = typeof appRouter
