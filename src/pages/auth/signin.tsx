import { useRouter } from "next/router"

import { Input } from "~/components/Form"

import { Button } from "~/components/Button"
import Link from "next/link"
import { useSignIn } from "~/utils/hooks/useRegistration"
import { redirectIfAuthenticated } from "~/utils/session"
import { Feedback } from "~/components/Feedback"
import { STATES } from "~/utils/constants/signin-states"
import { MailIcon, PasswordIcon } from "~/components/Icons"

function SignIn() {
  const { isFilledIn, setPassword, setEmail, error, signIn, signingIn } =
    useSignIn()
  const router = useRouter()

  return (
    <>
      <form
        onSubmit={(e) => signIn(e, router)}
        className="max-w-[500px] m-auto p-15"
      >
        <h2 className="pb-8 font-bold text-2xl">Sign In</h2>
        {router.query.state === STATES.PASSWORD_UPDATED ? (
          <Feedback
            variant="warning"
            message="Please sign in with your new password"
          />
        ) : null}
        <div className="mb-5">
          <Input
            IconBefore={MailIcon}
            label="Your Email"
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Input
            IconBefore={PasswordIcon}
            label="Your Password"
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="/auth/forgot-password">
            <a className="block mt-5 text-right hover:text-grayscale-600 text-grayscale-500 text-bodyM">
              Forgot your password?
            </a>
          </Link>
          {error && <Feedback variant="error" message={error} />}
        </div>

        <Button disabled={!isFilledIn()} type="submit" loading={signingIn}>
          Login
        </Button>
      </form>
      <p className=" text-center text-grayscale-500 pt-5">
        Don{"’"}t have an account?{" "}
        <Button
          variant="secondary"
          className="font-normal inline"
          href="/auth/signup"
        >
          Sign Up
        </Button>
      </p>
    </>
  )
}
export const getServerSideProps = redirectIfAuthenticated

export default SignIn
