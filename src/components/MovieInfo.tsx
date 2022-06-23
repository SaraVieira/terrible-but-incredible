import Tippy from "@tippyjs/react"
import ReactCountryFlag from "react-country-flag"
import { Socials } from "./Socials"

const getInfo = (movie) => {
  const info = [
    {
      label: "Languages",
      value: movie.spoken_languages.map((l) => l.english_name).join(","),
    },
    {
      label: "Runtime",
      value: (movie.runtime / 60).toFixed(1) + " hours",
    },
    {
      label: "Socials",
      value: <Socials values={movie.external_ids} website={movie.homepage} />,
    },
  ]

  if (movie.release_dates.length) {
    info.push({
      label: "Release Date",
      value: new Date(movie.release_dates[0].release_date).toLocaleDateString(
        "pt"
      ),
    })
    info.push({
      label: "Ratings",
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
    })
  }

  if (movie.budget) {
    info.push({
      label: "Budget",
      value: Intl.NumberFormat("en", { notation: "compact" }).format(
        movie.budget
      ),
    })
  }

  if (movie.revenue) {
    info.push({
      label: "Revenue",
      value: Intl.NumberFormat("en", { notation: "compact" }).format(
        movie.revenue
      ),
    })
  }

  return info
}

export const MovieInfo = (movie) => {
  const info = getInfo(movie)

  return (
    <div className=" w-full">
      <ul role="list" className="divide-y divide-gray-200  mt-12 sm:mt-0">
        <h2 className="text-base font-bold mb-3">Info</h2>
        {info.map((i) => (
          <li className="py-4" key={i.label}>
            <div className="flex">
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
  )
}
