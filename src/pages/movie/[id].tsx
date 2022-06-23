import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import { Star } from '~/components/Icons';
import { SinglePageLayout } from '~/components/SinglePageLayout';
import { PATHS } from '~/utils/constants/TMDB';
import { useMovie } from '~/utils/hooks/useMovies';
import Tippy from '@tippyjs/react';
import { Socials } from '~/components/Socials';

const getInfo = (movie) => {
  const info = [
    {
      label: 'Languages',
      value: movie.spoken_languages.map((l) => l.english_name).join(','),
    },
    {
      label: 'Runtime',
      value: (movie.runtime / 60).toFixed(1) + ' hours',
    },
    {
      label: 'Socials',
      value: <Socials values={movie.external_ids} website={movie.homepage} />,
    },
  ];

  if (movie.release_dates.length) {
    info.push({
      label: 'Ratings',
      value: (
        <div className="flex gap-2">
          {movie.release_dates.map((date) => (
            <Tippy key={date.id} content={date.certification}>
              <div>
                <ReactCountryFlag countryCode={date.iso_3166_1} />
              </div>
            </Tippy>
          ))}
        </div>
      ),
    });
  }

  if (movie.budget) {
    info.push({
      label: 'Budget',
      value: Intl.NumberFormat('en', { notation: 'compact' }).format(
        movie.budget,
      ),
    });
  }

  if (movie.revenue) {
    info.push({
      label: 'Revenue',
      value: Intl.NumberFormat('en', { notation: 'compact' }).format(
        movie.revenue,
      ),
    });
  }

  return info;
};

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

  const info = getInfo(movie);
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

          <h2 className="text-base font-bold mb-3 mt-6">Cast</h2>
          <ul className="flex gap-6 flex-wrap">
            {movie.cast.map((person) => (
              <li key={person.id} className="text-center w-14">
                {person.profile_path ? (
                  <div
                    className="w-14 rounded-full h-14 bg-cover bg-center block"
                    style={{
                      backgroundImage: `url(${
                        PATHS.secure_base_url +
                        PATHS.profile_sizes.w45 +
                        person.profile_path
                      })`,
                    }}
                  ></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 26"
                    x="0px"
                    y="0px"
                    className="w-14 rounded-full h-14 block"
                  >
                    <circle cx="13" cy="9" r="2"></circle>
                    <path d="M13,0A13,13,0,1,0,26,13,13.015,13.015,0,0,0,13,0Zm0,5A4,4,0,1,1,9,9,4,4,0,0,1,13,5Zm7,15a1,1,0,0,1-1-1,3,3,0,0,0-3-3H10a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5h6a5.006,5.006,0,0,1,5,5A1,1,0,0,1,20,20Z"></path>
                  </svg>
                )}
                <span className="block text-xs text-grayscale-900 font-normal">
                  {person.name}
                </span>

                <span className="block text-xs text-grayscale-500 font-normal">
                  {person.character}
                </span>
              </li>
            ))}
          </ul>
          {console.log(movie.crew)}
          <h2 className="text-base font-bold mb-3 mt-6">Crew</h2>
          <ul className="flex gap-6 flex-wrap">
            {movie.crew.map((person) => (
              <li key={person.id} className="text-center w-14">
                {person.profile_path ? (
                  <div
                    className="w-14 rounded-full h-14 bg-cover bg-center block"
                    style={{
                      backgroundImage: `url(${
                        PATHS.secure_base_url +
                        PATHS.profile_sizes.w45 +
                        person.profile_path
                      })`,
                    }}
                  ></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 26"
                    x="0px"
                    y="0px"
                    className="w-14 rounded-full h-14 block"
                  >
                    <circle cx="13" cy="9" r="2"></circle>
                    <path d="M13,0A13,13,0,1,0,26,13,13.015,13.015,0,0,0,13,0Zm0,5A4,4,0,1,1,9,9,4,4,0,0,1,13,5Zm7,15a1,1,0,0,1-1-1,3,3,0,0,0-3-3H10a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5h6a5.006,5.006,0,0,1,5,5A1,1,0,0,1,20,20Z"></path>
                  </svg>
                )}
                <span className="block text-xs text-grayscale-900 font-normal">
                  {person.name}
                </span>

                <span className="block text-xs text-grayscale-500 font-normal">
                  {person.job}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex sm:justify-end w-full">
          <ul
            role="list"
            className="divide-y divide-gray-200 sm:w-[320px] w-full mt-12 sm:mt-0"
          >
            <h2 className="text-base font-bold mb-3">Info</h2>
            {info.map((i) => (
              <li className="py-4" key={i.label}>
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{i.label}</h3>
                      <p className="text-sm text-gray-500">{i.value}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
MovieViewPage.Layout = SinglePageLayout;
export default MovieViewPage;
