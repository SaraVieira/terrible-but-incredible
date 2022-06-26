export const Avatar = ({
  image,
  name,
}: {
  image?: string | null | undefined
  name?: string | null | undefined
}) => {
  return (
    <div className="flex-shrink-0">
      {image ? (
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={image}
          alt={name || "user"}
        />
      ) : (
        <div className="bg-[#FDB92C] text-white font-bold h-10 w-10 rounded-full flex items-center justify-center">
          X
        </div>
      )}
    </div>
  )
}
