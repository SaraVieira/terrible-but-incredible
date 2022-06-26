import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export const Header = () => {
  const { data: session } = useSession()
  return (
    <header className="absolute w-full z-10 bg-gray-800 py-4 text-gray-200 ">
      <div className=" max-w-[80%] w-7xl mx-auto flex items-center justify-between">
        <ul className="flex gap-4">
          <li>
            <Link href="/">
              <a className="font-medium">Home</a>
            </Link>
          </li>
        </ul>

        <ul className="flex gap-4">
          {session?.user ? (
            <>
              <button
                onClick={() =>
                  signOut({
                    redirect: true,
                    callbackUrl: "/",
                  })
                }
                className="font-medium"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/auth/signin">
              <a className="font-medium">Sign In</a>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}
