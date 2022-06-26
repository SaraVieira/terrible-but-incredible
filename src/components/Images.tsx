import "photoswipe/dist/photoswipe.css"

import { Gallery, Item } from "react-photoswipe-gallery"
import { PATHS } from "~/utils/constants/TMDB"

export const Images = ({ movie }) => {
  if (!movie.images.length || !movie.images[0]?.posters.length) return null
  return (
    <>
      <h2 className="text-base font-bold mt-5 mb-3">Images</h2>
      <div className="flex gap-4 flex-wrap">
        <Gallery>
          {movie.images[0]?.posters.map((image) => {
            const thumb =
              PATHS.secure_base_url + PATHS.poster_sizes.w185 + image.file_path
            const original =
              PATHS.secure_base_url +
              PATHS.poster_sizes.original +
              image.file_path
            return (
              <Item
                original={original}
                thumbnail={thumb}
                width={image.width}
                height={image.height}
                key={image.id}
              >
                {({ ref, open }) => (
                  <button onClick={open}>
                    {/* @ts-ignore */}
                    <img ref={ref} src={thumb} />
                  </button>
                )}
              </Item>
            )
          })}
        </Gallery>{" "}
      </div>
    </>
  )
}
