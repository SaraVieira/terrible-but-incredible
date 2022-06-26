import { ReactNode } from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import { Header } from "./header"

type DefaultLayoutProps = { children: ReactNode }

export const SinglePageLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <div className="dark:bg-grayscale-900 min-h-screen text-[#141414] pb-8 dark:text-white">
        <Header />
        <main className="mb-16 h-full">{children}</main>
      </div>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}
