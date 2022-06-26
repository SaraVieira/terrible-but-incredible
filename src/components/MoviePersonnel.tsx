import {
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline"
import { useState } from "react"
import { PATHS } from "~/utils/constants/TMDB"
import { Button } from "./Button"
import { SubHeader } from "./Typography"

export const MoviePersonnel = ({ people, title }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6">
      <SubHeader>{title}</SubHeader>
      <ul
        className="flex gap-6 flex-wrap overflow-hidden"
        style={{ height: open ? "auto" : 268 }}
      >
        {people.map((person) => (
          <li key={person.id} className="text-center w-16">
            {person.profile_path ? (
              <div
                className="w-16 rounded-full h-16 bg-cover bg-center block"
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
                className="w-16 rounded-full h-16 block dark:text-grayscale-400"
              >
                <circle cx="13" cy="9" r="2"></circle>
                <path
                  d="M13,0A13,13,0,1,0,26,13,13.015,13.015,0,0,0,13,0Zm0,5A4,4,0,1,1,9,9,4,4,0,0,1,13,5Zm7,15a1,1,0,0,1-1-1,3,3,0,0,0-3-3H10a3,3,0,0,0-3,3,1,1,0,0,1-2,0,5.006,5.006,0,0,1,5-5h6a5.006,5.006,0,0,1,5,5A1,1,0,0,1,20,20Z"
                  fill="currentColor"
                ></path>
              </svg>
            )}
            <span className="block text-xs text-grayscale-900 dark:text-grayscale-200 font-normal pt-1">
              {person.name}
            </span>

            <span className="block text-[10px] text-grayscale-500 font-normal">
              {person.character || person.job}
            </span>
          </li>
        ))}
      </ul>
      {people.length > 8 && (
        <Button
          onClick={() => setOpen((o) => !o)}
          variant="secondary"
          className="flex gap-2 justify-center items-center"
        >
          See {open ? "Less" : "More"}
          {open ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </Button>
      )}
    </div>
  )
}
