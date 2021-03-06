import { ReactNode } from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import { Header } from "./header"

type DefaultLayoutProps = { children: ReactNode }

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <div className="dark:bg-grayscale-900 min-h-screen text-[#141414] pb-8 dark:text-white">
        <Header />
        <main className="max-w-[80%] w-7xl m-auto mb-16 h-full pt-20">
          {children}
        </main>
      </div>
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}
