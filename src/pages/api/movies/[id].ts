import { omit } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/prisma';
import { defaultMovieSelect } from '~/server/routers/movie';

const Movies = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'Only get method allowed' });
    return;
  }
  const { id } = req.query as {
    id: string;
  };

  const movie = await prisma.movie.findMany({
    where: {
      id,
    },
    ...omit(defaultMovieSelect, 'orderBy'),
  });
  res.status(200).json(movie);
};

export default Movies;
