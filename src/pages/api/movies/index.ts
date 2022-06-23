import { omit } from "lodash"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "~/server/prisma"
import { defaultMovieSelect } from "~/server/routers/movie"

const Movies = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(500).json({ message: "Only get method allowed" })
    return
  }
  const {
    limit = "25",
    page = "1",
    orderBy = "id",
    sortOrder = "desc",
  } = req.query as {
    limit: string
    page: string
    orderBy: string
    sortOrder: "asc" | "desc"
  }
  const intPage = parseInt(page)
  const intLimit = parseInt(limit)
  const orderS = sortOrder === "asc" || sortOrder == "desc" ? sortOrder : "desc"
  let order = { id: orderS } as { [a: string]: string }

  if (orderBy === "rating" || orderBy === "vote_average") {
    order = {
      vote_average: orderS,
    }
  }

  const movies = await prisma.movie.findMany({
    take: intLimit,
    ...omit(defaultMovieSelect, "orderBy"),
    orderBy: order,
    skip: (intPage - 1) * intLimit,
  })
  const count = await prisma.movie.count()
  const pages = Math.ceil(count / intLimit)
  res.status(200).json({
    info: {
      count: movies.length,
      all_movies: count,
      page: intPage,
      pages,
      has_next_page: intPage < pages,
    },
    movies,
  })
}

export default Movies
