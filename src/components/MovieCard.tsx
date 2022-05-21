import { Genre, Movie } from '@prisma/client';
import Link from 'next/link';
import { PATHS } from '~/utils/constants/TMDB';

export const MovieCard = (movie: Movie & { genres: Genre[] }) => {
  const bgImage = movie.backdrop_path
    ? PATHS.secure_base_url + PATHS.backdrop_sizes.w780 + movie.backdrop_path
    : PATHS.secure_base_url + PATHS.poster_sizes.w780 + movie.poster_path;
  const genres = movie.genres.map((genre) => genre.name).join(', ');
  const year = new Date(movie.release_date).getFullYear();
  return (
    <Link href={`/movie/${movie.id}`} key={movie.id}>
      <a className="sm:w-[383px] w-full">
        <article className="bg-grayscale-200 rounded-lg hover:shadow-md hover:scale-105 transition-all">
          <div className="overflow-hidden rounded-lg relative  sm:max-w-sm">
            <div
              className="inset-0 absolute"
              style={{
                background:
                  'linear-gradient(360deg, #000000 4.78%, rgba(0, 0, 0, 0.79) 34.92%, rgba(0, 0, 0, 0.13) 61.74%)',
              }}
            ></div>
            <div
              className="h-[400px] sm:h-[216px]  w-full sm:w-[383px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${bgImage})`,
              }}
            />
            <div className="absolute z-10 bottom-8 left-8 right-8">
              <h3 className="font-bold text-white text-h3">{movie.title}</h3>

              <p className="font-medium text-grayscale-50 text-bodyS">
                {genres} I {year} I {movie.vote_average}
              </p>
            </div>
          </div>
        </article>{' '}
      </a>
    </Link>
  );
};
