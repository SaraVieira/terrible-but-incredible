import { formatDistance } from "date-fns"
import { useComments } from "~/utils/hooks/useComments"

export const Comments = ({ id }) => {
  const { data: comments } = useComments({ id })
  if (!comments?.length) return null

  return (
    <ul role="list" className="divide-y divide-grayscale-200">
      {comments.map((comment) => (
        <li key={comment.id} className="relative py-5">
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <div>
                <span className="absolute inset-0" aria-hidden="true"></span>
                <p className="text-sm font-medium text-grayscale-900 truncate dark:text-grayscale-200">
                  {comment.User?.username}
                </p>
              </div>
            </div>
            <time
              dateTime="2021-01-27T16:35"
              className="flex-shrink-0 whitespace-nowrap text-sm text-grayscale-500 dark:text-grayscale-400"
            >
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
              })}
            </time>
          </div>
          <div className="mt-1">
            <p className="line-clamp-2 text-sm text-grayscale-300">
              {comment.comment}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
