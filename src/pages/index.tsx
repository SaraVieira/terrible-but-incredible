import { Genre, Movie } from "@prisma/client"
import React, { useEffect, useRef } from "react"
import { MovieCard } from "~/components/MovieCard"
import { Search } from "~/components/Search"
import { useMovies } from "~/utils/hooks/useMovies"
import { useSearch } from "~/utils/hooks/useSearch"

const IndexPage = () => {
  const { search } = useSearch()
  const movies = useMovies({ query: search })
  const loadingRef = useRef<any>()

  useEffect(() => {
    if (loadingRef?.current) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }

      const observer = new IntersectionObserver((entities) => {
        if (!entities || !entities[0]) return null
        if (entities[0].isIntersecting && !movies.isFetchingNextPage) {
          movies.fetchNextPage()
        }
      }, options)
      observer.observe(loadingRef.current)
    }
  }, [movies])

  return (
    <>
      <Search />
      <div className="flex gap-7 flex-wrap justify-center">
        {movies.data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.items.map((item: Movie & { genres: Genre[] }) => (
              <MovieCard {...item} key={item.id} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {movies.hasNextPage && <div ref={loadingRef}>Loading</div>}
    </>
  )
}

export default IndexPage

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
