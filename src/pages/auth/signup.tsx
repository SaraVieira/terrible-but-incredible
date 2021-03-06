import { UserIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { Button } from "~/components/Button"
import { Feedback } from "~/components/Feedback"
import { Input } from "~/components/Form"
import { MailIcon, PasswordIcon } from "~/components/Icons"
import { PasswordMeter } from "~/components/PasswordMetter"
import { useSignup } from "~/utils/hooks/useRegistration"

const SignUp = () => {
  const router = useRouter()
  const {
    createUser,
    error,
    setPassword,
    setEmail,
    setRepeatPassword,
    password,
    isFilledIn,
    setUsername,
  } = useSignup()

  const createAccount = (e) => createUser(e, router)

  return (
    <>
      <form
        onSubmit={createAccount}
        className="max-w-[500px] m-auto p-15 h-full justify-center flex flex-col mt-12"
      >
        <h2 className="pb-8 font-bold text-2xl">Sign up</h2>
        <div className="mb-5">
          <Input
            IconBefore={() => (
              <UserIcon className="text-grayscale-400 w-6 h-6" />
            )}
            label="Username"
            id="username"
            required
            type="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Input
            IconBefore={MailIcon}
            label="Email"
            id="email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Input
            IconBefore={PasswordIcon}
            label="Password"
            required
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <PasswordMeter password={password} />
        <div className="mb-5">
          <Input
            IconBefore={PasswordIcon}
            label="Repeat Password"
            id="repeat-password"
            required
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        {error && <Feedback variant="error" message={error} />}
        <Button type="submit" disabled={!isFilledIn()}>
          Create Account
        </Button>
      </form>
    </>
  )
}

export default SignUp
