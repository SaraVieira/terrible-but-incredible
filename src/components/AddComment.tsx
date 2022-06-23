import { useSession } from "next-auth/react"
import { useState } from "react"
import { useCreateComment } from "~/utils/hooks/useComments"
import { NewSession } from "~/utils/types"
import { Textarea } from "./Form"

export default function AddComment({ id }) {
  const createComment = useCreateComment()
  const [comment, setComment] = useState("")
  const { data: session } = useSession() as { data: NewSession }
  if (!session?.user) return null
  const img = session.user.image || session.user.gravatarImage

  const addComment = async (e) => {
    e.preventDefault()
    await createComment.mutateAsync({
      userId: session.user?.id as string,
      movieId: id,
      comment,
    })
    setComment("")
  }

  return (
    <>
      <div className="flex items-start space-x-4 mt-4">
        <div className="flex-shrink-0">
          {img ? (
            <img
              className="inline-block h-10 w-10 rounded-full"
              src={img}
              alt={session.user.name || "user"}
            />
          ) : (
            <div className="bg-[#FDB92C] text-white font-bold h-10 w-10 rounded-full flex items-center justify-center">
              X
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <form onSubmit={addComment} className="relative">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:!border-yellow focus-within:outline-none focus:ring-0 ring-yellow">
              <label htmlFor="comment" className="sr-only">
                Add a comment
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                name="comment"
                id="comment"
                className="py-3 border-0 resize-none focus:ring-0"
                placeholder="Add a comment..."
                defaultValue={""}
              />

              {/* Spacer element to match the height of the toolbar */}
              <div className="py-2" aria-hidden="true">
                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                <div className="py-px">
                  <div className="h-9" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-end">
              <div className="flex-shrink-0">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
