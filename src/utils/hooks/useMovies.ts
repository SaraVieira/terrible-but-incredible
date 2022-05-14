import { trpc } from '../trpc';

export const useMovies = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.useInfiniteQuery(
      [
        'movies.all',
        {
          limit: 10,
        },
      ],
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(['post.byId', { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  };
};

export const useMovie = ({ id }) => {
  const movieQuery = trpc.useQuery(['movies.byId', { id }]);

  return movieQuery;
};
