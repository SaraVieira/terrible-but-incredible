import { NextRouter, useRouter } from "next/router"
import { useEffect } from "react"
import { useSearch } from "~/utils/hooks/useSearch"
import { SearchIcon } from "./Icons"

/**
 * If removeList is empty, the function removes all params from url.
 * @param {*} router
 * @param {*} removeList
 */
const removeQueryParamsFromRouter = (
  router: NextRouter,
  removeList: string[] = []
) => {
  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param])
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  )
}

export const Search = () => {
  const router = useRouter()
  const { query } = router.query
  const { search, setSearch } = useSearch()

  useEffect(() => {
    setSearch((query as string) || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    router.replace(`?query=${search}`, undefined, { shallow: true })

    if (!search) {
      removeQueryParamsFromRouter(router, ["query"])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="relative h-[48px] mb-6 search-area">
      <input
        type="search"
        placeholder="Search for a movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-grayscale-400 transition-all" />
    </div>
  )
}
