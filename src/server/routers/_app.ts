import { createRouter } from '../createRouter';
import { movieRouter } from './movie';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('movies.', movieRouter);

export type AppRouter = typeof appRouter;
