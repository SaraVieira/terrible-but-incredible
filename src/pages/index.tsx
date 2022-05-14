import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useMovies } from '~/utils/hooks/useMovies';

const IndexPage = () => {
  const movies = useMovies();
  const loadingRef = useRef<any>();

  useEffect(() => {
    if (loadingRef?.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((entities) => {
        if (!entities || !entities[0]) return null;
        if (entities[0].isIntersecting) {
          movies.fetchNextPage();
        }
      }, options);
      observer.observe(loadingRef.current);
    }
  }, [movies]);

  return (
    <>
      <h2 className="text-center pb-8 font-bold text-3xl">
        Welcome to the next full stack starter!
      </h2>

      <h3 className="text-xl font-bold py-4">
        movies
        {movies.isLoading && '(loading)'}
      </h3>
      {movies.data?.pages.map((page, i) => (
        <React.Fragment key={i}>
          {page.items.map((item) => (
            <article key={item.id} className="my-4">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <Link href={`/movie/${item.id}`}>
                <a className="underline">Read more {'->'} </a>
              </Link>
            </article>
          ))}
        </React.Fragment>
      ))}
      {movies.hasNextPage && <div ref={loadingRef}>Loading</div>}
    </>
  );
};

export default IndexPage;

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
