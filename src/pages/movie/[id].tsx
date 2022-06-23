import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import { Star } from '~/components/Icons';
import { SinglePageLayout } from '~/components/SinglePageLayout';
import { PATHS } from '~/utils/constants/TMDB';
import { useMovie } from '~/utils/hooks/useMovies';
import Tippy from '@tippyjs/react';
import { Socials } from '~/components/Socials';
import { MovieInfo } from '~/components/MovieInfo';
import { MoviePersonnel } from '~/components/MoviePersonnel';

const MovieViewPage = () => {
  const id = useRouter().query.id as string;
  const { isLoading, data: movie } = useMovie({ id });
  const poster =
    PATHS.secure_base_url +
    PATHS.backdrop_sizes.original +
    movie?.backdrop_path;

  if (isLoading || !movie) {
    return <>Loading...</>;
  }
  const genres = movie?.genres.map((genre) => genre.name).join(', ');
  const year = new Date(movie?.release_date).getFullYear();

  return (
    <>
      <div className="relative max-h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 "
          style={{
            background:
              'linear-gradient(0deg, #FFFFFF 15.02%, rgba(255, 255, 255, 0.62) 33.43%, rgba(255, 255, 255, 0.22) 57.27%)',
          }}
        ></div>
        <img src={poster} alt={movie?.title} className="max-h-full w-full" />
        <div className="absolute bottom-12 text-center w-full">
          <h1 className="text-grayscale-900 font-bold text-2xl pb-2">
            {movie?.title}
          </h1>
          <p className="font-medium text-grayscale-500 text-bodyS">
            {genres} I {year} I {(movie.runtime / 60).toFixed(1)} hours
          </p>

          <div className="flex justify-center items-center gap-2">
            <Star />
            <span className="text-base font-bold text-grayscale-900 flex items-center">
              {movie.vote_average}
              <span className="text-grayscale-500 font-normal text-xs pl-2">
                ({movie.vote_count} reviews)
              </span>
            </span>
          </div>
        </div>
      </div>
      <section className="max-w-[80%] w-7xl m-auto grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-base font-bold mb-3">The Plot</h2>
          <p className="text-grayscale-500 font-normal text-sm">
            {movie.overview}
          </p>

          <MoviePersonnel people={movie.cast} title="Cast" />
          <MoviePersonnel people={movie.crew} title="Crew" />
        </div>
        <MovieInfo {...movie} />
      </section>
    </>
  );
};
MovieViewPage.Layout = SinglePageLayout;
export default MovieViewPage;
