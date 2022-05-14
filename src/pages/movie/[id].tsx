import { useRouter } from 'next/router';
import { useMovie } from '~/utils/hooks/useMovies';

const MovieViewPage = () => {
  const id = useRouter().query.id as string;
  const { isLoading, data: movie } = useMovie({ id });

  if (isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <h1>{movie?.title}</h1>
      <em>Created {movie?.createdAt.toLocaleDateString()}</em>

      <h2>Raw data:</h2>
      <pre>{JSON.stringify(movie, null, 4)}</pre>
    </>
  );
};

export default MovieViewPage;
