import fetch from 'node-fetch';
import seed from './seed.json';

const api_key = `?api_key=${process.env.TMDB_API_KEY}`;
const base = 'https://api.themoviedb.org/3/movie';

const links = {
  single: (movie) => `${base}/${movie}${api_key}`,
  images: (movie) => `${base}/${movie}/images${api_key}`,
  videos: (movie) => `${base}/${movie}/videos${api_key}`,
  external_ids: (movie) => `${base}/${movie}/external_ids${api_key}`,
  credits: (movie) => `${base}/${movie}/credits${api_key}`,
  release_dates: (movie) => `${base}/${movie}/release_dates${api_key}`,
};

export const createMovieData = async (id): Promise<any> => {
  const details = (await fetch(links.single(id)).then((rsp) =>
    rsp.json(),
  )) as Record<string, unknown>;
  const images = await fetch(links.images(id)).then((rsp) => rsp.json());
  const videos = await fetch(links.videos(id)).then((rsp) => rsp.json());
  const external_ids = await fetch(links.external_ids(id)).then((rsp) =>
    rsp.json(),
  );
  const { cast, crew } = (await fetch(links.credits(id)).then((rsp) =>
    rsp.json(),
  )) as { cast: Record<string, unknown>; crew: Record<string, unknown> };
  const { results: release_dates } = (await fetch(links.release_dates(id)).then(
    (rsp) => rsp.json(),
  )) as { results: Record<string, unknown> };

  console.log('getting movie ' + seed.find((m) => m.id)?.title);

  return {
    ...details,
    images,
    videos,
    external_ids,
    release_dates,
    cast,
    crew,
  };
};
