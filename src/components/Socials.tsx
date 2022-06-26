import { ExternalIds } from "@prisma/client"
import { Facebook, IMDB, Instagram, Twitter, Website } from "~/components/Icons"

export const Socials = ({
  values,
  website,
}: {
  values: ExternalIds
  website: string
}) => {
  return (
    <div className="flex gap-3">
      {website && (
        <a href={`${website}`} rel="noreferrer" target="_blank">
          <Website />
        </a>
      )}
      {values.imdb_id && (
        <a
          href={`https://www.imdb.com/title/${values.imdb_id}/`}
          rel="noreferrer"
          target="_blank"
        >
          <IMDB />
        </a>
      )}
      {values.facebook_id && (
        <a
          href={`https://www.facebook.com/${values.facebook_id}/`}
          rel="noreferrer"
          target="_blank"
        >
          <Facebook />
        </a>
      )}
      {values.instagram_id && (
        <a
          href={`https://www.instagram.com/${values.instagram_id}/`}
          rel="noreferrer"
          target="_blank"
        >
          <Instagram />
        </a>
      )}
      {values.twitter_id && (
        <a
          href={`https://twitter.com/${values.twitter_id}`}
          rel="noreferrer"
          target="_blank"
        >
          <Twitter />
        </a>
      )}
    </div>
  )
}
