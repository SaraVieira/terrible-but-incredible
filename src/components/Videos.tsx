export const Videos = ({ movie }) => {
  if (!movie.videos.length) return null
  return (
    <>
      <h2 className="text-base font-bold mt-5 mb-3">Videos</h2>
      <div className="flex flex-wrap gap-3 sm:justify-start justify-center">
        {movie.videos.map(
          (video) =>
            video.site === "YouTube" && (
              <div className="w-96">
                <iframe
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title={video.name}
                  frameBorder="0"
                  className="aspect-video w-full mb-2"
                ></iframe>
                <p className="text-sm font-medium">{video.name}</p>
                <span className="text-sm text-grayscale-500">
                  {new Date(video.published_at).toLocaleDateString("pt")}
                </span>
              </div>
            )
        )}
      </div>
    </>
  )
}
